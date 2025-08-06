# Build & Deployment Instructions for Inzalo Yelanga

## 🚀 Quick Start

### Prerequisites
- **Node.js** v16+ (recommended: v18.17.0+)
- **React Native CLI** (`npm install -g @react-native-community/cli`)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development - macOS only)
- **Firebase Project** (for backend services)

### Initial Setup

1. **Clone and Install Dependencies**
   ```bash
   cd InzaloYelangaApp
   npm install
   ```

2. **iOS Setup** (macOS only)
   ```bash
   cd ios
   pod install
   cd ..
   ```

## 📱 Development Environment

### Running on Android
```bash
# Start Metro bundler
npm start

# In a new terminal, run Android app
npx react-native run-android
```

### Running on iOS
```bash
# Start Metro bundler
npm start

# In a new terminal, run iOS app
npx react-native run-ios
```

### Development Server
```bash
# Start with cache reset (if needed)
npm start -- --reset-cache
```

## 🔥 Firebase Configuration

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project: `inzalo-yelanga`
3. Enable Authentication (Email/Password)
4. Create Firestore Database
5. Set up Firebase Storage

### 2. Configure Firebase for React Native

#### Android Configuration
1. Add Android app to Firebase project
2. Download `google-services.json`
3. Place in `android/app/google-services.json`

#### iOS Configuration
1. Add iOS app to Firebase project
2. Download `GoogleService-Info.plist`
3. Place in `ios/InzaloYelangaApp/GoogleService-Info.plist`

### 3. Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Community posts - authenticated users can read, authors can write
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow create, update: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow delete: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         request.auth.token.admin == true);
    }
    
    // Cultural content - read-only for users
    match /cultural_content/{contentId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.auth.token.admin == true;
    }
    
    // Events - users can create/edit their own
    match /events/{eventId} {
      allow read: if request.auth != null;
      allow create, update: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow delete: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         request.auth.token.admin == true);
    }
  }
}
```

## 🏗️ Build Process

### Android Build

#### Debug Build
```bash
cd android
./gradlew assembleDebug
```

#### Release Build
```bash
# Generate keystore (first time only)
keytool -genkeypair -v -storetype PKCS12 -keystore inzalo-release-key.keystore -alias inzalo-key-alias -keyalg RSA -keysize 2048 -validity 10000

# Add to android/gradle.properties
MYAPP_RELEASE_STORE_FILE=inzalo-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=inzalo-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your_store_password
MYAPP_RELEASE_KEY_PASSWORD=your_key_password

# Build release APK
cd android
./gradlew assembleRelease

# Build AAB for Play Store
./gradlew bundleRelease
```

### iOS Build

#### Debug Build
```bash
npx react-native run-ios --configuration Debug
```

#### Release Build
1. Open `ios/InzaloYelangaApp.xcworkspace` in Xcode
2. Select "InzaloYelangaApp" scheme
3. Choose "Generic iOS Device" or connected device
4. Product → Archive
5. Distribute App → App Store Connect

## 📦 App Store Deployment

### Google Play Store

1. **Prepare Assets**
   - App icon (512x512 PNG)
   - Screenshots (various device sizes)
   - Feature graphic (1024x500)
   - Privacy policy URL

2. **Upload Build**
   ```bash
   cd android
   ./gradlew bundleRelease
   # Upload build/outputs/bundle/release/app-release.aab
   ```

3. **Store Listing**
   - Title: "Inzalo Yelanga - African Calendar"
   - Description: Focus on cultural education and decolonial themes
   - Category: Education
   - Content rating: Everyone

### Apple App Store

1. **Prepare Assets**
   - App icon (1024x1024 PNG)
   - Screenshots for all device sizes
   - App preview videos (optional)

2. **App Store Connect**
   - Create app record
   - Upload build via Xcode or Transporter
   - Fill out metadata and descriptions
   - Submit for review

## 🔧 Environment Configuration

### Environment Variables
Create `.env` files for different environments:

#### `.env.development`
```env
FIREBASE_PROJECT_ID=inzalo-yelanga-dev
FIREBASE_API_KEY=your_dev_api_key
FIREBASE_AUTH_DOMAIN=inzalo-yelanga-dev.firebaseapp.com
FIREBASE_DATABASE_URL=https://inzalo-yelanga-dev.firebaseio.com
FIREBASE_STORAGE_BUCKET=inzalo-yelanga-dev.appspot.com
```

#### `.env.production`
```env
FIREBASE_PROJECT_ID=inzalo-yelanga
FIREBASE_API_KEY=your_prod_api_key
FIREBASE_AUTH_DOMAIN=inzalo-yelanga.firebaseapp.com
FIREBASE_DATABASE_URL=https://inzalo-yelanga.firebaseio.com
FIREBASE_STORAGE_BUCKET=inzalo-yelanga.appspot.com
```

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### E2E Testing (Detox)
```bash
# Install Detox CLI
npm install -g detox-cli

# Build and test iOS
detox build --configuration ios.sim.debug
detox test --configuration ios.sim.debug

# Build and test Android
detox build --configuration android.emu.debug
detox test --configuration android.emu.debug
```

## 📊 Analytics & Monitoring

### Firebase Analytics
Already configured with Firebase setup. Events automatically tracked:
- Screen views
- User engagement
- App crashes
- Performance metrics

### Custom Event Tracking
```typescript
import analytics from '@react-native-firebase/analytics';

// Track custom events
await analytics().logEvent('calendar_month_selected', {
  month_name: 'Asar',
  month_number: 1,
});

await analytics().logEvent('sacred_day_viewed', {
  day_name: 'African New Year',
  date: '2024-09-23',
});
```

## 🔐 Security Checklist

- [ ] Firebase security rules implemented
- [ ] API keys secured (not in version control)
- [ ] User input validation
- [ ] Image upload restrictions
- [ ] Rate limiting on API calls
- [ ] SSL/TLS for all network requests
- [ ] Secure storage for sensitive data

## 📈 Performance Optimization

### Bundle Size Optimization
```bash
# Analyze bundle size
npx react-native-bundle-visualizer

# Enable Hermes (Android)
# Already enabled in android/app/build.gradle
```

### Image Optimization
- Use WebP format for images
- Implement lazy loading
- Compress images before upload
- Use appropriate image sizes

### Memory Management
- Implement proper cleanup in useEffect
- Use FlatList for large datasets
- Optimize re-renders with React.memo
- Profile with Flipper

## 🚀 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Build and Deploy
on:
  push:
    branches: [main]

jobs:
  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: cd android && ./gradlew assembleRelease
      
  build-ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: cd ios && pod install
      - run: xcodebuild -workspace ios/InzaloYelangaApp.xcworkspace -scheme InzaloYelangaApp archive
```

## 🌍 Internationalization

### Adding New Languages
1. Install i18n packages:
   ```bash
   npm install react-i18next i18next
   ```

2. Create language files:
   ```
   src/locales/
   ├── en/
   │   └── common.json
   ├── zu/
   │   └── common.json
   └── xh/
       └── common.json
   ```

3. Implement language switching in settings

## 📞 Support & Maintenance

### Regular Updates
- [ ] Monthly dependency updates
- [ ] Quarterly security audits
- [ ] Cultural content updates
- [ ] Bug fixes and performance improvements

### Community Feedback
- [ ] In-app feedback system
- [ ] Community forum monitoring
- [ ] User analytics review
- [ ] Feature request tracking

---

## 🎯 Deployment Checklist

### Pre-Launch
- [ ] All features tested on physical devices
- [ ] Firebase configuration verified
- [ ] App store assets prepared
- [ ] Privacy policy and terms of service ready
- [ ] Beta testing completed
- [ ] Performance benchmarks met

### Launch Day
- [ ] Monitor crash reports
- [ ] Check user feedback
- [ ] Verify analytics data
- [ ] Social media announcement
- [ ] Community engagement

### Post-Launch
- [ ] Daily monitoring for first week
- [ ] User feedback analysis
- [ ] Performance optimization
- [ ] Feature usage analytics
- [ ] Plan next iteration

---

**Ready to build the future of decolonial education! 🌅**

For questions or support, contact the development team or refer to the main README.md file.