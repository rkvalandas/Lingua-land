# Lingua Land 🌟

An AI-powered language learning application that combines voice recognition, AI conversation, and text-to-speech technologies to create a natural language learning experience across 150+ world languages.

## ✨ Features

### 🎯 Core Functionality

- **Real-time Voice Conversation**: Practice speaking in 150+ languages with an AI companion
- **Multiple AI Services**: Comprehensive language tools including conversation, grammar checking, translation, summarization, and paraphrasing
- **Speech Recognition**: Advanced speech-to-text in multiple languages
- **AI-Powered Responses**: Intelligent conversational AI that adapts to your language level
- **Natural Text-to-Speech**: High-quality voice synthesis for AI responses
- **Conversation Persistence**: All conversations are saved with audio replay functionality
- **User Authentication**: Secure sign-in/sign-up with user settings and conversation history
- **Mobile-Responsive Design**: Fully optimized for mobile devices with touch-friendly interfaces

### 🌍 Language Support

The app supports conversation practice in 150+ languages including:

- **European**: English, Spanish, French, German, Italian, Portuguese, Russian, Dutch, Polish, Swedish, Turkish, Greek, Czech, Finnish, Danish, Norwegian, Hungarian, Romanian, Slovak, Ukrainian, Catalan, Bulgarian, Croatian, Serbian, Lithuanian, Latvian, Estonian, Slovenian, Icelandic, Maltese, Welsh, Irish, Basque, Galician, Belarusian, Faroese, Luxembourgish, Corsican, Frisian, Sardinian, Occitan, Breton, Scottish Gaelic
- **Asian**: Japanese, Chinese (Mandarin/Cantonese), Korean, Hindi, Vietnamese, Thai, Indonesian, Malay, Filipino, Urdu, Bengali, Telugu, Tamil, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Nepali, Sinhala, Burmese, Khmer, Lao, Mongolian, Kazakh, Uzbek, Kyrgyz, Tajik, Azerbaijani, Armenian, Georgian, Tibetan, Pashto, Dari, Odia, Assamese, Uyghur, Turkmen, Tatar
- **Middle Eastern & African**: Arabic, Hebrew, Persian, Kurdish (Sorani/Kurmanji), Amharic, Somali, Swahili, Yoruba, Igbo, Hausa, Zulu, Afrikaans, Xhosa, Setswana, Sesotho, Oromo, Tigrinya, Wolof, Fulani, Bambara, Akan, Malagasy
- **Indigenous & Regional**: Quechua, Guaraní, Nahuatl, Maya, Cherokee, Navajo, Maori, Hawaiian, Inuktitut, Lakota, Ojibwe
- **Constructed & Classical**: Esperanto, Latin, Sanskrit, Classical Chinese

### 🎨 User Experience

- **Responsive Design**: Optimized for desktop and mobile devices
- **Mobile Navigation**: Collapsible sidebar with hamburger menu
- **Touch-Optimized Interactions**: Enhanced touch targets and gestures
- **Cross-Platform Compatibility**: Works across modern browsers
- **Progressive Web App Features**: Offline-ready capabilities

### 🔧 Technical Features

- **Auto-Listen Mode**: Continuous conversation without manual button presses
- **Interrupt Capability**: Stop AI speech by speaking over it
- **Audio Replay**: Replay any AI message from conversation history
- **Real-time Transcription**: See your speech converted to text in real-time
- **Conversation Management**: Create, edit, and delete conversation titles
- **User Settings**: Persistent user preferences and language settings
- **Mobile Touch Controls**: Enhanced touch interactions with `touch-manipulation` and active states
- **Responsive Sidebar**: Collapsible sidebar with mobile overlay and hamburger menu
- **Session Management**: Secure JWT-based authentication with refresh tokens

## 🏗️ Architecture

### Frontend (Next.js 15)

- **Framework**: Next.js 15 with TypeScript and App Router
- **Styling**: Tailwind CSS 4.0 with custom animations and responsive design
- **State Management**: React hooks with useReducer for complex state management
- **Authentication**: JWT-based authentication with AuthContext
- **Voice Recognition**: Web Speech API with cross-browser support
- **Responsive Design**: Mobile-first approach with touch-optimized interfaces
- **Navigation**: Dynamic sidebar with mobile hamburger menu
- **Services**: Multiple AI-powered language tools integrated in a unified interface

### Backend Integration

The frontend communicates with an Express.js backend that provides:

- **User Authentication**: JWT-based auth with registration, login, and user settings
- **AI Conversation**: LangChain integration with Groq LLM for multiple AI services
- **Text-to-Speech**: Microsoft Edge TTS for natural voice synthesis
- **Database**: PostgreSQL for user data, conversation persistence, and settings
- **API Endpoints**: RESTful APIs for auth, conversations, AI services, and TTS

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

   # Optional - Frontend URL for backend redirects
   FRONTEND_URL=http://localhost:3000
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

## 🎮 How to Use

### Landing Page

1. **Explore Features**: Learn about the app's capabilities
2. **View Supported Languages**: See all 150+ supported languages
3. **Get Started**: Sign up or sign in to access the services

### Authentication

1. **Sign Up**: Create a new account with username, email, and password
2. **Sign In**: Log in with your existing credentials
3. **User Settings**: Manage your language preferences and settings

### Services Interface

1. **Sidebar Navigation**: Access different AI services from the collapsible sidebar

   - **Conversation**: Practice speaking with AI in your target language
   - **Grammar Checker**: Check and correct grammar mistakes
   - **Translator**: Translate text between languages
   - **Summariser**: Summarise long text into key points
   - **Paraphraser**: Rephrase text while maintaining meaning

2. **Conversation Practice**:

   - **Select Language**: Choose your target language from the dropdown
   - **Start Conversation**:
     - **Manual Mode**: Press the magical orb to speak, press again to stop
     - **Auto Mode**: Long-press the orb to enable continuous conversation
   - **Speak Naturally**: Talk in your chosen language
   - **Listen to AI**: The AI responds with natural speech
   - **Replay Messages**: Click any AI message to hear it again
   - **Manage Conversations**: Edit titles, delete conversations, or start new ones

3. **Mobile Experience**:
   - **Hamburger Menu**: Access sidebar on mobile via the menu button
   - **Touch Controls**: Optimized touch targets for mobile interaction
   - **Responsive Layout**: Adaptive layout for different screen sizes

### Voice Interaction States

- 🎤 **Listening**: Currently recording your speech
- 🟢 **AI Speaking**: AI is generating voice response
- 🟡 **Processing**: Analyzing your input
- 🟣 **Auto-Listen**: Continuous conversation mode active
- ⭕ **Stop**: Press to stop auto-listen mode

## 🛠️ Dependencies

### Core Dependencies

```json
{
  "next": "15.2.4", // React framework with App Router
  "react": "^19.0.0", // UI library
  "react-dom": "^19.0.0", // React DOM
  "react-responsive": "^10.0.1", // Responsive utilities
  "msedge-tts": "^1.3.4", // Text-to-speech
  "framer-motion": "^12.15.0", // Animations
  "react-markdown": "^10.1.0", // Markdown rendering
  "remark-gfm": "^4.0.1", // GitHub Flavored Markdown
  "rehype-highlight": "^7.0.2" // Syntax highlighting
}
```

### Development Dependencies

```json
{
  "@tailwindcss/postcss": "^4.1.3", // Tailwind CSS processing
  "tailwindcss": "^4", // Utility-first CSS framework
  "typescript": "^5", // Type safety
  "eslint": "^9", // Code linting
  "eslint-config-next": "15.2.4", // Next.js ESLint config
  "@eslint/eslintrc": "^3", // ESLint configuration
  "@types/node": "^20", // Node.js type definitions
  "@types/react": "^19", // React type definitions
  "@types/react-dom": "^19" // React DOM type definitions
}
```

## 🎨 Design System

### Typography

- **Custom Fonts**: Handwritten style fonts for branding
- **Sans-serif**: Clean, readable text for content

### Animations

- **Scroll Animations**: Fade, slide, and scale effects with Framer Motion
- **Touch Interactions**: Active scale effects for mobile (`active:scale-95`)
- **Loading States**: Pulsing and rotation animations
- **Performance Optimized**: Reduced animations on mobile devices for better performance

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

- Custom fonts and typography
- Animation utilities
- Responsive breakpoints
- Touch interaction classes

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
   - Check user authentication status
   - Check network connectivity
   - Ensure backend API is running on port 8000

5. **Mobile Touch Issues**

   - Ensure touch targets meet minimum 44px requirement
   - Check for proper `touch-manipulation` CSS properties
   - Verify mobile viewport meta tag is configured

6. **Authentication Issues**
   - Check JWT token validity and expiration
   - Verify user session status
   - Clear browser storage and retry login

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
- **Touch Optimization**: Large touch targets (minimum 44px) for voice controls
- **Sidebar Navigation**: Collapsible sidebar with hamburger menu on mobile
- **Viewport Handling**: Proper mobile viewport configuration
- **Orientation Support**: Works in both portrait and landscape modes

### Mobile-Specific Features

- **Touch Voice Control**: Tap-to-start/stop voice recording with haptic feedback
- **Visual Feedback**: Clear visual indicators for voice states and interactions
- **Mobile Overlay**: Full-screen overlay for sidebar navigation on mobile
- **Reduced Animations**: Performance-optimized animations on mobile devices
- **Touch Gestures**: Enhanced touch interactions with `touch-manipulation` and active states
- **Mobile Header**: Fixed header with logo and hamburger menu for easy navigation

## 🧪 Testing

### Manual Testing Checklist

- [ ] Voice recognition in multiple languages
- [ ] AI response generation and playback for all services
- [ ] Audio replay functionality
- [ ] Language switching and conversation management
- [ ] User authentication (sign up, sign in, logout)
- [ ] Conversation history and editing
- [ ] Mobile responsiveness and touch interactions
- [ ] Sidebar navigation and hamburger menu
- [ ] Dark/light mode switching
- [ ] Animation performance across devices

### Browser Testing

- [ ] Chrome (primary)
- [ ] Edge (recommended)
- [ ] Firefox (limited)
- [ ] Safari (basic)
- [ ] Mobile browsers (Chrome Mobile, Safari Mobile)

## 🔧 Recent Updates

### Mobile Optimization (Latest)

The application has been comprehensively optimized for mobile devices:

- **Responsive Sidebar**: Implemented collapsible sidebar with mobile overlay and hamburger menu
- **Touch-Friendly Controls**: Enhanced touch targets with minimum 44px heights and `touch-manipulation`
- **Mobile Navigation**: Added mobile header with menu toggle functionality
- **Touch Interactions**: Added `active:scale-95` effects for better touch feedback
- **Mobile Layout**: Responsive padding, margins, and text sizing throughout the application
- **Conversation Interface**: Optimized chat components for mobile viewing and interaction

### Authentication System

- **User Registration**: Secure account creation with validation
- **JWT Authentication**: Token-based session management
- **User Settings**: Persistent language preferences and theme settings
- **Conversation History**: User-specific conversation storage and management

### AI Services Suite

- **Conversation AI**: Interactive voice conversations with AI in 150+ languages
- **Grammar Checker**: Intelligent grammar correction and improvement suggestions
- **Language Translator**: Accurate translation between multiple language pairs
- **Text Summariser**: AI-powered text summarization for key points extraction
- **Text Paraphraser**: Content rephrasing while maintaining original meaning
- **Unified Interface**: Consistent UI/UX across all AI services with responsive design

## 🔄 Updates and Maintenance

### Regular Tasks

- **Dependency Updates**: Keep Next.js and dependencies current
- **Security Patches**: Apply security updates promptly
- **Performance Monitoring**: Monitor Core Web Vitals
- **Browser Compatibility**: Test with latest browser versions

### Upcoming Features

- [ ] User profile management and preferences
- [ ] Advanced conversation analytics and progress tracking
- [ ] Offline support for basic features
- [ ] Additional AI language models and voice options
- [ ] Custom voice selection and speech rate control
- [ ] Advanced mobile gestures and interactions
- [ ] Push notifications for practice reminders
- [ ] Social features and language learning community

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

- **Backend Issues**: Check server documentation and API logs
- **Database Issues**: Verify PostgreSQL connection and user authentication
- **API Issues**: Check backend API logs and network connectivity
- **Mobile Issues**: Verify touch targets, viewport settings, and responsive breakpoints
- **Authentication Issues**: Check JWT token validity and user session status

---

**Created with ❤️ for language learners everywhere**

_Embark on your magical language learning journey today!_ ✨

## 📋 Quick Start Summary

1. **Clone & Install**: `git clone <repo> && cd client && npm install`
2. **Environment**: Copy `.env.local.example` to `.env.local` and configure
3. **Start Development**: `npm run dev`
4. **Open Browser**: Navigate to `http://localhost:3000`
5. **Sign Up**: Create an account to access all services
6. **Start Learning**: Choose a service and begin your language journey!

For detailed backend setup, refer to the server documentation in the `../server/` directory.
