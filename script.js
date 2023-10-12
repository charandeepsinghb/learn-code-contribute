/* ******************************* Theme code ******************************** */
const DARK_THEME_LOCAL_ITEM = "darkTheme";

const localDarkMode = localStorage.getItem(DARK_THEME_LOCAL_ITEM);

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
const lightIcon = document.getElementById("lightIcon");
const darkIcon = document.getElementById("darkIcon");

if (darkThemeMq.matches || localDarkMode === "true") {
    setTheme("dark");
} else {
    setTheme("light");
}

function setTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    if (theme === "dark") {
        lightIcon.style.display = "inline";
        darkIcon.style.display = "none";
        localStorage.setItem(DARK_THEME_LOCAL_ITEM, "true");
    } else {
        lightIcon.style.display = "none";
        darkIcon.style.display = "inline";
        localStorage.setItem(DARK_THEME_LOCAL_ITEM, "false");
    }
}

darkThemeMq.addEventListener("change", e => {
    if (e.matches) {
        setTheme("dark");
    } else {
        setTheme("light");
    }
});


/* ******************************* Get component ******************************** */

const home = document.getElementById("home");

function getComponent(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
            home.innerHTML = response;
        },
        error: function (response) {
            home.innerHTML = response;
        }
    });
}

/* ******************************* Router ******************************** */

function redirectByHref() {
    const href = window.location.href;
    if (!href.includes("#/")) {
        getComponent("./components/main.html");
        return;
    }
    const url = window.location.href.substring(href.indexOf('#') + 2) + '.html';

    getComponent(url);
}
redirectByHref();
