'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StreamAvatar, CUTE_AVATARS, ChatMessage } from '@/types/chat';
import { InteractiveAvatar } from './InteractiveAvatar';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface FloatingAvatarsProps {
  activeUsers: string[];
  recentMessages: ChatMessage[];
  messages: ChatMessage[];
}

export function FloatingAvatars({ activeUsers, recentMessages, messages }: FloatingAvatarsProps) {
  const [avatars, setAvatars] = useState<StreamAvatar[]>([]);
  const [userLastMessages, setUserLastMessages] = useState<Record<string, ChatMessage>>({});
  const sounds = useSoundEffects();

  // Track last messages per user
  useEffect(() => {
    const messageMap: Record<string, ChatMessage> = {};
    recentMessages.forEach(msg => {
      messageMap[msg.username] = msg;
    });
    setUserLastMessages(messageMap);
  }, [recentMessages]);

  useEffect(() => {
    // Create or update avatars based on active users
    const newAvatars = activeUsers.slice(0, 12).map((username, index) => {
      const existingAvatar = avatars.find(a => a.name === username);
      if (existingAvatar) {
        return { ...existingAvatar, lastActivity: Date.now() };
      }

      const avatarTemplate = CUTE_AVATARS[index % CUTE_AVATARS.length];
      const personality = avatarTemplate.personalities[
        Math.floor(Math.random() * avatarTemplate.personalities.length)
      ] as StreamAvatar['personality'];

      return {
        id: `${username}-${Date.now()}`,
        emoji: avatarTemplate.emoji,
        name: username,
        personality,
        position: {
          x: Math.random() * 80 + 10, // 10-90% of screen width
          y: Math.random() * 70 + 15, // 15-85% of screen height
        },
        lastActivity: Date.now(),
      };
    });

    // Only update if there are actual changes
    const hasChanges = newAvatars.length !== avatars.length || 
      newAvatars.some(newAvatar => !avatars.find(existing => existing.name === newAvatar.name));
    
    if (hasChanges) {
      setAvatars(newAvatars);
      
      // Play sound for new avatars only
      const newUsernames = newAvatars
        .filter(newAvatar => !avatars.find(existing => existing.name === newAvatar.name))
        .map(avatar => avatar.name);
      
      if (newUsernames.length > 0) {
        sounds.newMessage();
      }
    }
  }, [activeUsers, avatars, sounds]); // Fixed dependency array

  // Remove inactive avatars
  useEffect(() => {
    const interval = setInterval(() => {
      setAvatars(prev => prev.filter(avatar => 
        Date.now() - avatar.lastActivity < 30000 // Remove after 30 seconds of inactivity
      ));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleAvatarClick = (avatar: StreamAvatar) => {
    sounds.click();
    console.log(`Clicked on ${avatar.name}!`);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <AnimatePresence>
        {avatars.map(avatar => (
          <FloatingAvatarContainer 
            key={avatar.id} 
            avatar={avatar} 
            lastMessage={userLastMessages[avatar.name]}
            latestGlobalMessage={messages[messages.length - 1]} // Pass latest message
            onAvatarClick={() => handleAvatarClick(avatar)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface FloatingAvatarContainerProps {
  avatar: StreamAvatar;
  lastMessage?: ChatMessage;
  latestGlobalMessage?: ChatMessage;
  onAvatarClick: () => void;
}

function FloatingAvatarContainer({ avatar, lastMessage, latestGlobalMessage, onAvatarClick }: FloatingAvatarContainerProps) {
  const [position, setPosition] = useState(avatar.position);
  const [showBubble, setShowBubble] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<ChatMessage | null>(null);

  // Check if latest message is for this avatar
  useEffect(() => {
    if (latestGlobalMessage && latestGlobalMessage.username === avatar.name) {
      setCurrentMessage(latestGlobalMessage);
      setShowBubble(true);
      
      // Hide bubble after 4 seconds
      const timer = setTimeout(() => {
        setShowBubble(false);
        setCurrentMessage(null);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [latestGlobalMessage, avatar.name]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Gentle floating movement
      setPosition(prev => ({
        x: Math.max(5, Math.min(95, prev.x + (Math.random() - 0.5) * 10)),
        y: Math.max(10, Math.min(90, prev.y + (Math.random() - 0.5) * 8)),
      }));
    }, 3000 + Math.random() * 2000); // Random interval between 3-5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale: 0,
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
      }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-20"
      style={{
        left: `${position.x}vw`,
        top: `${position.y}vh`,
        transition: 'left 2s ease-in-out, top 2s ease-in-out',
      }}
    >
      {/* Chat Bubble - positioned directly above avatar using relative positioning */}
      <AnimatePresence>
        {showBubble && currentMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-full left-1/2 z-40 pointer-events-none"
            style={{
              transform: 'translateX(-50%)', // Perfect centering
              marginBottom: '1rem',
              marginLeft: '-200px', // Small pixel adjustment for OBS
            }}
          >
            <div className="relative max-w-xs">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-pink-200">
                {/* Username */}
                <div className="flex items-center gap-2 mb-1">
                  <span 
                    className="font-bold text-xs truncate"
                    style={{ color: currentMessage.color }}
                  >
                    {currentMessage.username}
                  </span>
                  {currentMessage.badges && currentMessage.badges.length > 0 && (
                    <div className="flex gap-1">
                      {currentMessage.badges.slice(0, 2).map(badge => (
                        <span key={badge} className="text-xs bg-purple-100 text-purple-700 px-1 rounded">
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Message */}
                <p className="text-gray-800 text-sm leading-relaxed break-words">
                  {currentMessage.message}
                </p>
              </div>
              
              {/* Speech bubble tail */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/95"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar */}
      <InteractiveAvatar 
        avatar={avatar} 
        lastMessage={lastMessage}
        onClick={onAvatarClick}
      />
    </motion.div>
  );
}
