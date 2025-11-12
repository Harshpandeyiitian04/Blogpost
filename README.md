# BlogNest

A small Next.js + Prisma blog starter app with a minimal UI for creating, editing and deleting blog posts.

This repository contains a Next.js 16 app (React 19) using Prisma (PostgreSQL) as the database. The frontend uses Tailwind CSS styles (configured via PostCSS) and the project ships with simple API routes for creating, listing and deleting blog posts.

## Table of contents

- Project overview
- Tech stack
- Getting started
	- Prerequisites
	- Environment variables
	- Install dependencies
	- Generate Prisma client and run migrations
	- Run in development
- Scripts
- Database (Prisma)
- API endpoints
- Project structure
- Deployment notes
- Troubleshooting
- Contributing
- License

## Project overview

BlogNest is a minimal blogging playground. It demonstrates a small full-stack flow with:

- A Next.js App Router page at `src/app/page.tsx` that provides a form to create and edit blog posts, and a UI that lists posts fetched from the API.
- Prisma ORM connected to a PostgreSQL database with a `Blog` model.
- Edge-friendly API routes under `src/app/api/*` that use the Prisma client exported from `src/lib/prisma.ts`.

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Prisma (PostgreSQL)
- Tailwind CSS (via PostCSS)
- Axios (client HTTP requests)

## Getting started

Follow these steps to run the project locally (PowerShell examples included).

### Prerequisites

- Node.js 20+ (tested with Node 20+)
- PostgreSQL (or any database supported by Prisma; this project expects PostgreSQL by default)
- Git (optional)

### Environment variables

Create a `.env` file in the project root with at least the following variable:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

Replace USER, PASSWORD, HOST, PORT and DATABASE with your database details.

### Install dependencies

In PowerShell, from the repository root run:

```powershell
npm install
```

### Generate Prisma client and run migrations

Prisma is configured in `prisma/schema.prisma`. The generator outputs the client to `src/generated/prisma`.

To create and apply migrations (and generate the client):

```powershell
npx prisma migrate dev --name init
npx prisma generate
```

If you already have migrations in `prisma/migrations`, run:

```powershell
npx prisma migrate deploy
npx prisma generate
```

Note: The project already includes an initial migration under `prisma/migrations/20251112120505_init/`.

### Run in development

Start the Next.js dev server with:

```powershell
npm run dev
```

Open http://localhost:3000 in your browser.

## Scripts

Available npm scripts from `package.json`:

- `npm run dev` — Start Next.js in development mode (uses `next dev --webpack`).
- `npm run build` — Build the Next.js app (`next build --webpack`).
- `npm start` — Start the production server (`next start`).
- `npm run lint` — Run ESLint.

## Database (Prisma)

Schema highlights from `prisma/schema.prisma`:

- Model `Blog` with fields:
	- `id` Int @id @default(autoincrement())
	- `title` String
	- `content` String? (optional)
	- `published` Boolean @default(false)
	- `createdAt` DateTime @default(now())

Prisma client is instantiated in `src/lib/prisma.ts`. The code uses a global singleton in development to avoid creating multiple clients during hot reloads.

## API endpoints

Server-side API routes follow Next.js App Router conventions and are located under `src/app/api`.

- `POST /api/create`
	- Description: Create a new blog post.
	- Body: JSON { title: string, content: string }
	- Response: 201 with { message: "Blog saved!", id }

- `GET /api/getblog`
	- Description: Return list of blogs ordered by newest first.
	- Response: 200 with { blogs: [ { id, title, content, createdAt } ] }

- `DELETE /api/delete/:id`
	- Description: Delete a blog by numeric id.
	- Response: 200 with { message: "Deleted" } or 404 if not found.

Client usage: The front-end uses Axios to call these endpoints (see `src/app/page.tsx`). The UI fetches blogs on mount and exposes create, edit (implemented by pre-filling fields and deleting original), and delete actions.

## Project structure

- `src/app/` — Next.js App Router pages and API routes.
	- `page.tsx` — Main UI and client logic.
	- `api/` — Serverless route handlers (`create`, `getblog`, `delete/[id]`).
- `src/lib/prisma.ts` — Prisma client singleton wrapper.
- `src/generated/prisma` — Generated Prisma client (do not edit).
- `prisma/schema.prisma` — Prisma schema and generator configuration.

## Deployment notes

- Ensure your production environment sets `DATABASE_URL` to a reachable database.
- Run `npx prisma migrate deploy` during deployment to apply migrations.
- Build with `npm run build` and run the production server with `npm start` or deploy to platforms that support Next.js (Vercel, Netlify, Fly.io, etc.).

If deploying to Vercel or similar serverless platforms, confirm your adapter and Node version match the platform requirements.

## Troubleshooting

- Prisma client errors after changing the schema: run `npx prisma generate`.
- Connection errors: verify `DATABASE_URL` and that your DB accepts connections from your environment.
- Port conflicts: Next.js defaults to port 3000; set `PORT` environment variable to change.

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository
2. Create a feature branch
3. Run and test locally
4. Open a pull request with a clear description of changes

Follow the existing code style and keep changes small and focused.

## License

This project does not include a license file. Add a `LICENSE` file if you want to make the project public with a specific license.

## Final notes

If you want, I can also:

- Add a `.env.example` file
- Add a one-step setup script to generate the client and run migrations
- Add unit or integration tests for the API routes

Author Harsh Pandey
