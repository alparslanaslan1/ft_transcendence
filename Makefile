# Makefile (project-root/Makefile)

COMPOSE_FILE := docker-compose.yml
DC := docker-compose -f $(COMPOSE_FILE)

.PHONY: all build up down rebuild logs ps shell

all: up

## Image’ları oluştur
build:
	$(DC) build

## Konteynerleri ayağa kaldır (arka planda)
up: build
	$(DC) up -d

## Konteynerleri durdurup kaldır
down:
	$(DC) down

## Cache’siz yeniden build
rebuild:
	$(DC) build --no-cache

## Logları takip et
logs:
	$(DC) logs -f

## Çalışan konteynerleri göster
ps:
	$(DC) ps

## user-service içinde shell aç (başka servis için değiştir)
shell:
	$(DC) exec user-service sh
