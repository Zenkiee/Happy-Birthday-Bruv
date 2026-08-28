# for bruv

An interactive one-screen birthday site for Gemmaima. Everything lives in a single view — a live "time she's been alive" counter, a countdown to August 31st, tap-to-reveal surprise cards, a favorites showcase, and a letter — switched between with the bottom tab bar. No scrolling through sections.

## File structure
```
gemmaima-birthday/
├── index.html
├── css/style.css
├── js/script.js
└── assets/audio/   ← add your music file here
```

## Add the music
There are two audio slots, and neither track is included — both are commercial recordings, so they can't be embedded here directly. To finish it:

1. Add your own legally-owned MP3s.
2. Name them exactly `happy-birthday.mp3` and `white-ferrari.mp3`.
3. Put both in `assets/audio/`.

`happy-birthday.mp3` is the looping background track — it starts automatically. `white-ferrari.mp3` plays on demand from the ♪ button on the Favorites slide.

**About the autoplay:** browsers block audio with sound from playing until the visitor has interacted with the page at least once — no site can override that, it's a browser-level rule, not something in this code. The site works around it as closely as it can: the background track loads muted and starts immediately, then unmutes itself the instant she does anything at all — the first click, tap, or key press anywhere on the page, including just tapping "begin" on the opening slide. So in practice it plays itself the moment she starts looking at the site, without a dedicated play button.

## Publish on GitHub Pages
1. Create a repo, upload everything in `gemmaima-birthday/` to the root (keep the folder structure).
2. Settings → Pages → set source to your main branch, root folder.
3. Your link: `https://yourusername.github.io/reponame/`

## Customizing
- **Surprise messages** — edit the `messages` array in `js/script.js`.
- **Letter text** — edit `#letterBody` in `index.html`.
- **Birth date** — `BIRTH_DATE` at the top of `js/script.js`.
- **Colors** — CSS variables at the top of `css/style.css`.
