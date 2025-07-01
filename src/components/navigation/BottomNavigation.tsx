import React from 'react';
import { motion } from 'framer-motion';
import { Home, Compass, Plus, MessageCircle, User } from 'lucide-react';

interface BottomNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onChatToggle: () => void;
}

const bottomNavItems = [
  { id: 'feed', icon: Home, label: 'Home' },
  { id: 'explore', icon: Compass, label: 'Explore' },
  { id: 'create', icon: Plus, label: 'Create' },
  { id: 'chat', icon: MessageCircle, label: 'Chat' },
  { id: 'profile', icon: User, label: 'Profile' },
];

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeSection, 
  onSectionChange, 
  onChatToggle 
}) => {
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-glass-white-20 px-4 py-2"
    >
      <div className="flex justify-around items-center max-w-md mx-auto">
        {bottomNavItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (item.id === 'chat') {
                  onChatToggle();
                } else {
                  onSectionChange(item.id);
                }
              }}
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'text-cosmic-cyan'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className={`p-2 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'cosmic-gradient shadow-lg' 
                  : 'hover:bg-glass-white-20'
              }`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <span className="text-xs mt-1 font-medium">{item.label}</span>
              
              {isActive && (
                <motion.div
                  layoutId="mobileActiveIndicator"
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 cosmic-gradient rounded-b-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;