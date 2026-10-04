function _u(arr){return arr.map(function(x){return Array.isArray(x)?{id:x[0],question:x[1],answer:x[2],group:x[3]}:x;});}
/* ============================================================
   data.js — All 50 US states and the 5 inhabited US territories, their
   capitals, and helpers. Grouped into "units" (regions) so lessons stay
   bite-sized.
   ============================================================ */

// Every state (and territory) with its capital.
const STATES = [
  { abbr: "AL", state: "Alabama",        capital: "Montgomery",     region: "South" },
  { abbr: "AK", state: "Alaska",         capital: "Juneau",         region: "West" },
  { abbr: "AZ", state: "Arizona",        capital: "Phoenix",        region: "West" },
  { abbr: "AR", state: "Arkansas",       capital: "Little Rock",    region: "South" },
  { abbr: "CA", state: "California",     capital: "Sacramento",     region: "West" },
  { abbr: "CO", state: "Colorado",       capital: "Denver",         region: "West" },
  { abbr: "CT", state: "Connecticut",    capital: "Hartford",       region: "Northeast" },
  { abbr: "DE", state: "Delaware",       capital: "Dover",          region: "Northeast" },
  { abbr: "FL", state: "Florida",        capital: "Tallahassee",    region: "South" },
  { abbr: "GA", state: "Georgia",        capital: "Atlanta",        region: "South" },
  { abbr: "HI", state: "Hawaii",         capital: "Honolulu",       region: "West" },
  { abbr: "ID", state: "Idaho",          capital: "Boise",          region: "West" },
  { abbr: "IL", state: "Illinois",       capital: "Springfield",    region: "Midwest" },
  { abbr: "IN", state: "Indiana",        capital: "Indianapolis",   region: "Midwest" },
  { abbr: "IA", state: "Iowa",           capital: "Des Moines",     region: "Midwest" },
  { abbr: "KS", state: "Kansas",         capital: "Topeka",         region: "Midwest" },
  { abbr: "KY", state: "Kentucky",       capital: "Frankfort",      region: "South" },
  { abbr: "LA", state: "Louisiana",      capital: "Baton Rouge",    region: "South" },
  { abbr: "ME", state: "Maine",          capital: "Augusta",        region: "Northeast" },
  { abbr: "MD", state: "Maryland",       capital: "Annapolis",      region: "Northeast" },
  { abbr: "MA", state: "Massachusetts",  capital: "Boston",         region: "Northeast" },
  { abbr: "MI", state: "Michigan",       capital: "Lansing",        region: "Midwest" },
  { abbr: "MN", state: "Minnesota",      capital: "Saint Paul",     region: "Midwest" },
  { abbr: "MS", state: "Mississippi",    capital: "Jackson",        region: "South" },
  { abbr: "MO", state: "Missouri",       capital: "Jefferson City", region: "Midwest" },
  { abbr: "MT", state: "Montana",        capital: "Helena",         region: "West" },
  { abbr: "NE", state: "Nebraska",       capital: "Lincoln",        region: "Midwest" },
  { abbr: "NV", state: "Nevada",         capital: "Carson City",    region: "West" },
  { abbr: "NH", state: "New Hampshire",  capital: "Concord",        region: "Northeast" },
  { abbr: "NJ", state: "New Jersey",     capital: "Trenton",        region: "Northeast" },
  { abbr: "NM", state: "New Mexico",     capital: "Santa Fe",       region: "West" },
  { abbr: "NY", state: "New York",       capital: "Albany",         region: "Northeast" },
  { abbr: "NC", state: "North Carolina", capital: "Raleigh",        region: "South" },
  { abbr: "ND", state: "North Dakota",   capital: "Bismarck",       region: "Midwest" },
  { abbr: "OH", state: "Ohio",           capital: "Columbus",       region: "Midwest" },
  { abbr: "OK", state: "Oklahoma",       capital: "Oklahoma City",  region: "South" },
  { abbr: "OR", state: "Oregon",         capital: "Salem",          region: "West" },
  { abbr: "PA", state: "Pennsylvania",   capital: "Harrisburg",     region: "Northeast" },
  { abbr: "RI", state: "Rhode Island",   capital: "Providence",     region: "Northeast" },
  { abbr: "SC", state: "South Carolina", capital: "Columbia",       region: "South" },
  { abbr: "SD", state: "South Dakota",   capital: "Pierre",         region: "Midwest" },
  { abbr: "TN", state: "Tennessee",      capital: "Nashville",      region: "South" },
  { abbr: "TX", state: "Texas",          capital: "Austin",         region: "South" },
  { abbr: "UT", state: "Utah",           capital: "Salt Lake City", region: "West" },
  { abbr: "VT", state: "Vermont",        capital: "Montpelier",     region: "Northeast" },
  { abbr: "VA", state: "Virginia",       capital: "Richmond",       region: "South" },
  { abbr: "WA", state: "Washington",     capital: "Olympia",        region: "West" },
  { abbr: "WV", state: "West Virginia",  capital: "Charleston",     region: "South" },
  { abbr: "WI", state: "Wisconsin",      capital: "Madison",        region: "Midwest" },
  { abbr: "WY", state: "Wyoming",        capital: "Cheyenne",       region: "West" },
  // The five inhabited US territories.
  { abbr: "AS", state: "American Samoa",           capital: "Pago Pago",       region: "Territories" },
  { abbr: "GU", state: "Guam",                     capital: "Hagåtña",         region: "Territories" },
  { abbr: "MP", state: "Northern Mariana Islands", capital: "Saipan",          region: "Territories" },
  { abbr: "PR", state: "Puerto Rico",              capital: "San Juan",        region: "Territories" },
  { abbr: "VI", state: "U.S. Virgin Islands",      capital: "Charlotte Amalie", region: "Territories" },
];

// The regions we group states into, in a friendly order for kids.
const REGIONS = ["Northeast", "South", "Midwest", "West", "Territories"];

// Little emoji flags for each region to make the picker fun.
const REGION_EMOJI = {
  Northeast: "🍂",
  South: "🌻",
  Midwest: "🌽",
  West: "🏔️",
  Territories: "🏝️",
};

/* ---- Rarities ------------------------------------------------
   Each animal has a rarity. Rarer animals show up less often when
   you open a pack. Colors are used for the glow behind the animal. */
const RARITIES = {
  common:    { name: "Common",    weight: 50, color: "#8b93a7", sell: 2 },
  uncommon:  { name: "Uncommon",  weight: 28, color: "#34c98b", sell: 4 },
  rare:      { name: "Rare",      weight: 14, color: "#5b7cfa", sell: 8 },
  epic:      { name: "Epic",      weight: 6,  color: "#a06bff", sell: 15 },
  legendary: { name: "Legendary", weight: 2,  color: "#f6b73c", sell: 30 },
};
const RARITY_ORDER = ["common", "uncommon", "rare", "epic", "legendary"];

/* ---- Packs -------------------------------------------------- */
const PACKS = [
  {
    id: "farm", name: "Farm Pack", emoji: "🚜", cost: 12,
    blurb: "Friendly critters from the barnyard.",
    pool: [
      { id: "farm_chick",  emoji: "🐥", name: "Baby Chick",   rarity: "common" },
      { id: "farm_pig",    emoji: "🐷", name: "Pink Pig",     rarity: "common" },
      { id: "farm_sheep",  emoji: "🐑", name: "Fluffy Sheep", rarity: "common" },
      { id: "farm_cow",    emoji: "🐮", name: "Spotty Cow",   rarity: "common" },
      { id: "farm_hen",    emoji: "🐔", name: "Red Hen",      rarity: "uncommon" },
      { id: "farm_rooster",emoji: "🐓", name: "Rooster",      rarity: "uncommon" },
      { id: "farm_horse",  emoji: "🐴", name: "Brown Horse",  rarity: "uncommon" },
      { id: "farm_goat",   emoji: "🐐", name: "Billy Goat",   rarity: "rare" },
      { id: "farm_turkey", emoji: "🦃", name: "Proud Turkey", rarity: "rare" },
      { id: "farm_racoon", emoji: "🦝", name: "Sneaky Raccoon", rarity: "epic" },
    ],
  },
  {
    id: "mammal", name: "Mammal Pack", emoji: "🐾", cost: 14,
    blurb: "Furry friends big and small.",
    pool: [
      { id: "mam_mouse",   emoji: "🐭", name: "Little Mouse",  rarity: "common" },
      { id: "mam_hamster", emoji: "🐹", name: "Hamster",       rarity: "common" },
      { id: "mam_rabbit",  emoji: "🐰", name: "Bunny",         rarity: "common" },
      { id: "mam_dog",     emoji: "🐶", name: "Puppy",         rarity: "common" },
      { id: "mam_cat",     emoji: "🐱", name: "Kitten",        rarity: "uncommon" },
      { id: "mam_fox",     emoji: "🦊", name: "Clever Fox",    rarity: "uncommon" },
      { id: "mam_bear",    emoji: "🐻", name: "Brown Bear",    rarity: "uncommon" },
      { id: "mam_panda",   emoji: "🐼", name: "Panda",         rarity: "rare" },
      { id: "mam_koala",   emoji: "🐨", name: "Koala",         rarity: "rare" },
      { id: "mam_hedgehog",emoji: "🦔", name: "Hedgehog",      rarity: "rare" },
      { id: "mam_sloth",   emoji: "🦥", name: "Sleepy Sloth",  rarity: "epic" },
      { id: "mam_otter",   emoji: "🦦", name: "Playful Otter", rarity: "epic" },
    ],
  },
  {
    id: "bird", name: "Bird Pack", emoji: "🐦", cost: 14,
    blurb: "Feathered friends that soar and sing.",
    pool: [
      { id: "bird_sparrow", emoji: "🐦", name: "Sparrow",      rarity: "common" },
      { id: "bird_duck",    emoji: "🦆", name: "Duck",         rarity: "common" },
      { id: "bird_dove",    emoji: "🕊️", name: "White Dove",   rarity: "common" },
      { id: "bird_penguin", emoji: "🐧", name: "Penguin",      rarity: "uncommon" },
      { id: "bird_owl",     emoji: "🦉", name: "Wise Owl",     rarity: "uncommon" },
      { id: "bird_parrot",  emoji: "🦜", name: "Parrot",       rarity: "rare" },
      { id: "bird_swan",    emoji: "🦢", name: "Swan",         rarity: "rare" },
      { id: "bird_peacock", emoji: "🦚", name: "Peacock",      rarity: "epic" },
      { id: "bird_flamingo",emoji: "🦩", name: "Flamingo",     rarity: "epic" },
      { id: "bird_eagle",   emoji: "🦅", name: "Bald Eagle",   rarity: "legendary" },
    ],
  },
  {
    id: "ocean", name: "Ocean Pack", emoji: "🌊", cost: 15,
    blurb: "Splashy pals from under the sea.",
    pool: [
      { id: "oc_fish",     emoji: "🐟", name: "Little Fish",   rarity: "common" },
      { id: "oc_tropical", emoji: "🐠", name: "Tropical Fish", rarity: "common" },
      { id: "oc_crab",     emoji: "🦀", name: "Crab",          rarity: "common" },
      { id: "oc_shrimp",   emoji: "🦐", name: "Shrimp",        rarity: "uncommon" },
      { id: "oc_squid",    emoji: "🦑", name: "Squid",         rarity: "uncommon" },
      { id: "oc_puffer",   emoji: "🐡", name: "Pufferfish",    rarity: "uncommon" },
      { id: "oc_octopus",  emoji: "🐙", name: "Octopus",       rarity: "rare" },
      { id: "oc_dolphin",  emoji: "🐬", name: "Dolphin",       rarity: "rare" },
      { id: "oc_shark",    emoji: "🦈", name: "Shark",         rarity: "epic" },
      { id: "oc_whale",    emoji: "🐳", name: "Blue Whale",    rarity: "legendary" },
    ],
  },
  {
    id: "safari", name: "Safari Pack", emoji: "🦁", cost: 16,
    blurb: "Wild animals from faraway lands.",
    pool: [
      { id: "saf_monkey",   emoji: "🐵", name: "Monkey",       rarity: "common" },
      { id: "saf_camel",    emoji: "🐫", name: "Camel",        rarity: "common" },
      { id: "saf_boar",     emoji: "🐗", name: "Wild Boar",    rarity: "common" },
      { id: "saf_zebra",    emoji: "🦓", name: "Zebra",        rarity: "uncommon" },
      { id: "saf_leopard",  emoji: "🐆", name: "Leopard",      rarity: "uncommon" },
      { id: "saf_gorilla",  emoji: "🦍", name: "Gorilla",      rarity: "rare" },
      { id: "saf_rhino",    emoji: "🦏", name: "Rhino",        rarity: "rare" },
      { id: "saf_giraffe",  emoji: "🦒", name: "Giraffe",      rarity: "epic" },
      { id: "saf_elephant", emoji: "🐘", name: "Elephant",     rarity: "epic" },
      { id: "saf_lion",     emoji: "🦁", name: "Lion King",    rarity: "legendary" },
      { id: "saf_tiger",    emoji: "🐯", name: "Tiger",        rarity: "legendary" },
    ],
  },
  {
    id: "reptile", name: "Reptile Pack", emoji: "🦎", cost: 15,
    blurb: "Cold-blooded and super cool.",
    pool: [
      { id: "rep_lizard",  emoji: "🦎", name: "Lizard",        rarity: "common" },
      { id: "rep_snake",   emoji: "🐍", name: "Snake",         rarity: "common" },
      { id: "rep_frog",    emoji: "🐸", name: "Green Frog",    rarity: "common" },
      { id: "rep_turtle",  emoji: "🐢", name: "Turtle",        rarity: "uncommon" },
      { id: "rep_croc",    emoji: "🐊", name: "Crocodile",     rarity: "rare" },
      { id: "rep_dragon",  emoji: "🐉", name: "Chinese Dragon",rarity: "legendary" },
    ],
  },
  {
    id: "bug", name: "Garden Pack", emoji: "🌸", cost: 10,
    blurb: "Cute little critters from the flower garden.",
    pool: [
      { id: "bug_worm",  emoji: "🐛", name: "Caterpillar",      rarity: "common" },
      { id: "bug_snail", emoji: "🐌", name: "Snail",            rarity: "common" },
      { id: "bug_lady",  emoji: "🐞", name: "Ladybug",          rarity: "common" },
      { id: "bug_bee",   emoji: "🐝", name: "Honey Bee",        rarity: "uncommon" },
      { id: "bug_fly",   emoji: "🦋", name: "Butterfly",        rarity: "uncommon" },
      { id: "bug_lady2", emoji: "🪲", name: "Shiny Beetle",    rarity: "rare" },
      { id: "bug_fly2",  emoji: "🕷️", name: "Garden Spider",rarity: "epic" },
    ],
  },
  {
    id: "polar", name: "Polar Pack", emoji: "❄️", cost: 16,
    blurb: "Chilly buddies from the frozen poles.",
    pool: [
      { id: "pol_seal",    emoji: "🦭", name: "Seal",          rarity: "common" },
      { id: "pol_fish",    emoji: "🐇", name: "Snow Hare",      rarity: "common" },
      { id: "pol_penguin", emoji: "🦌", name: "Reindeer",  rarity: "uncommon" },
      { id: "pol_fox",     emoji: "🐺", name: "Arctic Wolf",    rarity: "rare" },
      { id: "pol_bear",    emoji: "🐻‍❄️", name: "Polar Bear",  rarity: "epic" },
      { id: "pol_whale",   emoji: "🐋", name: "Beluga Whale",  rarity: "legendary" },
    ],
  },
  {
    id: "dino", name: "Dino Pack", emoji: "🦕", cost: 18,
    blurb: "Prehistoric pals from long, long ago.",
    pool: [
      { id: "dino_lizard", emoji: "🥚", name: "Dino Egg",   rarity: "common" },
      { id: "dino_croc",   emoji: "🦂", name: "Giant Scorpion",    rarity: "uncommon" },
      { id: "dino_turtle", emoji: "🐚", name: "Fossil Shell",    rarity: "uncommon" },
      { id: "dino_bronto", emoji: "🦕", name: "Brontosaurus",  rarity: "rare" },
      { id: "dino_trex",   emoji: "🦖", name: "T‑Rex",         rarity: "epic" },
      { id: "dino_dragon", emoji: "🦣", name: "Woolly Mammoth",   rarity: "legendary" },
    ],
  },
  {
    id: "mythic", name: "Mythical Pack", emoji: "✨", cost: 25,
    blurb: "Super rare magical creatures. Pricey but worth it!",
    pool: [
      { id: "myth_lizard",  emoji: "🧚", name: "Tiny Fairy",    rarity: "uncommon" },
      { id: "myth_snake",   emoji: "👻", name: "Friendly Ghost",  rarity: "rare" },
      { id: "myth_dragon",  emoji: "🧞", name: "Genie", rarity: "epic" },
      { id: "myth_babydragon", emoji: "🐲", name: "Baby Dragon", rarity: "epic" },
      { id: "myth_unicorn", emoji: "🦄", name: "Unicorn",      rarity: "legendary" },
    ],
  },
];

// Flatten every pack's pool into one lookup of all animals by id.
const ALL_ANIMALS = {};
PACKS.forEach((pack) => {
  pack.pool.forEach((a) => { ALL_ANIMALS[a.id] = Object.assign({ pack: pack.id }, a); });
});
const TOTAL_ANIMALS = Object.keys(ALL_ANIMALS).length;

// Open a pack: pick one animal, weighted so rarer animals are rarer.
function rollFromPack(pack) {
  const weighted = [];
  pack.pool.forEach((a) => {
    const w = RARITIES[a.rarity].weight;
    for (let i = 0; i < w; i++) weighted.push(a);
  });
  return weighted[Math.floor(Math.random() * weighted.length)];
}

// ---- Helpers -------------------------------------------------

// Return the list of states that belong to a region.
function statesInRegion(region) {
  return STATES.filter((s) => s.region === region);
}

// Look up a state record by its abbreviation.
function stateByAbbr(abbr) {
  return STATES.find((s) => s.abbr === abbr);
}

// Shuffle a copy of an array (Fisher–Yates). Never mutates the input.
function shuffle(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Territories are only mixed with other territories (and states with states),
// so a wrong answer never gives the game away and a player who is only
// studying the 50 states doesn't see unfamiliar territory names as options.
function isTerritory(s) {
  return !!s && s.region === "Territories";
}

// The states/territories that can serve as wrong answers for `abbr`.
function distractorPool(abbr) {
  const asked = STATES.find((s) => s.abbr === abbr);
  return STATES.filter((s) => s.abbr !== abbr && isTerritory(s) === isTerritory(asked));
}

// Pick `n` wrong capital answers that are not the correct one.
function wrongCapitals(correctCapital, n) {
  const asked = STATES.find((s) => s.capital === correctCapital);
  const pool = distractorPool(asked && asked.abbr)
    .map((s) => s.capital)
    .filter((c) => c !== correctCapital);
  return shuffle(pool).slice(0, n);
}

// Mastery thresholds: correct answers needed to reach each level (0-3)
const MASTERY_THRESHOLDS = [0, 1, 3, 5];
const MASTERY_LABELS = ["Not started", "Familiar", "Proficient", "Mastered"];
const MASTERY_EMOJI  = ["⬜", "🟡", "🟣", "⭐"];

function masteryLevel(correct) {
  if (correct >= 5) return 3;
  if (correct >= 3) return 2;
  if (correct >= 1) return 1;
  return 0;
}

// ---- Coin rewards ---------------------------------------------
// One-time, per-state milestones. The key is the flag stored on each
// state's progress record, the value is the coins paid. Shared by the quiz
// (app.js) and by the cloud merge (firebase.js).
const COIN_REWARDS = { correctRewarded: 2, masterRewarded: 5 };

// ---- Typed-answer matching ------------------------------------
// Lower-case, drop accents and punctuation, and treat "St." as "Saint".
function normalizeAnswer(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\bst\b\.?/g, "saint")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Edits (insert, delete, replace, or swap two neighbours) between two strings.
function editDistance(a, b) {
  const d = [];
  for (let i = 0; i <= a.length; i++) {
    d[i] = [i];
    for (let j = 1; j <= b.length; j++) d[i][j] = i === 0 ? j : 0;
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length];
}

// Judge a typed answer: "exact", "close" (a small typo), or "wrong".
// `pool` is every possible answer; a guess that is exactly some OTHER answer
// is a real (wrong) answer, never a typo.
function checkTypedAnswer(guess, answer, pool) {
  const g = normalizeAnswer(guess);
  const a = normalizeAnswer(answer);
  if (!g) return "wrong";
  if (g === a) return "exact";
  const other = (pool || []).some(function (p) { return p !== answer && normalizeAnswer(p) === g; });
  if (other) return "wrong";
  // Short names must be spelled right; longer ones get a little slack.
  const allowed = a.length >= 9 ? 2 : a.length >= 5 ? 1 : 0;
  return editDistance(g, a) <= allowed ? "close" : "wrong";
}

// ---- Grading ----------------------------------------------------
// Standard US letter grades (with + and -) for a percentage.
const GRADE_SCALE = [
  { min: 97, letter: "A+" }, { min: 93, letter: "A" }, { min: 90, letter: "A-" },
  { min: 87, letter: "B+" }, { min: 83, letter: "B" }, { min: 80, letter: "B-" },
  { min: 77, letter: "C+" }, { min: 73, letter: "C" }, { min: 70, letter: "C-" },
  { min: 67, letter: "D+" }, { min: 63, letter: "D" }, { min: 60, letter: "D-" },
  { min: 0,  letter: "F" },
];

// Grade a test: { percent: 0-100, letter: "B+", band: "B" }.
function gradeFor(correct, total) {
  const percent = total > 0 ? Math.round(correct / total * 100) : 0;
  const row = GRADE_SCALE.find(function (g) { return percent >= g.min; });
  return { percent: percent, letter: row.letter, band: row.letter.charAt(0) };
}

/* ---- Subjects registry ------------------------------------- */
const SUBJECTS = [
  { id: "capitals", name: "State Capitals", emoji: "🗺️", grade: null, desc: "All 50 US state capitals and 5 US territories" }
];

/* ---- Subject helpers --------------------------------------- */
function getSubjectItems(subjectId) {
  return STATES.map(function (s) {
    return { id: s.abbr, question: "What is the capital of " + s.state + "?", answer: s.capital, group: s.region };
  });
}

function getSubjectGroups(subjectId) {
  return REGIONS;
}

if (typeof window !== "undefined") {
  window.STATES = STATES;
  window.REGIONS = REGIONS;
  window.REGION_EMOJI = REGION_EMOJI;
  window.RARITIES = RARITIES;
  window.RARITY_ORDER = RARITY_ORDER;
  window.PACKS = PACKS;
  window.ALL_ANIMALS = ALL_ANIMALS;
  window.TOTAL_ANIMALS = TOTAL_ANIMALS;
  window.MASTERY_THRESHOLDS = MASTERY_THRESHOLDS;
  window.MASTERY_LABELS = MASTERY_LABELS;
  window.MASTERY_EMOJI = MASTERY_EMOJI;
  window.SUBJECTS = SUBJECTS;
  window.getSubjectItems = getSubjectItems;
  window.getSubjectGroups = getSubjectGroups;
  window.rollFromPack = rollFromPack;
  window.isTerritory = isTerritory;
  window.distractorPool = distractorPool;
  window.COIN_REWARDS = COIN_REWARDS;
  window.checkTypedAnswer = checkTypedAnswer;
  window.gradeFor = gradeFor;
}
