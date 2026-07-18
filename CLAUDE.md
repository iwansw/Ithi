# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static HTML/CSS/JS website for **PERWANAS** (Pergerakan Wanita Nasional Indonesia). Originally built on the 2011 "Clocker" HTML5 Boilerplate theme; redesigned with a modern terracotta visual identity (2026) appropriate for a national women's organization. There is no build system, package manager, framework, or server-side code — every page is a hand-written, self-contained `.html` file served as-is. The project is tracked in a local git repo (`git init` was run at the start of the redesign as a restore point).

## Running / developing

There are no build, lint, or test commands — this is not a Node/npm project. To work on it:

- Open any `.html` file directly in a browser, or serve the folder with a simple static server (e.g. `python -m http.server` or the VS Code Live Server extension) from the project root so relative paths (`css/`, `js/`, `img/`) resolve correctly.
- Edits are made directly to the HTML/CSS/JS files; refresh the browser to see changes (no compilation/watch step).

## Architecture

- **No templating/includes.** The header (logo + `<nav class="main-nav">` menu) and footer markup are copy-pasted identically into all 19 real `.html` pages. Any navigation, branding, or footer change (e.g. copyright year) must be manually repeated across every page — grep for `class="site-header"` / `class="site-footer"` to find all of them.
- **Design system:** `css/style.css` is a single hand-maintained stylesheet (CSS custom properties in `:root` for the terracotta palette/typography, then reset → typography → layout → buttons → header/nav → hero → cards → tables → accordion → gallery/lightbox → forms → footer, in that section order — see the numbered comments in the file). Mobile-first, CSS Grid/Flexbox based, no framework. The old 960.gs grid (`css/960_12_col.css`) is no longer referenced by any page but left on disk.
- **JS:** `js/main.js` is vanilla JS (no jQuery) handling: mobile nav toggle/dropdowns, the Program Kerja accordion, and a custom lightbox for gallery pages (auto-attaches to any `.gallery-thumb` elements found on the page). The old jQuery/Superfish/Nivo Slider/Quicksand/tweet/Dribbble scripts and `js/libs/` are no longer referenced by any page but left on disk.
- **Fonts:** Google Fonts CDN (Cinzel ExtraBold 800 for headings, Work Sans for body) loaded via `<link>` in each page `<head>`.
- **Page inventory (19 real pages, each self-contained):**
  - `index.html` — home
  - `profil.html` — sejarah/visi/misi/asas/tujuan (renamed from the old `portfolio-full.html`, which was mislabeled theme boilerplate but actually held real content)
  - `organisasi.html`, `kongres.html`, `tokoh.html` — under the "Struktur" nav dropdown
  - `program.html` — 9 "Bidang" program sections rendered as an accordion (`.accordion-item` / `.accordion-trigger` / `.accordion-panel`)
  - `cabang.html` — 24 DPD branch cards; most still carry placeholder address/phone data inherited from the original site (only DKI Jakarta, Jawa Barat, Jawa Tengah have real distinct info) — don't treat that placeholder data as real without checking with the client
  - `kegiatan.html` — merged "Kegiatan & Galeri" index (previously two separate pages, `kegiatan.html` + `galeri.html`, covering the same 10 events) — card grid linking to the 10 `foto_*.html` detail pages
  - `foto_*.html` (×10, one per event/photo album) — all generated from one template (see `gen_galleries.py` pattern if regenerating), each pointing at a matching image subfolder under `img/` (`img/donggala/`, `img/workshop/`, etc.); images render through `.gallery-grid` / `.gallery-thumb` buttons that `js/main.js` wires into the lightbox
  - `contact.html` — contact info + Google Maps iframe + a form posting to a **Formspree placeholder** (`https://formspree.io/f/YOUR_ID`) — needs a real Formspree (or equivalent) endpoint ID before the form will actually deliver submissions
- **Deleted (2026 redesign):** all original theme boilerplate/demo pages with no real PERWANAS content (`portfolio-single/aside.html`, `blog*.html`, `archives.html`, `about-me.html`, `full-width.html`, `index0.html`, `index_clock.html`, `underconstructions.html`), the stale 2020 Zoom attendance pages (`absensi01.html`, `absensi140920.html`), and `galeri.html` (merged into `kegiatan.html`). All still recoverable from git history if ever needed.
- **Images:** `img/` root has shared assets (logo emblem `img/logo.gif` used as the site's brand mark, backgrounds); per-event photo albums live in their own subfolders matching the `foto_*.html` page names.
