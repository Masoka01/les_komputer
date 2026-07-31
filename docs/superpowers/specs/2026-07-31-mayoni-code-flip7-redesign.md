# Mayoni.Code — Flip7 Design Redesign

**Date**: 2026-07-31
**Status**: Approved (design) + implemented (commits `8ea1d87`..`39527a0`, branch `main`)

## Purpose

Restyle the Mayoni.Code landing page (computer course for SD/SMP/SMA, Mojokerto) from its current cyberpunk-neon-dark theme into the retro-playful Flip7 design language defined in `design.md`. All content and sections are preserved; only visual language changes. This is a full light-mode flip.

## Design Tokens (adapted from design.md rpx → web)

### Colors

| Token | Value | Usage |
|---|---|---|
| `--primary-teal` | `#2BA8A2` | Main UI, accents, stats, avatars |
| `--primary-light` | `#3CC4BD` | Hover states, lighter accents |
| `--primary-dark` | `#1E8C86` | Headline text on light surfaces |
| `--primary-bg` | `#E8F6F5` | Teal tint backgrounds |
| `--accent-gold` | `#FFD23F` | CTAs, highlights, featured card |
| `--accent-light` | `#FFE47A` | Soft gold tints, active states |
| `--accent-dark` | `#E6B800` | Gold hover, depth |
| `--coral` | `#EF6C4A` | Warnings, discount banner, accents |
| `--coral-light` | `#FF8A6A` | Soft coral tints |
| `--coral-dark` | `#D45233` | Coral depth, hover |
| `--cream` | `#FFF8E7` | Wordmark parallelogram, ribbon, input surfaces |
| `--sky` | `#5DADE2` | Info states |
| `--surface-base` | `#EFF8F7` | Page background |
| `--surface-card` | `#FFFFFF` | Card backgrounds |
| `--success` | `#27AE60` | WhatsApp CTA, positive states |
| `--error` | `#E74C3C` | Error states (unused on this page) |
| `--success-light` | `#35C26E` | WhatsApp CTA gradient start (impl.) |
| `--cream-dark` | `#F5EDD6` | Wordmark plate depth, darker cream (impl.) |
| `--navbar-bg` | `rgba(255,255,255,.88)` | Navbar glass background (impl.) |
| `--gold-text-dark` | `#8A6D00` | Gold badge text on tint fills (impl.) |
| `--text-main` | `#22514E` | Body text, deep teal-gray (impl.) |
| `--text-muted` | `#5E7A78` | Secondary text (impl.) |
| `--text-dim` | `#8FA8A6` | Dim/quiet text (impl.) |
| `--tint-cream` | `#FFFDF2` | Soft cream surface fill (impl.) |
| `--tint-gold` | `#FFF4CC` | Soft gold surface fill (impl.) |
| `--tint-coral` | `#FDEDE7` | Soft coral surface fill (impl.) |
| `--tint-cream-coral` | `#F7E8DA` | Ribbon tail fill, warm cream (impl.) |

Implementation note: tokens marked (impl.) were added during implementation
per the human-adjudicated token-purity rule ("Global Constraints govern" —
every hardcoded color/shadow must live in `:root`). All values were fixed
by that ruling; none change the approved design.

### Borders & Overlays (impl.)

| Token | Value | Usage |
|---|---|---|
| `--border-soft` | `rgba(0,0,0,.08)` | Subtle default borders |
| `--border-teal` | `rgba(43,168,162,.2)` | Teal borders (info cards) |
| `--border-teal-soft` | `rgba(43,168,162,.15)` | Softer teal borders (dashed section lines) |
| `--border-teal-mid` | `rgba(43,168,162,.18)` | Price-card borders |
| `--sheen-white` | `rgba(255,255,255,.55)` | Button gloss overlay (`.btn-gold::before`) |
| `--sheen-white-soft` | `rgba(255,255,255,.4)` | Softer gloss (`.btn-wa::before`) |

### Typography

- **Display/Headline**: Baloo 2, weight 800 (extra-bold), generous letter-spacing.
- **Body**: Nunito, weights 400/700.
- Loaded via Google Fonts. Exo 2 / Rajdhani / Share Tech Mono are removed.
- Scale (web): display `clamp(2.5rem, 8vw, 4rem)`, h1 ≈ 2rem, h2 ≈ 1.5rem, body 1rem.

### Spacing / Radius

- Base unit 0.25rem (≈4px). Spacing tokens: xs 0.25rem, sm 0.5rem, md 1rem, lg 1.5rem, xl 2rem.
- Radius: sm 8px, md 16px, lg 24px, xl 32px, round 999px.
- Radius (impl., outside the scale — component-specific): fan-card 10px, ribbon 6px, ribbon tails 4px (`--radius-fan-card`, `--radius-ribbon`, `--radius-ribbon-tail`).

### Shadows (colored glow system)

- `shadow-sm/md/lg`: black at 8/12/16% (non-interactive depth only).
- `shadow-card`: 0 4px 20px teal @10%.
- `shadow-coral-glow`: 0 4px 20px coral @35%.
- `shadow-teal-glow`: 0 4px 20px teal @30%.
- `shadow-accent-glow`: 0 4px 20px gold @40%.
- `shadow-sky-glow`: 0 4px 16px sky @30%.
- Rule: never plain black shadows on interactive elements.
- (impl.) `--shadow-accent-glow-strong`: 0 6px 26px gold @55% (hero CTAs).
- (impl.) `--shadow-success-glow`: 0 4px 20px green @40%; `--shadow-success-glow-strong`: 0 6px 28px green @55% (WhatsApp pill).
- (impl.) soft hover glows: `--teal-glow-soft` 0 8px 28px teal @18%; `--accent-glow-soft` 0 8px 32px gold @50%; `--accent-glow-hover` 0 10px 36px gold @50% (featured card hover); `--coral-glow-soft` 0 8px 28px coral @20%.
- (impl.) text/title shadows: `--shadow-title-teal` (wordmark light stroke), `--shadow-title-gold` (multi-layer gold wordmark stroke); `--navbar-scrolled-shadow` 0 2px 20px teal @15%.

## Page Structure (unchanged content)

Navbar → Hero → Info (2 cards) → Kurikulum (table + mobile cards) → Pricing (3 cards + discount banner) → Footer/Kontak (WhatsApp).

## Hero & Logo (full Flip7 treatment)

1. **Fan cards background**: 5 colored cards (teal, gold, coral, sky, cream) fanned behind the wordmark, rotations -24°/-12°/0°/12°/24°.
2. **Wordmark**: whole group rotated -3deg; cream parallelogram (`skewX(-6deg)`, dark teal border) containing "MAYONI" (teal-dark, extra-bold, light text-shadow) + ".CODE" (gold, extra-bold, rotated ~5deg, multi-layer dark text-shadow stroke) — mirrors the FLIP/7 treatment in design.md.
3. **Ribbon banner**: retro folded ribbon — cream body, dark border, pseudo-element tails behind (z-index -1, top offset for 3D fold), text teal-dark extra-bold, letter-spacing 8px. Text: `KURSUS_KOMPUTER · SD SMP SMA`.

Hero also keeps: tagline, description, 2 pill CTAs (gold gradient primary + teal outline ghost), 3 stats as white rounded cards. Photo `img/cok.webp` is removed (no longer used anywhere; also remove its preload link and scanlines overlay div).

## Components

- **Navbar**: cream/white translucent + blur, dark teal logo text, gold pill CTA `DAFTAR_SEKARANG`.
- **Buttons**: pill (999px), min-height 44px, bounce transition curve. Primary = gold gradient + `::before` gloss + accent glow shadow + `scale(0.95)` on active. Ghost = teal outline pill.
- **Section titles**: emoji chip (in a div container, not text — per design.md rule), extra-bold title, 3rpx dashed bottom border. Emojis: 💻 info, 📚 kurikulum, 💰 pricing, 📞 kontak.
- **Info cards**: white, radius 24px, `shadow-card`, 6px left accent bar. Peralatan = teal accent; Program Peduli = gold (highlighted: gold gradient tint + `shadow-accent-glow`).
- **Curriculum table**: white rounded card (24px), teal header row, teal row hover glow. Badges: teal / coral. Mobile cards: white, rounded, per-level left accent (SD teal, SMP gold, SMA coral).
- **Pricing**: 3 white rounded cards. SMP featured = gold highlight (gold accent bar, gold gradient, `shadow-accent-glow`, POPULER ribbon). SD/SMA = teal accent. Prices in gold. DAFTAR buttons: gold pill (featured), teal outline pill (others).
- **Discount banner**: retro folded ribbon — cream body, dark border, coral accents, tails. Text keeps "Anak Yatim Diskon 50% → Rp25.000/bulan".
- **Footer/Kontak**: cream surface, "CONNECT" teal-dark + "WITH US" gold, WhatsApp button = success green pill + gloss + glow, dashed divider, address + copyright unchanged.

## Animations

- Scroll reveal retained, <500ms, gentle bounce ease-out.
- Hover: glow + translate, active `scale(0.95)`.
- No confetti, crown bounce, or BOOM pulses on this page (not game screens).

## JS changes (code.js)

- Replace inline cyan rgba values in table-row hover and navbar scroll effects with token-based CSS classes so they follow the new palette.
- Reveal observer logic stays as-is.

## Non-goals

- No new sections or content changes.
- No WeChat mini-program conversion; rpx is adapted to web CSS only.
- No dark mode.
- No photo `img/cok.webp` usage.

## Verification

- Open in browser; check desktop, tablet (≤768px), mobile (≤480px) breakpoints.
- Confirm: fan-cards + ribbon hero, pill CTAs, section title dashed borders, left accent bars, featured gold pricing card, ribbon discount banner, WhatsApp pill, navbar scroll behavior, reveal animations.
- No test framework exists; manual visual check.
