default: up

.PHONY: default up down build

up:
	docker-compose up --build

down:
	docker-compose down

build:
	docker-compose build