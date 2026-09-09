# Synfolix Website

Marketing/landing page for Synfolix. **React + Vite, plain JavaScript (no TypeScript).**

## Design principles (apply to all NEW work; not yet retrofitted onto existing sections)

The user gave this as the standing design brief for the site. Confirmed scope: **guide future
work going forward — do not redesign the existing 11 homepage sections to match unless asked.**
Apply it when building new sections/components or when explicitly asked to redesign something.

**Principles:** clean, minimal, premium; strong typography; high-quality UI mockups; good
whitespace; smooth transitions; strong visual hierarchy; responsive; fast.

**Favor:** large typography, product screenshots, interactive cards, subtle animations,
scroll-based storytelling where appropriate, micro-interactions, modern dashboards/mockups,
clean grids.

**Avoid:** overuse of gradients, excessive animations, generic stock photography,
template-looking sections, huge blocks of text, too many colors, cluttered navigation.

**Known tension with current code:** the existing 11 sections (built before this brief) use a
4-color accent palette (indigo/amber/emerald/sky) across ProductShowcase/CaseStudies/TechCapabilities/WhatIsSynfolix,
plus gradient panels in Hero/ProductShowcase/CaseStudies — this conflicts with "too many colors" /
"overuse of gradients." Left as-is per the user's explicit call above. If asked to redesign later,
that's the first thing to fix — consolidate onto `--color-navy`/`--color-teal`/`--color-teal-dark`
(see Brand colors below) and cut back the gradients.

## Stack & setup

- Hand-built project (not scaffolded via `create-vite`/CRA — user explicitly asked for a
  manually-written minimal skeleton, no template boilerplate).
- `npm install` then `npm run dev` to run locally.
- No backend yet. No routing library yet — currently a single page (`App.jsx`) composed of
  section components, navigated via in-page anchor links.

## Folder structure

```
synfolix-website/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx               — plain ReactDOM render, nothing intro-related (see below)
│   ├── App.jsx               — composes Navbar + all Home sections + Footer, in order
│   ├── index.css             — global reset, :root brand color variables, .container, smooth-scroll
│   ├── assets/
│   │   ├── logo.png          — Synfolix logo; used by Navbar
│   │   ├── logo2.png         — same mark, different export; used by the Hero LogoIntro animation
│   │   └── logo3.png         — same mark, light-on-dark export; used by Footer (dark background)
│   ├── utils/
│   │   └── introSequence.js  — shared timer-based intro sequence + reveal signal (see below)
│   ├── hooks/
│   │   ├── useIntroRevealed.js   — subscribes to introSequence's reveal signal
│   │   ├── useRevealOnScroll.js  — synced pop-in reveal used by all Home sections (see below)
│   │   └── useInViewOnce.js      — generic one-time IntersectionObserver reveal; only Footer uses
│   │                               it currently (see "Footer" below)
│   └── components/
│       ├── Navbar.jsx / .css        — shared across all pages
│       ├── Footer.jsx / .css        — shared across all pages (see "Footer" below)
│       ├── hoverButton/
│       │   └── hoverButton.jsx / .css   — InteractiveHoverButton (named export), used for the
│       │                                  navbar CTA; dot-expand/label-swap hover effect
│       ├── specularButton/
│       │   └── specularButton.jsx / .css — SpecularButton (default export), WebGL mouse-following
│       │                                   shine effect via the `ogl` package. Currently UNUSED
│       │                                   (was in the navbar CTA, replaced by hoverButton) — kept
│       │                                   in case it's wanted again. Needs `ogl` in package.json.
│       └── Home/                    — homepage-specific section components
│           ├── Hero.jsx / .css      — see "Hero intro animation" below, not a simple section anymore
│           ├── LogoIntro.jsx / .css — the pinned logo-reveal scene, rendered inside Hero
│           ├── WhatIsSynfolix.jsx / .css
│           ├── ProductShowcase.jsx / .css
│           ├── BuildWithSynfolix.jsx / .css
│           ├── Industries.jsx / .css
│           ├── TechCapabilities.jsx / .css
│           ├── CaseStudies.jsx / .css
│           ├── WhySynfolix.jsx / .css
│           ├── DevelopmentProcess.jsx / .css
│           ├── About.jsx / .css
│           └── Contact.jsx / .css
```

**Convention:** every component gets its own `.jsx` + co-located `.css` file (no CSS-in-JS, no
shared stylesheet per section). Components specific to one page live in a subfolder under
`components/` named after that page (e.g. `components/Home/`); components shared across pages
(`Navbar`, `Footer`) stay at the top level of `components/`. When more pages are added, the plan
is to introduce `react-router-dom` + a `src/pages/` folder that imports and composes section
components — routing is not set up yet.

**Converting borrowed components (Magic UI / shadcn-style snippets):** this project has no
Tailwind, no `@/` path alias, no `cn()` utility, and no icon package. When the user pastes a
`.tsx` snippet from one of these UI kits, convert it: strip TS type annotations, drop the `cn()` +
`@/lib/utils` import (plain template-string `className`), replace Tailwind utility classes with a
co-located plain CSS file that reproduces the same visual/interaction behavior, and don't
introduce an icon library for a single icon — hand-draw it as inline SVG (or omit it, if asked,
as with hoverButton's arrow). `hoverButton.jsx` is the reference example of this conversion.

## Hero intro animation (the most custom/fragile part of this codebase)

When the homepage loads, there's no navbar and no visible Hero copy at first — just a big logo
sitting low in a white full-bleed frame. This used to be a scroll-scrubbed, pinned scroll-scene
(scroll position drove the logo reveal); it was **rewritten to be a self-playing, timer-based
animation instead** — the logo animates in on its own on a fixed schedule, with no scroll-down cue
and no dependency on scroll position at all. Read this before touching any of the four files
involved.

**Files involved:** `utils/introSequence.js` (shared timer/state singleton), `hooks/useIntroRevealed.js`
(the React hook every consumer subscribes through), `Home/LogoIntro.jsx`/`.css` (the logo scene),
`Home/Hero.jsx`/`.css` (the headline/CTA/visual content that pops in), `Navbar.jsx`/`.css` (the
header, which reveals on a small extra delay after the same signal).

**`utils/introSequence.js`** is a plain module-level singleton (not a React hook itself) — the
single source of truth for the whole sequence:
- `LOGO_ANIMATION_MS = 1100` — how long the logo's CSS transition takes to animate in. `LogoIntro.jsx`
  reads this constant and applies it as an inline `transitionDuration` style, so the JS timer and
  the CSS animation can never drift out of sync with each other.
- `HOLD_MS = 700` — extra pause after the logo finishes animating, before the reveal fires.
- `NAVBAR_EXTRA_DELAY_MS = 300` — additional delay Navbar waits after the shared reveal signal
  before it drops down (kept from the old scroll-driven version, where this was tuned down over
  several rounds: 900ms → 500ms → 300ms, the last two steps by the user directly editing the
  file — if asked to "reduce the time" again, this is still the constant to touch).
- `startIntroSequence()` — idempotent (guarded by an internal `started` flag), called once by
  `LogoIntro` on mount. Locks page scroll (`document.body.style.overflow = 'hidden'`) and schedules
  `reveal()` via `setTimeout(LOGO_ANIMATION_MS + HOLD_MS)`. If `prefers-reduced-motion` is set, it
  skips straight to `reveal()` with no scroll lock and no delay.
- `reveal()` — fires once (guarded by an internal `isRevealed` flag), unlocks page scroll, and
  notifies every subscriber via a simple listener `Set`. One-way: once fired, it can never un-fire.
- `getIntroRevealed()` / `subscribeIntroReveal(listener)` — read the current state / subscribe to
  the one-time flip, used by `useIntroRevealed.js`.

**`hooks/useIntroRevealed.js`** is the thin React wrapper: `useState(getIntroRevealed)` seeded from
the module's current value, subscribing via `subscribeIntroReveal` only while still `false` (once
`true`, it unsubscribes — nothing left to listen for since it's one-way). Every component that
needs to react to the intro finishing (`Hero`, `Navbar`, and — via `useRevealOnScroll` — all 10
other Home sections) calls this same hook, so they all flip in the same render pass.

**`LogoIntro.jsx`** no longer has any scroll listener. On mount it calls `startIntroSequence()` and,
one animation frame later, adds a `logo-intro__logo--in` class that triggers the CSS transition
(added on the next frame, not synchronously, so the browser has painted the initial off-state first
and the transition actually plays instead of snapping). Logo starts at `translateY(45vh)
scale(0.85)` opacity `0.25` and animates to `translateY(0) scale(1)` opacity `1` over
`LOGO_ANIMATION_MS`. No scroll-down cue anymore — it was removed along with the scroll dependency.
Background is **white** (`#ffffff`) — the logo PNGs have a transparent background, and a dark
backdrop made the logo's own navy cap/wordmark blend into it (this was true before the scroll→timer
rewrite too, and still holds). Respects `prefers-reduced-motion` (skips the class-add entirely; CSS
also forces the final static state under that media query as a second guard).

**`Hero.jsx`** is now just `<section className="hero">` (`position: relative; height: 100vh/100svh;
overflow: hidden;` — no more pin-wrapper/pin-frame, since nothing is scroll-pinned) containing
`<LogoIntro />` and `.hero__reveal` (the headline/subtext/CTAs/product-visual content, z-index 2,
on top). `.hero__reveal` starts at `transform: translateX(-100%)` and has a fixed-duration CSS
transition (`transform 0.7s cubic-bezier(0.16,1,0.3,1)`) to `translateX(0)`, driven by
`useIntroRevealed()` directly (no extra delay) — the one-time "pop" behavior is unchanged from
before, just re-triggered by the timer signal instead of a scroll-progress threshold.
`.hero__nav-spacer` (72px, inside `.hero__reveal`) still reserves space for the fixed navbar.

**`Navbar.jsx`** is unchanged in spirit: `position: fixed`, starts at `translateY(-100%)` (drop-down
motion, not a fade), and waits `NAVBAR_EXTRA_DELAY_MS` (300ms) after `useIntroRevealed()` flips
true before setting its own `isRevealed` — so the header still visibly drops in just after the
Hero content has popped, not simultaneously. Only the trigger source changed (shared timer signal
instead of its own scroll listener); the delay/transition values themselves are untouched.

**All 10 non-Hero Home sections still pop in on the exact same trigger as Hero and Navbar's
pop-in step — see "Synced section reveal" below.** This behavior (introduced when the intro was
still scroll-driven, so a fast scroller could never catch a section mid-animation) is preserved
under the timer-based rewrite for the same reason: it's now trivially guaranteed, since every
consumer shares the exact same one-time signal instead of independently polling scroll position.

**Scroll lock:** while the intro is playing, `document.body.style.overflow` is set to `'hidden'` by
`startIntroSequence()`, so the page cannot be scrolled at all until the logo animation + hold
finish — the user confirmed this explicitly (as opposed to leaving scroll unlocked and letting the
intro play as an overlay on top of an already-scrollable page).

**Removed as part of the scroll→timer rewrite:** `utils/heroScroll.js` (scroll-progress math),
`.hero__pin-wrapper`/`.hero__pin-frame` (sticky pin container — Hero is a normal 100vh section now,
no longer carrying extra scroll height), the scroll-down chevron cue in `LogoIntro`, and the
`main.jsx` `scrollRestoration = 'manual'` + forced `scrollTo(0,0)` hack (it existed only to defeat
the browser restoring scroll position past the old trigger point on reload — irrelevant now that
nothing depends on scroll position). The "permanently reserves 300vh of scroll height" tradeoff
from the old design no longer applies at all.

## Synced section reveal (`hooks/useRevealOnScroll.js`)

All 10 non-Hero Home sections (WhatIsSynfolix, ProductShowcase, BuildWithSynfolix, Industries,
TechCapabilities, CaseStudies, WhySynfolix, DevelopmentProcess, About, Contact) use this hook and
share `index.css`'s `.reveal-left`/`.reveal-left--visible` utility classes (fade + slide in from
the left, `translateX(-60px) → 0`, same `0.7s cubic-bezier(0.16,1,0.3,1)` curve as Hero's own
`.hero__reveal`, just a smaller travel distance than Hero's full-panel `-100%` — repeating a
full off-screen slide across 10 sections would tip into "excessive animations").

The hook is now a thin wrapper around `useIntroRevealed()` — it does not have its own scroll logic
at all (it never used real `IntersectionObserver`-per-section logic in the timer-based world; that
was already removed back when the intro was still scroll-driven, for a "fast scroller" concern —
see the git history / prior CLAUDE.md revisions if that context is needed again). It still returns
`[ref, isVisible]` purely for a stable call signature across all 10 files — the `ref` isn't attached
to any observer, don't be confused into thinking it drives anything. If asked to make sections
reveal individually again (e.g. real per-section scroll-storytelling), that's a deliberate product
change, not a bug fix — check with the user first.

Footer does NOT use this hook — it wasn't part of the original section list this was applied to,
and it has its own independent, genuinely scroll-into-view-triggered fade-in (see "Footer" below) —
don't confuse the two.

## Footer

Rebuilt from a pasted TSX/Tailwind/Framer-Motion snippet (same conversion approach as
`hoverButton.jsx` — strip TS, drop `cn()`/`@/lib/utils`/the `motion` import, hand-write plain CSS).
Deliberately dropped from the source snippet: the "Social Links" column (no social links yet) and
its placeholder Product/Company/Resources copy — this project's actual 6 link sections (Company,
Products, Solutions, Industries, Resources, Legal) were kept as-is from the original Footer, just
laid out in the new component's grid instead.

**Layout:** a left brand column (`logo3.png` — a light-on-dark export of the mark, since Footer has
always had a dark background, unlike Navbar's `logo.png` or LogoIntro's `logo2.png`) plus a tagline,
next to a responsive grid of the 6 link columns (`repeat(6, 1fr)` down to `repeat(3, 1fr)` at
900px, `repeat(2, 1fr)` at 600px — same breakpoints the old Footer used). Visual details carried
over from the source snippet: rounded top corners, a soft top-center glow line, and a horizontal
divider above the centered copyright bar.

**Fade-in animation ("only happens once"):** this is a genuine one-time reveal-on-scroll-into-view,
NOT tied to the Home intro-sequence signal (Footer was explicitly excluded from that — see "Synced
section reveal" above). Implemented via a new generic hook, `hooks/useInViewOnce.js`
(`IntersectionObserver`, `threshold: 0.15`, disconnects itself after the first intersection — true
"once", unlike the old per-section approach that was rejected for the Home sections). The whole
`<footer>` is the observed ref; the brand column and each of the 6 link columns share the same
`isVisible` flag but get a staggered `transitionDelay` (`0.1 + index * 0.08`s) so they cascade in
rather than popping together — reproducing the source snippet's `AnimatedContainer` stagger
(`delay={0.1 + index * 0.1}`) without Framer Motion. The CSS reveal (`.footer__reveal` /
`.footer__reveal--visible` in `Footer.css`) reproduces the snippet's blur+translateY+opacity
combo (`blur(4px) → 0`, `translateY(-8px) → 0`, `opacity 0 → 1`, `0.8s`) and respects
`prefers-reduced-motion` the same way every other animation in this codebase does.

## Nav-click indicator guard

Clicking a nav link that's far from the current scroll position (e.g. jumping from "Products" to
"Contact") used to make the `.navbar__indicator` underline visibly flicker through every
intermediate section's link while the browser's smooth-scroll animation passed near them (the
`IntersectionObserver`-based scroll-spy was reacting live to transient intersections mid-transit).
Fixed with a "navigating" guard in `Navbar.jsx`: `isNavigatingRef` + `navDebounceRef`. Clicking any
nav link, the brand logo, or a CTA (`beginNavGuard()`) immediately sets `activeHref` to the
destination and sets the guard flag, which makes the `IntersectionObserver` callback skip updating
`activeHref` entirely while true. A separate scroll listener resets a 150ms debounce timer on every
scroll event while the guard is active; once scrolling settles (150ms with no further scroll
event), the flag clears and live scroll-spy resumes normally. This only suppresses updates during
click-triggered navigation — manual scrolling still updates the indicator live throughout.

## Homepage sections (in render order, all in `App.jsx`)

| # | Component | Anchor id | Nav link |
|---|---|---|---|
| 1 | Hero | `#home` | Home |
| 2 | WhatIsSynfolix | — | — |
| 3 | ProductShowcase | `#products` | Products |
| 4 | BuildWithSynfolix | `#solutions` | Solutions |
| 5 | Industries | `#industries` | Industries |
| 6 | TechCapabilities | — | — |
| 7 | CaseStudies | `#our-work` | Our Work |
| 8 | WhySynfolix | — | — |
| 9 | DevelopmentProcess | — | — |
| 10 | About | `#about` | About |
| 11 | Contact | `#contact` | Contact |

Navbar links (`Navbar.jsx`) are `<a href="#id">` anchors, not router routes — clicking scrolls to
the matching section on the same page. `scroll-behavior: smooth` and `scroll-margin-top: 72px`
(to clear the fixed navbar) are set globally in `index.css` via `section[id]`.

### Navbar specifics
- Fixed `height: 72px` (not padding-driven), so its size is stable regardless of child content —
  keep it that way; when asked to resize contents (logo, buttons), adjust the child's own
  height/padding, not the navbar's.
- `position: fixed` (not sticky — see "Hero intro animation" above for why), hidden until the intro
  timer's shared reveal signal fires (+`NAVBAR_EXTRA_DELAY_MS`/300ms delay), then drops down
  permanently (one-way).
- Left: `<img>` logo (`src/assets/logo.png` — note: NOT `logo2.png`, which is the LogoIntro one —
  currently 50px tall) wrapped in a link to `#home`, replacing the old "Synfolix" text wordmark.
- Center: nav links, centered via `flex:1` + `justify-content:center` on `.navbar__links`.
- **Scroll-spy indicator:** an `IntersectionObserver` (in `Navbar.jsx`) watches all 7 section
  anchors (`rootMargin: '-88px 0px -70% 0px'`) and tracks which one is in the top band of the
  viewport, storing it as `activeHref`. A thin teal underline (`.navbar__indicator`, absolutely
  positioned, `position:relative` on `.navbar__links`) slides beneath the active link in real time
  via `offsetLeft`/`offsetWidth`, CSS-transitioned. Hidden on mobile (≤900px) since links stack
  vertically there. Clicking a link sets `activeHref` immediately (doesn't wait for scroll) and
  triggers the "nav-click indicator guard" (see below) so it doesn't flicker through intermediate
  sections while the browser's smooth-scroll passes near them.
- Right: the CTA (`InteractiveHoverButton`, "Build With Synfolix") + hamburger toggle, grouped in
  `.navbar__actions`. CTA `onClick` calls a `scrollToContact()` helper (`scrollIntoView` on
  `#contact`) rather than using `href`, since the button isn't an anchor.
- Responsive CTA duplication: one `InteractiveHoverButton` lives in `.navbar__actions`
  (class `navbar__cta--desktop`, hidden ≤900px) and a second lives inside the `.navbar__links`
  mobile dropdown (class `navbar__cta--mobile`, hidden above 900px, shown full-width in the
  dropdown) — both call the same `scrollToContact`. This is a deliberate duplicate-markup pattern,
  not a bug.
- Colors: nav links/hamburger use `var(--color-navy)` (links at 65% opacity, full + teal on
  hover/active), background is frosted glass (`rgba(255,255,255,0.8)` + `backdrop-filter: blur(12px)`)
  with a soft shadow instead of a flat border — Navbar is the one part of the site already migrated
  to the real brand palette.

### Section content notes
- **Hero** — see "Hero intro animation" above; the headline/subtext/CTAs/visual content itself
  (dark dashboard panel, bar chart, floating `</>`/`API` chips — deliberately no stock photography)
  is unchanged, it just now pops in rather than being immediately visible on load.
- **WhatIsSynfolix** — intro + two cards distinguishing "Our Products" (owned) vs "Custom
  Software" (built for clients).
- **ProductShowcase** — 4 sample products across Healthcare/Legal/CRM/Education, each with a
  colored CSS mockup panel, features list, "View Product" link, "Request Demo" CTA.
- **BuildWithSynfolix** — dark section, 7-step journey (Idea→Strategy→Design→Development→Testing→
  Launch→Scale) with connector lines, capability pills, CTA.
- **Industries** — grid of 8 industries, previews 6 with a "View All Industries" expand toggle.
- **TechCapabilities** — 4 category cards (Development, AI & Automation, Analytics, Integrations)
  framed around business outcomes, not tech-stack/language lists.
- **CaseStudies** — 3 sample case studies (Healthcare/Legal/Retail), each split into a colored
  metrics panel (industry tag + outcome numbers) and a Problem/Approach/Solution/tech-stack panel.
- **WhySynfolix** — 5 value pillars: Product Thinking, Built Around Your Business, Modern
  Technology, End-to-End Development, Built to Scale.
- **DevelopmentProcess** — 6-step lifecycle (Discover→Define→Design→Build→Launch→Scale) as a
  numbered card row with arrow connectors. Visually distinct from BuildWithSynfolix's step
  journey (different labels, light vs. dark styling) — the two are separate sections by design.
- **About** — vision/mission/team cards + stats row + forward-looking closing line. No stock
  imagery — text/data-driven only.
- **Contact** — two-column: controlled lead-gen form (Name, Company, Email, Phone, Industry,
  "What do you want to build?", optional Budget, Timeline, Message) with a "Build With Synfolix"
  submit button and a client-side-only success state (no backend wired — `preventDefault` +
  local state, since there's no API yet); plus a direct-info panel (email, phone, office address,
  social links).

All product names, case studies, stats, and contact details across these sections are
**placeholder content** — swap in real copy before launch.

## Brand colors (extracted from the Synfolix logo)

Defined as CSS variables in `src/index.css` `:root`:

```css
--color-navy: #0b2942;      /* graduation cap + "SYNFOLIX" wordmark */
--color-teal: #0f7c86;      /* pen-nib body, lighter end of its gradient */
--color-teal-dark: #0b5c63; /* pen-nib body, darker end of its gradient */
--color-white: #ffffff;     /* caduceus mark, cap button/tassel */
```

These are visually estimated from the logo image, not pixel-sampled — nudge them with a real
color picker if exact brand hex values matter. **Currently applied to:** Navbar, and the Hero
LogoIntro's cue color. **Not yet applied to:** Footer or any other Home section — those still use
the placeholder indigo/emerald/amber/sky accents chosen before the logo was provided. Per the
design-principles scope decision above, leave this as-is unless the user asks for a redesign pass.

Two logo files exist with different consumers — see "Hero intro animation" above:
`src/assets/logo.png` (Navbar) and `src/assets/logo2.png` (LogoIntro).

## Known gaps / not-yet-done

- No routing — everything is one page. Multi-page nav (dedicated Products/Solutions/Industries/
  Our Work/About pages) will need `react-router-dom` + `src/pages/`.
- Contact form has no backend — submission is local-state only.
- Brand colors applied to Navbar (and the intro cue) only, not yet the rest of the site.
- No real content — all product/case-study/team/stat copy is placeholder.
- `specularButton/` is unused dead code (kept intentionally) — depends on the `ogl` npm package.
