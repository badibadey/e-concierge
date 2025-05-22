import { useState, useEffect, useCallback, useRef } from 'react';
import { TelnyxRTC } from '@telnyx/webrtc';
import { Button, Modal, Spin } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import logoImage from '../../assets/images/e-concierge-logo.png';
import ringtoneSound from '../../assets/images/ringtone.mp3';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL!;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const TELNYX_CREDENTIAL_ID = import.meta.env.VITE_TELNYX_CREDENTIAL_ID!;
// Usuwam nieużywaną zmienną TELNYX_APP_PORT

// Funkcja do pobierania tokenu bezpośrednio z API Telnyx zamiast przez Supabase
const fetchTelnyxTokenDirect = async (): Promise<string> => {
  try {
    console.log('Fetching Telnyx token directly from Telnyx API...');
    
    // Używamy API Telnyx bezpośrednio - wymaga to klucza API Telnyx
    // Uwaga: W produkcji to powinno być wykonywane przez backend dla bezpieczeństwa
    const TELNYX_API_KEY = import.meta.env.VITE_TELNYX_API_KEY!;
    
    if (!TELNYX_API_KEY) {
      throw new Error('Missing TELNYX_API_KEY environment variable');
    }
    
    if (!TELNYX_CREDENTIAL_ID) {
      throw new Error('Missing TELNYX_CREDENTIAL_ID environment variable');
    }
    
    const response = await fetch(
      `https://api.telnyx.com/v2/telephony_credentials/${TELNYX_CREDENTIAL_ID}/token`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TELNYX_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Direct token fetch error response:', errorText);
      let errorData: { errors?: Array<{detail?: string}> } = {};
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        // If not JSON, use the raw text
      }
      
      throw new Error(
        errorData.errors?.[0]?.detail || 
        `Telnyx API error (${response.status}): ${response.statusText}`
      );
    }
    
    // Token jest zwracany bezpośrednio jako tekst
    const token = await response.text();
    console.log('Token received directly from Telnyx, length:', token.length);
    
    if (!token || token.length < 10) {
      throw new Error('Invalid token received from Telnyx API');
    }
    
    return token;
  } catch (error) {
    console.error('Direct token fetch error:', error);
    throw new Error(`Failed to fetch Telnyx token directly: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Oryginalna funkcja używająca Supabase jako fallback
const fetchTelnyxToken = async (): Promise<string> => {
  try {
    // Najpierw próbujemy pobrać token bezpośrednio
    try {
      return await fetchTelnyxTokenDirect();
    } catch (directError) {
      console.warn('Direct token fetch failed, falling back to Supabase:', directError);
      // Kontynuujemy z metodą Supabase jako fallback
    }
    
    console.log('Fetching Telnyx token from Supabase function...');
    const response = await fetch(`${SUPABASE_URL}/functions/v1/telnyx-token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'apikey': SUPABASE_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Token fetch error response:', errorText);
      let errorData: { error?: string; details?: string } = {};
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        // If not JSON, use the raw text
      }
      
      throw new Error(
        errorData.error || 
        errorData.details || 
        errorText || 
        `Server responded with status ${response.status}`
      );
    }

    const responseText = await response.text();
    console.log('Token response received, length:', responseText.length);
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse token response as JSON:', e);
      throw new Error('Invalid token response format from server');
    }
    
    if (!data.token) {
      console.error('Token missing from response:', data);
      throw new Error('Invalid token response from server');
    }

    return data.token;
  } catch (error) {
    console.error('Token fetch error:', error);
    throw new Error(`Failed to fetch Telnyx token: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

const CallButton = () => {
  const [client, setClient] = useState<TelnyxRTC | null>(null);
  const [call, setCall] = useState<any>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isClientReady, setIsClientReady] = useState(false);
  const MAX_RETRIES = 3;
  const CONNECTION_TIMEOUT = 15000; // Reduced to 15 seconds for faster feedback
  const RETRY_DELAY = 2000;
  const ringtoneRef = useRef<HTMLAudioElement | null>(null);

  const waitForClientConnection = (telnyxClient: TelnyxRTC): Promise<void> => {
    return new Promise((resolve, reject) => {
      let connectionTimeout: NodeJS.Timeout;
      let cleanupHandlers: (() => void)[] = [];

      const cleanup = () => {
        clearTimeout(connectionTimeout);
        cleanupHandlers.forEach(handler => handler());
      };

      console.log('Current client state:', telnyxClient.state);
      
      // Check initial state
      if (telnyxClient.connected) {
        console.log('Client already connected, resolving immediately');
        cleanup();
        resolve();
        return;
      }

      // Set a shorter timeout for faster feedback
      connectionTimeout = setTimeout(() => {
        console.error('Connection timeout reached after', CONNECTION_TIMEOUT, 'ms');
        cleanup();
        reject(new Error('Connection timeout - please check your network connection and try again'));
      }, CONNECTION_TIMEOUT);

      const onReady = () => {
        console.log('Received telnyx.ready event');
        cleanup();
        resolve();
      };

      const onError = (error: any) => {
        console.error('Received telnyx.error event:', error);
        cleanup();
        reject(new Error(`Connection failed: ${error.message || 'Unknown error'}`));
      };

      const onDisconnected = () => {
        console.error('Received telnyx.socket.close event');
        cleanup();
        reject(new Error('Client disconnected during connection attempt'));
      };

      const onSocketOpen = () => {
        console.log('Socket connection opened');
      };

      telnyxClient.on('telnyx.ready', onReady);
      telnyxClient.on('telnyx.error', onError);
      telnyxClient.on('telnyx.socket.close', onDisconnected);
      telnyxClient.on('telnyx.socket.open', onSocketOpen);

      cleanupHandlers = [
        () => telnyxClient.off('telnyx.ready', onReady),
        () => telnyxClient.off('telnyx.error', onError),
        () => telnyxClient.off('telnyx.socket.close', onDisconnected),
        () => telnyxClient.off('telnyx.socket.open', onSocketOpen)
      ];
    });
  };

  const initializeTelnyx = useCallback(async () => {
    if (!TELNYX_CREDENTIAL_ID) {
      throw new Error('Missing Telnyx credential ID - please check your environment configuration');
    }

    try {
      const token = await fetchTelnyxToken();
      
      console.log('Initializing Telnyx client with credential ID:', TELNYX_CREDENTIAL_ID);
      
      // Najprostsza możliwa konfiguracja klienta Telnyx
      console.log('Creating Telnyx client with token length:', token.length);
      
      // Tworzymy klienta z minimalną konfiguracją
      const telnyxClient = new TelnyxRTC({
        login_token: token
      });
      
      // Dodajemy element audio do DOM przed próbą połączenia
      if (!document.getElementById('telnyx-audio')) {
        const audioElement = document.createElement('audio');
        audioElement.id = 'telnyx-audio';
        audioElement.setAttribute('autoplay', 'true');
        document.body.appendChild(audioElement);
        console.log('Created audio element for Telnyx');
      }
      
      // Próbujemy ustawić element audio dla klienta
      try {
        // @ts-ignore - Ignorujemy błędy TypeScript
        telnyxClient.remoteElement = 'telnyx-audio';
      } catch (e) {
        console.warn('Could not set remote element:', e);
      }
      
      console.log('Telnyx client created successfully');
      
      // Element audio jest już dodany wcześniej

      // Set up event handlers before connecting
      telnyxClient.on('telnyx.ready', () => {
        console.log('Telnyx client ready');
        setClient(telnyxClient);
        setIsClientReady(true);
        setError(null);
        setRetryCount(0);
      });

      telnyxClient.on('telnyx.error', (error) => {
        console.error('Telnyx error:', error);
        const errorMessage = error.message || 'Unknown error';
        setError(`Connection error: ${errorMessage}. Please try again.`);
        setIsConnecting(false);
        setIsCallActive(false);
        setIsClientReady(false);
      });

      telnyxClient.on('telnyx.socket.error', (error) => {
        console.error('Socket connection error:', error);
        setIsClientReady(false);
        setError('Lost connection to service - please check your network connection');
        
        // Attempt reconnection
        if (retryCount < MAX_RETRIES) {
          setTimeout(() => {
            telnyxClient.connect().catch(console.error);
          }, RETRY_DELAY * Math.pow(2, retryCount));
        }
      });

      telnyxClient.on('telnyx.socket.close', () => {
        console.log('Socket connection closed');
        setIsClientReady(false);
        setError('Connection closed - attempting to reconnect...');
        
        if (retryCount < MAX_RETRIES) {
          setTimeout(() => {
            telnyxClient.connect().catch(console.error);
          }, RETRY_DELAY * Math.pow(2, retryCount));
        }
      });

      telnyxClient.on('telnyx.notification', (notification) => {
        console.log('Telnyx notification:', notification);
        
        // Obsługa powiadomień o połączeniu
        if (notification.type === 'callUpdate' && notification.call) {
          const call = notification.call;
          
          // Loguj szczegóły połączenia
          if (call.state) {
            console.log(`Call state update: ${call.state}`);
            
            // Aktualizuj stan połączenia w interfejsie
            if (call.state === 'active') {
              setIsCallActive(true);
              setIsConnecting(false);
              setError(null);
              
              // Zatrzymaj dzwonek, gdy połączenie zostało nawiązane
              if (ringtoneRef.current) {
                ringtoneRef.current.pause();
                ringtoneRef.current.currentTime = 0;
              }
            } else if (call.state === 'hangup' || call.state === 'destroy') {
              setIsCallActive(false);
              setIsConnecting(false);
              setError(null);
              
              // Zatrzymaj dzwonek, jeśli jest odtwarzany
              if (ringtoneRef.current) {
                ringtoneRef.current.pause();
                ringtoneRef.current.currentTime = 0;
              }
            }
          }
          
          // Zapisz obiekt połączenia
          setCall(call);
        }
      });

      telnyxClient.on('telnyx.incoming_call', (incomingCall) => {
        if (!incomingCall || typeof incomingCall.on !== 'function') {
          console.error('Invalid incoming call object');
          return;
        }

        setCall(incomingCall);
        
        incomingCall.on('call.accepted', () => {
          setIsCallActive(true);
          setIsConnecting(false);
        });

        incomingCall.on('call.ended', () => {
          setIsCallActive(false);
          setCall(null);
        });

        incomingCall.on('call.error', (error) => {
          console.error('Call error:', error);
          setError('Call failed: ' + error.message);
          setIsCallActive(false);
          setIsConnecting(false);
          setCall(null);
        });
      });

      // Connect and wait for ready state
      console.log('Attempting to connect Telnyx client...');
      try {
        // Sprawdź, czy przeglądarka wspiera WebRTC
        try {
          // Unikamy próby logowania całego obiektu webRTCInfo, aby uniknąć błędu cyklicznej struktury
          const webRTCInfo = TelnyxRTC.webRTCInfo();
          console.log('WebRTC supported:', typeof webRTCInfo === 'object' ? 'Yes' : 'Unknown');
          if (typeof webRTCInfo === 'object' && webRTCInfo.supportWebRTC === false) {
            throw new Error('Your browser does not support WebRTC');
          }
        } catch (e) {
          console.warn('Could not check WebRTC support:', e);
          // Kontynuujemy mimo to, ponieważ może to być fałszywy alarm
        }
        
        // Connect with a retry mechanism
        let retries = 0;
        const maxRetries = 2;
        let connected = false;
        
        while (!connected && retries <= maxRetries) {
          try {
            console.log(`Connection attempt ${retries + 1}/${maxRetries + 1}`);
            await telnyxClient.connect();
            console.log('Telnyx connect() completed, waiting for client connection...');
            await waitForClientConnection(telnyxClient);
            console.log('Client connection established successfully');
            connected = true;
          } catch (err) {
            retries++;
            if (retries <= maxRetries) {
              console.log(`Connection failed, retrying in ${RETRY_DELAY}ms...`);
              await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            } else {
              throw err;
            }
          }
        }
      } catch (connectionError) {
        console.error('Connection error during connect/wait:', connectionError);
        throw connectionError;
      }
      
      return telnyxClient;
    } catch (error) {
      console.error('Failed to initialize Telnyx client:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(`Failed to initialize: ${errorMessage}`);
      setIsClientReady(false);
      
      if (retryCount < MAX_RETRIES) {
        console.log(`Retrying initialization (attempt ${retryCount + 1}/${MAX_RETRIES})...`);
        setRetryCount(prev => prev + 1);
        return new Promise(resolve => {
          setTimeout(async () => {
            try {
              const result = await initializeTelnyx();
              resolve(result);
            } catch (error) {
              console.error('Retry failed:', error);
              resolve(null);
            }
          }, RETRY_DELAY * Math.pow(2, retryCount));
        });
      }
      
      return null;
    }
  }, [retryCount]);

  useEffect(() => {
    let telnyxClient: TelnyxRTC | null = null;

    const init = async () => {
      try {
        telnyxClient = await initializeTelnyx();
      } catch (error) {
        console.error('Initialization failed:', error);
      }
    };

    init();

    return () => {
      if (call?.hangup) {
        call.hangup();
      }
      if (telnyxClient?.disconnect) {
        telnyxClient.disconnect();
      }
      setIsClientReady(false);
    };
  }, [initializeTelnyx]);

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      if (call) {
        try {
          call.hangup();
        } catch (e) {
          console.error('Error during hangup:', e);
        }
      }
      if (client) {
        try {
          client.disconnect();
        } catch (e) {
          console.error('Error during disconnect:', e);
        }
      }
      // Zatrzymaj dzwonek, jeśli jest odtwarzany
      if (ringtoneRef.current) {
        ringtoneRef.current.pause();
        ringtoneRef.current.currentTime = 0;
      }
    };
  }, [call, client]);

  const handleCall = async () => {
    if (isCallActive) {
      // Jeśli połączenie jest aktywne, rozłącz
      if (call) {
        try {
          await call.hangup();
          setIsCallActive(false);
          setCall(null);
          
          // Zatrzymaj dzwonek, jeśli jest odtwarzany
          if (ringtoneRef.current) {
            ringtoneRef.current.pause();
            ringtoneRef.current.currentTime = 0;
          }
        } catch (error) {
          console.error('Error hanging up call:', error);
        }
      }
      return;
    }

    setIsConnecting(true);
    setError(null);
    
    // Odtwórz dzwonek podczas łączenia
    if (ringtoneRef.current) {
      ringtoneRef.current.currentTime = 0;
      ringtoneRef.current.loop = true;
      ringtoneRef.current.play().catch(e => console.error('Error playing ringtone:', e));
    }

    try {
      // Verify client connection before proceeding
      if (!client) {
        throw new Error('Client not initialized');
      }
      
      await waitForClientConnection(client as TelnyxRTC);
    } catch (e) {
      console.error('Connection failed during call attempt:', e);
      throw new Error('Connection failed. Please try again.');
    }

    try {
      // Użyj konfiguracji połączenia zgodnej z dokumentacją Telnyx
      console.log('Initiating call...');
      
      // Sprawdź, czy klient jest poprawnie połączony
      if (!client.connected) {
        console.warn('Client not connected before making call');
        throw new Error('Client not connected. Please try again.');
      }
      
      // Dodaj element audio, jeśli nie istnieje
      if (!document.getElementById('telnyx-audio')) {
        const audioElement = document.createElement('audio');
        audioElement.id = 'telnyx-audio';
        audioElement.setAttribute('autoplay', 'true');
        document.body.appendChild(audioElement);
        console.log('Created audio element for call');
      }
      
      // Ustaw element audio dla klienta
      try {
        // @ts-ignore
        if (typeof client.remoteElement !== 'string') {
          // @ts-ignore
          client.remoteElement = 'telnyx-audio';
          console.log('Set remote element for client');
        }
      } catch (e) {
        console.warn('Could not set remote element:', e);
      }
      
      // Konfiguracja połączenia z asystentem AI
      const callOptions = {
        destinationNumber: '+48426378051', // Numer asystenta AI
        audio: true
      };
      
      console.log('Call options:', JSON.stringify(callOptions));
      
      // Używamy try/catch, aby złapać ewentualne błędy podczas tworzenia połączenia
      try {
        const newCall = await client.newCall(callOptions);
        console.log('Call initiated with options:', callOptions);
      
      console.log('Call initiated successfully:', newCall ? 'Call object created' : 'No call object');

        // Jeśli dotarliśmy tutaj, to znaczy, że połączenie zostało zainicjowane
        console.log('Call object created successfully');
        
        // Zakładamy, że połączenie jest aktywne
        setIsCallActive(true);
        setIsConnecting(false);
        
        // Zapisujemy obiekt połączenia, aby móc go później zakończyć
        setCall(newCall);
        
        // Pokaż komunikat sukcesu
        setError(null);
      } catch (callError) {
        console.error('Error creating call:', callError);
        setError(`Failed to create call: ${callError instanceof Error ? callError.message : 'Unknown error'}`);
        setIsConnecting(false);
      }
    } catch (error) {
      console.error('Failed to connect:', error);
      // Dodaj więcej szczegółów o błędzie
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        setError(`Failed to connect: ${error.message}`);
      } else {
        console.error('Non-Error object thrown:', error);
        setError('Failed to connect: Unknown error');
      }
      setIsConnecting(false);
    }
  };

  // Pokaż błąd, ale nie blokuj przycisku połączenia
  const errorDisplay = error ? (
    <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>
  ) : null;

  return (
    <>
      {/* Pływający przycisk połączenia z animacją */}
      <div className="fixed bottom-20 right-6 z-50 flex items-center">
        <div className="bg-white p-3 rounded-lg shadow-lg mr-3 whitespace-nowrap">
          <p className="text-primary-700 font-medium">Porozmawiaj ze swoim e-concierge</p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-25"></div>
          <div className="absolute inset-0 bg-primary-500 rounded-full animate-pulse opacity-50 animation-delay-500"></div>
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<PhoneOutlined />}
            onClick={handleCall}
            loading={isConnecting}
            disabled={isCallActive}
            style={{ width: '60px', height: '60px', position: 'relative', zIndex: 1 }}
          />
        </div>
      </div>
      
      {errorDisplay}
      <audio id="remoteAudio" />
      <audio ref={ringtoneRef} src={ringtoneSound} preload="auto" />
      
      {/* Okno z animacją podczas dzwonienia */}
      <Modal
        title="Łączenie z asystentem"
        open={isConnecting || isCallActive}
        footer={null}
        closable={false}
        centered
      >
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <img src={logoImage} alt="e-concierge logo" style={{ height: '100px', marginBottom: '20px' }} />
          <div style={{ marginBottom: '20px' }}>
            {isConnecting ? 'Łączenie z asystentem...' : 'Połączono z asystentem'}
          </div>
          <Spin size="large" spinning={isConnecting} />
          {isCallActive && (
            <div style={{ marginTop: '20px' }}>
              <Button type="primary" danger onClick={() => call?.hangup()}>Zakończ połączenie</Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default CallButton;