# PM2 Frontend Deployment Setup

## Prerequisites
```bash
# Install PM2 globally
npm install -g pm2

# Install Node.js dependencies in client folder
cd client
npm install
```

## Build for Production
```bash
# Build the Next.js application
cd client
npm run build

# Verify standalone build was created
ls -la .next/standalone/
```

## PM2 Commands

### Start the Frontend
```bash
# From project root directory
pm2 start ecosystem.config.js

# Or start directly
pm2 start ecosystem.config.js --only cooperative-frontend
```

### Manage the Process
```bash
# Check status
pm2 status

# View logs
pm2 logs cooperative-frontend

# Monitor in real-time
pm2 monit

# Restart
pm2 restart cooperative-frontend

# Stop
pm2 stop cooperative-frontend

# Delete from PM2
pm2 delete cooperative-frontend
```

### Auto-start on System Boot
```bash
# Generate startup script
pm2 startup

# Save current PM2 processes
pm2 save
```

## Environment Variables
Create a `.env.production` file in the client directory:

```bash
# client/.env.production
NEXT_PUBLIC_API_URL=http://localhost:8100/api/v1
NODE_ENV=production
PORT=3100
HOSTNAME=0.0.0.0
```

## Full Deployment Script
```bash
#!/bin/bash
# deploy-frontend.sh

echo "Building Next.js application..."
cd client
npm install
npm run build

echo "Starting with PM2..."
cd ..
pm2 start ecosystem.config.js --only cooperative-frontend

echo "Saving PM2 configuration..."
pm2 save

echo "Frontend deployed successfully!"
echo "Access at: http://localhost:3100"
```

## Docker Services (Backend Only)
```bash
# Start only backend services
docker-compose up -d db db_test server

# Check running services
docker-compose ps

# View logs
docker-compose logs -f server
```

## Complete Setup Process
1. **Build frontend**: `cd client && npm run build`
2. **Start backend**: `docker-compose up -d db db_test server`
3. **Start frontend**: `pm2 start ecosystem.config.js`
4. **Setup auto-restart**: `pm2 startup && pm2 save`

## Port Configuration
- **Frontend (PM2)**: http://localhost:3100
- **Backend (Docker)**: http://localhost:8100
- **Database**: localhost:6432
- **Test Database**: localhost:6433

## Monitoring & Logs
```bash
# View all logs
pm2 logs

# View frontend logs only
pm2 logs cooperative-frontend

# Monitor resource usage
pm2 monit

# Check process status
pm2 status
```

## Troubleshooting
- **Build issues**: Check `npm run build` output in client directory
- **Port conflicts**: Change PORT in ecosystem.config.js
- **Memory issues**: Adjust `max_memory_restart` in config
- **API connection**: Verify NEXT_PUBLIC_API_URL points to correct backend