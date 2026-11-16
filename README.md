# Divya Hariharan — Portfolio (React + Vite + TypeScript)

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
```

## Build
```bash
npm run build      # outputs static files to dist/
npm run preview
```

## Edit content
All text lives in `src/data.ts`. Styles are in `src/styles.css`. Swap the photo at `src/assets/photo.jpg` and the downloadable CV at `public/resume.pdf`.

## Deploy (static hosting, build command `npm run build`, output folder `dist`)
- **Vercel:** `npx vercel --prod`  (framework preset: Vite)
- **Firebase Hosting:** `firebase init hosting` → public directory `dist`, single-page app: No → `firebase deploy --only hosting`
- **Netlify:** drag the `dist` folder onto app.netlify.com/drop
