import React from 'react';
import { motion } from 'framer-motion';
import { Home, Compass, Users, Sparkles, MoreHorizontal } from 'lucide-react';
import { useScrollDirection } from '../../hooks/useScrollDirection';


interface BottomNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onChatToggle: () => void;
  onMoreToggle: () => void;
}



const bottomNavItems = [
  { id: 'feed', icon: Home,  },
  { id: 'explore', icon: Compass, },
  { id: 'communities', icon: Users, },  
  { id: 'nova', icon: Sparkles,  }, 
  { id: 'more', icon: MoreHorizontal,},
];

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeSection, 
  onSectionChange, 
  onChatToggle,
  onMoreToggle,
}) => {
  const scrollDir = useScrollDirection();

  return (
    <motion.nav
      initial={false}
      animate={ scrollDir === 'down'
         ? { y:  100, opacity: 0 }
         : { y:    0, opacity: 1 } }
      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
      className="bottom-nav fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-glass-white-20 px-4 py-1"
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
                } 
                else if (item.id === 'nova') {
                onSectionChange('nova'); 
               }
               else if (item.id === 'more') {
               onMoreToggle();
               }
               else {
                  onSectionChange(item.id);
                }
              }}
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className={`p-2 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-cosmic-violet/70 shadow-lg' 
                  : 'hover:bg-glass-white-20'
              }`}>
                <IconComponent className="w-5 h-5" />
              </div>
              
              
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;