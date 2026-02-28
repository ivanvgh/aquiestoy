# Makefile for AquiEstoy project

.PHONY: build up down restart logs migrate migrations test test-backend test-frontend shell-backend shell-frontend

# Docker commands
build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f

# Backend commands
migrations:
	docker compose exec backend python manage.py makemigrations

# Note: User must run this, AI will only prepare the code.
migrate:
	docker compose exec backend python manage.py migrate

shell-backend:
	docker compose exec backend python manage.py shell

# Frontend commands
shell-frontend:
	docker compose exec frontend sh

# Testing
test: test-backend test-frontend

test-backend:
	docker compose exec backend pytest --cov=.

test-frontend:
	docker compose exec frontend npm test
