// Developer tool — NOT part of the app (the app never loads this file).
//
// Regenerates js/map-data.js: it turns the us-atlas (US Census) and world-atlas
// (Natural Earth) TopoJSON files into one small JS file of SVG path strings for
// the Map Pointing game.
//
//   mkdir /some/empty/dir && cd /some/empty/dir
//   npm install --ignore-scripts us-atlas@3.0.1 world-atlas@2.0.2
//   node tools/gen-map-data.js /some/empty/dir js/map-data.js /tmp/neighbours.json
//
// The third file lists which states share a border (read off the map); the app
// does not use it, but it is handy to cross-check STATE_FACTS in data.js.
const fs = require('fs');
const dataDir = process.argv[2], outFile = process.argv[3], nbOut = process.argv[4];

// ---------- Census FIPS -> postal abbreviation (50 states + DC)
const FIPS = {
  '01': 'AL', '02': 'AK', '04': 'AZ', '05': 'AR', '06': 'CA', '08': 'CO', '09': 'CT', '10': 'DE', '11': 'DC', '12': 'FL',
  '13': 'GA', '15': 'HI', '16': 'ID', '17': 'IL', '18': 'IN', '19': 'IA', '20': 'KS', '21': 'KY', '22': 'LA', '23': 'ME',
  '24': 'MD', '25': 'MA', '26': 'MI', '27': 'MN', '28': 'MS', '29': 'MO', '30': 'MT', '31': 'NE', '32': 'NV', '33': 'NH',
  '34': 'NJ', '35': 'NM', '36': 'NY', '37': 'NC', '38': 'ND', '39': 'OH', '40': 'OK', '41': 'OR', '42': 'PA', '44': 'RI',
  '45': 'SC', '46': 'SD', '47': 'TN', '48': 'TX', '49': 'UT', '50': 'VT', '51': 'VA', '53': 'WA', '54': 'WV', '55': 'WI', '56': 'WY'
};

// ---------- TopoJSON arcs -> absolute coordinate arrays
function decodeArcs(topo) {
  const t = topo.transform;
  return topo.arcs.map(function (arc) {
    let x = 0, y = 0;
    return arc.map(function (p) {
      x += p[0]; y += p[1];
      return t ? [x * t.scale[0] + t.translate[0], y * t.scale[1] + t.translate[1]] : [x, y];
    });
  });
}

// ---------- Douglas-Peucker (run per ARC so neighbouring states keep identical borders)
function simplify(points, tol) {
  if (points.length < 3) return points;
  const keep = new Uint8Array(points.length);
  keep[0] = keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  const t2 = tol * tol;
  while (stack.length) {
    const [a, b] = stack.pop();
    let max = 0, idx = -1;
    const [x1, y1] = points[a], [x2, y2] = points[b];
    const dx = x2 - x1, dy = y2 - y1, len2 = dx * dx + dy * dy;
    for (let i = a + 1; i < b; i++) {
      const [px, py] = points[i];
      let d2;
      if (len2 === 0) d2 = (px - x1) * (px - x1) + (py - y1) * (py - y1);
      else {
        let u = ((px - x1) * dx + (py - y1) * dy) / len2; u = Math.max(0, Math.min(1, u));
        const qx = x1 + u * dx, qy = y1 + u * dy; d2 = (px - qx) * (px - qx) + (py - qy) * (py - qy);
      }
      if (d2 > max) { max = d2; idx = i; }
    }
    if (max > t2 && idx > -1) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return points.filter((_, i) => keep[i]);
}

const r1 = v => Math.round(v * 10) / 10;
function pathFromRings(rings) {
  // relative commands keep the file small: M x,y then l dx,dy ...
  return rings.map(function (ring) {
    let out = 'M' + r1(ring[0][0]) + ',' + r1(ring[0][1]);
    let px = r1(ring[0][0]), py = r1(ring[0][1]);
    let seg = '';
    for (let i = 1; i < ring.length; i++) {
      const x = r1(ring[i][0]), y = r1(ring[i][1]);
      const dx = r1(x - px), dy = r1(y - py);
      if (dx === 0 && dy === 0) continue;
      seg += (seg ? ' ' : '') + dx + ',' + dy;
      px = x; py = y;
    }
    return out + 'l' + seg + 'z';
  }).join('');
}

// ring of arc indexes -> array of points (using already simplified arcs)
function ringPoints(arcIdx, arcs) {
  const pts = [];
  arcIdx.forEach(function (i) {
    const a = i < 0 ? arcs[~i].slice().reverse() : arcs[i];
    a.forEach(function (p, k) { if (pts.length === 0 || k > 0) pts.push(p); });
  });
  return pts;
}
function geometryRings(geom, arcs) {
  const rings = [];
  if (geom.type === 'Polygon') geom.arcs.forEach(r => rings.push(ringPoints(r, arcs)));
  else if (geom.type === 'MultiPolygon') geom.arcs.forEach(poly => poly.forEach(r => rings.push(ringPoints(r, arcs))));
  return rings;
}

// ================= STATES (+ DC) =================
const us = JSON.parse(fs.readFileSync(dataDir + '/node_modules/us-atlas/states-albers-10m.json', 'utf8'));
const usArcs = decodeArcs(us).map(a => simplify(a, 0.35));
const states = {};
let dc = '';
const arcUsers = {};          // arc -> [abbr,...] for neighbour detection
us.objects.states.geometries.forEach(function (g) {
  const abbr = FIPS[g.id];
  if (!abbr) throw new Error('unknown FIPS ' + g.id);
  const rings = geometryRings(g, usArcs).filter(r => r.length >= 3);
  const d = pathFromRings(rings);
  if (abbr === 'DC') dc = d; else states[abbr] = d;
  const flat = g.type === 'Polygon' ? g.arcs : [].concat(...g.arcs);
  flat.forEach(ring => ring.forEach(i => { const k = i < 0 ? ~i : i; (arcUsers[k] = arcUsers[k] || new Set()).add(abbr); }));
});
const neighbours = {};
Object.values(arcUsers).forEach(function (set) {
  const l = [...set];
  if (l.length === 2) { (neighbours[l[0]] = neighbours[l[0]] || new Set()).add(l[1]); (neighbours[l[1]] = neighbours[l[1]] || new Set()).add(l[0]); }
});
const nbJson = {}; Object.keys(neighbours).sort().forEach(k => nbJson[k] = [...neighbours[k]].sort());
fs.writeFileSync(nbOut, JSON.stringify(nbJson));

// ================= TERRITORIES (from Natural Earth, each fitted into its own box) =================
const world = JSON.parse(fs.readFileSync(dataDir + '/node_modules/world-atlas/countries-10m.json', 'utf8'));
const wArcs = decodeArcs(world);
const TERR = { PR: 'Puerto Rico', GU: 'Guam', AS: 'American Samoa', MP: 'N. Mariana Is.', VI: 'U.S. Virgin Is.' };
const BOX_W = 150, BOX_H = 96, PAD = 8;
const CLUSTER_KM = { PR: 120, GU: 80, VI: 100, AS: 130, MP: 122 };
const territories = {};
const wGeoms = world.objects.countries.geometries;
Object.keys(TERR).forEach(function (abbr) {
  const g = wGeoms.find(x => x.properties.name === TERR[abbr]);
  if (!g) throw new Error('missing ' + TERR[abbr]);
  let rings = geometryRings(g, wArcs).filter(r => r.length >= 3);
  // American Samoa / Northern Marianas cross or sit near the antimeridian: shift negative longitudes east of 180
  const lons = [].concat(...rings.map(r => r.map(p => p[0])));
  if (Math.max(...lons) - Math.min(...lons) > 180) rings = rings.map(r => r.map(p => [p[0] < 0 ? p[0] + 360 : p[0], p[1]]));
  // Show just the main island group: far-flung specks (Swains Island, the northern
  // Marianas...) would shrink the real islands to dots. Distance is from the biggest island.
  const ringArea = r => { let a = 0; for (let i = 0; i < r.length; i++) { const [x1, y1] = r[i], [x2, y2] = r[(i + 1) % r.length]; a += x1 * y2 - x2 * y1; } return Math.abs(a / 2); };
  const centre = r => [r.reduce((s, p) => s + p[0], 0) / r.length, r.reduce((s, p) => s + p[1], 0) / r.length];
  const km = (a, b) => { const dLat = (b[1] - a[1]) * 111, dLon = (b[0] - a[0]) * 111 * Math.cos(((a[1] + b[1]) / 2) * Math.PI / 180); return Math.sqrt(dLat * dLat + dLon * dLon); };
  const mainRing = rings.reduce((m, r) => ringArea(r) > ringArea(m) ? r : m, rings[0]);
  const mainCentre = centre(mainRing);
  rings = rings.filter(r => km(centre(r), mainCentre) <= CLUSTER_KM[abbr]);
  const all = [].concat(...rings);
  const lat0 = all.reduce((s, p) => s + p[1], 0) / all.length;
  const kx = Math.cos(lat0 * Math.PI / 180);
  let proj = rings.map(r => r.map(p => [p[0] * kx, -p[1]]));
  // drop rings with a tiny footprint compared with the largest
  const area = r => { let a = 0; for (let i = 0; i < r.length; i++) { const [x1, y1] = r[i], [x2, y2] = r[(i + 1) % r.length]; a += x1 * y2 - x2 * y1; } return Math.abs(a / 2); };
  const biggest = Math.max(...proj.map(area));
  proj = proj.filter(r => area(r) >= biggest * 0.0008);
  const xs = [].concat(...proj.map(r => r.map(p => p[0]))), ys = [].concat(...proj.map(r => r.map(p => p[1])));
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const scale = Math.min((BOX_W - 2 * PAD) / (maxX - minX), (BOX_H - 2 * PAD) / (maxY - minY));
  const w = (maxX - minX) * scale, h = (maxY - minY) * scale;
  const ox = (BOX_W - w) / 2, oy = (BOX_H - h) / 2;
  const fitted = proj.map(r => simplify(r.map(p => [(p[0] - minX) * scale + ox, (p[1] - minY) * scale + oy]), 0.25));
  territories[abbr] = pathFromRings(fitted.filter(r => r.length >= 3));
});

// ================= write the data file =================
const body =
  '/* ============================================================\n' +
  '   map-data.js — GENERATED FILE (do not edit by hand).\n' +
  '   Outlines for the "Map Pointing" game, as SVG path strings.\n' +
  '   - States + DC: US Census Bureau cartographic boundaries via us-atlas\n' +
  '     (ISC / public domain), pre-projected with Albers USA (Alaska and\n' +
  '     Hawaii are insets), simplified to ~0.35px.\n' +
  '   - Territories: Natural Earth (public domain) via world-atlas, each\n' +
  '     fitted into its own ' + BOX_W + 'x' + BOX_H + ' box (NOT to scale with each other).\n' +
  '   ============================================================ */\n' +
  'const MAP_DATA = {\n' +
  '  width: 975, height: 610,\n' +
  '  box: { w: ' + BOX_W + ', h: ' + BOX_H + ' },\n' +
  '  states: ' + JSON.stringify(states, null, 1).replace(/\n\s*/g, '\n    ').replace(/^\{/, '{').replace(/\n\}$/, '\n  }') + ',\n' +
  '  dc: ' + JSON.stringify(dc) + ',\n' +
  '  territories: ' + JSON.stringify(territories, null, 1).replace(/\n\s*/g, '\n    ').replace(/\n\}$/, '\n  }') + ',\n' +
  '};\n\n' +
  'if (typeof window !== "undefined") window.MAP_DATA = MAP_DATA;\n';
fs.writeFileSync(outFile, body);
console.log('states:', Object.keys(states).length, 'dc:', dc.length > 0, 'territories:', Object.keys(territories).join(','));
console.log('output bytes:', body.length);
