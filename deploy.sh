#!/bin/bash

echo "🚀 Simple PM2 Deployment"
echo "========================"

# Go to client directory
cd client

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building application..."
npm run build

echo "🚀 Starting with PM2..."
cd ..

# Simple PM2 start - uses root .env file
pm2 start "npm start" --name "cooperative-frontend" --cwd "./client" --env-file "./.env" -- --port 3100

echo "💾 Saving PM2 configuration..."
pm2 save

echo "✅ Done!"
echo "📍 Access at: http://localhost:3100"
echo ""
echo "📝 Commands:"
echo "  pm2 logs cooperative-frontend    - View logs"
echo "  pm2 restart cooperative-frontend - Restart"
echo "  pm2 stop cooperative-frontend    - Stop"