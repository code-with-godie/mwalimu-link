# Nextjs 16 Dashboard with user management

A modern, production-ready authentication nexjs boileblate with multi-provider login (Credentials, Google, GitHub), user management, and beautiful UI built with Shadcn UI components.

## Shcreenshots

![home page](https://res.cloudinary.com/dmxqjeidz/image/upload/v1767388258/Screenshot_2026-01-03_000714_bq5bvr.png)

![sign in ](https://res.cloudinary.com/dmxqjeidz/image/upload/v1767388258/Screenshot_2026-01-03_000749_bakvzp.png)

## ✨ Features

### 🔐 Authentication

- Email/Password Login - Secure credential-based authentication

- Google OAuth - One-click Google sign-in

- GitHub OAuth - GitHub social login

- Session Management - Secure JWT-based sessions

- Protected Routes - Middleware-based route protection

### 🎨 Dashboard

- User Management - View, edit, and manage user accounts

- Real-time Analytics - User activity and login statistics

- Role-based Access - Admin/user permission system

- Activity Logs - Track authentication events

- Profile Management - User profile customization

### 🛠️ Tech Stack

- Next.js 14 - App Router & Server Components

- Shadcn UI - Beautiful, accessible components

- Better Auth - Full-stack authentication

- MongoDB - Database with Mongoose

- Tailwind CSS - Utility-first styling

- TypeScript - Type-safe development

## 🚀 Quick Start

### Prerequisites

- Node.js 18+

- MongoDB (local or Atlas)

#### 1. Install

```bash
  pnpm install
```

#### 2. Environment Setup

Create `.env.local` in the root directory:

```bash
MONGODB_URI="your MongoDB connection string"
BETTER_AUTH_SECRET="your-32-character-long-secret-key-change-this-in-production"
BETTER_AUTH_URL="http://localhost:3000"
BETTER_GOOGLE_ID="your-google-client-id.apps.BETTER_GOOGLE_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### 3. OAuth Configuration

#### Google OAuth

1. Visit Google Cloud Console

2. Create new project → "APIs & Services" → "Credentials"

3. Click "Create Credentials" → "OAuth 2.0 Client IDs"

4. Application type: "Web application"

5. Add Authorized JavaScript origins: http://localhost:3000

6. Add Authorized redirect URIs: http://localhost:3000/auth/callback/google

7. Copy Client ID and Secret to `.env.local`

#### GitHub OAuth

1. Go to GitHub Developer Settings

2. Click "New OAuth App"

3. Application name: Your App Name

4. Homepage URL: `http://localhost:3000`

5. Authorization callback URL: `http://localhost:3000/auth/callback/github`

6. Register application → Copy Client ID → Generate Client Secret
7. Add to `.env.local`

## Start development server

```bash
npm run dev
```
