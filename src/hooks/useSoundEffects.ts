'use client';

import { useCallback } from 'react';

// Simple sound effects without external dependencies
export function useSoundEffects() {
  // Web Audio API for simple sound generation
  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (typeof window === 'undefined') return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.log('Audio not supported');
    }
  }, []);

  const sounds = {
    // Happy sounds
    bounce: () => playTone(523.25, 0.2), // C5
    excited: () => {
      playTone(659.25, 0.1); // E5
      setTimeout(() => playTone(783.99, 0.1), 100); // G5
      setTimeout(() => playTone(1046.5, 0.2), 200); // C6
    },
    heart: () => {
      playTone(523.25, 0.15); // C5
      setTimeout(() => playTone(659.25, 0.15), 150); // E5
    },
    
    // Interaction sounds
    click: () => playTone(1000, 0.1, 'square'),
    wave: () => {
      playTone(440, 0.1); // A4
      setTimeout(() => playTone(523.25, 0.1), 100); // C5
    },
    
    // Message sounds
    newMessage: () => playTone(800, 0.15, 'triangle'),
    specialMessage: () => {
      playTone(659.25, 0.1); // E5
      setTimeout(() => playTone(783.99, 0.1), 80); // G5
      setTimeout(() => playTone(987.77, 0.2), 160); // B5
    },
    
    // Notification sounds
    follow: () => {
      playTone(523.25, 0.1); // C5
      setTimeout(() => playTone(659.25, 0.1), 100); // E5
      setTimeout(() => playTone(783.99, 0.1), 200); // G5
      setTimeout(() => playTone(1046.5, 0.3), 300); // C6
    },
    
    // Ambient sounds
    sparkle: () => playTone(2000, 0.05, 'sine'),
    chime: () => {
      [1760, 1976, 2217.46].forEach((freq, i) => {
        setTimeout(() => playTone(freq, 0.2), i * 100);
      });
    }
  };

  return sounds;
}
