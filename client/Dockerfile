# # Use a more stable base image
# FROM node:18-bullseye

# # Set working directory
# WORKDIR /app/client

# # Copy package.json and package-lock.json
# COPY package*.json /app/client/

# # Install dependencies
# RUN npm install

# COPY . /app/client/
# # Copy all files

# # Build the Next.js application
# RUN npm run build

# # Expose port
# EXPOSE 3100

# # Start the application
# CMD ["npm", "run", "start"]


# Builder Stage
FROM node:18-alpine AS builder

WORKDIR /app/client

COPY package*.json /app/client/

RUN npm ci

COPY . .

RUN npm run build

# Production Stage 

FROM node:18-alpine AS production

WORKDIR /app/client

# Copy the built artifacts from the builder stage
COPY --from=builder /app/client/.next/standalone ./
COPY --from=builder /app/client/.next/static ./.next/static

ENV NODE_ENV=production

EXPOSE 3100

CMD ["npx", "next", "start"]