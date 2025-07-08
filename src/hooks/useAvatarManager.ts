'use client';

import { useState, useEffect } from 'react';
import { StreamAvatar, CUTE_AVATARS, ChatMessage } from '@/types/chat';

export function useAvatarManager(activeUsers: string[], messages: ChatMessage[]) {
  const [avatars, setAvatars] = useState<StreamAvatar[]>([]);

  // Function to update avatar position
  const updateAvatarPosition = (avatarId: string, newPosition: { x: number; y: number }) => {
    setAvatars(prev => prev.map(avatar => 
      avatar.id === avatarId 
        ? { ...avatar, position: newPosition }
        : avatar
    ));
  };

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
    }
  }, [activeUsers]); // Remove avatars from dependencies to prevent infinite loop

  // Remove inactive avatars
  useEffect(() => {
    const interval = setInterval(() => {
      setAvatars(prev => prev.filter(avatar => 
        Date.now() - avatar.lastActivity < 30000 // Remove after 30 seconds of inactivity
      ));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { avatars, updateAvatarPosition };
}
