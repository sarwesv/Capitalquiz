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

// ---- When each place joined the US, and where it is ----------
// States: `order` is the number in which it became a state (1 = Delaware,
// 50 = Hawaii) and `date` the day it joined. Territories never became states,
// so they have `year` (when the US got them) and a `note` instead.
// `where` is a short, kid-friendly description of the location.
const STATE_FACTS = {
  DE: { order: 1,  date: "1787-12-07", where: "On the Mid-Atlantic coast, by Delaware Bay. Borders Maryland, Pennsylvania and New Jersey." },
  PA: { order: 2,  date: "1787-12-12", where: "In the Northeast, with a short shore on Lake Erie. Borders New York, New Jersey, Delaware, Maryland, West Virginia and Ohio." },
  NJ: { order: 3,  date: "1787-12-18", where: "On the Mid-Atlantic coast between New York City and Philadelphia. Borders New York, Pennsylvania and Delaware." },
  GA: { order: 4,  date: "1788-01-02", where: "In the Southeast, with an Atlantic coast. Borders Florida, Alabama, Tennessee, North Carolina and South Carolina." },
  CT: { order: 5,  date: "1788-01-09", where: "In New England, on Long Island Sound. Borders New York, Massachusetts and Rhode Island." },
  MA: { order: 6,  date: "1788-02-06", where: "In New England, on the Atlantic coast. Borders New Hampshire, Vermont, New York, Connecticut and Rhode Island." },
  MD: { order: 7,  date: "1788-04-28", where: "On the Mid-Atlantic coast, around Chesapeake Bay. Borders Pennsylvania, Delaware, West Virginia and Virginia." },
  SC: { order: 8,  date: "1788-05-23", where: "In the Southeast, on the Atlantic coast. Borders North Carolina and Georgia." },
  NH: { order: 9,  date: "1788-06-21", where: "In northern New England, with a very short Atlantic coast. Borders Maine, Vermont, Massachusetts and Canada." },
  VA: { order: 10, date: "1788-06-25", where: "On the Mid-Atlantic coast. Borders Maryland, West Virginia, Kentucky, Tennessee and North Carolina." },
  NY: { order: 11, date: "1788-07-26", where: "In the Northeast, by the Atlantic Ocean and the Great Lakes. Borders Vermont, Massachusetts, Connecticut, New Jersey, Pennsylvania and Canada." },
  NC: { order: 12, date: "1789-11-21", where: "In the Southeast, on the Atlantic coast. Borders Virginia, Tennessee, Georgia and South Carolina." },
  RI: { order: 13, date: "1790-05-29", where: "The smallest state, in New England on the Atlantic coast. Borders Connecticut and Massachusetts." },
  VT: { order: 14, date: "1791-03-04", where: "In northern New England, with no coast. Borders New Hampshire, Massachusetts, New York and Canada." },
  KY: { order: 15, date: "1792-06-01", where: "In the Upper South, along the Ohio River. Borders Illinois, Indiana, Ohio, West Virginia, Virginia, Tennessee and Missouri." },
  TN: { order: 16, date: "1796-06-01", where: "In the Upper South. It touches eight states: Kentucky, Virginia, North Carolina, Georgia, Alabama, Mississippi, Arkansas and Missouri." },
  OH: { order: 17, date: "1803-03-01", where: "In the Midwest, on Lake Erie. Borders Michigan, Indiana, Kentucky, West Virginia and Pennsylvania." },
  LA: { order: 18, date: "1812-04-30", where: "On the Gulf of Mexico coast, where the Mississippi River ends. Borders Texas, Arkansas and Mississippi." },
  IN: { order: 19, date: "1816-12-11", where: "In the Midwest, touching Lake Michigan. Borders Michigan, Ohio, Kentucky and Illinois." },
  MS: { order: 20, date: "1817-12-10", where: "In the Deep South, along the Mississippi River. Borders Tennessee, Alabama, Louisiana and Arkansas." },
  IL: { order: 21, date: "1818-12-03", where: "In the Midwest, on Lake Michigan and the Mississippi River. Borders Wisconsin, Iowa, Missouri, Kentucky and Indiana." },
  AL: { order: 22, date: "1819-12-14", where: "In the Southeast, with a short coast on the Gulf of Mexico. Borders Mississippi, Tennessee, Georgia and Florida." },
  ME: { order: 23, date: "1820-03-15", where: "The northeastern tip of the US, on the Atlantic coast. Borders New Hampshire and Canada." },
  MO: { order: 24, date: "1821-08-10", where: "In the Midwest, where the Missouri and Mississippi Rivers meet. Borders eight states: Iowa, Illinois, Kentucky, Tennessee, Arkansas, Oklahoma, Kansas and Nebraska." },
  AR: { order: 25, date: "1836-06-15", where: "In the South-central US. Borders Missouri, Tennessee, Mississippi, Louisiana, Texas and Oklahoma." },
  MI: { order: 26, date: "1837-01-26", where: "In the Great Lakes region, made of two peninsulas. Borders Ohio, Indiana and Wisconsin, and Canada across the water." },
  FL: { order: 27, date: "1845-03-03", where: "A peninsula in the Southeast between the Atlantic Ocean and the Gulf of Mexico. Borders Georgia and Alabama." },
  TX: { order: 28, date: "1845-12-29", where: "In the South-central US, on the Gulf of Mexico. Borders Mexico, New Mexico, Oklahoma, Arkansas and Louisiana." },
  IA: { order: 29, date: "1846-12-28", where: "In the Midwest, between the Mississippi and Missouri Rivers. Borders Minnesota, Wisconsin, Illinois, Missouri, Nebraska and South Dakota." },
  WI: { order: 30, date: "1848-05-29", where: "In the Upper Midwest, between Lake Michigan and Lake Superior. Borders Minnesota, Iowa, Illinois and Michigan." },
  CA: { order: 31, date: "1850-09-09", where: "On the West Coast, along the Pacific Ocean. Borders Oregon, Nevada, Arizona and Mexico." },
  MN: { order: 32, date: "1858-05-11", where: "In the Upper Midwest, on Lake Superior. Borders Canada, North Dakota, South Dakota, Iowa and Wisconsin." },
  OR: { order: 33, date: "1859-02-14", where: "In the Pacific Northwest, on the Pacific coast. Borders Washington, Idaho, Nevada and California." },
  KS: { order: 34, date: "1861-01-29", where: "In the middle of the lower 48 states. Borders Nebraska, Missouri, Oklahoma and Colorado." },
  WV: { order: 35, date: "1863-06-20", where: "In the Appalachian Mountains. Borders Ohio, Pennsylvania, Maryland, Virginia and Kentucky." },
  NV: { order: 36, date: "1864-10-31", where: "In the West, mostly desert. Borders Oregon, Idaho, Utah, Arizona and California." },
  NE: { order: 37, date: "1867-03-01", where: "On the Great Plains. Borders South Dakota, Iowa, Missouri, Kansas, Colorado and Wyoming." },
  CO: { order: 38, date: "1876-08-01", where: "In the Rocky Mountains, in the western middle of the US. Borders Wyoming, Nebraska, Kansas, Oklahoma, New Mexico and Utah." },
  ND: { order: 39, date: "1889-11-02", where: "On the northern Great Plains. Borders Canada, Minnesota, South Dakota and Montana." },
  SD: { order: 40, date: "1889-11-02", where: "On the northern Great Plains. Borders North Dakota, Minnesota, Iowa, Nebraska, Wyoming and Montana." },
  MT: { order: 41, date: "1889-11-08", where: "In the northern Rocky Mountains. Borders Canada, Idaho, Wyoming, South Dakota and North Dakota." },
  WA: { order: 42, date: "1889-11-11", where: "In the northwest corner of the lower 48, on the Pacific coast. Borders Oregon, Idaho and Canada." },
  ID: { order: 43, date: "1890-07-03", where: "In the Northwest, in the Rocky Mountains. Borders Canada, Washington, Oregon, Nevada, Utah, Wyoming and Montana." },
  WY: { order: 44, date: "1890-07-10", where: "In the Rocky Mountain West. Borders Montana, South Dakota, Nebraska, Colorado, Utah and Idaho." },
  UT: { order: 45, date: "1896-01-04", where: "In the Mountain West, next to the Great Salt Lake. Borders Idaho, Wyoming, Colorado, Arizona and Nevada." },
  OK: { order: 46, date: "1907-11-16", where: "In the South-central US. Borders Kansas, Missouri, Arkansas, Texas, New Mexico and Colorado." },
  NM: { order: 47, date: "1912-01-06", where: "In the Southwest. Borders Arizona, Colorado, Oklahoma, Texas and Mexico." },
  AZ: { order: 48, date: "1912-02-14", where: "In the Southwest. Borders Mexico, California, Nevada, Utah and New Mexico." },
  AK: { order: 49, date: "1959-01-03", where: "In the far northwest of North America, separated from the lower 48 by Canada." },
  HI: { order: 50, date: "1959-08-21", where: "A chain of islands in the middle of the Pacific Ocean, about 2,400 miles from California." },
  // Territories
  PR: { year: 1898, note: "taken from Spain after the Spanish-American War", where: "An island in the Caribbean Sea, about 1,000 miles southeast of Florida." },
  GU: { year: 1898, note: "taken from Spain after the Spanish-American War", where: "An island in the western Pacific Ocean, about 3,800 miles west of Hawaii." },
  VI: { year: 1917, note: "bought from Denmark for $25 million", where: "Islands in the Caribbean Sea, just east of Puerto Rico." },
  AS: { year: 1900, note: "its chiefs gave the main island, Tutuila, to the US", where: "Islands in the South Pacific Ocean, about 2,600 miles southwest of Hawaii." },
  MP: { year: 1986, note: "became a US commonwealth; the US had run it since 1947", where: "Islands in the western Pacific Ocean, just north of Guam." },
};

// "1st", "2nd", "3rd", "4th" ... "11th", "12th", "13th", "21st", ...
function ordinal(n) {
  const v = n % 100;
  if (v >= 11 && v <= 13) return n + "th";
  return n + (["th", "st", "nd", "rd"][n % 10] || "th");
}

// "December 7, 1787" from "1787-12-07".
function longDate(iso) {
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const p = iso.split("-");
  return MONTHS[+p[1] - 1] + " " + +p[2] + ", " + p[0];
}

// One line about how/when a place joined the US, for the flash card.
function joinedText(abbr) {
  const f = STATE_FACTS[abbr];
  if (!f) return "";
  if (f.order) return "The " + ordinal(f.order) + " state to join the US, on " + longDate(f.date) + ".";
  return "A US territory since " + f.year + " (" + f.note + ").";
}

// A short description of where a place is.
function whereText(abbr) {
  return STATE_FACTS[abbr] ? STATE_FACTS[abbr].where : "";
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
  window.STATE_FACTS = STATE_FACTS;
  window.joinedText = joinedText;
  window.whereText = whereText;
  window.distractorPool = distractorPool;
  window.COIN_REWARDS = COIN_REWARDS;
  window.checkTypedAnswer = checkTypedAnswer;
  window.gradeFor = gradeFor;
}
