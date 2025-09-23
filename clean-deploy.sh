#!/bin/bash

echo "🧹 Clean Redeploy"
echo "=================="

# Stop and delete any existing PM2 processes
echo "🛑 Stopping existing processes..."
pm2 delete cooperative-frontend 2>/dev/null || echo "No existing process found"
pm2 delete all 2>/dev/null || echo "No processes to delete"

# Go to client directory
cd client

echo "🧹 Cleaning build cache..."
rm -rf .next node_modules package-lock.json

echo "📦 Fresh install..."
npm install

echo "🔨 Building application..."
npm run build

# Verify build was successful
if [ ! -d ".next" ]; then
    echo "❌ Build failed - no .next directory"
    exit 1
fi

echo "✅ Build successful"

# Test the start command locally first
echo "🧪 Testing start command..."
timeout 5 npm start &
sleep 2
if pgrep -f "next start" > /dev/null; then
    echo "✅ Next.js server can start"
    pkill -f "next start"
else
    echo "❌ Next.js server failed to start"
    exit 1
fi

echo "🚀 Starting with PM2..."
cd ..

# Start with PM2 using correct environment
PM2_HOME=/root/.pm2 PORT=3100 NODE_ENV=production NEXT_PUBLIC_API_URL=https://cooperative-api.toplorgical.com/api/v1 pm2 start npm --name "cooperative-frontend" --cwd "./client" -- start

echo "⏳ Waiting for process to start..."
sleep 3

echo "📊 PM2 Status:"
pm2 status

echo "🔍 Checking port 3100..."
netstat -tlnp | grep :3100 || echo "Port 3100 not listening"

echo "📋 Recent logs:"
pm2 logs cooperative-frontend --lines 15 --nostream

echo "💾 Saving PM2 configuration..."
pm2 save

echo "✅ Deployment complete!"
echo "📍 Access at: http://localhost:3100"