# Use a more stable base image
FROM node:18-bullseye

# Set working directory
WORKDIR /app/server

# Copy package.json and package-lock.json
COPY package*.json /app/server/

# Install dependencies
RUN npm install

# Copy all files
COPY . /app/server/

# Build the Next.js application
RUN npm run build

# Expose port
EXPOSE 8100

# Start the application
CMD ["npm", "run", "start"]
