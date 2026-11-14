/* Builds the Events page and event detail pages from the "Events" tab of the website content Sheet.
   If the Sheet can't be read, the Events page keeps the built-in content in index.html. */
(function () {
    var REQUIRED = ['Event name', 'Start date'];
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    function esc(t) { var d = document.createElement('div'); d.textContent = t == null ? '' : String(t); return d.innerHTML; }
    function attr(t) { return esc(t).replace(/"/g, '&quot;'); }
    function safeUrl(u) {
        u = (u || '').trim();
        if (/^https?:\/\//i.test(u) || /^mailto:/i.test(u)) return u;
        if (/^#[\w-]+$/.test(u)) return u;
        return '';
    }
    function slugify(s) { return (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); }

    function parseDate(s) {
        s = (s || '').trim();
        var m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
        if (m) { var y = +m[3]; if (y < 100) y += 2000; return new Date(y, +m[1] - 1, +m[2]); }
        m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
        if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
        return null;
    }
    function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
    function shortDate(d) { return MONTHS[d.getMonth()].slice(0, 3) + ' ' + d.getDate(); }
    function dateRange(a, b, longMonth) {
        if (!a) return 'Date to be announced';
        var mon = function (d) { return longMonth ? MONTHS[d.getMonth()] : MONTHS[d.getMonth()].slice(0, 3); };
        if (!b || iso(a) === iso(b)) return mon(a) + ' ' + a.getDate() + ', ' + a.getFullYear();
        if (a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()) return mon(a) + ' ' + a.getDate() + '–' + b.getDate() + ', ' + a.getFullYear();
        return mon(a) + ' ' + a.getDate() + ' – ' + mon(b) + ' ' + b.getDate() + ', ' + b.getFullYear();
    }
    function fullDate(a, b) {
        if (!a) return 'Date to be announced';
        if (!b || iso(a) === iso(b)) return DAYS[a.getDay()] + ', ' + MONTHS[a.getMonth()] + ' ' + a.getDate() + ', ' + a.getFullYear();
        return dateRange(a, b, true);
    }

    function fromRow(r) {
        var start = parseDate(r['Start date']), end = parseDate(r['End date']);
        var page = safeUrl(r['Page link']);
        var slug = 'event-' + slugify(r['Event name']) + (start ? '-' + iso(start) : '');
        return {
            name: r['Event name'], start: start, end: end, time: r.Time || '', city: r.City || '', venue: r.Venue || '',
            address: r.Address || '', desc: r.Description || '', host: r.Host || '',
            image: window.SVMPAA_CONTENT.imageUrl(r.Image), rsvp: safeUrl(r['RSVP link']), button: r['Button text'] || '',
            featured: (r.Featured || '').toLowerCase() === 'yes', slug: slug,
            href: page || '#' + slug, external: /^https?:/i.test(page) || /^mailto:/i.test(page)
        };
    }

    function loadEvents() {
        return window.SVMPAA_CONTENT.load('Events', REQUIRED).then(function (rows) {
            return rows.filter(window.SVMPAA_CONTENT.isShown).filter(function (r) { return r['Event name']; }).map(fromRow);
        });
    }

    function isUpcoming(e, today) {
        if (!e.start) return true;
        return (e.end || e.start) >= today;
    }
    function linkAttrs(e, extraClass) {
        return 'href="' + attr(e.href) + '" class="' + (e.external ? '' : 'nav-router ') + extraClass + '"' +
            (e.external ? ' target="_blank" rel="noopener"' : '');
    }
    function img(e, cls, w, h) {
        var fallback = 'https://placehold.co/' + w + 'x' + h + '/991b1b/FFFFFF?text=' + encodeURIComponent(e.name);
        return '<img src="' + attr(e.image || fallback) + '" alt="' + attr(e.name) + '" class="' + cls + '" loading="lazy" ' +
            'onerror="this.onerror=null;this.src=\'' + attr(fallback) + '\';">';
    }
    function placeLine(e) { return [e.venue, e.city].filter(Boolean).join(' · '); }

    function upcomingCard(e) {
        var cta = e.rsvp
            ? '<a href="' + attr(e.rsvp) + '" target="_blank" rel="noopener" class="event-button">' + esc(e.button || 'RSVP') + '</a>'
            : '';
        var details = '<a ' + linkAttrs(e, 'font-semibold text-red-800 hover:underline') + '>Event details →</a>';
        return '<div class="card overflow-hidden md:flex">' +
            (e.image ? '<div class="md:w-1/3 md:flex-shrink-0">' + img(e, 'w-full h-48 md:h-full object-cover', 600, 400) + '</div>' : '') +
            '<div class="p-6 flex-1 min-w-0">' +
            '<p class="text-sm font-semibold text-red-800 mb-1">' + esc(dateRange(e.start, e.end, false)) + (e.time ? ' · ' + esc(e.time) : '') + '</p>' +
            '<h3 class="font-bold text-2xl mb-1 text-gray-900">' + esc(e.name) + '</h3>' +
            (placeLine(e) ? '<p class="text-gray-500 text-sm mb-3">' + esc(placeLine(e)) + '</p>' : '') +
            (e.desc ? '<p class="text-gray-700 leading-relaxed mb-4">' + esc(e.desc) + '</p>' : '') +
            '<div class="flex flex-wrap items-center gap-4">' + cta + details + '</div>' +
            '</div></div>';
    }
    function featuredCard(e) {
        return '<a ' + linkAttrs(e, 'card overflow-hidden block hover:shadow-xl') + '>' +
            img(e, 'w-full h-48 object-cover', 1200, 400) +
            '<div class="p-6">' +
            '<h3 class="font-bold text-2xl mb-2">' + esc(e.name) + '</h3>' +
            '<p class="text-gray-500 text-sm mb-4">' + esc(dateRange(e.start, e.end, true)) + (e.city ? ' | ' + esc(e.city) : '') + '</p>' +
            (e.desc ? '<p class="text-gray-700 leading-relaxed mb-4">' + esc(e.desc) + '</p>' : '') +
            '<span class="font-semibold text-red-800 hover:underline">' + esc(e.button || 'Read more') + ' →</span>' +
            '</div></a>';
    }
    function tile(e) {
        return '<a ' + linkAttrs(e, 'card overflow-hidden block') + '>' +
            img(e, 'w-full h-32 object-cover', 300, 128) +
            '<div class="p-4 text-center">' +
            '<h4 class="font-bold text-lg mb-1">' + esc(e.name) + '</h4>' +
            '<p class="text-sm text-gray-600">' + (e.start ? esc(shortDate(e.start)) : 'Date TBA') + ((e.venue || e.city) ? ' | ' + esc(e.venue || e.city) : '') + '</p>' +
            '</div></a>';
    }

    function renderList(root) {
        var up = root.querySelector('[data-events="upcoming"]'), past = root.querySelector('[data-events="past"]');
        if (!up || !past || !window.SVMPAA_CONTENT) return;
        loadEvents().then(function (events) {
            if (!events.length || !up.isConnected) return;
            var t = new Date(); var today = new Date(t.getFullYear(), t.getMonth(), t.getDate());
            var upcoming = events.filter(function (e) { return isUpcoming(e, today); })
                .sort(function (a, b) { return (a.start || Infinity) - (b.start || Infinity); });
            var done = events.filter(function (e) { return !isUpcoming(e, today); })
                .sort(function (a, b) { return b.start - a.start; });

            up.innerHTML = upcoming.length
                ? '<div class="space-y-6 mb-8">' + upcoming.map(upcomingCard).join('') + '</div>'
                : '<div class="space-y-4 mb-8"><div class="card p-6 border-l-4 border-red-800 bg-red-50 shadow-sm">' +
                  '<h4 class="font-bold text-xl text-red-900 mb-1">New events coming soon</h4>' +
                  '<p class="text-gray-700">We\'re planning our next gatherings now. Check back soon or join our newsletter to hear about them first.</p></div></div>';

            var featured = done.filter(function (e) { return e.featured; });
            var byYear = {};
            done.filter(function (e) { return !e.featured; }).forEach(function (e) { (byYear[e.start.getFullYear()] = byYear[e.start.getFullYear()] || []).push(e); });
            var html = '';
            if (featured.length) {
                html += '<h2 class="text-3xl font-bold mb-8">Past Event Highlights</h2>' +
                    '<div class="grid md:grid-cols-1 gap-8 mb-12">' + featured.map(featuredCard).join('') + '</div>';
            }
            Object.keys(byYear).sort().reverse().forEach(function (y) {
                html += '<h3 class="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">Regional Meetups - ' + esc(y) + ' (Past)</h3>' +
                    '<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">' + byYear[y].map(tile).join('') + '</div>';
            });
            past.innerHTML = html;
        }).catch(function () { /* keep built-in content */ });
    }

    function renderDetail(root, slug) {
        var box = root.querySelector('[data-event-detail]');
        if (!box || !window.SVMPAA_CONTENT) return;
        var notFound = '<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">' +
            '<h1 class="text-3xl font-bold mb-4">Event not found</h1>' +
            '<p class="text-gray-600 mb-8">This event may have been renamed or removed.</p>' +
            '<a href="#events" class="nav-router text-red-800 hover:underline">← Back to All Events</a></div>';
        loadEvents().then(function (events) {
            if (!box.isConnected) return;
            var e = events.filter(function (x) { return x.slug === slug; })[0];
            if (!e) { box.innerHTML = notFound; return; }
            document.title = e.name + ' | SVMP Alumni Association';
            var map = e.address ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(e.address) : '';
            var where = e.address
                ? '<a href="' + attr(map) + '" target="_blank" rel="noopener" class="text-red-800 hover:underline">' + esc(e.venue ? e.venue + ', ' + e.address : e.address) + '</a>'
                : '<p>' + esc(placeLine(e) || 'Location to be announced') + '</p>';
            box.innerHTML =
                (e.image ? '<div class="w-full h-64 md:h-80">' + img(e, 'w-full h-full object-cover', 1200, 400) + '</div>' : '') +
                '<div class="bg-white shadow-md"><div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">' +
                '<h1 class="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">' + esc(e.name) + '</h1>' +
                '<p class="mt-4 text-lg md:text-xl font-semibold text-red-800 bg-red-50 inline-block px-4 py-2 rounded-full">' + esc(fullDate(e.start, e.end)) + (e.time ? ' | ' + esc(e.time) : '') + '</p>' +
                '</div></div>' +
                '<div class="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16"><div class="max-w-4xl mx-auto grid lg:grid-cols-3 gap-8">' +
                '<div class="' + (e.host ? 'lg:col-span-2' : 'lg:col-span-3') + '"><div class="bg-white p-8 rounded-lg shadow-md">' +
                '<h2 class="text-2xl font-bold mb-4">Event Details</h2><div class="space-y-4 text-gray-700">' +
                '<div class="flex items-start"><i data-feather="calendar" class="h-6 w-6 text-red-800 mr-3 mt-1 flex-shrink-0"></i><div>' +
                '<h3 class="font-semibold">When &amp; Where</h3><p>' + esc(fullDate(e.start, e.end)) + (e.time ? ', ' + esc(e.time) : '') + '</p>' + where + '</div></div>' +
                (e.desc ? '<div class="flex items-start"><i data-feather="message-circle" class="h-6 w-6 text-red-800 mr-3 mt-1 flex-shrink-0"></i><div>' +
                '<h3 class="font-semibold">About The Event</h3><p style="white-space:pre-line">' + esc(e.desc) + '</p></div></div>' : '') +
                '</div></div></div>' +
                (e.host ? '<div><div class="bg-white p-8 rounded-lg shadow-md"><h2 class="text-2xl font-bold mb-4">Meet Your Host</h2>' +
                '<p class="text-gray-700">Special thanks to our host' + (e.host.indexOf(',') > -1 ? 's' : '') + '.</p>' +
                '<ul class="mt-2 font-semibold text-gray-800">' + e.host.split(',').map(function (h) { return '<li>' + esc(h.trim()) + '</li>'; }).join('') + '</ul></div></div>' : '') +
                '</div><div class="text-center mt-12">' +
                (e.rsvp ? '<a href="' + attr(e.rsvp) + '" target="_blank" rel="noopener" class="inline-flex items-center bg-red-800 text-white font-semibold py-3 px-8 rounded-md hover:bg-red-900 transition text-lg">' +
                '<i data-feather="check-circle" class="mr-2"></i>' + esc(e.button || 'RSVP Here') + '</a>' : '') +
                '<div class="mt-12"><a href="#events" class="nav-router text-red-800 hover:underline">← Back to All Events</a></div>' +
                '</div></div>';
            if (window.feather) window.feather.replace();
        }).catch(function () {
            if (box.isConnected) box.innerHTML = notFound.replace('This event may have been renamed or removed.', 'We couldn’t load event details right now. Please try again in a moment.');
        });
    }

    window.SVMPAA_EVENTS = { renderList: renderList, renderDetail: renderDetail, parseDate: parseDate, dateRange: dateRange };
})();
