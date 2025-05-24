FROM node:18-alpine
WORKDIR /app

# 1) package.json + package-lock.json
COPY package*.json ./

# 2) bağımlılıkları yükle
RUN npm install

# 3) tüm kaynak kodunu (tsconfig, src, vs.) kopyala
COPY . .

# 4) build produciton kodu
RUN npm run build

# 5) port
EXPOSE ${SERVICE_PORT}

# 6) başlat
CMD ["npm", "run", "start"]
