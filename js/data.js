function _u(arr){return arr.map(function(x){return Array.isArray(x)?{id:x[0],question:x[1],answer:x[2],group:x[3]}:x;});}
/* ============================================================
   data.js — All 50 US states, their capitals, and helpers.
   Grouped into "units" (regions) so lessons stay bite-sized.
   ============================================================ */

// Every state with its capital and a fun little hint for learners.
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
];

// The regions we group states into, in a friendly order for kids.
const REGIONS = ["Northeast", "South", "Midwest", "West"];

// Little emoji flags for each region to make the picker fun.
const REGION_EMOJI = {
  Northeast: "🍂",
  South: "🌻",
  Midwest: "🌽",
  West: "🏔️",
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
      { id: "bug_lady2", emoji: "🐞", name: "Lucky Ladybug",    rarity: "rare" },
      { id: "bug_fly2",  emoji: "🦋", name: "Rainbow Butterfly",rarity: "epic" },
    ],
  },
  {
    id: "polar", name: "Polar Pack", emoji: "❄️", cost: 16,
    blurb: "Chilly buddies from the frozen poles.",
    pool: [
      { id: "pol_seal",    emoji: "🦭", name: "Seal",          rarity: "common" },
      { id: "pol_fish",    emoji: "🐟", name: "Ice Fish",      rarity: "common" },
      { id: "pol_penguin", emoji: "🐧", name: "Snow Penguin",  rarity: "uncommon" },
      { id: "pol_fox",     emoji: "🦊", name: "Arctic Fox",    rarity: "rare" },
      { id: "pol_bear",    emoji: "🐻‍❄️", name: "Polar Bear",  rarity: "epic" },
      { id: "pol_whale",   emoji: "🐋", name: "Beluga Whale",  rarity: "legendary" },
    ],
  },
  {
    id: "dino", name: "Dino Pack", emoji: "🦕", cost: 18,
    blurb: "Prehistoric pals from long, long ago.",
    pool: [
      { id: "dino_lizard", emoji: "🦎", name: "Baby Raptor",   rarity: "common" },
      { id: "dino_croc",   emoji: "🐊", name: "Swamp Dino",    rarity: "uncommon" },
      { id: "dino_turtle", emoji: "🐢", name: "Shell Dino",    rarity: "uncommon" },
      { id: "dino_bronto", emoji: "🦕", name: "Brontosaurus",  rarity: "rare" },
      { id: "dino_trex",   emoji: "🦖", name: "T‑Rex",         rarity: "epic" },
      { id: "dino_dragon", emoji: "🐲", name: "Dino Dragon",   rarity: "legendary" },
    ],
  },
  {
    id: "mythic", name: "Mythical Pack", emoji: "✨", cost: 25,
    blurb: "Super rare magical creatures. Pricey but worth it!",
    pool: [
      { id: "myth_lizard",  emoji: "🦎", name: "Baby Wyrm",    rarity: "uncommon" },
      { id: "myth_snake",   emoji: "🐍", name: "Sea Serpent",  rarity: "rare" },
      { id: "myth_dragon",  emoji: "🐉", name: "Great Dragon", rarity: "epic" },
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

// Pick `n` wrong capital answers that are not the correct one.
function wrongCapitals(correctCapital, n) {
  const pool = STATES
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

/* ---- Subjects registry ------------------------------------- */
const SUBJECTS = [
  { id: "capitals", name: "State Capitals", emoji: "🗺️", grade: null, desc: "All 50 US state capitals" }
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
}
