module.exports = {
  apps: [
    {
      name: 'cooperative-frontend',
      script: 'serve',
      args: 'out -s -n -L -p 3100',
      cwd: './client',
      instances: 1, // Start with 1 instance, can increase later
      exec_mode: 'fork', // Use fork mode for single instance
      autorestart: true,
      watch: false,
      max_memory_restart: '512M', // Reduced since serve uses less memory
      env_file: '.env',
      error_file: './logs/frontend-error.log',
      out_file: './logs/frontend-out.log',
      log_file: './logs/frontend-combined.log',
      time: true
    }
  ]
};