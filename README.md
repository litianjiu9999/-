# hello-web-app

A minimal **Node.js + TypeScript (Express)** web application that serves a small web UI and a JSON API. It anchors the Cloud Agent development environment for this repository.

## Requirements

- Node.js >= 22 (the Cloud Agent default image ships Node 22)
- npm

## Install

```bash
npm ci
```

## Run

Development (auto-reload):

```bash
npm run dev
```

Production build + start:

```bash
npm run build
npm start
```

The server listens on `http://localhost:3000` (override with the `PORT` env var).

## API

| Method | Path                 | Description                          |
| ------ | -------------------- | ------------------------------------ |
| GET    | `/`                  | Serves the web UI (`public/index.html`) |
| GET    | `/api/health`        | Health check: `{ status, uptime }`   |
| GET    | `/api/hello?name=X`  | Greeting: `{ message: "Hello, X!" }` |
| POST   | `/api/echo`          | Echoes the posted JSON body          |

## Test / typecheck

```bash
npm test        # vitest + supertest against the Express app
npm run typecheck
```

## Cloud Agent environment

The environment is defined in [`.cursor/environment.json`](.cursor/environment.json):

- `install`: `npm ci` (idempotent dependency install)
- `terminals`: a persistent `dev-server` running `npm run dev`
- `ports`: exposes `3000`
