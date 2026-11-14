/* SVMPAA MBA Hub: data + behavior. Edit content in MBA_HUB_DATA; call initMbaHub(container) after the page renders. */
(function () {
    var MBA_HUB_DATA = {
        phases: [
            { when: '12–18 months before', short: 'Explore', title: 'Explore & prepare',
              tasks: ['Decide whether an MBA fits your goals', 'Research programs and career paths', 'Assess your applicant profile', 'Take a GMAT or GRE diagnostic'],
              related: [{ label: 'GMAT vs. GRE', go: 'mba-tests' }, { label: 'mba.com', res: 'mbacom' }, { label: 'MLT MBA Prep', res: 'mlt' }] },
            { when: '9–12 months before', short: 'Test', title: 'Test & research',
              tasks: ['Prepare for and take the GMAT or GRE', 'Build your target school list', 'Connect with students and alumni'],
              related: [{ label: 'Choosing a test', go: 'mba-tests' }, { label: 'Test prep resources', filter: 'test' }] },
            { when: '6–9 months before', short: 'Strategize', title: 'Build your strategy',
              tasks: ['Finalize your school list', 'Define your career goals and "Why MBA?"', 'Identify recommenders', 'Develop your MBA résumé'],
              related: [{ label: 'What HBS looks for', go: 'mba-hbs', tab: 'criteria' }, { label: 'Strategy tools', filter: 'strategy' }] },
            { when: '3–6 months before', short: 'Apply', title: 'Prepare applications',
              tasks: ['Request recommendations', 'Draft and refine essays', 'Complete application materials', 'Research scholarships and financing'],
              related: [{ label: 'HBS essays', go: 'mba-hbs', tab: 'essays' }, { label: 'Fellowships', filter: 'fellowships' }, { label: 'The Consortium', res: 'consortium' }] },
            { when: '1–3 months before', short: 'Submit', title: 'Finalize & submit',
              tasks: ['Review essays and résumé', 'Confirm recommendations and test scores', 'Submit applications'],
              related: [{ label: 'Before-you-submit check', go: 'mba-hbs', tab: 'check' }] },
            { when: 'After submitting', short: 'Interview', title: 'Interview',
              tasks: ['Prepare your story and career goals', 'Research each school’s interview format', 'Complete mock interviews'],
              related: [{ label: 'Interview question bank', go: 'mba-interview' }, { label: 'HBS interview', go: 'mba-hbs', tab: 'interview' }] },
            { when: 'After admission', short: 'Decide', title: 'Decide & prepare',
              tasks: ['Compare schools and scholarship offers', 'Determine financing', 'Select your program', 'Prepare for matriculation'],
              related: [{ label: 'Fellowships', filter: 'fellowships' }, { label: 'mba.com financing tools', res: 'mbacom' }] }
        ],

        stages: [
            { id: 'exploring', label: 'Just exploring', phase: 0, note: 'Start by deciding whether an MBA fits your goals, and learn what programs look for.', recs: ['mbacom', 'mlt', 'forte-launch'] },
            { id: 'early', label: '1–2 years out', phase: 0, note: 'You have time to build your profile. Structured pre-MBA programs pay off most at this stage.', recs: ['mlt', 'forte-launch', 'riordan'] },
            { id: 'testing', label: 'Studying for the test', phase: 1, note: 'Pick your test with a diagnostic, then commit to a study plan and date.', recs: ['gmat', 'gre'], go: { label: 'Compare GMAT and GRE', go: 'mba-tests' } },
            { id: 'applying', label: 'Applying now', phase: 3, note: 'Focus on essays, recommenders, and programs that waive fees or bring fellowship funding.', recs: ['mlt', 'forte-launch', 'consortium'], go: { label: 'Open the HBS essay guide', go: 'mba-hbs', tab: 'essays' } },
            { id: 'interviewing', label: 'Interviewing', phase: 5, note: 'Know your application cold and practice telling your stories out loud.', recs: ['mbamission', 'applicantlab'], go: { label: 'Practice interview questions', go: 'mba-interview' } },
            { id: 'admitted', label: 'Admitted', phase: 6, note: 'Congratulations. Compare offers, line up financing, and look for fellowships.', recs: ['consortium', 'forte-fellows', 'romba'] }
        ],

        categories: [
            { id: 'pipeline', label: 'Application programs' },
            { id: 'fellowships', label: 'Fellowships & communities' },
            { id: 'test', label: 'GMAT & GRE' },
            { id: 'research', label: 'School research' },
            { id: 'strategy', label: 'Strategy tools' }
        ],

        resources: [
            { id: 'mlt', cat: 'pipeline', name: 'MLT MBA Prep', org: 'Management Leadership for Tomorrow',
              desc: 'A structured admissions program with personalized coaching, application strategy, school engagement, and a strong peer network.',
              bestFor: 'Candidates who want high-touch support through the whole process.',
              note: 'Several pathways are offered; check current eligibility.', tags: ['Coaching', 'Eligibility applies'],
              links: [{ label: 'Visit MLT', url: 'https://mlt.org/mba-prep/' }] },
            { id: 'consortium', cat: 'pipeline', name: 'The Consortium', org: 'Consortium for Graduate Study in Management',
              desc: 'One common application to multiple member schools, with consideration for Consortium membership and fellowship funding.',
              bestFor: 'Applicants to member schools who share the Consortium’s mission of expanding access.',
              note: 'Eligibility rests on citizenship or residency, a bachelor’s degree, and commitment to the mission, not race or ethnicity.',
              tags: ['Fellowship funding', 'Reduced app costs'],
              links: [{ label: 'Visit the Consortium', url: 'https://cgsm.org/prospective-students/' }] },
            { id: 'forte-launch', cat: 'pipeline', name: 'Forté MBALaunch', org: 'Forté Foundation',
              desc: 'Structured application prep with admissions guidance, workshops, networking, and access to participating schools.',
              bestFor: 'Candidates who want a structured plan and a peer cohort.',
              note: 'Participants can get application fee waivers. A self-paced On Demand version is also available.',
              tags: ['Fee waivers', 'Self-paced option'],
              links: [{ label: 'Visit MBALaunch', url: 'https://www.fortefoundation.org/pre-mba/mbalaunch/' }] },
            { id: 'riordan', cat: 'pipeline', name: 'Riordan MBA Fellows', org: 'UCLA Anderson',
              desc: 'A pre-MBA program with admissions guidance, GMAT/GRE prep, mentorship, leadership development, and a personal MBA action plan.',
              bestFor: 'Early-career professionals planning to apply in the next few years.',
              note: 'Includes required in-person sessions at UCLA.', tags: ['Early career', 'In person'],
              links: [{ label: 'Visit Riordan', url: 'https://www.anderson.ucla.edu/specialized-academic-programs/riordan-programs/riordan-mba-fellows-program' }] },
            { id: 'forte-fellows', cat: 'fellowships', name: 'Forté Fellowships', org: 'Forté Foundation',
              desc: 'Fellowships awarded through participating schools to MBA candidates committed to advancing women in business, plus mentorship and employer access.',
              bestFor: 'Admitted or applying candidates at Forté partner schools.',
              note: 'Fellows are selected by the participating schools.', tags: ['Funding', 'Community'],
              links: [{ label: 'Visit Forté Fellows', url: 'https://www.fortefoundation.org/mba/fellows/' }] },
            { id: 'romba', cat: 'fellowships', name: 'Reaching Out MBA (ROMBA)', org: 'Reaching Out',
              desc: 'Programming, professional development, and fellowships centered on LGBTQ+ inclusion and leadership in business education.',
              bestFor: 'Candidates who want community and fellowship support at partner schools.',
              note: 'ROMBA Fellows are selected by partner schools; there is no separate fellowship application.',
              tags: ['Funding', 'Community'],
              links: [{ label: 'Visit ROMBA', url: 'https://reachingoutmba.org/' }, { label: 'Fellowship', url: 'https://reachingoutmba.org/fellowship/' }] },
            { id: 'gmat', cat: 'test', name: 'GMAT Official Prep', org: 'mba.com',
              desc: 'Practice questions, study materials, and full-length practice exams from the makers of the GMAT.',
              bestFor: 'Anyone considering the GMAT. Start here.',
              note: 'The free Official Starter Kit includes sample questions and two full-length practice exams.', tags: ['Free starter kit'],
              links: [{ label: 'Visit mba.com', url: 'https://www.mba.com/' }] },
            { id: 'gre', cat: 'test', name: 'GRE Official Resources', org: 'ETS',
              desc: 'The official source for GRE information, prep materials, practice tests, registration, and score reporting.',
              bestFor: 'Anyone considering the GRE.',
              note: 'More than 1,300 business schools accept the GRE for at least some MBA programs. Confirm each school’s policy.',
              tags: ['Official'],
              links: [{ label: 'Visit ETS', url: 'https://www.ets.org/gre.html' }] },
            { id: 'mbacom', cat: 'research', name: 'mba.com', org: 'GMAC',
              desc: 'More than GMAT prep: school exploration, program research, application guidance, admissions events, scholarships, and ROI and salary tools.',
              bestFor: 'Your first stop when you’re still exploring.',
              note: '', tags: ['Free', 'Financing tools'],
              links: [{ label: 'Visit mba.com', url: 'https://www.mba.com/' }] },
            { id: 'mbamission', cat: 'strategy', name: 'mbaMission', org: 'Admissions consulting',
              desc: 'Free guides on strategy, school selection, essays, résumés, recommendations, and interviews, plus the self-guided onTrack platform and paid consulting.',
              bestFor: 'Detailed, school-specific guidance, free or paid.',
              note: 'Its free library includes a complete start-to-finish admissions guide.', tags: ['Free guides', 'Paid options'],
              links: [{ label: 'Visit mbaMission', url: 'https://www.mbamission.com/' }, { label: 'Free guides', url: 'https://www.mbamission.com/resources/mbamission-free-guides/' }] },
            { id: 'applicantlab', cat: 'strategy', name: 'ApplicantLab', org: 'Self-guided platform',
              desc: 'A step-by-step platform covering positioning, "Why MBA?", school research, essays, résumés, recommenders, interviews, and checklists.',
              bestFor: 'Structured guidance at a lower cost than full-service consulting.',
              note: 'You can add one-on-one consulting if you want it.', tags: ['Paid', 'Self-paced'],
              links: [{ label: 'Visit ApplicantLab', url: 'https://www.applicantlab.com/' }] }
        ],

        questionThemes: [
            { id: 'story', label: 'Your story & goals', qs: ['Walk me through your résumé.', 'Why this program?', 'Why an MBA, and why now?', 'What are your short-term goals?', 'What are your long-term goals?', 'What else should we know? What do you wish we had asked?'] },
            { id: 'lead', label: 'Leadership & teams', qs: ['Tell me about a time you had to lead someone.', 'What’s your leadership style?', 'Tell me about a time you led a team. What was your greatest accomplishment?', 'Tell me about a time you had to influence someone more senior than you.', 'How have you dealt with a difficult client, boss, coworker, or team?', 'What makes a good or bad leader? Who is a leader you admire?'] },
            { id: 'perspective', label: 'Perspective & inclusion', qs: ['What’s your definition of diversity?', 'Tell me about a time you made an effort to get to know someone with a different background.', 'Tell me about a time you made an environment more inclusive.', 'Tell me about working with someone of a different identity. What did you learn?'] },
            { id: 'self', label: 'Self-awareness', qs: ['Tell me about your biggest failure, at work or in general.', 'What are your top strengths?', 'What are your top weaknesses?', 'Tell me about an ethical dilemma you faced.'] },
            { id: 'curve', label: 'Curveballs', qs: ['What is the biggest challenge facing your industry today?', 'Teach me something.', 'What is a book you’ve read recently?'] }
        ],

        askThemes: [
            { label: 'About the experience', qs: ['What was the most powerful lesson you learned in business school?', 'What do you see as the program’s greatest strength?', 'What’s your favorite thing about the curriculum? About the culture?', 'What’s one thing about the school that surprises people?', 'What’s your favorite tradition at the school?', 'What’s your most memorable moment there?', 'What skill did you use most during the MBA?'] },
            { label: 'About outcomes', qs: ['What has your career path been like since the MBA?', 'What has been most valuable about the alumni network?', 'How did the curriculum help you switch careers?', 'How has the school supported you since graduating?', 'How do you stay in touch with classmates now?'] },
            { label: 'About fit', qs: ['Knowing my goals, where would you focus your time as a student?', 'What traits do successful students here share?', 'What led you to choose this program? (alumni)', 'How do you see the program changing in the next 5–10 years? (admissions)'] }
        ]
    };

    function esc(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }
    function attr(t) { return esc(t).replace(/"/g, '&quot;'); }
    function safeUrl(u) { u = (u || '').trim(); return /^https?:\/\//i.test(u) ? u : ''; }
    function slugify(t) { return (t || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); }

    /* Turns rows from the "MBA Resources" tab of the website content Sheet into resource entries. */
    function resourcesFromSheet(rows, categories) {
        var byLabel = {}, used = {};
        categories.forEach(function (c) { byLabel[c.label.toLowerCase()] = c.id; });
        return rows.filter(window.SVMPAA_CONTENT.isShown).map(function (r) {
            var cat = byLabel[(r.Category || '').toLowerCase()];
            var url = safeUrl(r['Link URL']);
            if (!r.Name || !cat || !url) return null;
            var id = slugify(r.ID || r.Name) || 'resource';
            while (used[id]) id += '-2';
            used[id] = true;
            var links = [{ label: r['Link text'] || 'Visit ' + r.Name, url: url }];
            var url2 = safeUrl(r['Second link URL']);
            if (url2) links.push({ label: r['Second link text'] || 'Learn more', url: url2 });
            return {
                id: id, cat: cat, name: r.Name, org: r.Organization || '', desc: r['What they offer'] || '',
                bestFor: r['Best for'] || '', note: r.Note || '',
                tags: (r.Tags || '').split(',').map(function (t) { return t.trim(); }).filter(Boolean), links: links
            };
        }).filter(Boolean);
    }
    function icons() { if (window.feather) window.feather.replace(); }

    window.initMbaHub = function (root) {
        root = root || document;
        var D = MBA_HUB_DATA;
        var $ = function (k) { return root.querySelector('[data-hub="' + k + '"]'); };
        var state = { stage: null };
        var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
        var resById = {};
        D.resources.forEach(function (r) { resById[r.id] = r; });
        var activePhase = 0, activeFilter = 'all';

        /* ---------- navigation helpers (the site uses #hash routing, so in-page links scroll instead) ---------- */
        function scrollToId(id) {
            var el = root.querySelector('#' + id);
            if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        }
        /* Horizontal scrollers (section tabs, timeline phases) show arrows and a fade when more is off-screen. */
        function scrollHints(wrap) {
            var track = wrap.querySelector('[data-scroll-track]');
            var prev = wrap.querySelector('.hub-scroll-prev'), next = wrap.querySelector('.hub-scroll-next');
            function update() {
                var max = track.scrollWidth - track.clientWidth;
                var canPrev = track.scrollLeft > 4, canNext = track.scrollLeft < max - 4;
                prev.hidden = !canPrev; next.hidden = !canNext;
                wrap.classList.toggle('can-prev', canPrev); wrap.classList.toggle('can-next', canNext);
            }
            function by(d) { track.scrollBy({ left: d * track.clientWidth * 0.7, behavior: reduceMotion ? 'auto' : 'smooth' }); }
            prev.addEventListener('click', function () { by(-1); });
            next.addEventListener('click', function () { by(1); });
            track.addEventListener('scroll', update, { passive: true });
            window.addEventListener('resize', update);
            update();
            return { update: update, reveal: function (el) {
                var l = el.offsetLeft - track.offsetLeft, r = l + el.offsetWidth;
                if (l < track.scrollLeft + 40) track.scrollTo({ left: Math.max(0, l - 40), behavior: reduceMotion ? 'auto' : 'smooth' });
                else if (r > track.scrollLeft + track.clientWidth - 40) track.scrollTo({ left: r - track.clientWidth + 40, behavior: reduceMotion ? 'auto' : 'smooth' });
            } };
        }
        var tabScroll = scrollHints(root.querySelector('[data-hub="subnav-wrap"]'));
        var stepScroll = scrollHints(root.querySelector('[data-hub="steps-wrap"]'));

        /* One section shows at a time; the sticky bar switches between them. */
        var SECTION_IDS = ['mba-timeline', 'mba-resources', 'mba-tests', 'mba-hbs', 'mba-interview'];
        function navIsStuck() {
            var nav = root.querySelector('.hub-subnav');
            return !!nav && nav.getBoundingClientRect().top < 100;
        }
        function showSection(id, scroll) {
            if (SECTION_IDS.indexOf(id) === -1) id = 'mba-timeline';
            SECTION_IDS.forEach(function (s) { var el = root.querySelector('#' + s); if (el) el.hidden = s !== id; });
            root.querySelectorAll('[data-hub="subnav"] [data-go]').forEach(function (b) {
                var on = b.dataset.go === id;
                b.classList.toggle('is-active', on); b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1;
                if (on) tabScroll.reveal(b);
            });
            if (scroll) scrollToId(id);
        }
        function go(t) {
            if (t.tab) selectTab(t.tab);
            if (t.filter) { showSection('mba-resources', true); setFilter(t.filter); return; }
            if (t.res) { showSection('mba-resources', false); showResource(t.res); return; }
            if (t.go) showSection(t.go, true);
        }
        function showResource(id) {
            resExpanded = true; setFilter('all');
            var card = root.querySelector('#res-' + id);
            if (!card) return;
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.classList.add('is-flash');
            setTimeout(function () { card.classList.remove('is-flash'); }, 1800);
        }
        function linkBtn(t, cls) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = cls || 'hub-chip';
            b.innerHTML = esc(t.label) + ' <i data-feather="arrow-right" class="h-3.5 w-3.5"></i>';
            b.addEventListener('click', function () { go(t); });
            return b;
        }

        /* ---------- stage picker ---------- */
        var stagesEl = $('stages'), panel = $('stage-panel');
        D.stages.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button'; b.className = 'hub-chip'; b.setAttribute('role', 'radio');
            b.setAttribute('aria-checked', 'false'); b.dataset.stage = s.id; b.textContent = s.label;
            b.addEventListener('click', function () { setStage(state.stage === s.id ? null : s.id, true); });
            stagesEl.appendChild(b);
        });
        function setStage(id, user) {
            state.stage = id;
            stagesEl.querySelectorAll('[data-stage]').forEach(function (b) { b.setAttribute('aria-checked', String(b.dataset.stage === id)); });
            var s = D.stages.filter(function (x) { return x.id === id; })[0];
            if (!s) { panel.hidden = true; highlightRecs([]); renderSteps(); return; }
            var p = D.phases[s.phase];
            panel.innerHTML =
                '<div class="grid md:grid-cols-3 gap-6">' +
                '<div><p class="text-xs font-semibold uppercase tracking-wider text-red-800 mb-1">You’re in: ' + esc(p.title) + '</p>' +
                '<p class="text-xs text-gray-500 mb-2">' + esc(p.when) + ' applying</p><p class="text-gray-800">' + esc(s.note) + '</p></div>' +
                '<div class="hidden md:block"><p class="text-sm font-semibold text-gray-900 mb-2">What to do now</p>' +
                '<ul class="hub-list text-sm">' + p.tasks.slice(0, 3).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
                '</div><div><p class="text-sm font-semibold text-gray-900 mb-2">Start with</p><div class="flex flex-wrap gap-2" data-recs></div></div></div>';
            var recs = panel.querySelector('[data-recs]');
            s.recs.filter(function (rid) { return resById[rid]; }).forEach(function (rid) { recs.appendChild(linkBtn({ label: resById[rid].name, res: rid })); });
            if (s.go) recs.appendChild(linkBtn(s.go));
            panel.hidden = false;
            activePhase = s.phase;
            renderSteps(); renderPhase();
            highlightRecs(s.recs);
        }
        function highlightRecs(ids) {
            root.querySelectorAll('.hub-res [data-rec-badge]').forEach(function (n) { n.hidden = ids.indexOf(n.dataset.recBadge) === -1; });
            /* Recommended programs move to the top of the list so they're never behind "Show all". */
            var order = ids.concat(D.resources.map(function (r) { return r.id; }).filter(function (rid) { return ids.indexOf(rid) === -1; }));
            order.forEach(function (rid) { var card = root.querySelector('#res-' + rid); if (card) resEl.appendChild(card); });
            setFilter(activeFilter);
        }

        /* ---------- timeline ---------- */
        var stepsEl = $('steps'), detail = $('phase-detail');
        function renderSteps() {
            var stage = D.stages.filter(function (x) { return x.id === state.stage; })[0];
            stepsEl.innerHTML = '';
            D.phases.forEach(function (p, pi) {
                var li = document.createElement('li');
                li.innerHTML = '<button type="button" class="hub-step-btn"' + (pi === activePhase ? ' aria-current="step"' : '') + '>' +
                    (stage && stage.phase === pi ? '<span class="hub-you">You</span>' : '') +
                    '<span class="hub-step-when">' + esc(p.when) + '</span><span class="hub-step-title">' + esc(p.title) + '</span></button>';
                li.firstChild.addEventListener('click', function () { activePhase = pi; renderSteps(); renderPhase(); });
                stepsEl.appendChild(li);
            });
            stepScroll.update();
            var cur = stepsEl.querySelector('[aria-current="step"]');
            if (cur) stepScroll.reveal(cur.parentNode);
        }
        function renderPhase() {
            var p = D.phases[activePhase];
            detail.innerHTML =
                '<div class="grid md:grid-cols-3 gap-6"><div class="md:col-span-2">' +
                '<p class="text-xs font-semibold uppercase tracking-wider text-gray-500">Phase ' + (activePhase + 1) + ' of ' + D.phases.length + ' · ' + esc(p.when) + '</p>' +
                '<h3 class="text-2xl font-bold text-gray-900 mt-1 mb-4">' + esc(p.title) + '</h3><ul class="hub-list">' +
                p.tasks.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>' +
                '<div><p class="text-sm font-semibold text-gray-900 mb-2">Helpful for this phase</p><div class="flex flex-wrap gap-2" data-related></div>' +
                '<div class="flex gap-2 mt-6">' +
                (activePhase > 0 ? '<button type="button" class="hub-btn-outline" data-step="-1">← Previous</button>' : '') +
                (activePhase < D.phases.length - 1 ? '<button type="button" class="hub-btn-outline" data-step="1">Next phase →</button>' : '') +
                '</div></div></div>';
            var rel = detail.querySelector('[data-related]');
            p.related.forEach(function (t) { rel.appendChild(linkBtn(t)); });
            detail.querySelectorAll('[data-step]').forEach(function (b) {
                b.addEventListener('click', function () { activePhase += Number(b.dataset.step); renderSteps(); renderPhase(); });
            });
            icons();
        }

        /* ---------- resources ---------- */
        var filtersEl = $('filters'), resEl = $('resources'), resMore = $('res-more');
        var RES_PREVIEW = 6, resExpanded = false;
        var catLabel = {};
        D.categories.forEach(function (c) { catLabel[c.id] = c.label; });
        function buildResources() {
            resById = {};
            D.resources.forEach(function (r) { resById[r.id] = r; });
            filtersEl.innerHTML = '';
            [{ id: 'all', label: 'All' }].concat(D.categories).forEach(function (c) {
                var n = c.id === 'all' ? D.resources.length : D.resources.filter(function (r) { return r.cat === c.id; }).length;
                if (!n) return;
                var b = document.createElement('button');
                b.type = 'button'; b.className = 'hub-chip'; b.dataset.filter = c.id; b.setAttribute('aria-pressed', 'false');
                b.innerHTML = esc(c.label) + ' <span class="hub-count hub-nums">' + n + '</span>';
                b.addEventListener('click', function () { setFilter(c.id); });
                filtersEl.appendChild(b);
            });
            resEl.innerHTML = '';
            D.resources.forEach(function (r) {
                var card = document.createElement('article');
                card.className = 'hub-res'; card.id = 'res-' + r.id; card.dataset.cat = r.cat;
                card.innerHTML =
                    '<div class="flex flex-wrap items-center gap-2 mb-3"><span class="hub-tag hub-tag-cat">' + esc(catLabel[r.cat]) + '</span>' +
                    r.tags.map(function (t) { return '<span class="hub-tag">' + esc(t) + '</span>'; }).join('') +
                    '<span class="hub-tag" style="background:#991b1b;color:#fff" data-rec-badge="' + attr(r.id) + '" hidden>Recommended for you</span></div>' +
                    '<h3 class="text-xl font-semibold text-gray-900">' + esc(r.name) + '</h3><p class="text-sm text-gray-500 mb-3">' + esc(r.org) + '</p>' +
                    (r.bestFor ? '<p class="text-gray-800 mb-3"><span class="font-semibold">Best for:</span> ' + esc(r.bestFor) + '</p>' : '') +
                    (r.desc || r.note ? '<details class="hub-res-more mb-4"><summary>What they offer</summary>' +
                        (r.desc ? '<p class="text-gray-700 mt-2">' + esc(r.desc) + '</p>' : '') +
                        (r.note ? '<p class="text-sm text-gray-500 mt-2">' + esc(r.note) + '</p>' : '') + '</details>' : '') +
                    '<div class="flex flex-wrap gap-3 mt-auto">' + r.links.map(function (l, i) {
                        return '<a href="' + attr(l.url) + '" target="_blank" rel="noopener" class="' + (i === 0 ? 'event-button inline-flex items-center gap-1' : 'hub-btn-outline') + '">' + esc(l.label) + ' <i data-feather="arrow-up-right" class="h-4 w-4"></i></a>';
                    }).join('') + '</div>';
                resEl.appendChild(card);
            });
            if (activeFilter !== 'all' && !D.resources.some(function (r) { return r.cat === activeFilter; })) activeFilter = 'all';
            setFilter(activeFilter);
            icons();
        }
        function setFilter(id) {
            if (!filtersEl.querySelector('[data-filter="' + id + '"]')) id = 'all';
            activeFilter = id;
            filtersEl.querySelectorAll('[data-filter]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.filter === id)); });
            var shown = 0;
            resEl.querySelectorAll('.hub-res').forEach(function (c) {
                var match = id === 'all' || c.dataset.cat === id;
                c.hidden = !match || (id === 'all' && !resExpanded && shown >= RES_PREVIEW);
                if (match) shown++;
            });
            var hiddenCount = id === 'all' && !resExpanded ? Math.max(0, D.resources.length - RES_PREVIEW) : 0;
            resMore.hidden = hiddenCount === 0;
            resMore.textContent = 'Show all ' + D.resources.length + ' programs';
        }
        resMore.addEventListener('click', function () { resExpanded = true; setFilter('all'); });
        buildResources();

        /* ---------- HBS tabs ---------- */
        var tabs = root.querySelectorAll('[data-hub="tabs"] [role="tab"]');
        function selectTab(key) {
            tabs.forEach(function (t) {
                var on = t.id === 'hbs-tab-' + key;
                t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
                root.querySelector('#' + t.getAttribute('aria-controls')).hidden = !on;
            });
        }
        tabs.forEach(function (t, i) {
            t.addEventListener('click', function () { selectTab(t.id.replace('hbs-tab-', '')); });
            t.addEventListener('keydown', function (e) {
                var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
                if (!d) return;
                var n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); n.click();
            });
        });
        selectTab('criteria');

        /* ---------- interview practice ---------- */
        var qTheme = 'all', lastQ = null;
        var qf = $('q-filters');
        [{ id: 'all', label: 'All themes' }].concat(D.questionThemes).forEach(function (t) {
            var b = document.createElement('button');
            b.type = 'button'; b.className = 'hub-chip'; b.dataset.theme = t.id; b.textContent = t.label;
            b.setAttribute('aria-pressed', String(t.id === 'all'));
            b.addEventListener('click', function () {
                qTheme = t.id;
                qf.querySelectorAll('[data-theme]').forEach(function (x) { x.setAttribute('aria-pressed', String(x.dataset.theme === t.id)); });
                drawQuestion();
            });
            qf.appendChild(b);
        });
        function pool() {
            var out = [];
            D.questionThemes.forEach(function (t) { if (qTheme === 'all' || qTheme === t.id) t.qs.forEach(function (q) { out.push({ q: q, theme: t.label }); }); });
            return out;
        }
        function drawQuestion() {
            var p = pool(), pick;
            do { pick = p[Math.floor(Math.random() * p.length)]; } while (p.length > 1 && lastQ && pick.q === lastQ);
            lastQ = pick.q;
            $('q-text').textContent = pick.q;
            $('q-meta').textContent = pick.theme + ' · ' + p.length + ' questions in this set';
        }
        $('q-next').addEventListener('click', drawQuestion);
        drawQuestion();

        var timer = null, clock = $('q-clock'), tBtn = $('q-timer');
        tBtn.addEventListener('click', function () {
            if (timer) { clearInterval(timer); timer = null; tBtn.textContent = 'Start 2-minute timer'; clock.textContent = ''; return; }
            var left = 120;
            var tick = function () {
                clock.textContent = Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0') + ' left';
                if (left-- <= 0) { clearInterval(timer); timer = null; tBtn.textContent = 'Start 2-minute timer'; clock.textContent = 'Time. Wrap up your answer.'; }
            };
            tick(); timer = setInterval(tick, 1000); tBtn.textContent = 'Stop timer';
        });

        function accordion(el, groups, open) {
            groups.forEach(function (g, i) {
                var d = document.createElement('details');
                d.className = 'hub-acc'; if (open && i === 0) d.open = true;
                d.innerHTML = '<summary>' + esc(g.label) + ' <span class="text-sm font-normal text-gray-500 ml-auto mr-2 hub-nums">' + g.qs.length + '</span></summary>' +
                    '<ul class="hub-list text-sm">' + g.qs.map(function (q) { return '<li>' + esc(q) + '</li>'; }).join('') + '</ul>';
                el.appendChild(d);
            });
        }
        accordion($('q-all'), D.questionThemes, false);
        accordion($('ask-all'), D.askThemes, false);

        /* ---------- section tabs ---------- */
        var subBtns = Array.prototype.slice.call(root.querySelectorAll('[data-hub="subnav"] [data-go]'));
        subBtns.forEach(function (b, i) {
            b.addEventListener('click', function () { showSection(b.dataset.go, navIsStuck()); });
            b.addEventListener('keydown', function (e) {
                var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
                if (!d) return;
                var n = subBtns[(i + d + subBtns.length) % subBtns.length]; n.focus(); n.click();
            });
        });
        root.querySelectorAll('.hub-section [data-go]').forEach(function (b) {
            b.addEventListener('click', function () { showSection(b.dataset.go, true); });
        });

        /* ---------- first render ---------- */
        renderSteps(); renderPhase();
        showSection('mba-timeline', false);
        icons();

        /* Swap in the latest programs from the website content Sheet. Built-in programs stay if it can't load. */
        if (window.SVMPAA_CONTENT) {
            window.SVMPAA_CONTENT.load('MBA Resources', ['Name', 'Category', 'Link URL']).then(function (rows) {
                var list = resourcesFromSheet(rows, D.categories);
                if (!list.length || !resEl.isConnected) return;
                D.resources = list;
                buildResources();
                var s = D.stages.filter(function (x) { return x.id === state.stage; })[0];
                if (s) setStage(s.id, false);
            }).catch(function () { /* keep built-in programs */ });
        }
    };
})();
