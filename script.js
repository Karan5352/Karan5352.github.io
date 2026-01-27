document.addEventListener("DOMContentLoaded", function () {
    var toggleBtn = document.getElementById("mode-toggle");
    var iconMoon = toggleBtn.querySelector('.icon-moon');
    var iconSun = toggleBtn.querySelector('.icon-sun');

    // Contact modal
    var contactBtn = document.getElementById('contact-btn');
    var contactModal = document.getElementById('contact-modal');
    var contactClose = document.getElementById('contact-close');

    contactBtn.addEventListener('click', function () {
        contactModal.classList.add('active');
        formStatus.textContent = '';
    });

    contactClose.addEventListener('click', function () {
        contactModal.classList.remove('active');
        formStatus.textContent = '';
    });

    contactModal.addEventListener('click', function (e) {
        if (e.target === contactModal) {
            contactModal.classList.remove('active');
            formStatus.textContent = '';
        }
    });

    // AJAX form submission
    var contactForm = document.getElementById('contact-form');
    var formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Populate hidden fields
        document.getElementById('form-timestamp').value = new Date().toISOString();
        document.getElementById('form-useragent').value = navigator.userAgent;
        document.getElementById('form-screensize').value = window.screen.width + 'x' + window.screen.height;
        document.getElementById('form-timezone').value = Intl.DateTimeFormat().resolvedOptions().timeZone;
        document.getElementById('form-referrer').value = document.referrer || 'direct';
        document.getElementById('form-language').value = navigator.language;
        
        var formData = new FormData(contactForm);
        
        fetch('https://formspree.io/f/xgokqlna', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(function (response) {
            if (response.ok) {
                formStatus.textContent = 'message sent!';
                formStatus.style.color = '#4ade80';
                contactForm.reset();
            } else {
                formStatus.textContent = 'something went wrong.';
                formStatus.style.color = '#f87171';
            }
        }).catch(function () {
            formStatus.textContent = 'something went wrong.';
            formStatus.style.color = '#f87171';
        });
    });

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
    typeText(typedName, 'Karan Tandra', 80, function () {
        typedName.classList.add('done');
    });

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

    // Track tab visibility to prevent effect spam
    var lastActiveTime = Date.now();
    var tabJustActivated = false;
    
    document.addEventListener('visibilitychange', function () {
        if (!document.hidden) {
            var timeSinceActive = Date.now() - lastActiveTime;
            if (timeSinceActive > 1000) {
                tabJustActivated = true;
                setTimeout(function () {
                    tabJustActivated = false;
                }, 500);
            }
        }
        lastActiveTime = Date.now();
    });

    setInterval(function () {
        if (tabJustActivated) return;
        if (Math.random() < 0.4) {
            shootingStars.push(createShootingStar());
        }
    }, 3000);

    // === AMBIENT EFFECTS ===
    
    // 1. Comets - larger, slower shooting stars with longer tails
    var comets = [];
    setInterval(function () {
        if (tabJustActivated) return;
        if (Math.random() < 0.3) {
            comets.push({
                x: -50,
                y: Math.random() * canvas.height * 0.6,
                length: 150 + Math.random() * 100,
                speed: 2 + Math.random() * 2,
                angle: Math.PI / 6 + (Math.random() - 0.5) * 0.2,
                alpha: 1,
                hue: Math.random() * 60 + 180,
                active: true
            });
        }
    }, 45000);

    // 2. Constellations - temporary connecting lines
    var constellations = [];
    setInterval(function () {
        if (tabJustActivated) return;
        if (Math.random() < 0.6 && stars.length > 5) {
            var centerStar = stars[Math.floor(Math.random() * stars.length)];
            var nearbyStars = stars.filter(function (s) {
                var dx = s.x - centerStar.x;
                var dy = s.y - centerStar.y;
                return Math.sqrt(dx * dx + dy * dy) < 150 && s !== centerStar;
            }).slice(0, 4);
            if (nearbyStars.length >= 2) {
                constellations.push({
                    stars: [centerStar].concat(nearbyStars),
                    life: 180,
                    maxLife: 180
                });
            }
        }
    }, 10000);

    // 4. Satellites
    var satellites = [];
    setInterval(function () {
        if (tabJustActivated) return;
        if (Math.random() < 0.5) {
            var fromLeft = Math.random() > 0.5;
            satellites.push({
                x: fromLeft ? -10 : canvas.width + 10,
                y: Math.random() * canvas.height * 0.4 + 50,
                speed: (fromLeft ? 1 : -1) * (1.5 + Math.random()),
                active: true
            });
        }
    }, 30000);

    // 5. Star flares - random background star brightens
    var starFlares = [];
    setInterval(function () {
        if (tabJustActivated) return;
        if (Math.random() < 0.6 && stars.length > 0) {
            var star = stars[Math.floor(Math.random() * stars.length)];
            starFlares.push({
                x: star.x,
                y: star.y,
                life: 60,
                maxLife: 60
            });
        }
    }, 8000);

    // 6. Nebula clouds
    var nebulaClouds = [];
    setInterval(function () {
        if (tabJustActivated) return;
        if (Math.random() < 0.3) {
            nebulaClouds.push({
                x: -200,
                y: Math.random() * canvas.height,
                radius: 100 + Math.random() * 150,
                speed: 0.3 + Math.random() * 0.3,
                hue: Math.random() * 360,
                alpha: 0.03 + Math.random() * 0.03,
                life: 600,
                maxLife: 600
            });
        }
    }, 60000);

    canvas.style.pointerEvents = 'auto';

    canvas.addEventListener('click', function (e) {
        if (!document.body.classList.contains('dark-mode')) return;
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

    var vortex = { active: false, x: 0, y: 0, startTime: 0, color: null };
    var supernovas = [];
    var vortexColors = [
        { r: 255, g: 200, b: 100, name: 'gold' },
        { r: 100, g: 180, b: 255, name: 'blue' },
        { r: 255, g: 100, b: 150, name: 'pink' },
        { r: 150, g: 255, b: 150, name: 'green' },
        { r: 200, g: 150, b: 255, name: 'purple' },
        { r: 255, g: 255, b: 255, name: 'white' }
    ];

    canvas.addEventListener('mousedown', function (e) {
        if (!document.body.classList.contains('dark-mode')) return;
        var rect = canvas.getBoundingClientRect();
        vortex.active = true;
        vortex.x = e.clientX - rect.left;
        vortex.y = e.clientY - rect.top;
        vortex.startTime = Date.now();
        vortex.color = vortexColors[Math.floor(Math.random() * vortexColors.length)];
    });

    canvas.addEventListener('mousemove', function (e) {
        if (vortex.active) {
            var rect = canvas.getBoundingClientRect();
            vortex.x = e.clientX - rect.left;
            vortex.y = e.clientY - rect.top;
        }
    });

    canvas.addEventListener('mouseup', function () {
        if (vortex.active) {
            var holdTime = Date.now() - vortex.startTime;
            // Only trigger supernova if held for at least 200ms
            if (holdTime >= 200) {
                var intensity = Math.min(1, holdTime / 2000);
                var color = vortex.color;
                supernovas.push({
                    x: vortex.x,
                    y: vortex.y,
                    radius: 0,
                    maxRadius: 150 + intensity * 100,
                    life: 90,
                    maxLife: 90,
                    intensity: 0.3 + intensity * 0.7,
                    color: color,
                    particles: []
                });
                for (var i = 0; i < 20 + Math.floor(intensity * 30); i++) {
                    var angle = Math.random() * Math.PI * 2;
                    var speed = 2 + Math.random() * 4 * (0.5 + intensity);
                    supernovas[supernovas.length - 1].particles.push({
                        x: vortex.x,
                        y: vortex.y,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        life: 60 + Math.random() * 40,
                        radius: 1 + Math.random() * 2,
                        color: color
                    });
                }
            }
        }
        vortex.active = false;
    });

    canvas.addEventListener('mouseleave', function () {
        vortex.active = false;
    });

    var originalStarPositions = stars.map(function (s) {
        return { x: s.x, y: s.y };
    });

    function updateSupernovas() {
        supernovas.forEach(function (sn, snIndex) {
            sn.life--;
            var progress = 1 - sn.life / sn.maxLife;
            sn.radius = sn.maxRadius * Math.pow(progress, 0.5);
            
            if (sn.life > 0) {
                var alpha = (sn.life / sn.maxLife) * sn.intensity;
                var c = sn.color || { r: 255, g: 200, b: 100 };
                
                // Expanding shockwave
                ctx.beginPath();
                ctx.arc(sn.x, sn.y, sn.radius, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(' + c.r + ', ' + c.g + ', ' + c.b + ', ' + (alpha * 0.5) + ')';
                ctx.lineWidth = 3 * (1 - progress);
                ctx.stroke();
                
                // Inner glow
                if (progress < 0.3) {
                    var glowAlpha = alpha * (1 - progress / 0.3);
                    var gradient = ctx.createRadialGradient(sn.x, sn.y, 0, sn.x, sn.y, 50);
                    gradient.addColorStop(0, 'rgba(255, 255, 255, ' + glowAlpha + ')');
                    gradient.addColorStop(0.3, 'rgba(' + c.r + ', ' + c.g + ', ' + c.b + ', ' + (glowAlpha * 0.6) + ')');
                    gradient.addColorStop(1, 'rgba(' + Math.floor(c.r * 0.5) + ', ' + Math.floor(c.g * 0.3) + ', ' + Math.floor(c.b * 0.3) + ', 0)');
                    ctx.beginPath();
                    ctx.fillStyle = gradient;
                    ctx.arc(sn.x, sn.y, 50, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                // Particles
                sn.particles.forEach(function (p, pIndex) {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vx *= 0.98;
                    p.vy *= 0.98;
                    p.life--;
                    
                    if (p.life > 0) {
                        var pAlpha = p.life / 60;
                        var pc = p.color || { r: 255, g: 200, b: 100 };
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.radius * pAlpha, 0, Math.PI * 2);
                        ctx.fillStyle = 'rgba(' + pc.r + ', ' + pc.g + ', ' + pc.b + ', ' + pAlpha + ')';
                        ctx.fill();
                    }
                });
                sn.particles = sn.particles.filter(function (p) { return p.life > 0; });
            }
            
            if (sn.life <= 0) {
                supernovas.splice(snIndex, 1);
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
                    
                    if (vortex.active) {
                        var vdx = vortex.x - star.x;
                        var vdy = vortex.y - star.y;
                        var vdist = Math.sqrt(vdx * vdx + vdy * vdy);
                        if (vdist < 250 && vdist > 10) {
                            var angle = Math.atan2(vdy, vdx);
                            var swirlAngle = angle + Math.PI / 2;
                            var pullStrength = (250 - vdist) / 250 * 3;
                            var swirlStrength = (250 - vdist) / 250 * 4;
                            star.x += Math.cos(swirlAngle) * swirlStrength + (vdx / vdist) * pullStrength * 0.3;
                            star.y += Math.sin(swirlAngle) * swirlStrength + (vdy / vdist) * pullStrength * 0.3;
                        }
                    } else {
                        star.x += (targetX - star.x) * 0.05;
                        star.y += (targetY - star.y) * 0.05;
                    }
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

        updateSupernovas();

        // Vortex star effect - glowing star that grows while holding
        if (vortex.active) {
            var holdTime = Date.now() - vortex.startTime;
            var growthProgress = Math.min(1, holdTime / 2000);
            var starRadius = 5 + growthProgress * 15;
            var glowRadius = 30 + growthProgress * 70;
            var pulse = 1 + Math.sin(Date.now() * 0.01) * 0.1;
            var vc = vortex.color || { r: 255, g: 220, b: 150 };
            
            // Outer glow
            var gradient = ctx.createRadialGradient(vortex.x, vortex.y, 0, vortex.x, vortex.y, glowRadius * pulse);
            gradient.addColorStop(0, 'rgba(' + vc.r + ', ' + vc.g + ', ' + vc.b + ', ' + (0.6 + growthProgress * 0.3) + ')');
            gradient.addColorStop(0.2, 'rgba(' + vc.r + ', ' + vc.g + ', ' + vc.b + ', ' + (0.3 + growthProgress * 0.2) + ')');
            gradient.addColorStop(0.5, 'rgba(' + Math.floor(vc.r * 0.7) + ', ' + Math.floor(vc.g * 0.5) + ', ' + Math.floor(vc.b * 0.3) + ', ' + (0.1 + growthProgress * 0.1) + ')');
            gradient.addColorStop(1, 'rgba(' + Math.floor(vc.r * 0.5) + ', ' + Math.floor(vc.g * 0.3) + ', ' + Math.floor(vc.b * 0.2) + ', 0)');
            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.arc(vortex.x, vortex.y, glowRadius * pulse, 0, Math.PI * 2);
            ctx.fill();
            
            // Core star
            ctx.beginPath();
            ctx.fillStyle = 'rgba(' + Math.min(255, vc.r + 40) + ', ' + Math.min(255, vc.g + 40) + ', ' + Math.min(255, vc.b + 40) + ', 0.95)';
            ctx.arc(vortex.x, vortex.y, starRadius * pulse, 0, Math.PI * 2);
            ctx.fill();
            
            // Bright center
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            ctx.arc(vortex.x, vortex.y, starRadius * 0.4 * pulse, 0, Math.PI * 2);
            ctx.fill();
        }

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

        // === RENDER AMBIENT EFFECTS ===

        // 1. Comets
        comets.forEach(function (comet, index) {
            if (!comet.active) return;
            comet.x += Math.cos(comet.angle) * comet.speed;
            comet.y += Math.sin(comet.angle) * comet.speed;
            
            if (comet.x > canvas.width + 100 || comet.y > canvas.height + 100) {
                comet.active = false;
                return;
            }
            
            var gradient = ctx.createLinearGradient(
                comet.x, comet.y,
                comet.x - Math.cos(comet.angle) * comet.length,
                comet.y - Math.sin(comet.angle) * comet.length
            );
            gradient.addColorStop(0, 'hsla(' + comet.hue + ', 80%, 80%, 0.9)');
            gradient.addColorStop(0.3, 'hsla(' + comet.hue + ', 60%, 60%, 0.5)');
            gradient.addColorStop(1, 'hsla(' + comet.hue + ', 40%, 40%, 0)');
            
            ctx.beginPath();
            ctx.moveTo(comet.x, comet.y);
            ctx.lineTo(
                comet.x - Math.cos(comet.angle) * comet.length,
                comet.y - Math.sin(comet.angle) * comet.length
            );
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 3;
            ctx.stroke();
            
            // Comet head
            ctx.beginPath();
            ctx.arc(comet.x, comet.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = 'hsla(' + comet.hue + ', 100%, 90%, 1)';
            ctx.fill();
        });
        comets = comets.filter(function (c) { return c.active; });

        // 2. Constellations
        constellations.forEach(function (con, index) {
            con.life--;
            var alpha = Math.min(con.life / 30, (con.maxLife - con.life) / 30, 0.3);
            
            ctx.strokeStyle = 'rgba(150, 180, 255, ' + alpha + ')';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            for (var i = 0; i < con.stars.length - 1; i++) {
                ctx.moveTo(con.stars[i].x, con.stars[i].y);
                ctx.lineTo(con.stars[i + 1].x, con.stars[i + 1].y);
            }
            ctx.stroke();
        });
        constellations = constellations.filter(function (c) { return c.life > 0; });

        // 4. Satellites
        satellites.forEach(function (sat, index) {
            if (!sat.active) return;
            sat.x += sat.speed;
            
            if (sat.x < -20 || sat.x > canvas.width + 20) {
                sat.active = false;
                return;
            }
            
            ctx.beginPath();
            ctx.arc(sat.x, sat.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fill();
        });
        satellites = satellites.filter(function (s) { return s.active; });

        // 5. Star flares
        starFlares.forEach(function (flare, index) {
            flare.life--;
            var progress = 1 - flare.life / flare.maxLife;
            var size = Math.sin(progress * Math.PI) * 15;
            var alpha = Math.sin(progress * Math.PI) * 0.8;
            
            var gradient = ctx.createRadialGradient(flare.x, flare.y, 0, flare.x, flare.y, size);
            gradient.addColorStop(0, 'rgba(255, 255, 255, ' + alpha + ')');
            gradient.addColorStop(0.5, 'rgba(255, 240, 200, ' + (alpha * 0.5) + ')');
            gradient.addColorStop(1, 'rgba(255, 200, 100, 0)');
            
            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.arc(flare.x, flare.y, size, 0, Math.PI * 2);
            ctx.fill();
        });
        starFlares = starFlares.filter(function (f) { return f.life > 0; });

        // 6. Nebula clouds
        nebulaClouds.forEach(function (neb, index) {
            neb.life--;
            neb.x += neb.speed;
            
            var alpha = neb.alpha * Math.min(neb.life / 60, (neb.maxLife - neb.life) / 60, 1);
            var gradient = ctx.createRadialGradient(neb.x, neb.y, 0, neb.x, neb.y, neb.radius);
            gradient.addColorStop(0, 'hsla(' + neb.hue + ', 60%, 50%, ' + alpha + ')');
            gradient.addColorStop(0.5, 'hsla(' + neb.hue + ', 50%, 40%, ' + (alpha * 0.5) + ')');
            gradient.addColorStop(1, 'hsla(' + neb.hue + ', 40%, 30%, 0)');
            
            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.arc(neb.x, neb.y, neb.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        nebulaClouds = nebulaClouds.filter(function (n) { return n.life > 0; });

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
