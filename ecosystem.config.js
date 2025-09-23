module.exports = {
  apps: [
    {
      name: 'cooperative-frontend',
      script: '.next/standalone/server.js',
      cwd: './client',
      instances: 1, // Start with 1 instance, can increase later
      exec_mode: 'fork', // Use fork mode for single instance
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env_file: '.env',
      env: {
        PORT: 3100,
        HOSTNAME: '0.0.0.0'
      },
      error_file: './logs/frontend-error.log',
      out_file: './logs/frontend-out.log',
      log_file: './logs/frontend-combined.log',
      time: true
    }
  ]
};