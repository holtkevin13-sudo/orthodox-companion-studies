#!/usr/bin/env python3
"""
generate_apkg.py — Build an Anki .apkg from lexicon-data.js.

Produces a single .apkg containing:
  - a parent deck "Patristic Lexicon" (auto-created on import)
  - 13 phase subdecks (Phase 01, Phase 02, Phase 02.5, Phase 03 … Phase 13)
  - two cards per entry: Recognition (Greek/Latin → English) and
    Production (English → Greek/Latin)
  - tags: phase-*, language-*, father-*, pastoral-note

Usage:
    python3 generate_apkg.py path/to/lexicon-data.js [output.apkg]

Requires:
    - Node.js (invoked as a subprocess to evaluate the JS object literal)
    - genanki  (pip install genanki)
"""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
import sys
import tempfile
from collections import Counter, defaultdict
from pathlib import Path

import genanki


# ---------------------------------------------------------------------------
# 1. Extraction — evaluate lexicon-data.js via a small Node subprocess.
# ---------------------------------------------------------------------------

NODE_EXTRACTOR = r"""
const fs = require('fs');
const src = fs.readFileSync(process.argv[2], 'utf8');
const marker = 'const LEXICON_ENTRIES = ';
const startIdx = src.indexOf(marker);
if (startIdx === -1) { console.error('LEXICON_ENTRIES not found'); process.exit(1); }
const exprStart = startIdx + marker.length;

// Walk the object literal counting braces, respecting strings and comments.
let depth = 0, i = exprStart;
let inStr = null, inLineComment = false, inBlockComment = false;
for (; i < src.length; i++) {
  const c = src[i], next = src[i + 1];
  if (inLineComment) { if (c === '\n') inLineComment = false; continue; }
  if (inBlockComment) { if (c === '*' && next === '/') { inBlockComment = false; i++; } continue; }
  if (inStr) {
    if (c === '\\') { i++; continue; }
    if (c === inStr) inStr = null;
    continue;
  }
  if (c === '/' && next === '/') { inLineComment = true; i++; continue; }
  if (c === '/' && next === '*') { inBlockComment = true; i++; continue; }
  if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
  if (c === '{') depth++;
  else if (c === '}') { depth--; if (depth === 0) { i++; break; } }
}

const objText = src.slice(exprStart, i);
const obj = Function('"use strict"; return (' + objText + ')')();
process.stdout.write(JSON.stringify(obj));
"""


def extract_entries(js_path: Path) -> dict:
    """Return the LEXICON_ENTRIES object from lexicon-data.js as a dict."""
    with tempfile.TemporaryDirectory() as td:
        script = Path(td) / "extract.js"
        script.write_text(NODE_EXTRACTOR, encoding="utf-8")
        proc = subprocess.run(
            ["node", str(script), str(js_path)],
            capture_output=True, text=True, check=True,
        )
    return json.loads(proc.stdout)


# ---------------------------------------------------------------------------
# 2. Helpers — IDs, slugs, tags, deck names.
# ---------------------------------------------------------------------------

def _hash_int(key: str, bits: int) -> int:
    """Deterministic integer derived from a string, fitting in `bits` bits."""
    h = hashlib.sha256(key.encode("utf-8")).digest()
    # 8 bytes is plenty; mask down to requested bit width.
    return int.from_bytes(h[:8], "big") & ((1 << bits) - 1)


# Anki uses signed 63-bit ints for IDs but in practice any positive int up to
# ~2^31 is safe and avoids JS interop issues in older Anki clients. We pick
# distinct ranges so model IDs and deck IDs never collide.
MODEL_ID = _hash_int("orthodox-companion.lexicon.model.v1", bits=31) + (1 << 30)
DECK_ID_BASE = _hash_int("orthodox-companion.lexicon.decks.v1", bits=29)


def deck_id_for_phase(phase) -> int:
    """Stable deck ID per phase. Phase 2.5 → distinct from Phase 2 and Phase 3."""
    # Multiply by 10 so 2.5 → 25, giving integer offsets for every .5 phase.
    offset = int(round(float(phase) * 10))
    return DECK_ID_BASE + offset


def note_guid(headword: str, phase, language: str) -> str:
    """Stable GUID per note. Re-imports update instead of duplicating."""
    key = f"orthodox-companion.lexicon|{headword}|{phase}|{language}"
    return hashlib.sha256(key.encode("utf-8")).hexdigest()[:16]


_SLUG_STRIP = re.compile(r"[^\w\s-]", flags=re.UNICODE)


def slugify(name: str) -> str:
    s = name.lower().strip()
    s = _SLUG_STRIP.sub("", s)
    s = re.sub(r"[\s_]+", "-", s)
    s = re.sub(r"-+", "-", s).strip("-")
    return s


def phase_tag(phase) -> str:
    """phase-1, phase-2, phase-2-5, phase-13."""
    return "phase-" + str(phase).replace(".", "-")


def deck_name_for_phase(phase) -> str:
    """
    Subdeck name for a phase, chosen so Anki's alphabetical deck sort gives
    numerical order: 'Phase 01', 'Phase 02', 'Phase 02.5', 'Phase 03', … 'Phase 13'.
    """
    p = str(phase)
    if p == "2.5":
        return "Patristic Lexicon::Phase 02.5"
    n = int(float(p))
    return f"Patristic Lexicon::Phase {n:02d}"


def build_tags(entry: dict) -> list[str]:
    tags = [phase_tag(entry["phase"])]
    tags.append("language-" + entry.get("language", "greek"))
    for father in entry.get("fathers", []):
        tags.append("father-" + slugify(father))
    if "pastoralNote" in entry:
        tags.append("pastoral-note")
    return tags


# ---------------------------------------------------------------------------
# 3. Card templates & CSS.
# ---------------------------------------------------------------------------

# The back is identical for both cards — the headword always sits on top,
# definition and metadata follow. This keeps review identical regardless of
# which direction the card came from.

RECOGNITION_FRONT = """\
<div class="headword {{LangClass}}">{{Headword}}</div>
"""

PRODUCTION_FRONT = """\
<div class="english-prompt">{{English}}</div>
<div class="father-hint">{{FatherHint}}</div>
"""

BACK_TEMPLATE = """\
<div class="headword {{LangClass}}">{{Headword}}</div>
<div class="translit">{{Transliteration}}</div>
<hr class="rule">
<div class="english-back">{{English}}</div>
<div class="definition">{{Definition}}</div>
<dl class="meta">
  <dt>Etymology</dt><dd>{{Etymology}}</dd>
  <dt>{{FathersLabel}}</dt><dd>{{Fathers}}</dd>
  <dt>Connection</dt><dd>{{Connection}}</dd>
  <dt>Phase</dt><dd>{{Phase}}</dd>
</dl>
{{#PastoralNote}}
<div class="pastoral-note">
  <div class="pastoral-label">Pastoral Note</div>
  <div class="pastoral-body">{{PastoralNote}}</div>
</div>
{{/PastoralNote}}
"""

# CSS notes:
#   - No hardcoded background/foreground on .card, so Anki day/night mode
#     controls contrast. We only set typography and a subtle gold rule.
#   - Night mode gets a slightly brighter gold via the .nightMode override.
#   - Greek script gets a serif stack that prefers Gentium Plus if installed.
#   - Latin headwords are italicized (classical convention for Latin lemmas).
CARD_CSS = """\
.card {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 20px;
  line-height: 1.5;
  text-align: center;
  padding: 1.2em 1em;
}

.headword {
  font-size: 2.4em;
  line-height: 1.2;
  margin: 0.4em 0 0.2em;
  font-family: 'Gentium Plus', 'Gentium Book Plus', 'GFS Didot', Georgia, 'Times New Roman', serif;
  font-weight: 500;
}
.headword.latin {
  font-style: italic;
}

.translit {
  font-style: italic;
  opacity: 0.72;
  letter-spacing: 0.02em;
  margin-bottom: 0.3em;
}

.english-prompt {
  font-size: 1.8em;
  font-style: italic;
  margin: 1em auto 0.2em;
  max-width: 22em;
  line-height: 1.3;
}
.father-hint {
  font-size: 0.92em;
  opacity: 0.65;
  margin-bottom: 0.6em;
}

.english-back {
  font-size: 1.1em;
  font-weight: 600;
  margin: 0.5em 0 0.3em;
  letter-spacing: 0.01em;
}

.definition {
  text-align: left;
  max-width: 42em;
  margin: 0.8em auto 0.4em;
  font-size: 0.95em;
  line-height: 1.55;
}

.rule {
  border: 0;
  border-top: 1px solid #b8860b;
  opacity: 0.4;
  margin: 1em auto;
  max-width: 55%;
}
.nightMode .rule {
  border-top-color: #d4a94c;
  opacity: 0.55;
}

.meta {
  text-align: left;
  max-width: 42em;
  margin: 0.8em auto 0.2em;
  font-size: 0.86em;
  line-height: 1.5;
}
.meta dt {
  font-variant: small-caps;
  letter-spacing: 0.06em;
  opacity: 0.62;
  margin-top: 0.5em;
  font-size: 0.92em;
}
.meta dd {
  margin: 0.1em 0 0.3em 0;
  padding-left: 0;
}

.pastoral-note {
  text-align: left;
  max-width: 42em;
  margin: 1.1em auto 0.2em;
  padding: 0.8em 1em;
  border: 1px solid rgba(184, 134, 11, 0.32);
  border-radius: 2px;
  font-size: 0.88em;
  line-height: 1.55;
}
.nightMode .pastoral-note {
  border-color: rgba(212, 169, 76, 0.38);
}
.pastoral-label {
  font-variant: small-caps;
  letter-spacing: 0.08em;
  font-size: 0.82em;
  opacity: 0.68;
  margin-bottom: 0.45em;
}
"""


# ---------------------------------------------------------------------------
# 4. Model.
# ---------------------------------------------------------------------------

def build_model() -> genanki.Model:
    return genanki.Model(
        MODEL_ID,
        "Patristic Lexicon",
        fields=[
            {"name": "Headword"},
            {"name": "LangClass"},
            {"name": "Transliteration"},
            {"name": "English"},
            {"name": "Definition"},
            {"name": "Etymology"},
            {"name": "Fathers"},
            {"name": "FathersLabel"},
            {"name": "Connection"},
            {"name": "Phase"},
            {"name": "PastoralNote"},
            {"name": "FatherHint"},
        ],
        templates=[
            {"name": "Recognition", "qfmt": RECOGNITION_FRONT, "afmt": BACK_TEMPLATE},
            {"name": "Production",  "qfmt": PRODUCTION_FRONT,  "afmt": BACK_TEMPLATE},
        ],
        css=CARD_CSS,
    )


# ---------------------------------------------------------------------------
# 5. Note construction.
# ---------------------------------------------------------------------------

def note_fields(key: str, entry: dict, english_counts: Counter, model: genanki.Model) -> genanki.Note:
    fathers = entry.get("fathers", [])
    fathers_str = ", ".join(fathers) if fathers else ""
    fathers_label = "Father" if len(fathers) <= 1 else "Fathers"
    language = entry.get("language", "greek")

    # Only show the (Father: X) disambiguation on the Production front when
    # the English gloss is ambiguous (shared by multiple entries).
    needs_hint = english_counts[entry["english"]] > 1
    if needs_hint and fathers:
        if len(fathers) == 1:
            father_hint = f"(Father: {fathers[0]})"
        else:
            father_hint = f"(Fathers: {fathers_str})"
    else:
        father_hint = ""

    fields = [
        key,                                    # Headword (the Greek/Latin dict key)
        language,                               # LangClass
        entry.get("transliteration", ""),       # Transliteration
        entry.get("english", ""),               # English
        entry.get("definition", ""),            # Definition
        entry.get("etymology", ""),             # Etymology
        fathers_str,                            # Fathers
        fathers_label,                          # FathersLabel
        entry.get("connection", ""),            # Connection
        str(entry.get("phase", "")),            # Phase
        entry.get("pastoralNote", ""),          # PastoralNote (may be "")
        father_hint,                            # FatherHint
    ]

    note = genanki.Note(
        model=model,
        fields=fields,
        tags=build_tags(entry),
        guid=note_guid(key, entry.get("phase"), language),
    )
    return note


# ---------------------------------------------------------------------------
# 6. Reporting.
# ---------------------------------------------------------------------------

def preflight_report(entries: dict) -> None:
    items = list(entries.items())
    total = len(items)
    by_phase = Counter(str(e["phase"]) for _, e in items)
    by_lang = Counter(e.get("language", "greek") for _, e in items)
    pastoral_count = sum(1 for _, e in items if "pastoralNote" in e)
    focus_count = sum(1 for _, e in items if e.get("isFocus") is True)
    all_fathers = Counter()
    for _, e in items:
        for f in e.get("fathers", []):
            all_fathers[f] += 1

    print("=" * 68)
    print("PRE-FLIGHT REPORT")
    print("=" * 68)
    print(f"Total entries:         {total}")
    print(f"Greek / Latin split:   {by_lang.get('greek', 0)} Greek · {by_lang.get('latin', 0)} Latin")
    print(f"Entries w/ pastoral:   {pastoral_count}")
    print(f"isFocus = true:        {focus_count}   "
          f"{'(field not present in data)' if focus_count == 0 else ''}")
    print()
    print("Per-phase counts (sorted by phase number):")
    for phase in sorted(by_phase, key=lambda p: float(p)):
        count = by_phase[phase]
        print(f"    Phase {phase:>4}   {count:>3} entries")
    print()
    print(f"Distinct Fathers:      {len(all_fathers)}")
    print("Top 10 by entry count:")
    for father, n in all_fathers.most_common(10):
        print(f"    {n:>3}  {father}")
    print("=" * 68)
    print()


def final_report(num_decks: int, notes: list[genanki.Note], out_path: Path) -> None:
    all_tags = set()
    for n in notes:
        all_tags.update(n.tags)
    size_kb = out_path.stat().st_size / 1024

    print("=" * 68)
    print("DECK BUILT")
    print("=" * 68)
    print(f"Output file:           {out_path}")
    print(f"File size:             {size_kb:.1f} KB")
    print(f"Decks:                 1 parent + {num_decks} subdecks (parent auto-created on import)")
    print(f"Notes:                 {len(notes)}")
    print(f"Cards:                 {len(notes) * 2}  (Recognition + Production per note)")
    print(f"Unique tags:           {len(all_tags)}")
    print()
    print("Tag categories used:")
    categories = defaultdict(list)
    for t in sorted(all_tags):
        prefix = t.split("-", 1)[0]
        categories[prefix].append(t)
    for prefix in ("phase", "language", "father", "pastoral"):
        tags_in_cat = categories.get(prefix, [])
        if not tags_in_cat:
            continue
        sample = ", ".join(tags_in_cat[:4])
        more = f"  … (+{len(tags_in_cat) - 4} more)" if len(tags_in_cat) > 4 else ""
        print(f"    {prefix + ':':<12} {len(tags_in_cat):>3} tags   e.g. {sample}{more}")
    print("=" * 68)


# ---------------------------------------------------------------------------
# 7. Orchestration.
# ---------------------------------------------------------------------------

def build(js_path: Path, out_path: Path) -> None:
    entries = extract_entries(js_path)
    preflight_report(entries)

    model = build_model()

    # Collision detection for Production-front father hints.
    english_counts = Counter(e["english"] for e in entries.values())

    # One Deck per phase. Parent deck is implicit.
    decks_by_phase: dict[str, genanki.Deck] = {}
    for phase in sorted({str(e["phase"]) for e in entries.values()}, key=lambda p: float(p)):
        decks_by_phase[phase] = genanki.Deck(
            deck_id_for_phase(phase),
            deck_name_for_phase(phase),
        )

    all_notes: list[genanki.Note] = []
    for key, entry in entries.items():
        note = note_fields(key, entry, english_counts, model)
        decks_by_phase[str(entry["phase"])].add_note(note)
        all_notes.append(note)

    package = genanki.Package(list(decks_by_phase.values()))
    package.write_to_file(str(out_path))

    final_report(len(decks_by_phase), all_notes, out_path)


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print("Usage: python3 generate_apkg.py lexicon-data.js [output.apkg]", file=sys.stderr)
        return 2
    js_path = Path(argv[1]).resolve()
    if not js_path.exists():
        print(f"Not found: {js_path}", file=sys.stderr)
        return 1
    out_path = Path(argv[2]).resolve() if len(argv) >= 3 else Path("patristic-lexicon.apkg").resolve()
    build(js_path, out_path)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
