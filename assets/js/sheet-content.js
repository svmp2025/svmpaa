/* Reads website content from the "SVMPAA Website Content" Google Sheet.
   Board members edit the Sheet; pages that use it (Events, MBA Hub resources) read it here.
   If the Sheet can't be reached, load() rejects and each page keeps its built-in content. */
(function () {
    var SHEET_ID = '18Ti2j_RXCEcnH3KFOjt6i2OyNuuDe4lab9CrhDK40Ns';
    var TIMEOUT_MS = 6000;
    var cache = {};

    function parseCSV(text) {
        var rows = [], row = [], field = '', i = 0, inQuotes = false;
        while (i < text.length) {
            var c = text[i];
            if (inQuotes) {
                if (c === '"') {
                    if (text[i + 1] === '"') { field += '"'; i++; } else { inQuotes = false; }
                } else { field += c; }
            } else if (c === '"') { inQuotes = true; }
            else if (c === ',') { row.push(field); field = ''; }
            else if (c === '\n' || c === '\r') {
                if (c === '\r' && text[i + 1] === '\n') i++;
                row.push(field); rows.push(row); row = []; field = '';
            } else { field += c; }
            i++;
        }
        if (field !== '' || row.length) { row.push(field); rows.push(row); }
        return rows;
    }

    /* Returns rows as objects keyed by header, e.g. row['Event name']. Blank rows are skipped. */
    function toObjects(rows, requiredHeaders) {
        if (!rows.length) throw new Error('empty sheet');
        var headers = rows[0].map(function (h) { return h.trim(); });
        requiredHeaders.forEach(function (h) {
            if (headers.indexOf(h) === -1) throw new Error('missing column: ' + h);
        });
        return rows.slice(1).map(function (r) {
            var o = {};
            headers.forEach(function (h, i) { o[h] = (r[i] || '').trim(); });
            return o;
        }).filter(function (o) {
            return Object.keys(o).some(function (k) { return o[k] !== ''; });
        });
    }

    function load(tab, requiredHeaders) {
        if (cache[tab]) return cache[tab];
        var url = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID +
            '/gviz/tq?tqx=out:csv&headers=1&sheet=' + encodeURIComponent(tab);
        var timeout = new Promise(function (_, reject) {
            setTimeout(function () { reject(new Error('timed out')); }, TIMEOUT_MS);
        });
        var request = fetch(url, { credentials: 'omit' }).then(function (r) {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.text();
        }).then(function (text) {
            if (/^\s*</.test(text)) throw new Error('not CSV (is the Sheet shared?)');
            return toObjects(parseCSV(text), requiredHeaders || []);
        });
        var p = Promise.race([request, timeout]);
        p.catch(function (err) {
            delete cache[tab];
            if (window.console) console.warn('[SVMPAA] Using built-in content for "' + tab + '": ' + err.message);
        });
        cache[tab] = p;
        return p;
    }

    function isShown(row) { return (row.Show || '').toLowerCase() !== 'no'; }

    /* Accepts an images/ path, a full URL, or a Google Drive share link. */
    function imageUrl(value) {
        var v = (value || '').trim();
        if (!v) return '';
        var drive = v.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/);
        if (drive) return 'https://lh3.googleusercontent.com/d/' + drive[1];
        if (/^https?:\/\//.test(v)) return v;
        if (v.indexOf('images/') !== 0) v = 'images/' + v;
        return encodeURI(decodeURI(v));
    }

    window.SVMPAA_CONTENT = { load: load, isShown: isShown, imageUrl: imageUrl, parseCSV: parseCSV, sheetId: SHEET_ID };
})();
