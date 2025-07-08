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

export function FloatingAvatars({ activeUsers, recentMessages }: FloatingAvatarsProps) {
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
  onAvatarClick: () => void;
}

function FloatingAvatarContainer({ avatar, lastMessage, onAvatarClick }: FloatingAvatarContainerProps) {
  const [position, setPosition] = useState(avatar.position);

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
        x: `${avatar.position.x}vw`,
        y: `${avatar.position.y}vh`
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: `${position.x}vw`,
        y: `${position.y}vh`
      }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ 
        duration: 0.5,
        x: { duration: 2, ease: 'easeInOut' },
        y: { duration: 2, ease: 'easeInOut' }
      }}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
    >
      <InteractiveAvatar 
        avatar={avatar} 
        lastMessage={lastMessage}
        onClick={onAvatarClick}
      />
    </motion.div>
  );
}
