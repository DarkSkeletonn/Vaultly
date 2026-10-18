# Vaultly
<div align="center">

# ✦ Vaultly

### *Your Personal AI-Powered Content Vault*

Save anything from anywhere. Find everything with AI.

[![React Native](https://img.shields.io/badge/React_Native-Expo-0EA5E9?style=flat-square&logo=react)](https://expo.dev)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com)
[![Claude AI](https://img.shields.io/badge/AI-Claude_API-E84393?style=flat-square)](https://anthropic.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[Features](#-features) · [Screenshots](#-screenshots) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [API Docs](#-api-reference) · [Roadmap](#-roadmap)

</div>

---

## 🌟 What is Vaultly?

Ever saved an Instagram reel, a Pinterest board, a screenshot, or a webpage — and then **spent 20 minutes trying to find it later?**

**Vaultly** fixes that.

Share anything to Vaultly directly from your Android share sheet — Instagram posts, Pinterest pins, Chrome links, gallery photos, PDFs — and let AI organize, tag, and help you find them later using natural language.

> *"red dress wali insta post dhundho"* → Vaultly finds it instantly.

---

## ✨ Features

### Core
| Feature | Description |
|---|---|
| 📤 **Android Share Sheet** | Share directly from Instagram, Pinterest, Chrome, Gallery — no copy-paste |
| 🗂 **Smart Collections (Vaults)** | Organize saves into custom folders |
| 🔍 **AI Natural Language Search** | Search in plain Hinglish — *"manali ki photos"*, *"10th result link"* |
| 🏷 **Auto AI Tagging** | Claude AI automatically tags every saved item by content |
| 📸 **Multi-source Support** | Instagram, Pinterest, Photos, Reels, Web links, PDFs, Docs |

### Gen Z Features
| Feature | Description |
|---|---|
| ✨ **Vibe Mode** | Organize by aesthetic — Dark Academia, Y2K, Cottagecore, Study Mode |
| 🔥 **Streak Tracker** | Daily save streak to keep you consistent |
| 👯 **Collab Boards** | Share vaults with friends — real-time collaborative collections |
| 🎨 **Auto Mood Board** | AI generates aesthetic mood boards from your saved items |
| 📅 **Weekly Digest** | Push notification summary every Sunday — *"This week you saved 12 outfit inspos"* |
| 🗺 **Location Tagging** | Photos auto-tagged with GPS location — Manali photos go to "Manali" collection |

---

## 📱 Screenshots

> *Add screenshots here after building — use `docs/screenshots/` folder*

```
Home Screen     AI Search       Collections     Profile
   [img]          [img]            [img]          [img]
```

---

## 🛠 Tech Stack

```
┌─────────────────────────────────────────────────────┐
│                    VAULTLY STACK                    │
├─────────────────┬───────────────────────────────────┤
│   Frontend      │  React Native (Expo)               │
│   Navigation    │  React Navigation v6               │
│   Local DB      │  SQLite (expo-sqlite)              │
│   Backend       │  Node.js + Express                 │
│   Database      │  Supabase + pgvector               │
│   AI Search     │  Claude API (claude-sonnet)        │
│   Embeddings    │  OpenAI text-embedding-3-small     │
│   Auth          │  Supabase Auth (Google OAuth)      │
│   Notifications │  Expo Notifications                │
│   Share Sheet   │  react-native-share-menu           │
│   Hosting       │  Railway (backend)                 │
└─────────────────┴───────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- Android Studio (for Android emulator)
- Expo CLI
- Supabase account (free)
- Anthropic API key

### 1. Clone the repo

```bash
git clone https://github.com/DarkSkeletonn/Vaultly.git
cd Vaultly
```

### 2. Install dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. Environment setup

**Frontend** — create `frontend/.env`:
```env
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_ANTHROPIC_KEY=sk-ant-your-key-here
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Backend** — create `backend/.env`:
```env
PORT=3000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### 4. Supabase setup

Run this SQL in your Supabase SQL editor:

```sql
-- Enable vector extension
create extension if not exists vector;

-- Items table
create table items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  name text not null,
  url text,
  type text,            -- 'insta' | 'pin' | 'photo' | 'web' | 'reel' | 'docs'
  vibe text,            -- AI-assigned vibe
  tags text[],          -- AI-assigned tags
  location text,        -- GPS location if available
  embedding vector(1536),
  is_favourite boolean default false,
  created_at timestamptz default now()
);

-- Collections table
create table collections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  name text not null,
  emoji text,
  is_shared boolean default false,
  created_at timestamptz default now()
);

-- Collection items join
create table collection_items (
  collection_id uuid references collections(id) on delete cascade,
  item_id uuid references items(id) on delete cascade,
  primary key (collection_id, item_id)
);

-- Vector similarity search function
create or replace function match_items(
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  filter_user_id uuid
)
returns table(id uuid, name text, type text, similarity float)
language sql stable as $$
  select id, name, type,
    1 - (embedding <=> query_embedding) as similarity
  from items
  where user_id = filter_user_id
    and 1 - (embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;
```

### 5. Run the app

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npx expo start

# Press 'a' for Android emulator
```

### 6. Share Sheet setup (Android physical device)

```bash
# Build development APK
cd frontend
npx expo run:android

# Install on device
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

Now go to Instagram → Share any post → **"Save to Vaultly"** will appear in your share sheet ✅

---

## 📁 Project Structure

```
Vaultly/
├── frontend/
│   ├── app/
│   │   ├── screens/
│   │   │   ├── HomeScreen.jsx
│   │   │   ├── AISearchScreen.jsx
│   │   │   ├── CollectionsScreen.jsx
│   │   │   └── ProfileScreen.jsx
│   │   ├── components/
│   │   │   ├── ItemCard.jsx
│   │   │   ├── AIPanel.jsx
│   │   │   ├── VibeMode.jsx
│   │   │   └── StreakBar.jsx
│   │   ├── services/
│   │   │   ├── db.js              # SQLite local
│   │   │   ├── aiSearch.js        # Claude API
│   │   │   ├── embeddings.js      # OpenAI embeddings
│   │   │   └── shareHandler.js    # Share sheet
│   │   └── navigation/
│   │       └── BottomNav.jsx
│   └── android/
│       └── app/src/main/AndroidManifest.xml
│
├── backend/
│   ├── routes/
│   │   ├── items.js
│   │   ├── search.js
│   │   └── collections.js
│   ├── services/
│   │   ├── aiTagger.js            # Auto-tag with Claude
│   │   └── vectorSearch.js        # Semantic search
│   └── server.js
│
└── docs/
    └── screenshots/
```

---

## 🔌 API Reference

### Save Item
```http
POST /api/items
Content-Type: application/json

{
  "name": "Red dress outfit inspo",
  "url": "https://instagram.com/p/...",
  "type": "insta",
  "imageBase64": "..."   // optional
}
```

### AI Search
```http
GET /api/search?q=manali+ki+photos&user_id=xxx

Response:
{
  "results": [
    { "id": "uuid", "name": "Manali selfie", "similarity": 0.92 }
  ]
}
```

### Get Collections
```http
GET /api/collections?user_id=xxx
```

---

## 🗺 Roadmap

- [x] UI Design + Prototype
- [x] Share Sheet Integration (Android)
- [x] Local SQLite Storage
- [ ] Backend API (Node.js + Railway)
- [ ] Supabase + pgvector setup
- [ ] Claude AI Natural Language Search
- [ ] Vibe Mode + Auto-tagging
- [ ] Collab Boards (shared vaults)
- [ ] Auto Mood Board Generator
- [ ] iOS Support
- [ ] Play Store Launch

---

## 🤝 Contributing

Pull requests welcome! For major changes, open an issue first.

```bash
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
```

---

## 📄 License

MIT © [Juli](https://github.com/DarkSkeletonn) · IIT Mandi · 2026

---

<div align="center">
Made with ♥ at IIT Mandi<br>
<sub>⭐ Star this repo if Vaultly helps you!</sub>
</div>
