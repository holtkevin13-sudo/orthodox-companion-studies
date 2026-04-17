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
// build: 2026-04-17T22:00:00Z

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
    phase: 2.5, fathers: ['Tertullian'], connection: 'Latin Christology of the Word', letter: 'S'
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
    phase: 7, fathers: ['John Chrysostom'], connection: 'Theology of Wealth and Its Redistribution', letter: 'Π'
  },
  'ἀνάγνωσις': {
    transliteration: 'anagnosis', english: 'Reading, Scripture Reading',
    definition: 'Reading — specifically, the reading of Scripture. Chrysostom famously urges ἀνάγνωσις on every Christian, pressing back against the assumption that Scripture is the preserve of monks and clergy: "the Scriptures were written not only for monks but also for you, a layperson with wife and children" (Hom. in Matt. 2.5). Daily reading at home is theologically required — a lay participation in the Church\'s whole teaching office.',
    etymology: 'From ἀνά (up, again) + γιγνώσκω (to know)',
    phase: 7, fathers: ['John Chrysostom'], connection: 'Lay Reading of Scripture', letter: 'Α'
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
