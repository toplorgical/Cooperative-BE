# VPS Deployment Guide - Standalone Mode

## Current Status ✅
Your Next.js frontend is configured for standalone output, which provides optimal performance and reduced deployment size.

## Standalone Benefits
- **Smaller Bundle**: Only necessary files are included
- **Faster Cold Starts**: Reduced startup time
- **Self-Contained**: Includes built-in server
- **Resource Efficient**: Lower memory usage

## Verification Commands

### 1. Check if Standalone is Working
```bash
# On your VPS, check the build output structure
ls -la /path/to/your/app/client/.next/

# You should see:
# - .next/standalone/ directory
# - .next/static/ directory
# - server.js file in standalone/
```

### 2. Verify Server Process
```bash
# Check if the standalone server is running
ps aux | grep "server.js\|next"

# Check port usage
netstat -tlnp | grep :3100
```

### 3. Test Performance
```bash
# Test response time
curl -w "@-" -o /dev/null -s "http://your-domain.com" <<'EOF'
     time_namelookup:  %{time_namelookup}\n
        time_connect:  %{time_connect}\n
     time_appconnect:  %{time_appconnect}\n
    time_pretransfer:  %{time_pretransfer}\n
       time_redirect:  %{time_redirect}\n
  time_starttransfer:  %{time_starttransfer}\n
                     ----------\n
          time_total:  %{time_total}\n
EOF
```

## Docker Commands for Production

### Build with Standalone
```bash
# Build the Docker image
docker build -t cooperative-frontend ./client

# Run with proper environment variables
docker run -d \
  --name cooperative-frontend \
  -p 3100:3100 \
  -e NEXT_PUBLIC_API_URL=http://your-server-url:8100/api/v1 \
  cooperative-frontend
```

### Environment Variables
```bash
# Create .env.production file
cat > client/.env.production << EOF
NEXT_PUBLIC_API_URL=http://your-vps-ip:8100/api/v1
NODE_ENV=production
EOF
```

## Nginx Configuration (Recommended)
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Serve Next.js standalone
    location / {
        proxy_pass http://localhost:3100;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache static assets
    location /_next/static/ {
        proxy_pass http://localhost:3100;
        proxy_cache_valid 200 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## PM2 Configuration (Process Management)
```bash
# Install PM2 globally
npm install -g pm2

# Create ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'cooperative-frontend',
    script: '.next/standalone/server.js',
    cwd: '/path/to/your/app/client',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3100,
      NEXT_PUBLIC_API_URL: 'http://your-server-url:8100/api/v1'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Performance Monitoring
```bash
# Check memory usage
pm2 monit

# View logs
pm2 logs cooperative-frontend

# Check application status
pm2 status
```

## Troubleshooting

### If Standalone Not Working
1. Rebuild the Docker image
2. Check if `.next/standalone` directory exists
3. Verify environment variables are set
4. Check server logs for errors

### Performance Issues
1. Enable gzip compression in Nginx
2. Use CDN for static assets
3. Monitor memory usage with PM2
4. Check database connection pooling

## Next Steps
1. Set up SSL certificate (Let's Encrypt)
2. Configure monitoring (New Relic, DataDog)
3. Set up automated backups
4. Implement log rotation
5. Configure firewall rules