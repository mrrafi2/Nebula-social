import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share, Bookmark, MoreVertical, Play, Pause, Volume2, Eye, Zap } from 'lucide-react';
import { Post } from '../../types/Post';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Memoized values for performance
  const reactions = useMemo(() => ['❤️', '🔥', '✨', '🤯', '💫', '🌟'], []);
  const moodColors = useMemo(() => ({
    cosmic: 'from-cosmic-cyan to-cosmic-magenta',
    focused: 'from-blue-500 to-purple-500',
    creative: 'from-pink-500 to-orange-500',
    chill: 'from-green-400 to-blue-500',
  }), []);

  // Optimized event handlers
  const handleLike = useCallback(() => {
    setLiked(prev => !prev);
    setShowReactions(true);
    setTimeout(() => setShowReactions(false), 1200);
  }, []);

  const handleVoicePlay = useCallback(() => {
    setIsPlayingVoice(prev => !prev);
  }, []);

  const toggleComments = useCallback(() => {
    setShowComments(prev => !prev);
  }, []);

  const toggleSaved = useCallback(() => {
    setSaved(prev => !prev);
  }, []);

  // Animation variants for performance
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -4, scale: 1.01 },
  };

  const particleVariants = {
    animate: {
      y: [-10, -25, -10],
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative w-full max-w-2xl mx-auto mb-4 sm:mb-6 lg:mb-8"
    >
      {/* Main Card Container */}
      <div className="glass-card rounded-xl sm:rounded-2xl border border-glass-white-20 overflow-hidden transition-all duration-300 hover:border-cosmic-cyan/50 hover:shadow-2xl hover:shadow-cosmic-cyan/10 group">
        
        {/* AI Insight Banner */}
        <AnimatePresence>
          {post.aiInsight && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gradient-to-r from-cosmic-cyan/15 to-cosmic-magenta/15 backdrop-blur-sm border-b border-glass-white-10"
            >
              <div className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
                <div className="flex items-center justify-center gap-2 text-center">
                 
                  <span className="text-xs sm:text-sm text-white font-medium">
                    {post.aiInsight}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cosmic-cyan rounded-full"
              style={{
                top: `${25 + i * 20}%`,
                left: `${15 + i * 20}%`,
              }}
              variants={particleVariants}
              animate="animate"
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Card Content */}
        <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
          
          {/* Header Section */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Avatar */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative flex-shrink-0"
              >
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-cosmic-cyan/30 transition-all duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cosmic-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
              
              {/* Author Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white text-sm sm:text-base truncate">
                    {post.author.name}
                  </h3>
                  {post.author.verified && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-cosmic-cyan text-sm flex-shrink-0"
                    >
                      ✓
                    </motion.span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-400">{post.timestamp}</p>
              </div>
            </div>
            
            {/* More Options */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-glass-white-20 rounded-full transition-colors flex-shrink-0"
            >
              <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            </motion.button>
          </div>

          {/* Content Section */}
          <div className="space-y-3">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-white leading-relaxed text-sm sm:text-base mb-3">
                {post.content}
              </p>
              
              {/* Mood Tag */}
              {post.mood && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${moodColors[post.mood as keyof typeof moodColors] || 'from-gray-500 to-gray-600'} shadow-lg`}
                >
                  #{post.mood}
                </motion.span>
              )}
            </motion.div>

            {/* Voice Note */}
            <AnimatePresence>
              {post.hasVoiceNote && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-3 sm:p-4 glass-card rounded-xl border border-cosmic-cyan/20"
                >
                  <div className="flex items-center gap-3">
                    {/* Play Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleVoicePlay}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-cosmic-cyan to-cosmic-magenta flex items-center justify-center flex-shrink-0"
                    >
                      {isPlayingVoice ? (
                        <Pause className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      ) : (
                        <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white ml-0.5" />
                      )}
                    </motion.button>
                    
                    {/* Waveform */}
                    <div className="flex-1 flex items-center gap-0.5 sm:gap-1 overflow-hidden">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-0.5 sm:w-1 bg-cosmic-cyan rounded-full"
                          animate={{
                            height: isPlayingVoice 
                              ? [3, Math.random() * 16 + 4, 3]
                              : 3,
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: isPlayingVoice ? Infinity : 0,
                            delay: i * 0.05,
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Duration */}
                    <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                      <Volume2 className="w-3 h-3" />
                      <span>{post.voiceNoteDuration || 15}s</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Image */}
            <AnimatePresence>
              {post.image && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative rounded-xl overflow-hidden bg-gray-800"
                >
                  {/* Loading Placeholder */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
                  )}
                  
                  <motion.img
                    src={post.image}
                    alt="Post content"
                    className={`w-full h-48 sm:h-64 lg:h-72 object-cover transition-all duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                    loading="lazy"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Actions Section */}
          <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-glass-white-10">
            {/* Left Actions */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Like Button */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 sm:gap-2 transition-colors ${
                    liked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${liked ? 'fill-current' : ''}`} />
                  <span className="text-xs sm:text-sm font-medium">
                    {(post.likes + (liked ? 1 : 0)).toLocaleString()}
                  </span>
                </motion.button>
                
                {/* Reaction Particles */}
                <AnimatePresence>
                  {showReactions && (
                    <div className="absolute -top-6 sm:-top-8 left-0">
                      {reactions.map((reaction, i) => (
                        <motion.span
                          key={i}
                          initial={{ scale: 0, y: 0, x: 0, opacity: 1 }}
                          animate={{ 
                            scale: [0, 1, 0],
                            y: -20 - Math.random() * 15,
                            x: (Math.random() - 0.5) * 30,
                            opacity: [1, 1, 0],
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="absolute text-sm sm:text-base"
                        >
                          {reaction}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Comment Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleComments}
                className="flex items-center gap-1.5 sm:gap-2 text-gray-400 hover:text-cosmic-cyan transition-colors"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">
                  {post.comments.toLocaleString()}
                </span>
              </motion.button>

              {/* Share Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 sm:gap-2 text-gray-400 hover:text-cosmic-magenta transition-colors"
              >
                <Share className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">
                  {post.shares.toLocaleString()}
                </span>
              </motion.button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Views Counter */}
              <div className="flex items-center gap-1 text-gray-400">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs">
                  {((post.likes + post.comments + post.shares) * 3.2).toFixed(0)}k
                </span>
              </div>

              {/* Save Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSaved}
                className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                  saved ? 'text-cosmic-cyan bg-cosmic-cyan/10' : 'text-gray-400 hover:text-cosmic-cyan hover:bg-cosmic-cyan/5'
                }`}
              >
                <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 ${saved ? 'fill-current' : ''}`} />
              </motion.button>
            </div>
          </div>

          {/* Comments Section */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="pt-3 sm:pt-4 border-t border-glass-white-10"
              >

                <div className="space-y-5">
                  {/* Comment Input */}
                  <div className="flex items-center gap-3 pt-2">
                    <img
                      src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=50"
                      alt="Your avatar"
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0"
                      loading="lazy"
                    />
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="flex-1 bg-glass-white-10 border border-glass-white-20 rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cosmic-cyan/50 transition-all"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-2 bg-cosmic-cyan text-black rounded-lg text-xs sm:text-sm font-medium transition-colors hover:bg-cosmic-cyan/90"
                      >
                        Post
                      </motion.button>
                    </div>
                  </div>

                  {/* Sample Comment */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-3"
                  >
                    <img
                      src="https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?w=50"
                      alt="Commenter"
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="bg-glass-white-10 rounded-lg p-2 sm:p-3">
                        <p className="text-xs sm:text-sm text-white">
                          Amazing post! Love it ✨
                        </p>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 ml-2 sm:ml-3">2h ago</p>
                    </div>
                  </motion.div>

                  
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
};

export default PostCard;