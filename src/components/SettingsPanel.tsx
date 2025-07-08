'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Volume2, VolumeX, Palette, Zap } from 'lucide-react';

interface Settings {
  soundEnabled: boolean;
  particleEffects: boolean;
  avatarInteractions: boolean;
  backgroundTheme: 'default' | 'dark' | 'neon' | 'pastel';
}

interface SettingsPanelProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

export function SettingsPanel({ settings, onSettingsChange }: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const themes: Array<{ id: Settings['backgroundTheme']; name: string; preview: string }> = [
    { id: 'default', name: 'Cute Pastel', preview: 'bg-gradient-to-br from-pink-100 to-purple-100' },
    { id: 'dark', name: 'Dark Magic', preview: 'bg-gradient-to-br from-gray-800 to-purple-900' },
    { id: 'neon', name: 'Neon Cyber', preview: 'bg-gradient-to-br from-cyan-400 to-pink-500' },
    { id: 'pastel', name: 'Rainbow', preview: 'bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200' },
  ];

  return (
    <>
      {/* Settings Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-40 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-pink-200 hover:bg-pink-50 transition-colors"
      >
        <Settings className="w-6 h-6 text-gray-700" />
      </motion.button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-md shadow-2xl z-50 border-l border-pink-200"
          >
            <div className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800">🎮 Settings</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Sound Settings */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  {settings.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  Audio
                </h3>
                <label className="flex items-center justify-between">
                  <span className="text-gray-600">Sound Effects</span>
                  <input
                    type="checkbox"
                    checked={settings.soundEnabled}
                    onChange={(e) => onSettingsChange({ ...settings, soundEnabled: e.target.checked })}
                    className="w-5 h-5 text-pink-500 rounded focus:ring-pink-400"
                  />
                </label>
              </div>

              {/* Visual Effects */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Effects
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-gray-600">Particle Effects</span>
                    <input
                      type="checkbox"
                      checked={settings.particleEffects}
                      onChange={(e) => onSettingsChange({ ...settings, particleEffects: e.target.checked })}
                      className="w-5 h-5 text-pink-500 rounded focus:ring-pink-400"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-600">Avatar Interactions</span>
                    <input
                      type="checkbox"
                      checked={settings.avatarInteractions}
                      onChange={(e) => onSettingsChange({ ...settings, avatarInteractions: e.target.checked })}
                      className="w-5 h-5 text-pink-500 rounded focus:ring-pink-400"
                    />
                  </label>
                </div>
              </div>

              {/* Theme Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Theme
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {themes.map(theme => (
                    <motion.button
                      key={theme.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onSettingsChange({ ...settings, backgroundTheme: theme.id })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        settings.backgroundTheme === theme.id 
                          ? 'border-pink-400 ring-2 ring-pink-200' 
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      <div className={`w-full h-8 rounded mb-2 ${theme.preview}`}></div>
                      <span className="text-xs font-medium text-gray-700">{theme.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Avatar Preview */}
              <div className="mt-auto">
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Preview</h4>
                  <div className="flex justify-center gap-2 text-2xl">
                    {['🐱', '🐶', '🐼'].map((emoji, i) => (
                      <motion.span
                        key={i}
                        animate={{ 
                          y: [0, -5, 0],
                          rotate: [0, 5, -5, 0] 
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: i * 0.2 
                        }}
                      >
                        {emoji}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>
    </>
  );
}
