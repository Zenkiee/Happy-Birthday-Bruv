# for bruv 🐾💙

A little interactive birthday website for Gemmaima — a live "time she's been alive" counter, a countdown to August 31st, a trail of tap-to-reveal surprise notes, and a letter that unseals on click.

## File structure
```
gemmaima-birthday/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    └── audio/        ← put your music file here (see below)
```

## Before you publish: add the music
I can't include the actual "White Ferrari" audio file — it's a copyrighted commercial recording, so I'm not able to source or embed it for you. The player is already wired up and ready:

1. Add your own legally-owned copy of the track as an MP3.
2. Name it `white-ferrari.mp3`.
3. Drop it into `assets/audio/`.

The ♪ button in the bottom-right corner will play/pause it automatically once the file is there. If the folder's empty, tapping ♪ will just show a friendly reminder instead of failing silently.

(A safer long-term option if you're hosting this publicly on GitHub Pages: swap in an instrumental/lo-fi cover, or a track you have rights to use, so you don't run into copyright takedowns on a public repo.)

## How to put it on GitHub
1. Create a new repo (e.g. `for-bruv`).
2. Upload everything inside `gemmaima-birthday/` to the repo root (keep the folder structure).
3. In the repo, go to **Settings → Pages**, set the source to your main branch, root folder.
4. GitHub gives you a live link like `https://yourusername.github.io/for-bruv/` — that's what you send her.

## What's customizable
- **Messages**: edit the `messages` array near the top of `js/script.js` — that's the pool the surprise trail pulls from.
- **The letter**: edit the text directly inside `#letterBody` in `index.html`.
- **Colors**: all defined as CSS variables at the top of `css/style.css` (`--pink-deep`, `--blue-soft`, etc.) if you ever want to retheme it.
- **Birth date / countdown**: set via `BIRTH_DATE` at the top of `js/script.js` — currently `2005-08-31`.

Everything else (the counter, the countdown, the confetti, the flip cards) runs live off her actual birth date, so it'll stay accurate for as long as the site's up.

Happy birthday to her. 🎂
