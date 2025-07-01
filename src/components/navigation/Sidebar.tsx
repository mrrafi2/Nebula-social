import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Compass, 
  Sparkles, 
  Users, 
  Image, 
  Bookmark, 
  Settings, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sidebarItems = [
  { id: 'feed', icon: Home, label: 'Feed' },
  { id: 'explore', icon: Compass, label: 'Explore' },
  { id: 'ai-suggestions', icon: Sparkles, label: 'AI Suggestions' },
  { id: 'communities', icon: Users, label: 'Communities' },
  { id: 'media-vault', icon: Image, label: 'Media Vault' },
  { id: 'saved', icon: Bookmark, label: 'Saved' },
  { id: 'settings', icon: Settings, label: 'Settings' },
  { id: 'logout', icon: LogOut, label: 'Logout' },
];

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full glass-card border-r border-glass-white-20 p-4"
    >
      <div className="flex flex-col space-y-2">
        {sidebarItems.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <motion.div
              key={item.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative group"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onSectionChange(item.id)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'cosmic-gradient text-white shadow-lg'
                    : 'glass-card text-gray-300 hover:text-white hover:bg-glass-white-20'
                }`}
              >
                <IconComponent className="w-5 h-5" />
              </motion.button>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 cosmic-gradient rounded-r-full -ml-4"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute left-16 top-1/2 transform -translate-y-1/2 glass-card px-3 py-2 rounded-lg text-sm text-white whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 z-50"
              >
                {item.label}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-1 w-2 h-2 cosmic-gradient rotate-45"></div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Sidebar;