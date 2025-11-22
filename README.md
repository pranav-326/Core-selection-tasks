# workshop-rest-vanilla

A lightweight, production-ready vanilla HTML + CSS + JavaScript workshop project that demonstrates REST API handling: CRUD, external APIs, auth, CORS, error handling, optimistic updates, retries, and deployment.

## Learning Objectives
- Understand REST principles and HTTP verbs.
- Implement CRUD (Create, Read, Update, Delete) with `fetch`.
- Attach auth tokens and understand Authorization headers.
- Handle errors, retries with exponential backoff, and optimistic updates with rollback.
- Work with a local mock API (`json-server`) and switch to external APIs (JSONPlaceholder).
- Deploy a static vanilla site to GitHub Pages, Vercel, or Netlify.

## Quick start (copy-paste)
1. Install deps:
   ```bash
   npm install
   ```
2. Start mock API:
   ```bash
   npm run mock-api
   ```
   This runs `json-server` at `http://localhost:3001`.
3. Serve static site:
   ```bash
   npm run dev
   ```
   Site will be served at `http://localhost:5000`.

Or run both together:
```bash
npm start
```

### Switch to external API (JSONPlaceholder)
Edit `js/config.js`:
```js
export const API_BASE = 'https://jsonplaceholder.typicode.com';
export const USE_MOCK = false;
```
Note: JSONPlaceholder accepts POST/PUT but doesn't persist changes permanently.

## Troubleshooting: CORS
- If you see CORS errors while talking to a mock or external API:
  - For `json-server`, run with `--middlewares` or a simple CORS middleware, or set `--port` and ensure origin allowed.
  - You can also use a small proxy (e.g., Netlify/Vercel functions) to avoid CORS in production.
  - See `lessons/error-handling.html` for more detail.

## Files of interest
- `index.html`, `demo.html` - main pages.
- `styles/styles.css` - single stylesheet.
- `js/config.js` - API base config; toggle `USE_MOCK`.
- `db.json` - mock data for `json-server`.

## PRO TIP
- Keep `USE_MOCK` true during workshops to avoid rate limits and side-effects. Use JSONPlaceholder only for read/demo flows.

## How to navigate the website (quick tour)
This section helps you and participants move through the workshop pages and find code samples quickly.

1. Home & quick start
  - Open `index.html` to read the elevator pitch and jump to the interactive demo.
  - The `Start Workshop` CTA links to `demo.html`.

2. Setup & run
  - Read `setup.html` for environment and commands.
  - Start the mock API with `npm run mock-api` (serves `db.json` at `http://localhost:3001`).
  - Serve the static site with `npm run dev` (default `http://localhost:5000`).

3. Lessons (recommended order)
  - `lessons/rest-basics.html` — HTTP verbs, status codes, fetch vs XHR examples.
  - `lessons/mock-api-and-setup.html` — `db.json` explanation and json-server tips.
  - `lessons/read.html` — GETs and `fetchWithRetry` usage.
  - `lessons/create.html` — POST example and basic form validation.
  - `lessons/update.html` — PUT/PATCH patterns and optimistic edit notes.
  - `lessons/delete.html` — DELETE, confirmations and optimistic delete pattern.
  - `lessons/auth-and-external.html` — fake token auth and switching to JSONPlaceholder.
  - `lessons/error-handling.html` — retries, exponential backoff and CORS troubleshooting.

4. Interactive demo (hands-on)
  - Open `demo.html` in the browser after starting both the mock API and the static server.
  - Demo features: list posts (GET), create (POST), edit (PUT/PATCH), delete (DELETE), optimistic delete with rollback, fake login (stores token in `localStorage`), and a toggle to switch to JSONPlaceholder.
  - Demo logic is implemented in `js/app/demo.js` and uses utilities in `js/lib/api.js` and `js/lib/retry.js`.

5. Resources & deployment
  - Related pages: `resources.html`, `faq.html`, and `contact.html`.
  - Deployment instructions for GitHub Pages, Vercel, and Netlify are in this README above.

If you want a printable one-page cheat sheet for instructors that lists the files to open in order, tell me and I'll add it here as a short section.
