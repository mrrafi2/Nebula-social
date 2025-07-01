import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TopNavigation from './components/navigation/TopNavigation';
import Sidebar from './components/navigation/Sidebar';
import BottomNavigation from './components/navigation/BottomNavigation';
import MainFeed from './components/feed/MainFeed';
import RightSidebar from './components/sidebar/RightSidebar';
import ChatWidget from './components/chat/ChatWidget';
import FloatingBackground from './components/ui/FloatingBackground';
import { useMediaQuery } from './hooks/useMediaQuery';

function App() {
  const [activeSection, setActiveSection] = useState('feed');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="min-h-screen bg-cosmic-purple relative overflow-hidden bg-float">
      <FloatingBackground />
      
      {/* Top Navigation */}
      <TopNavigation />
      
      <div className="flex pt-16">
        {/* Left Sidebar - Desktop only */}
        {!isMobile && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed left-0 top-16 h-full w-20 z-30"
          >
            <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
          </motion.div>
        )}
        
        {/* Main Content */}
        <div className={`flex-1 ${!isMobile ? 'ml-20' : ''}`}>
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Feed */}
              <div className="lg:col-span-3">
                <MainFeed activeSection={activeSection} />
              </div>
              
              {/* Right Sidebar - Desktop only */}
              {!isMobile && (
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="lg:col-span-1"
                >
                  <RightSidebar />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation - Mobile only */}
      {isMobile && (
        <BottomNavigation 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
          onChatToggle={() => setIsChatOpen(!isChatOpen)} 
        />
      )}
      
      {/* Chat Widget */}
      <ChatWidget isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
}

export default App;