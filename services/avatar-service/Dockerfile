FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN mkdir -p uploads/avatars
RUN npm run build
EXPOSE ${SERVICE_PORT}
CMD ["npm", "run", "start"]
