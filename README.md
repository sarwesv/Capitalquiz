# 🧠 ProdigyMind

A fun, rewarding way for kids (built to be easy for a 5th grader) to learn —
**US state capitals, 1st-grade math, Dolch sight words**, and more. Study with
flash cards, play quiz games, earn coins, and open animal packs to collect a huge
library of cute critters!

## ✨ Features

- **Two modes**
  - **📚 Learn** — bite-sized flash cards. Tap to flip a card and see the capital.
  - **🎯 Quiz** — four Blooket-style game modes: Classic, Backwards, Streak Rush,
    and Type It.
- **🪙 Coins & 🎁 Packs** — earn coins from lessons and quizzes, then spend them
  in the Pack Shop. Each pack (Farm, Mammal, Bird, Ocean, Safari, Reptile, Bug,
  Polar, Dino, Mythical) gives a **surprise animal** with a physical-toy-style
  opening animation that shows the pack name.
- **Rarities & duplicates** — animals come in Common → Uncommon → Rare → Epic →
  Legendary. You can get doubles, and the collection tracks how many you own.
- **Pick your states** — choose any states, whole regions, or tap **Select All 50**.
- **No cheating the system** — coins are tied to **one-time milestones** (first
  time you study, first time you answer right, first time you master a state).
  Replaying states you've already done earns **0 coins**, so there's nothing to grind.
- **📈 Progress chart** — your quiz scores are saved and drawn on a chart.
- **🌗 Auto dark/light theme** — follows your device automatically (or force one).
- **👋 First-time tutorial** — friendly arrow coach-marks show you around, **once**.
  Skippable and replayable from Settings. A ❓ help guide sits next to Settings.
- **📱 Responsive** — works on phones, tablets, and desktops.
- **💾 Saves automatically** to your browser's `localStorage`.
- **✨ GSAP animations** with graceful fallback if the library can't load.

Everything (animals included) is built from **emoji**, so the app needs **no
image files** and works fully offline once loaded.

## 🚀 How to publish on GitHub Pages

This is a plain static site (just `index.html`, `css/`, and `js/`), so GitHub
Pages can host it directly.

1. **Get the code onto your default branch.** This work is on the branch
   `claude/state-capitals-learning-app-5zlqls`. Open a Pull Request and merge it
   into `main` (or whatever your default branch is).
2. On GitHub, go to your repository's **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Set **Branch** to `main` and the folder to **`/ (root)`**, then click **Save**.
5. Wait about a minute. Your app will be live at:
   `https://sarwesv.github.io/us-state-capitals-quiz/`

To publish without merging first, you can instead pick the
`claude/state-capitals-learning-app-5zlqls` branch in step 4 — but merging to
your default branch is the tidy long-term setup.

### Run it locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 🗂️ Project structure

```
index.html      # markup + screens
css/styles.css  # theme tokens, neomorphism, layout, animations
js/data.js      # all 50 states, packs, rarities, helpers
js/storage.js   # localStorage load/save
js/app.js       # navigation, learn, quiz, shop, packs, tutorial, chart
```
