'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '@/types/chat';
import { ChatBubble } from './ChatBubble';

interface ChatStreamProps {
  messages: ChatMessage[];
}

export function ChatStream({ messages }: ChatStreamProps) {
  const visibleMessages = messages.slice(-6); // Show last 6 messages

  return (
    <div className="fixed bottom-4 left-4 right-4 z-20 pointer-events-none">
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="popLayout">
          {visibleMessages.map((message, index) => (
            <motion.div
              key={message.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.1,
                layout: { duration: 0.2 }
              }}
              className="mb-3"
            >
              <ChatBubble message={message} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
