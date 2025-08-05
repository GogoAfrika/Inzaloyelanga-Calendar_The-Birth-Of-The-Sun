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

### 📚 Educational Hub
- **Daily Wisdom**: "Decolonization of the Day" content
- **Cultural Insights**: Traditional African calendar systems
- **Historical Context**: Significance of important dates
- **Diverse Systems**: Zulu lunisolar calendar and other traditional systems

### 👥 Community Platform
- **Celebration Feed**: Share traditional event celebrations
- **Event Planning**: Create and share community gatherings
- **Cultural Library**: Articles, videos, and traditional practices
- **Moderated Environment**: Safe space for cultural sharing

### 🔐 Security & Privacy
- **Secure Authentication**: Email verification and strong passwords
- **User Control**: Optional donations and advertisements
- **Privacy Settings**: Complete control over personal information

## 🏗️ Architecture

### Frontend (Mobile App)
- **Framework**: React Native with Expo
- **Navigation**: React Navigation 6
- **UI Components**: React Native Paper with African-inspired theme
- **State Management**: React Context API
- **Storage**: AsyncStorage for offline data

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
- Expo CLI
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
2. **Authentication**: Register/Login (coming soon)
3. **Home Screen**: Today's African date, lunar phase, daily wisdom
4. **Calendar Screen**: Full calendar exploration (coming soon)
5. **Community Screen**: Social features (coming soon)
6. **Profile Screen**: User settings and preferences

### African Calendar System
- **12 Months**: Ukuphila, Ukuhluma, Ukuvuna, Ubukumkani, Ukuthula, Ukuphendula, Ukubuyisa, Ukugcina, Ukuhlanganisa, Ukuphakama, Ukuqonda, Ukulungisa
- **Seasons**: Spring, Summer, Autumn, Winter with cultural significance
- **Lunar Integration**: Moon phases with traditional meanings
- **Cultural Events**: Integrated traditional celebrations

## 🛠️ Development Status

### ✅ Completed
- [x] Project setup and architecture
- [x] Backend authentication system
- [x] African calendar calculation system
- [x] Mobile app navigation and theming
- [x] Home screen with calendar integration
- [x] African-inspired UI design
- [x] Database models and API endpoints

### 🚧 In Progress
- [ ] Full authentication UI implementation
- [ ] Complete calendar screen
- [ ] Community features
- [ ] Admin panel
- [ ] Email verification system

### 📋 Planned Features
- [ ] Push notifications for cultural events
- [ ] Offline calendar access
- [ ] Multiple language support
- [ ] Cultural audio content
- [ ] AR/VR calendar visualization
- [ ] Integration with device calendar

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