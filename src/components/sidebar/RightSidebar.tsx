import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, TrendingUp, MessageCircle, Sparkles, Plus, ChevronRight, Zap } from 'lucide-react';

const RightSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('suggestions');

  const suggestions = [
    {
      id: '1',
      name: 'Luna Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100',
      mutualConnections: 12,
      commonInterests: ['AI Art', 'Cosmic Vibes'],
      isOnline: true,
    },
    {
      id: '2',
      name: 'Kai Thompson',
      avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?w=100',
      mutualConnections: 8,
      commonInterests: ['Space Tech', 'Neural Networks'],
      isOnline: false,
    },
    {
      id: '3',
      name: 'Aria Chen',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100',
      mutualConnections: 15,
      commonInterests: ['Digital Art', 'Cyberpunk'],
      isOnline: true,
    },
  ];

  const trendingTopics = [
    { name: 'AI Consciousness', posts: '2.4k', growth: '+45%' },
    { name: 'Quantum Computing', posts: '1.8k', growth: '+32%' },
    { name: 'Neural Interfaces', posts: '1.2k', growth: '+28%' },
    { name: 'Space Colonization', posts: '956', growth: '+67%' },
    { name: 'Digital Twins', posts: '743', growth: '+23%' },
  ];

  const communityStats = {
    totalUsers: '127.5k',
    activeNow: '12.3k',
    postsToday: '45.2k',
    vibeScore: 94,
  };

  return (
    <div className="space-y-6">
      {/* Nova AI Assistant */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card p-6 rounded-2xl border border-glass-white-20"
      >
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity },
            }}
            className="w-10 h-10 cosmic-gradient rounded-full flex items-center justify-center"
          >
            <Sparkles className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h3 className="font-semibold text-white neon-text">Nova AI</h3>
            <p className="text-xs text-gray-400">Your cosmic companion</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-glass-white-5 rounded-lg border border-glass-white-20"
          >
            <p className="text-sm text-gray-300">
              "Based on your recent activity, you might enjoy connecting with other AI art enthusiasts. Want me to suggest some matches?"
            </p>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-2 glass-card rounded-lg text-cosmic-cyan hover:text-white transition-colors text-sm font-medium"
          >
            Ask Nova something
          </motion.button>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="glass-card rounded-2xl border border-glass-white-20 overflow-hidden">
        <div className="flex">
          {[
            { id: 'suggestions', label: 'People', icon: Users },
            { id: 'trending', label: 'Trends', icon: TrendingUp },
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 p-4 flex items-center justify-center space-x-2 transition-all ${
                  activeTab === tab.id
                    ? 'cosmic-gradient text-white'
                    : 'text-gray-400 hover:text-white hover:bg-glass-white-20'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'suggestions' && (
              <motion.div
                key="suggestions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="font-semibold text-white mb-4">People You Might Vibe With</h3>
                {suggestions.map((person, index) => (
                  <motion.div
                    key={person.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 glass-card rounded-xl border border-glass-white-20 hover:border-cosmic-cyan/50 transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="relative">
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-glass-white-20"
                        />
                        {person.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{person.name}</h4>
                        <p className="text-xs text-gray-400">{person.mutualConnections} mutual connections</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {person.commonInterests.map((interest) => (
                        <span
                          key={interest}
                          className="px-2 py-1 bg-cosmic-cyan/20 text-cosmic-cyan text-xs rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full p-2 cosmic-gradient rounded-lg text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all"
                    >
                      Connect
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'trending' && (
              <motion.div
                key="trending"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="font-semibold text-white mb-4">Trending in Your Universe</h3>
                {trendingTopics.map((topic, index) => (
                  <motion.div
                    key={topic.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="p-4 glass-card rounded-xl border border-glass-white-20 hover:border-cosmic-magenta/50 cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{topic.name}</h4>
                        <p className="text-sm text-gray-400">{topic.posts} posts</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-green-400 font-medium">{topic.growth}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Community Stats */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6 rounded-2xl border border-glass-white-20"
      >
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="w-5 h-5 text-cosmic-cyan" />
          <h3 className="font-semibold text-white">Community Pulse</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-cosmic-cyan">{communityStats.totalUsers}</div>
            <div className="text-xs text-gray-400">Total Users</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">{communityStats.activeNow}</div>
            <div className="text-xs text-gray-400">Active Now</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-cosmic-magenta">{communityStats.postsToday}</div>
            <div className="text-xs text-gray-400">Posts Today</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-400">{communityStats.vibeScore}%</div>
            <div className="text-xs text-gray-400">Vibe Score</div>
          </div>
        </div>
        
        {/* Vibe Score Visualization */}
        <div className="mt-4">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${communityStats.vibeScore}%` }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-full cosmic-gradient"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RightSidebar;