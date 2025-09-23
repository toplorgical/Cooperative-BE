#!/bin/bash

echo "🚀 Simple PM2 Deployment"
echo "========================"

# Go to client directory
cd client

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ ! -d ".next" ]; then
    echo "❌ Build failed - no .next directory created!"
    exit 1
fi

if [ ! -f ".next/BUILD_ID" ]; then
    echo "❌ Build failed - no BUILD_ID file found!"
    echo "📁 Contents of .next directory:"
    ls -la .next/ 2>/dev/null || echo "No .next directory"
    exit 1
fi

echo "✅ Build successful - .next directory created"

echo "🚀 Starting with PM2..."
cd ..

# Simple PM2 start with proper environment
PORT=3100 NODE_ENV=production NEXT_PUBLIC_API_URL=https://cooperative-api.toplorgical.com/api/v1 pm2 start npm --name "cooperative-frontend" --cwd "./client" -- start

echo "💾 Saving PM2 configuration..."
pm2 save

echo "📊 Checking PM2 status..."
pm2 status

echo "🔍 Checking if port 3100 is in use..."
netstat -tlnp | grep :3100 || echo "Port 3100 not found - process may not be running"

echo "📋 Recent logs..."
pm2 logs cooperative-frontend --lines 10 --nostream

echo "✅ Done!"
echo "📍 Access at: http://localhost:3100"
echo ""
echo "📝 Commands:"
echo "  pm2 logs cooperative-frontend    - View logs"
echo "  pm2 restart cooperative-frontend - Restart"
echo "  pm2 stop cooperative-frontend    - Stop"