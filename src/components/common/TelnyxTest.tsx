import { useState, useEffect } from 'react';
import { TelnyxRTC } from '@telnyx/webrtc';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL!;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const TELNYX_CREDENTIAL_ID = import.meta.env.VITE_TELNYX_CREDENTIAL_ID!;

const TelnyxTest = () => {
  const [status, setStatus] = useState<string>('Initializing...');
  const [logs, setLogs] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);

  const addLog = (message: string) => {
    console.log(message);
    setLogs(prev => [...prev, `${new Date().toISOString().substr(11, 8)} - ${message}`]);
  };

  const fetchToken = async () => {
    try {
      addLog('Fetching Telnyx token...');
      addLog(`SUPABASE_URL: ${SUPABASE_URL.substring(0, 10)}...`);
      addLog(`TELNYX_CREDENTIAL_ID: ${TELNYX_CREDENTIAL_ID}`);
      
      const response = await fetch(`${SUPABASE_URL}/functions/v1/telnyx-token`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'apikey': SUPABASE_KEY,
          'Content-Type': 'application/json'
        }
      });

      addLog(`Response status: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        const text = await response.text();
        addLog(`Token fetch failed: ${response.status} - ${text}`);
        setStatus('Failed to fetch token');
        return null;
      }

      const text = await response.text();
      addLog(`Token response length: ${text.length}`);
      if (text.length > 0) {
        addLog(`Token response start: ${text.substring(0, 20)}...`);
      } else {
        addLog('Empty token response');
      }
      
      try {
        const data = JSON.parse(text);
        addLog(`Parsed response: ${JSON.stringify(data).substring(0, 50)}...`);
        
        if (data.token) {
          setToken(data.token);
          addLog(`Token received successfully (length: ${data.token.length})`);
          return data.token;
        } else {
          addLog(`Token missing from response: ${JSON.stringify(data)}`);
          setStatus('Invalid token response');
          return null;
        }
      } catch (e) {
        addLog(`Failed to parse token response: ${e}`);
        setStatus('Invalid token format');
        return null;
      }
    } catch (e) {
      addLog(`Token fetch error: ${e}`);
      setStatus('Network error');
      return null;
    }
  };

  const testConnection = async () => {
    try {
      const tokenValue = await fetchToken();
      if (!tokenValue) return;

      setStatus('Initializing Telnyx client...');
      
      // Check WebRTC support
      const webRTCInfo = TelnyxRTC.webRTCInfo();
      addLog(`WebRTC supported: ${typeof webRTCInfo === 'object' ? webRTCInfo.supportWebRTC : 'unknown'}`);
      
      if (typeof webRTCInfo === 'object' && !webRTCInfo.supportWebRTC) {
        setStatus('WebRTC not supported by browser');
        return;
      }

      // Log token information
      addLog(`Token value length: ${tokenValue.length}`);
      addLog(`Token first 10 chars: ${tokenValue.substring(0, 10)}...`);
      
      // Create client with minimal configuration
      addLog('Creating TelnyxRTC client...');
      const client = new TelnyxRTC({
        login_token: tokenValue
      });
      
      // Log client state
      addLog(`Client connected: ${client.connected}`);
      // Nie próbuj serializować całego obiektu klienta - to powoduje błąd cyklicznej struktury
      addLog('Client object created - skipping full serialization to avoid circular structure error');
      
      // Add direct error handler for debugging
      window.onerror = (message, source, lineno, colno, error) => {
        addLog(`Global error: ${message} at ${source}:${lineno}:${colno}`);
        if (error) {
          addLog(`Error stack: ${error.stack}`);
        }
      };

      // Set up event handlers
      client.on('telnyx.ready', () => {
        addLog('✅ Telnyx client ready!');
        setStatus('Connected');
      });

      client.on('telnyx.error', (error: { message?: string }) => {
        addLog(`❌ Telnyx error: ${JSON.stringify(error)}`);
        setStatus(`Error: ${error.message || 'Unknown error'}`);
      });

      client.on('telnyx.socket.open', () => {
        addLog('Socket connection opened');
      });

      client.on('telnyx.socket.close', () => {
        addLog('Socket connection closed');
        setStatus('Disconnected');
      });

      client.on('telnyx.socket.error', (error: unknown) => {
        addLog(`Socket error: ${JSON.stringify(error)}`);
      });

      // Connect
      addLog('Connecting to Telnyx...');
      setStatus('Connecting...');
      
      try {
        addLog('Attempting to connect...');
        await client.connect();
        addLog('Connect method completed without errors');
        addLog(`Client connected after connect: ${client.connected}`);
        // Logujemy tylko podstawowe informacje o kliencie
        addLog(`Client type after connect: ${typeof client}`);
        addLog(`Client properties: connected=${client.connected}`);
        
        // Próba połączenia zakończona sukcesem
        setStatus('Connected');
      } catch (e) {
        addLog(`Connection error: ${e}`);
        if (e instanceof Error) {
          addLog(`Error name: ${e.name}`);
          addLog(`Error message: ${e.message}`);
          addLog(`Error stack: ${e.stack}`);
        } else {
          addLog(`Non-Error object thrown: ${JSON.stringify(e)}`);
        }
        setStatus(`Connection failed: ${e}`);
      }
    } catch (e) {
      addLog(`Test failed: ${e}`);
      setStatus(`Test failed: ${e}`);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto mt-8 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Telnyx WebRTC Test</h2>
      
      <div className="mb-4">
        <div className="font-semibold">Status:</div>
        <div className={`p-2 rounded ${
          status.includes('Connected') ? 'bg-green-100' : 
          status.includes('Error') || status.includes('Failed') ? 'bg-red-100' : 'bg-blue-100'
        }`}>
          {status}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="font-semibold">Credential ID:</div>
        <div className="p-2 bg-gray-100 rounded font-mono text-sm break-all">
          {TELNYX_CREDENTIAL_ID || 'Not configured'}
        </div>
      </div>
      
      {token && (
        <div className="mb-4">
          <div className="font-semibold">Token (first 20 chars):</div>
          <div className="p-2 bg-gray-100 rounded font-mono text-sm">
            {token.substring(0, 20)}...
          </div>
        </div>
      )}
      
      <div>
        <div className="font-semibold mb-2">Logs:</div>
        <div className="p-2 bg-gray-100 rounded h-64 overflow-y-auto font-mono text-xs">
          {logs.map((log, i) => (
            <div key={i} className="mb-1">{log}</div>
          ))}
        </div>
      </div>
      
      <button 
        onClick={testConnection}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Retry Connection
      </button>
    </div>
  );
};

export default TelnyxTest;
