# Multi-Tenant SaaS Task Manager

Minimal SaaS demo with tenant-isolated tasks.

## Stack

- Backend: Node.js, TypeScript, Express, PostgreSQL, Prisma, JWT, bcrypt
- Frontend: React, Vite, TailwindCSS, Font Awesome

## Setup

1. Start PostgreSQL:

```bash
docker compose up -d
```

2. Install dependencies:

```bash
npm run install:all
```

3. Configure backend env:

```bash
cp backend/.env.example backend/.env
```

4. Run Prisma migration:

```bash
cd backend
npm run prisma:deploy
```

5. Start the backend:

```bash
npm run dev
```

6. Start the frontend in another terminal:

```bash
cd ../frontend
npm run dev
```

Frontend runs at `http://localhost:5173` unless Vite chooses the next available port.
Backend runs at `http://localhost:8000`.

## API

- `POST /auth/register`
- `POST /auth/login`
- `GET /tasks`
- `POST /tasks`

JWT payload contains `userId` and `organizationId`. Task reads and writes always use `organizationId` from the JWT, so users only access their own organization's tasks.
