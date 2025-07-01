import React from 'react';
import { motion } from 'framer-motion';

const FloatingBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Animated blobs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%)',
          top: '10%',
          left: '5%',
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute w-72 h-72 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 0, 110, 0.3) 0%, transparent 70%)',
          bottom: '15%',
          right: '10%',
        }}
        animate={{
          y: [0, 40, 0],
          x: [0, -25, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      
      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.3) 0%, transparent 70%)',
          top: '60%',
          left: '70%',
        }}
        animate={{
          y: [0, -50, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
          delay: 4,
        }}
      />
      
      {/* Sparkle particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cosmic-cyan rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBackground;