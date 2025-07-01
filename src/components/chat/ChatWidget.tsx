import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Mic, Plus, X, Bot, User, Smile, Paperclip } from 'lucide-react';
import { ChatMessage } from '../../types/Post';

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onToggle }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hey! How\'s your cosmic journey going today? ✨',
      timestamp: '2m ago',
      sender: 'friend',
      type: 'text',
    },
    {
      id: '2',
      content: 'Amazing! Just shared a new AI art piece. The algorithms are getting so creative!',
      timestamp: '1m ago',
      sender: 'user',
      type: 'text',
    },
    {
      id: '3',
      content: 'That sounds incredible! AI creativity is truly mind-blowing. Would you like me to suggest some related artists you might connect with?',
      timestamp: 'now',
      sender: 'ai',
      type: 'text',
      aiSummary: 'AI offering personalized artist recommendations based on user interests',
    },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        content: message,
        timestamp: 'now',
        sender: 'user',
        type: 'text',
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: 'That\'s fascinating! Based on our conversation, I think you\'d love connecting with other AI enthusiasts. ✨',
          timestamp: 'now',
          sender: 'ai',
          type: 'text',
          aiSummary: 'AI providing contextual recommendations',
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const getSenderIcon = (sender: string) => {
    switch (sender) {
      case 'ai': return <Bot className="w-4 h-4 text-cosmic-cyan" />;
      case 'user': return <User className="w-4 h-4 text-cosmic-magenta" />;
      default: return <MessageCircle className="w-4 h-4 text-green-400" />;
    }
  };

  const getSenderColor = (sender: string) => {
    switch (sender) {
      case 'ai': return 'from-cosmic-cyan/20 to-blue-500/20 border-cosmic-cyan/30';
      case 'user': return 'from-cosmic-magenta/20 to-pink-500/20 border-cosmic-magenta/30';
      default: return 'from-green-400/20 to-emerald-500/20 border-green-400/30';
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggle}
          className="fixed bottom-6 right-6 w-14 h-14 cosmic-gradient rounded-full shadow-lg hover:shadow-xl transition-all z-50 flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-cosmic-cyan opacity-30"
          />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-6 right-6 w-96 h-[500px] glass-card rounded-2xl border border-glass-white-20 shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-glass-white-20 cosmic-gradient">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-white">Cosmic Chat</h3>
                    <p className="text-xs text-white/80">Nova AI • 3 friends online</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onToggle}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start space-x-3 ${
                    msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getSenderColor(msg.sender)} flex items-center justify-center shrink-0`}>
                    {getSenderIcon(msg.sender)}
                  </div>
                  <div className={`flex-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block p-3 rounded-2xl bg-gradient-to-r ${getSenderColor(msg.sender)} border max-w-[80%]`}>
                      <p className="text-white text-sm">{msg.content}</p>
                      {msg.aiSummary && (
                        <div className="mt-2 pt-2 border-t border-white/20">
                          <p className="text-xs text-white/70 italic">{msg.aiSummary}</p>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{msg.timestamp}</p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-glass-white-20">
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 glass-card rounded-full text-cosmic-cyan hover:text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a cosmic message..."
                    className="w-full glass-card px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cosmic-cyan/50 transition-all"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 text-gray-400 hover:text-cosmic-cyan transition-colors"
                    >
                      <Smile className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 text-gray-400 hover:text-cosmic-cyan transition-colors"
                    >
                      <Paperclip className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-2 rounded-full transition-all ${
                    isRecording 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'glass-card text-cosmic-cyan hover:text-white'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className={`p-2 rounded-full transition-all ${
                    message.trim()
                      ? 'cosmic-gradient text-white shadow-lg'
                      : 'glass-card text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Quick Reactions */}
              <div className="flex items-center space-x-2 mt-3">
                {['👍', '❤️', '😂', '🤯', '✨', '🔥'].map((emoji) => (
                  <motion.button
                    key={emoji}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-lg hover:bg-glass-white-20 p-1 rounded-full transition-colors"
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;