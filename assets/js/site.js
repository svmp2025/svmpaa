document.addEventListener('DOMContentLoaded', function () {
    feather.replace();

    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    const routes = {
        'home': 'home-page',
        'about': 'about-page',
        'events': 'events-page',
        'reunion-recap': 'reunion-recap-page',
        'bridge-year-event': 'bridge-year-event-page',
        'reunion-2026': 'reunion-2026-page', 
        'la-event': 'la-event-page',
        'sd-event': 'sd-event-page',
        'chicago-event': 'chicago-event-page',
        'arlington-event': 'arlington-event-page',
        'contact': 'contact-page',
        'partnerships': 'partnerships-page',
        'development': 'development-page',
        'mba-hub': 'mba-hub-page',
        'scholarship-directory': 'scholarship-directory-page', 
        'get-involved': 'get-involved-page',
    };

    function initCarousel() {
        const carouselInner = document.getElementById('carousel-inner');
        if (!carouselInner) return;

        const images = [
            "images/IMG_2172_jpg.JPEG",
            "images/IMG_2309.JPEG",
            "images/IMG_2256.JPEG",
            "images/IMG_6726.jpg",
            "images/IMG_6800.jpg",
            "images/IMG_6817_(1).jpg"
        ];

        carouselInner.innerHTML = ''; 
        images.forEach((src, index) => {
            const item = document.createElement('div');
            item.className = 'carousel-item absolute w-full h-full';
            if (index === 0) item.classList.add('active', 'opacity-100');
            else item.classList.add('opacity-0');

            const img = document.createElement('img');
            img.src = src;
            img.alt = `Reunion Photo ${index + 1}`;
            img.className = 'w-full h-full object-cover';
            img.onerror=function() { 
                this.parentElement.style.display = 'none';
                initCarousel(); 
            };
            item.appendChild(img);
            carouselInner.appendChild(item);
        });

        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        let currentIndex = 0;
        const items = Array.from(carouselInner.querySelectorAll('.carousel-item')).filter(item => item.style.display !== 'none');
        const totalItems = items.length;

        if (totalItems <= 1) {
            if(prevBtn) prevBtn.style.display = 'none';
            if(nextBtn) nextBtn.style.display = 'none';
            return;
        } else {
             if(prevBtn) prevBtn.style.display = 'block';
             if(nextBtn) nextBtn.style.display = 'block';
        }

        function showSlide(index) {
            items.forEach((item) => {
                item.style.opacity = '0';
                item.classList.remove('active');
            });
            items[index].classList.add('active');
            items[index].style.opacity = '1';
        }

        if(prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                showSlide(currentIndex);
            });
        }

        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % totalItems;
                showSlide(currentIndex);
            });
        }
    }

    /* Event detail pages (#event-...) are built from the website content Sheet by events.js. */
    function isEventDetail(pageId) {
        return pageId.indexOf('event-') === 0 && !!window.SVMPAA_EVENTS;
    }

    function loadPage(pageId) {
        mainContent.innerHTML = '';

        const templateId = routes[pageId] || (isEventDetail(pageId) ? 'event-detail-page' : null);
        if (templateId) {
            const template = document.getElementById(templateId);
            if (template) {
                const clone = template.content.cloneNode(true);
                mainContent.appendChild(clone);

                const pageElement = mainContent.querySelector('.page');
                if(pageElement) {
                    setTimeout(() => pageElement.classList.add('active'), 0);
                }

                feather.replace();

                if (pageId === 'reunion-recap') {
                    initCarousel();
                }
                if (pageId === 'mba-hub' && window.initMbaHub) {
                    window.initMbaHub(mainContent);
                }
                if (pageId === 'events' && window.SVMPAA_EVENTS) {
                    window.SVMPAA_EVENTS.renderList(mainContent);
                }
                if (isEventDetail(pageId)) {
                    window.SVMPAA_EVENTS.renderDetail(mainContent, pageId);
                }
            }
        }

        updateActiveLink(pageId);
        window.scrollTo(0, 0);
        if (mobileMenu) mobileMenu.classList.add('hidden');
    }

    function updateActiveLink(pageId) {
        navLinks.forEach(link => link.classList.remove('active'));

        let mainPageId = pageId;
        if (mainPageId.endsWith('-event') || mainPageId.endsWith('-recap') || mainPageId === 'reunion-2026' || mainPageId.indexOf('event-') === 0) {
            mainPageId = 'events';
        } else if (mainPageId === 'scholarship-directory') { 
            mainPageId = 'development';
        }

        navLinks.forEach(link => {
            const linkHash = link.href.split('#')[1];
            if (linkHash === mainPageId) {
                link.classList.add('active');
            }
        });
    }

    function handleRouteChange() {
        const hash = window.location.hash.substring(1) || 'home';
        if(routes[hash] || isEventDetail(hash)) {
            loadPage(hash);
        } else {
            loadPage('home'); 
        }
    }

    document.body.addEventListener('click', function(e) {
        const navRouterElement = e.target.closest('.nav-router');
        if (navRouterElement) {
            if (navRouterElement.hash && navRouterElement.origin === window.location.origin) {
                e.preventDefault(); 
                const newHash = navRouterElement.hash;

                if(window.location.hash !== newHash) {
                    window.location.hash = newHash;
                } else {
                    const pageId = newHash.substring(1);
                    if(routes[pageId] || isEventDetail(pageId)) {
                        loadPage(pageId);
                    }
                }
            }
        }
    });

    window.addEventListener('hashchange', handleRouteChange);

    if(mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function () {
            if (mobileMenu) mobileMenu.classList.toggle('hidden');
        });
    }

    handleRouteChange();
});
