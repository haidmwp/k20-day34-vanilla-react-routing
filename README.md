# K20 Day 34 - Vanilla & React Routing

Repository contains two independent routing exercises:

- `vanilla-router-shop`: Vanilla HTML/CSS/JavaScript router using History API.
- `react-router-shop`: React + Vite + React Router shop.

Both projects use Tailwind CSS classes, include all required pages/layouts, active navigation, scroll reset, cart interaction and a 404 page.

## Run locally

### Vanilla Router Shop
```bash
cd vanilla-router-shop
npm install
npm run dev
```

### React Router Shop
```bash
cd react-router-shop
npm install
npm run dev
```

## Build

Run `npm run build` inside each project folder.

## Deployment

Deploy each project folder separately on Vercel (or an equivalent static hosting service). Both folders include `vercel.json` rewrites so direct access to routes such as `/products/2` works correctly.
