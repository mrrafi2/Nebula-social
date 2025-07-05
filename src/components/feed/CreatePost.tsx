import React, { useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Mic, Image, Smile, Sparkles, Send, X, Plus, MapPin, Users, Hash } from 'lucide-react';

const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Memoized data for performance
  const moods = useMemo(() => [
    { emoji: '✨', name: 'cosmic', color: 'from-cosmic-cyan to-cosmic-magenta', description: 'Feeling the universe' },
    { emoji: '🎯', name: 'focused', color: 'from-blue-500 to-purple-500', description: 'Deep work mode' },
    { emoji: '🎨', name: 'creative', color: 'from-pink-500 to-orange-500', description: 'Artistic flow' },
    { emoji: '😌', name: 'chill', color: 'from-green-400 to-blue-500', description: 'Relaxed vibes' },
    { emoji: '🔥', name: 'energetic', color: 'from-red-500 to-yellow-500', description: 'High energy' },
    { emoji: '🌙', name: 'dreamy', color: 'from-purple-500 to-indigo-500', description: 'Lost in thought' },
  ], []);

  const aiSuggestions = useMemo(() => [
    "☀️ Good morning, world! Ready to seize the day? #RiseAndShine",
    "🎨 When creativity meets technology, magic happens...",
    "💡 Just had a lightbulb moment—excited to share this soon!",
  "🔥 Can’t stop, won’t stop—full steam ahead! #Hustle",
  "🎉 Celebrating small wins—every step counts! #Milestone",
  "❤️‍🔥 Feeling the love—grateful for each and every one of you.",
  "🌱 Growth is painful but worth it. Keep pushing forward!",
  "📸 Caught in the moment—life’s too beautiful not to snap it!",
  "☕ Powered by coffee and big dreams. Let’s do this!",
    "🚀 Ready to launch into another dimension of possibilities...",
  ], []);

  const quickActions = useMemo(() => [
    { icon: Camera, label: 'Photo', color: 'text-blue-400', bgColor: 'bg-blue-400/10' },
    { icon: Mic, label: 'Voice', color: 'text-green-400', bgColor: 'bg-green-400/10' },
    { icon: Image, label: 'Media', color: 'text-purple-400', bgColor: 'bg-purple-400/10' },
    { icon: MapPin, label: 'Location', color: 'text-red-400', bgColor: 'bg-red-400/10' },
    { icon: Users, label: 'Tag', color: 'text-yellow-400', bgColor: 'bg-yellow-400/10' },
    { icon: Hash, label: 'Topic', color: 'text-cyan-400', bgColor: 'bg-cyan-400/10' },
  ], []);

  // Optimized event handlers
  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setCharacterCount(value.length);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  const handleFocus = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const handlePost = useCallback(() => {
    if (content.trim()) {
      
      console.log('Creating post:', { content, mood: selectedMood });
      
      // Reset form
      setContent('');
      setCharacterCount(0);
      setIsExpanded(false);
      setSelectedMood(null);
      setShowAISuggestions(false);
      setShowAdvanced(false);
      
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  }, [content, selectedMood]);

  const handleCancel = useCallback(() => {
    setIsExpanded(false);
    setContent('');
    setCharacterCount(0);
    setSelectedMood(null);
    setShowAISuggestions(false);
    setShowAdvanced(false);
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, []);

  const selectSuggestion = useCallback((suggestion: string) => {
    setContent(suggestion);
    setCharacterCount(suggestion.length);
    setShowAISuggestions(false);
    
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  const selectMood = useCallback((moodName: string) => {
    setSelectedMood(prev => prev === moodName ? null : moodName);
  }, []);

  // Animation variants
  const containerVariants = {
    collapsed: { height: 'auto' },
    expanded: { height: 'auto' },
  };

  const contentVariants = {
    hidden: { opacity: 0, height: 0, y: -10 },
    visible: { opacity: 1, height: 'auto', y: 0 },
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
     layout="size"
      variants={containerVariants}
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
       onClick={handleFocus} 
      className="w-full max-w-2xl mx-auto mb-4 sm:mb-6 lg:mb-8 "
      style={{paddingBottom:"2rem"}}
    >
      <div className="glass-card rounded-xl sm:rounded-2xl border border-glass-white-20 overflow-hidden transition-all duration-300 hover:border-cosmic-cyan/30 hover:shadow-lg hover:shadow-cosmic-cyan/5"
       onClick={(e) => e.stopPropagation()}
      >
        
        {/* Main Content Area */}
        <div className="p-3 sm:p-4 lg:p-6">
          
          {/* Header Section */}
          <div className="flex items-start gap-3 sm:gap-4 mb-4">
            {/* User Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative flex-shrink-0"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cosmic-neon-pink rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm sm:text-base">You</span>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-cosmic-cyan/30 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </motion.div>
            
            {/* Text Input Area */}
            <div className="flex-1 min-w-0">
              <motion.textarea
                ref={textareaRef}
                value={content}
                onChange={handleContentChange}
                onFocus={handleFocus}
                placeholder="Share your thoughts..."
                className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none text-sm sm:text-base lg:text-lg leading-relaxed transition-all duration-300"
                rows={1}
                style={{ minHeight: '2.5rem' }}
                maxLength={500}
              />
              
              {/* Character Counter */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-between items-center mt-2"
                  >
                    <div className="text-xs text-gray-400">
                      {characterCount > 0 && (
                        <span className={characterCount > 1450 ? 'text-red-400' : 'text-gray-400'}>
                          {characterCount}/1500
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedMood && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-xs text-cosmic-cyan"
                        >
                          Mood: {moods.find(m => m.name === selectedMood)?.emoji} {selectedMood}
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="space-y-4 sm:space-y-6"
              >
                
                {/* AI Suggestions Section */}
                <div className="space-y-3">
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setShowAISuggestions(!showAISuggestions)}
                    className="flex items-center gap-2 text-cosmic-cyan hover:text-cosmic-magenta transition-colors group"
                  >
                  
                    <span className="text-sm sm:text-base font-medium">AI Caption Suggestions</span>
                  </motion.button>

                  <AnimatePresence>
                    {showAISuggestions && (
                      <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="grid gap-2 sm:gap-3"
                      >
                        {aiSuggestions.map((suggestion, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => selectSuggestion(suggestion)}
                            className="text-left p-3 sm:p-4 glass-card rounded-lg text-sm sm:text-base text-gray-300 hover:text-white hover:border-cosmic-cyan/50 transition-all duration-300 group"
                          >
                            <div className="flex items-start gap-3">
                              
                              <span className="leading-relaxed">{suggestion}</span>
                            </div>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mood Selection */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm sm:text-base text-gray-400 font-medium">Select your vibe:</h4>
                    {selectedMood && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => setSelectedMood(null)}
                        className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        Clear
                      </motion.button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {moods.map((mood, index) => (
                      <motion.button
                        key={mood.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => selectMood(mood.name)}
                        className={`relative p-2 sm:p-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 group ${
                          selectedMood === mood.name
                            ? `bg-gradient-to-r ${mood.color} text-white shadow-lg scale-105`
                            : 'glass-card text-gray-300 hover:text-white hover:border-cosmic-cyan/30'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-lg sm:text-xl">{mood.emoji}</span>
                          <span className="font-medium">{mood.name}</span>
                          <span className="text-xs opacity-70">{mood.description}</span>
                        </div>
                        
                        {selectedMood === mood.name && (
                          <motion.div
                            layoutId="selectedMood"
                            className="absolute inset-0 rounded-xl border-2 border-white/30"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="space-y-3">
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <motion.div
                      animate={{ rotate: showAdvanced ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.div>
                    <span className="text-sm font-medium">Advanced Options</span>
                  </motion.button>

                  <AnimatePresence>
                    {showAdvanced && (
                      <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3"
                      >
                        {quickActions.map((action, index) => {
                          const IconComponent = action.icon;
                          return (
                            <motion.button
                              key={action.label}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              variants={buttonVariants}
                              whileHover="hover"
                              whileTap="tap"
                              className={`p-3 sm:p-4 glass-card rounded-xl ${action.bgColor} ${action.color} hover:scale-105 transition-all duration-300 group`}
                            >
                              <div className="flex flex-col items-center gap-2">
                                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="text-xs font-medium">{action.label}</span>
                              </div>
                            </motion.button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 sm:pt-6">
            {/* Quick Actions - Always Visible */}
            <div className="flex items-center gap-2 sm:gap-3">
              {quickActions.slice(0, 4).map((action) => {
                const IconComponent = action.icon;
                return (
                  <motion.button
                    key={action.label}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className={`p-2 sm:p-3 glass-card rounded-full ${action.color} hover:${action.bgColor} transition-all duration-300`}
                    title={action.label}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                );
              })}
            </div>

            {/* Post Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {isExpanded && (
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleCancel}
                  className="p-2 sm:p-3 glass-card rounded-full text-gray-400 hover:text-white hover:bg-red-500/10 transition-all duration-300"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              )}
              
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handlePost}
                disabled={!content.trim()}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 ${
                  content.trim()
                    ? 'cosmic-gradient text-white shadow-lg hover:shadow-xl'
                    : 'glass-card text-gray-400 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">
                    {isExpanded ? 'Share' : 'Post'}
                  </span>
                </div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <AnimatePresence>
          {isExpanded && characterCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              className="h-1 bg-gradient-to-r from-cosmic-cyan via-cosmic-magenta to-cosmic-cyan"
              style={{
                transformOrigin: 'left',
                transform: `scaleX(${Math.min(characterCount / 500, 1)})`,
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default React.memo(CreatePost);
