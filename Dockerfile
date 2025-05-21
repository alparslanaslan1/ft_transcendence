FROM node:18-alpine
WORKDIR /app

# Install dependencies via npm
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Start server
CMD ["npm", "run", "dev"]