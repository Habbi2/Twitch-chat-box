export interface AvatarInteraction {
  type: 'bounce' | 'dance' | 'wave' | 'heart' | 'confused' | 'excited';
  trigger: 'keyword' | 'emote' | 'donation' | 'follow' | 'raid';
  duration: number;
}

export const KEYWORD_REACTIONS = {
  // Positive reactions
  'love': { type: 'heart', emoji: '💕', duration: 3000 },
  'awesome': { type: 'excited', emoji: '🎉', duration: 2500 },
  'great': { type: 'bounce', emoji: '⭐', duration: 2000 },
  'amazing': { type: 'dance', emoji: '✨', duration: 3000 },
  
  // Greeting reactions
  'hello': { type: 'wave', emoji: '👋', duration: 2000 },
  'hi': { type: 'wave', emoji: '👋', duration: 2000 },
  'hey': { type: 'wave', emoji: '👋', duration: 2000 },
  
  // Confusion reactions
  'confused': { type: 'confused', emoji: '❓', duration: 2500 },
  'what': { type: 'confused', emoji: '🤔', duration: 2000 },
  'how': { type: 'confused', emoji: '❓', duration: 2000 },
  
  // Celebration reactions
  'poggers': { type: 'excited', emoji: '🔥', duration: 3000 },
  'pog': { type: 'excited', emoji: '🔥', duration: 3000 },
  'hype': { type: 'dance', emoji: '🎊', duration: 3500 },
} as const;

export const EMOTE_REACTIONS = {
  // Twitch emotes
  'Kappa': { type: 'confused', emoji: '😏' },
  'PogChamp': { type: 'excited', emoji: '🤩' },
  'LUL': { type: 'bounce', emoji: '😂' },
  'MonkaS': { type: 'confused', emoji: '😰' },
  'OMEGALUL': { type: 'dance', emoji: '🤣' },
  'EZ': { type: 'excited', emoji: '😎' },
  'F': { type: 'confused', emoji: '😔' },
  '5Head': { type: 'confused', emoji: '🧠' },
  'HYPERS': { type: 'dance', emoji: '⚡' },
} as const;
