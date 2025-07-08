'use client';

import { useEffect, useState } from 'react';
import { Client, type ChatUserstate } from 'tmi.js';
import { ChatMessage } from '@/types/chat';

export function useTwitchChat(channel: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const client = new Client({
      connection: {
        secure: true,
        reconnect: true,
      },
      channels: [channel],
    });

    client.connect().then(() => {
      setIsConnected(true);
      console.log(`Connected to ${channel}'s chat!`);
    }).catch(console.error);

    client.on('message', (channel: string, tags: ChatUserstate, message: string, self: boolean) => {
      if (self) return;

      const chatMessage: ChatMessage = {
        id: tags.id || Math.random().toString(36),
        username: tags['display-name'] || tags.username || 'Anonymous',
        message: message,
        timestamp: Date.now(),
        avatar: generateAvatarForUser(tags.username || 'anonymous'),
        color: tags.color || '#8A2BE2',
        badges: tags.badges ? Object.keys(tags.badges) : [],
      };

      setMessages(prev => [...prev.slice(-49), chatMessage]); // Keep last 50 messages
    });

    client.on('disconnected', () => {
      setIsConnected(false);
      console.log('Disconnected from Twitch chat');
    });

    return () => {
      client.disconnect();
    };
  }, [channel]);

  return { messages, isConnected };
}

function generateAvatarForUser(username: string): string {
  const avatars = ['🐱', '🐶', '🐼', '🦊', '🐸', '🐰', '🐻', '🐧', '🦔', '🐨'];
  const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return avatars[hash % avatars.length];
}
