'use client';

import { motion } from 'framer-motion';
import { ChatMessage, EMOTION_EMOJIS } from '../types/chat';

interface ChatBubbleProps {
  message: ChatMessage;
  onComplete?: () => void;
}

export function ChatBubble({ message, onComplete }: ChatBubbleProps) {
  const getRandomEmotion = () => {
    const emotions = Object.keys(EMOTION_EMOJIS) as (keyof typeof EMOTION_EMOJIS)[];
    return emotions[Math.floor(Math.random() * emotions.length)];
  };

  const emotion = getRandomEmotion();
  const emotionEmoji = EMOTION_EMOJIS[emotion];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex items-start gap-3 p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-200 max-w-md"
      onAnimationComplete={() => {
        setTimeout(() => onComplete?.(), 5000); // Auto-remove after 5 seconds
      }}
    >
      {/* Avatar */}
      <motion.div
        initial={{ rotate: -10 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0"
      >
        <div className="relative">
          <span className="text-4xl block">{message.avatar}</span>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.2 }}
            className="absolute -bottom-1 -right-1 text-lg"
          >
            {emotionEmoji}
          </motion.span>
        </div>
      </motion.div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span 
            className="font-bold text-sm truncate"
            style={{ color: message.color }}
          >
            {message.username}
          </span>
          {message.badges && message.badges.length > 0 && (
            <div className="flex gap-1">
              {message.badges.map(badge => (
                <span key={badge} className="text-xs bg-purple-100 text-purple-700 px-1 rounded">
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-800 text-sm leading-relaxed break-words"
        >
          {message.message}
        </motion.p>
      </div>
    </motion.div>
  );
}
