# Mayoni.Code Flip7 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the Mayoni.Code landing page from cyberpunk-neon-dark to the retro-playful teal/coral/gold Flip7 language defined in `design.md`, keeping all content and sections.

**Architecture:** Single-page static site (HTML + CSS + vanilla JS, no build step). The redesign is a full rewrite of `les.css` (token layer + component styles), targeted edits to `index.html` (fonts, hero/logo markup, section-title emoji chips, discount ribbon), and a small cleanup of `code.js` (inline cyan colors → CSS classes). The design reference is `docs/superpowers/specs/2026-07-31-mayoni-code-flip7-redesign.md` — the source of truth for all tokens and treatments.

**Tech Stack:** Plain HTML5, CSS3 (custom properties, pseudo-elements, flex/grid, clamp), vanilla JS (IntersectionObserver). Google Fonts: Baloo 2 (800) + Nunito (400/700).

## Global Constraints

- Colors, radii, shadows, spacing, typography come ONLY from the token list in `docs/superpowers/specs/2026-07-31-mayoni-code-flip7-redesign.md` (adapted from `design.md`). No neon cyan `#00F3FF`, purple `#BF00FF`, or black backgrounds anywhere.
- Light mode only. Page background `#EFF8F7`.
- Interactive elements: pill/rounded, colored-glow shadows only (never plain black shadow on interactive elements), active state `scale(0.95)`, micro-interactions ≤ 500ms, min touch target 44px height.
- All content text stays identical (Indonesian copy, English system-style headers like `SYSTEM_INFO`). Only visual markup may change.
- `img/cok.webp` is no longer used: remove its `<link rel="preload">` and the `.scanlines` overlay div.
- Emoji must live in a `div`/`span` container, never as bare text nodes styled as emoji (WeChat mini-program rule from design.md).
- No test framework exists. Verification is browser-based; use `python3 -m http.server 8000` in the repo root and open `http://localhost:8000`.

---

### Task 1: Foundation — fonts, tokens, base styles, navbar

**Files:**
- Modify: `index.html:24-35` (Google Fonts link)
- Modify: `index.html:38-39` (remove `.scanlines` div)
- Rewrite: `les.css` (tokens + reset + base + navbar sections; later tasks append component sections to this file)

**Interfaces:**
- Consumes: nothing.
- Produces: the `:root` CSS custom properties that every later task uses — color tokens (`--primary-teal`, `--accent-gold`, `--coral`, `--cream`, `--surface-base`, `--surface-card`, `--success`, etc.), `--font-display`, `--font-body`, spacing/radius/shadow tokens.

- [ ] **Step 1: Swap the Google Fonts link in `index.html`**

Replace the existing fonts `<link>` (Exo 2 / Rajdhani / Share Tech Mono) with:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@400;600;700;800&display=swap"
  rel="stylesheet"
/>
```

- [ ] **Step 2: Remove the scanlines overlay and the cok.webp preload**

Delete `<link rel="preload" as="image" href="img/cok.webp" />` and the `<div class="scanlines" aria-hidden="true"></div>` line.

- [ ] **Step 3: Rewrite `les.css` — tokens, reset, base**

Replace the entire file. Start with the token layer (exact values from the spec):

```css
:root {
  --primary-teal:  #2BA8A2;
  --primary-light: #3CC4BD;
  --primary-dark:  #1E8C86;
  --primary-bg:    #E8F6F5;

  --accent-gold:   #FFD23F;
  --accent-light:  #FFE47A;
  --accent-dark:   #E6B800;

  --coral:         #EF6C4A;
  --coral-light:   #FF8A6A;
  --coral-dark:    #D45233;

  --cream:         #FFF8E7;
  --sky:           #5DADE2;
  --surface-base:  #EFF8F7;
  --surface-card:  #FFFFFF;
  --success:       #27AE60;
  --error:         #E74C3C;

  --text-main:     #22514E;   /* deep teal-gray, readable on light bg */
  --text-muted:    #5E7A78;
  --text-dim:      #8FA8A6;

  --font-display:  'Baloo 2', sans-serif;
  --font-body:     'Nunito', sans-serif;

  --space-xs: 0.25rem; --space-sm: 0.5rem; --space-md: 1rem;
  --space-lg: 1.5rem;  --space-xl: 2rem;

  --radius-sm: 8px; --radius-md: 16px; --radius-lg: 24px; --radius-xl: 32px; --radius-round: 999px;

  --shadow-sm: 0 2px 8px rgba(0,0,0,.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,.12);
  --shadow-card: 0 4px 20px rgba(43,168,162,.10);
  --shadow-coral-glow: 0 4px 20px rgba(239,108,74,.35);
  --shadow-teal-glow: 0 4px 20px rgba(43,168,162,.30);
  --shadow-accent-glow: 0 4px 20px rgba(255,210,63,.40);
  --shadow-sky-glow: 0 4px 16px rgba(93,173,226,.30);
}
```

Then reset (`*{margin:0;padding:0;box-sizing:border-box}`, `html{scroll-behavior:smooth}`), `body` (Nunito 400, `color: var(--text-main)`, `background: var(--surface-base)`, line-height 1.7, antialiased). Base `::selection` in teal tint. Do NOT port the grid-bg `body::before` from the old theme.

- [ ] **Step 4: Add navbar styles (light, pill gold CTA)**

```css
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: rgba(255,255,255,.88);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--primary-bg);
  transition: box-shadow .3s;
}
.navbar.navbar-scrolled { box-shadow: 0 2px 20px rgba(43,168,162,.15); }

.nav-inner { max-width: 960px; margin: 0 auto; padding: 0 20px; height: 64px;
  display: flex; align-items: center; justify-content: space-between; }

.nav-logo { font-family: var(--font-display); font-weight: 800; font-size: 1.05rem;
  color: var(--primary-dark); text-decoration: none; letter-spacing: 1px; }
.logo-bracket { color: var(--text-dim); }
.logo-dot { color: var(--accent-dark); }
.logo-code { color: var(--accent-dark); }

.nav-cta {
  font-family: var(--font-display); font-weight: 700; font-size: .8rem;
  color: var(--primary-dark); background: linear-gradient(180deg, var(--accent-light), var(--accent-gold));
  padding: 9px 20px; border-radius: var(--radius-round);
  text-decoration: none; letter-spacing: 1px; box-shadow: var(--shadow-accent-glow);
  transition: transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s;
}
.nav-cta:active { transform: scale(.95); }
```

Also define a shared `.btn` base now (used by Task 2 and later): pill, min-height 44px, Baloo 2 800, `:active { transform: scale(.95) }`, bounce transition curve `cubic-bezier(.34,1.56,.64,1)`.

- [ ] **Step 5: Verify**

Run `python3 -m http.server 8000` in repo root, open `http://localhost:8000`. Expect: light cream-teal page, no scanlines, navbar with `[MAYONI.CODE]` in teal/gold and a gold pill `DAFTAR_SEKARANG`. Scroll → navbar gets a soft teal shadow. Body text is Nunito; no neon anywhere.

- [ ] **Step 6: Commit**

```bash
git add index.html les.css
git commit -m "style: flip7 design foundation (tokens, base, navbar)"
```

---

### Task 2: Hero — fan cards, wordmark, ribbon, stats

**Files:**
- Modify: `index.html:54-90` (hero section markup)
- Modify: `les.css` (append hero styles)

**Interfaces:**
- Consumes: all `:root` tokens from Task 1.
- Produces: classes later tasks don't depend on, but the hero must keep the anchors `#kontak` and `#kurikulum` on its CTAs (footer and curriculum sections rely on them).

- [ ] **Step 1: Replace the hero markup in `index.html`**

Replace the whole `<header class="hero">…</header>` block with:

```html
<header class="hero">
  <div class="hero-fan-cards" aria-hidden="true">
    <span class="fan-card fc-1"></span>
    <span class="fan-card fc-2"></span>
    <span class="fan-card fc-3"></span>
    <span class="fan-card fc-4"></span>
    <span class="fan-card fc-5"></span>
  </div>

  <div class="hero-content">
    <div class="hero-tag">// KURSUS_KOMPUTER.v2026</div>

    <div class="logo-block">
      <div class="logo-inner">
        <div class="logo-plate">
          <h1 class="hero-title">
            <span class="t-teal">MAYONI</span><span class="t-gold">.CODE</span>
          </h1>
        </div>
        <div class="ribbon"><span>KURSUS_KOMPUTER · SD SMP SMA</span></div>
      </div>
    </div>

    <p class="hero-sub">
      Program kursus komputer masa depan untuk tingkat SD, SMP, dan SMA.
      Kuasai teknologi, bangun masa depanmu.
    </p>
    <div class="hero-actions">
      <a href="#kontak" class="btn btn-gold">INITIALIZE_LEARNING →</a>
      <a href="#kurikulum" class="btn btn-ghost">LIHAT_PROGRAM</a>
    </div>
    <div class="hero-stats">
      <div class="stat">
        <span class="stat-icon">🎓</span>
        <span class="stat-num">3</span><span class="stat-label">Level</span>
      </div>
      <div class="stat">
        <span class="stat-icon">💰</span>
        <span class="stat-num">50K</span><span class="stat-label">/ Bulan</span>
      </div>
      <div class="stat">
        <span class="stat-icon">🎁</span>
        <span class="stat-num">50%</span><span class="stat-label">Disc. Yatim</span>
      </div>
    </div>
  </div>
</header>
```

- [ ] **Step 2: Add hero + logo styles**

```css
.hero {
  position: relative; min-height: 100svh; display: flex; align-items: center;
  justify-content: center; text-align: center; padding: 120px 20px 80px; overflow: hidden;
  background:
    radial-gradient(ellipse at 50% 0%, var(--primary-bg) 0%, transparent 60%),
    var(--surface-base);
}

.hero-fan-cards { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -88%);
  display: flex; gap: 8px; pointer-events: none; z-index: 0; }
.fan-card { width: 54px; height: 84px; border-radius: 10px;
  border: 2px solid rgba(0,0,0,.08); box-shadow: var(--shadow-md); }
.fc-1 { transform: rotate(-24deg);  background: var(--primary-teal); }
.fc-2 { transform: rotate(-12deg);  background: var(--accent-gold); }
.fc-3 { transform: rotate(0deg);    background: var(--coral); }
.fc-4 { transform: rotate(12deg);   background: var(--sky); }
.fc-5 { transform: rotate(24deg);   background: var(--cream); }

.hero-content { position: relative; z-index: 3; max-width: 760px; margin: 0 auto; }
.hero-tag { font-family: var(--font-body); font-weight: 700; font-size: .8rem;
  color: var(--primary-teal); letter-spacing: 3px; margin-bottom: 20px; text-transform: uppercase; }

.logo-block { position: relative; display: inline-block; margin-bottom: 28px; }
.logo-inner { transform: rotate(-3deg); }
.logo-plate {
  position: relative; display: inline-block; background: var(--cream);
  border: 4px solid var(--primary-dark); border-radius: var(--radius-lg);
  padding: 18px 48px; transform: skewX(-6deg);
  box-shadow: var(--shadow-lg, 0 8px 32px rgba(0,0,0,.16));
}
.hero-title { font-family: var(--font-display); font-weight: 800; line-height: 1;
  font-size: clamp(2.8rem, 10vw, 4.5rem); letter-spacing: 2px;
  transform: skewX(6deg); } /* counter-skew to keep text upright */
.t-teal { color: var(--primary-dark); text-shadow: 0 2px 0 rgba(255,255,255,.6); }
.t-gold {
  color: var(--accent-gold); font-size: 1.25em; display: inline-block;
  transform: rotate(5deg);
  text-shadow: 0 1px 0 rgba(0,0,0,.25), 0 2px 0 rgba(0,0,0,.2), 0 4px 8px rgba(0,0,0,.3);
}

.ribbon { position: relative; display: inline-block; margin-top: 14px;
  background: var(--cream); border: 3px solid var(--primary-dark); border-radius: 6px;
  padding: 8px 32px; font-family: var(--font-display); font-weight: 800;
  font-size: .95rem; color: var(--primary-dark); letter-spacing: 3px;
  box-shadow: var(--shadow-md); }
.ribbon::before, .ribbon::after {
  content: ''; position: absolute; top: 8px; width: 26px; height: 100%;
  background: #F5EDD6; /* slightly darker cream */
  border: 3px solid var(--primary-dark); z-index: -1;
}
.ribbon::before { left: -12px; transform: skewX(-18deg); border-right: none; border-radius: 4px 0 0 4px; }
.ribbon::after  { right: -12px; transform: skewX(18deg); border-left: none; border-radius: 0 4px 4px 0; }
```

- [ ] **Step 3: Add button + stat styles**

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  min-height: 44px; padding: 12px 28px; border-radius: var(--radius-round);
  font-family: var(--font-display); font-weight: 800; font-size: .95rem;
  text-decoration: none; letter-spacing: 1px; border: none; cursor: pointer;
  transition: transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s, background .2s;
}
.btn:active { transform: scale(.95); }

.btn-gold {
  position: relative; overflow: hidden;
  background: linear-gradient(180deg, var(--accent-light), var(--accent-gold));
  color: var(--primary-dark); box-shadow: var(--shadow-accent-glow);
}
.btn-gold::before { content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,.55), transparent 55%);
  pointer-events: none; }
.btn-gold:hover { box-shadow: 0 6px 26px rgba(255,210,63,.55); transform: translateY(-2px); }

.btn-ghost { background: var(--surface-card); color: var(--primary-teal);
  border: 2px solid var(--primary-teal); box-shadow: var(--shadow-card); }
.btn-ghost:hover { background: var(--primary-bg); }

.hero-sub { font-size: clamp(.95rem, 3vw, 1.15rem); color: var(--text-muted);
  max-width: 560px; margin: 0 auto 36px; font-weight: 600; }
.hero-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 44px; }

.hero-stats { display: flex; align-items: stretch; justify-content: center; gap: 16px; flex-wrap: wrap; }
.stat {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  background: var(--surface-card); border-radius: var(--radius-lg);
  padding: 16px 26px; box-shadow: var(--shadow-card);
  border-top: 6px solid var(--primary-teal); min-width: 110px;
}
.stat:nth-child(2) { border-top-color: var(--accent-gold); }
.stat:nth-child(3) { border-top-color: var(--coral); }
.stat-icon { font-size: 1.4rem; }
.stat-num { font-family: var(--font-display); font-weight: 800; font-size: 1.6rem;
  color: var(--primary-dark); line-height: 1.2; }
.stat-label { font-size: .75rem; color: var(--text-muted); letter-spacing: 2px;
  text-transform: uppercase; font-weight: 700; }
```

- [ ] **Step 4: Verify**

Reload `http://localhost:8000`. Expect: fan cards peeking behind the skewed cream `MAYONI.CODE` plate (`.CODE` gold, tilted), retro ribbon below reading `KURSUS_KOMPUTER · SD SMP SMA`, two pill CTAs, three white stat cards with colored top bars, whole logo group slightly rotated (-3°). No photo background.

- [ ] **Step 5: Commit**

```bash
git add index.html les.css
git commit -m "style: flip7 hero with fan-card logo and ribbon"
```

---

### Task 3: Section headers, info cards, curriculum

**Files:**
- Modify: `index.html:92-224` (info + kurikulum sections)
- Modify: `les.css` (append section/card/table/badge styles)

**Interfaces:**
- Consumes: tokens from Task 1.
- Produces: reusable classes `section-header`, `.card`, `.card-gold`, `.card-coral`, `.badge` (with `badge-teal`/`badge-coral`/`badge-gold` variants) used by Task 4.

- [ ] **Step 1: Add emoji chips to section headers in `index.html`**

For `#info`, `#kurikulum`, `#harga` (and later `#kontak`), replace the `.section-header` block with this pattern (emoji lives in a `span`, never bare text):

```html
<div class="section-header">
  <span class="section-emoji">💻</span>
  <h2 class="section-title">SYSTEM_INFO</h2>
</div>
```

Emojis: info `💻`, kurikulum `📚`, harga `💰`, kontak `📞`. The `01 /` tags are removed.

- [ ] **Step 2: Style section headers (dashed bottom border)**

```css
.section { position: relative; z-index: 1; padding: 80px 0; }
.section-dark { background: var(--primary-bg); border-top: 1px solid rgba(43,168,162,.15); border-bottom: 1px solid rgba(43,168,162,.15); }
.container { max-width: 960px; margin: 0 auto; padding: 0 20px; }

.section-header { display: flex; align-items: center; gap: 14px; margin-bottom: 40px;
  padding-bottom: 14px; border-bottom: 3px dashed var(--primary-teal); }
.section-emoji { display: flex; align-items: center; justify-content: center;
  width: 52px; height: 52px; border-radius: var(--radius-md);
  background: var(--surface-card); box-shadow: var(--shadow-card); font-size: 1.5rem; flex-shrink: 0; }
.section-title { font-family: var(--font-display); font-weight: 800;
  font-size: clamp(1.4rem, 4vw, 2rem); color: var(--primary-dark); letter-spacing: 1px; }
```

- [ ] **Step 3: Update info section markup — add accent classes**

Change the two `.info-card` elements to carry accent classes (content unchanged):

```html
<div class="info-card card-gold">  <!-- Program Peduli: featured highlight -->
<div class="info-card card-teal">  <!-- Peralatan Belajar -->
```

Keep the icon wrap and headline/paragraph copy exactly as-is (drop the old `.card-line` divs and cyan/purple glow classes).

- [ ] **Step 4: Style info cards (white, radius, left accent bar)**

```css
.card { background: var(--surface-card); border-radius: var(--radius-lg);
  padding: 32px 28px; box-shadow: var(--shadow-card); border-left: 6px solid var(--primary-teal);
  transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s; }
.card:hover { transform: translateY(-4px); }
.card-teal  { border-left-color: var(--primary-teal); }
.card-teal:hover  { box-shadow: 0 8px 28px rgba(43,168,162,.18); }
.card-gold  { border-left-color: var(--accent-gold);
  background: linear-gradient(135deg, #FFFDF2 0%, var(--surface-card) 60%);
  box-shadow: var(--shadow-accent-glow); }
.card-gold:hover  { box-shadow: 0 8px 32px rgba(255,210,63,.5); }
.card-coral { border-left-color: var(--coral); }
.card-coral:hover { box-shadow: 0 8px 28px rgba(239,108,74,.2); }

.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.card-icon-wrap { display: inline-flex; align-items: center; justify-content: center;
  width: 64px; height: 64px; border-radius: var(--radius-md);
  background: var(--primary-bg); font-size: 2rem; margin-bottom: 16px; }
.card-gold .card-icon-wrap { background: #FFF4CC; }
.card h3 { font-family: var(--font-display); font-weight: 800; font-size: 1.25rem;
  color: var(--primary-dark); margin-bottom: 10px; }
.card p { color: var(--text-muted); font-size: .95rem; line-height: 1.7; }
.card strong { color: var(--primary-dark); }
```

- [ ] **Step 5: Restyle curriculum table + badges**

```css
.table-wrap { overflow-x: auto; border-radius: var(--radius-lg);
  border: 1px solid rgba(43,168,162,.2); background: var(--surface-card); box-shadow: var(--shadow-card); }
.cyber-table { width: 100%; border-collapse: collapse; font-size: .95rem; }
.cyber-table th { font-family: var(--font-display); font-weight: 700; font-size: .85rem;
  color: #fff; text-transform: uppercase; letter-spacing: 1px;
  padding: 16px 20px; background: var(--primary-teal); text-align: left; white-space: nowrap; }
.cyber-table td { padding: 18px 20px; color: var(--text-muted);
  border-bottom: 1px solid var(--primary-bg); vertical-align: top; }
.cyber-table td strong { color: var(--primary-dark); }
.cyber-table tbody tr { transition: background .2s; }
.cyber-table tbody tr:hover { background: var(--primary-bg); }
.cyber-table tbody tr:last-child td { border-bottom: none; }

.badge { display: inline-block; padding: 4px 12px; border-radius: var(--radius-round);
  font-family: var(--font-display); font-weight: 700; font-size: .75rem;
  letter-spacing: 1px; margin: 2px 6px 2px 0; }
.badge-teal  { background: var(--primary-bg); color: var(--primary-dark); border: 1px solid var(--primary-teal); }
.badge-coral { background: #FDEDE7; color: var(--coral-dark); border: 1px solid var(--coral); }
.badge-gold  { background: #FFF4CC; color: #8A6D00; border: 1px solid var(--accent-dark); }
```

In `index.html`, swap the badge classes: `badge cyan` → `badge badge-teal`, `badge purple` → `badge badge-coral`.

- [ ] **Step 6: Restyle mobile curriculum cards**

```css
.mobile-curriculum { display: none; }
.curr-card { background: var(--surface-card); border-radius: var(--radius-lg);
  border-left: 6px solid var(--primary-teal); padding: 24px 20px; box-shadow: var(--shadow-card); }
.curr-card:nth-child(2) { border-left-color: var(--accent-gold); }
.curr-card:nth-child(3) { border-left-color: var(--coral); }
.curr-level { font-family: var(--font-display); font-weight: 800; font-size: .8rem;
  letter-spacing: 2px; color: var(--primary-dark); margin-bottom: 12px; }
.curr-card p { color: var(--text-muted); font-size: .9rem; line-height: 1.7; }
.curr-badges { margin-bottom: 12px; }
```

Also remove `cyan-text`/`purple-text` usages in `index.html` (mobile curriculum levels become plain teal; the table badges are handled above).

- [ ] **Step 7: Verify**

Reload. Expect: emoji chips + dashed-border section titles, two info cards with left accent bars (Peralatan teal, Program Peduli gold with glow), curriculum table with teal header and rounded corners, teal/coral pills, mobile cards with per-level accent colors (resize to ≤768px to see them).

- [ ] **Step 8: Commit**

```bash
git add index.html les.css
git commit -m "style: flip7 sections — headers, info cards, curriculum"
```

---

### Task 4: Pricing, discount ribbon, footer

**Files:**
- Modify: `index.html:226-321` (pricing + footer)
- Modify: `les.css` (append pricing/ribbon/footer styles)

**Interfaces:**
- Consumes: `.card`, `.badge`, `.btn` classes and tokens from Tasks 1–3.
- Produces: nothing consumed later (final layout task).

- [ ] **Step 1: Restyle pricing cards markup in `index.html`**

- Keep the 3 `.price-card` blocks and their content.
- Swap classes: `price-cyan` → `price-teal`, `price-purple` → `price-gold`, keep `price-featured` on SMP.
- Badge classes in `.price-badge-top`: `BASIC` → `badge badge-teal`, `PRO` → `badge badge-gold`, `ADVANCED` → `badge badge-coral`.
- DAFTAR buttons: featured → `btn btn-gold`, others → `btn btn-ghost` (replace `btn-price btn-cyan` / `btn-price btn-purple`).
- The `.featured-label` div (POPULER) stays.

- [ ] **Step 2: Style pricing**

```css
.pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px; }

.price-card { position: relative; display: flex; flex-direction: column; align-items: center;
  background: var(--surface-card); border: 1px solid rgba(43,168,162,.18);
  border-radius: var(--radius-lg); padding: 32px 24px; text-align: center;
  border-left: 6px solid var(--primary-teal); box-shadow: var(--shadow-card);
  transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s; }
.price-card:hover { transform: translateY(-4px); }
.price-teal:hover { box-shadow: 0 8px 28px rgba(43,168,162,.18); }

.price-featured { border-left-color: var(--accent-gold);
  background: linear-gradient(180deg, #FFFDF2 0%, var(--surface-card) 55%);
  box-shadow: var(--shadow-accent-glow); }
.price-featured:hover { box-shadow: 0 10px 36px rgba(255,210,63,.5); transform: translateY(-4px); }

.featured-label { position: absolute; top: 18px; right: -8px;
  background: linear-gradient(180deg, var(--accent-light), var(--accent-gold));
  color: var(--primary-dark); font-family: var(--font-display); font-weight: 800;
  font-size: .7rem; letter-spacing: 1px; padding: 4px 14px; border-radius: var(--radius-round);
  box-shadow: var(--shadow-accent-glow); }

.price-top { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 20px; }
.price-lvl { font-family: var(--font-display); font-weight: 800; font-size: 1.8rem;
  color: var(--primary-dark); letter-spacing: 1px; }
.price-amount { font-family: var(--font-body); font-weight: 800; font-size: .9rem; color: var(--text-muted); margin-bottom: 4px; }
.price-amount span { font-family: var(--font-display); font-weight: 800; font-size: 1.7rem;
  color: var(--accent-dark); }
.price-period { font-size: .8rem; color: var(--text-dim); margin-bottom: 24px;
  text-transform: uppercase; letter-spacing: 2px; font-weight: 700; }
.features { list-style: none; margin-bottom: 28px; text-align: left; width: 100%; }
.features li { color: var(--text-muted); font-size: .9rem; padding: 7px 0 7px 18px;
  border-bottom: 1px dashed var(--primary-bg); position: relative; font-weight: 600; }
.features li::before { content: '✔'; position: absolute; left: 0; color: var(--primary-teal); font-weight: 800; }
.price-featured .features li::before { color: var(--accent-dark); }
.price-card .btn { margin-top: auto; }
```

- [ ] **Step 3: Convert discount banner to a coral ribbon**

Replace the `.discount-banner` div in `index.html` with:

```html
<div class="ribbon ribbon-coral">
  <span>⚡ Anak Yatim mendapat <strong>Diskon 50%</strong> → hanya <strong>Rp25.000/bulan</strong></span>
</div>
```

```css
.ribbon-coral { background: var(--cream); border-color: var(--coral-dark); color: var(--coral-dark);
  display: block; padding: 12px 40px; font-weight: 700; font-size: .95rem; letter-spacing: .5px; }
.ribbon-coral::before, .ribbon-coral::after { background: #F7E8DA; border-color: var(--coral-dark); }
.ribbon-coral strong { color: var(--coral-dark); text-decoration: underline; }
```

(Reuse the `.ribbon` base + tail styles from Task 2 — they already exist.)

- [ ] **Step 4: Restyle footer**

```css
.footer { background: var(--cream); border-top: 3px dashed var(--primary-teal);
  text-align: center; padding: 80px 20px 48px; position: relative; overflow: hidden; }
.footer-tag { font-family: var(--font-display); font-weight: 700; font-size: .8rem;
  color: var(--primary-teal); letter-spacing: 3px; margin-bottom: 12px; text-transform: uppercase; }
.footer-title { font-family: var(--font-display); font-weight: 800;
  font-size: clamp(1.8rem, 6vw, 2.6rem); color: var(--primary-dark); letter-spacing: 2px; margin-bottom: 14px; }
.footer-title .cyan-text { color: var(--accent-dark); }
.footer-sub { color: var(--text-muted); font-size: 1rem; margin-bottom: 40px; font-weight: 600; }

.btn-wa { display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  position: relative; overflow: hidden; min-height: 52px; padding: 14px 36px;
  border-radius: var(--radius-round); background: linear-gradient(180deg, #35C26E, var(--success));
  color: #fff; font-family: var(--font-display); font-weight: 800; font-size: 1rem;
  text-decoration: none; letter-spacing: 1px; box-shadow: 0 4px 20px rgba(39,174,96,.4);
  transition: transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s; max-width: 100%; }
.btn-wa::before { content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,.4), transparent 55%); pointer-events: none; }
.btn-wa:hover { box-shadow: 0 6px 28px rgba(39,174,96,.55); transform: translateY(-2px); }
.btn-wa:active { transform: scale(.95); }

.footer-divider { width: 90px; height: 0; border-top: 3px dashed var(--primary-teal);
  margin: 48px auto 24px; }
.footer-address { color: var(--text-muted); font-size: .85rem; margin-bottom: 8px; font-weight: 600; }
.footer-copy { color: var(--text-dim); font-size: .8rem; font-family: var(--font-body); }
```

Also update the footer section header to the emoji-chip pattern (`📞` + `CONNECT WITH US` handled by footer-title, so just add `section-emoji` style consistency if desired — the `#kontak` anchor must remain on the footer).

- [ ] **Step 5: Verify**

Reload. Expect: 3 pricing cards, SMP card gold-featured with POPULER pill and gold glow, gold price numbers, pill DAFTAR buttons; coral folded ribbon with the yatim discount text; footer cream with dashed top border, green WhatsApp pill with gloss and glow.

- [ ] **Step 6: Commit**

```bash
git add index.html les.css
git commit -m "style: flip7 pricing, discount ribbon, footer"
```

---

### Task 5: Responsive, JS cleanup, final pass

**Files:**
- Modify: `les.css` (append responsive media queries)
- Modify: `code.js` (navbar class toggle, remove inline-color hover)
- Modify: `index.html` (remove `purple-text`/`cyan-text` leftovers if any)

**Interfaces:**
- Consumes: all prior tasks' classes.

- [ ] **Step 1: Replace the JS table-hover block in `code.js`**

Delete the `tableRows` forEach block (lines ~4-14 in the current file). CSS `:hover` from Task 3 already handles it.

- [ ] **Step 2: Replace the JS navbar scroll block**

Replace the inline-style assignments with a class toggle:

```js
window.addEventListener("scroll", () => {
  navbar.classList.toggle("navbar-scrolled", window.scrollY > 60);
}, { passive: true });
```

(`navbar-scrolled` styles already exist from Task 1.)

- [ ] **Step 3: Add responsive rules**

```css
@media (max-width: 768px) {
  .hero { padding: 100px 20px 60px; }
  .logo-plate { padding: 14px 32px; border-width: 3px; }
  .hero-title { font-size: clamp(2.2rem, 11vw, 3.2rem); }
  .ribbon { font-size: .8rem; letter-spacing: 2px; padding: 6px 24px; }
  .fan-card { width: 40px; height: 64px; }

  .info-grid { grid-template-columns: 1fr; gap: 16px; }
  .table-wrap { display: none; }
  .mobile-curriculum { display: flex; flex-direction: column; gap: 16px; }
  .pricing-grid { grid-template-columns: 1fr; gap: 16px; }
  .price-featured { order: -1; }
  .hero-stats { gap: 12px; }
  .stat { min-width: 96px; padding: 12px 18px; }
}

@media (max-width: 480px) {
  .hero-actions { flex-direction: column; align-items: center; }
  .btn { width: 100%; max-width: 300px; }
  .section { padding: 60px 0; }
  .section-emoji { width: 44px; height: 44px; font-size: 1.25rem; }
  .section-title { font-size: 1.2rem; }
  .price-card { padding: 28px 18px; }
  .btn-wa { width: 100%; max-width: 340px; font-size: .9rem; }
  .footer { padding: 60px 20px 36px; }
  .hero-fan-cards { transform: translate(-50%, -92%); }
}
```

- [ ] **Step 4: Grep for leftovers**

Run `grep -rn "neon\|scanline\|cyan-glow\|purple-glow\|price-cyan\|price-purple\|btn-price\|badge cyan\|badge purple\|text-dim\|#04040a\|#0b0b14" index.html les.css code.js` — every hit must be resolved (removed or tokenized). Also confirm no remaining `img/cok.webp` references.

- [ ] **Step 5: Final verification pass**

Reload at all three widths (desktop, ≤768px, ≤480px via devtools). Check every section: navbar + scroll state, hero fan-cards/plate/ribbon, emoji chips + dashed borders, info cards accent bars, curriculum table and mobile cards, pricing (featured gold), coral discount ribbon, footer + WhatsApp pill. Check reveal animations still fire. Confirm all anchors (`#kontak`, `#kurikulum`) still work.

- [ ] **Step 6: Commit**

```bash
git add index.html les.css code.js
git commit -m "style: flip7 responsive polish and js cleanup"
```

---

## Self-Review Notes

- **Spec coverage:** tokens (T1), fonts (T1), hero fan-cards/plate/ribbon (T2), pill CTAs + stats (T2), section emoji chips + dashed borders (T3), info cards with accents (T3), curriculum table + mobile cards + badges (T3), pricing featured gold (T4), discount ribbon (T4), footer + WhatsApp pill (T4), animations/reveal + responsive (T5), JS inline-color removal (T5), cok.webp/scanlines removal (T1). All spec items covered.
- **Type consistency:** class names introduced (`.card`, `.card-gold`, `.btn`, `.btn-gold`, `.btn-ghost`, `.badge`, `.ribbon`, `.navbar-scrolled`, `.section-emoji`) are defined once and reused consistently across tasks.
- **Placeholders:** none; every step carries concrete code or an exact verification action.
