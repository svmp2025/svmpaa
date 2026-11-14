# svmpaa

Website for the Harvard Summer Venture in Management Program Alumni Association (SVMPAA), live at [www.svmpaa.com](https://www.svmpaa.com). It is hosted on GitHub Pages: anything merged into `main` goes live within a few minutes.

## How the site is organized

| File | What it holds |
|---|---|
| `index.html` | Every page of the site. Each page is a `<template id="...-page">` block (Home, About, Events, MBA Hub, and so on). The header and footer are at the top and bottom. |
| `assets/css/site.css` | Site styles, including everything for the MBA Hub (classes starting with `hub-`). Most styling uses Tailwind classes written directly in the HTML. |
| `assets/js/site.js` | Page switching (the `#about`, `#events` links), the mobile menu, and the Reunion photo carousel. |
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
