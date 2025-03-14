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
myproject_postgres_data Це означає, що дані бази ще існують у Docker volume.

docker system prune -a -f
Що це зробить?
Видалить усі незавершені контейнери
Видалить кешовані образи
Видалить тимчасові файли Docker

```