# Memory Timeline API

Express API for personal timelines, dated memories and account authentication. Uses PostgreSQL, Prisma 7 and JWT.

**Frontend:** [memory-timeline-frontend](https://github.com/Lenin-Miranda/memory-timeline-frontend).

## Setup

Use Node.js 22.12+ with npm and an available PostgreSQL database.

```bash
git clone https://github.com/Lenin-Miranda/memory-timeline-backend-.git
cd memory-timeline-backend-
npm install
```

Create `.env`:

```dotenv
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/memory_timeline?schema=public
PORT=3001
JWT_SECRET=replace-with-a-generated-secret
```

```bash
npm run build
npm run migrate
npm run dev
```

Here `build` generates the Prisma client; it does not compile a frontend. `migrate` applies committed migrations. Check [localhost:3001/health](http://localhost:3001/health).

## API

| Group | Routes |
| --- | --- |
| Auth | `POST /api/auth/signup`, `POST /api/auth/login`, `GET /api/auth/me` |
| Timelines | `GET/POST /api/timelines`; `GET/PATCH/DELETE /api/timelines/:id` |
| Timeline memories | `GET/POST /api/timelines/:timelineId/memories` |
| Individual memories | `GET/PATCH/DELETE /api/memories/:id` |

Timeline routes and the current-user route apply JWT middleware. The memory router currently has no token middleware, so do not assume all memory endpoints have the same access controls.

## Scripts

- `npm run dev` / `npm start`: run `index.js`.
- `npm run build`: generate Prisma client.
- `npm run migrate`: apply committed migrations.
- `npm run studio`: open Prisma Studio.
- `npm test`: Jest/Supertest.
- `npm run test:setup`: reset and migrate the test database.

## Test database

Create `.env.test` with a separate `DATABASE_URL` and the configuration needed by the tests. Inspect [prisma.config.ts](prisma.config.ts) and the test files before running setup: `test:setup` uses `prisma migrate reset --force` and deletes data in the selected database. Never point it at a development database you need to keep or at production.

## Structure

`src/controllers/` implements behavior, `src/routes/` defines endpoints, `src/middleware/` contains authentication, and `prisma/` owns schema/migrations. The frontend expects the server origin in `VITE_API_URL`, without an added `/api`.
