# FORME — a considered dating experience

A frontend-only dating app concept built with semantic HTML, custom CSS and vanilla JavaScript. It is intentionally dependency-free so it can be opened locally or hosted as a static site.

## Run locally

From this directory, run:

```bash
python -m http.server 4173
```

Then open http://localhost:4173.

You can also open `index.html` directly, though a local server is recommended.

## Interactions

- Discover: drag a profile left/right, or use the Pass / Interested / Stand out buttons. Keyboard arrows also work.
- Preferences: adjust the distance, age range and relationship intent.
- Likes: see profiles you have liked and open their full profile.
- Messages: switch between seeded conversations and send messages locally.
- Match: liking a profile opens the match moment and lets you jump into messages.

## Notes

- All data is mock data held in browser memory; refreshing resets the session.
- Portraits and fonts are loaded from Unsplash and Google Fonts, so those visual assets require an internet connection.
- The layout is responsive and respects `prefers-reduced-motion`.
