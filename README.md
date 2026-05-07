# MyLuths — Autism Support Platform

MyLuths is a Next.js 14 web platform that helps Malaysian families support children with autism through interactive tools: emotion learning, visual schedules, AAC communication boards, and social skills games.

## Tech Stack

- **Next.js 14** (App Router, Server Components, Server Actions)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Supabase** (authentication + PostgreSQL database)
- **Anthropic Claude API** (AI-powered feedback and story generation)
- **Billplz** (Malaysian payment gateway — mock for now)
- **Resend** (transactional email)

## Getting Started

### 1. Clone and install dependencies

```bash
git clone <repo-url>
cd myluths
npm install
```

### 2. Set up environment variables

Copy `.env.local` and fill in your keys:

```bash
cp .env.local .env.local.example
```

Required variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `ANTHROPIC_API_KEY` | Your Anthropic API key |
| `BILLPLZ_API_KEY` | Billplz API key (use dummy value for now) |
| `BILLPLZ_COLLECTION_ID` | Billplz collection ID (use dummy value for now) |
| `RESEND_API_KEY` | Resend API key for transactional emails |

### 3. Set up the Supabase database

1. Go to your [Supabase dashboard](https://supabase.com/dashboard)
2. Open your project → SQL Editor
3. Copy and paste the contents of `supabase/schema.sql`
4. Click **Run**

This creates all tables, enables Row Level Security, and sets up RLS policies.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout (fonts, Toaster)
│   ├── globals.css           # Tailwind + CSS variables
│   ├── auth/
│   │   ├── actions.ts        # Server actions: login, register, logout
│   │   ├── login/page.tsx    # Login page
│   │   └── register/page.tsx # Registration page with role selector
│   ├── app/
│   │   ├── layout.tsx        # App shell (sidebar + topbar)
│   │   ├── dashboard/        # Dashboard, child management
│   │   ├── emotion/          # Emotion Learning quiz
│   │   ├── schedule/         # Visual Schedule Builder
│   │   ├── aac/              # AAC Board (Pro — placeholder)
│   │   ├── social/           # Social Skills (Pro — placeholder)
│   │   ├── progress/[id]/    # Child progress report
│   │   └── settings/         # Account & subscription settings
│   ├── billing/
│   │   └── plans/page.tsx    # Pricing & plan selection
│   └── api/
│       └── ai/
│           ├── emotion-feedback/route.ts  # Claude API for emotion feedback
│           └── schedule-story/route.ts    # Claude API for day story
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── nav-sidebar.tsx       # Sidebar navigation
│   ├── child-selector.tsx    # Child profile dropdown
│   └── upgrade-prompt.tsx    # Feature gate / upsell card
└── lib/
    ├── types.ts              # TypeScript types + plan constants
    ├── utils.ts              # cn() utility
    ├── emotions.ts           # 12 emotion definitions
    ├── schedule-activities.ts # 45+ activity cards
    ├── hooks/
    │   └── useFeatureAccess.ts
    └── supabase/
        ├── client.ts         # Browser Supabase client
        ├── server.ts         # Server Supabase client
        └── middleware.ts     # Session refresh helper
```

## Feature Access by Plan

| Feature | Starter (RM19) | Growth (RM39) | Pro (RM79) |
|---------|:-:|:-:|:-:|
| Emotion Learning | ✓ | ✓ | ✓ |
| Visual Schedule Builder | — | ✓ | ✓ |
| AAC Communication Board | — | — | ✓ |
| Social Skills Game | — | — | ✓ |
| Child profiles | 1 | 3 | Unlimited |

## Supabase Project

- **URL**: `https://ckulryagqstcummssuha.supabase.co`
- Tables: `profiles`, `subscriptions`, `child_profiles`, `emotion_sessions`, `schedules`, `progress_reports`
- Auth: Email/password via Supabase Auth
- RLS: Enabled on all tables — users can only access their own data
