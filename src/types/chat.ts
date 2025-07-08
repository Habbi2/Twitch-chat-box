export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: number;
  avatar: string;
  color?: string;
  badges?: string[];
}

export interface StreamAvatar {
  id: string;
  emoji: string;
  name: string;
  personality: 'happy' | 'sleepy' | 'excited' | 'confused' | 'angry' | 'love' | 'cool' | 'surprised';
  position: { x: number; y: number };
  currentMessage?: string;
  lastActivity: number;
}

export const CUTE_AVATARS = [
  { emoji: '🐱', name: 'Kitty', personalities: ['happy', 'sleepy', 'love'] },
  { emoji: '🐶', name: 'Puppy', personalities: ['excited', 'happy', 'love'] },
  { emoji: '🐼', name: 'Panda', personalities: ['sleepy', 'happy', 'confused'] },
  { emoji: '🦊', name: 'Foxy', personalities: ['cool', 'excited', 'surprised'] },
  { emoji: '🐸', name: 'Froggy', personalities: ['happy', 'confused', 'surprised'] },
  { emoji: '🐰', name: 'Bunny', personalities: ['excited', 'happy', 'love'] },
  { emoji: '🐻', name: 'Bear', personalities: ['sleepy', 'happy', 'confused'] },
  { emoji: '🐧', name: 'Penguin', personalities: ['cool', 'happy', 'confused'] },
  { emoji: '🦔', name: 'Hedgehog', personalities: ['sleepy', 'happy', 'surprised'] },
  { emoji: '🐨', name: 'Koala', personalities: ['sleepy', 'happy', 'love'] },
] as const;

export const EMOTION_EMOJIS = {
  happy: '😊',
  sleepy: '😴',
  excited: '🤩',
  confused: '🤔',
  angry: '😤',
  love: '😍',
  cool: '😎',
  surprised: '😲',
} as const;
