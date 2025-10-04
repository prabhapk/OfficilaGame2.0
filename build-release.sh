#!/bin/bash

# Build Release APK Script
echo "🚀 Starting release build process..."

# Set NODE_ENV for production build
export NODE_ENV=production
echo "🔧 Set NODE_ENV to: $NODE_ENV"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
cd android
./gradlew clean
cd ..

# Clear Metro cache
echo "🗑️ Clearing Metro cache..."
npx expo start --clear

# Build release APK
echo "📱 Building release APK..."
cd android
NODE_ENV=production ./gradlew assembleRelease
cd ..

# Check if build was successful
if [ -f "android/app/build/outputs/apk/release/app-release.apk" ]; then
    echo "✅ Release APK built successfully!"
    echo "📁 APK location: android/app/build/outputs/apk/release/app-release.apk"
    
    # Install APK on connected device (optional)
    echo "📲 Installing APK on connected device..."
    adb install -r android/app/build/outputs/apk/release/app-release.apk
    
    echo "🎉 Build and installation complete!"
    echo "📋 To check logs, run: adb logcat | grep -E '(ReactNative|Demo|FATAL|ERROR)'"
else
    echo "❌ Build failed! Check the logs above for errors."
    exit 1
fi
