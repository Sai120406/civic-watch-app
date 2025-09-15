# CivicWatch: A Modern Crowdsourced Issue Reporting App

This application is a proof-of-concept platform for crowdsourcing and managing civic issues. It's built using a modern, full-stack tech stack designed for performance, developer experience, and scalability.

## Technical Approach

### Core Framework & UI
- **Framework**: **Next.js (App Router)** provides the foundation, enabling a hybrid approach of Server Components for performance and Client Components for interactivity.
- **Language**: **TypeScript** is used throughout the project for static typing, improving code quality and maintainability.
- **UI Components**: The user interface is built with **React** and utilizes **ShadCN UI**, a collection of beautifully designed and accessible components.
- **Styling**: **Tailwind CSS** is used for all styling, allowing for rapid and consistent UI development directly within the component files. Theming is managed via CSS variables in `src/app/globals.css`.

### Backend & Data
- **Authentication**: User identity and sign-in are managed through **Firebase Authentication**, providing a secure and scalable solution for Google Sign-In.
- **Data Management**: For this prototype, sample issue and user data is managed client-side using **React Context API** (`src/context/issues-context.tsx`). This avoids the need for a full database while demonstrating application functionality.

### AI Integration
- **Generative AI**: AI-powered features are implemented using **Genkit**. This includes:
  - **Sentiment Analysis**: A Genkit flow analyzes the sentiment of issue comments to provide a quick summary of the public mood (`src/ai/flows/analyze-issue-sentiment.ts`).
  - **Audio Transcription**: Voice memos attached to issues can be automatically transcribed into text using another Genkit flow (`src/ai/flows/transcribe-audio.ts`).

### Key Features & Implementation
- **Issue Reporting**: A multi-field form (`src/app/submit/page.tsx`) uses `react-hook-form` for state management and `zod` for validation.
- **Interactive Map**: The map view (`src/app/map/page.tsx`) is powered by **`@vis.gl/react-google-maps`**, displaying issue locations with custom markers and info windows.
- **Component-Based Architecture**: The application is broken down into reusable React components (e.g., `IssueCard`, `Header`, `Sidebar`) for a modular and maintainable codebase.
- **Routing**: Navigation is handled by the Next.js App Router, with distinct routes for the dashboard, map, leaderboard, and individual issue details.
