# # ������������� Node.js ��� ����� ���������
# FROM node:20 AS build
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # ������������� Nginx ��� ������
# FROM nginx:alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# COPY nginx/nginx.conf /etc/nginx/nginx.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
FROM node:20 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# ENV ASPNETCORE_URLS=http://+:5000
# COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
