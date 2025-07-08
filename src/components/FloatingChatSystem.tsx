'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChatMessage, StreamAvatar } from '@/types/chat';
import { FloatingChatBubble } from './FloatingChatBubble';

interface FloatingChatSystemProps {
  messages: ChatMessage[];
  avatars: StreamAvatar[];
}

interface ActiveChatBubble {
  id: string;
  message: ChatMessage;
  position: { x: number; y: number };
  timestamp: number;
}

export function FloatingChatSystem({ messages, avatars }: FloatingChatSystemProps) {
  const [activeBubbles, setActiveBubbles] = useState<ActiveChatBubble[]>([]);

  // Update bubble positions when avatars move
  useEffect(() => {
    setActiveBubbles(prev => 
      prev.map(bubble => {
        const currentAvatar = avatars.find(avatar => avatar.name === bubble.message.username);
        if (currentAvatar) {
          return {
            ...bubble,
            position: {
              x: currentAvatar.position.x,
              y: currentAvatar.position.y - 12
            }
          };
        }
        return bubble;
      })
    );
  }, [avatars]);

  useEffect(() => {
    // Only show the most recent message
    if (messages.length === 0) return;

    const latestMessage = messages[messages.length - 1];
    
    // Find the avatar for this user
    const userAvatar = avatars.find(avatar => avatar.name === latestMessage.username);
    
    if (!userAvatar) return;

    // Create new bubble with adjusted position
    const newBubble: ActiveChatBubble = {
      id: `bubble-${latestMessage.id}`,
      message: latestMessage,
      position: {
        x: userAvatar.position.x,
        y: userAvatar.position.y - 12 // Position higher above the avatar
      },
      timestamp: Date.now(),
    };

    // Add the new bubble and remove old ones for the same user
    setActiveBubbles(prev => {
      const filtered = prev.filter(bubble => bubble.message.username !== latestMessage.username);
      return [...filtered, newBubble];
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
      setActiveBubbles(prev => prev.filter(bubble => bubble.id !== newBubble.id));
    }, 5000);

  }, [messages, avatars]);

  return (
    <div className="fixed inset-0 pointer-events-none z-25">
      <AnimatePresence>
        {activeBubbles.map(bubble => (
          <FloatingChatBubble
            key={bubble.id}
            message={bubble.message}
            position={bubble.position}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
