# Environment Configuration - Simplified Setup

## ✅ What Changed?

### 1. **Single Environment Configuration**
- Removed duplicate `env` and `env_production` from PM2 config
- Now uses single `.env` file for all environment variables
- Simplified configuration management

### 2. **Backend URL Updated**
- Production API URL: `https://cooperative-api.toplorgical.com/api/v1`
- Set in both root `.env` and `client/.env.production`
- Next.js config updated with new default URL

### 3. **Environment Files Structure**
```
├── .env                    # Root environment file (PM2 uses this)
└── client/
    └── .env.production     # Client-specific env vars for build
```

## 🔧 Current Configuration

### Root `.env` File:
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://cooperative-api.toplorgical.com/api/v1
# ... other database configs
```

### PM2 Configuration:
- Uses `env_file: '.env'` instead of hardcoded variables
- Cleaner configuration
- Single source of truth for environment variables

## 🚀 Deployment Process

### 1. Environment Setup
The `.env` file contains your API URL and other configurations.

### 2. Build Process
```bash
cd client
npm run build  # Uses NEXT_PUBLIC_API_URL from environment
```

### 3. PM2 Deployment
```bash
pm2 start ecosystem.config.js  # Loads .env automatically
```

## 🌐 API Configuration

### Production API
- **URL**: https://cooperative-api.toplorgical.com/api/v1
- **Environment**: Set in `.env` file
- **Usage**: Available as `process.env.NEXT_PUBLIC_API_URL` in React components

### Local Development
If you need to test locally, temporarily change the `.env` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8100/api/v1
```

## 📋 Quick Commands

### Deploy with New Configuration
```bash
# Windows
.\deploy-frontend.bat

# Linux/macOS
./deploy-frontend.sh
```

### Update API URL
```bash
# Edit the .env file
echo "NEXT_PUBLIC_API_URL=https://your-new-api-url.com/api/v1" >> .env

# Rebuild and restart
cd client && npm run build && cd ..
pm2 restart cooperative-frontend
```

### Check Current Configuration
```bash
# View environment variables
pm2 show cooperative-frontend

# Check API URL in build
grep -r "cooperative-api.toplorgical.com" client/out/
```

## 🔍 Verification

### 1. Check Build Output
After building, verify the API URL is correctly embedded:
```bash
# Check if API URL is in the built files
find client/out -name "*.js" -exec grep -l "cooperative-api.toplorgical.com" {} \;
```

### 2. Test API Connection
```bash
# Test from browser console (after deployment)
fetch(process.env.NEXT_PUBLIC_API_URL + '/health')
  .then(r => r.json())
  .then(console.log);
```

## 🛠 Troubleshooting

### API URL Not Working
1. Check `.env` file has correct URL
2. Rebuild the application: `cd client && npm run build`
3. Restart PM2: `pm2 restart cooperative-frontend`

### Environment Variables Not Loading
1. Verify `.env` file is in root directory
2. Check PM2 config has `env_file: '.env'`
3. Restart PM2 process

### CORS Issues
Ensure your backend API allows requests from your frontend domain.