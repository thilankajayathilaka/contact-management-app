# contact-management-app

This is a full-stack Contact Management application that allows users to manage their contacts efficiently. The application consists of:

- **Backend:** NestJS + PostgreSQL
- **Frontend:** React + Vite + Nginx
- **Dockerized Setup:** Easy to deploy using Docker and Docker Compose

## Features

- **RESTful API** for managing contacts  
- **Fully Dockerized** setup for easy local development  
- **Swagger API Documentation** for better API exploration    
- **PostgreSQL Database** for persistent and reliable data storage  
- **React Frontend** with modern UI/UX using Tailwind CSS  
- **Live Form Validation** to ensure correct data submission  
- **Search & Sorting** functionality for easy contact management  
- **Global Error Handling** for better debugging and user experience  
- **Reusable Components** to maintain clean and modular code  
- **Responsive Design** optimized for desktop and mobile devices  
- **Loading States & Notifications** for improved user interactions

![image](https://github.com/user-attachments/assets/6ce07ba4-2efc-4ba1-bdf3-a927229d8e2a)
![image](https://github.com/user-attachments/assets/333fb408-b71f-4255-b32f-441e833a8a9c)
![image](https://github.com/user-attachments/assets/ab34f6f4-c1c3-45df-bee2-1c2680bd95cf)
![image](https://github.com/user-attachments/assets/214698a4-a6ac-456b-a377-a5297d6890af)

## Prerequisites

Ensure you have the following installed on your system:

- [Docker & Docker Compose](https://docs.docker.com/get-docker/)

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/thilankajayathilaka/contact-management-app.git
cd contact-management-app

```

### 2. Run the Project with Docker

To start the application, run the following command:

```sh
docker-compose up --build
```

This will:

1. Start PostgreSQL
2. Start NestJS Backend at http://localhost:3000
3. Start React Frontend at http://localhost/

### 3. API Documentation (Swagger)

After starting the project, you can access the API documentation at:
http://localhost:3000/api

## Project URLs

- Frontend: `http://localhost/`
- Backend API: `http://localhost:3000/api`
- PostgreSQL: `postgres://admin:admin123@localhost:5432/contact_management`
