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
// build: 2026-04-17T19:00:00Z

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
