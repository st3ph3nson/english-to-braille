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
    "\"": "⠶",
    "-": "⠤",
    "—": "⠠⠤",
    ":": "⠒",
    ";": "⠆",
    "(": "⠐⠣",
    ")": "⠐⠜",
    "/": "⠸⠌"
  },

  // --- Contractions per Hadley chart categories ---

  // Strong whole-word wordsigns
  strongWords: {
    and:"⠯",
    for:"⠿",
    of:"⠷",
    the:"⠮",
    with:"⠾"
  },

  // Strong whole-word wordsigns that share cells with groupsigns (Hadley: ch/child, sh/shall, etc.)
  strongWordFromGroup: {
    child: "⠡",  // ch/child
    shall: "⠩",  // sh/shall
    this:  "⠹",  // th/this
    which: "⠱",  // wh/which
    out:   "⠳",  // ou/out
    still: "⠌",   // st/still
    children: "⠡⠝"
  },

  // Strong groupsigns (used inside words)
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

// Hadley shortforms (Unicode braille)
  shortforms: {
  "about": "⠁⠃",
  "above": "⠁⠃⠧",
  "according": "⠁⠉",
  "across": "⠁⠉⠗",
  "after": "⠁⠋",
  "afternoon": "⠁⠋⠝",
  "afterward": "⠁⠋⠺",
  "again": "⠁⠛",
  "against": "⠁⠛⠌",
  "almost": "⠁⠇⠍",
  "already": "⠁⠇⠗",
  "also": "⠁⠇",
  "although": "⠁⠇⠹",
  "altogether": "⠁⠇⠞",
  "always": "⠁⠇⠺",
  "because": "⠆⠉",
  "before": "⠆⠋",
  "behind": "⠆⠓",
  "below": "⠆⠇",
  "beneath": "⠆⠝",
  "beside": "⠆⠎",
  "between": "⠆⠞",
  "beyond": "⠆⠽",
  "blind": "⠃⠇",
  "braille": "⠃⠗⠇",
  "children": "⠡⠝",
  "conceive": "⠒⠉⠧",
  "conceiving": "⠒⠉⠧⠛",
  "could": "⠉⠙",
  "deceive": "⠙⠉⠧",
  "deceiving": "⠙⠉⠧⠛",
  "declare": "⠙⠉⠇",
  "declaring": "⠙⠉⠇⠛",
  "either": "⠑⠊",
  "first": "⠋⠌",
  "friend": "⠋⠗",
  "good": "⠛⠙",
  "great": "⠛⠗⠞",
  "herself": "⠓⠻⠋",
  "him": "⠓⠍",
  "himself": "⠓⠍⠋",
  "immediate": "⠊⠍⠍",
  "its": "⠭⠎",
  "itself": "⠭⠋",
  "letter": "⠇⠗",
  "little": "⠇⠇",
  "much": "⠍⠡",
  "must": "⠍⠌",
  "myself": "⠍⠽⠋",
  "necessary": "⠝⠑⠉",
  "neither": "⠝⠑⠊",
  "oneself": "⠐⠕⠋",
  "ourselves": "⠳⠗⠧⠎",
  "paid": "⠏⠙",
  "perceive": "⠏⠻⠉⠧",
  "perceiving": "⠏⠻⠉⠧⠛",
  "perhaps": "⠏⠻⠓",
  "quick": "⠟⠅",
  "receive": "⠗⠉⠧",
  "receiving": "⠗⠉⠧⠛",
  "rejoice": "⠗⠚⠉",
  "rejoicing": "⠗⠚⠉⠛",
  "said": "⠎⠙",
  "should": "⠩⠙",
  "such": "⠎⠡",
  "themselves": "⠮⠍⠧⠎",
  "thyself": "⠹⠽⠋",
  "today": "⠞⠙",
  "together": "⠞⠛⠗",
  "tomorrow": "⠞⠍",
  "tonight": "⠞⠝",
  "would": "⠺⠙",
  "your": "⠽⠗",
  "yourself": "⠽⠗⠋",
  "yourselves": "⠽⠗⠧⠎"
},

  // Final-letter contractions (suffix-only)
  final56: {
    "ence":"⠢",
    "ful":"⠰⠋",
    "ity":"⠰⠽",
    "ment":"⠰⠞",
    "ness":"⠰⠎",
    "ong":"⠰⠛",
    "tion":"⠰⠝"
  },
  final46: {
  "ance": "⠨⠉",
  "less": "⠨⠇",
  "ound": "⠨⠙",
  "ount": "⠨⠞",
  "sion": "⠨⠝"
},

  // Initial-letter contractions: whole words only (Hadley list)
  initDot5Words: [
    "character","day","ever","father","here","know","lord","mother","name","one","ought",
    "part","question","right","some","there","through","time","under","where","work","young"
  ],
  initDot45Words: ["these","those","upon","whose","word"],
  initDot456Words: ["cannot","had","many","spirit","their","world"],

  // Shortforms list exists on chart (hook only; not encoded as braille spellings yet)
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
