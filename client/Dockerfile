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
COPY --from=builder /app/client/public ./public
ENV NODE_ENV=production
ENV PORT=3100

ENV HOSTNAME=0.0.0.0

EXPOSE 3100
CMD ["node", "server.js"]