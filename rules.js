// --- Core signs (UEB standard) ---
const UEB = {
  // Letters a-z
  alpha: {
    a:"⠁", b:"⠃", c:"⠉", d:"⠙", e:"⠑", f:"⠋", g:"⠛", h:"⠓", i:"⠊", j:"⠚",
    k:"⠅", l:"⠇", m:"⠍", n:"⠝", o:"⠕", p:"⠏", q:"⠟", r:"⠗", s:"⠎", t:"⠞",
    u:"⠥", v:"⠧", w:"⠺", x:"⠭", y:"⠽", z:"⠵"
  },

  // Numeric indicator + digits (1-0 map to a-j)
  num: {
    indicator: "⠼",
    digits: { "1":"⠁","2":"⠃","3":"⠉","4":"⠙","5":"⠑","6":"⠋","7":"⠛","8":"⠓","9":"⠊","0":"⠚" }
  },

  // Capital indicator (simple per-letter capitalization)
  cap: "⠠",

  // Initial-letter contraction prefixes (Dot 5 / Dot 45 / Dot 456)
  // Dot 5 sign is ⠐, dots 45 sign is ⠘, dots 456 sign is ⠸
  initPrefix: {
    dot5: "⠐",
    dot45: "⠘",
    dot456: "⠸"
  },

  // Basic punctuation (common UEB)
  punct: {
    " ": " ",
    ".": "⠲",
    ",": "⠂",
    "?": "⠦",
    "!": "⠖",
    "'": "⠄",
    "\"": "⠶",      // quotation mark (paired behavior not handled here)
    "-": "⠤",
    "—": "⠠⠤",     // em dash (simple)
    ":": "⠒",
    ";": "⠆",
    "(": "⠐⠣",
    ")": "⠐⠜",
    "/": "⠸⠌"
  },

  // --- Contractions: as categories shown on the Hadley chart ---

  // Strong wordsigns / groupsigns
  strongWords: {
    and:"⠯",
    for:"⠿",
    of:"⠷",
    the:"⠮",
    with:"⠾"
  },
  strongGroups: {
    "ch":"⠡",
    "sh":"⠩",
    "th":"⠹",
    "wh":"⠱",
    "ou":"⠳",
    "st":"⠌",
    "ar":"⠜",
    "ed":"⠫",
    "er":"⠻",
    "ing":"⠬",
    "gh":"⠣",
    "ow":"⠪"
  },

  // Lower groupsigns
  lowerGroups: {
    "be":"⠆",
    "con":"⠒",
    "dis":"⠲",
    "ea":"⠂",
    "en":"⠢",
    "enough":"⠖",
    "his":"⠦",
    "in":"⠔",
    "was":"⠴",
    "were":"⠶",
    "bb":"⠆⠃",
    "cc":"⠆⠉",
    "ff":"⠆⠋",
    "gg":"⠆⠛"
  },

  // Final-letter contractions (Dot 56 / Dot 46 categories)
  // NOTE: these are suffix-only rules.
  final56: {
    "ence":"⠢",   // often shared with "en" cell; UEB uses context (suffix position)
    "ful":"⠰⠋",
    "ity":"⠰⠽",
    "ment":"⠰⠞",
    "ness":"⠰⠎",
    "ong":"⠰⠛",
    "tion":"⠰⠝"
  },
  final46: {
    "ance":"⠰⠉",
    "less":"⠰⠇",
    "ound":"⠰⠙",
    "ount":"⠰⠞",
    "sion":"⠰⠝"
  },

  // Initial-letter contractions: whole words only (from your chart lists)
  initDot5Words: [
    "character","day","ever","father","here","know","lord","mother","name","one","ought",
    "part","question","right","some","there","through","time","under","where","work","young"
  ],
  initDot45Words: ["these","those","upon","whose","word"],
  initDot456Words: ["cannot","had","many","spirit","their","world"],

  // Shortforms list exists on chart.
  // Implementing shortforms perfectly requires their exact spellings; hook is provided.
  shortforms: new Set([
    "about","above","according","across","after","afternoon","afterward","again","against","almost","already",
    "also","although","altogether","always","because","before","behind","below","beneath","beside","between",
    "beyond","blind","braille","children","conceive","conceiving","could","deceive","deceiving","declare","declaring",
    "either","first","friend","good","great","herself","him","himself","immediate","its","itself","letter","little",
    "much","must","myself","necessary","neither","oneself","ourselves","paid","perceive","perceiving","perhaps",
    "quick","receive","receiving","rejoice","rejoicing","said","should","such","themselves","thyself","today","together",
    "tomorrow","tonight","would","your","yourself","yourselves"
  ])
};

