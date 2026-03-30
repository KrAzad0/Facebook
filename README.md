# Niche Network (Facebook-like)

A niche social platform centered around:
- connection requests,
- profile pages,
- posts,
- and a personalized feed.

Built in a single repo using **Next.js + PostgreSQL + Prisma**.

## Features

- **Profiles** with bio, post history, and pending request summaries.
- **Connection Requests** API (`POST /api/connection-requests`).
- **Posts** API (`POST /api/posts`).
- **Personalized Feed** API (`GET /api/feed?userId=...`) showing posts from you + your connections.
- **Seed script** with sample users and content.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod for API input validation

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
3. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```
4. Create/migrate DB:
   ```bash
   npm run prisma:migrate -- --name init
   ```
5. Seed sample data:
   ```bash
   npm run prisma:seed
   ```
6. Run app:
   ```bash
   npm run dev
   ```

Open `http://localhost:3000`.
