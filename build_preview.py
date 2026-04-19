#!/usr/bin/env python3
"""
build_preview.py — Render sample cards to a standalone HTML file so Kevin
can inspect typography and layout before importing the .apkg into Anki.

Pulls three representative entries:
  1. ἐπίσκοπος (Phase 1, Greek, Ignatius) — foundational Greek term
  2. First Latin entry from Phase 10 (Leo the Great)
  3. First entry carrying a pastoralNote

For each: shows both card faces (Recognition front, Production front, shared Back),
rendered with the exact CSS used in the .apkg.
"""
from __future__ import annotations
import html
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from generate_apkg import (
    extract_entries, CARD_CSS, note_fields, build_model
)
from collections import Counter


def render_field(template: str, fields: dict) -> str:
    """Tiny Mustache-subset renderer: {{Field}} and {{#Field}}...{{/Field}}."""
    import re
    # Conditional blocks first.
    def cond(m):
        name, body = m.group(1), m.group(2)
        return body if fields.get(name, "") else ""
    out = re.sub(r"\{\{#(\w+)\}\}(.*?)\{\{/\1\}\}", cond, template, flags=re.DOTALL)
    # Simple substitutions (do NOT html-escape — fields are already trusted
    # and we want typographic quotes/dashes to render).
    def sub(m):
        name = m.group(1)
        return fields.get(name, "")
    out = re.sub(r"\{\{(\w+)\}\}", sub, out)
    return out


def fields_dict_for(key, entry, english_counts):
    # Replicate the field-building logic from note_fields, but return a dict.
    fathers = entry.get("fathers", [])
    fathers_str = ", ".join(fathers) if fathers else ""
    fathers_label = "Father" if len(fathers) <= 1 else "Fathers"
    language = entry.get("language", "greek")

    needs_hint = english_counts[entry["english"]] > 1
    if needs_hint and fathers:
        if len(fathers) == 1:
            father_hint = f"(Father: {fathers[0]})"
        else:
            father_hint = f"(Fathers: {fathers_str})"
    else:
        father_hint = ""

    return {
        "Headword": key,
        "LangClass": language,
        "Transliteration": entry.get("transliteration", ""),
        "English": entry.get("english", ""),
        "Definition": entry.get("definition", ""),
        "Etymology": entry.get("etymology", ""),
        "Fathers": fathers_str,
        "FathersLabel": fathers_label,
        "Connection": entry.get("connection", ""),
        "Phase": str(entry.get("phase", "")),
        "PastoralNote": entry.get("pastoralNote", ""),
        "FatherHint": father_hint,
    }


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


def build_preview(js_path: Path, out_path: Path):
    entries = extract_entries(js_path)
    english_counts = Counter(e["english"] for e in entries.values())

    # Pick samples.
    samples = []
    # 1. ἐπίσκοπος (Phase 1 Greek)
    if "ἐπίσκοπος" in entries:
        samples.append(("ἐπίσκοπος", entries["ἐπίσκοπος"]))

    # 2. First Latin Phase 10 entry (Leo the Great)
    for k, e in entries.items():
        if e.get("language") == "latin" and str(e.get("phase")) == "10":
            samples.append((k, e))
            break

    # 3. First entry with pastoralNote
    for k, e in entries.items():
        if "pastoralNote" in e:
            samples.append((k, e))
            break

    parts = []
    parts.append(f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Patristic Lexicon — Card Preview</title>
<style>
  body {{
    background: #e8e5de;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin: 0;
    padding: 2em 1em;
    color: #2a2a2a;
  }}
  .page-title {{
    text-align: center;
    font-family: Georgia, serif;
    font-size: 1.8em;
    margin: 0 0 0.3em;
    letter-spacing: 0.01em;
  }}
  .page-subtitle {{
    text-align: center;
    font-family: Georgia, serif;
    font-style: italic;
    opacity: 0.7;
    margin: 0 0 2em;
  }}
  .sample {{
    max-width: 1100px;
    margin: 0 auto 3em;
  }}
  .sample-header {{
    font-family: Georgia, serif;
    font-variant: small-caps;
    letter-spacing: 0.12em;
    font-size: 0.95em;
    opacity: 0.65;
    margin: 0 0 0.8em;
    padding-left: 0.2em;
  }}
  .row {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    margin-bottom: 1em;
  }}
  .row.single {{
    grid-template-columns: 1fr;
  }}
  .card-frame {{
    background: #fdfcf9;
    border: 1px solid #c9c3b4;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    min-height: 180px;
  }}
  .card-frame.dark {{
    background: #1f1f1e;
    border-color: #3a3732;
  }}
  .frame-label {{
    padding: 0.4em 0.9em;
    border-bottom: 1px solid rgba(0,0,0,0.08);
    font-family: Georgia, serif;
    font-variant: small-caps;
    letter-spacing: 0.1em;
    font-size: 0.78em;
    opacity: 0.6;
  }}
  .card-frame.dark .frame-label {{
    border-bottom-color: rgba(255,255,255,0.08);
    color: #ccc;
  }}
  .card-frame.dark .card {{
    color: #e8e6e0;
  }}
{CARD_CSS}
</style>
</head>
<body>
<h1 class="page-title">Patristic Lexicon — Card Preview</h1>
<p class="page-subtitle">Three representative entries. Each shows Recognition front, Production front, and the shared Back face — rendered in both day and night modes.</p>
""")

    def make_card(face_label, body_html, night=False):
        klass = "card-frame dark" if night else "card-frame"
        nightmode_class = ' class="nightMode"' if night else ""
        return f"""    <div class="{klass}">
      <div class="frame-label">{face_label}{' · Night Mode' if night else ' · Day Mode'}</div>
      <div{nightmode_class}>
        <div class="card">
          {body_html}
        </div>
      </div>
    </div>"""

    for i, (key, entry) in enumerate(samples, 1):
        fields = fields_dict_for(key, entry, english_counts)

        header_bits = [f"Sample {i}",
                       f"Phase {entry['phase']}",
                       entry.get("language", "greek").title(),
                       f"{'; '.join(entry.get('fathers', []))}"]
        if "pastoralNote" in entry:
            header_bits.append("with pastoral note")
        header = "  ·  ".join(header_bits)

        recognition_front = render_field(RECOGNITION_FRONT, fields)
        production_front = render_field(PRODUCTION_FRONT, fields)
        back = render_field(BACK_TEMPLATE, fields)

        parts.append(f'<section class="sample">')
        parts.append(f'  <h2 class="sample-header">{html.escape(header)}</h2>')

        # Row 1: Both fronts side by side (day mode)
        parts.append('  <div class="row">')
        parts.append(make_card("Recognition · Front", recognition_front))
        parts.append(make_card("Production · Front", production_front))
        parts.append('  </div>')

        # Row 2: Back face, day mode then night mode
        parts.append('  <div class="row">')
        parts.append(make_card("Shared Back", back))
        parts.append(make_card("Shared Back", back, night=True))
        parts.append('  </div>')

        parts.append('</section>')

    parts.append("</body></html>")
    out_path.write_text("\n".join(parts), encoding="utf-8")
    print(f"Preview written: {out_path}")


if __name__ == "__main__":
    js = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("/mnt/user-data/uploads/lexicon-data.js")
    out = Path(sys.argv[2]) if len(sys.argv) > 2 else Path("preview.html")
    build_preview(js, out)
