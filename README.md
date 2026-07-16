# GitHub Time Machine

GitHub Time Machine is an engineering intelligence platform for understanding how a repository changes over time. It combines repository metadata, commit history, code structure, and AI-assisted analysis so teams can answer architecture, impact, timeline, and technical debt questions from one interface.

## Problem Statement

Large codebases lose context quickly. Engineers inherit decisions that are spread across commits, files, issues, and tribal knowledge. Before making a change, they often need to understand which files are risky, why an architecture evolved, and what downstream behavior may break.

## Solution

GitHub Time Machine turns repository history into searchable and visual engineering context. The product indexes repository data, stores analysis state in Supabase, serves repository workflows through a core backend, provides AI orchestration endpoints for insights, and exposes the experience through a Next.js frontend.

## Features

- Architecture explanations through AI-assisted chat.
- Change impact simulation for proposed edits.
- Knowledge graph views for modules, files, and relationships.
- Commit timeline for repository events and historical context.
- Technical debt and file health views for high-risk areas.
- Repository submission, analysis status, and chat history backed by Supabase.

## Architecture

```text
Frontend (Next.js)
    |
    | user workflows, repository pages, visual panels
    v
Core Backend (FastAPI + Supabase)
    |
    | repository records, analysis status, chat history
    v
Supabase

AI Service (FastAPI + OpenAI)
    |
    | chat, graph, impact, timeline, heatmap, bug origin, refactor planning
    v
Mock data provider today, replaceable with real repository data provider
```

The project currently has two FastAPI services:

- `backend/`: core application API for repository submission, analysis status, and persisted chat records.
- `ai/`: AI orchestration API for repository intelligence endpoints and demo-mode analysis.

## Tech Stack

- Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS v4, Heroicons.
- Core backend: FastAPI, Pydantic, Supabase Python client, Uvicorn.
- AI service: FastAPI, OpenAI SDK, Jinja2 prompts, SSE support, mock repository data.
- Database: Supabase.

## Repository Structure

```text
github-time-machine/
├── ai/          # AI orchestration service and prompt-powered analysis endpoints
├── backend/     # Core API, Supabase integration, repository workflows
├── data/        # Project data area for datasets or fixtures
├── docs/        # Project documentation
└── frontend/    # Next.js web application
```

## Installation

### Prerequisites

- Node.js 18 or higher.
- Python 3.9 or higher.
- OpenAI API key for AI endpoints that call OpenAI.
- Supabase project URL and service key for the core backend.

### AI Service

```bash
cd ai
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

Create `ai/.env` if you want local environment configuration. Set `OPENAI_API_KEY` before using endpoints that call OpenAI.

### Core Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

Set `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, and any CORS settings expected by `backend/app/core/config.py`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Demo

The AI service includes a standalone demo repository with `repo_id = "demo"`. It can return graph, timeline, heatmap, and other analysis responses without a database.

```bash
curl http://localhost:8001/repos/demo/graph?depth=2
curl http://localhost:8001/repos/demo/timeline
curl http://localhost:8001/repos/demo/heatmap
```

The frontend currently presents the product entry flow, GitHub sign-in route, and repository dashboard components. The core backend exposes repository submission and status APIs for Supabase-backed workflows.

## Team

| Name | Role | GitHub |
|------|------|--------|
| Sai Karthik | PM / Product Owner — repo mgmt, architecture, AI prompt design, integration testing, demo | @sai-karthik-dev |
| Anmol | Frontend — landing page, dashboard UI, auth screens, responsive design, component library, visualizations | @pvtt-anmol2 |
| Foysal Ahmed Pranto | Backend — FastAPI setup, AI orchestration, auth API, business logic, Railway deployment | @foysalpranto121 |
| Fernando Rodríguez López | Backend — Git analysis APIs, code processing endpoints, REST API architecture, data flow | @FerLpz55 |
| Vijay Babu | Database — Supabase setup, connection pooling, backups, schema | @vjbabu3 |
| Rachana | Backend — commit analyzer, timeline events | @adhikaryrachana00428-hash |

## License

This project is licensed under the MIT License. See `LICENSE` for details.
