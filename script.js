document.addEventListener("DOMContentLoaded", function () {
    var toggleBtn = document.getElementById("mode-toggle");
    var iconMoon = toggleBtn.querySelector('.icon-moon');
    var iconSun = toggleBtn.querySelector('.icon-sun');

    function typeText(element, text, speed, callback) {
        var i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        type();
    }

    var typedName = document.getElementById('typed-name');
    typeText(typedName, 'Karan Tandra', 80);

    var sections = [
        {
            id: 'about-section',
            heading: { el: 'typed-about', text: 'About' },
            content: { el: 'typed-about-text', text: 'Developer. Creator. Problem solver.' }
        },
        {
            id: 'projects-section',
            heading: { el: 'typed-projects', text: 'Projects' },
            content: { el: 'typed-projects-text', text: 'Coming soon.' }
        },
        {
            id: 'links-section',
            heading: { el: 'typed-links', text: 'Links' },
            links: [
                { text: 'GitHub', url: 'https://github.com/Karan5352' },
                { text: 'LinkedIn', url: '#' },
                { text: 'Email', url: 'mailto:you@example.com' }
            ]
        }
    ];

    var triggered = {};

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !triggered[entry.target.id]) {
                triggered[entry.target.id] = true;
                entry.target.classList.add('visible');

                var sectionData = sections.find(function (s) {
                    return s.id === entry.target.id;
                });

                if (sectionData) {
                    var headingEl = document.getElementById(sectionData.heading.el);
                    typeText(headingEl, sectionData.heading.text, 60, function () {
                        headingEl.classList.add('done');
                        if (sectionData.content) {
                            var contentEl = document.getElementById(sectionData.content.el);
                            typeText(contentEl, sectionData.content.text, 30);
                        }
                        if (sectionData.links) {
                            var linksContainer = document.getElementById('links-container');
                            sectionData.links.forEach(function (link, index) {
                                setTimeout(function () {
                                    var a = document.createElement('a');
                                    a.href = link.url;
                                    a.textContent = link.text;
                                    a.target = '_blank';
                                    linksContainer.appendChild(a);
                                }, index * 200);
                            });
                        }
                    });
                }
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(function (section) {
        var el = document.getElementById(section.id);
        if (el) observer.observe(el);
    });

    function updateIcon() {
        if (document.body.classList.contains('dark-mode')) {
            iconMoon.style.display = 'none';
            iconSun.style.display = 'inline';
        } else {
            iconMoon.style.display = 'inline';
            iconSun.style.display = 'none';
        }
    }

    toggleBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        updateIcon();
    });

    updateIcon();
});
