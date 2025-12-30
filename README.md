# Nival Cloud Solutions — Client

A professional, production-ready frontend for Nival Cloud Solutions. Built with React, Vite, Tailwind CSS and MDX for content-driven pages.

### SEE ALSO: [Nival Cloud Solutions - Server](https://github.com/siddhantkore/Nival-Server)

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Local development](#local-development)
- [Build & preview](#build--preview)
- [Linting](#linting)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License & contact](#license--contact)

---

## Overview

This repository contains the client application for Nival Cloud Solutions. The app is a modern React single-page application (SPA) focused on performance, accessibility, and simple content management using MDX.

## Features

- Content authored as MDX for blogs and case studies
- Fast development build via Vite
- Responsive UI using Tailwind CSS
- Client-side routing with React Router

## Tech stack

- React
- Vite
- Tailwind CSS
- MDX / remark / rehype

## Prerequisites

- Node.js 18.x or later (LTS recommended)
- npm 9.x or later (or yarn/pnpm if you prefer)

> Note: If you use a Node version manager (nvm, fnm), ensure the active version meets the above requirements.

## Local development

1. Clone the repository:

```bash
git clone <repo-url>
cd nival-client
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open the app at http://localhost:5173 (or the address printed by Vite).

## Build & preview

Create a production build and preview the optimized output locally:

```bash
npm run build
npm run preview
```

This serves the built assets so you can validate the production bundle.

## Linting

Run the project linter (ESLint):

```bash
npm run lint
```

Follow lint errors and warnings before opening pull requests.

## Deployment

The project outputs a static build and can be hosted on any static hosting platform (Vercel, Netlify, S3 + CloudFront, GitHub Pages, etc.). Basic steps:

1. Build: `npm run build`
2. Upload the `dist/` directory to your static host

For CI/CD pipelines, ensure you run `npm ci` (or `npm install`), then `npm run build` as part of the pipeline.

## Environment variables

There are no required environment variables in the repository by default. If you need to add runtime configuration, use a `.env` file and document new variables in this README.

## Contributing

Contributions are welcome. Please open a concise, focused pull request and include a short description of the change and any testing steps. Keep commits small and well-scoped.

## License & contact

See the `LICENSE` file for license details (if present). For questions or support, reach out to the project maintainer.

---
