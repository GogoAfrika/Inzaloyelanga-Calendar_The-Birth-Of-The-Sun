# Inzalo Yelanga - The Birth of the Sun 🌅

**African Traditional Calendar App**

A decolonial educational mobile application that serves as a digital sanctuary for African time, culture, and community. Built with React Native (Expo) and Node.js.

## 🌍 Mission

To serve as a decolonial educational tool, empowering users to reconnect with traditional African timekeeping and cultural practices, promoting a worldview rooted in nature and heritage rather than colonial systems.

## ✨ Features

### 🗓️ Calendar System
- **African Royal Calendar**: Solar calendar with African New Year on September 23rd
- **Lunar Calendar**: Track moon phases and their cultural significance
- **Seasonal Awareness**: Dynamic interface reflecting the sun's journey
- **Cultural Events**: Key dates like Royalty Day (December 23rd)
- **Interactive Circular Calendar**: Beautiful visual representation of the 13-month cycle
- **Event Management**: Create and manage personal events for each day

### 📚 Educational Hub
- **Daily Wisdom**: "Decolonization of the Day" content
- **Cultural Insights**: Traditional African calendar systems
- **Historical Context**: Significance of important dates
- **Diverse Systems**: Zulu lunisolar calendar and other traditional systems
- **Month Details**: Comprehensive information about each month's meaning and activities

### 👥 Community Platform
- **Celebration Feed**: Share traditional event celebrations with photos and stories
- **Event Planning**: Create and share private or public events for community gatherings
- **Cultural Library**: Articles, videos, and traditional practices
- **Moderated Environment**: Safe space for cultural sharing
- **Social Features**: Like, comment, and share community posts

### 🔐 Security & Privacy
- **Secure Authentication**: Email verification and strong passwords
- **User Control**: Optional donations and advertisements
- **Privacy Settings**: Complete control over personal information
- **Preference Management**: Customizable notifications and settings

## 🏗️ Architecture

### Frontend (Mobile App)
- **Framework**: React Native with Expo
- **Navigation**: React Navigation 6
- **UI Components**: React Native Paper with African-inspired theme
- **State Management**: React Context API
- **Storage**: AsyncStorage for offline data
- **Graphics**: React Native SVG for circular calendar visualization

### Backend (API Server)
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt password hashing
- **Email**: Nodemailer for verification and notifications
- **Security**: Helmet, CORS, rate limiting

### Key Technologies
- **TypeScript**: Full type safety across the stack
- **Linear Gradients**: Beautiful African-inspired color schemes
- **Cultural Design**: Kuba textiles and Ndebele art inspiration
- **Responsive Design**: Optimized for all mobile devices

## 🎨 Design Philosophy

### African-Inspired Theme
- **Colors**: Earth tones, sunset hues, and natural materials
- **Primary**: Saddle Brown (#8B4513) - earth and stability
- **Secondary**: Chocolate (#D2691E) - warm sunset
- **Accent**: Gold (#FFD700) - prosperity and sun
- **Seasonal**: Dynamic colors based on African calendar seasons

### Cultural Elements
- **Patterns**: Inspired by Kuba textiles and Ndebele geometric art
- **Typography**: Clean, readable fonts with cultural sensitivity
- **Icons**: Culturally appropriate symbols and representations
- **Language**: Zulu terms in navigation (Ikhaya, Ikhalenda, etc.)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Expo CLI (`npm install -g @expo/cli`)
- Git

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your environment variables
npm run dev
```

### Mobile App Setup
```bash
cd InzaloYelanga
npm install
npm start
# Use Expo Go app to scan QR code
```

### Environment Variables
Create a `.env` file in the backend directory:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/inzalo_yelanga

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:19006
```

## 📱 App Structure

### Screen Flow
1. **Welcome Screen**: App introduction and mission
2. **Authentication**: Register/Login with email verification
3. **Home Screen**: Today's African date, lunar phase, daily wisdom
4. **Calendar Screen**: Interactive circular calendar with month details and event management
5. **Community Screen**: Social features with celebration feed, events, and cultural library
6. **Profile Screen**: User settings, preferences, and support options

### African Calendar System
The app implements a 13-month African Royal Calendar:
- **Asar** (Month of Genesis) - African New Year on September 23rd
- **Geb** (Month of Growth) - Late Spring/Early Summer
- **Het-Hor** (Month of Fruits) - Early Summer
- **Ra** (Month of the Sun) - Mid-Summer, Royalty Day on December 23rd
- **Sobek** (Month of Waters) - Late Summer
- **Shu** (Month of Winds) - Autumn transition
- **Isis** (Month of Ripening) - Mid-Autumn
- **Neb-Het** (Month of Lamentation) - Late Autumn/Early Winter, Lamentation Day on March 21st
- **Set** (Month of Darkness) - Mid-Winter
- **Djehuti** (Month of Rejuvenation) - Late Winter
- **Horus** (Month of Rebirth) - Early Spring, Rebirth of the Sun on June 21st
- **Neith** (Month of Preparation) - Mid-Spring
- **Sokhemet** (Month of Breath) - Transition period

## 🛠️ Development Status

### ✅ Completed
- [x] Project setup and architecture
- [x] Backend authentication system
- [x] African calendar calculation system
- [x] Mobile app navigation and theming
- [x] Interactive circular calendar interface
- [x] Month details and educational content
- [x] Event creation and management
- [x] Community features (celebration feed, events, library)
- [x] User profile and preferences
- [x] Optional donations and ad controls
- [x] African-inspired UI design
- [x] Database models and API endpoints

### 🚧 In Progress
- [ ] Full authentication UI implementation
- [ ] Email verification system
- [ ] Push notifications for cultural events
- [ ] Admin panel for content management

### 📋 Planned Features
- [ ] Offline calendar access
- [ ] Multiple language support
- [ ] Cultural audio content
- [ ] AR/VR calendar visualization
- [ ] Integration with device calendar
- [ ] Advanced community moderation tools

## 🎯 Key Features Implemented

### Circular Calendar Interface
- Beautiful 13-month circular visualization
- Interactive month selection with detailed information
- Sacred day highlighting and descriptions
- Event creation and management for each day
- Seasonal color themes that change dynamically

### Community Platform
- Celebration feed with photo sharing
- Event creation and management
- Cultural library with articles and resources
- Social interactions (likes, comments, sharing)
- Tagged content for easy discovery

### User Experience
- Optional donations to support the mission
- Opt-in advertisements with clear explanations
- Comprehensive preference settings
- Cultural reminders and notifications
- Privacy controls and data management

## 🤝 Contributing

We welcome contributions that align with our mission of decolonial education and cultural preservation.

### Guidelines
1. Respect African cultural heritage and traditions
2. Maintain high code quality and documentation
3. Test thoroughly on multiple devices
4. Follow the established design patterns
5. Consider accessibility in all implementations

### Development Process
1. Fork the repository
2. Create a feature branch
3. Implement changes with tests
4. Submit a pull request with detailed description
5. Participate in code review process

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- African traditional calendar systems and their keepers
- Ubuntu philosophy: "I am because we are"
- Gekmovement.org for calendar system inspiration
- African textile artists (Kuba, Ndebele) for design inspiration
- The global African diaspora community

## 📞 Contact

For questions, suggestions, or collaboration opportunities:
- Email: contact@inzaloyelanga.org
- Website: [Coming Soon]
- Community: [Join our cultural discussions]

---

**"The best time to plant a tree was 20 years ago. The second best time is now."** - African Proverb

*Asante sana (Thank you) for joining our journey to reconnect with African time and culture.*