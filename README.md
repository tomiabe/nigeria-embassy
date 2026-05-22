<div align="center">

# Nigeria Embassy Finder

**A verified directory of foreign missions in Nigeria and Nigerian missions abroad**

[![Live Site](https://img.shields.io/badge/Live%20Site-tomiabe.github.io%2Fnigeria--embassy-0ea5e9?style=flat-square)](https://tomiabe.github.io/nigeria-embassy/)

</div>

---

Nigeria Embassy Finder helps you quickly locate embassies, high commissions, and consulates — with visa guidance and "where to apply" info for countries that have no mission in Nigeria.

## What's inside

- Foreign missions located in Nigeria
- Nigerian missions abroad
- Visa processing notes and alternative application points for unmissioned countries
- Verified entries with source links and last-verified dates

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Data | `src/data.ts` — structured, verified JSON |
| AI | Gemini (client-side, for search assistance) |
| Hosting | GitHub Pages |

## Running Locally

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

Add a `GEMINI_API_KEY` to a `.env.local` file (see `.env.example`).

## Data

All entries are manually verified from official sources before being added. Each record includes a source link and last-verified date. The full audit trail is in `RESEARCH.md`.

---

Built by [Tomi Abe Studio](https://studio.tomiabe.com)
