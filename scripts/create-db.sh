#!/usr/bin/env bash

echo "Creating 'employees_db' if it doesn't exist..."

docker exec -i local-mysql mysql -u root -p12345 -e "CREATE DATABASE IF NOT EXISTS employees_db;"

echo "Done."
