import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, MessageCircle, Settings, User, Sparkles } from 'lucide-react';

const TopNavigation: React.FC = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifications] = useState(3);
  const [messages] = useState(5);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-glass-white-20"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 cosmic-gradient rounded-full flex items-center justify-center"
          >
            <Sparkles className="w-5 h-5 text-white" />
          </motion.div>
          <span className="text-xl font-bold text-white neon-text">NebulaNet</span>
        </motion.div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <motion.div
            animate={{ 
              boxShadow: searchFocused 
                ? '0 0 30px rgba(0, 255, 255, 0.4)' 
                : '0 0 0px rgba(0, 255, 255, 0)' 
            }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users, posts, moods... Let AI help you discover"
              className="w-full glass-card pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cosmic-cyan/50 transition-all duration-300"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </motion.div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-2 glass-card rounded-full text-white hover:text-cosmic-cyan transition-colors"
          >
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-cosmic-magenta rounded-full text-xs flex items-center justify-center font-bold"
              >
                {notifications}
              </motion.span>
            )}
          </motion.button>

          {/* Messages */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-2 glass-card rounded-full text-white hover:text-cosmic-cyan transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            {messages > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-cosmic-cyan rounded-full text-xs flex items-center justify-center font-bold text-black"
              >
                {messages}
              </motion.span>
            )}
          </motion.button>

          {/* Settings */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 glass-card rounded-full text-white hover:text-cosmic-cyan transition-colors"
          >
            <Settings className="w-5 h-5" />
          </motion.button>

          {/* Profile */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative group cursor-pointer"
          >
            <div className="w-10 h-10 cosmic-gradient rounded-full flex items-center justify-center text-white font-bold">
              <User className="w-5 h-5" />
            </div>
            <div className="absolute top-0 left-0 w-10 h-10 rounded-full animate-pulse-glow"></div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default TopNavigation;