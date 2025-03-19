# OLX_Dyplom
Publish with Docker-Compose
```
apt  install docker-compose

docker-compose config
docker-compose pull
docker compose up -d
docker-compose up -d --build

docker-compose down
docker-compose down --rmi all --volumes

chmod +x docker_actions.sh
./docker_actions.sh

ls -l /data/postgresql/data

docker exec -it balloons_db_1 psql -U postgres -d backendshop

docker volume ls
Відображає два volumes:
balloons_postgres_data

docker system prune -a -f
Що це зробить?
Видалить усі незавершені контейнери
Видалить кешовані образи
Видалить тимчасові файли Docker

Зупиніть і видаліть усі контейнери:
docker-compose down
docker rm -f $(docker ps -a -q)
Очистіть теку /data/postgresql/data:
sudo rm -rf /data/postgresql/data/*
sudo chown -R 999:999 /data/postgresql/data
sudo chmod -R 700 /data/postgresql/data
Видаліть образи:
docker rmi -f $(docker images -q balloons_backend)
docker rmi -f $(docker images -q balloons_frontend)
docker rmi -f $(docker images -q postgres)
Очистіть мережі:
docker network prune -f
Перезберіть і запустіть:

docker-compose build --no-cache
docker-compose up

```