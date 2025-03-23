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

статус фаервол
sudo ufw status


Підключилася до Docker-контейнера
root@vm41401:~/Balloons# docker exec -it balloons_db_1 bash
Перевірила версію pg_dump
root@ed6a6550b378:/# pg_dump --version
pg_dump (PostgreSQL) 17.4 (Debian 17.4-1.pgdg120+2)
pg_dump -U postgres -d backendshop > /tmp/prod_backup.sql
root@ed6a6550b378:/# pg_dump -U postgres -d backendshop > /tmp/prod_backup.sql
Вийди з контейнера (натисни Ctrl+D або введи exit)
root@ed6a6550b378:/#
exit
Скопіювала бекап із контейнера на хост (скопіювала файл бекапу з контейнера на сервер Mobaxtern у директорію /root/Balloons/prod_backup.sql)
root@vm41401:~/Balloons# docker cp balloons_db_1:/tmp/prod_backup.sql ~/Balloons/prod_backup.sql
Successfully copied 62kB to /root/Balloons/prod_backup.sql
Перевірила файл бекапу(Файл бекапу створений, його розмір — 59 КБ, і він розташований у /root/Balloons/prod_backup.sql на сервері Mobaxtern.)
root@vm41401:~/Balloons# ls -lh ~/Balloons/prod_backup.sql
-rw-r--r-- 1 root root 59K Mar 23 19:56 /root/Balloons/prod_backup.sql

Відновлення на локальній машині
Переконайся, що файл бекапу на локальній машині:
Якщо ти ще не скопіювала файл, виконай:
scp root@91.238.103.121:~/Balloons/prod_backup.sql .
Видали стару базу (якщо потрібно):
dropdb -U postgres backendshop
Створи порожню базу backendshop:
createdb -U postgres backendshop
Віднови базу з бекапу:
Виконай команду для відновлення:
psql -U postgres -d backendshop < prod_backup.sql

Відновлення на сервері Mobaxtern
Переконайся, що файл бекапу на сервері:
Файл уже є в /root/Balloons/prod_backup.sql. Якщо ти хочеш використати інший бекап, скопіюй його на сервер:
scp prod_backup_2025-03-23.sql root@vm41401:~/Balloons/
Скопіюй бекап у контейнер:
Скопіюй файл бекапу в контейнер:
docker cp ~/Balloons/prod_backup.sql balloons_db_1:/tmp/prod_backup.sql
Підключися до контейнера:
docker exec -it balloons_db_1 bash
Видали стару базу (опціонально):
У контейнері підключися до psql:
psql -U postgres
Видали базу backendshop:
Копировать
DROP DATABASE backendshop;
Створи нову базу:
CREATE DATABASE backendshop;
Вийди з psql:
\q
Віднови базу з бекапу:
У контейнері виконай:
psql -U postgres -d backendshop < /tmp/prod_backup.sql
Це відновить базу в контейнері.
Перевір відновлені дані:
Підключися до бази:
psql -U postgres -d backendshop
Перевір таблиці:
\dt
SELECT * FROM tblProducts LIMIT 5;
Вийди з контейнера:
exit


Як уникнути проблем у майбутньому?
Регулярно створюй бекапи:
Налаштуй автоматичне створення бекапів. Наприклад, ти можеш створити скрипт:
#!/bin/bash
TIMESTAMP=$(date +%F_%H-%M-%S)
docker exec balloons_db_1 pg_dump -U postgres -d backendshop > ~/Balloons/backup_$TIMESTAMP.sql
Збережи це як backup.sh, дай права на виконання:
chmod +x backup.sh
І налаштуй запуск через cron:
crontab -e
Додай рядок для щоденного бекапу о 2:00:
0 2 * * * /root/Balloons/backup.sh
Зберігай бекапи в кількох місцях:
Після створення бекапу копіюй його на локальну машину, у хмарне сховище (Google Drive, Dropbox) або на інший сервер.

Перевіряй бекапи:
Періодично перевіряй, чи бекапи створюються і чи їх можна відновити. Наприклад, раз на місяць відновлюй бекап у тестовій базі.
```