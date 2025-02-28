# contact-management-app

This is a full-stack Contact Management application that allows users to manage their contacts efficiently. The application consists of:

- **Backend:** NestJS + PostgreSQL
- **Frontend:** React + Vite + Nginx
- **Dockerized Setup:** Easy to deploy using Docker and Docker Compose

## Features

- RESTful API for contact management
- Fully Dockerized for easy local setup
- Swagger API documentation
- Nginx Reverse Proxy for handling frontend requests
- PostgreSQL database for persistent storage

## Prerequisites

Ensure you have the following installed on your system:

- [Docker & Docker Compose](https://docs.docker.com/get-docker/)

## Setup Instructions

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd contact-management-app

```

### 2. Run the Project with Docker

To start the application, run the following command:

```sh
docker-compose up --build
```

This will:

Start PostgreSQL
Start NestJS Backend at http://localhost:3000
Start React Frontend at http://localhost/

### 3. API Documentation (Swagger)

After starting the project, you can access the API documentation at:
http://localhost:3000/api

## Project URLs

- Frontend: `http://localhost/`
- Backend API: `http://localhost:3000/api`
- PostgreSQL: `postgres://admin:admin123@localhost:5432/contact_management`
