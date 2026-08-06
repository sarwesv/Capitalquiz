# 🧠 ProdigyMind

A fun, rewarding way for kids (built to be easy for a 5th grader) to learn — **US state capitals, 1st-grade math, Dolch sight words**, and more! Study with flash cards, play Blooket-style quiz games, earn coins, and open animal packs to collect a huge library of cute critters.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen?style=for-the-badge&logo=github)](https://sarwesv.github.io/Prodigymind/)

---

## ✨ Features

- **Two Core Modes**
  - **📚 Learn** — Bite-sized flash cards. Tap to flip a card and see the capital or answer.
  - **🎯 Quiz & Test** — Four Blooket-style game modes (Classic, Backwards, Streak Rush, and Type It) plus a mixed Test mode.
- **🪙 Coins & 🎁 Pack Shop** — Earn coins from milestone achievements in quizzes, then spend them in the Pack Shop. Each pack (Farm, Mammal, Bird, Ocean, Safari, Reptile, Bug, Polar, Dino, Mythical) awards a surprise animal with a physical-toy opening animation.
- **⭐ Rarities & Duplicates** — Animals range from Common → Uncommon → Rare → Epic → Legendary. Collect duplicates and track your total count!
- **🗺️ Flexible Region Selection** — Choose specific states, whole regions (Northeast, South, Midwest, West, Pacific/Territories), or tap **Select All 50**.
- **🚫 Anti-Grind Milestone Economy** — Coins are tied to one-time milestones (first correct answer, first state mastery). Replaying already-mastered content earns 0 coins to maintain fair progression.
- **📈 Progress Tracking** — Quiz scores and performance data are stored locally and plotted on an interactive progress chart.
- **🎨 Material Design 3 System** — Styled with Google's Material Design 3 (Material You) design tokens, container surfaces, and elevation.
- **🌗 Dark / Light Mode** — Automatic system theme detection with manual override options.
- **👋 Guided Tutorial** — Interactive coach-marks guide first-time learners around the dashboard.
- **📱 Fully Responsive & Offline Ready** — Built entirely with emoji graphics (no external image assets needed) and operates completely offline once loaded.

---

## 🚀 Live Demo & Deployment

The application is hosted on **GitHub Pages**:
🔗 **[https://sarwesv.github.io/Prodigymind/](https://sarwesv.github.io/Prodigymind/)**

### Deploying to GitHub Pages

1. Push your changes to the `main` branch of [sarwesv/Prodigymind](https://github.com/sarwesv/Prodigymind).
2. On GitHub, navigate to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **Deploy from a branch**.
4. Set the branch to `main` and folder to `/ (root)`, then click **Save**.

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

- **Repository URL:** [https://github.com/sarwesv/Prodigymind.git](https://github.com/sarwesv/Prodigymind.git)
- All changes are continuously committed and pushed to the `main` branch.

