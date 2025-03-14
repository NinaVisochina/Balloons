FROM node:20 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Копіюємо сертифікати в контейнер
COPY /etc/letsencrypt/live/balloos.in.ua/fullchain.pem /etc/nginx/ssl/fullchain.pem
COPY /etc/letsencrypt/live/balloos.in.ua/privkey.pem /etc/nginx/ssl/privkey.pem

RUN echo 'server { \
    listen 80; \
    server_name balloos.in.ua api.balloos.in.ua; \
    # Перенаправлення всіх HTTP-запитів на HTTPS \
    return 301 https://$host$request_uri; \
} \
server { \
    listen 443 ssl; \
    server_name balloos.in.ua; \
    ssl_certificate /etc/nginx/ssl/fullchain.pem; \
    ssl_certificate_key /etc/nginx/ssl/privkey.pem; \
    location / { \
        root /usr/share/nginx/html; \
        try_files $uri $uri/ /index.html; \
    } \
    location /api/ { \
        proxy_pass http://balloons_backend_1:5000/api/; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
        proxy_set_header X-Forwarded-Proto $scheme; \
        proxy_http_version 1.1; \
        proxy_set_header Upgrade $http_upgrade; \
        proxy_set_header Connection "upgrade"; \
    } \
    location /images/ { \
        proxy_pass http://balloons_backend_1:5000/images/; \
    } \
} \
server { \
    listen 443 ssl; \
    server_name api.balloos.in.ua; \
    ssl_certificate /etc/nginx/ssl/fullchain.pem; \
    ssl_certificate_key /etc/nginx/ssl/privkey.pem; \
    location / { \
        proxy_pass http://balloons_backend_1:5000/swagger/; \
    } \
    location /swagger/ { \
        proxy_pass http://balloons_backend_1:5000/swagger/; \
    } \
    location /swagger/index.html { \
        proxy_pass http://balloons_backend_1:5000/swagger/index.html; \
    } \
    location /api/ { \
        proxy_pass http://balloons_backend_1:5000/api/; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
        proxy_set_header X-Forwarded-Proto $scheme; \
    } \
    location /images/ { \
        proxy_pass http://balloons_backend_1:5000/images/; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
#  FROM node:20 AS build
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM nginx:alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# RUN echo 'server { \
#     listen 80; \
#     server_name balloos.in.ua www.balloos.in.ua; \
#     location / { \
#         root /usr/share/nginx/html; \
#         try_files $uri $uri/ /index.html; \
#     } \
#     location /api/ { \
#         proxy_pass http://balloons_backend_1:5000/; \
#         proxy_set_header Host $host; \
#         proxy_set_header X-Real-IP $remote_addr; \
#         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
#         proxy_set_header X-Forwarded-Proto $scheme; \
#     } \
#     error_page 404 /index.html; \
# } \
# server { \
#     listen 80; \
#     server_name api.balloos.in.ua; \
#     location / { \
#         proxy_pass http://balloons_backend_1:5000/; \
#         proxy_set_header Host $host; \
#         proxy_set_header X-Real-IP $remote_addr; \
#         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
#         proxy_set_header X-Forwarded-Proto $scheme; \
#     } \
# }' > /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
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

