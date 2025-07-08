# 🚀 Deployment Guide for Cute Stream Avatars

## Deploy to Vercel (Recommended)

1. **Fork or clone this repository**
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project

3. **Environment Variables**:
   Add these environment variables in Vercel dashboard:
   ```
   NEXT_PUBLIC_TWITCH_CHANNEL=your_twitch_channel_name
   ```

4. **Deploy**: 
   - Click "Deploy" 
   - Your app will be live at `https://your-project.vercel.app`

## Quick Start (Local Development)

1. **Navigate to project directory:**
   ```bash
   cd "c:\Users\javie\Desktop\Game 2"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create `.env.local` and add:
   ```
   NEXT_PUBLIC_TWITCH_CHANNEL=habbi3
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   Go to http://localhost:3000

6. **Test demo mode:**
   Click the play button (▶️) in the top-left corner to see sample chat messages with cute avatars!

## 🌐 Deploy to Vercel

### Option 1: Quick Deploy (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Cute Stream Avatars"
   git branch -M main
   git remote add origin https://github.com/yourusername/cute-stream-avatars.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Click "New Project" 
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Add environment variables:
     - `NEXT_PUBLIC_TWITCH_CHANNEL` = `habbi3`
   - Click "Deploy"

### Option 2: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login and deploy:**
   ```bash
   vercel login
   vercel
   ```

3. **Follow the prompts and your app will be live!**

## 🔥 Firebase Setup (Optional)

If you want to store chat history or user data:

1. **Create Firebase Project:**
   - Go to https://console.firebase.google.com
   - Click "Add project"
   - Follow setup wizard

2. **Enable Firestore:**
   - In your Firebase console, go to "Firestore Database"
   - Click "Create database"
   - Choose "Start in test mode"

3. **Get your config:**
   - Go to Project Settings > General
   - Scroll down to "Your apps"
   - Click the web icon (</>)
   - Copy the config values

4. **Add to Vercel Environment Variables:**
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

## 🎮 Testing the Application

### Demo Mode
- Click the play button to see simulated chat messages
- Watch cute avatars float around the screen
- See chat bubbles appear with different users and messages

### Live Twitch Mode
- The app will automatically connect to Habbi3's Twitch chat
- Real chat messages will appear as cute avatars
- Change the `NEXT_PUBLIC_TWITCH_CHANNEL` variable to connect to a different channel

## 🎨 Customization Ideas

### Add More Avatars
Edit `src/types/chat.ts`:
```typescript
export const CUTE_AVATARS = [
  // Add your favorite emojis here!
  { emoji: '🦋', name: 'Butterfly', personalities: ['happy', 'excited'] },
  { emoji: '🐙', name: 'Octopus', personalities: ['cool', 'surprised'] },
];
```

### Change Colors
Edit the gradient backgrounds in `src/app/page.tsx`:
```typescript
// Change from pink/purple to blue/green
className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-green-100"
```

### Add Sound Effects
Install howler.js and add sound when new messages appear:
```bash
npm install howler @types/howler
```

## 🔧 Troubleshooting

### Common Issues

1. **"Module not found" errors:**
   ```bash
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

2. **Twitch connection issues:**
   - Check that the channel name is correct in environment variables
   - Make sure the channel is live (or use demo mode for testing)

3. **Build errors on Vercel:**
   - Check the build logs in Vercel dashboard
   - Make sure all environment variables are set correctly

### Performance Tips

- The app limits to 12 floating avatars for optimal performance
- Messages auto-remove after 5 seconds to prevent memory issues
- Demo mode resets periodically to keep things fresh

## 📺 Adding to OBS Studio

Once deployed, you can add your cute stream avatars as an overlay in OBS:

### Method 1: Browser Source (Recommended)

1. **Get your deployed URL:**
   - After deploying to Vercel, copy your app URL (e.g., `https://your-app.vercel.app`)

2. **Add Browser Source in OBS:**
   - Open OBS Studio
   - In your scene, click the "+" button in Sources
   - Select "Browser Source"
   - Name it "Cute Stream Avatars"

3. **Configure Browser Source:**
   ```
   URL: https://your-app.vercel.app
   Width: 1920
   Height: 1080
   FPS: 30
   ✅ Shutdown source when not visible
   ✅ Refresh browser when scene becomes active
   ```

4. **Position the overlay:**
   - The avatars will appear across your entire stream
   - You can resize/crop the browser source if needed
   - Avatars have transparent backgrounds

### Method 2: Window Capture

1. **Open your app in a browser:**
   - Go to your deployed URL
   - Press F11 for fullscreen mode

2. **Add Window Capture:**
   - In OBS, add "Window Capture" source
   - Select your browser window
   - Choose "Capture Cursor" if you want interaction

### OBS Settings Recommendations

**For best performance:**
- Set Browser Source FPS to 30
- Enable "Shutdown source when not visible"
- Use Hardware Acceleration in OBS

**For transparent background:**
- The app already has a transparent-friendly background
- If you want pure transparency, you can modify the CSS in `src/app/page.tsx`

### 🎨 Customizing for Your Stream

**Make the background fully transparent:**
```typescript
// In src/app/page.tsx, change this line:
className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 overflow-hidden"

// To this for full transparency:
className="min-h-screen bg-transparent overflow-hidden"
```

**Adjust avatar size for your layout:**
```typescript
// In src/components/InteractiveAvatar.tsx, change:
className="text-6xl filter drop-shadow-lg"

// To smaller avatars:
className="text-4xl filter drop-shadow-lg"
// Or larger avatars:
className="text-8xl filter drop-shadow-lg"
```

**Position avatars in specific areas:**
```typescript
// In src/components/FloatingAvatarsWithBubbles.tsx, modify:
position: {
  x: Math.random() * 80 + 10, // 10-90% of screen width
  y: Math.random() * 70 + 15, // 15-85% of screen height
},

// To keep avatars in bottom area only:
position: {
  x: Math.random() * 80 + 10, // 10-90% of screen width  
  y: Math.random() * 30 + 60, // 60-90% of screen height (bottom area)
},
```

### 🔧 Troubleshooting OBS Integration

**Browser Source not loading:**
- Check your deployed URL works in a regular browser
- Try refreshing the browser source
- Check OBS logs for any errors

**Chat bubbles not aligned with avatars:**
- Make sure Browser Source resolution matches your stream resolution (1920x1080)
- Try refreshing the browser source after the app loads
- Check that the browser source "Transform" settings aren't applied
- Ensure "Custom CSS" is empty in browser source settings

**Performance issues:**
- Lower the FPS from 60 to 30
- Reduce browser source resolution
- Enable "Shutdown source when not visible"

**Avatars not showing:**
- Make sure demo mode is enabled or your Twitch channel is active
- Check browser console for JavaScript errors
- Verify environment variables are set correctly

**Audio interference:**
- Right-click Browser Source → Filters → Add "Gain" filter
- Set gain to -100dB to mute any potential audio

**Positioning issues in OBS:**
- Reset Browser Source transform (Right-click → Transform → Reset Transform)
- Make sure "Use custom frame rate" is unchecked unless needed
- Try recreating the browser source if positioning seems off

### 📱 Mobile/Multi-Platform Setup

**For mobile streaming (Streamlabs Mobile):**
- Use the same deployed URL
- Add as "Web Overlay" in Streamlabs
- Adjust size for mobile screen ratios

**For other streaming software:**
- **XSplit:** Add "Webpage" source with your URL
- **Restream Studio:** Add "Browser Source" with your URL
- **Streamlabs Desktop:** Add "Browser Source" like OBS

## 🎉 You're All Set!

Your cute stream avatars should now be floating around bringing joy to your viewers! The app is designed to be:

- **Responsive** - Works on all screen sizes
- **Performant** - Optimized animations and memory usage  
- **Customizable** - Easy to modify colors, avatars, and behaviors
- **Production Ready** - Built with Next.js best practices
- **OBS Ready** - Perfect for streaming overlays

Happy streaming! 🎮✨
