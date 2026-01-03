
import React, { useState, useEffect, useRef } from 'react';
import { getSupportResponse } from '../services/support';
import { X, Send, ShieldCheck, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  time: string;
}

interface LiveSupportProps {
  onClose: () => void;
}

const LiveSupport: React.FC<LiveSupportProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'model', 
      text: 'Hello, I’m Xavier. How can I help you with your Model π configuration today?', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await getSupportResponse(history, input);
      
      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] w-full max-w-[400px] h-[600px] shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-2xl h-full flex flex-col">
        {/* Clean Header */}
        <div className="p-6 bg-[#f5f5f7] flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-gray-200 shadow-sm overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Xavier&backgroundColor=f5f5f7" alt="Xavier" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Xavier</p>
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Tesla Specialist</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        
        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-white scroll-smooth">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-[#0071e3] text-white rounded-tr-none shadow-md shadow-blue-500/10' 
                : 'bg-[#f5f5f7] text-gray-800 rounded-tl-none border border-gray-100'
              }`}>
                {msg.text}
              </div>
              <span className="text-[9px] text-gray-400 mt-1 uppercase font-bold tracking-tight px-1">{msg.time}</span>
            </div>
          ))}
          {isTyping && (
            <div className="flex flex-col items-start">
              <div className="bg-[#f5f5f7] px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          )}
        </div>
        
        {/* Input Area */}
        <div className="p-6 bg-white border-t border-gray-100">
          <div className="relative flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 bg-[#f5f5f7] border border-transparent rounded-full px-5 py-3 text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="w-12 h-12 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full flex items-center justify-center transition-all active:scale-90 disabled:opacity-30 disabled:grayscale shadow-lg shadow-blue-500/20"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4 flex justify-center items-center gap-2 text-[9px] text-gray-400 font-bold uppercase tracking-widest">
             <ShieldCheck className="w-3 h-3 text-green-500" />
             <span>End-to-End Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSupport;
