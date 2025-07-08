'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StreamAvatar, EMOTION_EMOJIS, ChatMessage } from '@/types/chat';
import { KEYWORD_REACTIONS, EMOTE_REACTIONS } from '@/types/interactions';

interface InteractiveAvatarProps {
  avatar: StreamAvatar;
  lastMessage?: ChatMessage;
  onClick?: () => void;
}

export function InteractiveAvatar({ avatar, lastMessage, onClick }: InteractiveAvatarProps) {
  const [reaction, setReaction] = useState<string | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [clickEffect, setClickEffect] = useState(false);

  // Check for keyword/emote reactions in messages
  useEffect(() => {
    if (!lastMessage) return;

    const messageText = lastMessage.message;
    const messageLower = messageText.toLowerCase();
    
    // Check for keyword reactions
    for (const [keyword, reactionData] of Object.entries(KEYWORD_REACTIONS)) {
      if (messageLower.includes(keyword)) {
        triggerReaction(reactionData.emoji, reactionData.duration);
        break;
      }
    }

    // Check for emote reactions
    for (const [emote, reactionData] of Object.entries(EMOTE_REACTIONS)) {
      if (messageText.includes(emote)) {
        triggerReaction(reactionData.emoji, 3000);
        break;
      }
    }
  }, [lastMessage]);

  const triggerReaction = (emoji: string, duration: number) => {
    setReaction(emoji);
    setIsInteracting(true);
    setTimeout(() => {
      setReaction(null);
      setIsInteracting(false);
    }, duration);
  };

  const handleClick = () => {
    setClickEffect(true);
    setTimeout(() => setClickEffect(false), 500);
    
    // Random reaction on click
    const reactions = ['🎉', '✨', '💫', '⭐', '🌟', '💖', '🔥'];
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
    triggerReaction(randomReaction, 2000);
    
    onClick?.();
  };

  const emotionEmoji = EMOTION_EMOJIS[avatar.personality];

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="relative cursor-pointer group"
      animate={isInteracting ? {
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0],
        scale: [1, 1.2, 1],
      } : {
        y: [0, -10, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration: isInteracting ? 1 : 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Main avatar with click effect */}
      <motion.div
        className="text-6xl filter drop-shadow-lg"
        animate={clickEffect ? {
          scale: [1, 1.3, 1],
          rotate: [0, 360],
        } : {}}
        transition={{ duration: 0.5 }}
      >
        {avatar.emoji}
      </motion.div>
      
      {/* Emotion indicator */}
      <motion.div
        animate={{ 
          scale: isInteracting ? [1, 1.5, 1] : [1, 1.2, 1],
          rotate: isInteracting ? [0, 20, -20, 0] : [0, 5, -5, 0]
        }}
        transition={{ 
          duration: isInteracting ? 0.5 : 2, 
          repeat: Infinity 
        }}
        className="absolute -top-2 -right-2 text-2xl"
      >
        {emotionEmoji}
      </motion.div>

      {/* Reaction overlay */}
      <AnimatePresence>
        {reaction && (
          <motion.div
            initial={{ scale: 0, y: 0 }}
            animate={{ 
              scale: [0, 1.5, 1.2], 
              y: [-40, -60, -50],
              rotate: [0, 10, -10, 0]
            }}
            exit={{ scale: 0, y: -80, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 text-3xl pointer-events-none z-10"
          >
            {reaction}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click ripple effect */}
      <AnimatePresence>
        {clickEffect && (
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 rounded-full bg-yellow-300 pointer-events-none"
            style={{ zIndex: -1 }}
          />
        )}
      </AnimatePresence>

      {/* Name tooltip with interaction count */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-black/80 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
          <div className="font-semibold">{avatar.name}</div>
          <div className="text-gray-300">Click me! 🎮</div>
        </div>
      </div>

      {/* Sparkle trail effects */}
      {isInteracting && (
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: 0, 
                y: 0,
                scale: 0 
              }}
              animate={{ 
                x: Math.cos((i * 60) * Math.PI / 180) * 40,
                y: Math.sin((i * 60) * Math.PI / 180) * 40,
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                repeat: Infinity,
              }}
              className="absolute top-1/2 left-1/2 text-yellow-400 text-sm"
            >
              ✨
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
