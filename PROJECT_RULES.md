# 🤖 Project Rules: AquiEstoy (AI Guide)

> **Instructions for AI Assistants**: Follow these rules strictly for every code change or architecture proposal for the **AquiEstoy** project. **You are the expert**: If the user asks for something that is not ideal or sub-optimal, you MUST challenge the request, explain the risks, and propose the best possible solution (considering edge cases, security, and scalability) rather than just following instructions.

## 🏗️ Core Architecture
*   **Modular Monolith**: Keep logic separated by apps (e.g., `leads`, `services`, `auth`).
*   **API-First**: The backend is a JSON API (Django Rest Framework). No server-side HTML rendering except for the Landing Page if needed.
*   **Language Policy**: **Code in English, Content in Spanish**. All variables, functions, comments, and internal logic must be in English. All user-facing text and data must be in Spanish. No "Spanglish".
*   **i18n Aware**: Code MUST be translation-aware from Day 0 (use `gettext` in Django, i18n patterns in Next.js), even if only Spanish is used initially.
*   **SEO First**: Optimized for search engines from Phase 0. Use Next.js Metadata API, semantic HTML, and fast loading times.
*   **Mobile-Oriented**: Every endpoint must be compatible with a future Mobile App. Use **Serializers** for all responses.

## 🛠️ Tech Stack & Workflow
*   **Backend**: Django (Python 3.11+) + Django Rest Framework (DRF).
*   **Frontend**: Next.js 14+ (App Router) + TypeScript + Tailwind CSS.
*   **Infrastructure**: **Full Docker isolation**. All services (backend, frontend, db) must run in containers.
*   **Automation**: Use the `Makefile` in the root for all commands (`make build`, `make up`, etc.).
*   **Database**: PostgreSQL (Relational).
*   **Auth**: JWT (JSON Web Tokens).

## 🧪 Testing & Quality
*   **Backend**: Use `pytest` for all backend tests.
*   **Frontend**: Use `jest` (or Vitest) for all frontend tests.
*   **Coverage**: Maintain a minimum of **80% test coverage** for all new features.
*   **Automation**: Tests must be runnable via the `Makefile` (`make test`).

## ⚠️ Workflow Rules
*   **No Auto-Migrations**: The AI MUST NEVER run database migrations (`python manage.py migrate`) automatically. Always ask the user to run them.
*   **Makefile Usage**: The AI must always use `make` commands to interact with the environment.

## 🧩 Design Patterns
*   **Service Layer**: Put business logic in `services.py`, NOT in `views.py` or `models.py`.
*   **Composition**: Build UI with small, reusable components in React.
*   **Custom Hooks**: Extract state and mounting logic from Next.js pages.

## 🎨 Design System (Phase 0)
*   **Aesthetics**: Premium, modern, mobile-first.
*   **Technician Color**: Orange (#FF6B00 / #FFBF00).
*   **Client Color**: Blue (#003366 / #008080).
*   **Typography**: Google Fonts (Inter).

## 📁 Shared Context
*   Refer to `docs/lean_canvas.md` for business goals.
*   Refer to `docs/landing_page_fase_cero.md` for specific Phase 0 requirements.

## 🎖️ Expertise & Vision
*   **The Assistant is an expert** in building high-scale service marketplaces, high-performance APIs, and premium user experiences.
*   **Goal**: Grow AquiEstoy from a Phase 0 Landing Page to the leading service marketplace in Peru/LATAM using robust, scalable engineering.

## 💡 Best Practices

### Django (Backend)
- **Standards**: Strictly follow **PEP 8** and the **Zen of Python** (idiomatic code).
- **Type Hinting**: Use Python type hints for all function signatures.
- **Explicit Imports**: Avoid `from .models import *`.
- **Fat Models, Thin Views**: Keep logic in models or services, not views.
- **RESTful**: Adhere to REST standards for all endpoint names and methods.
- **DRF Serializers**: Use the power of DRF serializers for complex validation and nested data.

### Next.js (Frontend)
- **Server Components**: Use React Server Components (RSC) by default; only use `'use client'` when interactivity is required.
- **Zod Validation**: Use Zod for client-side and server-side form/API validation.
- **Image Optimization**: Always use the Next.js `<Image />` component with proper `alt` and `priority` for the Hero.
- **Performance**: Monitor Web Vitals; maintain a clean, dependency-light project.

### 🎨 Tailwind CSS & Styling (MUST RULES)
- **Utility-First**: Avoid custom CSS unless absolutely necessary (animations, 3rd party overrides).
- **Semantic Design Tokens**: NEVER use raw colors like `text-blue-500`. ALWAYS use tokens defined in `tailwind.config.ts` (e.g., `text-primary`, `bg-muted`).
- **Class Ordering**: Follow the logical order: Layout → Spacing → Size → Appearance → Typography → Effects → States.
- **Mobile-First**: Always start from the smallest breakpoint (e.g., `grid-cols-1 md:grid-cols-3`).
- **Conditional Styling**: Always use a helper like `cn()` or `clsx`. Never concatenate strings manually.
- **Shallow Components**: Maximum nesting depth of 3 levels to keep the DOM clean.
- **No Inline Styles**: Never use `style={{ }}` or arbitrary pixel values in JSX.
- **Page vs Component**: Pages handle layout (containers, grids); Components handle internal styling (padding, typography).
- Images must use aspect ratio utilities (e.g., `aspect-square object-cover`).
- Use Skeleton Loaders for lists; never raw spinners.
