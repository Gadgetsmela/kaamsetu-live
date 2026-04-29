# KaamSetu MVP

Mobile-first full-stack local employment booking app built with Next.js 15, Prisma, PostgreSQL, and TypeScript.

## Features
- Owner, worker, admin role based auth and dashboards
- Job posting and worker application flow
- Application review (accept/reject/shortlist) and booking creation
- Notification feed, chat polling endpoint, and saved jobs
- Worker and owner profile management
- Zod validation and API-level authorization checks
- Multi-language-friendly UI structure (`कामसेतु / KaamSetu`) and WhatsApp CTA

## Architecture (MVP)
- **Frontend**: Next.js App Router pages + Tailwind mobile-first UI
- **Backend**: Next.js Route Handlers under `app/api`
- **Data layer**: Prisma ORM models + PostgreSQL
- **Auth**: JWT cookie session
- **Upload/Maps**: Placeholder abstraction through URL fields and location strings
- **Realtime chat**: Polling-based chat API in MVP

## Setup
1. Install dependencies
   ```bash
   npm install
   ```
2. Configure env
   ```bash
   cp .env.example .env
   ```
3. Generate Prisma client
   ```bash
   npm run prisma:generate
   ```
4. Run migrations
   ```bash
   npm run prisma:migrate
   ```
5. Seed data
   ```bash
   npm run prisma:seed
   ```
6. Start dev server
   ```bash
   npm run dev
   ```

## Demo users
- Owner: `+919900000001` / `password123`
- Worker: `+919900000002` / `password123`
- Admin: `+919900000003` / `password123`

## API summary
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET|POST /api/jobs`
- `GET /api/jobs/:jobId`
- `POST /api/jobs/:jobId/apply`
- `PATCH /api/jobs/:jobId/applications/:applicationId`
- `GET /api/applications/:applicationId/status`
- `PATCH /api/bookings/:bookingId/progress`
- `PUT /api/owner/profile`
- `PUT /api/worker/profile`
- `GET /api/notifications`
- `GET|POST /api/chat/:jobId`
- `POST|DELETE /api/saved-jobs/:jobId`
- `GET /api/admin/dashboard`

## Future improvements
- NextAuth with OTP provider integration
- Proper geo-distance filtering with PostGIS
- Socket.io/WebSocket chat
- Cloudinary file upload pipeline
- Strong rate limiting (Redis)
- PWA offline support and push notifications
- Admin moderation queue and KYC verification workflow
