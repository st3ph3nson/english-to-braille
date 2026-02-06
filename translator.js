const $ = (id) => document.getElementById(id);

function isLetter(ch) { return /^[A-Za-z]$/.test(ch); }
function isDigit(ch) { return /^[0-9]$/.test(ch); }

function tokenize(text) {
  // word tokens (letters only), number tokens, and punct tokens
  const tokens = [];
  let buf = "";
  let mode = "none"; // "word" | "num"

  const flush = () => {
    if (!buf) return;
    tokens.push({ type: mode, value: buf });
    buf = "";
    mode = "none";
  };

  for (const ch of text) {
    if (isLetter(ch)) {
      if (mode !== "word") flush(), mode = "word";
      buf += ch;
    } else if (isDigit(ch)) {
      if (mode !== "num") flush(), mode = "num";
      buf += ch;
    } else {
      flush();
      tokens.push({ type: "punct", value: ch });
    }
  }
  flush();
  return tokens;
}

function standingAlone(tokens, i) {
  // Simplified: a word is standing alone if neighbors are not word/num tokens
  const prev = tokens[i - 1];
  const next = tokens[i + 1];
  const prevOK = !prev || prev.type === "punct";
  const nextOK = !next || next.type === "punct";
  return prevOK && nextOK;
}

function brailleLetter(ch) {
  const lower = ch.toLowerCase();
  const b = UEB.alpha[lower];
  if (!b) return ch;
  if (ch !== lower) return UEB.cap + b; // per-letter capitalization
  return b;
}

function spellWord(word) {
  let out = "";
  for (const ch of word) out += brailleLetter(ch);
  return out;
}

function translateNumber(numStr) {
  let out = UEB.num.indicator;
  for (const d of numStr) out += UEB.num.digits[d] ?? d;
  return out;
}

function applyInitialLetterContraction(wordLower) {
  // Dot 5 / dot 45 / dot 456 + first letter of the word
  const first = wordLower[0];
  const firstCell = UEB.alpha[first] ?? "";
  if (!firstCell) return null;

  if (UEB.initDot5Words.includes(wordLower))  return UEB.initPrefix.dot5 + firstCell;
  if (UEB.initDot45Words.includes(wordLower)) return UEB.initPrefix.dot45 + firstCell;
  if (UEB.initDot456Words.includes(wordLower))return UEB.initPrefix.dot456 + firstCell;

  return null;
}

function applyWholeWordWordsigns(wordLower, tokens, i) {
  // strong whole-word contractions (and/for/of/the/with) only when standing alone
  if (UEB.strongWordFromGroup?.[wordLower] && standingAlone(tokens, i)) {
    return UEB.strongWordsFromGroup[wordLower];
  }

  // initial-letter contractions are whole-word by nature (list-based)
  if (standingAlone(tokens, i)) {
    const init = applyInitialLetterContraction(wordLower);
    if (init) return init;
  }

  // Shortforms hook: by default we DO NOT guess spellings.
  // If you later supply the exact shortform braille spellings, we can add them as a map here.
  return null;
}

function applySuffixFinalLetter(wordLower, spelledSoFarBraille) {
  // Try longest suffixes first
  const suffixEntries = [
    ...Object.entries(UEB.final56),
    ...Object.entries(UEB.final46),
  ].sort((a, b) => b[0].length - a[0].length);

  for (const [suf, cell] of suffixEntries) {
    if (wordLower.endsWith(suf) && wordLower.length > suf.length) {
      // Replace suffix letters with suffix cell
      // Build braille for stem using main contraction engine too (we call recursively safely)
      const stem = wordLower.slice(0, -suf.length);
      return translateWordInternal(stem) + cell;
    }
  }
  return null;
}

function translateWordInternal(wordLower) {
  // Internal word translation: apply group contractions inside a word, greedy.
  // 1) Try suffix rules (final-letter)
  const suf = applySuffixFinalLetter(wordLower);
  if (suf) return suf;

  // 2) Greedy scan using groupsigns (strong + lower), longest match first
  const groupMap = { ...UEB.strongGroups, ...UEB.lowerGroups };
  const keys = Object.keys(groupMap).sort((a, b) => b.length - a.length);

  let out = "";
  let i = 0;

  while (i < wordLower.length) {
    let matched = false;

    for (const k of keys) {
      if (wordLower.startsWith(k, i)) {
        // Basic sanity: lowerGroups like "was/were/enough" generally act as groupsigns, not always allowed in every position.
        // This is a simplified implementation that matches common usage.
        out += groupMap[k];
        i += k.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      const ch = wordLower[i];
      out += UEB.alpha[ch] ?? ch;
      i += 1;
    }
  }

  return out;
}

function translate(text) {
  const tokens = tokenize(text);
  const out = [];

  tokens.forEach((t, i) => {
    if (t.type === "punct") {
      out.push(UEB.punct[t.value] ?? t.value);
      return;
    }

    if (t.type === "num") {
      out.push(translateNumber(t.value));
      return;
    }

    // word
    const raw = t.value;
    const lower = raw.toLowerCase();

    // Whole-word wordsigns / initial-letter contractions
    const ww = applyWholeWordWordsigns(lower, tokens, i);
    if (ww) {
      // preserve capitalization by spelling if it contains caps
      const hasCaps = raw !== lower;
      out.push(hasCaps ? spellWord(raw) : ww);
      return;
    }

    // Otherwise translate internally with contractions, then add per-letter caps where needed.
    // If the word has capitals, we do a conservative approach: spell the word with caps.
    // (UEB has word-capital indicators; can be added later.)
    const hasCaps = raw !== lower;
    out.push(hasCaps ? spellWord(raw) : translateWordInternal(lower));
  });

  return out.join("");
}

window.addEventListener("DOMContentLoaded", () => {
  $("btn").addEventListener("click", () => {
    try {
      $("output").value = translate($("input").value);
      $("hint").textContent = "Translated with contractions.";
    } catch (e) {
      $("hint").textContent = "Error: " + e.message;
    }
  });

  $("copy").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText($("output").value);
      $("hint").textContent = "Copied.";
    } catch {
      $("hint").textContent = "Copy failed (permissions).";
    }
  });
});

