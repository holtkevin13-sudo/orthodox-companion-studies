// ==================================================================
// lexicon-data.js — GREEK/LATIN LEXICON DATA LAYER for the Orthodox
// Patristic Formation study app.
//
// This file owns the detailed theological lexicon (LEXICON_ENTRIES)
// and the anchor helpers that operate purely on that data
// (slugifyTerm, lexiconAnchorFor, validateLexicon).
//
// Pages that include this file must load it BEFORE study-data.js —
// study-data.js defines getPhaseTerms(), which reads the global
// LEXICON_ENTRIES defined here.
//
// Load order in every HTML page:
//   <script src="lexicon-data.js"></script>
//   <script src="study-data.js"></script>
//
// Dependencies: none. No DOM access, no localStorage.
// ==================================================================
// build: 2026-04-17T21:30:00Z

// ==================================================================
// LEXICON_ENTRIES — detailed Greek term reference, keyed by Greek script.
// Extends PHASE_DATA[N].greek (which is the short "focus terms" list
// shown in the dashboard's Phase Greek panel). LEXICON_ENTRIES is the
// full scholarly lexicon — each entry tagged with its phase.
//
// Entry schema:
//   transliteration, english, definition, etymology, phase,
//   fathers (array), connection, letter — all required.
//   language: 'latin' — required on Latin entries only.
//   pastoralNote — OPTIONAL. 1–3 sentences of Orthodox reception,
//     scholarly contextualization, or pastoral framing beyond the
//     core definition. Omit for entries that do not require it.
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
    phase: 2, fathers: ['Justin Martyr'], connection: 'Second-Century Eschatology', letter: 'Χ',
    pastoralNote: 'The later tradition did not follow Justin here. Literal millenarianism was progressively marginalized and excluded by the consensus that took doctrinal form at the Second Ecumenical Council (381), whose Creed confesses a kingdom that "shall have no end." Justin\'s chiliasm is one of the places where an early Father\'s position was corrected by the Church\'s subsequent discernment — a sign not of scandal but of the proper development of doctrine, in which individual patristic voices are weighed within the symphonic judgment of the councils and the fathers received as a whole.'
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
    language: 'latin',
    transliteration: 'trinitas', english: 'Trinity',
    definition: 'Tertullian\'s coinage (Adversus Praxean 2, 12) — the first technical theological term for the Triune God in any language. He insists the Father, Son, and Spirit are "one substance in three persons" (una substantia, tres personae). This Latin grammar of the Trinity precedes its Greek equivalents by more than a century and sets the vocabulary the West will use permanently.',
    etymology: 'Latin: from tri- (three) + -nitas (condition of)',
    phase: 2.5, fathers: ['Tertullian'], connection: 'First Technical Term for the Trinity', letter: 'T'
  },
  'substantia': {
    language: 'latin',
    transliteration: 'substantia', english: 'Substance, Essence',
    definition: 'Substance, underlying essence. In Tertullian, una substantia names the single divine reality shared by Father, Son, and Spirit — corresponding to what the later Greek Fathers would call οὐσία. His formula una substantia, tres personae becomes the permanent Latin template for Trinitarian confession.',
    etymology: 'Latin: from sub- (under) + stare (to stand) — "that which stands under"',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Divine Substance in Trinitarian Theology', letter: 'S'
  },
  'persona': {
    language: 'latin',
    transliteration: 'persona', english: 'Person',
    definition: 'Person. Originally the "mask" worn by an actor in Roman theatre, and by extension the role or legal standing a person bore. Tertullian transforms persona into the Latin term for the three distinct subsistents within the one God (Adversus Praxean). The word proves controversial when later Latins translate it to Greek, since πρόσωπον carried the lingering connotation of mere "mask."',
    etymology: 'Latin persona — originally a theatrical mask (possibly from Etruscan phersu)',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Trinitarian Personhood', letter: 'P'
  },
  'unitas': {
    language: 'latin',
    transliteration: 'unitas', english: 'Unity, Oneness',
    definition: 'Unity, oneness. Tertullian uses unitas for the indivisible substance of the Triune God (Adversus Praxean); Cyprian takes up the term for the unity of the Church, most famously in his De Unitate Ecclesiae, where ecclesial unitas grounded in the one episcopate mirrors the divine unitas of the Trinity.',
    etymology: 'Latin: from unus (one)',
    phase: 2.5, fathers: ['Tertullian', 'Cyprian of Carthage'], connection: 'Trinitarian and Ecclesial Unity', letter: 'U'
  },
  'oeconomia': {
    language: 'latin',
    transliteration: 'oeconomia', english: 'Economy, Dispensation',
    definition: 'The "economy" or ordered dispensation of God in salvation history. Tertullian uses oeconomia (a Latinized Greek loanword) for the distinction-within-unity of the Triune God (Adversus Praxean 2–4): the one divine substance unfolds itself in the ordered mission of Father, Son, and Spirit across creation and redemption.',
    etymology: 'Latinized Greek οἰκονομία, from οἶκος (household) + νόμος (law, management)',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Trinitarian Economy of Salvation', letter: 'O'
  },
  'sermo': {
    language: 'latin',
    transliteration: 'sermo', english: 'Word, Discourse',
    definition: 'Word, speech, discourse. Tertullian consistently uses sermo, not verbum, to translate the Johannine Λόγος — arguing that sermo better captures the Word as living discourse rather than a detached utterance (Adversus Praxean 5). The West later standardizes on verbum (as in the Vulgate\'s "In principio erat Verbum"), but Tertullian\'s choice reflects his sensitivity to the Logos as eternal divine speaking.',
    etymology: 'Latin: from serere (to join, weave together) — literally "a weaving of words"',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Latin Christology of the Word', letter: 'S',
    pastoralNote: 'Both sermo and verbum render the Greek λόγος, and each preserves a different facet of it: sermo the sense of living speech and discourse, verbum the sense of the settled utterance or word. Tertullian\'s choice did not prevail. The Vulgate standardized verbum at John 1:1 ("In principio erat Verbum"), and the whole subsequent Latin tradition — from Augustine through the scholastics — engages the Johannine prologue in those terms. Neither rendering is wrong, but Western medieval theology is built on verbum.'
  },
  'sacramentum': {
    language: 'latin',
    transliteration: 'sacramentum', english: 'Sacrament, Sacred Oath',
    definition: 'Originally the Roman soldier\'s oath of allegiance to the emperor, and by extension any solemn binding pledge. Tertullian adopts sacramentum as the Latin rendering of the Greek μυστήριον and applies it above all to Baptism: the Christian sacramentum is the soldier\'s oath sworn to Christ the King (Ad Martyras; De Baptismo). The martial resonance shapes Latin sacramental theology for centuries.',
    etymology: 'Latin: from sacrare (to consecrate) — "that by which one is bound to the sacred"',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Latin Sacramental Theology', letter: 'S'
  },
  'regula fidei': {
    language: 'latin',
    transliteration: 'regula fidei', english: 'Rule of Faith',
    definition: 'The "Rule of Faith" — a fixed summary of the core apostolic teaching handed down from the Apostles through the bishops and normative for Christian doctrine. Tertullian invokes the regula fidei throughout his polemical works (Adversus Praxean 2; De Praescriptione 13) as the criterion against which heretical novelty is measured.',
    etymology: 'Latin regula (ruler, measuring-stick) + fidei (of faith)',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Apostolic Rule of Faith', letter: 'R'
  },
  'disciplina': {
    language: 'latin',
    transliteration: 'disciplina', english: 'Discipline, Training',
    definition: 'Discipline, instructed way of life. For Tertullian, disciplina names both the Church\'s moral and ascetical practice and the ordered transmission of Christian teaching. The term marks an early instance of the Latin church\'s characteristic attention to binding moral order alongside doctrinal confession.',
    etymology: 'Latin: from discere (to learn)',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Christian Moral Formation', letter: 'D'
  },
  'caro': {
    language: 'latin',
    transliteration: 'caro', english: 'Flesh',
    definition: 'Flesh, physical nature. Tertullian\'s De Carne Christi defends the real, human fleshliness of Christ against Docetic and Gnostic denials, and his De Resurrectione Carnis insists on the bodily resurrection of believers. The Latin caro corresponds to the Greek σάρξ (Phase 1) and anchors the Latin tradition\'s incarnational realism.',
    etymology: 'Latin: from Proto-Italic *karō (flesh, body)',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Incarnational and Bodily Realism', letter: 'C'
  },
  'natura': {
    language: 'latin',
    transliteration: 'natura', english: 'Nature',
    definition: 'Nature, innate character. Tertullian argues that in Christ duae substantiae — "two substances," divine and human — are conjoined in one persona without confusion (Adversus Praxean 27), anticipating the two-natures Christology fixed at Chalcedon more than two centuries later. natura and substantia overlap in his usage and become settled Latin Christological vocabulary.',
    etymology: 'Latin: from nasci (to be born) — "that with which one is born"',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Two-Natures Christology (Proto-Chalcedonian)', letter: 'N'
  },
  'praescriptio': {
    language: 'latin',
    transliteration: 'praescriptio', english: 'Prescription, Prior Claim',
    definition: 'A Roman legal term: a prior claim or procedural objection that defeats an opponent\'s case before it can be heard. Tertullian\'s De Praescriptione Haereticorum argues that Scripture belongs to the Church — that heretics have no standing to appeal to the Scriptures because the apostolic tradition pre-dates and circumscribes any heretical reading.',
    etymology: 'Latin: from prae- (before) + scribere (to write) — "prior writing, prior claim"',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Church\'s Prior Claim to Scripture', letter: 'P'
  },
  'anima': {
    language: 'latin',
    transliteration: 'anima', english: 'Soul',
    definition: 'Soul, animating principle. Tertullian\'s De Anima is the first full Christian treatise on the soul, defending its substantial reality (against Platonic spiritualization), a refined sense of its corporeality, and its transmission through natural generation (traducianism). The work shapes Western anthropology\'s attention to the soul as created, inherited, and bodily.',
    etymology: 'Latin: from Proto-Indo-European *h₂enh₁- (to breathe); cognate with Greek ἄνεμος',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Latin Christian Anthropology', letter: 'A'
  },
  'satisfactio': {
    language: 'latin',
    transliteration: 'satisfactio', english: 'Satisfaction, Amends',
    definition: 'Satisfaction — the restitution due for an offense. Tertullian introduces satisfactio into Christian penitential vocabulary (De Paenitentia): the penitent makes satisfactio to God through tears, fasting, and works of mercy. This juridical vocabulary becomes foundational for later Western theologies of repentance and, eventually, of atonement.',
    etymology: 'Latin: from satis (enough) + facere (to make) — "to make enough"',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Penitential and Atonement Vocabulary', letter: 'S'
  },
  'apologeticum': {
    language: 'latin',
    transliteration: 'apologeticum', english: 'Apologetic Work, Defense',
    definition: 'A written defense. Tertullian\'s Apologeticum (197 AD), addressed to Roman magistrates, is the masterpiece of early Latin apologetics — rebutting charges against Christians with juridical precision and open wit. The term, a Latinized Greek neuter, becomes the generic Latin name for the Christian apologetic genre.',
    etymology: 'Latinized Greek ἀπολογητικός, from ἀπολογέομαι (to speak in defense)',
    phase: 2.5, fathers: ['Tertullian'], connection: 'Latin Apologetic Tradition', letter: 'A'
  },
  // --- Cyprian cluster (Phase 2.5) ---
  'episcopus': {
    language: 'latin',
    transliteration: 'episcopus', english: 'Bishop, Overseer',
    definition: 'Bishop — the Latin rendering of the Greek ἐπίσκοπος (Phase 1). For Cyprian, the episcopus is the center of ecclesial unity: each local bishop holds the office in its fullness, and collectively the bishops constitute the one episcopate (episcopatus unus est) — the visible sign and instrument of the Church\'s oneness (De Unitate Ecclesiae 5).',
    etymology: 'Latinized Greek ἐπίσκοπος, from ἐπί (over) + σκοπός (watcher)',
    phase: 2.5, fathers: ['Cyprian of Carthage'], connection: 'Episcopal Collegiality and Ecclesial Unity', letter: 'E'
  },
  'cathedra Petri': {
    language: 'latin',
    transliteration: 'cathedra Petri', english: 'Chair of Peter',
    definition: 'The "chair of Peter" — the apostolic seat from which Peter governed the Church, and the figure of an episcopate grounded on a single rock. Cyprian appeals to the cathedra Petri in De Unitate Ecclesiae 4 as the image of ecclesial oneness; the phrase\'s ecclesiological weight grows steadily through later Latin tradition.',
    etymology: 'Latin cathedra (seat, chair) + Petri (of Peter)',
    phase: 2.5, fathers: ['Cyprian of Carthage'], connection: 'Petrine Foundation of Episcopal Unity', letter: 'C'
  },
  'schisma': {
    language: 'latin',
    transliteration: 'schisma', english: 'Schism, Tearing',
    definition: 'Schism — a tearing, a breach in the Church\'s unity. For Cyprian, schism is not a disagreement among co-belonging Christians but a severing from the one Body: the one who breaks from the bishop "has not the garment of Christ, whom he has torn and divided" (De Unitate Ecclesiae 7). schisma is thereby placed among the gravest spiritual disorders.',
    etymology: 'Latinized Greek σχίσμα, from σχίζω (to split, tear)',
    phase: 2.5, fathers: ['Cyprian of Carthage'], connection: 'Gravity of Ecclesial Division', letter: 'S'
  },
  'lapsi': {
    language: 'latin',
    transliteration: 'lapsi', english: 'The Lapsed',
    definition: 'The "fallen" — those who denied the faith under persecution, especially during the Decian persecution of 250 AD. Cyprian\'s De Lapsis grapples pastorally with the crisis: can the lapsi be readmitted, and under what conditions? His answer — readmission through penitential discipline mediated by the bishop — establishes a durable Western pattern for post-baptismal reconciliation.',
    etymology: 'Latin: plural of lapsus, past participle of labi (to fall, slip)',
    phase: 2.5, fathers: ['Cyprian of Carthage'], connection: 'Post-Persecution Reconciliation', letter: 'L'
  },
  'communio': {
    language: 'latin',
    transliteration: 'communio', english: 'Communion, Fellowship',
    definition: 'Communion, shared participation. In Cyprian, communio names both the bond uniting Christians to their bishop — and through him to the one Catholic Church — and the sacramental reality of the Eucharist itself. To be in communio with one\'s bishop and with the wider episcopate is to be in communio with Christ.',
    etymology: 'Latin: from communis (shared, common)',
    phase: 2.5, fathers: ['Cyprian of Carthage'], connection: 'Ecclesial and Sacramental Communion', letter: 'C'
  },
  'mater ecclesia': {
    language: 'latin',
    transliteration: 'mater ecclesia', english: 'Mother Church',
    definition: 'The Church as Mother. Cyprian\'s image (De Unitate Ecclesiae 6): "he can no longer have God for his Father who does not have the Church for his Mother." The metaphor grounds the Church\'s maternal role in begetting Christians through Baptism and nourishing them through word and sacrament — a figure that becomes permanent in Latin ecclesiology.',
    etymology: 'Latin mater (mother) + ecclesia (church, from Greek ἐκκλησία)',
    phase: 2.5, fathers: ['Cyprian of Carthage'], connection: 'Maternal Ecclesiology', letter: 'M'
  },
  'extra ecclesiam nulla salus': {
    language: 'latin',
    transliteration: 'extra ecclesiam nulla salus', english: 'No Salvation Outside the Church',
    definition: 'Literally, "outside the Church there is no salvation." Cyprian\'s dictum (Epistle 72.21, echoing De Unitate Ecclesiae 6), addressed originally to schismatics claiming saving grace apart from communion with the bishop. The formula shapes Western ecclesiology permanently and becomes a major point of later theological reception and nuance.',
    etymology: 'Latin: extra (outside) + ecclesiam (the Church) + nulla (no) + salus (salvation)',
    phase: 2.5, fathers: ['Cyprian of Carthage'], connection: 'Salvation Within Ecclesial Communion', letter: 'E'
  },
  // --- Irenaeus cluster (Phase 3) ---
  'ἀνακεφαλαίωσις': {
    transliteration: 'anakephalaiosis', english: 'Recapitulation, Summing-Up',
    definition: 'Recapitulation — Irenaeus\'s signature theological concept, drawn from Ephesians 1:10 ("to sum up all things in Christ"). In Adversus Haereses 3.18.1, 3.22.3, and throughout Book 5, Irenaeus expounds recapitulation as Christ\'s retracing of the entire arc of Adam\'s disobedience in obedience — from birth through death and resurrection — so that the whole human race is healed from within. Recapitulation is Irenaean soteriology\'s master key.',
    etymology: 'From ἀνά (again) + κεφαλαιόω (to sum up, from κεφαλή, head)',
    phase: 3, fathers: ['Irenaeus of Lyons'], connection: 'Christ Summing Up All Humanity', letter: 'Α'
  },
  'εἰκών': {
    transliteration: 'eikon', english: 'Image, Icon',
    definition: 'Image, likeness. Irenaeus develops Genesis 1:26 ("in our image and likeness") together with Colossians 1:15 ("image of the invisible God") into a structured anthropology: Christ is the εἰκών of the Father, and humanity is created according to that εἰκών. Image theology grounds both Christology and the dignity of the human person, and becomes — through Irenaeus — the Greek-Latin theological lingua franca of Christian anthropology.',
    etymology: 'From ἔοικα (to be like, resemble)',
    phase: 3, fathers: ['Irenaeus of Lyons'], connection: 'Image Theology and Christological Anthropology', letter: 'Ε'
  },
  'ὁμοίωσις': {
    transliteration: 'homoiosis', english: 'Likeness, Assimilation',
    definition: 'Likeness. Paired with εἰκών (Genesis 1:26), Irenaeus distinguishes image from likeness: the εἰκών is given in creation, the ὁμοίωσις is the goal of spiritual growth, realized only as the indwelling Spirit conforms humanity to Christ (Adversus Haereses 5.6.1; 5.16.2). The distinction founds a long Greek patristic tradition of dynamic spiritual ascent into God.',
    etymology: 'From ὁμοιόω (to make like)',
    phase: 3, fathers: ['Irenaeus of Lyons'], connection: 'Image-Likeness Distinction', letter: 'Ο'
  },
  'δύο χεῖρες': {
    transliteration: 'dyo cheires', english: 'Two Hands (of the Father)',
    definition: 'The "two hands" — Irenaeus\'s memorable figure for the Son and the Holy Spirit as the Father\'s two hands in the work of creation and redemption (Adversus Haereses 4.preface.4; 4.20.1; 5.1.3; 5.6.1). Against the gnostic multiplication of mediating aeons, Irenaeus insists the one God creates and saves directly — by his own Word and Spirit. The image anchors Trinitarian theology in concrete, scriptural language.',
    etymology: 'From δύο (two) + χεῖρες (hands, plural of χείρ)',
    phase: 3, fathers: ['Irenaeus of Lyons'], connection: 'Trinitarian Action in Creation and Redemption', letter: 'Δ'
  },
  'διαδοχή': {
    transliteration: 'diadoche', english: 'Succession',
    definition: 'Succession, handing-on. Irenaeus\'s decisive polemical move: against gnostic claims to secret apostolic teaching, he appeals to the διαδοχή of bishops in the major apostolic sees — especially Rome, Smyrna, and Ephesus (Adversus Haereses 3.3) — as the public, verifiable channel through which authentic apostolic doctrine has been preserved. Apostolic succession is thus established as a structural mark of the Church.',
    etymology: 'From διαδέχομαι (to receive one after another)',
    phase: 3, fathers: ['Irenaeus of Lyons'], connection: 'Apostolic Succession of Bishops', letter: 'Δ'
  },
  'κανὼν τῆς ἀληθείας': {
    transliteration: 'kanon tes aletheias', english: 'Rule of Truth',
    definition: 'The "Rule of Truth" — a baptismal creedal summary of the apostolic faith, received at baptism and functioning as the hermeneutical lens through which Scripture is rightly read. Irenaeus invokes the κανὼν τῆς ἀληθείας against heretical misreadings (Adversus Haereses 1.9.4, 1.22.1, 3.2.1; Epideixis 6). It is the Greek counterpart to Tertullian\'s regula fidei (Phase 2.5).',
    etymology: 'From κανών (ruler, measuring-stick) + ἀλήθεια (truth)',
    phase: 3, fathers: ['Irenaeus of Lyons'], connection: 'Creedal Hermeneutical Norm', letter: 'Κ'
  },
  'ὑπόθεσις': {
    transliteration: 'hypothesis', english: 'Plot, Underlying Narrative',
    definition: 'The underlying "plot" or narrative structure of Scripture. Irenaeus famously compares the heretics to those who take the scattered jewels of a mosaic portraying a king and rearrange them into a picture of a fox or dog (Adversus Haereses 1.8.1, 1.9.4): the pieces are scriptural, but the ὑπόθεσις — the governing story — has been replaced. Right reading requires receiving the scriptural plot as the Church has received it.',
    etymology: 'From ὑπό (under) + τίθημι (to place) — "that which is laid underneath"',
    phase: 3, fathers: ['Irenaeus of Lyons'], connection: 'Scriptural Narrative Integrity Against Heresy', letter: 'Υ'
  },
  'ψευδώνυμος γνῶσις': {
    transliteration: 'pseudonymos gnosis', english: 'Knowledge Falsely So-Called',
    definition: '"Knowledge falsely so-called" — the phrase from 1 Timothy 6:20 that Irenaeus chose as the Greek title of his magnum opus (Ἔλεγχος καὶ ἀνατροπὴ τῆς ψευδωνύμου γνώσεως, "Detection and Overthrow of Knowledge Falsely So-Called"), conventionally shortened to Adversus Haereses. The phrase frames gnostic systems as a parody of the true γνῶσις given to the Church — knowledge that claims the name without the substance.',
    etymology: 'From ψευδής (false) + ὄνομα (name) + γνῶσις (knowledge)',
    phase: 3, fathers: ['Irenaeus of Lyons'], connection: 'Refutation of Gnostic Systems', letter: 'Ψ'
  },
  'Δημιουργός': {
    transliteration: 'Demiourgos', english: 'Creator, Maker',
    definition: 'Craftsman, maker — in classical Greek, any skilled public worker; in Platonic usage, the divine artisan of the cosmos. Against Marcion, Valentinus, and other Gnostics who degraded the Δημιουργός of the Old Testament into a lesser or hostile being, Irenaeus insists that the Maker of heaven and earth is the very Father of Jesus Christ (Adversus Haereses 1.22.1; 2.1; 4.20). There is one God of both Testaments.',
    etymology: 'From δήμιος (public) + ἔργον (work)',
    phase: 3, fathers: ['Irenaeus of Lyons'], connection: 'Unity of Creator and Redeemer God', letter: 'Δ'
  },
  'πλάσμα': {
    transliteration: 'plasma', english: 'Modeled Thing, Creature',
    definition: 'That which is shaped or modeled. Irenaeus consistently names the human being the πλάσμα of God — God\'s own hand-modeled creation (cf. Genesis 2:7), not the product of inferior aeons. The choice of vocabulary underscores divine intimacy in creation: God does not merely speak humanity into being but shapes it directly with his own two hands (Adversus Haereses 5.1.3; 5.15.2–16.1).',
    etymology: 'From πλάσσω (to mold, shape)',
    phase: 3, fathers: ['Irenaeus of Lyons'], connection: 'Human Being as God\'s Own Handiwork', letter: 'Π'
  },
  'προκοπή': {
    transliteration: 'prokope', english: 'Advancement, Growth',
    definition: 'Progress, advancement. Irenaeus\'s developmental anthropology: Adam was not created perfect but infant-like, with a capacity and vocation for προκοπή — a long growth into the divine likeness (Adversus Haereses 4.38.1–3). Sin interrupted this trajectory; Christ\'s recapitulation resumes and completes it. The term grounds a patient patristic pedagogy of spiritual formation.',
    etymology: 'From προκόπτω (to cut forward, make progress)',
    phase: 3, fathers: ['Irenaeus of Lyons'], connection: 'Progressive Divinization of Humanity', letter: 'Π'
  },
  'νήπιος': {
    transliteration: 'nepios', english: 'Infant, Little Child',
    definition: 'Infant, young child. Against gnostic readings that saw Adam as created perfect and then fallen, Irenaeus argues Adam was created νήπιος — immature, destined to grow into the divine likeness through obedient use of time (Adversus Haereses 4.38.1). Sin arose from infantile impatience rather than from a fall from completion. The figure reframes the whole human project as gradual maturation.',
    etymology: 'Pre-Greek; traditionally associated with νη- (not) + ἔπος (speech) — "not yet speaking"',
    phase: 3, fathers: ['Irenaeus of Lyons'], connection: 'Infant-Adam Anthropology', letter: 'Ν'
  },
  'ἐπίδειξις': {
    transliteration: 'epideixis', english: 'Demonstration, Exposition',
    definition: 'Demonstration, exposition. The title of Irenaeus\'s second major work, Ἐπίδειξις τοῦ ἀποστολικοῦ κηρύγματος (Demonstration of the Apostolic Preaching), preserved only in an Armenian translation until its rediscovery in 1904. Where Adversus Haereses attacks error, the Epideixis builds a positive catechetical presentation of the Rule of Truth, structured around the saving economy from creation to Christ.',
    etymology: 'From ἐπί (upon) + δείκνυμι (to show)',
    phase: 3, fathers: ['Irenaeus of Lyons'], connection: 'Positive Catechetical Exposition', letter: 'Ε'
  },
  'αἵρεσις': {
    transliteration: 'hairesis', english: 'Heresy, School of Thought',
    definition: 'Originally, a "choice" or school of philosophical opinion — in pre-Christian usage, a neutral term for a philosophical party (Stoic, Epicurean, and so on). Through Irenaeus\'s Adversus Haereses, αἵρεσις takes on its permanent theological meaning: a sectarian deviation from the received apostolic faith, named and refuted by its distortion of the Rule of Truth. The book gives the category its technical shape.',
    etymology: 'From αἱρέω (to choose)',
    phase: 3, fathers: ['Irenaeus of Lyons'], connection: 'Theological Meaning of Heresy', letter: 'Α'
  },
  'σάρκωσις': {
    transliteration: 'sarkosis', english: 'Incarnation, Enfleshment',
    definition: 'Enfleshment. Against gnostic denials that a true God could unite with flesh, Irenaeus insists on the σάρκωσις of the Word: the Son genuinely became flesh (John 1:14), and it is precisely this real assumption of human σάρξ (cf. Phase 1) that makes human flesh redeemable. The term becomes a technical Greek complement to Tertullian\'s Latin incarnatio.',
    etymology: 'From σαρκόω (to make flesh, from σάρξ)',
    phase: 3, fathers: ['Irenaeus of Lyons'], connection: 'Real Incarnation Against Docetism', letter: 'Σ'
  },
  'ἀνάκρασις': {
    transliteration: 'anakrasis', english: 'Mingling, Blending',
    definition: 'Mingling, blending. Irenaeus describes the union of divinity and humanity in Christ as a real ἀνάκρασις — the Word genuinely commingling with human flesh without dissolving into it (Adversus Haereses 4.20.4; cf. 3.19). The metaphor is proto-Chalcedonian: it preserves both the reality of the union and the integrity of each element, anticipating the language that Cyril and the Chalcedonian Definition will fix (Phases 9–10).',
    etymology: 'From ἀνά (up, through) + κρᾶσις (mingling, from κεράννυμι)',
    phase: 3, fathers: ['Irenaeus of Lyons'], connection: 'Proto-Chalcedonian Christological Union', letter: 'Α'
  },
  'πλάνη': {
    transliteration: 'plane', english: 'Error, Wandering',
    definition: 'Wandering, straying, deception. Irenaeus uses πλάνη as a collective name for gnostic systems: they are not merely wrong but disorienting — leading souls astray from the apostolic path (Adversus Haereses 1.preface.2). The term evokes lost travelers whose guide is the serpent\'s deception rather than the Rule of Truth.',
    etymology: 'From πλανάω (to lead astray)',
    phase: 3, fathers: ['Irenaeus of Lyons'], connection: 'Gnostic Deception as Spiritual Wandering', letter: 'Π'
  },
  'παιδεία': {
    transliteration: 'paideia', english: 'Training, Formation, Education',
    definition: 'Formation, education — especially the long-form training of a human being. Irenaeus frames the whole history of salvation as God\'s patient παιδεία of humanity: through the successive covenants, the prophets, and finally the incarnate Son, God trains humanity to bear his presence (Adversus Haereses 4.38.1–3). Salvation is pedagogical as well as redemptive.',
    etymology: 'From παῖς (child)',
    phase: 3, fathers: ['Irenaeus of Lyons'], connection: 'Salvation as Divine Pedagogy', letter: 'Π'
  },
  'ζωοποίησις': {
    transliteration: 'zoopoiesis', english: 'Making Alive, Vivification',
    definition: 'Making alive, vivification. Irenaeus emphasizes the Holy Spirit as giver of life (ζωοποιός) throughout the saving economy — quickening dead flesh at Pentecost, in Baptism, and in the final resurrection (Adversus Haereses 5.1.3; 5.9–13). Pneumatology is thus inseparable from soteriology: the Spirit\'s proper work is the vivification of flesh.',
    etymology: 'From ζωή (life) + ποιέω (to make)',
    phase: 3, fathers: ['Irenaeus of Lyons'], connection: 'Pneumatology of Life and Resurrection', letter: 'Ζ'
  },
  'ἀρχαιότης': {
    transliteration: 'archaiotes', english: 'Antiquity',
    definition: 'Antiquity, age. One of Irenaeus\'s core polemical arguments: the apostolic faith is older than the heretical novelties. By tracing episcopal succession back to the Apostles (cf. διαδοχή) and setting the late date of heretical founders against the much earlier date of Christ\'s disciples, he deploys ἀρχαιότης as a mark of authenticity (Adversus Haereses 3.4; 3.preface).',
    etymology: 'From ἀρχαῖος (ancient, from ἀρχή, beginning)',
    phase: 3, fathers: ['Irenaeus of Lyons'], connection: 'Antiquity as Mark of Apostolic Authenticity', letter: 'Α'
  },
  'ψυχή': {
    transliteration: 'psyche', english: 'Soul',
    definition: 'Soul. Against gnostic anthropologies that despised the body and elevated the soul (or the "spiritual" over both), Irenaeus defends a tripartite unity of ψυχή, σῶμα, and πνεῦμα: the complete human being is flesh and soul animated by the life-giving Spirit (Adversus Haereses 5.6.1; 5.9.1). Anti-dualist anthropology becomes a structural feature of Orthodox theology.',
    etymology: 'From ψύχω (to breathe, blow)',
    phase: 3, fathers: ['Irenaeus of Lyons'], connection: 'Anti-Dualist Tripartite Anthropology', letter: 'Ψ'
  },
  // --- Athanasius cluster (Phase 4) ---
  'φθορά': {
    transliteration: 'phthora', english: 'Corruption, Decay',
    definition: 'Corruption — the decay into which humanity fell through sin, resulting in subjection to death and dissolution. The opening diagnosis of Athanasius\'s De Incarnatione (3–5): because human nature had its being "out of nothing" (ἐκ τοῦ μὴ ὄντος), sin set it on a return path toward non-being. Only the Word\'s entering that trajectory could reverse it.',
    etymology: 'From φθείρω (to ruin, destroy, decay)',
    phase: 4, fathers: ['Athanasius'], connection: 'Human Condition After the Fall', letter: 'Φ'
  },
  'ἀφθαρσία': {
    transliteration: 'aphtharsia', english: 'Incorruption, Imperishability',
    definition: 'Incorruption — the freedom from decay that belongs properly to God and is gifted to humanity through the Incarnation. In De Incarnatione 9, Athanasius frames the whole saving work as the Word clothing mortal flesh with his own divine ἀφθαρσία, so that what was racing toward dissolution is anchored in the imperishable life of God. Already attested in Paul (1 Corinthians 15:53–54), the term receives its systematic Christological home here.',
    etymology: 'From ἀ- (not) + φθορά (corruption)',
    phase: 4, fathers: ['Athanasius'], connection: 'Christ Clothing Humanity with Divine Incorruption', letter: 'Α'
  },
  'θέωσις': {
    transliteration: 'theosis', english: 'Deification, Divinization',
    definition: 'Deification — humanity\'s participation in the divine life. Athanasius\'s famous formula: "He became man that we might be made God" (De Incarnatione 54). Athanasius himself more often uses the verbal-noun form θεοποίησις; θέωσις becomes the standard term through the Cappadocians and Maximus. The concept anchors Orthodox soteriology: salvation is not merely forgiveness but the restoration of humanity to genuine communion with God.',
    etymology: 'From θεόω (to make divine, from θεός)',
    phase: 4, fathers: ['Athanasius'], connection: 'Salvation as Participation in God', letter: 'Θ'
  },
  'θεοποίησις': {
    transliteration: 'theopoiesis', english: 'Making-Divine, Deification',
    definition: 'The making-divine of humanity — Athanasius\'s actual preferred term (with its verb θεοποιέω) for what later tradition calls θέωσις. The emphasis falls on divine action: God makes us divine; we do not ascend by our own power (Orations Against the Arians 1.38–39, 2.70; De Decretis 14). The pair θεοποίησις / θέωσις represents the same soteriological reality under slightly different accents.',
    etymology: 'From θεός (God) + ποιέω (to make)',
    phase: 4, fathers: ['Athanasius'], connection: 'Divine Action in Deification', letter: 'Θ'
  },
  'ὁμοούσιος': {
    transliteration: 'homoousios', english: 'Consubstantial, Of the Same Essence',
    definition: '"Of the same essence" — the decisive term inserted into the Creed of Nicaea (325) to affirm that the Son is of the very same οὐσία as the Father, not a lesser or created being. Athanasius becomes ὁμοούσιος\'s most determined defender across four decades and five exiles, insisting the word guards the basic logic of salvation: only one who is God by nature (φύσει) can divinize creatures by grace (χάριτι).',
    etymology: 'From ὁμός (same) + οὐσία (essence)',
    phase: 4, fathers: ['Athanasius'], connection: 'Nicene Confession of the Son\'s Deity', letter: 'Ο'
  },
  'ὁμοιούσιος': {
    transliteration: 'homoiousios', english: 'Of Similar Essence',
    definition: '"Of like essence" — the Semi-Arian compromise position of the mid-fourth century (Basil of Ancyra and others), asserting the Son\'s likeness to the Father without full sameness. Athanasius comes to regard most ὁμοιούσιοι as genuine allies under the skin (De Synodis 41–43), willing to work toward reconciliation on the ὁμοούσιος. The famous single-iota difference between the two terms masks a real theological gravity.',
    etymology: 'From ὅμοιος (similar) + οὐσία (essence)',
    phase: 4, fathers: ['Athanasius'], connection: 'Semi-Arian Middle Position', letter: 'Ο'
  },
  'ἀνόμοιος': {
    transliteration: 'anomoios', english: 'Unlike, Dissimilar',
    definition: '"Unlike" — the radical Arian position (Aetius, Eunomius) that the Son is unlike the Father in essence. Athanasius treats the ἀνόμοιοι as Arian subordinationism laid bare: where moderate Arians had qualified their claims, the ἀνόμοιοι stated them plainly. Refuting them clarifies the full stakes of the Nicene confession.',
    etymology: 'From ἀ- (not) + ὅμοιος (similar)',
    phase: 4, fathers: ['Athanasius'], connection: 'Radical Arian Denial', letter: 'Α'
  },
  'ἀγέννητος': {
    transliteration: 'agennetos', english: 'Unbegotten',
    definition: 'Unbegotten — the property proper to God the Father. Athanasius, followed by the Cappadocians, fixes ἀγέννητος as a hypostatic property distinguishing the Father from the Son, who is γεννητός (begotten). Against the Eunomian argument that ἀγέννητος IS the very definition of God (and so the Son, being γεννητός, cannot be God), Athanasius insists ἀγέννητος names the Father\'s unique mode of being, not the divine essence itself.',
    etymology: 'From ἀ- (not) + γεννητός (begotten)',
    phase: 4, fathers: ['Athanasius'], connection: 'Father\'s Hypostatic Property', letter: 'Α'
  },
  'γεννητός': {
    transliteration: 'gennetos', english: 'Begotten',
    definition: 'Begotten — said of the Son in relation to the Father, asserting an eternal generation that is real relation but not temporal origin. The Nicene Creed\'s "begotten not made" (γεννηθέντα οὐ ποιηθέντα) fixes the distinction: γεννητός (double nu) marks the eternal Son; γενητός (single nu, "made, come-to-be") marks creatures. Athanasius polices the one-letter difference with unrelenting precision.',
    etymology: 'From γεννάω (to beget, bear)',
    phase: 4, fathers: ['Athanasius'], connection: 'Eternal Generation of the Son', letter: 'Γ'
  },
  'κτίσμα': {
    transliteration: 'ktisma', english: 'Creature, Created Thing',
    definition: 'That which is created. Arius\'s central claim: the Son is κτίσμα — the highest creature, but a creature nonetheless. Athanasius\'s Orations Against the Arians is sustained demolition of this claim: if the Son were κτίσμα, he could not possess the divine life to communicate to humanity; deification (cf. θεοποίησις) would be impossible. The one who divinizes must himself be God.',
    etymology: 'From κτίζω (to create, found)',
    phase: 4, fathers: ['Athanasius'], connection: 'Arian Claim That the Son Is Created', letter: 'Κ'
  },
  'ἐνανθρώπησις': {
    transliteration: 'enanthropesis', english: 'Becoming-Human, Incarnation',
    definition: 'The Word\'s becoming-human. Athanasius\'s preferred Greek term for the Incarnation (De Incarnatione; Orations Against the Arians 1.38), complementing the σάρκωσις of Irenaeus (Phase 3). The choice emphasizes that the Word assumed not just flesh but complete humanity (ἄνθρωπος) — body and rational soul — making the whole human being the subject of divine life.',
    etymology: 'From ἐν (in) + ἄνθρωπος (human being)',
    phase: 4, fathers: ['Athanasius'], connection: 'Word\'s Assumption of Full Humanity', letter: 'Ε'
  },
  'ἐκ τοῦ μὴ ὄντος': {
    transliteration: 'ek tou me ontos', english: 'Out of Non-Being',
    definition: '"Out of non-being" — the condition of creatures, who exist only because God calls them from nothing. The anathemas appended to the Creed of Nicaea condemn those who say of the Son that he is ἐκ τοῦ μὴ ὄντος (that is, created like other creatures). Athanasius uses the phrase in De Incarnatione 3–4 to diagnose the human trajectory back toward non-being apart from the Word\'s intervention.',
    etymology: 'From ἐκ (out of) + τοῦ μὴ ὄντος (the non-being)',
    phase: 4, fathers: ['Athanasius'], connection: 'Creaturely Contingency and Arian Christology', letter: 'Ε'
  },
  'αὐτοθεός': {
    transliteration: 'autotheos', english: 'God-Himself, True God',
    definition: '"God Himself" — Athanasius\'s term for the Son as true God by nature, not God-by-participation or God-by-name (Orations Against the Arians 1.9; 3.16). αὐτοθεός sharpens the Nicene claim: the Son is not divine as a gift received from another but as sharing the very being of the Father.',
    etymology: 'From αὐτός (self, himself) + θεός (God)',
    phase: 4, fathers: ['Athanasius'], connection: 'Son as True God by Nature', letter: 'Α'
  },
  'υἱοθεσία': {
    transliteration: 'huiothesia', english: 'Adoption as Sons',
    definition: 'Adoption as sons and daughters. Athanasius\'s key distinction: the Son is υἱὸς φύσει (Son by nature); Christians become υἱοὶ χάριτι (sons by grace) through the Incarnation and the gift of the Spirit (Orations 1.37–39; 2.59). Our υἱοθεσία depends on the Son\'s natural sonship — which is why the Son\'s full deity is the ground of our own saving adoption.',
    etymology: 'From υἱός (son) + θέσις (placing, positing); Pauline in Romans 8:15, 23',
    phase: 4, fathers: ['Athanasius'], connection: 'Participatory Sonship by Grace', letter: 'Υ'
  },
  'ἐκ τῆς οὐσίας τοῦ Πατρός': {
    transliteration: 'ek tes ousias tou patros', english: 'Of the Essence of the Father',
    definition: '"From the essence of the Father" — a clause of the original 325 Nicene Creed asserting the Son\'s derivation not from the Father\'s will or creative act but from the Father\'s very οὐσία. Athanasius defends this clause vigorously in De Decretis. The Niceno-Constantinopolitan Creed of 381 drops it, retaining only "begotten of the Father before all worlds" — but the doctrinal force is carried forward by ὁμοούσιος.',
    etymology: 'From ἐκ (out of) + τῆς οὐσίας (the essence) + τοῦ Πατρός (of the Father)',
    phase: 4, fathers: ['Athanasius'], connection: 'Nicene Derivation of the Son from the Father', letter: 'Ε'
  },
  'κανών': {
    transliteration: 'kanon', english: 'Canon, Rule, Norm',
    definition: 'Rule, measuring-stick, norm. Athanasius\'s Festal Letter 39 (367 AD) contains the first extant full list of the twenty-seven canonical books of the New Testament — exactly the ones the Church universal eventually received. The letter uses κανών in this technical scriptural sense, fixing the vocabulary by which later tradition distinguishes canonical books (βιβλία κανονιζόμενα) from other edifying writings.',
    etymology: 'From κανών (reed, measuring-rod); cf. κανὼν τῆς ἀληθείας (Phase 3)',
    phase: 4, fathers: ['Athanasius'], connection: 'Fixing of the New Testament Canon', letter: 'Κ'
  },
  'ὄργανον': {
    transliteration: 'organon', english: 'Instrument, Organ',
    definition: 'Instrument. Athanasius describes the flesh that Christ assumed as the ὄργανον through which the Word acts for human salvation — miracles, healings, death, and resurrection all worked through this human instrument by its divine subject (De Incarnatione 8, 18, 43–44). The image guards both the reality of Christ\'s human acts and the ultimate agency of the Word who acts through them.',
    etymology: 'From ἔργον (work) — literally "that with which work is done"',
    phase: 4, fathers: ['Athanasius'], connection: 'Christ\'s Flesh as the Word\'s Instrument', letter: 'Ο'
  },
  'μοναχός': {
    transliteration: 'monachos', english: 'Monk, Solitary',
    definition: 'Monk — literally "solitary," "one who is alone." Athanasius\'s Vita Antonii (Life of Antony, c. 357) is the foundational document of monastic literature, circulating quickly through Greek and Latin Christendom and shaping monasticism East and West. Through the Vita, μοναχός becomes the technical name for the Christian ascetic devoted to withdrawal, prayer, and spiritual combat.',
    etymology: 'From μόνος (alone, single)',
    phase: 4, fathers: ['Athanasius'], connection: 'Foundational Monastic Vocabulary', letter: 'Μ'
  },
  'ἀναχώρησις': {
    transliteration: 'anachoresis', english: 'Withdrawal, Retreat',
    definition: 'Withdrawal — the monk\'s physical and spiritual retreat from the world to seek God in solitude. Antony\'s ἀναχώρησις into the Egyptian desert, recounted by Athanasius in the Vita Antonii, becomes the paradigm for the whole anchoritic (ἀναχωρητικός) tradition — those who withdraw not to abandon humanity but to pray for it in concentrated solitude.',
    etymology: 'From ἀνά (back) + χωρέω (to withdraw, make space)',
    phase: 4, fathers: ['Athanasius'], connection: 'Desert Anchoritic Tradition', letter: 'Α'
  },
  'ἄσκησις': {
    transliteration: 'askesis', english: 'Ascesis, Training',
    definition: 'Training, exercise. Originally the disciplined training of athletes; in Athanasius\'s Vita Antonii, the sustained spiritual exercise of the monk — fasting, vigils, prayer, and the guarding of the heart — by which the whole person is trained toward God. The term anchors a permanent patristic grammar: holiness is a discipline as well as a gift.',
    etymology: 'From ἀσκέω (to train, practice)',
    phase: 4, fathers: ['Athanasius'], connection: 'Spiritual Discipline and Formation', letter: 'Α'
  },
  'ἡσυχία': {
    transliteration: 'hesychia', english: 'Stillness, Silence',
    definition: 'Stillness, inner silence — the cultivated quiet of heart and body that is both condition and fruit of contemplative prayer. Athanasius\'s portrait of Antony in the Vita describes this ἡσυχία as the fruit of ἄσκησις and ἀναχώρησις. The term becomes the seed of the later Orthodox hesychast tradition.',
    etymology: 'Pre-Greek; traditionally related to ἧμαι (to sit, be still)',
    phase: 4, fathers: ['Athanasius'], connection: 'Contemplative Stillness', letter: 'Η'
  },
  'ἀπάθεια': {
    transliteration: 'apatheia', english: 'Dispassion, Freedom from Passions',
    definition: 'Freedom from passions — not the absence of feeling but the reordering of the affections so they are no longer ruled by disordered desires. Athanasius presents Antony as having attained ἀπάθεια through decades of ἄσκησις (Vita Antonii 14, 67). The term gathers up a strand of Stoic ethics, reshapes it in a Christian key, and hands it forward to Evagrius, Maximus, and the whole Orthodox ascetical tradition.',
    etymology: 'From ἀ- (not) + πάθος (passion, suffering)',
    phase: 4, fathers: ['Athanasius'], connection: 'Reordering of the Passions', letter: 'Α'
  },
  // --- Basil + Gregory of Nyssa cluster (Phase 5, Cappadocian) ---
  'οὐσία': {
    transliteration: 'ousia', english: 'Essence, Substance',
    definition: 'Essence, being, substance — what a thing is. In the Cappadocian Trinitarian grammar, οὐσία names the single divine reality shared by Father, Son, and Spirit (μία οὐσία), distinguished from ὑπόστασις (the three who share it). This precise terminological discipline, fixed by Basil in Against Eunomius and in Letter 38, gives Greek theology its durable vocabulary for confessing one God in three.',
    etymology: 'From εἰμί (to be); present participle οὖσα (being)',
    phase: 5, fathers: ['Basil of Caesarea', 'Gregory of Nyssa'], connection: 'Cappadocian Trinitarian Essence', letter: 'Ο'
  },
  'ὑπόστασις': {
    transliteration: 'hypostasis', english: 'Hypostasis, Person, Subsistence',
    definition: 'Subsistence, concrete individual reality — that which stands under. The Cappadocians fix ὑπόστασις as the technical name for each of the three divine persons — Father, Son, Spirit — who share one οὐσία. Earlier Greek usage (including Athanasius, Phase 4) had sometimes used οὐσία and ὑπόστασις interchangeably; the Cappadocian precision settles the difference and allows the West\'s persona and the East\'s ὑπόστασις to be read together without confusion.',
    etymology: 'From ὑπό (under) + στάσις (standing, from ἵστημι)',
    phase: 5, fathers: ['Basil of Caesarea', 'Gregory of Nyssa'], connection: 'Trinitarian Person', letter: 'Υ'
  },
  'ἰδιότης': {
    transliteration: 'idiotes', english: 'Particularity, Individuating Property',
    definition: 'Particularity — the distinctive property that marks out one ὑπόστασις from the others. For Basil (Letter 38; On the Holy Spirit), what distinguishes Father from Son from Spirit are their ἰδιώματα: the Father\'s unbegottenness, the Son\'s begottenness, the Spirit\'s procession. The ἰδιότης is hypostatic, not essential: it constitutes the person without dividing the essence.',
    etymology: 'From ἴδιος (one\'s own, peculiar)',
    phase: 5, fathers: ['Basil of Caesarea', 'Gregory of Nyssa'], connection: 'Hypostatic Properties in the Trinity', letter: 'Ι'
  },
  'τρόπος ὑπάρξεως': {
    transliteration: 'tropos hyparxeos', english: 'Mode of Existence',
    definition: 'Mode of existence — the Cappadocian formula for how the three hypostases of the one God differ. The Father exists unbegotten; the Son, begotten; the Spirit, by procession. These are not three essences but three modes of existing the one essence. The phrase stabilizes in Basil\'s letters and receives fuller development from the two Gregorys.',
    etymology: 'From τρόπος (manner, way) + ὕπαρξις (existing, from ὑπάρχω)',
    phase: 5, fathers: ['Basil of Caesarea', 'Gregory of Nyssa'], connection: 'Hypostatic Mode of Being', letter: 'Τ'
  },
  'ἀγεννησία': {
    transliteration: 'agennesia', english: 'Unbegottenness',
    definition: 'Unbegottenness — the noun form for the property proper to the Father (cf. ἀγέννητος, Phase 4). Against Eunomius, who argued that ἀγεννησία names the very divine essence (and so the Son, not being ἀγέννητος, cannot be God), the Cappadocians distinguish: ἀγεννησία is a hypostatic property, not the essence itself. Basil and both Gregorys build sustained polemic on this distinction.',
    etymology: 'From ἀ- (not) + γεννάω (to beget)',
    phase: 5, fathers: ['Basil of Caesarea', 'Gregory of Nyssa'], connection: 'Father\'s Hypostatic Property', letter: 'Α'
  },
  'πνεῦμα': {
    transliteration: 'pneuma', english: 'Spirit, Breath, Wind',
    definition: 'Breath, wind, spirit. Basil\'s De Spiritu Sancto (375) is the foundational defense of the full deity of the Holy Πνεῦμα against the Pneumatomachoi ("Spirit-fighters"), who allowed the Son his divinity but denied it to the Spirit. Basil\'s argument from the Spirit\'s worship and glorification anchors the fourth-century consolidation of full Trinitarian confession — sealed in the Niceno-Constantinopolitan Creed of 381.',
    etymology: 'From πνέω (to blow, breathe)',
    phase: 5, fathers: ['Basil of Caesarea'], connection: 'Full Deity of the Holy Spirit', letter: 'Π'
  },
  'ὁμοτιμία': {
    transliteration: 'homotimia', english: 'Equal Honor',
    definition: 'Equal honor — Basil\'s decisive argument for the Spirit\'s deity (De Spiritu Sancto 10–27). The liturgical practice of worshipping the Spirit "together with" (συν-) Father and Son — a co-worship already fixed in the Church\'s doxology — logically requires the Spirit\'s equal divinity: only God receives the honor due to God. The argument translates doxological practice into dogmatic conclusion.',
    etymology: 'From ὁμός (same) + τιμή (honor)',
    phase: 5, fathers: ['Basil of Caesarea'], connection: 'Liturgical Argument for the Spirit\'s Deity', letter: 'Ο'
  },
  'ἐκπόρευσις': {
    transliteration: 'ekporeusis', english: 'Procession',
    definition: 'Procession — specifically, the eternal procession of the Holy Spirit from the Father (John 15:26). The Cappadocians fix ἐκπόρευσις as the Spirit\'s distinctive mode of origin, parallel to the Son\'s γέννησις (begetting). It is this precise term that the Niceno-Constantinopolitan Creed uses of the Spirit, and it is the central vocabulary of the later Filioque controversy between East and West.',
    etymology: 'From ἐκ (out of) + πορεύομαι (to go, journey)',
    phase: 5, fathers: ['Basil of Caesarea', 'Gregory of Nyssa'], connection: 'Eternal Procession of the Holy Spirit', letter: 'Ε'
  },
  'κοινωνία': {
    transliteration: 'koinonia', english: 'Communion, Fellowship',
    definition: 'Communion, shared participation. For the Cappadocians, κοινωνία names both the intra-Trinitarian reality — the one essence held in common by Father, Son, and Spirit — and the ecclesial-sacramental fellowship through which creatures are drawn into that divine life. The term connects Trinitarian theology proper with liturgy and spiritual life.',
    etymology: 'From κοινός (common, shared)',
    phase: 5, fathers: ['Basil of Caesarea', 'Gregory of Nyssa'], connection: 'Trinitarian and Ecclesial Communion', letter: 'Κ'
  },
  'μέθεξις': {
    transliteration: 'methexis', english: 'Participation',
    definition: 'Participation, partaking. Borrowing Plato\'s metaphysics of μέθεξις (creatures participating in the Forms), Gregory of Nyssa and the Cappadocian tradition refigure it theologically: creatures have no divine nature in themselves but participate in the divine life by grace. μέθεξις grounds a careful account of how finite beings can genuinely share in an infinite God without becoming infinite themselves.',
    etymology: 'From μετά (with) + ἔχω (to have, hold) — "to have with"',
    phase: 5, fathers: ['Basil of Caesarea', 'Gregory of Nyssa'], connection: 'Creaturely Participation in God', letter: 'Μ'
  },
  'θεωρία': {
    transliteration: 'theoria', english: 'Contemplation, Vision',
    definition: 'Contemplation, beholding. The higher of the two classical stages of the spiritual life (paired with πρᾶξις, active virtue): the direct, receptive contemplation of God by the purified intellect. Basil and the two Gregorys deepen a pattern that begins in Origen and Clement, and that Maximus will develop further (Phase 12). θεωρία is not abstract theorizing but the prayerful seeing of God\'s presence in Scripture and creation.',
    etymology: 'From θεωρέω (to behold, contemplate, gaze upon)',
    phase: 5, fathers: ['Basil of Caesarea', 'Gregory of Nyssa'], connection: 'Contemplative Stage of the Spiritual Life', letter: 'Θ'
  },
  'ἐπέκτασις': {
    transliteration: 'epektasis', english: 'Perpetual Straining-Forward',
    definition: 'Straining forward — from Philippians 3:13, where Paul "stretches forward" toward the prize. Gregory of Nyssa makes ἐπέκτασις the defining movement of the saved soul: because God is infinite (ἀπειρία), the soul never exhausts God and so never ceases its advance. Beatitude is thus dynamic — a perpetual receiving and reaching, never arrival. The concept reappears systematized in Maximus (Phase 12).',
    etymology: 'From ἐπί (upon, toward) + ἔκτασις (stretching, from ἐκτείνω)',
    phase: 5, fathers: ['Gregory of Nyssa'], connection: 'Infinite Progress of the Saved Soul', letter: 'Ε'
  },
  'γνόφος': {
    transliteration: 'gnophos', english: 'Darkness, Divine Gloom',
    definition: 'Thick darkness — specifically the γνόφος into which Moses entered on Mount Sinai (Exodus 20:21) to meet God. In Gregory of Nyssa\'s Life of Moses, γνόφος names the apophatic summit of the spiritual ascent: past the affirmable attributes of God, the soul enters a luminous darkness in which God is known precisely as incomprehensible. The figure grounds the whole apophatic tradition and is foundational for Pseudo-Dionysius (Phase 11).',
    etymology: 'From γνόφος / δνόφος (darkness, gloom); pre-Homeric',
    phase: 5, fathers: ['Gregory of Nyssa'], connection: 'Apophatic Summit of the Spiritual Ascent', letter: 'Γ'
  },
  'θεῖος ἔρως': {
    transliteration: 'theios eros', english: 'Divine Love, Holy Desire',
    definition: 'Divine love, holy desire. Drawing on Plato\'s Symposium and on Philo, Gregory of Nyssa baptizes ἔρως for Christian mystical theology, especially in his Homilies on the Song of Songs. Divine ἔρως is not grasping appetite but the soul\'s ardent drawing toward the infinite Beauty that has first loved it. The term feeds directly into Pseudo-Dionysius\'s Divine Names (Phase 11) and the whole later Orthodox tradition of bridal mysticism.',
    etymology: 'From θεῖος (divine) + ἔρως (desiring love)',
    phase: 5, fathers: ['Gregory of Nyssa'], connection: 'Mystical Love of the Soul for God', letter: 'Θ'
  },
  'ἀπειρία': {
    transliteration: 'apeiria', english: 'Infinity, Unboundedness',
    definition: 'Infinity, unboundedness. Gregory of Nyssa makes divine ἀπειρία — not vast scale, but genuine non-finiteness — the structural ground of both theology proper and spiritual life: God is infinite, so God can never be circumscribed, comprehended, or exhausted. This grounds both apophatic knowledge of God (we cannot comprehend what has no limit) and perpetual ἐπέκτασις (the soul\'s advance into God never reaches a last step).',
    etymology: 'From ἀ- (not) + πεῖραρ (limit, boundary)',
    phase: 5, fathers: ['Gregory of Nyssa'], connection: 'Divine Infinity as Ground of Apophatic Theology', letter: 'Α'
  },
  'διάστημα': {
    transliteration: 'diastema', english: 'Interval, Extension',
    definition: 'Interval — Gregory of Nyssa\'s key ontological category for the condition of all created being. Creatures exist in διάστημα: temporal succession, spatial extension, and the gap between one moment and the next. God, by contrast, is ἀδιάστατος — without interval, undivided, present wholly to himself. This distinction undergirds Gregory\'s apophatic theology and his account of creaturely progress in God.',
    etymology: 'From διά (through) + ἵστημι (to stand) — "that which stands between"',
    phase: 5, fathers: ['Gregory of Nyssa'], connection: 'Ontological Gap Between Creator and Creature', letter: 'Δ'
  },
  'ἀκολουθία': {
    transliteration: 'akolouthia', english: 'Sequence, Following',
    definition: 'Sequence, proper order of following. For Gregory of Nyssa, ἀκολουθία names the internal logic of Scripture and of the spiritual life: each moment, each word, each virtue follows its predecessor in a cosmic choreography that the discerning reader or ascetic traces. The concept structures his Life of Moses and Homilies on the Song of Songs as continuous stages of ascent.',
    etymology: 'From ἀκόλουθος (following), from ἀ- (together) + κέλευθος (path)',
    phase: 5, fathers: ['Gregory of Nyssa'], connection: 'Scriptural and Spiritual Sequence', letter: 'Α'
  },
  'παρρησία': {
    transliteration: 'parrhesia', english: 'Boldness, Free Speech',
    definition: 'Boldness, free and confident speech — the free standing of one who may speak without fear before a sovereign. In Gregory of Nyssa\'s theology, παρρησία is lost in the Fall and restored in Christ: the saved soul recovers its original παρρησία before God. The term carries its classical-political weight (the citizen\'s free speech in the Athenian assembly) baptized as the Christian\'s recovered standing with the Father.',
    etymology: 'From πᾶν (all) + ῥῆσις (speech)',
    phase: 5, fathers: ['Gregory of Nyssa'], connection: 'Restored Freedom Before God', letter: 'Π'
  },
  'τελειότης': {
    transliteration: 'teleiotes', english: 'Perfection, Completion',
    definition: 'Perfection, completion. Gregory of Nyssa transforms the classical ideal of τελειότης: because God is infinite, "perfection" for the creature is not a fixed end-state but a perpetual movement into God (cf. ἐπέκτασις). Christian τελειότης is never static. The reframing grounds a dynamic anthropology of unending spiritual growth.',
    etymology: 'From τέλος (end, goal, completion)',
    phase: 5, fathers: ['Gregory of Nyssa'], connection: 'Dynamic Perfection as Unending Growth', letter: 'Τ'
  },
  'κάλλος': {
    transliteration: 'kallos', english: 'Beauty',
    definition: 'Beauty. Gregory of Nyssa\'s deeply aesthetic theology: God is the archetypal κάλλος, and all created beauty is a participated reflection drawing the soul back to its Source (Homilies on the Song of Songs; On the Making of Man 12). Gregory\'s κάλλος is both metaphysical (Beauty as a divine attribute) and ascetical (the soul beautified by approximating its Archetype).',
    etymology: 'Pre-Greek; cognate with καλός (beautiful, noble)',
    phase: 5, fathers: ['Gregory of Nyssa'], connection: 'Beauty as Divine Attribute and Spiritual Goal', letter: 'Κ'
  },
  'κοινόβιον': {
    transliteration: 'koinobion', english: 'Cenobitic Community',
    definition: 'Community life — the shared monastic household. Basil\'s Asketikon (Long Rules and Short Rules) develops the κοινόβιον as the normative form of Christian asceticism, in contrast to the solitary anchoritic tradition of Antony (Phase 4). Basil argues that the gospel commandments of love cannot be practiced alone; communal monasticism is therefore theologically required, not merely pastorally prudent. The pattern becomes the foundation of Eastern monasticism.',
    etymology: 'From κοινός (common) + βίος (life)',
    phase: 5, fathers: ['Basil of Caesarea'], connection: 'Cenobitic Monastic Life', letter: 'Κ'
  },
  'φιλανθρωπία': {
    transliteration: 'philanthropia', english: 'Love of Humanity',
    definition: 'Love of humanity. A classical virtue that Basil translates into institutional practice: the Basileiad outside Caesarea (c. 370s) — a complex of hospitals, hospices, and shelters for the poor and the sick — is perhaps the first organized Christian charitable institution at scale, a visible φιλανθρωπία answering God\'s own love for humanity. The term anchors a patristic theology of social mercy that shapes later Byzantine charitable foundations.',
    etymology: 'From φίλος (loving) + ἄνθρωπος (human being)',
    phase: 5, fathers: ['Basil of Caesarea'], connection: 'Christian Charitable Institutions', letter: 'Φ'
  },
  // --- Gregory Nazianzen cluster (Phase 6) ---
  'θεολογία': {
    transliteration: 'theologia', english: 'Theology, Discourse on God',
    definition: 'Theology — the discourse concerning God. Gregory Nazianzen so deeply shapes this word that he alone among the Fathers (with the Evangelist John and Symeon the New Theologian) bears the title ὁ Θεολόγος, "the Theologian." His Five Theological Orations (Or. 27–31), delivered at Constantinople in 380, fix the Orthodox pattern: theology is purified speech about God, approached with fear and doxological reserve, ordered to communion rather than curiosity.',
    etymology: 'From θεός (God) + λόγος (word, discourse)',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Theology as Purified Speech About God', letter: 'Θ'
  },
  'φύσις': {
    transliteration: 'physis', english: 'Nature',
    definition: 'Nature — that which makes a thing what it is. Gregory uses φύσις in pre-Chalcedonian Christology to name Christ\'s two realities, divine and human: the one Christ exists ἐν δυσὶ φύσεσιν, "in two natures" (Letter 101). φύσις overlaps in his usage with οὐσία (Phase 5); the precise distinction between the two terms will be fixed at Chalcedon (Phases 9–10). Gregory\'s framework prepares that later precision.',
    etymology: 'From φύω (to grow, bring forth)',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Two Natures in the One Christ', letter: 'Φ'
  },
  'σχέσις': {
    transliteration: 'schesis', english: 'Relation, Relationship',
    definition: 'Relation. Gregory Nazianzen argues that what distinguishes the three hypostases of the Trinity from one another is not their essence (one) or their activity (one) but their σχέσεις — their mutual relations: Father to Son, Son to Father, Spirit to Father (Or. 29.16; 31.9). The Father is Father only in relation to the Son; the Son, Son only in relation to the Father. Relational identity anchors Trinitarian distinction without dividing the divine essence.',
    etymology: 'From ἔχω (to have, hold) — "a way of having oneself in relation to another"',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Trinitarian Relations of Origin', letter: 'Σ'
  },
  'Θεολόγος': {
    transliteration: 'Theologos', english: 'The Theologian',
    definition: '"The Theologian" — the epithet applied in Orthodox tradition to only three figures: John the Evangelist (for the prologue to his Gospel), Gregory of Nazianzus (for his Five Theological Orations), and Symeon the New Theologian (for his Mystical Hymns). That Gregory alone among the Fathers receives this title marks the degree to which his treatment of God\'s being in the Five Orations became the Orthodox grammar for speaking of God.',
    etymology: 'From θεός (God) + λόγος (word) — "one who speaks of God"',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Gregory as the Theologian of the Trinity', letter: 'Θ'
  },
  'Μονάς': {
    transliteration: 'Monas', english: 'Monad, Unity',
    definition: 'Monad — unity, the divine oneness. Gregory articulates the Trinitarian mystery in doxological rhythm: "No sooner do I conceive of the One (Μονάς) than I am illumined by the splendor of the Three (Τριάς); no sooner do I distinguish the Three than I am carried back to the One" (Or. 40.41). The movement from Μονάς to Τριάς and back describes the living experience of Trinitarian prayer.',
    etymology: 'From μόνος (alone, single)',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Doxological Unity of God', letter: 'Μ'
  },
  'Τριάς': {
    transliteration: 'Trias', english: 'Triad, Trinity',
    definition: 'Triad — the threeness of God, shining through and from the Μονάς. For Gregory, the Τριάς is not an arithmetic three set alongside the one, but the one God known in three ἰδιότητες, three σχέσεις. The term pre-dates him (it goes back at least to Theophilus of Antioch in the second century), but Gregory\'s Theological Orations give it its classical Orthodox grammar.',
    etymology: 'From τρεῖς (three)',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Trinity as One God in Three', letter: 'Τ'
  },
  'ἀρχή': {
    transliteration: 'arche', english: 'Beginning, Principle, Source',
    definition: 'Beginning, principle, source. For Gregory, the Father is the μόνη ἀρχή — the single source of divinity within the Trinity, from whom the Son is eternally begotten and the Spirit eternally proceeds (Or. 42.15). The monarchy of the Father secures the unity of the Godhead without collapsing the three hypostases into one. This is the Eastern grammar of Trinitarian origin.',
    etymology: 'From ἄρχω (to begin, to rule)',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Monarchy of the Father', letter: 'Α'
  },
  'ἀπρόσληπτον': {
    transliteration: 'aproslepton', english: 'Unassumed, Not Taken Up',
    definition: '"Unassumed" — the technical term in Gregory\'s Letter 101 to Cledonius (c. 381–383) for anything of human nature that the Word did not take up in the Incarnation. Gregory refutes Apollinarius, who denied Christ a human rational soul: if the soul is ἀπρόσληπτον, it is ἀθεράπευτον — unhealed. The argument requires that Christ assumed a complete human nature, body and rational soul alike.',
    etymology: 'From ἀ- (not) + προσλαμβάνω (to take to oneself)',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Completeness of Christ\'s Human Nature', letter: 'Α'
  },
  'ὃ ἀπρόσληπτον ἀθεράπευτον': {
    transliteration: 'ho aproslepton atherapeuton', english: 'What Is Not Assumed Is Not Healed',
    definition: 'Gregory\'s famous Christological dictum from Letter 101.5 to Cledonius: τὸ γὰρ ἀπρόσληπτον, ἀθεράπευτον — "what is not assumed is not healed." The principle fixes soteriology to Christology: Christ\'s saving work reaches every dimension of human nature precisely because he assumed every dimension. Against Apollinarius (and in principle against every reduction of Christ\'s humanity), the dictum requires a whole Christ for a whole salvation.',
    etymology: 'From ὅς (which, that which) + ἀπρόσληπτον (unassumed) + ἀθεράπευτον (unhealed)',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Soteriological Ground of Full Incarnation', letter: 'Ο'
  },
  'κένωσις': {
    transliteration: 'kenosis', english: 'Self-Emptying',
    definition: 'Self-emptying — from Philippians 2:7, where Christ "emptied himself" (ἑαυτὸν ἐκένωσεν) in taking the form of a servant. Gregory develops κένωσις as the shape of the Son\'s condescension: not the loss of divinity but the free assumption of the creaturely condition (Or. 29.18–20; 37.2). The term becomes a permanent Greek patristic vocabulary for the logic of the Incarnation as humility and gift.',
    etymology: 'From κενόω (to empty, from κενός, empty)',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Incarnation as Divine Self-Emptying', letter: 'Κ'
  },
  'θεοφάνεια': {
    transliteration: 'theophaneia', english: 'Theophany, Manifestation of God',
    definition: 'God\'s manifestation, divine appearance. Gregory\'s Orations 38 (on the Nativity) and 39 (on the Baptism) frame both feasts as a single θεοφάνεια — the shining-forth of God in the flesh. Or. 38 opens with one of the great patristic Christmas sermons: "Christ is born, give glory! Christ from heaven, meet him!" The term gives the Eastern feast of Theophany / Epiphany its name.',
    etymology: 'From θεός (God) + φαίνω (to appear, shine)',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Incarnation as Divine Manifestation', letter: 'Θ'
  },
  'ἱερωσύνη': {
    transliteration: 'hierosyne', english: 'Priesthood',
    definition: 'Priesthood, the priestly office. Gregory\'s Oration 2, a self-defense for having fled the priesthood, is the foundational patristic treatise on the pastoral office — its weight, its perils, and its dignity. It is closely read and reworked by John Chrysostom in his own On the Priesthood (Phase 7), and passes on through Gregory the Great\'s Pastoral Rule into the Latin West.',
    etymology: 'From ἱερεύς (priest)',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Patristic Theology of the Pastoral Office', letter: 'Ι'
  },
  'ποιμήν': {
    transliteration: 'poimen', english: 'Shepherd, Pastor',
    definition: 'Shepherd. Gregory frames the pastoral office in terms of the Good Shepherd (John 10): the ποιμήν bears direct responsibility for the souls entrusted to him, and will answer for each before the Chief Shepherd (Or. 2). The biblical image shapes a millennium of patristic and medieval pastoral theology.',
    etymology: 'From ποιμαίνω (to tend, pasture)',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Pastoral Responsibility for Souls', letter: 'Π'
  },
  'φῶς': {
    transliteration: 'phos', english: 'Light',
    definition: 'Light. Gregory\'s theology is saturated with light imagery: God is Light, Christ is "Light from Light" (the Nicene Creed, which Gregory\'s generation consolidates), and the saints are illumined by participation. Oration 40, on Holy Baptism, weaves light into every turn of sacramental and moral exposition. Gregory\'s φῶς grounds the later Orthodox theology of divine light.',
    etymology: 'From φάος / φῶς (light); cognate with φαίνω',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Theology of Divine Light', letter: 'Φ'
  },
  'τὰ τρία φῶτα': {
    transliteration: 'ta tria phota', english: 'The Three Lights',
    definition: '"The three lights" — Gregory\'s image for the Trinity as three unified illuminations of the one divine light (Or. 31.3; 40.5, 40.41). Because the three hypostases share one divine nature, they are three lights from one Light, each indivisibly carrying the whole. The figure anchors his doxological Trinitarianism: the Trinity is first experienced as encompassing radiance, then articulated as dogma.',
    etymology: 'From τὰ τρία (the three) + φῶτα (lights, plural of φῶς)',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Trinity as Three Unified Lights', letter: 'Τ'
  },
  'κάθαρσις': {
    transliteration: 'katharsis', english: 'Purification, Cleansing',
    definition: 'Purification, cleansing. For Gregory, κάθαρσις is the indispensable prerequisite for theology: one must be purified before speaking of God — and even then, one must speak with fear (Or. 27.3). Theological speech without purification corrupts both speaker and hearer. The principle grounds a long Orthodox tradition joining moral-ascetical discipline to theological competence.',
    etymology: 'From καθαίρω (to cleanse, purify)',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Purification as Prerequisite for Theology', letter: 'Κ'
  },
  'ἔλλαμψις': {
    transliteration: 'ellampsis', english: 'Illumination, In-Shining',
    definition: 'Illumination, in-shining. Gregory\'s preferred term for the divine light\'s effect on the soul — the Spirit\'s in-shining that follows κάθαρσις. Where Justin\'s φωτισμός (Phase 2) names Baptism itself, Gregory\'s ἔλλαμψις names the continuing effulgence of divine light in the purified soul. The term is taken up heavily in Pseudo-Dionysius (Phase 11).',
    etymology: 'From ἐν (in) + λάμπω (to shine)',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Divine Light In-Shining the Purified Soul', letter: 'Ε'
  },
  'ἀπόρρητον': {
    transliteration: 'aporrheton', english: 'Ineffable, Unspeakable',
    definition: 'Ineffable, not to be spoken. For Gregory, the inmost divine reality is ἀπόρρητον: not that we cannot say anything true of God, but that no human speech can exhaust or contain him. Apophatic reserve and doxological wonder — not skeptical silence — are the proper response (Or. 28). The term is a structural element of the Orthodox theology of divine incomprehensibility.',
    etymology: 'From ἀπό (away) + ῥητός (spoken, from λέγω)',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Ineffability of the Divine Essence', letter: 'Α'
  },
  'ὑπεροχή': {
    transliteration: 'hyperoche', english: 'Transcendence, Preeminence',
    definition: 'Transcendence, preeminence. Gregory applies ὑπεροχή to the divine being: God is beyond every category of created thought and speech (Or. 28). The prefix ὑπερ- ("above, beyond") becomes, in the hands of later apophatic theologians, a whole grammar of speech-beyond-speech — most systematically in Pseudo-Dionysius (Phase 11).',
    etymology: 'From ὑπέρ (above, beyond) + ἔχω (to have, hold)',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Divine Transcendence Beyond Categories', letter: 'Υ'
  },
  'ἀναγωγή': {
    transliteration: 'anagoge', english: 'Anagogy, Upward Leading',
    definition: 'Upward leading, anagogical ascent. Gregory uses ἀναγωγή for the soul\'s Spirit-led rising through Scripture and liturgy toward God, and for the preacher\'s work in drawing hearers with him in that ascent. The concept descends from Origen\'s exegesis and is taken up by the later Eastern mystical and exegetical tradition.',
    etymology: 'From ἀνά (up) + ἄγω (to lead)',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Anagogical Ascent Through Scripture and Liturgy', letter: 'Α'
  },
  'θεσπέσιος': {
    transliteration: 'thespesios', english: 'Divinely Inspired, Wondrous',
    definition: 'Divinely inspired, heavenly. Gregory reserves θεσπέσιος for persons or realities touched by unmistakable divine presence: the great saints, the mystery of the Trinity, the incarnate Christ. The word carries the high classical register of Homeric Greek, now pressed into the service of Christian wonder. Part of Gregory\'s signature stylistic contribution: a theology whose very register sounds like its subject.',
    etymology: 'From θεός (God) + ἔπος (word, utterance); Homeric θεσπέσιος',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Register of Wonder in Theological Speech', letter: 'Θ'
  },
  'διαίρεσις': {
    transliteration: 'diairesis', english: 'Distinction, Division',
    definition: 'Distinction, division. Gregory\'s Trinitarian pattern holds in tension two adverbs: the three hypostases are distinguishable without being divisible — διαιρετῶς yet ἀδιαιρέτως (Or. 31.14). Real distinction (διαίρεσις) protects against modalism; real unity (ἕνωσις, Phase 1) protects against tritheism. The pair holds the Orthodox confession in equilibrium.',
    etymology: 'From διά (through, apart) + αἱρέω (to take)',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Trinitarian Distinction Without Division', letter: 'Δ'
  },
  'οἰκονομία': {
    transliteration: 'oikonomia', english: 'Economy, Ordered Plan',
    definition: 'Economy — God\'s ordered dispensation in history. Gregory programmatically distinguishes θεολογία (speech concerning the eternal triune God) from οἰκονομία (speech concerning God\'s saving acts in time): Or. 29.18 reads the Son\'s lowly sayings as spoken οἰκονομικῶς, in the mode of the economy, not as a diminishment of his eternal divinity. The θεολογία / οἰκονομία pair becomes the classic Greek patristic grammar for reading Christological paradox — and is systematized further by Maximus the Confessor (Phase 12).',
    etymology: 'From οἶκος (house, household) + νόμος (law, management) — "household ordering"',
    phase: 6, fathers: ['Gregory of Nazianzus'], connection: 'Theology vs Economy — The Cappadocian Distinction', letter: 'Ο'
  },
  // --- John Chrysostom cluster (Phase 7) ---
  'μετάνοια': {
    transliteration: 'metanoia', english: 'Repentance, Change of Mind',
    definition: 'Repentance — not regretful feeling but a fundamental change of mind that reorients the whole person toward God. Chrysostom returns to μετάνοια with an insistence almost unmatched in the patristic corpus, treating it as the continuous disposition of Christian life rather than an occasional crisis. His Homilies on Repentance and innumerable passages in the Homilies on Matthew and on the Statues frame μετάνοια as God\'s perpetual, hopeful offer — "even if you have fallen a thousand times, a thousand times come back."',
    etymology: 'From μετά (after, change) + νοῦς (mind)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'Continuous Repentance as Christian Life', letter: 'Μ'
  },
  'ἐλεημοσύνη': {
    transliteration: 'eleemosyne', english: 'Almsgiving, Merciful Deed',
    definition: 'Almsgiving — the merciful giving that answers God\'s own mercy toward us. For Chrysostom, ἐλεημοσύνη is the "queen of virtues" (Hom. in Heb. 32.6): the practical sacrament by which the rich meet Christ in the poor (Matthew 25). His Homilies on Matthew, on Lazarus and the Rich Man, and on 1 Corinthians press the demand with unflinching force. Almsgiving is not philanthropy but liturgy continued outside the church doors.',
    etymology: 'From ἔλεος (mercy)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'Almsgiving as Liturgy of Mercy', letter: 'Ε'
  },
  'δικαιοσύνη': {
    transliteration: 'dikaiosyne', english: 'Righteousness, Justice',
    definition: 'Righteousness, justice. For Chrysostom — the most sustained Pauline commentator of the patristic era — δικαιοσύνη in Romans and Galatians names God\'s gift in Christ, not an autonomous human achievement. Yet Chrysostom insists that genuine δικαιοσύνη before God cannot be separated from δικαιοσύνη toward the poor: the same righteousness that receives also gives. The homilies on Romans and on Matthew hold the forensic and ethical senses together.',
    etymology: 'From δίκη (custom, right, judgment)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'Integrated Righteousness Before God and Neighbor', letter: 'Δ'
  },
  'συγκατάβασις': {
    transliteration: 'synkatabasis', english: 'Condescension, Divine Accommodation',
    definition: 'Coming-down-with, divine accommodation. Chrysostom\'s signature hermeneutical and Christological concept: God stoops to human weakness — in Scripture\'s human speech, in the Incarnation, in the sacraments — in order to meet us where we are. συγκατάβασις names not a lowering of divinity but a loving economy of adaptation, the shape of all God\'s self-communication (Hom. in Gen. 3.1; Hom. in Matt. passim).',
    etymology: 'From σύν (with) + κατά (down) + βαίνω (to go)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'God\'s Accommodation to Human Weakness', letter: 'Σ'
  },
  'φιλοπτωχία': {
    transliteration: 'philoptochia', english: 'Love of the Poor',
    definition: 'Love of the poor. Chrysostom\'s signature virtue and demand: the Christian is defined by concrete, practical love of the πτωχοί — the destitute, whom Christ himself names as his brothers and sisters (Matthew 25). The word appears in his Homilies on 2 Corinthians and Hebrews; the reality animates his preaching from Antioch to Constantinople. When Chrysostom speaks of the altar, he insists there is another altar also: the poor in the street.',
    etymology: 'From φίλος (loving) + πτωχός (beggar, destitute)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'The Poor as the Other Altar', letter: 'Φ'
  },
  'ἀκατάληπτος': {
    transliteration: 'akataleptos', english: 'Incomprehensible, Unseizable',
    definition: 'Incomprehensible — the one who cannot be grasped. Chrysostom\'s Homilies On the Incomprehensible Nature of God (Antioch, 386–387) confront the Anomoeans (Phase 4, ἀνόμοιος), who claimed the divine essence could be exactly known. Chrysostom argues: even the angels veil their faces before God; the Son alone knows the Father. Apophatic theology here is pastoral preaching, not philosophical exercise.',
    etymology: 'From ἀ- (not) + καταλαμβάνω (to seize, comprehend)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'Divine Incomprehensibility Against Anomoean Rationalism', letter: 'Α'
  },
  'ἀκρίβεια': {
    transliteration: 'akribeia', english: 'Exactness, Precision',
    definition: 'Exactness, precise accuracy. Chrysostom\'s exegetical ideal: to weigh each word and phrase of Scripture in its full precision, neither allegorizing it away nor flattening it into abstraction. The Antiochene school\'s ἀκρίβεια stands in productive tension with the Alexandrian emphasis on ἀναγωγή (Phase 6). For Chrysostom, ἀκρίβεια and pastoral συγκατάβασις work together — precision in the service of souls.',
    etymology: 'From ἀκριβής (exact, accurate)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'Antiochene Exegetical Precision', letter: 'Α'
  },
  'ψυχαγωγία': {
    transliteration: 'psychagogia', english: 'Soul-Guidance, Leading of Souls',
    definition: 'Leading of souls. For Chrysostom, preaching is ψυχαγωγία before it is instruction: the preacher\'s office is to lead souls by holy persuasion toward virtue and toward God (Hom. in Acta 1; On the Priesthood 4–5). The term, originally applied to the orator\'s art, is baptized into pastoral theology: every homily is a small soul-leading, a patient drawing of the hearer upward.',
    etymology: 'From ψυχή (soul) + ἀγωγή (leading, from ἄγω)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'Preaching as Pastoral Soul-Leading', letter: 'Ψ'
  },
  'διόρθωσις': {
    transliteration: 'diorthosis', english: 'Correction, Setting Right',
    definition: 'Correction, straightening. Chrysostom\'s pastoral aim in preaching: not to condemn but to set right — to διορθόω — the lives and consciences of his hearers. The Homilies on the Statues (after the 387 riot at Antioch) are a sustained exercise in pastoral διόρθωσις: a terrified city led back toward God through preaching that exposes sin with one hand and offers mercy with the other.',
    etymology: 'From διά (through) + ὀρθόω (to make straight)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'Preaching as Pastoral Correction', letter: 'Δ'
  },
  'ὁμιλία': {
    transliteration: 'homilia', english: 'Homily, Discourse',
    definition: 'Discourse, homily — originally the "company" or conversation of speakers. Chrysostom is the homily\'s supreme patristic master: more than seven hundred of his ὁμιλίαι survive, including complete consecutive series on the Gospels of Matthew and John and every Pauline letter. The term — and with it the genre of the Christian sermon as extended, exegetical, pastoral address — is fixed by his example.',
    etymology: 'From ὁμός (together, common) + εἴλη (assembly)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'Homily as Patristic Genre', letter: 'Ο'
  },
  'κενοδοξία': {
    transliteration: 'kenodoxia', english: 'Vainglory',
    definition: 'Empty glory — the hunger for recognition and praise from others. Chrysostom\'s Address on Vainglory and the Right Way for Parents to Bring Up Their Children (c. 390) diagnoses κενοδοξία as the defining spiritual disease of his Christianized imperial culture: success, display, and public honor masking an empty interior. The work is one of the earliest sustained patristic treatises on Christian education.',
    etymology: 'From κενός (empty) + δόξα (glory, opinion)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'Spiritual Disease of Christian Imperial Culture', letter: 'Κ'
  },
  'πρόνοια': {
    transliteration: 'pronoia', english: 'Providence, Foresight',
    definition: 'Providence — divine foresight and governance. Written from exile (404–407), Chrysostom\'s On the Providence of God insists that no adversity, no injustice, no apparent defeat of the just falls outside God\'s wise ordering. The treatise is a pastoral-theological working-out of his own condition: confidence in πρόνοια steadies the suffering soul because God\'s governance, though often hidden, is never absent.',
    etymology: 'From πρό (before) + νοέω (to perceive, understand)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'Divine Providence in Suffering', letter: 'Π'
  },
  'ὑπομονή': {
    transliteration: 'hypomone', english: 'Endurance, Patient Bearing',
    definition: 'Endurance, patient bearing-up. Chrysostom both preaches and embodies ὑπομονή: his final years in exile (404–407), culminating in a forced march that ended in his death, are the proving ground for the virtue he had preached for decades. The term in Hebrews 12:1 frames the Christian life as a running with ὑπομονή; Chrysostom\'s exile letters develop the image into a full ascetic theology of suffering.',
    etymology: 'From ὑπό (under) + μένω (to remain)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'Patient Endurance Under Suffering', letter: 'Υ'
  },
  'ταπεινοφροσύνη': {
    transliteration: 'tapeinophrosyne', english: 'Humility, Lowly-Mindedness',
    definition: 'Humble-mindedness. Chrysostom returns to ταπεινοφροσύνη repeatedly as the presupposition of every other virtue: without it, almsgiving hardens into pride and prayer into performance (Hom. in Phil. 7 on Phil 2:3). The virtue is distinctively Christian in its patristic contour — pagan antiquity saw humility as a vice of the slave; the gospel reframes it as the shape of Christ.',
    etymology: 'From ταπεινός (low, humble) + φρόνησις (mindedness)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'Humility as Ground of All Virtue', letter: 'Τ'
  },
  'θεία Λειτουργία': {
    transliteration: 'theia Leitourgia', english: 'Divine Liturgy',
    definition: 'The Divine Liturgy. The shorter of the two principal Byzantine Eucharistic rites bears Chrysostom\'s name — the Θεία Λειτουργία τοῦ ἁγίου πατρὸς ἡμῶν Ἰωάννου τοῦ Χρυσοστόμου — and is used in Orthodox churches the world over for most Sundays and weekdays of the year. The attribution is ancient though complex (the text evolved across centuries); the shape and many of the prayers trace to Chrysostom\'s Antiochene-Constantinopolitan context.',
    etymology: 'From θεῖος (divine) + λειτουργία (public work, service, from λαός + ἔργον)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'Liturgy of St. John Chrysostom', letter: 'Θ'
  },
  'θυσία': {
    transliteration: 'thysia', english: 'Sacrifice, Offering',
    definition: 'Sacrifice. Chrysostom\'s Eucharistic theology (esp. Hom. in Heb. 17; On the Priesthood 3) emphasizes that the Eucharist is a true θυσία — not a new sacrifice of Christ but the one sacrifice of Calvary made present in every generation on every altar. The one θυσία, eternally accepted, is offered here and now for the remission of sins and the life of the world.',
    etymology: 'From θύω (to sacrifice, offer)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'Eucharist as the One Sacrifice Made Present', letter: 'Θ'
  },
  'προσφορά': {
    transliteration: 'prosphora', english: 'Offering, Oblation',
    definition: 'Offering. The προσφορά is both the act of offering in the Liturgy and the loaf of eucharistic bread itself — brought forward from the faithful, stamped with the seal of the Church, and offered at the altar. Chrysostom underscores the προσφορά as the people\'s participation in the priestly act: the faithful are not spectators but concelebrants, offering their own gifts to be transformed by the Spirit into Christ\'s body (Hom. in 2 Cor. 18.3).',
    etymology: 'From πρός (to) + φέρω (to bring, bear)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'Eucharistic Offering of the Faithful', letter: 'Π'
  },
  'ἁγιασμός': {
    transliteration: 'hagiasmos', english: 'Sanctification, Holiness',
    definition: 'Sanctification, the becoming-holy. Chrysostom frames the Christian life as progressive ἁγιασμός worked by the Holy Spirit on the foundation of Baptism: sanctification is the whole concrete shape of Christian growth, not a moment but a trajectory (Hom. in Rom. 12 on Rom 6:19). The term anchors Chrysostom\'s characteristic refusal to split justification from sanctification: both name the one saving work of God in us.',
    etymology: 'From ἅγιος (holy)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'Progressive Sanctification in the Christian Life', letter: 'Α'
  },
  'διακονία': {
    transliteration: 'diakonia', english: 'Ministry, Service',
    definition: 'Ministry, service. For Chrysostom, διακονία names both the specific office of the deacon (cf. διάκονος, Phase 1) and the whole Christian ethic of service — the shape of every Christian life lived in imitation of the Son who "came not to be served but to serve" (Mark 10:45). Chrysostom presses the word\'s root meaning continually: holiness is διακονία, and even the priesthood is a διακονία before it is a dignity.',
    etymology: 'From διάκονος (servant)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'Christian Life as Service', letter: 'Δ'
  },
  'συντέλεια': {
    transliteration: 'synteleia', english: 'Consummation, End of the Age',
    definition: 'Consummation, the end of the age. Chrysostom draws on the Matthean phrase "the consummation of the age" (ἡ συντέλεια τοῦ αἰῶνος, Matt 28:20) to frame Christian history eschatologically: all of time flows toward its completion in Christ. The term grounds his pastoral insistence that present conduct is measured against the approaching συντέλεια — neither panicked nor complacent.',
    etymology: 'From σύν (together) + τέλος (end, completion)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'Eschatological Horizon of Christian Life', letter: 'Σ'
  },
  'πλοῦτος': {
    transliteration: 'ploutos', english: 'Wealth, Riches',
    definition: 'Wealth. Chrysostom\'s treatment of πλοῦτος is among the most searing in Christian history. In the Homilies on Lazarus and the Rich Man, on 1 Corinthians, and on Matthew, he argues that hoarded wealth in a city of beggars is theft — not because God requires poverty, but because excess possessed alongside a starving neighbor constitutes an inward robbery of that neighbor. The preacher presses the hearer toward ἐλεημοσύνη as the only honest response.',
    etymology: 'Pre-Greek; perhaps related to πίμπλημι (to fill)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'Theology of Wealth and Its Redistribution', letter: 'Π',
    pastoralNote: 'Read across the full breadth of Chrysostom\'s corpus, the target of his sharpest language is not ownership as such but hoarding amid need and the insulation of wealth from mercy. The wider patristic consensus preserves a theology of stewardship and discernment for the lay vocation — possessions held under God and spent in love — while reserving absolute material renunciation for the monastic call. Chrysostom himself presupposes this distinction even where his rhetoric is most uncompromising.'
  },
  'ἀνάγνωσις': {
    transliteration: 'anagnosis', english: 'Reading, Scripture Reading',
    definition: 'Reading — specifically, the reading of Scripture. Chrysostom famously urges ἀνάγνωσις on every Christian, pressing back against the assumption that Scripture is the preserve of monks and clergy: "the Scriptures were written not only for monks but also for you, a layperson with wife and children" (Hom. in Matt. 2.5). Daily reading at home is theologically required — a lay participation in the Church\'s whole teaching office.',
    etymology: 'From ἀνά (up, again) + γιγνώσκω (to know)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'Lay Reading of Scripture', letter: 'Α'
  },
  // --- Cyril of Alexandria cluster (Phase 9) ---
  'Θεοτόκος': {
    transliteration: 'Theotokos', english: 'God-Bearer, Mother of God',
    definition: '"God-bearer" — the ancient Marian title that becomes the doctrinal flashpoint of the fifth century. Cyril defends Θεοτόκος against Nestorius, who preferred Χριστοτόκος: Mary did not bear a mere human Jesus later joined to the divine Word, but the incarnate Word himself. The title safeguards the unity of Christ\'s person. The Council of Ephesus (431) vindicates Cyril; Θεοτόκος is received as the Church\'s confession, touching Christology before Mariology.',
    etymology: 'From θεός (God) + τίκτω (to bear, give birth to)',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'Ephesus 431: Unity of Christ in His Mother', letter: 'Θ'
  },
  'ἕνωσις καθ\' ὑπόστασιν': {
    transliteration: 'henosis kath hypostasin', english: 'Hypostatic Union',
    definition: '"Union according to hypostasis" — the real, substantial union of divinity and humanity in the single person of the incarnate Word. Cyril\'s signature Christological formula (Second Letter to Nestorius; Third Letter to Nestorius): the divine and human are not merely conjoined (συνάφεια) or co-indwelling (ἐνοίκησις) but united at the level of ὑπόστασις. The one Christ is one hypostasis in two natures — the grammar Chalcedon will ratify.',
    etymology: 'From ἕνωσις (union) + κατά (according to) + ὑπόστασις (Phase 5)',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'Substantial Union of Divinity and Humanity', letter: 'Ε'
  },
  'ἀντίδοσις': {
    transliteration: 'antidosis', english: 'Communication of Attributes',
    definition: 'Exchange, reciprocal giving — specifically ἀντίδοσις τῶν ἰδιωμάτων, the "communication of properties." Because divine and human natures are united in one person, what is proper to each nature can be predicated of the one Christ: the Son of God truly hungered; the Son of Mary truly created. The predicate does not migrate between natures but is said of the one person in whom both subsist. Latin tradition renders this as communicatio idiomatum.',
    etymology: 'From ἀντί (in exchange) + δίδωμι (to give)',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'Exchange of Properties in the One Christ', letter: 'Α'
  },
  'μία φύσις τοῦ Λόγου σεσαρκωμένη': {
    transliteration: 'mia physis tou Logou sesarkomene', english: 'One Incarnate Nature of the Word',
    definition: '"One incarnate nature of the divine Logos" — Cyril\'s most-contested formula (drawn, he believed, from Athanasius; actually from the Apollinarian corpus circulated under Athanasius\'s name). Cyril\'s intent is entirely orthodox: to insist on the unity of Christ\'s single subject. But the language would later be weaponized by Monophysites, requiring Chalcedon (451) to re-express the same concern through the two-natures formula without abandoning Cyril\'s substance.',
    etymology: 'From μία (one) + φύσις (nature) + τοῦ Λόγου (of the Word) + σεσαρκωμένη (made-flesh, perfect participle of σαρκόω)',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'Cyril\'s One-Incarnate-Nature Formula', letter: 'Μ'
  },
  'Χριστοτόκος': {
    transliteration: 'Christotokos', english: 'Christ-Bearer',
    definition: '"Christ-bearer" — Nestorius\'s proposed alternative to Θεοτόκος (or his proposed compromise: Mary as mother of both God-and-man, styled Χριστοτόκος). For Cyril, the substitution is fatal: it implies Mary bore the human element of Christ separately, as though the Word only later attached to a complete human person. Against this, Cyril insists that the incarnate Word has a single subject from the moment of conception; Mary bears the one Christ who is God.',
    etymology: 'From Χριστός (Christ, Anointed) + τίκτω (to bear)',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'Nestorius\'s Rejected Alternative to Theotokos', letter: 'Χ'
  },
  'Λόγος ἔνσαρκος': {
    transliteration: 'Logos ensarkos', english: 'The Enfleshed Word',
    definition: 'The enfleshed Word. Cyril\'s paired distinction — Λόγος ἔνσαρκος and Λόγος ἄσαρκος — names the same eternal Word now in the condition of Incarnation: one and the same Son, pre-incarnately without flesh and now clothed in flesh. The pair guards against two errors at once: against denying real Incarnation, and against positing two sons.',
    etymology: 'From Λόγος (Word) + ἔν (in) + σάρξ (flesh)',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'The Eternal Word Now Incarnate', letter: 'Λ'
  },
  'Λόγος ἄσαρκος': {
    transliteration: 'Logos asarkos', english: 'The Fleshless Word',
    definition: 'The pre-incarnate Word — the same eternal Son before the assumption of flesh. Cyril distinguishes Λόγος ἄσαρκος from Λόγος ἔνσαρκος not to posit two Words, but to name two conditions of the one Word: his eternal existence before all time, and his temporal existence from the Incarnation onward. The distinction is central to any coherent account of the Son who "became flesh."',
    etymology: 'From Λόγος (Word) + ἀ- (not) + σάρξ (flesh)',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'The Pre-Incarnate Eternal Word', letter: 'Λ'
  },
  'ἰδιοποίησις': {
    transliteration: 'idiopoiesis', english: 'Appropriation',
    definition: 'The Word\'s making human experiences his own. Cyril\'s doctrine of ἰδιοποίησις: the divine Son takes to himself — as genuinely his — the hunger, weariness, ignorance, and death of the human nature he has assumed (Scholia on the Incarnation; Third Letter to Nestorius). What happens to Christ\'s humanity happens to him — not to a separate human person with whom he is associated. Appropriation is the hypostatic union\'s existential edge.',
    etymology: 'From ἴδιος (one\'s own) + ποιέω (to make)',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'Word\'s Appropriation of Human Experience', letter: 'Ι'
  },
  'ἕνωσις φυσική': {
    transliteration: 'henosis physike', english: 'Natural Union',
    definition: '"Natural union" — Cyril\'s alternative formula for the real union of divinity and humanity in Christ (Twelve Anathemas 3). Cyril uses φυσική to mean "real, substantial" (as in Pauline usage), not "of the same nature." Later Miaphysite readers will press φυσική toward the stronger sense; Cyril\'s orthodox intent is captured equally in ἕνωσις καθ\' ὑπόστασιν, which the tradition prefers going forward.',
    etymology: 'From ἕνωσις (union) + φυσική (natural, from φύσις)',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'Cyrillian Alternative Formula for Christ\'s Unity', letter: 'Ε'
  },
  'σύνθεσις': {
    transliteration: 'synthesis', english: 'Composition, Putting-Together',
    definition: 'Composition. Cyril describes the incarnate Christ as one ὑπόστασις σύνθετος — a composite hypostasis from divinity and humanity — preserving both the unity of person and the integrity of each nature. The language is taken up and refined by Leontius of Byzantium and John of Damascus (Phase 13), becoming standard post-Chalcedonian Christological vocabulary.',
    etymology: 'From σύν (with) + τίθημι (to place)',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'Composite Hypostasis of Christ', letter: 'Σ'
  },
  'συνάφεια': {
    transliteration: 'synapheia', english: 'Conjunction, Mere Touching',
    definition: 'Conjunction, a mere juxtaposition or touching. Nestorius\'s preferred term for the relationship of divinity and humanity in Christ: the Word συνήφθη — was conjoined — to the man Jesus. Cyril rejects συνάφεια as fatally weak: conjunction implies two who come together, and so two subjects. Only a substantial union (ἕνωσις καθ\' ὑπόστασιν) accomplishes the one Christ.',
    etymology: 'From σύν (with) + ἅπτω (to fasten, touch)',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'Nestorian Concept Rejected by Cyril', letter: 'Σ'
  },
  'ἐνοίκησις': {
    transliteration: 'enoikesis', english: 'Indwelling, Inhabitation',
    definition: 'Indwelling. Another Antiochene-Nestorian term for the Word\'s relationship to the humanity of Christ: the divine Word dwelt in the man Jesus as in a temple. Cyril rejects ἐνοίκησις as inadequate: God indwells every saint by grace, but Christ is not a saint-by-indwelling. The union is at the level of being, not mere inhabitation — else the saint and the Christ would differ only by degree.',
    etymology: 'From ἐν (in) + οἰκέω (to dwell, from οἶκος, house)',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'Nestorian Term Rejected for Weakness', letter: 'Ε'
  },
  'θεοπάσχιτος': {
    transliteration: 'theopaschitos', english: 'God-Suffering, Theopaschite',
    definition: '"God suffered." Cyril\'s Theopaschite formula (Twelve Anathemas 12; Third Letter to Nestorius): "One of the holy Trinity suffered in the flesh." If the crucified one is truly God, then we may say (with the requisite care) that God suffered — not in the divine nature, which is ἀπαθής (Phase 4), but in the flesh he had made his own. The formula is vindicated at the Second Council of Constantinople (553).',
    etymology: 'From θεός (God) + πάσχω (to suffer)',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'God Suffered in the Flesh', letter: 'Θ'
  },
  'σωματικῶς': {
    transliteration: 'somatikos', english: 'Bodily, in the Body',
    definition: 'Bodily. Against docetic or merely-associational readings of the Incarnation, Cyril insists that the Word dwells σωματικῶς — really, in a body (Colossians 2:9: "in him dwells all the fullness of the Godhead σωματικῶς"). The adverb locks Cyril\'s Christology to the physical particularity of Jesus: no abstracted divinity hovering over a human person, but God incarnate in a body that can be seen, touched, suffered, and raised.',
    etymology: 'From σῶμα (body)',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'Real Bodily Incarnation', letter: 'Σ'
  },
  'Ἀναθέματα': {
    transliteration: 'Anathemata', english: 'The Anathemas',
    definition: 'The "Anathemas" — specifically, the Twelve Anathemas (or "Chapters") appended to Cyril\'s Third Letter to Nestorius (430 AD), each defining a Christological error and solemnly condemning it. The anathemas are received at the Council of Ephesus (431) and become the rule against which Cyril\'s orthodoxy is measured. The Second Council of Constantinople (553) canonizes them as binding doctrine.',
    etymology: 'From ἀνάθεμα (something set up, devoted); in Christian usage, a solemn curse of doctrinal error',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'Cyril\'s Twelve Christological Anathemas', letter: 'Α'
  },
  'δύο γεννήσεις': {
    transliteration: 'dyo genneseis', english: 'Two Births',
    definition: '"Two births" — Cyril\'s formula for the single Son\'s two births: eternally from the Father (before all ages) and in time from the Virgin Mary (at the Incarnation). One Son, two γεννήσεις — the same subject born in two modes. The pattern anchors the confession of Θεοτόκος: because the same Son is eternally from the Father and temporally from Mary, she truly bears God.',
    etymology: 'From δύο (two) + γέννησις (generation, birth)',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'One Son, Two Births — Eternal and Temporal', letter: 'Δ'
  },
  'ἀσυγχύτως': {
    transliteration: 'asynchytos', english: 'Without Confusion',
    definition: '"Without confusion" — the first of the four Chalcedonian adverbs (451) defining the two natures in Christ. Built directly on Cyril\'s insistence that the union preserves the distinct integrity of divinity and humanity: neither nature is absorbed or blurred by the other. The full Chalcedonian formula: ἀσυγχύτως, ἀτρέπτως, ἀδιαιρέτως, ἀχωρίστως — "without confusion, without change, without division, without separation."',
    etymology: 'From ἀ- (not) + συγχέω (to pour together, confuse)',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'Chalcedonian Adverb: Natures Not Confused', letter: 'Α',
    pastoralNote: 'The formal adverb belongs to the Council of Chalcedon (451), which met seven years after Cyril\'s death. The continuity is nonetheless real: the Fathers of Chalcedon understood themselves as standing on Cyril\'s foundation, and his Second Letter to Nestorius and the Formula of Reunion (433) supply the underlying insistence on unity-without-confusion that the council crystallized in adverbial form.'
  },
  'ἀτρέπτως': {
    transliteration: 'atreptos', english: 'Without Change',
    definition: '"Without change" — the second Chalcedonian adverb. Neither nature of the incarnate Christ is altered by the union: divinity remains fully divine (without loss), humanity remains fully human (without transformation into something else). The adverb guards Cyril\'s legacy against both Eutychian absorption and docetic dissolution. Together with ἀσυγχύτως it preserves the integrity of each nature.',
    etymology: 'From ἀ- (not) + τρέπω (to turn, change)',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'Chalcedonian Adverb: Natures Not Changed', letter: 'Α',
    pastoralNote: 'As with the other three Chalcedonian adverbs, ἀτρέπτως is the formal work of the council in 451, not Cyril\'s own diction. But the theological concern it fixes — the unaltered integrity of each nature within the union — is fully Cyrillian; attribution to Cyril here marks doctrinal continuity rather than verbal authorship.'
  },
  'ἀδιαιρέτως': {
    transliteration: 'adiairetos', english: 'Without Division',
    definition: '"Without division" — the third Chalcedonian adverb. Over against every Nestorian-style partitioning of Christ into two Sons or two subjects, the union is ἀδιαιρέτως: one Christ, one person, one subject. Paired with ἀχωρίστως, the adverb insists the two natures cannot be separated or distributed between rival agents.',
    etymology: 'From ἀ- (not) + διαιρέω (to divide)',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'Chalcedonian Adverb: Natures Not Divided', letter: 'Α',
    pastoralNote: 'The precise adverb is Chalcedonian; the theological concern it fixes is fully Cyrillian. Against every Nestorian partition, Cyril\'s Third Letter to Nestorius insists on a single Christ with a single subject — the substance that Chalcedon (451) then crystallized in adverbial form.'
  },
  'ἀχωρίστως': {
    transliteration: 'achoristos', english: 'Without Separation',
    definition: '"Without separation" — the fourth Chalcedonian adverb. The two natures of Christ are never separable from one another after the Incarnation: even in Christ\'s death, the union persists. The adverb fixes Cyril\'s insistence on the singular, enduring identity of the incarnate Son against every temporal or circumstantial parting of divine and human.',
    etymology: 'From ἀ- (not) + χωρίζω (to separate, place apart)',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'Chalcedonian Adverb: Natures Not Separated', letter: 'Α',
    pastoralNote: 'Like its three companion adverbs, ἀχωρίστως is the formal work of Chalcedon in 451 rather than Cyril\'s own idiom. The underlying concern, however — the indivisible persistence of the union through every condition, including Christ\'s death — is unmistakably Cyrillian, and the council self-consciously built on his Second and Third Letters to Nestorius in giving it adverbial form.'
  },
  'ἀληθὴς Θεός καὶ ἀληθὴς ἄνθρωπος': {
    transliteration: 'alethes Theos kai alethes anthropos', english: 'Truly God and Truly Man',
    definition: '"Truly God and truly man" — the Chalcedonian Definition\'s core confession (451). Cyril\'s insistence that the incarnate Word is fully God (against Nestorian reduction) and fully human (against any docetic attenuation) converges here with Leo\'s Latin Tome (Phase 10). The adverb ἀληθῶς blocks every implicit qualification: not partly God, not apparent-man; truly both.',
    etymology: 'From ἀληθής (true) + Θεός (God) + ἄνθρωπος (human being)',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'Chalcedonian Fullness of Both Natures', letter: 'Α'
  },
  'ἀπαθῶς': {
    transliteration: 'apathos', english: 'Impassibly',
    definition: 'Impassibly — the paradoxical adverb that preserves both horns of the Theopaschite formula. Cyril writes that the Word "suffered impassibly" (ἔπαθεν ἀπαθῶς, Scholia on the Incarnation): truly suffered in the flesh, yet without subjection of the divine nature to suffering. The paradox guards both the reality of Christ\'s passion and the impassibility of his divinity (cf. ἀπάθεια, Phase 4).',
    etymology: 'From ἀ- (not) + πάσχω (to suffer)',
    phase: 9, fathers: ['Cyril of Alexandria'], connection: 'Cyrillian Paradox: Suffered Impassibly', letter: 'Α'
  },
  // --- Leo the Great cluster (Phase 10) — Latin-primary ---
  'duae naturae, una persona': {
    language: 'latin',
    transliteration: 'duae naturae una persona', english: 'Two Natures, One Person',
    definition: 'The Chalcedonian formula in its Latin form: two natures, one person. Leo\'s Tome (Epistle 28 to Flavian, 449) articulates with Latin precision what Cyril had secured in Greek: the one Christ is a single persona in whom duae naturae — divine and human — are permanently united without being confused. When read aloud at the Council of Chalcedon in 451, the assembled bishops are reported to have cried "Peter has spoken through Leo."',
    etymology: 'From duae (two) + naturae (natures) + una (one) + persona (person)',
    phase: 10, fathers: ['Leo the Great'], connection: 'Chalcedonian Formula in Latin', letter: 'D'
  },
  'proprietas': {
    language: 'latin',
    transliteration: 'proprietas', english: 'Property, Distinctive Character',
    definition: 'Property — that which is distinctive and proper to each thing. Leo\'s key Christological principle (Tome 3–4): in the one Christ, each nature retains its own proprietas unimpaired by the union. Divinity does not cease to be divine; humanity does not cease to be human. The proprietates of each nature persist in their integrity even as both belong to a single acting subject.',
    etymology: 'From Latin proprius (one\'s own)',
    phase: 10, fathers: ['Leo the Great'], connection: 'Integrity of Each Nature\'s Properties', letter: 'P'
  },
  'Tomus Leonis': {
    language: 'latin',
    transliteration: 'Tomus Leonis', english: 'The Tome of Leo',
    definition: 'The Tome of Leo — Leo\'s Epistle 28 to Flavian of Constantinople (449), composed amid the Eutychian crisis. The letter defines the integrity of the two natures in the one Christ with lapidary Latin precision: "agit utraque forma cum alterius communione quod proprium est" ("each form does what is proper to it in communion with the other"). Read at Chalcedon in 451, the Tome is received as the Latin witness complementing Cyril\'s Greek in defining the faith.',
    etymology: 'From Latin tomus (a cut, a volume) + Leonis (of Leo)',
    phase: 10, fathers: ['Leo the Great'], connection: 'Leo\'s Dogmatic Letter to Flavian', letter: 'T'
  },
  'utraque forma': {
    language: 'latin',
    transliteration: 'utraque forma', english: 'Each Form, Both Forms',
    definition: '"Each form" — Leo\'s preferred Christological shorthand. "Utraque forma agit cum alterius communione quod proprium est" (Tome 4): each form — divinity and humanity — does what is proper to it, in communion with the other. The verbum acts divinely; the caro acts humanly; but both are the acts of the one Christ. The formula preserves the integrity of each nature and the unity of the agent.',
    etymology: 'From Latin uterque (each of two) + forma (form)',
    phase: 10, fathers: ['Leo the Great'], connection: 'Each Nature Acts According to Its Own', letter: 'U'
  },
  'forma Dei': {
    language: 'latin',
    transliteration: 'forma Dei', english: 'Form of God',
    definition: '"Form of God" — the divine condition in which the eternal Son subsists (Philippians 2:6). Leo uses the Pauline pair forma Dei / forma servi as his framework for Christological exegesis (Sermo 23; Tome 4): the one who is in the form of God takes upon himself the form of a servant, not by laying aside his divinity but by assuming humanity. The language gives Leo a biblical anchor for the two-natures doctrine.',
    etymology: 'From Latin forma (form) + Dei (of God)',
    phase: 10, fathers: ['Leo the Great'], connection: 'Pauline Framework for Divine Nature', letter: 'F'
  },
  'forma servi': {
    language: 'latin',
    transliteration: 'forma servi', english: 'Form of a Servant',
    definition: '"Form of a servant" — the human condition assumed by the Son in the Incarnation (Philippians 2:7). Leo\'s pairing of forma Dei and forma servi names the two conditions of the one Christ: not two Christs but one, now in both forms. The servant-form is genuine humanity — born, hungry, suffering, dying — and it is taken up without loss of the divine form.',
    etymology: 'From Latin forma (form) + servi (of a servant, slave)',
    phase: 10, fathers: ['Leo the Great'], connection: 'Pauline Framework for Human Nature Assumed', letter: 'F'
  },
  'agere quod proprium est': {
    language: 'latin',
    transliteration: 'agere quod proprium est', english: 'To Act According to What Is Proper',
    definition: 'Leo\'s signature operational formula (Tome 4): each nature in Christ "acts what is proper to it" in communion with the other. The divinity does divine acts (miracles, forgiveness, resurrection from within); the humanity does human acts (hungering, weeping, dying). Yet the acts are all the acts of the one Christ — the single subject whose two natures each contribute their proper operations. The principle grounds the communicatio idiomatum in concrete activity.',
    etymology: 'From Latin agere (to do, act) + quod (what) + proprium (proper, one\'s own) + est (is)',
    phase: 10, fathers: ['Leo the Great'], connection: 'Each Nature\'s Proper Activity', letter: 'A'
  },
  'communicatio idiomatum': {
    language: 'latin',
    transliteration: 'communicatio idiomatum', english: 'Communication of Properties',
    definition: 'Communication of properties — the Latin counterpart to Cyril\'s ἀντίδοσις (Phase 9). Because divinity and humanity are united in the single persona of Christ, the properties of each nature can be predicated of the one person: the Son of God truly died; the Son of Mary truly created. The predicate is said of the person, not swapped between natures. Leo\'s Tome 4 gives the doctrine its enduring Latin grammar.',
    etymology: 'From Latin communicatio (sharing) + idiomatum (of properties, from Greek ἰδίωμα)',
    phase: 10, fathers: ['Leo the Great'], connection: 'Latin Grammar for the Exchange of Properties', letter: 'C'
  },
  'unitas personae': {
    language: 'latin',
    transliteration: 'unitas personae', english: 'Unity of Person',
    definition: '"Unity of person" — Leo\'s settled formula for the singular subject of Christ. Against Nestorian division, unitas personae insists that there is one who acts, suffers, and saves: one Son of God, one Son of Mary, one Christ. The phrase fixes in Latin the grammatical concern that Cyril addressed in Greek with ἕνωσις καθ\' ὑπόστασιν (Phase 9).',
    etymology: 'From Latin unitas (unity) + personae (of person)',
    phase: 10, fathers: ['Leo the Great'], connection: 'Singular Subject of Christ', letter: 'U'
  },
  'assumptio': {
    language: 'latin',
    transliteration: 'assumptio', english: 'Assumption',
    definition: 'Assumption — the Word\'s taking to himself of a complete human nature. Leo uses assumptio to name the free and gracious act by which the Son took flesh, without mixture, without loss, and without reservation (Tome 2–3). The assumptio hominis echoes Gregory Nazianzen\'s ὃ ἀπρόσληπτον ἀθεράπευτον (Phase 6) — what is not assumed is not healed — now worked out in Latin soteriology.',
    etymology: 'From Latin assumere (to take to oneself)',
    phase: 10, fathers: ['Leo the Great'], connection: 'The Word\'s Taking of Human Nature', letter: 'A'
  },
  'mediator': {
    language: 'latin',
    transliteration: 'mediator', english: 'Mediator',
    definition: 'Mediator — the single go-between who bridges God and humanity (1 Timothy 2:5, "unus mediator Dei et hominum, homo Christus Iesus"). Leo\'s Christology is mediatorial: precisely because Christ is fully God and fully man, he alone can mediate between them. The term becomes a central organizing category of Latin Christology from Leo through Augustine\'s successors and into Aquinas.',
    etymology: 'From Latin medius (middle) — "one who stands in the middle"',
    phase: 10, fathers: ['Leo the Great'], connection: 'Christ as Single Bridge Between God and Humanity', letter: 'M'
  },
  'verus Deus et verus homo': {
    language: 'latin',
    transliteration: 'verus Deus et verus homo', english: 'True God and True Man',
    definition: '"True God and true man" — the Latin confession of the Chalcedonian Definition, paralleling Cyril\'s Greek ἀληθὴς Θεός καὶ ἀληθὴς ἄνθρωπος (Phase 9). Leo\'s Tome insists on both halves without compromise: not a demoted God nor a deified man, but truly God and truly man in one persona. The adverb verus blocks every implicit qualification of either nature.',
    etymology: 'From Latin verus (true) + Deus (God) + homo (man)',
    phase: 10, fathers: ['Leo the Great'], connection: 'Chalcedonian Latin Confession', letter: 'V'
  },
  'sacramentum incarnationis': {
    language: 'latin',
    transliteration: 'sacramentum incarnationis', english: 'Mystery of the Incarnation',
    definition: '"Mystery of the Incarnation" — Leo\'s favored phrase for the whole saving economy centered on the Word made flesh (Sermo 22 on the Nativity; Tome 2). Building on Tertullian\'s rendering of sacramentum as Latin for μυστήριον (Phase 2.5), Leo applies the term to the Incarnation itself: not simply a historical event but a mystery that continues to reach into the Church\'s liturgy and life through the sacraments that flow from it.',
    etymology: 'From Latin sacramentum (sacred mystery, oath) + incarnationis (of the Incarnation)',
    phase: 10, fathers: ['Leo the Great'], connection: 'Incarnation as the Central Mystery', letter: 'S'
  },
  'sedes Petri': {
    language: 'latin',
    transliteration: 'sedes Petri', english: 'See of Peter',
    definition: '"Seat of Peter" — the Roman see understood as the abiding locus of Petrine ministry. Leo\'s Sermons on the Anniversary of his Elevation (Sermo 3, 4, 5) articulate an ancient Roman conviction with new doctrinal weight: the bishop of Rome exercises the office of Peter, and the authority of Peter continues through his successors. The phrase becomes a central term of Latin ecclesiology, complementing Cyprian\'s cathedra Petri (Phase 2.5).',
    etymology: 'From Latin sedes (seat, see) + Petri (of Peter)',
    phase: 10, fathers: ['Leo the Great'], connection: 'Roman See as Continuing Petrine Office', letter: 'S'
  },
  'auctoritas Petri': {
    language: 'latin',
    transliteration: 'auctoritas Petri', english: 'Authority of Peter',
    definition: '"Authority of Peter" — the apostolic authority Christ entrusted to Peter and which, Leo argues, persists in the Roman see (Sermo 3.3: "in hac sede viva continue perseverat auctoritas"). For Leo, the pope does not add to Peter\'s authority but exercises it, as Peter himself speaks through his successor. The doctrine receives its clearest patristic articulation here.',
    etymology: 'From Latin auctoritas (authority) + Petri (of Peter)',
    phase: 10, fathers: ['Leo the Great'], connection: 'Petrine Authority Continuing in Rome', letter: 'A'
  },
  'Christus totus': {
    language: 'latin',
    transliteration: 'Christus totus', english: 'The Whole Christ',
    definition: '"The whole Christ" — Christ understood as the inseparable unity of Head and Body, the incarnate Son together with the Church. The phrase is Augustinian in its fullest development, but Leo\'s sermons (esp. Sermo 63, 70) deploy it powerfully in liturgical-ecclesial register: the Church\'s life is Christ\'s continuing life, the sacraments are his own acts, and the suffering of members is the suffering of the Head.',
    etymology: 'From Latin Christus (Christ) + totus (whole, entire)',
    phase: 10, fathers: ['Leo the Great'], connection: 'Christ and the Church as One Body', letter: 'C',
    pastoralNote: 'The fuller theological development of the totus Christus theme belongs to Augustine, especially in his Enarrationes in Psalmos, where the Head-and-Body grammar structures whole treatises. Leo\'s contribution is the distinctively liturgical-homiletic register: the feast preached, the Church addressed, the members invited to recognize their participation in the Head. The Orthodox tradition receives the theme from both — Leo through the Tome\'s conciliar reception, Augustine through the broader Latin patristic inheritance.'
  },
  'dignitas': {
    language: 'latin',
    transliteration: 'dignitas', english: 'Dignity',
    definition: 'Dignity. Leo\'s Christmas sermons sound a distinctive note: because the Son of God has taken human nature, every human being bears an immeasurable dignitas — "Christian, recognize your dignity" (Sermo 21.3, "Agnosce, o Christiane, dignitatem tuam"). The Incarnation is not only the salvation of humanity but the permanent elevation of it; its recognition is the ground of Christian moral life.',
    etymology: 'From Latin dignus (worthy)',
    phase: 10, fathers: ['Leo the Great'], connection: 'Incarnational Dignity of the Human Person', letter: 'D'
  },
  'passio': {
    language: 'latin',
    transliteration: 'passio', english: 'Passion, Suffering',
    definition: 'The Passion of Christ — both the event of his suffering and the whole theology of redemption it bears. Leo\'s Sermons on the Passion (Sermo 52–70) are among the most influential Latin meditations on Christ\'s Cross: the passio is the work of the whole Christ in his humanity, while the divinity accompanies and sustains without itself suffering. The Cross is the reconciliation of heaven and earth accomplished in flesh.',
    etymology: 'From Latin pati (to suffer)',
    phase: 10, fathers: ['Leo the Great'], connection: 'Christ\'s Passion as the Work of the Whole Christ', letter: 'P'
  },
  'pontifex': {
    language: 'latin',
    transliteration: 'pontifex', english: 'High Priest, Bridge-Builder',
    definition: 'High priest — originally in Roman religion the "bridge-builder" between human and divine (pons + facere), and in Christian Latin the title applied both to Christ (following Hebrews) and to the bishop. Leo reads Christ\'s high priesthood through Hebrews and applies the pastoral weight of the title to the episcopal office: the pontifex continues, in a derived way, Christ\'s own mediatorial work.',
    etymology: 'From Latin pons (bridge) + facere (to make)',
    phase: 10, fathers: ['Leo the Great'], connection: 'Christ and the Bishop as Bridge-Builders', letter: 'P'
  },
  'πρόσωπον': {
    transliteration: 'prosopon', english: 'Face, Person',
    definition: 'Face, person. The Greek term that the Chalcedonian Definition (451) pairs with ὑπόστασις (Phase 5) on the side of Christ\'s unity — one πρόσωπον and one ὑπόστασις, in two natures. πρόσωπον is the Greek equivalent of Leo\'s Latin persona (Phase 2.5): where persona carried the Roman theatrical resonance of "mask," πρόσωπον carried similar weight in Greek — a difficulty the Cappadocians (Phase 5) had already helped to resolve by treating πρόσωπον as the concrete "who" that answers to a specific hypostasis.',
    etymology: 'From πρός (toward) + ὤψ (face, eye) — "that which is turned toward, one\'s face"',
    phase: 10, fathers: ['Leo the Great'], connection: 'Greek Equivalent of Persona at Chalcedon', letter: 'Π'
  },
  // --- Pseudo-Dionysius the Areopagite cluster (Phase 11) ---
  'ἀποφατική': {
    transliteration: 'apophatike', english: 'Apophatic, Negative Theology',
    definition: 'Apophatic — the way of negation, of "unsaying." Dionysius\'s Mystical Theology (chapters 3–5) presents apophatic theology as the higher of two complementary paths: having affirmed every name of God (καταφατική), the soul must then deny each name in turn, passing beyond even the most exalted affirmations to meet God in the darkness above all human speech. The method draws on Gregory of Nyssa\'s γνόφος (Phase 5) and shapes the whole later Christian mystical tradition.',
    etymology: 'From ἀπόφημι (to deny, say off)',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'Theology by Negation', letter: 'Α'
  },
  'καταφατική': {
    transliteration: 'kataphatike', english: 'Cataphatic, Affirmative Theology',
    definition: 'Cataphatic — the way of affirmation. In Dionysius\'s two-part method, καταφατική precedes ἀποφατική: we first gather up every scriptural and creaturely name of God — Good, Being, Life, Light, Love — and affirm them all. Only then do we pass through them by negation. Cataphasis and apophasis are not rivals but sequential movements; Dionysius\'s Divine Names is the sustained cataphatic work, his Mystical Theology the sustained apophatic one.',
    etymology: 'From κατάφημι (to affirm, say in accordance)',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'Theology by Affirmation', letter: 'Κ'
  },
  'ὑπεράγνωστος': {
    transliteration: 'hyperagnostos', english: 'Beyond Knowing, Super-Unknowable',
    definition: 'Beyond knowing — not merely unknown, but more-than-unknown. Dionysius\'s characteristic use of ὑπερ- ("beyond, above") marks the distinction between ignorance (a deficiency) and divine unknowability (an excess): God is unknown not because he is too little to know but because he is too much. The soul that has exhausted affirmation and negation meets God in this ὑπεράγνωσια, a luminous darkness that surpasses every intellectual grasp.',
    etymology: 'From ὑπέρ (above, beyond) + ἄγνωστος (unknown, from γιγνώσκω)',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'Divine Unknowability as Excess, Not Deficit', letter: 'Υ'
  },
  'ἱεραρχία': {
    transliteration: 'hierarchia', english: 'Hierarchy, Sacred Order',
    definition: 'Hierarchy — literally "sacred ordering." Dionysius coins the term to name the ordered structure by which the one divine light is communicated to all things: each rank receives from those above and ministers to those below, in a mediated economy of illumination. The two treatises Celestial Hierarchy (the nine angelic ranks) and Ecclesiastical Hierarchy (the sacraments and orders of the Church) apply the principle across the whole created and redeemed order.',
    etymology: 'From ἱερός (sacred) + ἀρχή (principle, rule)',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'Sacred Ordered Communication of the Divine', letter: 'Ι'
  },
  'μυστικὴ θεολογία': {
    transliteration: 'mystike theologia', english: 'Mystical Theology',
    definition: 'Mystical theology — the title of Dionysius\'s shortest and most influential treatise (Περὶ μυστικῆς θεολογίας), and the name he gives to the apophatic ascent itself. Moses on Sinai is the guiding figure (MT 1.3): having been purified, he enters the cloud and meets God "in the darkness of unknowing." The treatise passes into the West through John Scotus Eriugena\'s ninth-century Latin translation and becomes one of the formative texts of Christian mysticism East and West.',
    etymology: 'From μυστικός (mystical, from μυέω, to initiate) + θεολογία (Phase 6)',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'The Apophatic Ascent into Divine Darkness', letter: 'Μ'
  },
  'θεία ὀνόματα': {
    transliteration: 'theia onomata', english: 'Divine Names',
    definition: '"Divine names" — the title and theme of Dionysius\'s longest treatise (Περὶ θείων ὀνομάτων). The work takes up each name Scripture gives to God — Good, Being, Life, Wisdom, Power, Peace, and above all Beauty and Love — and shows how each is said of the one who exceeds every name. Ch. 4 on the Good and on divine ἔρως (cf. Phase 5, θεῖος ἔρως) becomes a central patristic source for the theology of God as Love.',
    etymology: 'From θεῖος (divine) + ὀνόματα (names, plural of ὄνομα)',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'The Cataphatic Naming of God', letter: 'Θ'
  },
  'ὑπερούσιος': {
    transliteration: 'hyperousios', english: 'Super-Essential, Beyond Being',
    definition: 'Super-essential, beyond-being. Dionysius\'s most characteristic epithet for God: the divine reality is not one being among beings, not even the highest being, but ὑπερούσιος — beyond οὐσία (Phase 5) itself. The prefix ὑπερ- does the work of apophasis in advance: to say "super-essential" is already to deny that God is a being alongside others. The concept — indebted to Neoplatonism but christened by Dionysius — passes through Maximus into Aquinas.',
    etymology: 'From ὑπέρ (above, beyond) + οὐσία (being, essence)',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'God Beyond Being Itself', letter: 'Υ'
  },
  'ὑπεράγαθος': {
    transliteration: 'hyperagathos', english: 'Super-Good, Beyond Good',
    definition: 'Super-good — Dionysius\'s name for God as the source of all good, himself beyond the category of good-among-goods. The ὑπερ- prefix proliferates across his vocabulary (ὑπέρφως, ὑπερθεός, ὑπερένθεος, ὑπεραγνωσία) as a whole grammar of transcendence, picking up Gregory Nazianzen\'s ὑπεροχή (Phase 6) and systematizing it into apophatic method.',
    etymology: 'From ὑπέρ (above, beyond) + ἀγαθός (good)',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'God as the Source Beyond Every Good', letter: 'Υ'
  },
  'θεαρχία': {
    transliteration: 'thearchia', english: 'Divine Principle, Godhead',
    definition: 'The "divine principle" or "Godhead" — Dionysius\'s term for God as source (ἀρχή) of all divinity. The θεαρχία is the supreme divine unity from which the one God reaches into all things through the hierarchies. The term becomes a staple of Byzantine theology and is translated into Latin by Eriugena as deitas — a word then central to Aquinas\'s treatment of divine simplicity.',
    etymology: 'From θεός (God) + ἀρχή (principle, source)',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'God as Source and Principle of All Divinity', letter: 'Θ'
  },
  'πρόοδος': {
    transliteration: 'proodos', english: 'Procession, Going-Forth',
    definition: 'Procession — God\'s self-giving movement outward toward creation. The second term of the Dionysian triad μονή / πρόοδος / ἐπιστροφή: God remains eternally himself (μονή), goes forth into creation (πρόοδος), and draws all things back to himself (ἐπιστροφή). Procession names the outflow of the divine goodness in which the ὑπερούσιος communicates being, life, wisdom, and love to every creature according to its capacity.',
    etymology: 'From πρό (forth) + ὁδός (way, path)',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'Divine Outflow Into Creation', letter: 'Π'
  },
  'ἐπιστροφή': {
    transliteration: 'epistrophe', english: 'Return, Turning-Back',
    definition: 'Return — the third term of the Dionysian triad: every creature\'s movement back toward the God from whom it came. Having gone forth (πρόοδος) from the divine source, creation turns back (ἐπιστροφή) in longing, drawn upward by divine love through the hierarchies. The whole Christian life is a participation in this great turning — the soul\'s ascent toward union with the One.',
    etymology: 'From ἐπί (upon, back) + στρέφω (to turn)',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'Creation\'s Return to God', letter: 'Ε'
  },
  'μονή': {
    transliteration: 'mone', english: 'Remaining, Abiding',
    definition: 'Remaining, abiding — the first term of the Dionysian triad μονή / πρόοδος / ἐπιστροφή. Even as the divine goodness pours forth into all things (πρόοδος) and draws all things back (ἐπιστροφή), God remains undiminished, undivided, and unchanged in himself. μονή guards the inviolability of the divine nature against any metaphysical cost of creation or Incarnation: God gives without loss.',
    etymology: 'From μένω (to remain)',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'Divine Inviolability in All Self-Giving', letter: 'Μ'
  },
  'ἀγνωσία': {
    transliteration: 'agnosia', english: 'Unknowing, Not-Knowing',
    definition: 'Unknowing — the mode of approach to the God who is ὑπεράγνωστος. Dionysius insists that the soul\'s highest reach toward God is not knowledge but an educated ἀγνωσία: a knowing that knows itself to know nothing, a loving darkness that has left all concepts behind. The tradition of "learned ignorance" (docta ignorantia) in Nicholas of Cusa descends directly from Dionysius\'s ἀγνωσία.',
    etymology: 'From ἀ- (not) + γνῶσις (knowledge)',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'Learned Unknowing as Highest Knowing', letter: 'Α'
  },
  'ἔκστασις': {
    transliteration: 'ekstasis', english: 'Ecstasy, Standing-Outside',
    definition: 'Ecstasy — literally "standing outside" oneself. For Dionysius, divine love (θεῖος ἔρως, Phase 5) is ecstatic in God first: God steps out of himself toward creation in his love (DN 4.13). The creature\'s return is correspondingly ecstatic — the soul steps out of itself, past intellect and self, into God. ἔκστασις is not emotional transport but the soul\'s self-transcending response to a prior divine self-giving.',
    etymology: 'From ἐκ (out) + ἵστημι (to stand)',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'Reciprocal Ecstasy of Divine and Human Love', letter: 'Ε'
  },
  'τελείωσις': {
    transliteration: 'teleiosis', english: 'Perfection, Completion',
    definition: 'Perfection, completion — the third stage of the Dionysian spiritual triad κάθαρσις (Phase 6) / ἔλλαμψις (Phase 6) / τελείωσις. After purification and illumination comes perfection: the soul, having received divine light, is united to what it receives. The pattern structures the Ecclesiastical Hierarchy — each sacramental rite accomplishes one of the three — and becomes the standard grammar of Christian spiritual progress.',
    etymology: 'From τέλος (end, completion, goal)',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'Third Stage of Spiritual Ascent', letter: 'Τ'
  },
  'τάξις': {
    transliteration: 'taxis', english: 'Order, Rank',
    definition: 'Order, rank. Each level of the Dionysian hierarchies is a τάξις: the nine angelic τάξεις of the Celestial Hierarchy (seraphim, cherubim, thrones; dominions, virtues, powers; principalities, archangels, angels) and the corresponding τάξεις of the Ecclesiastical Hierarchy (bishops, priests, deacons; monks, laity, catechumens). Each τάξις receives from above and mediates to those below.',
    etymology: 'From τάσσω (to arrange, order)',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'Ordered Ranks in the Hierarchies', letter: 'Τ'
  },
  'θεουργία': {
    transliteration: 'theourgia', english: 'Divine Work, Theurgy',
    definition: 'Divine work — God\'s own activity in and through sacramental and liturgical rites. Dionysius borrows θεουργία from late-Neoplatonist ritual vocabulary but radically re-centers it: where pagan theurgy invoked divine power through ritual technique, Dionysian θεουργία is God\'s own act in the sacramental action of the Church (EH 3). The Incarnation is the supreme θεουργία; the Eucharist continues it; every valid rite participates in it.',
    etymology: 'From θεός (God) + ἔργον (work)',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'God\'s Own Action in Sacramental Rite', letter: 'Θ',
    pastoralNote: 'The transformation Dionysius works on this Neoplatonic vocabulary is substantive, not merely lexical: where Iamblichan theurgy understood ritual as a technique by which the divine could be drawn down or compelled, Dionysian θεουργία names the reverse movement — God\'s own freely-given action in the sacramental rite, received by the Church rather than produced by it. The Incarnation sets the grammar: the Church does not perform θεουργία upon God, but participates in what God is performing in and through her liturgy.'
  },
  'σύμβολον': {
    transliteration: 'symbolon', english: 'Symbol, Token',
    definition: 'Symbol. For Dionysius, every creaturely reality — every name, every liturgical sign, every material element in the sacraments — is a σύμβολον: a veil that both conceals and reveals the divine. Symbols are not arbitrary pointers but genuine participations in what they signify. The theology of symbol shapes the Byzantine theology of icon and of the Divine Liturgy, and becomes a pillar of the medieval Latin theology of sacramental sign.',
    etymology: 'From σύν (together) + βάλλω (to throw) — "thrown-together," a token that fits its match',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'Participatory Theology of Sign', letter: 'Σ'
  },
  'οὐράνιος ἱεραρχία': {
    transliteration: 'ourania hierarchia', english: 'Celestial Hierarchy',
    definition: 'Celestial Hierarchy — the title of Dionysius\'s treatise on the angelic orders (Περὶ τῆς οὐρανίου ἱεραρχίας). Drawing on scattered scriptural passages (Isaiah 6, Ezekiel 1, Ephesians 1, Colossians 1), Dionysius organizes the angelic ranks into three triads of three — nine τάξεις in descending order. The scheme becomes the standard angelology of both East and West; Dante structures the Paradiso by it.',
    etymology: 'From οὐράνιος (heavenly) + ἱεραρχία (sacred order)',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'The Nine Angelic Orders', letter: 'Ο'
  },
  'ἐκκλησιαστικὴ ἱεραρχία': {
    transliteration: 'ekklesiastike hierarchia', english: 'Ecclesiastical Hierarchy',
    definition: 'Ecclesiastical Hierarchy — the title of Dionysius\'s treatise on the sacramental and ministerial order of the Church (Περὶ τῆς ἐκκλησιαστικῆς ἱεραρχίας). The sacraments (Baptism, Eucharist, Chrismation, Ordination, Monastic Tonsure, Burial) and the three-fold orders of clergy and laity are presented as earthly participations in the celestial hierarchy. The treatise is the earliest patristic systematic theology of the sacraments.',
    etymology: 'From ἐκκλησιαστικός (of the church) + ἱεραρχία (sacred order)',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'Earthly Sacramental Order as Image of Heavenly', letter: 'Ε'
  },
  'Ἓν': {
    transliteration: 'Hen', english: 'The One',
    definition: 'The One. Among the divine names, Dionysius gives a culminating place (DN 13) to Ἓν — the unity from which all multiplicity flows and to which all return. Borrowed from Plotinian Neoplatonism but governed by Christian Trinitarian confession, the divine Ἓν is not a numerical one alongside others but the super-unity that exceeds every category, including unity itself. The Ἓν is ὑπερούσιος even as it gives being to all.',
    etymology: 'Greek Ἕν / Ἓν (neuter of εἷς, one)',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'The Super-Unity Beyond All Unities', letter: 'Ε'
  },
  'Διονύσιος Ἀρεοπαγίτης': {
    transliteration: 'Dionysios Areopagites', english: 'Dionysius the Areopagite',
    definition: 'Dionysius the Areopagite — the pseudonymous author of the Corpus Areopagiticum (c. 500 AD, probably Syrian). The corpus presents itself as the work of the Athenian convert of Paul (Acts 17:34), but on linguistic and doctrinal grounds is now dated to the late fifth or early sixth century. The pseudonymity was only questioned seriously from the fifteenth century onward. The writings were received by the Church East and West as quasi-apostolic authority and shaped the whole later mystical tradition — Maximus (Phase 12), John of Damascus (Phase 13), Eriugena, Aquinas, Bonaventure, Nicholas of Cusa.',
    etymology: 'From Διονύσιος (Dionysius, a Greek theophoric name) + Ἀρεοπαγίτης (from the Areopagus, Athens)',
    phase: 11, fathers: ['Pseudo-Dionysius the Areopagite'], connection: 'The Pseudonymous Author and His Reception', letter: 'Δ',
    pastoralNote: 'The question of authorship, settled on the scholarly side since the Renaissance, is distinct from the question of authority. The Orthodox tradition has received this corpus as a genuine patristic witness on its theological merits — integrated into the hymnography, drawn upon decisively at the Second Council of Nicaea (787) in its defense of the icons, and made the spine of the later Greek synthesis through Maximus the Confessor (Phase 12) and Gregory Palamas. Authorship has never been the measure of a text\'s weight in the Orthodox reception; that weight is discerned through the consent of the fathers and councils over time.'
  },
  // --- Maximus the Confessor cluster (Phase 12) ---
  'θέλημα': {
    transliteration: 'thelema', english: 'Will',
    definition: 'Will. Maximus\'s great Christological contribution: the one Christ, because he has two complete natures, has two natural wills — one divine, one human — operating in perfect harmony. Against the Monothelites, who taught a single will in Christ, Maximus argues (Opusculum 3; Disputation with Pyrrhus) that a nature without its natural faculty of willing is no nature at all. The doctrine is vindicated at the Sixth Ecumenical Council (Constantinople III, 680–681), twenty years after Maximus\'s death by torture and exile.',
    etymology: 'From θέλω (to will, to wish)',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'Two Natural Wills in the One Christ', letter: 'Θ'
  },
  'ἐνέργεια': {
    transliteration: 'energeia', english: 'Energy, Operation',
    definition: 'Energy — the natural activity or operation proper to a being. Paired with θέλημα in Maximus\'s Christology: the one Christ has two natural energies as he has two natural wills, divine and human, each operating according to its own nature while belonging to the single acting person. The same grammar is taken up in the later Byzantine theology of divine energies (Palamas, fourteenth century), drawing explicitly on Maximus as foundation.',
    etymology: 'From ἐν (in) + ἔργον (work)',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'Two Natural Energies in the One Christ', letter: 'Ε'
  },
  'λόγοι': {
    transliteration: 'logoi', english: 'Logoi, Divine Reasons',
    definition: 'The λόγοι — the divine "reasons" or principles according to which each created thing exists and is ordered toward God. Maximus\'s signature cosmology: every creature has its own λόγος, eternally held in the mind of the divine Λόγος (Ambigua 7). Creation is the speaking-forth of the one Λόγος into many λόγοι; salvation is the return of the many λόγοι into the one. The doctrine recapitulates Stoic, Philonic, and Dionysian lineages into a distinctively Christian cosmological synthesis.',
    etymology: 'Plural of λόγος (Phase 2) — "words, reasons, principles"',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'Logoi of Creatures Rooted in the Divine Logos', letter: 'Λ'
  },
  'σκοπός': {
    transliteration: 'skopos', english: 'Aim, Goal, Purpose',
    definition: 'Aim, goal. Each λόγος of a creature points toward its σκοπός — the end for which it was made and in which it finds its fulfillment. The σκοπός of every creature is communion with God (θέωσις, Phase 4); the σκοπός of the divine economy (οἰκονομία, Phase 6) is the drawing of all creation into that communion through the Incarnation. The concept anchors Maximus\'s teleological cosmology to his soteriology.',
    etymology: 'From σκοπέω (to look at, consider)',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'Teleological End of Each Creature', letter: 'Σ'
  },
  'τρόπος': {
    transliteration: 'tropos', english: 'Mode, Manner',
    definition: 'Mode — the manner in which a thing exists or acts. Maximus\'s signature analytic distinction: λόγος names what a thing is (its essential definition); τρόπος names how it is (the concrete mode of its existing and acting). The Son\'s λόγος is unchanging in Incarnation, but his τρόπος is now new — the same divine Word now in the mode of flesh. The distinction becomes essential tooling for later Orthodox Christology and for the Maximian reading of Chalcedon.',
    etymology: 'From τρέπω (to turn)',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'What a Thing Is vs How It Exists', letter: 'Τ'
  },
  'δύο θελήματα': {
    transliteration: 'dyo thelemata', english: 'Two Wills',
    definition: '"Two wills" — Maximus\'s Christological formula in its compound form: two wills (divine and human) belonging to the one incarnate Son. The fuller confession of Constantinople III (681): two natural wills and two natural energies, united without confusion in one persona, neither contradicting the other but harmonized in perfect communion. Christ\'s human will freely consents to the Father\'s will even in Gethsemane: "not my will but yours" spoken by the human will itself, in union with the divine.',
    etymology: 'From δύο (two) + θελήματα (wills, plural of θέλημα)',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'Dyothelite Christology', letter: 'Δ'
  },
  'γνωμικὸν θέλημα': {
    transliteration: 'gnomikon thelema', english: 'Gnomic Will',
    definition: 'Gnomic will — the mode of human willing in which the person deliberates between alternatives, often against the better known good. Maximus distinguishes γνωμικὸν θέλημα (willing with hesitation, γνώμη) from φυσικὸν θέλημα (the natural willing proper to human nature as such). Christ has the natural human will but not the gnomic will: there is no deliberation in him between good and evil, no inward division, because his human willing is perfectly united to his divine.',
    etymology: 'From γνώμη (inclination, judgment) + θέλημα (will)',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'Deliberative Will Absent in Christ', letter: 'Γ'
  },
  'γνώμη': {
    transliteration: 'gnome', english: 'Inclination, Disposition',
    definition: 'Inclination, settled disposition — the characteristic tilt of a person\'s will. γνώμη names the fallen condition of human willing: the inner hesitation, the weighing of alternatives, the gap between knowing the good and willing it. Maximus\'s doctrine of γνώμη grounds his whole theology of human freedom and its healing: Christ, the perfect human, reveals what willing becomes when freed from its gnomic fracture (Opusculum 3).',
    etymology: 'From γιγνώσκω (to know) — "settled mind"',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'Fallen Hesitation of Human Willing', letter: 'Γ'
  },
  'προαίρεσις': {
    transliteration: 'proairesis', english: 'Choice, Deliberative Choice',
    definition: 'Choice — the Aristotelian term for the settled choice that follows deliberation. Maximus accepts προαίρεσις as a feature of fallen human willing (the outcome of γνωμικὸν θέλημα) but locates it outside Christ\'s mode of willing: Christ\'s human will is not choosing among alternatives but freely willing what the Father wills, without the interval of deliberation. The analysis retools Aristotle\'s ethics into a Christological anthropology.',
    etymology: 'From πρό (before) + αἱρέω (to take, choose)',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'Deliberative Choice in Fallen Willing', letter: 'Π'
  },
  'περιχώρησις': {
    transliteration: 'perichoresis', english: 'Perichoresis, Mutual Indwelling',
    definition: 'Perichoresis — "interpenetration," "mutual coinherence." Maximus is the first Christian theologian to use περιχώρησις substantively, applying it to the two natures of Christ: divinity and humanity interpenetrate without confusion in the single Christ (Ambigua 5; Disputation with Pyrrhus). John of Damascus (Phase 13) will extend the term to the Trinity: the three persons mutually indwell one another. The concept becomes a central category of Orthodox Triadology and Christology.',
    etymology: 'From περί (around) + χωρέω (to go, make room)',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'Mutual Interpenetration of Christ\'s Natures', letter: 'Π'
  },
  'ὁμολογητής': {
    transliteration: 'homologetes', english: 'Confessor',
    definition: '"Confessor" — the title given in Orthodox tradition to one who has suffered for the faith without martyrdom strictly understood. Maximus bore the title because of his final years: condemned for Dyothelite orthodoxy by the imperial Monothelite court, tortured (his right hand severed, his tongue cut out to silence his confession), and exiled to Lazica, where he died in 662. His teaching is vindicated nineteen years later at Constantinople III.',
    etymology: 'From ὁμολογέω (to confess, from ὁμός + λόγος)',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'Title of One Who Suffers for Orthodoxy', letter: 'Ο'
  },
  'φιλαυτία': {
    transliteration: 'philautia', english: 'Self-Love, Disordered Love',
    definition: 'Self-love — for Maximus, the root passion from which every other disordered passion grows (Chapters on Love 2.8; 3.56). φιλαυτία is not legitimate self-regard but inverted love: the turning of the will in upon itself rather than outward toward God and neighbor. The cure is not self-hatred but the reordering of love toward its proper object, which restores love of self in its rightful place.',
    etymology: 'From φίλος (loving) + αὐτός (self)',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'Self-Love as Root of All Passions', letter: 'Φ'
  },
  'πρᾶξις': {
    transliteration: 'praxis', english: 'Praxis, Active Life',
    definition: 'Praxis — the active, ascetical life of virtue. Maximus systematizes the three-stage spiritual ascent inherited from Evagrius and the Cappadocians: πρακτική (ascetical purification), φυσικὴ θεωρία (contemplation of God in creation through the λόγοι), and θεολογική or μυστικὴ θεολογία (direct mystical knowledge of God). The three are distinguishable but not separable; each prepares and contains the next.',
    etymology: 'From πράσσω (to do, act)',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'First Stage of the Spiritual Ascent', letter: 'Π'
  },
  'φυσικὴ θεωρία': {
    transliteration: 'physike theoria', english: 'Natural Contemplation',
    definition: 'Natural contemplation — the second stage of the Maximian spiritual ascent. Having been purified by πρᾶξις, the soul contemplates God in and through created things by reading their λόγοι. Creation becomes transparent to its Maker; the physical world is neither denied nor divinized but seen in its real dignity as the icon of the Logos. Natural contemplation disciplines the mind for the third stage, direct theology (μυστικὴ θεολογία, Phase 11).',
    etymology: 'From φυσική (natural, from φύσις) + θεωρία (Phase 5)',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'Second Stage: Contemplation of God in Creation', letter: 'Φ'
  },
  'διάκρισις': {
    transliteration: 'diakrisis', english: 'Discernment',
    definition: 'Discernment — the soul\'s Spirit-given capacity to distinguish the origin and quality of its thoughts, impulses, and loves. For Maximus as for the desert fathers before him, διάκρισις is the master virtue of the spiritual life: without it, ascetical effort misfires, contemplation slides into illusion, and charity loses its object. The whole apparatus of Chapters on Love is an education in discernment.',
    etymology: 'From διά (through, apart) + κρίνω (to judge)',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'Master Virtue of Spiritual Life', letter: 'Δ'
  },
  'συνεργία': {
    transliteration: 'synergia', english: 'Synergy, Cooperation',
    definition: 'Synergy — the cooperative working-together of divine grace and human will. For Maximus, salvation is God\'s work "in us but not without us": grace is primary, but it addresses a free creature whose free assent is part of the shape grace takes. συνεργία becomes the Orthodox grammar for what the Latin West will later discuss under the more legally-inflected categories of grace and free will.',
    etymology: 'From σύν (with) + ἔργον (work)',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'Grace and Human Freedom Working Together', letter: 'Σ'
  },
  'ἔφεσις': {
    transliteration: 'ephesis', english: 'Desire, Natural Longing',
    definition: 'Natural desire — the built-in reaching of every creature toward the God who made it. Maximus\'s doctrine of ἔφεσις undergirds his teleological cosmology: every creature\'s being comes with a native longing for its own fulfillment in God (Ambigua 7). The concept connects to Gregory of Nyssa\'s ἐπέκτασις (Phase 5): ἔφεσις is the appetitive ground, ἐπέκτασις the perpetual enacted movement of the saved soul.',
    etymology: 'From ἐφίημι (to aim at, long for)',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'Natural Longing of Creature for God', letter: 'Ε'
  },
  'γνῶσις': {
    transliteration: 'gnosis', english: 'Knowledge, Gnosis',
    definition: 'Knowledge. Maximus distinguishes (following Evagrius and the Cappadocians) two kinds of γνῶσις: a lower knowledge of God through his works in creation, gained in φυσικὴ θεωρία, and a higher direct γνῶσις of God himself, reached in μυστικὴ θεολογία. The term is carefully reclaimed from its Gnostic misuse: for Maximus, γνῶσις is inseparable from ἀγάπη (Phase 1) and from practical ascetic life.',
    etymology: 'From γιγνώσκω (to know)',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'Knowledge of God Through Creation and Directly', letter: 'Γ'
  },
  'ἀναλογία': {
    transliteration: 'analogia', english: 'Analogy, Proportion',
    definition: 'Proportion, analogy. For Maximus, the created order stands to its Creator in relations of ἀναλογία: not bare equivalence, but proportioned likeness in which each creature reflects God according to its capacity. ἀναλογία grounds Maximus\'s doctrine of the λόγοι and his theology of the sacraments, where material signs bear spiritual realities through a divinely established proportion.',
    etymology: 'From ἀνά (according to) + λόγος (ratio, proportion)',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'Proportioned Likeness of Creature to Creator', letter: 'Α'
  },
  'ἡδονή': {
    transliteration: 'hedone', english: 'Pleasure',
    definition: 'Pleasure. Maximus\'s most penetrating anthropological analysis (Ad Thalassium 61) traces human bondage to a closed cycle of ἡδονή and ὀδύνη (pleasure and pain): sin seeks pleasure, pleasure breeds pain, pain drives the search for new pleasure, and so the cycle revolves. The Incarnation shatters the cycle by accepting unmerited pain (the Passion) without the prior pursuit of pleasure — redeeming human desire at its root.',
    etymology: 'From ἥδομαι (to be pleased, delight)',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'Pleasure-Pain Cycle Broken by Incarnation', letter: 'Η'
  },
  'ἁπλῶσις': {
    transliteration: 'haplosis', english: 'Simplification, Unification',
    definition: 'Simplification — the drawing-together of the soul\'s scattered movements into single-hearted attention to God. Maximus uses ἁπλῶσις for the fruit of spiritual ascent: as the soul rises through πρᾶξις and θεωρία, its divided desires are simplified into one desire; its many thoughts into one knowing; its whole life into one love. Simplification is not loss of complexity but its recovery in unity.',
    etymology: 'From ἁπλοῦς (simple, single)',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'Unification of the Soul\'s Desires', letter: 'Α'
  },
  'Μυσταγωγία': {
    transliteration: 'Mystagogia', english: 'Mystagogy',
    definition: 'Mystagogy — the title of Maximus\'s commentary on the Divine Liturgy and, more generally, the Christian tradition of interpretation that reads the sacramental rites as initiation into the mysteries they enact. Maximus\'s Mystagogia reads the whole Liturgy as a single synthesis: each movement of the rite images some aspect of salvation history, creation\'s return to God, and the inner ascent of the soul. The work shapes all later Byzantine liturgical theology.',
    etymology: 'From μύστης (initiate) + ἀγωγή (leading)',
    phase: 12, fathers: ['Maximus the Confessor'], connection: 'Liturgical Theology as Initiation into Mystery', letter: 'Μ'
  },
  // --- John of Damascus cluster (Phase 13) ---
  'ἐνυπόστατος': {
    transliteration: 'enhypostatos', english: 'Enhypostatic, Subsisting in Another Hypostasis',
    definition: 'Enhypostatic — having real existence not in itself but in another hypostasis. Damascene\'s key technical term for Christ\'s human nature (Expositio 3.9): it is not ἀνυπόστατος (without hypostasis) nor a separate hypostasis of its own, but subsists in the divine hypostasis of the Word. The term, refined from Leontius of Byzantium, resolves the Christological puzzle left by Chalcedon — how can the human nature be real without being a second subject? — by locating its reality precisely in the one divine subject.',
    etymology: 'From ἐν (in) + ὑπόστατος (substantial, from ὑπόστασις, Phase 5)',
    phase: 13, fathers: ['John of Damascus'], connection: 'Christ\'s Human Nature Subsisting in the Divine Person', letter: 'Ε'
  },
  'ἀνυπόστατος': {
    transliteration: 'anhypostatos', english: 'Anhypostatic, Without Hypostasis',
    definition: 'Anhypostatic — without hypostasis, without independent existence. Paired with ἐνυπόστατος in Damascene\'s Christology: Christ\'s human nature is ἀνυπόστατος in the sense that it has no hypostasis of its own — no independent person-Jesus over against the Word. But it is not ἀνυπόστατος in the sense of being unreal; it is ἐνυπόστατος in the Word. The negation clears the field for the positive statement.',
    etymology: 'From ἀ- (not) + ὑπόστατος (having hypostasis)',
    phase: 13, fathers: ['John of Damascus'], connection: 'No Independent Human Person Alongside the Word', letter: 'Α'
  },
  'σύνθετος ὑπόστασις': {
    transliteration: 'synthetos hypostasis', english: 'Composite Hypostasis',
    definition: 'Composite hypostasis. Damascene inherits the concept from Cyril (cf. σύνθεσις, Phase 9) and Leontius of Byzantium, and fixes it as the standard post-Chalcedonian Christological vocabulary (Expositio 3.7): the one Christ is a hypostasis "composed" of divinity and humanity — not as a third nature alongside the two, but as the single acting subject in whom both natures subsist without confusion. The σύνθετος ὑπόστασις is Damascene\'s mature synthesis of the whole Greek Christological tradition.',
    etymology: 'From σύνθετος (composed, from σύν + τίθημι) + ὑπόστασις (Phase 5)',
    phase: 13, fathers: ['John of Damascus'], connection: 'Post-Chalcedonian Christological Synthesis', letter: 'Σ'
  },
  'προσκύνησις': {
    transliteration: 'proskynesis', english: 'Veneration, Reverential Bowing',
    definition: 'Veneration, reverential bowing. Damascene\'s Three Treatises on the Divine Images (c. 730, during the first wave of Iconoclasm) distinguish two kinds of προσκύνησις: προσκύνησις τῆς λατρείας (worship-veneration, rendered to God alone) and προσκύνησις τῆς τιμῆς (honor-veneration, rendered to creatures bearing God\'s likeness — icons, saints, the Cross, the Gospel Book). The icon receives not worship but honor, and the honor passes through to the prototype (Basil\'s dictum, quoted by Damascene).',
    etymology: 'From πρός (toward) + κυνέω (to kiss, make obeisance)',
    phase: 13, fathers: ['John of Damascus'], connection: 'Reverential Bowing Distinguished from Worship', letter: 'Π'
  },
  'λατρεία': {
    transliteration: 'latreia', english: 'Worship, Adoration',
    definition: 'Worship in its strict and absolute sense, due to God alone. Damascene sharpens the word against the Iconoclast charge of idolatry: icons are not offered λατρεία, which would be idolatry, but προσκύνησις (veneration), which belongs to the created order. The distinction travels into the Latin tradition as latria (to God) vs dulia (to saints) vs hyperdulia (to the Theotokos).',
    etymology: 'From λατρεύω (to serve, worship) — in the Septuagint, specifically divine service',
    phase: 13, fathers: ['John of Damascus'], connection: 'Worship Strictly Reserved to God', letter: 'Λ'
  },
  'δουλεία': {
    transliteration: 'douleia', english: 'Service, Relative Veneration',
    definition: 'Service — in Damascene\'s technical usage, the reverential service due to honored creatures, distinguished from λατρεία (due only to God). In the later Latin reception (via Aquinas) δουλεία becomes dulia, the standard term for the veneration of saints. Damascene\'s triple distinction — λατρεία, προσκύνησις, δουλεία — becomes the classical grammar for ordering worship and veneration across the Christian tradition.',
    etymology: 'From δοῦλος (servant, slave)',
    phase: 13, fathers: ['John of Damascus'], connection: 'Reverential Service Due to Honored Creatures', letter: 'Δ'
  },
  'ἁγία εἰκών': {
    transliteration: 'hagia eikon', english: 'Holy Icon',
    definition: '"Holy icon." Damascene\'s defense of the ἁγία εἰκών (Three Treatises on the Divine Images, c. 730) develops the full Orthodox theology of the image: because the invisible God has become visible in the Incarnation, he can and must be depicted; because matter has been sanctified by the Word\'s assumption of it, material images can be proper vehicles of grace; because honor passes to the prototype (πρωτότυπον), veneration of icons is veneration of Christ and the saints.',
    etymology: 'From ἅγιος (holy) + εἰκών (image, Phase 3)',
    phase: 13, fathers: ['John of Damascus'], connection: 'The Holy Icon in Orthodox Worship', letter: 'Α'
  },
  'πρωτότυπον': {
    transliteration: 'prototypon', english: 'Prototype, Archetype',
    definition: 'Prototype, archetype — that which an image images. Damascene\'s key argument for icon veneration rests on a patristic principle (Basil, On the Holy Spirit 18.45): "the honor rendered to the image passes to the prototype." The icon and its prototype share a relation, not an identity; the veneration offered to the icon rises through it to Christ, or to the saint whose likeness is depicted. The doctrine safeguards both the reality of the image and its subordination.',
    etymology: 'From πρῶτος (first) + τύπος (Phase 2)',
    phase: 13, fathers: ['John of Damascus'], connection: 'Honor of Image Passing to Its Archetype', letter: 'Π'
  },
  'χαρακτήρ': {
    transliteration: 'charakter', english: 'Character, Imprint, Stamp',
    definition: 'Character, imprint — as on a coin. Christ himself is called the χαρακτήρ of the Father\'s hypostasis in Hebrews 1:3, and Damascene extends the image to icon theology: an icon is a χαρακτήρ of its prototype, bearing its likeness without being its substance. The term gives the theology of image a biblical anchor and a non-reductive grammar: the icon really is related to the one imaged, yet is not the one imaged.',
    etymology: 'From χαράσσω (to engrave, inscribe)',
    phase: 13, fathers: ['John of Damascus'], connection: 'Icon as Imprint of Its Prototype', letter: 'Χ'
  },
  'εἰκονομαχία': {
    transliteration: 'eikonomachia', english: 'Iconoclasm',
    definition: '"Icon-fighting" — the Iconoclast controversy (c. 726–787; 814–843) that disrupted Byzantine Christianity for more than a century. Damascene\'s Three Treatises on the Divine Images (c. 730) are the first sustained patristic defense of icons; they circulate from his monastery at Mar Saba, outside Umayyad jurisdiction, while the iconoclast emperors cannot reach him. The controversy is finally resolved at the Triumph of Orthodoxy (843), still celebrated as the first Sunday of Lent.',
    etymology: 'From εἰκών (image) + μάχη (battle, fight)',
    phase: 13, fathers: ['John of Damascus'], connection: 'The Iconoclast Controversy', letter: 'Ε'
  },
  'τιμή': {
    transliteration: 'time', english: 'Honor, Reverence',
    definition: 'Honor. Damascene\'s fundamental principle for ordering veneration: τιμή is the due reverence given to what bears God\'s likeness. God receives λατρεία (worship); saints receive τιμή; matter that has borne holiness — icons, relics, the Cross, the Gospel Book — receives τιμή in its proper mode. The gradations of τιμή express, not dilute, the unity of worship: one God, glorified in his saints.',
    etymology: 'From τίω (to honor, value)',
    phase: 13, fathers: ['John of Damascus'], connection: 'Ordered Gradations of Reverence', letter: 'Τ'
  },
  'δόξα': {
    transliteration: 'doxa', english: 'Glory',
    definition: 'Glory. Damascene\'s δόξα is the radiant divine presence that belongs to God alone and is communicated to creatures by grace: the saints share δόξα by participation; icons and relics bear δόξα by derivation. The term runs through the whole patristic tradition (Origen, the Cappadocians, Chrysostom), and Damascene gathers its threads into the distinctively Byzantine theology of divine-light and transfiguration.',
    etymology: 'From δοκέω (to seem, to think)',
    phase: 13, fathers: ['John of Damascus'], connection: 'Divine Glory Communicated to Creatures', letter: 'Δ'
  },
  'ὕλη': {
    transliteration: 'hyle', english: 'Matter',
    definition: 'Matter. Damascene\'s most famous single line in the icon controversy: "I will not cease from venerating matter, through which my salvation was accomplished" (On the Divine Images 1.16). The Iconoclast position rests on a suspicion of matter as incapable of bearing the sacred; Damascene\'s response is fully incarnational — the Word became flesh, therefore flesh and by extension every material medium can be the vehicle of grace. Wood, pigment, water, bread, oil are all sanctified ὕλη.',
    etymology: 'Greek: originally "wood, timber," then "matter, stuff"',
    phase: 13, fathers: ['John of Damascus'], connection: 'Defense of Matter in Christian Worship', letter: 'Υ'
  },
  'αὐτεξούσιον': {
    transliteration: 'autexousion', english: 'Self-Determination, Free Will',
    definition: 'Self-determination — the human person\'s real freedom to will. Damascene\'s Expositio 2.25–27 gives the classical patristic treatment of αὐτεξούσιον: human freedom is neither absolute autonomy (which would be no creaturely mode) nor mere appearance (which would empty moral life), but a genuine creaturely self-determination ordered toward communion with God. The term becomes the Greek counterpart to the Latin liberum arbitrium.',
    etymology: 'From αὐτός (self) + ἐξουσία (authority, power)',
    phase: 13, fathers: ['John of Damascus'], connection: 'Human Freedom as Creaturely Self-Determination', letter: 'Α'
  },
  'ἀειπάρθενος': {
    transliteration: 'aeiparthenos', english: 'Ever-Virgin',
    definition: '"Ever-virgin" — the Marian title affirming Mary\'s virginity before, during, and after the birth of Christ. Damascene gives the title its settled dogmatic articulation (Expositio 4.14), defending against Helvidius and later rationalist objections. The title is formally received at the Fifth Ecumenical Council (Constantinople II, 553) and becomes standard in the Byzantine and (eventually) Latin liturgical tradition.',
    etymology: 'From ἀεί (always, ever) + παρθένος (virgin)',
    phase: 13, fathers: ['John of Damascus'], connection: 'Marian Title of Perpetual Virginity', letter: 'Α'
  },
  'μεταστοιχείωσις': {
    transliteration: 'metastoicheiosis', english: 'Transelementation',
    definition: 'Transelementation. Damascene\'s term for the Eucharistic change (Expositio 4.13): the bread and wine are "trans-elemented" into the body and blood of Christ by the power of the Holy Spirit. The term anticipates the later Latin transubstantiatio (first used c. 12th century) without the Aristotelian substance/accident framework: for Damascene the change is real and complete, and the Eucharistic elements are truly Christ\'s body and blood, but the philosophical apparatus is distinctively Greek.',
    etymology: 'From μετά (change) + στοιχεῖον (element)',
    phase: 13, fathers: ['John of Damascus'], connection: 'Eucharistic Change of the Elements', letter: 'Μ'
  },
  'ἀντίτυπον': {
    transliteration: 'antitypon', english: 'Antitype, Corresponding Figure',
    definition: 'Antitype — that which corresponds to a τύπος (Phase 2, Justin). For Damascene, Christ is the ἀντίτυπον of the Old Testament types; the Eucharistic elements, pre-consecration, are ἀντίτυπα of the body and blood in the Liturgy of St. Basil (a usage that Trent will later interpret more cautiously); icons are ἀντίτυπα of their prototypes, bearing likeness through correspondence. The term links typological, sacramental, and iconographic theology into a single theology of sign.',
    etymology: 'From ἀντί (corresponding to) + τύπος (type)',
    phase: 13, fathers: ['John of Damascus'], connection: 'Theology of Corresponding Sign', letter: 'Α'
  },
  'τροπάριον': {
    transliteration: 'troparion', english: 'Troparion, Hymn-Stanza',
    definition: 'Troparion — a short hymn-stanza, the basic unit of Byzantine liturgical poetry. Damascene is among the greatest hymnographers of the Eastern Church: the Paschal Canon ("The day of resurrection! Let us be illumined, O ye peoples!") is his, as are many octoechos hymns and much of the Oktoichos itself. The τροπάριον serves as the building block of the larger forms — the κανών (hymn of nine odes) and the ἀκάθιστος (the standing-hymn).',
    etymology: 'Diminutive of τρόπος (mode, manner) — originally a short verse inserted between psalm verses',
    phase: 13, fathers: ['John of Damascus'], connection: 'Basic Unit of Byzantine Hymnography', letter: 'Τ'
  },
  'εἱρμός': {
    transliteration: 'heirmos', english: 'Heirmos, Model-Stanza',
    definition: 'Heirmos — the model stanza that sets the melody and meter for an ode in a liturgical canon (κανών). Each of a canon\'s nine odes opens with its εἱρμός, thematically linking the ode to one of the nine biblical canticles. Damascene\'s hymn-writing, preserved and transmitted through the Sabaite monastic tradition, gives the εἱρμός-driven canon its classical shape; the form becomes central to the whole subsequent Byzantine musical-liturgical tradition.',
    etymology: 'From εἴρω (to string together, connect)',
    phase: 13, fathers: ['John of Damascus'], connection: 'Model-Stanza of the Liturgical Canon', letter: 'Ε'
  },
  'Πηγὴ Γνώσεως': {
    transliteration: 'Pege Gnoseos', english: 'Fount of Knowledge',
    definition: '"Fount of Knowledge" — the title of Damascene\'s great theological summa in three parts: the Philosophical Chapters (Dialectica), On Heresies, and the Exact Exposition of the Orthodox Faith (Expositio). The work transmits, organizes, and synthesizes the whole prior Greek patristic tradition, becoming the standard Orthodox dogmatic textbook for a millennium. Its translation into Latin (12th century) deeply shapes scholastic theology; Aquinas cites it extensively.',
    etymology: 'From πηγή (spring, fountain) + γνῶσις (knowledge)',
    phase: 13, fathers: ['John of Damascus'], connection: 'Damascene\'s Theological Summa', letter: 'Π'
  },
  'Ἔκδοσις ἀκριβής': {
    transliteration: 'Ekdosis akribes', english: 'Exact Exposition',
    definition: '"Exact Exposition of the Orthodox Faith" — the third part of Damascene\'s Fount of Knowledge, usually cited simply as the Expositio or De Fide Orthodoxa (in its Latin form). Organized in 100 chapters across four books (sometimes three in the Greek), it treats God, creation, Incarnation, and the Christian life in systematic order. The Expositio is the closest thing Byzantine theology has to an organized dogmatic manual, and shapes Orthodox theological instruction into the modern era.',
    etymology: 'From ἔκδοσις (setting forth, exposition) + ἀκριβής (exact, precise)',
    phase: 13, fathers: ['John of Damascus'], connection: 'The Systematic Orthodox Dogmatic Manual', letter: 'Ε'
  },
  'Δαμασκηνός': {
    transliteration: 'Damaskenos', english: 'The Damascene',
    definition: '"The Damascene" — the epithet by which John (c. 675–749) is universally known in the Christian tradition. Born into a wealthy Arab-Christian family at Damascus (his father served the Umayyad caliphs in administration), John follows his father briefly in civil service before entering the monastery of Mar Saba near Jerusalem, where he spends the rest of his life in writing, hymnography, and prayer. The Umayyad jurisdiction paradoxically protects him from Byzantine iconoclast persecution; his pen proves decisive for Orthodoxy\'s victory.',
    etymology: 'From Δαμασκός (Damascus)',
    phase: 13, fathers: ['John of Damascus'], connection: 'John of Damascus and His Setting', letter: 'Δ'
  }
};

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

// ==================================================================
// validateLexicon — console-callable health check.
// Returns { total, byPhase, issues[] }. Run at the end of every phase
// delivery and spot-check from the browser console. Catches missing
// required fields and slug collisions across the whole lexicon.
// ==================================================================
function validateLexicon() {
  const entries = Object.entries(LEXICON_ENTRIES);
  const issues = [];
  const slugs = new Map();
  const byPhase = {};

  entries.forEach(([key, entry]) => {
    if (!entry.transliteration) issues.push(`${key}: missing transliteration`);
    if (entry.phase === undefined) issues.push(`${key}: missing phase`);
    if (!entry.english)          issues.push(`${key}: missing english`);
    if (!entry.definition)       issues.push(`${key}: missing definition`);

    const slug = slugifyTerm(entry);
    if (slug && slugs.has(slug)) {
      issues.push(`Slug collision: "${slug}" used by both "${slugs.get(slug)}" and "${key}"`);
    } else if (slug) {
      slugs.set(slug, key);
    }

    const p = String(entry.phase);
    byPhase[p] = (byPhase[p] || 0) + 1;
  });

  return { total: entries.length, byPhase, issues };
}
