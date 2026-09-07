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
│   ├── main.jsx              — forces scrollRestoration:'manual' + scrollTo(0,0) on load (see below)
│   ├── App.jsx               — composes Navbar + all Home sections + Footer, in order
│   ├── index.css             — global reset, :root brand color variables, .container, smooth-scroll
│   ├── assets/
│   │   ├── logo.png          — Synfolix logo; used by Navbar
│   │   └── logo2.png         — same mark, different export; used by the Hero LogoIntro animation
│   ├── utils/
│   │   └── heroScroll.js     — shared scroll-progress math for the Hero intro (see below)
│   └── components/
│       ├── Navbar.jsx / .css        — shared across all pages
│       ├── Footer.jsx / .css        — shared across all pages
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
sitting low in a white full-bleed frame. Scrolling drives a multi-phase, pinned scroll-scene
before the "normal" site (navbar + Hero headline/CTA/visual) appears. This was built iteratively
over several rounds of user feedback (including one reverted attempt), so the current state is
deliberate — read this before touching any of the three files involved.

**Files involved:** `utils/heroScroll.js` (shared timing/constants), `Home/LogoIntro.jsx`/`.css`
(the logo scene), `Home/Hero.jsx`/`.css` (the pin container + the headline/CTA/visual content that
pops in), `Navbar.jsx`/`.css` (the header, which reveals on a delay tied to the same timeline).

**`utils/heroScroll.js`** is the single source of truth all three consumers import from — never
duplicate these numbers/formula locally:
- `HERO_PIN_VH = 300` — total height (in vh) of `.hero__pin-wrapper`. This is **permanently fixed**,
  not dynamically resized (see "Reverted attempt" below).
- `LOGO_REVEAL_END = 0.5` — fraction of the scroll-progress at which the logo finishes rising/fading
  in. Progress keeps advancing from 0.5 to 1.0 while the logo just sits there, fully visible and
  still (the "hold" phase the user asked for, so it doesn't feel rushed).
- `HERO_REVEAL_AT = 1` — the single unified trigger point (full pin exhaustion) at which BOTH the
  Hero content pop-in and the navbar reveal fire. They used to be separate breakpoints
  (`HEADER_DROP_AT`/`CONTENT_WIPE_START`) — consolidated into one shared constant per user request
  ("only when it pops in will the header show up").
- `getHeroPinDistance()` = `(HERO_PIN_VH - 100) / 100 * window.innerHeight` — the actual scrollable
  px distance while `.hero__pin-frame` (sticky, 100vh) stays pinned.
- `getHeroProgress()` = `scrollY / distance`, clamped 0–1.

**`LogoIntro.jsx`** renders inside `Hero`'s pinned frame, behind the reveal panel (z-index 1). Its
own scroll listener (rAF-throttled) computes `reveal = min(getHeroProgress() / LOGO_REVEAL_END, 1)`
and drives the logo's `transform`/`opacity` directly via a ref (not React state — this runs every
scroll frame, so state would be wasteful). Logo starts at `translateY(45vh) scale(0.85)` opacity
`0.25` (genuinely below/faded, not just flex-bottom-aligned — an earlier version only *looked*
stuck at the bottom because it relied on flexbox alignment instead of a real off-frame starting
transform) and animates to `translateY(0) scale(1)` opacity `1`. A "Scroll" cue with a bouncing
chevron fades out over the first 8% of progress. Background is **white** (`#ffffff`) — it was navy,
then near-black charcoal, before landing on white; the logo PNGs have a transparent (not opaque)
background, so a dark backdrop made the logo's own navy cap/wordmark blend into it. The cue's color
was flipped from light-on-dark to `rgba(11, 41, 66, 0.5)` to match the white background. Respects
`prefers-reduced-motion` (skips straight to the fully-revealed static state).

**`Hero.jsx`** structure: `.hero__pin-wrapper` (height: `${HERO_PIN_VH}vh`, fixed forever) contains
`.hero__pin-frame` (`position: sticky; top:0; height:100vh/100svh`, stays glued to the viewport for
the whole scroll run) which contains `<LogoIntro />` and `.hero__reveal` (the actual headline/
subtext/CTAs/product-visual content, z-index 2, on top). `.hero__reveal` starts at
`transform: translateX(-100%)` and has a **fixed-duration CSS transition**
(`transform 0.7s cubic-bezier(0.16,1,0.3,1)`) to `translateX(0)` — this used to be scroll-scrubbed
(sliding in proportionally as you scrolled) but the user asked for a one-time "pop" instead once the
logo phase finishes, not a continuous scrub. A one-way `isRevealed` boolean (React state, flips
once, listener self-removes) drives the `.hero__reveal--visible` class — scrolling back up can
never undo the pop, matching an explicit "not reverse scrollable" requirement. `.hero__nav-spacer`
(72px, permanently rendered inside `.hero__reveal`) reserves space for the fixed navbar so Hero's
own content doesn't sit underneath it once revealed.

**`Navbar.jsx`** switched from `position: sticky` (in-flow, reserves space) to `position: fixed`
(reserves zero space) specifically so it can be fully hidden with no layout gap during the intro.
Starts as `translateY(-100%)` (fully off-screen above, not just faded — the reveal is a "drop down"
motion, explicitly NOT a fade: the user rejected an opacity-fade version). Its own scroll listener
checks the same `getHeroProgress() >= HERO_REVEAL_AT`, and once true, waits **900ms** (`setTimeout`,
cleared on unmount) before flipping `isRevealed` — so the header visibly drops in *after* the Hero
content has already popped, not simultaneously. Transition is `transform 0.35s cubic-bezier(0.34,
1.56, 0.64, 1)` (slight overshoot/bounce, tuned down from an initial 0.6s per "reduce the time it
takes to drop down"). Also one-way, same pattern as Hero's `isRevealed`.

**Reverted attempt — do not reintroduce without discussing tradeoffs first:** at one point,
`Hero.jsx` dynamically shrank `.hero__pin-wrapper` from 300vh down to 100vh the moment `isRevealed`
fired (to make the scrollbar/page length reflect only the real sections instead of permanently
carrying the full animation's scroll distance), compensating `window.scrollTo` by the removed
height so the visual position wouldn't jump. **This caused visible jumping/jankiness** and was
reverted. Root cause: (1) `index.css`'s global `scroll-behavior: smooth` made the compensating
`scrollTo` animate/glide instead of snapping instantly, and (2) the browser's own scroll momentum
(trackpad/wheel inertia) actively fights any attempt to reposition scroll mid-flight — a known hard
problem with dynamically resizing already-scrolled content. **Current accepted tradeoff:** the page
permanently carries the full `HERO_PIN_VH` (300vh) of scrollable height for Hero, even long after
the intro has played — same tradeoff big product sites with scroll-jacked heroes generally accept.
If the "page feels too long" complaint resurfaces: option A is just to tune `HERO_PIN_VH` down
(fixed, not dynamic); option B is bringing in a real scroll-animation library (GSAP ScrollTrigger /
Lenis) built to handle pin+release+resize without this class of bug — not something to reattempt
with raw scroll listeners.

**Scroll restoration:** browsers restore the previous scroll position on reload by default
(`history.scrollRestoration = 'auto'`). That broke the intro — reloading while scrolled down landed
the page already past `HERO_REVEAL_AT`, skipping the animation, which read as "the animation isn't
popping up" to the user. Fixed in `main.jsx`: sets `scrollRestoration = 'manual'` and forces
`window.scrollTo(0, 0)` before the app renders, so **every reload always starts at the top and
plays the full intro** — this is intentional, not an oversight, and matches what the user wants for
a branded landing-page intro.

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
- `position: fixed` (not sticky — see "Hero intro animation" above for why), hidden until the Hero
  intro's `HERO_REVEAL_AT` trigger fires (+900ms delay), then drops down permanently (one-way).
- Left: `<img>` logo (`src/assets/logo.png` — note: NOT `logo2.png`, which is the LogoIntro one —
  currently 50px tall) wrapped in a link to `#home`, replacing the old "Synfolix" text wordmark.
- Center: nav links, centered via `flex:1` + `justify-content:center` on `.navbar__links`.
- **Scroll-spy indicator:** an `IntersectionObserver` (in `Navbar.jsx`) watches all 7 section
  anchors (`rootMargin: '-88px 0px -70% 0px'`) and tracks which one is in the top band of the
  viewport, storing it as `activeHref`. A thin teal underline (`.navbar__indicator`, absolutely
  positioned, `position:relative` on `.navbar__links`) slides beneath the active link in real time
  via `offsetLeft`/`offsetWidth`, CSS-transitioned. Hidden on mobile (≤900px) since links stack
  vertically there. Clicking a link sets `activeHref` immediately (doesn't wait for scroll).
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
- Hero permanently reserves 300vh of scroll height even after the intro finishes playing — a
  deliberate accepted tradeoff, not a bug (see "Reverted attempt" above).
