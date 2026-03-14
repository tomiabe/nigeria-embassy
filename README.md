# Nigeria Embassy & Consular Finder

Nigeria Embassy & Consular Finder is a lightweight, static directory that lists foreign missions in Nigeria and Nigerian missions abroad. It focuses on verified addresses, visa processing guidance, and direct source links so users can quickly find official information without extra noise.

## What it includes
- Foreign embassies, consulates, and high commissions located in Nigeria
- Nigerian embassies, high commissions, and consulates worldwide
- Visa processing notes and “where to apply” guidance
- Source links and verification dates for transparency

## How it’s built
- Plain HTML, CSS, and JavaScript (no build step)
- Data stored in `data.json` and mirrored in `data.js` for direct use in the browser
- UI logic and filtering in `app.js`
- Research sources logged in `RESEARCH.md`

## Run locally
Open `index.html` in a browser, or serve the folder with a simple static server.

## Data updates
Entries are added only after verification from official sources. Each entry includes source links and the last verified date. See `RESEARCH.md` for the full audit trail.
