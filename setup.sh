#!/bin/bash

echo "🌅 Welcome to Inzalo Yelanga Setup"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v16 or higher) first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if MongoDB is running (optional check)
if command -v mongod &> /dev/null; then
    if pgrep -x "mongod" > /dev/null; then
        echo "✅ MongoDB is running"
    else
        echo "⚠️  MongoDB is installed but not running. You may need to start it manually."
    fi
else
    echo "⚠️  MongoDB not found. You'll need to install and configure MongoDB."
    echo "   Visit: https://docs.mongodb.com/manual/installation/"
fi

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI..."
    npm install -g @expo/cli
fi

echo "✅ Expo CLI detected"

echo ""
echo "🚀 Setting up the application..."
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file for backend..."
    cat > .env << EOF
# Database
MONGODB_URI=mongodb://localhost:27017/inzalo_yelanga

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
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
EOF
    echo "⚠️  Please update the .env file with your actual configuration values"
fi

cd ..

# Install mobile app dependencies
echo "📦 Installing mobile app dependencies..."
cd InzaloYelanga
npm install

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Update the backend/.env file with your configuration"
echo "2. Start the backend server:"
echo "   cd backend && npm run dev"
echo ""
echo "3. Start the mobile app:"
echo "   cd InzaloYelanga && npm start"
echo ""
echo "4. Use the Expo Go app on your phone to scan the QR code"
echo ""
echo "📚 For more information, see the README.md file"
echo ""
echo "🌅 Asante sana (Thank you) for joining our journey!"