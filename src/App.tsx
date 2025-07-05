import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TopNavigation from './components/navigation/TopNavigation';
import Sidebar from './components/navigation/Sidebar';
import {sidebarItems} from './components/navigation/Sidebar';
import BottomNavigation from './components/navigation/BottomNavigation';
import MainFeed from './components/feed/MainFeed';
import RightSidebar from './components/sidebar/RightSidebar';
import ChatWidget from './components/chat/ChatWidget';
import FloatingBackground from './components/ui/FloatingBackground';
import { useMediaQuery } from './hooks/useMediaQuery';
import {X} from "lucide-react";

function App() {
  const [activeSection, setActiveSection] = useState('feed');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1040px)');

  return (
  <div className="min-h-screen bg-cosmic-purple relative overflow-hidden bg-float">
    <FloatingBackground />

    {/* Top Navigation */}
    <TopNavigation />

    <div className="flex pt-16">
      {/* Left Sidebar – Desktop only */}
      {!isMobile && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed left-0 top-16 h-full w-20 z-30"
        >
          <Sidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
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

            {/* Right Sidebar – inline on md+ */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block lg:col-span-1"
            >
              <RightSidebar />
            </motion.div>
          </div>
        </div>
      </div>
    </div>

    {isMobile && activeSection === 'nova' && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="
          fixed inset-0
          bg-black/50 backdrop-blur-sm
          flex justify-end z-50
        "
      >
        <div className="w-5/5 sm:w-1/2 h-full bg-cosmic-purple p-4 overflow-auto">
          <RightSidebar />
        </div>
      </motion.div>
    )}

    {/* Bottom Navigation – Mobile only */}
    {isMobile && (
      <BottomNavigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onChatToggle={() => setIsChatOpen(!isChatOpen)}
        onMoreToggle={() => setIsMoreOpen(true)}

      />
    )}

    {/* Chat Widget */}
    <ChatWidget
      isOpen={isChatOpen}
      onToggle={() => setIsChatOpen(!isChatOpen)}
    />

{isMobile && isMoreOpen && (
  <motion.div
    initial={{ x: 300 }} animate={{ x: 0 }}
    exit={{ x: 300 }} transition={{ type: 'tween', duration: 0.3 }}
    className="fixed inset-y-0 right-0  bg-cosmic-purple p-4 z-50 shadow-2xl"
    style={{width:'230px'}}
  >
    {/* Close button */}
    <button
      onClick={() => setIsMoreOpen(false)}
      className="mb-4 text-gray-300 hover:text-white"
      style={{float:"right"}}
    >
      <X className='w-5 h-5'/>
    </button>

    <div className="space-y-4">
      {sidebarItems
        .filter((item) => !['feed','explore','communities','nova','more'].includes(item.id))
        .map((item: { id: string; icon: React.ComponentType<any>; label: string }) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveSection(item.id);
              setIsMoreOpen(false);
            }}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg ${
              activeSection === item.id
                ? 'bg-cosmic-violet/70 text-white'
                : 'text-gray-300 hover:bg-glass-white-20'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
    </div>
  </motion.div>
)}

  </div>
);

}

export default App;