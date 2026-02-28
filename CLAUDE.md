# AquiEstoy — AI Assistant Rules

## Project Context
Marketplace connecting clients with verified independent technicians in Arequipa, Peru.
Refer to `docs/` for business strategy, benchmarking, and feature specs.
Refer to `PROJECT_RULES.md` for code standards and tech stack.

## Git Workflow — STRICT RULES

### Branch Structure
- `master` — Production. Deployed to Vercel. ONLY landing page / frontend code.
- `dev` — Integration. All code lives here (backend, frontend, docs, infra).
- `main` — Legacy. Do not use.

### Rules
1. **NEVER commit directly to `dev` or `master`.** Always create a feature branch first.
2. **Feature branches are always created from `dev`:**
   ```
   git checkout dev
   git checkout -b feat/feature-name
   ```
3. **Branch naming convention:**
   - `feat/` — new feature (e.g., `feat/landing-hero`)
   - `fix/` — bug fix (e.g., `fix/form-validation`)
   - `chore/` — config, cleanup (e.g., `chore/setup-supabase`)
4. **When a feature is done**, merge into `dev` and delete the feature branch:
   ```
   git checkout dev
   git merge feat/feature-name
   git branch -d feat/feature-name
   ```
5. **To deploy to production**, cherry-pick specific commits from `dev` to `master`:
   ```
   git checkout master
   git cherry-pick <commit-hash>
   git checkout dev
   ```
6. **NEVER push docs/, backend/, docker-compose.yml, Makefile, or PROJECT_RULES.md to `master`.** A pre-commit hook enforces this, but the AI must also respect it.
7. **NEVER run `git push` without explicit user approval.**

### What Goes to `master`
- Frontend landing page code (components, pages, styles)
- Frontend config (package.json, tailwind.config.ts, tsconfig.json)
- Supabase integration for form submissions
- .gitignore

### What NEVER Goes to `master`
- docs/
- backend/
- docker-compose.yml
- Makefile
- PROJECT_RULES.md
- CLAUDE.md

## Infrastructure — Phase 0
- Frontend: Vercel free tier (deploys from `master` branch)
- Database: Supabase free tier (leads + file storage for antecedentes penales)
- No backend deployment yet. Django backend is developed locally on `dev` only.

## Code Standards
See `PROJECT_RULES.md` for full details. Key points:
- Code in English, content in Spanish
- Django + DRF backend, Next.js 14+ frontend
- Tailwind with semantic tokens (never raw colors)
- Mobile-first, SEO-first
- Service layer pattern (business logic in services.py)
