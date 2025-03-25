document.addEventListener("DOMContentLoaded", function () {
    let dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {
        let menu = dropdown.querySelector(".dropdown-menu");
        let timeoutId;

        function showMenu() {
            clearTimeout(timeoutId);
            document.querySelectorAll(".dropdown-menu").forEach(m => {
                if (m !== menu) {
                    m.style.opacity = "0";
                    m.style.visibility = "hidden";
                    setTimeout(() => m.style.display = "none", 300);
                }
            });

            menu.style.display = "grid";
            setTimeout(() => {
                menu.style.opacity = "1";
                menu.style.visibility = "visible";
            }, 100);
        }

        function hideMenu() {
            timeoutId = setTimeout(() => {
                menu.style.opacity = "0";
                menu.style.visibility = "hidden";
                setTimeout(() => menu.style.display = "none", 300);
            }, 300);
        }

        dropdown.addEventListener("mouseenter", showMenu);
        dropdown.addEventListener("mouseleave", hideMenu);
        menu.addEventListener("mouseenter", showMenu);
        menu.addEventListener("mouseleave", hideMenu);
    });
});
