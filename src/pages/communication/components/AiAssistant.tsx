import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, Loader2, User, Bot } from 'lucide-react';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const AiAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your e-consigier AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!input.trim() || isProcessing) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      // Get a response based on the user's message
      const aiResponse = getAiResponse(input);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setIsProcessing(false);
    }, 1500);
  };
  
  const toggleRecording = () => {
    // In a real app, this would integrate with WebRTC and Telnyx Voice AI
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Simulating recording start
      console.log('Started recording');
    } else {
      // Simulating recording end and voice processing
      console.log('Stopped recording');
      setIsProcessing(true);
      
      // Simulate processing delay
      setTimeout(() => {
        const transcribedText = "I'd like to book the gym for tomorrow evening.";
        setInput(transcribedText);
        setIsProcessing(false);
      }, 2000);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Simple AI response logic (in a real app, this would call the Telnyx API)
  const getAiResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return "Hello! How can I assist you today?";
    } else if (lowerCaseMessage.includes('amenities') || lowerCaseMessage.includes('facilities')) {
      return "Our community offers several amenities including a gym, swimming pool, co-working space, and meeting rooms. You can book these facilities through the Amenities section of the app.";
    } else if (lowerCaseMessage.includes('maintenance') || lowerCaseMessage.includes('repair')) {
      return "For maintenance requests, please go to the Maintenance section where you can submit a detailed request with photos if needed. Our team typically responds within 24 hours for non-emergency issues.";
    } else if (lowerCaseMessage.includes('book') || lowerCaseMessage.includes('reservation')) {
      return "I can help you book community amenities! Please visit the Amenities section to check availability and make a reservation. Would you like me to navigate you there?";
    } else if (lowerCaseMessage.includes('opening') || lowerCaseMessage.includes('hours')) {
      return "The gym is open 24/7 with your resident access card. The pool is open from 7am to 10pm daily. The co-working space is available from 6am to midnight.";
    } else if (lowerCaseMessage.includes('event') || lowerCaseMessage.includes('community')) {
      return "We have several upcoming community events! This weekend there's a pool party on Saturday from 2-5pm, and next week we have a wine and cheese social on Wednesday evening. You can find all events in the Events calendar.";
    } else {
      return "I appreciate your question. To provide the most accurate response, I'll connect with the appropriate department. Is there anything specific you need assistance with regarding your residence or community amenities?";
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden flex flex-col h-[600px]">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">AI Voice Assistant</h2>
        <p className="mt-1 text-sm text-gray-500">
          Ask questions or request information about your community
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="flex items-center mb-1">
                {message.sender === 'ai' ? (
                  <Bot className="h-4 w-4 mr-1" />
                ) : (
                  <User className="h-4 w-4 mr-1" />
                )}
                <span className="text-xs opacity-75">
                  {message.sender === 'ai' ? 'AI Assistant' : 'You'}
                </span>
              </div>
              <p>{message.content}</p>
              <div className="text-right mt-1">
                <span className="text-xs opacity-75">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2">
              <div className="flex items-center">
                <Loader2 className="h-5 w-5 animate-spin text-primary-600 mr-2" />
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <button
            onClick={toggleRecording}
            className={`p-2 rounded-full mr-2 ${
              isRecording
                ? 'bg-error-100 text-error-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="input flex-1"
            disabled={isProcessing || isRecording}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isProcessing}
            className="p-2 rounded-full ml-2 bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-2 text-xs text-center text-gray-500">
          {isRecording ? 'Listening...' : 'Press the microphone to use voice input'}
        </p>
      </div>
    </div>
  );
};

export default AiAssistant;