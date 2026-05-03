# Forge — AI Hacks for MBA Students

A library of AI productivity hacks pulled from real students, turned into reproducible step-by-step guides.

## What's in this project

A working Next.js app with the full Forge UI: discover feed, hack detail pages, category browse, leaderboard (top contributors, rising stars, school rankings), saved library, and submit flow.

This is the **frontend prototype**. Voting, saving, and submitting are not yet wired to a database — they reset on refresh. The next step is connecting Supabase (instructions below).

## Run it locally (5 minutes)

You'll need Node.js installed. If you don't have it: https://nodejs.org (download the LTS version).

Then in your terminal:

```bash
cd forge-mba
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Deploy it live (10 minutes)

### Step 1: Push to GitHub

1. Create a new repo on GitHub (call it `forge-mba` or whatever you want)
2. In your terminal:

```bash
cd forge-mba
git init
git add .
git commit -m "Initial Forge prototype"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/forge-mba.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com and sign up with GitHub
2. Click "Add New" → "Project"
3. Find your `forge-mba` repo and click "Import"
4. Click "Deploy" (no config needed — Vercel auto-detects Next.js)
5. Done. You'll get a live URL like `forge-mba-xyz.vercel.app`

### Step 3 (optional): Add a custom domain

1. Buy a domain on Namecheap, Google Domains, or Cloudflare (`forgemba.com`, `mbahacks.io`, etc. — ~$12/year)
2. In Vercel dashboard: Project → Settings → Domains → Add
3. Vercel walks you through the DNS settings

## Make it actually functional (the next phase)

Right now it's a static demo. To make voting, saving, and submitting persist, you need a database and authentication. Recommended stack:

### 1. Supabase (database + auth) — free tier

1. Sign up at https://supabase.com and create a project
2. Create three tables: `hacks`, `votes`, `users`
3. Schema sketch for `hacks`:
   - `id` (uuid, primary key)
   - `title`, `excerpt`, `category`, `school`, `year`
   - `tools` (text array), `time_to_setup`
   - `steps` (jsonb)
   - `source_url`, `author_id` (fk to users)
   - `votes` (int), `created_at`
4. Enable email auth in Supabase, restrict to .edu domains for the verified checkmark
5. Install the Supabase client: `npm install @supabase/supabase-js`
6. Replace the static imports in `lib/data.js` with Supabase queries

### 2. Anthropic API (the URL → steps magic) — pennies per call

The killer feature is "paste a URL, get reproducible steps." Here's how:

1. Get an API key at https://console.anthropic.com
2. Create `app/api/generate-steps/route.js`:

```js
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  const { url, sourceText } = await req.json();
  
  const message = await client.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 2000,
    messages: [{
      role: "user",
      content: `You're given a social post about an AI productivity hack from an MBA student. Extract:
      - A clear title (under 100 chars)
      - A one-sentence excerpt in the author's voice
      - The tools mentioned
      - Estimated time to set up
      - 4 reproducible steps (each with title + body)
      
      Return JSON only, no preamble.
      
      Post: ${sourceText}`
    }]
  });
  
  return Response.json(JSON.parse(message.content[0].text));
}
```

3. Add `ANTHROPIC_API_KEY` to Vercel environment variables (Project Settings → Environment Variables)
4. Wire it to the submit modal — replace the fake `setTimeout` with a real `fetch` call

### 3. Seed the content

Before launch, manually curate 30-50 real hacks from r/MBA and X. The hardest part of community products isn't tech — it's the cold start. Don't open it up empty.

## File structure

```
forge-mba/
├── app/
│   ├── layout.jsx       # Root layout + metadata
│   ├── page.jsx         # Main page (state + view router)
│   └── globals.css      # Tailwind + fonts
├── components/
│   ├── Header.jsx       # Top nav
│   ├── Footer.jsx       # Purple footer
│   ├── Feed.jsx         # Hero + filters + card grid
│   ├── HackCard.jsx     # Individual hack card (regular + featured variants)
│   ├── HackDetail.jsx   # Single hack page with copyable steps
│   ├── LeaderboardView.jsx # Podium, table, rising, schools
│   └── Views.jsx        # Categories, Saved, Submit modal
├── lib/
│   └── data.js          # All sample data (replace with DB queries)
└── package.json
```

## What to do this week

1. Get it deployed on Vercel under your name
2. Show it to 5-10 MBA classmates. Don't ask "is it good?" — ask "would you submit a hack?"
3. Manually add 20-30 real hacks from r/MBA so the library doesn't look empty
4. Pick 1-2 schools to launch in (your own + one neighbor) before going broad

Good luck.
