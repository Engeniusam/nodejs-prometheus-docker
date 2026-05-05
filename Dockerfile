# Use a lightweight Node.js image
FROM node:25-alpine3.22

# Set working directory
WORKDIR /app

# Copy package files first (better for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY server.js ./

# Expose the port your app listens on
EXPOSE 4000

# Start the app
CMD ["node", "server.js"]
