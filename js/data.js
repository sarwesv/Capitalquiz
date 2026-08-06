
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
    ["add_0_0","Mia has 7 crayons. She gets 6 more. How many crayons in all?","13","Addition"],
    ["add_0_1","There are 9 frogs on a log and 8 more jump on. How many now?","17","Addition"],
    ["add_0_2","8 + ___ = 15. What is the missing number?","7","Addition"],
    ["add_0_3","5 + ___ = 13. What is the missing number?","8","Addition"],
    ["add_0_4","Jake has 6 stickers. His friend gives him 7 more. How many?","13","Addition"],
    ["add_0_5","9 + 9 = ?","18","Addition"],
    ["add_0_6","There are 8 birds in a tree. 5 more land. How many birds?","13","Addition"],
    ["add_0_7","6 + ___ = 14. What is the missing number?","8","Addition"],
    ["add_0_8","7 + 8 = ?","15","Addition"],
    ["add_0_9","There are 9 apples in a basket. 4 more are added. How many?","13","Addition"],
    ["add_1_0","9 + 7 = ?","16","Addition"],
    ["add_1_1","8 + 8 = ?","16","Addition"],
    ["add_1_2","___ + 6 = 20. What is the missing number?","14","Addition"],
    ["add_1_3","Sam reads 8 pages Monday and 9 pages Tuesday. How many pages?","17","Addition"],
    ["add_1_4","7 + 6 = ?","13","Addition"],
    ["add_1_5","9 + 5 = ?","14","Addition"],
    ["add_1_6","There are 6 red fish and 8 blue fish. How many fish in all?","14","Addition"],
    ["add_1_7","7 + ___ = 16. What is the missing number?","9","Addition"],
    ["add_1_8","8 + 7 = ?","15","Addition"],
    ["add_1_9","Ana has 9 marbles. She finds 8 more. How many marbles?","17","Addition"],
    ["add_2_0","6 + 6 = ?","12","Addition"],
    ["add_2_1","___ + 7 = 15. What is the missing number?","8","Addition"],
    ["add_2_2","9 + 6 = ?","15","Addition"],
    ["add_2_3","There are 7 dogs and 9 cats at the shelter. How many animals?","16","Addition"],
    ["add_2_4","8 + 6 = ?","14","Addition"],
    ["add_2_5","5 + 9 = ?","14","Addition"],
    ["add_2_6","Luis scores 8 points then 9 more. How many points total?","17","Addition"],
    ["add_2_7","7 + 7 = ?","14","Addition"],
    ["add_2_8","6 + 9 = ?","15","Addition"],
    ["add_2_9","9 + 8 = ?","17","Addition"],
    ["add_3_0","There are 5 boys and 8 girls on the team. How many players?","13","Addition"],
    ["add_3_1","6 + 7 = ?","13","Addition"],
    ["add_3_2","8 + 5 = ?","13","Addition"],
    ["add_3_3","7 + 9 = ?","16","Addition"],
    ["add_3_4","___ + 8 = 17. What is the missing number?","9","Addition"],
    ["add_3_5","9 + 4 = ?","13","Addition"],
    ["add_3_6","8 + 9 = ?","17","Addition"],
    ["add_3_7","There are 6 pigeons and 7 sparrows. How many birds total?","13","Addition"],
    ["add_3_8","9 + 9 + 2 = ?","20","Addition"],
    ["add_3_9","5 + 6 + 4 = ?","15","Addition"],
    ["add_4_0","7 + 5 + 3 = ?","15","Addition"],
    ["add_4_1","The store has 10 red balls and 8 blue balls. How many balls?","18","Addition"],
    ["add_4_2","6 + 8 = ?","14","Addition"],
    ["add_4_3","9 + 3 = ?","12","Addition"],
    ["add_4_4","7 + 4 + 5 = ?","16","Addition"],
    ["add_4_5","8 + 4 = ?","12","Addition"],
    ["add_4_6","___ + 9 = 18. What is the missing number?","9","Addition"],
    ["add_4_7","6 + 5 = ?","11","Addition"],
    ["add_4_8","8 + 3 = ?","11","Addition"],
    ["add_4_9","9 + 2 = ?","11","Addition"],
    ["add_5_0","7 + 3 = ?","10","Addition"],
    ["add_5_1","6 + 4 = ?","10","Addition"],
    ["add_5_2","5 + 8 = ?","13","Addition"],
    ["add_5_3","4 + 9 = ?","13","Addition"],
    ["add_5_4","3 + 8 = ?","11","Addition"],
    ["add_5_5","6 + 3 = ?","9","Addition"],
    ["add_5_6","7 + 2 = ?","9","Addition"],
    ["add_5_7","5 + 7 = ?","12","Addition"],
    ["add_5_8","4 + 8 = ?","12","Addition"],
    ["add_5_9","3 + 9 = ?","12","Addition"],
    ["add_6_0","6 + 2 = ?","8","Addition"],
    ["add_6_1","5 + 6 = ?","11","Addition"],
    ["add_6_2","4 + 7 = ?","11","Addition"],
    ["add_6_3","3 + 7 = ?","10","Addition"],
    ["add_6_4","5 + 5 = ?","10","Addition"],
    ["add_6_5","4 + 6 = ?","10","Addition"],
    ["add_6_6","8 + 2 = ?","10","Addition"],
    ["add_6_7","3 + 6 = ?","9","Addition"],
    ["add_6_8","4 + 5 = ?","9","Addition"],
    ["add_6_9","2 + 8 = ?","10","Addition"],
    ["add_7_0","1 + 9 = ?","10","Addition"],
    ["add_7_1","3 + 4 = ?","7","Addition"],
    ["add_7_2","2 + 6 = ?","8","Addition"],
    ["add_7_3","4 + 4 = ?","8","Addition"],
    ["add_7_4","5 + 3 = ?","8","Addition"],
    ["add_7_5","2 + 7 = ?","9","Addition"],
    ["add_7_6","3 + 5 = ?","8","Addition"],
    ["add_7_7","1 + 7 = ?","8","Addition"],
    ["add_7_8","2 + 5 = ?","7","Addition"],
    ["add_7_9","1 + 6 = ?","7","Addition"],
    ["add_8_0","3 + 3 = ?","6","Addition"],
    ["add_8_1","2 + 4 = ?","6","Addition"],
    ["add_8_2","1 + 5 = ?","6","Addition"],
    ["add_8_3","4 + 2 = ?","6","Addition"],
    ["add_8_4","2 + 3 = ?","5","Addition"],
    ["add_8_5","1 + 4 = ?","5","Addition"],
    ["add_8_6","3 + 2 = ?","5","Addition"],
    ["add_8_7","1 + 3 = ?","4","Addition"],
    ["add_8_8","2 + 2 = ?","4","Addition"],
    ["add_8_9","1 + 2 = ?","3","Addition"],
    ["add_9_0","0 + 5 = ?","5","Addition"],
    ["add_9_1","5 + 0 = ?","5","Addition"],
    ["add_9_2","0 + 9 = ?","9","Addition"],
    ["add_9_3","9 + 0 = ?","9","Addition"],
    ["add_9_4","2 + 9 = ?","11","Addition"],
    ["add_9_5","1 + 8 = ?","9","Addition"],
    ["add_9_6","0 + 7 = ?","7","Addition"],
    ["add_9_7","1 + 1 = ?","2","Addition"],
    ["add_9_8","0 + 3 = ?","3","Addition"],
    ["add_9_9","0 + 0 = ?","0","Addition"],
    ["add_10_0","10 + 0 = ?","10","Addition"],
  ];
  addItems.forEach(function (a) { items.push(a); });

  // Subtraction within 20 (word problems and unknown addends)
  var subItems = [
    ["sub_20_9","There were 20 cookies. The class ate 9. How many are left?","11","Subtraction"],
    ["sub_17_8","17 − 8 = ?","9","Subtraction"],
    ["sub_16_7","16 − 7 = ?","9","Subtraction"],
    ["sub_15_6","A jar had 15 candies. Kai ate 6. How many remain?","9","Subtraction"],
    ["sub_18_9","18 − 9 = ?","9","Subtraction"],
    ["sub_14_8","14 − 8 = ?","6","Subtraction"],
    ["sub_13_7","There are 13 birds. 7 fly away. How many birds stay?","6","Subtraction"],
    ["sub_16_9","16 − 9 = ?","7","Subtraction"],
    ["sub_15_8","15 − 8 = ?","7","Subtraction"],
    ["sub_13_6","13 − 6 = ?","7","Subtraction"],
    ["sub_12_5","Maya had 12 grapes. She ate 5. How many grapes are left?","7","Subtraction"],
    ["sub_11_4","11 − 4 = ?","7","Subtraction"],
    ["sub_14_7","14 − 7 = ?","7","Subtraction"],
    ["sub_15_7","15 − 7 = ?","8","Subtraction"],
    ["sub_17_9","17 − 9 = ?","8","Subtraction"],
    ["sub_14_6","There were 14 fish. 6 swam away. How many are left?","8","Subtraction"],
    ["sub_12_4","12 − 4 = ?","8","Subtraction"],
    ["sub_11_3","11 − 3 = ?","8","Subtraction"],
    ["sub_13_5","13 − 5 = ?","8","Subtraction"],
    ["sub_18_8","18 − 8 = ?","10","Subtraction"],
    ["sub_10_0","10 − 0 = ?","10","Subtraction"],
    ["sub_10_1","10 − 1 = ?","9","Subtraction"],
    ["sub_10_2","10 − 2 = ?","8","Subtraction"],
    ["sub_10_3","There are 10 pencils. 3 are broken. How many work?","7","Subtraction"],
    ["sub_10_4","10 − 4 = ?","6","Subtraction"],
    ["sub_10_5","10 − 5 = ?","5","Subtraction"],
    ["sub_10_6","10 − 6 = ?","4","Subtraction"],
    ["sub_10_7","10 − 7 = ?","3","Subtraction"],
    ["sub_10_8","10 − 8 = ?","2","Subtraction"],
    ["sub_10_9","10 − 9 = ?","1","Subtraction"],
    ["sub_10_10","10 − 10 = ?","0","Subtraction"],
    ["sub_9_0","9 − 0 = ?","9","Subtraction"],
    ["sub_9_1","9 − 1 = ?","8","Subtraction"],
    ["sub_9_2","9 − 2 = ?","7","Subtraction"],
    ["sub_9_3","9 − 3 = ?","6","Subtraction"],
    ["sub_9_4","9 − 4 = ?","5","Subtraction"],
    ["sub_9_5","9 − 5 = ?","4","Subtraction"],
    ["sub_9_6","9 − 6 = ?","3","Subtraction"],
    ["sub_9_7","9 − 7 = ?","2","Subtraction"],
    ["sub_9_8","9 − 8 = ?","1","Subtraction"],
    ["sub_9_9","9 − 9 = ?","0","Subtraction"],
    ["sub_8_0","8 − 0 = ?","8","Subtraction"],
    ["sub_8_1","8 − 1 = ?","7","Subtraction"],
    ["sub_8_2","8 − 2 = ?","6","Subtraction"],
    ["sub_8_3","8 − 3 = ?","5","Subtraction"],
    ["sub_8_4","8 − 4 = ?","4","Subtraction"],
    ["sub_8_5","8 − 5 = ?","3","Subtraction"],
    ["sub_8_6","8 − 6 = ?","2","Subtraction"],
    ["sub_8_7","8 − 7 = ?","1","Subtraction"],
    ["sub_8_8","8 − 8 = ?","0","Subtraction"],
    ["sub_7_0","7 − 0 = ?","7","Subtraction"],
    ["sub_7_1","7 − 1 = ?","6","Subtraction"],
    ["sub_7_2","7 − 2 = ?","5","Subtraction"],
    ["sub_7_3","7 − 3 = ?","4","Subtraction"],
    ["sub_7_4","7 − 4 = ?","3","Subtraction"],
    ["sub_7_5","7 − 5 = ?","2","Subtraction"],
    ["sub_7_6","7 − 6 = ?","1","Subtraction"],
    ["sub_7_7","7 − 7 = ?","0","Subtraction"],
    ["sub_6_0","6 − 0 = ?","6","Subtraction"],
    ["sub_6_1","6 − 1 = ?","5","Subtraction"],
    ["sub_6_2","6 − 2 = ?","4","Subtraction"],
    ["sub_6_3","6 − 3 = ?","3","Subtraction"],
    ["sub_6_4","6 − 4 = ?","2","Subtraction"],
    ["sub_6_5","6 − 5 = ?","1","Subtraction"],
    ["sub_6_6","6 − 6 = ?","0","Subtraction"],
    ["sub_5_0","5 − 0 = ?","5","Subtraction"],
    ["sub_5_1","5 − 1 = ?","4","Subtraction"],
    ["sub_5_2","5 − 2 = ?","3","Subtraction"],
    ["sub_5_3","5 − 3 = ?","2","Subtraction"],
    ["sub_5_4","5 − 4 = ?","1","Subtraction"],
    ["sub_5_5","5 − 5 = ?","0","Subtraction"],
    ["sub_4_0","4 − 0 = ?","4","Subtraction"],
    ["sub_4_1","4 − 1 = ?","3","Subtraction"],
    ["sub_4_2","4 − 2 = ?","2","Subtraction"],
    ["sub_4_3","4 − 3 = ?","1","Subtraction"],
    ["sub_4_4","4 − 4 = ?","0","Subtraction"],
    ["sub_3_0","3 − 0 = ?","3","Subtraction"],
    ["sub_3_1","3 − 1 = ?","2","Subtraction"],
    ["sub_3_2","3 − 2 = ?","1","Subtraction"],
    ["sub_3_3","3 − 3 = ?","0","Subtraction"],
    ["sub_2_0","2 − 0 = ?","2","Subtraction"],
    ["sub_2_1","2 − 1 = ?","1","Subtraction"],
    ["sub_2_2","2 − 2 = ?","0","Subtraction"],
    ["sub_1_0","1 − 0 = ?","1","Subtraction"],
    ["sub_1_1","1 − 1 = ?","0","Subtraction"],
    ["sub_0_0","0 − 0 = ?","0","Subtraction"],
    ["sub_11_5","There were 11 apples. 5 were eaten. How many remain?","6","Subtraction"],
    ["sub_12_6","12 − 6 = ?","6","Subtraction"],
    ["sub_11_6","11 − 6 = ?","5","Subtraction"],
    ["sub_12_7","12 − 7 = ?","5","Subtraction"],
    ["sub_11_7","11 − 7 = ?","4","Subtraction"],
    ["sub_11_8","11 − 8 = ?","3","Subtraction"],
    ["sub_12_8","12 − 8 = ?","4","Subtraction"],
    ["sub_12_9","12 − 9 = ?","3","Subtraction"],
    ["sub_11_9","11 − 9 = ?","2","Subtraction"],
    ["sub_11_2","11 − 2 = ?","9","Subtraction"],
  ];
  subItems.forEach(function (s) { items.push(s); });

  // Shapes — include halves/quarters, name shapes
  const shapes = [
    ["shape_triangle","A shape with 3 sides and 3 corners is a ___.","triangle","Shapes"],
    ["shape_square","A shape with 4 equal sides and 4 right angles is a ___.","square","Shapes"],
    ["shape_rectangle","A shape with 4 sides where opposite sides are equal is a ___.","rectangle","Shapes"],
    ["shape_pentagon","How many sides does a pentagon have?","5","Shapes"],
    ["shape_hexagon","How many sides does a hexagon have?","6","Shapes"],
    ["shape_octagon","How many sides does an octagon have?","8","Shapes"],
    ["shape_circle","How many corners does a circle have?","0","Shapes"],
    ["shape_sides_tri","A triangle is cut into 2 equal parts. Each part is one ___.","half","Shapes"],
    ["shape_sides_hex","A circle cut into 4 equal parts — each piece is one ___.","quarter","Shapes"],
    ["shape_sides_sq","A square is folded to make 2 equal parts. Each part is ___.","1/2","Shapes"],
  ];
  shapes.forEach(function (s) { items.push(s); });

  // Counting sequences — extend to 120 and add place value
  const counting = [
    ["cnt2_6","Count by 2s: 2, 4, ___ ?","6","Counting"],
    ["cnt2_8","Count by 2s: 4, 6, ___ ?","8","Counting"],
    ["cnt2_10","Count by 2s: 6, 8, ___ ?","10","Counting"],
    ["cnt2_12","Count by 2s: 8, 10, ___ ?","12","Counting"],
    ["cnt5_15","Count by 5s: 5, 10, ___ ?","15","Counting"],
    ["cnt5_20","Count by 5s: 10, 15, ___ ?","20","Counting"],
    ["cnt5_25","Count by 5s: 15, 20, ___ ?","25","Counting"],
    ["cnt10_30","Count by 10s: 10, 20, ___ ?","30","Counting"],
    ["cnt10_40","Count by 10s: 20, 30, ___ ?","40","Counting"],
    ["cnt10_50","Count by 10s: 30, 40, ___ ?","50","Counting"],
  ];
  counting.forEach(function (c) { items.push(c); });

  return items;
})();

/* ---- 1st Grade Reading (Phonics & Comprehension) ----------- */
const GRADE1_READING = _u([
  // Pre-Primer (40 items — phonics, blends, comprehension)
  ["sw_a","Which word has the short 'a' sound: 'cat' or 'cake'?","cat","Pre-Primer"],
  ["sw_and","What blend makes the start of 'clap'?","cl","Pre-Primer"],
  ["sw_away","A story says a girl smiled when she got a present. She is probably ___.","happy","Pre-Primer"],
  ["sw_big","Which word rhymes with 'cat': 'bat', 'cup', or 'dog'?","bat","Pre-Primer"],
  ["sw_blue","What blend makes the start of 'stop'?","st","Pre-Primer"],
  ["sw_can","Which word has the short 'i' sound: 'pin' or 'pine'?","pin","Pre-Primer"],
  ["sw_come","Which word rhymes with 'dog': 'log', 'dig', or 'dug'?","log","Pre-Primer"],
  ["sw_down","What digraph makes the start of 'ship'?","sh","Pre-Primer"],
  ["sw_find","A boy keeps trying to ride his bike after falling. He shows ___.","persistence","Pre-Primer"],
  ["sw_for","What digraph makes the start of 'chin'?","ch","Pre-Primer"],
  ["sw_funny","Which word rhymes with 'sun': 'run', 'sat', or 'hop'?","run","Pre-Primer"],
  ["sw_go","What blend makes the start of 'frog'?","fr","Pre-Primer"],
  ["sw_help","Which word has the short 'o' sound: 'hop' or 'hope'?","hop","Pre-Primer"],
  ["sw_here","What digraph makes the start of 'that'?","th","Pre-Primer"],
  ["sw_I","Which word rhymes with 'hen': 'ten', 'tan', or 'tin'?","ten","Pre-Primer"],
  ["sw_in","What blend makes the start of 'drip'?","dr","Pre-Primer"],
  ["sw_is","Which word has the short 'u' sound: 'bug' or 'huge'?","bug","Pre-Primer"],
  ["sw_it","Which word rhymes with 'big': 'pig', 'bag', or 'beg'?","pig","Pre-Primer"],
  ["sw_jump","What blend makes the start of 'slip'?","sl","Pre-Primer"],
  ["sw_little","A story says the dog wagged its tail. The dog is probably ___.","happy","Pre-Primer"],
  ["sw_look","Which word has the short 'e' sound: 'bed' or 'bead'?","bed","Pre-Primer"],
  ["sw_make","What blend makes the start of 'grab'?","gr","Pre-Primer"],
  ["sw_me","Which word rhymes with 'hop': 'top', 'tip', or 'tap'?","top","Pre-Primer"],
  ["sw_my","What digraph makes the start of 'where'?","wh","Pre-Primer"],
  ["sw_not","Which word has the long 'a' sound (CVCe): 'cake' or 'cap'?","cake","Pre-Primer"],
  ["sw_one","What blend makes the start of 'brake'?","br","Pre-Primer"],
  ["sw_play","Which word rhymes with 'cup': 'pup', 'cap', or 'cop'?","pup","Pre-Primer"],
  ["sw_red","Which word has the long 'i' sound (CVCe): 'kite' or 'kit'?","kite","Pre-Primer"],
  ["sw_run","What blend makes the start of 'spin'?","sp","Pre-Primer"],
  ["sw_said","Which word rhymes with 'lake': 'cake', 'kick', or 'look'?","cake","Pre-Primer"],
  ["sw_see","What blend makes the start of 'trip'?","tr","Pre-Primer"],
  ["sw_the","Which word has the long 'o' sound (CVCe): 'note' or 'not'?","note","Pre-Primer"],
  ["sw_three","What blend makes the start of 'plate'?","pl","Pre-Primer"],
  ["sw_to","Which word rhymes with 'tip': 'ship', 'shop', or 'shape'?","ship","Pre-Primer"],
  ["sw_two","Which word has the long 'u' sound (CVCe): 'cube' or 'cub'?","cube","Pre-Primer"],
  ["sw_up","What blend makes the start of 'class'?","cl","Pre-Primer"],
  ["sw_we","Which word rhymes with 'jet': 'net', 'not', or 'nut'?","net","Pre-Primer"],
  ["sw_where","What blend makes the start of 'blend'?","bl","Pre-Primer"],
  ["sw_yellow","Which word has the short 'a' sound: 'mat' or 'mate'?","mat","Pre-Primer"],
  ["sw_you","A story says it is getting dark and stormy. The weather will probably ___.","rain","Pre-Primer"],
  // Primer (40 items — decoding, comprehension, main idea)
  ["sw_all","What word do you get when you add 's' to the front of 'top'?","stop","Primer"],
  ["sw_am","Which word has the short 'a': 'ran' or 'rain'?","ran","Primer"],
  ["sw_are","What digraph makes the sound in the middle of 'bath'?","th","Primer"],
  ["sw_at","A story's main character learns to share. The main idea is ___.","sharing","Primer"],
  ["sw_ate","What blend makes the start of 'crab'?","cr","Primer"],
  ["sw_be","Which word rhymes with 'light': 'night', 'not', or 'net'?","night","Primer"],
  ["sw_black","What sound does the blend 'wh' make, as in 'wheel'?","w","Primer"],
  ["sw_brown","Which word has two syllables: 'rabbit' or 'run'?","rabbit","Primer"],
  ["sw_but","What word do you get when you add 'fl' before 'at'?","flat","Primer"],
  ["sw_came","A story says a dog sniffed around the yard. The dog is probably ___.","searching","Primer"],
  ["sw_did","Which word has the long 'e' sound: 'feet' or 'fed'?","feet","Primer"],
  ["sw_do","What blend makes the start of 'smile'?","sm","Primer"],
  ["sw_eat","Which word rhymes with 'moon': 'spoon', 'spin', or 'span'?","spoon","Primer"],
  ["sw_four","What word do you get when you add 'pr' before 'int'?","print","Primer"],
  ["sw_get","Which word has the short 'o': 'clock' or 'cloak'?","clock","Primer"],
  ["sw_good","What blend makes the start of 'snack'?","sn","Primer"],
  ["sw_have","A boy feels his stomach growl and heads to the kitchen. He is probably ___.","hungry","Primer"],
  ["sw_he","Which word has two syllables: 'pencil' or 'pen'?","pencil","Primer"],
  ["sw_into","What word do you get when you add 'cr' before 'ack'?","crack","Primer"],
  ["sw_like","Which word rhymes with 'this': 'hiss', 'has', or 'his'?","hiss","Primer"],
  ["sw_must","What blend makes the start of 'swing'?","sw","Primer"],
  ["sw_new","Which word has the long 'a' sound: 'rain' or 'ran'?","rain","Primer"],
  ["sw_no","What digraph do 'phone' and 'photo' share at the start?","ph","Primer"],
  ["sw_now","A story says a turtle walks very, very slowly. The turtle is ___.","slow","Primer"],
  ["sw_on","Which word has the short 'u': 'truck' or 'true'?","truck","Primer"],
  ["sw_our","What word do you get when you add 'str' before 'ong'?","strong","Primer"],
  ["sw_out","Which word has the long 'i' sound: 'shine' or 'shin'?","shine","Primer"],
  ["sw_please","What blend makes the start of 'skate'?","sk","Primer"],
  ["sw_pretty","Which word has two syllables: 'basket' or 'bat'?","basket","Primer"],
  ["sw_ran","A cat hid under the bed when it heard thunder. The cat is probably ___.","scared","Primer"],
  ["sw_ride","What word do you get when you add 'bl' before 'ock'?","block","Primer"],
  ["sw_saw","Which word has the long 'o' sound: 'snow' or 'snob'?","snow","Primer"],
  ["sw_say","What blend makes the start of 'think'? (two letters)","th","Primer"],
  ["sw_she","Which word has two syllables: 'apple' or 'ape'?","apple","Primer"],
  ["sw_so","What word do you get when you add 'sp' before 'ot'?","spot","Primer"],
  ["sw_some","Which word has the long 'u' sound: 'tune' or 'tun'?","tune","Primer"],
  ["sw_soon","A girl reads every night before bed. She probably likes ___.","books","Primer"],
  ["sw_that","What blend makes the start of 'thick'? (two letters)","th","Primer"],
  ["sw_there","Which word rhymes with 'bat': 'flat', 'fit', or 'fat'?","flat","Primer"],
  ["sw_they","A story talks about why rain is important for plants. This text is mostly about ___.","rain and plants","Primer"],
  ["sw_this","What word do you get when you add 'sc' before 'are'?","scare","Primer"],
  ["sw_too","Which word has two syllables: 'muffin' or 'mud'?","muffin","Primer"],
  ["sw_under","What blend makes the start of 'tree'?","tr","Primer"],
  ["sw_want","Which word rhymes with 'ship': 'chip', 'chop', or 'chap'?","chip","Primer"],
  ["sw_was","A bird builds a nest and lays eggs. What will likely happen next?","eggs will hatch","Primer"],
  ["sw_well","What word do you get when you add 'br' before 'ing'?","bring","Primer"],
  ["sw_went","Which word has the long 'e' sound: 'bead' or 'bed'?","bead","Primer"],
  ["sw_what","What blend makes the start of 'flock'?","fl","Primer"],
  ["sw_white","Which word rhymes with 'make': 'lake', 'lick', or 'lock'?","lake","Primer"],
  ["sw_who","A story says a girl shivered and pulled her coat tight. The weather is ___.","cold","Primer"],
  ["sw_will","What word do you get when you add 'th' before 'ink'?","think","Primer"],
  ["sw_with","Which word has two syllables: 'kitten' or 'kit'?","kitten","Primer"],
  ["sw_yes","What blend makes the start of 'scrap'?","scr","Primer"],
  // Grade 1 Words (41 items — phonics patterns, main idea, inference)
  ["sw_after","Which word has the long 'a' pattern (ai): 'trail' or 'trap'?","trail","Grade 1 Words"],
  ["sw_again","What word do you get when you add 'spl' before 'ash'?","splash","Grade 1 Words"],
  ["sw_an","Which word rhymes with 'bring': 'ring', 'rung', or 'rang'?","ring","Grade 1 Words"],
  ["sw_any","A story says a boy woke up early and ran to the window to look outside. He is probably ___.","excited","Grade 1 Words"],
  ["sw_as","Which word has two syllables: 'garden' or 'green'?","garden","Grade 1 Words"],
  ["sw_ask","What blend makes the start of 'straw'?","str","Grade 1 Words"],
  ["sw_by","Which word has the long 'o' pattern (oa): 'coat' or 'cot'?","coat","Grade 1 Words"],
  ["sw_could","A passage explains how seeds grow into plants. The main idea is ___.","how plants grow","Grade 1 Words"],
  ["sw_every","What word do you get when you add 'tw' before 'ist'?","twist","Grade 1 Words"],
  ["sw_fly","Which word rhymes with 'fight': 'tight', 'tug', or 'tack'?","tight","Grade 1 Words"],
  ["sw_from","Which word has the long 'i' pattern (igh): 'night' or 'nit'?","night","Grade 1 Words"],
  ["sw_give","A story says the puppy jumped up and licked the boy's face. The puppy is probably ___.","happy","Grade 1 Words"],
  ["sw_going","What blend makes the start of 'shrink'?","shr","Grade 1 Words"],
  ["sw_had","Which word has two syllables: 'winter' or 'wind'?","winter","Grade 1 Words"],
  ["sw_has","Which word has the long 'e' pattern (ee): 'sleep' or 'slept'?","sleep","Grade 1 Words"],
  ["sw_her","What word do you get when you add 'th' before 'rown'?","thrown","Grade 1 Words"],
  ["sw_him","Which word rhymes with 'sound': 'found', 'fond', or 'fund'?","found","Grade 1 Words"],
  ["sw_his","A story says clouds gathered and the sky turned dark. What will probably happen next?","it will rain","Grade 1 Words"],
  ["sw_how","Which word has two syllables: 'flower' or 'flour'?","flower","Grade 1 Words"],
  ["sw_just","Which word has the long 'u' pattern (ue): 'glue' or 'glug'?","glue","Grade 1 Words"],
  ["sw_know","What blend makes the start of 'thrill'?","thr","Grade 1 Words"],
  ["sw_let","Which word rhymes with 'strong': 'long', 'lung', or 'linger'?","long","Grade 1 Words"],
  ["sw_live","A story says a fox crept slowly through the tall grass. The fox is probably ___.","hunting","Grade 1 Words"],
  ["sw_may","Which word has two syllables: 'thunder' or 'thin'?","thunder","Grade 1 Words"],
  ["sw_of","What word do you get when you add 'cl' before 'oud'?","cloud","Grade 1 Words"],
  ["sw_old","Which word has the long 'a' pattern (ay): 'play' or 'plan'?","play","Grade 1 Words"],
  ["sw_once","A story says Mia worked on her art project every day for a week. What does Mia probably value?","hard work","Grade 1 Words"],
  ["sw_open","What blend makes the start of 'spring'?","spr","Grade 1 Words"],
  ["sw_over","Which word rhymes with 'chair': 'share', 'shop', or 'ship'?","share","Grade 1 Words"],
  ["sw_put","Which word has two syllables: 'butter' or 'but'?","butter","Grade 1 Words"],
  ["sw_round","A book is mostly about dogs that help blind people. The main idea is ___.","guide dogs","Grade 1 Words"],
  ["sw_stop","What word do you get when you add 'sk' before 'ip'?","skip","Grade 1 Words"],
  ["sw_take","Which word has the long 'o' pattern (ow): 'glow' or 'gloss'?","glow","Grade 1 Words"],
  ["sw_thank","Which word rhymes with 'cake': 'shake', 'shack', or 'shock'?","shake","Grade 1 Words"],
  ["sw_them","A story says a boy gave his sandwich to a friend who forgot their lunch. What does this show?","kindness","Grade 1 Words"],
  ["sw_then","Which word has two syllables: 'spider' or 'spin'?","spider","Grade 1 Words"],
  ["sw_think","What blend makes the start of 'split'?","spl","Grade 1 Words"],
  ["sw_walk","Which word has the long 'e' pattern (ea): 'read' or 'red'?","read","Grade 1 Words"],
  ["sw_were","Which word rhymes with 'street': 'sleet', 'slot', or 'slat'?","sleet","Grade 1 Words"],
  ["sw_when","A story says a girl held her nose as she walked past the garbage. The garbage probably ___.","smelled bad","Grade 1 Words"],
]);

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
    ["kadd_0_0","There are 0 frogs on a log. 0 more hop on. How many frogs?","0","Adding to 5"],
    ["kadd_0_1","There are 0 birds in a tree. 1 lands. How many birds?","1","Adding to 5"],
    ["kadd_0_2","There are 0 cats. 2 more come. How many cats?","2","Adding to 5"],
    ["kadd_0_3","There are 0 apples. 3 are put in a bowl. How many apples?","3","Adding to 5"],
    ["kadd_0_4","There are 0 dogs. 4 run into the yard. How many dogs?","4","Adding to 5"],
    ["kadd_0_5","There are 0 fish. 5 swim in. How many fish?","5","Adding to 5"],
    ["kadd_1_0","There is 1 bee on a flower. 0 more land. How many bees?","1","Adding to 5"],
    ["kadd_1_1","There is 1 duck and 1 more joins. How many ducks?","2","Adding to 5"],
    ["kadd_1_2","There is 1 cookie. Mom bakes 2 more. How many cookies?","3","Adding to 5"],
    ["kadd_1_3","There is 1 bird. 3 more fly in. How many birds?","4","Adding to 5"],
    ["kadd_1_4","There is 1 puppy. 4 more arrive. How many puppies?","5","Adding to 5"],
    ["kadd_2_0","There are 2 chickens. 0 more come. How many chickens?","2","Adding to 5"],
    ["kadd_2_1","There are 2 ants. 1 more comes. How many ants?","3","Adding to 5"],
    ["kadd_2_2","There are 2 balloons. 2 more are given. How many balloons?","4","Adding to 5"],
    ["kadd_2_3","There are 2 horses. 3 more trot over. How many horses?","5","Adding to 5"],
    ["kadd_3_0","There are 3 flowers. 0 more are planted. How many flowers?","3","Adding to 5"],
    ["kadd_3_1","There are 3 frogs. 1 more hops in. How many frogs?","4","Adding to 5"],
    ["kadd_3_2","There are 3 stars and 2 more appear. How many stars?","5","Adding to 5"],
    ["kadd_4_0","There are 4 crayons. 0 more are added. How many crayons?","4","Adding to 5"],
    ["kadd_4_1","There are 4 oranges. 1 more is placed. How many oranges?","5","Adding to 5"],
    ["kadd_5_0","There are 5 seeds. 0 more are planted. How many seeds?","5","Adding to 5"],
  ];
  addTo5.forEach(function (a) { items.push(a); });

  // Comparing — use story context
  var comparing = [
    ["gt_1_3","Sara has 1 sticker. Tom has 3. Who has more?","Tom","Comparing"],
    ["lt_1_3","Sara has 1 sticker. Tom has 3. Who has fewer?","Sara","Comparing"],
    ["gt_2_5","Mia has 2 apples. Jake has 5. Who has more?","Jake","Comparing"],
    ["lt_2_5","Mia has 2 apples. Jake has 5. Who has fewer?","Mia","Comparing"],
    ["gt_3_7","Which is greater: 3 or 7?","7","Comparing"],
    ["lt_3_7","Which is less: 3 or 7?","3","Comparing"],
    ["gt_4_8","A bag has 4 marbles. Another has 8. Which bag has more?","8","Comparing"],
    ["lt_4_8","A bag has 4 marbles. Another has 8. Which bag has fewer?","4","Comparing"],
    ["gt_1_9","Which is greater: 1 or 9?","9","Comparing"],
    ["lt_1_9","Which is less: 1 or 9?","1","Comparing"],
    ["gt_5_6","There are 5 boys and 6 girls. Are there more boys or girls?","girls","Comparing"],
    ["lt_5_6","There are 5 boys and 6 girls. Are there fewer boys or girls?","boys","Comparing"],
    ["gt_2_8","Which is greater: 2 or 8?","8","Comparing"],
    ["lt_2_8","Which is less: 2 or 8?","2","Comparing"],
    ["gt_6_9","Which is greater: 6 or 9?","9","Comparing"],
    ["lt_6_9","Which is less: 6 or 9?","6","Comparing"],
    ["gt_3_4","Which is greater: 3 or 4?","4","Comparing"],
    ["lt_3_4","Which is less: 3 or 4?","3","Comparing"],
    ["gt_7_10","There are 7 cats and 10 dogs. Which group has more?","10","Comparing"],
    ["lt_7_10","There are 7 cats and 10 dogs. Which group has fewer?","7","Comparing"],
    ["gt_1_10","Which is greater: 1 or 10?","10","Comparing"],
    ["lt_1_10","Which is less: 1 or 10?","1","Comparing"],
    ["gt_4_6","Which is greater: 4 or 6?","6","Comparing"],
    ["lt_4_6","Which is less: 4 or 6?","4","Comparing"],
    ["gt_2_9","Which is greater: 2 or 9?","9","Comparing"],
    ["lt_2_9","Which is less: 2 or 9?","2","Comparing"],
    ["gt_5_8","Which is greater: 5 or 8?","8","Comparing"],
    ["lt_5_8","Which is less: 5 or 8?","5","Comparing"],
  ];
  comparing.forEach(function (c) { items.push(c); });

  // Shapes — 2D and 3D
  const shapes = [
    ["ks_circle","I have no corners and no straight sides. I am a ___.","circle","Shapes"],
    ["ks_triangle","I have 3 sides and 3 corners. I am a ___.","triangle","Shapes"],
    ["ks_square","I have 4 equal sides and 4 corners. I am a ___.","square","Shapes"],
    ["ks_rectangle","I have 4 sides. Two are longer than the other two. I am a ___.","rectangle","Shapes"],
    ["ks_oval","I look like a stretched circle. I am an ___.","oval","Shapes"],
    ["ks_diamond","I have 4 equal sides and look like a tilted square. I am a ___.","diamond","Shapes"],
    ["ks_sides_tri","I have 6 flat faces that are all rectangles. I am a ___.","rectangular prism","Shapes"],
    ["ks_sides_sq","I have 6 equal flat faces. I look like a box with equal sides. I am a ___.","cube","Shapes"],
    ["ks_corn_sq","I have 1 flat circle and 1 point at the top. I am a ___.","cone","Shapes"],
    ["ks_corn_tri","I have no flat faces and no corners — I can roll. I am a ___.","sphere","Shapes"],
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
    ["vow_a","c_t (short a) — what is the word?","cat","Vowel Sounds"],
    ["vow_e","b_d (short e) — what is the word?","bed","Vowel Sounds"],
    ["vow_i","p_g (short i) — what is the word?","pig","Vowel Sounds"],
    ["vow_o","d_g (short o) — what is the word?","dog","Vowel Sounds"],
    ["vow_u","b_s (short u) — what is the word?","bus","Vowel Sounds"],
    ["vow_a2","'Map' has which short vowel sound?","a","Vowel Sounds"],
    ["vow_e2","'Hen' has which short vowel sound?","e","Vowel Sounds"],
    ["vow_i2","'Tip' has which short vowel sound?","i","Vowel Sounds"],
    ["vow_o2","'Hop' has which short vowel sound?","o","Vowel Sounds"],
    ["vow_u2","'Bug' has which short vowel sound?","u","Vowel Sounds"],
  ];
  vowels.forEach(function (v) { items.push(v); });

  // Rhyming — replace some Letter Names items with rhyming questions
  var rhyming = [
    ["rhyme_cat","Which word rhymes with 'cat': 'bat' or 'cup'?","bat","Rhyming"],
    ["rhyme_hop","Which word rhymes with 'hop': 'top' or 'tip'?","top","Rhyming"],
    ["rhyme_sun","Which word rhymes with 'sun': 'run' or 'sit'?","run","Rhyming"],
    ["rhyme_big","Which word rhymes with 'big': 'pig' or 'bug'?","pig","Rhyming"],
    ["rhyme_hen","Which word rhymes with 'hen': 'ten' or 'tan'?","ten","Rhyming"],
    ["rhyme_log","Which word rhymes with 'log': 'dog' or 'dig'?","dog","Rhyming"],
    ["rhyme_map","Which word rhymes with 'map': 'cap' or 'cup'?","cap","Rhyming"],
    ["rhyme_sit","Which word rhymes with 'sit': 'hit' or 'hot'?","hit","Rhyming"],
    ["rhyme_jet","Which word rhymes with 'jet': 'net' or 'nut'?","net","Rhyming"],
    ["rhyme_cup","Which word rhymes with 'cup': 'pup' or 'cap'?","pup","Rhyming"],
    ["rhyme_fin","Which word rhymes with 'fin': 'pin' or 'pan'?","pin","Rhyming"],
    ["rhyme_bed","Which word rhymes with 'bed': 'red' or 'rod'?","red","Rhyming"],
    ["rhyme_rug","Which word rhymes with 'rug': 'bug' or 'bag'?","bug","Rhyming"],
    ["rhyme_pot","Which word rhymes with 'pot': 'hot' or 'hat'?","hot","Rhyming"],
    ["rhyme_lip","Which word rhymes with 'lip': 'tip' or 'top'?","tip","Rhyming"],
  ];
  rhyming.forEach(function (r) { items.push(r); });

  return items;
})();

/* ---- 2nd Grade Math ---------------------------------------- */
const GRADE2_MATH = _u([
  // Place Value (15 items)
  ["g2m_pv01","What is the tens digit in 374?","7","Place Value"],
  ["g2m_pv02","What is the hundreds digit in 528?","5","Place Value"],
  ["g2m_pv03","What is the ones digit in 649?","9","Place Value"],
  ["g2m_pv04","What is the value of the 5 in 253?","50","Place Value"],
  ["g2m_pv05","What is the value of the 3 in 374?","300","Place Value"],
  ["g2m_pv06","What is the value of the 6 in 162?","60","Place Value"],
  ["g2m_pv07","In 847, what place is the 8 in?","hundreds","Place Value"],
  ["g2m_pv08","In 315, what place is the 1 in?","tens","Place Value"],
  ["g2m_pv09","In 293, what place is the 3 in?","ones","Place Value"],
  ["g2m_pv10","Which digit is in the tens place: 461?","6","Place Value"],
  ["g2m_pv11","Which digit is in the hundreds place: 729?","7","Place Value"],
  ["g2m_pv12","What is the value of the 4 in 408?","400","Place Value"],
  ["g2m_pv13","What is the value of the 9 in 193?","9","Place Value"],
  ["g2m_pv14","In 560, how many tens are there in all?","56","Place Value"],
  ["g2m_pv15","What number has 3 hundreds, 2 tens, and 5 ones?","325","Place Value"],
  // Even & Odd (10 items)
  ["g2m_eo01","Is 14 even or odd?","even","Even & Odd"],
  ["g2m_eo02","Is 37 even or odd?","odd","Even & Odd"],
  ["g2m_eo03","Is 0 even or odd?","even","Even & Odd"],
  ["g2m_eo04","Is 25 even or odd?","odd","Even & Odd"],
  ["g2m_eo05","Is 18 even or odd?","even","Even & Odd"],
  ["g2m_eo06","Is 7 even or odd?","odd","Even & Odd"],
  ["g2m_eo07","Is 30 even or odd?","even","Even & Odd"],
  ["g2m_eo08","Is 11 even or odd?","odd","Even & Odd"],
  ["g2m_eo09","Is 22 even or odd?","even","Even & Odd"],
  ["g2m_eo10","Is 9 even or odd?","odd","Even & Odd"],
  // Addition — 3-digit numbers and word problems (15 items)
  ["g2m_ad01","234 + 145 = ?","379","Addition"],
  ["g2m_ad02","417 + 362 = ?","779","Addition"],
  ["g2m_ad03","A school has 356 boys and 218 girls. How many students in all?","574","Addition"],
  ["g2m_ad04","347 + 275 = ?","622","Addition"],
  ["g2m_ad05","614 + 289 = ?","903","Addition"],
  ["g2m_ad06","153 + 487 = ?","640","Addition"],
  ["g2m_ad07","A library has 428 fiction books and 380 nonfiction books. How many total?","808","Addition"],
  ["g2m_ad08","735 + 142 = ?","877","Addition"],
  ["g2m_ad09","286 + 553 = ?","839","Addition"],
  ["g2m_ad10","197 + 673 = ?","870","Addition"],
  ["g2m_ad11","530 + 70 = ?","600","Addition"],
  ["g2m_ad12","368 + 9 = ?","377","Addition"],
  ["g2m_ad13","Tom collects 248 cans. Maria collects 316 cans. How many in all?","564","Addition"],
  ["g2m_ad14","250 + 750 = ?","1000","Addition"],
  ["g2m_ad15","672 + 8 = ?","680","Addition"],
  // Subtraction — 3-digit numbers and word problems (15 items)
  ["g2m_sb01","724 − 351 = ?","373","Subtraction"],
  ["g2m_sb02","856 − 423 = ?","433","Subtraction"],
  ["g2m_sb03","A farmer had 600 eggs. He sold 273. How many eggs are left?","327","Subtraction"],
  ["g2m_sb04","912 − 567 = ?","345","Subtraction"],
  ["g2m_sb05","1000 − 387 = ?","613","Subtraction"],
  ["g2m_sb06","543 − 198 = ?","345","Subtraction"],
  ["g2m_sb07","789 − 304 = ?","485","Subtraction"],
  ["g2m_sb08","432 − 178 = ?","254","Subtraction"],
  ["g2m_sb09","A store has 963 apples. 487 are sold. How many apples remain?","476","Subtraction"],
  ["g2m_sb10","675 − 253 = ?","422","Subtraction"],
  ["g2m_sb11","500 − 136 = ?","364","Subtraction"],
  ["g2m_sb12","823 − 9 = ?","814","Subtraction"],
  ["g2m_sb13","740 − 465 = ?","275","Subtraction"],
  ["g2m_sb14","334 − 168 = ?","166","Subtraction"],
  ["g2m_sb15","900 − 454 = ?","446","Subtraction"],
  // Time — 5-minute increments and elapsed time (10 items)
  ["g2m_tm01","How many minutes in half an hour?","30","Time"],
  ["g2m_tm02","The clock shows 3:15. What time is it?","3:15","Time"],
  ["g2m_tm03","School starts at 8:00 and lunch is 3 hours later. What time is lunch?","11:00","Time"],
  ["g2m_tm04","How many minutes in an hour?","60","Time"],
  ["g2m_tm05","Class ends at 2:30. It started 45 minutes ago. What time did it start?","1:45","Time"],
  ["g2m_tm06","How many days in a week?","7","Time"],
  ["g2m_tm07","How many months in a year?","12","Time"],
  ["g2m_tm08","If it is 2:00 now, what time is it in 35 minutes?","2:35","Time"],
  ["g2m_tm09","A movie starts at 4:05 and ends at 5:50. How long is the movie?","1 hr 45 min","Time"],
  ["g2m_tm10","The clock shows 7:45. What time is it in 15 minutes?","8:00","Time"],
  // Money — making change (10 items)
  ["g2m_mn01","A pencil costs 37 cents. You pay 50 cents. How much change?","13 cents","Money"],
  ["g2m_mn02","How many cents in a dime?","10","Money"],
  ["g2m_mn03","A sticker costs 25 cents. You pay with 3 dimes. How much change?","5 cents","Money"],
  ["g2m_mn04","How many cents in a dollar?","100","Money"],
  ["g2m_mn05","A book costs 85 cents. You pay $1.00. How much change?","15 cents","Money"],
  ["g2m_mn06","2 dimes + 1 nickel = ___ cents?","25","Money"],
  ["g2m_mn07","3 quarters = ___ cents?","75","Money"],
  ["g2m_mn08","A toy costs 68 cents. You pay 75 cents. How much change?","7 cents","Money"],
  ["g2m_mn09","4 nickels = ___ cents?","20","Money"],
  ["g2m_mn10","You have $1.00. You spend 42 cents. How many cents are left?","58","Money"],
  // Measurement (10 items)
  ["g2m_ms01","How many inches in a foot?","12","Measurement"],
  ["g2m_ms02","How many feet in a yard?","3","Measurement"],
  ["g2m_ms03","A pencil is 7 inches long. A ruler is 12 inches long. How much longer is the ruler?","5 inches","Measurement"],
  ["g2m_ms04","How many centimeters in 2 decimeters?","20","Measurement"],
  ["g2m_ms05","A table is 3 feet long. A desk is 2 feet long. Together how long?","5 feet","Measurement"],
  ["g2m_ms06","How many inches in a yard?","36","Measurement"],
  ["g2m_ms07","A rope is 48 inches long. How many feet is that?","4","Measurement"],
  ["g2m_ms08","Which is shorter: 11 inches or 1 foot?","11 inches","Measurement"],
  ["g2m_ms09","A garden is 9 feet long. How many yards is that?","3","Measurement"],
  ["g2m_ms10","How many feet in 2 yards?","6","Measurement"],
  // Fractions — on a number line and compare (10 items)
  ["g2m_fr01","What fraction is 1 out of 2 equal parts?","1/2","Fractions"],
  ["g2m_fr02","What fraction is 1 out of 4 equal parts?","1/4","Fractions"],
  ["g2m_fr03","What fraction is 1 out of 3 equal parts?","1/3","Fractions"],
  ["g2m_fr04","Which fraction is closest to 0 on a number line: 1/2 or 1/4?","1/4","Fractions"],
  ["g2m_fr05","Which fraction is closer to 1 on a number line: 3/4 or 1/4?","3/4","Fractions"],
  ["g2m_fr06","2 out of 4 equal parts is ___ of a whole.","1/2","Fractions"],
  ["g2m_fr07","A pizza is cut into 8 equal slices. 3 are eaten. What fraction is left?","5/8","Fractions"],
  ["g2m_fr08","Which is closer to 1 on the number line: 3/4 or 2/3?","3/4","Fractions"],
  ["g2m_fr09","What fraction is 2 out of 3 equal parts?","2/3","Fractions"],
  ["g2m_fr10","A ribbon is cut into 4 equal pieces. Mia uses 1 piece. What fraction is used?","1/4","Fractions"],
]);

/* ---- 2nd Grade Reading (Author's Purpose, Prefixes, Suffixes, Text Features) */
const GRADE2_READING = _u([
  // Author's Purpose & Text Features
  ["g2w_always","A book tries to make you laugh. The author's purpose is to ___.","entertain","2nd Grade Words"],
  ["g2w_around","A book explains how butterflies grow. The author's purpose is to ___.","inform","2nd Grade Words"],
  ["g2w_because","An ad says you should buy a toy. The author's purpose is to ___.","persuade","2nd Grade Words"],
  ["g2w_been","A caption under a photo gives extra information about the ___.","picture","2nd Grade Words"],
  ["g2w_before","A heading tells you what a section is mostly ___.","about","2nd Grade Words"],
  ["g2w_best","A glossary is found in the back of a book and defines ___.","words","2nd Grade Words"],
  ["g2w_both","A table of contents tells you where to find ___.","chapters","2nd Grade Words"],
  ["g2w_buy","An index helps you find information about a specific ___.","topic","2nd Grade Words"],
  // Prefixes & Suffixes
  ["g2w_call","The prefix 'un-' changes 'happy' to mean ___.","not happy","2nd Grade Words"],
  ["g2w_cold","The prefix 're-' changes 'read' to mean ___.","read again","2nd Grade Words"],
  ["g2w_does","The suffix '-ful' in 'careful' means ___.","full of","2nd Grade Words"],
  ["g2w_dont","The suffix '-less' in 'homeless' means ___.","without","2nd Grade Words"],
  ["g2w_fast","What does 'unkind' mean?","not kind","2nd Grade Words"],
  ["g2w_first","What does 'replay' mean?","play again","2nd Grade Words"],
  ["g2w_five","What does 'hopeful' mean?","full of hope","2nd Grade Words"],
  ["g2w_found","What does 'painless' mean?","without pain","2nd Grade Words"],
  ["g2w_gave","What does 'retell' mean?","tell again","2nd Grade Words"],
  ["g2w_goes","What does 'unfair' mean?","not fair","2nd Grade Words"],
  // Context Clues
  ["g2w_green","The sun sank below the horizon. What time of day is it probably?","evening","2nd Grade Words"],
  ["g2w_its","Maria sprinted to the finish line. Sprinted means she ___.","ran fast","2nd Grade Words"],
  ["g2w_made","The dog devoured his dinner in seconds. Devoured means ___.","ate quickly","2nd Grade Words"],
  ["g2w_many","It was frigid outside, so we wore coats. Frigid means ___.","very cold","2nd Grade Words"],
  ["g2w_off","The kitten was timid and hid under the bed. Timid means ___.","shy","2nd Grade Words"],
  ["g2w_or","He was famished and asked for a snack. Famished means ___.","very hungry","2nd Grade Words"],
  // Compare & Contrast
  ["g2w_pull","A frog and a fish both live near water. This is a ___.","similarity","2nd Grade Words"],
  ["g2w_read","A frog can jump; a fish cannot. This is a ___.","difference","2nd Grade Words"],
  ["g2w_right","A passage compares cats and dogs. What text structure is this?","compare and contrast","2nd Grade Words"],
  ["g2w_sing","Both dogs and cats are popular pets. Both and and signal ___.","similarity","2nd Grade Words"],
  // Character & Story
  ["g2w_sit","A character shares his lunch every day. What does this show about him?","he is generous","2nd Grade Words"],
  ["g2w_sleep","A girl felt her face turn hot when she made a mistake. She probably felt ___.","embarrassed","2nd Grade Words"],
  ["g2w_tell","At the start of a story, the problem is called the ___.","conflict","2nd Grade Words"],
  ["g2w_their","At the end of a story, the problem is solved. This is the ___.","resolution","2nd Grade Words"],
  ["g2w_these","The time and place where a story happens is the ___.","setting","2nd Grade Words"],
  ["g2w_those","The main person in a story is called the ___.","main character","2nd Grade Words"],
  // More Prefixes/Suffixes
  ["g2w_upon","The prefix 'pre-' in 'preheat' means ___.","before","2nd Grade Words"],
  ["g2w_us","The suffix '-er' in 'farmer' means one who ___.","farms","2nd Grade Words"],
  ["g2w_use","What does 'preview' mean?","see before","2nd Grade Words"],
  ["g2w_very","The suffix '-ness' in 'kindness' means ___.","state of being kind","2nd Grade Words"],
  ["g2w_wash","What does 'teacher' mean?","one who teaches","2nd Grade Words"],
  ["g2w_which","What does 'illness' mean?","state of being ill","2nd Grade Words"],
  ["g2w_why","What does 'rewrite' mean?","write again","2nd Grade Words"],
  ["g2w_wish","The suffix '-able' in 'breakable' means ___.","can be broken","2nd Grade Words"],
  ["g2w_work","What does 'uncomfortable' mean?","not comfortable","2nd Grade Words"],
  ["g2w_would","What does 'joyful' mean?","full of joy","2nd Grade Words"],
  ["g2w_write","What does 'powerless' mean?","without power","2nd Grade Words"],
  ["g2w_your","The prefix 'mis-' in 'misspell' means ___.","wrongly","2nd Grade Words"],
]);

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
    ["g3m_ro01","Round 47 to the nearest 10.","50","Rounding"],
    ["g3m_ro02","Round 23 to the nearest 10.","20","Rounding"],
    ["g3m_ro03","A class counts 85 paper clips. To the nearest 10, that is about ___.","90","Rounding"],
    ["g3m_ro04","Round 234 to the nearest 100.","200","Rounding"],
    ["g3m_ro05","Round 567 to the nearest 100.","600","Rounding"],
    ["g3m_ro06","Round 350 to the nearest 100.","400","Rounding"],
    ["g3m_ro07","A store has 72 bottles. To the nearest 10, that is about ___.","70","Rounding"],
    ["g3m_ro08","Round 148 to the nearest 10.","150","Rounding"],
    ["g3m_ro09","Round 452 to the nearest 100.","500","Rounding"],
    ["g3m_ro10","Best estimate for 397 + 204 to nearest hundred?","600","Rounding"],
    ["g3m_ro11","Best estimate for 489 + 312 to nearest hundred?","800","Rounding"],
    ["g3m_ro12","Round 749 to the nearest 100.","700","Rounding"],
  ];
  rounding.forEach(function (r) { items.push(r); });

  // Fractions — number line, compare, non-unit (12 items)
  var fractions = [
    ["g3m_fr01","Which fraction is closest to 1/2 on a number line: 1/4, 2/3, or 3/8?","3/8","Fractions"],
    ["g3m_fr02","Which fraction is larger: 2/3 or 2/5?","2/3","Fractions"],
    ["g3m_fr03","Which fraction is smaller: 3/4 or 3/8?","3/8","Fractions"],
    ["g3m_fr04","On a number line from 0 to 1, where is 1/2?","middle","Fractions"],
    ["g3m_fr05","Compare: 4/5 vs 4/9. Which is greater?","4/5","Fractions"],
    ["g3m_fr06","Compare: 1/6 vs 1/3. Which is greater?","1/3","Fractions"],
    ["g3m_fr07","Which fraction is larger: 2/3 or 1/3?","2/3","Fractions"],
    ["g3m_fr08","Which fraction is larger: 5/6 or 5/8?","5/6","Fractions"],
    ["g3m_fr09","Is 2/4 equivalent to 1/2?","yes","Fractions"],
    ["g3m_fr10","Is 3/6 equivalent to 1/2?","yes","Fractions"],
    ["g3m_fr11","A number line goes from 0 to 1. A point is at 3/4. Is it past or before 1/2?","past","Fractions"],
    ["g3m_fr12","Which fraction is smaller: 2/8 or 2/3?","2/8","Fractions"],
  ];
  fractions.forEach(function (f) { items.push(f); });

  // Area & Perimeter — word problems (12 items)
  var areaperim = [
    ["g3m_ap01","A classroom floor is 4 tiles long and 3 tiles wide. How many tiles cover it?","12","Area & Perimeter"],
    ["g3m_ap02","A square garden has sides of 5 meters. What is its perimeter?","20","Area & Perimeter"],
    ["g3m_ap03","A swimming pool is 6 m long and 2 m wide. What is its perimeter?","16","Area & Perimeter"],
    ["g3m_ap04","A room is 5 feet long and 4 feet wide. What is its area?","20","Area & Perimeter"],
    ["g3m_ap05","A square with side 3 cm is tiled with 1 cm tiles. How many tiles fit?","9","Area & Perimeter"],
    ["g3m_ap06","A rectangle 7 m long and 2 m wide — what is its area?","14","Area & Perimeter"],
    ["g3m_ap07","A fence goes around a rectangle 8 m by 3 m. How much fence is needed?","22","Area & Perimeter"],
    ["g3m_ap08","A square with side 6 ft — what is its area in square feet?","36","Area & Perimeter"],
    ["g3m_ap09","A frame goes around a picture 10 in by 4 in. How many inches of frame?","28","Area & Perimeter"],
    ["g3m_ap10","A square with side 4 m — what is its perimeter?","16","Area & Perimeter"],
    ["g3m_ap11","A mat is 9 units long and 1 unit wide. What is its area?","9","Area & Perimeter"],
    ["g3m_ap12","A sandbox is 3 m by 3 m. What is the total length of its border?","12","Area & Perimeter"],
  ];
  areaperim.forEach(function (a) { items.push(a); });

  return items;
})();

/* ---- 3rd Grade Reading ------------------------------------- */
const GRADE3_READING = _u([
  // 3rd Grade Words — theme, text structure, character, figurative language
  ["g3w_about","A story shows a girl who keeps practicing piano even when it is hard. The theme is ___.","perseverance","3rd Grade Words"],
  ["g3w_better","A passage explains that floods cause erosion, which leads to mudslides. This is ___ text structure.","cause and effect","3rd Grade Words"],
  ["g3w_bring","A story describes a boy who shares his lunch every day. What can you conclude about him?","he is generous","3rd Grade Words"],
  ["g3w_carry","A story compares life in the city vs. the country. This is ___ text structure.","compare and contrast","3rd Grade Words"],
  ["g3w_clean","'The sun peeked over the mountain.' The sun is given a human action. This is ___.","personification","3rd Grade Words"],
  ["g3w_cut","'Her laugh was music to his ears' is a ___.","metaphor","3rd Grade Words"],
  ["g3w_done","'As quiet as a mouse' is a ___.","simile","3rd Grade Words"],
  ["g3w_draw","A passage lists steps for making a sandwich. This is ___ text structure.","sequence","3rd Grade Words"],
  ["g3w_drink","A character solves a problem by asking for help. What does this tell you about the character?","they are wise","3rd Grade Words"],
  ["g3w_eight","'The thunder grumbled and growled all night.' This is an example of ___.","personification","3rd Grade Words"],
  ["g3w_fall","A fable ends: 'Slow and steady wins the race.' The lesson or ___ is patience.","theme","3rd Grade Words"],
  ["g3w_far","Using text evidence means using ___ from the story to support your answer.","details","3rd Grade Words"],
  ["g3w_full","The central message of a story is its ___.","theme","3rd Grade Words"],
  ["g3w_got","A nonfiction article's main idea is what the article is mostly ___.","about","3rd Grade Words"],
  ["g3w_grow","'The ancient oak tree guarded the village.' Ancient means ___.","very old","3rd Grade Words"],
  ["g3w_hold","A character acts brave even when scared. The theme might be ___.","courage","3rd Grade Words"],
  ["g3w_hot","The author repeats 'drip, drip, drip' to make you feel ___.","the slow rain","3rd Grade Words"],
  ["g3w_hurt","'The stars were diamonds scattered across the sky' is a ___.","metaphor","3rd Grade Words"],
  ["g3w_if","A problem leads to a solution. This is ___ text structure.","problem and solution","3rd Grade Words"],
  ["g3w_keep","A story shows a character who lies and loses all his friends. The theme is ___.","honesty matters","3rd Grade Words"],
  ["g3w_kind","'She was as fierce as a storm' is a ___.","simile","3rd Grade Words"],
  ["g3w_laugh","The root 'aqua' means ___.","water","3rd Grade Words"],
  ["g3w_light","The root 'geo' means ___.","earth","3rd Grade Words"],
  ["g3w_long","The root 'bio' means ___.","life","3rd Grade Words"],
  ["g3w_much","The root 'photo' means ___.","light","3rd Grade Words"],
  ["g3w_myself","The root 'auto' means ___.","self","3rd Grade Words"],
  ["g3w_never","A word that describes how, when, or where is an ___.","adverb","3rd Grade Words"],
  ["g3w_nine","'Geography' uses the root 'geo.' Geography is the study of ___.","earth","3rd Grade Words"],
  ["g3w_only","'Biography' uses the root 'bio.' A biography tells about a person's ___.","life","3rd Grade Words"],
  ["g3w_own","'Autobiography' uses 'auto' meaning self. It is a story a person writes about ___.","themselves","3rd Grade Words"],
  ["g3w_pick","'Photography' uses 'photo.' Photography captures ___.","light in images","3rd Grade Words"],
  ["g3w_seven","A story describes how two brothers are different but help each other. The theme is ___.","teamwork","3rd Grade Words"],
  ["g3w_shall","The word 'tranquil' means ___.","calm","3rd Grade Words"],
  ["g3w_show","The word 'sufficient' means ___.","enough","3rd Grade Words"],
  ["g3w_six","The word 'persevere' means ___.","keep trying","3rd Grade Words"],
  ["g3w_small","The word 'frequently' means ___.","often","3rd Grade Words"],
  ["g3w_start","The word 'cautious' means ___.","careful","3rd Grade Words"],
  ["g3w_ten","The word 'vibrant' means ___.","bright and lively","3rd Grade Words"],
  ["g3w_today","The word 'fortunate' means ___.","lucky","3rd Grade Words"],
  ["g3w_together","An 'intrepid' explorer ventures into unknown places. Intrepid means ___.","brave","3rd Grade Words"],
  ["g3w_try","A passage says plants need sunlight to survive. This explains ___ plants grow toward windows.","why","3rd Grade Words"],
  ["g3w_warm","When an author gives hints about what will happen later, it is called ___.","foreshadowing","3rd Grade Words"],
  // Prefixes (10 items)
  ["g3r_pfx01","The prefix 'un-' changes 'expected' to 'unexpected.' What does it mean?","not expected","Prefixes"],
  ["g3r_pfx02","The prefix 're-' changes 'build' to 'rebuild.' What does rebuild mean?","build again","Prefixes"],
  ["g3r_pfx03","The prefix 'pre-' changes 'view' to 'preview.' What does preview mean?","view before","Prefixes"],
  ["g3r_pfx04","The prefix 'mis-' changes 'lead' to 'mislead.' What does mislead mean?","lead wrongly","Prefixes"],
  ["g3r_pfx05","The prefix 'dis-' changes 'agree' to 'disagree.' What does it mean?","not agree","Prefixes"],
  ["g3r_pfx06","The prefix 'non-' changes 'fiction' to 'nonfiction.' What is nonfiction?","not made up","Prefixes"],
  ["g3r_pfx07","The prefix 'over-' changes 'load' to 'overload.' What does overload mean?","too much load","Prefixes"],
  ["g3r_pfx08","The prefix 'sub-' changes 'marine' to 'submarine.' Where does a submarine travel?","underwater","Prefixes"],
  ["g3r_pfx09","The prefix 'super-' changes 'hero' to 'superhero.' A superhero has ___ powers.","above normal","Prefixes"],
  ["g3r_pfx10","What does 'disconnect' mean?","not connected","Prefixes"],
  // Suffixes (10 items)
  ["g3r_sfx01","A 'wonderful' day is a day ___ of wonder.","full","Suffixes"],
  ["g3r_sfx02","A 'homeless' cat is a cat ___ a home.","without","Suffixes"],
  ["g3r_sfx03","A 'runner' is one who ___.","runs","Suffixes"],
  ["g3r_sfx04","The word 'exploration' means the ___ of exploring.","act","Suffixes"],
  ["g3r_sfx05","The suffix '-ness' in 'brightness' means ___.","state of being bright","Suffixes"],
  ["g3r_sfx06","A 'readable' book is a book that ___.","can be read","Suffixes"],
  ["g3r_sfx07","The word 'silently' means in a ___ way.","silent","Suffixes"],
  ["g3r_sfx08","The suffix '-ing' in 'swimming' shows the action is ___.","happening now","Suffixes"],
  ["g3r_sfx09","The suffix '-ed' in 'climbed' shows the action ___.","already happened","Suffixes"],
  ["g3r_sfx10","A person who discovers things is called a discover___.","er","Suffixes"],
  // Synonyms & Antonyms — academic vocabulary (12 items)
  ["g3r_sa01","A synonym for 'exhausted' is ___.","tired","Synonyms & Antonyms"],
  ["g3r_sa02","An antonym for 'ancient' is ___.","modern","Synonyms & Antonyms"],
  ["g3r_sa03","A synonym for 'enormous' is ___.","huge","Synonyms & Antonyms"],
  ["g3r_sa04","An antonym for 'transparent' is ___.","opaque","Synonyms & Antonyms"],
  ["g3r_sa05","A synonym for 'furious' is ___.","enraged","Synonyms & Antonyms"],
  ["g3r_sa06","An antonym for 'expand' is ___.","shrink","Synonyms & Antonyms"],
  ["g3r_sa07","A synonym for 'courageous' is ___.","brave","Synonyms & Antonyms"],
  ["g3r_sa08","An antonym for 'scarce' is ___.","plentiful","Synonyms & Antonyms"],
  ["g3r_sa09","A synonym for 'observe' is ___.","watch","Synonyms & Antonyms"],
  ["g3r_sa10","An antonym for 'fiction' is ___.","nonfiction","Synonyms & Antonyms"],
  ["g3r_sa11","A synonym for 'swift' is ___.","fast","Synonyms & Antonyms"],
  ["g3r_sa12","An antonym for 'villainous' is ___.","heroic","Synonyms & Antonyms"],
  // Reading Passages (2 items)
  ["g3r_pass01","Read: 'Mia found a tiny turtle near the pond. It had a crack in its shell. She carried it gently to the nature center so the workers could help it heal.' — Why did Mia take the turtle to the nature center?","to help it heal","Reading Passages"],
  ["g3r_pass02","Read: 'The maple tree in the yard changes with every season. In spring it has bright green leaves. By fall, those leaves turn red and orange and drift to the ground.' — What happens to the maple tree's leaves in fall?","they turn red and orange and fall to the ground","Reading Passages"],
]);

/* ---- 4th Grade Math ---------------------------------------- */
const GRADE4_MATH = _u([
  // Factors & Multiples — GCF, LCM, prime/composite (15 items)
  ["g4m_fm01","Is 4 a factor of 12?","yes","Factors & Multiples"],
  ["g4m_fm02","Is 5 a factor of 22?","no","Factors & Multiples"],
  ["g4m_fm03","What is the GCF of 8 and 12?","4","Factors & Multiples"],
  ["g4m_fm04","What is the GCF of 6 and 9?","3","Factors & Multiples"],
  ["g4m_fm05","What is the LCM of 3 and 4?","12","Factors & Multiples"],
  ["g4m_fm06","What is the LCM of 4 and 6?","12","Factors & Multiples"],
  ["g4m_fm07","Is 17 prime or composite?","prime","Factors & Multiples"],
  ["g4m_fm08","Is 24 prime or composite?","composite","Factors & Multiples"],
  ["g4m_fm09","Is 7 a factor of 49?","yes","Factors & Multiples"],
  ["g4m_fm10","Two classes each have 18 students. GCF of 18 and 12 for equal groups?","6","Factors & Multiples"],
  ["g4m_fm11","How many factors does 12 have?","6","Factors & Multiples"],
  ["g4m_fm12","What is the GCF of 10 and 15?","5","Factors & Multiples"],
  ["g4m_fm13","What is the LCM of 4 and 5?","20","Factors & Multiples"],
  ["g4m_fm14","Is 13 prime or composite?","prime","Factors & Multiples"],
  ["g4m_fm15","Is 36 prime or composite?","composite","Factors & Multiples"],
  // Geometry — angle sums and classification (12 items)
  ["g4m_ge01","An angle less than 90° is called ___.","acute","Geometry"],
  ["g4m_ge02","An angle greater than 90° is called ___.","obtuse","Geometry"],
  ["g4m_ge03","A triangle has angles of 55° and 70°. What is the third angle?","55","Geometry"],
  ["g4m_ge04","Lines that never meet are ___.","parallel","Geometry"],
  ["g4m_ge05","Lines that cross at 90° are ___.","perpendicular","Geometry"],
  ["g4m_ge06","A triangle with all equal sides is ___.","equilateral","Geometry"],
  ["g4m_ge07","A triangle has angles of 40° and 75°. Find the third angle.","65","Geometry"],
  ["g4m_ge08","A triangle with two equal sides is ___.","isosceles","Geometry"],
  ["g4m_ge09","The sum of angles in any triangle is ___°.","180","Geometry"],
  ["g4m_ge10","A right triangle has one 90° angle and one 35° angle. Find the third.","55","Geometry"],
  ["g4m_ge11","A polygon with 6 sides is a ___.","hexagon","Geometry"],
  ["g4m_ge12","An angle that is exactly 180° is called a ___ angle.","straight","Geometry"],
  // Decimals — to hundredths and word problems (12 items)
  ["g4m_de01","What is 0.47 rounded to the nearest tenth?","0.5","Decimals"],
  ["g4m_de02","0.25 in fraction form is ___.","1/4","Decimals"],
  ["g4m_de03","A book costs $4.75 and a pencil costs $1.25. Total cost?","$6.00","Decimals"],
  ["g4m_de04","Which is bigger: 0.56 or 0.65?","0.65","Decimals"],
  ["g4m_de05","Which is bigger: 0.90 or 0.09?","0.90","Decimals"],
  ["g4m_de06","0.75 in fraction form is ___.","3/4","Decimals"],
  ["g4m_de07","Maria ran 1.45 km. Then she ran 0.85 km more. How far in all?","2.30","Decimals"],
  ["g4m_de08","1.00 − 0.37 = ?","0.63","Decimals"],
  ["g4m_de09","What is 0.1 as a fraction?","1/10","Decimals"],
  ["g4m_de10","Which is smaller: 0.30 or 0.08?","0.08","Decimals"],
  ["g4m_de11","A bag weighs 2.50 kg. Another weighs 1.75 kg. How much more does the first weigh?","0.75","Decimals"],
  ["g4m_de12","0.20 + 0.35 = ?","0.55","Decimals"],
  // Fractions — unlike denominators and word problems (12 items)
  ["g4m_fr01","1/2 + 1/4 = ?","3/4","Fractions"],
  ["g4m_fr02","3/4 − 1/4 = ?","1/2","Fractions"],
  ["g4m_fr03","Which is equivalent to 2/4?","1/2","Fractions"],
  ["g4m_fr04","A recipe uses 1/3 cup oil and 1/6 cup water. How much liquid in all?","1/2","Fractions"],
  ["g4m_fr05","2/3 − 1/6 = ?","1/2","Fractions"],
  ["g4m_fr06","Jake ate 1/4 of a pizza. Ana ate 3/8. How much did they eat together?","5/8","Fractions"],
  ["g4m_fr07","5/6 − 1/2 = ?","1/3","Fractions"],
  ["g4m_fr08","Which is larger: 7/8 or 5/6?","7/8","Fractions"],
  ["g4m_fr09","Which is equivalent to 3/6?","1/2","Fractions"],
  ["g4m_fr10","3/4 + 1/8 = ?","7/8","Fractions"],
  ["g4m_fr11","A ribbon is 5/6 m long. You use 1/3 m. How much is left?","1/2","Fractions"],
  ["g4m_fr12","Which is larger: 5/8 or 3/4?","3/4","Fractions"],
  // Multi-digit — 4×1-digit, 2×2-digit, division with remainder (10 items)
  ["g4m_md01","1,248 × 3 = ?","3744","Multi-digit"],
  ["g4m_md02","A box holds 24 crayons. 3 boxes shared equally by 4 students. How many each?","18","Multi-digit"],
  ["g4m_md03","2,150 × 4 = ?","8600","Multi-digit"],
  ["g4m_md04","256 ÷ 3 = ___ remainder ___.","85 r1","Multi-digit"],
  ["g4m_md05","43 × 25 = ?","1075","Multi-digit"],
  ["g4m_md06","There are 1,500 tickets. 6 schools share them equally. How many each?","250","Multi-digit"],
  ["g4m_md07","32 × 46 = ?","1472","Multi-digit"],
  ["g4m_md08","427 ÷ 6 = ___ remainder ___.","71 r1","Multi-digit"],
  ["g4m_md09","2,115 × 4 = ?","8460","Multi-digit"],
  ["g4m_md10","A school orders 350 books for 7 classrooms. How many books per class?","50","Multi-digit"],
]);

/* ---- 4th Grade Reading ------------------------------------- */
const GRADE4_READING = _u([
  // Parts of Speech — complex sentence analysis (15 items)
  ["g4r_ps01","'She reluctantly agreed to the plan.' What part of speech is 'reluctantly'?","adverb","Parts of Speech"],
  ["g4r_ps02","Identify the conjunction: 'I wanted to go, but it was raining.'","but","Parts of Speech"],
  ["g4r_ps03","'The golden retriever bounded joyfully across the yard.' Identify the adjective.","golden","Parts of Speech"],
  ["g4r_ps04","'He whispered nervously before the speech.' What part of speech is 'nervously'?","adverb","Parts of Speech"],
  ["g4r_ps05","'Without her map, the hiker was lost.' 'Without' is a ___.","preposition","Parts of Speech"],
  ["g4r_ps06","'Mariana wrote the essay, and her partner drew the charts.' 'And' is a ___.","conjunction","Parts of Speech"],
  ["g4r_ps07","'The scientist carefully measured the liquid.' Identify the adverb.","carefully","Parts of Speech"],
  ["g4r_ps08","'Neither the rain nor the cold stopped them.' 'Neither...nor' is a ___.","conjunction","Parts of Speech"],
  ["g4r_ps09","'She' in 'She discovered a new species' is a ___.","pronoun","Parts of Speech"],
  ["g4r_ps10","'The exhausted marathon runner collapsed at the finish.' Identify the adjective.","exhausted","Parts of Speech"],
  ["g4r_ps11","'Courage' in 'Courage is her greatest strength' is a ___.","noun","Parts of Speech"],
  ["g4r_ps12","'She sprinted effortlessly past her opponents.' Identify the adverb.","effortlessly","Parts of Speech"],
  ["g4r_ps13","'Wow!' at the start of an exclamation is an ___.","interjection","Parts of Speech"],
  ["g4r_ps14","'Beneath the old bridge' — 'beneath' is a ___.","preposition","Parts of Speech"],
  ["g4r_ps15","'The ancient, moss-covered statue stood silently.' Identify one adjective.","ancient","Parts of Speech"],
  // Figurative Language — literary context examples (12 items)
  ["g4r_fl01","'I have told you a million times!' is an example of ___.","hyperbole","Figurative Language"],
  ["g4r_fl02","The phrase 'break a leg' is an example of ___.","idiom","Figurative Language"],
  ["g4r_fl03","'The moon is a pale lantern in the sky' is a ___.","metaphor","Figurative Language"],
  ["g4r_fl04","'Sally sells seashells by the seashore' uses ___.","alliteration","Figurative Language"],
  ["g4r_fl05","'The ocean roared and clawed at the shore' uses ___.","personification","Figurative Language"],
  ["g4r_fl06","'She was as nervous as a cat in a room full of rocking chairs' is a ___.","simile","Figurative Language"],
  ["g4r_fl07","The 'buzz' of bees and the 'crack' of thunder are both ___.","onomatopoeia","Figurative Language"],
  ["g4r_fl08","'Bite the bullet' means to endure something difficult. This is an ___.","idiom","Figurative Language"],
  ["g4r_fl09","'The ancient walls whispered secrets of the past' uses ___.","personification","Figurative Language"],
  ["g4r_fl10","'My backpack weighs a ton!' is an example of ___.","hyperbole","Figurative Language"],
  ["g4r_fl11","'Fred's frightful face frightened the crowd' uses ___.","alliteration","Figurative Language"],
  ["g4r_fl12","'Her smile was a ray of sunshine in the gloomy room' is a ___.","metaphor","Figurative Language"],
  // Vocabulary — Greek/Latin roots and context clues (12 items)
  ["g4r_vo01","The root 'port' means carry. What does 'transport' mean?","carry across","Vocabulary"],
  ["g4r_vo02","The root 'aud' means hear. An auditorium is a place to ___.","listen","Vocabulary"],
  ["g4r_vo03","The root 'dict' means say. A dictator is someone who ___ with total power.","rules by speaking","Vocabulary"],
  ["g4r_vo04","The root 'struct' means build. A structure is something that is ___.","built","Vocabulary"],
  ["g4r_vo05","The root 'vis' means see. What does 'invisible' mean?","cannot be seen","Vocabulary"],
  ["g4r_vo06","The root 'scrib/script' means write. A prescription is something ___.","written by a doctor","Vocabulary"],
  ["g4r_vo07","Hikers scrambled up the steep, rugged trail without stopping. Rugged means ___.","rough and uneven","Vocabulary"],
  ["g4r_vo08","The scientist documented every detail with meticulous care. Meticulous means ___.","very careful","Vocabulary"],
  ["g4r_vo09","After weeks of drought, the parched earth finally got rain. Parched means ___.","very dry","Vocabulary"],
  ["g4r_vo10","The committee reached a unanimous decision after hours of debate. Unanimous means ___.","all agreed","Vocabulary"],
  ["g4r_vo11","The root 'port' is in 'export.' Export means to carry goods ___.","out of a country","Vocabulary"],
  ["g4r_vo12","The root 'aud' is in 'audience.' An audience is a group that ___.","listens or watches","Vocabulary"],
  // Reading Passages (2 items)
  ["g4r_pass01","Read: 'Despite the relentless rain, the hikers pressed onward toward the summit. The panoramic view waiting at the top was worth every soggy step.' — What does 'panoramic' most likely mean?","a wide, sweeping view","Reading Passages"],
  ["g4r_pass02","Read: 'Thomas Edison failed over a thousand times before inventing the light bulb. When asked about his failures, he replied that he had simply found a thousand ways that did not work.' — Edison's response shows that he viewed failure as ___.","a learning experience","Reading Passages"],
]);

/* ---- 5th Grade Math ---------------------------------------- */
const GRADE5_MATH = _u([
  // Order of Operations (12 items)
  ["g5m_oo01","In PEMDAS, what does E stand for?","exponents","Order of Operations"],
  ["g5m_oo02","In PEMDAS, what comes before multiplication: P then ___?","exponents","Order of Operations"],
  ["g5m_oo03","Solve: 3² + 4 × (8 − 5) = ?","21","Order of Operations"],
  ["g5m_oo04","Solve: (12 − 4)² ÷ 2 = ?","32","Order of Operations"],
  ["g5m_oo05","Solve: 6 + 2³ × (5 − 3) = ?","22","Order of Operations"],
  ["g5m_oo06","Solve: 5² − 3 × (9 − 6) = ?","16","Order of Operations"],
  ["g5m_oo07","Solve: (4 + 1)² ÷ 5 = ?","5","Order of Operations"],
  ["g5m_oo08","Solve: 2³ + 6 ÷ 2 = ?","11","Order of Operations"],
  ["g5m_oo09","Solve: 4 × (3 + 2)² = ?","100","Order of Operations"],
  ["g5m_oo10","In 5² + 3 × 2, which operation do you do first?","exponent","Order of Operations"],
  ["g5m_oo11","Solve: 10 − 2 × 3 + 1 = ?","5","Order of Operations"],
  ["g5m_oo12","Solve: 36 ÷ (2 + 4)² × 9 = ?","9","Order of Operations"],
  // Fractions (12 items)
  ["g5m_fr01","1/2 × 1/2 = ?","1/4","Fractions"],
  ["g5m_fr02","2/3 × 3/4 = ?","1/2","Fractions"],
  ["g5m_fr03","1/2 ÷ 2 = ?","1/4","Fractions"],
  ["g5m_fr04","3/4 × 2/3 = ?","1/2","Fractions"],
  ["g5m_fr05","1/3 × 1/3 = ?","1/9","Fractions"],
  ["g5m_fr06","2/5 × 5/2 = ?","1","Fractions"],
  ["g5m_fr07","1/4 ÷ 2 = ?","1/8","Fractions"],
  ["g5m_fr08","3/4 ÷ 3 = ?","1/4","Fractions"],
  ["g5m_fr09","1/2 × 4 = ?","2","Fractions"],
  ["g5m_fr10","1/3 × 6 = ?","2","Fractions"],
  ["g5m_fr11","2/3 + 1/6 = ?","5/6","Fractions"],
  ["g5m_fr12","3/4 − 1/8 = ?","5/8","Fractions"],
  // Percentages (10 items)
  ["g5m_pc01","What is 15% of 60?","9","Percentages"],
  ["g5m_pc02","A $40 shirt is 25% off. What is the sale price?","$30","Percentages"],
  ["g5m_pc03","18 out of 24 students passed. What percent passed?","75%","Percentages"],
  ["g5m_pc04","What is 20% of 85?","17","Percentages"],
  ["g5m_pc05","A store marks up a $50 item by 30%. What is the new price?","$65","Percentages"],
  ["g5m_pc06","12 out of 48 apples are bad. What percent is bad?","25%","Percentages"],
  ["g5m_pc07","What is 35% of 200?","70","Percentages"],
  ["g5m_pc08","A $120 jacket is 15% off. How much do you save?","$18","Percentages"],
  ["g5m_pc09","What percent of 80 is 20?","25%","Percentages"],
  ["g5m_pc10","A class of 30 has 40% girls. How many girls?","12","Percentages"],
  // Geometry (12 items)
  ["g5m_ge01","A rectangular prism is 4 cm × 3 cm × 5 cm. What is its volume?","60","Geometry"],
  ["g5m_ge02","The sum of interior angles in a pentagon = ___°.","540","Geometry"],
  ["g5m_ge03","Two lines cross forming a 120° angle. The supplementary angle is ___°.","60","Geometry"],
  ["g5m_ge04","A fish tank is 6 ft × 2 ft × 3 ft. What is its volume?","36","Geometry"],
  ["g5m_ge05","The sum of interior angles in a hexagon = ___°.","720","Geometry"],
  ["g5m_ge06","Volume = length × width × ___.","height","Geometry"],
  ["g5m_ge07","A cube has side length 4 cm. What is its volume?","64","Geometry"],
  ["g5m_ge08","Two angles are supplementary. One is 73°. What is the other?","107","Geometry"],
  ["g5m_ge09","A rectangle 8 long and 6 wide has area = ?","48","Geometry"],
  ["g5m_ge10","A prism has a base area of 12 sq ft and height of 5 ft. Volume = ?","60","Geometry"],
  ["g5m_ge11","The sum of interior angles in a triangle = ___°.","180","Geometry"],
  ["g5m_ge12","A quadrilateral with exactly one pair of parallel sides is a ___.","trapezoid","Geometry"],
  // Coordinate Plane — all 4 quadrants (10 items)
  ["g5m_cp01","In which quadrant is the point (−3, 4)?","II","Coordinate Plane"],
  ["g5m_cp02","In which quadrant is the point (5, −2)?","IV","Coordinate Plane"],
  ["g5m_cp03","In which quadrant is the point (−2, −5)?","III","Coordinate Plane"],
  ["g5m_cp04","In which quadrant is the point (3, 7)?","I","Coordinate Plane"],
  ["g5m_cp05","What is the x-coordinate of (5, −2)?","5","Coordinate Plane"],
  ["g5m_cp06","Which axis is vertical?","y-axis","Coordinate Plane"],
  ["g5m_cp07","Which axis is horizontal?","x-axis","Coordinate Plane"],
  ["g5m_cp08","The point (0, 0) is called the ___.","origin","Coordinate Plane"],
  ["g5m_cp09","A point at (−4, 0) lies on which axis?","x-axis","Coordinate Plane"],
  ["g5m_cp10","In Quadrant II, the x-coordinate is ___ and the y-coordinate is ___.","negative, positive","Coordinate Plane"],
]);

/* ---- 5th Grade Reading ------------------------------------- */
const GRADE5_READING = _u([
  // Figurative Language — literary analysis (12 items)
  ["g5r_fl01","'Life is a journey, not a destination' is a ___.","metaphor","Figurative Language"],
  ["g5r_fl02","'The thunder growled angrily' gives human traits to thunder. This is ___.","personification","Figurative Language"],
  ["g5r_fl03","An author uses short choppy sentences during a chase scene. This creates ___.","tension","Figurative Language"],
  ["g5r_fl04","'I have told you a million times!' is an example of ___.","hyperbole","Figurative Language"],
  ["g5r_fl05","The phrase 'break a leg' is an example of ___.","idiom","Figurative Language"],
  ["g5r_fl06","'Peter Piper picked a peck of pickled peppers' uses ___.","alliteration","Figurative Language"],
  ["g5r_fl07","'Her laughter was a melody floating through the room' is a ___.","metaphor","Figurative Language"],
  ["g5r_fl08","'Spill the beans' is an idiom meaning ___.","reveal a secret","Figurative Language"],
  ["g5r_fl09","An author describes a faded, silent house using gloomy adjectives. This creates ___.","mood","Figurative Language"],
  ["g5r_fl10","'The old oak shivered in the winter wind' is ___.","personification","Figurative Language"],
  ["g5r_fl11","'She was as stubborn as a mule' is a ___.","simile","Figurative Language"],
  ["g5r_fl12","Repeating a word or phrase at the start of lines for effect is ___.","anaphora","Figurative Language"],
  // Literary Terms — analytical application (12 items)
  ["g5r_lt01","The part of a story where the main conflict is solved is the ___.","resolution","Literary Terms"],
  ["g5r_lt02","When an author hints at future events it is called ___.","foreshadowing","Literary Terms"],
  ["g5r_lt03","A story told from the main character's view uses ___ person narration.","first","Literary Terms"],
  ["g5r_lt04","A character starts selfish but learns generosity. This is called character ___.","development","Literary Terms"],
  ["g5r_lt05","An author uses a thunderstorm as a character faces her biggest fear. This weather is ___.","symbolism","Literary Terms"],
  ["g5r_lt06","A story's narrator knows the thoughts of every character. This is ___ point of view.","third person omniscient","Literary Terms"],
  ["g5r_lt07","A story flashes back to a childhood memory to explain a character's fear. This device is ___.","flashback","Literary Terms"],
  ["g5r_lt08","To support a claim with text evidence means to quote ___.","from the text","Literary Terms"],
  ["g5r_lt09","A character who does not change throughout a story is called ___.","static","Literary Terms"],
  ["g5r_lt10","The central message or lesson of a story is its ___.","theme","Literary Terms"],
  ["g5r_lt11","When events are listed in order from first to last, they are in ___ order.","chronological","Literary Terms"],
  ["g5r_lt12","An author writes a harsh villain and a kind hero to create ___.","contrast","Literary Terms"],
  // Grammar — analytical (12 items)
  ["g5r_gr01","Which is correct: 'Between you and I' or 'Between you and me'?","Between you and me","Grammar"],
  ["g5r_gr02","Identify the error: 'The team are playing well.'","team is","Grammar"],
  ["g5r_gr03","'Although it was raining' — this clause needs a ___ to be a sentence.","main clause","Grammar"],
  ["g5r_gr04","Which is correct: 'Me and Jake went' or 'Jake and I went'?","Jake and I went","Grammar"],
  ["g5r_gr05","'She reluctantly agreed.' What part of speech is 'reluctantly'?","adverb","Grammar"],
  ["g5r_gr06","Identify the conjunction: 'I wanted to go, but it was raining.'","but","Grammar"],
  ["g5r_gr07","'Running to class' is a sentence fragment because it has no ___.","subject","Grammar"],
  ["g5r_gr08","A complex sentence has an independent and a ___ clause.","dependent","Grammar"],
  ["g5r_gr09","Which sentence uses the correct pronoun: 'Her and I talked' or 'She and I talked'?","She and I talked","Grammar"],
  ["g5r_gr10","'The swift fox leaped gracefully.' What part of speech is 'gracefully'?","adverb","Grammar"],
  ["g5r_gr11","Which is a run-on? 'I ran I fell' or 'I ran and fell'?","I ran I fell","Grammar"],
  ["g5r_gr12","In 'The dog that barked all night kept us awake,' the underlined clause is a ___ clause.","relative","Grammar"],
  // Vocabulary — Greek/Latin roots (chron, graph, tele, vis, bene, mal) + context (12 items)
  ["g5r_vo01","The root 'chron' means time. A chronological story is told ___.","in time order","Vocabulary"],
  ["g5r_vo02","The root 'bene' means good. A benefactor provides ___.","help or support","Vocabulary"],
  ["g5r_vo03","The root 'mal' means bad. A malfunction is when something ___.","stops working","Vocabulary"],
  ["g5r_vo04","The root 'graph' means write. What does an autograph mean?","self-written signature","Vocabulary"],
  ["g5r_vo05","The root 'tele' means far. A telephone lets you speak to people ___.","far away","Vocabulary"],
  ["g5r_vo06","The root 'vis' means see. What does 'invisible' mean?","cannot be seen","Vocabulary"],
  ["g5r_vo07","The root 'chron' is in 'synchronize.' Synchronize means to happen ___.","at the same time","Vocabulary"],
  ["g5r_vo08","The root 'mal' is in 'malicious.' A malicious person intends to ___.","cause harm","Vocabulary"],
  ["g5r_vo09","The historian examined crumbling manuscripts to piece together the narrative. Manuscripts are ___.","handwritten documents","Vocabulary"],
  ["g5r_vo10","The root 'bene' is in 'beneficial.' Something beneficial is ___.","good or helpful","Vocabulary"],
  ["g5r_vo11","The root 'tele' is in 'telescope.' A telescope helps you see ___.","distant objects","Vocabulary"],
  ["g5r_vo12","The root 'graph' is in 'biography.' A biography is a written account of a person's ___.","life","Vocabulary"],
  // Reading Passages (2 items)
  ["g5r_pass01","Read: 'The ancient lighthouse keeper stood unmoved as another thousand waves crashed below. He had outlasted storms before and would outlast them again.' — What literary device is 'another thousand waves'?","hyperbole","Reading Passages"],
  ["g5r_pass02","Read: 'By the time the army arrived, the city was already a ghost — empty streets, shuttered windows, the only sound the hollow echo of footsteps.' — What figurative language technique is used in 'the city was a ghost'?","metaphor","Reading Passages"],
]);

/* ---- 3rd Grade Science ------------------------------------- */
const GRADE3_SCIENCE = _u([
  // Life Science (15 items)
  ["g3s_ls01","The process by which plants make food using sunlight is called ___.","photosynthesis","Life Science"],
  ["g3s_ls02","An animal that only eats plants is called a ___.","herbivore","Life Science"],
  ["g3s_ls03","Which part of a plant makes seeds?","flower","Life Science"],
  ["g3s_ls04","Roots absorb ___ from the soil for the plant.","water","Life Science"],
  ["g3s_ls05","Leaves make food for a plant through ___.","photosynthesis","Life Science"],
  ["g3s_ls06","A duck's webbed feet help it ___.","swim","Life Science"],
  ["g3s_ls07","The order of a butterfly's life cycle is: egg → ___ → pupa → adult.","larva","Life Science"],
  ["g3s_ls08","A frog eats insects. The frog is a ___.","consumer","Life Science"],
  ["g3s_ls09","An organism that breaks down dead plants and animals is a ___.","decomposer","Life Science"],
  ["g3s_ls10","An organism that makes its own food using sunlight is a ___.","producer","Life Science"],
  ["g3s_ls11","A beaver's flat tail and webbed feet are examples of ___.","adaptations","Life Science"],
  ["g3s_ls12","The place where an animal lives and finds food is its ___.","habitat","Life Science"],
  ["g3s_ls13","A pond, a forest, and a desert are each examples of an ___.","ecosystem","Life Science"],
  ["g3s_ls14","An animal that eats both plants and animals is called an ___.","omnivore","Life Science"],
  ["g3s_ls15","In a food chain, energy flows from ___ to consumers.","producers","Life Science"],
  // Earth Science (15 items)
  ["g3s_es01","When water vapor cools and turns into clouds, this is called ___.","condensation","Earth Science"],
  ["g3s_es02","Which type of rock forms from cooled lava?","igneous","Earth Science"],
  ["g3s_es03","The wearing away of rock and soil by wind or water is called ___.","erosion","Earth Science"],
  ["g3s_es04","When liquid water heats up and becomes water vapor, this is ___.","evaporation","Earth Science"],
  ["g3s_es05","Water that falls from clouds as rain or snow is called ___.","precipitation","Earth Science"],
  ["g3s_es06","The average weather of a place over many years is its ___.","climate","Earth Science"],
  ["g3s_es07","Rocks formed from layers of sediment pressed together are ___.","sedimentary","Earth Science"],
  ["g3s_es08","Rocks changed by heat and pressure underground are called ___.","metamorphic","Earth Science"],
  ["g3s_es09","The remains or traces of ancient living things found in rocks are ___.","fossils","Earth Science"],
  ["g3s_es10","Wind, water, and ice can all cause ___.","erosion","Earth Science"],
  ["g3s_es11","Solar energy and wind are examples of ___ resources.","renewable","Earth Science"],
  ["g3s_es12","Coal and oil are examples of ___ resources.","nonrenewable","Earth Science"],
  ["g3s_es13","The thin layer of gases surrounding Earth is the ___.","atmosphere","Earth Science"],
  ["g3s_es14","The three main layers of Earth are the crust, mantle, and ___.","core","Earth Science"],
  ["g3s_es15","The continuous movement of water from Earth to sky and back is the ___.","water cycle","Earth Science"],
  // Physical Science (15 items)
  ["g3s_ps01","The amount of space matter takes up is its ___.","volume","Physical Science"],
  ["g3s_ps02","Which simple machine has a wheel with a rope around it?","pulley","Physical Science"],
  ["g3s_ps03","Sound travels as ___.","vibrations","Physical Science"],
  ["g3s_ps04","Ice, liquid water, and steam are all the same substance in different ___.","states","Physical Science"],
  ["g3s_ps05","The three states of matter are solid, liquid, and ___.","gas","Physical Science"],
  ["g3s_ps06","The amount of matter in an object is its ___.","mass","Physical Science"],
  ["g3s_ps07","A push or pull on an object is called a ___.","force","Physical Science"],
  ["g3s_ps08","The force that pulls objects toward Earth is ___.","gravity","Physical Science"],
  ["g3s_ps09","A magnet attracts objects made of ___.","iron","Physical Science"],
  ["g3s_ps10","A ramp is an example of a simple machine called an ___.","inclined plane","Physical Science"],
  ["g3s_ps11","Like poles of two magnets will ___ each other.","repel","Physical Science"],
  ["g3s_ps12","Light travels in ___.","straight lines","Physical Science"],
  ["g3s_ps13","A lever is a simple machine that helps you ___ a heavy object.","lift","Physical Science"],
  ["g3s_ps14","The ability to do work is called ___.","energy","Physical Science"],
  ["g3s_ps15","Objects that have mass and take up space are made of ___.","matter","Physical Science"],
]);

/* ---- 3rd Grade Geography ----------------------------------- */
const GRADE3_GEOGRAPHY = _u([
  // Map Skills (12 items)
  ["g3g_ms01","A map key explains the ___ on a map.","symbols","Map Skills"],
  ["g3g_ms02","Lines of latitude run ___ on a map.","east-west","Map Skills"],
  ["g3g_ms03","The cardinal direction opposite of North is ___.","South","Map Skills"],
  ["g3g_ms04","A ___ shows direction on a map.","compass rose","Map Skills"],
  ["g3g_ms05","Lines of longitude run ___ on a map.","north-south","Map Skills"],
  ["g3g_ms06","A map ___ is used to measure real distances on a map.","scale","Map Skills"],
  ["g3g_ms07","A map that shows mountains, rivers, and landforms is a ___ map.","physical","Map Skills"],
  ["g3g_ms08","A map that shows country and state borders is a ___ map.","political","Map Skills"],
  ["g3g_ms09","Northeast is an example of an ___ direction.","intermediate","Map Skills"],
  ["g3g_ms10","The four cardinal directions are North, South, East, and ___.","West","Map Skills"],
  ["g3g_ms11","Latitude and longitude are used to find the ___ of a place.","location","Map Skills"],
  ["g3g_ms12","A globe is a model of ___.","Earth","Map Skills"],
  // Landforms (12 items)
  ["g3g_lf01","Land surrounded on three sides by water is a ___.","peninsula","Landforms"],
  ["g3g_lf02","A large flat area of land is a ___.","plain","Landforms"],
  ["g3g_lf03","The Grand Canyon is an example of a ___.","canyon","Landforms"],
  ["g3g_lf04","Land completely surrounded by water is called an ___.","island","Landforms"],
  ["g3g_lf05","A high flat area of land is called a ___.","plateau","Landforms"],
  ["g3g_lf06","A low area of land between hills or mountains is a ___.","valley","Landforms"],
  ["g3g_lf07","A triangle-shaped area of land where a river meets the sea is a ___.","delta","Landforms"],
  ["g3g_lf08","A part of an ocean or lake that curves into the land is a ___.","bay","Landforms"],
  ["g3g_lf09","A very dry area that gets very little rainfall is a ___.","desert","Landforms"],
  ["g3g_lf10","A wet forest that gets a lot of rain is a ___.","rainforest","Landforms"],
  ["g3g_lf11","A frozen, treeless land in the far north is called ___.","tundra","Landforms"],
  ["g3g_lf12","The highest type of landform is a ___.","mountain","Landforms"],
  // US Regions (12 items)
  ["g3g_ur01","Florida is in the ___ region of the US.","Southeast","US Regions"],
  ["g3g_ur02","Which region includes states like Texas and Arizona?","Southwest","US Regions"],
  ["g3g_ur03","The Great Lakes are located in the ___ region.","Midwest","US Regions"],
  ["g3g_ur04","New York and Massachusetts are in the ___ region.","Northeast","US Regions"],
  ["g3g_ur05","California and Oregon are in the ___ region.","West","US Regions"],
  ["g3g_ur06","The five US regions are Northeast, Southeast, Midwest, Southwest, and ___.","West","US Regions"],
  ["g3g_ur07","Which region is known for wide, flat plains and farms?","Midwest","US Regions"],
  ["g3g_ur08","The Rocky Mountains are mainly in the ___ region.","West","US Regions"],
  ["g3g_ur09","Which region borders the Gulf of Mexico?","Southeast","US Regions"],
  ["g3g_ur10","Which region includes the state of Colorado?","West","US Regions"],
  ["g3g_ur11","Which region includes Ohio, Illinois, and Indiana?","Midwest","US Regions"],
  ["g3g_ur12","Which US region is home to the Appalachian Mountains?","Northeast","US Regions"],
]);

/* ---- 4th Grade Science ------------------------------------- */
const GRADE4_SCIENCE = _u([
  // Life Science (15 items)
  ["g4s_ls01","The part of the cell that controls the cell's activities is the ___.","nucleus","Life Science"],
  ["g4s_ls02","Which body system pumps blood?","circulatory","Life Science"],
  ["g4s_ls03","In a food web, energy flows from ___ to consumers.","producers","Life Science"],
  ["g4s_ls04","A plant cell has a ___ wall that an animal cell does not have.","cell","Life Science"],
  ["g4s_ls05","The cell ___ controls what enters and leaves a cell.","membrane","Life Science"],
  ["g4s_ls06","Which body system breaks down food?","digestive","Life Science"],
  ["g4s_ls07","Which body system takes in oxygen?","respiratory","Life Science"],
  ["g4s_ls08","Which body system supports and protects your body?","skeletal","Life Science"],
  ["g4s_ls09","Which body system helps you move?","muscular","Life Science"],
  ["g4s_ls10","An ecosystem where one animal eats another and that one eats another is called a food ___.","web","Life Science"],
  ["g4s_ls11","The smallest unit of life is a ___.","cell","Life Science"],
  ["g4s_ls12","The heart, blood, and blood vessels make up the ___ system.","circulatory","Life Science"],
  ["g4s_ls13","The lungs are the main organs of the ___ system.","respiratory","Life Science"],
  ["g4s_ls14","Groups of cells working together form a ___.","tissue","Life Science"],
  ["g4s_ls15","Energy moves through an ecosystem from producers to ___.","consumers","Life Science"],
  // Earth Science (15 items)
  ["g4s_es01","Earth completes one rotation every ___.","24 hours","Earth Science"],
  ["g4s_es02","Which planet is closest to the Sun?","Mercury","Earth Science"],
  ["g4s_es03","The name for a sudden shaking of Earth's crust is a(n) ___.","earthquake","Earth Science"],
  ["g4s_es04","Earth completes one revolution around the Sun every ___.","365 days","Earth Science"],
  ["g4s_es05","The eight planets in order from the Sun — first is Mercury, then ___.","Venus","Earth Science"],
  ["g4s_es06","The moon phase when the entire moon face is lit is a ___ moon.","full","Earth Science"],
  ["g4s_es07","Seasons are caused by Earth's ___ as it orbits the Sun.","tilt","Earth Science"],
  ["g4s_es08","A mountain that can erupt with lava is a ___.","volcano","Earth Science"],
  ["g4s_es09","The theory that Earth's continents were once joined is called ___.","continental drift","Earth Science"],
  ["g4s_es10","A large wave caused by an underwater earthquake is a ___.","tsunami","Earth Science"],
  ["g4s_es11","The planets that are closest to the Sun are called ___ planets.","inner","Earth Science"],
  ["g4s_es12","The Sun, planets, and moons make up our ___.","solar system","Earth Science"],
  ["g4s_es13","A comet is a ball of ice and rock that travels around the ___.","Sun","Earth Science"],
  ["g4s_es14","What causes day and night on Earth?","rotation","Earth Science"],
  ["g4s_es15","The moon phase when none of the moon face is lit is a ___ moon.","new","Earth Science"],
  // Physical Science (12 items)
  ["g4s_ps01","A ball rolling down a hill has ___ energy.","kinetic","Physical Science"],
  ["g4s_ps02","A ball at the top of a hill has ___ energy.","potential","Physical Science"],
  ["g4s_ps03","Which material is a good conductor of electricity?","copper","Physical Science"],
  ["g4s_ps04","A burning candle is an example of a ___ change.","chemical","Physical Science"],
  ["g4s_ps05","Cutting paper is an example of a ___ change.","physical","Physical Science"],
  ["g4s_ps06","An electric circuit that has a break and does not flow is an ___ circuit.","open","Physical Science"],
  ["g4s_ps07","An electric circuit where current can flow is a ___ circuit.","closed","Physical Science"],
  ["g4s_ps08","Rubber and plastic are good ___ of electricity.","insulators","Physical Science"],
  ["g4s_ps09","Energy stored in food and fuel is ___ energy.","chemical","Physical Science"],
  ["g4s_ps10","Heat energy is also called ___ energy.","thermal","Physical Science"],
  ["g4s_ps11","Light, heat, and sound are all forms of ___.","energy","Physical Science"],
  ["g4s_ps12","When ice melts, it is a ___ change because no new substance forms.","physical","Physical Science"],
  // Florida Ecosystems (12 items)
  ["g4s_fe01","The Everglades is an example of a ___ ecosystem.","wetland","Florida Ecosystems"],
  ["g4s_fe02","The Florida panther is considered ___ because very few remain.","endangered","Florida Ecosystems"],
  ["g4s_fe03","Mangrove trees protect Florida coastlines from ___.","erosion","Florida Ecosystems"],
  ["g4s_fe04","Coral reefs are found in ___ water near Florida's coast.","shallow","Florida Ecosystems"],
  ["g4s_fe05","An animal that is not native and harms local wildlife is called ___.","invasive","Florida Ecosystems"],
  ["g4s_fe06","The manatee is a large marine mammal that eats ___.","plants","Florida Ecosystems"],
  ["g4s_fe07","Sea turtles come to Florida beaches to ___.","lay eggs","Florida Ecosystems"],
  ["g4s_fe08","Cypress swamps are common in ___ Florida.","northern","Florida Ecosystems"],
  ["g4s_fe09","The Florida scrub habitat is home to many ___ species.","rare","Florida Ecosystems"],
  ["g4s_fe10","Mangrove roots provide shelter for young fish and ___.","wildlife","Florida Ecosystems"],
  ["g4s_fe11","Coral reefs are important because they support ___ of ocean life.","diversity","Florida Ecosystems"],
  ["g4s_fe12","The Everglades is nicknamed the River of ___.","Grass","Florida Ecosystems"],
]);

/* ---- 4th Grade Geography ----------------------------------- */
const GRADE4_GEOGRAPHY = _u([
  // World Geography (15 items)
  ["g4g_wg01","Which is the largest continent?","Asia","World Geography"],
  ["g4g_wg02","The equator divides Earth into the Northern and ___ hemispheres.","Southern","World Geography"],
  ["g4g_wg03","The longest river in the world is the ___.","Nile","World Geography"],
  ["g4g_wg04","How many continents are there?","7","World Geography"],
  ["g4g_wg05","How many oceans are there?","5","World Geography"],
  ["g4g_wg06","The largest ocean in the world is the ___.","Pacific","World Geography"],
  ["g4g_wg07","The world's highest mountain range is the ___.","Himalayas","World Geography"],
  ["g4g_wg08","The largest desert in the world is the ___.","Sahara","World Geography"],
  ["g4g_wg09","The imaginary line at 0° longitude is the ___ meridian.","prime","World Geography"],
  ["g4g_wg10","The tropics are located near the ___.","equator","World Geography"],
  ["g4g_wg11","The Amazon River is located in ___.","South America","World Geography"],
  ["g4g_wg12","The Andes mountain range runs along the coast of ___.","South America","World Geography"],
  ["g4g_wg13","The Gobi Desert is located in ___.","Asia","World Geography"],
  ["g4g_wg14","The Alps mountain range is in ___.","Europe","World Geography"],
  ["g4g_wg15","The prime meridian and equator are both examples of ___ lines.","imaginary","World Geography"],
  // US Geography (15 items)
  ["g4g_us01","Which mountain range runs along the eastern US?","Appalachians","US Geography"],
  ["g4g_us02","How many Great Lakes are there?","5","US Geography"],
  ["g4g_us03","The Mississippi River flows into the Gulf of ___.","Mexico","US Geography"],
  ["g4g_us04","Which mountain range runs along the western US?","Rockies","US Geography"],
  ["g4g_us05","The Great Lakes border the US and ___.","Canada","US Geography"],
  ["g4g_us06","The Colorado River carved the ___.","Grand Canyon","US Geography"],
  ["g4g_us07","The Sierra Nevada mountain range is in the state of ___.","California","US Geography"],
  ["g4g_us08","The Missouri River is a major tributary of the ___ River.","Mississippi","US Geography"],
  ["g4g_us09","The Ohio River forms the border between Ohio and ___.","Kentucky","US Geography"],
  ["g4g_us10","Puerto Rico and Guam are US ___.","territories","US Geography"],
  ["g4g_us11","The largest US state by area is ___.","Alaska","US Geography"],
  ["g4g_us12","Death Valley, the lowest point in the US, is in ___.","California","US Geography"],
  ["g4g_us13","The Appalachian Mountains stretch from Georgia to ___.","Maine","US Geography"],
  ["g4g_us14","The Great Plains region of the US is mainly used for ___.","farming","US Geography"],
  ["g4g_us15","The Rio Grande River forms part of the border between the US and ___.","Mexico","US Geography"],
  // Economics Basics (12 items)
  ["g4g_ec01","When a product is rare and people want it, its price usually ___.","rises","Economics Basics"],
  ["g4g_ec02","Opportunity cost is what you ___ when you make a choice.","give up","Economics Basics"],
  ["g4g_ec03","A haircut is an example of a ___.","service","Economics Basics"],
  ["g4g_ec04","A pair of shoes is an example of a ___.","good","Economics Basics"],
  ["g4g_ec05","When demand goes up and supply stays the same, price usually ___.","rises","Economics Basics"],
  ["g4g_ec06","Goods brought into a country from another country are called ___.","imports","Economics Basics"],
  ["g4g_ec07","Goods sent to other countries are called ___.","exports","Economics Basics"],
  ["g4g_ec08","When there is not enough of something for everyone who wants it, there is a ___.","scarcity","Economics Basics"],
  ["g4g_ec09","Someone who starts a new business is called an ___.","entrepreneur","Economics Basics"],
  ["g4g_ec10","The exchange of goods and services between buyers and sellers is called ___.","trade","Economics Basics"],
  ["g4g_ec11","A person who buys and uses goods and services is a ___.","consumer","Economics Basics"],
  ["g4g_ec12","A person or company that makes goods or provides services is a ___.","producer","Economics Basics"],
]);

/* ---- 5th Grade Science ------------------------------------- */
const GRADE5_SCIENCE = _u([
  // Life Science (15 items)
  ["g5s_ls01","The scientific name of an organism uses its ___ and species.","genus","Life Science"],
  ["g5s_ls02","The process that plants use to make food is ___.","photosynthesis","Life Science"],
  ["g5s_ls03","A trait passed from parent to offspring is called a(n) ___ trait.","inherited","Life Science"],
  ["g5s_ls04","The order of classification from broadest to smallest is Kingdom, Phylum, Class, Order, Family, Genus, ___.","Species","Life Science"],
  ["g5s_ls05","A mnemonic for classification levels is 'King Philip Came Over For ___ Soup'.","Good","Life Science"],
  ["g5s_ls06","The process by which organisms better suited to their environment survive is ___.","natural selection","Life Science"],
  ["g5s_ls07","A large community of plants and animals living in a region is a ___.","biome","Life Science"],
  ["g5s_ls08","DNA carries the ___ for an organism.","genetic information","Life Science"],
  ["g5s_ls09","Cellular respiration releases ___ stored in food.","energy","Life Science"],
  ["g5s_ls10","A trait that an organism develops because of its environment is ___.","acquired","Life Science"],
  ["g5s_ls11","The tundra, rainforest, and desert are examples of ___.","biomes","Life Science"],
  ["g5s_ls12","The kingdom that includes mushrooms and mold is ___.","Fungi","Life Science"],
  ["g5s_ls13","The photosynthesis equation takes in water and CO2 and releases ___.","oxygen","Life Science"],
  ["g5s_ls14","Organisms with a backbone are called ___.","vertebrates","Life Science"],
  ["g5s_ls15","Organisms without a backbone are called ___.","invertebrates","Life Science"],
  // Earth & Space (15 items)
  ["g5s_ea01","Which planet has the most moons?","Saturn","Earth & Space"],
  ["g5s_ea02","A light-year measures ___.","distance","Earth & Space"],
  ["g5s_ea03","Which layer of Earth is liquid metal?","outer core","Earth & Space"],
  ["g5s_ea04","The asteroid belt is located between Mars and ___.","Jupiter","Earth & Space"],
  ["g5s_ea05","Earth's seasons are caused by its ___ on its axis.","tilt","Earth & Space"],
  ["g5s_ea06","A rocky body that orbits the Sun but is smaller than a planet is a ___.","asteroid","Earth & Space"],
  ["g5s_ea07","A ball of ice and dust that forms a glowing tail near the Sun is a ___.","comet","Earth & Space"],
  ["g5s_ea08","The inner planets are Mercury, Venus, Earth, and ___.","Mars","Earth & Space"],
  ["g5s_ea09","The rock cycle shows how rocks change between igneous, sedimentary, and ___.","metamorphic","Earth & Space"],
  ["g5s_ea10","Water that soaks into the ground and flows through soil is called ___.","groundwater","Earth & Space"],
  ["g5s_ea11","Water released by plant leaves into the air is called ___.","transpiration","Earth & Space"],
  ["g5s_ea12","The large sections of Earth's crust that move are called tectonic ___.","plates","Earth & Space"],
  ["g5s_ea13","A star is a ball of very hot ___ held together by gravity.","gas","Earth & Space"],
  ["g5s_ea14","The galaxy that contains our solar system is called the ___.","Milky Way","Earth & Space"],
  ["g5s_ea15","The outermost layer of Earth is the ___.","crust","Earth & Space"],
  // Physical Science (15 items)
  ["g5s_ps01","Newton's First Law states that an object at rest stays at rest unless acted on by a(n) ___ force.","unbalanced","Physical Science"],
  ["g5s_ps02","The number of waves that pass a point per second is its ___.","frequency","Physical Science"],
  ["g5s_ps03","In a chemical reaction, the starting materials are called ___.","reactants","Physical Science"],
  ["g5s_ps04","Newton's Second Law: force equals mass times ___.","acceleration","Physical Science"],
  ["g5s_ps05","Newton's Third Law: for every action there is an equal and opposite ___.","reaction","Physical Science"],
  ["g5s_ps06","Speed in a specific direction is called ___.","velocity","Physical Science"],
  ["g5s_ps07","In a chemical reaction, the substances produced are called ___.","products","Physical Science"],
  ["g5s_ps08","The height of a wave is its ___.","amplitude","Physical Science"],
  ["g5s_ps09","The distance between two wave peaks is the ___.","wavelength","Physical Science"],
  ["g5s_ps10","The electromagnetic spectrum includes radio waves, microwaves, and visible ___.","light","Physical Science"],
  ["g5s_ps11","Work is done when a force causes an object to ___.","move","Physical Science"],
  ["g5s_ps12","An element's atomic number equals the number of ___ in its nucleus.","protons","Physical Science"],
  ["g5s_ps13","Balanced forces on an object result in ___ motion.","no change in","Physical Science"],
  ["g5s_ps14","The rate of change in velocity is called ___.","acceleration","Physical Science"],
  ["g5s_ps15","Distance divided by time equals ___.","speed","Physical Science"],
  // Scientific Method (12 items)
  ["g5s_sm01","The variable that is changed in an experiment is the ___ variable.","independent","Scientific Method"],
  ["g5s_sm02","The variable that is measured is the ___ variable.","dependent","Scientific Method"],
  ["g5s_sm03","A scientific ___ is a well-tested explanation supported by much evidence.","theory","Scientific Method"],
  ["g5s_sm04","A testable prediction about an experiment is called a ___.","hypothesis","Scientific Method"],
  ["g5s_sm05","Variables kept the same throughout an experiment are ___ variables.","controlled","Scientific Method"],
  ["g5s_sm06","A conclusion is based on analyzing ___.","data","Scientific Method"],
  ["g5s_sm07","When other scientists check your experiment, this is called ___.","peer review","Scientific Method"],
  ["g5s_sm08","A scientific law ___ what happens but does not explain why.","describes","Scientific Method"],
  ["g5s_sm09","Using your senses to gather information is called ___.","observation","Scientific Method"],
  ["g5s_sm10","An explanation based on observations, not direct measurement, is an ___.","inference","Scientific Method"],
  ["g5s_sm11","The first step of the scientific method is asking a ___.","question","Scientific Method"],
  ["g5s_sm12","Recording measurements and results during an experiment is collecting ___.","data","Scientific Method"],
]);

/* ---- 5th Grade Geography ----------------------------------- */
const GRADE5_GEOGRAPHY = _u([
  // World History & Geography (15 items)
  ["g5g_wh01","Christopher Columbus sailed for which country?","Spain","World History & Geography"],
  ["g5g_wh02","The Maya civilization was located in ___.","Mesoamerica","World History & Geography"],
  ["g5g_wh03","A document written by someone who witnessed an event is a ___ source.","primary","World History & Geography"],
  ["g5g_wh04","The first European to circumnavigate the globe was ___.","Magellan","World History & Geography"],
  ["g5g_wh05","Juan Ponce de León explored ___.","Florida","World History & Geography"],
  ["g5g_wh06","The Aztec civilization was located in what is now ___.","Mexico","World History & Geography"],
  ["g5g_wh07","The Inca civilization was located in ___.","South America","World History & Geography"],
  ["g5g_wh08","Ancient Egypt was located along the ___ River.","Nile","World History & Geography"],
  ["g5g_wh09","Mesopotamia was located between the Tigris and ___ rivers.","Euphrates","World History & Geography"],
  ["g5g_wh10","A book written about an event using other sources is a ___ source.","secondary","World History & Geography"],
  ["g5g_wh11","The spreading of ideas between cultures is called cultural ___.","diffusion","World History & Geography"],
  ["g5g_wh12","Ancient Rome was located in what is now ___.","Italy","World History & Geography"],
  ["g5g_wh13","The Age of Exploration was a period when Europeans explored ___.","new lands","World History & Geography"],
  ["g5g_wh14","Amerigo Vespucci is credited with realizing the Americas were a ___.","new continent","World History & Geography"],
  ["g5g_wh15","Hernando de Soto was the first European to explore the ___.","Mississippi River","World History & Geography"],
  // Government & Civics (15 items)
  ["g5g_gc01","Which branch of government makes laws?","legislative","Government & Civics"],
  ["g5g_gc02","The First Amendment protects freedom of ___.","speech","Government & Civics"],
  ["g5g_gc03","The system that prevents any one branch from having too much power is called ___.","checks and balances","Government & Civics"],
  ["g5g_gc04","Which branch of government enforces laws?","executive","Government & Civics"],
  ["g5g_gc05","Which branch of government interprets laws?","judicial","Government & Civics"],
  ["g5g_gc06","The first ten amendments to the Constitution are called the ___.","Bill of Rights","Government & Civics"],
  ["g5g_gc07","The system where power is shared between state and national governments is called ___.","federalism","Government & Civics"],
  ["g5g_gc08","The Supreme Court is part of the ___ branch.","judicial","Government & Civics"],
  ["g5g_gc09","The President leads the ___ branch of government.","executive","Government & Civics"],
  ["g5g_gc10","Congress is made up of the Senate and the ___.","House of Representatives","Government & Civics"],
  ["g5g_gc11","The Fourth Amendment protects against unlawful ___.","searches","Government & Civics"],
  ["g5g_gc12","The Constitution is the supreme ___ of the United States.","law","Government & Civics"],
  ["g5g_gc13","A citizen's right to vote is called ___.","suffrage","Government & Civics"],
  ["g5g_gc14","The Second Amendment protects the right to ___.","bear arms","Government & Civics"],
  ["g5g_gc15","The Fifth Amendment protects against being tried twice for the same crime, called ___.","double jeopardy","Government & Civics"],
  // Economics (12 items)
  ["g5g_ec01","The total value of goods and services produced in a country is its ___.","GDP","Economics"],
  ["g5g_ec02","When prices rise over time, this is called ___.","inflation","Economics"],
  ["g5g_ec03","Florida's number one industry is ___.","tourism","Economics"],
  ["g5g_ec04","An economic system where the government controls all production is a ___ economy.","command","Economics"],
  ["g5g_ec05","An economic system where individuals make economic decisions is a ___ economy.","market","Economics"],
  ["g5g_ec06","A tax placed on imported goods is called a ___.","tariff","Economics"],
  ["g5g_ec07","When countries depend on each other for goods, this is called economic ___.","interdependence","Economics"],
  ["g5g_ec08","The process of countries becoming more connected economically is ___.","globalization","Economics"],
  ["g5g_ec09","Florida's economy includes tourism, agriculture, aerospace, and ___.","ports","Economics"],
  ["g5g_ec10","A formal agreement between countries about trade is a trade ___.","agreement","Economics"],
  ["g5g_ec11","GDP stands for Gross Domestic ___.","Product","Economics"],
  ["g5g_ec12","When supply goes up and demand stays the same, price usually ___.","falls","Economics"],
]);

/* ---- 3rd Grade Financial Literacy -------------------------- */
const GRADE3_FINANCIAL = _u([
  // Earning & Saving (12 items)
  ["g3f_es01","Money you earn from working is called ___.","income","Earning & Saving"],
  ["g3f_es02","Putting money aside for later is called ___.","saving","Earning & Saving"],
  ["g3f_es03","A goal you save money for is a ___ goal.","financial","Earning & Saving"],
  ["g3f_es04","Interest is money the bank pays you for ___.","saving","Earning & Saving"],
  ["g3f_es05","Earning more than you spend creates ___.","savings","Earning & Saving"],
  ["g3f_es06","A job you do to earn money is called ___.","employment","Earning & Saving"],
  ["g3f_es07","What is the purpose of saving money?","future purchases","Earning & Saving"],
  ["g3f_es08","If you save $2 a week, in 5 weeks you have ___.","$10","Earning & Saving"],
  ["g3f_es09","Entrepreneurs make money by starting a ___.","business","Earning & Saving"],
  ["g3f_es10","A salary is money paid ___.","weekly or monthly","Earning & Saving"],
  ["g3f_es11","Commission is pay based on ___.","sales","Earning & Saving"],
  ["g3f_es12","Tips are extra money given for ___.","good service","Earning & Saving"],
  // Spending & Budgeting (12 items)
  ["g3f_sb01","A budget helps you plan how to ___ money.","spend","Spending & Budgeting"],
  ["g3f_sb02","A need is something you ___ to survive.","must have","Spending & Budgeting"],
  ["g3f_sb03","A want is something you ___ but don't need.","desire","Spending & Budgeting"],
  ["g3f_sb04","If an item costs $5 and you have $3, you cannot ___.","afford it","Spending & Budgeting"],
  ["g3f_sb05","Comparing prices before buying is called ___ shopping.","smart","Spending & Budgeting"],
  ["g3f_sb06","Spending less than you earn means you are ___.","saving","Spending & Budgeting"],
  ["g3f_sb07","Impulse buying means buying something without ___.","planning","Spending & Budgeting"],
  ["g3f_sb08","A grocery list helps you avoid ___.","overspending","Spending & Budgeting"],
  ["g3f_sb09","A receipt shows ___.","what you bought","Spending & Budgeting"],
  ["g3f_sb10","Sales tax is added to the ___ of items.","price","Spending & Budgeting"],
  ["g3f_sb11","A discount means the price is ___.","lower","Spending & Budgeting"],
  ["g3f_sb12","On sale means the item costs ___.","less than usual","Spending & Budgeting"],
  // Banking Basics (10 items)
  ["g3f_bb01","A bank is a safe place to keep your ___.","money","Banking Basics"],
  ["g3f_bb02","A savings account earns ___.","interest","Banking Basics"],
  ["g3f_bb03","A checking account is used for ___ spending.","everyday","Banking Basics"],
  ["g3f_bb04","A debit card takes money from your ___.","bank account","Banking Basics"],
  ["g3f_bb05","A credit card is ___ you borrow.","money","Banking Basics"],
  ["g3f_bb06","An ATM lets you ___ cash.","withdraw","Banking Basics"],
  ["g3f_bb07","Your PIN keeps your account ___.","secure","Banking Basics"],
  ["g3f_bb08","A bank statement shows your ___ history.","transaction","Banking Basics"],
  ["g3f_bb09","FDIC protects bank deposits up to ___.","$250,000","Banking Basics"],
  ["g3f_bb10","The purpose of a bank is to keep money ___.","safe","Banking Basics"],
]);

/* ---- 3rd Grade Spanish ------------------------------------- */
const GRADE3_SPANISH = _u([
  // Numbers & Colors (15 items)
  ["g3sp_nc01","The Spanish word for 'one' is ___.","uno","Numbers & Colors"],
  ["g3sp_nc02","The Spanish word for 'two' is ___.","dos","Numbers & Colors"],
  ["g3sp_nc03","'Rojo' means ___.","red","Numbers & Colors"],
  ["g3sp_nc04","'Azul' means ___.","blue","Numbers & Colors"],
  ["g3sp_nc05","'Verde' means ___.","green","Numbers & Colors"],
  ["g3sp_nc06","'Amarillo' means ___.","yellow","Numbers & Colors"],
  ["g3sp_nc07","'Tres' means ___.","three","Numbers & Colors"],
  ["g3sp_nc08","'Diez' means ___.","ten","Numbers & Colors"],
  ["g3sp_nc09","'Blanco' means ___.","white","Numbers & Colors"],
  ["g3sp_nc10","'Negro' means ___.","black","Numbers & Colors"],
  ["g3sp_nc11","'Cinco' means ___.","five","Numbers & Colors"],
  ["g3sp_nc12","'Ocho' means ___.","eight","Numbers & Colors"],
  ["g3sp_nc13","'Naranja' means ___.","orange","Numbers & Colors"],
  ["g3sp_nc14","'Cuatro' means ___.","four","Numbers & Colors"],
  ["g3sp_nc15","'Morado' means ___.","purple","Numbers & Colors"],
  // Greetings (12 items)
  ["g3sp_gr01","'Hola' means ___.","hello","Greetings"],
  ["g3sp_gr02","'Adiós' means ___.","goodbye","Greetings"],
  ["g3sp_gr03","'Buenos días' means ___.","good morning","Greetings"],
  ["g3sp_gr04","'Buenas noches' means ___.","good night","Greetings"],
  ["g3sp_gr05","'¿Cómo estás?' means ___.","how are you","Greetings"],
  ["g3sp_gr06","'Bien' means ___.","good/well","Greetings"],
  ["g3sp_gr07","'Gracias' means ___.","thank you","Greetings"],
  ["g3sp_gr08","'De nada' means ___.","you're welcome","Greetings"],
  ["g3sp_gr09","'Por favor' means ___.","please","Greetings"],
  ["g3sp_gr10","'Sí' means ___.","yes","Greetings"],
  ["g3sp_gr11","'No' means ___.","no","Greetings"],
  ["g3sp_gr12","'Me llamo' means ___.","my name is","Greetings"],
  // Family & School (12 items)
  ["g3sp_fs01","'Mamá' means ___.","mom","Family & School"],
  ["g3sp_fs02","'Papá' means ___.","dad","Family & School"],
  ["g3sp_fs03","'Hermano' means ___.","brother","Family & School"],
  ["g3sp_fs04","'Hermana' means ___.","sister","Family & School"],
  ["g3sp_fs05","'Maestro' means ___.","teacher (male)","Family & School"],
  ["g3sp_fs06","'Escuela' means ___.","school","Family & School"],
  ["g3sp_fs07","'Libro' means ___.","book","Family & School"],
  ["g3sp_fs08","'Lápiz' means ___.","pencil","Family & School"],
  ["g3sp_fs09","'Amigo' means ___.","friend (male)","Family & School"],
  ["g3sp_fs10","'Clase' means ___.","class","Family & School"],
  ["g3sp_fs11","'Mesa' means ___.","table/desk","Family & School"],
  ["g3sp_fs12","'Casa' means ___.","house","Family & School"],
]);

/* ---- 3rd Grade French -------------------------------------- */
const GRADE3_FRENCH = _u([
  // Numbers & Colors (12 items)
  ["g3fr_nc01","The French word for 'one' is ___.","un","Numbers & Colors"],
  ["g3fr_nc02","The French word for 'two' is ___.","deux","Numbers & Colors"],
  ["g3fr_nc03","'Trois' means ___.","three","Numbers & Colors"],
  ["g3fr_nc04","'Quatre' means ___.","four","Numbers & Colors"],
  ["g3fr_nc05","'Cinq' means ___.","five","Numbers & Colors"],
  ["g3fr_nc06","'Rouge' means ___.","red","Numbers & Colors"],
  ["g3fr_nc07","'Bleu' means ___.","blue","Numbers & Colors"],
  ["g3fr_nc08","'Vert' means ___.","green","Numbers & Colors"],
  ["g3fr_nc09","'Jaune' means ___.","yellow","Numbers & Colors"],
  ["g3fr_nc10","'Blanc' means ___.","white","Numbers & Colors"],
  ["g3fr_nc11","'Noir' means ___.","black","Numbers & Colors"],
  ["g3fr_nc12","'Dix' means ___.","ten","Numbers & Colors"],
  // Greetings (12 items)
  ["g3fr_gr01","'Bonjour' means ___.","hello/good day","Greetings"],
  ["g3fr_gr02","'Au revoir' means ___.","goodbye","Greetings"],
  ["g3fr_gr03","'Bonsoir' means ___.","good evening","Greetings"],
  ["g3fr_gr04","'Bonne nuit' means ___.","good night","Greetings"],
  ["g3fr_gr05","'Comment ça va?' means ___.","how is it going","Greetings"],
  ["g3fr_gr06","'Bien' means ___.","good/well","Greetings"],
  ["g3fr_gr07","'Merci' means ___.","thank you","Greetings"],
  ["g3fr_gr08","'De rien' means ___.","you're welcome","Greetings"],
  ["g3fr_gr09","'S'il vous plaît' means ___.","please","Greetings"],
  ["g3fr_gr10","'Oui' means ___.","yes","Greetings"],
  ["g3fr_gr11","'Non' means ___.","no","Greetings"],
  ["g3fr_gr12","'Je m'appelle' means ___.","my name is","Greetings"],
  // Family & School (12 items)
  ["g3fr_fs01","'Maman' means ___.","mom","Family & School"],
  ["g3fr_fs02","'Papa' means ___.","dad","Family & School"],
  ["g3fr_fs03","'Frère' means ___.","brother","Family & School"],
  ["g3fr_fs04","'Sœur' means ___.","sister","Family & School"],
  ["g3fr_fs05","'Maître/Maîtresse' means ___.","teacher","Family & School"],
  ["g3fr_fs06","'École' means ___.","school","Family & School"],
  ["g3fr_fs07","'Livre' means ___.","book","Family & School"],
  ["g3fr_fs08","'Crayon' means ___.","pencil","Family & School"],
  ["g3fr_fs09","'Ami/Amie' means ___.","friend","Family & School"],
  ["g3fr_fs10","'Classe' means ___.","class","Family & School"],
  ["g3fr_fs11","'Table' means ___.","table","Family & School"],
  ["g3fr_fs12","'Maison' means ___.","house","Family & School"],
]);

/* ---- 4th Grade French -------------------------------------- */
const GRADE4_FRENCH = _u([
  // Verb Conjugation (12 items)
  ["g4fr_vc01","Conjugate 'être' (to be) with 'je': Je ___ français.","suis","Verb Conjugation"],
  ["g4fr_vc02","Conjugate 'avoir' (to have) with 'tu': Tu ___ un chien.","as","Verb Conjugation"],
  ["g4fr_vc03","Conjugate 'parler' (to speak) with 'je': Je ___ français.","parle","Verb Conjugation"],
  ["g4fr_vc04","Conjugate 'manger' (to eat) with 'nous': Nous ___ ensemble.","mangeons","Verb Conjugation"],
  ["g4fr_vc05","Conjugate 'être' with 'il': Il ___ content.","est","Verb Conjugation"],
  ["g4fr_vc06","Conjugate 'avoir' with 'nous': Nous ___ deux chats.","avons","Verb Conjugation"],
  ["g4fr_vc07","Conjugate 'parler' with 'tu': Tu ___ bien français.","parles","Verb Conjugation"],
  ["g4fr_vc08","Conjugate 'être' with 'nous': Nous ___ à l'école.","sommes","Verb Conjugation"],
  ["g4fr_vc09","Conjugate 'manger' with 'je': Je ___ une pomme.","mange","Verb Conjugation"],
  ["g4fr_vc10","Conjugate 'avoir' with 'il': Il ___ faim.","a","Verb Conjugation"],
  ["g4fr_vc11","Conjugate 'parler' with 'ils': Ils ___ trop vite.","parlent","Verb Conjugation"],
  ["g4fr_vc12","Conjugate 'être' with 'vous': Vous ___ en retard.","êtes","Verb Conjugation"],
  // Food & Meals (12 items)
  ["g4fr_fe01","'Le pain' means ___.","bread","Food & Meals"],
  ["g4fr_fe02","'Le lait' means ___.","milk","Food & Meals"],
  ["g4fr_fe03","'L'eau' means ___.","water","Food & Meals"],
  ["g4fr_fe04","'La pomme' means ___.","apple","Food & Meals"],
  ["g4fr_fe05","'Le poulet' means ___.","chicken","Food & Meals"],
  ["g4fr_fe06","'Le riz' means ___.","rice","Food & Meals"],
  ["g4fr_fe07","'Le petit-déjeuner' means ___.","breakfast","Food & Meals"],
  ["g4fr_fe08","'Le déjeuner' means ___.","lunch","Food & Meals"],
  ["g4fr_fe09","'Le dîner' means ___.","dinner","Food & Meals"],
  ["g4fr_fe10","'J'ai faim' means ___.","I am hungry","Food & Meals"],
  ["g4fr_fe11","'J'ai soif' means ___.","I am thirsty","Food & Meals"],
  ["g4fr_fe12","'Le fromage' means ___.","cheese","Food & Meals"],
  // Community & Places (12 items)
  ["g4fr_cp01","'La bibliothèque' means ___.","the library","Community & Places"],
  ["g4fr_cp02","'La ville' means ___.","the city","Community & Places"],
  ["g4fr_cp03","'L'hôpital' means ___.","the hospital","Community & Places"],
  ["g4fr_cp04","'Le parc' means ___.","the park","Community & Places"],
  ["g4fr_cp05","'L'école' means ___.","the school","Community & Places"],
  ["g4fr_cp06","'La rue' means ___.","the street","Community & Places"],
  ["g4fr_cp07","'Le marché' means ___.","the market","Community & Places"],
  ["g4fr_cp08","'La banque' means ___.","the bank","Community & Places"],
  ["g4fr_cp09","'Le médecin' means ___.","the doctor","Community & Places"],
  ["g4fr_cp10","'Le pompier' means ___.","the firefighter","Community & Places"],
  ["g4fr_cp11","'La police' means ___.","the police","Community & Places"],
  ["g4fr_cp12","'La gare' means ___.","the train station","Community & Places"],
]);

/* ---- 5th Grade French -------------------------------------- */
const GRADE5_FRENCH = _u([
  // Past Tense (Passé Composé) (12 items)
  ["g5fr_pc01","Conjugate 'parler' in passé composé with 'j'': J'___ avec mon ami.","ai parlé","Past Tense (Passé Composé)"],
  ["g5fr_pc02","Conjugate 'manger' in passé composé with 'tu': Tu ___ une pizza.","as mangé","Past Tense (Passé Composé)"],
  ["g5fr_pc03","Conjugate 'finir' (to finish) in passé composé with 'il': Il ___ le livre.","a fini","Past Tense (Passé Composé)"],
  ["g5fr_pc04","Conjugate 'aller' (to go) in passé composé with 'je': Je ___ à l'école.","suis allé(e)","Past Tense (Passé Composé)"],
  ["g5fr_pc05","'Aller' uses ___ (not avoir) as the auxiliary in passé composé.","être","Past Tense (Passé Composé)"],
  ["g5fr_pc06","Conjugate 'parler' in passé composé with 'nous': Nous ___ français.","avons parlé","Past Tense (Passé Composé)"],
  ["g5fr_pc07","Conjugate 'venir' (to come) in passé composé with 'elle': Elle ___ ici.","est venue","Past Tense (Passé Composé)"],
  ["g5fr_pc08","The past participle of 'avoir' is ___.","eu","Past Tense (Passé Composé)"],
  ["g5fr_pc09","The past participle of 'être' is ___.","été","Past Tense (Passé Composé)"],
  ["g5fr_pc10","Conjugate 'manger' in passé composé with 'ils': Ils ___ ensemble.","ont mangé","Past Tense (Passé Composé)"],
  ["g5fr_pc11","'J'ai fini mes devoirs.' Translate to English.","I finished my homework.","Past Tense (Passé Composé)"],
  ["g5fr_pc12","With être verbs in passé composé, the past participle must agree with ___.","the subject","Past Tense (Passé Composé)"],
  // Reading Comprehension (12 items)
  ["g5fr_rc01","Lis et réponds: 'Pierre va à l'école chaque matin. Il aime les mathématiques.' Qu'est-ce que Pierre aime?","les mathématiques","Reading Comprehension"],
  ["g5fr_rc02","Lis et réponds: 'Marie a mangé une pomme et un sandwich. Elle a bu du lait.' Qu'est-ce que Marie a bu?","du lait","Reading Comprehension"],
  ["g5fr_rc03","Lis et réponds: 'Il pleuvait fort. Les enfants ont couru à la maison.' Pourquoi ont-ils couru?","parce qu'il pleuvait","Reading Comprehension"],
  ["g5fr_rc04","Lis et réponds: 'Le chat de Sophie s'appelle Minou. Il est noir et blanc.' De quelle couleur est Minou?","noir et blanc","Reading Comprehension"],
  ["g5fr_rc05","Lis et réponds: 'Luc a étudié toute la nuit. Il a eu un A à son examen.' Pourquoi a-t-il eu un A?","parce qu'il a étudié","Reading Comprehension"],
  ["g5fr_rc06","Lis et réponds: 'La famille Dupont habite à Paris depuis dix ans.' Depuis combien de temps habitent-ils à Paris?","dix ans","Reading Comprehension"],
  ["g5fr_rc07","Lis et réponds: 'Emma a lu cinq livres pendant les vacances. Elle adore lire.' Combien de livres a-t-elle lus?","cinq","Reading Comprehension"],
  ["g5fr_rc08","Lis et réponds: 'Le professeur a écrit les devoirs au tableau. Les élèves ont copié.' Qu'ont fait les élèves?","ils ont copié les devoirs","Reading Comprehension"],
  ["g5fr_rc09","Lis et réponds: 'Thomas n'a pas dormi. Il était très fatigué en classe.' Pourquoi était-il fatigué?","parce qu'il n'a pas dormi","Reading Comprehension"],
  ["g5fr_rc10","Lis et réponds: 'Il a plu samedi. Dimanche, il faisait beau et les enfants ont joué dehors.' Quand ont-ils joué dehors?","dimanche","Reading Comprehension"],
  ["g5fr_rc11","Lis et réponds: 'Le magasin a fermé à neuf heures. Marc est arrivé à neuf heures et quart.' Est-ce que Marc a pu entrer?","non","Reading Comprehension"],
  ["g5fr_rc12","Lis et réponds: 'Chloé parle français, anglais et espagnol.' Combien de langues parle-t-elle?","trois","Reading Comprehension"],
  // French Culture (12 items)
  ["g5fr_cu01","The Eiffel Tower is located in ___.","Paris","French Culture"],
  ["g5fr_cu02","The Eiffel Tower was built for the World's Fair of ___.","1889","French Culture"],
  ["g5fr_cu03","The Louvre is a famous ___ in Paris.","museum","French Culture"],
  ["g5fr_cu04","The Mona Lisa was painted by ___ and is displayed in the Louvre.","Leonardo da Vinci","French Culture"],
  ["g5fr_cu05","France's national holiday 'Bastille Day' is celebrated on July ___.","14","French Culture"],
  ["g5fr_cu06","French is an official language in ___ countries worldwide.","29","French Culture"],
  ["g5fr_cu07","The French Revolution began in ___.","1789","French Culture"],
  ["g5fr_cu08","France is famous for its cuisine — the bread known as a 'baguette' is a long, thin loaf of ___.","bread","French Culture"],
  ["g5fr_cu09","The famous French author Victor Hugo wrote 'Les ___'.","Misérables","French Culture"],
  ["g5fr_cu10","The currency used in France (and most of Europe) today is the ___.","euro","French Culture"],
  ["g5fr_cu11","Mont Blanc, the highest mountain in the Alps, is on the border of France and ___.","Italy","French Culture"],
  ["g5fr_cu12","The Tour de France is a famous international ___ race.","cycling","French Culture"],
]);

/* ---- 3rd Grade Art ----------------------------------------- */
const GRADE3_ART = [
  // Elements of Art (12 items)
  ["g3a_ea01","The seven elements of art include line, shape, form, value, texture, space, and ___.","color","Elements of Art"],
  ["g3a_ea02","A two-dimensional shape has length and ___.","width","Elements of Art"],
  ["g3a_ea03","A three-dimensional form has length, width, and ___.","depth","Elements of Art"],
  ["g3a_ea04","The lightness or darkness of a color is called its ___.","value","Elements of Art"],
  ["g3a_ea05","How something feels or looks like it would feel is ___.","texture","Elements of Art"],
  ["g3a_ea06","Negative space is the ___ around a subject.","area","Elements of Art"],
  ["g3a_ea07","Positive space is where the ___ is.","subject","Elements of Art"],
  ["g3a_ea08","A horizontal line feels ___.","calm","Elements of Art"],
  ["g3a_ea09","A vertical line feels ___.","tall or strong","Elements of Art"],
  ["g3a_ea10","A diagonal line creates a feeling of ___.","movement","Elements of Art"],
  ["g3a_ea11","Geometric shapes include circles, squares, and ___.","triangles","Elements of Art"],
  ["g3a_ea12","Organic shapes are ___.","freeform","Elements of Art"],
  // Art History (12 items)
  ["g3a_ah01","Leonardo da Vinci painted the ___.","Mona Lisa","Art History"],
  ["g3a_ah02","Vincent van Gogh painted The ___.","Starry Night","Art History"],
  ["g3a_ah03","Frida Kahlo was a famous artist from ___.","Mexico","Art History"],
  ["g3a_ah04","Pablo Picasso helped create ___.","Cubism","Art History"],
  ["g3a_ah05","The Renaissance was a period of great ___ in Europe.","art","Art History"],
  ["g3a_ah06","Claude Monet was known for ___ paintings.","Impressionist","Art History"],
  ["g3a_ah07","Ancient Egyptians painted on tomb walls using ___.","hieroglyphics","Art History"],
  ["g3a_ah08","Michelangelo painted the ___ Chapel ceiling.","Sistine","Art History"],
  ["g3a_ah09","Georgia O'Keeffe painted large ___ and New Mexico landscapes.","flowers","Art History"],
  ["g3a_ah10","Salvador Dalí was part of the ___ movement.","Surrealist","Art History"],
  ["g3a_ah11","Andy Warhol was famous for ___.","Pop Art","Art History"],
  ["g3a_ah12","The medium of sculpture uses ___ to create 3D art.","materials","Art History"],
  // Color Theory (10 items)
  ["g3a_ct01","Red, yellow, and blue are ___ colors.","primary","Color Theory"],
  ["g3a_ct02","Mixing red and blue makes ___.","purple","Color Theory"],
  ["g3a_ct03","Mixing yellow and blue makes ___.","green","Color Theory"],
  ["g3a_ct04","Orange, green, and purple are ___ colors.","secondary","Color Theory"],
  ["g3a_ct05","Colors opposite each other on the color wheel are ___.","complementary","Color Theory"],
  ["g3a_ct06","Adding white to a color makes a ___.","tint","Color Theory"],
  ["g3a_ct07","Adding black to a color makes a ___.","shade","Color Theory"],
  ["g3a_ct08","Red, orange, and yellow are ___ colors.","warm","Color Theory"],
  ["g3a_ct09","Blue, green, and purple are ___ colors.","cool","Color Theory"],
  ["g3a_ct10","A monochromatic color scheme uses ___ hue.","one","Color Theory"],
];

/* ---- 4th Grade Financial Literacy -------------------------- */
const GRADE4_FINANCIAL = _u([
  // Income & Taxes (12 items)
  ["g4f_it01","Taxes are money paid to the ___.","government","Income & Taxes"],
  ["g4f_it02","Income tax is based on how much you ___.","earn","Income & Taxes"],
  ["g4f_it03","Sales tax is added when you ___.","buy something","Income & Taxes"],
  ["g4f_it04","Property tax is paid on ___.","real estate","Income & Taxes"],
  ["g4f_it05","Tax money pays for schools, roads, and ___.","services","Income & Taxes"],
  ["g4f_it06","W-2 forms show your ___ for the year.","total earnings","Income & Taxes"],
  ["g4f_it07","Filing taxes is done each year by ___.","April 15","Income & Taxes"],
  ["g4f_it08","Tax deductions ___ the amount of tax you owe.","reduce","Income & Taxes"],
  ["g4f_it09","Gross income is what you earn ___ taxes.","before","Income & Taxes"],
  ["g4f_it10","Net income is what you take home ___ taxes.","after","Income & Taxes"],
  ["g4f_it11","The IRS collects ___ taxes.","federal","Income & Taxes"],
  ["g4f_it12","Social Security is a government program funded by ___.","taxes","Income & Taxes"],
  // Investing Basics (10 items)
  ["g4f_ib01","Investing means putting money to work to ___ more money.","earn","Investing Basics"],
  ["g4f_ib02","A stock represents part ownership in a ___.","company","Investing Basics"],
  ["g4f_ib03","A bond is a loan you give to a ___.","company or government","Investing Basics"],
  ["g4f_ib04","Diversification means spreading money across ___ investments.","different","Investing Basics"],
  ["g4f_ib05","Risk means the chance of ___ money.","losing","Investing Basics"],
  ["g4f_ib06","Higher risk investments usually offer ___ returns.","higher","Investing Basics"],
  ["g4f_ib07","The stock market is where ___ are bought and sold.","stocks","Investing Basics"],
  ["g4f_ib08","A mutual fund pools money from many ___.","investors","Investing Basics"],
  ["g4f_ib09","Compound interest earns interest on your ___.","interest","Investing Basics"],
  ["g4f_ib10","Long-term investing usually ___ wealth.","builds","Investing Basics"],
  // Consumer Skills (12 items)
  ["g4f_cs01","Advertising is designed to make you ___ products.","buy","Consumer Skills"],
  ["g4f_cs02","Comparing unit prices helps you find the ___ deal.","best","Consumer Skills"],
  ["g4f_cs03","A warranty protects you if a product ___.","breaks","Consumer Skills"],
  ["g4f_cs04","Return policies tell you if you can bring something ___.","back","Consumer Skills"],
  ["g4f_cs05","Reviews help you decide if a product is ___.","worth buying","Consumer Skills"],
  ["g4f_cs06","Fraudulent offers that seem too good are likely ___.","scams","Consumer Skills"],
  ["g4f_cs07","Identity theft means someone steals your ___.","personal information","Consumer Skills"],
  ["g4f_cs08","Phishing is a scam done through ___.","email","Consumer Skills"],
  ["g4f_cs09","A strong password has letters, numbers, and ___.","symbols","Consumer Skills"],
  ["g4f_cs10","Online shopping requires a ___ connection.","secure","Consumer Skills"],
  ["g4f_cs11","Consumer rights protect you from ___.","unfair practices","Consumer Skills"],
  ["g4f_cs12","The Better Business Bureau helps resolve ___.","complaints","Consumer Skills"],
]);

/* ---- 4th Grade Spanish ------------------------------------- */
const GRADE4_SPANISH = _u([
  // Verb Conjugation (12 items)
  ["g4sp_vc01","Conjugate 'hablar' (to speak) with 'yo': Yo ___ español.","hablo","Verb Conjugation"],
  ["g4sp_vc02","Conjugate 'comer' (to eat) with 'tú': Tú ___ una manzana.","comes","Verb Conjugation"],
  ["g4sp_vc03","Conjugate 'vivir' (to live) with 'él': Él ___ en México.","vive","Verb Conjugation"],
  ["g4sp_vc04","Conjugate 'hablar' with 'nosotros': Nosotros ___ español.","hablamos","Verb Conjugation"],
  ["g4sp_vc05","Conjugate 'correr' (to run) with 'yo': Yo ___ en el parque.","corro","Verb Conjugation"],
  ["g4sp_vc06","Conjugate 'escribir' (to write) with 'ella': Ella ___ una carta.","escribe","Verb Conjugation"],
  ["g4sp_vc07","Conjugate 'beber' (to drink) with 'nosotros': Nosotros ___ agua.","bebemos","Verb Conjugation"],
  ["g4sp_vc08","Conjugate 'vivir' with 'yo': Yo ___ en los Estados Unidos.","vivo","Verb Conjugation"],
  ["g4sp_vc09","Conjugate 'leer' (to read) with 'tú': Tú ___ el libro.","lees","Verb Conjugation"],
  ["g4sp_vc10","Conjugate 'comer' with 'ellos': Ellos ___ arroz.","comen","Verb Conjugation"],
  ["g4sp_vc11","Conjugate 'escribir' with 'nosotros': Nosotros ___ la tarea.","escribimos","Verb Conjugation"],
  ["g4sp_vc12","Conjugate 'correr' with 'tú': Tú ___ muy rápido.","corres","Verb Conjugation"],
  // Sentence Translation (12 items)
  ["g4sp_st01","Traduce al español: 'We eat dinner at seven o'clock.'","Comemos la cena a las siete.","Sentence Translation"],
  ["g4sp_st02","Traduce al español: 'I drink water every morning.'","Bebo agua cada mañana.","Sentence Translation"],
  ["g4sp_st03","Traduce al español: 'She writes a letter to her friend.'","Ella escribe una carta a su amiga.","Sentence Translation"],
  ["g4sp_st04","Translate to English: 'Nosotros estudiamos matemáticas.'","We study math.","Sentence Translation"],
  ["g4sp_st05","Traduce al español: 'He runs in the park every day.'","Él corre en el parque todos los días.","Sentence Translation"],
  ["g4sp_st06","Translate to English: 'Tú comes una manzana roja.'","You eat a red apple.","Sentence Translation"],
  ["g4sp_st07","Traduce al español: 'We speak Spanish in class.'","Hablamos español en clase.","Sentence Translation"],
  ["g4sp_st08","Translate to English: 'Ella vive en una casa grande.'","She lives in a big house.","Sentence Translation"],
  ["g4sp_st09","Traduce al español: 'I read a book at night.'","Leo un libro por la noche.","Sentence Translation"],
  ["g4sp_st10","Translate to English: 'Ellos beben leche cada día.'","They drink milk every day.","Sentence Translation"],
  ["g4sp_st11","Traduce al español: 'You (tú) write the homework.'","Tú escribes la tarea.","Sentence Translation"],
  ["g4sp_st12","Translate to English: 'Yo corro con mi perro.'","I run with my dog.","Sentence Translation"],
  // Grammar Rules (12 items)
  ["g4sp_gr01","¿Cuál es el artículo correcto para 'libro'? ___ libro","El","Grammar Rules"],
  ["g4sp_gr02","¿Cuál es el artículo correcto para 'casa'? ___ casa","La","Grammar Rules"],
  ["g4sp_gr03","¿Cuál es el plural de 'la casa'?","las casas","Grammar Rules"],
  ["g4sp_gr04","¿Cuál es el plural de 'el libro'?","los libros","Grammar Rules"],
  ["g4sp_gr05","In Spanish, adjectives must agree in ___ and number with the noun.","gender","Grammar Rules"],
  ["g4sp_gr06","'Un niño alto' — change to feminine: Una niña ___.","alta","Grammar Rules"],
  ["g4sp_gr07","The article 'un' is used with ___ nouns.","masculine","Grammar Rules"],
  ["g4sp_gr08","The article 'una' is used with ___ nouns.","feminine","Grammar Rules"],
  ["g4sp_gr09","¿Cuál es el plural de 'el estudiante'?","los estudiantes","Grammar Rules"],
  ["g4sp_gr10","In Spanish, the subject pronoun is often ___ because the verb ending shows who is speaking.","dropped","Grammar Rules"],
  ["g4sp_gr11","'Los libros son interesantes.' The adjective 'interesantes' is ___ to match the noun.","plural","Grammar Rules"],
  ["g4sp_gr12","¿Cuál es el artículo correcto para 'mesa'? ___ mesa","La","Grammar Rules"],
  // Spanish Conversation (12 items)
  ["g4sp_sc01","¿Cómo se dice 'What time is it?' en español?","¿Qué hora es?","Spanish Conversation"],
  ["g4sp_sc02","¿Cómo respondes si alguien dice '¿Cómo estás?'","Estoy bien, gracias.","Spanish Conversation"],
  ["g4sp_sc03","¿Cómo se dice 'I don't understand' en español?","No entiendo.","Spanish Conversation"],
  ["g4sp_sc04","¿Qué significa 'Me gustaría un vaso de agua, por favor'?","I would like a glass of water, please.","Spanish Conversation"],
  ["g4sp_sc05","¿Cómo se dice 'Can you repeat that?' en español?","¿Puede repetir?","Spanish Conversation"],
  ["g4sp_sc06","'¿Cuántos años tienes?' means ___.","How old are you?","Spanish Conversation"],
  ["g4sp_sc07","To say you are 10 years old: 'Tengo ___ años.'","diez","Spanish Conversation"],
  ["g4sp_sc08","'¿Dónde vives?' means ___.","Where do you live?","Spanish Conversation"],
  ["g4sp_sc09","To say 'I live in Florida': 'Vivo en ___.'","Florida","Spanish Conversation"],
  ["g4sp_sc10","'¿Qué te gusta hacer?' means ___.","What do you like to do?","Spanish Conversation"],
  ["g4sp_sc11","To say 'I like to read': 'Me gusta ___.'","leer","Spanish Conversation"],
  ["g4sp_sc12","'¿De dónde eres?' means ___.","Where are you from?","Spanish Conversation"],
]);

/* ---- 4th Grade Art ----------------------------------------- */
const GRADE4_ART = _u([
  // Art Techniques (12 items)
  ["g4a_at01","Perspective creates the illusion of ___.","depth","Art Techniques"],
  ["g4a_at02","One-point perspective uses a single ___.","vanishing point","Art Techniques"],
  ["g4a_at03","Blending colors smoothly is called ___.","gradation","Art Techniques"],
  ["g4a_at04","Cross-hatching uses ___ lines to create value.","crossed","Art Techniques"],
  ["g4a_at05","Foreshortening makes objects look ___.","closer","Art Techniques"],
  ["g4a_at06","Contour lines show the ___ of an object.","edges","Art Techniques"],
  ["g4a_at07","Stippling creates value using ___.","dots","Art Techniques"],
  ["g4a_at08","Collage combines ___ materials.","different","Art Techniques"],
  ["g4a_at09","Watercolor is a ___ medium.","transparent","Art Techniques"],
  ["g4a_at10","Oil paint dries ___.","slowly","Art Techniques"],
  ["g4a_at11","A sketch is a ___ drawing.","quick","Art Techniques"],
  ["g4a_at12","A mural is painted on a ___.","wall","Art Techniques"],
  // Famous Artworks (12 items)
  ["g4a_fa01","The Eiffel Tower was designed by ___.","Gustave Eiffel","Famous Artworks"],
  ["g4a_fa02","'The Persistence of Memory' shows melting ___.","clocks","Famous Artworks"],
  ["g4a_fa03","The Pietà is a marble sculpture by ___.","Michelangelo","Famous Artworks"],
  ["g4a_fa04","'American Gothic' shows a farmer and ___.","woman","Famous Artworks"],
  ["g4a_fa05","The Taj Mahal in India is famous for its ___ architecture.","Mughal","Famous Artworks"],
  ["g4a_fa06","'Girl with a Pearl Earring' was painted by ___.","Vermeer","Famous Artworks"],
  ["g4a_fa07","The Venus de Milo is an ancient Greek ___.","sculpture","Famous Artworks"],
  ["g4a_fa08","'A Sunday on La Grande Jatte' used small dots of color — this is called ___.","Pointillism","Famous Artworks"],
  ["g4a_fa09","Rodin created the famous sculpture 'The ___'.","Thinker","Famous Artworks"],
  ["g4a_fa10","'The Birth of Venus' was painted by ___.","Botticelli","Famous Artworks"],
  ["g4a_fa11","'Guernica' depicts the horrors of ___.","war","Famous Artworks"],
  ["g4a_fa12","Street art done illegally is often called ___.","graffiti","Famous Artworks"],
  // Art Movements (10 items)
  ["g4a_am01","Impressionism focused on capturing ___ and light.","moments","Art Movements"],
  ["g4a_am02","Cubism shows objects from ___ angles.","multiple","Art Movements"],
  ["g4a_am03","Abstract art does not try to show ___.","realistic images","Art Movements"],
  ["g4a_am04","Surrealism depicts dream-like ___.","scenes","Art Movements"],
  ["g4a_am05","Pop Art used images from ___ culture.","popular","Art Movements"],
  ["g4a_am06","Renaissance art focused on ___ and nature.","humans","Art Movements"],
  ["g4a_am07","Baroque art used dramatic ___ and movement.","light","Art Movements"],
  ["g4a_am08","Minimalism uses ___ elements.","very few","Art Movements"],
  ["g4a_am09","Street art includes murals, stencils, and ___.","graffiti","Art Movements"],
  ["g4a_am10","Photography became recognized as art in the ___ century.","20th","Art Movements"],
]);

/* ---- 5th Grade Financial Literacy -------------------------- */
const GRADE5_FINANCIAL = _u([
  // Personal Finance (12 items)
  ["g5f_pf01","A credit score measures your ___ worthiness.","credit","Personal Finance"],
  ["g5f_pf02","High credit scores get ___ interest rates.","lower","Personal Finance"],
  ["g5f_pf03","Debt is money you ___ to someone.","owe","Personal Finance"],
  ["g5f_pf04","Interest on debt is money you pay to ___.","borrow","Personal Finance"],
  ["g5f_pf05","Inflation means prices ___ over time.","rise","Personal Finance"],
  ["g5f_pf06","A mortgage is a loan for buying a ___.","house","Personal Finance"],
  ["g5f_pf07","Student loans pay for ___.","college","Personal Finance"],
  ["g5f_pf08","Emergency funds cover ___ months of expenses.","3-6","Personal Finance"],
  ["g5f_pf09","A 401k is a retirement ___.","savings account","Personal Finance"],
  ["g5f_pf10","Net worth = assets minus ___.","liabilities","Personal Finance"],
  ["g5f_pf11","A budget with categories is called a ___ budget.","zero-based","Personal Finance"],
  ["g5f_pf12","Roth IRA is a type of ___ account.","retirement","Personal Finance"],
  // Economic Systems (12 items)
  ["g5f_ec01","In a market economy, prices are set by ___ and demand.","supply","Economic Systems"],
  ["g5f_ec02","A command economy is controlled by the ___.","government","Economic Systems"],
  ["g5f_ec03","The US has a ___ economy.","mixed","Economic Systems"],
  ["g5f_ec04","GDP measures a country's total ___ output.","economic","Economic Systems"],
  ["g5f_ec05","Unemployment rate measures people looking for ___.","work","Economic Systems"],
  ["g5f_ec06","A recession is a period of ___ economic activity.","decreased","Economic Systems"],
  ["g5f_ec07","Exports are goods ___ to other countries.","sold","Economic Systems"],
  ["g5f_ec08","Imports are goods ___ from other countries.","bought","Economic Systems"],
  ["g5f_ec09","Tariffs are taxes on ___.","imports","Economic Systems"],
  ["g5f_ec10","The Federal Reserve controls the ___ supply.","money","Economic Systems"],
  ["g5f_ec11","Entrepreneurs take financial ___.","risks","Economic Systems"],
  ["g5f_ec12","Scarcity means resources are ___.","limited","Economic Systems"],
  // Career & Income (12 items)
  ["g5f_ci01","A resume lists your ___ and skills.","experience","Career & Income"],
  ["g5f_ci02","An interview is a meeting to get a ___.","job","Career & Income"],
  ["g5f_ci03","Minimum wage is the lowest ___ wage allowed.","hourly","Career & Income"],
  ["g5f_ci04","STEM careers involve Science, Technology, Engineering, and ___.","Math","Career & Income"],
  ["g5f_ci05","Trade jobs require ___ education.","vocational","Career & Income"],
  ["g5f_ci06","A salary is annual ___ from a job.","income","Career & Income"],
  ["g5f_ci07","Self-employment means working for ___.","yourself","Career & Income"],
  ["g5f_ci08","Benefits include health insurance and ___.","retirement plans","Career & Income"],
  ["g5f_ci09","Networking means building professional ___.","connections","Career & Income"],
  ["g5f_ci10","A reference is someone who can speak to your ___.","abilities","Career & Income"],
  ["g5f_ci11","Job shadowing means following someone to learn about their ___.","career","Career & Income"],
  ["g5f_ci12","Community college offers ___ programs.","two-year","Career & Income"],
]);

/* ---- 5th Grade Spanish ------------------------------------- */
const GRADE5_SPANISH = _u([
  // Past Tense (Pretérito) (12 items)
  ["g5sp_pt01","Conjugate 'hablar' in pretérito with 'yo': Yo ___ español.","hablé","Past Tense (Pretérito)"],
  ["g5sp_pt02","Conjugate 'hablar' in pretérito with 'ellos': Ellos ___ español.","hablaron","Past Tense (Pretérito)"],
  ["g5sp_pt03","Conjugate 'comer' in pretérito with 'tú': Tú ___ una pizza.","comiste","Past Tense (Pretérito)"],
  ["g5sp_pt04","Conjugate 'vivir' in pretérito with 'nosotros': Nosotros ___ allí.","vivimos","Past Tense (Pretérito)"],
  ["g5sp_pt05","Conjugate 'correr' in pretérito with 'él': Él ___ muy rápido.","corrió","Past Tense (Pretérito)"],
  ["g5sp_pt06","'Fui' is the pretérito form of ___ for 'yo'.","ir (to go)","Past Tense (Pretérito)"],
  ["g5sp_pt07","'Tuviste' is the pretérito form of 'tener' for ___.","tú","Past Tense (Pretérito)"],
  ["g5sp_pt08","Conjugate 'escribir' in pretérito with 'ella': Ella ___ una carta.","escribió","Past Tense (Pretérito)"],
  ["g5sp_pt09","'Ayer comí una manzana.' Translate to English.","Yesterday I ate an apple.","Past Tense (Pretérito)"],
  ["g5sp_pt10","Conjugate 'beber' in pretérito with 'yo': Yo ___ agua.","bebí","Past Tense (Pretérito)"],
  ["g5sp_pt11","Conjugate 'hablar' in pretérito with 'usted': Usted ___ con ella.","habló","Past Tense (Pretérito)"],
  ["g5sp_pt12","'Nosotros corrimos en el parque.' Translate to English.","We ran in the park.","Past Tense (Pretérito)"],
  // Reading Comprehension (12 items)
  ["g5sp_rc01","Lee y contesta: 'María fue al mercado. Compró frutas y verduras. Pagó con efectivo.' ¿Qué compró María?","frutas y verduras","Reading Comprehension"],
  ["g5sp_rc02","Lee y contesta: 'Juan estudió toda la noche. Al día siguiente, sacó una A en el examen.' ¿Por qué sacó una A?","because he studied all night","Reading Comprehension"],
  ["g5sp_rc03","Lee y contesta: 'El cielo se puso gris y empezó a llover. Los niños corrieron a casa.' ¿Por qué corrieron los niños?","because it started to rain","Reading Comprehension"],
  ["g5sp_rc04","Lee y contesta: 'Ana tiene un perro que se llama Max. Max corre muy rápido.' ¿Cómo se llama el perro de Ana?","Max","Reading Comprehension"],
  ["g5sp_rc05","Lee y contesta: 'Pedro comió el desayuno a las siete. Luego fue a la escuela.' ¿Qué hizo Pedro después del desayuno?","fue a la escuela","Reading Comprehension"],
  ["g5sp_rc06","Lee y contesta: 'La familia Ruiz vivió en México por diez años. Después se mudaron a los Estados Unidos.' ¿Cuántos años vivieron en México?","diez años","Reading Comprehension"],
  ["g5sp_rc07","Lee y contesta: 'Sofía leyó tres libros en el verano. Le gustó mucho leer.' ¿Cuántos libros leyó Sofía?","tres","Reading Comprehension"],
  ["g5sp_rc08","Lee y contesta: 'El maestro escribió las instrucciones en la pizarra. Los estudiantes las copiaron.' ¿Qué hicieron los estudiantes?","copiaron las instrucciones","Reading Comprehension"],
  ["g5sp_rc09","Lee y contesta: 'Carlos no durmió bien. Por eso, estaba muy cansado en clase.' ¿Por qué estaba cansado Carlos?","porque no durmió bien","Reading Comprehension"],
  ["g5sp_rc10","Lee y contesta: 'Llovió mucho el sábado. El domingo salió el sol y los niños jugaron afuera.' ¿Cuándo jugaron los niños afuera?","el domingo","Reading Comprehension"],
  ["g5sp_rc11","Lee y contesta: 'La tienda cerró a las nueve. Miguel llegó a las nueve y diez.' ¿Pudo Miguel entrar a la tienda?","no","Reading Comprehension"],
  ["g5sp_rc12","Lee y contesta: 'Elena habla español, inglés y francés.' ¿Cuántos idiomas habla Elena?","tres","Reading Comprehension"],
  // Advanced Grammar (12 items)
  ["g5sp_ag01","'Se me olvidó el libro' — what grammatical construction is 'se me olvidó'?","accidental se","Advanced Grammar"],
  ["g5sp_ag02","In 'Me gusta el libro,' who likes the book?","yo (I)","Advanced Grammar"],
  ["g5sp_ag03","The 'personal a' is used before a ___ direct object.","person","Advanced Grammar"],
  ["g5sp_ag04","'Veo a mi mamá' — why is 'a' used here?","personal a before a person","Advanced Grammar"],
  ["g5sp_ag05","In Spanish, 'ser' vs. 'estar' both mean ___.","to be","Advanced Grammar"],
  ["g5sp_ag06","'Ella es alta' uses 'ser' because height is a ___ characteristic.","permanent","Advanced Grammar"],
  ["g5sp_ag07","'Él está cansado' uses 'estar' because tiredness is ___.","temporary","Advanced Grammar"],
  ["g5sp_ag08","In 'No lo veo,' the word 'lo' is a ___ object pronoun.","direct","Advanced Grammar"],
  ["g5sp_ag09","'¿A qué hora?' means ___.","At what time?","Advanced Grammar"],
  ["g5sp_ag10","Reflexive verbs use pronouns: me, te, se, nos, ___.","os/se","Advanced Grammar"],
  ["g5sp_ag11","'Me lavo las manos' — 'me' shows the action is done to ___.","myself","Advanced Grammar"],
  ["g5sp_ag12","In 'Le di el libro a ella,' 'le' is an ___ object pronoun.","indirect","Advanced Grammar"],
  // Hispanic Culture (12 items)
  ["g5sp_hc01","Gabriel García Márquez was a famous ___ author from Colombia.","magical realism","Hispanic Culture"],
  ["g5sp_hc02","'Día de los Muertos' is celebrated on November ___ and 2.","1","Hispanic Culture"],
  ["g5sp_hc03","Frida Kahlo was a famous Mexican ___.","painter","Hispanic Culture"],
  ["g5sp_hc04","The 'Quinceañera' celebration marks a girl's ___ birthday.","15th","Hispanic Culture"],
  ["g5sp_hc05","Flamenco is a traditional dance and music style from ___.","Spain","Hispanic Culture"],
  ["g5sp_hc06","The Nobel Prize–winning author Pablo Neruda was from ___.","Chile","Hispanic Culture"],
  ["g5sp_hc07","The ancient Mayan civilization developed in present-day ___ and Central America.","Mexico","Hispanic Culture"],
  ["g5sp_hc08","'Cien años de soledad' ('One Hundred Years of Solitude') was written by ___.","Gabriel García Márquez","Hispanic Culture"],
  ["g5sp_hc09","The Inca Empire was centered in present-day ___.","Peru","Hispanic Culture"],
  ["g5sp_hc10","Salsa music has roots in Cuba and ___.","Puerto Rico","Hispanic Culture"],
  ["g5sp_hc11","Spain's most famous novel, 'Don Quixote,' was written by ___.","Cervantes","Hispanic Culture"],
  ["g5sp_hc12","The Spanish language uses inverted ___ and question marks at the start of sentences.","exclamation","Hispanic Culture"],
]);

/* ---- Kindergarten Social Studies ---------------------------- */
const KINDER_SOCIAL = _u([
  // Community Helpers (12 items)
  ["ks_ch01","Who puts out fires and keeps us safe from burning?","firefighter","Community Helpers"],
  ["ks_ch02","Who helps us learn new things at school?","teacher","Community Helpers"],
  ["ks_ch03","Who helps you feel better when you are sick?","doctor","Community Helpers"],
  ["ks_ch04","Who delivers letters and packages to your house?","mail carrier","Community Helpers"],
  ["ks_ch05","Who protects the neighborhood and keeps law and order?","police officer","Community Helpers"],
  ["ks_ch06","Who cleans teeth and teaches us to brush daily?","dentist","Community Helpers"],
  ["ks_ch07","Who drives the bus to get students safely to school?","bus driver","Community Helpers"],
  ["ks_ch08","Who grows food and crops on a farm?","farmer","Community Helpers"],
  ["ks_ch09","Who cooks delicious meals in a restaurant?","chef","Community Helpers"],
  ["ks_ch10","Who builds homes and buildings?","construction worker","Community Helpers"],
  ["ks_ch11","Who takes care of animals when they are sick?","veterinarian","Community Helpers"],
  ["ks_ch12","Who flies airplanes to transport people across the world?","pilot","Community Helpers"],
  // Rules & Responsibility (12 items)
  ["ks_rr01","What should you do when a teacher or friend is speaking?","listen","Rules & Responsibility"],
  ["ks_rr02","What polite words should you say when someone gives you help?","thank you","Rules & Responsibility"],
  ["ks_rr03","If you want a turn with a toy, you should ___.","ask nicely","Rules & Responsibility"],
  ["ks_rr04","Classroom rules help keep everyone ___.","safe","Rules & Responsibility"],
  ["ks_rr05","Cleaning up toys after playing is being ___.","responsible","Rules & Responsibility"],
  ["ks_rr06","Telling the truth is being ___.","honest","Rules & Responsibility"],
  ["ks_rr07","Walking inside the hallway instead of running prevents ___.","accidents","Rules & Responsibility"],
  ["ks_rr08","Sharing toys with friends is a sign of ___.","kindness","Rules & Responsibility"],
  ["ks_rr09","Raising your hand before speaking shows ___.","respect","Rules & Responsibility"],
  ["ks_rr10","Covering your mouth when coughing stops the spread of ___.","germs","Rules & Responsibility"],
  ["ks_rr11","Taking turns when playing a game is being ___.","fair","Rules & Responsibility"],
  ["ks_rr12","If you accidentally hurt someone's feelings, say ___.","sorry","Rules & Responsibility"],
  // US Symbols & Holidays (12 items)
  ["ks_sh01","What national bird represents the United States?","Bald Eagle","US Symbols & Holidays"],
  ["ks_sh02","How many stars are on the American flag?","50","US Symbols & Holidays"],
  ["ks_sh03","What colors are on the US flag?","red, white, blue","US Symbols & Holidays"],
  ["ks_sh04","Which giant statue in New York Harbor holds a torch for freedom?","Statue of Liberty","US Symbols & Holidays"],
  ["ks_sh05","We promise loyalty to our country by reciting the Pledge of ___.","Allegiance","US Symbols & Holidays"],
  ["ks_sh06","America celebrates its birthday on July ___.","4th","US Symbols & Holidays"],
  ["ks_sh07","In November, families gather to give thanks on ___.","Thanksgiving","US Symbols & Holidays"],
  ["ks_sh08","The President of the United States lives in the ___ House.","White","US Symbols & Holidays"],
  ["ks_sh09","Which famous cracked bell in Philadelphia stands for liberty?","Liberty Bell","US Symbols & Holidays"],
  ["ks_sh10","In February, we honor past US presidents on Presidents' ___.","Day","US Symbols & Holidays"],
  ["ks_sh11","The red and white pattern on the American flag consists of ___.","stripes","US Symbols & Holidays"],
  ["ks_sh12","Martin Luther King Jr. Day honors a leader who fought for equal ___.","rights","US Symbols & Holidays"],
]);

/* ---- 1st Grade Social Studies ------------------------------- */
const GRADE1_SOCIAL = _u([
  // Family & Neighborhoods (12 items)
  ["g1s_fn01","A community with tall buildings, subway trains, and busy streets is ___.","urban","Family & Neighborhoods"],
  ["g1s_fn02","A community near a city with houses, backyards, and parks is ___.","suburban","Family & Neighborhoods"],
  ["g1s_fn03","A community with open fields, farms, and fewer people is ___.","rural","Family & Neighborhoods"],
  ["g1s_fn04","People who live near your home are your ___.","neighbors","Family & Neighborhoods"],
  ["g1s_fn05","A picture that shows streets, parks, and places in a neighborhood is a ___.","map","Family & Neighborhoods"],
  ["g1s_fn06","Every community has places to live, work, and ___.","play","Family & Neighborhoods"],
  ["g1s_fn07","Grandparents, aunts, uncles, and cousins are part of your ___.","family","Family & Neighborhoods"],
  ["g1s_fn08","A place where people check out books to read is a ___.","library","Family & Neighborhoods"],
  ["g1s_fn09","A place where kids go to learn every day is a ___.","school","Family & Neighborhoods"],
  ["g1s_fn10","An outdoor area in a neighborhood with swings and slides is a ___.","park","Family & Neighborhoods"],
  ["g1s_fn11","Different families have special ways of celebrating called ___.","traditions","Family & Neighborhoods"],
  ["g1s_fn12","Living together peacefully requires being a good ___.","neighbor","Family & Neighborhoods"],
  // American Symbols (12 items)
  ["g1s_as01","What bird represents freedom in the United States?","Bald Eagle","American Symbols"],
  ["g1s_as02","The Statue of Liberty was a gift to the US from ___.","France","American Symbols"],
  ["g1s_as03","The US flag has 13 stripes representing the original 13 ___.","colonies","American Symbols"],
  ["g1s_as04","The national anthem of the United States is 'The Star-Spangled ___'.","Banner","American Symbols"],
  ["g1s_as05","The capital city of the United States is ___.","Washington, D.C.","American Symbols"],
  ["g1s_as06","The Liberty Bell has a famous ___ in its side.","crack","American Symbols"],
  ["g1s_as07","Which president is featured on the penny and $5 bill?","Abraham Lincoln","American Symbols"],
  ["g1s_as08","Which first US president is featured on the quarter and $1 bill?","George Washington","American Symbols"],
  ["g1s_as09","The Washington Monument is a tall stone tower shaped like an ___.","obelisk","American Symbols"],
  ["g1s_as10","Uncle Sam is a patriotic symbol representing the US ___.","government","American Symbols"],
  ["g1s_as11","What pledge do students say to promise loyalty to the US?","Pledge of Allegiance","American Symbols"],
  ["g1s_as12","The 50 stars on the US flag stand for the 50 ___.","states","American Symbols"],
  // Basic Economics (12 items)
  ["g1s_be01","Things you MUST have to survive, like food and water, are ___.","needs","Basic Economics"],
  ["g1s_be02","Things you WOULD LIKE to have, like video games, are ___.","wants","Basic Economics"],
  ["g1s_be03","Items you can touch and buy, like toys or apples, are ___.","goods","Basic Economics"],
  ["g1s_be04","Work done by someone for others, like a haircut or checkup, is a ___.","service","Basic Economics"],
  ["g1s_be05","Money earned from doing a job is called ___.","income","Basic Economics"],
  ["g1s_be06","Setting aside money to use later is called ___.","saving","Basic Economics"],
  ["g1s_be07","Using money to buy goods or services is called ___.","spending","Basic Economics"],
  ["g1s_be08","Trading goods directly without using money is called ___.","barter","Basic Economics"],
  ["g1s_be09","Coins and paper bills used to buy things are called ___.","money","Basic Economics"],
  ["g1s_be10","A safe place to keep saved money is a ___.","bank","Basic Economics"],
  ["g1s_be11","Someone who buys and uses goods or services is a ___.","consumer","Basic Economics"],
  ["g1s_be12","Someone who makes or grows goods to sell is a ___.","producer","Basic Economics"],
]);

/* ---- 2nd Grade Social Studies ------------------------------- */
const GRADE2_SOCIAL = _u([
  // Historical Heroes (12 items)
  ["g2s_hh01","Who was the 1st President of the United States?","George Washington","Historical Heroes"],
  ["g2s_hh02","Who led the nation during the Civil War and ended slavery?","Abraham Lincoln","Historical Heroes"],
  ["g2s_hh03","Who refused to give up her bus seat and sparked the Montgomery Bus Boycott?","Rosa Parks","Historical Heroes"],
  ["g2s_hh04","Who gave the famous 'I Have a Dream' speech for civil rights?","Martin Luther King Jr.","Historical Heroes"],
  ["g2s_hh05","Who escaped slavery and led hundreds to freedom on the Underground Railroad?","Harriet Tubman","Historical Heroes"],
  ["g2s_hh06","Who invented the lightbulb, phonograph, and motion picture camera?","Thomas Edison","Historical Heroes"],
  ["g2s_hh07","Who flew the first successful powered airplane at Kitty Hawk?","Wright Brothers","Historical Heroes"],
  ["g2s_hh08","Who proved lightning was electricity using a kite and key?","Benjamin Franklin","Historical Heroes"],
  ["g2s_hh09","Who helped guide Lewis and Clark on their expedition out west?","Sacagawea","Historical Heroes"],
  ["g2s_hh10","Who made a famous midnight ride to warn that 'the British are coming'?","Paul Revere","Historical Heroes"],
  ["g2s_hh11","Who was a famous female aviator who attempted to fly around the world?","Amelia Earhart","Historical Heroes"],
  ["g2s_hh12","Who was the first African American player in modern Major League Baseball?","Jackie Robinson","Historical Heroes"],
  // Civics & Government (12 items)
  ["g2s_cg01","The leader of a city or town government is the ___.","mayor","Civics & Government"],
  ["g2s_cg02","The leader of a US state government is the ___.","governor","Civics & Government"],
  ["g2s_cg03","The leader of the United States national government is the ___.","president","Civics & Government"],
  ["g2s_cg04","Rules created by governments that everyone must follow are ___.","laws","Civics & Government"],
  ["g2s_cg05","Choosing leaders by casting a vote is called ___.","voting","Civics & Government"],
  ["g2s_cg06","A country where citizens elect leaders to represent them is a ___.","republic","Civics & Government"],
  ["g2s_cg07","Taxes pay for community services like roads, schools, and ___.","fire departments","Civics & Government"],
  ["g2s_cg08","The building where the US Congress meets to make laws is the Capitol in ___.","Washington, D.C.","Civics & Government"],
  ["g2s_cg09","A member of a country with rights and duties is a ___.","citizen","Civics & Government"],
  ["g2s_cg10","Treating others fairly and following rules is being a good ___.","citizen","Civics & Government"],
  ["g2s_cg11","Freedoms guaranteed to all people by law are called ___.","rights","Civics & Government"],
  ["g2s_cg12","Duties that citizens are expected to do, like paying taxes, are ___.","responsibilities","Civics & Government"],
  // Maps & Earth (12 items)
  ["g2s_me01","How many continents are on Earth?","7","Maps & Earth"],
  ["g2s_me02","How many major oceans are on Earth?","5","Maps & Earth"],
  ["g2s_me03","The imaginary line that divides Earth into Northern and Southern Hemispheres is the ___.","equator","Maps & Earth"],
  ["g2s_me04","The continent where the United States, Canada, and Mexico are located is ___.","North America","Maps & Earth"],
  ["g2s_me05","The largest continent on Earth is ___.","Asia","Maps & Earth"],
  ["g2s_me06","The coldest continent surrounding the South Pole is ___.","Antarctica","Maps & Earth"],
  ["g2s_me07","The ocean touching the West Coast of the US is the ___ Ocean.","Pacific","Maps & Earth"],
  ["g2s_me08","The ocean touching the East Coast of the US is the ___ Ocean.","Atlantic","Maps & Earth"],
  ["g2s_me09","A sphere-shaped 3D model of the Earth is a ___.","globe","Maps & Earth"],
  ["g2s_me10","North, South, East, and West are called ___ directions.","cardinal","Maps & Earth"],
  ["g2s_me11","Half of the Earth divided by the equator is called a ___.","hemisphere","Maps & Earth"],
  ["g2s_me12","A drawing that shows where places, land, and water are located is a ___.","map","Maps & Earth"],
]);

/* ---- 3rd Grade Social Studies ------------------------------- */
const GRADE3_SOCIAL = _u([
  // Native American Cultures (12 items)
  ["g3s_na01","The Iroquois lived in large wooden homes called ___.","longhouses","Native American Cultures"],
  ["g3s_na02","Pueblo Native Americans built multistory homes made of clay and sun-dried brick called ___.","adobe","Native American Cultures"],
  ["g3s_na03","Plains tribes built portable cone-shaped tents made of animal hides called ___.","tipis","Native American Cultures"],
  ["g3s_na04","Pacific Northwest tribes carved tall wooden poles showing family emblems called ___ poles.","totem","Native American Cultures"],
  ["g3s_na05","Native Americans of the Plains hunted wild ___ for food, clothing, and shelter.","bison","Native American Cultures"],
  ["g3s_na06","Corn, beans, and squash were called the 'Three ___' by Native farmers.","Sisters","Native American Cultures"],
  ["g3s_na07","Shoes made of soft deer leather worn by Native Americans are called ___.","moccasins","Native American Cultures"],
  ["g3s_na08","Native American culture groups adapted to their surrounding natural ___.","environment","Native American Cultures"],
  ["g3s_na09","The Powhatan tribe lived along the Atlantic coastal plain in present-day ___.","Virginia","Native American Cultures"],
  ["g3s_na10","Wampum belts made of polished shells were used by northeastern tribes for ___.","storytelling and trading","Native American Cultures"],
  ["g3s_na11","In Plains tribes, community decisions were guided by respected tribal ___.","elders","Native American Cultures"],
  ["g3s_na12","A gathering of Native Americans celebrating song, dance, and culture is a ___.","powwow","Native American Cultures"],
  // Early Explorers (12 items)
  ["g3s_ee01","Who sailed across the Atlantic Ocean in 1492 under the Spanish flag?","Christopher Columbus","Early Explorers"],
  ["g3s_ee02","Which Spanish explorer landed in Florida in 1513 searching for the Fountain of Youth?","Ponce de León","Early Explorers"],
  ["g3s_ee03","Which English colony was founded in Virginia in 1607?","Jamestown","Early Explorers"],
  ["g3s_ee04","The Pilgrims arrived at Plymouth, Massachusetts on a ship named the ___.","Mayflower","Early Explorers"],
  ["g3s_ee05","Before landing, Pilgrims signed the Mayflower ___ to establish self-government.","Compact","Early Explorers"],
  ["g3s_ee06","Squanto was a Wampanoag man who helped the Pilgrims learn to grow ___.","corn","Early Explorers"],
  ["g3s_ee07","Henry Hudson explored the waterways of present-day New York for the ___.","Dutch","Early Explorers"],
  ["g3s_ee08","The route European explorers sought to reach Asia by sailing west was the ___ Passage.","Northwest","Early Explorers"],
  ["g3s_ee09","The exchange of plants, animals, and diseases between Old & New Worlds is the ___ Exchange.","Columbian","Early Explorers"],
  ["g3s_ee10","St. Augustine in Florida is the oldest continuously inhabited European settlement in the ___.","United States","Early Explorers"],
  ["g3s_ee11","French traders in Canada built an economic network trading in animal ___.","furs","Early Explorers"],
  ["g3s_ee12","John Smith helped save Jamestown by enforcing the rule: 'He who does not work shall not ___.'","eat","Early Explorers"],
  // Citizenship & Community (12 items)
  ["g3s_cc01","The right of citizens to choose leaders by casting ballots is ___.","voting","Citizenship & Community"],
  ["g3s_cc02","Good citizens obey local, state, and federal ___.","laws","Citizenship & Community"],
  ["g3s_cc03","Serving on a jury when called is a civic ___ of a citizen.","duty","Citizenship & Community"],
  ["g3s_cc04","Volunteering to help clean up a park is an example of civic ___.","action","Citizenship & Community"],
  ["g3s_cc05","The rule of law means that laws apply equally to ___.","everyone","Citizenship & Community"],
  ["g3s_cc06","Local government services like trash collection are funded by ___.","taxes","Citizenship & Community"],
  ["g3s_cc07","The United States Constitution is the supreme ___ of the land.","law","Citizenship & Community"],
  ["g3s_cc08","Respecting different opinions and backgrounds promotes community ___.","unity","Citizenship & Community"],
  ["g3s_cc09","A person born in another country can become a US citizen through ___.","naturalization","Citizenship & Community"],
  ["g3s_cc10","Freedom of speech allows citizens to express their ideas without fear of ___.","punishment","Citizenship & Community"],
  ["g3s_cc11","The motto 'E Pluribus Unum' means 'Out of many, ___'.","one","Citizenship & Community"],
  ["g3s_cc12","Working together to solve community problems is called ___ action.","civic","Citizenship & Community"],
]);

/* ---- 4th Grade Social Studies ------------------------------- */
const GRADE4_SOCIAL = _u([
  // 13 Colonies & Revolution (12 items)
  ["g4s_cr01","The 13 American colonies were ruled by Great ___.","Britain","13 Colonies & Revolution"],
  ["g4s_cr02","Protesting colonists threw British tea into Boston Harbor in 1773 during the Boston ___ Party.","Tea","13 Colonies & Revolution"],
  ["g4s_cr03","The Revolutionary War began with 'the shot heard 'round the world' at Lexington and ___.","Concord","13 Colonies & Revolution"],
  ["g4s_cr04","Who wrote the primary draft of the Declaration of Independence in 1776?","Thomas Jefferson","13 Colonies & Revolution"],
  ["g4s_cr05","The Declaration of Independence was adopted on July 4, ___.","1776","13 Colonies & Revolution"],
  ["g4s_cr06","Who commanded the Continental Army during the American Revolution?","George Washington","13 Colonies & Revolution"],
  ["g4s_cr07","Colonists who supported independence from Britain were called ___.","Patriots","13 Colonies & Revolution"],
  ["g4s_cr08","Colonists who remained loyal to the British King were called ___.","Loyalists","13 Colonies & Revolution"],
  ["g4s_cr09","The turning point battle of the Revolution in 1777 was the Battle of ___.","Saratoga","13 Colonies & Revolution"],
  ["g4s_cr10","British General Cornwallis surrendered to Washington at the Battle of ___.","Yorktown","13 Colonies & Revolution"],
  ["g4s_cr11","The slogan 'No taxation without ___' expressed colonial anger at British taxes.","representation","13 Colonies & Revolution"],
  ["g4s_cr12","The Treaty of Paris in 1783 officially recognized the United States as an ___ nation.","independent","13 Colonies & Revolution"],
  // Westward Expansion (12 items)
  ["g4s_we01","In 1803, President Jefferson bought the Louisiana Territory from ___.","France","Westward Expansion"],
  ["g4s_we02","Who led the expedition to explore the newly acquired Louisiana Purchase?","Lewis and Clark","Westward Expansion"],
  ["g4s_we03","The 2,000-mile trail pioneers traveled west to fertile farmland was the ___ Trail.","Oregon","Westward Expansion"],
  ["g4s_we04","Gold discovered at Sutter's Mill in 1848 sparked the California Gold ___.","Rush","Westward Expansion"],
  ["g4s_we05","The forced relocation of Cherokee people to Oklahoma in 1838 is called the Trail of ___.","Tears","Westward Expansion"],
  ["g4s_we06","The belief that the US was destined to expand across the continent was ___ Destiny.","Manifest","Westward Expansion"],
  ["g4s_we07","The Texas fortress where defenders fought against the Mexican Army in 1836 was the ___.","Alamo","Westward Expansion"],
  ["g4s_we08","The completion of the Transcontinental Railroad in 1869 joined East and West at Promontory, ___.","Utah","Westward Expansion"],
  ["g4s_we09","Covered wagons used by westward pioneers were nicknamed prairie ___.","schooners","Westward Expansion"],
  ["g4s_we10","Eli Whitney's cotton gin in 1793 dramatically increased cotton production in the ___.","South","Westward Expansion"],
  ["g4s_we11","The Erie Canal connected the Hudson River with Lake ___ in 1825.","Erie","Westward Expansion"],
  ["g4s_we12","Robert Fulton's steamboat revolutionized transportation on American ___.","rivers","Westward Expansion"],
  // US Government & Constitution (12 items)
  ["g4s_gv01","How many branches of government are created by the US Constitution?","3","US Government & Constitution"],
  ["g4s_gv02","Which branch of government makes laws? (Congress)","Legislative","US Government & Constitution"],
  ["g4s_gv03","Which branch of government enforces laws? (President)","Executive","US Government & Constitution"],
  ["g4s_gv04","Which branch of government interprets laws? (Supreme Court)","Judicial","US Government & Constitution"],
  ["g4s_gv05","The US Congress is divided into the Senate and the House of ___.","Representatives","US Government & Constitution"],
  ["g4s_gv06","How many senators does each state send to the US Senate?","2","US Government & Constitution"],
  ["g4s_gv07","The Supreme Court consists of how many Justices?","9","US Government & Constitution"],
  ["g4s_gv08","The President can reject a bill passed by Congress using a ___.","veto","US Government & Constitution"],
  ["g4s_gv09","The first 10 amendments to the US Constitution are called the Bill of ___.","Rights","US Government & Constitution"],
  ["g4s_gv10","The system that prevents any single branch of government from becoming too powerful is ___ & balances.","checks","US Government & Constitution"],
  ["g4s_gv11","The preamble to the US Constitution begins with the phrase 'We the ___'.","People","US Government & Constitution"],
  ["g4s_gv12","Who is known as the 'Father of the Constitution'?","James Madison","US Government & Constitution"],
]);

/* ---- 5th Grade Social Studies ------------------------------- */
const GRADE5_SOCIAL = _u([
  // US Constitution & Rights (12 items)
  ["g5s_cr01","The Constitutional Convention met in 1787 in the city of ___.","Philadelphia","US Constitution & Rights"],
  ["g5s_cr02","The First Amendment guarantees freedom of speech, religion, press, assembly, and ___.","petition","US Constitution & Rights"],
  ["g5s_cr03","An official change or addition to the US Constitution is an ___.","amendment","US Constitution & Rights"],
  ["g5s_cr04","How many amendments currently make up the US Constitution?","27","US Constitution & Rights"],
  ["g5s_cr05","The 19th Amendment granted women the right to ___ in 1920.","vote","US Constitution & Rights"],
  ["g5s_cr06","The Great Compromise created a bicameral legislature balancing state population and ___ representation.","equal","US Constitution & Rights"],
  ["g5s_cr07","Federalism divides power between the national government and ___ governments.","state","US Constitution & Rights"],
  ["g5s_cr08","The 13th Amendment to the Constitution officially abolished ___ in 1865.","slavery","US Constitution & Rights"],
  ["g5s_cr09","Due process of law means the government must respect all legal ___ owed to a person.","rights","US Constitution & Rights"],
  ["g5s_cr10","The Electoral College is the process used in the US to elect the ___.","President","US Constitution & Rights"],
  ["g5s_cr11","The Supreme Court case Marbury v. Madison established the power of judicial ___.","review","US Constitution & Rights"],
  ["g5s_cr12","The highest legal authority in the United States is the US ___.","Constitution","US Constitution & Rights"],
  // Civil War & Nation Building (12 items)
  ["g5s_cw01","The American Civil War lasted from 1861 to ___.","1865","Civil War & Nation Building"],
  ["g5s_cw02","Northern states fighting to preserve the United States were called the ___.","Union","Civil War & Nation Building"],
  ["g5s_cw03","Southern states that seceded from the US formed the ___ States of America.","Confederate","Civil War & Nation Building"],
  ["g5s_cw04","Who was President of the Confederate States during the Civil War?","Jefferson Davis","Civil War & Nation Building"],
  ["g5s_cw05","The opening shots of the Civil War were fired at Fort ___ in South Carolina.","Sumter","Civil War & Nation Building"],
  ["g5s_cw06","The bloodiest single-day battle of the Civil War occurred at ___ in Maryland.","Antietam","Civil War & Nation Building"],
  ["g5s_cw07","President Lincoln issued the Emancipation ___ declaring slaves in rebel states free.","Proclamation","Civil War & Nation Building"],
  ["g5s_cw08","The turning point battle of the Civil War fought in July 1863 was ___.","Gettysburg","Civil War & Nation Building"],
  ["g5s_cw09","Confederate General Robert E. Lee surrendered to Union General Ulysses S. Grant at ___ Court House.","Appomattox","Civil War & Nation Building"],
  ["g5s_cw10","The era of rebuilding the South following the Civil War was called ___.","Reconstruction","Civil War & Nation Building"],
  ["g5s_cw11","Clara Barton cared for wounded soldiers in the Civil War and later founded the American Red ___.","Cross","Civil War & Nation Building"],
  ["g5s_cw12","Lincoln delivered the Gettysburg Address dedicating a national ___.","cemetery","Civil War & Nation Building"],
  // World Cultures & History (12 items)
  ["g5s_wc01","Ancient Egypt developed along the banks of the ___ River.","Nile","World Cultures & History"],
  ["g5s_wc02","Ancient Mesopotamia is known as the 'Cradle of ___'.","Civilization","World Cultures & History"],
  ["g5s_wc03","Democracy originated in the ancient city-state of Athens in ___.","Greece","World Cultures & History"],
  ["g5s_wc04","The Silk Road was an ancient trade route connecting Europe with ___.","China","World Cultures & History"],
  ["g5s_wc05","Which ancient civilization built the Colosseum and an extensive road network?","Roman Empire","World Cultures & History"],
  ["g5s_wc06","The Industrial Revolution marked a shift from handmade goods to factory ___.","machines","World Cultures & History"],
  ["g5s_wc07","Immigrants arriving in New York in the late 1800s were processed at Ellis ___.","Island","World Cultures & History"],
  ["g5s_wc08","The Great Wall was built to protect ancient ___ from northern invaders.","China","World Cultures & History"],
  ["g5s_wc09","Hieroglyphics were the ancient picture-based writing system of ___.","Egypt","World Cultures & History"],
  ["g5s_wc10","The Renaissance was a period of revived art, learning, and science in ___.","Europe","World Cultures & History"],
  ["g5s_wc11","The United Nations was established in 1945 to promote international ___ and peace.","cooperation","World Cultures & History"],
  ["g5s_wc12","Ancient Mayan, Aztec, and Inca civilizations developed in the ___.","Americas","World Cultures & History"],
]);

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
  return _u(_getRawSubjectItems(subjectId));
}
function _getRawSubjectItems(subjectId) {
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

