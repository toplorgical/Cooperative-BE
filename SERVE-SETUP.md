# Serve Static Frontend Setup

## What Changed?

✅ **Next.js Configuration**
- Changed from `output: "standalone"` to `output: "export"`
- Now generates static files in `out/` directory
- Fully static build - no server-side rendering

✅ **Package.json Updates**
- Added `serve` dependency
- Updated build script to include export
- New serve script for local development

✅ **PM2 Configuration**
- Now uses `serve` command instead of Next.js server
- Reduced memory usage (512MB vs 1GB)
- Serves static files from `out/` directory

## Benefits of Using Serve

🚀 **Performance**
- Lightning fast static file serving
- No Node.js runtime overhead
- Better caching capabilities
- Lower memory footprint

📦 **Deployment**
- Fully static build
- Easy CDN deployment
- No server dependencies
- Better security (no server-side code)

## Quick Commands

### Development
```bash
cd client
npm run dev          # Development server
npm run build        # Build for production
npm run serve        # Serve locally with serve
```

### Production Deployment
```bash
# Install serve globally (optional)
npm install -g serve

# Build and deploy
./deploy-frontend.bat    # Windows
./deploy-frontend.sh     # Linux/macOS

# Or manual steps:
cd client
npm install
npm run build
cd ..
pm2 start ecosystem.config.js
```

### PM2 Management
```bash
pm2 status                    # Check status
pm2 logs cooperative-frontend # View logs
pm2 restart cooperative-frontend # Restart
pm2 monit                     # Monitor resources
```

## File Structure After Build
```
client/
├── out/              # Static export directory
│   ├── index.html
│   ├── _next/        # Static assets
│   ├── admin/        # Admin pages
│   └── ...           # Other pages
├── package.json      # Updated with serve
└── next.config.mjs   # Export configuration
```

## Environment Variables
Create `client/.env.production`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8100/api/v1
NODE_ENV=production
```

## Nginx Configuration (Optional)
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/client/out;
    index index.html;

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Troubleshooting

### Build Issues
- Ensure all dynamic imports are properly handled
- Check for server-side only code in components
- Verify environment variables are set

### Serve Issues
- Check if port 3100 is available
- Verify `out/` directory exists after build
- Check PM2 logs for errors

### API Connection
- Ensure NEXT_PUBLIC_API_URL is correct
- Check CORS settings on backend
- Verify backend is running on port 8100