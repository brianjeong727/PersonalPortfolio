# Brian Jeong — Personal Site

Portfolio for Brian Jeong, CS + Data Science at the University of Pittsburgh.

**Live:** [brianjeong.dev](https://brianjeong.dev) *(custom domain — pending)*

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript, plain CSS
- React `<ViewTransition>` for the card-to-case-study morph (`experimental.viewTransition`)
- Deployed on [Vercel](https://vercel.com)

## Where things live

- `app/page.tsx` — home: sticky sidebar + work list
- `app/work/<slug>/page.tsx` — case studies (Central, Chaeum, PNC, PittNAIL template)
- `components/figures.tsx` — diagrams and code excerpts used in case studies
- `lib/site.ts` — profile links and screen recordings

## Adding a screen recording

Drop a short looping `.mp4` in `public/recordings/` and set its path in `RECORDINGS` in `lib/site.ts`
(e.g. `central: "/recordings/central.mp4"`). It plays while on screen and pauses off screen.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
