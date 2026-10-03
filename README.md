# 🗺️ Capitals Quest

A fun, rewarding way for kids and learners to master all **50 US State Capitals**! Study with flash cards, play quiz games, earn coins, and open animal packs to collect a huge library of cute critters. 

---

## ✨ Features

- **Two Core Modes**
  - **📚 Learn** — Bite-sized flash cards. Tap to flip a card and see the state capital.
  - **🎯 Quiz & Test** — Four game modes (Classic, Backwards, Streak Rush, and Type It) plus a mixed Test mode.
- **📝 Graded Tests & Perfect Bonus** — Tests end with a standard letter grade (A–F). Get every answer right in a round of 5+ questions for a one-time-per-state +5 coin bonus.
- **🎮 Mini Games** — Memory Match and Speed Round pay a few bonus coins (up to 15 a day).
- **🪙 Coins & 🎁 Pack Shop** — Earn coins from milestone achievements in quizzes, then spend them in the Pack Shop. Each pack (Farm, Mammal, Bird, Ocean, Safari, Reptile, Bug, Polar, Dino, Mythical) awards a surprise animal with a physical-toy opening animation.
- **⭐ Rarities & Duplicates** — Animals range from Common → Uncommon → Rare → Epic → Legendary. Collect duplicates and track your total count!
- **🗺️ Flexible Region Selection** — Choose specific states, whole regions (Northeast, South, Midwest, West), or tap **Select All 50**.
- **📈 Progress Tracking** — Quiz scores and performance data are stored locally and plotted on an interactive progress chart.
- **🎨 Material Design 3 System** — Styled with Google's Material Design 3 (Material You) design tokens, container surfaces, and elevation.
- **🌗 Dark / Light Mode** — Automatic system theme detection with manual override options.
- **📱 Fully Responsive & Offline Ready** — All artwork is bundled with the app (OpenMoji), so it looks the same on every device and runs offline once loaded.

---

## 💻 Local Development

No build tools, bundlers, or `npm install` required! Simply open `index.html` in your browser or run a lightweight local HTTP server:

```bash
# Serve locally using Python
python3 -m http.server 8000

# Then open http://localhost:8000 in your browser
```

### Syntax Validation
Before committing JavaScript changes, run Node check syntax validation:

```bash
node --check js/app.js && node --check js/storage.js && node --check js/data.js
```

---

## 🗂️ Project Structure

```
├── index.html      # Main HTML structure, screens, and modal overlays
├── css/
│   └── styles.css  # MD3 design tokens, theme variables, layout, and animations
└── js/
    ├── data.js     # Static datasets (50 states, regions, animal packs, rarities)
    ├── storage.js  # LocalStorage wrapper & default schema
    └── app.js      # App lifecycle, screen navigation, quiz logic, shop & collection
```

---

## 🤝 Repository & Contributing

- **Repository URL:** [https://github.com/sarwesv/Capitalquiz.git](https://github.com/sarwesv/Capitalquiz.git)
- All changes are continuously committed and pushed to the `main` branch.

## Credits

Artwork is [OpenMoji](https://openmoji.org) by the OpenMoji contributors, licensed [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The SVG files live in `assets/openmoji/` with the license text.
