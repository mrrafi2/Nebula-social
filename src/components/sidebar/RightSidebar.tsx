import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, TrendingUp, MessageCircle, Sparkles,  ChevronRight, Zap, Send, X } from 'lucide-react';
import Lottie from 'lottie-react';
import aiAvatar from '../../assets/nova.json';


const RightSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('suggestions');
  const [showChatInput, setShowChatInput] = useState(false);           
  const [chatInput, setChatInput] = useState('');               
  const [chatHistory, setChatHistory] = useState<
    { from: 'user' | 'nova'; text: string }[]
  >([]);                                                            
  const [sentRequests, setSentRequests] = useState<Record<string, boolean>>({}); 

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

  const commonQuestions = [
    'What AI art communities are trending?',
    'How can I boost my profile?',
    'Suggest people with similar interests.',
  ]; 

  function handleAskNova() {
    setShowChatInput(true);
  } 
  
  function handleSendQuestion() {
    if (!chatInput.trim()) return;
    setChatHistory(h => [
      ...h,
      { from: 'user', text: chatInput },
      { from: 'nova', text: `🔮 Generating answer for: "${chatInput}"…` },
    ]);
    setChatInput('');
  }

  function handleConnect(id: string) {
    setSentRequests(r => ({ ...r, [id]: true }));
  }

  return (
    <div className="space-y-4 lg:space-y-6">
     
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl border border-glass-white-20 overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-glass-white-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">

              <motion.div
                className="w-9 h-9 lg:w-11 lg:h-11 rounded-full flex items-center justify-center bg-none"
              >
               <Lottie
               animationData={aiAvatar}
               loop
                autoplay
               className="w-full h-full"
              />
              </motion.div>

              <div>
                <h3 className="font-semibold text-white text-sm lg:text-base">Nova AI</h3>
                <p className="text-xs text-gray-400">Your cosmic companion</p>
              </div>
            </div>
            {showChatInput && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowChatInput(false)}
                className="p-2 glass-card rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-6">
          <AnimatePresence mode="wait">
            {!showChatInput ? (
              <motion.div
                key="prompt"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {/* AI Suggestion */}
                <div className="p-4 bg-gradient-to-r from-cosmic-cyan/10 to-cosmic-magenta/10 rounded-xl border border-cosmic-cyan/20">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Based on your recent activity, you might enjoy connecting with other AI art enthusiasts. Want me to suggest some matches?
                  </p>
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAskNova}
                  className="w-full py-3 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-cosmic-cyan to-cosmic-magenta hover:from-cosmic-magenta hover:to-cosmic-cyan shadow-lg transition-all"
                >
                  Ask Nova Something
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {/* Quick Questions */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-400 font-medium">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {commonQuestions.map((q, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setChatInput(q)}
                        className="px-3 py-1 text-xs bg-glass-white-10 hover:bg-glass-white-20 text-gray-300 rounded-full transition-colors"
                      >
                        {q.length > 25 ? q.substring(0, 25) + '...' : q}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="flex  space-x-2">
                  <input
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSendQuestion()}
                    placeholder="Ask Nova anything..."
                    className="flex-1 px-3 py-3 bg-glass-white-10 border border-glass-white-20 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cosmic-cyan/50 transition-all"
                  />
                  <br />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendQuestion}
                    disabled={!chatInput.trim()}
                    className={`px-0 py-1 rounded-lg text-sm font-sm transition-all  ${
                      chatInput.trim()
                        ? '  shadow-lg text-cosmic-cyan'
                        : ' text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Chat History */}
                {chatHistory.length > 0 && (
                  <div className="max-h-42 overflow-y-auto space-y-2 scrollbar-hide">
                    {chatHistory.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: msg.from === 'user' ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`px-3 py-2 rounded-lg text-xs ${
                          msg.from === 'nova' 
                            ? 'bg-glass-white-10 text-gray-300 mr-4' 
                            : 'bg-cosmic-midnight text-white ml-4'
                        }`}
                      >
                        {msg.text}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl border border-glass-white-20 overflow-hidden"
      >
        {/* Tab Headers */}
        <div className="flex border-b border-glass-white-20">
          {[
            { id: 'suggestions', label: 'People', icon: Users },
            { id: 'trending', label: 'Trends', icon: TrendingUp },
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 p-3 lg:p-4 flex items-center justify-center space-x-2 transition-all relative ${
                  isActive
                    ? 'text-white bg-glass-white-10'
                    : 'text-gray-400 hover:text-white hover:bg-glass-white-5'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 cosmic-gradient"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-4 lg:p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'suggestions' && (
              <motion.div
                key="suggestions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white text-sm lg:text-base">Suggested Connections</h3>
                  <span className="text-xs text-gray-400">{suggestions.length} people</span>
                </div>
                
                {suggestions.map((person, index) => (
                  <motion.div
                    key={person.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="p-4 glass-card rounded-xl border border-glass-white-20 hover:border-cosmic-cyan/50 transition-all"
                  >
                    {/* User Info */}
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="relative flex-shrink-0">
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover border-2 border-glass-white-20"
                        />
                        {person.isOnline && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white text-sm lg:text-base truncate">{person.name}</h4>
                        <p className="text-xs text-gray-400">{person.mutualConnections} mutual connections</p>
                      </div>
                    </div>
                    
                    {/* Interests */}
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
                    
                    {/* Connect Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConnect(person.id)}
                      disabled={sentRequests[person.id]}
                      className={` w-26 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                        sentRequests[person.id]
                          ? 'bg-gray-200/40 text-white cursor-not-allowed'
                          : 'bg-cosmic-electric-blue/80 text-gray-50'
                      }`}
                    >
                      {sentRequests[person.id] ? '✓ Request Sent' : 'Connect'}
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
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white text-sm lg:text-base">Trending Topics</h3>
                  <span className="text-xs text-gray-400">Last 24h</span>
                </div>
                
                {trendingTopics.map((topic, index) => (
                  <motion.div
                    key={topic.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="p-4 glass-card rounded-xl border border-glass-white-20 hover:border-cosmic-magenta/50 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white text-sm lg:text-base truncate group-hover:text-cosmic-cyan transition-colors">
                          #{topic.name}
                        </h4>
                        <p className="text-xs text-gray-400">{topic.posts} posts</p>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <span className="text-xs text-green-400 font-medium">{topic.growth}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-cosmic-cyan transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Community Stats - Redesigned */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-4 lg:p-6 rounded-2xl border border-glass-white-20"
      >
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-cosmic-cyan" />
          <h3 className="font-semibold text-white text-sm lg:text-base">Community Pulse</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-4">
          {[
            { label: 'Total Users', value: communityStats.totalUsers, color: 'text-cosmic-cyan' },
            { label: 'Active Now', value: communityStats.activeNow, color: 'text-green-400' },
            { label: 'Posts Today', value: communityStats.postsToday, color: 'text-cosmic-magenta' },
            { label: 'Vibe Score', value: `${communityStats.vibeScore}%`, color: 'text-yellow-400' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-center p-3 glass-card rounded-lg"
            >
              <div className={`text-lg lg:text-xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        
        {/* Vibe Score Visualization */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Community Vibe</span>
            <span>{communityStats.vibeScore}%</span>
          </div>
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