'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChatMessage } from '@/types/chat';

interface FloatingChatBubbleProps {
  message: ChatMessage;
  position: { x: number; y: number };
}

export function FloatingChatBubble({ message, position }: FloatingChatBubbleProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-hide after 4 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale: 0.8, 
        y: 20
      }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.8, 
        y: -20 
      }}
      transition={{ 
        duration: 0.3, 
        ease: 'easeOut',
        delay: 0.1 
      }}
      className="fixed z-30 pointer-events-none"
      style={{
        left: `${position.x}vw`,
        top: `${position.y}vh`,
        transform: 'translate(-50%, -120%)', // Center horizontally, position well above
      }}
    >
      {/* Chat bubble */}
      <div className="relative max-w-xs">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-pink-200">
          {/* Username */}
          <div className="flex items-center gap-2 mb-1">
            <span 
              className="font-bold text-xs truncate"
              style={{ color: message.color }}
            >
              {message.username}
            </span>
            {message.badges && message.badges.length > 0 && (
              <div className="flex gap-1">
                {message.badges.slice(0, 2).map(badge => (
                  <span key={badge} className="text-xs bg-purple-100 text-purple-700 px-1 rounded">
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Message */}
          <p className="text-gray-800 text-sm leading-relaxed break-words">
            {message.message}
          </p>
        </div>
        
        {/* Speech bubble tail */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2">
          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/95"></div>
          <div className="absolute -top-[1px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-pink-200"></div>
        </div>
      </div>
    </motion.div>
  );
}
