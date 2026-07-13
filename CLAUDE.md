# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static HTML/CSS/JS website for **PERWANAS** (Pergerakan Wanita Nasional Indonesia), built on the "Clocker" HTML5 Boilerplate theme (author: Ithi, 2011). There is no build system, package manager, framework, or server-side code — every page is a hand-written, self-contained `.html` file served as-is.

## Running / developing

There are no build, lint, or test commands — this is not a Node/npm project. To work on it:

- Open any `.html` file directly in a browser, or serve the folder with a simple static server (e.g. `python -m http.server` or the VS Code Live Server extension) from the project root so relative paths (`css/`, `js/`, `img/`) resolve correctly.
- Edits are made directly to the HTML/CSS/JS files; refresh the browser to see changes (no compilation/watch step).

## Architecture

- **No templating/includes.** The header (logo + `<nav id="nav">` menu) and footer markup are copy-pasted into all 31 top-level `.html` files. Any navigation, branding, or footer change (e.g. copyright year) must be manually repeated across every page — grep for `id="nav"` to find all of them.
- **Layout grid:** pages use the 960.gs 12-column grid (`css/960_12_col.css`, classes like `grid_4`, `grid_6`, `push_2`, `container_12`) combined with the theme's own `css/style.css` (numbered sections listed at the top of that file: fonts, reset, nav, slider, portfolio, blog, sidebar, archives, about-me, contact, footer).
- **JS stack:** jQuery 1.5.1 (loaded from Google CDN with a local fallback in `js/libs/`), plus theme plugins in `js/`:
  - `superfish.js` + `hoverIntent.js` — dropdown/multi-level nav (`#nav`)
  - `jquery.nivo.slider.pack.js` — homepage image slider (`#nivo-slider`)
  - `jquery.quicksand.js` + `jquery.easing.js` — portfolio/gallery filtering
  - `jquery.tweet.js`, `jquery.jribbble-0.11.0.js` — legacy Twitter/Dribbble widgets (external APIs likely defunct)
  - `script.js` / `plugins.js` / `init.js` — theme init glue
- **Page families** (each is a set of standalone HTML files sharing a layout pattern, not a component):
  - Organizational/content pages: `index.html`, `organisasi.html`, `kongres.html`, `tokoh.html`, `program.html`, `cabang.html`, `kegiatan.html`, `contact.html`
  - Gallery: `galeri.html` plus one `foto_*.html` per event/album (e.g. `foto_donggala.html`, `foto_workshop.html`, `foto_tataboga.html`), each pointing at a matching image subfolder under `img/` (`img/donggala/`, `img/workshop/`, etc.)
  - Theme boilerplate/demo pages carried over from the original template and largely unused for real content: `portfolio-*.html`, `blog*.html`, `archives.html`, `about-me.html`, `full-width.html`, `index0.html`, `index_clock.html`, `underconstructions.html`, `absensi*.html`
- **Images:** `img/` root has shared assets (logos, sprites, backgrounds); per-event photo albums live in their own subfolders matching the `foto_*.html` page names.
- Google Analytics snippet at the bottom of pages still has the placeholder `UA-XXXXX-X` — not actually wired up.
