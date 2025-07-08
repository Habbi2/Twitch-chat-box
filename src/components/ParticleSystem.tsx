'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: string;
  x: number;
  y: number;
  emoji: string;
  lifetime: number;
  velocity: { x: number; y: number };
}

interface ParticleSystemProps {
  isActive: boolean;
  centerX?: number;
  centerY?: number;
  particleCount?: number;
  emojis?: string[];
}

export function ParticleSystem({ 
  isActive, 
  centerX = 50, 
  centerY = 50, 
  particleCount = 8,
  emojis = ['✨', '⭐', '💫', '🌟', '💖', '🎉', '🔥', '💕']
}: ParticleSystemProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!isActive) {
      setParticles([]);
      return;
    }

    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const velocity = 50 + Math.random() * 30;
      
      newParticles.push({
        id: `particle-${Date.now()}-${i}`,
        x: centerX,
        y: centerY,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        lifetime: 2000 + Math.random() * 1000,
        velocity: {
          x: Math.cos(angle) * velocity,
          y: Math.sin(angle) * velocity,
        },
      });
    }
    
    setParticles(newParticles);

    // Clean up particles after their lifetime
    const cleanup = setTimeout(() => {
      setParticles([]);
    }, 3000);

    return () => clearTimeout(cleanup);
  }, [isActive, centerX, centerY, particleCount, emojis]);

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{
              x: `${particle.x}vw`,
              y: `${particle.y}vh`,
              scale: 0,
              opacity: 1,
            }}
            animate={{
              x: `${particle.x + particle.velocity.x / 10}vw`,
              y: `${particle.y + particle.velocity.y / 10}vh`,
              scale: [0, 1.5, 1, 0],
              opacity: [0, 1, 1, 0],
              rotate: [0, 360],
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: particle.lifetime / 1000,
              ease: 'easeOut',
            }}
            className="absolute text-2xl transform -translate-x-1/2 -translate-y-1/2"
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
