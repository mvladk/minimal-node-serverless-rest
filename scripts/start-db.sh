#!/usr/bin/env bash
docker compose up -d
echo "Waiting for MySQL to become healthy..."
until [ "`docker inspect -f {{.State.Health.Status}} local-mysql`" == "healthy" ]; do
    sleep 3
done
echo "MySQL is healthy, creating DB..."
docker exec -i local-mysql mysql -u root -p12345 -e "CREATE DATABASE IF NOT EXISTS employees_db;"
