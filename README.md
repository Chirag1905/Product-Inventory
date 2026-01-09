# Inventory Management System (Full Stack)

A **full-stack inventory management system** built with **Bun, GraphQL, Prisma, PostgreSQL, React, and Docker**.
The entire project (frontend + backend + database) can be started with **one command using Docker Compose**.

---

## 🚀 Tech Stack

### Backend

- **Bun** – Runtime & package manager
- **GraphQL (Apollo Server)**
- **Prisma ORM**
- **PostgreSQL**
- **TypeScript**

### Frontend

- **React**
- **Vite**
- **Apollo Client**
- **Tailwind CSS**

### DevOps

- **Docker**
- **Docker Compose**

---

## 📂 Project Structure

```
InventorySystem/
│
├── backend/
│   ├── src/
│   │   ├── index.ts        # GraphQL server entry
│   │   ├── seed.ts         # Database seed script
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── .env
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- **Docker Desktop**
- **Docker Compose**

👉 No need to install Bun, Node, or PostgreSQL locally.

---

## ▶️ How to Run the Project (One Command)

From the project root:

```bash
docker compose up --build
```

That’s it 🚀

---

## 🌐 Application URLs

| Service           | URL                                            |
| ----------------- | ---------------------------------------------- |
| Frontend          | [http://localhost:5173](http://localhost:5173) |
| Backend (GraphQL) | [http://localhost:4000](http://localhost:4000) |
| PostgreSQL        | Internal Docker Network                        |

---

## 🧠 What Happens on Startup?

When you run `docker compose up`:

1. PostgreSQL container starts
2. Backend container:

   - Installs dependencies
   - Generates Prisma client
   - Runs database migrations
   - Seeds initial data
   - Starts GraphQL server

3. Frontend container:

   - Starts Vite dev server

All services communicate using Docker’s internal network.

---

## 🗄️ Database & Prisma

### Database Connection

The backend connects to PostgreSQL using:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/inventory
```

> `db` is the Docker service name (not localhost).

---

### Migrations

Migrations are automatically applied on container startup using:

```bash
bun prisma migrate deploy
```

---

### Seeding

Initial data is seeded automatically:

```bash
bun src/seed.ts
```

The seed script is **idempotent**, meaning it won’t create duplicate data on restarts.

---

## 🧪 Stopping & Resetting the Project

Stop containers:

```bash
docker compose down
```

Stop containers **and reset database**:

```bash
docker compose down -v
```

---

## 🧑‍💼 Interview Explanation (Quick)

> “This is a Dockerized full-stack inventory system.
> The backend uses Bun with GraphQL and Prisma connected to PostgreSQL.
> The frontend is React with Apollo Client.
> Docker Compose orchestrates all services, runs migrations, seeds the database, and starts everything with a single command.”

---

## ✅ Key Highlights

- One-command setup
- Fully Dockerized (no local DB needed)
- Prisma migrations + seeding automated
- Clean separation of frontend & backend
- Production-style architecture

---

## 📌 Future Improvements

- Production frontend build with Nginx
- Authentication & authorization
- CI/CD pipeline
- Unit & integration tests
- GraphQL subscriptions

---

## 👤 Author

**Chirag Vadhavana**
Senior Software Developer

---

⭐ If you’re an interviewer:
Just run `docker compose up --build` and open the browser 🙂
