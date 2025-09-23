#!/bin/bash

echo "🚀 Deploying Cooperative Frontend with PM2..."

# Navigate to client directory
cd client

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building Next.js application (standalone mode)..."
npm run build

# Check if build was successful
if [ ! -d ".next/standalone" ]; then
    echo "❌ Build failed! '.next/standalone' directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"

# Navigate back to root
cd ..

# Create logs directory if it doesn't exist
mkdir -p logs

echo "🚀 Starting frontend with PM2..."
pm2 start ecosystem.config.js --only cooperative-frontend

echo "💾 Saving PM2 configuration..."
pm2 save

echo "📊 Current PM2 status:"
pm2 status

echo ""
echo "🎉 Frontend deployed successfully!"
echo "📍 Access at: http://localhost:3100"
echo "📋 Backend API: https://cooperative-api.toplorgical.com/api/v1"
echo ""
echo "📝 Useful PM2 commands:"
echo "  pm2 logs cooperative-frontend  - View logs"
echo "  pm2 monit                     - Monitor resources"
echo "  pm2 restart cooperative-frontend - Restart app"
echo "  pm2 stop cooperative-frontend     - Stop app"