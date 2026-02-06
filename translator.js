const $ = (id) => document.getElementById(id);

function isLetter(ch) { return /^[A-Za-z]$/.test(ch); }
function isDigit(ch) { return /^[0-9]$/.test(ch); }

function tokenize(text) {
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
  // Simplified: token is "standing alone" if neighbors are punctuation or absent
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
  const first = wordLower[0];
  const firstCell = UEB.alpha[first] ?? "";
  if (!firstCell) return null;

  if (UEB.initDot5Words.includes(wordLower))   return UEB.initPrefix.dot5 + firstCell;
  if (UEB.initDot45Words.includes(wordLower))  return UEB.initPrefix.dot45 + firstCell;
  if (UEB.initDot456Words.includes(wordLower)) return UEB.initPrefix.dot456 + firstCell;

  return null;
}

function applyWholeWordWordsigns(wordLower, tokens, i) {
  if (!standingAlone(tokens, i)) return null;

  // Strong whole-word wordsigns: and/for/of/the/with
  if (UEB.strongWords?.[wordLower]) {
    return UEB.strongWords[wordLower];
  }

  // Whole-word forms that share cells with groupsigns: child/shall/this/which/out/still
  if (UEB.strongWordFromGroup?.[wordLower]) {
    return UEB.strongWordFromGroup[wordLower];
  }

  // Initial-letter contractions (Hadley list)
  const init = applyInitialLetterContraction(wordLower);
  if (init) return init;

  // Shortforms hook (not implemented as braille spellings yet)
  return null;
}

function applySuffixFinalLetter(wordLower) {
  const suffixEntries = [
    ...Object.entries(UEB.final56),
    ...Object.entries(UEB.final46),
  ].sort((a, b) => b[0].length - a[0].length);

  for (const [suf, cell] of suffixEntries) {
    if (wordLower.endsWith(suf) && wordLower.length > suf.length) {
      const stem = wordLower.slice(0, -suf.length);
      return translateWordInternal(stem) + cell;
    }
  }
  return null;
}

function translateWordInternal(wordLower) {
  // 1) suffix contractions (final-letter)
  const suf = applySuffixFinalLetter(wordLower);
  if (suf) return suf;

  // 2) in-word groupsigns (strong + lower), greedy longest-first
  const groupMap = { ...UEB.strongGroups, ...UEB.lowerGroups };
  const keys = Object.keys(groupMap).sort((a, b) => b.length - a.length);

  let out = "";
  let idx = 0;

  while (idx < wordLower.length) {
    let matched = false;

    for (const k of keys) {
  if (!wordLower.startsWith(k, idx)) continue;

  // Special rule: "ea" groupsign (⠂) NOT allowed at start or end of a word.
  if (k === "ea") {
    const atStart = (idx === 0);
    const atEnd = (idx + 2 === wordLower.length);
    if (atStart || atEnd) {
      continue; // don't use groupsign; fall through to letter-by-letter
    }
  }

  out += groupMap[k];
  idx += k.length;
  matched = true;
  break;
}

    if (!matched) {
      const ch = wordLower[idx];
      out += UEB.alpha[ch] ?? ch;
      idx += 1;
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

    // word token
    const raw = t.value;
    const lower = raw.toLowerCase();

    // Whole-word wordsigns (standing alone only)
    const ww = applyWholeWordWordsigns(lower, tokens, i);
    if (ww) {
      // if user typed caps, keep it conservative and spell it
      const hasCaps = raw !== lower;
      out.push(hasCaps ? spellWord(raw) : ww);
      return;
    }

    // Otherwise: contracted within word, unless capitalization present
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