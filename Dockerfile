# 1. Base image Node.js versi 20 berbasis Alpine (ringan dan cepat)
FROM node:20-alpine

# 2. Set direktori kerja di dalam container
WORKDIR /app

# 3. Salin file manifes package
COPY package*.json ./

# 4. Install seluruh dependensi
RUN npm install

# 5. Salin sisa source code ke dalam container
COPY . .

# 6. Informasi port aplikasi Express
EXPOSE 8080

# 7. Perintah untuk menjalankan server
CMD ["node", "server.js"]