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
            heading: { el: 'typed-about', text: 'about' },
            content: { el: 'typed-about-text', text: 'technology enthusiast.' }
        },
        {
            id: 'projects-section',
            heading: { el: 'typed-projects', text: 'projects' }
        },
        {
            id: 'skills-section',
            heading: { el: 'typed-skills', text: 'skills' }
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

                    if (entry.target.id === 'skills-section') {
                        var skillTags = entry.target.querySelectorAll('.skill-tag');
                        skillTags.forEach(function (tag, idx) {
                            setTimeout(function () {
                                tag.classList.add('visible');
                            }, idx * 80);
                        });
                    }
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

    var scrollProgress = document.querySelector('.scroll-progress');
    var scrollOffset = 0;
    window.addEventListener('scroll', function () {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = scrollPercent + '%';
        scrollOffset = scrollTop;
    });

    var mouseX = window.innerWidth / 2;
    var mouseY = window.innerHeight / 2;
    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    var rippleContainer = document.querySelector('.ripple-container');
    document.addEventListener('click', function (e) {
        var ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        ripple.style.width = '200px';
        ripple.style.height = '200px';
        rippleContainer.appendChild(ripple);
        setTimeout(function () {
            ripple.remove();
        }, 800);
    });

    var canvas = document.getElementById('stars-canvas');
    var ctx = canvas.getContext('2d');
    var stars = [];
    var shootingStars = [];
    var numStars = 80;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    var starColors = [
        'rgba(255, 255, 255,',
        'rgba(255, 255, 255,',
        'rgba(255, 255, 255,',
        'rgba(200, 220, 255,',
        'rgba(255, 240, 220,',
        'rgba(180, 200, 255,'
    ];

    for (var i = 0; i < numStars; i++) {
        var color = starColors[Math.floor(Math.random() * starColors.length)];
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            baseX: 0,
            baseY: 0,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.5 + 0.3,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            depth: Math.random() * 0.5 + 0.5,
            color: color
        });
        stars[i].baseX = stars[i].x;
        stars[i].baseY = stars[i].y;
    }

    function createShootingStar() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.5,
            length: Math.random() * 80 + 40,
            speed: Math.random() * 8 + 6,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
            alpha: 1,
            active: true
        };
    }

    setInterval(function () {
        if (Math.random() < 0.4) {
            shootingStars.push(createShootingStar());
        }
    }, 3000);

    canvas.style.pointerEvents = 'auto';
    
    var blackHoles = [];

    canvas.addEventListener('click', function (e) {
        var rect = canvas.getBoundingClientRect();
        shootingStars.push({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            length: 100,
            speed: 12,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.5,
            alpha: 1,
            active: true
        });
    });

    canvas.addEventListener('dblclick', function (e) {
        var rect = canvas.getBoundingClientRect();
        blackHoles.push({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            radius: 0,
            maxRadius: 30,
            life: 180,
            maxLife: 180
        });
    });

    var originalStarPositions = stars.map(function (s) {
        return { x: s.x, y: s.y };
    });

    function updateBlackHoles() {
        blackHoles.forEach(function (bh, bhIndex) {
            bh.life--;
            var progress = 1 - bh.life / bh.maxLife;
            if (progress < 0.1) {
                bh.radius = bh.maxRadius * (progress / 0.1);
            } else if (bh.life < 30) {
                bh.radius = bh.maxRadius * (bh.life / 30);
            } else {
                bh.radius = bh.maxRadius;
            }

            if (bh.life > 0) {
                ctx.beginPath();
                var gradient = ctx.createRadialGradient(bh.x, bh.y, 0, bh.x, bh.y, bh.radius * 2);
                gradient.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
                gradient.addColorStop(0.5, 'rgba(30, 0, 60, 0.5)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = gradient;
                ctx.arc(bh.x, bh.y, bh.radius * 2, 0, Math.PI * 2);
                ctx.fill();

                stars.forEach(function (star, sIndex) {
                    if (star.burst) return;
                    var dx = bh.x - star.x;
                    var dy = bh.y - star.y;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 200 && dist > 5) {
                        var force = (200 - dist) / 200 * 2;
                        star.x += (dx / dist) * force;
                        star.y += (dy / dist) * force;
                    }
                });
            }

            if (bh.life <= 0) {
                blackHoles.splice(bhIndex, 1);
                stars.forEach(function (star, sIndex) {
                    if (!star.burst && originalStarPositions[sIndex]) {
                        star.targetX = originalStarPositions[sIndex].x;
                        star.targetY = originalStarPositions[sIndex].y;
                        star.returning = true;
                    }
                });
            }
        });
    }

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(function (star, index) {
            if (star.burst) {
                star.x += star.vx;
                star.y += star.vy;
                star.life--;
                star.alpha = star.life / 60;
                if (star.life <= 0) {
                    stars.splice(index, 1);
                    return;
                }
            } else {
                if (star.returning && star.targetX !== undefined) {
                    star.x += (star.targetX - star.x) * 0.05;
                    star.y += (star.targetY - star.y) * 0.05;
                    if (Math.abs(star.x - star.targetX) < 1 && Math.abs(star.y - star.targetY) < 1) {
                        star.returning = false;
                    }
                } else {
                    var parallaxY = scrollOffset * star.depth * 0.1;
                    var dx = mouseX - star.baseX;
                    var dy = mouseY - star.baseY;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    var gravityStrength = Math.max(0, (300 - dist) / 300) * 15 * star.depth;
                    var targetX = star.baseX + (dx / (dist || 1)) * gravityStrength;
                    var targetY = star.baseY + (dy / (dist || 1)) * gravityStrength - parallaxY;
                    star.x += (targetX - star.x) * 0.05;
                    star.y += (targetY - star.y) * 0.05;
                }
                star.alpha += star.twinkleSpeed;
                if (star.alpha > 0.8 || star.alpha < 0.2) {
                    star.twinkleSpeed = -star.twinkleSpeed;
                }
            }
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = (star.color || 'rgba(255, 255, 255,') + star.alpha + ')';
            ctx.fill();
        });

        updateBlackHoles();

        shootingStars.forEach(function (ss, index) {
            if (!ss.active) return;
            ss.x += Math.cos(ss.angle) * ss.speed;
            ss.y += Math.sin(ss.angle) * ss.speed;
            ss.alpha -= 0.015;

            if (ss.alpha <= 0 || ss.x > canvas.width || ss.y > canvas.height) {
                ss.active = false;
                return;
            }

            var gradient = ctx.createLinearGradient(
                ss.x, ss.y,
                ss.x - Math.cos(ss.angle) * ss.length,
                ss.y - Math.sin(ss.angle) * ss.length
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, ' + ss.alpha + ')');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.beginPath();
            ctx.moveTo(ss.x, ss.y);
            ctx.lineTo(
                ss.x - Math.cos(ss.angle) * ss.length,
                ss.y - Math.sin(ss.angle) * ss.length
            );
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        });

        shootingStars = shootingStars.filter(function (ss) { return ss.active; });

        requestAnimationFrame(animateStars);
    }
    animateStars();

    var secretStats = document.querySelector('.secret-stats');
    var statsVisible = false;
    
    function getVisitorId() {
        var id = localStorage.getItem('visitor_id');
        if (!id) {
            id = 'v_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
            localStorage.setItem('visitor_id', id);
        }
        return id;
    }
    
    function updateStats() {
        var visitorId = getVisitorId();
        var stats = JSON.parse(localStorage.getItem('site_stats') || '{"total":0,"visitors":{}}');
        stats.total++;
        stats.visitors[visitorId] = (stats.visitors[visitorId] || 0) + 1;
        localStorage.setItem('site_stats', JSON.stringify(stats));
        var uniqueCount = Object.keys(stats.visitors).length;
        secretStats.innerHTML = 'views: ' + stats.total + '<br>unique: ' + uniqueCount;
    }
    updateStats();
    
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'K') {
            statsVisible = !statsVisible;
            secretStats.classList.toggle('visible', statsVisible);
        }
    });
});
