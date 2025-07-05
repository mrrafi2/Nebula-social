import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, Send, Mic, Plus, X, Bot, User, Smile, Paperclip, 
  Phone, Video, Info, Search, Image, Camera, MapPin, ThumbsUp,
  MoreVertical, VolumeX, Volume2, ArrowLeft, Users, Settings
} from 'lucide-react';
import { ChatMessage } from '../../types/Post';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isTyping?: boolean;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onToggle }) => {
  const [currentView, setCurrentView] = useState<'friends' | 'chat'>('friends');
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock friends data
  const friends = useMemo<Friend[]>(() => [
    {
      id: '1',
      name: 'Nova AI',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100',
      isOnline: true,
      lastMessage: 'I can help you with AI recommendations!',
      lastMessageTime: '2m ago',
      unreadCount: 2,
      isTyping: false,
    },
    {
      id: '2',
      name: 'Luna Rodriguez',
      avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?w=100',
      isOnline: true,
      lastMessage: 'Check out this cosmic art piece! ✨',
      lastMessageTime: '5m ago',
      unreadCount: 1,
    },
    {
      id: '3',
      name: 'Alex Rivera',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100',
      isOnline: false,
      lastMessage: 'The AI model training is complete',
      lastMessageTime: '1h ago',
      unreadCount: 0,
    },
    {
      id: '4',
      name: 'Zara Malik',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=100',
      isOnline: true,
      lastMessage: 'Late night coding session again 💻',
      lastMessageTime: '2h ago',
      unreadCount: 0,
    },
    {
      id: '5',
      name: 'Kai Thompson',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?w=100',
      isOnline: false,
      lastMessage: 'Space tech discussion was amazing!',
      lastMessageTime: '1d ago',
      unreadCount: 0,
    },
  ], []);

  // Initialize messages for each friend
  useEffect(() => {
    const initialMessages: Record<string, ChatMessage[]> = {};
    friends.forEach(friend => {
      if (friend.id === '1') {
        // Nova AI messages
        initialMessages[friend.id] = [
          {
            id: '1',
            content: 'Hey! I\'m Nova, your AI companion. How can I help you today? ✨',
            timestamp: '10m ago',
            sender: 'ai',
            type: 'text',
            aiSummary: 'AI introduction and assistance offer',
          },
          {
            id: '2',
            content: 'I can help you with AI recommendations, cosmic insights, and connecting with like-minded people!',
            timestamp: '2m ago',
            sender: 'ai',
            type: 'text',
          },
        ];
      } else {
        // Regular friend messages
        initialMessages[friend.id] = [
          {
            id: '1',
            content: friend.lastMessage,
            timestamp: friend.lastMessageTime,
            sender: 'friend',
            type: 'text',
          },
        ];
      }
    });
    setMessages(initialMessages);
  }, [friends]);

  // Filter friends based on search
  const filteredFriends = useMemo(() => {
    if (!searchQuery) return friends;
    return friends.filter(friend => 
      friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [friends, searchQuery]);

  // Get total unread count
  const totalUnreadCount = useMemo(() => {
    return friends.reduce((total, friend) => total + friend.unreadCount, 0);
  }, [friends]);

  // Scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (currentView === 'chat' && selectedFriend) {
      scrollToBottom();
    }
  }, [messages, currentView, selectedFriend, scrollToBottom]);

  // Handle friend selection
  const handleFriendSelect = useCallback((friend: Friend) => {
    setSelectedFriend(friend);
    setCurrentView('chat');
    friend.unreadCount = 0;
  }, []);

  // Handle back to friends list
  const handleBackToFriends = useCallback(() => {
    setCurrentView('friends');
    setSelectedFriend(null);
    setMessage('');
  }, []);

  // Handle send message
  const handleSendMessage = useCallback(() => {
    if (!message.trim() || !selectedFriend) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      timestamp: 'now',
      sender: 'user',
      type: 'text',
    };

    setMessages(prev => ({
      ...prev,
      [selectedFriend.id]: [...(prev[selectedFriend.id] || []), newMessage]
    }));
    
    setMessage('');

    // Simulate response for AI
    if (selectedFriend.id === '1') {
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: 'That\'s interesting! Let me help you with that. ✨',
          timestamp: 'now',
          sender: 'ai',
          type: 'text',
          aiSummary: 'AI providing helpful response',
        };
        setMessages(prev => ({
          ...prev,
          [selectedFriend.id]: [...(prev[selectedFriend.id] || []), aiResponse]
        }));
      }, 1000);
    }
  }, [message, selectedFriend]);

  // Handle key press
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Get sender styling
  const getSenderStyling = useCallback((sender: string) => {
    switch (sender) {
      case 'ai':
        return {
          bgColor: 'bg-gradient-to-r from-blue-500 to-purple-500',
          textColor: 'text-white',
          align: 'justify-start',
          avatar: <Bot className="w-4 h-4 text-white" />,
        };
      case 'user':
        return {
          bgColor: 'bg-gradient-to-r from-cosmic-cyan to-cosmic-magenta',
          textColor: 'text-white',
          align: 'justify-end',
          avatar: <User className="w-4 h-4 text-white" />,
        };
      default:
        return {
          bgColor: 'bg-gray-600',
          textColor: 'text-white',
          align: 'justify-start',
          avatar: <MessageCircle className="w-4 h-4 text-white" />,
        };
    }
  }, []);

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggle}
            className="fixed bottom-14 right-4 sm:bottom-11 sm:right-6 w-14 h-14 cosmic-gradient rounded-full shadow-2xl z-50 flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6 text-white" />
            
            {/* Notification Badge */}
            {totalUnreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white"
              >
                <span className="text-xs font-bold text-white">
                  {totalUnreadCount > 9 ? '9+' : totalUnreadCount}
                </span>
              </motion.div>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] max-w-sm sm:w-96 h-[calc(100vh-8rem)] max-h-[600px] z-50"
          >
            {/* Chat Container */}
            <div className="h-full bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-2xl overflow-hidden flex flex-col">
              
              {/* Friends List View */}
              <AnimatePresence mode="wait">
                {currentView === 'friends' && (
                  <motion.div
                    key="friends"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full flex flex-col"
                  >
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-cosmic-cyan to-cosmic-magenta">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">Messages</h3>
                            <p className="text-xs text-white/80">{friends.length} friends</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                          >
                            <Settings className="w-4 h-4 text-white" />
                          </motion.button>
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
                      
                      {/* Search Bar */}
                      <div className="mt-3 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search friends..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-white/20 border border-white/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                        />
                      </div>
                    </div>

                    {/* Friends List */}
                    <div className="flex-1 overflow-y-auto">
                      {filteredFriends.map((friend, index) => (
                        <motion.button
                          key={friend.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleFriendSelect(friend)}
                          className="w-full p-4 flex items-center gap-3 border-b border-gray-100 hover:bg-gray-50 transition-all text-left"
                        >
                          {/* Avatar */}
                          <div className="relative">
                            <img
                              src={friend.avatar}
                              alt={friend.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                            />
                            {/* Online Status */}
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                              friend.isOnline ? 'bg-green-500' : 'bg-gray-400'
                            }`} />
                          </div>
                          
                          {/* Friend Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-gray-900 truncate">{friend.name}</h4>
                              <span className="text-xs text-gray-500">{friend.lastMessageTime}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-600 truncate">{friend.lastMessage}</p>
                              {friend.unreadCount > 0 && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-5 h-5 bg-cosmic-magenta rounded-full flex items-center justify-center ml-2"
                                >
                                  <span className="text-xs font-bold text-white">
                                    {friend.unreadCount}
                                  </span>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Chat View */}
                {currentView === 'chat' && selectedFriend && (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="h-full flex flex-col"
                  >
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-cosmic-cyan to-cosmic-magenta">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleBackToFriends}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                          >
                            <ArrowLeft className="w-4 h-4 text-white" />
                          </motion.button>
                          
                          <div className="relative">
                            <img
                              src={selectedFriend.avatar}
                              alt={selectedFriend.name}
                              className="w-8 h-8 rounded-full object-cover border-2 border-white/30"
                            />
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                              selectedFriend.isOnline ? 'bg-green-500' : 'bg-gray-400'
                            }`} />
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-white">{selectedFriend.name}</h3>
                            <p className="text-xs text-white/80">
                              {selectedFriend.isOnline ? 'Active now' : 'Last seen recently'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                          >
                            <Phone className="w-4 h-4 text-white" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                          >
                            <Video className="w-4 h-4 text-white" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                          >
                            <Info className="w-4 h-4 text-white" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                      {(messages[selectedFriend.id] || []).map((msg, index) => {
                        const styling = getSenderStyling(msg.sender);
                        const isUser = msg.sender === 'user';
                        
                        return (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`flex items-end gap-2 ${styling.align}`}
                          >
                            {/* Avatar - Left side for others */}
                            {!isUser && (
                              <img
                                src={selectedFriend.avatar}
                                alt={selectedFriend.name}
                                className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                              />
                            )}
                            
                            {/* Message Content */}
                            <div className={`max-w-[75%] ${isUser ? 'order-1' : 'order-2'}`}>
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                className={`px-4 py-3 rounded-2xl ${styling.bgColor} ${
                                  isUser ? 'rounded-br-md' : 'rounded-bl-md'
                                } shadow-sm`}
                              >
                                <p className={`text-sm ${styling.textColor}`}>{msg.content}</p>
                                
                                {msg.aiSummary && (
                                  <div className="mt-2 pt-2 border-t border-white/20">
                                    <p className="text-xs text-white/70 italic">💡 {msg.aiSummary}</p>
                                  </div>
                                )}
                              </motion.div>
                              
                              <p className={`text-xs text-gray-500 mt-1 px-2 ${
                                isUser ? 'text-right' : 'text-left'
                              }`}>
                                {msg.timestamp}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-gray-200 bg-white">
                      <div className="flex items-end gap-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-cosmic-midnight hover:bg-cosmic-midnight/10 rounded-full transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </motion.button>

                        <div className="flex-1 relative">
                          <input
                            ref={inputRef}
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            className="w-full bg-gray-100 border border-gray-200 rounded-full px-4 py-3 pr-12 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cosmic-midnight/50 transition-all"
                          />
                          
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1 text-gray-400 hover:text-cosmic-midnight/50 transition-colors"
                            >
                              <Smile className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={message.trim() ? handleSendMessage : () => setIsRecording(!isRecording)}
                          className={`p-3 rounded-full transition-all ${
                            message.trim()
                              ? 'bg-cosmic-neon-pink text-white shadow-lg'
                              : isRecording
                              ? 'bg-red-500 text-white animate-pulse'
                              : 'text-cosmic-midnight hover:bg-cosmic-midnight/10'
                          }`}
                        >
                          {message.trim() ? (
                            <Send className="w-5 h-5" />
                          ) : (
                            <Mic className="w-5 h-5" />
                          )}
                        </motion.button>
                      </div>
                      
                      {/* Quick Reactions */}
                      {!message.trim() && (
                        <div className="flex items-center gap-2 mt-3">
                          {['👍', '❤️', '😂', '😮', '✨'].map((emoji) => (
                            <motion.button
                              key={emoji}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                const emojiMessage: ChatMessage = {
                                  id: Date.now().toString(),
                                  content: emoji,
                                  timestamp: 'now',
                                  sender: 'user',
                                  type: 'reaction',
                                };
                                setMessages(prev => ({
                                  ...prev,
                                  [selectedFriend.id]: [...(prev[selectedFriend.id] || []), emojiMessage]
                                }));
                              }}
                              className="text-lg hover:bg-gray-100 p-2 rounded-full transition-colors"
                            >
                              {emoji}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;