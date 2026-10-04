/* ============================================================
   emoji.js — Shows OpenMoji artwork instead of the system emoji font.
   Every emoji character that appears in the page is swapped for an
   <img> from assets/openmoji/, so the app looks the same on every device.

   The rest of the app keeps writing plain emoji into text and HTML; a
   MutationObserver converts them as they appear. Emoji with no artwork
   (or art that fails to load) simply stay as text.

   Art: OpenMoji (https://openmoji.org), CC BY-SA 4.0 — see
   assets/openmoji/LICENSE.txt. To support a new emoji, drop its SVG into
   assets/openmoji/ and add its code to AVAILABLE below.
   ============================================================ */
(function () {
  const DIR = "assets/openmoji/";

  // File names (without .svg) of the art we ship. FE0F is dropped from the
  // name except where OpenMoji keeps it (e.g. the polar bear).
  const AVAILABLE = new Set((
    "1F30A 1F319 1F31F 1F331 1F338 1F33B 1F33D 1F342 1F381 1F389 1F3AE 1F3AF " +
    "1F3C6 1F3D4 1F3DB 1F3DD 1F3E0 1F3EA 1F406 1F407 1F409 1F40A 1F40B 1F40C 1F40D " +
    "1F410 1F411 1F413 1F414 1F417 1F418 1F419 1F41A 1F41B 1F41D 1F41E 1F41F " +
    "1F420 1F421 1F422 1F425 1F426 1F427 1F428 1F42B 1F42C 1F42D 1F42E 1F42F " +
    "1F430 1F431 1F432 1F433 1F434 1F435 1F436 1F437 1F438 1F439 1F43A 1F43B " +
    "1F43B-200D-2744-FE0F 1F43C 1F43E 1F446 1F447 1F44B 1F464 1F47B 1F4AA 1F4AC 1F4C8 " +
    "1F4DA 1F4DC 1F4DD 1F501 1F504 1F50A 1F511 1F525 1F54A 1F577 1F5D1 1F5FA " +
    "1F642 1F680 1F69C 1F7E1 1F7E3 1F914 1F95A 1F980 1F981 1F982 1F983 1F984 " +
    "1F985 1F986 1F988 1F989 1F98A 1F98B 1F98C 1F98D 1F98E 1F98F 1F990 1F991 " +
    "1F992 1F993 1F994 1F995 1F996 1F99A 1F99C 1F99D 1F9A2 1F9A3 1F9A5 1F9A6 " +
    "1F9A9 1F9AD 1F9DA 1F9DE 1F9E0 1FA99 1FAB2 2328 23F1 23F8 2600 2601 2699 " +
    "26A0 2705 270F 2728 2744 2753 2754 2B1C 2B50"
  ).split(" "));

  // One emoji, including skin tones and joined (ZWJ) sequences.
  const EMOJI_RE = /\p{Extended_Pictographic}(?:\uFE0F|\p{Emoji_Modifier})?(?:\u200D\p{Extended_Pictographic}(?:\uFE0F|\p{Emoji_Modifier})?)*\uFE0F?/gu;

  // Parts of the page whose text must stay text.
  const SKIP_TAGS = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, INPUT: 1, OPTION: 1, NOSCRIPT: 1, TITLE: 1 };

  // Path of the artwork for one emoji, or null if we don't have it.
  function srcFor(glyph) {
    const code = Array.from(glyph).map(function (c) {
      return c.codePointAt(0).toString(16).toUpperCase();
    }).join("-");
    const short = code.replace(/-FE0F/g, "");
    if (AVAILABLE.has(short)) return DIR + short + ".svg";
    if (AVAILABLE.has(code)) return DIR + code + ".svg";
    return null;
  }

  function makeImg(glyph, src) {
    const img = document.createElement("img");
    img.className = "emoji";
    img.alt = glyph;
    img.src = src;
    img.draggable = false;
    // If the file ever fails to load, fall back to the text emoji.
    img.addEventListener("error", function () {
      if (img.parentNode) img.parentNode.replaceChild(document.createTextNode(glyph), img);
    });
    return img;
  }

  function convertTextNode(node) {
    const parent = node.parentNode;
    if (!parent || SKIP_TAGS[parent.nodeName]) return;
    const text = node.nodeValue;
    EMOJI_RE.lastIndex = 0;
    let match = EMOJI_RE.exec(text);
    if (!match) return;

    const frag = document.createDocumentFragment();
    let last = 0;
    let changed = false;
    while (match) {
      const src = srcFor(match[0]);
      if (src) {
        if (match.index > last) frag.appendChild(document.createTextNode(text.slice(last, match.index)));
        frag.appendChild(makeImg(match[0], src));
        last = match.index + match[0].length;
        changed = true;
      }
      match = EMOJI_RE.exec(text);
    }
    if (!changed) return;
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    parent.replaceChild(frag, node);
  }

  // Convert every text node at or below `root`.
  function convert(root) {
    if (!root) return;
    if (root.nodeType === 3) { convertTextNode(root); return; }
    if (root.nodeType !== 1 || SKIP_TAGS[root.nodeName]) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const found = [];
    while (walker.nextNode()) found.push(walker.currentNode);
    found.forEach(convertTextNode);
  }

  convert(document.body);

  new MutationObserver(function (records) {
    records.forEach(function (r) {
      if (r.type === "characterData") convertTextNode(r.target);
      else r.addedNodes.forEach(convert);
    });
  }).observe(document.body, { childList: true, subtree: true, characterData: true });

  // app.js uses src() for places that need an image URL (profile avatar).
  window.EmojiArt = { src: srcFor, convert: convert };
})();
