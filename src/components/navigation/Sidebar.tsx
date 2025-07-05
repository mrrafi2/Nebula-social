import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Compass, 
  Sparkles, 
  Users, 
  Image, 
  Bookmark, 
 Calendar,
 Trophy,
 ShoppingBag,
 
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  
}

 export const sidebarItems = [
  { id: 'feed', icon: Home, label: 'Feed' },
  { id: 'explore', icon: Compass, label: 'Explore' },
  { id:'ai-suggestions', icon:Sparkles, label:'AI Suggestions'},
  { id: 'communities', icon: Users, label: 'Communities' },
  { id: 'media-vault', icon: Image, label: 'Media Vault' },
  { id: 'saved', icon: Bookmark, label: 'Saved' },
  { id: 'marketplace', icon: ShoppingBag, label: 'Marketplace' },  
  { id: 'events', icon: Calendar, label: 'Events' },      
  { id: 'challenges', icon: Trophy, label: 'Challenges' },  
];

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-fit glass-card border-r border-glass-white-20 p-4"
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
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'bg-cosmic-violet/70 text-white shadow-lg'
                    : 'glass-card text-gray-300 hover:text-white hover:bg-glass-white-20'
                }`}
              >
                <IconComponent className="w-5 h-5" />
              </motion.button>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-[17%] transform -translate-y-1/2 w-1 h-8 cosmic-gradient rounded-r-full -ml-4"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              
              {/* Tooltip */}
               <div
                 className="absolute left-16 top-1/2 transform -translate-y-1/2 glass-card px-3 py-2 rounded-lg text-sm text-white whitespace-nowrap
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto z-50"
               >
                    {item.label}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-1 w-2 h-2 cosmic-gradient rotate-45" />
                </div>
            </motion.div>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Sidebar;