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
// `sell` is how many coins you get for selling one — deliberately low
// (rarer = more) and always less than a pack costs, so buying-to-sell is
// never a reliable way to make coins.
const RARITIES = {
  common:    { name: "Common",    weight: 50, color: "#8b93a7", sell: 2 },
  uncommon:  { name: "Uncommon",  weight: 28, color: "#34c98b", sell: 4 },
  rare:      { name: "Rare",      weight: 14, color: "#5b7cfa", sell: 8 },
  epic:      { name: "Epic",      weight: 6,  color: "#a06bff", sell: 15 },
  legendary: { name: "Legendary", weight: 2,  color: "#f6b73c", sell: 30 },
};
const RARITY_ORDER = ["common", "uncommon", "rare", "epic", "legendary"];

/* ---- Packs --------------------------------------------------
   A big library of animal friends, sorted into themed packs.
   Every animal is just an emoji, so the whole app works offline
   with zero image files. You can get duplicates — collect them all!
   `cost` is in coins. Packs are cheap on purpose: a good quiz earns
   enough coins to buy 3–4 packs. */
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

/* ============================================================
   Multi-subject support
   ============================================================ */

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

/* ---- 1st Grade Math ---------------------------------------- */
const GRADE1_MATH = (function () {
  const items = [];

  // Addition within 20 (word problems and unknown addends)
  var addItems = [
    { id: "add_0_0",   question: "Mia has 7 crayons. She gets 6 more. How many crayons in all?", answer: "13", group: "Addition" },
    { id: "add_0_1",   question: "There are 9 frogs on a log and 8 more jump on. How many now?",  answer: "17", group: "Addition" },
    { id: "add_0_2",   question: "8 + ___ = 15. What is the missing number?",                     answer: "7",  group: "Addition" },
    { id: "add_0_3",   question: "5 + ___ = 13. What is the missing number?",                     answer: "8",  group: "Addition" },
    { id: "add_0_4",   question: "Jake has 6 stickers. His friend gives him 7 more. How many?",   answer: "13", group: "Addition" },
    { id: "add_0_5",   question: "9 + 9 = ?",                                                     answer: "18", group: "Addition" },
    { id: "add_0_6",   question: "There are 8 birds in a tree. 5 more land. How many birds?",     answer: "13", group: "Addition" },
    { id: "add_0_7",   question: "6 + ___ = 14. What is the missing number?",                     answer: "8",  group: "Addition" },
    { id: "add_0_8",   question: "7 + 8 = ?",                                                     answer: "15", group: "Addition" },
    { id: "add_0_9",   question: "There are 9 apples in a basket. 4 more are added. How many?",   answer: "13", group: "Addition" },
    { id: "add_1_0",   question: "9 + 7 = ?",                                                     answer: "16", group: "Addition" },
    { id: "add_1_1",   question: "8 + 8 = ?",                                                     answer: "16", group: "Addition" },
    { id: "add_1_2",   question: "___ + 6 = 20. What is the missing number?",                     answer: "14", group: "Addition" },
    { id: "add_1_3",   question: "Sam reads 8 pages Monday and 9 pages Tuesday. How many pages?", answer: "17", group: "Addition" },
    { id: "add_1_4",   question: "7 + 6 = ?",                                                     answer: "13", group: "Addition" },
    { id: "add_1_5",   question: "9 + 5 = ?",                                                     answer: "14", group: "Addition" },
    { id: "add_1_6",   question: "There are 6 red fish and 8 blue fish. How many fish in all?",   answer: "14", group: "Addition" },
    { id: "add_1_7",   question: "7 + ___ = 16. What is the missing number?",                     answer: "9",  group: "Addition" },
    { id: "add_1_8",   question: "8 + 7 = ?",                                                     answer: "15", group: "Addition" },
    { id: "add_1_9",   question: "Ana has 9 marbles. She finds 8 more. How many marbles?",        answer: "17", group: "Addition" },
    { id: "add_2_0",   question: "6 + 6 = ?",                                                     answer: "12", group: "Addition" },
    { id: "add_2_1",   question: "___ + 7 = 15. What is the missing number?",                     answer: "8",  group: "Addition" },
    { id: "add_2_2",   question: "9 + 6 = ?",                                                     answer: "15", group: "Addition" },
    { id: "add_2_3",   question: "There are 7 dogs and 9 cats at the shelter. How many animals?", answer: "16", group: "Addition" },
    { id: "add_2_4",   question: "8 + 6 = ?",                                                     answer: "14", group: "Addition" },
    { id: "add_2_5",   question: "5 + 9 = ?",                                                     answer: "14", group: "Addition" },
    { id: "add_2_6",   question: "Luis scores 8 points then 9 more. How many points total?",      answer: "17", group: "Addition" },
    { id: "add_2_7",   question: "7 + 7 = ?",                                                     answer: "14", group: "Addition" },
    { id: "add_2_8",   question: "6 + 9 = ?",                                                     answer: "15", group: "Addition" },
    { id: "add_2_9",   question: "9 + 8 = ?",                                                     answer: "17", group: "Addition" },
    { id: "add_3_0",   question: "There are 5 boys and 8 girls on the team. How many players?",   answer: "13", group: "Addition" },
    { id: "add_3_1",   question: "6 + 7 = ?",                                                     answer: "13", group: "Addition" },
    { id: "add_3_2",   question: "8 + 5 = ?",                                                     answer: "13", group: "Addition" },
    { id: "add_3_3",   question: "7 + 9 = ?",                                                     answer: "16", group: "Addition" },
    { id: "add_3_4",   question: "___ + 8 = 17. What is the missing number?",                     answer: "9",  group: "Addition" },
    { id: "add_3_5",   question: "9 + 4 = ?",                                                     answer: "13", group: "Addition" },
    { id: "add_3_6",   question: "8 + 9 = ?",                                                     answer: "17", group: "Addition" },
    { id: "add_3_7",   question: "There are 6 pigeons and 7 sparrows. How many birds total?",     answer: "13", group: "Addition" },
    { id: "add_3_8",   question: "9 + 9 + 2 = ?",                                                answer: "20", group: "Addition" },
    { id: "add_3_9",   question: "5 + 6 + 4 = ?",                                                answer: "15", group: "Addition" },
    { id: "add_4_0",   question: "7 + 5 + 3 = ?",                                                answer: "15", group: "Addition" },
    { id: "add_4_1",   question: "The store has 10 red balls and 8 blue balls. How many balls?",  answer: "18", group: "Addition" },
    { id: "add_4_2",   question: "6 + 8 = ?",                                                     answer: "14", group: "Addition" },
    { id: "add_4_3",   question: "9 + 3 = ?",                                                     answer: "12", group: "Addition" },
    { id: "add_4_4",   question: "7 + 4 + 5 = ?",                                                answer: "16", group: "Addition" },
    { id: "add_4_5",   question: "8 + 4 = ?",                                                     answer: "12", group: "Addition" },
    { id: "add_4_6",   question: "___ + 9 = 18. What is the missing number?",                     answer: "9",  group: "Addition" },
    { id: "add_4_7",   question: "6 + 5 = ?",                                                     answer: "11", group: "Addition" },
    { id: "add_4_8",   question: "8 + 3 = ?",                                                     answer: "11", group: "Addition" },
    { id: "add_4_9",   question: "9 + 2 = ?",                                                     answer: "11", group: "Addition" },
    { id: "add_5_0",   question: "7 + 3 = ?",                                                     answer: "10", group: "Addition" },
    { id: "add_5_1",   question: "6 + 4 = ?",                                                     answer: "10", group: "Addition" },
    { id: "add_5_2",   question: "5 + 8 = ?",                                                     answer: "13", group: "Addition" },
    { id: "add_5_3",   question: "4 + 9 = ?",                                                     answer: "13", group: "Addition" },
    { id: "add_5_4",   question: "3 + 8 = ?",                                                     answer: "11", group: "Addition" },
    { id: "add_5_5",   question: "6 + 3 = ?",                                                     answer: "9",  group: "Addition" },
    { id: "add_5_6",   question: "7 + 2 = ?",                                                     answer: "9",  group: "Addition" },
    { id: "add_5_7",   question: "5 + 7 = ?",                                                     answer: "12", group: "Addition" },
    { id: "add_5_8",   question: "4 + 8 = ?",                                                     answer: "12", group: "Addition" },
    { id: "add_5_9",   question: "3 + 9 = ?",                                                     answer: "12", group: "Addition" },
    { id: "add_6_0",   question: "6 + 2 = ?",                                                     answer: "8",  group: "Addition" },
    { id: "add_6_1",   question: "5 + 6 = ?",                                                     answer: "11", group: "Addition" },
    { id: "add_6_2",   question: "4 + 7 = ?",                                                     answer: "11", group: "Addition" },
    { id: "add_6_3",   question: "3 + 7 = ?",                                                     answer: "10", group: "Addition" },
    { id: "add_6_4",   question: "5 + 5 = ?",                                                     answer: "10", group: "Addition" },
    { id: "add_6_5",   question: "4 + 6 = ?",                                                     answer: "10", group: "Addition" },
    { id: "add_6_6",   question: "8 + 2 = ?",                                                     answer: "10", group: "Addition" },
    { id: "add_6_7",   question: "3 + 6 = ?",                                                     answer: "9",  group: "Addition" },
    { id: "add_6_8",   question: "4 + 5 = ?",                                                     answer: "9",  group: "Addition" },
    { id: "add_6_9",   question: "2 + 8 = ?",                                                     answer: "10", group: "Addition" },
    { id: "add_7_0",   question: "1 + 9 = ?",                                                     answer: "10", group: "Addition" },
    { id: "add_7_1",   question: "3 + 4 = ?",                                                     answer: "7",  group: "Addition" },
    { id: "add_7_2",   question: "2 + 6 = ?",                                                     answer: "8",  group: "Addition" },
    { id: "add_7_3",   question: "4 + 4 = ?",                                                     answer: "8",  group: "Addition" },
    { id: "add_7_4",   question: "5 + 3 = ?",                                                     answer: "8",  group: "Addition" },
    { id: "add_7_5",   question: "2 + 7 = ?",                                                     answer: "9",  group: "Addition" },
    { id: "add_7_6",   question: "3 + 5 = ?",                                                     answer: "8",  group: "Addition" },
    { id: "add_7_7",   question: "1 + 7 = ?",                                                     answer: "8",  group: "Addition" },
    { id: "add_7_8",   question: "2 + 5 = ?",                                                     answer: "7",  group: "Addition" },
    { id: "add_7_9",   question: "1 + 6 = ?",                                                     answer: "7",  group: "Addition" },
    { id: "add_8_0",   question: "3 + 3 = ?",                                                     answer: "6",  group: "Addition" },
    { id: "add_8_1",   question: "2 + 4 = ?",                                                     answer: "6",  group: "Addition" },
    { id: "add_8_2",   question: "1 + 5 = ?",                                                     answer: "6",  group: "Addition" },
    { id: "add_8_3",   question: "4 + 2 = ?",                                                     answer: "6",  group: "Addition" },
    { id: "add_8_4",   question: "2 + 3 = ?",                                                     answer: "5",  group: "Addition" },
    { id: "add_8_5",   question: "1 + 4 = ?",                                                     answer: "5",  group: "Addition" },
    { id: "add_8_6",   question: "3 + 2 = ?",                                                     answer: "5",  group: "Addition" },
    { id: "add_8_7",   question: "1 + 3 = ?",                                                     answer: "4",  group: "Addition" },
    { id: "add_8_8",   question: "2 + 2 = ?",                                                     answer: "4",  group: "Addition" },
    { id: "add_8_9",   question: "1 + 2 = ?",                                                     answer: "3",  group: "Addition" },
    { id: "add_9_0",   question: "0 + 5 = ?",                                                     answer: "5",  group: "Addition" },
    { id: "add_9_1",   question: "5 + 0 = ?",                                                     answer: "5",  group: "Addition" },
    { id: "add_9_2",   question: "0 + 9 = ?",                                                     answer: "9",  group: "Addition" },
    { id: "add_9_3",   question: "9 + 0 = ?",                                                     answer: "9",  group: "Addition" },
    { id: "add_9_4",   question: "2 + 9 = ?",                                                     answer: "11", group: "Addition" },
    { id: "add_9_5",   question: "1 + 8 = ?",                                                     answer: "9",  group: "Addition" },
    { id: "add_9_6",   question: "0 + 7 = ?",                                                     answer: "7",  group: "Addition" },
    { id: "add_9_7",   question: "1 + 1 = ?",                                                     answer: "2",  group: "Addition" },
    { id: "add_9_8",   question: "0 + 3 = ?",                                                     answer: "3",  group: "Addition" },
    { id: "add_9_9",   question: "0 + 0 = ?",                                                     answer: "0",  group: "Addition" },
    { id: "add_10_0",  question: "10 + 0 = ?",                                                    answer: "10", group: "Addition" },
  ];
  addItems.forEach(function (a) { items.push(a); });

  // Subtraction within 20 (word problems and unknown addends)
  var subItems = [
    { id: "sub_20_9",  question: "There were 20 cookies. The class ate 9. How many are left?",     answer: "11", group: "Subtraction" },
    { id: "sub_17_8",  question: "17 − 8 = ?",                                                     answer: "9",  group: "Subtraction" },
    { id: "sub_16_7",  question: "16 − 7 = ?",                                                     answer: "9",  group: "Subtraction" },
    { id: "sub_15_6",  question: "A jar had 15 candies. Kai ate 6. How many remain?",              answer: "9",  group: "Subtraction" },
    { id: "sub_18_9",  question: "18 − 9 = ?",                                                     answer: "9",  group: "Subtraction" },
    { id: "sub_14_8",  question: "14 − 8 = ?",                                                     answer: "6",  group: "Subtraction" },
    { id: "sub_13_7",  question: "There are 13 birds. 7 fly away. How many birds stay?",           answer: "6",  group: "Subtraction" },
    { id: "sub_16_9",  question: "16 − 9 = ?",                                                     answer: "7",  group: "Subtraction" },
    { id: "sub_15_8",  question: "15 − 8 = ?",                                                     answer: "7",  group: "Subtraction" },
    { id: "sub_13_6",  question: "13 − 6 = ?",                                                     answer: "7",  group: "Subtraction" },
    { id: "sub_12_5",  question: "Maya had 12 grapes. She ate 5. How many grapes are left?",       answer: "7",  group: "Subtraction" },
    { id: "sub_11_4",  question: "11 − 4 = ?",                                                     answer: "7",  group: "Subtraction" },
    { id: "sub_14_7",  question: "14 − 7 = ?",                                                     answer: "7",  group: "Subtraction" },
    { id: "sub_15_7",  question: "15 − 7 = ?",                                                     answer: "8",  group: "Subtraction" },
    { id: "sub_17_9",  question: "17 − 9 = ?",                                                     answer: "8",  group: "Subtraction" },
    { id: "sub_14_6",  question: "There were 14 fish. 6 swam away. How many are left?",           answer: "8",  group: "Subtraction" },
    { id: "sub_12_4",  question: "12 − 4 = ?",                                                     answer: "8",  group: "Subtraction" },
    { id: "sub_11_3",  question: "11 − 3 = ?",                                                     answer: "8",  group: "Subtraction" },
    { id: "sub_13_5",  question: "13 − 5 = ?",                                                     answer: "8",  group: "Subtraction" },
    { id: "sub_18_8",  question: "18 − 8 = ?",                                                     answer: "10", group: "Subtraction" },
    { id: "sub_10_0",  question: "10 − 0 = ?",                                                     answer: "10", group: "Subtraction" },
    { id: "sub_10_1",  question: "10 − 1 = ?",                                                     answer: "9",  group: "Subtraction" },
    { id: "sub_10_2",  question: "10 − 2 = ?",                                                     answer: "8",  group: "Subtraction" },
    { id: "sub_10_3",  question: "There are 10 pencils. 3 are broken. How many work?",             answer: "7",  group: "Subtraction" },
    { id: "sub_10_4",  question: "10 − 4 = ?",                                                     answer: "6",  group: "Subtraction" },
    { id: "sub_10_5",  question: "10 − 5 = ?",                                                     answer: "5",  group: "Subtraction" },
    { id: "sub_10_6",  question: "10 − 6 = ?",                                                     answer: "4",  group: "Subtraction" },
    { id: "sub_10_7",  question: "10 − 7 = ?",                                                     answer: "3",  group: "Subtraction" },
    { id: "sub_10_8",  question: "10 − 8 = ?",                                                     answer: "2",  group: "Subtraction" },
    { id: "sub_10_9",  question: "10 − 9 = ?",                                                     answer: "1",  group: "Subtraction" },
    { id: "sub_10_10", question: "10 − 10 = ?",                                                    answer: "0",  group: "Subtraction" },
    { id: "sub_9_0",   question: "9 − 0 = ?",                                                      answer: "9",  group: "Subtraction" },
    { id: "sub_9_1",   question: "9 − 1 = ?",                                                      answer: "8",  group: "Subtraction" },
    { id: "sub_9_2",   question: "9 − 2 = ?",                                                      answer: "7",  group: "Subtraction" },
    { id: "sub_9_3",   question: "9 − 3 = ?",                                                      answer: "6",  group: "Subtraction" },
    { id: "sub_9_4",   question: "9 − 4 = ?",                                                      answer: "5",  group: "Subtraction" },
    { id: "sub_9_5",   question: "9 − 5 = ?",                                                      answer: "4",  group: "Subtraction" },
    { id: "sub_9_6",   question: "9 − 6 = ?",                                                      answer: "3",  group: "Subtraction" },
    { id: "sub_9_7",   question: "9 − 7 = ?",                                                      answer: "2",  group: "Subtraction" },
    { id: "sub_9_8",   question: "9 − 8 = ?",                                                      answer: "1",  group: "Subtraction" },
    { id: "sub_9_9",   question: "9 − 9 = ?",                                                      answer: "0",  group: "Subtraction" },
    { id: "sub_8_0",   question: "8 − 0 = ?",                                                      answer: "8",  group: "Subtraction" },
    { id: "sub_8_1",   question: "8 − 1 = ?",                                                      answer: "7",  group: "Subtraction" },
    { id: "sub_8_2",   question: "8 − 2 = ?",                                                      answer: "6",  group: "Subtraction" },
    { id: "sub_8_3",   question: "8 − 3 = ?",                                                      answer: "5",  group: "Subtraction" },
    { id: "sub_8_4",   question: "8 − 4 = ?",                                                      answer: "4",  group: "Subtraction" },
    { id: "sub_8_5",   question: "8 − 5 = ?",                                                      answer: "3",  group: "Subtraction" },
    { id: "sub_8_6",   question: "8 − 6 = ?",                                                      answer: "2",  group: "Subtraction" },
    { id: "sub_8_7",   question: "8 − 7 = ?",                                                      answer: "1",  group: "Subtraction" },
    { id: "sub_8_8",   question: "8 − 8 = ?",                                                      answer: "0",  group: "Subtraction" },
    { id: "sub_7_0",   question: "7 − 0 = ?",                                                      answer: "7",  group: "Subtraction" },
    { id: "sub_7_1",   question: "7 − 1 = ?",                                                      answer: "6",  group: "Subtraction" },
    { id: "sub_7_2",   question: "7 − 2 = ?",                                                      answer: "5",  group: "Subtraction" },
    { id: "sub_7_3",   question: "7 − 3 = ?",                                                      answer: "4",  group: "Subtraction" },
    { id: "sub_7_4",   question: "7 − 4 = ?",                                                      answer: "3",  group: "Subtraction" },
    { id: "sub_7_5",   question: "7 − 5 = ?",                                                      answer: "2",  group: "Subtraction" },
    { id: "sub_7_6",   question: "7 − 6 = ?",                                                      answer: "1",  group: "Subtraction" },
    { id: "sub_7_7",   question: "7 − 7 = ?",                                                      answer: "0",  group: "Subtraction" },
    { id: "sub_6_0",   question: "6 − 0 = ?",                                                      answer: "6",  group: "Subtraction" },
    { id: "sub_6_1",   question: "6 − 1 = ?",                                                      answer: "5",  group: "Subtraction" },
    { id: "sub_6_2",   question: "6 − 2 = ?",                                                      answer: "4",  group: "Subtraction" },
    { id: "sub_6_3",   question: "6 − 3 = ?",                                                      answer: "3",  group: "Subtraction" },
    { id: "sub_6_4",   question: "6 − 4 = ?",                                                      answer: "2",  group: "Subtraction" },
    { id: "sub_6_5",   question: "6 − 5 = ?",                                                      answer: "1",  group: "Subtraction" },
    { id: "sub_6_6",   question: "6 − 6 = ?",                                                      answer: "0",  group: "Subtraction" },
    { id: "sub_5_0",   question: "5 − 0 = ?",                                                      answer: "5",  group: "Subtraction" },
    { id: "sub_5_1",   question: "5 − 1 = ?",                                                      answer: "4",  group: "Subtraction" },
    { id: "sub_5_2",   question: "5 − 2 = ?",                                                      answer: "3",  group: "Subtraction" },
    { id: "sub_5_3",   question: "5 − 3 = ?",                                                      answer: "2",  group: "Subtraction" },
    { id: "sub_5_4",   question: "5 − 4 = ?",                                                      answer: "1",  group: "Subtraction" },
    { id: "sub_5_5",   question: "5 − 5 = ?",                                                      answer: "0",  group: "Subtraction" },
    { id: "sub_4_0",   question: "4 − 0 = ?",                                                      answer: "4",  group: "Subtraction" },
    { id: "sub_4_1",   question: "4 − 1 = ?",                                                      answer: "3",  group: "Subtraction" },
    { id: "sub_4_2",   question: "4 − 2 = ?",                                                      answer: "2",  group: "Subtraction" },
    { id: "sub_4_3",   question: "4 − 3 = ?",                                                      answer: "1",  group: "Subtraction" },
    { id: "sub_4_4",   question: "4 − 4 = ?",                                                      answer: "0",  group: "Subtraction" },
    { id: "sub_3_0",   question: "3 − 0 = ?",                                                      answer: "3",  group: "Subtraction" },
    { id: "sub_3_1",   question: "3 − 1 = ?",                                                      answer: "2",  group: "Subtraction" },
    { id: "sub_3_2",   question: "3 − 2 = ?",                                                      answer: "1",  group: "Subtraction" },
    { id: "sub_3_3",   question: "3 − 3 = ?",                                                      answer: "0",  group: "Subtraction" },
    { id: "sub_2_0",   question: "2 − 0 = ?",                                                      answer: "2",  group: "Subtraction" },
    { id: "sub_2_1",   question: "2 − 1 = ?",                                                      answer: "1",  group: "Subtraction" },
    { id: "sub_2_2",   question: "2 − 2 = ?",                                                      answer: "0",  group: "Subtraction" },
    { id: "sub_1_0",   question: "1 − 0 = ?",                                                      answer: "1",  group: "Subtraction" },
    { id: "sub_1_1",   question: "1 − 1 = ?",                                                      answer: "0",  group: "Subtraction" },
    { id: "sub_0_0",   question: "0 − 0 = ?",                                                      answer: "0",  group: "Subtraction" },
    { id: "sub_11_5",  question: "There were 11 apples. 5 were eaten. How many remain?",           answer: "6",  group: "Subtraction" },
    { id: "sub_12_6",  question: "12 − 6 = ?",                                                     answer: "6",  group: "Subtraction" },
    { id: "sub_11_6",  question: "11 − 6 = ?",                                                     answer: "5",  group: "Subtraction" },
    { id: "sub_12_7",  question: "12 − 7 = ?",                                                     answer: "5",  group: "Subtraction" },
    { id: "sub_11_7",  question: "11 − 7 = ?",                                                     answer: "4",  group: "Subtraction" },
    { id: "sub_11_8",  question: "11 − 8 = ?",                                                     answer: "3",  group: "Subtraction" },
    { id: "sub_12_8",  question: "12 − 8 = ?",                                                     answer: "4",  group: "Subtraction" },
    { id: "sub_12_9",  question: "12 − 9 = ?",                                                     answer: "3",  group: "Subtraction" },
    { id: "sub_11_9",  question: "11 − 9 = ?",                                                     answer: "2",  group: "Subtraction" },
    { id: "sub_11_2",  question: "11 − 2 = ?",                                                     answer: "9",  group: "Subtraction" },
  ];
  subItems.forEach(function (s) { items.push(s); });

  // Shapes — include halves/quarters, name shapes
  const shapes = [
    { id: "shape_triangle",  question: "A shape with 3 sides and 3 corners is a ___.",             answer: "triangle",  group: "Shapes" },
    { id: "shape_square",    question: "A shape with 4 equal sides and 4 right angles is a ___.",  answer: "square",    group: "Shapes" },
    { id: "shape_rectangle", question: "A shape with 4 sides where opposite sides are equal is a ___.", answer: "rectangle", group: "Shapes" },
    { id: "shape_pentagon",  question: "How many sides does a pentagon have?",                      answer: "5",         group: "Shapes" },
    { id: "shape_hexagon",   question: "How many sides does a hexagon have?",                       answer: "6",         group: "Shapes" },
    { id: "shape_octagon",   question: "How many sides does an octagon have?",                      answer: "8",         group: "Shapes" },
    { id: "shape_circle",    question: "How many corners does a circle have?",                      answer: "0",         group: "Shapes" },
    { id: "shape_sides_tri", question: "A triangle is cut into 2 equal parts. Each part is one ___.", answer: "half",   group: "Shapes" },
    { id: "shape_sides_hex", question: "A circle cut into 4 equal parts — each piece is one ___.", answer: "quarter",   group: "Shapes" },
    { id: "shape_sides_sq",  question: "A square is folded to make 2 equal parts. Each part is ___.", answer: "1/2",   group: "Shapes" },
  ];
  shapes.forEach(function (s) { items.push(s); });

  // Counting sequences — extend to 120 and add place value
  const counting = [
    { id: "cnt2_6",   question: "Count by 2s: 2, 4, ___ ?",          answer: "6",   group: "Counting" },
    { id: "cnt2_8",   question: "Count by 2s: 4, 6, ___ ?",          answer: "8",   group: "Counting" },
    { id: "cnt2_10",  question: "Count by 2s: 6, 8, ___ ?",          answer: "10",  group: "Counting" },
    { id: "cnt2_12",  question: "Count by 2s: 8, 10, ___ ?",         answer: "12",  group: "Counting" },
    { id: "cnt5_15",  question: "Count by 5s: 5, 10, ___ ?",         answer: "15",  group: "Counting" },
    { id: "cnt5_20",  question: "Count by 5s: 10, 15, ___ ?",        answer: "20",  group: "Counting" },
    { id: "cnt5_25",  question: "Count by 5s: 15, 20, ___ ?",        answer: "25",  group: "Counting" },
    { id: "cnt10_30", question: "Count by 10s: 10, 20, ___ ?",       answer: "30",  group: "Counting" },
    { id: "cnt10_40", question: "Count by 10s: 20, 30, ___ ?",       answer: "40",  group: "Counting" },
    { id: "cnt10_50", question: "Count by 10s: 30, 40, ___ ?",       answer: "50",  group: "Counting" },
  ];
  counting.forEach(function (c) { items.push(c); });

  return items;
})();

/* ---- 1st Grade Reading (Phonics & Comprehension) ----------- */
const GRADE1_READING = [
  // Pre-Primer (40 items — phonics, blends, comprehension)
  { id: "sw_a",      question: "Which word has the short 'a' sound: 'cat' or 'cake'?",             answer: "cat",    group: "Pre-Primer" },
  { id: "sw_and",    question: "What blend makes the start of 'clap'?",                            answer: "cl",     group: "Pre-Primer" },
  { id: "sw_away",   question: "A story says a girl smiled when she got a present. She is probably ___.", answer: "happy", group: "Pre-Primer" },
  { id: "sw_big",    question: "Which word rhymes with 'cat': 'bat', 'cup', or 'dog'?",            answer: "bat",    group: "Pre-Primer" },
  { id: "sw_blue",   question: "What blend makes the start of 'stop'?",                            answer: "st",     group: "Pre-Primer" },
  { id: "sw_can",    question: "Which word has the short 'i' sound: 'pin' or 'pine'?",             answer: "pin",    group: "Pre-Primer" },
  { id: "sw_come",   question: "Which word rhymes with 'dog': 'log', 'dig', or 'dug'?",           answer: "log",    group: "Pre-Primer" },
  { id: "sw_down",   question: "What digraph makes the start of 'ship'?",                          answer: "sh",     group: "Pre-Primer" },
  { id: "sw_find",   question: "A boy keeps trying to ride his bike after falling. He shows ___.", answer: "persistence", group: "Pre-Primer" },
  { id: "sw_for",    question: "What digraph makes the start of 'chin'?",                          answer: "ch",     group: "Pre-Primer" },
  { id: "sw_funny",  question: "Which word rhymes with 'sun': 'run', 'sat', or 'hop'?",           answer: "run",    group: "Pre-Primer" },
  { id: "sw_go",     question: "What blend makes the start of 'frog'?",                            answer: "fr",     group: "Pre-Primer" },
  { id: "sw_help",   question: "Which word has the short 'o' sound: 'hop' or 'hope'?",            answer: "hop",    group: "Pre-Primer" },
  { id: "sw_here",   question: "What digraph makes the start of 'that'?",                         answer: "th",     group: "Pre-Primer" },
  { id: "sw_I",      question: "Which word rhymes with 'hen': 'ten', 'tan', or 'tin'?",           answer: "ten",    group: "Pre-Primer" },
  { id: "sw_in",     question: "What blend makes the start of 'drip'?",                           answer: "dr",     group: "Pre-Primer" },
  { id: "sw_is",     question: "Which word has the short 'u' sound: 'bug' or 'huge'?",            answer: "bug",    group: "Pre-Primer" },
  { id: "sw_it",     question: "Which word rhymes with 'big': 'pig', 'bag', or 'beg'?",           answer: "pig",    group: "Pre-Primer" },
  { id: "sw_jump",   question: "What blend makes the start of 'slip'?",                           answer: "sl",     group: "Pre-Primer" },
  { id: "sw_little", question: "A story says the dog wagged its tail. The dog is probably ___.",  answer: "happy",  group: "Pre-Primer" },
  { id: "sw_look",   question: "Which word has the short 'e' sound: 'bed' or 'bead'?",            answer: "bed",    group: "Pre-Primer" },
  { id: "sw_make",   question: "What blend makes the start of 'grab'?",                           answer: "gr",     group: "Pre-Primer" },
  { id: "sw_me",     question: "Which word rhymes with 'hop': 'top', 'tip', or 'tap'?",           answer: "top",    group: "Pre-Primer" },
  { id: "sw_my",     question: "What digraph makes the start of 'where'?",                        answer: "wh",     group: "Pre-Primer" },
  { id: "sw_not",    question: "Which word has the long 'a' sound (CVCe): 'cake' or 'cap'?",      answer: "cake",   group: "Pre-Primer" },
  { id: "sw_one",    question: "What blend makes the start of 'brake'?",                          answer: "br",     group: "Pre-Primer" },
  { id: "sw_play",   question: "Which word rhymes with 'cup': 'pup', 'cap', or 'cop'?",           answer: "pup",    group: "Pre-Primer" },
  { id: "sw_red",    question: "Which word has the long 'i' sound (CVCe): 'kite' or 'kit'?",     answer: "kite",   group: "Pre-Primer" },
  { id: "sw_run",    question: "What blend makes the start of 'spin'?",                           answer: "sp",     group: "Pre-Primer" },
  { id: "sw_said",   question: "Which word rhymes with 'lake': 'cake', 'kick', or 'look'?",      answer: "cake",   group: "Pre-Primer" },
  { id: "sw_see",    question: "What blend makes the start of 'trip'?",                           answer: "tr",     group: "Pre-Primer" },
  { id: "sw_the",    question: "Which word has the long 'o' sound (CVCe): 'note' or 'not'?",     answer: "note",   group: "Pre-Primer" },
  { id: "sw_three",  question: "What blend makes the start of 'plate'?",                         answer: "pl",     group: "Pre-Primer" },
  { id: "sw_to",     question: "Which word rhymes with 'tip': 'ship', 'shop', or 'shape'?",      answer: "ship",   group: "Pre-Primer" },
  { id: "sw_two",    question: "Which word has the long 'u' sound (CVCe): 'cube' or 'cub'?",     answer: "cube",   group: "Pre-Primer" },
  { id: "sw_up",     question: "What blend makes the start of 'class'?",                         answer: "cl",     group: "Pre-Primer" },
  { id: "sw_we",     question: "Which word rhymes with 'jet': 'net', 'not', or 'nut'?",          answer: "net",    group: "Pre-Primer" },
  { id: "sw_where",  question: "What blend makes the start of 'blend'?",                         answer: "bl",     group: "Pre-Primer" },
  { id: "sw_yellow", question: "Which word has the short 'a' sound: 'mat' or 'mate'?",           answer: "mat",    group: "Pre-Primer" },
  { id: "sw_you",    question: "A story says it is getting dark and stormy. The weather will probably ___.", answer: "rain", group: "Pre-Primer" },
  // Primer (40 items — decoding, comprehension, main idea)
  { id: "sw_all",    question: "What word do you get when you add 's' to the front of 'top'?",    answer: "stop",   group: "Primer" },
  { id: "sw_am",     question: "Which word has the short 'a': 'ran' or 'rain'?",                 answer: "ran",    group: "Primer" },
  { id: "sw_are",    question: "What digraph makes the sound in the middle of 'bath'?",           answer: "th",     group: "Primer" },
  { id: "sw_at",     question: "A story's main character learns to share. The main idea is ___.", answer: "sharing", group: "Primer" },
  { id: "sw_ate",    question: "What blend makes the start of 'crab'?",                          answer: "cr",     group: "Primer" },
  { id: "sw_be",     question: "Which word rhymes with 'light': 'night', 'not', or 'net'?",      answer: "night",  group: "Primer" },
  { id: "sw_black",  question: "What sound does the blend 'wh' make, as in 'wheel'?",            answer: "w",      group: "Primer" },
  { id: "sw_brown",  question: "Which word has two syllables: 'rabbit' or 'run'?",               answer: "rabbit", group: "Primer" },
  { id: "sw_but",    question: "What word do you get when you add 'fl' before 'at'?",            answer: "flat",   group: "Primer" },
  { id: "sw_came",   question: "A story says a dog sniffed around the yard. The dog is probably ___.", answer: "searching", group: "Primer" },
  { id: "sw_did",    question: "Which word has the long 'e' sound: 'feet' or 'fed'?",            answer: "feet",   group: "Primer" },
  { id: "sw_do",     question: "What blend makes the start of 'smile'?",                         answer: "sm",     group: "Primer" },
  { id: "sw_eat",    question: "Which word rhymes with 'moon': 'spoon', 'spin', or 'span'?",     answer: "spoon",  group: "Primer" },
  { id: "sw_four",   question: "What word do you get when you add 'pr' before 'int'?",           answer: "print",  group: "Primer" },
  { id: "sw_get",    question: "Which word has the short 'o': 'clock' or 'cloak'?",              answer: "clock",  group: "Primer" },
  { id: "sw_good",   question: "What blend makes the start of 'snack'?",                         answer: "sn",     group: "Primer" },
  { id: "sw_have",   question: "A boy feels his stomach growl and heads to the kitchen. He is probably ___.", answer: "hungry", group: "Primer" },
  { id: "sw_he",     question: "Which word has two syllables: 'pencil' or 'pen'?",               answer: "pencil", group: "Primer" },
  { id: "sw_into",   question: "What word do you get when you add 'cr' before 'ack'?",           answer: "crack",  group: "Primer" },
  { id: "sw_like",   question: "Which word rhymes with 'this': 'hiss', 'has', or 'his'?",       answer: "hiss",   group: "Primer" },
  { id: "sw_must",   question: "What blend makes the start of 'swing'?",                         answer: "sw",     group: "Primer" },
  { id: "sw_new",    question: "Which word has the long 'a' sound: 'rain' or 'ran'?",            answer: "rain",   group: "Primer" },
  { id: "sw_no",     question: "What digraph do 'phone' and 'photo' share at the start?",        answer: "ph",     group: "Primer" },
  { id: "sw_now",    question: "A story says a turtle walks very, very slowly. The turtle is ___.", answer: "slow", group: "Primer" },
  { id: "sw_on",     question: "Which word has the short 'u': 'truck' or 'true'?",              answer: "truck",  group: "Primer" },
  { id: "sw_our",    question: "What word do you get when you add 'str' before 'ong'?",          answer: "strong", group: "Primer" },
  { id: "sw_out",    question: "Which word has the long 'i' sound: 'shine' or 'shin'?",         answer: "shine",  group: "Primer" },
  { id: "sw_please", question: "What blend makes the start of 'skate'?",                        answer: "sk",     group: "Primer" },
  { id: "sw_pretty", question: "Which word has two syllables: 'basket' or 'bat'?",              answer: "basket", group: "Primer" },
  { id: "sw_ran",    question: "A cat hid under the bed when it heard thunder. The cat is probably ___.", answer: "scared", group: "Primer" },
  { id: "sw_ride",   question: "What word do you get when you add 'bl' before 'ock'?",          answer: "block",  group: "Primer" },
  { id: "sw_saw",    question: "Which word has the long 'o' sound: 'snow' or 'snob'?",          answer: "snow",   group: "Primer" },
  { id: "sw_say",    question: "What blend makes the start of 'think'? (two letters)",          answer: "th",     group: "Primer" },
  { id: "sw_she",    question: "Which word has two syllables: 'apple' or 'ape'?",               answer: "apple",  group: "Primer" },
  { id: "sw_so",     question: "What word do you get when you add 'sp' before 'ot'?",           answer: "spot",   group: "Primer" },
  { id: "sw_some",   question: "Which word has the long 'u' sound: 'tune' or 'tun'?",          answer: "tune",   group: "Primer" },
  { id: "sw_soon",   question: "A girl reads every night before bed. She probably likes ___.",  answer: "books",  group: "Primer" },
  { id: "sw_that",   question: "What blend makes the start of 'thick'? (two letters)",          answer: "th",     group: "Primer" },
  { id: "sw_there",  question: "Which word rhymes with 'bat': 'flat', 'fit', or 'fat'?",       answer: "flat",   group: "Primer" },
  { id: "sw_they",   question: "A story talks about why rain is important for plants. This text is mostly about ___.", answer: "rain and plants", group: "Primer" },
  { id: "sw_this",   question: "What word do you get when you add 'sc' before 'are'?",          answer: "scare",  group: "Primer" },
  { id: "sw_too",    question: "Which word has two syllables: 'muffin' or 'mud'?",             answer: "muffin", group: "Primer" },
  { id: "sw_under",  question: "What blend makes the start of 'tree'?",                        answer: "tr",     group: "Primer" },
  { id: "sw_want",   question: "Which word rhymes with 'ship': 'chip', 'chop', or 'chap'?",   answer: "chip",   group: "Primer" },
  { id: "sw_was",    question: "A bird builds a nest and lays eggs. What will likely happen next?", answer: "eggs will hatch", group: "Primer" },
  { id: "sw_well",   question: "What word do you get when you add 'br' before 'ing'?",         answer: "bring",  group: "Primer" },
  { id: "sw_went",   question: "Which word has the long 'e' sound: 'bead' or 'bed'?",          answer: "bead",   group: "Primer" },
  { id: "sw_what",   question: "What blend makes the start of 'flock'?",                       answer: "fl",     group: "Primer" },
  { id: "sw_white",  question: "Which word rhymes with 'make': 'lake', 'lick', or 'lock'?",   answer: "lake",   group: "Primer" },
  { id: "sw_who",    question: "A story says a girl shivered and pulled her coat tight. The weather is ___.", answer: "cold", group: "Primer" },
  { id: "sw_will",   question: "What word do you get when you add 'th' before 'ink'?",         answer: "think",  group: "Primer" },
  { id: "sw_with",   question: "Which word has two syllables: 'kitten' or 'kit'?",             answer: "kitten", group: "Primer" },
  { id: "sw_yes",    question: "What blend makes the start of 'scrap'?",                       answer: "scr",    group: "Primer" },
  // Grade 1 Words (41 items — phonics patterns, main idea, inference)
  { id: "sw_after",  question: "Which word has the long 'a' pattern (ai): 'trail' or 'trap'?",  answer: "trail",  group: "Grade 1 Words" },
  { id: "sw_again",  question: "What word do you get when you add 'spl' before 'ash'?",         answer: "splash", group: "Grade 1 Words" },
  { id: "sw_an",     question: "Which word rhymes with 'bring': 'ring', 'rung', or 'rang'?",    answer: "ring",   group: "Grade 1 Words" },
  { id: "sw_any",    question: "A story says a boy woke up early and ran to the window to look outside. He is probably ___.", answer: "excited", group: "Grade 1 Words" },
  { id: "sw_as",     question: "Which word has two syllables: 'garden' or 'green'?",            answer: "garden", group: "Grade 1 Words" },
  { id: "sw_ask",    question: "What blend makes the start of 'straw'?",                        answer: "str",    group: "Grade 1 Words" },
  { id: "sw_by",     question: "Which word has the long 'o' pattern (oa): 'coat' or 'cot'?",   answer: "coat",   group: "Grade 1 Words" },
  { id: "sw_could",  question: "A passage explains how seeds grow into plants. The main idea is ___.", answer: "how plants grow", group: "Grade 1 Words" },
  { id: "sw_every",  question: "What word do you get when you add 'tw' before 'ist'?",          answer: "twist",  group: "Grade 1 Words" },
  { id: "sw_fly",    question: "Which word rhymes with 'fight': 'tight', 'tug', or 'tack'?",    answer: "tight",  group: "Grade 1 Words" },
  { id: "sw_from",   question: "Which word has the long 'i' pattern (igh): 'night' or 'nit'?", answer: "night",  group: "Grade 1 Words" },
  { id: "sw_give",   question: "A story says the puppy jumped up and licked the boy's face. The puppy is probably ___.", answer: "happy", group: "Grade 1 Words" },
  { id: "sw_going",  question: "What blend makes the start of 'shrink'?",                       answer: "shr",    group: "Grade 1 Words" },
  { id: "sw_had",    question: "Which word has two syllables: 'winter' or 'wind'?",             answer: "winter", group: "Grade 1 Words" },
  { id: "sw_has",    question: "Which word has the long 'e' pattern (ee): 'sleep' or 'slept'?", answer: "sleep",  group: "Grade 1 Words" },
  { id: "sw_her",    question: "What word do you get when you add 'th' before 'rown'?",         answer: "thrown", group: "Grade 1 Words" },
  { id: "sw_him",    question: "Which word rhymes with 'sound': 'found', 'fond', or 'fund'?",  answer: "found",  group: "Grade 1 Words" },
  { id: "sw_his",    question: "A story says clouds gathered and the sky turned dark. What will probably happen next?", answer: "it will rain", group: "Grade 1 Words" },
  { id: "sw_how",    question: "Which word has two syllables: 'flower' or 'flour'?",            answer: "flower", group: "Grade 1 Words" },
  { id: "sw_just",   question: "Which word has the long 'u' pattern (ue): 'glue' or 'glug'?",  answer: "glue",   group: "Grade 1 Words" },
  { id: "sw_know",   question: "What blend makes the start of 'thrill'?",                       answer: "thr",    group: "Grade 1 Words" },
  { id: "sw_let",    question: "Which word rhymes with 'strong': 'long', 'lung', or 'linger'?", answer: "long",  group: "Grade 1 Words" },
  { id: "sw_live",   question: "A story says a fox crept slowly through the tall grass. The fox is probably ___.", answer: "hunting", group: "Grade 1 Words" },
  { id: "sw_may",    question: "Which word has two syllables: 'thunder' or 'thin'?",            answer: "thunder", group: "Grade 1 Words" },
  { id: "sw_of",     question: "What word do you get when you add 'cl' before 'oud'?",          answer: "cloud",  group: "Grade 1 Words" },
  { id: "sw_old",    question: "Which word has the long 'a' pattern (ay): 'play' or 'plan'?",  answer: "play",   group: "Grade 1 Words" },
  { id: "sw_once",   question: "A story says Mia worked on her art project every day for a week. What does Mia probably value?", answer: "hard work", group: "Grade 1 Words" },
  { id: "sw_open",   question: "What blend makes the start of 'spring'?",                       answer: "spr",    group: "Grade 1 Words" },
  { id: "sw_over",   question: "Which word rhymes with 'chair': 'share', 'shop', or 'ship'?",  answer: "share",  group: "Grade 1 Words" },
  { id: "sw_put",    question: "Which word has two syllables: 'butter' or 'but'?",              answer: "butter", group: "Grade 1 Words" },
  { id: "sw_round",  question: "A book is mostly about dogs that help blind people. The main idea is ___.", answer: "guide dogs", group: "Grade 1 Words" },
  { id: "sw_stop",   question: "What word do you get when you add 'sk' before 'ip'?",           answer: "skip",   group: "Grade 1 Words" },
  { id: "sw_take",   question: "Which word has the long 'o' pattern (ow): 'glow' or 'gloss'?", answer: "glow",   group: "Grade 1 Words" },
  { id: "sw_thank",  question: "Which word rhymes with 'cake': 'shake', 'shack', or 'shock'?", answer: "shake",  group: "Grade 1 Words" },
  { id: "sw_them",   question: "A story says a boy gave his sandwich to a friend who forgot their lunch. What does this show?", answer: "kindness", group: "Grade 1 Words" },
  { id: "sw_then",   question: "Which word has two syllables: 'spider' or 'spin'?",             answer: "spider", group: "Grade 1 Words" },
  { id: "sw_think",  question: "What blend makes the start of 'split'?",                        answer: "spl",    group: "Grade 1 Words" },
  { id: "sw_walk",   question: "Which word has the long 'e' pattern (ea): 'read' or 'red'?",   answer: "read",   group: "Grade 1 Words" },
  { id: "sw_were",   question: "Which word rhymes with 'street': 'sleet', 'slot', or 'slat'?", answer: "sleet",  group: "Grade 1 Words" },
  { id: "sw_when",   question: "A story says a girl held her nose as she walked past the garbage. The garbage probably ___.", answer: "smelled bad", group: "Grade 1 Words" },
];

/* ---- Kindergarten Math ------------------------------------- */
const KINDER_MATH = (function () {
  const items = [];

  // Number words (numeral ↔ word)
  const numWords = [
    "zero","one","two","three","four","five","six","seven","eight","nine","ten",
    "eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty"
  ];
  numWords.forEach(function (word, n) {
    items.push({ id: "nw_" + n, question: "What number is '" + word + "'?", answer: String(n), group: "Number Words" });
  });

  // Count on / count before (1-20)
  for (var n = 1; n <= 19; n++) {
    items.push({ id: "after_" + n, question: "What number comes after " + n + "?", answer: String(n + 1), group: "Count On" });
  }
  for (var n = 2; n <= 20; n++) {
    items.push({ id: "before_" + n, question: "What number comes before " + n + "?", answer: String(n - 1), group: "Count Before" });
  }

  // Adding to 5 — word problems
  var addTo5 = [
    { id: "kadd_0_0", question: "There are 0 frogs on a log. 0 more hop on. How many frogs?",  answer: "0",  group: "Adding to 5" },
    { id: "kadd_0_1", question: "There are 0 birds in a tree. 1 lands. How many birds?",       answer: "1",  group: "Adding to 5" },
    { id: "kadd_0_2", question: "There are 0 cats. 2 more come. How many cats?",               answer: "2",  group: "Adding to 5" },
    { id: "kadd_0_3", question: "There are 0 apples. 3 are put in a bowl. How many apples?",  answer: "3",  group: "Adding to 5" },
    { id: "kadd_0_4", question: "There are 0 dogs. 4 run into the yard. How many dogs?",      answer: "4",  group: "Adding to 5" },
    { id: "kadd_0_5", question: "There are 0 fish. 5 swim in. How many fish?",                answer: "5",  group: "Adding to 5" },
    { id: "kadd_1_0", question: "There is 1 bee on a flower. 0 more land. How many bees?",    answer: "1",  group: "Adding to 5" },
    { id: "kadd_1_1", question: "There is 1 duck and 1 more joins. How many ducks?",          answer: "2",  group: "Adding to 5" },
    { id: "kadd_1_2", question: "There is 1 cookie. Mom bakes 2 more. How many cookies?",     answer: "3",  group: "Adding to 5" },
    { id: "kadd_1_3", question: "There is 1 bird. 3 more fly in. How many birds?",            answer: "4",  group: "Adding to 5" },
    { id: "kadd_1_4", question: "There is 1 puppy. 4 more arrive. How many puppies?",         answer: "5",  group: "Adding to 5" },
    { id: "kadd_2_0", question: "There are 2 chickens. 0 more come. How many chickens?",      answer: "2",  group: "Adding to 5" },
    { id: "kadd_2_1", question: "There are 2 ants. 1 more comes. How many ants?",             answer: "3",  group: "Adding to 5" },
    { id: "kadd_2_2", question: "There are 2 balloons. 2 more are given. How many balloons?", answer: "4",  group: "Adding to 5" },
    { id: "kadd_2_3", question: "There are 2 horses. 3 more trot over. How many horses?",    answer: "5",  group: "Adding to 5" },
    { id: "kadd_3_0", question: "There are 3 flowers. 0 more are planted. How many flowers?", answer: "3",  group: "Adding to 5" },
    { id: "kadd_3_1", question: "There are 3 frogs. 1 more hops in. How many frogs?",        answer: "4",  group: "Adding to 5" },
    { id: "kadd_3_2", question: "There are 3 stars and 2 more appear. How many stars?",      answer: "5",  group: "Adding to 5" },
    { id: "kadd_4_0", question: "There are 4 crayons. 0 more are added. How many crayons?",  answer: "4",  group: "Adding to 5" },
    { id: "kadd_4_1", question: "There are 4 oranges. 1 more is placed. How many oranges?",  answer: "5",  group: "Adding to 5" },
    { id: "kadd_5_0", question: "There are 5 seeds. 0 more are planted. How many seeds?",    answer: "5",  group: "Adding to 5" },
  ];
  addTo5.forEach(function (a) { items.push(a); });

  // Comparing — use story context
  var comparing = [
    { id: "gt_1_3",   question: "Sara has 1 sticker. Tom has 3. Who has more?",              answer: "Tom",  group: "Comparing" },
    { id: "lt_1_3",   question: "Sara has 1 sticker. Tom has 3. Who has fewer?",             answer: "Sara", group: "Comparing" },
    { id: "gt_2_5",   question: "Mia has 2 apples. Jake has 5. Who has more?",               answer: "Jake", group: "Comparing" },
    { id: "lt_2_5",   question: "Mia has 2 apples. Jake has 5. Who has fewer?",              answer: "Mia",  group: "Comparing" },
    { id: "gt_3_7",   question: "Which is greater: 3 or 7?",                                 answer: "7",    group: "Comparing" },
    { id: "lt_3_7",   question: "Which is less: 3 or 7?",                                    answer: "3",    group: "Comparing" },
    { id: "gt_4_8",   question: "A bag has 4 marbles. Another has 8. Which bag has more?",   answer: "8",    group: "Comparing" },
    { id: "lt_4_8",   question: "A bag has 4 marbles. Another has 8. Which bag has fewer?",  answer: "4",    group: "Comparing" },
    { id: "gt_1_9",   question: "Which is greater: 1 or 9?",                                 answer: "9",    group: "Comparing" },
    { id: "lt_1_9",   question: "Which is less: 1 or 9?",                                    answer: "1",    group: "Comparing" },
    { id: "gt_5_6",   question: "There are 5 boys and 6 girls. Are there more boys or girls?", answer: "girls", group: "Comparing" },
    { id: "lt_5_6",   question: "There are 5 boys and 6 girls. Are there fewer boys or girls?", answer: "boys", group: "Comparing" },
    { id: "gt_2_8",   question: "Which is greater: 2 or 8?",                                 answer: "8",    group: "Comparing" },
    { id: "lt_2_8",   question: "Which is less: 2 or 8?",                                    answer: "2",    group: "Comparing" },
    { id: "gt_6_9",   question: "Which is greater: 6 or 9?",                                 answer: "9",    group: "Comparing" },
    { id: "lt_6_9",   question: "Which is less: 6 or 9?",                                    answer: "6",    group: "Comparing" },
    { id: "gt_3_4",   question: "Which is greater: 3 or 4?",                                 answer: "4",    group: "Comparing" },
    { id: "lt_3_4",   question: "Which is less: 3 or 4?",                                    answer: "3",    group: "Comparing" },
    { id: "gt_7_10",  question: "There are 7 cats and 10 dogs. Which group has more?",       answer: "10",   group: "Comparing" },
    { id: "lt_7_10",  question: "There are 7 cats and 10 dogs. Which group has fewer?",      answer: "7",    group: "Comparing" },
    { id: "gt_1_10",  question: "Which is greater: 1 or 10?",                                answer: "10",   group: "Comparing" },
    { id: "lt_1_10",  question: "Which is less: 1 or 10?",                                   answer: "1",    group: "Comparing" },
    { id: "gt_4_6",   question: "Which is greater: 4 or 6?",                                 answer: "6",    group: "Comparing" },
    { id: "lt_4_6",   question: "Which is less: 4 or 6?",                                    answer: "4",    group: "Comparing" },
    { id: "gt_2_9",   question: "Which is greater: 2 or 9?",                                 answer: "9",    group: "Comparing" },
    { id: "lt_2_9",   question: "Which is less: 2 or 9?",                                    answer: "2",    group: "Comparing" },
    { id: "gt_5_8",   question: "Which is greater: 5 or 8?",                                 answer: "8",    group: "Comparing" },
    { id: "lt_5_8",   question: "Which is less: 5 or 8?",                                    answer: "5",    group: "Comparing" },
  ];
  comparing.forEach(function (c) { items.push(c); });

  // Shapes — 2D and 3D
  const shapes = [
    { id: "ks_circle",    question: "I have no corners and no straight sides. I am a ___.",         answer: "circle",           group: "Shapes" },
    { id: "ks_triangle",  question: "I have 3 sides and 3 corners. I am a ___.",                    answer: "triangle",         group: "Shapes" },
    { id: "ks_square",    question: "I have 4 equal sides and 4 corners. I am a ___.",              answer: "square",           group: "Shapes" },
    { id: "ks_rectangle", question: "I have 4 sides. Two are longer than the other two. I am a ___.", answer: "rectangle",     group: "Shapes" },
    { id: "ks_oval",      question: "I look like a stretched circle. I am an ___.",                 answer: "oval",             group: "Shapes" },
    { id: "ks_diamond",   question: "I have 4 equal sides and look like a tilted square. I am a ___.", answer: "diamond",      group: "Shapes" },
    { id: "ks_sides_tri", question: "I have 6 flat faces that are all rectangles. I am a ___.",    answer: "rectangular prism", group: "Shapes" },
    { id: "ks_sides_sq",  question: "I have 6 equal flat faces. I look like a box with equal sides. I am a ___.", answer: "cube", group: "Shapes" },
    { id: "ks_corn_sq",   question: "I have 1 flat circle and 1 point at the top. I am a ___.",    answer: "cone",             group: "Shapes" },
    { id: "ks_corn_tri",  question: "I have no flat faces and no corners — I can roll. I am a ___.", answer: "sphere",         group: "Shapes" },
  ];
  shapes.forEach(function (s) { items.push(s); });

  return items;
})();

/* ---- Kindergarten Reading (Alphabet, Sounds & Rhyming) ----- */
const KINDER_READING = (function () {
  const items = [];

  // Beginning sounds — 26 letters, each with a key word
  const letterWords = [
    ["A","Apple"],["B","Ball"],["C","Cat"],["D","Dog"],["E","Egg"],
    ["F","Fish"],["G","Goat"],["H","Hat"],["I","Igloo"],["J","Jar"],
    ["K","Kite"],["L","Lion"],["M","Moon"],["N","Nest"],["O","Octopus"],
    ["P","Pig"],["Q","Queen"],["R","Rain"],["S","Sun"],["T","Tree"],
    ["U","Umbrella"],["V","Van"],["W","Worm"],["X","X-ray"],["Y","Yarn"],["Z","Zebra"]
  ];
  letterWords.forEach(function (pair) {
    var letter = pair[0], word = pair[1];
    items.push({
      id: "sound_" + letter,
      question: word + " starts with the letter ___.",
      answer: letter,
      group: "Beginning Sounds"
    });
    items.push({
      id: "word_" + letter,
      question: "Which letter does '" + word.toLowerCase() + "' start with?",
      answer: letter,
      group: "Beginning Sounds"
    });
  });

  // Letter Names — uppercase to lowercase matching
  var lower = "abcdefghijklmnopqrstuvwxyz".split("");
  lower.forEach(function (lc) {
    var uc = lc.toUpperCase();
    items.push({
      id: "case_" + lc,
      question: "The lowercase letter for " + uc + " is ___.",
      answer: lc,
      group: "Letter Names"
    });
  });

  // Short vowel sounds — CVC word completion and identification
  var vowels = [
    { id: "vow_a",  question: "c_t (short a) — what is the word?",            answer: "cat",  group: "Vowel Sounds" },
    { id: "vow_e",  question: "b_d (short e) — what is the word?",            answer: "bed",  group: "Vowel Sounds" },
    { id: "vow_i",  question: "p_g (short i) — what is the word?",            answer: "pig",  group: "Vowel Sounds" },
    { id: "vow_o",  question: "d_g (short o) — what is the word?",            answer: "dog",  group: "Vowel Sounds" },
    { id: "vow_u",  question: "b_s (short u) — what is the word?",            answer: "bus",  group: "Vowel Sounds" },
    { id: "vow_a2", question: "'Map' has which short vowel sound?",            answer: "a",    group: "Vowel Sounds" },
    { id: "vow_e2", question: "'Hen' has which short vowel sound?",            answer: "e",    group: "Vowel Sounds" },
    { id: "vow_i2", question: "'Tip' has which short vowel sound?",            answer: "i",    group: "Vowel Sounds" },
    { id: "vow_o2", question: "'Hop' has which short vowel sound?",            answer: "o",    group: "Vowel Sounds" },
    { id: "vow_u2", question: "'Bug' has which short vowel sound?",            answer: "u",    group: "Vowel Sounds" },
  ];
  vowels.forEach(function (v) { items.push(v); });

  // Rhyming — replace some Letter Names items with rhyming questions
  var rhyming = [
    { id: "rhyme_cat",  question: "Which word rhymes with 'cat': 'bat' or 'cup'?",      answer: "bat",  group: "Rhyming" },
    { id: "rhyme_hop",  question: "Which word rhymes with 'hop': 'top' or 'tip'?",      answer: "top",  group: "Rhyming" },
    { id: "rhyme_sun",  question: "Which word rhymes with 'sun': 'run' or 'sit'?",      answer: "run",  group: "Rhyming" },
    { id: "rhyme_big",  question: "Which word rhymes with 'big': 'pig' or 'bug'?",      answer: "pig",  group: "Rhyming" },
    { id: "rhyme_hen",  question: "Which word rhymes with 'hen': 'ten' or 'tan'?",      answer: "ten",  group: "Rhyming" },
    { id: "rhyme_log",  question: "Which word rhymes with 'log': 'dog' or 'dig'?",      answer: "dog",  group: "Rhyming" },
    { id: "rhyme_map",  question: "Which word rhymes with 'map': 'cap' or 'cup'?",      answer: "cap",  group: "Rhyming" },
    { id: "rhyme_sit",  question: "Which word rhymes with 'sit': 'hit' or 'hot'?",      answer: "hit",  group: "Rhyming" },
    { id: "rhyme_jet",  question: "Which word rhymes with 'jet': 'net' or 'nut'?",      answer: "net",  group: "Rhyming" },
    { id: "rhyme_cup",  question: "Which word rhymes with 'cup': 'pup' or 'cap'?",      answer: "pup",  group: "Rhyming" },
    { id: "rhyme_fin",  question: "Which word rhymes with 'fin': 'pin' or 'pan'?",      answer: "pin",  group: "Rhyming" },
    { id: "rhyme_bed",  question: "Which word rhymes with 'bed': 'red' or 'rod'?",      answer: "red",  group: "Rhyming" },
    { id: "rhyme_rug",  question: "Which word rhymes with 'rug': 'bug' or 'bag'?",      answer: "bug",  group: "Rhyming" },
    { id: "rhyme_pot",  question: "Which word rhymes with 'pot': 'hot' or 'hat'?",      answer: "hot",  group: "Rhyming" },
    { id: "rhyme_lip",  question: "Which word rhymes with 'lip': 'tip' or 'top'?",      answer: "tip",  group: "Rhyming" },
  ];
  rhyming.forEach(function (r) { items.push(r); });

  return items;
})();

/* ---- 2nd Grade Math ---------------------------------------- */
const GRADE2_MATH = [
  // Place Value (15 items)
  { id: "g2m_pv01", question: "What is the tens digit in 374?",                                    answer: "7",        group: "Place Value" },
  { id: "g2m_pv02", question: "What is the hundreds digit in 528?",                                answer: "5",        group: "Place Value" },
  { id: "g2m_pv03", question: "What is the ones digit in 649?",                                    answer: "9",        group: "Place Value" },
  { id: "g2m_pv04", question: "What is the value of the 5 in 253?",                               answer: "50",       group: "Place Value" },
  { id: "g2m_pv05", question: "What is the value of the 3 in 374?",                               answer: "300",      group: "Place Value" },
  { id: "g2m_pv06", question: "What is the value of the 6 in 162?",                               answer: "60",       group: "Place Value" },
  { id: "g2m_pv07", question: "In 847, what place is the 8 in?",                                  answer: "hundreds", group: "Place Value" },
  { id: "g2m_pv08", question: "In 315, what place is the 1 in?",                                  answer: "tens",     group: "Place Value" },
  { id: "g2m_pv09", question: "In 293, what place is the 3 in?",                                  answer: "ones",     group: "Place Value" },
  { id: "g2m_pv10", question: "Which digit is in the tens place: 461?",                           answer: "6",        group: "Place Value" },
  { id: "g2m_pv11", question: "Which digit is in the hundreds place: 729?",                       answer: "7",        group: "Place Value" },
  { id: "g2m_pv12", question: "What is the value of the 4 in 408?",                               answer: "400",      group: "Place Value" },
  { id: "g2m_pv13", question: "What is the value of the 9 in 193?",                               answer: "9",        group: "Place Value" },
  { id: "g2m_pv14", question: "In 560, how many tens are there in all?",                          answer: "56",       group: "Place Value" },
  { id: "g2m_pv15", question: "What number has 3 hundreds, 2 tens, and 5 ones?",                  answer: "325",      group: "Place Value" },
  // Even & Odd (10 items)
  { id: "g2m_eo01", question: "Is 14 even or odd?",   answer: "even", group: "Even & Odd" },
  { id: "g2m_eo02", question: "Is 37 even or odd?",   answer: "odd",  group: "Even & Odd" },
  { id: "g2m_eo03", question: "Is 0 even or odd?",    answer: "even", group: "Even & Odd" },
  { id: "g2m_eo04", question: "Is 25 even or odd?",   answer: "odd",  group: "Even & Odd" },
  { id: "g2m_eo05", question: "Is 18 even or odd?",   answer: "even", group: "Even & Odd" },
  { id: "g2m_eo06", question: "Is 7 even or odd?",    answer: "odd",  group: "Even & Odd" },
  { id: "g2m_eo07", question: "Is 30 even or odd?",   answer: "even", group: "Even & Odd" },
  { id: "g2m_eo08", question: "Is 11 even or odd?",   answer: "odd",  group: "Even & Odd" },
  { id: "g2m_eo09", question: "Is 22 even or odd?",   answer: "even", group: "Even & Odd" },
  { id: "g2m_eo10", question: "Is 9 even or odd?",    answer: "odd",  group: "Even & Odd" },
  // Addition — 3-digit numbers and word problems (15 items)
  { id: "g2m_ad01", question: "234 + 145 = ?",                                                    answer: "379",  group: "Addition" },
  { id: "g2m_ad02", question: "417 + 362 = ?",                                                    answer: "779",  group: "Addition" },
  { id: "g2m_ad03", question: "A school has 356 boys and 218 girls. How many students in all?",   answer: "574",  group: "Addition" },
  { id: "g2m_ad04", question: "347 + 275 = ?",                                                    answer: "622",  group: "Addition" },
  { id: "g2m_ad05", question: "614 + 289 = ?",                                                    answer: "903",  group: "Addition" },
  { id: "g2m_ad06", question: "153 + 487 = ?",                                                    answer: "640",  group: "Addition" },
  { id: "g2m_ad07", question: "A library has 428 fiction books and 380 nonfiction books. How many total?", answer: "808", group: "Addition" },
  { id: "g2m_ad08", question: "735 + 142 = ?",                                                    answer: "877",  group: "Addition" },
  { id: "g2m_ad09", question: "286 + 553 = ?",                                                    answer: "839",  group: "Addition" },
  { id: "g2m_ad10", question: "197 + 673 = ?",                                                    answer: "870",  group: "Addition" },
  { id: "g2m_ad11", question: "530 + 70 = ?",                                                     answer: "600",  group: "Addition" },
  { id: "g2m_ad12", question: "368 + 9 = ?",                                                      answer: "377",  group: "Addition" },
  { id: "g2m_ad13", question: "Tom collects 248 cans. Maria collects 316 cans. How many in all?", answer: "564",  group: "Addition" },
  { id: "g2m_ad14", question: "250 + 750 = ?",                                                    answer: "1000", group: "Addition" },
  { id: "g2m_ad15", question: "672 + 8 = ?",                                                      answer: "680",  group: "Addition" },
  // Subtraction — 3-digit numbers and word problems (15 items)
  { id: "g2m_sb01", question: "724 − 351 = ?",                                                    answer: "373",  group: "Subtraction" },
  { id: "g2m_sb02", question: "856 − 423 = ?",                                                    answer: "433",  group: "Subtraction" },
  { id: "g2m_sb03", question: "A farmer had 600 eggs. He sold 273. How many eggs are left?",      answer: "327",  group: "Subtraction" },
  { id: "g2m_sb04", question: "912 − 567 = ?",                                                    answer: "345",  group: "Subtraction" },
  { id: "g2m_sb05", question: "1000 − 387 = ?",                                                   answer: "613",  group: "Subtraction" },
  { id: "g2m_sb06", question: "543 − 198 = ?",                                                    answer: "345",  group: "Subtraction" },
  { id: "g2m_sb07", question: "789 − 304 = ?",                                                    answer: "485",  group: "Subtraction" },
  { id: "g2m_sb08", question: "432 − 178 = ?",                                                    answer: "254",  group: "Subtraction" },
  { id: "g2m_sb09", question: "A store has 963 apples. 487 are sold. How many apples remain?",    answer: "476",  group: "Subtraction" },
  { id: "g2m_sb10", question: "675 − 253 = ?",                                                    answer: "422",  group: "Subtraction" },
  { id: "g2m_sb11", question: "500 − 136 = ?",                                                    answer: "364",  group: "Subtraction" },
  { id: "g2m_sb12", question: "823 − 9 = ?",                                                      answer: "814",  group: "Subtraction" },
  { id: "g2m_sb13", question: "740 − 465 = ?",                                                    answer: "275",  group: "Subtraction" },
  { id: "g2m_sb14", question: "334 − 168 = ?",                                                    answer: "166",  group: "Subtraction" },
  { id: "g2m_sb15", question: "900 − 454 = ?",                                                    answer: "446",  group: "Subtraction" },
  // Time — 5-minute increments and elapsed time (10 items)
  { id: "g2m_tm01", question: "How many minutes in half an hour?",                                answer: "30",   group: "Time" },
  { id: "g2m_tm02", question: "The clock shows 3:15. What time is it?",                           answer: "3:15", group: "Time" },
  { id: "g2m_tm03", question: "School starts at 8:00 and lunch is 3 hours later. What time is lunch?", answer: "11:00", group: "Time" },
  { id: "g2m_tm04", question: "How many minutes in an hour?",                                     answer: "60",   group: "Time" },
  { id: "g2m_tm05", question: "Class ends at 2:30. It started 45 minutes ago. What time did it start?", answer: "1:45", group: "Time" },
  { id: "g2m_tm06", question: "How many days in a week?",                                         answer: "7",    group: "Time" },
  { id: "g2m_tm07", question: "How many months in a year?",                                       answer: "12",   group: "Time" },
  { id: "g2m_tm08", question: "If it is 2:00 now, what time is it in 35 minutes?",               answer: "2:35", group: "Time" },
  { id: "g2m_tm09", question: "A movie starts at 4:05 and ends at 5:50. How long is the movie?", answer: "1 hr 45 min", group: "Time" },
  { id: "g2m_tm10", question: "The clock shows 7:45. What time is it in 15 minutes?",             answer: "8:00", group: "Time" },
  // Money — making change (10 items)
  { id: "g2m_mn01", question: "A pencil costs 37 cents. You pay 50 cents. How much change?",      answer: "13 cents", group: "Money" },
  { id: "g2m_mn02", question: "How many cents in a dime?",                                        answer: "10",   group: "Money" },
  { id: "g2m_mn03", question: "A sticker costs 25 cents. You pay with 3 dimes. How much change?", answer: "5 cents", group: "Money" },
  { id: "g2m_mn04", question: "How many cents in a dollar?",                                      answer: "100",  group: "Money" },
  { id: "g2m_mn05", question: "A book costs 85 cents. You pay $1.00. How much change?",           answer: "15 cents", group: "Money" },
  { id: "g2m_mn06", question: "2 dimes + 1 nickel = ___ cents?",                                  answer: "25",   group: "Money" },
  { id: "g2m_mn07", question: "3 quarters = ___ cents?",                                          answer: "75",   group: "Money" },
  { id: "g2m_mn08", question: "A toy costs 68 cents. You pay 75 cents. How much change?",         answer: "7 cents", group: "Money" },
  { id: "g2m_mn09", question: "4 nickels = ___ cents?",                                           answer: "20",   group: "Money" },
  { id: "g2m_mn10", question: "You have $1.00. You spend 42 cents. How many cents are left?",     answer: "58",   group: "Money" },
  // Measurement (10 items)
  { id: "g2m_ms01", question: "How many inches in a foot?",                                       answer: "12",      group: "Measurement" },
  { id: "g2m_ms02", question: "How many feet in a yard?",                                         answer: "3",       group: "Measurement" },
  { id: "g2m_ms03", question: "A pencil is 7 inches long. A ruler is 12 inches long. How much longer is the ruler?", answer: "5 inches", group: "Measurement" },
  { id: "g2m_ms04", question: "How many centimeters in 2 decimeters?",                            answer: "20",      group: "Measurement" },
  { id: "g2m_ms05", question: "A table is 3 feet long. A desk is 2 feet long. Together how long?", answer: "5 feet", group: "Measurement" },
  { id: "g2m_ms06", question: "How many inches in a yard?",                                       answer: "36",      group: "Measurement" },
  { id: "g2m_ms07", question: "A rope is 48 inches long. How many feet is that?",                 answer: "4",       group: "Measurement" },
  { id: "g2m_ms08", question: "Which is shorter: 11 inches or 1 foot?",                          answer: "11 inches", group: "Measurement" },
  { id: "g2m_ms09", question: "A garden is 9 feet long. How many yards is that?",                 answer: "3",       group: "Measurement" },
  { id: "g2m_ms10", question: "How many feet in 2 yards?",                                        answer: "6",       group: "Measurement" },
  // Fractions — on a number line and compare (10 items)
  { id: "g2m_fr01", question: "What fraction is 1 out of 2 equal parts?",                         answer: "1/2",  group: "Fractions" },
  { id: "g2m_fr02", question: "What fraction is 1 out of 4 equal parts?",                         answer: "1/4",  group: "Fractions" },
  { id: "g2m_fr03", question: "What fraction is 1 out of 3 equal parts?",                         answer: "1/3",  group: "Fractions" },
  { id: "g2m_fr04", question: "Which fraction is closest to 0 on a number line: 1/2 or 1/4?",    answer: "1/4",  group: "Fractions" },
  { id: "g2m_fr05", question: "Which fraction is closer to 1 on a number line: 3/4 or 1/4?",     answer: "3/4",  group: "Fractions" },
  { id: "g2m_fr06", question: "2 out of 4 equal parts is ___ of a whole.",                        answer: "1/2",  group: "Fractions" },
  { id: "g2m_fr07", question: "A pizza is cut into 8 equal slices. 3 are eaten. What fraction is left?", answer: "5/8", group: "Fractions" },
  { id: "g2m_fr08", question: "Which is closer to 1 on the number line: 3/4 or 2/3?",            answer: "3/4",  group: "Fractions" },
  { id: "g2m_fr09", question: "What fraction is 2 out of 3 equal parts?",                         answer: "2/3",  group: "Fractions" },
  { id: "g2m_fr10", question: "A ribbon is cut into 4 equal pieces. Mia uses 1 piece. What fraction is used?", answer: "1/4", group: "Fractions" },
];

/* ---- 2nd Grade Reading (Author's Purpose, Prefixes, Suffixes, Text Features) */
const GRADE2_READING = [
  // Author's Purpose & Text Features
  { id: "g2w_always",  question: "A book tries to make you laugh. The author's purpose is to ___.", answer: "entertain", group: "2nd Grade Words" },
  { id: "g2w_around",  question: "A book explains how butterflies grow. The author's purpose is to ___.", answer: "inform", group: "2nd Grade Words" },
  { id: "g2w_because", question: "An ad says you should buy a toy. The author's purpose is to ___.", answer: "persuade", group: "2nd Grade Words" },
  { id: "g2w_been",    question: "A caption under a photo gives extra information about the ___.",  answer: "picture",  group: "2nd Grade Words" },
  { id: "g2w_before",  question: "A heading tells you what a section is mostly ___.",              answer: "about",    group: "2nd Grade Words" },
  { id: "g2w_best",    question: "A glossary is found in the back of a book and defines ___.",     answer: "words",    group: "2nd Grade Words" },
  { id: "g2w_both",    question: "A table of contents tells you where to find ___.",               answer: "chapters", group: "2nd Grade Words" },
  { id: "g2w_buy",     question: "An index helps you find information about a specific ___.",       answer: "topic",    group: "2nd Grade Words" },
  // Prefixes & Suffixes
  { id: "g2w_call",    question: "The prefix 'un-' changes 'happy' to mean ___.",                  answer: "not happy", group: "2nd Grade Words" },
  { id: "g2w_cold",    question: "The prefix 're-' changes 'read' to mean ___.",                   answer: "read again", group: "2nd Grade Words" },
  { id: "g2w_does",    question: "The suffix '-ful' in 'careful' means ___.",                      answer: "full of",  group: "2nd Grade Words" },
  { id: "g2w_dont",    question: "The suffix '-less' in 'homeless' means ___.",                    answer: "without",  group: "2nd Grade Words" },
  { id: "g2w_fast",    question: "What does 'unkind' mean?",                                       answer: "not kind", group: "2nd Grade Words" },
  { id: "g2w_first",   question: "What does 'replay' mean?",                                       answer: "play again", group: "2nd Grade Words" },
  { id: "g2w_five",    question: "What does 'hopeful' mean?",                                      answer: "full of hope", group: "2nd Grade Words" },
  { id: "g2w_found",   question: "What does 'painless' mean?",                                     answer: "without pain", group: "2nd Grade Words" },
  { id: "g2w_gave",    question: "What does 'retell' mean?",                                       answer: "tell again", group: "2nd Grade Words" },
  { id: "g2w_goes",    question: "What does 'unfair' mean?",                                       answer: "not fair", group: "2nd Grade Words" },
  // Context Clues
  { id: "g2w_green",   question: "The sun sank below the horizon. What time of day is it probably?", answer: "evening", group: "2nd Grade Words" },
  { id: "g2w_its",     question: "Maria sprinted to the finish line. Sprinted means she ___.",      answer: "ran fast", group: "2nd Grade Words" },
  { id: "g2w_made",    question: "The dog devoured his dinner in seconds. Devoured means ___.",     answer: "ate quickly", group: "2nd Grade Words" },
  { id: "g2w_many",    question: "It was frigid outside, so we wore coats. Frigid means ___.",      answer: "very cold", group: "2nd Grade Words" },
  { id: "g2w_off",     question: "The kitten was timid and hid under the bed. Timid means ___.",    answer: "shy",      group: "2nd Grade Words" },
  { id: "g2w_or",      question: "He was famished and asked for a snack. Famished means ___.",      answer: "very hungry", group: "2nd Grade Words" },
  // Compare & Contrast
  { id: "g2w_pull",    question: "A frog and a fish both live near water. This is a ___.",          answer: "similarity", group: "2nd Grade Words" },
  { id: "g2w_read",    question: "A frog can jump; a fish cannot. This is a ___.",                  answer: "difference", group: "2nd Grade Words" },
  { id: "g2w_right",   question: "A passage compares cats and dogs. What text structure is this?",  answer: "compare and contrast", group: "2nd Grade Words" },
  { id: "g2w_sing",    question: "Both dogs and cats are popular pets. Both and and signal ___.",   answer: "similarity", group: "2nd Grade Words" },
  // Character & Story
  { id: "g2w_sit",     question: "A character shares his lunch every day. What does this show about him?", answer: "he is generous", group: "2nd Grade Words" },
  { id: "g2w_sleep",   question: "A girl felt her face turn hot when she made a mistake. She probably felt ___.", answer: "embarrassed", group: "2nd Grade Words" },
  { id: "g2w_tell",    question: "At the start of a story, the problem is called the ___.",         answer: "conflict",  group: "2nd Grade Words" },
  { id: "g2w_their",   question: "At the end of a story, the problem is solved. This is the ___.", answer: "resolution", group: "2nd Grade Words" },
  { id: "g2w_these",   question: "The time and place where a story happens is the ___.",            answer: "setting",   group: "2nd Grade Words" },
  { id: "g2w_those",   question: "The main person in a story is called the ___.",                   answer: "main character", group: "2nd Grade Words" },
  // More Prefixes/Suffixes
  { id: "g2w_upon",    question: "The prefix 'pre-' in 'preheat' means ___.",                       answer: "before",   group: "2nd Grade Words" },
  { id: "g2w_us",      question: "The suffix '-er' in 'farmer' means one who ___.",                 answer: "farms",    group: "2nd Grade Words" },
  { id: "g2w_use",     question: "What does 'preview' mean?",                                       answer: "see before", group: "2nd Grade Words" },
  { id: "g2w_very",    question: "The suffix '-ness' in 'kindness' means ___.",                     answer: "state of being kind", group: "2nd Grade Words" },
  { id: "g2w_wash",    question: "What does 'teacher' mean?",                                       answer: "one who teaches", group: "2nd Grade Words" },
  { id: "g2w_which",   question: "What does 'illness' mean?",                                       answer: "state of being ill", group: "2nd Grade Words" },
  { id: "g2w_why",     question: "What does 'rewrite' mean?",                                       answer: "write again", group: "2nd Grade Words" },
  { id: "g2w_wish",    question: "The suffix '-able' in 'breakable' means ___.",                    answer: "can be broken", group: "2nd Grade Words" },
  { id: "g2w_work",    question: "What does 'uncomfortable' mean?",                                 answer: "not comfortable", group: "2nd Grade Words" },
  { id: "g2w_would",   question: "What does 'joyful' mean?",                                        answer: "full of joy", group: "2nd Grade Words" },
  { id: "g2w_write",   question: "What does 'powerless' mean?",                                     answer: "without power", group: "2nd Grade Words" },
  { id: "g2w_your",    question: "The prefix 'mis-' in 'misspell' means ___.",                      answer: "wrongly",  group: "2nd Grade Words" },
];

/* ---- 3rd Grade Math ---------------------------------------- */
const GRADE3_MATH = (function () {
  const items = [];

  // Multiplication: mix of bare facts and word problems
  // Rows: 0 through 10 multiplied by 0 through 10 — some are word problems
  var mulWordProblems = {
    "mul_2_3":  "A garden has 2 rows with 3 flowers each. How many flowers?",
    "mul_3_4":  "There are 3 bags with 4 apples each. How many apples in all?",
    "mul_4_5":  "A box holds 5 crayons. There are 4 boxes. How many crayons?",
    "mul_5_6":  "Each table seats 6 students. There are 5 tables. How many students?",
    "mul_6_7":  "A school has 6 classrooms with 7 fish tanks each. How many fish tanks?",
    "mul_7_8":  "A garden has 7 rows with 8 plants in each row. How many plants?",
    "mul_8_9":  "Each shelf holds 9 books. There are 8 shelves. How many books?",
    "mul_9_9":  "A store sells 9 packs of markers with 9 markers each. How many markers?",
    "mul_6_8":  "There are 6 cartons with 8 eggs each. How many eggs in all?",
    "mul_7_6":  "Seven friends each have 6 stickers. How many stickers in all?",
    "mul_3_8":  "There are 3 teams with 8 players each. How many players?",
    "mul_4_9":  "Each bag has 9 grapes. There are 4 bags. How many grapes?",
    "mul_5_7":  "A baker makes 5 trays of cookies with 7 cookies each. How many cookies?",
    "mul_8_6":  "Eight boxes each hold 6 cans. How many cans in all?",
    "mul_9_4":  "Nine shelves each hold 4 trophies. How many trophies?",
    "mul_10_7": "A school orders 10 packs of pencils with 7 pencils each. How many pencils?",
    "mul_6_6":  "Six friends each read 6 books this summer. How many books in all?",
    "mul_9_6":  "Nine tables each have 6 chairs. How many chairs in all?",
    "mul_8_7":  "Eight baskets each hold 7 oranges. How many oranges?",
    "mul_7_9":  "A farmer plants 7 rows with 9 seeds in each row. How many seeds?",
  };
  for (var a = 0; a <= 10; a++) {
    for (var b = 0; b <= 10; b++) {
      var key = "mul_" + a + "_" + b;
      var q = (mulWordProblems[key]) ? mulWordProblems[key] : (a + " × " + b + " = ?");
      items.push({ id: key, question: q, answer: String(a * b), group: "Multiplication" });
    }
  }

  // Division: mix of bare facts and word problems, including remainders
  var divWordProblems = {
    "div_24_6":  "24 students are split into 6 equal groups. How many in each group?",
    "div_35_5":  "35 stickers are shared equally among 5 friends. How many each?",
    "div_42_7":  "42 apples are put into bags of 7. How many bags?",
    "div_56_8":  "56 crayons are divided equally into 8 boxes. How many in each box?",
    "div_63_9":  "63 cookies are put on plates of 9. How many plates?",
    "div_48_6":  "48 books are placed on shelves with 6 books each. How many shelves?",
    "div_72_8":  "72 eggs are packed in cartons of 8. How many cartons?",
    "div_81_9":  "81 students sit at tables of 9. How many tables?",
    "div_40_8":  "40 chairs are arranged in rows of 8. How many rows?",
    "div_54_6":  "54 oranges are put into bags of 6. How many bags?",
    "div_36_9":  "36 marbles are shared equally by 9 children. How many each?",
    "div_28_7":  "28 pencils are divided equally into 7 cups. How many per cup?",
  };
  for (var b = 1; b <= 10; b++) {
    for (var q = 1; q <= 10; q++) {
      var dividend = b * q;
      var key = "div_" + dividend + "_" + b;
      var question = (divWordProblems[key]) ? divWordProblems[key] : (dividend + " ÷ " + b + " = ?");
      items.push({ id: key, question: question, answer: String(q), group: "Division" });
    }
  }

  // Rounding (12 items)
  var rounding = [
    { id: "g3m_ro01", question: "Round 47 to the nearest 10.",                                             answer: "50",  group: "Rounding" },
    { id: "g3m_ro02", question: "Round 23 to the nearest 10.",                                             answer: "20",  group: "Rounding" },
    { id: "g3m_ro03", question: "A class counts 85 paper clips. To the nearest 10, that is about ___.",    answer: "90",  group: "Rounding" },
    { id: "g3m_ro04", question: "Round 234 to the nearest 100.",                                           answer: "200", group: "Rounding" },
    { id: "g3m_ro05", question: "Round 567 to the nearest 100.",                                           answer: "600", group: "Rounding" },
    { id: "g3m_ro06", question: "Round 350 to the nearest 100.",                                           answer: "400", group: "Rounding" },
    { id: "g3m_ro07", question: "A store has 72 bottles. To the nearest 10, that is about ___.",           answer: "70",  group: "Rounding" },
    { id: "g3m_ro08", question: "Round 148 to the nearest 10.",                                            answer: "150", group: "Rounding" },
    { id: "g3m_ro09", question: "Round 452 to the nearest 100.",                                           answer: "500", group: "Rounding" },
    { id: "g3m_ro10", question: "Best estimate for 397 + 204 to nearest hundred?",                         answer: "600", group: "Rounding" },
    { id: "g3m_ro11", question: "Best estimate for 489 + 312 to nearest hundred?",                         answer: "800", group: "Rounding" },
    { id: "g3m_ro12", question: "Round 749 to the nearest 100.",                                           answer: "700", group: "Rounding" },
  ];
  rounding.forEach(function (r) { items.push(r); });

  // Fractions — number line, compare, non-unit (12 items)
  var fractions = [
    { id: "g3m_fr01", question: "Which fraction is closest to 1/2 on a number line: 1/4, 2/3, or 3/8?",  answer: "3/8", group: "Fractions" },
    { id: "g3m_fr02", question: "Which fraction is larger: 2/3 or 2/5?",                                  answer: "2/3", group: "Fractions" },
    { id: "g3m_fr03", question: "Which fraction is smaller: 3/4 or 3/8?",                                 answer: "3/8", group: "Fractions" },
    { id: "g3m_fr04", question: "On a number line from 0 to 1, where is 1/2?",                            answer: "middle", group: "Fractions" },
    { id: "g3m_fr05", question: "Compare: 4/5 vs 4/9. Which is greater?",                                 answer: "4/5", group: "Fractions" },
    { id: "g3m_fr06", question: "Compare: 1/6 vs 1/3. Which is greater?",                                 answer: "1/3", group: "Fractions" },
    { id: "g3m_fr07", question: "Which fraction is larger: 2/3 or 1/3?",                                  answer: "2/3", group: "Fractions" },
    { id: "g3m_fr08", question: "Which fraction is larger: 5/6 or 5/8?",                                  answer: "5/6", group: "Fractions" },
    { id: "g3m_fr09", question: "Is 2/4 equivalent to 1/2?",                                              answer: "yes", group: "Fractions" },
    { id: "g3m_fr10", question: "Is 3/6 equivalent to 1/2?",                                              answer: "yes", group: "Fractions" },
    { id: "g3m_fr11", question: "A number line goes from 0 to 1. A point is at 3/4. Is it past or before 1/2?", answer: "past", group: "Fractions" },
    { id: "g3m_fr12", question: "Which fraction is smaller: 2/8 or 2/3?",                                 answer: "2/8", group: "Fractions" },
  ];
  fractions.forEach(function (f) { items.push(f); });

  // Area & Perimeter — word problems (12 items)
  var areaperim = [
    { id: "g3m_ap01", question: "A classroom floor is 4 tiles long and 3 tiles wide. How many tiles cover it?", answer: "12", group: "Area & Perimeter" },
    { id: "g3m_ap02", question: "A square garden has sides of 5 meters. What is its perimeter?",            answer: "20",  group: "Area & Perimeter" },
    { id: "g3m_ap03", question: "A swimming pool is 6 m long and 2 m wide. What is its perimeter?",         answer: "16",  group: "Area & Perimeter" },
    { id: "g3m_ap04", question: "A room is 5 feet long and 4 feet wide. What is its area?",                 answer: "20",  group: "Area & Perimeter" },
    { id: "g3m_ap05", question: "A square with side 3 cm is tiled with 1 cm tiles. How many tiles fit?",    answer: "9",   group: "Area & Perimeter" },
    { id: "g3m_ap06", question: "A rectangle 7 m long and 2 m wide — what is its area?",                    answer: "14",  group: "Area & Perimeter" },
    { id: "g3m_ap07", question: "A fence goes around a rectangle 8 m by 3 m. How much fence is needed?",    answer: "22",  group: "Area & Perimeter" },
    { id: "g3m_ap08", question: "A square with side 6 ft — what is its area in square feet?",               answer: "36",  group: "Area & Perimeter" },
    { id: "g3m_ap09", question: "A frame goes around a picture 10 in by 4 in. How many inches of frame?",   answer: "28",  group: "Area & Perimeter" },
    { id: "g3m_ap10", question: "A square with side 4 m — what is its perimeter?",                          answer: "16",  group: "Area & Perimeter" },
    { id: "g3m_ap11", question: "A mat is 9 units long and 1 unit wide. What is its area?",                 answer: "9",   group: "Area & Perimeter" },
    { id: "g3m_ap12", question: "A sandbox is 3 m by 3 m. What is the total length of its border?",         answer: "12",  group: "Area & Perimeter" },
  ];
  areaperim.forEach(function (a) { items.push(a); });

  return items;
})();

/* ---- 3rd Grade Reading ------------------------------------- */
const GRADE3_READING = [
  // 3rd Grade Words — theme, text structure, character, figurative language
  { id: "g3w_about",    question: "A story shows a girl who keeps practicing piano even when it is hard. The theme is ___.", answer: "perseverance", group: "3rd Grade Words" },
  { id: "g3w_better",   question: "A passage explains that floods cause erosion, which leads to mudslides. This is ___ text structure.", answer: "cause and effect", group: "3rd Grade Words" },
  { id: "g3w_bring",    question: "A story describes a boy who shares his lunch every day. What can you conclude about him?", answer: "he is generous", group: "3rd Grade Words" },
  { id: "g3w_carry",    question: "A story compares life in the city vs. the country. This is ___ text structure.", answer: "compare and contrast", group: "3rd Grade Words" },
  { id: "g3w_clean",    question: "'The sun peeked over the mountain.' The sun is given a human action. This is ___.", answer: "personification", group: "3rd Grade Words" },
  { id: "g3w_cut",      question: "'Her laugh was music to his ears' is a ___.",                       answer: "metaphor",      group: "3rd Grade Words" },
  { id: "g3w_done",     question: "'As quiet as a mouse' is a ___.",                                   answer: "simile",        group: "3rd Grade Words" },
  { id: "g3w_draw",     question: "A passage lists steps for making a sandwich. This is ___ text structure.", answer: "sequence", group: "3rd Grade Words" },
  { id: "g3w_drink",    question: "A character solves a problem by asking for help. What does this tell you about the character?", answer: "they are wise", group: "3rd Grade Words" },
  { id: "g3w_eight",    question: "'The thunder grumbled and growled all night.' This is an example of ___.", answer: "personification", group: "3rd Grade Words" },
  { id: "g3w_fall",     question: "A fable ends: 'Slow and steady wins the race.' The lesson or ___ is patience.", answer: "theme", group: "3rd Grade Words" },
  { id: "g3w_far",      question: "Using text evidence means using ___ from the story to support your answer.", answer: "details",       group: "3rd Grade Words" },
  { id: "g3w_full",     question: "The central message of a story is its ___.",                        answer: "theme",         group: "3rd Grade Words" },
  { id: "g3w_got",      question: "A nonfiction article's main idea is what the article is mostly ___.", answer: "about",        group: "3rd Grade Words" },
  { id: "g3w_grow",     question: "'The ancient oak tree guarded the village.' Ancient means ___.",     answer: "very old",      group: "3rd Grade Words" },
  { id: "g3w_hold",     question: "A character acts brave even when scared. The theme might be ___.",  answer: "courage",       group: "3rd Grade Words" },
  { id: "g3w_hot",      question: "The author repeats 'drip, drip, drip' to make you feel ___.",      answer: "the slow rain", group: "3rd Grade Words" },
  { id: "g3w_hurt",     question: "'The stars were diamonds scattered across the sky' is a ___.",      answer: "metaphor",      group: "3rd Grade Words" },
  { id: "g3w_if",       question: "A problem leads to a solution. This is ___ text structure.",        answer: "problem and solution", group: "3rd Grade Words" },
  { id: "g3w_keep",     question: "A story shows a character who lies and loses all his friends. The theme is ___.", answer: "honesty matters", group: "3rd Grade Words" },
  { id: "g3w_kind",     question: "'She was as fierce as a storm' is a ___.",                          answer: "simile",        group: "3rd Grade Words" },
  { id: "g3w_laugh",    question: "The root 'aqua' means ___.",                                        answer: "water",         group: "3rd Grade Words" },
  { id: "g3w_light",    question: "The root 'geo' means ___.",                                         answer: "earth",         group: "3rd Grade Words" },
  { id: "g3w_long",     question: "The root 'bio' means ___.",                                         answer: "life",          group: "3rd Grade Words" },
  { id: "g3w_much",     question: "The root 'photo' means ___.",                                       answer: "light",         group: "3rd Grade Words" },
  { id: "g3w_myself",   question: "The root 'auto' means ___.",                                        answer: "self",          group: "3rd Grade Words" },
  { id: "g3w_never",    question: "A word that describes how, when, or where is an ___.",              answer: "adverb",        group: "3rd Grade Words" },
  { id: "g3w_nine",     question: "'Geography' uses the root 'geo.' Geography is the study of ___.",   answer: "earth",         group: "3rd Grade Words" },
  { id: "g3w_only",     question: "'Biography' uses the root 'bio.' A biography tells about a person's ___.", answer: "life",  group: "3rd Grade Words" },
  { id: "g3w_own",      question: "'Autobiography' uses 'auto' meaning self. It is a story a person writes about ___.", answer: "themselves", group: "3rd Grade Words" },
  { id: "g3w_pick",     question: "'Photography' uses 'photo.' Photography captures ___.",             answer: "light in images", group: "3rd Grade Words" },
  { id: "g3w_seven",    question: "A story describes how two brothers are different but help each other. The theme is ___.", answer: "teamwork", group: "3rd Grade Words" },
  { id: "g3w_shall",    question: "The word 'tranquil' means ___.",                                    answer: "calm",          group: "3rd Grade Words" },
  { id: "g3w_show",     question: "The word 'sufficient' means ___.",                                  answer: "enough",        group: "3rd Grade Words" },
  { id: "g3w_six",      question: "The word 'persevere' means ___.",                                   answer: "keep trying",   group: "3rd Grade Words" },
  { id: "g3w_small",    question: "The word 'frequently' means ___.",                                  answer: "often",         group: "3rd Grade Words" },
  { id: "g3w_start",    question: "The word 'cautious' means ___.",                                    answer: "careful",       group: "3rd Grade Words" },
  { id: "g3w_ten",      question: "The word 'vibrant' means ___.",                                     answer: "bright and lively", group: "3rd Grade Words" },
  { id: "g3w_today",    question: "The word 'fortunate' means ___.",                                   answer: "lucky",         group: "3rd Grade Words" },
  { id: "g3w_together", question: "An 'intrepid' explorer ventures into unknown places. Intrepid means ___.", answer: "brave",  group: "3rd Grade Words" },
  { id: "g3w_try",      question: "A passage says plants need sunlight to survive. This explains ___ plants grow toward windows.", answer: "why", group: "3rd Grade Words" },
  { id: "g3w_warm",     question: "When an author gives hints about what will happen later, it is called ___.", answer: "foreshadowing", group: "3rd Grade Words" },
  // Prefixes (10 items)
  { id: "g3r_pfx01", question: "The prefix 'un-' changes 'expected' to 'unexpected.' What does it mean?",  answer: "not expected", group: "Prefixes" },
  { id: "g3r_pfx02", question: "The prefix 're-' changes 'build' to 'rebuild.' What does rebuild mean?",   answer: "build again",  group: "Prefixes" },
  { id: "g3r_pfx03", question: "The prefix 'pre-' changes 'view' to 'preview.' What does preview mean?",  answer: "view before",  group: "Prefixes" },
  { id: "g3r_pfx04", question: "The prefix 'mis-' changes 'lead' to 'mislead.' What does mislead mean?",  answer: "lead wrongly", group: "Prefixes" },
  { id: "g3r_pfx05", question: "The prefix 'dis-' changes 'agree' to 'disagree.' What does it mean?",     answer: "not agree",    group: "Prefixes" },
  { id: "g3r_pfx06", question: "The prefix 'non-' changes 'fiction' to 'nonfiction.' What is nonfiction?", answer: "not made up",  group: "Prefixes" },
  { id: "g3r_pfx07", question: "The prefix 'over-' changes 'load' to 'overload.' What does overload mean?", answer: "too much load", group: "Prefixes" },
  { id: "g3r_pfx08", question: "The prefix 'sub-' changes 'marine' to 'submarine.' Where does a submarine travel?", answer: "underwater", group: "Prefixes" },
  { id: "g3r_pfx09", question: "The prefix 'super-' changes 'hero' to 'superhero.' A superhero has ___ powers.", answer: "above normal", group: "Prefixes" },
  { id: "g3r_pfx10", question: "What does 'disconnect' mean?",                                            answer: "not connected", group: "Prefixes" },
  // Suffixes (10 items)
  { id: "g3r_sfx01", question: "A 'wonderful' day is a day ___ of wonder.",                               answer: "full",          group: "Suffixes" },
  { id: "g3r_sfx02", question: "A 'homeless' cat is a cat ___ a home.",                                   answer: "without",       group: "Suffixes" },
  { id: "g3r_sfx03", question: "A 'runner' is one who ___.",                                              answer: "runs",          group: "Suffixes" },
  { id: "g3r_sfx04", question: "The word 'exploration' means the ___ of exploring.",                      answer: "act",           group: "Suffixes" },
  { id: "g3r_sfx05", question: "The suffix '-ness' in 'brightness' means ___.",                           answer: "state of being bright", group: "Suffixes" },
  { id: "g3r_sfx06", question: "A 'readable' book is a book that ___.",                                   answer: "can be read",   group: "Suffixes" },
  { id: "g3r_sfx07", question: "The word 'silently' means in a ___ way.",                                 answer: "silent",        group: "Suffixes" },
  { id: "g3r_sfx08", question: "The suffix '-ing' in 'swimming' shows the action is ___.",                answer: "happening now", group: "Suffixes" },
  { id: "g3r_sfx09", question: "The suffix '-ed' in 'climbed' shows the action ___.",                     answer: "already happened", group: "Suffixes" },
  { id: "g3r_sfx10", question: "A person who discovers things is called a discover___.",                   answer: "er",            group: "Suffixes" },
  // Synonyms & Antonyms — academic vocabulary (12 items)
  { id: "g3r_sa01", question: "A synonym for 'exhausted' is ___.",    answer: "tired",       group: "Synonyms & Antonyms" },
  { id: "g3r_sa02", question: "An antonym for 'ancient' is ___.",     answer: "modern",      group: "Synonyms & Antonyms" },
  { id: "g3r_sa03", question: "A synonym for 'enormous' is ___.",     answer: "huge",        group: "Synonyms & Antonyms" },
  { id: "g3r_sa04", question: "An antonym for 'transparent' is ___.", answer: "opaque",      group: "Synonyms & Antonyms" },
  { id: "g3r_sa05", question: "A synonym for 'furious' is ___.",      answer: "enraged",     group: "Synonyms & Antonyms" },
  { id: "g3r_sa06", question: "An antonym for 'expand' is ___.",      answer: "shrink",      group: "Synonyms & Antonyms" },
  { id: "g3r_sa07", question: "A synonym for 'courageous' is ___.",   answer: "brave",       group: "Synonyms & Antonyms" },
  { id: "g3r_sa08", question: "An antonym for 'scarce' is ___.",      answer: "plentiful",   group: "Synonyms & Antonyms" },
  { id: "g3r_sa09", question: "A synonym for 'observe' is ___.",      answer: "watch",       group: "Synonyms & Antonyms" },
  { id: "g3r_sa10", question: "An antonym for 'fiction' is ___.",     answer: "nonfiction",  group: "Synonyms & Antonyms" },
  { id: "g3r_sa11", question: "A synonym for 'swift' is ___.",        answer: "fast",        group: "Synonyms & Antonyms" },
  { id: "g3r_sa12", question: "An antonym for 'villainous' is ___.",  answer: "heroic",      group: "Synonyms & Antonyms" },
  // Reading Passages (2 items)
  { id: "g3r_pass01", question: "Read: 'Mia found a tiny turtle near the pond. It had a crack in its shell. She carried it gently to the nature center so the workers could help it heal.' — Why did Mia take the turtle to the nature center?", answer: "to help it heal", group: "Reading Passages" },
  { id: "g3r_pass02", question: "Read: 'The maple tree in the yard changes with every season. In spring it has bright green leaves. By fall, those leaves turn red and orange and drift to the ground.' — What happens to the maple tree's leaves in fall?", answer: "they turn red and orange and fall to the ground", group: "Reading Passages" },
];

/* ---- 4th Grade Math ---------------------------------------- */
const GRADE4_MATH = [
  // Factors & Multiples — GCF, LCM, prime/composite (15 items)
  { id: "g4m_fm01", question: "Is 4 a factor of 12?",                                              answer: "yes",  group: "Factors & Multiples" },
  { id: "g4m_fm02", question: "Is 5 a factor of 22?",                                              answer: "no",   group: "Factors & Multiples" },
  { id: "g4m_fm03", question: "What is the GCF of 8 and 12?",                                      answer: "4",    group: "Factors & Multiples" },
  { id: "g4m_fm04", question: "What is the GCF of 6 and 9?",                                       answer: "3",    group: "Factors & Multiples" },
  { id: "g4m_fm05", question: "What is the LCM of 3 and 4?",                                       answer: "12",   group: "Factors & Multiples" },
  { id: "g4m_fm06", question: "What is the LCM of 4 and 6?",                                       answer: "12",   group: "Factors & Multiples" },
  { id: "g4m_fm07", question: "Is 17 prime or composite?",                                         answer: "prime",     group: "Factors & Multiples" },
  { id: "g4m_fm08", question: "Is 24 prime or composite?",                                         answer: "composite", group: "Factors & Multiples" },
  { id: "g4m_fm09", question: "Is 7 a factor of 49?",                                              answer: "yes",  group: "Factors & Multiples" },
  { id: "g4m_fm10", question: "Two classes each have 18 students. GCF of 18 and 12 for equal groups?", answer: "6", group: "Factors & Multiples" },
  { id: "g4m_fm11", question: "How many factors does 12 have?",                                    answer: "6",    group: "Factors & Multiples" },
  { id: "g4m_fm12", question: "What is the GCF of 10 and 15?",                                     answer: "5",    group: "Factors & Multiples" },
  { id: "g4m_fm13", question: "What is the LCM of 4 and 5?",                                       answer: "20",   group: "Factors & Multiples" },
  { id: "g4m_fm14", question: "Is 13 prime or composite?",                                         answer: "prime",     group: "Factors & Multiples" },
  { id: "g4m_fm15", question: "Is 36 prime or composite?",                                         answer: "composite", group: "Factors & Multiples" },
  // Geometry — angle sums and classification (12 items)
  { id: "g4m_ge01", question: "An angle less than 90° is called ___.",                              answer: "acute",         group: "Geometry" },
  { id: "g4m_ge02", question: "An angle greater than 90° is called ___.",                           answer: "obtuse",        group: "Geometry" },
  { id: "g4m_ge03", question: "A triangle has angles of 55° and 70°. What is the third angle?",    answer: "55",            group: "Geometry" },
  { id: "g4m_ge04", question: "Lines that never meet are ___.",                                     answer: "parallel",      group: "Geometry" },
  { id: "g4m_ge05", question: "Lines that cross at 90° are ___.",                                   answer: "perpendicular", group: "Geometry" },
  { id: "g4m_ge06", question: "A triangle with all equal sides is ___.",                            answer: "equilateral",   group: "Geometry" },
  { id: "g4m_ge07", question: "A triangle has angles of 40° and 75°. Find the third angle.",       answer: "65",            group: "Geometry" },
  { id: "g4m_ge08", question: "A triangle with two equal sides is ___.",                            answer: "isosceles",     group: "Geometry" },
  { id: "g4m_ge09", question: "The sum of angles in any triangle is ___°.",                        answer: "180",           group: "Geometry" },
  { id: "g4m_ge10", question: "A right triangle has one 90° angle and one 35° angle. Find the third.", answer: "55",       group: "Geometry" },
  { id: "g4m_ge11", question: "A polygon with 6 sides is a ___.",                                   answer: "hexagon",       group: "Geometry" },
  { id: "g4m_ge12", question: "An angle that is exactly 180° is called a ___ angle.",               answer: "straight",      group: "Geometry" },
  // Decimals — to hundredths and word problems (12 items)
  { id: "g4m_de01", question: "What is 0.47 rounded to the nearest tenth?",                        answer: "0.5",  group: "Decimals" },
  { id: "g4m_de02", question: "0.25 in fraction form is ___.",                                     answer: "1/4",  group: "Decimals" },
  { id: "g4m_de03", question: "A book costs $4.75 and a pencil costs $1.25. Total cost?",          answer: "$6.00", group: "Decimals" },
  { id: "g4m_de04", question: "Which is bigger: 0.56 or 0.65?",                                   answer: "0.65", group: "Decimals" },
  { id: "g4m_de05", question: "Which is bigger: 0.90 or 0.09?",                                   answer: "0.90", group: "Decimals" },
  { id: "g4m_de06", question: "0.75 in fraction form is ___.",                                     answer: "3/4",  group: "Decimals" },
  { id: "g4m_de07", question: "Maria ran 1.45 km. Then she ran 0.85 km more. How far in all?",     answer: "2.30", group: "Decimals" },
  { id: "g4m_de08", question: "1.00 − 0.37 = ?",                                                   answer: "0.63", group: "Decimals" },
  { id: "g4m_de09", question: "What is 0.1 as a fraction?",                                        answer: "1/10", group: "Decimals" },
  { id: "g4m_de10", question: "Which is smaller: 0.30 or 0.08?",                                   answer: "0.08", group: "Decimals" },
  { id: "g4m_de11", question: "A bag weighs 2.50 kg. Another weighs 1.75 kg. How much more does the first weigh?", answer: "0.75", group: "Decimals" },
  { id: "g4m_de12", question: "0.20 + 0.35 = ?",                                                   answer: "0.55", group: "Decimals" },
  // Fractions — unlike denominators and word problems (12 items)
  { id: "g4m_fr01", question: "1/2 + 1/4 = ?",                                                    answer: "3/4",  group: "Fractions" },
  { id: "g4m_fr02", question: "3/4 − 1/4 = ?",                                                    answer: "1/2",  group: "Fractions" },
  { id: "g4m_fr03", question: "Which is equivalent to 2/4?",                                      answer: "1/2",  group: "Fractions" },
  { id: "g4m_fr04", question: "A recipe uses 1/3 cup oil and 1/6 cup water. How much liquid in all?", answer: "1/2", group: "Fractions" },
  { id: "g4m_fr05", question: "2/3 − 1/6 = ?",                                                    answer: "1/2",  group: "Fractions" },
  { id: "g4m_fr06", question: "Jake ate 1/4 of a pizza. Ana ate 3/8. How much did they eat together?", answer: "5/8", group: "Fractions" },
  { id: "g4m_fr07", question: "5/6 − 1/2 = ?",                                                    answer: "1/3",  group: "Fractions" },
  { id: "g4m_fr08", question: "Which is larger: 7/8 or 5/6?",                                     answer: "7/8",  group: "Fractions" },
  { id: "g4m_fr09", question: "Which is equivalent to 3/6?",                                      answer: "1/2",  group: "Fractions" },
  { id: "g4m_fr10", question: "3/4 + 1/8 = ?",                                                    answer: "7/8",  group: "Fractions" },
  { id: "g4m_fr11", question: "A ribbon is 5/6 m long. You use 1/3 m. How much is left?",         answer: "1/2",  group: "Fractions" },
  { id: "g4m_fr12", question: "Which is larger: 5/8 or 3/4?",                                     answer: "3/4",  group: "Fractions" },
  // Multi-digit — 4×1-digit, 2×2-digit, division with remainder (10 items)
  { id: "g4m_md01", question: "1,248 × 3 = ?",                                                    answer: "3744",  group: "Multi-digit" },
  { id: "g4m_md02", question: "A box holds 24 crayons. 3 boxes shared equally by 4 students. How many each?", answer: "18", group: "Multi-digit" },
  { id: "g4m_md03", question: "2,150 × 4 = ?",                                                    answer: "8600",  group: "Multi-digit" },
  { id: "g4m_md04", question: "256 ÷ 3 = ___ remainder ___.",                                      answer: "85 r1", group: "Multi-digit" },
  { id: "g4m_md05", question: "43 × 25 = ?",                                                      answer: "1075",  group: "Multi-digit" },
  { id: "g4m_md06", question: "There are 1,500 tickets. 6 schools share them equally. How many each?", answer: "250", group: "Multi-digit" },
  { id: "g4m_md07", question: "32 × 46 = ?",                                                      answer: "1472",  group: "Multi-digit" },
  { id: "g4m_md08", question: "427 ÷ 6 = ___ remainder ___.",                                      answer: "71 r1", group: "Multi-digit" },
  { id: "g4m_md09", question: "2,115 × 4 = ?",                                                    answer: "8460",  group: "Multi-digit" },
  { id: "g4m_md10", question: "A school orders 350 books for 7 classrooms. How many books per class?", answer: "50", group: "Multi-digit" },
];

/* ---- 4th Grade Reading ------------------------------------- */
const GRADE4_READING = [
  // Parts of Speech — complex sentence analysis (15 items)
  { id: "g4r_ps01", question: "'She reluctantly agreed to the plan.' What part of speech is 'reluctantly'?", answer: "adverb",       group: "Parts of Speech" },
  { id: "g4r_ps02", question: "Identify the conjunction: 'I wanted to go, but it was raining.'",           answer: "but",           group: "Parts of Speech" },
  { id: "g4r_ps03", question: "'The golden retriever bounded joyfully across the yard.' Identify the adjective.", answer: "golden",  group: "Parts of Speech" },
  { id: "g4r_ps04", question: "'He whispered nervously before the speech.' What part of speech is 'nervously'?", answer: "adverb",  group: "Parts of Speech" },
  { id: "g4r_ps05", question: "'Without her map, the hiker was lost.' 'Without' is a ___.",                  answer: "preposition", group: "Parts of Speech" },
  { id: "g4r_ps06", question: "'Mariana wrote the essay, and her partner drew the charts.' 'And' is a ___.", answer: "conjunction", group: "Parts of Speech" },
  { id: "g4r_ps07", question: "'The scientist carefully measured the liquid.' Identify the adverb.",          answer: "carefully",   group: "Parts of Speech" },
  { id: "g4r_ps08", question: "'Neither the rain nor the cold stopped them.' 'Neither...nor' is a ___.",     answer: "conjunction", group: "Parts of Speech" },
  { id: "g4r_ps09", question: "'She' in 'She discovered a new species' is a ___.",                           answer: "pronoun",     group: "Parts of Speech" },
  { id: "g4r_ps10", question: "'The exhausted marathon runner collapsed at the finish.' Identify the adjective.", answer: "exhausted", group: "Parts of Speech" },
  { id: "g4r_ps11", question: "'Courage' in 'Courage is her greatest strength' is a ___.",                   answer: "noun",        group: "Parts of Speech" },
  { id: "g4r_ps12", question: "'She sprinted effortlessly past her opponents.' Identify the adverb.",         answer: "effortlessly", group: "Parts of Speech" },
  { id: "g4r_ps13", question: "'Wow!' at the start of an exclamation is an ___.",                            answer: "interjection", group: "Parts of Speech" },
  { id: "g4r_ps14", question: "'Beneath the old bridge' — 'beneath' is a ___.",                              answer: "preposition", group: "Parts of Speech" },
  { id: "g4r_ps15", question: "'The ancient, moss-covered statue stood silently.' Identify one adjective.",   answer: "ancient",     group: "Parts of Speech" },
  // Figurative Language — literary context examples (12 items)
  { id: "g4r_fl01", question: "'I have told you a million times!' is an example of ___.",               answer: "hyperbole",       group: "Figurative Language" },
  { id: "g4r_fl02", question: "The phrase 'break a leg' is an example of ___.",                         answer: "idiom",           group: "Figurative Language" },
  { id: "g4r_fl03", question: "'The moon is a pale lantern in the sky' is a ___.",                      answer: "metaphor",        group: "Figurative Language" },
  { id: "g4r_fl04", question: "'Sally sells seashells by the seashore' uses ___.",                      answer: "alliteration",    group: "Figurative Language" },
  { id: "g4r_fl05", question: "'The ocean roared and clawed at the shore' uses ___.",                   answer: "personification", group: "Figurative Language" },
  { id: "g4r_fl06", question: "'She was as nervous as a cat in a room full of rocking chairs' is a ___.", answer: "simile",        group: "Figurative Language" },
  { id: "g4r_fl07", question: "The 'buzz' of bees and the 'crack' of thunder are both ___.",            answer: "onomatopoeia",    group: "Figurative Language" },
  { id: "g4r_fl08", question: "'Bite the bullet' means to endure something difficult. This is an ___.", answer: "idiom",           group: "Figurative Language" },
  { id: "g4r_fl09", question: "'The ancient walls whispered secrets of the past' uses ___.",             answer: "personification", group: "Figurative Language" },
  { id: "g4r_fl10", question: "'My backpack weighs a ton!' is an example of ___.",                      answer: "hyperbole",       group: "Figurative Language" },
  { id: "g4r_fl11", question: "'Fred's frightful face frightened the crowd' uses ___.",                  answer: "alliteration",    group: "Figurative Language" },
  { id: "g4r_fl12", question: "'Her smile was a ray of sunshine in the gloomy room' is a ___.",         answer: "metaphor",        group: "Figurative Language" },
  // Vocabulary — Greek/Latin roots and context clues (12 items)
  { id: "g4r_vo01", question: "The root 'port' means carry. What does 'transport' mean?",               answer: "carry across",      group: "Vocabulary" },
  { id: "g4r_vo02", question: "The root 'aud' means hear. An auditorium is a place to ___.",            answer: "listen",            group: "Vocabulary" },
  { id: "g4r_vo03", question: "The root 'dict' means say. A dictator is someone who ___ with total power.", answer: "rules by speaking", group: "Vocabulary" },
  { id: "g4r_vo04", question: "The root 'struct' means build. A structure is something that is ___.",   answer: "built",             group: "Vocabulary" },
  { id: "g4r_vo05", question: "The root 'vis' means see. What does 'invisible' mean?",                  answer: "cannot be seen",    group: "Vocabulary" },
  { id: "g4r_vo06", question: "The root 'scrib/script' means write. A prescription is something ___.", answer: "written by a doctor", group: "Vocabulary" },
  { id: "g4r_vo07", question: "Hikers scrambled up the steep, rugged trail without stopping. Rugged means ___.", answer: "rough and uneven", group: "Vocabulary" },
  { id: "g4r_vo08", question: "The scientist documented every detail with meticulous care. Meticulous means ___.", answer: "very careful",  group: "Vocabulary" },
  { id: "g4r_vo09", question: "After weeks of drought, the parched earth finally got rain. Parched means ___.", answer: "very dry",       group: "Vocabulary" },
  { id: "g4r_vo10", question: "The committee reached a unanimous decision after hours of debate. Unanimous means ___.", answer: "all agreed", group: "Vocabulary" },
  { id: "g4r_vo11", question: "The root 'port' is in 'export.' Export means to carry goods ___.",       answer: "out of a country",  group: "Vocabulary" },
  { id: "g4r_vo12", question: "The root 'aud' is in 'audience.' An audience is a group that ___.",      answer: "listens or watches", group: "Vocabulary" },
  // Reading Passages (2 items)
  { id: "g4r_pass01", question: "Read: 'Despite the relentless rain, the hikers pressed onward toward the summit. The panoramic view waiting at the top was worth every soggy step.' — What does 'panoramic' most likely mean?", answer: "a wide, sweeping view", group: "Reading Passages" },
  { id: "g4r_pass02", question: "Read: 'Thomas Edison failed over a thousand times before inventing the light bulb. When asked about his failures, he replied that he had simply found a thousand ways that did not work.' — Edison's response shows that he viewed failure as ___.", answer: "a learning experience", group: "Reading Passages" },
];

/* ---- 5th Grade Math ---------------------------------------- */
const GRADE5_MATH = [
  // Order of Operations (12 items)
  { id: "g5m_oo01", question: "In PEMDAS, what does E stand for?",                       answer: "exponents",     group: "Order of Operations" },
  { id: "g5m_oo02", question: "In PEMDAS, what comes before multiplication: P then ___?", answer: "exponents",    group: "Order of Operations" },
  { id: "g5m_oo03", question: "Solve: 3² + 4 × (8 − 5) = ?",                            answer: "21",            group: "Order of Operations" },
  { id: "g5m_oo04", question: "Solve: (12 − 4)² ÷ 2 = ?",                               answer: "32",            group: "Order of Operations" },
  { id: "g5m_oo05", question: "Solve: 6 + 2³ × (5 − 3) = ?",                            answer: "22",            group: "Order of Operations" },
  { id: "g5m_oo06", question: "Solve: 5² − 3 × (9 − 6) = ?",                            answer: "16",            group: "Order of Operations" },
  { id: "g5m_oo07", question: "Solve: (4 + 1)² ÷ 5 = ?",                                answer: "5",             group: "Order of Operations" },
  { id: "g5m_oo08", question: "Solve: 2³ + 6 ÷ 2 = ?",                                  answer: "11",            group: "Order of Operations" },
  { id: "g5m_oo09", question: "Solve: 4 × (3 + 2)² = ?",                                answer: "100",           group: "Order of Operations" },
  { id: "g5m_oo10", question: "In 5² + 3 × 2, which operation do you do first?",         answer: "exponent",      group: "Order of Operations" },
  { id: "g5m_oo11", question: "Solve: 10 − 2 × 3 + 1 = ?",                              answer: "5",             group: "Order of Operations" },
  { id: "g5m_oo12", question: "Solve: 36 ÷ (2 + 4)² × 9 = ?",                           answer: "9",             group: "Order of Operations" },
  // Fractions (12 items)
  { id: "g5m_fr01", question: "1/2 × 1/2 = ?",              answer: "1/4",  group: "Fractions" },
  { id: "g5m_fr02", question: "2/3 × 3/4 = ?",              answer: "1/2",  group: "Fractions" },
  { id: "g5m_fr03", question: "1/2 ÷ 2 = ?",                answer: "1/4",  group: "Fractions" },
  { id: "g5m_fr04", question: "3/4 × 2/3 = ?",              answer: "1/2",  group: "Fractions" },
  { id: "g5m_fr05", question: "1/3 × 1/3 = ?",              answer: "1/9",  group: "Fractions" },
  { id: "g5m_fr06", question: "2/5 × 5/2 = ?",              answer: "1",    group: "Fractions" },
  { id: "g5m_fr07", question: "1/4 ÷ 2 = ?",                answer: "1/8",  group: "Fractions" },
  { id: "g5m_fr08", question: "3/4 ÷ 3 = ?",                answer: "1/4",  group: "Fractions" },
  { id: "g5m_fr09", question: "1/2 × 4 = ?",                answer: "2",    group: "Fractions" },
  { id: "g5m_fr10", question: "1/3 × 6 = ?",                answer: "2",    group: "Fractions" },
  { id: "g5m_fr11", question: "2/3 + 1/6 = ?",              answer: "5/6",  group: "Fractions" },
  { id: "g5m_fr12", question: "3/4 − 1/8 = ?",              answer: "5/8",  group: "Fractions" },
  // Percentages (10 items)
  { id: "g5m_pc01", question: "What is 15% of 60?",                                                 answer: "9",    group: "Percentages" },
  { id: "g5m_pc02", question: "A $40 shirt is 25% off. What is the sale price?",                    answer: "$30",  group: "Percentages" },
  { id: "g5m_pc03", question: "18 out of 24 students passed. What percent passed?",                 answer: "75%",  group: "Percentages" },
  { id: "g5m_pc04", question: "What is 20% of 85?",                                                 answer: "17",   group: "Percentages" },
  { id: "g5m_pc05", question: "A store marks up a $50 item by 30%. What is the new price?",         answer: "$65",  group: "Percentages" },
  { id: "g5m_pc06", question: "12 out of 48 apples are bad. What percent is bad?",                  answer: "25%",  group: "Percentages" },
  { id: "g5m_pc07", question: "What is 35% of 200?",                                                answer: "70",   group: "Percentages" },
  { id: "g5m_pc08", question: "A $120 jacket is 15% off. How much do you save?",                    answer: "$18",  group: "Percentages" },
  { id: "g5m_pc09", question: "What percent of 80 is 20?",                                          answer: "25%",  group: "Percentages" },
  { id: "g5m_pc10", question: "A class of 30 has 40% girls. How many girls?",                       answer: "12",   group: "Percentages" },
  // Geometry (12 items)
  { id: "g5m_ge01", question: "A rectangular prism is 4 cm × 3 cm × 5 cm. What is its volume?",        answer: "60",         group: "Geometry" },
  { id: "g5m_ge02", question: "The sum of interior angles in a pentagon = ___°.",                        answer: "540",        group: "Geometry" },
  { id: "g5m_ge03", question: "Two lines cross forming a 120° angle. The supplementary angle is ___°.", answer: "60",         group: "Geometry" },
  { id: "g5m_ge04", question: "A fish tank is 6 ft × 2 ft × 3 ft. What is its volume?",                answer: "36",         group: "Geometry" },
  { id: "g5m_ge05", question: "The sum of interior angles in a hexagon = ___°.",                        answer: "720",        group: "Geometry" },
  { id: "g5m_ge06", question: "Volume = length × width × ___.",                                          answer: "height",     group: "Geometry" },
  { id: "g5m_ge07", question: "A cube has side length 4 cm. What is its volume?",                       answer: "64",         group: "Geometry" },
  { id: "g5m_ge08", question: "Two angles are supplementary. One is 73°. What is the other?",           answer: "107",        group: "Geometry" },
  { id: "g5m_ge09", question: "A rectangle 8 long and 6 wide has area = ?",                             answer: "48",         group: "Geometry" },
  { id: "g5m_ge10", question: "A prism has a base area of 12 sq ft and height of 5 ft. Volume = ?",     answer: "60",         group: "Geometry" },
  { id: "g5m_ge11", question: "The sum of interior angles in a triangle = ___°.",                       answer: "180",        group: "Geometry" },
  { id: "g5m_ge12", question: "A quadrilateral with exactly one pair of parallel sides is a ___.",       answer: "trapezoid",  group: "Geometry" },
  // Coordinate Plane — all 4 quadrants (10 items)
  { id: "g5m_cp01", question: "In which quadrant is the point (−3, 4)?",                              answer: "II",         group: "Coordinate Plane" },
  { id: "g5m_cp02", question: "In which quadrant is the point (5, −2)?",                              answer: "IV",         group: "Coordinate Plane" },
  { id: "g5m_cp03", question: "In which quadrant is the point (−2, −5)?",                             answer: "III",        group: "Coordinate Plane" },
  { id: "g5m_cp04", question: "In which quadrant is the point (3, 7)?",                               answer: "I",          group: "Coordinate Plane" },
  { id: "g5m_cp05", question: "What is the x-coordinate of (5, −2)?",                                answer: "5",          group: "Coordinate Plane" },
  { id: "g5m_cp06", question: "Which axis is vertical?",                                              answer: "y-axis",     group: "Coordinate Plane" },
  { id: "g5m_cp07", question: "Which axis is horizontal?",                                            answer: "x-axis",     group: "Coordinate Plane" },
  { id: "g5m_cp08", question: "The point (0, 0) is called the ___.",                                 answer: "origin",     group: "Coordinate Plane" },
  { id: "g5m_cp09", question: "A point at (−4, 0) lies on which axis?",                              answer: "x-axis",     group: "Coordinate Plane" },
  { id: "g5m_cp10", question: "In Quadrant II, the x-coordinate is ___ and the y-coordinate is ___.", answer: "negative, positive", group: "Coordinate Plane" },
];

/* ---- 5th Grade Reading ------------------------------------- */
const GRADE5_READING = [
  // Figurative Language — literary analysis (12 items)
  { id: "g5r_fl01", question: "'Life is a journey, not a destination' is a ___.",                       answer: "metaphor",        group: "Figurative Language" },
  { id: "g5r_fl02", question: "'The thunder growled angrily' gives human traits to thunder. This is ___.", answer: "personification", group: "Figurative Language" },
  { id: "g5r_fl03", question: "An author uses short choppy sentences during a chase scene. This creates ___.", answer: "tension",    group: "Figurative Language" },
  { id: "g5r_fl04", question: "'I have told you a million times!' is an example of ___.",               answer: "hyperbole",       group: "Figurative Language" },
  { id: "g5r_fl05", question: "The phrase 'break a leg' is an example of ___.",                         answer: "idiom",           group: "Figurative Language" },
  { id: "g5r_fl06", question: "'Peter Piper picked a peck of pickled peppers' uses ___.",               answer: "alliteration",    group: "Figurative Language" },
  { id: "g5r_fl07", question: "'Her laughter was a melody floating through the room' is a ___.",        answer: "metaphor",        group: "Figurative Language" },
  { id: "g5r_fl08", question: "'Spill the beans' is an idiom meaning ___.",                             answer: "reveal a secret", group: "Figurative Language" },
  { id: "g5r_fl09", question: "An author describes a faded, silent house using gloomy adjectives. This creates ___.", answer: "mood", group: "Figurative Language" },
  { id: "g5r_fl10", question: "'The old oak shivered in the winter wind' is ___.",                       answer: "personification", group: "Figurative Language" },
  { id: "g5r_fl11", question: "'She was as stubborn as a mule' is a ___.",                              answer: "simile",          group: "Figurative Language" },
  { id: "g5r_fl12", question: "Repeating a word or phrase at the start of lines for effect is ___.",    answer: "anaphora",        group: "Figurative Language" },
  // Literary Terms — analytical application (12 items)
  { id: "g5r_lt01", question: "The part of a story where the main conflict is solved is the ___.",      answer: "resolution",       group: "Literary Terms" },
  { id: "g5r_lt02", question: "When an author hints at future events it is called ___.",                answer: "foreshadowing",    group: "Literary Terms" },
  { id: "g5r_lt03", question: "A story told from the main character's view uses ___ person narration.", answer: "first",            group: "Literary Terms" },
  { id: "g5r_lt04", question: "A character starts selfish but learns generosity. This is called character ___.", answer: "development", group: "Literary Terms" },
  { id: "g5r_lt05", question: "An author uses a thunderstorm as a character faces her biggest fear. This weather is ___.", answer: "symbolism", group: "Literary Terms" },
  { id: "g5r_lt06", question: "A story's narrator knows the thoughts of every character. This is ___ point of view.", answer: "third person omniscient", group: "Literary Terms" },
  { id: "g5r_lt07", question: "A story flashes back to a childhood memory to explain a character's fear. This device is ___.", answer: "flashback", group: "Literary Terms" },
  { id: "g5r_lt08", question: "To support a claim with text evidence means to quote ___.",             answer: "from the text",    group: "Literary Terms" },
  { id: "g5r_lt09", question: "A character who does not change throughout a story is called ___.",      answer: "static",           group: "Literary Terms" },
  { id: "g5r_lt10", question: "The central message or lesson of a story is its ___.",                  answer: "theme",            group: "Literary Terms" },
  { id: "g5r_lt11", question: "When events are listed in order from first to last, they are in ___ order.", answer: "chronological", group: "Literary Terms" },
  { id: "g5r_lt12", question: "An author writes a harsh villain and a kind hero to create ___.",        answer: "contrast",         group: "Literary Terms" },
  // Grammar — analytical (12 items)
  { id: "g5r_gr01", question: "Which is correct: 'Between you and I' or 'Between you and me'?",       answer: "Between you and me", group: "Grammar" },
  { id: "g5r_gr02", question: "Identify the error: 'The team are playing well.'",                      answer: "team is",          group: "Grammar" },
  { id: "g5r_gr03", question: "'Although it was raining' — this clause needs a ___ to be a sentence.", answer: "main clause",      group: "Grammar" },
  { id: "g5r_gr04", question: "Which is correct: 'Me and Jake went' or 'Jake and I went'?",           answer: "Jake and I went",  group: "Grammar" },
  { id: "g5r_gr05", question: "'She reluctantly agreed.' What part of speech is 'reluctantly'?",       answer: "adverb",           group: "Grammar" },
  { id: "g5r_gr06", question: "Identify the conjunction: 'I wanted to go, but it was raining.'",      answer: "but",              group: "Grammar" },
  { id: "g5r_gr07", question: "'Running to class' is a sentence fragment because it has no ___.",      answer: "subject",          group: "Grammar" },
  { id: "g5r_gr08", question: "A complex sentence has an independent and a ___ clause.",               answer: "dependent",        group: "Grammar" },
  { id: "g5r_gr09", question: "Which sentence uses the correct pronoun: 'Her and I talked' or 'She and I talked'?", answer: "She and I talked", group: "Grammar" },
  { id: "g5r_gr10", question: "'The swift fox leaped gracefully.' What part of speech is 'gracefully'?", answer: "adverb",         group: "Grammar" },
  { id: "g5r_gr11", question: "Which is a run-on? 'I ran I fell' or 'I ran and fell'?",               answer: "I ran I fell",     group: "Grammar" },
  { id: "g5r_gr12", question: "In 'The dog that barked all night kept us awake,' the underlined clause is a ___ clause.", answer: "relative", group: "Grammar" },
  // Vocabulary — Greek/Latin roots (chron, graph, tele, vis, bene, mal) + context (12 items)
  { id: "g5r_vo01", question: "The root 'chron' means time. A chronological story is told ___.",       answer: "in time order",    group: "Vocabulary" },
  { id: "g5r_vo02", question: "The root 'bene' means good. A benefactor provides ___.",                answer: "help or support",  group: "Vocabulary" },
  { id: "g5r_vo03", question: "The root 'mal' means bad. A malfunction is when something ___.",        answer: "stops working",    group: "Vocabulary" },
  { id: "g5r_vo04", question: "The root 'graph' means write. What does an autograph mean?",            answer: "self-written signature", group: "Vocabulary" },
  { id: "g5r_vo05", question: "The root 'tele' means far. A telephone lets you speak to people ___.", answer: "far away",         group: "Vocabulary" },
  { id: "g5r_vo06", question: "The root 'vis' means see. What does 'invisible' mean?",                 answer: "cannot be seen",   group: "Vocabulary" },
  { id: "g5r_vo07", question: "The root 'chron' is in 'synchronize.' Synchronize means to happen ___.", answer: "at the same time", group: "Vocabulary" },
  { id: "g5r_vo08", question: "The root 'mal' is in 'malicious.' A malicious person intends to ___.", answer: "cause harm",       group: "Vocabulary" },
  { id: "g5r_vo09", question: "The historian examined crumbling manuscripts to piece together the narrative. Manuscripts are ___.", answer: "handwritten documents", group: "Vocabulary" },
  { id: "g5r_vo10", question: "The root 'bene' is in 'beneficial.' Something beneficial is ___.",      answer: "good or helpful",  group: "Vocabulary" },
  { id: "g5r_vo11", question: "The root 'tele' is in 'telescope.' A telescope helps you see ___.",    answer: "distant objects",  group: "Vocabulary" },
  { id: "g5r_vo12", question: "The root 'graph' is in 'biography.' A biography is a written account of a person's ___.", answer: "life", group: "Vocabulary" },
  // Reading Passages (2 items)
  { id: "g5r_pass01", question: "Read: 'The ancient lighthouse keeper stood unmoved as another thousand waves crashed below. He had outlasted storms before and would outlast them again.' — What literary device is 'another thousand waves'?", answer: "hyperbole", group: "Reading Passages" },
  { id: "g5r_pass02", question: "Read: 'By the time the army arrived, the city was already a ghost — empty streets, shuttered windows, the only sound the hollow echo of footsteps.' — What figurative language technique is used in 'the city was a ghost'?", answer: "metaphor", group: "Reading Passages" },
];

/* ---- 3rd Grade Science ------------------------------------- */
const GRADE3_SCIENCE = [
  // Life Science (15 items)
  { id: "g3s_ls01", question: "The process by which plants make food using sunlight is called ___.", answer: "photosynthesis",   group: "Life Science" },
  { id: "g3s_ls02", question: "An animal that only eats plants is called a ___.",                   answer: "herbivore",        group: "Life Science" },
  { id: "g3s_ls03", question: "Which part of a plant makes seeds?",                                 answer: "flower",           group: "Life Science" },
  { id: "g3s_ls04", question: "Roots absorb ___ from the soil for the plant.",                      answer: "water",            group: "Life Science" },
  { id: "g3s_ls05", question: "Leaves make food for a plant through ___.",                          answer: "photosynthesis",   group: "Life Science" },
  { id: "g3s_ls06", question: "A duck's webbed feet help it ___.",                                  answer: "swim",             group: "Life Science" },
  { id: "g3s_ls07", question: "The order of a butterfly's life cycle is: egg → ___ → pupa → adult.", answer: "larva",          group: "Life Science" },
  { id: "g3s_ls08", question: "A frog eats insects. The frog is a ___.",                            answer: "consumer",         group: "Life Science" },
  { id: "g3s_ls09", question: "An organism that breaks down dead plants and animals is a ___.",     answer: "decomposer",       group: "Life Science" },
  { id: "g3s_ls10", question: "An organism that makes its own food using sunlight is a ___.",       answer: "producer",         group: "Life Science" },
  { id: "g3s_ls11", question: "A beaver's flat tail and webbed feet are examples of ___.",          answer: "adaptations",      group: "Life Science" },
  { id: "g3s_ls12", question: "The place where an animal lives and finds food is its ___.",         answer: "habitat",          group: "Life Science" },
  { id: "g3s_ls13", question: "A pond, a forest, and a desert are each examples of an ___.",        answer: "ecosystem",        group: "Life Science" },
  { id: "g3s_ls14", question: "An animal that eats both plants and animals is called an ___.",      answer: "omnivore",         group: "Life Science" },
  { id: "g3s_ls15", question: "In a food chain, energy flows from ___ to consumers.",              answer: "producers",        group: "Life Science" },
  // Earth Science (15 items)
  { id: "g3s_es01", question: "When water vapor cools and turns into clouds, this is called ___.", answer: "condensation",     group: "Earth Science" },
  { id: "g3s_es02", question: "Which type of rock forms from cooled lava?",                         answer: "igneous",          group: "Earth Science" },
  { id: "g3s_es03", question: "The wearing away of rock and soil by wind or water is called ___.", answer: "erosion",          group: "Earth Science" },
  { id: "g3s_es04", question: "When liquid water heats up and becomes water vapor, this is ___.",   answer: "evaporation",      group: "Earth Science" },
  { id: "g3s_es05", question: "Water that falls from clouds as rain or snow is called ___.",        answer: "precipitation",    group: "Earth Science" },
  { id: "g3s_es06", question: "The average weather of a place over many years is its ___.",         answer: "climate",          group: "Earth Science" },
  { id: "g3s_es07", question: "Rocks formed from layers of sediment pressed together are ___.",    answer: "sedimentary",      group: "Earth Science" },
  { id: "g3s_es08", question: "Rocks changed by heat and pressure underground are called ___.",     answer: "metamorphic",      group: "Earth Science" },
  { id: "g3s_es09", question: "The remains or traces of ancient living things found in rocks are ___.", answer: "fossils",      group: "Earth Science" },
  { id: "g3s_es10", question: "Wind, water, and ice can all cause ___.",                            answer: "erosion",          group: "Earth Science" },
  { id: "g3s_es11", question: "Solar energy and wind are examples of ___ resources.",              answer: "renewable",        group: "Earth Science" },
  { id: "g3s_es12", question: "Coal and oil are examples of ___ resources.",                        answer: "nonrenewable",     group: "Earth Science" },
  { id: "g3s_es13", question: "The thin layer of gases surrounding Earth is the ___.",              answer: "atmosphere",       group: "Earth Science" },
  { id: "g3s_es14", question: "The three main layers of Earth are the crust, mantle, and ___.",    answer: "core",             group: "Earth Science" },
  { id: "g3s_es15", question: "The continuous movement of water from Earth to sky and back is the ___.", answer: "water cycle",  group: "Earth Science" },
  // Physical Science (15 items)
  { id: "g3s_ps01", question: "The amount of space matter takes up is its ___.",                    answer: "volume",           group: "Physical Science" },
  { id: "g3s_ps02", question: "Which simple machine has a wheel with a rope around it?",            answer: "pulley",           group: "Physical Science" },
  { id: "g3s_ps03", question: "Sound travels as ___.",                                              answer: "vibrations",       group: "Physical Science" },
  { id: "g3s_ps04", question: "Ice, liquid water, and steam are all the same substance in different ___.", answer: "states",    group: "Physical Science" },
  { id: "g3s_ps05", question: "The three states of matter are solid, liquid, and ___.",             answer: "gas",              group: "Physical Science" },
  { id: "g3s_ps06", question: "The amount of matter in an object is its ___.",                      answer: "mass",             group: "Physical Science" },
  { id: "g3s_ps07", question: "A push or pull on an object is called a ___.",                       answer: "force",            group: "Physical Science" },
  { id: "g3s_ps08", question: "The force that pulls objects toward Earth is ___.",                  answer: "gravity",          group: "Physical Science" },
  { id: "g3s_ps09", question: "A magnet attracts objects made of ___.",                             answer: "iron",             group: "Physical Science" },
  { id: "g3s_ps10", question: "A ramp is an example of a simple machine called an ___.",            answer: "inclined plane",   group: "Physical Science" },
  { id: "g3s_ps11", question: "Like poles of two magnets will ___ each other.",                     answer: "repel",            group: "Physical Science" },
  { id: "g3s_ps12", question: "Light travels in ___.",                                              answer: "straight lines",   group: "Physical Science" },
  { id: "g3s_ps13", question: "A lever is a simple machine that helps you ___ a heavy object.",     answer: "lift",             group: "Physical Science" },
  { id: "g3s_ps14", question: "The ability to do work is called ___.",                              answer: "energy",           group: "Physical Science" },
  { id: "g3s_ps15", question: "Objects that have mass and take up space are made of ___.",          answer: "matter",           group: "Physical Science" },
];

/* ---- 3rd Grade Geography ----------------------------------- */
const GRADE3_GEOGRAPHY = [
  // Map Skills (12 items)
  { id: "g3g_ms01", question: "A map key explains the ___ on a map.",                               answer: "symbols",          group: "Map Skills" },
  { id: "g3g_ms02", question: "Lines of latitude run ___ on a map.",                                answer: "east-west",        group: "Map Skills" },
  { id: "g3g_ms03", question: "The cardinal direction opposite of North is ___.",                    answer: "South",            group: "Map Skills" },
  { id: "g3g_ms04", question: "A ___ shows direction on a map.",                                    answer: "compass rose",     group: "Map Skills" },
  { id: "g3g_ms05", question: "Lines of longitude run ___ on a map.",                               answer: "north-south",      group: "Map Skills" },
  { id: "g3g_ms06", question: "A map ___ is used to measure real distances on a map.",              answer: "scale",            group: "Map Skills" },
  { id: "g3g_ms07", question: "A map that shows mountains, rivers, and landforms is a ___ map.",   answer: "physical",         group: "Map Skills" },
  { id: "g3g_ms08", question: "A map that shows country and state borders is a ___ map.",          answer: "political",        group: "Map Skills" },
  { id: "g3g_ms09", question: "Northeast is an example of an ___ direction.",                       answer: "intermediate",     group: "Map Skills" },
  { id: "g3g_ms10", question: "The four cardinal directions are North, South, East, and ___.",      answer: "West",             group: "Map Skills" },
  { id: "g3g_ms11", question: "Latitude and longitude are used to find the ___ of a place.",        answer: "location",         group: "Map Skills" },
  { id: "g3g_ms12", question: "A globe is a model of ___.",                                         answer: "Earth",            group: "Map Skills" },
  // Landforms (12 items)
  { id: "g3g_lf01", question: "Land surrounded on three sides by water is a ___.",                  answer: "peninsula",        group: "Landforms" },
  { id: "g3g_lf02", question: "A large flat area of land is a ___.",                                answer: "plain",            group: "Landforms" },
  { id: "g3g_lf03", question: "The Grand Canyon is an example of a ___.",                           answer: "canyon",           group: "Landforms" },
  { id: "g3g_lf04", question: "Land completely surrounded by water is called an ___.",              answer: "island",           group: "Landforms" },
  { id: "g3g_lf05", question: "A high flat area of land is called a ___.",                          answer: "plateau",          group: "Landforms" },
  { id: "g3g_lf06", question: "A low area of land between hills or mountains is a ___.",            answer: "valley",           group: "Landforms" },
  { id: "g3g_lf07", question: "A triangle-shaped area of land where a river meets the sea is a ___.", answer: "delta",         group: "Landforms" },
  { id: "g3g_lf08", question: "A part of an ocean or lake that curves into the land is a ___.",    answer: "bay",              group: "Landforms" },
  { id: "g3g_lf09", question: "A very dry area that gets very little rainfall is a ___.",           answer: "desert",           group: "Landforms" },
  { id: "g3g_lf10", question: "A wet forest that gets a lot of rain is a ___.",                     answer: "rainforest",       group: "Landforms" },
  { id: "g3g_lf11", question: "A frozen, treeless land in the far north is called ___.",            answer: "tundra",           group: "Landforms" },
  { id: "g3g_lf12", question: "The highest type of landform is a ___.",                             answer: "mountain",         group: "Landforms" },
  // US Regions (12 items)
  { id: "g3g_ur01", question: "Florida is in the ___ region of the US.",                            answer: "Southeast",        group: "US Regions" },
  { id: "g3g_ur02", question: "Which region includes states like Texas and Arizona?",               answer: "Southwest",        group: "US Regions" },
  { id: "g3g_ur03", question: "The Great Lakes are located in the ___ region.",                     answer: "Midwest",          group: "US Regions" },
  { id: "g3g_ur04", question: "New York and Massachusetts are in the ___ region.",                  answer: "Northeast",        group: "US Regions" },
  { id: "g3g_ur05", question: "California and Oregon are in the ___ region.",                       answer: "West",             group: "US Regions" },
  { id: "g3g_ur06", question: "The five US regions are Northeast, Southeast, Midwest, Southwest, and ___.", answer: "West",     group: "US Regions" },
  { id: "g3g_ur07", question: "Which region is known for wide, flat plains and farms?",             answer: "Midwest",          group: "US Regions" },
  { id: "g3g_ur08", question: "The Rocky Mountains are mainly in the ___ region.",                  answer: "West",             group: "US Regions" },
  { id: "g3g_ur09", question: "Which region borders the Gulf of Mexico?",                           answer: "Southeast",        group: "US Regions" },
  { id: "g3g_ur10", question: "Which region includes the state of Colorado?",                       answer: "West",             group: "US Regions" },
  { id: "g3g_ur11", question: "Which region includes Ohio, Illinois, and Indiana?",                 answer: "Midwest",          group: "US Regions" },
  { id: "g3g_ur12", question: "Which US region is home to the Appalachian Mountains?",              answer: "Northeast",        group: "US Regions" },
];

/* ---- 4th Grade Science ------------------------------------- */
const GRADE4_SCIENCE = [
  // Life Science (15 items)
  { id: "g4s_ls01", question: "The part of the cell that controls the cell's activities is the ___.", answer: "nucleus",        group: "Life Science" },
  { id: "g4s_ls02", question: "Which body system pumps blood?",                                      answer: "circulatory",    group: "Life Science" },
  { id: "g4s_ls03", question: "In a food web, energy flows from ___ to consumers.",                  answer: "producers",      group: "Life Science" },
  { id: "g4s_ls04", question: "A plant cell has a ___ wall that an animal cell does not have.",      answer: "cell",           group: "Life Science" },
  { id: "g4s_ls05", question: "The cell ___ controls what enters and leaves a cell.",                answer: "membrane",       group: "Life Science" },
  { id: "g4s_ls06", question: "Which body system breaks down food?",                                 answer: "digestive",      group: "Life Science" },
  { id: "g4s_ls07", question: "Which body system takes in oxygen?",                                  answer: "respiratory",    group: "Life Science" },
  { id: "g4s_ls08", question: "Which body system supports and protects your body?",                  answer: "skeletal",       group: "Life Science" },
  { id: "g4s_ls09", question: "Which body system helps you move?",                                   answer: "muscular",       group: "Life Science" },
  { id: "g4s_ls10", question: "An ecosystem where one animal eats another and that one eats another is called a food ___.", answer: "web", group: "Life Science" },
  { id: "g4s_ls11", question: "The smallest unit of life is a ___.",                                 answer: "cell",           group: "Life Science" },
  { id: "g4s_ls12", question: "The heart, blood, and blood vessels make up the ___ system.",         answer: "circulatory",    group: "Life Science" },
  { id: "g4s_ls13", question: "The lungs are the main organs of the ___ system.",                    answer: "respiratory",    group: "Life Science" },
  { id: "g4s_ls14", question: "Groups of cells working together form a ___.",                        answer: "tissue",         group: "Life Science" },
  { id: "g4s_ls15", question: "Energy moves through an ecosystem from producers to ___.",            answer: "consumers",      group: "Life Science" },
  // Earth Science (15 items)
  { id: "g4s_es01", question: "Earth completes one rotation every ___.",                             answer: "24 hours",       group: "Earth Science" },
  { id: "g4s_es02", question: "Which planet is closest to the Sun?",                                 answer: "Mercury",        group: "Earth Science" },
  { id: "g4s_es03", question: "The name for a sudden shaking of Earth's crust is a(n) ___.",        answer: "earthquake",     group: "Earth Science" },
  { id: "g4s_es04", question: "Earth completes one revolution around the Sun every ___.",            answer: "365 days",       group: "Earth Science" },
  { id: "g4s_es05", question: "The eight planets in order from the Sun — first is Mercury, then ___.", answer: "Venus",       group: "Earth Science" },
  { id: "g4s_es06", question: "The moon phase when the entire moon face is lit is a ___ moon.",     answer: "full",           group: "Earth Science" },
  { id: "g4s_es07", question: "Seasons are caused by Earth's ___ as it orbits the Sun.",            answer: "tilt",           group: "Earth Science" },
  { id: "g4s_es08", question: "A mountain that can erupt with lava is a ___.",                       answer: "volcano",        group: "Earth Science" },
  { id: "g4s_es09", question: "The theory that Earth's continents were once joined is called ___.", answer: "continental drift", group: "Earth Science" },
  { id: "g4s_es10", question: "A large wave caused by an underwater earthquake is a ___.",           answer: "tsunami",        group: "Earth Science" },
  { id: "g4s_es11", question: "The planets that are closest to the Sun are called ___ planets.",     answer: "inner",          group: "Earth Science" },
  { id: "g4s_es12", question: "The Sun, planets, and moons make up our ___.",                        answer: "solar system",   group: "Earth Science" },
  { id: "g4s_es13", question: "A comet is a ball of ice and rock that travels around the ___.",     answer: "Sun",            group: "Earth Science" },
  { id: "g4s_es14", question: "What causes day and night on Earth?",                                 answer: "rotation",       group: "Earth Science" },
  { id: "g4s_es15", question: "The moon phase when none of the moon face is lit is a ___ moon.",   answer: "new",            group: "Earth Science" },
  // Physical Science (12 items)
  { id: "g4s_ps01", question: "A ball rolling down a hill has ___ energy.",                          answer: "kinetic",        group: "Physical Science" },
  { id: "g4s_ps02", question: "A ball at the top of a hill has ___ energy.",                         answer: "potential",      group: "Physical Science" },
  { id: "g4s_ps03", question: "Which material is a good conductor of electricity?",                  answer: "copper",         group: "Physical Science" },
  { id: "g4s_ps04", question: "A burning candle is an example of a ___ change.",                    answer: "chemical",       group: "Physical Science" },
  { id: "g4s_ps05", question: "Cutting paper is an example of a ___ change.",                       answer: "physical",       group: "Physical Science" },
  { id: "g4s_ps06", question: "An electric circuit that has a break and does not flow is an ___ circuit.", answer: "open",     group: "Physical Science" },
  { id: "g4s_ps07", question: "An electric circuit where current can flow is a ___ circuit.",        answer: "closed",         group: "Physical Science" },
  { id: "g4s_ps08", question: "Rubber and plastic are good ___ of electricity.",                    answer: "insulators",     group: "Physical Science" },
  { id: "g4s_ps09", question: "Energy stored in food and fuel is ___ energy.",                       answer: "chemical",       group: "Physical Science" },
  { id: "g4s_ps10", question: "Heat energy is also called ___ energy.",                              answer: "thermal",        group: "Physical Science" },
  { id: "g4s_ps11", question: "Light, heat, and sound are all forms of ___.",                        answer: "energy",         group: "Physical Science" },
  { id: "g4s_ps12", question: "When ice melts, it is a ___ change because no new substance forms.", answer: "physical",       group: "Physical Science" },
  // Florida Ecosystems (12 items)
  { id: "g4s_fe01", question: "The Everglades is an example of a ___ ecosystem.",                   answer: "wetland",        group: "Florida Ecosystems" },
  { id: "g4s_fe02", question: "The Florida panther is considered ___ because very few remain.",      answer: "endangered",     group: "Florida Ecosystems" },
  { id: "g4s_fe03", question: "Mangrove trees protect Florida coastlines from ___.",                 answer: "erosion",        group: "Florida Ecosystems" },
  { id: "g4s_fe04", question: "Coral reefs are found in ___ water near Florida's coast.",           answer: "shallow",        group: "Florida Ecosystems" },
  { id: "g4s_fe05", question: "An animal that is not native and harms local wildlife is called ___.", answer: "invasive",     group: "Florida Ecosystems" },
  { id: "g4s_fe06", question: "The manatee is a large marine mammal that eats ___.",                 answer: "plants",         group: "Florida Ecosystems" },
  { id: "g4s_fe07", question: "Sea turtles come to Florida beaches to ___.",                         answer: "lay eggs",       group: "Florida Ecosystems" },
  { id: "g4s_fe08", question: "Cypress swamps are common in ___ Florida.",                           answer: "northern",       group: "Florida Ecosystems" },
  { id: "g4s_fe09", question: "The Florida scrub habitat is home to many ___ species.",              answer: "rare",           group: "Florida Ecosystems" },
  { id: "g4s_fe10", question: "Mangrove roots provide shelter for young fish and ___.",              answer: "wildlife",       group: "Florida Ecosystems" },
  { id: "g4s_fe11", question: "Coral reefs are important because they support ___ of ocean life.",   answer: "diversity",      group: "Florida Ecosystems" },
  { id: "g4s_fe12", question: "The Everglades is nicknamed the River of ___.",                       answer: "Grass",          group: "Florida Ecosystems" },
];

/* ---- 4th Grade Geography ----------------------------------- */
const GRADE4_GEOGRAPHY = [
  // World Geography (15 items)
  { id: "g4g_wg01", question: "Which is the largest continent?",                                     answer: "Asia",           group: "World Geography" },
  { id: "g4g_wg02", question: "The equator divides Earth into the Northern and ___ hemispheres.",   answer: "Southern",       group: "World Geography" },
  { id: "g4g_wg03", question: "The longest river in the world is the ___.",                          answer: "Nile",           group: "World Geography" },
  { id: "g4g_wg04", question: "How many continents are there?",                                      answer: "7",              group: "World Geography" },
  { id: "g4g_wg05", question: "How many oceans are there?",                                          answer: "5",              group: "World Geography" },
  { id: "g4g_wg06", question: "The largest ocean in the world is the ___.",                          answer: "Pacific",        group: "World Geography" },
  { id: "g4g_wg07", question: "The world's highest mountain range is the ___.",                      answer: "Himalayas",      group: "World Geography" },
  { id: "g4g_wg08", question: "The largest desert in the world is the ___.",                         answer: "Sahara",         group: "World Geography" },
  { id: "g4g_wg09", question: "The imaginary line at 0° longitude is the ___ meridian.",            answer: "prime",          group: "World Geography" },
  { id: "g4g_wg10", question: "The tropics are located near the ___.",                               answer: "equator",        group: "World Geography" },
  { id: "g4g_wg11", question: "The Amazon River is located in ___.",                                 answer: "South America",  group: "World Geography" },
  { id: "g4g_wg12", question: "The Andes mountain range runs along the coast of ___.",               answer: "South America",  group: "World Geography" },
  { id: "g4g_wg13", question: "The Gobi Desert is located in ___.",                                  answer: "Asia",           group: "World Geography" },
  { id: "g4g_wg14", question: "The Alps mountain range is in ___.",                                  answer: "Europe",         group: "World Geography" },
  { id: "g4g_wg15", question: "The prime meridian and equator are both examples of ___ lines.",     answer: "imaginary",      group: "World Geography" },
  // US Geography (15 items)
  { id: "g4g_us01", question: "Which mountain range runs along the eastern US?",                     answer: "Appalachians",   group: "US Geography" },
  { id: "g4g_us02", question: "How many Great Lakes are there?",                                     answer: "5",              group: "US Geography" },
  { id: "g4g_us03", question: "The Mississippi River flows into the Gulf of ___.",                   answer: "Mexico",         group: "US Geography" },
  { id: "g4g_us04", question: "Which mountain range runs along the western US?",                     answer: "Rockies",        group: "US Geography" },
  { id: "g4g_us05", question: "The Great Lakes border the US and ___.",                              answer: "Canada",         group: "US Geography" },
  { id: "g4g_us06", question: "The Colorado River carved the ___.",                                  answer: "Grand Canyon",   group: "US Geography" },
  { id: "g4g_us07", question: "The Sierra Nevada mountain range is in the state of ___.",            answer: "California",     group: "US Geography" },
  { id: "g4g_us08", question: "The Missouri River is a major tributary of the ___ River.",           answer: "Mississippi",    group: "US Geography" },
  { id: "g4g_us09", question: "The Ohio River forms the border between Ohio and ___.",               answer: "Kentucky",       group: "US Geography" },
  { id: "g4g_us10", question: "Puerto Rico and Guam are US ___.",                                    answer: "territories",    group: "US Geography" },
  { id: "g4g_us11", question: "The largest US state by area is ___.",                                answer: "Alaska",         group: "US Geography" },
  { id: "g4g_us12", question: "Death Valley, the lowest point in the US, is in ___.",               answer: "California",     group: "US Geography" },
  { id: "g4g_us13", question: "The Appalachian Mountains stretch from Georgia to ___.",              answer: "Maine",          group: "US Geography" },
  { id: "g4g_us14", question: "The Great Plains region of the US is mainly used for ___.",           answer: "farming",        group: "US Geography" },
  { id: "g4g_us15", question: "The Rio Grande River forms part of the border between the US and ___.", answer: "Mexico",      group: "US Geography" },
  // Economics Basics (12 items)
  { id: "g4g_ec01", question: "When a product is rare and people want it, its price usually ___.",   answer: "rises",          group: "Economics Basics" },
  { id: "g4g_ec02", question: "Opportunity cost is what you ___ when you make a choice.",           answer: "give up",        group: "Economics Basics" },
  { id: "g4g_ec03", question: "A haircut is an example of a ___.",                                   answer: "service",        group: "Economics Basics" },
  { id: "g4g_ec04", question: "A pair of shoes is an example of a ___.",                             answer: "good",           group: "Economics Basics" },
  { id: "g4g_ec05", question: "When demand goes up and supply stays the same, price usually ___.",   answer: "rises",          group: "Economics Basics" },
  { id: "g4g_ec06", question: "Goods brought into a country from another country are called ___.",   answer: "imports",        group: "Economics Basics" },
  { id: "g4g_ec07", question: "Goods sent to other countries are called ___.",                       answer: "exports",        group: "Economics Basics" },
  { id: "g4g_ec08", question: "When there is not enough of something for everyone who wants it, there is a ___.", answer: "scarcity", group: "Economics Basics" },
  { id: "g4g_ec09", question: "Someone who starts a new business is called an ___.",                 answer: "entrepreneur",   group: "Economics Basics" },
  { id: "g4g_ec10", question: "The exchange of goods and services between buyers and sellers is called ___.", answer: "trade",   group: "Economics Basics" },
  { id: "g4g_ec11", question: "A person who buys and uses goods and services is a ___.",             answer: "consumer",       group: "Economics Basics" },
  { id: "g4g_ec12", question: "A person or company that makes goods or provides services is a ___.", answer: "producer",       group: "Economics Basics" },
];

/* ---- 5th Grade Science ------------------------------------- */
const GRADE5_SCIENCE = [
  // Life Science (15 items)
  { id: "g5s_ls01", question: "The scientific name of an organism uses its ___ and species.",        answer: "genus",          group: "Life Science" },
  { id: "g5s_ls02", question: "The process that plants use to make food is ___.",                    answer: "photosynthesis", group: "Life Science" },
  { id: "g5s_ls03", question: "A trait passed from parent to offspring is called a(n) ___ trait.",  answer: "inherited",      group: "Life Science" },
  { id: "g5s_ls04", question: "The order of classification from broadest to smallest is Kingdom, Phylum, Class, Order, Family, Genus, ___.", answer: "Species", group: "Life Science" },
  { id: "g5s_ls05", question: "A mnemonic for classification levels is 'King Philip Came Over For ___ Soup'.", answer: "Good", group: "Life Science" },
  { id: "g5s_ls06", question: "The process by which organisms better suited to their environment survive is ___.", answer: "natural selection", group: "Life Science" },
  { id: "g5s_ls07", question: "A large community of plants and animals living in a region is a ___.", answer: "biome",         group: "Life Science" },
  { id: "g5s_ls08", question: "DNA carries the ___ for an organism.",                                answer: "genetic information", group: "Life Science" },
  { id: "g5s_ls09", question: "Cellular respiration releases ___ stored in food.",                   answer: "energy",         group: "Life Science" },
  { id: "g5s_ls10", question: "A trait that an organism develops because of its environment is ___.", answer: "acquired",       group: "Life Science" },
  { id: "g5s_ls11", question: "The tundra, rainforest, and desert are examples of ___.",             answer: "biomes",         group: "Life Science" },
  { id: "g5s_ls12", question: "The kingdom that includes mushrooms and mold is ___.",                answer: "Fungi",          group: "Life Science" },
  { id: "g5s_ls13", question: "The photosynthesis equation takes in water and CO2 and releases ___.", answer: "oxygen",        group: "Life Science" },
  { id: "g5s_ls14", question: "Organisms with a backbone are called ___.",                           answer: "vertebrates",    group: "Life Science" },
  { id: "g5s_ls15", question: "Organisms without a backbone are called ___.",                        answer: "invertebrates",  group: "Life Science" },
  // Earth & Space (15 items)
  { id: "g5s_ea01", question: "Which planet has the most moons?",                                    answer: "Saturn",         group: "Earth & Space" },
  { id: "g5s_ea02", question: "A light-year measures ___.",                                          answer: "distance",       group: "Earth & Space" },
  { id: "g5s_ea03", question: "Which layer of Earth is liquid metal?",                               answer: "outer core",     group: "Earth & Space" },
  { id: "g5s_ea04", question: "The asteroid belt is located between Mars and ___.",                  answer: "Jupiter",        group: "Earth & Space" },
  { id: "g5s_ea05", question: "Earth's seasons are caused by its ___ on its axis.",                 answer: "tilt",           group: "Earth & Space" },
  { id: "g5s_ea06", question: "A rocky body that orbits the Sun but is smaller than a planet is a ___.", answer: "asteroid",   group: "Earth & Space" },
  { id: "g5s_ea07", question: "A ball of ice and dust that forms a glowing tail near the Sun is a ___.", answer: "comet",      group: "Earth & Space" },
  { id: "g5s_ea08", question: "The inner planets are Mercury, Venus, Earth, and ___.",               answer: "Mars",           group: "Earth & Space" },
  { id: "g5s_ea09", question: "The rock cycle shows how rocks change between igneous, sedimentary, and ___.", answer: "metamorphic", group: "Earth & Space" },
  { id: "g5s_ea10", question: "Water that soaks into the ground and flows through soil is called ___.", answer: "groundwater", group: "Earth & Space" },
  { id: "g5s_ea11", question: "Water released by plant leaves into the air is called ___.",          answer: "transpiration",  group: "Earth & Space" },
  { id: "g5s_ea12", question: "The large sections of Earth's crust that move are called tectonic ___.", answer: "plates",      group: "Earth & Space" },
  { id: "g5s_ea13", question: "A star is a ball of very hot ___ held together by gravity.",          answer: "gas",            group: "Earth & Space" },
  { id: "g5s_ea14", question: "The galaxy that contains our solar system is called the ___.",        answer: "Milky Way",      group: "Earth & Space" },
  { id: "g5s_ea15", question: "The outermost layer of Earth is the ___.",                            answer: "crust",          group: "Earth & Space" },
  // Physical Science (15 items)
  { id: "g5s_ps01", question: "Newton's First Law states that an object at rest stays at rest unless acted on by a(n) ___ force.", answer: "unbalanced", group: "Physical Science" },
  { id: "g5s_ps02", question: "The number of waves that pass a point per second is its ___.",        answer: "frequency",      group: "Physical Science" },
  { id: "g5s_ps03", question: "In a chemical reaction, the starting materials are called ___.",      answer: "reactants",      group: "Physical Science" },
  { id: "g5s_ps04", question: "Newton's Second Law: force equals mass times ___.",                   answer: "acceleration",   group: "Physical Science" },
  { id: "g5s_ps05", question: "Newton's Third Law: for every action there is an equal and opposite ___.", answer: "reaction",  group: "Physical Science" },
  { id: "g5s_ps06", question: "Speed in a specific direction is called ___.",                         answer: "velocity",       group: "Physical Science" },
  { id: "g5s_ps07", question: "In a chemical reaction, the substances produced are called ___.",     answer: "products",       group: "Physical Science" },
  { id: "g5s_ps08", question: "The height of a wave is its ___.",                                    answer: "amplitude",      group: "Physical Science" },
  { id: "g5s_ps09", question: "The distance between two wave peaks is the ___.",                     answer: "wavelength",     group: "Physical Science" },
  { id: "g5s_ps10", question: "The electromagnetic spectrum includes radio waves, microwaves, and visible ___.", answer: "light", group: "Physical Science" },
  { id: "g5s_ps11", question: "Work is done when a force causes an object to ___.",                  answer: "move",           group: "Physical Science" },
  { id: "g5s_ps12", question: "An element's atomic number equals the number of ___ in its nucleus.", answer: "protons",        group: "Physical Science" },
  { id: "g5s_ps13", question: "Balanced forces on an object result in ___ motion.",                  answer: "no change in",   group: "Physical Science" },
  { id: "g5s_ps14", question: "The rate of change in velocity is called ___.",                       answer: "acceleration",   group: "Physical Science" },
  { id: "g5s_ps15", question: "Distance divided by time equals ___.",                                answer: "speed",          group: "Physical Science" },
  // Scientific Method (12 items)
  { id: "g5s_sm01", question: "The variable that is changed in an experiment is the ___ variable.", answer: "independent",    group: "Scientific Method" },
  { id: "g5s_sm02", question: "The variable that is measured is the ___ variable.",                  answer: "dependent",      group: "Scientific Method" },
  { id: "g5s_sm03", question: "A scientific ___ is a well-tested explanation supported by much evidence.", answer: "theory",   group: "Scientific Method" },
  { id: "g5s_sm04", question: "A testable prediction about an experiment is called a ___.",          answer: "hypothesis",     group: "Scientific Method" },
  { id: "g5s_sm05", question: "Variables kept the same throughout an experiment are ___ variables.", answer: "controlled",     group: "Scientific Method" },
  { id: "g5s_sm06", question: "A conclusion is based on analyzing ___.",                             answer: "data",           group: "Scientific Method" },
  { id: "g5s_sm07", question: "When other scientists check your experiment, this is called ___.",    answer: "peer review",    group: "Scientific Method" },
  { id: "g5s_sm08", question: "A scientific law ___ what happens but does not explain why.",         answer: "describes",      group: "Scientific Method" },
  { id: "g5s_sm09", question: "Using your senses to gather information is called ___.",              answer: "observation",    group: "Scientific Method" },
  { id: "g5s_sm10", question: "An explanation based on observations, not direct measurement, is an ___.", answer: "inference", group: "Scientific Method" },
  { id: "g5s_sm11", question: "The first step of the scientific method is asking a ___.",            answer: "question",       group: "Scientific Method" },
  { id: "g5s_sm12", question: "Recording measurements and results during an experiment is collecting ___.", answer: "data",    group: "Scientific Method" },
];

/* ---- 5th Grade Geography ----------------------------------- */
const GRADE5_GEOGRAPHY = [
  // World History & Geography (15 items)
  { id: "g5g_wh01", question: "Christopher Columbus sailed for which country?",                      answer: "Spain",          group: "World History & Geography" },
  { id: "g5g_wh02", question: "The Maya civilization was located in ___.",                           answer: "Mesoamerica",    group: "World History & Geography" },
  { id: "g5g_wh03", question: "A document written by someone who witnessed an event is a ___ source.", answer: "primary",      group: "World History & Geography" },
  { id: "g5g_wh04", question: "The first European to circumnavigate the globe was ___.",             answer: "Magellan",       group: "World History & Geography" },
  { id: "g5g_wh05", question: "Juan Ponce de León explored ___.",                                    answer: "Florida",        group: "World History & Geography" },
  { id: "g5g_wh06", question: "The Aztec civilization was located in what is now ___.",              answer: "Mexico",         group: "World History & Geography" },
  { id: "g5g_wh07", question: "The Inca civilization was located in ___.",                           answer: "South America",  group: "World History & Geography" },
  { id: "g5g_wh08", question: "Ancient Egypt was located along the ___ River.",                      answer: "Nile",           group: "World History & Geography" },
  { id: "g5g_wh09", question: "Mesopotamia was located between the Tigris and ___ rivers.",         answer: "Euphrates",      group: "World History & Geography" },
  { id: "g5g_wh10", question: "A book written about an event using other sources is a ___ source.", answer: "secondary",      group: "World History & Geography" },
  { id: "g5g_wh11", question: "The spreading of ideas between cultures is called cultural ___.",     answer: "diffusion",      group: "World History & Geography" },
  { id: "g5g_wh12", question: "Ancient Rome was located in what is now ___.",                        answer: "Italy",          group: "World History & Geography" },
  { id: "g5g_wh13", question: "The Age of Exploration was a period when Europeans explored ___.",   answer: "new lands",      group: "World History & Geography" },
  { id: "g5g_wh14", question: "Amerigo Vespucci is credited with realizing the Americas were a ___.", answer: "new continent", group: "World History & Geography" },
  { id: "g5g_wh15", question: "Hernando de Soto was the first European to explore the ___.",        answer: "Mississippi River", group: "World History & Geography" },
  // Government & Civics (15 items)
  { id: "g5g_gc01", question: "Which branch of government makes laws?",                              answer: "legislative",    group: "Government & Civics" },
  { id: "g5g_gc02", question: "The First Amendment protects freedom of ___.",                        answer: "speech",         group: "Government & Civics" },
  { id: "g5g_gc03", question: "The system that prevents any one branch from having too much power is called ___.", answer: "checks and balances", group: "Government & Civics" },
  { id: "g5g_gc04", question: "Which branch of government enforces laws?",                           answer: "executive",      group: "Government & Civics" },
  { id: "g5g_gc05", question: "Which branch of government interprets laws?",                         answer: "judicial",       group: "Government & Civics" },
  { id: "g5g_gc06", question: "The first ten amendments to the Constitution are called the ___.",    answer: "Bill of Rights", group: "Government & Civics" },
  { id: "g5g_gc07", question: "The system where power is shared between state and national governments is called ___.", answer: "federalism", group: "Government & Civics" },
  { id: "g5g_gc08", question: "The Supreme Court is part of the ___ branch.",                        answer: "judicial",       group: "Government & Civics" },
  { id: "g5g_gc09", question: "The President leads the ___ branch of government.",                   answer: "executive",      group: "Government & Civics" },
  { id: "g5g_gc10", question: "Congress is made up of the Senate and the ___.",                     answer: "House of Representatives", group: "Government & Civics" },
  { id: "g5g_gc11", question: "The Fourth Amendment protects against unlawful ___.",                 answer: "searches",       group: "Government & Civics" },
  { id: "g5g_gc12", question: "The Constitution is the supreme ___ of the United States.",          answer: "law",            group: "Government & Civics" },
  { id: "g5g_gc13", question: "A citizen's right to vote is called ___.",                            answer: "suffrage",       group: "Government & Civics" },
  { id: "g5g_gc14", question: "The Second Amendment protects the right to ___.",                     answer: "bear arms",      group: "Government & Civics" },
  { id: "g5g_gc15", question: "The Fifth Amendment protects against being tried twice for the same crime, called ___.", answer: "double jeopardy", group: "Government & Civics" },
  // Economics (12 items)
  { id: "g5g_ec01", question: "The total value of goods and services produced in a country is its ___.", answer: "GDP",       group: "Economics" },
  { id: "g5g_ec02", question: "When prices rise over time, this is called ___.",                     answer: "inflation",      group: "Economics" },
  { id: "g5g_ec03", question: "Florida's number one industry is ___.",                               answer: "tourism",        group: "Economics" },
  { id: "g5g_ec04", question: "An economic system where the government controls all production is a ___ economy.", answer: "command", group: "Economics" },
  { id: "g5g_ec05", question: "An economic system where individuals make economic decisions is a ___ economy.", answer: "market", group: "Economics" },
  { id: "g5g_ec06", question: "A tax placed on imported goods is called a ___.",                     answer: "tariff",         group: "Economics" },
  { id: "g5g_ec07", question: "When countries depend on each other for goods, this is called economic ___.", answer: "interdependence", group: "Economics" },
  { id: "g5g_ec08", question: "The process of countries becoming more connected economically is ___.", answer: "globalization", group: "Economics" },
  { id: "g5g_ec09", question: "Florida's economy includes tourism, agriculture, aerospace, and ___.", answer: "ports",         group: "Economics" },
  { id: "g5g_ec10", question: "A formal agreement between countries about trade is a trade ___.",    answer: "agreement",      group: "Economics" },
  { id: "g5g_ec11", question: "GDP stands for Gross Domestic ___.",                                   answer: "Product",        group: "Economics" },
  { id: "g5g_ec12", question: "When supply goes up and demand stays the same, price usually ___.",   answer: "falls",          group: "Economics" },
];



/* ---- 3rd Grade Financial Literacy -------------------------- */
const GRADE3_FINANCIAL = [
  // Earning & Saving (12 items)
  { id: "g3f_es01", question: "Money you earn from working is called ___.",                         answer: "income",          group: "Earning & Saving" },
  { id: "g3f_es02", question: "Putting money aside for later is called ___.",                       answer: "saving",          group: "Earning & Saving" },
  { id: "g3f_es03", question: "A goal you save money for is a ___ goal.",                           answer: "financial",       group: "Earning & Saving" },
  { id: "g3f_es04", question: "Interest is money the bank pays you for ___.",                       answer: "saving",          group: "Earning & Saving" },
  { id: "g3f_es05", question: "Earning more than you spend creates ___.",                           answer: "savings",         group: "Earning & Saving" },
  { id: "g3f_es06", question: "A job you do to earn money is called ___.",                          answer: "employment",      group: "Earning & Saving" },
  { id: "g3f_es07", question: "What is the purpose of saving money?",                               answer: "future purchases", group: "Earning & Saving" },
  { id: "g3f_es08", question: "If you save $2 a week, in 5 weeks you have ___.",                    answer: "$10",             group: "Earning & Saving" },
  { id: "g3f_es09", question: "Entrepreneurs make money by starting a ___.",                        answer: "business",        group: "Earning & Saving" },
  { id: "g3f_es10", question: "A salary is money paid ___.",                                        answer: "weekly or monthly", group: "Earning & Saving" },
  { id: "g3f_es11", question: "Commission is pay based on ___.",                                    answer: "sales",           group: "Earning & Saving" },
  { id: "g3f_es12", question: "Tips are extra money given for ___.",                                answer: "good service",    group: "Earning & Saving" },
  // Spending & Budgeting (12 items)
  { id: "g3f_sb01", question: "A budget helps you plan how to ___ money.",                          answer: "spend",           group: "Spending & Budgeting" },
  { id: "g3f_sb02", question: "A need is something you ___ to survive.",                            answer: "must have",       group: "Spending & Budgeting" },
  { id: "g3f_sb03", question: "A want is something you ___ but don't need.",                        answer: "desire",          group: "Spending & Budgeting" },
  { id: "g3f_sb04", question: "If an item costs $5 and you have $3, you cannot ___.",               answer: "afford it",       group: "Spending & Budgeting" },
  { id: "g3f_sb05", question: "Comparing prices before buying is called ___ shopping.",             answer: "smart",           group: "Spending & Budgeting" },
  { id: "g3f_sb06", question: "Spending less than you earn means you are ___.",                     answer: "saving",          group: "Spending & Budgeting" },
  { id: "g3f_sb07", question: "Impulse buying means buying something without ___.",                 answer: "planning",        group: "Spending & Budgeting" },
  { id: "g3f_sb08", question: "A grocery list helps you avoid ___.",                                answer: "overspending",    group: "Spending & Budgeting" },
  { id: "g3f_sb09", question: "A receipt shows ___.",                                               answer: "what you bought", group: "Spending & Budgeting" },
  { id: "g3f_sb10", question: "Sales tax is added to the ___ of items.",                            answer: "price",           group: "Spending & Budgeting" },
  { id: "g3f_sb11", question: "A discount means the price is ___.",                                 answer: "lower",           group: "Spending & Budgeting" },
  { id: "g3f_sb12", question: "On sale means the item costs ___.",                                  answer: "less than usual", group: "Spending & Budgeting" },
  // Banking Basics (10 items)
  { id: "g3f_bb01", question: "A bank is a safe place to keep your ___.",                           answer: "money",           group: "Banking Basics" },
  { id: "g3f_bb02", question: "A savings account earns ___.",                                       answer: "interest",        group: "Banking Basics" },
  { id: "g3f_bb03", question: "A checking account is used for ___ spending.",                       answer: "everyday",        group: "Banking Basics" },
  { id: "g3f_bb04", question: "A debit card takes money from your ___.",                            answer: "bank account",    group: "Banking Basics" },
  { id: "g3f_bb05", question: "A credit card is ___ you borrow.",                                   answer: "money",           group: "Banking Basics" },
  { id: "g3f_bb06", question: "An ATM lets you ___ cash.",                                          answer: "withdraw",        group: "Banking Basics" },
  { id: "g3f_bb07", question: "Your PIN keeps your account ___.",                                   answer: "secure",          group: "Banking Basics" },
  { id: "g3f_bb08", question: "A bank statement shows your ___ history.",                           answer: "transaction",     group: "Banking Basics" },
  { id: "g3f_bb09", question: "FDIC protects bank deposits up to ___.",                             answer: "$250,000",        group: "Banking Basics" },
  { id: "g3f_bb10", question: "The purpose of a bank is to keep money ___.",                        answer: "safe",            group: "Banking Basics" },
];

/* ---- 3rd Grade Spanish ------------------------------------- */
const GRADE3_SPANISH = [
  // Numbers & Colors (15 items)
  { id: "g3sp_nc01", question: "The Spanish word for 'one' is ___.",                                answer: "uno",             group: "Numbers & Colors" },
  { id: "g3sp_nc02", question: "The Spanish word for 'two' is ___.",                                answer: "dos",             group: "Numbers & Colors" },
  { id: "g3sp_nc03", question: "'Rojo' means ___.",                                                 answer: "red",             group: "Numbers & Colors" },
  { id: "g3sp_nc04", question: "'Azul' means ___.",                                                 answer: "blue",            group: "Numbers & Colors" },
  { id: "g3sp_nc05", question: "'Verde' means ___.",                                                answer: "green",           group: "Numbers & Colors" },
  { id: "g3sp_nc06", question: "'Amarillo' means ___.",                                             answer: "yellow",          group: "Numbers & Colors" },
  { id: "g3sp_nc07", question: "'Tres' means ___.",                                                 answer: "three",           group: "Numbers & Colors" },
  { id: "g3sp_nc08", question: "'Diez' means ___.",                                                 answer: "ten",             group: "Numbers & Colors" },
  { id: "g3sp_nc09", question: "'Blanco' means ___.",                                               answer: "white",           group: "Numbers & Colors" },
  { id: "g3sp_nc10", question: "'Negro' means ___.",                                                answer: "black",           group: "Numbers & Colors" },
  { id: "g3sp_nc11", question: "'Cinco' means ___.",                                                answer: "five",            group: "Numbers & Colors" },
  { id: "g3sp_nc12", question: "'Ocho' means ___.",                                                 answer: "eight",           group: "Numbers & Colors" },
  { id: "g3sp_nc13", question: "'Naranja' means ___.",                                              answer: "orange",          group: "Numbers & Colors" },
  { id: "g3sp_nc14", question: "'Cuatro' means ___.",                                               answer: "four",            group: "Numbers & Colors" },
  { id: "g3sp_nc15", question: "'Morado' means ___.",                                               answer: "purple",          group: "Numbers & Colors" },
  // Greetings (12 items)
  { id: "g3sp_gr01", question: "'Hola' means ___.",                                                 answer: "hello",           group: "Greetings" },
  { id: "g3sp_gr02", question: "'Adiós' means ___.",                                                answer: "goodbye",         group: "Greetings" },
  { id: "g3sp_gr03", question: "'Buenos días' means ___.",                                          answer: "good morning",    group: "Greetings" },
  { id: "g3sp_gr04", question: "'Buenas noches' means ___.",                                        answer: "good night",      group: "Greetings" },
  { id: "g3sp_gr05", question: "'¿Cómo estás?' means ___.",                                         answer: "how are you",     group: "Greetings" },
  { id: "g3sp_gr06", question: "'Bien' means ___.",                                                 answer: "good/well",       group: "Greetings" },
  { id: "g3sp_gr07", question: "'Gracias' means ___.",                                              answer: "thank you",       group: "Greetings" },
  { id: "g3sp_gr08", question: "'De nada' means ___.",                                              answer: "you're welcome",  group: "Greetings" },
  { id: "g3sp_gr09", question: "'Por favor' means ___.",                                            answer: "please",          group: "Greetings" },
  { id: "g3sp_gr10", question: "'Sí' means ___.",                                                   answer: "yes",             group: "Greetings" },
  { id: "g3sp_gr11", question: "'No' means ___.",                                                   answer: "no",              group: "Greetings" },
  { id: "g3sp_gr12", question: "'Me llamo' means ___.",                                             answer: "my name is",      group: "Greetings" },
  // Family & School (12 items)
  { id: "g3sp_fs01", question: "'Mamá' means ___.",                                                 answer: "mom",             group: "Family & School" },
  { id: "g3sp_fs02", question: "'Papá' means ___.",                                                 answer: "dad",             group: "Family & School" },
  { id: "g3sp_fs03", question: "'Hermano' means ___.",                                              answer: "brother",         group: "Family & School" },
  { id: "g3sp_fs04", question: "'Hermana' means ___.",                                              answer: "sister",          group: "Family & School" },
  { id: "g3sp_fs05", question: "'Maestro' means ___.",                                              answer: "teacher (male)",  group: "Family & School" },
  { id: "g3sp_fs06", question: "'Escuela' means ___.",                                              answer: "school",          group: "Family & School" },
  { id: "g3sp_fs07", question: "'Libro' means ___.",                                                answer: "book",            group: "Family & School" },
  { id: "g3sp_fs08", question: "'Lápiz' means ___.",                                                answer: "pencil",          group: "Family & School" },
  { id: "g3sp_fs09", question: "'Amigo' means ___.",                                                answer: "friend (male)",   group: "Family & School" },
  { id: "g3sp_fs10", question: "'Clase' means ___.",                                                answer: "class",           group: "Family & School" },
  { id: "g3sp_fs11", question: "'Mesa' means ___.",                                                 answer: "table/desk",      group: "Family & School" },
  { id: "g3sp_fs12", question: "'Casa' means ___.",                                                 answer: "house",           group: "Family & School" },
];

/* ---- 3rd Grade French -------------------------------------- */
const GRADE3_FRENCH = [
  // Numbers & Colors (12 items)
  { id: "g3fr_nc01", question: "The French word for 'one' is ___.",                                 answer: "un",              group: "Numbers & Colors" },
  { id: "g3fr_nc02", question: "The French word for 'two' is ___.",                                 answer: "deux",            group: "Numbers & Colors" },
  { id: "g3fr_nc03", question: "'Trois' means ___.",                                                answer: "three",           group: "Numbers & Colors" },
  { id: "g3fr_nc04", question: "'Quatre' means ___.",                                               answer: "four",            group: "Numbers & Colors" },
  { id: "g3fr_nc05", question: "'Cinq' means ___.",                                                 answer: "five",            group: "Numbers & Colors" },
  { id: "g3fr_nc06", question: "'Rouge' means ___.",                                                answer: "red",             group: "Numbers & Colors" },
  { id: "g3fr_nc07", question: "'Bleu' means ___.",                                                 answer: "blue",            group: "Numbers & Colors" },
  { id: "g3fr_nc08", question: "'Vert' means ___.",                                                 answer: "green",           group: "Numbers & Colors" },
  { id: "g3fr_nc09", question: "'Jaune' means ___.",                                                answer: "yellow",          group: "Numbers & Colors" },
  { id: "g3fr_nc10", question: "'Blanc' means ___.",                                                answer: "white",           group: "Numbers & Colors" },
  { id: "g3fr_nc11", question: "'Noir' means ___.",                                                 answer: "black",           group: "Numbers & Colors" },
  { id: "g3fr_nc12", question: "'Dix' means ___.",                                                  answer: "ten",             group: "Numbers & Colors" },
  // Greetings (12 items)
  { id: "g3fr_gr01", question: "'Bonjour' means ___.",                                              answer: "hello/good day",  group: "Greetings" },
  { id: "g3fr_gr02", question: "'Au revoir' means ___.",                                            answer: "goodbye",         group: "Greetings" },
  { id: "g3fr_gr03", question: "'Bonsoir' means ___.",                                              answer: "good evening",    group: "Greetings" },
  { id: "g3fr_gr04", question: "'Bonne nuit' means ___.",                                           answer: "good night",      group: "Greetings" },
  { id: "g3fr_gr05", question: "'Comment ça va?' means ___.",                                       answer: "how is it going", group: "Greetings" },
  { id: "g3fr_gr06", question: "'Bien' means ___.",                                                 answer: "good/well",       group: "Greetings" },
  { id: "g3fr_gr07", question: "'Merci' means ___.",                                                answer: "thank you",       group: "Greetings" },
  { id: "g3fr_gr08", question: "'De rien' means ___.",                                              answer: "you're welcome",  group: "Greetings" },
  { id: "g3fr_gr09", question: "'S'il vous plaît' means ___.",                                      answer: "please",          group: "Greetings" },
  { id: "g3fr_gr10", question: "'Oui' means ___.",                                                  answer: "yes",             group: "Greetings" },
  { id: "g3fr_gr11", question: "'Non' means ___.",                                                  answer: "no",              group: "Greetings" },
  { id: "g3fr_gr12", question: "'Je m'appelle' means ___.",                                         answer: "my name is",      group: "Greetings" },
  // Family & School (12 items)
  { id: "g3fr_fs01", question: "'Maman' means ___.",                                                answer: "mom",             group: "Family & School" },
  { id: "g3fr_fs02", question: "'Papa' means ___.",                                                 answer: "dad",             group: "Family & School" },
  { id: "g3fr_fs03", question: "'Frère' means ___.",                                                answer: "brother",         group: "Family & School" },
  { id: "g3fr_fs04", question: "'Sœur' means ___.",                                                 answer: "sister",          group: "Family & School" },
  { id: "g3fr_fs05", question: "'Maître/Maîtresse' means ___.",                                     answer: "teacher",         group: "Family & School" },
  { id: "g3fr_fs06", question: "'École' means ___.",                                                answer: "school",          group: "Family & School" },
  { id: "g3fr_fs07", question: "'Livre' means ___.",                                                answer: "book",            group: "Family & School" },
  { id: "g3fr_fs08", question: "'Crayon' means ___.",                                               answer: "pencil",          group: "Family & School" },
  { id: "g3fr_fs09", question: "'Ami/Amie' means ___.",                                             answer: "friend",          group: "Family & School" },
  { id: "g3fr_fs10", question: "'Classe' means ___.",                                               answer: "class",           group: "Family & School" },
  { id: "g3fr_fs11", question: "'Table' means ___.",                                                answer: "table",           group: "Family & School" },
  { id: "g3fr_fs12", question: "'Maison' means ___.",                                               answer: "house",           group: "Family & School" },
];

/* ---- 4th Grade French -------------------------------------- */
const GRADE4_FRENCH = [
  // Verb Conjugation (12 items)
  { id: "g4fr_vc01", question: "Conjugate 'être' (to be) with 'je': Je ___ français.",              answer: "suis",            group: "Verb Conjugation" },
  { id: "g4fr_vc02", question: "Conjugate 'avoir' (to have) with 'tu': Tu ___ un chien.",           answer: "as",              group: "Verb Conjugation" },
  { id: "g4fr_vc03", question: "Conjugate 'parler' (to speak) with 'je': Je ___ français.",         answer: "parle",           group: "Verb Conjugation" },
  { id: "g4fr_vc04", question: "Conjugate 'manger' (to eat) with 'nous': Nous ___ ensemble.",       answer: "mangeons",        group: "Verb Conjugation" },
  { id: "g4fr_vc05", question: "Conjugate 'être' with 'il': Il ___ content.",                       answer: "est",             group: "Verb Conjugation" },
  { id: "g4fr_vc06", question: "Conjugate 'avoir' with 'nous': Nous ___ deux chats.",               answer: "avons",           group: "Verb Conjugation" },
  { id: "g4fr_vc07", question: "Conjugate 'parler' with 'tu': Tu ___ bien français.",               answer: "parles",          group: "Verb Conjugation" },
  { id: "g4fr_vc08", question: "Conjugate 'être' with 'nous': Nous ___ à l'école.",                 answer: "sommes",          group: "Verb Conjugation" },
  { id: "g4fr_vc09", question: "Conjugate 'manger' with 'je': Je ___ une pomme.",                   answer: "mange",           group: "Verb Conjugation" },
  { id: "g4fr_vc10", question: "Conjugate 'avoir' with 'il': Il ___ faim.",                         answer: "a",               group: "Verb Conjugation" },
  { id: "g4fr_vc11", question: "Conjugate 'parler' with 'ils': Ils ___ trop vite.",                 answer: "parlent",         group: "Verb Conjugation" },
  { id: "g4fr_vc12", question: "Conjugate 'être' with 'vous': Vous ___ en retard.",                 answer: "êtes",            group: "Verb Conjugation" },
  // Food & Meals (12 items)
  { id: "g4fr_fe01", question: "'Le pain' means ___.",                                              answer: "bread",           group: "Food & Meals" },
  { id: "g4fr_fe02", question: "'Le lait' means ___.",                                              answer: "milk",            group: "Food & Meals" },
  { id: "g4fr_fe03", question: "'L'eau' means ___.",                                                answer: "water",           group: "Food & Meals" },
  { id: "g4fr_fe04", question: "'La pomme' means ___.",                                             answer: "apple",           group: "Food & Meals" },
  { id: "g4fr_fe05", question: "'Le poulet' means ___.",                                            answer: "chicken",         group: "Food & Meals" },
  { id: "g4fr_fe06", question: "'Le riz' means ___.",                                               answer: "rice",            group: "Food & Meals" },
  { id: "g4fr_fe07", question: "'Le petit-déjeuner' means ___.",                                    answer: "breakfast",       group: "Food & Meals" },
  { id: "g4fr_fe08", question: "'Le déjeuner' means ___.",                                          answer: "lunch",           group: "Food & Meals" },
  { id: "g4fr_fe09", question: "'Le dîner' means ___.",                                             answer: "dinner",          group: "Food & Meals" },
  { id: "g4fr_fe10", question: "'J'ai faim' means ___.",                                            answer: "I am hungry",     group: "Food & Meals" },
  { id: "g4fr_fe11", question: "'J'ai soif' means ___.",                                            answer: "I am thirsty",    group: "Food & Meals" },
  { id: "g4fr_fe12", question: "'Le fromage' means ___.",                                           answer: "cheese",          group: "Food & Meals" },
  // Community & Places (12 items)
  { id: "g4fr_cp01", question: "'La bibliothèque' means ___.",                                      answer: "the library",     group: "Community & Places" },
  { id: "g4fr_cp02", question: "'La ville' means ___.",                                             answer: "the city",        group: "Community & Places" },
  { id: "g4fr_cp03", question: "'L'hôpital' means ___.",                                            answer: "the hospital",    group: "Community & Places" },
  { id: "g4fr_cp04", question: "'Le parc' means ___.",                                              answer: "the park",        group: "Community & Places" },
  { id: "g4fr_cp05", question: "'L'école' means ___.",                                              answer: "the school",      group: "Community & Places" },
  { id: "g4fr_cp06", question: "'La rue' means ___.",                                               answer: "the street",      group: "Community & Places" },
  { id: "g4fr_cp07", question: "'Le marché' means ___.",                                            answer: "the market",      group: "Community & Places" },
  { id: "g4fr_cp08", question: "'La banque' means ___.",                                            answer: "the bank",        group: "Community & Places" },
  { id: "g4fr_cp09", question: "'Le médecin' means ___.",                                           answer: "the doctor",      group: "Community & Places" },
  { id: "g4fr_cp10", question: "'Le pompier' means ___.",                                           answer: "the firefighter", group: "Community & Places" },
  { id: "g4fr_cp11", question: "'La police' means ___.",                                            answer: "the police",      group: "Community & Places" },
  { id: "g4fr_cp12", question: "'La gare' means ___.",                                              answer: "the train station", group: "Community & Places" },
];

/* ---- 5th Grade French -------------------------------------- */
const GRADE5_FRENCH = [
  // Past Tense (Passé Composé) (12 items)
  { id: "g5fr_pc01", question: "Conjugate 'parler' in passé composé with 'j'': J'___ avec mon ami.", answer: "ai parlé",       group: "Past Tense (Passé Composé)" },
  { id: "g5fr_pc02", question: "Conjugate 'manger' in passé composé with 'tu': Tu ___ une pizza.",   answer: "as mangé",       group: "Past Tense (Passé Composé)" },
  { id: "g5fr_pc03", question: "Conjugate 'finir' (to finish) in passé composé with 'il': Il ___ le livre.", answer: "a fini", group: "Past Tense (Passé Composé)" },
  { id: "g5fr_pc04", question: "Conjugate 'aller' (to go) in passé composé with 'je': Je ___ à l'école.", answer: "suis allé(e)", group: "Past Tense (Passé Composé)" },
  { id: "g5fr_pc05", question: "'Aller' uses ___ (not avoir) as the auxiliary in passé composé.",     answer: "être",           group: "Past Tense (Passé Composé)" },
  { id: "g5fr_pc06", question: "Conjugate 'parler' in passé composé with 'nous': Nous ___ français.", answer: "avons parlé",    group: "Past Tense (Passé Composé)" },
  { id: "g5fr_pc07", question: "Conjugate 'venir' (to come) in passé composé with 'elle': Elle ___ ici.", answer: "est venue",  group: "Past Tense (Passé Composé)" },
  { id: "g5fr_pc08", question: "The past participle of 'avoir' is ___.",                              answer: "eu",             group: "Past Tense (Passé Composé)" },
  { id: "g5fr_pc09", question: "The past participle of 'être' is ___.",                               answer: "été",            group: "Past Tense (Passé Composé)" },
  { id: "g5fr_pc10", question: "Conjugate 'manger' in passé composé with 'ils': Ils ___ ensemble.",  answer: "ont mangé",      group: "Past Tense (Passé Composé)" },
  { id: "g5fr_pc11", question: "'J'ai fini mes devoirs.' Translate to English.",                       answer: "I finished my homework.", group: "Past Tense (Passé Composé)" },
  { id: "g5fr_pc12", question: "With être verbs in passé composé, the past participle must agree with ___.", answer: "the subject", group: "Past Tense (Passé Composé)" },
  // Reading Comprehension (12 items)
  { id: "g5fr_rc01", question: "Lis et réponds: 'Pierre va à l'école chaque matin. Il aime les mathématiques.' Qu'est-ce que Pierre aime?", answer: "les mathématiques", group: "Reading Comprehension" },
  { id: "g5fr_rc02", question: "Lis et réponds: 'Marie a mangé une pomme et un sandwich. Elle a bu du lait.' Qu'est-ce que Marie a bu?", answer: "du lait", group: "Reading Comprehension" },
  { id: "g5fr_rc03", question: "Lis et réponds: 'Il pleuvait fort. Les enfants ont couru à la maison.' Pourquoi ont-ils couru?", answer: "parce qu'il pleuvait", group: "Reading Comprehension" },
  { id: "g5fr_rc04", question: "Lis et réponds: 'Le chat de Sophie s'appelle Minou. Il est noir et blanc.' De quelle couleur est Minou?", answer: "noir et blanc", group: "Reading Comprehension" },
  { id: "g5fr_rc05", question: "Lis et réponds: 'Luc a étudié toute la nuit. Il a eu un A à son examen.' Pourquoi a-t-il eu un A?", answer: "parce qu'il a étudié", group: "Reading Comprehension" },
  { id: "g5fr_rc06", question: "Lis et réponds: 'La famille Dupont habite à Paris depuis dix ans.' Depuis combien de temps habitent-ils à Paris?", answer: "dix ans", group: "Reading Comprehension" },
  { id: "g5fr_rc07", question: "Lis et réponds: 'Emma a lu cinq livres pendant les vacances. Elle adore lire.' Combien de livres a-t-elle lus?", answer: "cinq", group: "Reading Comprehension" },
  { id: "g5fr_rc08", question: "Lis et réponds: 'Le professeur a écrit les devoirs au tableau. Les élèves ont copié.' Qu'ont fait les élèves?", answer: "ils ont copié les devoirs", group: "Reading Comprehension" },
  { id: "g5fr_rc09", question: "Lis et réponds: 'Thomas n'a pas dormi. Il était très fatigué en classe.' Pourquoi était-il fatigué?", answer: "parce qu'il n'a pas dormi", group: "Reading Comprehension" },
  { id: "g5fr_rc10", question: "Lis et réponds: 'Il a plu samedi. Dimanche, il faisait beau et les enfants ont joué dehors.' Quand ont-ils joué dehors?", answer: "dimanche", group: "Reading Comprehension" },
  { id: "g5fr_rc11", question: "Lis et réponds: 'Le magasin a fermé à neuf heures. Marc est arrivé à neuf heures et quart.' Est-ce que Marc a pu entrer?", answer: "non", group: "Reading Comprehension" },
  { id: "g5fr_rc12", question: "Lis et réponds: 'Chloé parle français, anglais et espagnol.' Combien de langues parle-t-elle?", answer: "trois", group: "Reading Comprehension" },
  // French Culture (12 items)
  { id: "g5fr_cu01", question: "The Eiffel Tower is located in ___.",                                answer: "Paris",           group: "French Culture" },
  { id: "g5fr_cu02", question: "The Eiffel Tower was built for the World's Fair of ___.",            answer: "1889",            group: "French Culture" },
  { id: "g5fr_cu03", question: "The Louvre is a famous ___ in Paris.",                              answer: "museum",          group: "French Culture" },
  { id: "g5fr_cu04", question: "The Mona Lisa was painted by ___ and is displayed in the Louvre.",  answer: "Leonardo da Vinci", group: "French Culture" },
  { id: "g5fr_cu05", question: "France's national holiday 'Bastille Day' is celebrated on July ___.", answer: "14",            group: "French Culture" },
  { id: "g5fr_cu06", question: "French is an official language in ___ countries worldwide.",         answer: "29",              group: "French Culture" },
  { id: "g5fr_cu07", question: "The French Revolution began in ___.",                               answer: "1789",            group: "French Culture" },
  { id: "g5fr_cu08", question: "France is famous for its cuisine — the bread known as a 'baguette' is a long, thin loaf of ___.", answer: "bread", group: "French Culture" },
  { id: "g5fr_cu09", question: "The famous French author Victor Hugo wrote 'Les ___'.",             answer: "Misérables",      group: "French Culture" },
  { id: "g5fr_cu10", question: "The currency used in France (and most of Europe) today is the ___.", answer: "euro",           group: "French Culture" },
  { id: "g5fr_cu11", question: "Mont Blanc, the highest mountain in the Alps, is on the border of France and ___.", answer: "Italy", group: "French Culture" },
  { id: "g5fr_cu12", question: "The Tour de France is a famous international ___ race.",            answer: "cycling",         group: "French Culture" },
];

/* ---- 3rd Grade Art ----------------------------------------- */
const GRADE3_ART = [
  // Elements of Art (12 items)
  { id: "g3a_ea01", question: "The seven elements of art include line, shape, form, value, texture, space, and ___.", answer: "color", group: "Elements of Art" },
  { id: "g3a_ea02", question: "A two-dimensional shape has length and ___.",                        answer: "width",           group: "Elements of Art" },
  { id: "g3a_ea03", question: "A three-dimensional form has length, width, and ___.",               answer: "depth",           group: "Elements of Art" },
  { id: "g3a_ea04", question: "The lightness or darkness of a color is called its ___.",            answer: "value",           group: "Elements of Art" },
  { id: "g3a_ea05", question: "How something feels or looks like it would feel is ___.",            answer: "texture",         group: "Elements of Art" },
  { id: "g3a_ea06", question: "Negative space is the ___ around a subject.",                        answer: "area",            group: "Elements of Art" },
  { id: "g3a_ea07", question: "Positive space is where the ___ is.",                                answer: "subject",         group: "Elements of Art" },
  { id: "g3a_ea08", question: "A horizontal line feels ___.",                                       answer: "calm",            group: "Elements of Art" },
  { id: "g3a_ea09", question: "A vertical line feels ___.",                                         answer: "tall or strong",  group: "Elements of Art" },
  { id: "g3a_ea10", question: "A diagonal line creates a feeling of ___.",                          answer: "movement",        group: "Elements of Art" },
  { id: "g3a_ea11", question: "Geometric shapes include circles, squares, and ___.",                answer: "triangles",       group: "Elements of Art" },
  { id: "g3a_ea12", question: "Organic shapes are ___.",                                            answer: "freeform",        group: "Elements of Art" },
  // Art History (12 items)
  { id: "g3a_ah01", question: "Leonardo da Vinci painted the ___.",                                 answer: "Mona Lisa",       group: "Art History" },
  { id: "g3a_ah02", question: "Vincent van Gogh painted The ___.",                                  answer: "Starry Night",    group: "Art History" },
  { id: "g3a_ah03", question: "Frida Kahlo was a famous artist from ___.",                          answer: "Mexico",          group: "Art History" },
  { id: "g3a_ah04", question: "Pablo Picasso helped create ___.",                                   answer: "Cubism",          group: "Art History" },
  { id: "g3a_ah05", question: "The Renaissance was a period of great ___ in Europe.",               answer: "art",             group: "Art History" },
  { id: "g3a_ah06", question: "Claude Monet was known for ___ paintings.",                          answer: "Impressionist",   group: "Art History" },
  { id: "g3a_ah07", question: "Ancient Egyptians painted on tomb walls using ___.",                 answer: "hieroglyphics",   group: "Art History" },
  { id: "g3a_ah08", question: "Michelangelo painted the ___ Chapel ceiling.",                       answer: "Sistine",         group: "Art History" },
  { id: "g3a_ah09", question: "Georgia O'Keeffe painted large ___ and New Mexico landscapes.",      answer: "flowers",         group: "Art History" },
  { id: "g3a_ah10", question: "Salvador Dalí was part of the ___ movement.",                        answer: "Surrealist",      group: "Art History" },
  { id: "g3a_ah11", question: "Andy Warhol was famous for ___.",                                    answer: "Pop Art",         group: "Art History" },
  { id: "g3a_ah12", question: "The medium of sculpture uses ___ to create 3D art.",                 answer: "materials",       group: "Art History" },
  // Color Theory (10 items)
  { id: "g3a_ct01", question: "Red, yellow, and blue are ___ colors.",                              answer: "primary",         group: "Color Theory" },
  { id: "g3a_ct02", question: "Mixing red and blue makes ___.",                                     answer: "purple",          group: "Color Theory" },
  { id: "g3a_ct03", question: "Mixing yellow and blue makes ___.",                                  answer: "green",           group: "Color Theory" },
  { id: "g3a_ct04", question: "Orange, green, and purple are ___ colors.",                          answer: "secondary",       group: "Color Theory" },
  { id: "g3a_ct05", question: "Colors opposite each other on the color wheel are ___.",             answer: "complementary",   group: "Color Theory" },
  { id: "g3a_ct06", question: "Adding white to a color makes a ___.",                               answer: "tint",            group: "Color Theory" },
  { id: "g3a_ct07", question: "Adding black to a color makes a ___.",                               answer: "shade",           group: "Color Theory" },
  { id: "g3a_ct08", question: "Red, orange, and yellow are ___ colors.",                            answer: "warm",            group: "Color Theory" },
  { id: "g3a_ct09", question: "Blue, green, and purple are ___ colors.",                            answer: "cool",            group: "Color Theory" },
  { id: "g3a_ct10", question: "A monochromatic color scheme uses ___ hue.",                         answer: "one",             group: "Color Theory" },
];



/* ---- 4th Grade Financial Literacy -------------------------- */
const GRADE4_FINANCIAL = [
  // Income & Taxes (12 items)
  { id: "g4f_it01", question: "Taxes are money paid to the ___.",                                   answer: "government",      group: "Income & Taxes" },
  { id: "g4f_it02", question: "Income tax is based on how much you ___.",                           answer: "earn",            group: "Income & Taxes" },
  { id: "g4f_it03", question: "Sales tax is added when you ___.",                                   answer: "buy something",   group: "Income & Taxes" },
  { id: "g4f_it04", question: "Property tax is paid on ___.",                                       answer: "real estate",     group: "Income & Taxes" },
  { id: "g4f_it05", question: "Tax money pays for schools, roads, and ___.",                        answer: "services",        group: "Income & Taxes" },
  { id: "g4f_it06", question: "W-2 forms show your ___ for the year.",                              answer: "total earnings",  group: "Income & Taxes" },
  { id: "g4f_it07", question: "Filing taxes is done each year by ___.",                             answer: "April 15",        group: "Income & Taxes" },
  { id: "g4f_it08", question: "Tax deductions ___ the amount of tax you owe.",                      answer: "reduce",          group: "Income & Taxes" },
  { id: "g4f_it09", question: "Gross income is what you earn ___ taxes.",                           answer: "before",          group: "Income & Taxes" },
  { id: "g4f_it10", question: "Net income is what you take home ___ taxes.",                        answer: "after",           group: "Income & Taxes" },
  { id: "g4f_it11", question: "The IRS collects ___ taxes.",                                        answer: "federal",         group: "Income & Taxes" },
  { id: "g4f_it12", question: "Social Security is a government program funded by ___.",             answer: "taxes",           group: "Income & Taxes" },
  // Investing Basics (10 items)
  { id: "g4f_ib01", question: "Investing means putting money to work to ___ more money.",           answer: "earn",            group: "Investing Basics" },
  { id: "g4f_ib02", question: "A stock represents part ownership in a ___.",                        answer: "company",         group: "Investing Basics" },
  { id: "g4f_ib03", question: "A bond is a loan you give to a ___.",                                answer: "company or government", group: "Investing Basics" },
  { id: "g4f_ib04", question: "Diversification means spreading money across ___ investments.",      answer: "different",       group: "Investing Basics" },
  { id: "g4f_ib05", question: "Risk means the chance of ___ money.",                                answer: "losing",          group: "Investing Basics" },
  { id: "g4f_ib06", question: "Higher risk investments usually offer ___ returns.",                 answer: "higher",          group: "Investing Basics" },
  { id: "g4f_ib07", question: "The stock market is where ___ are bought and sold.",                 answer: "stocks",          group: "Investing Basics" },
  { id: "g4f_ib08", question: "A mutual fund pools money from many ___.",                           answer: "investors",       group: "Investing Basics" },
  { id: "g4f_ib09", question: "Compound interest earns interest on your ___.",                      answer: "interest",        group: "Investing Basics" },
  { id: "g4f_ib10", question: "Long-term investing usually ___ wealth.",                            answer: "builds",          group: "Investing Basics" },
  // Consumer Skills (12 items)
  { id: "g4f_cs01", question: "Advertising is designed to make you ___ products.",                  answer: "buy",             group: "Consumer Skills" },
  { id: "g4f_cs02", question: "Comparing unit prices helps you find the ___ deal.",                 answer: "best",            group: "Consumer Skills" },
  { id: "g4f_cs03", question: "A warranty protects you if a product ___.",                          answer: "breaks",          group: "Consumer Skills" },
  { id: "g4f_cs04", question: "Return policies tell you if you can bring something ___.",           answer: "back",            group: "Consumer Skills" },
  { id: "g4f_cs05", question: "Reviews help you decide if a product is ___.",                       answer: "worth buying",    group: "Consumer Skills" },
  { id: "g4f_cs06", question: "Fraudulent offers that seem too good are likely ___.",               answer: "scams",           group: "Consumer Skills" },
  { id: "g4f_cs07", question: "Identity theft means someone steals your ___.",                      answer: "personal information", group: "Consumer Skills" },
  { id: "g4f_cs08", question: "Phishing is a scam done through ___.",                               answer: "email",           group: "Consumer Skills" },
  { id: "g4f_cs09", question: "A strong password has letters, numbers, and ___.",                   answer: "symbols",         group: "Consumer Skills" },
  { id: "g4f_cs10", question: "Online shopping requires a ___ connection.",                         answer: "secure",          group: "Consumer Skills" },
  { id: "g4f_cs11", question: "Consumer rights protect you from ___.",                              answer: "unfair practices", group: "Consumer Skills" },
  { id: "g4f_cs12", question: "The Better Business Bureau helps resolve ___.",                      answer: "complaints",      group: "Consumer Skills" },
];

/* ---- 4th Grade Spanish ------------------------------------- */
const GRADE4_SPANISH = [
  // Verb Conjugation (12 items)
  { id: "g4sp_vc01", question: "Conjugate 'hablar' (to speak) with 'yo': Yo ___ español.",          answer: "hablo",           group: "Verb Conjugation" },
  { id: "g4sp_vc02", question: "Conjugate 'comer' (to eat) with 'tú': Tú ___ una manzana.",         answer: "comes",           group: "Verb Conjugation" },
  { id: "g4sp_vc03", question: "Conjugate 'vivir' (to live) with 'él': Él ___ en México.",          answer: "vive",            group: "Verb Conjugation" },
  { id: "g4sp_vc04", question: "Conjugate 'hablar' with 'nosotros': Nosotros ___ español.",         answer: "hablamos",        group: "Verb Conjugation" },
  { id: "g4sp_vc05", question: "Conjugate 'correr' (to run) with 'yo': Yo ___ en el parque.",       answer: "corro",           group: "Verb Conjugation" },
  { id: "g4sp_vc06", question: "Conjugate 'escribir' (to write) with 'ella': Ella ___ una carta.",  answer: "escribe",         group: "Verb Conjugation" },
  { id: "g4sp_vc07", question: "Conjugate 'beber' (to drink) with 'nosotros': Nosotros ___ agua.",  answer: "bebemos",         group: "Verb Conjugation" },
  { id: "g4sp_vc08", question: "Conjugate 'vivir' with 'yo': Yo ___ en los Estados Unidos.",        answer: "vivo",            group: "Verb Conjugation" },
  { id: "g4sp_vc09", question: "Conjugate 'leer' (to read) with 'tú': Tú ___ el libro.",           answer: "lees",            group: "Verb Conjugation" },
  { id: "g4sp_vc10", question: "Conjugate 'comer' with 'ellos': Ellos ___ arroz.",                  answer: "comen",           group: "Verb Conjugation" },
  { id: "g4sp_vc11", question: "Conjugate 'escribir' with 'nosotros': Nosotros ___ la tarea.",      answer: "escribimos",      group: "Verb Conjugation" },
  { id: "g4sp_vc12", question: "Conjugate 'correr' with 'tú': Tú ___ muy rápido.",                  answer: "corres",          group: "Verb Conjugation" },
  // Sentence Translation (12 items)
  { id: "g4sp_st01", question: "Traduce al español: 'We eat dinner at seven o'clock.'",             answer: "Comemos la cena a las siete.", group: "Sentence Translation" },
  { id: "g4sp_st02", question: "Traduce al español: 'I drink water every morning.'",                answer: "Bebo agua cada mañana.",       group: "Sentence Translation" },
  { id: "g4sp_st03", question: "Traduce al español: 'She writes a letter to her friend.'",          answer: "Ella escribe una carta a su amiga.", group: "Sentence Translation" },
  { id: "g4sp_st04", question: "Translate to English: 'Nosotros estudiamos matemáticas.'",          answer: "We study math.",              group: "Sentence Translation" },
  { id: "g4sp_st05", question: "Traduce al español: 'He runs in the park every day.'",              answer: "Él corre en el parque todos los días.", group: "Sentence Translation" },
  { id: "g4sp_st06", question: "Translate to English: 'Tú comes una manzana roja.'",               answer: "You eat a red apple.",         group: "Sentence Translation" },
  { id: "g4sp_st07", question: "Traduce al español: 'We speak Spanish in class.'",                  answer: "Hablamos español en clase.",   group: "Sentence Translation" },
  { id: "g4sp_st08", question: "Translate to English: 'Ella vive en una casa grande.'",             answer: "She lives in a big house.",    group: "Sentence Translation" },
  { id: "g4sp_st09", question: "Traduce al español: 'I read a book at night.'",                     answer: "Leo un libro por la noche.",   group: "Sentence Translation" },
  { id: "g4sp_st10", question: "Translate to English: 'Ellos beben leche cada día.'",               answer: "They drink milk every day.",   group: "Sentence Translation" },
  { id: "g4sp_st11", question: "Traduce al español: 'You (tú) write the homework.'",               answer: "Tú escribes la tarea.",        group: "Sentence Translation" },
  { id: "g4sp_st12", question: "Translate to English: 'Yo corro con mi perro.'",                   answer: "I run with my dog.",           group: "Sentence Translation" },
  // Grammar Rules (12 items)
  { id: "g4sp_gr01", question: "¿Cuál es el artículo correcto para 'libro'? ___ libro",             answer: "El",              group: "Grammar Rules" },
  { id: "g4sp_gr02", question: "¿Cuál es el artículo correcto para 'casa'? ___ casa",               answer: "La",              group: "Grammar Rules" },
  { id: "g4sp_gr03", question: "¿Cuál es el plural de 'la casa'?",                                  answer: "las casas",       group: "Grammar Rules" },
  { id: "g4sp_gr04", question: "¿Cuál es el plural de 'el libro'?",                                 answer: "los libros",      group: "Grammar Rules" },
  { id: "g4sp_gr05", question: "In Spanish, adjectives must agree in ___ and number with the noun.", answer: "gender",          group: "Grammar Rules" },
  { id: "g4sp_gr06", question: "'Un niño alto' — change to feminine: Una niña ___.",                answer: "alta",            group: "Grammar Rules" },
  { id: "g4sp_gr07", question: "The article 'un' is used with ___ nouns.",                          answer: "masculine",       group: "Grammar Rules" },
  { id: "g4sp_gr08", question: "The article 'una' is used with ___ nouns.",                         answer: "feminine",        group: "Grammar Rules" },
  { id: "g4sp_gr09", question: "¿Cuál es el plural de 'el estudiante'?",                            answer: "los estudiantes", group: "Grammar Rules" },
  { id: "g4sp_gr10", question: "In Spanish, the subject pronoun is often ___ because the verb ending shows who is speaking.", answer: "dropped", group: "Grammar Rules" },
  { id: "g4sp_gr11", question: "'Los libros son interesantes.' The adjective 'interesantes' is ___ to match the noun.", answer: "plural", group: "Grammar Rules" },
  { id: "g4sp_gr12", question: "¿Cuál es el artículo correcto para 'mesa'? ___ mesa",               answer: "La",              group: "Grammar Rules" },
  // Spanish Conversation (12 items)
  { id: "g4sp_sc01", question: "¿Cómo se dice 'What time is it?' en español?",                      answer: "¿Qué hora es?",   group: "Spanish Conversation" },
  { id: "g4sp_sc02", question: "¿Cómo respondes si alguien dice '¿Cómo estás?'",                    answer: "Estoy bien, gracias.", group: "Spanish Conversation" },
  { id: "g4sp_sc03", question: "¿Cómo se dice 'I don't understand' en español?",                    answer: "No entiendo.",    group: "Spanish Conversation" },
  { id: "g4sp_sc04", question: "¿Qué significa 'Me gustaría un vaso de agua, por favor'?",         answer: "I would like a glass of water, please.", group: "Spanish Conversation" },
  { id: "g4sp_sc05", question: "¿Cómo se dice 'Can you repeat that?' en español?",                  answer: "¿Puede repetir?", group: "Spanish Conversation" },
  { id: "g4sp_sc06", question: "'¿Cuántos años tienes?' means ___.",                                 answer: "How old are you?", group: "Spanish Conversation" },
  { id: "g4sp_sc07", question: "To say you are 10 years old: 'Tengo ___ años.'",                    answer: "diez",            group: "Spanish Conversation" },
  { id: "g4sp_sc08", question: "'¿Dónde vives?' means ___.",                                         answer: "Where do you live?", group: "Spanish Conversation" },
  { id: "g4sp_sc09", question: "To say 'I live in Florida': 'Vivo en ___.'",                        answer: "Florida",         group: "Spanish Conversation" },
  { id: "g4sp_sc10", question: "'¿Qué te gusta hacer?' means ___.",                                 answer: "What do you like to do?", group: "Spanish Conversation" },
  { id: "g4sp_sc11", question: "To say 'I like to read': 'Me gusta ___.'",                         answer: "leer",            group: "Spanish Conversation" },
  { id: "g4sp_sc12", question: "'¿De dónde eres?' means ___.",                                      answer: "Where are you from?", group: "Spanish Conversation" },
];

/* ---- 4th Grade Art ----------------------------------------- */
const GRADE4_ART = [
  // Art Techniques (12 items)
  { id: "g4a_at01", question: "Perspective creates the illusion of ___.",                           answer: "depth",           group: "Art Techniques" },
  { id: "g4a_at02", question: "One-point perspective uses a single ___.",                           answer: "vanishing point", group: "Art Techniques" },
  { id: "g4a_at03", question: "Blending colors smoothly is called ___.",                            answer: "gradation",       group: "Art Techniques" },
  { id: "g4a_at04", question: "Cross-hatching uses ___ lines to create value.",                     answer: "crossed",         group: "Art Techniques" },
  { id: "g4a_at05", question: "Foreshortening makes objects look ___.",                             answer: "closer",          group: "Art Techniques" },
  { id: "g4a_at06", question: "Contour lines show the ___ of an object.",                           answer: "edges",           group: "Art Techniques" },
  { id: "g4a_at07", question: "Stippling creates value using ___.",                                 answer: "dots",            group: "Art Techniques" },
  { id: "g4a_at08", question: "Collage combines ___ materials.",                                    answer: "different",       group: "Art Techniques" },
  { id: "g4a_at09", question: "Watercolor is a ___ medium.",                                        answer: "transparent",     group: "Art Techniques" },
  { id: "g4a_at10", question: "Oil paint dries ___.",                                               answer: "slowly",          group: "Art Techniques" },
  { id: "g4a_at11", question: "A sketch is a ___ drawing.",                                         answer: "quick",           group: "Art Techniques" },
  { id: "g4a_at12", question: "A mural is painted on a ___.",                                       answer: "wall",            group: "Art Techniques" },
  // Famous Artworks (12 items)
  { id: "g4a_fa01", question: "The Eiffel Tower was designed by ___.",                              answer: "Gustave Eiffel",  group: "Famous Artworks" },
  { id: "g4a_fa02", question: "'The Persistence of Memory' shows melting ___.",                     answer: "clocks",          group: "Famous Artworks" },
  { id: "g4a_fa03", question: "The Pietà is a marble sculpture by ___.",                            answer: "Michelangelo",    group: "Famous Artworks" },
  { id: "g4a_fa04", question: "'American Gothic' shows a farmer and ___.",                          answer: "woman",           group: "Famous Artworks" },
  { id: "g4a_fa05", question: "The Taj Mahal in India is famous for its ___ architecture.",         answer: "Mughal",          group: "Famous Artworks" },
  { id: "g4a_fa06", question: "'Girl with a Pearl Earring' was painted by ___.",                    answer: "Vermeer",         group: "Famous Artworks" },
  { id: "g4a_fa07", question: "The Venus de Milo is an ancient Greek ___.",                         answer: "sculpture",       group: "Famous Artworks" },
  { id: "g4a_fa08", question: "'A Sunday on La Grande Jatte' used small dots of color — this is called ___.", answer: "Pointillism", group: "Famous Artworks" },
  { id: "g4a_fa09", question: "Rodin created the famous sculpture 'The ___'.",                      answer: "Thinker",         group: "Famous Artworks" },
  { id: "g4a_fa10", question: "'The Birth of Venus' was painted by ___.",                           answer: "Botticelli",      group: "Famous Artworks" },
  { id: "g4a_fa11", question: "'Guernica' depicts the horrors of ___.",                             answer: "war",             group: "Famous Artworks" },
  { id: "g4a_fa12", question: "Street art done illegally is often called ___.",                     answer: "graffiti",        group: "Famous Artworks" },
  // Art Movements (10 items)
  { id: "g4a_am01", question: "Impressionism focused on capturing ___ and light.",                  answer: "moments",         group: "Art Movements" },
  { id: "g4a_am02", question: "Cubism shows objects from ___ angles.",                              answer: "multiple",        group: "Art Movements" },
  { id: "g4a_am03", question: "Abstract art does not try to show ___.",                             answer: "realistic images", group: "Art Movements" },
  { id: "g4a_am04", question: "Surrealism depicts dream-like ___.",                                 answer: "scenes",          group: "Art Movements" },
  { id: "g4a_am05", question: "Pop Art used images from ___ culture.",                              answer: "popular",         group: "Art Movements" },
  { id: "g4a_am06", question: "Renaissance art focused on ___ and nature.",                         answer: "humans",          group: "Art Movements" },
  { id: "g4a_am07", question: "Baroque art used dramatic ___ and movement.",                        answer: "light",           group: "Art Movements" },
  { id: "g4a_am08", question: "Minimalism uses ___ elements.",                                      answer: "very few",        group: "Art Movements" },
  { id: "g4a_am09", question: "Street art includes murals, stencils, and ___.",                     answer: "graffiti",        group: "Art Movements" },
  { id: "g4a_am10", question: "Photography became recognized as art in the ___ century.",           answer: "20th",            group: "Art Movements" },
];



/* ---- 5th Grade Financial Literacy -------------------------- */
const GRADE5_FINANCIAL = [
  // Personal Finance (12 items)
  { id: "g5f_pf01", question: "A credit score measures your ___ worthiness.",                       answer: "credit",          group: "Personal Finance" },
  { id: "g5f_pf02", question: "High credit scores get ___ interest rates.",                         answer: "lower",           group: "Personal Finance" },
  { id: "g5f_pf03", question: "Debt is money you ___ to someone.",                                  answer: "owe",             group: "Personal Finance" },
  { id: "g5f_pf04", question: "Interest on debt is money you pay to ___.",                          answer: "borrow",          group: "Personal Finance" },
  { id: "g5f_pf05", question: "Inflation means prices ___ over time.",                              answer: "rise",            group: "Personal Finance" },
  { id: "g5f_pf06", question: "A mortgage is a loan for buying a ___.",                             answer: "house",           group: "Personal Finance" },
  { id: "g5f_pf07", question: "Student loans pay for ___.",                                         answer: "college",         group: "Personal Finance" },
  { id: "g5f_pf08", question: "Emergency funds cover ___ months of expenses.",                      answer: "3-6",             group: "Personal Finance" },
  { id: "g5f_pf09", question: "A 401k is a retirement ___.",                                        answer: "savings account", group: "Personal Finance" },
  { id: "g5f_pf10", question: "Net worth = assets minus ___.",                                      answer: "liabilities",     group: "Personal Finance" },
  { id: "g5f_pf11", question: "A budget with categories is called a ___ budget.",                   answer: "zero-based",      group: "Personal Finance" },
  { id: "g5f_pf12", question: "Roth IRA is a type of ___ account.",                                 answer: "retirement",      group: "Personal Finance" },
  // Economic Systems (12 items)
  { id: "g5f_ec01", question: "In a market economy, prices are set by ___ and demand.",             answer: "supply",          group: "Economic Systems" },
  { id: "g5f_ec02", question: "A command economy is controlled by the ___.",                        answer: "government",      group: "Economic Systems" },
  { id: "g5f_ec03", question: "The US has a ___ economy.",                                          answer: "mixed",           group: "Economic Systems" },
  { id: "g5f_ec04", question: "GDP measures a country's total ___ output.",                         answer: "economic",        group: "Economic Systems" },
  { id: "g5f_ec05", question: "Unemployment rate measures people looking for ___.",                 answer: "work",            group: "Economic Systems" },
  { id: "g5f_ec06", question: "A recession is a period of ___ economic activity.",                  answer: "decreased",       group: "Economic Systems" },
  { id: "g5f_ec07", question: "Exports are goods ___ to other countries.",                          answer: "sold",            group: "Economic Systems" },
  { id: "g5f_ec08", question: "Imports are goods ___ from other countries.",                        answer: "bought",          group: "Economic Systems" },
  { id: "g5f_ec09", question: "Tariffs are taxes on ___.",                                          answer: "imports",         group: "Economic Systems" },
  { id: "g5f_ec10", question: "The Federal Reserve controls the ___ supply.",                       answer: "money",           group: "Economic Systems" },
  { id: "g5f_ec11", question: "Entrepreneurs take financial ___.",                                  answer: "risks",           group: "Economic Systems" },
  { id: "g5f_ec12", question: "Scarcity means resources are ___.",                                  answer: "limited",         group: "Economic Systems" },
  // Career & Income (12 items)
  { id: "g5f_ci01", question: "A resume lists your ___ and skills.",                                answer: "experience",      group: "Career & Income" },
  { id: "g5f_ci02", question: "An interview is a meeting to get a ___.",                            answer: "job",             group: "Career & Income" },
  { id: "g5f_ci03", question: "Minimum wage is the lowest ___ wage allowed.",                       answer: "hourly",          group: "Career & Income" },
  { id: "g5f_ci04", question: "STEM careers involve Science, Technology, Engineering, and ___.",    answer: "Math",            group: "Career & Income" },
  { id: "g5f_ci05", question: "Trade jobs require ___ education.",                                  answer: "vocational",      group: "Career & Income" },
  { id: "g5f_ci06", question: "A salary is annual ___ from a job.",                                 answer: "income",          group: "Career & Income" },
  { id: "g5f_ci07", question: "Self-employment means working for ___.",                             answer: "yourself",        group: "Career & Income" },
  { id: "g5f_ci08", question: "Benefits include health insurance and ___.",                         answer: "retirement plans", group: "Career & Income" },
  { id: "g5f_ci09", question: "Networking means building professional ___.",                        answer: "connections",     group: "Career & Income" },
  { id: "g5f_ci10", question: "A reference is someone who can speak to your ___.",                  answer: "abilities",       group: "Career & Income" },
  { id: "g5f_ci11", question: "Job shadowing means following someone to learn about their ___.",    answer: "career",          group: "Career & Income" },
  { id: "g5f_ci12", question: "Community college offers ___ programs.",                             answer: "two-year",        group: "Career & Income" },
];

/* ---- 5th Grade Spanish ------------------------------------- */
const GRADE5_SPANISH = [
  // Past Tense (Pretérito) (12 items)
  { id: "g5sp_pt01", question: "Conjugate 'hablar' in pretérito with 'yo': Yo ___ español.",        answer: "hablé",           group: "Past Tense (Pretérito)" },
  { id: "g5sp_pt02", question: "Conjugate 'hablar' in pretérito with 'ellos': Ellos ___ español.",  answer: "hablaron",        group: "Past Tense (Pretérito)" },
  { id: "g5sp_pt03", question: "Conjugate 'comer' in pretérito with 'tú': Tú ___ una pizza.",       answer: "comiste",         group: "Past Tense (Pretérito)" },
  { id: "g5sp_pt04", question: "Conjugate 'vivir' in pretérito with 'nosotros': Nosotros ___ allí.", answer: "vivimos",         group: "Past Tense (Pretérito)" },
  { id: "g5sp_pt05", question: "Conjugate 'correr' in pretérito with 'él': Él ___ muy rápido.",     answer: "corrió",          group: "Past Tense (Pretérito)" },
  { id: "g5sp_pt06", question: "'Fui' is the pretérito form of ___ for 'yo'.",                      answer: "ir (to go)",      group: "Past Tense (Pretérito)" },
  { id: "g5sp_pt07", question: "'Tuviste' is the pretérito form of 'tener' for ___.",               answer: "tú",              group: "Past Tense (Pretérito)" },
  { id: "g5sp_pt08", question: "Conjugate 'escribir' in pretérito with 'ella': Ella ___ una carta.", answer: "escribió",       group: "Past Tense (Pretérito)" },
  { id: "g5sp_pt09", question: "'Ayer comí una manzana.' Translate to English.",                     answer: "Yesterday I ate an apple.", group: "Past Tense (Pretérito)" },
  { id: "g5sp_pt10", question: "Conjugate 'beber' in pretérito with 'yo': Yo ___ agua.",            answer: "bebí",            group: "Past Tense (Pretérito)" },
  { id: "g5sp_pt11", question: "Conjugate 'hablar' in pretérito with 'usted': Usted ___ con ella.", answer: "habló",           group: "Past Tense (Pretérito)" },
  { id: "g5sp_pt12", question: "'Nosotros corrimos en el parque.' Translate to English.",            answer: "We ran in the park.", group: "Past Tense (Pretérito)" },
  // Reading Comprehension (12 items)
  { id: "g5sp_rc01", question: "Lee y contesta: 'María fue al mercado. Compró frutas y verduras. Pagó con efectivo.' ¿Qué compró María?", answer: "frutas y verduras", group: "Reading Comprehension" },
  { id: "g5sp_rc02", question: "Lee y contesta: 'Juan estudió toda la noche. Al día siguiente, sacó una A en el examen.' ¿Por qué sacó una A?", answer: "because he studied all night", group: "Reading Comprehension" },
  { id: "g5sp_rc03", question: "Lee y contesta: 'El cielo se puso gris y empezó a llover. Los niños corrieron a casa.' ¿Por qué corrieron los niños?", answer: "because it started to rain", group: "Reading Comprehension" },
  { id: "g5sp_rc04", question: "Lee y contesta: 'Ana tiene un perro que se llama Max. Max corre muy rápido.' ¿Cómo se llama el perro de Ana?", answer: "Max", group: "Reading Comprehension" },
  { id: "g5sp_rc05", question: "Lee y contesta: 'Pedro comió el desayuno a las siete. Luego fue a la escuela.' ¿Qué hizo Pedro después del desayuno?", answer: "fue a la escuela", group: "Reading Comprehension" },
  { id: "g5sp_rc06", question: "Lee y contesta: 'La familia Ruiz vivió en México por diez años. Después se mudaron a los Estados Unidos.' ¿Cuántos años vivieron en México?", answer: "diez años", group: "Reading Comprehension" },
  { id: "g5sp_rc07", question: "Lee y contesta: 'Sofía leyó tres libros en el verano. Le gustó mucho leer.' ¿Cuántos libros leyó Sofía?", answer: "tres", group: "Reading Comprehension" },
  { id: "g5sp_rc08", question: "Lee y contesta: 'El maestro escribió las instrucciones en la pizarra. Los estudiantes las copiaron.' ¿Qué hicieron los estudiantes?", answer: "copiaron las instrucciones", group: "Reading Comprehension" },
  { id: "g5sp_rc09", question: "Lee y contesta: 'Carlos no durmió bien. Por eso, estaba muy cansado en clase.' ¿Por qué estaba cansado Carlos?", answer: "porque no durmió bien", group: "Reading Comprehension" },
  { id: "g5sp_rc10", question: "Lee y contesta: 'Llovió mucho el sábado. El domingo salió el sol y los niños jugaron afuera.' ¿Cuándo jugaron los niños afuera?", answer: "el domingo", group: "Reading Comprehension" },
  { id: "g5sp_rc11", question: "Lee y contesta: 'La tienda cerró a las nueve. Miguel llegó a las nueve y diez.' ¿Pudo Miguel entrar a la tienda?", answer: "no", group: "Reading Comprehension" },
  { id: "g5sp_rc12", question: "Lee y contesta: 'Elena habla español, inglés y francés.' ¿Cuántos idiomas habla Elena?", answer: "tres", group: "Reading Comprehension" },
  // Advanced Grammar (12 items)
  { id: "g5sp_ag01", question: "'Se me olvidó el libro' — what grammatical construction is 'se me olvidó'?", answer: "accidental se",  group: "Advanced Grammar" },
  { id: "g5sp_ag02", question: "In 'Me gusta el libro,' who likes the book?",                       answer: "yo (I)",          group: "Advanced Grammar" },
  { id: "g5sp_ag03", question: "The 'personal a' is used before a ___ direct object.",               answer: "person",          group: "Advanced Grammar" },
  { id: "g5sp_ag04", question: "'Veo a mi mamá' — why is 'a' used here?",                           answer: "personal a before a person", group: "Advanced Grammar" },
  { id: "g5sp_ag05", question: "In Spanish, 'ser' vs. 'estar' both mean ___.",                      answer: "to be",           group: "Advanced Grammar" },
  { id: "g5sp_ag06", question: "'Ella es alta' uses 'ser' because height is a ___ characteristic.", answer: "permanent",        group: "Advanced Grammar" },
  { id: "g5sp_ag07", question: "'Él está cansado' uses 'estar' because tiredness is ___.",          answer: "temporary",        group: "Advanced Grammar" },
  { id: "g5sp_ag08", question: "In 'No lo veo,' the word 'lo' is a ___ object pronoun.",           answer: "direct",          group: "Advanced Grammar" },
  { id: "g5sp_ag09", question: "'¿A qué hora?' means ___.",                                         answer: "At what time?",   group: "Advanced Grammar" },
  { id: "g5sp_ag10", question: "Reflexive verbs use pronouns: me, te, se, nos, ___.",               answer: "os/se",           group: "Advanced Grammar" },
  { id: "g5sp_ag11", question: "'Me lavo las manos' — 'me' shows the action is done to ___.",       answer: "myself",          group: "Advanced Grammar" },
  { id: "g5sp_ag12", question: "In 'Le di el libro a ella,' 'le' is an ___ object pronoun.",        answer: "indirect",        group: "Advanced Grammar" },
  // Hispanic Culture (12 items)
  { id: "g5sp_hc01", question: "Gabriel García Márquez was a famous ___ author from Colombia.",     answer: "magical realism", group: "Hispanic Culture" },
  { id: "g5sp_hc02", question: "'Día de los Muertos' is celebrated on November ___ and 2.",         answer: "1",               group: "Hispanic Culture" },
  { id: "g5sp_hc03", question: "Frida Kahlo was a famous Mexican ___.",                             answer: "painter",         group: "Hispanic Culture" },
  { id: "g5sp_hc04", question: "The 'Quinceañera' celebration marks a girl's ___ birthday.",        answer: "15th",            group: "Hispanic Culture" },
  { id: "g5sp_hc05", question: "Flamenco is a traditional dance and music style from ___.",         answer: "Spain",           group: "Hispanic Culture" },
  { id: "g5sp_hc06", question: "The Nobel Prize–winning author Pablo Neruda was from ___.",         answer: "Chile",           group: "Hispanic Culture" },
  { id: "g5sp_hc07", question: "The ancient Mayan civilization developed in present-day ___ and Central America.", answer: "Mexico", group: "Hispanic Culture" },
  { id: "g5sp_hc08", question: "'Cien años de soledad' ('One Hundred Years of Solitude') was written by ___.", answer: "Gabriel García Márquez", group: "Hispanic Culture" },
  { id: "g5sp_hc09", question: "The Inca Empire was centered in present-day ___.",                  answer: "Peru",            group: "Hispanic Culture" },
  { id: "g5sp_hc10", question: "Salsa music has roots in Cuba and ___.",                             answer: "Puerto Rico",     group: "Hispanic Culture" },
  { id: "g5sp_hc11", question: "Spain's most famous novel, 'Don Quixote,' was written by ___.",     answer: "Cervantes",       group: "Hispanic Culture" },
  { id: "g5sp_hc12", question: "The Spanish language uses inverted ___ and question marks at the start of sentences.", answer: "exclamation", group: "Hispanic Culture" },
];

/* ---- Kindergarten Social Studies ---------------------------- */
const KINDER_SOCIAL = [
  // Community Helpers (12 items)
  { id: "ks_ch01", question: "Who puts out fires and keeps us safe from burning?",                    answer: "firefighter",     group: "Community Helpers" },
  { id: "ks_ch02", question: "Who helps us learn new things at school?",                              answer: "teacher",         group: "Community Helpers" },
  { id: "ks_ch03", question: "Who helps you feel better when you are sick?",                          answer: "doctor",          group: "Community Helpers" },
  { id: "ks_ch04", question: "Who delivers letters and packages to your house?",                      answer: "mail carrier",    group: "Community Helpers" },
  { id: "ks_ch05", question: "Who protects the neighborhood and keeps law and order?",               answer: "police officer",  group: "Community Helpers" },
  { id: "ks_ch06", question: "Who cleans teeth and teaches us to brush daily?",                      answer: "dentist",         group: "Community Helpers" },
  { id: "ks_ch07", question: "Who drives the bus to get students safely to school?",                  answer: "bus driver",      group: "Community Helpers" },
  { id: "ks_ch08", question: "Who grows food and crops on a farm?",                                  answer: "farmer",          group: "Community Helpers" },
  { id: "ks_ch09", question: "Who cooks delicious meals in a restaurant?",                            answer: "chef",            group: "Community Helpers" },
  { id: "ks_ch10", question: "Who builds homes and buildings?",                                      answer: "construction worker", group: "Community Helpers" },
  { id: "ks_ch11", question: "Who takes care of animals when they are sick?",                         answer: "veterinarian",    group: "Community Helpers" },
  { id: "ks_ch12", question: "Who flies airplanes to transport people across the world?",             answer: "pilot",           group: "Community Helpers" },
  // Rules & Responsibility (12 items)
  { id: "ks_rr01", question: "What should you do when a teacher or friend is speaking?",              answer: "listen",          group: "Rules & Responsibility" },
  { id: "ks_rr02", question: "What polite words should you say when someone gives you help?",          answer: "thank you",       group: "Rules & Responsibility" },
  { id: "ks_rr03", question: "If you want a turn with a toy, you should ___.",                       answer: "ask nicely",      group: "Rules & Responsibility" },
  { id: "ks_rr04", question: "Classroom rules help keep everyone ___.",                               answer: "safe",            group: "Rules & Responsibility" },
  { id: "ks_rr05", question: "Cleaning up toys after playing is being ___.",                          answer: "responsible",     group: "Rules & Responsibility" },
  { id: "ks_rr06", question: "Telling the truth is being ___.",                                       answer: "honest",          group: "Rules & Responsibility" },
  { id: "ks_rr07", question: "Walking inside the hallway instead of running prevents ___.",           answer: "accidents",       group: "Rules & Responsibility" },
  { id: "ks_rr08", question: "Sharing toys with friends is a sign of ___.",                           answer: "kindness",        group: "Rules & Responsibility" },
  { id: "ks_rr09", question: "Raising your hand before speaking shows ___.",                          answer: "respect",         group: "Rules & Responsibility" },
  { id: "ks_rr10", question: "Covering your mouth when coughing stops the spread of ___.",             answer: "germs",           group: "Rules & Responsibility" },
  { id: "ks_rr11", question: "Taking turns when playing a game is being ___.",                        answer: "fair",            group: "Rules & Responsibility" },
  { id: "ks_rr12", question: "If you accidentally hurt someone's feelings, say ___.",                 answer: "sorry",           group: "Rules & Responsibility" },
  // US Symbols & Holidays (12 items)
  { id: "ks_sh01", question: "What national bird represents the United States?",                     answer: "Bald Eagle",      group: "US Symbols & Holidays" },
  { id: "ks_sh02", question: "How many stars are on the American flag?",                              answer: "50",              group: "US Symbols & Holidays" },
  { id: "ks_sh03", question: "What colors are on the US flag?",                                       answer: "red, white, blue", group: "US Symbols & Holidays" },
  { id: "ks_sh04", question: "Which giant statue in New York Harbor holds a torch for freedom?",      answer: "Statue of Liberty", group: "US Symbols & Holidays" },
  { id: "ks_sh05", question: "We promise loyalty to our country by reciting the Pledge of ___.",      answer: "Allegiance",      group: "US Symbols & Holidays" },
  { id: "ks_sh06", question: "America celebrates its birthday on July ___.",                          answer: "4th",             group: "US Symbols & Holidays" },
  { id: "ks_sh07", question: "In November, families gather to give thanks on ___.",                  answer: "Thanksgiving",    group: "US Symbols & Holidays" },
  { id: "ks_sh08", question: "The President of the United States lives in the ___ House.",            answer: "White",           group: "US Symbols & Holidays" },
  { id: "ks_sh09", question: "Which famous cracked bell in Philadelphia stands for liberty?",        answer: "Liberty Bell",    group: "US Symbols & Holidays" },
  { id: "ks_sh10", question: "In February, we honor past US presidents on Presidents' ___.",          answer: "Day",             group: "US Symbols & Holidays" },
  { id: "ks_sh11", question: "The red and white pattern on the American flag consists of ___.",       answer: "stripes",         group: "US Symbols & Holidays" },
  { id: "ks_sh12", question: "Martin Luther King Jr. Day honors a leader who fought for equal ___.",  answer: "rights",          group: "US Symbols & Holidays" },
];

/* ---- 1st Grade Social Studies ------------------------------- */
const GRADE1_SOCIAL = [
  // Family & Neighborhoods (12 items)
  { id: "g1s_fn01", question: "A community with tall buildings, subway trains, and busy streets is ___.", answer: "urban",        group: "Family & Neighborhoods" },
  { id: "g1s_fn02", question: "A community near a city with houses, backyards, and parks is ___.",       answer: "suburban",     group: "Family & Neighborhoods" },
  { id: "g1s_fn03", question: "A community with open fields, farms, and fewer people is ___.",          answer: "rural",        group: "Family & Neighborhoods" },
  { id: "g1s_fn04", question: "People who live near your home are your ___.",                             answer: "neighbors",    group: "Family & Neighborhoods" },
  { id: "g1s_fn05", question: "A picture that shows streets, parks, and places in a neighborhood is a ___.", answer: "map",      group: "Family & Neighborhoods" },
  { id: "g1s_fn06", question: "Every community has places to live, work, and ___.",                       answer: "play",         group: "Family & Neighborhoods" },
  { id: "g1s_fn07", question: "Grandparents, aunts, uncles, and cousins are part of your ___.",          answer: "family",       group: "Family & Neighborhoods" },
  { id: "g1s_fn08", question: "A place where people check out books to read is a ___.",                   answer: "library",      group: "Family & Neighborhoods" },
  { id: "g1s_fn09", question: "A place where kids go to learn every day is a ___.",                       answer: "school",       group: "Family & Neighborhoods" },
  { id: "g1s_fn10", question: "An outdoor area in a neighborhood with swings and slides is a ___.",       answer: "park",         group: "Family & Neighborhoods" },
  { id: "g1s_fn11", question: "Different families have special ways of celebrating called ___.",          answer: "traditions",   group: "Family & Neighborhoods" },
  { id: "g1s_fn12", question: "Living together peacefully requires being a good ___.",                    answer: "neighbor",     group: "Family & Neighborhoods" },
  // American Symbols (12 items)
  { id: "g1s_as01", question: "What bird represents freedom in the United States?",                       answer: "Bald Eagle",   group: "American Symbols" },
  { id: "g1s_as02", question: "The Statue of Liberty was a gift to the US from ___.",                     answer: "France",       group: "American Symbols" },
  { id: "g1s_as03", question: "The US flag has 13 stripes representing the original 13 ___.",             answer: "colonies",     group: "American Symbols" },
  { id: "g1s_as04", question: "The national anthem of the United States is 'The Star-Spangled ___'.",     answer: "Banner",       group: "American Symbols" },
  { id: "g1s_as05", question: "The capital city of the United States is ___.",                           answer: "Washington, D.C.", group: "American Symbols" },
  { id: "g1s_as06", question: "The Liberty Bell has a famous ___ in its side.",                           answer: "crack",        group: "American Symbols" },
  { id: "g1s_as07", question: "Which president is featured on the penny and $5 bill?",                    answer: "Abraham Lincoln", group: "American Symbols" },
  { id: "g1s_as08", question: "Which first US president is featured on the quarter and $1 bill?",         answer: "George Washington", group: "American Symbols" },
  { id: "g1s_as09", question: "The Washington Monument is a tall stone tower shaped like an ___.",         answer: "obelisk",      group: "American Symbols" },
  { id: "g1s_as10", question: "Uncle Sam is a patriotic symbol representing the US ___.",                  answer: "government",   group: "American Symbols" },
  { id: "g1s_as11", question: "What pledge do students say to promise loyalty to the US?",                answer: "Pledge of Allegiance", group: "American Symbols" },
  { id: "g1s_as12", question: "The 50 stars on the US flag stand for the 50 ___.",                       answer: "states",       group: "American Symbols" },
  // Basic Economics (12 items)
  { id: "g1s_be01", question: "Things you MUST have to survive, like food and water, are ___.",            answer: "needs",        group: "Basic Economics" },
  { id: "g1s_be02", question: "Things you WOULD LIKE to have, like video games, are ___.",                 answer: "wants",        group: "Basic Economics" },
  { id: "g1s_be03", question: "Items you can touch and buy, like toys or apples, are ___.",               answer: "goods",        group: "Basic Economics" },
  { id: "g1s_be04", question: "Work done by someone for others, like a haircut or checkup, is a ___.",   answer: "service",      group: "Basic Economics" },
  { id: "g1s_be05", question: "Money earned from doing a job is called ___.",                             answer: "income",       group: "Basic Economics" },
  { id: "g1s_be06", question: "Setting aside money to use later is called ___.",                          answer: "saving",       group: "Basic Economics" },
  { id: "g1s_be07", question: "Using money to buy goods or services is called ___.",                      answer: "spending",     group: "Basic Economics" },
  { id: "g1s_be08", question: "Trading goods directly without using money is called ___.",                answer: "barter",       group: "Basic Economics" },
  { id: "g1s_be09", question: "Coins and paper bills used to buy things are called ___.",                 answer: "money",        group: "Basic Economics" },
  { id: "g1s_be10", question: "A safe place to keep saved money is a ___.",                               answer: "bank",         group: "Basic Economics" },
  { id: "g1s_be11", question: "Someone who buys and uses goods or services is a ___.",                    answer: "consumer",     group: "Basic Economics" },
  { id: "g1s_be12", question: "Someone who makes or grows goods to sell is a ___.",                       answer: "producer",     group: "Basic Economics" },
];

/* ---- 2nd Grade Social Studies ------------------------------- */
const GRADE2_SOCIAL = [
  // Historical Heroes (12 items)
  { id: "g2s_hh01", question: "Who was the 1st President of the United States?",                          answer: "George Washington", group: "Historical Heroes" },
  { id: "g2s_hh02", question: "Who led the nation during the Civil War and ended slavery?",               answer: "Abraham Lincoln", group: "Historical Heroes" },
  { id: "g2s_hh03", question: "Who refused to give up her bus seat and sparked the Montgomery Bus Boycott?", answer: "Rosa Parks", group: "Historical Heroes" },
  { id: "g2s_hh04", question: "Who gave the famous 'I Have a Dream' speech for civil rights?",            answer: "Martin Luther King Jr.", group: "Historical Heroes" },
  { id: "g2s_hh05", question: "Who escaped slavery and led hundreds to freedom on the Underground Railroad?", answer: "Harriet Tubman", group: "Historical Heroes" },
  { id: "g2s_hh06", question: "Who invented the lightbulb, phonograph, and motion picture camera?",      answer: "Thomas Edison", group: "Historical Heroes" },
  { id: "g2s_hh07", question: "Who flew the first successful powered airplane at Kitty Hawk?",            answer: "Wright Brothers", group: "Historical Heroes" },
  { id: "g2s_hh08", question: "Who proved lightning was electricity using a kite and key?",               answer: "Benjamin Franklin", group: "Historical Heroes" },
  { id: "g2s_hh09", question: "Who helped guide Lewis and Clark on their expedition out west?",           answer: "Sacagawea",     group: "Historical Heroes" },
  { id: "g2s_hh10", question: "Who made a famous midnight ride to warn that 'the British are coming'?",  answer: "Paul Revere",   group: "Historical Heroes" },
  { id: "g2s_hh11", question: "Who was a famous female aviator who attempted to fly around the world?",   answer: "Amelia Earhart", group: "Historical Heroes" },
  { id: "g2s_hh12", question: "Who was the first African American player in modern Major League Baseball?", answer: "Jackie Robinson", group: "Historical Heroes" },
  // Civics & Government (12 items)
  { id: "g2s_cg01", question: "The leader of a city or town government is the ___.",                      answer: "mayor",         group: "Civics & Government" },
  { id: "g2s_cg02", question: "The leader of a US state government is the ___.",                          answer: "governor",      group: "Civics & Government" },
  { id: "g2s_cg03", question: "The leader of the United States national government is the ___.",          answer: "president",     group: "Civics & Government" },
  { id: "g2s_cg04", question: "Rules created by governments that everyone must follow are ___.",          answer: "laws",          group: "Civics & Government" },
  { id: "g2s_cg05", question: "Choosing leaders by casting a vote is called ___.",                        answer: "voting",        group: "Civics & Government" },
  { id: "g2s_cg06", question: "A country where citizens elect leaders to represent them is a ___.",       answer: "republic",      group: "Civics & Government" },
  { id: "g2s_cg07", question: "Taxes pay for community services like roads, schools, and ___.",           answer: "fire departments", group: "Civics & Government" },
  { id: "g2s_cg08", question: "The building where the US Congress meets to make laws is the Capitol in ___.", answer: "Washington, D.C.", group: "Civics & Government" },
  { id: "g2s_cg09", question: "A member of a country with rights and duties is a ___.",                   answer: "citizen",       group: "Civics & Government" },
  { id: "g2s_cg10", question: "Treating others fairly and following rules is being a good ___.",          answer: "citizen",       group: "Civics & Government" },
  { id: "g2s_cg11", question: "Freedoms guaranteed to all people by law are called ___.",                 answer: "rights",        group: "Civics & Government" },
  { id: "g2s_cg12", question: "Duties that citizens are expected to do, like paying taxes, are ___.",     answer: "responsibilities", group: "Civics & Government" },
  // Maps & Earth (12 items)
  { id: "g2s_me01", question: "How many continents are on Earth?",                                        answer: "7",             group: "Maps & Earth" },
  { id: "g2s_me02", question: "How many major oceans are on Earth?",                                      answer: "5",             group: "Maps & Earth" },
  { id: "g2s_me03", question: "The imaginary line that divides Earth into Northern and Southern Hemispheres is the ___.", answer: "equator", group: "Maps & Earth" },
  { id: "g2s_me04", question: "The continent where the United States, Canada, and Mexico are located is ___.", answer: "North America", group: "Maps & Earth" },
  { id: "g2s_me05", question: "The largest continent on Earth is ___.",                                   answer: "Asia",          group: "Maps & Earth" },
  { id: "g2s_me06", question: "The coldest continent surrounding the South Pole is ___.",                 answer: "Antarctica",    group: "Maps & Earth" },
  { id: "g2s_me07", question: "The ocean touching the West Coast of the US is the ___ Ocean.",             answer: "Pacific",       group: "Maps & Earth" },
  { id: "g2s_me08", question: "The ocean touching the East Coast of the US is the ___ Ocean.",             answer: "Atlantic",      group: "Maps & Earth" },
  { id: "g2s_me09", question: "A sphere-shaped 3D model of the Earth is a ___.",                           answer: "globe",         group: "Maps & Earth" },
  { id: "g2s_me10", question: "North, South, East, and West are called ___ directions.",                  answer: "cardinal",      group: "Maps & Earth" },
  { id: "g2s_me11", question: "Half of the Earth divided by the equator is called a ___.",                answer: "hemisphere",    group: "Maps & Earth" },
  { id: "g2s_me12", question: "A drawing that shows where places, land, and water are located is a ___.",  answer: "map",           group: "Maps & Earth" },
];

/* ---- 3rd Grade Social Studies ------------------------------- */
const GRADE3_SOCIAL = [
  // Native American Cultures (12 items)
  { id: "g3s_na01", question: "The Iroquois lived in large wooden homes called ___.",                     answer: "longhouses",    group: "Native American Cultures" },
  { id: "g3s_na02", question: "Pueblo Native Americans built multistory homes made of clay and sun-dried brick called ___.", answer: "adobe", group: "Native American Cultures" },
  { id: "g3s_na03", question: "Plains tribes built portable cone-shaped tents made of animal hides called ___.", answer: "tipis", group: "Native American Cultures" },
  { id: "g3s_na04", question: "Pacific Northwest tribes carved tall wooden poles showing family emblems called ___ poles.", answer: "totem", group: "Native American Cultures" },
  { id: "g3s_na05", question: "Native Americans of the Plains hunted wild ___ for food, clothing, and shelter.", answer: "bison",   group: "Native American Cultures" },
  { id: "g3s_na06", question: "Corn, beans, and squash were called the 'Three ___' by Native farmers.",  answer: "Sisters",       group: "Native American Cultures" },
  { id: "g3s_na07", question: "Shoes made of soft deer leather worn by Native Americans are called ___.",  answer: "moccasins",     group: "Native American Cultures" },
  { id: "g3s_na08", question: "Native American culture groups adapted to their surrounding natural ___.", answer: "environment", group: "Native American Cultures" },
  { id: "g3s_na09", question: "The Powhatan tribe lived along the Atlantic coastal plain in present-day ___.", answer: "Virginia", group: "Native American Cultures" },
  { id: "g3s_na10", question: "Wampum belts made of polished shells were used by northeastern tribes for ___.", answer: "storytelling and trading", group: "Native American Cultures" },
  { id: "g3s_na11", question: "In Plains tribes, community decisions were guided by respected tribal ___.", answer: "elders",       group: "Native American Cultures" },
  { id: "g3s_na12", question: "A gathering of Native Americans celebrating song, dance, and culture is a ___.", answer: "powwow", group: "Native American Cultures" },
  // Early Explorers (12 items)
  { id: "g3s_ee01", question: "Who sailed across the Atlantic Ocean in 1492 under the Spanish flag?",    answer: "Christopher Columbus", group: "Early Explorers" },
  { id: "g3s_ee02", question: "Which Spanish explorer landed in Florida in 1513 searching for the Fountain of Youth?", answer: "Ponce de León", group: "Early Explorers" },
  { id: "g3s_ee03", question: "Which English colony was founded in Virginia in 1607?",                   answer: "Jamestown",     group: "Early Explorers" },
  { id: "g3s_ee04", question: "The Pilgrims arrived at Plymouth, Massachusetts on a ship named the ___.", answer: "Mayflower",   group: "Early Explorers" },
  { id: "g3s_ee05", question: "Before landing, Pilgrims signed the Mayflower ___ to establish self-government.", answer: "Compact", group: "Early Explorers" },
  { id: "g3s_ee06", question: "Squanto was a Wampanoag man who helped the Pilgrims learn to grow ___.", answer: "corn",         group: "Early Explorers" },
  { id: "g3s_ee07", question: "Henry Hudson explored the waterways of present-day New York for the ___.", answer: "Dutch",        group: "Early Explorers" },
  { id: "g3s_ee08", question: "The route European explorers sought to reach Asia by sailing west was the ___ Passage.", answer: "Northwest", group: "Early Explorers" },
  { id: "g3s_ee09", question: "The exchange of plants, animals, and diseases between Old & New Worlds is the ___ Exchange.", answer: "Columbian", group: "Early Explorers" },
  { id: "g3s_ee10", question: "St. Augustine in Florida is the oldest continuously inhabited European settlement in the ___.", answer: "United States", group: "Early Explorers" },
  { id: "g3s_ee11", question: "French traders in Canada built an economic network trading in animal ___.", answer: "furs",        group: "Early Explorers" },
  { id: "g3s_ee12", question: "John Smith helped save Jamestown by enforcing the rule: 'He who does not work shall not ___.'", answer: "eat", group: "Early Explorers" },
  // Citizenship & Community (12 items)
  { id: "g3s_cc01", question: "The right of citizens to choose leaders by casting ballots is ___.",      answer: "voting",        group: "Citizenship & Community" },
  { id: "g3s_cc02", question: "Good citizens obey local, state, and federal ___.",                        answer: "laws",          group: "Citizenship & Community" },
  { id: "g3s_cc03", question: "Serving on a jury when called is a civic ___ of a citizen.",               answer: "duty",          group: "Citizenship & Community" },
  { id: "g3s_cc04", question: "Volunteering to help clean up a park is an example of civic ___.",         answer: "action",        group: "Citizenship & Community" },
  { id: "g3s_cc05", question: "The rule of law means that laws apply equally to ___.",                     answer: "everyone",      group: "Citizenship & Community" },
  { id: "g3s_cc06", question: "Local government services like trash collection are funded by ___.",        answer: "taxes",         group: "Citizenship & Community" },
  { id: "g3s_cc07", question: "The United States Constitution is the supreme ___ of the land.",           answer: "law",           group: "Citizenship & Community" },
  { id: "g3s_cc08", question: "Respecting different opinions and backgrounds promotes community ___.",     answer: "unity",         group: "Citizenship & Community" },
  { id: "g3s_cc09", question: "A person born in another country can become a US citizen through ___.",    answer: "naturalization", group: "Citizenship & Community" },
  { id: "g3s_cc10", question: "Freedom of speech allows citizens to express their ideas without fear of ___.", answer: "punishment", group: "Citizenship & Community" },
  { id: "g3s_cc11", question: "The motto 'E Pluribus Unum' means 'Out of many, ___'.",                   answer: "one",           group: "Citizenship & Community" },
  { id: "g3s_cc12", question: "Working together to solve community problems is called ___ action.",      answer: "civic",         group: "Citizenship & Community" },
];

/* ---- 4th Grade Social Studies ------------------------------- */
const GRADE4_SOCIAL = [
  // 13 Colonies & Revolution (12 items)
  { id: "g4s_cr01", question: "The 13 American colonies were ruled by Great ___.",                       answer: "Britain",       group: "13 Colonies & Revolution" },
  { id: "g4s_cr02", question: "Protesting colonists threw British tea into Boston Harbor in 1773 during the Boston ___ Party.", answer: "Tea", group: "13 Colonies & Revolution" },
  { id: "g4s_cr03", question: "The Revolutionary War began with 'the shot heard 'round the world' at Lexington and ___.", answer: "Concord", group: "13 Colonies & Revolution" },
  { id: "g4s_cr04", question: "Who wrote the primary draft of the Declaration of Independence in 1776?", answer: "Thomas Jefferson", group: "13 Colonies & Revolution" },
  { id: "g4s_cr05", question: "The Declaration of Independence was adopted on July 4, ___.",              answer: "1776",          group: "13 Colonies & Revolution" },
  { id: "g4s_cr06", question: "Who commanded the Continental Army during the American Revolution?",       answer: "George Washington", group: "13 Colonies & Revolution" },
  { id: "g4s_cr07", question: "Colonists who supported independence from Britain were called ___.",      answer: "Patriots",      group: "13 Colonies & Revolution" },
  { id: "g4s_cr08", question: "Colonists who remained loyal to the British King were called ___.",       answer: "Loyalists",     group: "13 Colonies & Revolution" },
  { id: "g4s_cr09", question: "The turning point battle of the Revolution in 1777 was the Battle of ___.", answer: "Saratoga",   group: "13 Colonies & Revolution" },
  { id: "g4s_cr10", question: "British General Cornwallis surrendered to Washington at the Battle of ___.", answer: "Yorktown",   group: "13 Colonies & Revolution" },
  { id: "g4s_cr11", question: "The slogan 'No taxation without ___' expressed colonial anger at British taxes.", answer: "representation", group: "13 Colonies & Revolution" },
  { id: "g4s_cr12", question: "The Treaty of Paris in 1783 officially recognized the United States as an ___ nation.", answer: "independent", group: "13 Colonies & Revolution" },
  // Westward Expansion (12 items)
  { id: "g4s_we01", question: "In 1803, President Jefferson bought the Louisiana Territory from ___.",    answer: "France",        group: "Westward Expansion" },
  { id: "g4s_we02", question: "Who led the expedition to explore the newly acquired Louisiana Purchase?", answer: "Lewis and Clark", group: "Westward Expansion" },
  { id: "g4s_we03", question: "The 2,000-mile trail pioneers traveled west to fertile farmland was the ___ Trail.", answer: "Oregon", group: "Westward Expansion" },
  { id: "g4s_we04", question: "Gold discovered at Sutter's Mill in 1848 sparked the California Gold ___.", answer: "Rush",         group: "Westward Expansion" },
  { id: "g4s_we05", question: "The forced relocation of Cherokee people to Oklahoma in 1838 is called the Trail of ___.", answer: "Tears", group: "Westward Expansion" },
  { id: "g4s_we06", question: "The belief that the US was destined to expand across the continent was ___ Destiny.", answer: "Manifest", group: "Westward Expansion" },
  { id: "g4s_we07", question: "The Texas fortress where defenders fought against the Mexican Army in 1836 was the ___.", answer: "Alamo", group: "Westward Expansion" },
  { id: "g4s_we08", question: "The completion of the Transcontinental Railroad in 1869 joined East and West at Promontory, ___.", answer: "Utah", group: "Westward Expansion" },
  { id: "g4s_we09", question: "Covered wagons used by westward pioneers were nicknamed prairie ___.",     answer: "schooners",     group: "Westward Expansion" },
  { id: "g4s_we10", question: "Eli Whitney's cotton gin in 1793 dramatically increased cotton production in the ___.", answer: "South", group: "Westward Expansion" },
  { id: "g4s_we11", question: "The Erie Canal connected the Hudson River with Lake ___ in 1825.",         answer: "Erie",          group: "Westward Expansion" },
  { id: "g4s_we12", question: "Robert Fulton's steamboat revolutionized transportation on American ___.", answer: "rivers",        group: "Westward Expansion" },
  // US Government & Constitution (12 items)
  { id: "g4s_gv01", question: "How many branches of government are created by the US Constitution?",     answer: "3",             group: "US Government & Constitution" },
  { id: "g4s_gv02", question: "Which branch of government makes laws? (Congress)",                        answer: "Legislative",   group: "US Government & Constitution" },
  { id: "g4s_gv03", question: "Which branch of government enforces laws? (President)",                       answer: "Executive",     group: "US Government & Constitution" },
  { id: "g4s_gv04", question: "Which branch of government interprets laws? (Supreme Court)",                 answer: "Judicial",      group: "US Government & Constitution" },
  { id: "g4s_gv05", question: "The US Congress is divided into the Senate and the House of ___.",          answer: "Representatives", group: "US Government & Constitution" },
  { id: "g4s_gv06", question: "How many senators does each state send to the US Senate?",                 answer: "2",             group: "US Government & Constitution" },
  { id: "g4s_gv07", question: "The Supreme Court consists of how many Justices?",                         answer: "9",             group: "US Government & Constitution" },
  { id: "g4s_gv08", question: "The President can reject a bill passed by Congress using a ___.",          answer: "veto",          group: "US Government & Constitution" },
  { id: "g4s_gv09", question: "The first 10 amendments to the US Constitution are called the Bill of ___.", answer: "Rights",    group: "US Government & Constitution" },
  { id: "g4s_gv10", question: "The system that prevents any single branch of government from becoming too powerful is ___ & balances.", answer: "checks", group: "US Government & Constitution" },
  { id: "g4s_gv11", question: "The preamble to the US Constitution begins with the phrase 'We the ___'.", answer: "People",        group: "US Government & Constitution" },
  { id: "g4s_gv12", question: "Who is known as the 'Father of the Constitution'?",                         answer: "James Madison", group: "US Government & Constitution" },
];

/* ---- 5th Grade Social Studies ------------------------------- */
const GRADE5_SOCIAL = [
  // US Constitution & Rights (12 items)
  { id: "g5s_cr01", question: "The Constitutional Convention met in 1787 in the city of ___.",           answer: "Philadelphia",  group: "US Constitution & Rights" },
  { id: "g5s_cr02", question: "The First Amendment guarantees freedom of speech, religion, press, assembly, and ___.", answer: "petition", group: "US Constitution & Rights" },
  { id: "g5s_cr03", question: "An official change or addition to the US Constitution is an ___.",        answer: "amendment",     group: "US Constitution & Rights" },
  { id: "g5s_cr04", question: "How many amendments currently make up the US Constitution?",              answer: "27",            group: "US Constitution & Rights" },
  { id: "g5s_cr05", question: "The 19th Amendment granted women the right to ___ in 1920.",              answer: "vote",          group: "US Constitution & Rights" },
  { id: "g5s_cr06", question: "The Great Compromise created a bicameral legislature balancing state population and ___ representation.", answer: "equal", group: "US Constitution & Rights" },
  { id: "g5s_cr07", question: "Federalism divides power between the national government and ___ governments.", answer: "state",    group: "US Constitution & Rights" },
  { id: "g5s_cr08", question: "The 13th Amendment to the Constitution officially abolished ___ in 1865.", answer: "slavery",      group: "US Constitution & Rights" },
  { id: "g5s_cr09", question: "Due process of law means the government must respect all legal ___ owed to a person.", answer: "rights", group: "US Constitution & Rights" },
  { id: "g5s_cr10", question: "The Electoral College is the process used in the US to elect the ___.",    answer: "President",     group: "US Constitution & Rights" },
  { id: "g5s_cr11", question: "The Supreme Court case Marbury v. Madison established the power of judicial ___.", answer: "review", group: "US Constitution & Rights" },
  { id: "g5s_cr12", question: "The highest legal authority in the United States is the US ___.",          answer: "Constitution",  group: "US Constitution & Rights" },
  // Civil War & Nation Building (12 items)
  { id: "g5s_cw01", question: "The American Civil War lasted from 1861 to ___.",                          answer: "1865",          group: "Civil War & Nation Building" },
  { id: "g5s_cw02", question: "Northern states fighting to preserve the United States were called the ___.", answer: "Union",       group: "Civil War & Nation Building" },
  { id: "g5s_cw03", question: "Southern states that seceded from the US formed the ___ States of America.", answer: "Confederate", group: "Civil War & Nation Building" },
  { id: "g5s_cw04", question: "Who was President of the Confederate States during the Civil War?",        answer: "Jefferson Davis", group: "Civil War & Nation Building" },
  { id: "g5s_cw05", question: "The opening shots of the Civil War were fired at Fort ___ in South Carolina.", answer: "Sumter",   group: "Civil War & Nation Building" },
  { id: "g5s_cw06", question: "The bloodiest single-day battle of the Civil War occurred at ___ in Maryland.", answer: "Antietam", group: "Civil War & Nation Building" },
  { id: "g5s_cw07", question: "President Lincoln issued the Emancipation ___ declaring slaves in rebel states free.", answer: "Proclamation", group: "Civil War & Nation Building" },
  { id: "g5s_cw08", question: "The turning point battle of the Civil War fought in July 1863 was ___.",  answer: "Gettysburg",    group: "Civil War & Nation Building" },
  { id: "g5s_cw09", question: "Confederate General Robert E. Lee surrendered to Union General Ulysses S. Grant at ___ Court House.", answer: "Appomattox", group: "Civil War & Nation Building" },
  { id: "g5s_cw10", question: "The era of rebuilding the South following the Civil War was called ___.", answer: "Reconstruction", group: "Civil War & Nation Building" },
  { id: "g5s_cw11", question: "Clara Barton cared for wounded soldiers in the Civil War and later founded the American Red ___.", answer: "Cross", group: "Civil War & Nation Building" },
  { id: "g5s_cw12", question: "Lincoln delivered the Gettysburg Address dedicating a national ___.",     answer: "cemetery",      group: "Civil War & Nation Building" },
  // World Cultures & History (12 items)
  { id: "g5s_wc01", question: "Ancient Egypt developed along the banks of the ___ River.",                answer: "Nile",          group: "World Cultures & History" },
  { id: "g5s_wc02", question: "Ancient Mesopotamia is known as the 'Cradle of ___'.",                     answer: "Civilization",  group: "World Cultures & History" },
  { id: "g5s_wc03", question: "Democracy originated in the ancient city-state of Athens in ___.",          answer: "Greece",        group: "World Cultures & History" },
  { id: "g5s_wc04", question: "The Silk Road was an ancient trade route connecting Europe with ___.",    answer: "China",         group: "World Cultures & History" },
  { id: "g5s_wc05", question: "Which ancient civilization built the Colosseum and an extensive road network?", answer: "Roman Empire", group: "World Cultures & History" },
  { id: "g5s_wc06", question: "The Industrial Revolution marked a shift from handmade goods to factory ___.", answer: "machines", group: "World Cultures & History" },
  { id: "g5s_wc07", question: "Immigrants arriving in New York in the late 1800s were processed at Ellis ___.", answer: "Island", group: "World Cultures & History" },
  { id: "g5s_wc08", question: "The Great Wall was built to protect ancient ___ from northern invaders.", answer: "China",         group: "World Cultures & History" },
  { id: "g5s_wc09", question: "Hieroglyphics were the ancient picture-based writing system of ___.",     answer: "Egypt",         group: "World Cultures & History" },
  { id: "g5s_wc10", question: "The Renaissance was a period of revived art, learning, and science in ___.", answer: "Europe",     group: "World Cultures & History" },
  { id: "g5s_wc11", question: "The United Nations was established in 1945 to promote international ___ and peace.", answer: "cooperation", group: "World Cultures & History" },
  { id: "g5s_wc12", question: "Ancient Mayan, Aztec, and Inca civilizations developed in the ___.",       answer: "Americas",      group: "World Cultures & History" },
];

/* ---- Subjects registry ------------------------------------- */
const SUBJECTS = [
  { id: "capitals",        name: "State Capitals",              emoji: "🗺️", grade: null, desc: "All 50 US state capitals" },
  { id: "kinder_math",     name: "Kindergarten Math",           emoji: "🔢", grade: 0,    desc: "Number words, counting, shapes & comparing" },
  { id: "kinder_reading",  name: "Kindergarten Reading",        emoji: "🔤", grade: 0,    desc: "Alphabet letters, beginning sounds & vowels" },
  { id: "kinder_social",   name: "Kindergarten Social Studies", emoji: "🗽", grade: 0,    desc: "Community helpers, rules & US symbols" },
  { id: "grade1_math",     name: "1st Grade Math",              emoji: "➕", grade: 1,    desc: "Addition, subtraction, shapes & counting" },
  { id: "grade1_reading",  name: "1st Grade Reading",           emoji: "📖", grade: 1,    desc: "Dolch sight words — Pre-Primer through Grade 1" },
  { id: "grade1_social",   name: "1st Grade Social Studies",    emoji: "🏘️", grade: 1,    desc: "Neighborhoods, American symbols & basic economics" },
  { id: "grade2_math",     name: "2nd Grade Math",              emoji: "🔢", grade: 2,    desc: "Place value, addition, time, money & fractions" },
  { id: "grade2_reading",  name: "2nd Grade Reading",           emoji: "📖", grade: 2,    desc: "Dolch 2nd grade sight words" },
  { id: "grade2_social",   name: "2nd Grade Social Studies",    emoji: "🏛️", grade: 2,    desc: "Historical heroes, government & maps" },
  { id: "grade3_math",     name: "3rd Grade Math",              emoji: "✖️", grade: 3,    desc: "Multiplication, division, rounding & fractions" },
  { id: "grade3_reading",  name: "3rd Grade Reading",           emoji: "📖", grade: 3,    desc: "Sight words, prefixes, suffixes & synonyms" },
  { id: "grade3_science",   name: "3rd Grade Science",          emoji: "🔬", grade: 3,    desc: "Life science, earth science & physical science" },
  { id: "grade3_geography", name: "3rd Grade Geography",        emoji: "🌍", grade: 3,    desc: "Map skills, landforms & US regions" },
  { id: "grade3_social",   name: "3rd Grade Social Studies",    emoji: "📜", grade: 3,    desc: "Native cultures, explorers & citizenship" },
  { id: "grade3_financial", name: "3rd Grade Money",            emoji: "💰", grade: 3,    desc: "Earning, saving, spending & banking" },
  { id: "grade3_spanish",   name: "3rd Grade Spanish",          emoji: "🇪🇸", grade: 3,   desc: "Numbers, colors, greetings & family" },
  { id: "grade3_french",    name: "3rd Grade French",           emoji: "🇫🇷", grade: 3,   desc: "Numbers, colors, greetings & family in French" },
  { id: "grade4_math",     name: "4th Grade Math",              emoji: "🔢", grade: 4,    desc: "Factors, geometry, decimals & fractions" },
  { id: "grade4_reading",  name: "4th Grade Reading",           emoji: "📖", grade: 4,    desc: "Parts of speech, figurative language & vocabulary" },
  { id: "grade4_science",   name: "4th Grade Science",          emoji: "🔬", grade: 4,    desc: "Cells, solar system, energy & Florida ecosystems" },
  { id: "grade4_geography", name: "4th Grade Geography",        emoji: "🌍", grade: 4,    desc: "World geography, US geography & economics" },
  { id: "grade4_social",   name: "4th Grade Social Studies",    emoji: "⚔️", grade: 4,    desc: "13 Colonies, Westward expansion & Constitution" },
  { id: "grade4_financial", name: "4th Grade Money",            emoji: "💰", grade: 4,    desc: "Income, taxes, investing & consumer skills" },
  { id: "grade4_spanish",   name: "4th Grade Spanish",          emoji: "🇪🇸", grade: 4,   desc: "Verbs, food & community places" },
  { id: "grade4_french",    name: "4th Grade French",           emoji: "🇫🇷", grade: 4,   desc: "Verb conjugation, food & places in French" },
  { id: "grade5_math",     name: "5th Grade Math",              emoji: "➗", grade: 5,    desc: "Order of operations, fractions, percentages & geometry" },
  { id: "grade5_reading",  name: "5th Grade Reading",           emoji: "📖", grade: 5,    desc: "Figurative language, literary terms & grammar" },
  { id: "grade5_science",   name: "5th Grade Science",          emoji: "🔬", grade: 5,    desc: "Life, earth & physical science + scientific method" },
  { id: "grade5_geography", name: "5th Grade Geography",        emoji: "🌍", grade: 5,    desc: "World history, government & economics" },
  { id: "grade5_social",   name: "5th Grade Social Studies",    emoji: "🏛️", grade: 5,    desc: "US Constitution, Civil War & world cultures" },
  { id: "grade5_financial", name: "5th Grade Money",            emoji: "💰", grade: 5,    desc: "Personal finance, economic systems & careers" },
  { id: "grade5_spanish",   name: "5th Grade Spanish",          emoji: "🇪🇸", grade: 5,   desc: "Sentence building, past tense & culture" },
  { id: "grade5_french",    name: "5th Grade French",           emoji: "🇫🇷", grade: 5,   desc: "Past tense, reading comprehension & French culture" },
];

/* ---- Subject helpers --------------------------------------- */
function getSubjectItems(subjectId) {
  if (subjectId === "capitals") {
    return STATES.map(function (s) {
      return { id: s.abbr, question: "What is the capital of " + s.state + "?", answer: s.capital, group: s.region };
    });
  }
  if (subjectId === "kinder_math")     return KINDER_MATH;
  if (subjectId === "kinder_reading")  return KINDER_READING;
  if (subjectId === "kinder_social")   return KINDER_SOCIAL;
  if (subjectId === "grade1_math")     return GRADE1_MATH;
  if (subjectId === "grade1_reading")  return GRADE1_READING;
  if (subjectId === "grade1_social")   return GRADE1_SOCIAL;
  if (subjectId === "grade2_math")     return GRADE2_MATH;
  if (subjectId === "grade2_reading")  return GRADE2_READING;
  if (subjectId === "grade2_social")   return GRADE2_SOCIAL;
  if (subjectId === "grade3_math")     return GRADE3_MATH;
  if (subjectId === "grade3_reading")  return GRADE3_READING;
  if (subjectId === "grade3_science")   return GRADE3_SCIENCE;
  if (subjectId === "grade3_geography") return GRADE3_GEOGRAPHY;
  if (subjectId === "grade3_social")   return GRADE3_SOCIAL;
  if (subjectId === "grade4_math")     return GRADE4_MATH;
  if (subjectId === "grade4_reading")  return GRADE4_READING;
  if (subjectId === "grade4_science")   return GRADE4_SCIENCE;
  if (subjectId === "grade4_geography") return GRADE4_GEOGRAPHY;
  if (subjectId === "grade4_social")   return GRADE4_SOCIAL;
  if (subjectId === "grade5_math")     return GRADE5_MATH;
  if (subjectId === "grade5_reading")   return GRADE5_READING;
  if (subjectId === "grade5_science")   return GRADE5_SCIENCE;
  if (subjectId === "grade5_geography") return GRADE5_GEOGRAPHY;
  if (subjectId === "grade5_social")   return GRADE5_SOCIAL;
  if (subjectId === "grade3_financial") return GRADE3_FINANCIAL;
  if (subjectId === "grade3_spanish")   return GRADE3_SPANISH;
  if (subjectId === "grade4_financial") return GRADE4_FINANCIAL;
  if (subjectId === "grade4_spanish")   return GRADE4_SPANISH;
  if (subjectId === "grade5_financial") return GRADE5_FINANCIAL;
  if (subjectId === "grade5_spanish")   return GRADE5_SPANISH;
  if (subjectId === "grade3_french")    return GRADE3_FRENCH;
  if (subjectId === "grade4_french")    return GRADE4_FRENCH;
  if (subjectId === "grade5_french")    return GRADE5_FRENCH;
  return [];
}

function getSubjectGroups(subjectId) {
  if (subjectId === "capitals") return REGIONS;
  const seen = [];
  getSubjectItems(subjectId).forEach(function (item) {
    if (seen.indexOf(item.group) === -1) seen.push(item.group);
  });
  return seen;
}

