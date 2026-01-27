document.addEventListener("DOMContentLoaded", function () {
    var toggleBtn = document.getElementById("mode-toggle");
    var iconMoon = toggleBtn.querySelector('.icon-moon');
    var iconSun = toggleBtn.querySelector('.icon-sun');

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
