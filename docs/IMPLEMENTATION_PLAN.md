# KaamSetu MVP Architecture & Implementation Plan

## 1) Architecture
- **Monorepo single Next.js app** serving frontend pages and backend APIs.
- **App Router** for UI routes and route handlers for APIs.
- **Prisma + PostgreSQL** as source of truth for business workflow.
- **JWT cookie auth** for low-complexity MVP with role guards.
- **Service boundaries** via `lib/validations`, `lib/auth`, and API modules.
- **Mobile-first UI** with Tailwind card layouts and simple CTAs.

## 2) Core domain workflow mapping
1. Owner registers/login.
2. Owner creates profile and posts jobs.
3. Worker registers, completes profile, searches jobs.
4. Worker applies once per job (DB unique constraint).
5. Owner reviews applications and accepts/rejects.
6. Acceptance creates booking.
7. Chat + notifications track progress.
8. Booking status transitions support completion and review readiness.

## 3) Security & validations
- Zod validation for auth/profile/job payloads.
- Role-based authorization in each write endpoint.
- Unique constraints and ownership checks enforce business rules.
- Middleware guards protected front-end routes.
- Basic fraud/rate limiting placeholders identified in roadmap.

## 4) Folder structure
- `app/` pages and API handlers
- `components/` reusable UI blocks
- `lib/auth` auth helpers
- `lib/validations` zod schemas
- `prisma/` schema and seeds
- `docs/` implementation docs

## 5) API route responsibilities
- Auth: register/login/me
- Jobs: create/list/detail/apply
- Applications: owner update + worker status query
- Bookings: progress/status updates
- Profiles: owner/worker upsert
- Chat: polling send/read
- Notifications: list
- Saved jobs: add/remove
- Admin: analytics summary

## 6) Frontend page map
- Splash, role select, login/signup (+ OTP placeholder)
- Owner dashboard, job create, posted jobs, booking details
- Worker dashboard, profile, applications, saved jobs, booking details
- Jobs listing/details, chat, notifications, admin dashboard

## 7) Extensibility notes
- Chat can be swapped from polling to websockets.
- Location string can be replaced by geo coordinates + radius queries.
- Upload URL can be replaced by Cloudinary signed upload flow.
- Auth can migrate to NextAuth with OTP provider.
