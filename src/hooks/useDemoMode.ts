'use client';

import { useState, useEffect } from 'react';
import { ChatMessage } from '@/types/chat';

const DEMO_MESSAGES: Omit<ChatMessage, 'id' | 'timestamp'>[] = [
  { username: 'CuteCoder', message: 'Hey everyone! Love the stream! 💜', avatar: '🐱', color: '#FF69B4' },
  { username: 'PixelPanda', message: 'This game looks amazing! ✨', avatar: '🐼', color: '#8A2BE2' },
  { username: 'FoxyGamer', message: 'Nice moves! 🔥 Poggers!', avatar: '🦊', color: '#FF4500' },
  { username: 'BunnyHop', message: 'How did you do that?! 😲', avatar: '🐰', color: '#32CD32' },
  { username: 'SleepyBear', message: 'Just got here, what did I miss? 😴', avatar: '🐻', color: '#8B4513' },
  { username: 'PenguinDance', message: 'HYPERS! This is awesome! 🐧', avatar: '🐧', color: '#4169E1' },
  { username: 'HedgehogSpikes', message: 'First time here, hi chat! 👋 hello', avatar: '🦔', color: '#800080' },
  { username: 'KoalaHugs', message: 'Such a cozy stream 🥰 love this!', avatar: '🐨', color: '#20B2AA' },
  { username: 'CuteCoder', message: 'Kappa 123', avatar: '🐱', color: '#FF69B4' },
  { username: 'FoxyGamer', message: 'EZ Clap! Great job!', avatar: '🦊', color: '#FF4500' },
  { username: 'PixelPanda', message: 'PogChamp PogChamp PogChamp', avatar: '🐼', color: '#8A2BE2' },
  { username: 'BunnyHop', message: 'LUL that was hilarious', avatar: '🐰', color: '#32CD32' },
];

export function useDemoMode() {
  const [demoMessages, setDemoMessages] = useState<ChatMessage[]>([]);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    if (!isDemoMode) return;

    let messageIndex = 0;
    const interval = setInterval(() => {
      if (messageIndex < DEMO_MESSAGES.length) {
        const demoMessage = DEMO_MESSAGES[messageIndex];
        const newMessage: ChatMessage = {
          ...demoMessage,
          id: `demo-${Date.now()}-${messageIndex}`,
          timestamp: Date.now(),
        };
        
        setDemoMessages(prev => [...prev, newMessage]);
        messageIndex++;
      } else {
        // Reset and continue the demo
        messageIndex = 0;
        setDemoMessages([]);
      }
    }, 3000); // New message every 3 seconds

    return () => clearInterval(interval);
  }, [isDemoMode]);

  const toggleDemo = () => {
    setIsDemoMode(!isDemoMode);
    if (!isDemoMode) {
      setDemoMessages([]);
    }
  };

  return {
    demoMessages,
    isDemoMode,
    toggleDemo,
  };
}
