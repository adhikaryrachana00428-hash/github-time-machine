# GitHub Time Machine Frontend

The `frontend` app is the Next.js user interface for GitHub Time Machine. It presents the product entry flow, GitHub sign-in route, repository dashboard screens, and visual analysis panels for timelines, graphs, heatmaps, impact analysis, chat, and refactor planning.

## Responsibilities

- Render the public landing and sign-in experience.
- Provide repository dashboard pages.
- Display analysis panels for graph, timeline, heatmap, impact, chat, and refactor planning.
- Keep UI interactions and visual state separate from backend and AI service implementation details.

## Technologies

- Next.js 15 App Router.
- React 19.
- TypeScript.
- Tailwind CSS v4.
- Heroicons React.

## Folder Structure

```text
frontend/
├── app/
│   ├── api/auth/github/route.ts   # GitHub auth route placeholder
│   ├── components/                # Dashboard and analysis UI components
│   ├── login/page.tsx             # Sign-in page
│   ├── repo/[id]/page.tsx         # Repository dashboard page
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## How To Run

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Configure these values in `frontend/.env`:

```bash
GITHUB_CLIENT_ID=your-github-oauth-app-client-id
NEXT_PUBLIC_GITHUB_REDIRECT_URI=http://localhost:3000/api/auth/github
```

A GitHub OAuth App is required for the sign-in flow. Create one at https://github.com/settings/developers.

## Build And Lint

```bash
npm run build
npm run lint
```

## Important Notes

- The frontend expects the backend and AI services to be available separately when wiring real data.
- `package-lock.json` is present, so `npm install` is the default install path for this app.
- Generated build output in `.next/` and installed dependencies in `node_modules/` should not be edited manually.
