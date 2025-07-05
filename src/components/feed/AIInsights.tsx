import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, X } from 'lucide-react';
import { AIInsight } from '../../types/Post';

const AIInsights: React.FC = () => {
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const insights: AIInsight[] = [
    {
      id: '1',
      type: 'mood',
      title: 'Your Vibe Today',
      description: 'You seem to be in a creative flow! Perfect time to share your artistic projects.',
      action: 'Share something creative',
      icon: '🎨',
    },
    {
      id: '2',
      type: 'trend',
      title: 'Trending in Your Circle',
      description: 'AI art discussions are buzzing. Your friends would love your insights!',
      action: 'Join the conversation',
      icon: '🔥',
    },
    {
      id: '3',
      type: 'suggestion',
      title: 'Connection Opportunity',
      description: '3 new people with similar cosmic interests want to connect.',
      action: 'View suggestions',
      icon: '🌟',
    },
    {
      id: '4',
      type: 'memory',
      title: 'Memory Bubble',
      description: 'Remember this post from last year? Your perspective might have evolved!',
      action: 'Revisit memory',
      icon: '💭',
    },
    {
    id: '5',
    type: 'habit',
    title: 'Daily Habit Reminder',
    description: 'Consistent posting boosts your reach. A quick daily update keeps you top of mind.',
    action: 'Post a daily update',
    icon: '📅',
  },
  {
    id: '6',
    type: 'engagement',
    title: 'High Engagement Alert',
    description: 'Your last post received 120 likes and 30 comments—your community is active!',
    action: 'Thank your audience',
    icon: '💬',
  },
  ];

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'mood': return 'from-pink-500 to-purple-500';
      case 'trend': return 'from-orange-500 to-red-500';
      case 'suggestion': return 'from-cyan-500 to-blue-500';
      case 'memory': return 'from-purple-500 to-indigo-500';
      case 'habit':
      return 'from-green-500 to-teal-500';
      case 'engagement':
      return 'from-yellow-400 to-amber-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-2xl border border-glass-white-20 mb-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div>
            <h2 className="text-lg font-semibold text-white neon-text">AI Insights</h2>
            <p className="text-sm text-gray-400">Personalized for your cosmic journey</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 glass-card rounded-full text-cosmic-cyan hover:text-white transition-colors"
        >
          <Sparkles className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.slice(0, isExpanded ? insights.length : 2).map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            onClick={() => setSelectedInsight(insight)}
            className="glass-card p-4 rounded-xl border border-glass-white-20 hover:border-cosmic-cyan/50 cursor-pointer transition-all"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getInsightColor(insight.type)} flex items-center justify-center text-lg shrink-0`}>
                {insight.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white mb-1">{insight.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{insight.description}</p>
                {insight.action && (
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-1 mt-2 text-xs text-cosmic-cyan hover:text-cosmic-magenta transition-colors"
                  >
                    <span>{insight.action}</span>
                    <ChevronRight className="w-3 h-3" />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expand/Collapse Button */}
      {insights.length > 2 && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-4 p-3 glass-card rounded-xl text-cosmic-cyan hover:text-white transition-colors font-medium"
        >
          {isExpanded ? 'Show Less' : `Show ${insights.length - 2} More Insights`}
        </motion.button>
      )}

      {/* Insight Modal */}
      <AnimatePresence>
        {selectedInsight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedInsight(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-6 rounded-2xl border border-glass-white-20 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getInsightColor(selectedInsight.type)} flex items-center justify-center text-xl`}>
                    {selectedInsight.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{selectedInsight.title}</h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedInsight(null)}
                  className="p-2 glass-card rounded-full text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
              
              <p className="text-gray-300 mb-6">{selectedInsight.description}</p>
              
              {selectedInsight.action && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-3 bg-cosmic-neon-pink rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  {selectedInsight.action}
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AIInsights;