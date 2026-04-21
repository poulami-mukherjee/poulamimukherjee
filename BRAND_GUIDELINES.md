# Brand Guidelines — poulamimukherjee.com

**Owner**: Poulami Mukherjee — Software Architect & Technology Consultant  
**Last updated**: April 2026  
**Stack**: Next.js 14+ App Router, TypeScript, Tailwind CSS v4, Framer Motion, GSAP + ScrollTrigger, Lenis  
**Deployed on**: Vercel

These guidelines are written for the engineer implementing the site. Every value is exact — no interpretation required. When in doubt, reference this document over any existing implementation.

---

## Table of Contents

1. [Typography System](#1-typography-system)
2. [Color System](#2-color-system)
3. [Spacing System](#3-spacing-system)
4. [Component Patterns](#4-component-patterns)
5. [Animation Guidelines](#5-animation-guidelines)
6. [Accessibility Standards](#6-accessibility-standards)
7. [Imagery & Iconography](#7-imagery--iconography)
8. [Grid & Layout](#8-grid--layout)
9. [Next.js / Tailwind Implementation Notes](#9-nextjs--tailwind-implementation-notes)
10. [LYCRA Review — Scores & Critical Fixes](#10-lycra-review--scores--critical-fixes)

---

## 1. Typography System

Typography is the single highest-leverage design decision on this site. The current implementation uses Playfair Display + DM Sans but applies them uniformly — every heading gets the serif, every weight looks the same, and there is no meaningful hierarchy. The fix is a three-tier system with explicit rules for when each font appears.

### Why Cormorant Garamond instead of Playfair Display

Playfair Display is widely used for portfolio sites, which makes it feel template-y. Cormorant Garamond has:
- Higher contrast between thick and thin strokes — the drama reads at large sizes on dark backgrounds
- A slightly longer descender that gives it editorial character
- Better rendering at `clamp()` sizes where Playfair can look muddy
- A distinctly bespoke quality at 600–700 weight that Playfair lacks

The switch is one line in `layout.tsx` and one line in `globals.css`. There is no reason not to do it.

---

### Tier 1 — Display / Hero Type

**Applies to**: `<h1>` on the hero section only. Nothing else.

| Property | Value |
|---|---|
| Font | Cormorant Garamond |
| Weight | 600 |
| Size | `clamp(3.5rem, 9vw, 7.5rem)` |
| Line height | `1.02` |
| Letter spacing | `-0.025em` |
| Style | Normal (roman). Never italic at this size. |
| Case | Sentence case. Never all-caps. |
| Color | `--text-primary` (#F0F0F5) |

**Example usage**: "Hi, I'm Poulami." — this is the only heading that gets Tier 1.

**Why these values**: At `clamp(3.5rem, 9vw, 7.5rem)`, negative letter spacing of `-0.025em` compensates for the optical looseness that all fonts exhibit at display sizes. Line height of `1.02` is intentionally tight — editorial publications use this to lock multi-line headlines into a single visual unit.

---

### Tier 2 — Section Headings

**Applies to**: All `<h2>` elements across sections (About, Services, Work, Contact, etc.)

| Property | Value |
|---|---|
| Font | Cormorant Garamond |
| Weight | 500 |
| Size | `clamp(2rem, 4.5vw, 3.5rem)` |
| Line height | `1.12` |
| Letter spacing | `-0.01em` |
| Style | Roman by default; selective italic on emphasis phrase only |
| Color | `--text-primary` (#F0F0F5) |

**Selective italic rule**: Italic on section headings is a typographic device — it creates cadence. The rule is: italic applies to the last phrase or line only, not the whole heading. Roman text sets up the idea; italic lands it.

```
// Correct usage — creates rhythm
"Projects that paid"          ← roman
"for themselves."             ← italic

// Incorrect — the whole heading in italic is visually exhausting and reads as unconfident
"Projects that paid for themselves."  ← do not do this
```

Implement this with a `<span className="italic">` wrapping only the emphasis phrase. Do not apply italic at the `h2` level.

---

### Tier 3 — UI / Card Headings

**Applies to**: `<h3>`, `<h4>`, service titles, case study card headlines, GitHub repo names, any heading inside a card or UI component.

**This is the critical distinction**. Tier 3 is DM Sans, not Cormorant. This single decision is what makes the typography feel premium rather than uniform — the serif handles editorial/brand moments, the sans-serif handles UI/functional moments.

| Property | Value |
|---|---|
| Font | DM Sans |
| Weight | 600 |
| Size | `1.125rem` to `1.5rem` (context-dependent) |
| Line height | `1.3` |
| Letter spacing | `-0.01em` |
| Style | Normal only |
| Color | `--text-primary` (#F0F0F5) |

**Specific sizes**:
- Case study card headline: `1.375rem` (22px)
- Service title: `1.25rem` (20px)
- GitHub repo name: `1.125rem` (18px)
- `<h4>` / sub-label inside card: `1rem` (16px), weight 500

---

### Body Text

| Property | Value |
|---|---|
| Font | DM Sans |
| Weight | 400 |
| Size (primary) | `1rem` (16px) |
| Size (secondary) | `0.9375rem` (15px) |
| Line height | `1.7` |
| Color | `--text-body` (#C8C8D0) |
| Max width | `65ch` per paragraph |

**Why `#C8C8D0` not white**: Pure white (#FFFFFF) on `#0A0A1A` has a contrast ratio of approximately 18:1 — it passes WCAG but causes eye strain on dark backgrounds when reading extended text. `#C8C8D0` reads as white at a glance but sits comfortably for longer reading sessions while still exceeding the 4.5:1 WCAG AA minimum.

The `65ch` max-width on paragraphs is not optional — it is a readability constraint. Prose lines longer than 75 characters measurably increase eye fatigue.

---

### Labels / Eyebrows / Captions

Used above section headings and for metadata.

| Property | Value |
|---|---|
| Font | DM Sans |
| Weight | 500 |
| Size | `0.6875rem` (11px) |
| Letter spacing | `0.12em` |
| Transform | `uppercase` |
| Color | `--accent` (#6C5CE7) |
| Line height | `1.5` |

**Example usage**: "SELECTED WORK" above the case studies section heading.

---

### Monospace — Code Snippets / Tech Stack Tags

| Property | Value |
|---|---|
| Font | JetBrains Mono (or `ui-monospace, monospace` fallback) |
| Weight | 400 |
| Size | `0.8125rem` (13px) |
| Letter spacing | `0` |
| Color | `--text-body` (#C8C8D0) |
| Background | `--bg-raised` (#0E0E20) |
| Padding | `2px 8px` |
| Border radius | `4px` |

Tech stack tags (e.g., "TypeScript", "AWS", "GSAP") use this style inside a `<code>` or `<span>` element.

---

### Next.js Font Import

In `app/layout.tsx`, replace the current `Playfair_Display` import:

```typescript
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});
```

In the `<html>` element, replace `${playfairDisplay.variable}` with `${cormorantGaramond.variable}`.

---

### CSS Utility Classes

Define all of these in `@layer utilities` in `globals.css`. These are the class names used across components — do not use `font-heading`, `font-body`, or any existing naming.

```css
@layer utilities {

  /* Tier 1 — Hero display only */
  .type-display {
    font-family: var(--font-cormorant), "Cormorant Garamond", Georgia, serif;
    font-weight: 600;
    font-size: clamp(3.5rem, 9vw, 7.5rem);
    line-height: 1.02;
    letter-spacing: -0.025em;
    color: var(--text-primary);
  }

  /* Tier 2 — Section headings */
  .type-h2 {
    font-family: var(--font-cormorant), "Cormorant Garamond", Georgia, serif;
    font-weight: 500;
    font-size: clamp(2rem, 4.5vw, 3.5rem);
    line-height: 1.12;
    letter-spacing: -0.01em;
    color: var(--text-primary);
  }

  /* Tier 3 — Card and UI headings (DM Sans, NOT serif) */
  .type-h3 {
    font-family: var(--font-dm), "DM Sans", system-ui, sans-serif;
    font-weight: 600;
    font-size: 1.375rem;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: var(--text-primary);
  }

  /* Eyebrow labels — small caps treatment */
  .type-label {
    font-family: var(--font-dm), "DM Sans", system-ui, sans-serif;
    font-weight: 500;
    font-size: 0.6875rem;
    line-height: 1.5;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
  }

  /* Primary body text */
  .type-body {
    font-family: var(--font-dm), "DM Sans", system-ui, sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.7;
    color: var(--text-body);
  }

  /* Secondary / smaller body text */
  .type-body-sm {
    font-family: var(--font-dm), "DM Sans", system-ui, sans-serif;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--text-body);
  }

  /* Code / tech stack tags */
  .type-mono {
    font-family: "JetBrains Mono", ui-monospace, "Cascadia Code", monospace;
    font-weight: 400;
    font-size: 0.8125rem;
    letter-spacing: 0;
    color: var(--text-body);
  }
}
```

---

### Global Heading Reset

The current `globals.css` sets all `h1–h4` to Playfair. Remove that block entirely. Apply type classes explicitly on each element in JSX instead. A global heading font rule is what causes the uniformity problem.

```css
/* REMOVE this block from globals.css */
h1, h2, h3, h4 {
  font-family: var(--font-playfair), "Playfair Display", Georgia, serif;
}
```

---

## 2. Color System

All colors are CSS custom properties on `:root`. Reference these variables in all components — do not use raw hex values in JSX Tailwind classes (except where listed in the implementation notes).

### Full `:root` Block

```css
:root {

  /* ── Backgrounds ── */
  --bg-void:     #070714;         /* deepest: nav on scroll, modal overlays */
  --bg-base:     #0A0A1A;         /* primary body background */
  --bg-raised:   #0E0E20;         /* card surfaces */
  --bg-elevated: #131325;         /* hover states on cards */
  --bg-overlay:  rgba(7, 7, 20, 0.92); /* nav blur overlay, modal backdrop */

  /* ── Accent / Brand ── */
  --accent:           #6C5CE7;    /* primary interactive: links, active states, CTAs */
  --accent-bright:    #7B6FF0;    /* hover on primary accent */
  --accent-dim:       #4A3FB5;    /* pressed/active states */
  --accent-glow:      rgba(108, 92, 231, 0.15); /* glow on hover, border highlights */
  --accent-secondary: #7C3AED;    /* gradient end, secondary purple */
  --accent-gradient:  linear-gradient(135deg, #6C5CE7 0%, #7C3AED 100%);

  /* ── Text ── */
  --text-primary:  #F0F0F5;       /* main headings — slightly off-white */
  --text-body:     #C8C8D0;       /* body paragraphs */
  --text-muted:    #8A8A9A;       /* labels, captions, secondary info */
  --text-disabled: #4A4A5A;       /* placeholder text, disabled states */
  --text-inverse:  #0A0A1A;       /* text on light/accent backgrounds */

  /* ── Borders ── */
  --border-subtle:        rgba(255, 255, 255, 0.06);   /* card outlines, section dividers */
  --border-default:       rgba(255, 255, 255, 0.10);   /* form fields, explicit borders */
  --border-accent:        rgba(108, 92, 231, 0.30);    /* highlighted card borders */
  --border-accent-strong: rgba(108, 92, 231, 0.55);    /* focus states, active cards */

  /* ── Status ── */
  --status-success: #22C55E;
  --status-error:   #EF4444;
  --status-warning: #F59E0B;
}
```

### Contrast Ratios (Calculated)

Verify these before shipping. Values are approximate — confirm with a contrast checker against the final background.

| Foreground | Background | Ratio | WCAG AA (4.5:1) | Notes |
|---|---|---|---|---|
| `#C8C8D0` (text-body) | `#0A0A1A` (bg-base) | ~9.8:1 | Pass | Body text — well above minimum |
| `#F0F0F5` (text-primary) | `#0A0A1A` (bg-base) | ~17.5:1 | Pass | Headings — no concern |
| `#8A8A9A` (text-muted) | `#0A0A1A` (bg-base) | ~4.6:1 | Borderline pass | Use only for text ≥14px bold or ≥18px regular; verify at runtime |
| `#6C5CE7` (accent) | `#0A0A1A` (bg-base) | ~3.2:1 | Fail for text | Use accent color on large decorative text only, never on body copy; icons and UI elements are exempt |
| `#FFFFFF` | `#6C5CE7` (accent button) | ~4.9:1 | Pass | White text on accent CTA button |

**Action required**: `--text-muted` is borderline. Do not use it for inline body copy or interactive labels under 18px. It is safe for metadata lines, timestamps, and captions that supplement other visible content.

**Action required**: `--accent` fails 4.5:1 for normal text. The eyebrow labels using this color at 11px uppercase are decorative/supplemental — they always appear alongside a large heading and are not the primary content conveyer. This is acceptable, but document it in code comments.

---

## 3. Spacing System

### Scale

Base unit: `4px` (`0.25rem`). All spacing values are multiples of this base.

| Token | px | rem | Tailwind approx. |
|---|---|---|---|
| `--space-1` | 4px | 0.25rem | `p-1` |
| `--space-2` | 8px | 0.5rem | `p-2` |
| `--space-3` | 12px | 0.75rem | `p-3` |
| `--space-4` | 16px | 1rem | `p-4` |
| `--space-5` | 20px | 1.25rem | `p-5` |
| `--space-6` | 24px | 1.5rem | `p-6` |
| `--space-8` | 32px | 2rem | `p-8` |
| `--space-10` | 40px | 2.5rem | `p-10` |
| `--space-12` | 48px | 3rem | `p-12` |
| `--space-16` | 64px | 4rem | `p-16` |
| `--space-20` | 80px | 5rem | `p-20` |
| `--space-24` | 96px | 6rem | `p-24` |
| `--space-32` | 128px | 8rem | `p-32` |
| `--space-40` | 160px | 10rem | `p-40` |

### Layout Rules

| Context | Value |
|---|---|
| Section padding — desktop | `96px` top and bottom |
| Section padding — mobile | `64px` top and bottom |
| Max content width | `1152px` (`72rem`) |
| Side padding (content container) | `24px` (`1.5rem`) |
| Card padding — desktop | `32px` |
| Card padding — mobile | `24px` |
| Card grid gap | `20px` |
| Section divider | `1px solid var(--border-subtle)` |
| Eyebrow-to-heading gap | `12px` |
| Heading-to-body gap | `20px` |
| Paragraph-to-paragraph gap | `16px` |

---

## 4. Component Patterns

### Eyebrow Label Pattern

Every `<h2>` section heading is preceded by an eyebrow label. The structure is:

```
[LABEL TEXT]  ——————————
[H2 heading text]
```

**HTML structure**:
```jsx
<div className="flex items-center gap-3 mb-3">
  <span className="type-label">Selected Work</span>
  <div className="h-px w-10 bg-[--accent] opacity-60" />
</div>
<h2 className="type-h2">
  Projects that paid <span className="italic">for themselves.</span>
</h2>
```

**Rules**:
- Eyebrow text is always uppercase (enforced by `.type-label`)
- The horizontal rule is `40px` wide, `1px` tall, accent color at 60% opacity
- Gap between eyebrow row and `<h2>`: `12px`
- Never skip the eyebrow on a section heading — it provides the scanning affordance that lets visitors quickly understand page structure

---

### Card Pattern

Used for: case study cards, service tiles, GitHub repo cards.

```css
/* Base state */
background:    var(--bg-raised);          /* #0E0E20 */
border:        1px solid var(--border-subtle); /* rgba(255,255,255,0.06) */
border-radius: 16px;
padding:       32px;                      /* 24px on mobile */

/* Hover state */
border-color:  var(--border-accent);      /* rgba(108,92,231,0.30) */
background:    var(--bg-elevated);        /* #131325 */
box-shadow:    0 20px 60px rgba(108, 92, 231, 0.08);
transform:     translateY(-4px);
transition:    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1),
               background   250ms cubic-bezier(0.4, 0, 0.2, 1),
               box-shadow   250ms cubic-bezier(0.4, 0, 0.2, 1),
               transform    250ms cubic-bezier(0.4, 0, 0.2, 1);
```

**Tailwind implementation** (Tailwind v4 with CSS variables):
```jsx
<div className="
  bg-[var(--bg-raised)]
  border border-[var(--border-subtle)]
  rounded-2xl
  p-8 md:p-8 p-6
  transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]
  hover:bg-[var(--bg-elevated)]
  hover:border-[var(--border-accent)]
  hover:shadow-[0_20px_60px_rgba(108,92,231,0.08)]
  hover:-translate-y-1
">
```

**Note on `translateY(-4px)`**: The current convention of `-8px` or more on hover is excessive. `-4px` is enough to communicate interactivity without looking like the card is jumping off the screen.

---

### Button Patterns

#### Primary Button (filled)

```css
background:    var(--accent);       /* #6C5CE7 */
color:         white;
border-radius: 100px;               /* pill shape */
padding:       12px 28px;
font-family:   var(--font-dm);
font-weight:   500;
font-size:     14px;
letter-spacing: 0.01em;
border:        1px solid transparent;

/* Hover */
background:  var(--accent-bright);  /* #7B6FF0 */
transform:   scale(1.02);
transition:  all 150ms cubic-bezier(0.4, 0, 0.2, 1);

/* Active */
background:  var(--accent-dim);     /* #4A3FB5 */
transform:   scale(0.98);
```

#### Secondary Button (outlined)

```css
background:    transparent;
border:        1px solid var(--border-accent);  /* rgba(108,92,231,0.30) */
color:         var(--text-primary);
border-radius: 100px;
padding:       12px 28px;
font-family:   var(--font-dm);
font-weight:   500;
font-size:     14px;

/* Hover */
background:   var(--accent-glow);              /* rgba(108,92,231,0.15) */
border-color: var(--border-accent-strong);     /* rgba(108,92,231,0.55) */
transition:   all 150ms cubic-bezier(0.4, 0, 0.2, 1);
```

#### Ghost Button (text only)

```css
background:    transparent;
border:        none;
color:         var(--text-muted);
padding:       8px 0;
font-family:   var(--font-dm);
font-weight:   400;
font-size:     14px;

/* Hover — text color shift + grow-from-left underline */
color:         var(--text-primary);
/* Use the .link-underline pattern from globals.css for the underline animation */
transition:    color 200ms ease;
```

---

### Navigation

**Initial state** (top of page):
```css
background:    transparent;
backdrop-filter: none;
```

**Scrolled state** (triggered at `scrollY > 80px`):
```css
background:      var(--bg-overlay);          /* rgba(7, 7, 20, 0.92) */
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
/* Add a bottom border */
border-bottom: 1px solid var(--border-subtle);
```

**Show/hide on scroll**:
```css
/* Scroll down → hide */
transform: translateY(-100%);
transition: transform 300ms ease;

/* Scroll up → show */
transform: translateY(0);
```

Use JS to track scroll direction. Threshold: hide after `>100px` scroll down, show on any upward scroll.

**Logo mark**:
```
Text: "PM"
Font: Cormorant Garamond, weight 600, 20px
Color: --text-primary
Letter spacing: 0.02em
```

**Nav links**:
```
Font: DM Sans, weight 400, 13px
Color: --text-muted (default), --text-primary (hover/active)
Letter spacing: 0.01em
Active link: --text-primary + 1px underline in --accent
```

**CTA in nav**: Secondary button style, compact — `padding: 8px 20px` instead of the standard `12px 28px`.

**Mobile nav**: Full-screen overlay (`position: fixed`, `inset: 0`, `background: --bg-void`). Nav links at display size with `clamp(2rem, 8vw, 4rem)`, centered.

---

### Section Decorative Numbers

Optional decorative background element for section headers. Large ordinal number behind the section heading:

```css
font-family:   var(--font-cormorant);
font-weight:   700;
font-size:     120px;
color:         var(--text-primary);
opacity:       0.04;
position:      absolute;
top:           -20px;
left:          -10px;
line-height:   1;
pointer-events: none;
user-select:   none;
```

Values: "01", "02", "03", etc. per section order.

---

## 5. Animation Guidelines

### Core Principles

1. Animate to communicate, not to impress. Every animation should either orient the user, signal state, or guide attention — not perform.
2. Every GSAP animation requires a `prefers-reduced-motion` fallback.
3. On mobile (max-width: 768px), disable all GSAP ScrollTrigger animations. Use CSS transitions only.
4. Never autoplay looping animations unless user-initiated.

### Timing Hierarchy

| Category | Duration | Use case |
|---|---|---|
| Instant | `<100ms` | Checkbox toggles, radio selections, cursor states |
| Quick | `150–200ms` | Button hover states, icon color changes |
| Short | `250–300ms` | Card hovers, nav state changes, tooltip shows |
| Medium | `500–700ms` | Section entrance animations, element reveals |
| Long | `900ms–1.2s` | Hero text reveals only |

Easing function for most transitions: `cubic-bezier(0.4, 0, 0.2, 1)` (Material Design standard — slightly anticipatory, smooth exit).

Custom expo ease (for entrances): `[0.22, 1, 0.36, 1]` as a Framer Motion `ease` array.

---

### Entrance Animations — Framer Motion

Default entrance for all non-hero content elements:

```typescript
// variants.ts — define once, reuse everywhere
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};
```

Usage pattern:
```tsx
// Wrap sections in this — trigger once when 80px from viewport
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
>
  <motion.h2 variants={fadeUp} className="type-h2">...</motion.h2>
  <motion.p  variants={fadeUp} className="type-body">...</motion.p>
</motion.div>
```

---

### Hero Reveal — GSAP Clip-Path

Each line of the hero headline reveals upward using clip-path. Wrap each line in a `.overflow-hidden` container:

```typescript
// In useEffect or useGSAP, after page load
gsap.from(".hero-line", {
  clipPath: "inset(100% 0 0 0)",
  duration: 0.9,
  ease: "power3.out",
  stagger: 0.12,
  delay: 0.3,
});
```

HTML structure:
```jsx
<h1 className="type-display">
  <div className="overflow-hidden">
    <span className="hero-line block">Hi, I'm Poulami.</span>
  </div>
  {/* If the headline wraps to multiple lines, give each line its own overflow-hidden wrapper */}
</h1>
```

**Reduced motion fallback**:
```typescript
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {
  gsap.from(".hero-line", { /* clip-path animation */ });
} else {
  // Elements already visible — no animation needed
}
```

---

### Counter Animations — GSAP

For stat counters (e.g., "8+ years", "50+ clients"):

```typescript
gsap.to(counterElement, {
  innerText: targetValue,
  duration: 2,
  ease: "power2.out",
  snap: { innerText: 1 },          // snap to integers
  scrollTrigger: {
    trigger: counterElement,
    start: "top 60%",              // triggers when 60% visible
    once: true,
  },
  onUpdate: function () {
    // Append suffix immediately when counter ends
  },
  onComplete: function () {
    counterElement.innerText = `${targetValue}${suffix}`;
  },
});
```

Always render the final value in the DOM for users with JS disabled or reduced motion. The animation is an enhancement, not the content.

---

### Horizontal Scroll — GSAP Case Studies

```typescript
const cards = gsap.utils.toArray(".case-study-card");

gsap.to(cards, {
  xPercent: -100 * (cards.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".case-studies-container",
    pin: true,
    scrub: 1.2,
    end: () => `+=${cards.length * 600}`,    // adjust multiplier to card width
  },
});
```

**Progress indicator**: A `1px` line at the top of the section that fills from left to right as the user scrolls through cards. Use `ScrollTrigger.create` with `onUpdate` to set `scaleX` on the indicator element.

**Keyboard accessibility**: The horizontal scroll section must also be navigable via arrow keys. Add `tabIndex={0}` and an `onKeyDown` handler to each card.

---

### Hover Micro-interactions

| Element | Transform | Duration | Easing |
|---|---|---|---|
| Cards | `translateY(-4px)` | 250ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Primary buttons | `scale(1.02)` | 150ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Ghost links | underline grows from left | 300ms | `ease` |
| Icons | `scale(1.1)` + color to `--accent` | 150ms | `ease` |
| Nav links | color to `--text-primary` | 200ms | `ease` |

---

## 6. Accessibility Standards

Minimum: WCAG 2.2 AA throughout. Target AAA on body text (already achieved at the contrast ratios above).

### Contrast — Action Items

| Issue | Fix |
|---|---|
| `--text-muted` (#8A8A9A) at small sizes | Only use for text ≥18px regular or ≥14px bold; never use for interactive labels at 11px |
| `--accent` (#6C5CE7) as text color | Only use for eyebrow labels (decorative/supplemental), never for body copy or linked text in prose |
| White text on `--accent` button | Confirmed pass (~4.9:1) — no action needed |

### Focus Management

All interactive elements must have a visible focus ring. The global rule is already in `globals.css`:

```css
*:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
```

Do not override or suppress `focus-visible` on any element. If a custom component visually handles focus (e.g., a card that changes border on focus), still keep the outline — do not rely on border changes alone.

**Skip-to-content link**: Add as the first child of `<body>`:
```jsx
<a
  href="#main-content"
  className="
    sr-only focus:not-sr-only
    fixed top-4 left-4 z-[100000]
    px-4 py-2 rounded-lg
    bg-[var(--accent)] text-white
    type-body font-medium
  "
>
  Skip to content
</a>
```

### Semantic HTML Requirements

| Element | Requirement |
|---|---|
| `<nav>` | `aria-label="Site navigation"` |
| `<main>` | `id="main-content"` (for skip link), wraps all page sections |
| `<section>` | Each section has either `aria-label="..."` or `aria-labelledby="[heading-id]"` |
| Counter animations | Static value rendered in DOM; animation overlays it visually |
| Horizontal scroll | Each card is focusable via `tabIndex={0}`; arrow key handler |
| Custom cursor | Must not be the only interactive affordance; all interactions work without it |
| Images | No decorative SVG patterns need alt text; meaningful icons need `aria-label` |

### Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

This rule is already in `globals.css`. Additionally, in GSAP code, check `window.matchMedia("(prefers-reduced-motion: reduce)").matches` before registering any ScrollTrigger or timeline. For Framer Motion, wrap motion components:

```typescript
const shouldReduceMotion = useReducedMotion(); // Framer Motion hook
const variants = shouldReduceMotion ? { hidden: {}, visible: {} } : fadeUp;
```

---

## 7. Imagery & Iconography

### Photography

No stock photography. The site currently has none — keep it that way.

Profile photo, if used: high-contrast, dark background, natural — not a corporate headshot with artificial blur.

### Icons

SVG only. No icon fonts (they fail accessibility audits and render inconsistently across OS).

**Library**: Lucide React (preferred — tree-shakeable, consistent stroke width, well-maintained) or Heroicons.

**Size system**:
| Context | Size |
|---|---|
| Inline with text | 16px × 16px |
| UI controls (buttons, inputs) | 20px × 20px |
| Section features | 24px × 24px |
| Feature callouts / large | 32px × 32px |

**Color rule**: Icons use a single `currentColor` fill or stroke. No gradients on icons. Opacity can vary:
- Active/primary icons: `opacity-100`
- Secondary/decorative icons: `opacity-60`
- Muted/disabled: `opacity-30`

**Tech stack icon exception**: When showing technology logos (AWS, TypeScript, etc.), use their official SVGs but apply them at consistent sizes with `opacity-70` to prevent visual dominance.

### Case Study Visuals

Do not use screenshots of client work (NDA risk). Use abstract geometric SVG compositions instead:

```jsx
// Example pattern — geometric composition in accent color
<svg viewBox="0 0 520 320" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="60" y="40" width="240" height="160" rx="8"
    stroke="#6C5CE7" strokeWidth="1" opacity="0.3" />
  <rect x="100" y="80" width="120" height="80" rx="4"
    fill="#6C5CE7" opacity="0.08" />
  <circle cx="380" cy="160" r="80"
    stroke="#7C3AED" strokeWidth="1" opacity="0.2" />
  {/* etc. */}
</svg>
```

The pattern should hint at the domain of the case study — dashboards for analytics projects, network nodes for infrastructure work, document flows for process automation.

---

## 8. Grid & Layout

### Breakpoints

| Breakpoint | Width | Behavior |
|---|---|---|
| Mobile | `<768px` | Single column, 16px gutters |
| Tablet | `768px–1023px` | 2-column where appropriate |
| Desktop | `≥1024px` | Full layout, 3-column cards, horizontal scroll |

### Content Container

```css
.container {
  max-width: 1152px;   /* 72rem */
  margin: 0 auto;
  padding: 0 24px;     /* 1.5rem */
}

@media (min-width: 768px) {
  .container {
    padding: 0 32px;
  }
}
```

### Section-by-Section Layout

**Hero**
- Height: `100svh` (use `svh`, not `vh` — avoids mobile browser chrome jump)
- Content: left-aligned, vertically centered
- Decorative element (gradient orb): right/center, positioned absolute
- Orb: `400px` at desktop, `200px` at mobile

**About / Timeline**
- Single column
- Left-edge timeline: `2px` line, color `--border-accent`, `position: absolute`, `left: 0`
- Timeline content: `padding-left: 40px`
- Each timeline entry: `padding-bottom: 48px`

**Case Studies — Desktop**
- Horizontal scroll container: full viewport width
- Each card: `520px` wide × auto height (not full height — causes layout issues on short viewports)
- Cards don't wrap; pinned section scrolls horizontally
- Mobile fallback: vertical stack, normal scroll

**Services**
- Full-width list with accordion expand
- Each item: title (DM Sans 600, 18px) + brief description (DM Sans 400, 15px) visible
- Expanded: detailed description + tech stack tags + CTA link

**GitHub / Open Source**
- 3-column responsive grid: 3 cols desktop, 2 cols tablet, 1 col mobile
- Grid gap: `20px`
- Card height: auto (let content determine height, do not fix)

**Contact**
- Desktop: 2-column — info left (40%), form right (60%)
- Mobile: stacked, form below info
- Form fields: full width, `--bg-raised` background, `--border-default` border, focus ring to `--border-accent-strong`

---

## 9. Next.js / Tailwind Implementation Notes

These are the exact file changes needed to align the codebase with these guidelines.

### `app/globals.css` — Full Replacement

1. **Remove `@theme inline`**. The `inline` keyword in Tailwind v4 causes CSS custom property resolution to happen at build time, which breaks dynamic values. Use `@theme` without `inline` for font registration only.

2. **Remove the global heading rule** (`h1, h2, h3, h4 { font-family: ... }`). This is the root cause of uniform typography.

3. **Replace all color variable names** with the semantic names defined in Section 2.

4. **Add all `@layer utilities`** type classes from Section 1.

The new `:root` block replaces the current one entirely. The `@theme` block (if needed at all for Tailwind color utilities) should only register font variables:

```css
@theme {
  --font-display: var(--font-cormorant);
  --font-body:    var(--font-dm);
}
```

Color utilities are better accessed via `bg-[var(--bg-base)]` syntax in Tailwind v4 rather than through `@theme`, which avoids the resolution issue.

### `app/layout.tsx` — Changes Needed

1. Replace `Playfair_Display` import with `Cormorant_Garamond`:
   ```typescript
   import { Cormorant_Garamond, DM_Sans } from "next/font/google";
   ```

2. Replace the font instantiation (see Section 1 for exact code).

3. Update `<html>` className: replace `${playfairDisplay.variable}` with `${cormorantGaramond.variable}`.

4. Update `<body>` className: replace `bg-[#0A0A1A]` with `bg-[var(--bg-base)]` and `text-[#F5F5F7]` with `text-[var(--text-primary)]`.

### Component-Level Typography — What to Change Where

| Component type | Current (wrong) | Correct |
|---|---|---|
| Service card `<h3>` | `font-heading` (Playfair 700) | `type-h3` (DM Sans 600) |
| Case study card `<h3>` | `font-heading` | `type-h3` |
| GitHub repo name | `font-heading` | `type-h3` |
| Navigation links | inline styles or body font | DM Sans 400, 13px, `--text-muted` |
| Section `<h2>` | `font-heading` | `type-h2` with selective italic |
| Hero `<h1>` | `font-heading` | `type-display` |
| Eyebrow labels | none / ad hoc | `type-label` |
| Body paragraphs | `font-body` or default | `type-body` with `max-w-[65ch]` |

### Critical Rule to Enforce in Code Review

**Only `type-display` and `type-h2` use Cormorant Garamond. Everything else — cards, nav, buttons, labels, body — uses DM Sans.** Any PR that applies a serif font to a card heading, nav link, or UI element should be flagged as a typography regression.

---

## 10. LYCRA Review — Scores & Critical Fixes

LYCRA is a design audit framework evaluating: Legibility, Yield (conversion), Craft, Rhythm, Accessibility. The following is an honest assessment of the current implementation.

### Executive Summary

The site has a strong foundation — the color palette is cohesive, the grain texture and dark mode are correctly implemented, and the animation infrastructure (GSAP + Framer Motion) is in place. The primary failure is typography: the uniform use of Playfair Display across all heading levels collapses the visual hierarchy that should be doing the work of guiding a visitor from "who is this?" to "I want to hire her." The second failure is conversion architecture — the site reads as a portfolio showcase rather than a consulting business. Both are fixable without a redesign.

---

### Scorecard

| Dimension | Score | Verdict |
|---|---|---|
| **Legibility** | 4/10 | Typography hierarchy is broken — same font, similar weights across all heading levels. Body text and heading weights blend together on dark background. |
| **Yield (Conversion)** | 5/10 | CTAs exist but are not placed at decision points. The service section needs social proof adjacent to offers. No visible urgency or specificity about what engagement looks like. |
| **Craft** | 6/10 | Color palette and dark mode are well-executed. Grain texture correct. Custom cursor is a nice touch. Animations are in place but not fully tuned. Card hover states slightly aggressive on transform distance. |
| **Rhythm** | 4/10 | Spacing is inconsistent between sections. Section entrances do not feel coordinated. No consistent vertical rhythm established by the type scale. |
| **Accessibility** | 5/10 | Focus styles are defined. Contrast on body text passes. However: semantic HTML incomplete (sections missing `aria-label`), skip link absent, counter animations have no static fallback, reduced motion query is CSS-only with no JS hook for GSAP. |
| **Performance** | 6/10 | Playfair Display at 6 weights + italic is a heavy font load. GSAP and Framer Motion both bundled — need to confirm tree-shaking. Grain SVG in CSS is repeated as a fixed element which is fine, but verify compositing layer isn't thrashing. |
| **Brand Clarity** | 5/10 | Voice is correct — confident, direct, no buzzwords. But the visual identity reads as "developer portfolio" not "technology consultant who commands senior rates." The typography fix closes most of this gap. |
| **Mobile Experience** | 5/10 | Horizontal scroll case studies need a verified mobile fallback. Touch targets need audit (nav links at 13px may be under 44px tap target). GSAP ScrollTrigger on mobile needs to be disabled. |

---

### Top 5 Critical Fixes

#### Fix 1 — Replace Playfair Display with Cormorant Garamond and implement the three-tier system

**Why it matters**: The current uniform serif creates visual sameness that forces visitors to read every element to understand its importance. Visual hierarchy should communicate structure before reading begins. The fix makes the hierarchy work by touch: serif for brand moments, sans for UI moments.

**Implementation**: See Section 1 entirely. Estimated time: 3–4 hours to update all components.

**What it unlocks**: Once Tier 3 headings (cards, nav) become DM Sans, the eye naturally distinguishes "brand voice" (Cormorant) from "this is a UI control" (DM Sans). The site will read as more intentional and premium without changing a single word.

---

#### Fix 2 — Remove the global `h1, h2, h3, h4` font rule

**Why it matters**: This single CSS rule is the architectural cause of every typography problem on the site. It overrides any attempt at heading-level differentiation and forces all headings into the same visual register.

**Implementation**:
```css
/* DELETE from globals.css */
h1, h2, h3, h4 {
  font-family: var(--font-playfair), "Playfair Display", Georgia, serif;
}
```

Then apply type utility classes explicitly in every component. This is tedious but is the correct approach — implicit global rules that can be overridden are a maintenance liability.

---

#### Fix 3 — Add `aria-label` to all `<section>` elements and a skip link

**Why it matters**: Screen reader users navigate by landmark regions. Without labeled sections, the site is a single undifferentiated block of content. This is a WCAG 2.2 AA failure, and it also affects SEO (search engines use landmark structure for content parsing).

**Implementation**: For each `<section>`, add `aria-labelledby` pointing to the section's heading ID:
```jsx
<section aria-labelledby="services-heading">
  <h2 id="services-heading" className="type-h2">...</h2>
</section>
```

Add the skip link as the first element in `<body>` (see Section 6).

---

#### Fix 4 — Add a GSAP reduced motion check in JavaScript

**Why it matters**: The CSS `prefers-reduced-motion` rule in `globals.css` handles CSS transitions and Framer Motion. It does not stop GSAP animations, which are driven entirely by JavaScript. Users with vestibular disorders who have set this system preference will still see the clip-path reveals, counter animations, and horizontal scroll trigger — all of which involve motion that can cause physical discomfort.

**Implementation**: In any file that initializes GSAP timelines or ScrollTrigger:
```typescript
const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  // All GSAP animation code goes inside here
  gsap.from(".hero-line", { /* ... */ });

  ScrollTrigger.create({ /* ... */ });
});

// For reduced motion users: no GSAP code runs at all
// Elements must be in their final visible state by default
```

---

#### Fix 5 — Separate brand voice from portfolio framing in the Services and Hero sections

**Why it matters**: The site currently reads as "look at what I've built" (portfolio) rather than "here is what I can do for your business" (consulting). Consulting clients — startup founders and SMB owners especially — are making a hiring decision, not browsing work samples. The content framing needs to shift the subject of every sentence from "I built X" to "you get X."

**This is a copy and content architecture change, not purely visual.** The design system supports it, but the words need updating. Flag this for the site owner's review:
- Hero subheading: lead with client outcome, not technology credentials
- Service descriptions: start with the problem, then the solution, then the deliverable
- Case studies: lead with the business result before the technical approach
- Ensure at least one testimonial or social proof element is adjacent to the CTA

---

### Top 5 Quick Wins

1. **Add `max-w-[65ch]` to all body text paragraphs.** Takes 30 minutes. Makes prose measurably more readable with no design change.

2. **Reduce card hover `translateY` from current value to `-4px`.** Takes 10 minutes. Current value likely `-8px` or more — reduces the "cards jumping" feeling.

3. **Add `transition-colors` to all nav links with `duration-200`.** Currently nav links likely have no explicit transition. Takes 15 minutes.

4. **Replace `font-heading` class names with `type-h2`, `type-h3`, etc.** Even before the Cormorant swap, this naming cleanup makes intent clear in the codebase and prevents future regressions.

5. **Set `--text-primary` on headings to `#F0F0F5` instead of current `#F5F5F7`.** A subtle shift that reduces harshness on the dark background. Takes 2 minutes.

---

### Audience-Specific Gaps

**Startup founders (primary audience)**
- Want: evidence of scrappy speed AND quality standards, not just enterprise pedigree
- Gap: Amazon background is prominent, but no signal that small-team collaboration is comfortable
- Fix: Add a case study or timeline entry showing a 0-to-launch delivery context

**SMB owners (secondary audience)**
- Want: plain language about what they get, cost framing, and risk reduction
- Gap: Technical terminology in service descriptions may be opaque
- Fix: Service descriptions need a "what this means for you" sentence after every technical item

**Hiring managers (tertiary audience)**
- Want: GitHub activity, specific technologies, and architecture decisions
- Gap: GitHub section exists but needs more context on the "why" of architectural choices
- Fix: Each pinned repo should have a one-line rationale ("chose X over Y because...")

---

### Accessibility Audit

| Item | Status | Action |
|---|---|---|
| Focus ring: all interactive elements | Defined in CSS | Verify no component overrides it |
| Skip-to-content link | Missing | Add per Section 6 |
| `<nav>` aria-label | Needs verification | Add `aria-label="Site navigation"` |
| `<section>` aria-labels | Missing | Add `aria-labelledby` to all sections |
| Counter animations — static fallback | Unknown | Verify final values are in DOM before JS runs |
| Horizontal scroll — keyboard nav | Unknown | Add `tabIndex` and arrow key handler |
| Custom cursor — alternative affordance | Needs verification | All hover states must also respond to `:focus-visible` |
| Reduced motion — CSS | Implemented | Keep as-is |
| Reduced motion — GSAP JS | Missing | Add `gsap.matchMedia()` guard (see Fix 4) |
| Contrast: body text | Pass (~9.8:1) | No action |
| Contrast: muted text at small sizes | Borderline | Restrict usage (see Section 2) |
| Contrast: accent as text color | Fail for <18px | Restrict to decorative/large only |
| Mobile touch targets | Unknown | Audit all interactive elements for 44×44px minimum |

---

### Animation & Performance Audit

| Item | Status | Recommendation |
|---|---|---|
| Font load: Playfair Display 6 weights | Heavy (~120KB) | Switch to Cormorant 4 weights; add `display: swap` (already set) |
| Font load: DM Sans 4 weights | Acceptable (~60KB) | No change |
| GSAP bundle size | ~90KB | Import only used modules: `gsap/ScrollTrigger`, `gsap/CustomEase` |
| Framer Motion bundle | ~50KB | Use `LazyMotion` with `domAnimation` feature set for smaller bundle |
| Grain SVG: fixed position | Acceptable | Verify `pointer-events: none` and `z-index: 9999` are not causing paint issues |
| Custom cursor: `transform` on mousemove | Acceptable | Ensure `will-change: transform` is set on `.cursor-dot` and `.cursor-ring` |
| GSAP on mobile | Risk | Disable all ScrollTrigger in media query match — see Fix 4 pattern |
| `scroll-behavior: auto` on html | Correct | Keep — Lenis handles smooth scroll; native CSS smooth scroll would conflict |

---

### Strategic Recommendations

These are suggestions for the site owner's consideration — they require human judgment about business positioning.

1. **Add a "How I work" section** between Services and Case Studies. Consulting clients hire people, not skill lists. A 3-step process ("Discovery → Proposal → Execution") with specific deliverables at each stage reduces buying friction significantly.

2. **Put a rate signal somewhere.** Not a full price list, but something like "Projects typically start at £X" or "Available for retainer or project engagements." Hidden pricing is a conversion killer for consulting sites — it filters out the wrong leads but also makes qualified leads hesitant to reach out.

3. **The contact form CTA should be specific**, not generic. "Send me a message" is low-commitment. "Tell me about your project" or "Book a 30-minute call" sets a concrete next step and frames the inquiry as a business conversation, not a cold email.

4. **Consider a content strategy investment**: one or two long-form technical articles linked from the site establishes subject matter authority in a way that a case study list cannot. Even one 1,500-word article on a decision made in a real project (with company details removed) demonstrates how you think, which is what senior consulting clients are actually buying.

5. **Social proof is currently absent.** Even one short quote from a client or colleague, placed adjacent to the contact CTA, meaningfully increases conversion. If client testimonials are not available, a LinkedIn recommendation excerpt with attribution is sufficient.

---

*End of Brand Guidelines*
