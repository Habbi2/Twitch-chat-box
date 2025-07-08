'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Wifi, WifiOff } from 'lucide-react';

interface StatusBarProps {
  isConnected: boolean;
  messageCount: number;
  activeUsers: number;
}

export function StatusBar({ isConnected, messageCount, activeUsers }: StatusBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-30"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-pink-200">
        <div className="flex items-center gap-4 text-sm">
          {/* Connection Status */}
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                <Wifi className="w-4 h-4 text-green-500" />
                <span className="text-green-600 font-medium">Live</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-red-500" />
                <span className="text-red-600 font-medium">Offline</span>
              </>
            )}
          </div>

          {/* Message Count */}
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-500" />
            <span className="text-gray-700 font-medium">{messageCount}</span>
          </div>

          {/* Active Users */}
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="text-gray-700 font-medium">{activeUsers}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
