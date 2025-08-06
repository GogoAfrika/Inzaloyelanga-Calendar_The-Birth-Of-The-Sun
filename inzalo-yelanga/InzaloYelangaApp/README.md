# Inzalo Yelanga - "Children of the Sun" 🌅

A decolonial African calendar mobile application that serves as a digital sanctuary for African time, culture, and education. Built with React Native for cross-platform compatibility (iOS and Android).

## 🌍 Project Overview

**Inzalo Yelanga** (meaning "Children of the Sun" in isiXhosa) is a completely free mobile application designed to reconnect African people with their indigenous understanding of time, seasons, and spiritual cycles. The app moves away from colonial calendar systems toward a culturally rich African calendar based on the Gekmovement.org's African Royal Calendar.

### Core Mission
- **Decolonial Education**: Provide educational tools rooted in African heritage
- **Cultural Preservation**: Celebrate and maintain traditional African practices
- **Community Building**: Foster connections through shared cultural experiences
- **Spiritual Alignment**: Connect users with natural rhythms and ancestral wisdom

## ✨ Key Features

### 🗓️ African Royal Calendar System
- **13 Months**: Each with 28 days (364 days total)
- **Sacred Days**: Special cultural and spiritual observances
- **Dynamic Interface**: Circular calendar design with seasonal transitions
- **Current Date Tracking**: Real-time African calendar date display

### 🎨 Traditional African Design
- **Kuba Textile Patterns**: Inspired by traditional Congolese art
- **Ndebele Geometric Designs**: South African architectural patterns
- **Earth-Tone Color Palette**: Ochre, terracotta, gold, and natural colors
- **Cultural Symbolism**: Month symbols representing African deities and concepts

### 📚 Educational Hub
- **Cultural Significance**: Detailed explanations of each month's meaning
- **Sacred Day Information**: Historical and spiritual context
- **Decolonial Content**: Daily wisdom and educational insights
- **Traditional Practices**: Information about ceremonies and rites

### 👥 Community Features
- **Celebration Feed**: Share photos and stories of traditional events
- **Event Planning**: Create and share community gatherings
- **Cultural Library**: Articles, videos, and resources about African practices
- **User Profiles**: Connect with like-minded community members

### 🔐 Security & Privacy
- **Firebase Authentication**: Secure user registration and login
- **Email Verification**: Confirmed user accounts
- **Password Reset**: Secure password recovery system
- **Data Protection**: User privacy and data security

## 🏗️ Technical Architecture

### Frontend (React Native)
```
src/
├── components/          # Reusable UI components
│   ├── CircularCalendar.tsx    # Main calendar interface
│   ├── MonthlyView.tsx         # 28-day grid view
│   └── MonthImage.tsx          # Month symbol components
├── screens/            # Application screens
│   ├── HomeScreen.tsx          # Main app interface
│   └── LoginScreen.tsx         # Authentication screen
├── services/           # Business logic and API calls
│   └── authService.ts          # Authentication service
├── constants/          # App configuration
│   ├── africanCalendar.ts      # Calendar data and logic
│   └── theme.ts                # Design system constants
├── types/              # TypeScript definitions
│   └── index.ts                # Type definitions
└── utils/              # Utility functions
```

### Backend Integration
- **Firebase Authentication**: User management
- **Cloud Firestore**: Data storage
- **Firebase Storage**: Media file storage
- **Push Notifications**: Community updates

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Firebase project setup

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd inzalo-yelanga/InzaloYelangaApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Firebase Configuration**
   - Create a Firebase project
   - Add iOS and Android apps to your Firebase project
   - Download `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
   - Place these files in their respective directories

5. **Run the application**
   
   For Android:
   ```bash
   npx react-native run-android
   ```
   
   For iOS:
   ```bash
   npx react-native run-ios
   ```

## 📱 App Structure

### The 13 Months (African Royal Calendar)

1. **Asar** (Sept 23) - Month of Genesis/New Beginnings ☀️
2. **Geb** - Month of Growth 🌱
3. **Het-Hor** - Month of Fruits 🍇
4. **Ra** (Dec 23) - Month of the Sun (Royalty Day) 👑
5. **Sobek** - Month of Waters 💧
6. **Shu** - Month of Winds 🌪️
7. **Isis** - Month of Ripening 🌾
8. **Neb-Het** (Mar 21) - Month of Lamentation 🕯️
9. **Set** - Month of Darkness/Depth 🌑
10. **Djehuti** - Month of Rejuvenation 🌿
11. **Horus** (Jun 21) - Month of Rebirth 🦅
12. **Neith** - Month of Preparation 🔨
13. **Sokhemet** - Month of Breath/Transition 💨

### Sacred Days
- **African New Year** (September 23): Zep Tepi - Genesis and renewal
- **African Royalty Day** (December 23): Celebrating African leadership
- **Lamentation Day** (March 21): Honoring ancestors and reflection
- **Rebirth of the Sun** (June 21): Hope and renewal

## 🎨 Design System

### Color Palette
- **Primary Gold**: #FFD700 (Sun and royalty)
- **Secondary Mint**: #A3E4D7 (Nature and growth)
- **Kuba Colors**: Deep red, rich black, cream white
- **Ndebele Colors**: Royal blue, forest green, crimson red
- **Earth Tones**: Terracotta, ochre, sienna, mahogany

### Typography
- **Headers**: Bold, prominent for titles
- **Body Text**: Clean, readable for content
- **Cultural Elements**: Stylized for traditional elements

## 🔧 Development Guidelines

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Consistent naming conventions
- Comprehensive error handling
- Performance optimization

### Testing Strategy
- Unit tests for utility functions
- Integration tests for services
- E2E tests for critical user flows
- Performance testing for animations

### Security Best Practices
- Input validation and sanitization
- Secure authentication flows
- Data encryption for sensitive information
- Regular security audits

## 🌐 Deployment

### App Store Preparation
1. **iOS App Store**
   - Configure app metadata
   - Prepare screenshots and descriptions
   - Submit for review

2. **Google Play Store**
   - Generate signed APK/AAB
   - Configure store listing
   - Submit for review

### Backend Deployment
- Firebase Hosting for web admin panel
- Cloud Functions for server-side logic
- Firestore security rules configuration

## 🤝 Contributing

We welcome contributions from developers who share our vision of cultural preservation and decolonial education. Please read our contributing guidelines and code of conduct.

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Gekmovement.org** for the African Royal Calendar system
- **Traditional African Cultures** for inspiration and wisdom
- **Open Source Community** for tools and libraries
- **African Diaspora** for cultural preservation efforts

## 📞 Support

For support, questions, or cultural consultations, please contact:
- Email: support@inzaloyelanga.org
- Website: www.gekmovement.org
- Community Forum: [link]

---

**"Inzalo Yelanga"** - Reconnecting with our roots, one day at a time. 🌅

*Built with ❤️ for the African community worldwide.*
