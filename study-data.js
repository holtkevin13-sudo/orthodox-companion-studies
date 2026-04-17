// ==================================================================
// study-data.js — SHARED DATA LAYER for the Orthodox Patristic
// Formation study app.
//
// This file is included by every study-app page that needs access to
// the syllabus, phase structure, or the user's current-week state.
// It owns ALL content data and ALL derivations from that data. It
// touches localStorage (via STUDY_STATE) but NEVER touches the DOM.
//
// Pages that include this file:
//   - patristics-dashboard.html  — the 40-week progress dashboard
//   - father-cards-index.html     — current-week highlight on Fathers
//   - greek-lexicon-index.html    — phase-scoped Greek term view
//
// Dependencies: none. Load this file BEFORE any page-specific scripts.
// ==================================================================
// build: 2026-04-17T18:30:00Z

// ==================================================================
// WEEK_DATA — canonical 40-week syllabus
// Populated via WEEK_DATA[N] = {...} assignments further down in this file.
// Shape per week:
//   number, phaseNum, title, subtitle,
//   days: [ {biblical, patristic, secondary}, ... ] (5 entries for D1–D5)
//   reviewPrompt (D6 reflection)
//   celebrationStats: ["...", "...", "..."]
// Psalms are computed dynamically via psalmRange() — not stored per-day.
// ==================================================================
const WEEK_DATA = {};

// ================ PHASE 1 — APOSTOLIC FATHERS (Weeks 1–4) ================

WEEK_DATA[1] = {
  number: 1, phaseNum: 1,
  title: "Didache & Early Ignatius",
  subtitle: "The earliest Christian teaching manual and the opening of Ignatius's letters",
  days: [
    { biblical: "John 1–2 (Prologue + Cana)",
      patristic: "Didache 1–6 (Holmes)",
      secondary: "Pelikan Vol. 1, Ch. 1: pp. 1–9" },
    { biblical: "John 3–4 (Nicodemus + Samaritan Woman)",
      patristic: "Didache 7–16 (Holmes)",
      secondary: "Pelikan Vol. 1: pp. 10–18" },
    { biblical: "John 5–6 (Bread of Life — read slowly)",
      patristic: "Ignatius — Ephesians (Holmes)",
      secondary: "Pelikan Vol. 1: pp. 19–27" },
    { biblical: "John 7–8",
      patristic: "Ignatius — Magnesians + Trallians (Holmes)",
      secondary: "Re-read key sections of Pelikan Ch. 1" },
    { biblical: "John 9–10 (Good Shepherd)",
      patristic: "Ignatius — Romans (Holmes)",
      secondary: "Note doctrinal threads from Pelikan Ch. 1" }
  ],
  reviewPrompt: "Note where λόγος, σάρξ, and ἕνωσις appear in John — then trace how Ignatius picks up Johannine language in his letters.",
  celebrationStats: [
    "Didache + 4 Ignatian letters completed",
    "John 1–10 studied",
    "18 Psalms prayed"
  ]
};

WEEK_DATA[2] = {
  number: 2, phaseNum: 1,
  title: "Ignatius Letters & Polycarp's Witness",
  subtitle: "Completing Ignatius's ecclesial theology; Polycarp's martyrdom",
  days: [
    { biblical: "John 11–12 (Lazarus + Entry)",
      patristic: "Ignatius — Philadelphians (Holmes)",
      secondary: "Pelikan Vol. 1, Ch. 2: pp. 28–36" },
    { biblical: "John 13–14 (Last Supper + Farewell)",
      patristic: "Ignatius — Smyrnaeans (Holmes)",
      secondary: "Pelikan Vol. 1: pp. 37–45" },
    { biblical: "John 15–16",
      patristic: "Ignatius — to Polycarp (Holmes)",
      secondary: "Pelikan Vol. 1: pp. 46–54" },
    { biblical: "John 17 (High Priestly Prayer — read slowly, twice)",
      patristic: "Polycarp — Letter to the Philippians (Holmes)",
      secondary: "Re-read Pelikan Ch. 2 key sections" },
    { biblical: "John 18–21 (Passion + Resurrection)",
      patristic: "Martyrdom of Polycarp (Holmes)",
      secondary: "Note doctrinal threads from Pelikan Ch. 2" }
  ],
  reviewPrompt: "Trace the ecclesial authority thread — John 17 unity → Ignatius on the bishop → Polycarp's martyrdom as witness to the tradition.",
  celebrationStats: [
    "Ignatius corpus + Polycarp + Martyrdom complete",
    "Gospel of John fully studied",
    "18 Psalms prayed"
  ]
};

WEEK_DATA[3] = {
  number: 3, phaseNum: 1,
  title: "Clement & the Epistle of Barnabas",
  subtitle: "Roman ecclesiology in 1–2 Clement; typological exegesis in Barnabas",
  days: [
    { biblical: "1 John 1–3",
      patristic: "1 Clement 1–20",
      secondary: "Pelikan Vol. 1, Ch. 3: pp. 55–62" },
    { biblical: "1 John 4–5 + 2 John + 3 John",
      patristic: "1 Clement 21–40",
      secondary: "Pelikan Vol. 1: pp. 63–70" },
    { biblical: "1 Corinthians 1–3",
      patristic: "1 Clement 41–65",
      secondary: "Pelikan Vol. 1: pp. 71–80" },
    { biblical: "1 Corinthians 4–6",
      patristic: "2 Clement",
      secondary: "Re-read Pelikan Ch. 3 key sections" },
    { biblical: "1 Corinthians 7–8",
      patristic: "Epistle of Barnabas 1–10",
      secondary: "Note ecclesiology threads" }
  ],
  reviewPrompt: "How does 1 Clement extend the apostolic succession argument from the NT into the second-generation Church? Compare Clement's ecclesiology with Ignatius's.",
  celebrationStats: [
    "1 & 2 Clement + Barnabas 1–10 complete",
    "1–3 John + 1 Cor 1–8 studied",
    "18 Psalms prayed"
  ]
};

WEEK_DATA[4] = {
  number: 4, phaseNum: 1,
  title: "Shepherd of Hermas, Diognetus, Papias",
  subtitle: "Completing the Apostolic Fathers; Torrance's Trinitarian Faith opens the secondary track",
  days: [
    { biblical: "1 Corinthians 9–10 (Eucharist ch. 10 — read slowly)",
      patristic: "Barnabas 11–21",
      secondary: "Torrance, The Trinitarian Faith: pp. 1–12" },
    { biblical: "1 Corinthians 11 (Lord's Supper — read slowly)",
      patristic: "Shepherd of Hermas — Visions",
      secondary: "Torrance: pp. 13–25" },
    { biblical: "1 Corinthians 12–13",
      patristic: "Shepherd of Hermas — Commandments",
      secondary: "Torrance: pp. 26–40" },
    { biblical: "1 Corinthians 14",
      patristic: "Shepherd of Hermas — Similitudes",
      secondary: "Re-read Torrance key sections" },
    { biblical: "1 Corinthians 15–16 (Resurrection — read slowly)",
      patristic: "Epistle to Diognetus + Papias (fragments)",
      secondary: "Note — Rule of Faith emerging across the corpus" }
  ],
  reviewPrompt: "Synthesize Phase 1: what is the 'phronema of the Apostolic Fathers'? What doctrinal anchors have you seen across all 9 writers?",
  celebrationStats: [
    "Phase 1 complete — 9 Apostolic Fathers read",
    "1 Corinthians fully studied",
    "End of Phase 1 milestone reached"
  ]
};

// ================ PHASE 2 — JUSTIN MARTYR (Weeks 5–6) ================

WEEK_DATA[5] = {
  number: 5, phaseNum: 2,
  title: "Justin Martyr — The Apologies",
  subtitle: "The first philosophical defense of Christianity to pagan Rome",
  days: [
    { biblical: "Mark 1–4",
      patristic: "First Apology 1–20",
      secondary: "Pelikan Vol. 1, Ch. 4: pp. 81–89" },
    { biblical: "Mark 5–8",
      patristic: "First Apology 21–40",
      secondary: "Pelikan Vol. 1: pp. 90–98" },
    { biblical: "Mark 9–11",
      patristic: "First Apology 41–67",
      secondary: "Pelikan Vol. 1: pp. 99–108" },
    { biblical: "Mark 12–14",
      patristic: "Second Apology (complete)",
      secondary: "Osborn, Justin Martyr: Ch. 1 + Ch. 3 on Logos (pp. 1–30)" },
    { biblical: "Mark 15–16",
      patristic: "Re-read First Apology 40–67 (Eucharist + worship)",
      secondary: "Osborn: continued notes on Logos theology" }
  ],
  reviewPrompt: "How does Justin use λόγος to bridge Greek philosophy and the Gospel? Watch for σπερματικὸς λόγος — the seed of the Logos in all humanity.",
  celebrationStats: [
    "Both Apologies complete",
    "Gospel of Mark studied",
    "Logos theology introduced"
  ]
};

WEEK_DATA[6] = {
  number: 6, phaseNum: 2,
  title: "Justin Martyr — Dialogue with Trypho",
  subtitle: "Scripture argument with the synagogue; Wisdom as pre-existent Logos",
  days: [
    { biblical: "Proverbs 1–3 (Wisdom as companion + way of life)",
      patristic: "Dialogue 1–30",
      secondary: "Pelikan Vol. 1, Ch. 5: pp. 109–117" },
    { biblical: "Proverbs 4–6",
      patristic: "Dialogue 31–60",
      secondary: "Pelikan Vol. 1: pp. 118–126" },
    { biblical: "Proverbs 7–9 (ch. 8 — CRITICAL for Justin's Logos)",
      patristic: "Dialogue 61–90",
      secondary: "Osborn: Ch. 5 on Logos and Wisdom (pp. 60–80)" },
    { biblical: "Wisdom of Solomon 1–9",
      patristic: "Dialogue 91–120",
      secondary: "Re-read Pelikan key sections" },
    { biblical: "Wisdom of Solomon 10–19",
      patristic: "Dialogue end (121–142)",
      secondary: "Write synthesis: Justin as Scriptural theologian" }
  ],
  reviewPrompt: "How does Justin read Proverbs 8? Watch how Wisdom becomes Logos becomes Christ. This move shapes Athanasius in Phase 4.",
  celebrationStats: [
    "Dialogue with Trypho complete",
    "Proverbs 1–9 + Wisdom of Solomon studied",
    "Phase 2 — Justin Martyr complete"
  ]
};

// ================ PHASE 2.5 — TERTULLIAN + CYPRIAN (Weeks 7–8) ================

WEEK_DATA[7] = {
  number: 7, phaseNum: '2.5',
  title: "Tertullian — Rule of Faith & Trinitarian Grammar",
  subtitle: "The Latin hinge: Prescription against Heretics + Against Praxeas",
  days: [
    { biblical: "Acts 1–6 (Pentecost + early community)",
      patristic: "On the Prescription of Heretics 1–20",
      secondary: "Dunn, Tertullian: pp. 1–12" },
    { biblical: "Acts 7–11",
      patristic: "On the Prescription of Heretics 21–44",
      secondary: "Dunn: pp. 13–25 (Rule of Faith)" },
    { biblical: "Acts 12–16",
      patristic: "Against Praxeas 1–10",
      secondary: "Dunn: pp. 26–40 (Against Praxeas commentary)" },
    { biblical: "Acts 17–21",
      patristic: "Against Praxeas 11–20",
      secondary: "Dunn: pp. 41–55 (Trinitarian grammar)" },
    { biblical: "Acts 22–28",
      patristic: "Against Praxeas 21–31 + On Baptism (selections)",
      secondary: "Re-read Dunn Ch. 2 + synthesis note" }
  ],
  reviewPrompt: "Tertullian coins the Latin Trinitarian vocabulary — trinitas, substantia, persona. How does this prepare the way for Nicaea?",
  celebrationStats: [
    "Tertullian's major treatises complete",
    "Acts fully studied",
    "Latin Trinitarian vocabulary introduced"
  ]
};

WEEK_DATA[8] = {
  number: 8, phaseNum: '2.5',
  title: "Cyprian — On the Unity of the Church",
  subtitle: "Episcopal ecclesiology; schism and the lapsed",
  days: [
    { biblical: "Galatians 1–2 (Apostolic authority — read slowly)",
      patristic: "On the Unity of the Church 1–10",
      secondary: "Brent, Cyprian and Roman Carthage: pp. 1–13" },
    { biblical: "Galatians 3–4",
      patristic: "On the Unity of the Church 11–27",
      secondary: "Brent: pp. 14–26 (Episcopal structure)" },
    { biblical: "Galatians 5–6",
      patristic: "Cyprian — Letters (selections on schism + authority)",
      secondary: "Brent: pp. 27–40 (Unity in context)" },
    { biblical: "James 1–3",
      patristic: "Re-read Ignatius Smyrnaeans + 1 Clement alongside Cyprian",
      secondary: "Brent: pp. 41–50 (Schism + the lapsed)" },
    { biblical: "James 4–5",
      patristic: "Write synthesis: Church thread — Ignatius → Clement → Cyprian",
      secondary: "Re-read + final notes" }
  ],
  reviewPrompt: "The Church thread runs Ignatius → Clement → Cyprian. How does each develops the previous? What does 'Outside the Church there is no salvation' actually mean in Cyprian?",
  celebrationStats: [
    "Cyprian's Unity of the Church complete",
    "Galatians + James studied",
    "Phase 2.5 — Latin Fathers complete"
  ]
};

// ================ PHASE 3 — IRENAEUS (Weeks 9–13) ================

WEEK_DATA[9] = {
  number: 9, phaseNum: 3,
  title: "Irenaeus — Against Heresies Book I",
  subtitle: "Gnosticism cataloged and refuted; Genesis 1–11 as theological ground",
  days: [
    { biblical: "Genesis 1–2 (Creation — read slowly, twice)",
      patristic: "Against Heresies Book I ch. 1–6",
      secondary: "Minns, Irenaeus: pp. 1–12 (context + Gnosticism)" },
    { biblical: "Genesis 3–5 (Fall + lineages — CRITICAL for Recapitulation)",
      patristic: "Book I ch. 7–13",
      secondary: "Minns: pp. 13–25 (Rule of Faith)" },
    { biblical: "Genesis 6–9 (Flood — typology)",
      patristic: "Book I ch. 14–19",
      secondary: "Minns: pp. 26–38 (Canon argument)" },
    { biblical: "Genesis 10–11 (Babel)",
      patristic: "Book I ch. 20–25",
      secondary: "Minns: pp. 39–50 (Recapitulation overview)" },
    { biblical: "Luke 1–2 (Infancy narrative)",
      patristic: "Book I ch. 26–31",
      secondary: "Re-read + note doctrinal threads" }
  ],
  reviewPrompt: "Irenaeus's cosmos rests on Genesis 1–3. Note how the Adam/Christ parallel prepares his Recapitulation argument in Books III–V.",
  celebrationStats: [
    "Against Heresies Book I complete",
    "Genesis 1–11 + Luke 1–2 studied",
    "Gnostic context mapped"
  ]
};

WEEK_DATA[10] = {
  number: 10, phaseNum: 3,
  title: "Irenaeus — Against Heresies Book II",
  subtitle: "Refutation by reason; the one Creator God",
  days: [
    { biblical: "Luke 3–5",
      patristic: "Book II ch. 1–7",
      secondary: "Minns: pp. 51–60" },
    { biblical: "Luke 6–8",
      patristic: "Book II ch. 8–14",
      secondary: "Minns: pp. 61–70" },
    { biblical: "Luke 9–11",
      patristic: "Book II ch. 15–21",
      secondary: "Minns: pp. 71–80" },
    { biblical: "Luke 12–13",
      patristic: "Book II ch. 22–28",
      secondary: "Minns: pp. 81–90" },
    { biblical: "Luke 14–15",
      patristic: "Book II ch. 29–35",
      secondary: "Minns: pp. 91–100" }
  ],
  reviewPrompt: "Book II is the rational argument. Note where Irenaeus appeals to coherence, simplicity, and common sense against Gnostic elaboration.",
  celebrationStats: [
    "Against Heresies Book II complete",
    "Luke 3–15 studied",
    "Creator-God argument grasped"
  ]
};

WEEK_DATA[11] = {
  number: 11, phaseNum: 3,
  title: "Irenaeus — Against Heresies Book III (CRITICAL)",
  subtitle: "The apostolic Church and the Rule of Faith; read slowly",
  days: [
    { biblical: "Luke 16–18",
      patristic: "Book III ch. 1–5 (apostolic succession — read slowly)",
      secondary: "Behr, Irenaeus of Lyons: pp. 1–15" },
    { biblical: "Luke 19–21",
      patristic: "Book III ch. 6–10",
      secondary: "Behr: pp. 16–30" },
    { biblical: "Luke 22–24 (Passion + Emmaus — read slowly)",
      patristic: "Book III ch. 11–15",
      secondary: "Behr: pp. 31–45 (on Book III itself)" },
    { biblical: "Revelation 1–4",
      patristic: "Book III ch. 16–20",
      secondary: "Behr: pp. 46–60" },
    { biblical: "Revelation 5–8",
      patristic: "Book III ch. 21–25",
      secondary: "Re-read Behr + synthesis note" }
  ],
  reviewPrompt: "Book III is the central text of Phase 3. Watch the Rule of Faith argument connect directly back to Tertullian's Prescription.",
  celebrationStats: [
    "Against Heresies Book III complete (CRITICAL)",
    "Luke completed + Revelation 1–8 studied",
    "Apostolic succession argument grasped"
  ]
};

WEEK_DATA[12] = {
  number: 12, phaseNum: 3,
  title: "Irenaeus — Against Heresies Book IV",
  subtitle: "The continuity of the two Testaments; one God, one economy",
  days: [
    { biblical: "Revelation 9–12",
      patristic: "Book IV ch. 1–8",
      secondary: "Behr: pp. 61–70" },
    { biblical: "Revelation 13–15",
      patristic: "Book IV ch. 9–16",
      secondary: "Behr: pp. 71–80" },
    { biblical: "Revelation 16–18",
      patristic: "Book IV ch. 17–24",
      secondary: "Behr: pp. 81–90" },
    { biblical: "Revelation 19–20",
      patristic: "Book IV ch. 25–33",
      secondary: "Behr: pp. 91–100" },
    { biblical: "Revelation 21–22 (New Creation — connect to Genesis 1–2)",
      patristic: "Book IV ch. 34–41",
      secondary: "Behr: pp. 101–110" }
  ],
  reviewPrompt: "Old and New Testaments share one economy. How does Irenaeus's reading differ from Marcion's? From the Gnostics'?",
  celebrationStats: [
    "Against Heresies Book IV complete",
    "Revelation fully studied",
    "OT/NT unity argument mastered"
  ]
};

WEEK_DATA[13] = {
  number: 13, phaseNum: 3,
  title: "Irenaeus — Against Heresies Book V",
  subtitle: "Resurrection, millennium, and the consummation of all things",
  days: [
    { biblical: "Isaiah 40–42 (Comfort + First Servant Song)",
      patristic: "Book V ch. 1–7",
      secondary: "Behr: pp. 111–120" },
    { biblical: "Isaiah 43–45",
      patristic: "Book V ch. 8–14",
      secondary: "Behr: pp. 121–130" },
    { biblical: "Isaiah 46–49 (Second + Third Servant Songs)",
      patristic: "Book V ch. 15–22",
      secondary: "Behr: pp. 131–140" },
    { biblical: "Isaiah 50–52 (Third Servant Song)",
      patristic: "Book V ch. 23–29",
      secondary: "Behr: pp. 141–150" },
    { biblical: "Isaiah 53–55 (Fourth Servant Song — CRITICAL)",
      patristic: "Book V ch. 30–36",
      secondary: "Behr: pp. 151–160 + final synthesis" }
  ],
  reviewPrompt: "Phase 3 closes with Irenaeus on the consummation. Synthesize: how does Recapitulation (ἀνακεφαλαίωσις) hold creation, redemption, and glory together?",
  celebrationStats: [
    "Phase 3 complete — Irenaeus Against Heresies I–V finished",
    "Isaiah 40–55 (Servant Songs) studied",
    "Recapitulation theology mastered"
  ]
};

// ================ PHASE 4 — ATHANASIUS (Weeks 14–15) ================

WEEK_DATA[14] = {
  number: 14, phaseNum: 4,
  title: "Athanasius — On the Incarnation (Part 1)",
  subtitle: "Creation, Fall, and why the Word became flesh",
  days: [
    { biblical: "Hebrews 1–3 (CRITICAL — divine Son, Arian controversy ground zero)",
      patristic: "On the Incarnation ch. 1–10",
      secondary: "Weinandy, Athanasius: pp. 1–14 (Arian context)" },
    { biblical: "Hebrews 4–7 (High Priesthood)",
      patristic: "On the Incarnation ch. 11–20",
      secondary: "Weinandy: pp. 15–28 (Athanasius on the Son)" },
    { biblical: "Hebrews 8–10 (New Covenant + Sacrifice)",
      patristic: "On the Incarnation ch. 21–32",
      secondary: "Weinandy: pp. 29–45 (On the Incarnation overview)" },
    { biblical: "Hebrews 11–13",
      patristic: "On the Incarnation ch. 33–45",
      secondary: "Weinandy: pp. 46–65 (Theosis in Athanasius)" },
    { biblical: "Colossians 1–4 (ch. 1:15–20 — read slowly, twice)",
      patristic: "Review ch. 1–45",
      secondary: "Re-read Weinandy + note" }
  ],
  reviewPrompt: "Note Athanasius's famous line: 'He became man that we might become God.' Trace where this logic actually gets argued in the text.",
  celebrationStats: [
    "On the Incarnation ch. 1–45 complete",
    "Hebrews + Colossians studied",
    "Deification (θέωσις) introduced"
  ]
};

WEEK_DATA[15] = {
  number: 15, phaseNum: 4,
  title: "Athanasius — On the Incarnation (Part 2)",
  subtitle: "Resurrection, theosis, and the coherence of Athanasius's thought",
  days: [
    { biblical: "Philippians 1–2 (ch. 2:5–11 kenosis — CRITICAL, read slowly)",
      patristic: "On the Incarnation ch. 46–57",
      secondary: "Anatolios, Athanasius: pp. 1–15 (Coherence)" },
    { biblical: "Philippians 3–4",
      patristic: "On the Incarnation ch. 58–end",
      secondary: "Anatolios: pp. 16–30 (Creation + Incarnation)" },
    { biblical: "Ephesians 1–2",
      patristic: "Re-read On the Incarnation ch. 1–10 (creation + fall)",
      secondary: "Anatolios: pp. 31–45 (Soteriology)" },
    { biblical: "Ephesians 3–4",
      patristic: "Re-read On the Incarnation ch. 21–32 (argument of the cross)",
      secondary: "Anatolios: pp. 46–60 (Trinitarian theology)" },
    { biblical: "Ephesians 5–6",
      patristic: "Re-read On the Incarnation ch. 46–57 (deification)",
      secondary: "Synthesis: θέωσις thread — Athanasius in Anatolios" }
  ],
  reviewPrompt: "Write: how does Athanasius's Christology secure his doctrine of theosis? If the Son is not fully God, deification is impossible.",
  celebrationStats: [
    "Phase 4 complete — On the Incarnation mastered",
    "Philippians + Ephesians studied",
    "Nicene Christology secured"
  ]
};

// ================ PHASE 5 — BASIL + GREGORY OF NYSSA (Weeks 16–17) ================

WEEK_DATA[16] = {
  number: 16, phaseNum: 5,
  title: "Basil the Great — On the Holy Spirit",
  subtitle: "The divinity of the Spirit; homoousios applied to pneumatology",
  days: [
    { biblical: "Exodus 1–3 (Burning Bush — CRITICAL for apophatic theology)",
      patristic: "On the Holy Spirit ch. 1–6",
      secondary: "Behr, Nicene Faith Vol. 2: pp. 260–272 (Basil's pneumatology)" },
    { biblical: "Exodus 4–7",
      patristic: "On the Holy Spirit ch. 7–12",
      secondary: "Behr: pp. 273–285" },
    { biblical: "Exodus 8–10 (Plagues)",
      patristic: "On the Holy Spirit ch. 13–18",
      secondary: "Behr: pp. 286–298 (Homoousios + Spirit)" },
    { biblical: "Exodus 11–13 (Passover — typology)",
      patristic: "On the Holy Spirit ch. 19–24",
      secondary: "Behr: pp. 299–310" },
    { biblical: "1 Peter 1–5",
      patristic: "On the Holy Spirit ch. 25–30",
      secondary: "Re-read Behr + synthesis: Basil's pneumatology" }
  ],
  reviewPrompt: "Why does Basil not simply call the Spirit 'God' outright? How does this pastoral strategy still secure divine status?",
  celebrationStats: [
    "On the Holy Spirit complete",
    "Exodus 1–13 + 1 Peter studied",
    "Pneumatology grounded"
  ]
};

WEEK_DATA[17] = {
  number: 17, phaseNum: 5,
  title: "Gregory of Nyssa — Life of Moses & Making of Man",
  subtitle: "Theosis as ἐπέκτασις — perpetual striving toward God",
  days: [
    { biblical: "Exodus 14–16 (Red Sea + Manna — typology)",
      patristic: "On the Making of Man ch. 1–10 (NPNF 2.5)",
      secondary: "Louth, Origins of Christian Mystical Tradition: pp. 70–82" },
    { biblical: "Exodus 17–19 (Sinai approach — CRITICAL)",
      patristic: "On the Making of Man ch. 11–30",
      secondary: "Louth: pp. 83–95 (ἐπέκτασις — the key chapter)" },
    { biblical: "Exodus 20–21 (Decalogue)",
      patristic: "Life of Moses — Prologue + Book I",
      secondary: "Louth: pp. 96–108 (Life of Moses as spiritual itinerary)" },
    { biblical: "Exodus 22–24 (Covenant)",
      patristic: "Life of Moses — Book II (selections on ἐπέκτασις)",
      secondary: "Louth: pp. 109–115" },
    { biblical: "2 Peter 1–3 (ch. 1:4 — 'partakers of the divine nature')",
      patristic: "Write synthesis: Theosis — Athanasius → Gregory of Nyssa",
      secondary: "Re-read + finalize synthesis note" }
  ],
  reviewPrompt: "Gregory transforms Athanasius's θέωσις into ἐπέκτασις — never-arriving, always-deepening. What changes when you make theosis dynamic rather than destinational?",
  celebrationStats: [
    "Gregory of Nyssa's mystical works complete",
    "Exodus 14–24 + 2 Peter studied",
    "Phase 5 — Cappadocians 1 of 2 complete"
  ]
};

// ================ PHASE 6 — GREGORY NAZIANZEN (Weeks 18–19) ================

WEEK_DATA[18] = {
  number: 18, phaseNum: 6,
  title: "Gregory Nazianzen — Orations 27–28 (Introduction)",
  subtitle: "Who may do theology? The character of the theologian",
  days: [
    { biblical: "2 Corinthians 1–4 (ch. 3–4 — glory theology — read slowly)",
      patristic: "Introduction to the Theological Orations (NPNF 2.7)",
      secondary: "Daley, Gregory of Nazianzus: pp. 1–14 (life + context)" },
    { biblical: "2 Corinthians 5–8",
      patristic: "Oration 27 — On Theology (What Constitutes a Theologian)",
      secondary: "Daley: pp. 15–28 (Gregory as theologian)" },
    { biblical: "2 Corinthians 9–13",
      patristic: "Oration 28 — On God (Divine Unknowability)",
      secondary: "Daley: pp. 29–45 (Theological Orations overview)" },
    { biblical: "1 Thessalonians 1–5",
      patristic: "Re-read Orations 27–28 (slowly)",
      secondary: "Daley: pp. 46–60 (Trinitarian settlement)" },
    { biblical: "2 Thessalonians 1–3",
      patristic: "Note connections between Or. 28 and later apophatic tradition",
      secondary: "Re-read Daley + note" }
  ],
  reviewPrompt: "Gregory says theology requires purification. How does this reframe the task — is theology a discipline or a disposition?",
  celebrationStats: [
    "Orations 27–28 complete",
    "2 Corinthians + 1–2 Thessalonians studied",
    "Theological character established"
  ]
};

WEEK_DATA[19] = {
  number: 19, phaseNum: 6,
  title: "Gregory Nazianzen — Orations 29–31 (CRITICAL)",
  subtitle: "The Son and the Spirit; culmination of Nicene Trinitarian theology",
  days: [
    { biblical: "1 Timothy 1–3 (episcopal office)",
      patristic: "Oration 29 — On the Son",
      secondary: "Norris, Faith Gives Fullness to Reasoning: on Or. 29 (pp. 175–205)" },
    { biblical: "1 Timothy 4–6",
      patristic: "Oration 30 — On the Son (continued)",
      secondary: "Norris on Or. 30 (pp. 206–235)" },
    { biblical: "2 Timothy 1–4",
      patristic: "Oration 31 — On the Holy Spirit (slowly)",
      secondary: "Norris on Or. 31 (pp. 236–275) — read alongside primary" },
    { biblical: "Titus 1–3",
      patristic: "Re-read Orations 29 + 31",
      secondary: "Re-read Norris on Or. 31 + compare to primary" },
    { biblical: "Review + write synthesis: pastoral office as theological ground",
      patristic: "Write synthesis: Gregory's Trinitarian theology and Nicene orthodoxy",
      secondary: "Synthesis note: what does Norris show that I missed?" }
  ],
  reviewPrompt: "Oration 31 is the classic defense of the Spirit's divinity. Why is Gregory careful not to use ὁμοούσιος of the Spirit in so many words?",
  celebrationStats: [
    "Theological Orations complete (CRITICAL)",
    "Pastorals fully studied",
    "Phase 6 — Cappadocian Trinity complete"
  ]
};

// ================ PHASE 7 — CHRYSOSTOM (Weeks 20–25) ================

WEEK_DATA[20] = {
  number: 20, phaseNum: 7,
  title: "Chrysostom — On the Priesthood (Books I–III)",
  subtitle: "The pastoral office: dignity, burden, and the care of souls",
  days: [
    { biblical: "Matthew 1–3",
      patristic: "On the Priesthood Book I",
      secondary: "Kelly, Golden Mouth: pp. 1–11 (Antioch)" },
    { biblical: "Matthew 4–6 (Sermon on the Mount begins)",
      patristic: "On the Priesthood Book II",
      secondary: "Kelly: pp. 12–22" },
    { biblical: "Matthew 7–9",
      patristic: "On the Priesthood Book III",
      secondary: "Kelly: pp. 23–33 (formation)" },
    { biblical: "Matthew 10–12",
      patristic: "Re-read On the Priesthood Books I–II",
      secondary: "Kelly: pp. 34–44" },
    { biblical: "Matthew 13–14",
      patristic: "Re-read On the Priesthood Book III",
      secondary: "Kelly: pp. 45–55" }
  ],
  reviewPrompt: "Chrysostom's reluctance to be ordained is not false modesty. How does his view of the priesthood actually reshape clerical identity?",
  celebrationStats: [
    "On the Priesthood Books I–III complete",
    "Matthew 1–14 studied",
    "Pastoral theology grounded"
  ]
};

WEEK_DATA[21] = {
  number: 21, phaseNum: 7,
  title: "Chrysostom — On the Priesthood (Books IV–VI)",
  subtitle: "Preaching, defense, and the final weight of the office",
  days: [
    { biblical: "Matthew 15–17 (Transfiguration — read slowly)",
      patristic: "On the Priesthood Book IV",
      secondary: "Kelly: pp. 56–67 (priesthood + early homilies)" },
    { biblical: "Matthew 18–20",
      patristic: "On the Priesthood Book V",
      secondary: "Kelly: pp. 68–79" },
    { biblical: "Matthew 21–23",
      patristic: "On the Priesthood Book VI",
      secondary: "Kelly: pp. 80–91" },
    { biblical: "Matthew 24–25 (Eschatological discourse)",
      patristic: "Re-read On the Priesthood Book IV",
      secondary: "Kelly: pp. 92–103" },
    { biblical: "Matthew 26–28 (Passion + Resurrection)",
      patristic: "Re-read On the Priesthood Books V–VI",
      secondary: "Kelly: pp. 104–115" }
  ],
  reviewPrompt: "Books IV–VI center on preaching. How does Chrysostom understand the relationship between rhetoric and spiritual authority?",
  celebrationStats: [
    "On the Priesthood complete (all 6 books)",
    "Gospel of Matthew complete",
    "Preaching vocation clarified"
  ]
};

WEEK_DATA[22] = {
  number: 22, phaseNum: 7,
  title: "Chrysostom — Matthew Homilies (Part 1)",
  subtitle: "Early chapters of Matthew preached verse-by-verse",
  days: [
    { biblical: "Romans 1–3",
      patristic: "Homilies on Matthew 1–3 (NPNF 1.10)",
      secondary: "Kelly: pp. 116–128 (Matthew homilies context)" },
    { biblical: "Romans 4–6 (ch. 6 — baptismal theology)",
      patristic: "Homilies on Matthew 4–7",
      secondary: "Kelly: pp. 129–140" },
    { biblical: "Romans 7–8 (CRITICAL — Spirit and flesh)",
      patristic: "Homilies on Matthew 15–19",
      secondary: "Kelly: pp. 141–152" },
    { biblical: "Romans 9–11 (Israel and the Gentiles)",
      patristic: "Homilies on Matthew 25–28",
      secondary: "Kelly: pp. 153–164" },
    { biblical: "Romans 12–16",
      patristic: "Homilies on Matthew 32–34",
      secondary: "Kelly: pp. 165–175" }
  ],
  reviewPrompt: "Notice how Chrysostom moves from text to ethics in every homily. This pattern is constitutive of patristic preaching — not moralism, but theological formation.",
  celebrationStats: [
    "Matthew Homilies Part 1 complete",
    "Romans fully studied",
    "Chrysostomic preaching method grasped"
  ]
};

WEEK_DATA[23] = {
  number: 23, phaseNum: 7,
  title: "Chrysostom — Matthew Homilies (Part 2) + Isaiah 1–15",
  subtitle: "Later chapters of Matthew; the prophetic backdrop of Chrysostom's ethics",
  days: [
    { biblical: "Isaiah 1–3",
      patristic: "Homilies on Matthew 47–50",
      secondary: "Kelly: pp. 176–188 (Constantinople + politics)" },
    { biblical: "Isaiah 4–6 (Isaiah's call)",
      patristic: "Homilies on Matthew 58–60",
      secondary: "Kelly: pp. 189–200" },
    { biblical: "Isaiah 7–9 (Immanuel prophecy)",
      patristic: "Homilies on Matthew 65–67",
      secondary: "Kelly: pp. 201–212" },
    { biblical: "Isaiah 10–12",
      patristic: "Homilies on Matthew 82–85",
      secondary: "Kelly: pp. 213–224" },
    { biblical: "Isaiah 13–15",
      patristic: "Homilies on Matthew 86–90",
      secondary: "Kelly: pp. 225–235" }
  ],
  reviewPrompt: "Isaiah shapes Chrysostom's moral preaching. Watch for where care-for-the-poor themes echo the prophet directly.",
  celebrationStats: [
    "Matthew Homilies complete",
    "Isaiah 1–15 studied",
    "Prophetic-pastoral link grasped"
  ]
};

WEEK_DATA[24] = {
  number: 24, phaseNum: 7,
  title: "Chrysostom — Romans Homilies (Part 1) + Isaiah 16–28",
  subtitle: "Opening the Romans corpus; middle Isaiah",
  days: [
    { biblical: "Isaiah 16–18",
      patristic: "Homily 1 on Romans (NPNF 1.11)",
      secondary: "Kelly: pp. 236–247 (exile + crisis)" },
    { biblical: "Isaiah 19–21",
      patristic: "Homilies 2–3 on Romans",
      secondary: "Kelly: pp. 248–259" },
    { biblical: "Isaiah 22–24",
      patristic: "Homilies 4–5 on Romans",
      secondary: "Kelly: pp. 260–271" },
    { biblical: "Isaiah 25–26",
      patristic: "Homilies 6–7 on Romans",
      secondary: "Kelly: pp. 272–283" },
    { biblical: "Isaiah 27–28",
      patristic: "Homilies 8–9 on Romans",
      secondary: "Kelly: pp. 284–295" }
  ],
  reviewPrompt: "Chrysostom preached Romans while Constantinople burned around him. Note where personal crisis shapes his exegesis.",
  celebrationStats: [
    "Romans Homilies 1–9 complete",
    "Isaiah 16–28 studied",
    "Chrysostom's Romans mastered (half)"
  ]
};

WEEK_DATA[25] = {
  number: 25, phaseNum: 7,
  title: "Chrysostom — Romans Homilies (Part 2) + Isaiah 29–39",
  subtitle: "Completing the Romans series; Isaiah turning toward consolation",
  days: [
    { biblical: "Isaiah 29–30",
      patristic: "Homilies 10–12 on Romans",
      secondary: "Kelly: pp. 296–308 (death + legacy)" },
    { biblical: "Isaiah 31–33",
      patristic: "Homilies 13–14 on Romans",
      secondary: "Kelly: pp. 309–321" },
    { biblical: "Isaiah 34–35 (bridge to Isaiah 40)",
      patristic: "Homilies 15–16 on Romans",
      secondary: "Kelly: pp. 322–334" },
    { biblical: "Isaiah 36–37",
      patristic: "Re-read Homily 1 on Romans",
      secondary: "Kelly: pp. 335–347" },
    { biblical: "Isaiah 38–39",
      patristic: "Re-read Homily 8 on Romans",
      secondary: "Kelly: pp. 348–360 (final legacy)" }
  ],
  reviewPrompt: "Phase 7 closes. Synthesize Chrysostom's pastoral theology. How does preaching integrate Scripture, prayer, and social ethics into one formational practice?",
  celebrationStats: [
    "Phase 7 complete — Chrysostom mastered",
    "Isaiah 1–39 fully studied",
    "Pastoral-prophetic integration achieved"
  ]
};

// ================ PHASE 8 — INTEGRATION I (Weeks 26–28) ================

WEEK_DATA[26] = {
  number: 26, phaseNum: 8,
  title: "Integration — Church + Christology Thread",
  subtitle: "Re-reading the ecclesiological thread across Phase 1–7",
  days: [
    { biblical: "Job 1–3 (Prologue + first lament)",
      patristic: "Re-read Ignatius — Smyrnaeans",
      secondary: "Note: ecclesiology thread — Ignatius → Clement → Cyprian" },
    { biblical: "Job 4–7",
      patristic: "Re-read Cyprian — Unity of the Church (selections)",
      secondary: "Write synthesis on the ecclesial thread" },
    { biblical: "Job 29–31 (Job's defense)",
      patristic: "Re-read Irenaeus — Book III (Rule of Faith + succession)",
      secondary: "Connect Irenaeus to Tertullian's Prescription" },
    { biblical: "Job 38–39 (God's answer — CRITICAL)",
      patristic: "Re-read Tertullian — Prescription of Heretics",
      secondary: "Note Rule of Faith thread" },
    { biblical: "Job 40–42 (Conclusion + restoration)",
      patristic: "Re-read Athanasius — On the Incarnation ch. 54 (θέωσις)",
      secondary: "Write 2-page synthesis: Church + Christology threads" }
  ],
  reviewPrompt: "Write a tight 2-page synthesis tracing the Church and Christology threads across Phases 1–4. Which Fathers advance each thread most decisively?",
  celebrationStats: [
    "Ecclesiology + Christology threads integrated",
    "Job (wisdom response to suffering) studied",
    "First synthesis paper drafted"
  ]
};

WEEK_DATA[27] = {
  number: 27, phaseNum: 8,
  title: "Integration — Trinity + Theosis Thread",
  subtitle: "Re-reading the Cappadocian contribution and the theosis tradition",
  days: [
    { biblical: "Song of Songs 1–4",
      patristic: "Re-read Basil — On the Holy Spirit (ch. 22–27)",
      secondary: "Note Trinity + pneumatology thread" },
    { biblical: "Song of Songs 5–8",
      patristic: "Re-read Gregory of Nyssa — Life of Moses Book II",
      secondary: "Note theosis + ἐπέκτασις" },
    { biblical: "Sirach 1–10 (Wisdom + fear of God)",
      patristic: "Re-read Gregory Nazianzen — Oration 29",
      secondary: "Note Trinitarian structure" },
    { biblical: "Sirach 11–24 (ch. 24 — Wisdom hymn, CRITICAL)",
      patristic: "Re-read Gregory Nazianzen — Oration 31",
      secondary: "Note pneumatological apex of Phase 6" },
    { biblical: "Sirach 25–51 (selected)",
      patristic: "Re-read Chrysostom — Priesthood selections on spiritual formation",
      secondary: "Write synthesis: Trinity + theosis threads" }
  ],
  reviewPrompt: "Synthesize the Cappadocian settlement. How do Basil, Gregory of Nyssa, and Gregory Nazianzen together close the Trinitarian question?",
  celebrationStats: [
    "Trinity + theosis threads integrated",
    "Song of Songs + Sirach studied",
    "Cappadocian synthesis grasped"
  ]
};

WEEK_DATA[28] = {
  number: 28, phaseNum: 8,
  title: "Final Synthesis — Part I Complete",
  subtitle: "7–10 page paper: The Development of Orthodox Theology from the Apostolic Fathers to the Cappadocians",
  days: [
    { biblical: "Philemon + Jude",
      patristic: "Outline synthesis paper — identify 5 key doctrinal threads",
      secondary: "Review all phase notes" },
    { biblical: "Re-read Romans 8 (Spirit, theosis, adoption)",
      patristic: "Write section 1: The Apostolic Fathers and the Rule of Faith",
      secondary: "Reference: Pelikan, Behr, Minns" },
    { biblical: "Re-read John 17 (unity + glory)",
      patristic: "Write section 2: Irenaeus and Recapitulation",
      secondary: "Reference: Behr, Minns" },
    { biblical: "Re-read Colossians 1:15–20 + Philippians 2:5–11",
      patristic: "Write section 3: Athanasius and Deification",
      secondary: "Reference: Weinandy, Anatolios" },
    { biblical: "Re-read key doctrinal passages across the arc",
      patristic: "Write sections 4–5: The Cappadocians + Chrysostom's pastoral integration",
      secondary: "Finalize 7–10 page paper — Part I complete" }
  ],
  reviewPrompt: "You have completed Part I — the Nicene Arc. Take Sunday to rest deeply and read the paper aloud before Part II begins.",
  celebrationStats: [
    "Part I complete — 28 weeks, 18 Fathers",
    "7–10 page synthesis paper drafted",
    "Nicene Arc fully traced"
  ]
};

// ================ PHASE 9 — CYRIL OF ALEXANDRIA (Weeks 29–30) ================

WEEK_DATA[29] = {
  number: 29, phaseNum: 9,
  title: "Cyril of Alexandria — On the Unity of Christ (Part 1)",
  subtitle: "Against Nestorius; the Theotokos question",
  days: [
    { biblical: "Zechariah 1–6 (Night visions)",
      patristic: "On the Unity of Christ — Introduction + Part I (Dialogue Opens)",
      secondary: "McGuckin, Cyril: pp. 1–12 (historical context)" },
    { biblical: "Zechariah 7–11",
      patristic: "Part I continued — The Two Speakers",
      secondary: "McGuckin: pp. 13–25 (Nestorian controversy)" },
    { biblical: "Zechariah 12–14 (Messianic — read slowly)",
      patristic: "Part II — Against Nestorius",
      secondary: "McGuckin: pp. 26–40" },
    { biblical: "Daniel 7–9 (Son of Man vision — CRITICAL)",
      patristic: "Part II continued — The Unity of the Subject",
      secondary: "McGuckin: pp. 41–50" },
    { biblical: "Daniel 10–12",
      patristic: "Part III — Mary as Theotokos (Θεοτόκος)",
      secondary: "McGuckin: pp. 51–60" }
  ],
  reviewPrompt: "Theotokos is a Christological title, not just a Marian one. How does denying it (as Nestorius did) actually fracture Christ into two persons?",
  celebrationStats: [
    "On the Unity of Christ Parts I–III complete",
    "Zechariah + Daniel 7–12 studied",
    "Theotokos argument grounded"
  ]
};

WEEK_DATA[30] = {
  number: 30, phaseNum: 9,
  title: "Cyril of Alexandria — On the Unity of Christ (Part 2)",
  subtitle: "Communication of attributes; the one who suffered on the Cross",
  days: [
    { biblical: "Isaiah 52–53 (re-read — the Suffering Servant)",
      patristic: "Part IV — The Communication of Attributes",
      secondary: "McGuckin: pp. 61–75" },
    { biblical: "Isaiah 9, 11 (Messianic prophecies Cyril cites)",
      patristic: "Part IV continued",
      secondary: "McGuckin: pp. 76–90 (Theotokos + Hypostatic Union)" },
    { biblical: "Micah 5 + Malachi 3–4 (Cyrilline proof texts)",
      patristic: "Part V — The One Who Suffered",
      secondary: "McGuckin: pp. 91–105" },
    { biblical: "Re-read John 1:1–18 alongside Cyril's Christology",
      patristic: "Re-read key sections on Theotokos + Hypostatic Union",
      secondary: "McGuckin: pp. 106–120" },
    { biblical: "Write synthesis: OT prophecy and the Hypostatic Union",
      patristic: "Write doctrinal synthesis: Cyril vs. Nestorius",
      secondary: "McGuckin: pp. 121–130 + synthesis note" }
  ],
  reviewPrompt: "Cyril's great line: 'one nature of the Word incarnate.' How does this formula hold divinity and humanity together without confusion — and what did Chalcedon need to add?",
  celebrationStats: [
    "On the Unity of Christ complete",
    "Cyril's Christology mastered",
    "Phase 9 complete"
  ]
};

// ================ PHASE 10 — LEO THE GREAT (Week 31) ================

WEEK_DATA[31] = {
  number: 31, phaseNum: 10,
  title: "Leo the Great — The Tome",
  subtitle: "Chalcedon's defining Christological statement; two natures, one person",
  days: [
    { biblical: "Ezekiel 1–2 (Throne vision — tetramorph/Gospel symbolism)",
      patristic: "Letter 28 — The Tome of Leo (read slowly, twice)",
      secondary: "Neil, Leo the Great: pp. 1–20 (Leo's context + Tome)" },
    { biblical: "Ezekiel 10 + Genesis 3:15 (Protoevangelium)",
      patristic: "Letter 28 — Re-read + annotate Christological statements",
      secondary: "Neil: pp. 21–40 (Chalcedonian definition)" },
    { biblical: "Ezekiel 36–37 (new heart + dry bones — pneumatological resurrection)",
      patristic: "Sermon 21 — On the Nativity",
      secondary: "Sellers, Council of Chalcedon: pp. 1–25" },
    { biblical: "Numbers 21 + John 3:14 (bronze serpent typology)",
      patristic: "Sermon 54 — On the Passion",
      secondary: "Sellers: pp. 26–50 (Cyril + Leo as unified movement)" },
    { biblical: "Write synthesis: Leo + typological argument for Chalcedon",
      patristic: "Write synthesis: From Cyril to Chalcedon — one theological movement",
      secondary: "Re-read Neil + final synthesis note" }
  ],
  reviewPrompt: "The Tome declares each nature acts according to its own properties while remaining united in one Person. How is this both Cyrilline AND new?",
  celebrationStats: [
    "The Tome + key sermons complete",
    "Ezekiel vision texts studied",
    "Chalcedon grounded"
  ]
};

// ================ PHASE 11 — PSEUDO-DIONYSIUS (Weeks 32–33) ================

WEEK_DATA[32] = {
  number: 32, phaseNum: 11,
  title: "Pseudo-Dionysius — Mystical Theology + Divine Names",
  subtitle: "The apophatic grammar of the Orthodox tradition",
  days: [
    { biblical: "Exodus 33–34 (Moses and divine glory — CRITICAL, read twice)",
      patristic: "Mystical Theology (complete — it is short; read twice)",
      secondary: "Louth, Denys the Areopagite: pp. 1–14 (Who is Dionysius?)" },
    { biblical: "1 Kings 18 (Elijah on Carmel)",
      patristic: "Divine Names ch. 1–4",
      secondary: "Louth: pp. 15–28 (Divine Names commentary)" },
    { biblical: "1 Kings 19 (Still small voice — CRITICAL)",
      patristic: "Divine Names ch. 5–7",
      secondary: "Louth: pp. 29–43 (Mystical Theology commentary)" },
    { biblical: "Ecclesiastes 1–6",
      patristic: "Divine Names ch. 8–13",
      secondary: "Louth: pp. 44–56 (Celestial Hierarchy preview)" },
    { biblical: "Ecclesiastes 7–12",
      patristic: "Re-read Mystical Theology in light of Divine Names",
      secondary: "Louth: pp. 57–60 + re-read" }
  ],
  reviewPrompt: "Dionysius's method: affirm, then negate, then negate the negation. Try this with a divine attribute of your choice and see where it lands.",
  celebrationStats: [
    "Mystical Theology + Divine Names complete",
    "Exodus 33–34 + Elijah texts + Ecclesiastes studied",
    "Apophatic grammar introduced"
  ]
};

WEEK_DATA[33] = {
  number: 33, phaseNum: 11,
  title: "Pseudo-Dionysius — Hierarchies",
  subtitle: "Celestial and Ecclesiastical Hierarchy; the liturgical cosmos",
  days: [
    { biblical: "Job 38–39 (re-read in Dionysian light)",
      patristic: "Celestial Hierarchy ch. 1–5",
      secondary: "Louth: pp. 61–75" },
    { biblical: "Job 40–42",
      patristic: "Celestial Hierarchy ch. 6–15",
      secondary: "Louth: pp. 76–90" },
    { biblical: "Re-read Exodus 3:1–6 (burning bush)",
      patristic: "Ecclesiastical Hierarchy ch. 1–3 (liturgical theology)",
      secondary: "Louth: pp. 91–110" },
    { biblical: "Re-read Exodus 20:18–21 (darkness at Sinai)",
      patristic: "Ecclesiastical Hierarchy ch. 4–7",
      secondary: "Louth, Origins: Ch. 6 pp. 155–166 (apophatic tradition)" },
    { biblical: "Write synthesis: biblical roots of negative theology",
      patristic: "Write synthesis: Apophatic vs. Cataphatic — how Dionysius balances them",
      secondary: "Louth, Origins: pp. 167–178 + synthesis note" }
  ],
  reviewPrompt: "The Dionysian hierarchies are about participation, not subordination. How does hierarchy become the structure through which deification happens?",
  celebrationStats: [
    "Pseudo-Dionysius corpus complete",
    "Wisdom + Exodus re-readings integrated",
    "Phase 11 complete"
  ]
};

// ================ PHASE 12 — MAXIMUS THE CONFESSOR (Weeks 34–36) ================

WEEK_DATA[34] = {
  number: 34, phaseNum: 12,
  title: "Maximus the Confessor — Two Hundred Chapters (I–II)",
  subtitle: "Foundations of Maximian theology; divine incomprehensibility and logoi",
  days: [
    { biblical: "Song of Songs 1–4 (re-read — soul's ascent)",
      patristic: "Two Hundred Chapters — Century I (ch. 1–50)",
      secondary: "Louth, Maximus the Confessor: pp. 1–15 (life + Monothelite crisis)" },
    { biblical: "Song of Songs 5–8",
      patristic: "Century I continued (re-read key chapters)",
      secondary: "Louth: pp. 16–30 (two wills in context)" },
    { biblical: "Jeremiah 1–5 (prophetic calling + suffering)",
      patristic: "Century II (ch. 51–100)",
      secondary: "Louth: pp. 31–45 (Cosmic Christology)" },
    { biblical: "Jeremiah 31 (New Covenant — CRITICAL)",
      patristic: "Century II continued",
      secondary: "Louth: pp. 46–60 (theosis in Maximus)" },
    { biblical: "Jeremiah 38 + 52 (Jeremiah's passion — prophet suffering)",
      patristic: "Write synthesis: Maximus on the divine and human wills",
      secondary: "Re-read Louth + note" }
  ],
  reviewPrompt: "Maximus reads Song of Songs as the soul's ascent. Notice how Dionysian apophasis + Gregorian ἐπέκτασις converge in his reading.",
  celebrationStats: [
    "Two Hundred Chapters I–II complete",
    "Song of Songs + Jeremiah studied",
    "Maximian vocabulary introduced"
  ]
};

WEEK_DATA[35] = {
  number: 35, phaseNum: 12,
  title: "Maximus the Confessor — Two Hundred Chapters (III–IV) + Transfiguration",
  subtitle: "Completing the Centuries; Transfiguration as icon of theosis",
  days: [
    { biblical: "Matthew 17 (Transfiguration — read slowly, twice)",
      patristic: "Century III (ch. 101–150)",
      secondary: "Louth: pp. 61–75" },
    { biblical: "Matthew 16:13–28 (context for Transfiguration)",
      patristic: "Century III continued",
      secondary: "Louth: pp. 76–90" },
    { biblical: "Re-read John 17 (now as Maximus reads it — eternal union of wills)",
      patristic: "Century IV (ch. 151–200)",
      secondary: "Louth: pp. 91–105" },
    { biblical: "Romans 8:18–30 (re-read — ἐπέκτασις and glorification)",
      patristic: "Century IV continued",
      secondary: "Louth: pp. 106–120" },
    { biblical: "Write synthesis: Transfiguration as icon of theosis — Athanasius to Maximus",
      patristic: "Write synthesis: Theosis — Athanasius vs. Maximus",
      secondary: "Synthesis note on ἐπέκτασις" }
  ],
  reviewPrompt: "The Transfiguration shows uncreated light in visible form. How does Maximus use this to ground his theology of the divine energies?",
  celebrationStats: [
    "Two Hundred Chapters complete",
    "Transfiguration texts integrated",
    "Theosis tradition traced from Athanasius forward"
  ]
};

WEEK_DATA[36] = {
  number: 36, phaseNum: 12,
  title: "Maximus — Cosmic Christology + Gethsemane (CRITICAL)",
  subtitle: "The two wills of Christ; the biblical ground of dyothelitism",
  days: [
    { biblical: "Matthew 26:36–46 (Gethsemane — CRITICAL for two wills)",
      patristic: "On the Cosmic Mystery — Letter to Thalassius (selections)",
      secondary: "Thunberg, Man and the Cosmos: pp. 1–15 (anthropology)" },
    { biblical: "Luke 22:39–46 (Gethsemane — 'not my will but yours')",
      patristic: "Ambigua — On the Transfiguration",
      secondary: "Thunberg: pp. 16–30 (Image and likeness)" },
    { biblical: "Hebrews 5:7–10 (Christ learned obedience — CRITICAL)",
      patristic: "Ambigua — On the union of the two natures",
      secondary: "Thunberg: pp. 31–45 (Cosmic mediation)" },
    { biblical: "Re-read Philippians 2:5–11 (now with full Maximian Christology)",
      patristic: "Re-read Athanasius On the Incarnation ch. 1–10 alongside Maximus",
      secondary: "Thunberg: pp. 46–60 (Gethsemane + the two wills)" },
    { biblical: "Write synthesis: Gethsemane + the two wills — biblical ground of Maximus",
      patristic: "Write synthesis: The full arc — Irenaeus → Athanasius → Maximus on recapitulation and theosis",
      secondary: "Re-read Thunberg + synthesis: Maximus as fullness of theosis tradition" }
  ],
  reviewPrompt: "Why did the Church need dyothelitism? What would it cost Christology if Christ had only a divine will? (Think: Maximus lost his hands for this answer.)",
  celebrationStats: [
    "Phase 12 complete — Maximus mastered",
    "Gethsemane texts integrated",
    "Dyothelitism biblically grounded"
  ]
};

// ================ PHASE 13 — JOHN OF DAMASCUS (Weeks 37–38) ================

WEEK_DATA[37] = {
  number: 37, phaseNum: 13,
  title: "John of Damascus — Exact Exposition (Books I–II)",
  subtitle: "The summa of patristic theology; God and creation",
  days: [
    { biblical: "Re-read Genesis 1–2 (now as Damascus reads it)",
      patristic: "Exact Exposition — Book I (On God, ch. 1–14)",
      secondary: "Louth, St John Damascene: pp. 1–15 (synthesizer of tradition)" },
    { biblical: "Re-read John 1:1–18 (full Christological arc, Ignatius to Damascus)",
      patristic: "Book I continued (ch. 15–end)",
      secondary: "Louth: pp. 16–30 (Exact Exposition as systematic)" },
    { biblical: "Exodus 20:1–6 + Deuteronomy 4:15–20 (image prohibition)",
      patristic: "Book II — On Creation (ch. 1–12)",
      secondary: "Louth: pp. 31–45 (Trinitarian theology in John)" },
    { biblical: "Psalm 22, 45, 110 (three key Christological Psalms)",
      patristic: "Book II continued (ch. 13–end)",
      secondary: "Louth: pp. 46–60 (Christology in John)" },
    { biblical: "Romans 11:33–36 (doxology — close of the Pauline arc)",
      patristic: "Write synthesis: how John organizes Trinitarian theology after the Cappadocians",
      secondary: "Re-read Louth + note" }
  ],
  reviewPrompt: "Notice how everything you've read for 37 weeks surfaces in the Exact Exposition. Damascus doesn't invent — he arranges. What does that teach about Tradition?",
  celebrationStats: [
    "Exact Exposition Books I–II complete",
    "Foundation texts re-integrated",
    "Systematic summary engaged"
  ]
};

WEEK_DATA[38] = {
  number: 38, phaseNum: 13,
  title: "John of Damascus — Christology + Icons",
  subtitle: "Book III on the Incarnation; On Holy Images as the patristic conclusion",
  days: [
    { biblical: "Re-read Colossians 1:15–20 (the whole course in one passage)",
      patristic: "Book III — On the Incarnation (ch. 1–10) — CRITICAL",
      secondary: "Louth: pp. 61–75 (Icon theology)" },
    { biblical: "Re-read Hebrews 1:1–4 (God 'spoke in these last days by his Son')",
      patristic: "Book III continued (ch. 11–end)",
      secondary: "Louth: pp. 76–90 (προσκύνησις vs. λατρεία)" },
    { biblical: "Re-read John 17:20–26 (unity, glory, indwelling)",
      patristic: "Book IV — On the Sacraments + Icons (ch. 1–10)",
      secondary: "Louth: pp. 91–105 (John and the Iconoclast controversy)" },
    { biblical: "Re-read Revelation 21–22 (New Creation — end of the arc)",
      patristic: "On Holy Images — First Oration",
      secondary: "Louth: pp. 106–120 (John as patristic conclusion)" },
    { biblical: "Write synthesis: Scripture through the eyes of the Fathers",
      patristic: "Write final patristic synthesis: John of Damascus as patristic conclusion",
      secondary: "Re-read Louth + final synthesis note" }
  ],
  reviewPrompt: "The patristic era closes here. How has your reading of Scripture changed across 38 weeks? Write this down before Phase 14 begins.",
  celebrationStats: [
    "Phase 13 complete — John of Damascus finished",
    "Icon theology grounded",
    "23 Fathers read across the program"
  ]
};

// ================ PHASE 14 — INTEGRATION II + FINAL SYNTHESIS (Weeks 39–40) ================

WEEK_DATA[39] = {
  number: 39, phaseNum: 14,
  title: "Integration II — The Full Arc",
  subtitle: "Re-reading key passages across 39 weeks; outlining the final synthesis paper",
  days: [
    { biblical: "Re-read John 1 + Philippians 2:5–11 + Colossians 1:15–20 (Christological core)",
      patristic: "Re-read Ignatius — Smyrnaeans + Cyril — On the Unity of Christ (Theotokos thread)",
      secondary: "Review doctrinal notes across Part I + Part II" },
    { biblical: "Re-read Romans 8 + 2 Peter 1:4 (theosis core)",
      patristic: "Re-read Athanasius — On the Incarnation ch. 54 (θέωσις) + Maximus (ἐπέκτασις)",
      secondary: "Review doctrinal notes on theosis" },
    { biblical: "Re-read John 17 + Hebrews 1:1–4 (Trinitarian unity + Christological center)",
      patristic: "Re-read Gregory Nazianzen — Oration 29 + Leo — Tome (Trinity → Christology bridge)",
      secondary: "Review Trinitarian + Christological notes" },
    { biblical: "Re-read key Psalms (22, 45, 110) + Isaiah 53",
      patristic: "Re-read John of Damascus — Book III ch. 1–5 (the synthesis)",
      secondary: "Review final synthesis elements" },
    { biblical: "Outline — identify 5 passages most illuminated by the Fathers",
      patristic: "Outline final synthesis paper — full arc from Didache to Damascus",
      secondary: "Review all phase notes + outline paper" }
  ],
  reviewPrompt: "This is your final review. Read the program back through your own eyes. Where did you most underestimate what a Father was doing? Note it.",
  celebrationStats: [
    "Full patristic arc re-integrated",
    "Final synthesis paper outlined",
    "Ready for Week 40"
  ]
};

WEEK_DATA[40] = {
  number: 40, phaseNum: 14,
  title: "Final Synthesis — Course Complete",
  subtitle: "Writing the final 7–10 page synthesis paper; completing the formation",
  days: [
    { biblical: "Re-read the 5 passages most illuminated by the Fathers",
      patristic: "Write section 1 of final synthesis: From Apostolic Witness to Damascene Synthesis — the Christological Arc",
      secondary: "Reference: Pelikan, Behr, McGuckin, Louth" },
    { biblical: "Continue reference readings",
      patristic: "Write section 2: The Trinitarian and Theosis threads",
      secondary: "Reference: Anatolios, Norris, Thunberg" },
    { biblical: "Continue reference readings",
      patristic: "Write section 3: The ecclesial and mystical synthesis",
      secondary: "Reference: Brent, Louth (Denys + Maximus)" },
    { biblical: "Re-read closing passages: Revelation 21–22 (New Creation)",
      patristic: "Write sections 4–5: Scripture in the Fathers + How the Fathers read the Bible",
      secondary: "Finalize synthesis + reference list" },
    { biblical: "Final read-through — the Bible as the Fathers received it",
      patristic: "Finalize 7–10 page synthesis paper — COURSE COMPLETE",
      secondary: "Re-read the paper aloud — does it hold?" }
  ],
  reviewPrompt: "You have entered the mind of the Fathers. Read Psalm 150 today. Offer the 40 weeks back as thanksgiving.",
  celebrationStats: [
    "COURSE COMPLETE — 40 weeks finished",
    "23 Church Fathers read; 700 years of theology traced",
    "Final synthesis paper delivered"
  ]
};

// ==================================================================
// PHASE_DATA — 14 phases, each with Greek terms + metadata
// ==================================================================
const PHASE_DATA = {
  1: { number: 1, name: 'Apostolic Fathers', weeks: [1, 2, 3, 4],
       fathers: 'Ignatius · Polycarp · Clement of Rome · Papias · Barnabas · Hermas · Diognetus · Didache',
       primaryText: 'Holmes, The Apostolic Fathers',
       biblicalTrack: 'Gospel of John · 1 Corinthians · Catholic Epistles',
       greek: ['ἐπίσκοπος (bishop)', 'σάρξ (flesh)', 'ἕνωσις (unity)', 'δύο ὁδοί (two ways)'] },
  2: { number: 2, name: 'Justin Martyr', weeks: [5, 6],
       fathers: 'Justin Martyr',
       primaryText: 'First Apology · Second Apology · Dialogue with Trypho',
       biblicalTrack: 'Gospel of Mark · Proverbs · Wisdom of Solomon',
       greek: ['λόγος (Logos)', 'ἀλήθεια (truth)', 'σπερματικὸς λόγος (seed Logos)'] },
  '2.5': { number: '2.5', name: 'Tertullian + Cyprian', weeks: [7, 8],
       fathers: 'Tertullian · Cyprian of Carthage',
       primaryText: 'Prescription of Heretics · Against Praxeas · Unity of the Church',
       biblicalTrack: 'Acts · Galatians · James',
       greek: ['trinitas (Trinity)', 'substantia (substance)', 'persona (person)', 'unitas (unity)', 'episcopus (bishop)'] },
  3: { number: 3, name: 'Irenaeus', weeks: [9, 10, 11, 12, 13],
       fathers: 'Irenaeus of Lyons',
       primaryText: 'Against Heresies (Books I–V)',
       biblicalTrack: 'Genesis 1–11 · Luke · Revelation · Isaiah 40–55',
       greek: ['ἀνακεφαλαίωσις (recapitulation)', 'εἰκών (image)'] },
  4: { number: 4, name: 'Athanasius', weeks: [14, 15],
       fathers: 'Athanasius the Great',
       primaryText: 'On the Incarnation',
       biblicalTrack: 'Hebrews · Colossians · Philippians · Ephesians',
       greek: ['φθορά (corruption)', 'ἀφθαρσία (incorruption)', 'θέωσις (deification)'] },
  5: { number: 5, name: 'Basil + Gregory of Nyssa', weeks: [16, 17],
       fathers: 'Basil the Great · Gregory of Nyssa',
       primaryText: 'On the Holy Spirit · Life of Moses · On the Making of Man',
       biblicalTrack: 'Exodus 1–24 · 1–2 Peter',
       greek: ['οὐσία (essence)', 'ὑπόστασις (person)', 'πνεῦμα (Spirit)', 'ἐπέκτασις (perpetual striving)', 'γνόφος (divine darkness)'] },
  6: { number: 6, name: 'Gregory Nazianzen', weeks: [18, 19],
       fathers: 'Gregory of Nazianzus',
       primaryText: 'Theological Orations (27–31)',
       biblicalTrack: '2 Corinthians · 1–2 Thessalonians · Pastorals',
       greek: ['θεολογία (theology)', 'φύσις (nature)', 'σχέσις (relation)'] },
  7: { number: 7, name: 'Chrysostom', weeks: [20, 21, 22, 23, 24, 25],
       fathers: 'John Chrysostom',
       primaryText: 'On the Priesthood · Homilies on Matthew · Homilies on Romans',
       biblicalTrack: 'Matthew · Romans · Isaiah 1–39',
       greek: ['μετάνοια (repentance)', 'ἐλεημοσύνη (almsgiving)', 'δικαιοσύνη (righteousness)'] },
  8: { number: 8, name: 'Integration I', weeks: [26, 27, 28],
       fathers: 'Synthesis of Part I — all 7 phases re-read',
       primaryText: 'Re-reading Phases 1–7 · Final synthesis paper',
       biblicalTrack: 'Job · Song of Songs · Sirach',
       greek: [] },
  9: { number: 9, name: 'Cyril of Alexandria', weeks: [29, 30],
       fathers: 'Cyril of Alexandria',
       primaryText: 'On the Unity of Christ',
       biblicalTrack: 'Zechariah · Daniel 7–12 · Isaiah 52–53',
       greek: ['Θεοτόκος (God-bearer)', 'ὑπόστασις (hypostasis)', "ἕνωσις καθ' ὑπόστασιν (hypostatic union)", 'ἀντίδοσις (comm. of attributes)'] },
  10: { number: 10, name: 'Leo the Great', weeks: [31],
       fathers: 'Leo the Great',
       primaryText: 'The Tome · Sermons on the Nativity + Passion',
       biblicalTrack: 'Ezekiel (Throne + Dry Bones) · Typological texts',
       greek: ['natura (nature)', 'persona (person)', 'duae naturae, una persona'] },
  11: { number: 11, name: 'Pseudo-Dionysius', weeks: [32, 33],
       fathers: 'Pseudo-Dionysius the Areopagite',
       primaryText: 'Mystical Theology · Divine Names · Celestial + Ecclesiastical Hierarchy',
       biblicalTrack: 'Exodus 33–34 · 1 Kings 18–19 · Ecclesiastes · Job 38–42',
       greek: ['ἀποφατική (apophatic)', 'καταφατική (cataphatic)', 'ὑπεράγνωστος (beyond knowing)', 'ἱεραρχία (sacred order)'] },
  12: { number: 12, name: 'Maximus the Confessor', weeks: [34, 35, 36],
       fathers: 'Maximus the Confessor',
       primaryText: 'Two Hundred Chapters on Theology · Ambigua · Letter to Thalassius',
       biblicalTrack: 'Song of Songs · Jeremiah · Matthew 17 · Gethsemane texts',
       greek: ['θέλημα (will)', 'ἐνέργεια (energy)', 'λόγοι (divine reasons)', 'σκοπός (purpose)', 'ἐπέκτασις (perpetual striving)'] },
  13: { number: 13, name: 'John of Damascus', weeks: [37, 38],
       fathers: 'John of Damascus',
       primaryText: 'Exact Exposition of the Orthodox Faith · On Holy Images',
       biblicalTrack: 'Re-integration of core texts · Image theology (Exodus 20 · Deut 4)',
       greek: ['περιχώρησις (perichoresis)', 'ἐνυπόστατος (enhypostaton)', 'προσκύνησις / λατρεία (veneration / worship)'] },
  14: { number: 14, name: 'Integration II + Final Synthesis', weeks: [39, 40],
       fathers: 'Synthesis of full 40 weeks',
       primaryText: 'Re-reading key texts across the arc',
       biblicalTrack: 'Full biblical arc re-integrated · Revelation 21–22',
       greek: [] }
};

function getPhaseForWeek(weekNum) {
  for (const key in PHASE_DATA) {
    if (PHASE_DATA[key].weeks.includes(weekNum)) return PHASE_DATA[key];
  }
  return null;
}

// ==================================================================
// STUDY_STATE — runtime configuration, localStorage-backed
// ==================================================================
const STUDY_STATE = {
  get currentWeek() {
    const n = parseInt(localStorage.getItem('studyCurrentWeek') || '1', 10);
    return (isNaN(n) || n < 1 || n > 40) ? 1 : n;
  },
  set currentWeek(n) {
    localStorage.setItem('studyCurrentWeek', String(n));
  },
  get progressKey() { return `studyProgress_week${this.currentWeek}`; },
  get completeKey() { return `week${this.currentWeek}Complete`; },
  ensureWeekStart(n) {
    const key = `weekStart_week${n}`;
    if (!localStorage.getItem(key)) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      localStorage.setItem(key, today.toISOString());
    }
  },
  getWeekStart(n) {
    const key = `weekStart_week${n}`;
    const stored = localStorage.getItem(key);
    if (stored) return new Date(stored);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    localStorage.setItem(key, today.toISOString());
    return today;
  }
};

// ==================================================================
// HELPERS
// ==================================================================

// Psalms follow a canonical rate: 3 per day × 6 reading days per week.
// Week 1 D1 = Psalms 1–3. Cycle wraps at 150 (approx. every 8.3 weeks).
function psalmRange(weekNum, dayIdx) {
  if (dayIdx < 0 || dayIdx > 5) return null; // D7 rest has no psalms
  const dayN = (weekNum - 1) * 6 + dayIdx; // 0-indexed total study days
  const start = ((dayN * 3) % 150) + 1;
  const end = start + 2 > 150 ? (start + 2) - 150 : start + 2;
  if (end < start) return `Psalms ${start}–150, 1–${end}`; // Wrap (rare at boundary)
  return `Psalms ${start}–${end}`;
}

const DAY_LABELS = [
  'Day 1 (Start)',
  'Day 2',
  'Day 3',
  'Day 4',
  'Day 5 (Final Reading)',
  'Day 6 (Review)',
  'Day 7 (Rest)'
];
function getDayLabel(dayIdx) {
  return DAY_LABELS[dayIdx] || `Day ${dayIdx + 1}`;
}

function computeTodayDayIdx() {
  const week = STUDY_STATE.currentWeek;
  const startDate = STUDY_STATE.getWeekStart(week);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffMs = today - startDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 0;
  if (diffDays > 6) return 6;
  return diffDays;
}
// ==================================================================
// BOOKS_COMPLETED_BY_WEEK — NT book finish points
// An NT book counts as complete only when:
//   (1) Its final chapter appears in a week's readings, AND
//   (2) localStorage has `week{N}Complete` set (user actually finished the week)
// Total = 27 books across the syllabus. Every NT book is covered.
// ==================================================================
const BOOKS_COMPLETED_BY_WEEK = {
  2:  ['John'],
  3:  ['1 John', '2 John', '3 John'],
  4:  ['1 Corinthians'],
  5:  ['Mark'],
  7:  ['Acts'],
  8:  ['Galatians', 'James'],
  11: ['Luke'],
  12: ['Revelation'],
  14: ['Hebrews', 'Colossians'],
  15: ['Philippians', 'Ephesians'],
  16: ['1 Peter'],
  17: ['2 Peter'],
  18: ['2 Corinthians', '1 Thessalonians', '2 Thessalonians'],
  19: ['1 Timothy', '2 Timothy', 'Titus'],
  21: ['Matthew'],
  22: ['Romans'],
  28: ['Philemon', 'Jude']
};

const NT_TOTAL_BOOKS = 27; // True count of NT books — tracker shows honest target

function countCompletedBooks() {
  let count = 0;
  for (const wk in BOOKS_COMPLETED_BY_WEEK) {
    if (localStorage.getItem(`week${wk}Complete`)) {
      count += BOOKS_COMPLETED_BY_WEEK[wk].length;
    }
  }
  return count;
}

// Psalms: 3/day × 6 reading days × N weeks = 18 × N psalms by end of week N.
// Cycles through 150 psalms — program completes ~4.8 full passes across 40 weeks.
function computePsalmsRead() {
  const currentWeek = STUDY_STATE.currentWeek;
  return Math.max(0, (currentWeek - 1) * 18);
}

function formatPsalmsDisplay(total) {
  if (total === 0) return { text: 'Starting Psalter', fillPct: 0 };
  const psalm = ((total - 1) % 150) + 1;
  const pass = Math.floor((total - 1) / 150) + 1;
  const fillPct = (psalm / 150) * 100;
  return {
    text: `Psalm ${psalm} of 150 — Pass ${pass}`,
    fillPct
  };
}


// ==================================================================
// FATHER_PAGES — graceful linking map
// Maps a Father's display name to the URL of their detail page.
// Entries are added ONLY when a real page exists. Where no entry exists,
// `linkifyPatristic()` leaves the reading text as plain text (no
// broken links, no placeholder content). Add a line here as each Father
// page is built and links appear automatically across all 40 weeks.
// ==================================================================
const FATHER_PAGES = {
  'Ignatius of Antioch': 'ignatius-of-antioch.html',
  'Polycarp of Smyrna': 'polycarp-of-smyrna.html'
  // 'Clement of Rome': 'clement-of-rome.html',
  // ...add as pages are built
};

// Detect a matchable Father name inside a patristic reading string.
// Returns the URL if a FATHER_PAGES match is found, or null.
function fatherPageForReading(readingText) {
  if (!readingText) return null;
  for (const [fullName, url] of Object.entries(FATHER_PAGES)) {
    // Match the first name (before "of") as a whole word.
    // e.g. "Ignatius of Antioch" -> look for "Ignatius" in reading.
    const firstName = fullName.split(/\s+of\s+/)[0];
    const regex = new RegExp(`\\b${firstName}\\b`, 'i');
    if (regex.test(readingText)) return url;
  }
  return null;
}

// Wrap the patristic reading text in an <a> tag if a Father page exists.
// Used by the dashboard's renderers. Returns safe HTML (text is trusted).
function linkifyPatristic(readingText) {
  const url = fatherPageForReading(readingText);
  if (!url) return readingText;
  return `<a href="${url}" class="patristic-link">${readingText}</a>`;
}

// Check whether a given Father (by full display name) is covered in
// the current phase's syllabus. Used by father-cards-index.html to
// mark current-week Father cards. Matches against the `fathers` token
// list in PHASE_DATA, split on ' · '. Handles both short tokens
// ("Ignatius") matching full names ("Ignatius of Antioch") and full
// tokens ("Clement of Rome") matching disambiguated names.
function isFatherInPhase(fatherName, phase) {
  if (!phase || !phase.fathers) return false;
  const nameL = fatherName.toLowerCase();
  const tokens = phase.fathers.split(' · ').map(t => t.trim().toLowerCase());
  return tokens.some(token => {
    if (!token) return false;
    // If token is a single word, match it as a standalone first name.
    // If token is multi-word ("Clement of Rome"), require exact prefix or substring.
    if (!token.includes(' ')) {
      const regex = new RegExp(`\\b${token}\\b`, 'i');
      return regex.test(nameL);
    }
    return nameL.startsWith(token) || nameL.includes(token);
  });
}

// ==================================================================
// LEXICON_ENTRIES — detailed Greek term reference, keyed by Greek script.
// Extends PHASE_DATA[N].greek (which is the short "focus terms" list
// shown in the dashboard's Phase Greek panel). LEXICON_ENTRIES is the
// full scholarly lexicon — each entry tagged with its phase.
//
// Add terms here as Kevin expands the lexicon toward its 800+ target.
// Each entry appears automatically in its phase section in
// greek-lexicon-index.html and enriches the focus-term display where
// it matches a term already listed in PHASE_DATA[N].greek.
// ==================================================================
const LEXICON_ENTRIES = {
  'σάρξ': {
    transliteration: 'sarx', english: 'Flesh',
    definition: 'Physical flesh, human nature. Ignatius emphasized the reality of Christ\'s σάρξ against Docetic denials of the Incarnation.',
    etymology: 'From root meaning "to strip, flay"',
    phase: 1, fathers: ['Ignatius of Antioch'], connection: 'Anti-Docetic Christology', letter: 'Σ'
  },
  'ἕνωσις': {
    transliteration: 'henosis', english: 'Unity',
    definition: 'Unity, union. In Ignatius, the essential unity of the Church under the bishop, reflecting divine unity.',
    etymology: 'From ἕν (one) + -ωσις (action suffix)',
    phase: 1, fathers: ['Ignatius of Antioch'], connection: 'Ecclesial Unity under Episcopal Authority', letter: 'Ε'
  },
  'ἐπίσκοπος': {
    transliteration: 'episkopos', english: 'Overseer, Bishop',
    definition: 'Overseer, superintendent. Ignatius developed the theology of the bishop as center of Church unity and legitimate authority.',
    etymology: 'From ἐπί (over) + σκοπός (watcher)',
    phase: 1, fathers: ['Ignatius of Antioch'], connection: 'Foundational Episcopal Theology', letter: 'Ε'
  },
  'μαρτυρία': {
    transliteration: 'martyria', english: 'Witness, Martyrdom',
    definition: 'Witness, testimony. Evolved from simple witness to blood witness (martyrdom) as ultimate Christian testimony.',
    etymology: 'From μάρτυς (witness)',
    phase: 1, fathers: ['Polycarp of Smyrna'], connection: 'Martyrdom as Supreme Witness', letter: 'Μ'
  },
  'Θεοφόρος': {
    transliteration: 'Theophoros', english: 'God-Bearer',
    definition: 'God-bearer. Ignatius\'s self-designation, indicating one who carries God or is carried by God.',
    etymology: 'From θεός (God) + φόρος (bearing)',
    phase: 1, fathers: ['Ignatius of Antioch'], connection: 'Spiritual Identity in Christ', letter: 'Θ'
  },
  'φάρμακον ἀθανασίας': {
    transliteration: 'pharmakon athanasias', english: 'Medicine of Immortality',
    definition: 'Medicine of immortality. Ignatius\'s famous description of the Eucharist as the antidote to death.',
    etymology: 'From φάρμακον (drug/medicine) + ἀθάνατος (deathless)',
    phase: 1, fathers: ['Ignatius of Antioch'], connection: 'Eucharistic Theology', letter: 'Φ'
  },
  'ἐκκλησία': {
    transliteration: 'ekklesia', english: 'Church, Assembly',
    definition: 'Called-out assembly. The community of believers gathered in Christ\'s name.',
    etymology: 'From ἐκ (out) + καλεῖν (to call)',
    phase: 1, fathers: ['Clement of Rome'], connection: 'Early Church Organization', letter: 'Ε'
  },
  'ἀγάπη': {
    transliteration: 'agape', english: 'Love',
    definition: 'Divine love, self-sacrificing love. Distinguished from ἔρως (passionate love) and φιλία (friendship).',
    etymology: 'Root uncertain, possibly from ἀγάπαω (to love)',
    phase: 1, fathers: ['Clement of Rome'], connection: 'Christian Community Foundation', letter: 'Α'
  },
  'ἀπόστολος': {
    transliteration: 'apostolos', english: 'Apostle, Sent One',
    definition: 'One sent forth with authority. Originally applied to the Twelve, later extended to others like Paul.',
    etymology: 'From ἀπό (from) + στέλλω (to send)',
    phase: 1, fathers: ['Clement of Rome'], connection: 'Apostolic Authority & Succession', letter: 'Α'
  },
  'ὁμονοία': {
    transliteration: 'homonoia', english: 'Concord, Harmony',
    definition: 'Like-mindedness, concord. Essential virtue for Church unity and peace in community.',
    etymology: 'From ὁμο- (same) + νοῦς (mind)',
    phase: 1, fathers: ['Clement of Rome'], connection: 'Church Peace & Order', letter: 'Ο'
  },
  // --- Ignatius cluster (Phase 1) ---
  'μαρτύριον': {
    transliteration: 'martyrion', english: 'Martyrdom, Testimony',
    definition: 'The act or fact of martyrdom — related to μαρτυρία (witness) but specifically denotes the suffering itself. Ignatius and Polycarp both use μαρτύριον to name the crown of faithful discipleship: death itself becoming an act of witness.',
    etymology: 'From μάρτυς (witness) + -τήριον (place/instrument suffix)',
    phase: 1, fathers: ['Ignatius of Antioch', 'Polycarp of Smyrna'], connection: 'Martyrdom as Christoform Discipleship', letter: 'Μ'
  },
  'εὐχαριστία': {
    transliteration: 'eucharistia', english: 'Eucharist, Thanksgiving',
    definition: 'Thanksgiving. By Ignatius\'s time already the technical term for the Lord\'s Supper. In his letters the εὐχαριστία gathered "around the bishop" is the sign and instrument of Church unity — inseparable from his φάρμακον ἀθανασίας.',
    etymology: 'From εὖ (well) + χάρις (grace)',
    phase: 1, fathers: ['Ignatius of Antioch', 'Didache'], connection: 'Sacramental Theology & Ecclesial Unity', letter: 'Ε'
  },
  'πρεσβύτερος': {
    transliteration: 'presbyteros', english: 'Presbyter, Elder',
    definition: 'Elder. With bishop (ἐπίσκοπος) and deacon (διάκονος), the three offices comprising the threefold ministry Ignatius names as constitutive of a true local Church.',
    etymology: 'Comparative of πρέσβυς (old man)',
    phase: 1, fathers: ['Ignatius of Antioch', 'Clement of Rome'], connection: 'Threefold Apostolic Ministry', letter: 'Π'
  },
  'διάκονος': {
    transliteration: 'diakonos', english: 'Deacon, Servant',
    definition: 'Servant, minister. The third of the three orders (bishop, presbyter, deacon) in Ignatius\'s ecclesiology. Ignatius describes deacons as "entrusted with the ministry of Jesus Christ."',
    etymology: 'Likely from διά (through) + κονεῖν (to hasten/attend)',
    phase: 1, fathers: ['Ignatius of Antioch', 'Clement of Rome'], connection: 'Threefold Apostolic Ministry', letter: 'Δ'
  },
  'καθολική': {
    transliteration: 'katholike', english: 'Universal, Catholic',
    definition: 'Pertaining to the whole. Ignatius\'s Letter to the Smyrnaeans (8.2) contains the first known use of "catholic Church" (ἡ καθολικὴ ἐκκλησία) — marking the universal Church as present wherever Christ is.',
    etymology: 'From κατά (according to) + ὅλος (whole)',
    phase: 1, fathers: ['Ignatius of Antioch'], connection: 'Church as Universal Body of Christ', letter: 'Κ'
  },
  // --- Polycarp cluster (Phase 1) ---
  'παράδοσις': {
    transliteration: 'paradosis', english: 'Tradition, Handing-down',
    definition: 'That which is handed down. The living transmission of apostolic teaching from the Apostles through bishops. Polycarp, having learned directly from the Apostle John, embodies παράδοσις as received authority — not personal innovation.',
    etymology: 'From παρά (alongside) + δίδωμι (to give)',
    phase: 1, fathers: ['Polycarp of Smyrna'], connection: 'Living Apostolic Tradition', letter: 'Π'
  },
  'ὁμολογία': {
    transliteration: 'homologia', english: 'Confession, Profession',
    definition: 'Public confession, open profession of faith. Polycarp\'s final ὁμολογία before Roman authorities — refusing to deny Christ — demonstrates that authentic faith cannot remain private but must be openly confessed, even unto death.',
    etymology: 'From ὁμός (same) + λόγος (word/saying)',
    phase: 1, fathers: ['Polycarp of Smyrna'], connection: 'Faith as Public Profession', letter: 'Ο'
  },
  'πίστις': {
    transliteration: 'pistis', english: 'Faith, Faithfulness',
    definition: 'Faith, trust, faithfulness. In the Apostolic Fathers, πίστις is both theological virtue and sustained fidelity — Polycarp\'s 86 years of service exemplify both senses inseparably.',
    etymology: 'From πείθω (to persuade)',
    phase: 1, fathers: ['Polycarp of Smyrna', 'Clement of Rome'], connection: 'Faith as Sustained Fidelity', letter: 'Π'
  },
  // --- Didache cluster (Phase 1) ---
  'δύο ὁδοί': {
    transliteration: 'dyo hodoi', english: 'Two Ways',
    definition: 'The "Two Ways" — the structural image opening the Didache: a way of life and a way of death. An ancient catechetical pattern rooted in Jewish moral tradition (cf. Jer 21:8) and carried into Christian baptismal instruction.',
    etymology: 'From δύο (two) + ὁδός (way, road)',
    phase: 1, fathers: ['Didache'], connection: 'Catechetical Framework', letter: 'Δ'
  },
  'διδαχή': {
    transliteration: 'didache', english: 'Teaching',
    definition: 'Teaching, doctrine. The title word of the earliest Christian manual outside the New Testament (c. 50–120 AD), covering moral instruction, liturgical practice (Baptism, Eucharist), and church order.',
    etymology: 'From διδάσκω (to teach)',
    phase: 1, fathers: ['Didache'], connection: 'Earliest Church Catechesis', letter: 'Δ'
  },
  // --- Justin cluster (Phase 2) ---
  'λόγος': {
    transliteration: 'logos', english: 'Word, Reason',
    definition: 'Word, reason, rational principle. For Justin, Christ is the cosmic Λόγος — the divine Word who spoke through the prophets, became incarnate in Jesus, and illumines every rational being. Justin\'s First and Second Apologies develop Λόγος-Christology as the theological bridge between Christian revelation and Greek philosophy.',
    etymology: 'From λέγω (to speak, gather, reckon)',
    phase: 2, fathers: ['Justin Martyr'], connection: 'Christ as Cosmic Logos', letter: 'Λ'
  },
  'ἀλήθεια': {
    transliteration: 'aletheia', english: 'Truth',
    definition: 'Truth, reality, non-concealment. Justin identifies Christianity as ἀλήθεια over against pagan mythology and philosophical speculation, and Christ himself as ἡ ἀλήθεια. Whatever is true in Greek philosophy, Justin argues, is true because it participates in the Λόγος who is Truth.',
    etymology: 'From ἀ- (not) + λήθη (forgetfulness, concealment) — literally "un-concealment"',
    phase: 2, fathers: ['Justin Martyr'], connection: 'Christianity as True Philosophy', letter: 'Α'
  },
  'σπερματικὸς λόγος': {
    transliteration: 'spermatikos logos', english: 'Seed-Logos, Seminal Word',
    definition: 'The "seminal Word" — Justin\'s signature theological move, adapted from Stoic cosmology and baptized. Every rational being possesses a σπέρμα of the Λόγος, so that pagan philosophers like Heraclitus and Socrates, acting rightly by the Logos, already belonged partially to Christ. The full Λόγος, however, is Christ incarnate (2 Apology 8, 10, 13).',
    etymology: 'From σπερματικός (seminal, generative) + λόγος (Word)',
    phase: 2, fathers: ['Justin Martyr'], connection: 'Seeds of the Word Among the Nations', letter: 'Σ'
  },
  'σπέρμα τοῦ λόγου': {
    transliteration: 'sperma tou logou', english: 'Seed of the Word',
    definition: 'Seed of the Word. In the plural — σπέρματα τοῦ λόγου — Justin describes the partial participation in Christ available to every rational being before or apart from explicit Christian faith (2 Apology 8, 13). The cognate phrase to his σπερματικὸς λόγος, it makes his generous theology of Greek philosophy concrete.',
    etymology: 'From σπείρω (to sow, scatter seed) + λόγος (Word)',
    phase: 2, fathers: ['Justin Martyr'], connection: 'Seeds of the Word in Human Reason', letter: 'Σ'
  },
  'ἀπομνημονεύματα': {
    transliteration: 'apomnemoneumata', english: 'Memoirs, Recollections',
    definition: 'Memoirs, recollections. Justin\'s technical term for the Gospels, which he calls "the memoirs of the Apostles" (ἀπομνημονεύματα τῶν ἀποστόλων, 1 Apology 66–67). The designation frames the Gospels as credible eyewitness testimony within the idiom of Greco-Roman historiography, echoing Xenophon\'s Memorabilia of Socrates.',
    etymology: 'From ἀπό (from) + μνημονεύω (to remember)',
    phase: 2, fathers: ['Justin Martyr'], connection: 'Gospels as Apostolic Testimony', letter: 'Α'
  },
  'φιλοσοφία': {
    transliteration: 'philosophia', english: 'Philosophy, Love of Wisdom',
    definition: 'Love of wisdom. Justin, who wore the philosopher\'s cloak even after his conversion, presents Christianity as the only true and reliable φιλοσοφία — the one that actually fulfills what Greek philosophy was groping toward. His Dialogue with Trypho opens with an autobiographical account of his own philosophic quest culminating in Christ.',
    etymology: 'From φίλος (loving) + σοφία (wisdom)',
    phase: 2, fathers: ['Justin Martyr'], connection: 'Christianity as the True Philosophy', letter: 'Φ'
  },
  'ἀπολογία': {
    transliteration: 'apologia', english: 'Defense, Apology',
    definition: 'Formal defense, especially in a judicial setting. Justin\'s First and Second Apologies are the earliest extended Christian examples of the genre — written appeals to the Roman emperors arguing that Christians are innocent of the charges laid against them and that Christianity is both morally and intellectually defensible.',
    etymology: 'From ἀπό (from) + λόγος (speech, account)',
    phase: 2, fathers: ['Justin Martyr'], connection: 'Christian Apologetic Tradition', letter: 'Α'
  },
  'ἀνάμνησις': {
    transliteration: 'anamnesis', english: 'Remembrance, Memorial',
    definition: 'Remembrance — not bare recollection, but the liturgical making-present of what is remembered. Justin describes the Eucharist as the ἀνάμνησις of Christ\'s passion (1 Apology 66; Dialogue 41, 117), drawing on Christ\'s own command ("do this in remembrance of me") to cast the Lord\'s Supper as the Christian fulfillment of the pure offering prophesied in Malachi 1:10–12.',
    etymology: 'From ἀνά (again) + μιμνήσκω (to remind, recall)',
    phase: 2, fathers: ['Justin Martyr'], connection: 'Eucharistic Memorial Theology', letter: 'Α'
  },
  'φωτισμός': {
    transliteration: 'photismos', english: 'Illumination',
    definition: 'Illumination, enlightenment — Justin\'s preferred name for Baptism (1 Apology 61), developing the language of Hebrews 6:4 and 10:32. Because the one baptized is "illumined in the understanding" and receives the knowledge of God in Christ, the sacrament is not only washing but revelation. The term becomes a permanent fixture of Greek liturgical vocabulary.',
    etymology: 'From φῶς (light); φωτίζω (to illumine)',
    phase: 2, fathers: ['Justin Martyr'], connection: 'Baptism as Illumination', letter: 'Φ'
  },
  'λουτρόν': {
    transliteration: 'loutron', english: 'Washing, Laver',
    definition: 'Washing, bath. Justin uses λουτρόν as the primary descriptive term for Baptism (1 Apology 61–62), often paired with παλιγγενεσία in the biblical phrase "laver of regeneration" (Titus 3:5). It evokes ritual purification while being transformed, in Christian usage, into the rebirth of the whole person in Christ.',
    etymology: 'From λούω (to wash, bathe)',
    phase: 2, fathers: ['Justin Martyr'], connection: 'Baptismal Sacramentology', letter: 'Λ'
  },
  'παλιγγενεσία': {
    transliteration: 'palingenesia', english: 'Regeneration, Rebirth',
    definition: 'Rebirth, regeneration. Justin draws on Titus 3:5 ("the washing of regeneration") and John 3 ("born again") to describe Baptism as the beginning of a new existence in Christ (1 Apology 61). The term later becomes a fixture of Orthodox baptismal and ascetical vocabulary for the remaking of the whole human person.',
    etymology: 'From πάλιν (again) + γένεσις (birth, origin)',
    phase: 2, fathers: ['Justin Martyr'], connection: 'Baptismal Regeneration', letter: 'Π'
  },
  'προφητεία': {
    transliteration: 'propheteia', english: 'Prophecy',
    definition: 'Prophecy, prophetic utterance. For Justin, fulfilled Old Testament προφητεία is the decisive apologetic proof that Christ is the Messiah: the Hebrew prophets, speaking by the same Λόγος who became incarnate, foretold his life and passion with a specificity that exceeds coincidence (1 Apology 30–53; Dialogue with Trypho, passim).',
    etymology: 'From πρό (before) + φημί (to speak)',
    phase: 2, fathers: ['Justin Martyr'], connection: 'Prophetic Argument from Fulfillment', letter: 'Π'
  },
  'τύπος': {
    transliteration: 'typos', english: 'Type, Figure, Pattern',
    definition: 'Impression, figure, pattern. Justin reads the Hebrew Scriptures typologically: Moses\'s outstretched arms at Rephidim are a τύπος of the Cross; Isaac bearing the wood, Jonah in the fish, and the bronze serpent each foreshadow Christ (Dialogue 40, 86, 90–91, 111). This hermeneutic hardens into a permanent Orthodox exegetical grammar.',
    etymology: 'From τύπτω (to strike, impress)',
    phase: 2, fathers: ['Justin Martyr'], connection: 'Typological Exegesis of the Old Testament', letter: 'Τ'
  },
  'δαίμων': {
    transliteration: 'daimon', english: 'Demon',
    definition: 'Demon, malevolent spirit. Justin\'s demonology treats the pagan gods as fallen ἄγγελοι and their offspring — spiritual beings who invented mythology, instigate persecution of Christians, and counterfeit Christ\'s mysteries in pagan cult (1 Apology 5, 10, 14, 56, 66). This identification reframes the entire Greco-Roman religious world as a spiritual battleground.',
    etymology: 'Pre-Homeric; traditionally related to δαίω (to divide, apportion). In pre-Christian Greek the word denoted any divine or semi-divine being',
    phase: 2, fathers: ['Justin Martyr'], connection: 'Christian Demonology of Pagan Religion', letter: 'Δ'
  },
  'μονογενής': {
    transliteration: 'monogenes', english: 'Only-Begotten, Unique',
    definition: 'Only-begotten, unique of its kind. Justin inherits the term from Johannine usage (John 1:14, 18; 3:16) and deploys it of Christ to name the Son\'s unique origin from the Father (Dialogue 105). The word later becomes contested in the fourth-century Arian controversies and is fixed in the Nicene Creed as "the only-begotten Son of God."',
    etymology: 'From μόνος (only) + γενής (born, begotten)',
    phase: 2, fathers: ['Justin Martyr'], connection: 'Unique Sonship of Christ', letter: 'Μ'
  },
  'χιλιασμός': {
    transliteration: 'chiliasmos', english: 'Millennialism, Chiliasm',
    definition: 'The doctrine of a thousand-year earthly reign of Christ before the final judgment. Justin professes chiliast eschatology in Dialogue with Trypho 80–81, while acknowledging that other orthodox Christians of his day disagreed. The view fell out of favor in later patristic tradition but testifies to the eschatological diversity of the second-century Church.',
    etymology: 'From χίλιοι (thousand)',
    phase: 2, fathers: ['Justin Martyr'], connection: 'Second-Century Eschatology', letter: 'Χ'
  },
  'παρουσία': {
    transliteration: 'parousia', english: 'Coming, Advent, Presence',
    definition: 'Arrival, presence, royal visitation. Justin develops the crucial distinction between the two παρουσίαι of Christ: the first in humility, to suffer (cf. Isaiah 53), and the second in glory, to judge (Dialogue 14, 40, 49, 110). This two-fold schema explains how prophecies of a suffering Messiah and a glorified Messiah can both be true of the same Christ.',
    etymology: 'From παρά (alongside) + οὐσία (being, presence)',
    phase: 2, fathers: ['Justin Martyr'], connection: 'Two Advents of Christ', letter: 'Π'
  },
  'σωτήρ': {
    transliteration: 'soter', english: 'Savior',
    definition: 'Savior, deliverer. Justin deploys σωτήρ of Christ as a deliberate answer to its pagan use for Greco-Roman rulers and deities: the true σωτήρ is not Caesar or Asclepius but the crucified and risen Jesus (1 Apology 33–34, 66). The title becomes a cornerstone of Christian confession, already present in the second-century acrostic ΙΧΘΥΣ — "Jesus Christ, Son of God, Savior."',
    etymology: 'From σῴζω (to save, rescue)',
    phase: 2, fathers: ['Justin Martyr'], connection: 'Christ the Universal Savior', letter: 'Σ'
  },
  'σταυρός': {
    transliteration: 'stauros', english: 'Cross',
    definition: 'Cross, crucifixion stake. Justin\'s First Apology 55 offers an unusual reflection on the shape of the Cross as a cosmic signature: he discerns cruciform patterns in ship masts, ploughs, military standards, and the human body at prayer — arguing that the cosmos itself testifies to the Cross of Christ.',
    etymology: 'From ἵστημι (to stand, set up)',
    phase: 2, fathers: ['Justin Martyr'], connection: 'Cosmic Significance of the Cross', letter: 'Σ'
  },
  'ἄγγελος': {
    transliteration: 'angelos', english: 'Angel, Messenger',
    definition: 'Messenger, angel. Justin\'s "Angel of the Lord" Christology identifies the Angel who appeared to Abraham, Moses, and Jacob in the Hebrew Scriptures with the pre-incarnate Son (Dialogue 56, 59–60, 126–128). This reading of Old Testament theophanies provides a scriptural foundation for the real distinction between Father and Son within one God.',
    etymology: 'From ἀγγέλλω (to announce); cognate with Indo-European roots for "message"',
    phase: 2, fathers: ['Justin Martyr'], connection: 'Pre-Incarnate Son in Theophany', letter: 'Α'
  },
  'διάλογος': {
    transliteration: 'dialogos', english: 'Dialogue, Conversation',
    definition: 'Dialogue, conversation. Justin\'s Dialogue with Trypho — the earliest extended Christian work in this form — uses Socratic conversation with a learned Jew to expound Christian interpretation of the Hebrew Scriptures. The genre enacts Justin\'s conviction that Christianity is defensible under any serious philosophic inquiry.',
    etymology: 'From διά (through, between) + λόγος (speech)',
    phase: 2, fathers: ['Justin Martyr'], connection: 'Christian Philosophical Dialogue as Apologetic Genre', letter: 'Δ'
  },
  'εὐσέβεια': {
    transliteration: 'eusebeia', english: 'Piety, True Worship',
    definition: 'Reverence, right worship, godliness. Justin contrasts Christian εὐσέβεια with pagan superstition: true piety is not cultic fear of capricious gods but the rational and moral worship offered through the Λόγος. This term frames his entire apologetic — Christians, slandered as "atheists" for rejecting false gods, are in truth the only genuinely pious.',
    etymology: 'From εὖ (well) + σέβομαι (to revere, worship)',
    phase: 2, fathers: ['Justin Martyr'], connection: 'True Worship vs. Pagan Religion', letter: 'Ε'
  },
  // --- Tertullian cluster (Phase 2.5) — Latin theological vocabulary ---
  'trinitas': {
    transliteration: 'trinitas', english: 'Trinity',
    definition: 'Tertullian\'s coinage (Adversus Praxean 2, 12) — the first technical theological term for the Triune God in any language. He insists the Father, Son, and Spirit are "one substance in three persons" (una substantia, tres personae). This Latin grammar of the Trinity precedes its Greek equivalents by more than a century and sets the vocabulary the West will use permanently.',
    etymology: 'Latin: from tri- (three) + -nitas (condition of)',
    phase: 2.5, fathers: ['Tertullian'], connection: 'First Technical Term for the Trinity', letter: 'T'
  },
  'substantia': {
    transliteration: 'substantia', english: 'Substance, Essence',
    definition: 'Substance, underlying essence. In Tertullian, una substantia names the single divine reality shared by Father, Son, and Spirit — corresponding to what the later Greek Fathers would call οὐσία. His formula una substantia, tres personae becomes the permanent Latin template for Trinitarian confession.',
    etymology: 'Latin: from sub- (under) + stare (to stand) — "that which stands under"',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Divine Substance in Trinitarian Theology', letter: 'S'
  },
  'persona': {
    transliteration: 'persona', english: 'Person',
    definition: 'Person. Originally the "mask" worn by an actor in Roman theatre, and by extension the role or legal standing a person bore. Tertullian transforms persona into the Latin term for the three distinct subsistents within the one God (Adversus Praxean). The word proves controversial when later Latins translate it to Greek, since πρόσωπον carried the lingering connotation of mere "mask."',
    etymology: 'Latin persona — originally a theatrical mask (possibly from Etruscan phersu)',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Trinitarian Personhood', letter: 'P'
  },
  'unitas': {
    transliteration: 'unitas', english: 'Unity, Oneness',
    definition: 'Unity, oneness. Tertullian uses unitas for the indivisible substance of the Triune God (Adversus Praxean); Cyprian takes up the term for the unity of the Church, most famously in his De Unitate Ecclesiae, where ecclesial unitas grounded in the one episcopate mirrors the divine unitas of the Trinity.',
    etymology: 'Latin: from unus (one)',
    phase: 2.5, fathers: ['Tertullian', 'Cyprian of Carthage'], connection: 'Trinitarian and Ecclesial Unity', letter: 'U'
  },
  'oeconomia': {
    transliteration: 'oeconomia', english: 'Economy, Dispensation',
    definition: 'The "economy" or ordered dispensation of God in salvation history. Tertullian uses oeconomia (a Latinized Greek loanword) for the distinction-within-unity of the Triune God (Adversus Praxean 2–4): the one divine substance unfolds itself in the ordered mission of Father, Son, and Spirit across creation and redemption.',
    etymology: 'Latinized Greek οἰκονομία, from οἶκος (household) + νόμος (law, management)',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Trinitarian Economy of Salvation', letter: 'O'
  },
  'sermo': {
    transliteration: 'sermo', english: 'Word, Discourse',
    definition: 'Word, speech, discourse. Tertullian consistently uses sermo, not verbum, to translate the Johannine Λόγος — arguing that sermo better captures the Word as living discourse rather than a detached utterance (Adversus Praxean 5). The West later standardizes on verbum (as in the Vulgate\'s "In principio erat Verbum"), but Tertullian\'s choice reflects his sensitivity to the Logos as eternal divine speaking.',
    etymology: 'Latin: from serere (to join, weave together) — literally "a weaving of words"',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Latin Christology of the Word', letter: 'S'
  },
  'sacramentum': {
    transliteration: 'sacramentum', english: 'Sacrament, Sacred Oath',
    definition: 'Originally the Roman soldier\'s oath of allegiance to the emperor, and by extension any solemn binding pledge. Tertullian adopts sacramentum as the Latin rendering of the Greek μυστήριον and applies it above all to Baptism: the Christian sacramentum is the soldier\'s oath sworn to Christ the King (Ad Martyras; De Baptismo). The martial resonance shapes Latin sacramental theology for centuries.',
    etymology: 'Latin: from sacrare (to consecrate) — "that by which one is bound to the sacred"',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Latin Sacramental Theology', letter: 'S'
  },
  'regula fidei': {
    transliteration: 'regula fidei', english: 'Rule of Faith',
    definition: 'The "Rule of Faith" — a fixed summary of the core apostolic teaching handed down from the Apostles through the bishops and normative for Christian doctrine. Tertullian invokes the regula fidei throughout his polemical works (Adversus Praxean 2; De Praescriptione 13) as the criterion against which heretical novelty is measured.',
    etymology: 'Latin regula (ruler, measuring-stick) + fidei (of faith)',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Apostolic Rule of Faith', letter: 'R'
  },
  'disciplina': {
    transliteration: 'disciplina', english: 'Discipline, Training',
    definition: 'Discipline, instructed way of life. For Tertullian, disciplina names both the Church\'s moral and ascetical practice and the ordered transmission of Christian teaching. The term marks an early instance of the Latin church\'s characteristic attention to binding moral order alongside doctrinal confession.',
    etymology: 'Latin: from discere (to learn)',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Christian Moral Formation', letter: 'D'
  },
  'caro': {
    transliteration: 'caro', english: 'Flesh',
    definition: 'Flesh, physical nature. Tertullian\'s De Carne Christi defends the real, human fleshliness of Christ against Docetic and Gnostic denials, and his De Resurrectione Carnis insists on the bodily resurrection of believers. The Latin caro corresponds to the Greek σάρξ (Phase 1) and anchors the Latin tradition\'s incarnational realism.',
    etymology: 'Latin: from Proto-Italic *karō (flesh, body)',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Incarnational and Bodily Realism', letter: 'C'
  },
  'natura': {
    transliteration: 'natura', english: 'Nature',
    definition: 'Nature, innate character. Tertullian argues that in Christ duae substantiae — "two substances," divine and human — are conjoined in one persona without confusion (Adversus Praxean 27), anticipating the two-natures Christology fixed at Chalcedon more than two centuries later. natura and substantia overlap in his usage and become settled Latin Christological vocabulary.',
    etymology: 'Latin: from nasci (to be born) — "that with which one is born"',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Two-Natures Christology (Proto-Chalcedonian)', letter: 'N'
  },
  'praescriptio': {
    transliteration: 'praescriptio', english: 'Prescription, Prior Claim',
    definition: 'A Roman legal term: a prior claim or procedural objection that defeats an opponent\'s case before it can be heard. Tertullian\'s De Praescriptione Haereticorum argues that Scripture belongs to the Church — that heretics have no standing to appeal to the Scriptures because the apostolic tradition pre-dates and circumscribes any heretical reading.',
    etymology: 'Latin: from prae- (before) + scribere (to write) — "prior writing, prior claim"',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Church\'s Prior Claim to Scripture', letter: 'P'
  },
  'anima': {
    transliteration: 'anima', english: 'Soul',
    definition: 'Soul, animating principle. Tertullian\'s De Anima is the first full Christian treatise on the soul, defending its substantial reality (against Platonic spiritualization), a refined sense of its corporeality, and its transmission through natural generation (traducianism). The work shapes Western anthropology\'s attention to the soul as created, inherited, and bodily.',
    etymology: 'Latin: from Proto-Indo-European *h₂enh₁- (to breathe); cognate with Greek ἄνεμος',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Latin Christian Anthropology', letter: 'A'
  },
  'satisfactio': {
    transliteration: 'satisfactio', english: 'Satisfaction, Amends',
    definition: 'Satisfaction — the restitution due for an offense. Tertullian introduces satisfactio into Christian penitential vocabulary (De Paenitentia): the penitent makes satisfactio to God through tears, fasting, and works of mercy. This juridical vocabulary becomes foundational for later Western theologies of repentance and, eventually, of atonement.',
    etymology: 'Latin: from satis (enough) + facere (to make) — "to make enough"',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Penitential and Atonement Vocabulary', letter: 'S'
  },
  'apologeticum': {
    transliteration: 'apologeticum', english: 'Apologetic Work, Defense',
    definition: 'A written defense. Tertullian\'s Apologeticum (197 AD), addressed to Roman magistrates, is the masterpiece of early Latin apologetics — rebutting charges against Christians with juridical precision and open wit. The term, a Latinized Greek neuter, becomes the generic Latin name for the Christian apologetic genre.',
    etymology: 'Latinized Greek ἀπολογητικός, from ἀπολογέομαι (to speak in defense)',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Latin Apologetic Tradition', letter: 'A'
  },
  // --- Cyprian cluster (Phase 2.5) ---
  'episcopus': {
    transliteration: 'episcopus', english: 'Bishop, Overseer',
    definition: 'Bishop — the Latin rendering of the Greek ἐπίσκοπος (Phase 1). For Cyprian, the episcopus is the center of ecclesial unity: each local bishop holds the office in its fullness, and collectively the bishops constitute the one episcopate (episcopatus unus est) — the visible sign and instrument of the Church\'s oneness (De Unitate Ecclesiae 5).',
    etymology: 'Latinized Greek ἐπίσκοπος, from ἐπί (over) + σκοπός (watcher)',
    phase: 2.5, fathers: ['Cyprian of Carthage'], connection: 'Episcopal Collegiality and Ecclesial Unity', letter: 'E'
  },
  'cathedra Petri': {
    transliteration: 'cathedra Petri', english: 'Chair of Peter',
    definition: 'The "chair of Peter" — the apostolic seat from which Peter governed the Church, and the figure of an episcopate grounded on a single rock. Cyprian appeals to the cathedra Petri in De Unitate Ecclesiae 4 as the image of ecclesial oneness; the phrase\'s ecclesiological weight grows steadily through later Latin tradition.',
    etymology: 'Latin cathedra (seat, chair) + Petri (of Peter)',
    phase: 2.5, fathers: ['Cyprian of Carthage'], connection: 'Petrine Foundation of Episcopal Unity', letter: 'C'
  },
  'schisma': {
    transliteration: 'schisma', english: 'Schism, Tearing',
    definition: 'Schism — a tearing, a breach in the Church\'s unity. For Cyprian, schism is not a disagreement among co-belonging Christians but a severing from the one Body: the one who breaks from the bishop "has not the garment of Christ, whom he has torn and divided" (De Unitate Ecclesiae 7). schisma is thereby placed among the gravest spiritual disorders.',
    etymology: 'Latinized Greek σχίσμα, from σχίζω (to split, tear)',
    phase: 2.5, fathers: ['Cyprian of Carthage'], connection: 'Gravity of Ecclesial Division', letter: 'S'
  },
  'lapsi': {
    transliteration: 'lapsi', english: 'The Lapsed',
    definition: 'The "fallen" — those who denied the faith under persecution, especially during the Decian persecution of 250 AD. Cyprian\'s De Lapsis grapples pastorally with the crisis: can the lapsi be readmitted, and under what conditions? His answer — readmission through penitential discipline mediated by the bishop — establishes a durable Western pattern for post-baptismal reconciliation.',
    etymology: 'Latin: plural of lapsus, past participle of labi (to fall, slip)',
    phase: 2.5, fathers: ['Cyprian of Carthage'], connection: 'Post-Persecution Reconciliation', letter: 'L'
  },
  'communio': {
    transliteration: 'communio', english: 'Communion, Fellowship',
    definition: 'Communion, shared participation. In Cyprian, communio names both the bond uniting Christians to their bishop — and through him to the one Catholic Church — and the sacramental reality of the Eucharist itself. To be in communio with one\'s bishop and with the wider episcopate is to be in communio with Christ.',
    etymology: 'Latin: from communis (shared, common)',
    phase: 2.5, fathers: ['Cyprian of Carthage'], connection: 'Ecclesial and Sacramental Communion', letter: 'C'
  },
  'mater ecclesia': {
    transliteration: 'mater ecclesia', english: 'Mother Church',
    definition: 'The Church as Mother. Cyprian\'s image (De Unitate Ecclesiae 6): "he can no longer have God for his Father who does not have the Church for his Mother." The metaphor grounds the Church\'s maternal role in begetting Christians through Baptism and nourishing them through word and sacrament — a figure that becomes permanent in Latin ecclesiology.',
    etymology: 'Latin mater (mother) + ecclesia (church, from Greek ἐκκλησία)',
    phase: 2.5, fathers: ['Cyprian of Carthage'], connection: 'Maternal Ecclesiology', letter: 'M'
  },
  'extra ecclesiam nulla salus': {
    transliteration: 'extra ecclesiam nulla salus', english: 'No Salvation Outside the Church',
    definition: 'Literally, "outside the Church there is no salvation." Cyprian\'s dictum (Epistle 72.21, echoing De Unitate Ecclesiae 6), addressed originally to schismatics claiming saving grace apart from communion with the bishop. The formula shapes Western ecclesiology permanently and becomes a major point of later theological reception and nuance.',
    etymology: 'Latin: extra (outside) + ecclesiam (the Church) + nulla (no) + salus (salvation)',
    phase: 2.5, fathers: ['Cyprian of Carthage'], connection: 'Salvation Within Ecclesial Communion', letter: 'E'
  }
};

// Merge PHASE_DATA[phase].greek ("focus terms") with LEXICON_ENTRIES for
// a given phase. Returns an array of {greek, english, transliteration?,
// definition?, fathers?, connection?, isFocus} entries, deduplicated by
// Greek script. Focus terms are flagged so the UI can render them
// prominently. Terms without detailed entries still render as basic cards.
function getPhaseTerms(phase) {
  if (!phase) return [];
  const byGreek = new Map();

  // Focus terms from PHASE_DATA[phase].greek — format: "ἐπίσκοπος (bishop)"
  (phase.greek || []).forEach(item => {
    const match = item.match(/^([^\(]+)\s*\(([^\)]+)\)$/);
    const greek = match ? match[1].trim() : item.trim();
    const english = match ? match[2].trim() : '';
    byGreek.set(greek, { greek, english, isFocus: true });
  });

  // Enrich with LEXICON_ENTRIES for this phase
  for (const [greek, entry] of Object.entries(LEXICON_ENTRIES)) {
    if (String(entry.phase) === String(phase.number)) {
      const existing = byGreek.get(greek) || {};
      byGreek.set(greek, { greek, ...entry, isFocus: existing.isFocus || false });
    }
  }

  return Array.from(byGreek.values());
}

// ==================================================================
// Lexicon anchor helpers — single source of truth for deep-linking
// Greek terms from anywhere in the app (dashboard pills, Father card
// theological pillars, future daily-reading notes) into the main
// lexicon page. Each term's anchor is `#term-<slug>`, where the slug
// is a URL-safe version of the transliteration. Callers use
// `lexiconAnchorFor('ἐπίσκοπος')` and get back
// 'greek-lexicon-index.html#term-episkopos'.
// ==================================================================

// Convert a term's transliteration into a URL-safe anchor slug.
// "Pharmakon Athanasias" → "pharmakon-athanasias"
// "dyo hodoi" → "dyo-hodoi"
function slugifyTerm(greekOrEntry) {
  if (!greekOrEntry) return '';
  const entry = typeof greekOrEntry === 'object'
    ? greekOrEntry
    : (typeof LEXICON_ENTRIES !== 'undefined' ? LEXICON_ENTRIES[greekOrEntry] : null);
  if (!entry || !entry.transliteration) return '';
  return entry.transliteration
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')  // strip combining accents
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Return the URL to a Greek term's entry in the lexicon index.
// Falls back to the phase-level anchor if we don't have a full lexicon
// entry yet. Accepts either a Greek string key or a full term object.
function lexiconAnchorFor(greekOrEntry) {
  const slug = slugifyTerm(greekOrEntry);
  if (slug) return `greek-lexicon-index.html#term-${slug}`;
  // Fallback — if term exists but has no transliteration, or isn't
  // in LEXICON_ENTRIES at all, send them to the lexicon index.
  return 'greek-lexicon-index.html';
}

// Look up a Father-page URL by short name as used in PHASE_DATA[n].fathers
// (e.g., "Ignatius", "Polycarp", "Clement of Rome"). Returns URL or null.
// Complements fatherPageForReading(), which searches inside a reading string.
function fatherPageByShortName(shortName) {
  if (!shortName) return null;
  const trimmed = shortName.trim();
  const lower = trimmed.toLowerCase();
  for (const [fullName, url] of Object.entries(FATHER_PAGES)) {
    const firstName = fullName.split(/\s+of\s+/)[0].toLowerCase();
    if (!trimmed.includes(' ')) {
      // Single-word token like "Ignatius" — match against first name only
      if (firstName === lower) return url;
    } else {
      // Multi-word token like "Clement of Rome" — match exact or substring
      const full = fullName.toLowerCase();
      if (full === lower || full.includes(lower) || lower.includes(full)) return url;
    }
  }
  return null;
}

// Take a phase fathers string ("Ignatius · Polycarp · Clement of Rome · ...")
// and return HTML with each name linkified where a Father page exists.
// Produces safe HTML: names from PHASE_DATA are trusted internal strings.
function linkifyPhaseFathers(fathersString) {
  if (!fathersString) return '';
  return fathersString.split(' · ').map(raw => {
    const name = raw.trim();
    if (!name) return '';
    const url = fatherPageByShortName(name);
    if (url) return `<a href="${url}" class="patristic-link">${name}</a>`;
    return name;
  }).filter(Boolean).join(' · ');
}

// ==================================================================
// TRACKS — per-topic track metadata. Drives both the tracks page
// (full detail in Learn More modals) and the dashboard Required Reading
// panel. Topic-keyed per the "tag data with topic" architectural
// principle (see roadmap Future Architecture Reviews section).
// ==================================================================
const TRACKS = {
  patristics: {
    '40-week': {
      name: '40-Week Intensive',
      tagline: 'Depth through concentrated rhythm',
      status: 'available',
      duration: '40 weeks',
      cadence: '~60 minutes per day, 6 days per week',
      scope: '22 Fathers across 14 phases',
      shortDescription: 'A disciplined daily rhythm through the full Nicene Arc and Post-Nicene Christological Arc. For those who can commit an hour a day to sustained patristic formation.',
      fullDescription: 'Systematic formation in the mind of the Fathers over forty weeks, structured around the Nicene Arc (Weeks 1–28) and the Post-Nicene Christological Arc (Weeks 29–40). Four integrated tracks run each study day: Psalms, Biblical reading, patristic primary text, and secondary scholarly reading. Day 6 is synthesis; Day 7 is rest.',
      outcomes: [
        'Working familiarity with 22 Church Fathers and their core works',
        'Reading competence in Holmes, Ante-Nicene, and Nicene-Post-Nicene collections',
        'Integrated Scripture + Tradition reading rhythm',
        'Foundation for deeper theological or liturgical study'
      ],
      requiredResources: [
        // Primary Texts — patristic reading
        { category: 'primary', title: 'The Apostolic Fathers', author: 'Holmes (ed.)', edition: 'Baker Academic, 3rd ed.', phase: 'Weeks 1–4', essential: true },
        { category: 'primary', title: 'Ante-Nicene Fathers, Vols. 1, 3, 5', details: 'Justin · Tertullian · Cyprian · Irenaeus', phase: 'Weeks 5–13', essential: true },
        { category: 'primary', title: 'Against Heresies', author: 'Irenaeus of Lyons', details: 'Standalone edition or ANF Vol. 1', phase: 'Weeks 9–13', essential: true },
        { category: 'primary', title: 'Nicene & Post-Nicene Fathers, Series I & II', details: 'Athanasius · Cappadocians · Chrysostom · Leo (NPNF 1.12) · John of Damascus (NPNF 2.9)', phase: 'Weeks 14–38', essential: true },
        { category: 'primary', title: 'On the Priesthood', author: 'John Chrysostom', details: 'In NPNF 1.9', phase: 'Weeks 20–21', essential: true },
        { category: 'primary', title: 'On the Unity of Christ', author: 'Cyril of Alexandria', edition: 'SVS Press · ~$20 · trans. McGuckin', phase: 'Weeks 29–30', essential: true, toPurchase: true },
        { category: 'primary', title: 'Pseudo-Dionysius: The Complete Works', edition: 'Paulist Press · ~$25 · trans. Luibheid', phase: 'Weeks 32–33', essential: true, toPurchase: true },
        { category: 'primary', title: 'Two Hundred Chapters on Theology', author: 'Maximus the Confessor', edition: 'SVS Press · ~$20', phase: 'Weeks 34–36', essential: true, toPurchase: true },
        { category: 'primary', title: 'On the Cosmic Mystery of Jesus Christ', author: 'Maximus the Confessor', edition: 'Paulist Press · ~$25 · optional but recommended', phase: 'Week 36', essential: false, toPurchase: true },

        // Biblical Texts — Scripture track
        { category: 'biblical', title: 'Eastern Orthodox Bible', details: 'New Testament', phase: 'All weeks', essential: true },
        { category: 'biblical', title: 'Lexham English Septuagint', details: 'Old Testament + Psalms', phase: 'All weeks', essential: true },

        // Secondary Reading — scholarly companions, scheduled per phase (Part I)
        { category: 'secondary', title: 'The Christian Tradition, Vol. 1', author: 'Jaroslav Pelikan', details: 'Ch. 1–5', phase: 'Weeks 1–6', essential: true },
        { category: 'secondary', title: 'The Trinitarian Faith', author: 'T. F. Torrance', details: 'Intro + Ch. 1', phase: 'Week 4', essential: false },
        { category: 'secondary', title: 'Justin Martyr', author: 'Eric Osborn', phase: 'Weeks 5–6', essential: false },
        { category: 'secondary', title: 'Tertullian', author: 'Geoffrey D. Dunn', phase: 'Week 7', essential: false },
        { category: 'secondary', title: 'Cyprian and Roman Carthage', author: 'Allen Brent', phase: 'Week 8', essential: false },
        { category: 'secondary', title: 'Irenaeus: An Introduction', author: 'Denis Minns', phase: 'Weeks 9–10', essential: false },
        { category: 'secondary', title: 'Irenaeus of Lyons', author: 'John Behr', phase: 'Weeks 11–13', essential: false },
        { category: 'secondary', title: 'Athanasius: A Theological Introduction', author: 'Thomas Weinandy', phase: 'Week 14', essential: false },
        { category: 'secondary', title: 'Athanasius: The Coherence of His Thought', author: 'Khaled Anatolios', phase: 'Week 15', essential: false },
        { category: 'secondary', title: 'The Nicene Faith, Vol. 2', author: 'John Behr', phase: 'Week 16', essential: false },
        { category: 'secondary', title: 'Origins of the Christian Mystical Tradition', author: 'Andrew Louth', details: 'Ch. 4–5 (Week 17) · Ch. 6 (Week 33)', phase: 'Weeks 17, 33', essential: false },
        { category: 'secondary', title: 'Gregory of Nazianzus', author: 'Brian Daley', phase: 'Week 18', essential: false },
        { category: 'secondary', title: 'Faith Gives Fullness to Reasoning', author: 'Frederick Norris', details: 'Commentary on Orations 29–31', phase: 'Week 19', essential: false },
        { category: 'secondary', title: 'Golden Mouth: The Story of John Chrysostom', author: 'J. N. D. Kelly', phase: 'Weeks 20–25', essential: false },

        // Secondary Reading — Part II scholarly companions
        { category: 'secondary', title: 'Saint Cyril of Alexandria and the Christological Controversy', author: 'John McGuckin', phase: 'Weeks 29–30', essential: false },
        { category: 'secondary', title: 'Leo the Great', author: 'Bronwen Neil', phase: 'Week 31', essential: false },
        { category: 'secondary', title: 'The Council of Chalcedon', author: 'R. V. Sellers', phase: 'Week 31', essential: false },
        { category: 'secondary', title: 'Denys the Areopagite', author: 'Andrew Louth', phase: 'Weeks 32–33', essential: false },
        { category: 'secondary', title: 'Maximus the Confessor', author: 'Andrew Louth', phase: 'Weeks 34–35', essential: false },
        { category: 'secondary', title: 'Man and the Cosmos: The Vision of St. Maximus the Confessor', author: 'Lars Thunberg', phase: 'Week 36', essential: false },
        { category: 'secondary', title: 'St John Damascene: Tradition and Originality in Byzantine Theology', author: 'Andrew Louth', phase: 'Weeks 37–38', essential: false }
      ],
      recommendedSecondary: [
        'Behr — The Nicene Faith (full 2-volume set)',
        'Anatolios — Retrieving Nicaea',
        'Thunberg — Microcosm and Mediator (deeper Maximus companion)',
        'Kelly — Early Christian Doctrines',
        'Florovsky — The Eastern Fathers of the Fourth Century',
        'NPNF 2.14 — The Seven Ecumenical Councils (review in Week 39–40)'
      ]
    },
    '1-year': {
      name: '1-Year Comprehensive',
      tagline: 'Broader patristic coverage, gentler cadence',
      status: 'coming-soon',
      duration: '52 weeks',
      cadence: 'To be finalized',
      scope: 'To be finalized',
      shortDescription: 'A fuller patristic survey at a more sustainable pace. Scope and structure still being developed.',
      fullDescription: 'Track in development. Will extend the 40-week core with additional Fathers and reading time. Exact pedagogy, reading list, and cadence not yet finalized.',
      outcomes: ['To be finalized'],
      requiredResources: [],
      recommendedSecondary: []
    },
    '2-year': {
      name: '2-Year Contemplative',
      tagline: 'Deepest immersion, monastic reading rhythm',
      status: 'coming-soon',
      duration: '~100 weeks',
      cadence: 'To be finalized',
      scope: 'To be finalized',
      shortDescription: 'A slow contemplative reading of the patristic corpus at monastic cadence. Structure still being developed.',
      fullDescription: 'Track in development. Will take the patristic arc at a pace closer to monastic lectio divina — fewer words per day, more time spent with each Father. Exact pedagogy, reading list, and cadence not yet finalized.',
      outcomes: ['To be finalized'],
      requiredResources: [],
      recommendedSecondary: []
    }
  }
};

// ==================================================================
// ENROLLMENT STATE — tiny helper around localStorage. A user is
// "enrolled" in exactly one (topic, track) at a time. Switching tracks
// preserves prior progress in localStorage — it's just paused, not erased.
// ==================================================================
const ENROLLMENT_KEY = 'active_enrollment'; // JSON: { topic, track, enrolledAt }

function getEnrollment() {
  try {
    const raw = localStorage.getItem(ENROLLMENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function setEnrollment(topic, track) {
  const payload = { topic, track, enrolledAt: new Date().toISOString() };
  localStorage.setItem(ENROLLMENT_KEY, JSON.stringify(payload));
  return payload;
}

function clearEnrollment() {
  localStorage.removeItem(ENROLLMENT_KEY);
}

function isEnrolled(topic, track) {
  const e = getEnrollment();
  if (!e) return false;
  if (topic && e.topic !== topic) return false;
  if (track && e.track !== track) return false;
  return true;
}
