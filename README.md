# Little Stage — Venue Website Demo

**Responsive, multi-page website prototype for a Vienna live-music pub and event venue.** It brings together event discovery, venue information, food and drinks, private celebrations, and information for bands.

[Source code](https://github.com/IllyaStack/little-stage-demo)

> This repository is a **portfolio/demo implementation**, not a claim that the venue's official website uses this code. Example events and imagery should be reviewed before any public production use.

## Highlights

- Multiple dedicated pages for events, event details, food & drinks, bands, private celebrations, and venue information.
- Event sections populated through JavaScript rather than hand-editing every card.
- Responsive navigation with a dedicated mobile menu.
- SEO metadata, Open Graph tags, and structured local-business data in the HTML.
- Clear links for telephone reservations, event discovery and enquiries.

## Technology

**HTML5 · CSS3 · Vanilla JavaScript** — static website, no framework required for the frontend.

## Project layout

```text
index.html         Landing page
bands.html         Information for performers
events.html        Events overview
event-detail.html  Event detail view
karte.html         Food and drinks
feiern.html        Private celebrations
ueber-uns.html     About the venue
impressum.html     Legal notice
datenschutz.html   Privacy notice
css/               Stylesheets
js/                Client-side scripts and data
```

## Local preview

```bash
python3 -m http.server 8000
```

Open **http://localhost:8000**. Navigate between pages to review the complete information architecture.

## Screenshots

Recommended: desktop landing page, events list, a venue-information page, and the mobile menu.

<!-- Add actual screenshots before enabling these links:
![Landing page](docs/screenshots/home-desktop.png)
![Events page](docs/screenshots/events.png)
![Mobile menu](docs/screenshots/mobile-menu.png)
-->

## Implementation notes

- The current content contains demonstration material and externally hosted images. Replace placeholder content and ensure image usage rights before a real launch.
- Contact details and business information should be independently confirmed before treating the site as production-ready.

**Built as portfolio work by** [Illia Sobotovych](https://github.com/IllyaStack) · [Site For You](https://siteforyou.at)
