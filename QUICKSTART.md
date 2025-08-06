# 🚀 Quick Start Guide - Inzalo Yelanga

Get the Inzalo Yelanga app running on your device in minutes!

## Prerequisites

Before you begin, make sure you have:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Expo Go** app on your phone (iOS/Android)
- **MongoDB** (local or cloud instance)

## Option 1: Automated Setup (Recommended)

1. **Run the setup script:**
   ```bash
   ./setup.sh
   ```

2. **Start MongoDB:**
   ```bash
   mongod
   ```

3. **Start the backend:**
   ```bash
   cd backend
   npm run dev
   ```

4. **Start the frontend:**
   ```bash
   cd InzaloYelanga
   npm start
   ```

5. **Run on your device:**
   - Open **Expo Go** app on your phone
   - Scan the QR code displayed in your terminal
   - The app will load on your device!

## Option 2: Manual Setup

### 1. Install Dependencies

**Frontend:**
```bash
cd InzaloYelanga
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Configure Environment

Create a `.env` file in the `backend` directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/inzalo-yelanga
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:19006
```

### 3. Build Backend
```bash
cd backend
npm run build
```

### 4. Start Services

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd InzaloYelanga
npm start
```

### 5. Run on Device

- Install **Expo Go** from App Store (iOS) or Google Play (Android)
- Scan the QR code from your terminal
- The app will load on your device!

## 🎯 What You'll See

### Home Screen
- Current African date and season
- Daily wisdom and cultural insights
- Quick access to calendar and community

### Calendar Screen
- Interactive circular 13-month calendar
- Month details with cultural significance
- Sacred days and event management
- Beautiful seasonal color themes

### Community Screen
- Celebration feed for sharing cultural experiences
- Event planning for community gatherings
- Cultural library for articles and knowledge

## 🔧 Troubleshooting

### Common Issues

**"Module not found" errors:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Expo connection issues:**
- Make sure your phone and computer are on the same WiFi network
- Try using a tunnel connection: `expo start --tunnel`

**MongoDB connection errors:**
- Ensure MongoDB is running: `mongod`
- Check your connection string in `.env`
- For cloud MongoDB, use the connection string from your provider

**Port already in use:**
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 19006 (frontend)
lsof -ti:19006 | xargs kill -9
```

### Getting Help

- Check the main [README.md](README.md) for detailed documentation
- Create an issue in the GitHub repository
- Check the console for error messages

## 📱 Testing on Different Devices

### iOS Simulator
```bash
# Press 'i' in the Expo terminal
# Or run: expo start --ios
```

### Android Emulator
```bash
# Press 'a' in the Expo terminal
# Or run: expo start --android
```

### Physical Device
- Install Expo Go app
- Scan QR code
- Shake device to open developer menu

## 🎨 Customization

### Changing Colors
Edit `InzaloYelanga/src/theme/africanTheme.ts` to customize the app's color scheme.

### Adding Content
- Calendar data: `InzaloYelanga/src/utils/africanCalendar.ts`
- Community features: `backend/src/models/`
- API endpoints: `backend/src/routes/`

## 🚀 Next Steps

1. **Explore the Calendar**: Navigate through the 13 months and learn about their cultural significance
2. **Create Events**: Add personal events to the calendar
3. **Join Community**: Share celebrations and cultural experiences
4. **Contribute**: Help improve the app by contributing code or content

## 🌍 Cultural Context

Inzalo Yelanga is more than just a calendar app - it's a digital sanctuary for African time, culture, and decolonial education. Take time to:

- Learn about the 13-month African Royal Calendar system
- Understand the significance of sacred days
- Explore traditional cultural practices
- Connect with the community

---

**Happy exploring! 🌅**

*Inzalo Yelanga - Empowering African cultural reconnection through technology and community.*