# CREATE Leadership Compass™

## Overview
The CREATE Leadership Compass™ is an executive leadership assessment platform that leverages AI to provide personalized personality insights based on Dr. Ellen Ramsey's CREATE Leadership Model™. It guides senior executives through a 6-question assessment across six leadership dimensions and generates tailored leadership profiles using OpenAI's API. The platform is designed with a focus on credibility, executive-grade sophistication, and a calm, confident user experience.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
The frontend is built with React and TypeScript, using Vite. It employs shadcn/ui (Radix UI primitives) and Tailwind CSS for an executive-grade aesthetic, featuring the Inter font, generous spacing, and sophisticated interactions. Wouter handles lightweight client-side routing for a single-page flow (welcome → assessment → summary → contact → confirmation). State management utilizes React hooks and @tanstack/react-query. The design emphasizes card-based progression, elevated shadows, generous whitespace, and single-column centered layouts, drawing inspiration from premium consulting platforms. Key components include a Hero section, ProgressBar, QuestionCard, SummaryDashboard (with radar chart), ContactForm, and ConfirmationMessage.

### Backend
The backend is an Express.js Node.js server with TypeScript, exposing a RESTful API. Key endpoints include `POST /api/assessments/generate-summary` for AI-powered summaries, `POST /api/assessments` for persisting results, and `GET /api/assessments` for retrieval. OpenAI's GPT-4o-mini is integrated with a carefully crafted system prompt to act as an expert leadership consultant, generating professional, executive-appropriate summaries structured into 3-4 paragraphs. Zod schemas are used for API validation, ensuring data integrity. Session management is configured with connect-pg-simple for PostgreSQL-backed storage (for future authentication).

### Data Storage
Drizzle ORM is used with PostgreSQL for data storage, defined by a schema in `shared/schema.ts`. The `assessments` table stores `id`, `name`, `email`, `responses` (jsonb for CREATE pillar keys), `summary`, and `createdAt`. A `users` table is present for future authentication. An `IStorage` abstraction layer allows swapping between in-memory storage (for development) and PostgreSQL without code changes. All assessment responses are validated against a Zod schema (`assessmentResponsesSchema`) to ensure all six CREATE pillars are present with valid response codes (A/B/C/D).

### CREATE Leadership Model™
The assessment is structured around Dr. Ellen Ramsey's six-pillar model:
1.  **Conscious Self-Awareness**
2.  **Relational Intelligence**
3.  **Ethical Influence**
4.  **Adaptive Growth**
5.  **Transparent Communication**
6.  **Empowered Action**

### Core Features
-   **AI-Powered Insights**: Real-time summary generation using OpenAI GPT-4o-mini, with a fallback to template-based summaries.
-   **Visual Analytics**: Recharts-powered radar chart for visualizing scores across the six dimensions.
-   **Lead Capture & Follow-Up**: Optional contact form for debrief requests or email report delivery, with persistent storage of assessment and contact data.
-   **User Experience**: Single-page application with smooth transitions, progress tracking, back navigation, loading states, error handling, and mobile responsiveness.

## External Dependencies

### Third-Party APIs
-   **OpenAI API**: Utilized for generating personalized leadership summaries using GPT-4o-mini (temperature 0.7, max tokens 600) with a system prompt that establishes an expert leadership consultant persona.

### Third-Party Services
-   **PostgreSQL**: Database solution via `@neondatabase/serverless` connector, expecting a `DATABASE_URL` environment variable.
-   **connect-pg-simple**: For PostgreSQL-backed session storage (future authentication).

### UI Libraries & Frameworks
-   **Radix UI**: Unstyled, accessible component primitives.
-   **Recharts**: Data visualization for radar charts.
-   **Tailwind CSS**: Utility-first CSS framework with custom configuration.
-   **Lucide React**: Icon library for consistent iconography.
-   **React Hook Form**: Form state management with Zod validation.
-   **Wouter**: Lightweight client-side routing.
-   **TanStack Query**: Server state management and data fetching.

### Build & Development Tools
-   **Vite**: Build tool and dev server.
-   **TypeScript**: Ensures type safety.
-   **esbuild**: Production server bundling.
-   **Drizzle Kit**: Database migrations and schema management.