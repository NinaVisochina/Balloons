# Використовуємо Node.js для збірки
FROM node:20 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Використовуємо Nginx для розгортання
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
FROM node:20 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm cache clean --force && npm install
COPY . .
RUN npm run build
