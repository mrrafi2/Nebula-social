import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Settings, User, Sparkles } from 'lucide-react';
import Logo from '../../assets/logo.png'
import { useScrollDirection } from '../../hooks/useScrollDirection';


const TopNavigation: React.FC = () => {
  const [notifications] = useState(3);
   const scrollDir = useScrollDirection();

  return (
    <motion.header
      initial={false}
      animate={ scrollDir === 'down'
        ? { y: -100, opacity: 0 }
        : { y:   0, opacity: 1 } }
      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
      className="top-nav fixed top-0 left-0 right-0 z-50 glass-card border-b border-glass-white-20  "
      style={{marginBottom:'2rem'}}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <motion.div
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className=" rounded-full flex items-start justify-start"
          >
              <img src={Logo} alt="Nebula" style={{width:'80px', position:"relative", left:"0px"}}/>
          </motion.div>
          
        </motion.div>

        
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