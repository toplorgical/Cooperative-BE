@echo off
echo 🚀 Deploying Cooperative Frontend with PM2...

REM Navigate to client directory
cd client

echo 📦 Installing dependencies...
call npm install

echo 🔨 Building Next.js application (standalone mode)...
call npm run build

REM Check if build was successful
if not exist ".next\standalone" (
    echo ❌ Build failed! '.next\standalone' directory not found.
    exit /b 1
)

echo ✅ Build completed successfully!

REM Navigate back to root
cd ..

REM Create logs directory if it doesn't exist
if not exist "logs" mkdir logs

echo 🚀 Starting frontend with PM2...
call pm2 start ecosystem.config.js --only cooperative-frontend

echo 💾 Saving PM2 configuration...
call pm2 save

echo 📊 Current PM2 status:
call pm2 status

echo.
echo 🎉 Frontend deployed successfully!
echo 📍 Access at: http://localhost:3100
echo 📋 Backend API: https://cooperative-api.toplorgical.com/api/v1
echo.
echo 📝 Useful PM2 commands:
echo   pm2 logs cooperative-frontend  - View logs
echo   pm2 monit                     - Monitor resources
echo   pm2 restart cooperative-frontend - Restart app
echo   pm2 stop cooperative-frontend     - Stop app

pause