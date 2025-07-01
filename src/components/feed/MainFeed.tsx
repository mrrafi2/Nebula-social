import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import AIInsights from './AIInsights';
import { Post } from '../../types/Post';

interface MainFeedProps {
  activeSection: string;
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      id: '1',
      name: 'Nova Chen',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150',
      verified: true,
    },
    content: 'Just discovered this amazing cosmic phenomenon! The way light bends through time is absolutely mesmerizing ✨🌌',
    image: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?w=600',
    timestamp: '2 hours ago',
    likes: 234,
    comments: 45,
    shares: 12,
    mood: 'cosmic',
    aiInsight: 'This post resonates with your interest in space and science!',
  },
  {
    id: '2',
    author: {
      id: '2',
      name: 'Zara Malik',
      avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?w=150',
      verified: false,
    },
    content: 'Late night coding session with some ambient synthwave. There\'s something magical about creating in the digital void 💫',
    timestamp: '4 hours ago',
    likes: 156,
    comments: 28,
    shares: 8,
    mood: 'focused',
    aiInsight: 'Perfect match for your late-night creativity patterns!',
    hasVoiceNote: true,
  },
  {
    id: '3',
    author: {
      id: '3',
      name: 'Alex Rivera',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150',
      verified: true,
    },
    content: 'The intersection of AI and human creativity is where magic happens. Today I trained a model that can paint emotions 🎨',
    image: 'https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?w=600',
    timestamp: '6 hours ago',
    likes: 342,
    comments: 67,
    shares: 23,
    mood: 'creative',
    aiInsight: 'Aligns with your AI and creativity interests!',
  },
];

const MainFeed: React.FC<MainFeedProps> = ({ activeSection }) => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading new content when section changes
    if (activeSection !== 'feed') {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [activeSection]);

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'explore': return 'Explore Cosmic Vibes';
      case 'ai-suggestions': return 'AI Curated For You';
      case 'communities': return 'Your Communities';
      case 'media-vault': return 'Media Vault';
      case 'saved': return 'Saved Posts';
      default: return 'Your Cosmic Feed';
    }
  };

  const getSectionContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 cosmic-gradient rounded-full"
          />
        </div>
      );
    }

    switch (activeSection) {
      case 'explore':
      case 'ai-suggestions':
      case 'communities':
      case 'media-vault':
      case 'saved':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 cosmic-gradient rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Coming Soon</h3>
            <p className="text-gray-400">This cosmic feature is being crafted with AI magic!</p>
          </motion.div>
        );
      default:
        return posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <PostCard post={post} />
          </motion.div>
        ));
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-2xl"
      >
        <h1 className="text-2xl font-bold text-white neon-text mb-2">
          {getSectionTitle()}
        </h1>
        <p className="text-gray-400">
          Discover content curated by AI that matches your cosmic vibe
        </p>
      </motion.div>

      {/* AI Insights */}
      {activeSection === 'feed' && <AIInsights />}

      {/* Create Post */}
      {activeSection === 'feed' && <CreatePost />}

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {getSectionContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MainFeed;