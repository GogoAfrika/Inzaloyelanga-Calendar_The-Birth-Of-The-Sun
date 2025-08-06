#!/bin/bash

# Inzalo Yelanga Setup Script
# This script helps you set up the Inzalo Yelanga app for development

echo "🌅 Welcome to Inzalo Yelanga - The Birth of the Sun"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    echo "   Please update Node.js to continue."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI..."
    npm install -g @expo/cli
fi

echo "✅ Expo CLI version: $(expo --version)"

# Install frontend dependencies
echo ""
echo "📱 Setting up Frontend (React Native/Expo)..."
cd InzaloYelanga

if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
else
    echo "✅ Frontend dependencies already installed"
fi

# Install backend dependencies
echo ""
echo "🔧 Setting up Backend (Node.js/Express)..."
cd ../backend

if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
else
    echo "✅ Backend dependencies already installed"
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo ""
    echo "⚙️  Creating environment configuration..."
    cat > .env << EOF
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/inzalo-yelanga
JWT_SECRET=inzalo-yelanga-jwt-secret-key-2024
FRONTEND_URL=http://localhost:19006
EOF
    echo "✅ Created .env file with default configuration"
    echo "   Please update the JWT_SECRET and MONGODB_URI for production use"
else
    echo "✅ Environment configuration already exists"
fi

# Build backend
echo ""
echo "🔨 Building backend..."
npm run build

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "To start the application:"
echo ""
echo "1. Start MongoDB (if using local instance):"
echo "   mongod"
echo ""
echo "2. Start the backend server:"
echo "   cd backend && npm run dev"
echo ""
echo "3. Start the frontend app:"
echo "   cd InzaloYelanga && npm start"
echo ""
echo "4. Run on your device:"
echo "   - Press 'i' for iOS Simulator"
echo "   - Press 'a' for Android Emulator"
echo "   - Scan QR code with Expo Go app on your phone"
echo ""
echo "📚 For more information, see the README.md file"
echo ""
echo "🌍 Inzalo Yelanga - Empowering African cultural reconnection"
echo ""