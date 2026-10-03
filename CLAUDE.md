# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**Capitals Quest** — a static, single-page web app that helps learners master
US state capitals. It runs entirely in the browser with **no build step, no
framework, and no backend**. It's designed to be hosted on GitHub Pages.

## Running it

Plain static files — just open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

**Nothing to build or install.** Do not add a bundler, package.json, or
transpiler unless explicitly asked — keeping it dependency-free is a goal.

Syntax-check JS before committing:

```bash
node --check js/app.js && node --check js/storage.js && node --check js/data.js && node --check js/emoji.js
```

The only external resources are CDN-loaded at runtime:
- **GSAP** (animations) — the app checks `typeof gsap` and degrades gracefully if
  it fails to load, so never assume GSAP is present.
- **Google Fonts** (Baloo 2) — falls back to system fonts.

## File map

```
index.html      All markup: screens (home, picker, learn, qmode, quiz, results)
                and modals (settings, help, animal, pack, confirm, coachLayer).
css/styles.css  MD3 design tokens, theme variables, layout, component styles, animations.
js/data.js      Static data + pure helpers: STATES (50), REGIONS, RARITIES,
                PACKS (animal library), and helpers like shuffle/rollFromPack.
js/storage.js   Everything that touches localStorage. defaultSave() is the
                schema; all persistence goes through load/persist here.
js/emoji.js     Swaps emoji for OpenMoji SVGs from assets/openmoji/ (DOM observer).
assets/openmoji Bundled OpenMoji artwork + LICENSE.txt (CC BY-SA 4.0).
js/app.js       All behavior, wrapped in one IIFE. Screen nav, learn, quiz,
                test, shop, packs, collection, time-on-task, tutorial, chart.
```

Load order in `index.html` matters: `data.js` → `storage.js` → `emoji.js` → `firebase-config.js` → `firebase.js` → `app.js`.

## Architecture

`js/app.js` is a single IIFE (`(function(){ ... })()`). Everything is module-private;
there are no globals beyond what `data.js`/`storage.js` define.

**Screens** are `<main id="screen-*">` elements; `show(name)` toggles the `hidden`
class. To add a screen, add its id to the `screens` array at the top of `app.js`.

**State** lives in module-scoped variables and is persisted via `persist(save)`.
Key quiz variables: `quizList` (ordered state abbrs), `quizIdx`, `quizScore`,
`streak`, `quizAbbrs` (original selection), `resumingId` (id of a resumed paused quiz).

**`save`** is the single source of truth for user data. Its shape is defined by
`defaultSave()` in `storage.js`; `loadSave()` merges stored data over the defaults
(forward-compatible). Always add new fields to `defaultSave()` rather than reading
raw localStorage.

**Mastery:** a state is mastered when `p.correct >= 2`. Once mastered, the
`masterRewarded` flag fires `claimMilestone` so the coin reward fires exactly once.

**Quiz vs. Test:** "Quiz" offers four game modes (Classic, Backwards, Streak Rush,
Type It) selected from the `qmode` screen. "Test" is a fifth separate mode
(`quizMode = "test"`) that mixes multiple-choice and typed questions — it is handled
by the same quiz flow but with its own question-rendering branch.

**Cloud sync merge:** `mergeSaves` (`firebase.js`) combines the local and cloud saves.
Per-state progress only grows, so it is combined (max / OR) and the one-time reward flags
(`COIN_REWARDS` in `data.js`) must always survive. Coins and the animal collection go up
*and down*, so they are taken from whichever copy has the newer `modifiedAt` (stamped by
`persist`) — never "keep the bigger number", which hands back spent coins and sold animals.
Pass `{ keepStamp: true }` to `persist` when saving a merge result rather than a player change.

**Typed answers** go through `checkTypedAnswer` (`data.js`): case, spacing, punctuation and
"St."/"Saint" are ignored and small typos are accepted, but an exact match for a *different*
state/capital is always wrong.

**Paused quizzes:** mid-quiz exits serialize the current quiz state into
`save.pausedQuizzes` (keyed by a random `id`). Resuming restores `quizList`,
`quizIdx`, `score`, `streak`, `sessionCoins`, and elapsed time.

## Key conventions

- **DOM helpers:** `$(sel)` = querySelector, `$$(sel)` = querySelectorAll → array.
- **Animations:** use the `animIn` / `pop` wrappers, or guard raw GSAP calls with
  `if (hasGSAP)`. The app must stay fully usable without GSAP.
- **No `alert`/`confirm`/`prompt`.** Use `toast(msg)` for transient messages and
  `gameConfirm({emoji, title, message, confirmText, cancelText, danger, onConfirm})`
  for yes/no dialogs.
- **Modals:** open with `openOverlay('#overlayId')`, close with
  `closeOverlay('#overlayId')`. Each modal is a hidden `div.overlay` in `index.html`.
- **Emoji are shown as OpenMoji art.** Write plain emoji in text/HTML/data as usual;
  `js/emoji.js` swaps each one for an SVG from `assets/openmoji/` (it watches the DOM,
  so dynamic content works too). To use a new emoji, add its SVG to `assets/openmoji/`
  (file name = uppercase hex code points, e.g. `1F43A.svg`, dropping `FE0F`) and add the
  code to `AVAILABLE` in `js/emoji.js`; emoji without art just stay as text. Emoji in
  attributes (`title`, `placeholder`), CSS `content`, or SVG `<text>` can't be swapped, so
  avoid them (or use `EmojiArt.src(emoji)` for an `<img src>`). Keep each animal's emoji
  unique across `PACKS`. Keep the OpenMoji credit (CC BY-SA 4.0) in Help and the README.
- **Theme & MD3 Styling** are driven by CSS variables and root attributes (`:root[data-theme]`). Style both light and dark.
- Match the existing plain-ES5-ish style (function declarations, `let`/`const`,
  string concatenation for templates). No new tooling.

## Economy rules (don't break these)

- **Coins come only from quizzes/tests**, via one-time per-state milestones
  (`claimMilestone`): first correct answer (+2 coins) and first mastery (+5 coins).
  Learning earns nothing and replaying already-earned states earns nothing — this is
  deliberate anti-grind; preserve it.
- **Selling** animals pays `RARITIES[r].sell`, kept below pack prices so
  buying-to-sell is never profitable.

## Deploying (GitHub Pages)

Root-hosted static site. In repo **Settings → Pages**, set Source = "Deploy from a
branch", Branch = your default branch, folder = `/ (root)`. Live URL:
`https://sarwesv.github.io/prodigymind/`.
