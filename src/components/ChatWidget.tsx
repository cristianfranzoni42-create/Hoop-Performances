import { MessageCircle, X, Send, User } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi there! How can we help you today?', isAdmin: true },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), text: message, isAdmin: false }]);
    setMessage('');
    
    // Simulate admin response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        text: 'Thanks for your message! Our team will get back to you shortly.', 
        isAdmin: true 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-zinc-900 p-6 text-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold italic uppercase tracking-widest">Support Chat</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow p-6 space-y-4 max-h-96 overflow-y-auto bg-zinc-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium leading-relaxed ${
                    msg.isAdmin 
                      ? 'bg-white text-zinc-900 border border-zinc-200 rounded-tl-none' 
                      : 'bg-emerald-600 text-white rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-zinc-100 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-grow bg-zinc-100 border-none rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-emerald-500 transition-all"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                className="p-2 bg-zinc-900 text-white rounded-xl hover:bg-emerald-600 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-zinc-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-600 transition-all hover:scale-110 active:scale-95"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
