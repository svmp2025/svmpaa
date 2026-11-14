# svmpaa

Website for the Harvard Summer Venture in Management Program Alumni Association (SVMPAA), live at [www.svmpaa.com](https://www.svmpaa.com). It is hosted on GitHub Pages: anything merged into `main` goes live within a few minutes.

## Editing events and MBA Hub programs (no code needed)

Events and the MBA Hub's Programs & Resources list come from the **[SVMPAA Website Content](https://docs.google.com/spreadsheets/d/18Ti2j_RXCEcnH3KFOjt6i2OyNuuDe4lab9CrhDK40Ns/edit)** Google Sheet. Edit a row there and the site updates within about 5 minutes. The Sheet's **Start here** tab explains each column.

- The Sheet must stay shared as **Anyone with the link: Viewer**, or the site can't read it.
- If the site can't read the Sheet, it falls back to the built-in content in `index.html` and `assets/js/mba-hub.js`, so pages never go blank. Keep that built-in content roughly current.
- Board members who edit content need **Editor** access to the Sheet only, not GitHub.

## How the site is organized

| File | What it holds |
|---|---|
| `index.html` | Every page of the site. Each page is a `<template id="...-page">` block (Home, About, Events, MBA Hub, and so on). The header and footer are at the top and bottom. |
| `assets/css/site.css` | Site styles, including everything for the MBA Hub (classes starting with `hub-`). Most styling uses Tailwind classes written directly in the HTML. |
| `assets/js/site.js` | Page switching (the `#about`, `#events` links), the mobile menu, and the Reunion photo carousel. |
| `assets/js/sheet-content.js` | Reads the website content Google Sheet. The Sheet's ID is set at the top of this file. |
| `assets/js/events.js` | Builds the Events page and each event's detail page from the Sheet. |
| `assets/js/mba-hub.js` | The MBA Hub's interactive parts. All of its content (timeline phases, programs, interview questions) is in the `MBA_HUB_DATA` block at the top of this file. |
| `images/` | Photos and logos. |
| `CNAME` | The custom domain. Don't change it. |

## Common edits

**Change text on a page.** Find the page's `<template id="...-page">` block in `index.html` and edit the text inside it.

**Add a page.**
1. Add a new `<template id="new-page-page">` block in `index.html`, copying the structure of an existing one.
2. Add a line for it to the `routes` list near the top of `assets/js/site.js`.
3. Link to it with `href="#new-page" class="nav-router"`.

**Add an image.** Upload it to `images/` with a short lowercase name and no spaces (for example `boston-2026.jpg`), then reference it as `images/boston-2026.jpg`. Resize photos to about 2000px wide or less before uploading. Phone photos are often 5 to 12 MB, and the site loads them on every visit.

**Update MBA Hub content.** Edit `MBA_HUB_DATA` at the top of `assets/js/mba-hub.js`. Each program, phase, and question is one entry in a list, so copy an existing entry and change its text. Keep the quotes and commas in place.

## Before you merge

- Make changes on a branch and open a pull request, so someone else can review them first.
- After the change is live, open the page you edited and check that it looks right on a phone.
- The **Link check** workflow (under the Actions tab) runs every Monday and lists any links that stopped working. Run it by hand from that tab after big edits.
