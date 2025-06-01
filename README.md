# Magical Language Learning App 🌟

An immersive, AI-powered language learning application that makes practicing conversations feel like a Studio Ghibli adventure. This application combines voice recognition, AI conversation, and text-to-speech technologies to create an engaging and natural language learning experience across 75+ world languages.

## ✨ Features

### 🎯 Core Functionality

- **Real-time Voice Conversation**: Practice speaking in 75+ languages with an AI companion
- **Speech Recognition**: Advanced speech-to-text in multiple languages
- **AI-Powered Responses**: Intelligent conversational AI that adapts to your language level
- **Natural Text-to-Speech**: High-quality voice synthesis for AI responses
- **Conversation Persistence**: All conversations are saved with audio replay functionality

### 🌍 Language Support

The app supports conversation practice in 75+ languages including:

- **European**: English, Spanish, French, German, Italian, Portuguese, Russian, Dutch, Polish, Swedish, Turkish, Greek, Czech, Finnish, Danish, Norwegian, Hungarian, Romanian, Slovak, Ukrainian, Catalan, Bulgarian, Croatian, Serbian, Lithuanian, Latvian, Estonian, Slovenian, Icelandic, Maltese, Welsh, Irish, Basque
- **Asian**: Japanese, Chinese (Mandarin), Korean, Hindi, Vietnamese, Thai, Indonesian, Malay, Filipino, Urdu, Bengali, Telugu, Tamil, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Nepali, Sinhala, Burmese, Khmer, Lao, Mongolian, Kazakh, Uzbek, Kyrgyz, Tajik, Azerbaijani, Armenian, Georgian
- **Middle Eastern & African**: Arabic, Hebrew, Persian, Kurdish, Amharic, Somali, Swahili, Yoruba, Igbo, Hausa, Zulu, Afrikaans
- **Other**: Albanian, Bosnian, Macedonian, Montenegrin

### 🎨 User Experience

- **Studio Ghibli-Inspired Design**: Magical, whimsical interface with hand-drawn aesthetics
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark/Light Mode**: Automatic theme switching based on system preferences
- **Smooth Animations**: Engaging scroll animations and transitions
- **Particle Background**: Animated particle effects for immersive experience

### 🔧 Technical Features

- **Auto-Listen Mode**: Continuous conversation without manual button presses
- **Interrupt Capability**: Stop AI speech by speaking over it
- **Audio Replay**: Replay any AI message from conversation history
- **Real-time Transcription**: See your speech converted to text in real-time
- **Conversation Management**: Start new conversations by switching languages

## 🏗️ Architecture

### Frontend (Next.js 15)

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS 4.0 with custom animations
- **State Management**: React hooks with useReducer for complex state
- **Voice Recognition**: Web Speech API
- **Responsive Design**: Mobile-first approach

### Backend Integration

The frontend communicates with an Express.js backend that provides:

- **AI Conversation**: LangChain integration with Groq LLM
- **Text-to-Speech**: Microsoft Edge TTS for natural voice synthesis
- **Database**: PostgreSQL for conversation persistence
- **API Endpoints**: RESTful APIs for conversation and TTS services

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun package manager
- Backend server running (see server documentation)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Backend API URL (adjust if different)
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
client/
├── app/                          # Next.js App Router
│   ├── components/              # Reusable UI components
│   │   ├── AnimatedSection.tsx  # Animation wrapper
│   │   ├── ClientComponents.tsx # Client-side component exports
│   │   ├── CtaSection.tsx      # Call-to-action section
│   │   ├── FeaturesSection.tsx # Features showcase
│   │   ├── Footer.tsx          # Site footer
│   │   ├── HeroSection.tsx     # Landing page hero
│   │   ├── Navigation.tsx      # Site navigation
│   │   ├── ParticleBackground.tsx # Animated background
│   │   └── ScrollAnimation.tsx # Scroll-triggered animations
│   ├── practice/               # Language practice feature
│   │   ├── components/         # Practice-specific components
│   │   │   ├── ConversationContainer.tsx # Chat interface
│   │   │   ├── LanguageSelector.tsx     # Language picker
│   │   │   ├── MessageBubble.tsx        # Individual messages
│   │   │   ├── RecordingButton.tsx      # Voice input control
│   │   │   ├── TranscriptDisplay.tsx    # Speech transcription
│   │   │   └── UserInputArea.tsx        # Input interface
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── appReducer.ts   # State management
│   │   │   └── useConversationState.ts # Main conversation logic
│   │   ├── types/              # TypeScript definitions
│   │   ├── utils/              # Utility functions
│   │   └── data/               # Static data (languages)
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   └── metadata.ts             # SEO metadata
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind configuration
└── tsconfig.json              # TypeScript configuration
```

## 🎮 How to Use

### Landing Page

1. **Explore Features**: Learn about the app's capabilities
2. **View Supported Languages**: See all 75+ supported languages
3. **Get Started**: Click "Start Speaking Now" to begin practicing

### Practice Interface

1. **Select Language**: Choose your target language from the dropdown
2. **Start Conversation**:
   - **Manual Mode**: Press the magical orb to speak, press again to stop
   - **Auto Mode**: Long-press the orb to enable continuous conversation
3. **Speak Naturally**: Talk in your chosen language
4. **Listen to AI**: The AI responds with natural speech
5. **Replay Messages**: Click any AI message to hear it again
6. **Switch Languages**: Change languages to start a new conversation

### Voice Interaction States

- 🎤 **Blue Orb**: Currently listening to your speech
- 🟢 **Green Orb**: AI is speaking
- 🟡 **Yellow Orb**: Processing your input
- 🟣 **Purple Orb**: Auto-listen mode active
- ⭕ **Red Stop**: Press to stop auto-listen mode

## 🛠️ Dependencies

### Core Dependencies

```json
{
  "next": "15.2.4", // React framework
  "react": "^19.0.0", // UI library
  "react-dom": "^19.0.0", // React DOM
  "react-responsive": "^10.0.1", // Responsive utilities
  "msedge-tts": "^1.3.4" // Text-to-speech
}
```

### Development Dependencies

```json
{
  "@tailwindcss/postcss": "^4.1.3", // Styling
  "typescript": "^5", // Type safety
  "eslint": "^9", // Code linting
  "eslint-config-next": "15.2.4" // Next.js ESLint config
}
```

## 🎨 Design System

### Color Palette

- **Primary**: Emerald and teal tones for natural, calming feel
- **Secondary**: Amber and yellow for warmth and energy
- **Accent**: Blue for interactive elements
- **Background**: Soft amber/indigo with transparency

### Typography

- **Handwriting Font**: Custom handwritten style for magical feel
- **Sans-serif**: Clean, readable text for content

### Animations

- **Scroll Animations**: Fade, slide, and scale effects
- **Hover Effects**: Gentle scaling and color transitions
- **Loading States**: Pulsing and rotation animations

## 🔧 Configuration

### Environment Variables

```env
# Optional - API URL override
NEXT_PUBLIC_API_URL=http://localhost:8000

# Optional - Frontend URL for backend redirects
FRONTEND_URL=http://localhost:3000
```

### Tailwind Configuration

The project uses Tailwind CSS 4.0 with custom configurations for:

- Custom fonts (`font-handwriting`)
- Extended color palette
- Animation utilities
- Responsive breakpoints

## 🐛 Troubleshooting

### Common Issues

1. **Speech Recognition Not Working**

   - Ensure you're using Chrome or Edge browser
   - Check microphone permissions
   - Verify HTTPS in production (required for speech APIs)

2. **Audio Playback Issues**

   - Check browser audio permissions
   - Verify backend TTS service is running
   - Try refreshing the page

3. **Language Not Recognized**

   - Speak clearly and at normal pace
   - Ensure you've selected the correct language
   - Check microphone quality

4. **Conversation Not Saving**
   - Verify backend database connection
   - Check network connectivity
   - Ensure backend API is running on port 8000

### Browser Support

- **Recommended**: Chrome 88+, Edge 88+
- **Limited Support**: Firefox (no speech recognition), Safari (limited features)
- **Mobile**: Chrome Mobile, Safari Mobile (limited speech features)

## 🚀 Performance Optimization

### Features Implemented

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Caching**: Static asset caching
- **Bundle Analysis**: Built-in webpack analysis

### Best Practices

- **Mobile-First Design**: Optimized for mobile devices
- **Accessibility**: ARIA labels and semantic HTML
- **SEO Optimization**: Meta tags and structured data
- **Progressive Enhancement**: Works without JavaScript for basic features

## 📱 Mobile Experience

### Responsive Design

- **Breakpoints**: Mobile (0-768px), Tablet (768-1024px), Desktop (1024px+)
- **Touch Optimization**: Large touch targets for voice controls
- **Viewport Handling**: Proper mobile viewport configuration
- **Orientation Support**: Works in both portrait and landscape

### Mobile-Specific Features

- **Touch Voice Control**: Tap-to-start/stop voice recording
- **Visual Feedback**: Clear visual indicators for voice states
- **Reduced Animations**: Performance-optimized animations on mobile

## 🧪 Testing

### Manual Testing Checklist

- [ ] Voice recognition in multiple languages
- [ ] AI response generation and playback
- [ ] Audio replay functionality
- [ ] Language switching
- [ ] Mobile responsiveness
- [ ] Dark/light mode switching
- [ ] Animation performance

### Browser Testing

- [ ] Chrome (primary)
- [ ] Edge (recommended)
- [ ] Firefox (limited)
- [ ] Safari (basic)

## 🔄 Updates and Maintenance

### Regular Tasks

- **Dependency Updates**: Keep Next.js and dependencies current
- **Security Patches**: Apply security updates promptly
- **Performance Monitoring**: Monitor Core Web Vitals
- **Browser Compatibility**: Test with latest browser versions

### Upcoming Features

- [ ] User authentication and profiles
- [ ] Progress tracking and analytics
- [ ] Offline support for basic features
- [ ] Additional language models
- [ ] Custom voice selection

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/new-feature`
3. **Make changes**: Follow TypeScript and ESLint rules
4. **Test thoroughly**: Test on multiple browsers
5. **Submit pull request**: Include detailed description

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Follow Next.js configuration
- **Prettier**: Use for code formatting
- **Conventional Commits**: Use semantic commit messages

## 📄 License

This project is part of a language learning application suite. Please refer to the main project repository for licensing information.

## 🆘 Support

### Getting Help

- **Documentation**: Check this README and inline code comments
- **Issues**: Create GitHub issues for bugs or feature requests
- **Discussions**: Use GitHub discussions for questions

### Technical Support

- **Backend Issues**: Check server documentation
- **Database Issues**: Verify PostgreSQL connection
- **API Issues**: Check backend API logs

---

**Created with ❤️ for language learners everywhere**

_Embark on your magical language learning journey today!_ ✨
