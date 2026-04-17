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
// build: 2026-04-17T20:00:00Z

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
