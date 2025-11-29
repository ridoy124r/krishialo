# KrishiAlo

A small full-stack project with a Node.js + Express + Prisma backend and a React + Vite frontend.

## Structure
- `Backend/` — Express API, Prisma migrations, and seed scripts.
- `Frontend/` — React app built with Vite.

## Quick Start

Prerequisites: Node.js, npm, and a Postgres (or compatible) database.

Backend
```
cd Backend
npm install
# create a `.env` with at least `DATABASE_URL` and any API keys (e.g. Stripe)
# run migrations and seed (if needed):
# npx prisma migrate dev
# node prisma/seed.js
node server.js
```

Frontend
```
cd Frontend
npm install
npm run dev
# open the app at the Vite dev URL (usually http://localhost:5173)
```

## Notes
- API routes are in `Backend/routes/` and controllers in `Backend/controllers/`.
- Database schema and seeds live in `Backend/prisma/`.

## Contributing
Feel free to open issues or pull requests. For major changes, please open an issue first to discuss.

## License
MIT
