# Inzalo Yelanga - The Birth of the Sun

A comprehensive cross-platform mobile application that serves as a decolonial educational tool, providing a functional African Royal Calendar and community platform for shared learning. The app empowers users to reconnect with traditional African timekeeping and cultural practices, promoting a worldview rooted in nature and heritage rather than colonial systems.

## 🌟 Features

### 📅 African Royal Calendar System
- **13-Month Calendar**: Based on the traditional African Royal Calendar with 28 days per month (364 days total)
- **Sacred Days**: Recognition of important cultural dates like African New Year (September 23rd) and Royalty Day (December 23rd)
- **Seasonal Awareness**: Dynamic interface that changes with seasons and reflects the sun's journey
- **Lunar Integration**: Traditional lunar calendar tracking with phase information
- **Interactive Calendar**: Circular calendar interface with month segments and day grids

### 🎓 Educational Hub
- **Cultural Knowledge**: Detailed information about each month's significance, activities, and cultural practices
- **Sacred Day Details**: Comprehensive explanations of important dates and their cultural significance
- **Decolonial Wisdom**: Daily insights focused on decolonization and cultural reconnection
- **Traditional Practices**: Information about rites of passage, ceremonies, and cultural events

### 👥 Community Platform
- **Celebration Feed**: Moderated feed where users share photos and stories of traditional celebrations
- **Event Planning**: Create and share private or public events for community gatherings
- **Cultural Library**: Share and discover articles, videos, and information about traditional practices
- **Community Moderation**: Tools for maintaining respectful and culturally appropriate content

### 🔐 Secure User System
- **Email Registration**: Secure account creation with email verification
- **Strong Authentication**: Password requirements and secure login system
- **User Profiles**: Personalized experience with user preferences and settings

### 🎨 Cultural Design
- **African-Inspired UI**: Rich, vibrant colors and geometric patterns inspired by Kuba textiles and Ndebele art
- **Seasonal Themes**: Dynamic color schemes that change with the seasons
- **Traditional Aesthetics**: Organic, intuitive interface with natural material textures

### 💰 Sustainability Features
- **Optional Donations**: Discreet donation system for users who wish to support the app
- **Opt-In Advertising**: User-controlled ad system that respects user choice
- **Community-Driven**: Content created and moderated by the community

## 🏗️ Architecture

### Frontend (React Native/Expo)
- **Cross-Platform**: Works on both iOS and Android
- **Modern UI**: Built with React Native Paper and custom African-themed components
- **Offline Support**: Local storage for calendar events and user preferences
- **Real-time Updates**: Dynamic calendar that updates based on current date and season

### Backend (Node.js/Express)
- **RESTful API**: Comprehensive API for all app features
- **MongoDB Database**: Scalable database for user data, posts, events, and articles
- **Authentication**: JWT-based secure authentication system
- **File Upload**: Support for image uploads in community posts
- **Rate Limiting**: Protection against abuse and spam

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- MongoDB (local or cloud instance)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd InzaloYelanga
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd InzaloYelanga
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the backend directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/inzalo-yelanga
   JWT_SECRET=your-super-secret-jwt-key
   FRONTEND_URL=http://localhost:19006
   ```

5. **Database Setup**
   ```bash
   # Start MongoDB (if using local instance)
   mongod
   
   # Or use MongoDB Atlas for cloud hosting
   ```

6. **Start the Backend**
   ```bash
   cd backend
   npm run dev
   ```

7. **Start the Frontend**
   ```bash
   cd InzaloYelanga
   npm start
   ```

8. **Run on Device/Simulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your phone

## 📱 App Structure

### Screens
- **Home Screen**: Daily overview with current African date, wisdom, and quick actions
- **Calendar Screen**: Interactive circular calendar with month details and event management
- **Community Screen**: Celebration feed, event planning, and cultural library
- **Profile Screen**: User settings, preferences, and account management

### Key Components
- **Circular Calendar**: Interactive 13-month calendar with radial design
- **Month Details**: Comprehensive information about each month's cultural significance
- **Event Management**: Create, edit, and manage personal and community events
- **Community Feed**: Social platform for sharing cultural celebrations and experiences

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Calendar
- `GET /api/calendar/today` - Get today's African calendar information
- `GET /api/calendar/date/:date` - Get calendar info for specific date
- `GET /api/calendar/months` - Get all months data
- `GET /api/calendar/months/:monthIndex` - Get specific month data
- `GET /api/calendar/sacred-day/:date` - Check if date is sacred day

### Community
- `GET /api/community/posts` - Get community posts
- `POST /api/community/posts` - Create new post
- `GET /api/community/events` - Get cultural events
- `POST /api/community/events` - Create new event
- `GET /api/community/articles` - Get cultural articles
- `POST /api/community/articles` - Create new article

## 🎨 Design Philosophy

The app's design is deeply rooted in African cultural aesthetics:

- **Colors**: Inspired by African earth tones, sunset colors, and traditional textiles
- **Patterns**: Geometric designs from Kuba textiles and Ndebele art
- **Typography**: Clean, readable fonts that respect cultural heritage
- **Layout**: Organic, intuitive navigation that feels natural and welcoming

## 🌍 Cultural Significance

Inzalo Yelanga represents more than just a calendar app - it's a digital sanctuary for African time, culture, and decolonial education. The app:

- **Reconnects** users with indigenous timekeeping systems
- **Educates** about traditional African cultural practices
- **Builds** community around shared cultural experiences
- **Empowers** through knowledge and cultural pride
- **Decolonizes** by centering African perspectives and systems

## 🤝 Contributing

We welcome contributions from the community! Please read our contributing guidelines and ensure all contributions respect the cultural significance and decolonial mission of the project.

### Development Guidelines
- Follow African cultural sensitivity in all content and design decisions
- Ensure accessibility for users with different abilities
- Maintain the app's educational and community-building mission
- Test thoroughly on both iOS and Android platforms

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🙏 Acknowledgments

- The African Royal Calendar system and its cultural significance
- Traditional African communities and knowledge keepers
- The decolonial education movement
- All contributors and community members

## 📞 Support

For support, questions, or feedback:
- Create an issue in the GitHub repository
- Contact the development team
- Join our community discussions

---

**Inzalo Yelanga** - Empowering African cultural reconnection through technology and community.