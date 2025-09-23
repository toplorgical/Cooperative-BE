#!/bin/bash

echo "🔍 Frontend Troubleshooting"
echo "============================"

echo "📊 PM2 Status:"
pm2 status

echo -e "\n📋 Recent Logs:"
pm2 logs cooperative-frontend --lines 20 --nostream

echo -e "\n🌐 Port Check:"
netstat -tlnp | grep :3100

echo -e "\n🔄 Process Info:"
pm2 show cooperative-frontend

echo -e "\n💡 Quick fixes:"
echo "1. Restart: pm2 restart cooperative-frontend"
echo "2. View logs: pm2 logs cooperative-frontend"
echo "3. Delete and redeploy: pm2 delete cooperative-frontend && ./deploy.sh"