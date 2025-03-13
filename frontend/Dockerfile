FROM node:20 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf  
EXPOSE 80
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

