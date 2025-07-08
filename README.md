# 🎮 Cute Stream Avatars

A delightful and interactive Twitch chat visualization that displays chat messages as cute emoticon avatars floating around your screen. Perfect for streamers who want to add some kawaii magic to their streams!

## ✨ Features

- **Cute Avatars**: Each user gets a unique animal emoji avatar (🐱🐶🐼🦊🐸🐰🐻🐧🦔🐨)
- **Floating Animation**: Avatars gently float around the screen with smooth animations
- **Live Chat Display**: Real-time chat messages appear as beautiful speech bubbles
- **Emotion System**: Avatars show different emotions based on their personality
- **Demo Mode**: Test the application with simulated chat messages
- **Responsive Design**: Beautiful gradient backgrounds and smooth transitions
- **Firebase Integration**: Ready for Firestore database integration
- **Vercel Deployment**: Optimized for easy deployment

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Twitch account (for connecting to chat)
- Firebase project (optional, for data persistence)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cute-stream-avatars
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.local` and fill in your configuration:
   
   ```env
   # Firebase Configuration (optional)
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Twitch Configuration
   NEXT_PUBLIC_TWITCH_CHANNEL=habbi3
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Visit [http://localhost:3000](http://localhost:3000) to see the application!

## 🎨 How It Works

### Demo Mode
Click the play button (▶️) in the top-left to start demo mode and see sample chat messages with cute avatars.

### Live Twitch Chat
The app automatically connects to the specified Twitch channel and displays real chat messages as they come in.

### Avatar System
- Each username gets a consistent cute animal avatar
- Avatars float around the screen with gentle animations
- Emotion indicators show the avatar's current mood
- Up to 12 avatars can be displayed simultaneously

### Chat Display
- Messages appear as rounded chat bubbles at the bottom
- Each message shows the user's color and badges
- Messages auto-disappear after 5 seconds
- Smooth animations for appearing/disappearing messages

## 🔧 Customization

### Change Twitch Channel
Update the `NEXT_PUBLIC_TWITCH_CHANNEL` environment variable to connect to a different channel.

### Add More Avatars
Edit `src/types/chat.ts` to add more cute emoji options:

```typescript
export const CUTE_AVATARS = [
  { emoji: '🐱', name: 'Kitty', personalities: ['happy', 'sleepy', 'love'] },
  { emoji: '🐶', name: 'Puppy', personalities: ['excited', 'happy', 'love'] },
  // Add more here!
] as const;
```

### Customize Colors & Animations
Modify the Tailwind CSS classes in the components to change colors, animations, and styling.

## 🚀 Deployment to Vercel

1. **Push your code to GitHub**

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add your environment variables in the Vercel dashboard

3. **Deploy**
   - Vercel will automatically build and deploy your app
   - Your cute avatars will be live! 🎉

## 🔥 Firebase Setup (Optional)

If you want to persist chat data or add user accounts:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database
3. Copy your config values to `.env.local`
4. Uncomment Firebase-related code in the components

## 📱 Tech Stack

- **Next.js 15** - React framework with app router
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **tmi.js** - Twitch chat integration
- **Firebase** - Backend services (optional)
- **Lucide React** - Beautiful icons

## 🎮 Perfect For

- Twitch streamers wanting interactive chat visualization
- YouTube live streamers
- Discord community events
- Fun coding demos and presentations
- Anyone who loves cute animations! 

## 🤝 Contributing

Feel free to submit issues and enhancement requests! This project is meant to be fun and customizable.

## 📄 License

MIT License - feel free to use this for your streams and modify as needed!

---

Made with 💜 for the streaming community
