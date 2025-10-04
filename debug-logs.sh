#!/bin/bash

# Debug Logs Script
echo "🔍 Starting log monitoring for React Native app..."

# Clear logcat buffer
adb logcat -c

echo "📱 Monitoring logs for your app..."
echo "💡 Press Ctrl+C to stop monitoring"
echo "🔍 Looking for ReactNative, Demo, FATAL, and ERROR logs..."
echo ""

# Monitor logs with filtering
adb logcat | grep -E "(ReactNative|Demo|FATAL|ERROR|AndroidRuntime|System.err)" --line-buffered
