import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share, Bookmark, MoreVertical, Play, Pause, Volume2 } from 'lucide-react';
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

  const reactions = ['❤️', '🔥', '✨', '🤯', '💫', '🌟'];
  const moodColors = {
    cosmic: 'from-cosmic-cyan to-cosmic-magenta',
    focused: 'from-blue-500 to-purple-500',
    creative: 'from-pink-500 to-orange-500',
    chill: 'from-green-400 to-blue-500',
  };

  const handleLike = () => {
    setLiked(!liked);
    setShowReactions(true);
    setTimeout(() => setShowReactions(false), 1000);
  };

  const handleVoicePlay = () => {
    setIsPlayingVoice(!isPlayingVoice);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="glass-card p-6 rounded-2xl border border-glass-white-20 transition-all duration-300 hover:border-cosmic-cyan/50 hover:shadow-2xl hover:shadow-cosmic-cyan/20 relative overflow-hidden group"
    >
      {/* AI Insight Banner */}
      {post.aiInsight && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-0 left-0 right-0 bg-gradient-to-r from-cosmic-cyan/20 to-cosmic-magenta/20 p-2 text-center backdrop-blur-sm"
        >
          <span className="text-xs text-white font-medium flex items-center justify-center gap-2">
            🧠 {post.aiInsight}
          </span>
        </motion.div>
      )}

      {/* Floating Particles on Hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cosmic-cyan rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
            }}
            animate={{
              y: [-10, -20, -10],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4" style={{ marginTop: post.aiInsight ? '20px' : '0' }}>
        <div className="flex items-center space-x-3">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="relative"
          >
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-cosmic-cyan/50"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cosmic-cyan/30 to-transparent animate-pulse-glow"></div>
          </motion.div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-white">{post.author.name}</h3>
              {post.author.verified && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-cosmic-cyan text-sm animate-pulse"
                >
                  ✓
                </motion.span>
              )}
            </div>
            <p className="text-sm text-gray-400">{post.timestamp}</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 hover:bg-glass-white-20 rounded-full transition-colors"
        >
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="mb-4">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white leading-relaxed mb-3"
        >
          {post.content}
        </motion.p>
        
        {/* Mood Tag */}
        {post.mood && (
          <motion.span
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.05 }}
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${moodColors[post.mood as keyof typeof moodColors] || 'from-gray-500 to-gray-600'} shadow-lg`}
          >
            #{post.mood}
          </motion.span>
        )}
      </div>

      {/* Voice Note */}
      {post.hasVoiceNote && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4 p-3 glass-card rounded-xl border border-cosmic-cyan/30"
        >
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleVoicePlay}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-cosmic-cyan to-cosmic-magenta flex items-center justify-center"
            >
              {isPlayingVoice ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white ml-0.5" />
              )}
            </motion.button>
            
            {/* Waveform Animation */}
            <div className="flex-1 flex items-center space-x-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-cosmic-cyan rounded-full"
                  animate={{
                    height: isPlayingVoice 
                      ? [4, Math.random() * 20 + 4, 4]
                      : 4,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: isPlayingVoice ? Infinity : 0,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
            
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <Volume2 className="w-3 h-3" />
              <span>{post.voiceNoteDuration || 15}s</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Image */}
      {post.image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          className="mb-4 rounded-xl overflow-hidden"
        >
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-64 object-cover transition-transform duration-300"
          />
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* Like Button with Reactions */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-colors ${
                liked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{post.likes + (liked ? 1 : 0)}</span>
            </motion.button>
            
            {/* Reaction Particles */}
            <AnimatePresence>
              {showReactions && (
                <div className="absolute -top-8 left-0">
                  {reactions.map((reaction, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, y: 0, x: 0, opacity: 1 }}
                      animate={{ 
                        scale: [0, 1.2, 0],
                        y: -30 - Math.random() * 20,
                        x: (Math.random() - 0.5) * 40,
                        opacity: [1, 1, 0],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="absolute text-lg"
                    >
                      {reaction}
                    </motion.span>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-gray-400 hover:text-cosmic-cyan transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{post.comments}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center space-x-2 text-gray-400 hover:text-cosmic-magenta transition-colors"
          >
            <Share className="w-5 h-5" />
            <span className="text-sm font-medium">{post.shares}</span>
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSaved(!saved)}
          className={`p-2 rounded-full transition-colors ${
            saved ? 'text-cosmic-cyan' : 'text-gray-400 hover:text-cosmic-cyan'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
        </motion.button>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-glass-white-20"
          >
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <img
                  src="https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?w=50"
                  alt="Commenter"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm text-white">Amazing post! Love the cosmic vibes ✨</p>
                  <p className="text-xs text-gray-400 mt-1">2h ago</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default PostCard;