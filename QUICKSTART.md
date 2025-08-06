# 🚀 Quick Start Guide - Inzalo Yelanga

Get the African Traditional Calendar app running in minutes!

## Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Installation guide](https://docs.mongodb.com/manual/installation/)
- **Expo Go app** on your phone - [iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

## 🎯 Quick Setup (3 minutes)

### Option 1: Automated Setup
```bash
# Run the setup script
./setup.sh
```

### Option 2: Manual Setup

1. **Install dependencies:**
```bash
# Backend
cd backend
npm install

# Mobile app
cd ../InzaloYelanga
npm install
```

2. **Configure backend:**
```bash
cd backend
# Create .env file with your settings
cp .env.example .env
# Edit .env with your MongoDB and email settings
```

3. **Start the servers:**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Mobile app
cd InzaloYelanga
npm start
```

4. **Run on your phone:**
- Install Expo Go app
- Scan the QR code from the terminal
- The app will load on your device!

## 📱 What You'll See

### Home Screen
- Today's African date and season
- Lunar phase information
- Daily wisdom and cultural insights
- Quick navigation to other features

### Calendar Screen
- Beautiful circular 13-month calendar
- Interactive month selection
- Sacred day information (African New Year, Royalty Day, etc.)
- Event creation and management
- Educational content for each month

### Community Screen
- Celebration feed with photos and stories
- Event creation and discovery
- Cultural library with articles
- Social interactions (likes, comments)

### Profile Screen
- User preferences and settings
- Activity statistics
- Optional donation support
- Opt-in advertisement controls

## 🎨 Key Features to Try

1. **Circular Calendar**: Tap different months to see detailed information
2. **Event Creation**: Create personal events for any day
3. **Community Posts**: Share celebrations and cultural experiences
4. **Sacred Days**: Learn about important cultural dates
5. **Preferences**: Customize notifications and app behavior

## 🔧 Troubleshooting

### Common Issues

**"Metro bundler not found"**
```bash
cd InzaloYelanga
npm install
npm start
```

**"MongoDB connection failed"**
- Ensure MongoDB is running: `mongod`
- Check your `.env` file configuration

**"Expo Go can't connect"**
- Make sure your phone and computer are on the same WiFi network
- Try switching to "Tunnel" mode in Expo

**"App crashes on startup"**
- Clear Expo cache: `expo r -c`
- Restart the development server

### Getting Help

- Check the [README.md](README.md) for detailed documentation
- Review the [backend logs](backend/src/index.ts) for API issues
- Ensure all dependencies are installed correctly

## 🌍 Cultural Context

Inzalo Yelanga implements the African Royal Calendar system with:

- **13 months** of 28 days each (364 days total)
- **African New Year** on September 23rd (Autumnal Equinox)
- **Royalty Day** on December 23rd (Sun closest to Earth)
- **Sacred days** with deep cultural significance
- **Seasonal themes** reflecting natural cycles

## 🎯 Next Steps

1. **Explore the calendar**: Learn about each month's meaning
2. **Join the community**: Share your cultural experiences
3. **Create events**: Plan gatherings and celebrations
4. **Read articles**: Discover traditional practices
5. **Customize settings**: Set up your preferences

## 🙏 Support the Mission

- **Voluntary donations** help maintain the app
- **Opt-in ads** support development costs
- **Community contributions** enrich cultural content
- **Feedback and suggestions** improve the experience

---

**"The best time to plant a tree was 20 years ago. The second best time is now."** - African Proverb

*Welcome to the journey of reconnecting with African time and culture!*