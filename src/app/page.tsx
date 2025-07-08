'use client';

import { useMemo } from 'react';
import { useTwitchChat } from '@/hooks/useTwitchChat';
import { useDemoMode } from '@/hooks/useDemoMode';
import { FloatingAvatars } from '@/components/FloatingAvatarsWithBubbles';
import { StatusBar } from '@/components/StatusBar';
import { Play, Pause } from 'lucide-react';

export default function Home() {
  const channel = process.env.NEXT_PUBLIC_TWITCH_CHANNEL || 'habbi3';
  const { messages: twitchMessages, isConnected } = useTwitchChat(channel);
  const { demoMessages, isDemoMode, toggleDemo } = useDemoMode();

  // Use demo messages if demo mode is on, otherwise use Twitch messages
  const messages = isDemoMode ? demoMessages : twitchMessages;

  // Get unique active users from recent messages (last 5 minutes)
  const activeUsers = useMemo(() => {
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    const recentMessages = messages.filter(msg => msg.timestamp > fiveMinutesAgo);
    const uniqueUsers = Array.from(new Set(recentMessages.map(msg => msg.username)));
    return uniqueUsers;
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,theme(colors.pink.200)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,theme(colors.purple.200)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,theme(colors.indigo.200)_0%,transparent_50%)]"></div>
      </div>

      {/* Main Content */}
      <main className="relative">
        {/* Status Bar */}
        <StatusBar 
          isConnected={isDemoMode ? true : isConnected}
          messageCount={messages.length}
          activeUsers={activeUsers.length}
        />

        {/* Demo Toggle Button */}
        <div className="fixed top-4 left-4 z-30">
          <button
            onClick={toggleDemo}
            className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-pink-200 hover:scale-105 transition-transform"
            title={isDemoMode ? 'Stop Demo' : 'Start Demo'}
          >
            {isDemoMode ? (
              <Pause className="w-5 h-5 text-red-500" />
            ) : (
              <Play className="w-5 h-5 text-green-500" />
            )}
          </button>
        </div>

        {/* Floating Avatars with Chat Bubbles */}
        <FloatingAvatars 
          activeUsers={activeUsers} 
          recentMessages={messages.slice(-20)}
          messages={messages}
        />

        {/* Welcome Message */}
        {messages.length === 0 && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center p-8">
              <div className="text-8xl mb-6 animate-bounce">🎮</div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Cute Stream Avatars
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {isDemoMode ? (
                  <>Starting demo mode...</>
                ) : (
                  <>Connected to <span className="font-bold text-purple-600">#{channel}</span> chat</>
                )}
              </p>
              <div className="flex justify-center gap-4 text-4xl">
                {['🐱', '🐶', '🐼', '🦊', '🐸'].map((emoji, i) => (
                  <span 
                    key={i} 
                    className="animate-pulse" 
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-6">
                {isDemoMode ? (
                  <>Demo messages will appear shortly...</>
                ) : (
                  <>
                    Waiting for chat messages to create cute avatars...<br />
                    <span className="text-purple-600">Click the play button to try demo mode!</span>
                  </>
                )}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
