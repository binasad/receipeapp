# Fridge Feast - Flutter App

A Flutter application that generates personalized recipes based on ingredients you have available in your kitchen. This app helps reduce food waste and inspires creative cooking.

## Features

- **Ingredient Management**: Add, remove, and search through your available ingredients
- **AI-Powered Recipe Generation**: Uses Google's Gemini AI to generate creative recipes
- **Modern UI**: Clean, intuitive interface with custom typography
- **Recipe Display**: Beautiful cards showing ingredients, instructions, and cooking times
- **Image Support**: Recipe images from Unsplash
- **Responsive Design**: Works on phones and tablets

## Screenshots

The app features a clean, modern interface with:
- Warm color palette (Saffron Yellow, Burnt Orange)
- Modern typography (Inter, Space Grotesk, Outfit, DM Sans)
- Card-based recipe layout
- Expandable ingredient and instruction sections

## Getting Started

### Prerequisites

- Flutter SDK (3.0.0 or higher)
- Dart SDK
- Android Studio / VS Code
- Firebase project (for backend)
- Google AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fridge_feast
   ```

2. **Install dependencies**
   ```bash
   flutter pub get
   ```

3. **Set up Firebase**
   - Create a Firebase project
   - Add `google-services.json` to `android/app/`
   - Add `GoogleService-Info.plist` to `ios/Runner/`

4. **Configure API Keys**
   - Get a Google AI API key from [Google AI Studio](https://aistudio.google.com/)
    # Fridge Feast

   Fridge Feast is a hybrid project that contains both a Flutter mobile app (mobile-first) and a modern Next.js web frontend. The core idea: generate delicious recipe suggestions from the ingredients you already have, reduce food waste, and inspire cooking — powered by AI.

   This repository includes:

   - A Flutter mobile app (in `lib/` and `android/`) that targets Android/iOS.
   - A Next.js (React + TypeScript) web frontend in `src/` for a modern web experience.
   - AI flows using GenKit and Google GenAI under `src/ai` to generate recipes and (optionally) images.
   - Placeholder images and a small image-matching fallback system to ensure each recipe displays an image.

   ## Table of contents

   - [Key features](#key-features)
   - [Repository structure](#repository-structure)
   - [Getting started (Web)](#getting-started-web)
   - [Getting started (Mobile / Flutter)](#getting-started-mobile--flutter)
   - [AI configuration & image generation](#ai-configuration--image-generation)
   - [Development & scripts](#development--scripts)
   - [Building & production](#building--production)
   - [CI / Deployment recommendations](#ci--deployment-recommendations)
   - [Troubleshooting](#troubleshooting)
   - [Contributing](#contributing)
   - [License](#license)

   ## Key features

   - AI-powered recipe generation (GenKit + Google GenAI)
   - Image handling with three modes: placeholder matching (default), Unsplash search, or AI image generation (optional)
   - Modern, accessible UI components for recipe cards, ingredient management, and recipe lists
   - Mobile-first Flutter codebase plus a Next.js web frontend for cross-platform access

   ## Repository structure

   Top-level highlights (abbreviated):

   ```
   . 
   ├── android/                 # Flutter Android project
   ├── assets/                  # App assets (icons, images)
   ├── build/                   # CI/build outputs
   ├── lib/                     # Flutter app source
   ├── src/                     # Next.js web frontend + ai flows
   │   ├── ai/                  # GenKit setup and flows (generate-recipes, generate-images)
   │   ├── components/          # React components
   │   ├── lib/                 # helper utilities (actions, placeholder images)
   │   └── pages / app          # Next.js pages (API routes & app)
   ├── public/                  # web public assets
   ├── package.json             # web project scripts & dependencies
   ├── pubspec.yaml             # flutter project deps
   └── README.md                # this file
   ```

   Important files to know in the web app:

   - `src/ai/genkit.ts` — GenKit setup using `@genkit-ai/google-genai` and the default model.
   - `src/ai/flows/generate-recipes-from-ingredients.ts` — AI flow that returns recipes (name, ingredients, instructions).
   - `src/lib/actions.ts` — server action that calls the AI flow and enriches recipes with images.
   - `src/lib/placeholder-images.json` — curated placeholder images used as a fallback.
   - `src/components/app/recipe-generator.tsx` — main client component for generating recipes.
   - `src/components/app/recipe-card.tsx` — displays a recipe and its image.

   ## Getting started (Web)

   Prerequisites:

   - Node.js (16+ recommended)
   - npm or pnpm

   Quickstart (PowerShell):

   ```powershell
   cd 'd:\Fridge Feast\Frideg-Feast'
   npm install
   # Development server
   npm run dev

   # Build for production
   npm run build
   # Start production server (after build)
   npm start
   ```

   Notes:

   - If you see "Could not find a production build in the '.next' directory", run `npm run build` before `npm start`.
   - Environment variables for the web frontend live in `.env.local` (see the AI config section below).

   ## Getting started (Mobile / Flutter)

   Prerequisites:

   - Flutter SDK (3.0+ recommended)
   - Android Studio / Xcode (for emulators)

   Quickstart (Flutter):

   ```powershell
   # from repo root
   cd 'd:\Fridge Feast\Frideg-Feast'
   flutter pub get
   # Run on a connected Android device or emulator
   flutter run
   ```

   See `lib/` for the Flutter app code, and `android/` for Android-specific setup. iOS files are included if you open this repo on macOS.

   ## AI configuration & image generation

   This project uses GenKit and the Google GenAI plugin for text (and optionally image) generation. The web app includes a small, safe default behavior for images:

   - Default: keyword-matched curated placeholders from `src/lib/placeholder-images.json` (no API keys required).
   - Unsplash integration: optional — search for recipe images using the Unsplash API (requires UNSPLASH_ACCESS_KEY).
   - AI image generation: optional — use the GenKit `ai` object to generate images for recipes. This requires API credentials and carries cost.

   Environment variables (create a `.env.local` in the web project root):

   ```
   # Google GenAI credentials (example name used by GenKit / provider)
   GOOGLE_API_KEY=your_google_api_key_here

   # Optional: enable AI image generation (set to "true" to enable)
   GENERATE_AI_IMAGES=false

   # Optional: Unsplash API key (if you choose Unsplash fallback)
   UNSPLASH_ACCESS_KEY=your_unsplash_key_here
   ```

   How image generation is wired:

   - `src/lib/actions.ts` calls the recipe generation flow. After recipes are returned, the code will (optionally) call an image generation helper.
   - If `GENERATE_AI_IMAGES=true` and GenKit credentials are present, the flow will attempt to generate an image prompt and call the image API. If generation fails, the system falls back to placeholder images.
   - This pattern prevents the recipe generation from failing if image generation errors out.

   Costs & moderation:

   - Generating images via AI can incur per-image charges. Consider generating images in a background job, caching them in a cloud bucket, and serving them from there.
   - Respect your provider's content policy and consider using content-moderation APIs for user-provided prompts.

   Implementation notes:

   - The project already includes `src/ai/genkit.ts` and references to `@genkit-ai/google-genai` in `package.json`.
   - If you enable AI image generation, provide credentials in `.env.local` and restart the server.

   ## Development & scripts (web)

   Relevant `package.json` scripts:

   - `npm run dev` — start Next.js dev server on port 3000
   - `npm run build` — create production build (`next build`)
   - `npm start` — start the production server (`next start`)
   - `npm run genkit:dev` — convenience script for GenKit dev tooling (project-specific)

   Client-side notes:

   - `RecipeCard` chooses the server-provided `imageUrl` when present; otherwise it picks a random placeholder on client mount to avoid hydration mismatch.

   ## Building & production

   Production build (web):

   ```powershell
   npm run build
   npm start
   ```

   For Docker-based deployments, ensure the Dockerfile runs `npm run build` during image creation and exposes the correct port (3000 by default). If hosting on Vercel, the platform will run `next build` automatically during deployment.

   Mobile production (Flutter):

   ```powershell
   flutter build apk --release
   flutter build ios --release
   ```

   ## CI / Deployment recommendations

   - CI should run `npm ci` (or `npm install`), `npm run build`, and (optionally) a test/lint step. Persist the `.next` build artifacts if your host requires it.
   - For AI image generation, generate images during build/deploy or as a background job to avoid runtime latency.
   - When deploying to a cloud provider (e.g., Azure, GCP, AWS), store generated images in a blob store/CDN and reference them in recipe data.

   ## Troubleshooting

   - Error: "Could not find a production build in the '.next' directory."
     - Fix: Run `npm run build` before `npm start`. See [Getting started (Web)].

   - Build fails with TypeScript errors after changes
     - Fix: Run `npm run build` locally, inspect the error output, and fix type mismatches. The project uses `typescript` and `next`'s type checks during build.

   - AI flow returns malformed JSON or empty recipes
     - Fix: Check `src/ai/flows/generate-recipes-from-ingredients.ts` to ensure the prompt and schemas match the expected shape. Confirm API keys are correct and that the `ai` client is healthy.

   ## Contributing

   Thanks for your interest! A few guidelines:

   1. Fork the repo and create a feature branch from `main`.
   2. Run tests and linters (if added) locally.
   3. Keep commits small and focused. Write descriptive commit messages.
   4. Open a PR and describe your change, any decisions, and migration steps if relevant.

   If you add AI image generation that requires credentials, document how to configure credentials in `.env.local` and add a small helper to optionally upload generated images to a storage bucket.

   ## License

   This project is licensed under the MIT License — see the LICENSE file for details.

   ## Acknowledgments

   - Google GenAI (via GenKit)
   - Unsplash (image fallback)
   - The open-source community and the authors of the dependencies used here
