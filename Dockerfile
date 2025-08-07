# Gunakan versi ringan Node.js
FROM node:20-alpine

# Set direktori kerja
WORKDIR /app

# Salin dan install dependency (pakai production-only)
COPY package*.json ./
RUN npm install --production

# Salin semua file ke container
COPY . .

# Jalankan app dengan RAM limit
CMD ["node", "--max-old-space-size=384", "index.js"]
