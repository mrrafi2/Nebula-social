import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Mic, Image, Smile, Sparkles, Send, X } from 'lucide-react';

const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showAISuggestions, setShowAISuggestions] = useState(false);

  const moods = [
    { emoji: '✨', name: 'cosmic', color: 'from-cosmic-cyan to-cosmic-magenta' },
    { emoji: '🎯', name: 'focused', color: 'from-blue-500 to-purple-500' },
    { emoji: '🎨', name: 'creative', color: 'from-pink-500 to-orange-500' },
    { emoji: '😌', name: 'chill', color: 'from-green-400 to-blue-500' },
    { emoji: '🔥', name: 'energetic', color: 'from-red-500 to-yellow-500' },
    { emoji: '🌙', name: 'dreamy', color: 'from-purple-500 to-indigo-500' },
  ];

  const aiSuggestions = [
    "✨ Feeling cosmic today! The universe is vibing with me...",
    "🌌 Lost in the digital void, creating something magical...",
    "🎯 Deep focus mode activated. Time to build something amazing...",
  ];

  const handlePost = () => {
    if (content.trim()) {
      // Handle post creation
      setContent('');
      setIsExpanded(false);
      setSelectedMood(null);
    }
  };

  return (
    <motion.div
      layout
      className="glass-card p-6 rounded-2xl border border-glass-white-20 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-12 h-12 cosmic-gradient rounded-full flex items-center justify-center"
        >
          <span className="text-white font-bold">You</span>
        </motion.div>
        <div className="flex-1">
          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="Share your cosmic thoughts..."
            className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none text-lg"
            rows={isExpanded ? 4 : 1}
          />
        </div>
      </div>

      {/* AI Suggestions */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAISuggestions(!showAISuggestions)}
              className="flex items-center space-x-2 text-cosmic-cyan hover:text-cosmic-magenta transition-colors mb-3"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI Caption Suggestions</span>
            </motion.button>

            <AnimatePresence>
              {showAISuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2 mb-4"
                >
                  {aiSuggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setContent(suggestion)}
                      className="block w-full text-left p-3 glass-card rounded-lg text-sm text-gray-300 hover:text-white hover:border-cosmic-cyan/50 transition-all"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mood Selection */}
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">Select your vibe:</p>
              <div className="flex flex-wrap gap-2">
                {moods.map((mood) => (
                  <motion.button
                    key={mood.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedMood(mood.name)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedMood === mood.name
                        ? `bg-gradient-to-r ${mood.color} text-white shadow-lg`
                        : 'glass-card text-gray-300 hover:text-white'
                    }`}
                  >
                    {mood.emoji} {mood.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 glass-card rounded-full text-cosmic-cyan hover:text-cosmic-magenta transition-colors"
          >
            <Camera className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 glass-card rounded-full text-cosmic-cyan hover:text-cosmic-magenta transition-colors"
          >
            <Mic className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 glass-card rounded-full text-cosmic-cyan hover:text-cosmic-magenta transition-colors"
          >
            <Image className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 glass-card rounded-full text-cosmic-cyan hover:text-cosmic-magenta transition-colors"
          >
            <Smile className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="flex items-center space-x-3">
          {isExpanded && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsExpanded(false);
                setContent('');
                setSelectedMood(null);
              }}
              className="p-2 glass-card rounded-full text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePost}
            disabled={!content.trim()}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              content.trim()
                ? 'cosmic-gradient text-white shadow-lg hover:shadow-xl'
                : 'glass-card text-gray-400 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Send className="w-4 h-4" />
              <span>Share</span>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CreatePost;