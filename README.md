# Faruk Abubakar Sadiq — Interactive Developer Portfolio

A highly interactive, visually impressive developer portfolio built with **SvelteKit 2** and **TailwindCSS v4**. Designed to feel like an engineered experience — not just a static page.

Live: Deploy via Vercel / Netlify / Cloudflare Pages

---

## Setup Instructions

```bash
# Clone and install
pnpm install

# Run dev server
PORT=3000 pnpm run dev

# Build for production
pnpm run build

# Preview production build
PORT=3000 pnpm run serve
```

**Requirements:** Node.js 18+, pnpm 8+

---

## Architecture

```
src/
  routes/
    +layout.svelte       # Root layout — Nav + Footer
    +layout.ts           # SSG: prerender=true, ssr=false
    +page.svelte         # Composes all section components
  lib/
    components/
      Nav.svelte          # Sticky nav with scroll-aware active state
      Hero.svelte         # Particle canvas + animated intro
      About.svelte        # Bio, experience timeline, education
      Skills.svelte       # Tabbed skill bars + tech cloud
      Projects.svelte     # Filterable grid + expandable modal
      Terminal.svelte     # Interactive CLI (creative feature)
      Contact.svelte      # Contact form + info cards
      Footer.svelte       # Social links + branding
    data/
      portfolio.ts        # All portfolio data in one place
    stores/
      theme.ts            # Svelte store for dark/light mode
static/
  favicon.svg
```

**Key architectural decisions:**
- **Presentation-first SPA**: `ssr=false` + `prerender=true` for static export with full client-side interactivity
- **Data-driven**: All portfolio content lives in `src/lib/data/portfolio.ts` — easy to update without touching components
- **Reactive stores**: Theme preference persisted in `localStorage` via a custom Svelte store
- **Component composition**: Each section is a self-contained component with its own animations and intersection observer
- **Svelte 5 runes**: Uses `$state`, `$derived`, `$props` from Svelte 5's new runes API

---

## Animation Decisions

| Feature | Implementation | Rationale |
|---|---|---|
| Particle background | Canvas 2D API + `requestAnimationFrame` | Zero dependency, cursor-reactive, smooth 60fps |
| Hero entrance | CSS keyframe `heroReveal` with staggered delays | Pure CSS = no jank, respects `prefers-reduced-motion` |
| Section reveals | `IntersectionObserver` + CSS transitions | Lazy — only triggers on scroll, no scroll event listener overhead |
| Skill bars | CSS `transition: width` triggered after `visible=true` | Smooth and battery-friendly |
| Title cycling | Svelte `{#key}` block + CSS `slideInUp` animation | Forces re-mount on key change, clean transition |
| Project cards | CSS `animation: cardIn` with staggered `animation-delay` | GPU-composited transform, no layout thrash |
| Modal entrance | `scale(0.95) → scale(1)` + `translateY` | Feels premium, consistent with iOS/macOS conventions |
| Theme switch | CSS variable swap + `document.classList.toggle` | Instant — no rerender, hardware-accelerated |

---

## Performance Optimization Techniques

- **Static pre-rendering** (`prerender=true`) — zero server round-trips for initial load
- **`ssr=false`** — avoids hydration overhead for a portfolio with no server state
- **Canvas particles**: capped at 80 nodes, velocity dampening (`vx *= 0.98`) prevents runaway CPU usage
- **IntersectionObserver** for scroll animations — no `scroll` event listeners, no layout thrashing
- **CSS variables for theming** — theme switch is purely CSS-driven, zero JS rerender cost
- **Component-level styles** (`<style>` scoped in each `.svelte` file) — Vite/SvelteKit tree-shakes unused styles
- **`prefers-reduced-motion`** media query in `app.css` disables all animations for users who need it
- **TailwindCSS v4** with `@tailwindcss/vite` — atomic utility classes, no runtime overhead, treeshaken at build time
- **Lazy image loading** via native browser behavior — no external image assets in this build
- **`passive: true`** on scroll event listeners

---

## Accessibility Considerations

- **Skip navigation link** (`a.skip-nav`) — first focusable element, jumps to `#main`
- **Semantic HTML**: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<h1–h3>`, `<label>`, `<form>`
- **ARIA attributes**: `aria-label` on all icon-only buttons, `aria-expanded` on mobile menu, `aria-live="polite"` on terminal output, `role="dialog"` and `aria-modal` on project modal, `aria-describedby` on form fields with errors
- **Focus management**: Project modal traps focus; `Escape` key dismisses it
- **Visible focus states**: `:focus-visible` with 2px accent-color outline on all interactive elements
- **Keyboard navigation**: All interactive elements reachable and operable via keyboard
- **Color contrast**: All text meets WCAG AA contrast ratios in both dark and light modes
- **`role="alert"`** on form validation error messages — screen readers announce errors immediately
- **`prefers-reduced-motion`** respected — all animations disabled at the CSS level

---

## Trade-offs Made

| Decision | Trade-off | Reasoning |
|---|---|---|
| `ssr=false` | No server rendering = worse SEO crawlability | Portfolio is shared as a link/demo, not discovered via search. Performance > SEO here. |
| Canvas particles (custom) over Three.js | Less 3D capability | Three.js adds ~600KB. Canvas 2D achieves the same visual with ~0 extra bytes. |
| No external animation library (GSAP/Framer) | Less complex timeline control | Svelte transitions + CSS animations handle all needs. GSAP installed as optional dep but not required for base animations. |
| Single-page layout vs. multi-page routing | No URL-per-section | Portfolios are primarily scrolled linearly; anchor links (`#section`) provide shareability without full routing overhead. |
| Static data in `portfolio.ts` vs. CMS | No live content updates | Reduces complexity; rebuild-and-deploy cycle is acceptable for a personal portfolio. |
| Svelte 5 runes API | Requires Svelte 5+ (newer syntax) | Future-proof, cleaner reactivity model, better TypeScript inference. |

---

## Creative Feature: Interactive Terminal

Located in the `Terminal.svelte` component — a fully interactive CLI experience:

- Type commands like `help`, `about`, `skills`, `projects`, `contact`, `experience`, `education`, `clear`, `exit`
- Command history navigation with arrow keys (↑/↓)
- HTML-formatted responses with syntax highlighting
- Quick-launch buttons for common commands
- Realistic terminal chrome (traffic light buttons, monospace font, dark background)
- `aria-live="polite"` for screen reader accessibility

---

## Tech Stack

- **Framework**: SvelteKit 2 + Svelte 5 (runes)
- **Styling**: TailwindCSS v4 + custom CSS variables
- **Animations**: CSS keyframes + IntersectionObserver + Canvas 2D API
- **Fonts**: Inter (body) + JetBrains Mono (code/terminal)
- **Build**: Vite 7 + `@sveltejs/adapter-static`
- **Language**: TypeScript throughout
