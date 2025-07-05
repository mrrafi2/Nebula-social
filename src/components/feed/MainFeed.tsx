import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import AIInsights from './AIInsights';
import { Post } from '../../types/Post';

import { Bookmark,Users, Sparkles, Calendar, ShoppingBag, Play, Heart, MessageCircle, Share, Star, Clock, MapPin, Zap, TrendingUp, Palette, Brain, Rocket, Globe, Award, Target, Crown, Eye,
   Filter, Search, Grid, List, ChevronRight, Lightbulb, RefreshCw
} from "lucide-react";

import Lottie from 'lottie-react';
import Loading from '../../assets/loader.json';

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    if (activeSection !== 'feed') {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [activeSection]);

    
  // AI Suggestions Demo States
  const [contentDemo, setContentDemo] = useState({
    isRunning: false,
    currentIndex: 0,
    recommendations: [
      { title: 'Quantum Computing Breakthrough', engagement: 94, type: 'trending' },
      { title: 'AI Art Revolution', engagement: 87, type: 'creative' },
      { title: 'Space Tech Innovation', engagement: 91, type: 'science' },
    ]
  });

  const [peopleDemo, setPeopleDemo] = useState({
    isRunning: false,
    currentIndex: 0,
    suggestions: [
      { name: 'Dr. Sarah Chen', match: 96, field: 'Quantum AI', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100' },
      { name: 'Marcus Webb', match: 89, field: 'Space Tech', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100' },
      { name: 'Luna Park', match: 93, field: 'Digital Art', avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?w=100' },
    ]
  });

  const [trendsDemo, setTrendsDemo] = useState({
    isRunning: false,
    currentIndex: 0,
    trends: [
      { topic: '#QuantumAI', growth: '+156%', posts: '12.4k', momentum: 'rising' },
      { topic: '#CosmicArt', growth: '+89%', posts: '8.7k', momentum: 'hot' },
      { topic: '#SpaceCode', growth: '+234%', posts: '15.2k', momentum: 'exploding' },
    ]
  });

  const [insightsDemo, setInsightsDemo] = useState({
    isRunning: false,
    currentMetric: 0,
    metrics: [
      { label: 'Engagement Rate', value: 94, change: '+12%', color: 'text-green-400' },
      { label: 'Reach Score', value: 87, change: '+8%', color: 'text-blue-400' },
      { label: 'Influence Index', value: 91, change: '+15%', color: 'text-purple-400' },
    ]
  });

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

  // Demo control functions
  const startContentDemo = () => {
    setContentDemo(prev => ({ ...prev, isRunning: true }));
    const interval = setInterval(() => {
      setContentDemo(prev => ({
        ...prev,
        currentIndex: (prev.currentIndex + 1) % prev.recommendations.length
      }));
    }, 2000);
    
    setTimeout(() => {
      clearInterval(interval);
      setContentDemo(prev => ({ ...prev, isRunning: false }));
    }, 8000);
  };

  const startPeopleDemo = () => {
    setPeopleDemo(prev => ({ ...prev, isRunning: true }));
    const interval = setInterval(() => {
      setPeopleDemo(prev => ({
        ...prev,
        currentIndex: (prev.currentIndex + 1) % prev.suggestions.length
      }));
    }, 2500);
    
    setTimeout(() => {
      clearInterval(interval);
      setPeopleDemo(prev => ({ ...prev, isRunning: false }));
    }, 10000);
  };

  const startTrendsDemo = () => {
    setTrendsDemo(prev => ({ ...prev, isRunning: true }));
    const interval = setInterval(() => {
      setTrendsDemo(prev => ({
        ...prev,
        currentIndex: (prev.currentIndex + 1) % prev.trends.length
      }));
    }, 1800);
    
    setTimeout(() => {
      clearInterval(interval);
      setTrendsDemo(prev => ({ ...prev, isRunning: false }));
    }, 7200);
  };

  const startInsightsDemo = () => {
    setInsightsDemo(prev => ({ ...prev, isRunning: true }));
    const interval = setInterval(() => {
      setInsightsDemo(prev => ({
        ...prev,
        currentMetric: (prev.currentMetric + 1) % prev.metrics.length
      }));
    }, 2000);
    
    setTimeout(() => {
      clearInterval(interval);
      setInsightsDemo(prev => ({ ...prev, isRunning: false }));
    }, 8000);
  };


  const getSectionTitle = () => {
    switch (activeSection) {
      case 'feed': return 'Your Feed';
      case 'explore': return 'Explore Universe';
      case 'ai-suggestions': return 'AI Curated';
      case 'communities': return 'Cosmic Communities';
      case 'media-vault': return 'Media Galaxy';
      case 'saved': return 'Saved Treasures';
      case 'events': return 'Cosmic Events';
      case 'challenges': return 'Epic Challenges';
      case 'marketplace': return 'Cosmic Marketplace';
      default: return 'Your Cosmic Feed';
    }
  };

  const getSectionDescription = () => {
    switch (activeSection) {
      case 'feed': return 'AI-curated content that matches your cosmic vibe';
      case 'explore': return 'Discover trending content across the universe';
      case 'ai-suggestions': return 'Personalized recommendations powered by Nova AI';
      case 'communities': return 'Connect with like-minded cosmic travelers';
      case 'media-vault': return 'Your personal collection of cosmic memories';
      case 'saved': return 'Posts you\'ve bookmarked for later exploration';
      case 'events': return 'Upcoming cosmic gatherings and experiences';
      case 'challenges': return 'Community challenges to level up your cosmic journey';
      case 'marketplace': return 'Discover and trade cosmic artifacts';
      default: return 'Discover content curated by AI that matches your cosmic vibe';
    }
  };

    const photoIds = [
  1103970, 1438761, 267885, 3408744, 733872, 167699,  325185, 139829, 414612,
  414612,  712521, 210186, 1301585, 2719301,   459225, 91224,
  459301, 936759, 1468379, 325185, 2486168,  2904702, 1500628, 356378, 617278, 257360, 2891921, 3707991, 1216489, 205961, 325807, 1525041, 3015991,
];

const savedPhotoIds = [
   1510551, 1503023, 1502379, 1510574, 1510552,
  1502080, 1500628, 2379004, 1504120, 1505105, 774909,
];

const avatarPhotoIds = [
  1239295, 
  1239301, 
  1239302, 
  774909, 
  2379004, 
  774909, 
  220453,  
  614810, 
  415829,  
  774909,  
  733872, 
  
];


const marketplacePhotoIds = [
  11035380, 1768512, 11035370, 5082581, 1334598, 5083437,
  5082579, 4147812, 3394668, 11035362, 4610775, 10974354,
];

  const LoadingAnimation = () => (
    <div className="flex justify-center items-center py-20">
<div className="w-24 h-24">
<Lottie
animationData={Loading}
loop={true}
autoplay={true}
className="w-full h-full"
/>
</div>
</div>
  );

  const getSectionContent = () => {
    if (loading) {
      return <LoadingAnimation />;
    }

    switch (activeSection) {
      case 'explore':
        return (
          <div className="space-y-6">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['all', 'trending', 'art', 'tech', 'music', 'space'].map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filterCategory === category
                      ? 'bg-cosmic-electric-blue/20 text-cosmic-electric-blue shadow-lg'
                      : 'glass-card text-gray-300 hover:text-white'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </div>

            {/* Trending Stories */}
            <div className="glass-card p-6 rounded-2xl mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cosmic-neon-pink" />
                Trending Now
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'AI Art Revolution', views: '2.4M', trend: '+45%',  icon: Palette },
                  { title: 'Nuclear War', views: '1.8M', trend: '+32%', icon: Rocket},
                  { title: 'Neural Networks', views: '1.2M', trend: '+28%', icon: Brain},
                ].map((story, i) => {
                  const IconComponent = story.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="p-4 glass-card rounded-xl border border-glass-white-20 hover:border-cosmic-neon-pink/50 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-cosmic-neon-pink rounded-full flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{story.title}</h4>
                          <p className="text-xs text-gray-400">{story.views} views</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-400 text-sm font-medium">{story.trend}</span>
                        <Eye className="w-4 h-4 text-gray-400" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Explore Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
                >
                  <div className="relative h-48 bg-gradient-to-br from-cosmic-purple via-cosmic-midnight to-cosmic-electric-blue">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-cosmic-cyan/20 backdrop-blur-sm text-cosmic-cyan text-xs rounded-full">
                        #{['cosmic', 'trending', 'featured'][i % 3]}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={`https://images.pexels.com/photos/${1239291 + i}/pexels-photo-${1239291 + i}.jpeg?w=40`}
                          alt="Creator"
                          className="w-8 h-8 rounded-full border-2 border-white/50"
                        />
                        <span className="text-white text-sm font-medium">Creator {i + 1}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-cosmic-cyan transition-colors">
                      Cosmic Discovery #{i + 1}
                    </h4>
                    <p className="text-gray-300 text-sm mb-3">
                      Exploring the infinite possibilities of the digital cosmos...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {234 + i * 12}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {45 + i * 3}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 glass-card rounded-full text-cosmic-cyan hover:text-white transition-colors"
                      >
                        <Play className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'ai-suggestions':
         return (
          <div className="space-y-6">
            {/* AI Insights Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 rounded-2xl border border-cosmic-cyan/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 cosmic-gradient rounded-full flex items-center justify-center"
                >
                  <Brain className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white">AI Recommendations</h3>
                  <p className="text-sm text-gray-400">Personalized content based on your cosmic journey</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Match Score', value: '94%', color: 'text-green-400' },
                  { label: 'New Suggestions', value: '12', color: 'text-cosmic-cyan' },
                  { label: 'Accuracy', value: '98.5%', color: 'text-cosmic-magenta' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center p-3 glass-card rounded-lg"
                  >
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Live Demos Section */}
            <div className="space-y-4">
              {/* Content Recommendations Demo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6 rounded-2xl border border-glass-white-20 hover:border-cosmic-cyan/50 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h5 className="text-white font-semibold mb-1 group-hover:text-cosmic-cyan transition-colors">
                          Content You'll Love
                        </h5>
                        <p className="text-gray-300 text-sm">AI-powered content recommendations</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startContentDemo}
                        disabled={contentDemo.isRunning}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          contentDemo.isRunning 
                            ? 'bg-green-500 text-white' 
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        {contentDemo.isRunning ? (
                          <div className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <RefreshCw className="w-4 h-4" />
                            </motion.div>
                            Running
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Play className="w-4 h-4" />
                            Explore
                          </div>
                        )}
                      </motion.button>
                    </div>
                    
                    {/* Demo Content */}
                    <div className="bg-gray-800/50 rounded-lg p-4 min-h-[120px]">
                      <AnimatePresence mode="wait">
                        {contentDemo.isRunning ? (
                          <motion.div
                            key={contentDemo.currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <h6 className="text-white font-medium">
                                {contentDemo.recommendations[contentDemo.currentIndex].title}
                              </h6>
                              <span className="text-green-400 text-sm font-bold">
                                {contentDemo.recommendations[contentDemo.currentIndex].engagement}% match
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                <span>{Math.floor(Math.random() * 500) + 100}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                <span>{Math.floor(Math.random() * 100) + 20}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <span>{Math.floor(Math.random() * 1000) + 500}</span>
                              </div>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${contentDemo.recommendations[contentDemo.currentIndex].engagement}%` }}
                                className="h-2 bg-gradient-to-r from-cosmic-cyan to-cosmic-magenta rounded-full"
                              />
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-center h-full text-gray-400"
                          >
                            <div className="text-center">
                              <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">Click "Explore" to see AI content recommendations in action</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* People Suggestions Demo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 rounded-2xl border border-glass-white-20 hover:border-cosmic-cyan/50 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h5 className="text-white font-semibold mb-1 group-hover:text-cosmic-cyan transition-colors">
                          Cosmic Connections
                        </h5>
                        <p className="text-gray-300 text-sm">People who share your cosmic vibe</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startPeopleDemo}
                        disabled={peopleDemo.isRunning}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          peopleDemo.isRunning 
                            ? 'bg-green-500 text-white' 
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      >
                        {peopleDemo.isRunning ? (
                          <div className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <RefreshCw className="w-4 h-4" />
                            </motion.div>
                            Running
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Play className="w-4 h-4" />
                            Explore
                          </div>
                        )}
                      </motion.button>
                    </div>
                    
                    {/* Demo Content */}
                    <div className="bg-gray-800/50 rounded-lg p-4 min-h-[120px]">
                      <AnimatePresence mode="wait">
                        {peopleDemo.isRunning ? (
                          <motion.div
                            key={peopleDemo.currentIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex items-center gap-4"
                          >
                            <img
                              src={peopleDemo.suggestions[peopleDemo.currentIndex].avatar}
                              alt="User"
                              className="w-16 h-16 rounded-full object-cover border-2 border-cosmic-cyan"
                            />
                            <div className="flex-1">
                              <h6 className="text-white font-medium mb-1">
                                {peopleDemo.suggestions[peopleDemo.currentIndex].name}
                              </h6>
                              <p className="text-gray-400 text-sm mb-2">
                                {peopleDemo.suggestions[peopleDemo.currentIndex].field}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-cosmic-cyan text-sm font-bold">
                                  {peopleDemo.suggestions[peopleDemo.currentIndex].match}% match
                                </span>
                                <div className="flex-1 bg-gray-700 rounded-full h-2">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${peopleDemo.suggestions[peopleDemo.currentIndex].match}%` }}
                                    className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-center h-full text-gray-400"
                          >
                            <div className="text-center">
                              <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">Click "Explore" to see AI people suggestions</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Trending Topics Demo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6 rounded-2xl border border-glass-white-20 hover:border-cosmic-cyan/50 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h5 className="text-white font-semibold mb-1 group-hover:text-cosmic-cyan transition-colors">
                          Trending Topics
                        </h5>
                        <p className="text-gray-300 text-sm">What's hot in your universe</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startTrendsDemo}
                        disabled={trendsDemo.isRunning}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          trendsDemo.isRunning 
                            ? 'bg-green-500 text-white' 
                            : 'bg-orange-500 hover:bg-orange-600 text-white'
                        }`}
                      >
                        {trendsDemo.isRunning ? (
                          <div className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <RefreshCw className="w-4 h-4" />
                            </motion.div>
                            Running
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Play className="w-4 h-4" />
                            Explore
                          </div>
                        )}
                      </motion.button>
                    </div>
                    
                    {/* Demo Content */}
                    <div className="bg-gray-800/50 rounded-lg p-4 min-h-[120px]">
                      <AnimatePresence mode="wait">
                        {trendsDemo.isRunning ? (
                          <motion.div
                            key={trendsDemo.currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <h6 className="text-white font-medium text-lg">
                                {trendsDemo.trends[trendsDemo.currentIndex].topic}
                              </h6>
                              <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-yellow-400" />
                                <span className="text-yellow-400 text-sm font-bold">
                                  {trendsDemo.trends[trendsDemo.currentIndex].momentum}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">
                                {trendsDemo.trends[trendsDemo.currentIndex].posts} posts
                              </span>
                              <span className="text-green-400 font-bold">
                                {trendsDemo.trends[trendsDemo.currentIndex].growth}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-green-400" />
                              <div className="flex-1 bg-gray-700 rounded-full h-2">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: '85%' }}
                                  className="h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                                />
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-center h-full text-gray-400"
                          >
                            <div className="text-center">
                              <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">Click "Explore" to see trending topics analysis</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* AI Insights Demo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-6 rounded-2xl border border-glass-white-20 hover:border-cosmic-cyan/50 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h5 className="text-white font-semibold mb-1 group-hover:text-cosmic-cyan transition-colors">
                          Personal AI Insights
                        </h5>
                        <p className="text-gray-300 text-sm">Your cosmic performance metrics</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startInsightsDemo}
                        disabled={insightsDemo.isRunning}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          insightsDemo.isRunning 
                            ? 'bg-green-500 text-white' 
                            : 'bg-purple-500 hover:bg-purple-600 text-white'
                        }`}
                      >
                        {insightsDemo.isRunning ? (
                          <div className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <RefreshCw className="w-4 h-4" />
                            </motion.div>
                            Running
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Play className="w-4 h-4" />
                            Explore
                          </div>
                        )}
                      </motion.button>
                    </div>
                    
                    {/* Demo Content */}
                    <div className="bg-gray-800/50 rounded-lg p-4 min-h-[120px]">
                      <AnimatePresence mode="wait">
                        {insightsDemo.isRunning ? (
                          <motion.div
                            key={insightsDemo.currentMetric}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-4"
                          >
                            <div className="text-center">
                              <h6 className="text-white font-medium mb-2">
                                {insightsDemo.metrics[insightsDemo.currentMetric].label}
                              </h6>
                              <div className="flex items-center justify-center gap-3">
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className={`text-3xl font-bold ${insightsDemo.metrics[insightsDemo.currentMetric].color}`}
                                >
                                  {insightsDemo.metrics[insightsDemo.currentMetric].value}%
                                </motion.div>
                                <div className="flex items-center gap-1 text-green-400">
                                  <TrendingUp className="w-4 h-4" />
                                  <span className="text-sm font-medium">
                                    {insightsDemo.metrics[insightsDemo.currentMetric].change}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-3">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${insightsDemo.metrics[insightsDemo.currentMetric].value}%` }}
                                className={`h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full`}
                              />
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-center h-full text-gray-400"
                          >
                            <div className="text-center">
                              <Lightbulb className="w-8 h-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">Click "Explore" to see your AI insights</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Explore All Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center pt-6"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-cosmic-neon-pink rounded-2xl text-white font-semibold shadow-2xl hover:shadow-cosmic-neon-pink/25 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <Rocket className="w-5 h-5 group-hover:animate-bounce" />
                    <span>Explore All AI Features</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </div>
        );

      case 'communities':
        return (
          <div className="space-y-6">
            {/* Community Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Communities', value: '1,247', icon: Users, color: 'text-cosmic-cyan' },
                { label: 'Your Communities', value: '23', icon: Star, color: 'text-cosmic-magenta' },
                { label: 'Active Members', value: '45.2k', icon: Zap, color: 'text-green-400' },
                { label: 'New This Week', value: '156', icon: TrendingUp, color: 'text-yellow-400' },
              ].map((stat, i) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-4 rounded-xl text-center"
                  >
                    <IconComponent className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                    <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Featured Communities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'AI Artists Collective', members: '12.4k', category: 'Art', activity: 'Very Active', color: 'from-pink-500 to-purple-500' },
                { name: 'Cosmic Coders', members: '8.7k', category: 'Tech', activity: 'Active', color: 'from-blue-500 to-cyan-500' },
                { name: 'Space Explorers', members: '15.2k', category: 'Science', activity: 'Very Active', color: 'from-purple-500 to-indigo-500' },
                { name: 'Digital Nomads', members: '6.3k', category: 'Lifestyle', activity: 'Moderate', color: 'from-green-500 to-teal-500' },
                { name: 'Synthwave Society', members: '9.1k', category: 'Music', activity: 'Active', color: 'from-orange-500 to-red-500' },
                { name: 'Future Thinkers', members: '11.8k', category: 'Philosophy', activity: 'Very Active', color: 'from-yellow-500 to-orange-500' },
              ].map((community, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
                >
                  <div className={`h-24 bg-gradient-to-r ${community.color} relative`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full ${
                        community.activity === 'Very Active' ? 'bg-green-500/20' : 
                        community.activity === 'Active' ? 'bg-yellow-500/20' : 'bg-gray-500/20'
                      }`}>
                        {community.activity}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-white group-hover:text-cosmic-cyan transition-colors">
                        {community.name}
                      </h4>
                      <Users className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-400">{community.members} members</span>
                      <span className="px-2 py-1 bg-cosmic-cyan/20 text-cosmic-cyan text-xs rounded-full">
                        {community.category}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-2 bg-blue-500 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all"
                    >
                      Join Community
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'media-vault':
        return (
          <div className="space-y-6">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select className="glass-card px-3 py-2 text-gray-400 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmic-cyan/50">
                  <option>All Media</option>
                  <option>Images</option>
                  <option>Videos</option>
                  <option>Audio</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid' ? 'bg-cosmic-violet text-white' : 'glass-card text-gray-400'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list' ? 'bg-cosmic-violet text-white' : 'glass-card text-gray-400'
                  }`}
                >
                  <List className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

          


            {/* Media Grid */}
            <div className={`grid gap-4 ${
              viewMode === 'grid' 
                ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' 
                : 'grid-cols-1'
            }`}>
             {photoIds.map((id, i) => (
    <motion.div
      key={id}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: i * 0.05 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`relative overflow-hidden rounded-xl glass-card shadow-lg hover:shadow-2xl transition-all group cursor-pointer ${
        viewMode === 'list' ? 'flex items-center p-4' : ''
      }`}
    >
      <img
        src={`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?w=300`}
        alt={`Media ${i}`}
        className={`object-cover ${
          viewMode === 'grid' ? 'w-full h-32' : 'w-16 h-16 rounded-lg mr-4'
        }`}
        onError={(e) => {
          e.currentTarget.src = '/fallback.jpg'; // Optional fallback
        }}
      />
                  <div className={`${
                    viewMode === 'grid' 
                      ? 'absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-3'
                      : 'flex-1'
                  }`}>
                    <div className={`${viewMode === 'grid' ? 'text-white' : 'text-gray-300'}`}>
                      <p className={`font-medium ${viewMode === 'grid' ? 'text-sm' : 'text-base'}`}>
                        Media File #{i + 1}
                      </p>
                      <p className={`text-xs ${viewMode === 'grid' ? 'text-gray-200' : 'text-gray-400'}`}>
                        {['Image', 'Video', 'Audio'][i % 3]} • {Math.floor(Math.random() * 30) + 1} days ago
                      </p>
                    </div>
                    {viewMode === 'list' && (
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 glass-card rounded-full text-cosmic-cyan hover:text-white transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 glass-card rounded-full text-cosmic-magenta hover:text-white transition-colors"
                        >
                          <Share className="w-4 h-4" />
                        </motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'saved':
        return (
          <div className="space-y-6">
            {/* Saved Collections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { name: 'AI Art', count: 23, },
                { name: 'Space Tech', count: 15, },
                { name: 'Inspiration', count: 31, },
              ].map((collection, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-4 rounded-xl cursor-pointer transition-all hover:border-blue-600/50"

                >
                 
                  <h4 className="text-white font-medium">{collection.name}</h4>
                  <p className="text-gray-400 text-sm">{collection.count} items</p>
                </motion.div>
              ))}
            </div>

            {/* Saved Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {savedPhotoIds.map((id, i) => (
  <motion.div
    key={id}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: i * 0.1 }}
    whileHover={{ scale: 1.02, y: -5 }}
    className="glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
  >
    <img
      src={`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?w=400`}
      alt={`Saved ${i + 1}`}
      onError={(e) => e.currentTarget.src = '/fallback.jpg'}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <img
          src={`https://images.pexels.com/photos/${avatarPhotoIds[i]}/pexels-photo-${avatarPhotoIds[i]}.jpeg?w=40`}
          alt="Author"
          onError={(e) => e.currentTarget.src = '/avatar-fallback.png'}
          className="w-6 h-6 rounded-full"
        />
                      <span className="text-gray-400 text-sm">Creator {i + 1}</span>
                    </div>
                    <h4 className="text-white font-semibold mb-2 group-hover:text-cosmic-cyan transition-colors">
                      Saved Post #{i + 1}
                    </h4>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      This amazing post caught your attention and you saved it for later exploration...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Saved {Math.floor(Math.random() * 30) + 1} days ago
                      </span>
                      <Bookmark className="w-4 h-4 text-cosmic-cyan" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="space-y-6">
            {/* Event Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['All', 'Virtual', 'Meetups', 'Workshops', 'Conferences'].map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 glass-card rounded-full text-sm text-gray-300 hover:text-white hover:bg-orange-500/30 transition-all"
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Featured Event */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 rounded-2xl border border-orange-500/30 mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-none rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Featured Event</h3>
                  <p className="text-sm text-gray-400">Don't miss this cosmic gathering</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Cosmic AI Summit 2025</h4>
                  <p className="text-gray-300 mb-4">
                    Join the biggest gathering of AI enthusiasts and cosmic thinkers. Explore the future of artificial intelligence and its impact on humanity.
                  </p>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>March 15-17, 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Virtual & San Francisco</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>2,500+ attendees expected</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-orange-500 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all mb-3"
                  >
                    Register Now
                  </motion.button>
                  <p className="text-center text-sm text-gray-400">Early bird: $299 (Save 40%)</p>
                </div>
              </div>
            </motion.div>

            {/* Events Calendar */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => {
                const eventTypes = ['Workshop', 'Meetup', 'Conference', 'Virtual'];
                const eventType = eventTypes[i % eventTypes.length];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-cosmic-cyan/20 text-cosmic-cyan text-xs rounded-full">
                          {eventType}
                        </span>
                        <Calendar className="w-5 h-5 text-gray-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-cosmic-cyan transition-colors">
                        {eventType} Event #{i + 1}
                      </h4>
                      <p className="text-gray-300 text-sm mb-4">
                        Join us for an amazing {eventType.toLowerCase()} experience in the cosmic community.
                      </p>
                      <div className="space-y-2 text-xs text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          <span>March {15 + i}, 2025 • 2:00 PM PST</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-3 h-3" />
                          <span>{Math.floor(Math.random() * 500) + 50} attending</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                       className="w-full py-2  rounded-lg bg-cosmic-electric-blue text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all"
                      >
                        RSVP
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );

      case 'challenges':
        return (
          <div className="space-y-6">
            {/* Challenge Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Active Challenges', value: '12', icon: Target, color: 'text-cosmic-cyan' },
                { label: 'Completed', value: '8', icon: Award, color: 'text-green-400' },
                { label: 'Your Rank', value: '#247', icon: Crown, color: 'text-cosmic-magenta' },
                { label: 'Points Earned', value: '1,250', icon: Star, color: 'text-yellow-400' },
              ].map((stat, i) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-4 rounded-xl text-center"
                  >
                    <IconComponent className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                    <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Challenge Timeline */}
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cosmic-cyan via-cosmic-magenta to-cosmic-cyan"></div>
              <div className="space-y-8">
                {[
                  { title: 'AI Art Creation Challenge', difficulty: 'Medium', reward: '500 pts', deadline: '3 days', status: 'active' },
                  { title: 'Code a Cosmic App', difficulty: 'Hard', reward: '1000 pts', deadline: '1 week', status: 'active' },
                  { title: 'Share Your Space Story', difficulty: 'Easy', reward: '200 pts', deadline: '2 days', status: 'completed' },
                  { title: 'Build a Neural Network', difficulty: 'Expert', reward: '2000 pts', deadline: '2 weeks', status: 'active' },
                  { title: 'Design a Cosmic UI', difficulty: 'Medium', reward: '750 pts', deadline: '5 days', status: 'active' },
                ].map((challenge, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative flex items-start gap-6"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                      challenge.status === 'completed' 
                        ? 'bg-green-500/80' 
                        : 'bg-yellow-400/80'
                    }`}>
                      {challenge.status === 'completed' ? (
                        <Award className="w-6 h-6 text-white" />
                      ) : (
                        <Target className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02, x: 10 }}
                      className={`flex-1 glass-card p-6 rounded-2xl border transition-all cursor-pointer ${
                        challenge.status === 'completed'
                          ? 'border-green-500/30 bg-green-500/5'
                          : 'border-glass-white-20 hover:border-cosmic-cyan/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-1">{challenge.title}</h4>
                          <div className="flex items-center gap-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              challenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                              challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              challenge.difficulty === 'Hard' ? 'bg-orange-500/20 text-orange-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {challenge.difficulty}
                            </span>
                            <span className="text-cosmic-cyan">{challenge.reward}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-400">{challenge.deadline} left</div>
                          {challenge.status === 'completed' && (
                            <div className="text-green-400 text-sm font-medium">Completed!</div>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-4">
                        Complete this challenge to earn points and unlock new cosmic abilities.
                      </p>
                      {challenge.status === 'active' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-2 bg-blue-500 rounded-lg text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all"
                        >
                          Start Challenge
                        </motion.button>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'marketplace':
        return (
          <div className="space-y-6">
            {/* Marketplace Header */}
            <div className="glass-card p-6 rounded-2xl border border-cosmic-magenta/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-8 h-8 text-cosmic-magenta" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Cosmic Marketplace</h3>
                    <p className="text-sm text-gray-400">Trade digital assets and cosmic artifacts</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-purple-500 rounded-lg text-white text-sm font-medium"
                >
                  Sell Item
                </motion.button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Total Sales', value: '$12.4k', color: 'text-green-400' },
                  { label: 'Items Listed', value: '156', color: 'text-cosmic-cyan' },
                  { label: 'Active Bids', value: '23', color: 'text-cosmic-magenta' },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-3 glass-card rounded-lg">
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['All', 'NFTs', 'Digital Art', 'Music', 'Code', 'Templates', 'Images', 'Web app'].map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 glass-card rounded-full text-sm text-gray-300 hover:text-white hover:bg-cosmic-magenta/20 transition-all"
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Marketplace Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {marketplacePhotoIds.map((id, i) => {
  const price = ((i + 1) * 0.1 + Math.random() * 0.5).toFixed(2);
  const itemTypes = ['NFT', 'Digital Art', 'Music', 'Smartphone', 'Tablet','Camera'];
  const itemType = itemTypes[i % itemTypes.length];

  return (
    <motion.div
      key={i}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: i * 0.05 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
    >
      <div className="relative">
        <img
          src={`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?w=400`}
          alt={`Marketplace Item ${i + 1}`}
          className="w-full h-48 object-cover"
        />
                      
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-cosmic-magenta/70 backdrop-blur-sm text-white text-xs rounded-full">
                          {itemType}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:text-cosmic-neon-pink transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={`https://images.pexels.com/photos/${1239291 + i}/pexels-photo-${1239291 + i}.jpeg?w=40`}
                          alt="Creator"
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-gray-400 text-sm">Creator {i + 1}</span>
                      </div>
                      <h4 className="text-white font-semibold mb-2 group-hover:text-cosmic-magenta transition-colors">
                         {itemType} #{i + 1}
                      </h4>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-bold">{price} ETH</span>
                        <span className="text-gray-400 text-sm">{Math.floor(Math.random() * 50) + 1} bids</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-2 bg-cosmic-electric-blue rounded-lg text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all"
                      >
                        Place Bid
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
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
    <div className="space-y-6 " style={{paddingBottom:"3rem"}} >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-2xl border border-glass-white-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ 
              background: [
                'radial-gradient(circle at 20% 50%, #00ffff 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, #ff00ff 0%, transparent 50%)',
                'radial-gradient(circle at 50% 20%, #00ffff 0%, transparent 50%)',
                'radial-gradient(circle at 50% 80%, #ff00ff 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="w-full h-full"
          />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
             
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {getSectionTitle()}
                </h1>
                <p className="text-gray-400 text-sm">
                  {getSectionDescription()}
                </p>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center gap-2" style={ {position:'relative', top:"-10px"}}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 glass-card rounded-lg text-gray-400 hover:text-cosmic-cyan transition-colors"
              >
                <Search className="w-5 h-5" />
              </motion.button>
             
            </div>
          </div>
          
         
        </div>
      </motion.div>

      {/* AI Insights - Only for feed */}
      {activeSection === 'feed' && <AIInsights />}

      {/* Create Post - Only for feed */}
      {activeSection === 'feed' && <CreatePost />}

      {/* Dynamic Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {getSectionContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MainFeed;