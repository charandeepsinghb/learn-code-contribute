/* ******************************* Theme code ******************************** */
const DARK_THEME_LOCAL_ITEM = "darkTheme";

const isLocalDarkMode = localStorage.getItem(DARK_THEME_LOCAL_ITEM);

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
const lightIconElem = document.getElementById("lightIcon");
const darkIconElem = document.getElementById("darkIcon");

if (darkThemeMq.matches || isLocalDarkMode === "true") {
    setTheme("dark");
} else {
    setTheme("light");
}

function setTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    if (theme === "dark") {
        lightIconElem.style.display = "inline";
        darkIconElem.style.display = "none";
        localStorage.setItem(DARK_THEME_LOCAL_ITEM, "true");
    } else {
        lightIconElem.style.display = "none";
        darkIconElem.style.display = "inline";
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


/* ******************************* Toast notification ******************************** */

const errorToast = Toastify({
    text: "Error occurred",
    duration: 2000,
    style: {
        background: "#ff3333",
    },
});


/* ******************************* Get component ******************************** */

const home = document.getElementById("home");

function getComponent(url) {
    if (isHrefUrlSame(url)) {
        return;
    }
    overlayLoaderOn();
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
            home.innerHTML = response;
            overlayLoaderOff();
        },
        error: function (response) {
            errorToast.showToast();
        }
    });
}

function isHrefUrlSame(url) {
    const href = window.location.href;
    const urlAfterHref = window.location.href.substring(href.indexOf('#') + 2);
    if (url === "./" + urlAfterHref  + ".html") {
        return true;
    }

    return false;
}


/* ******************************* Router ******************************** */

function redirectByHref() {
    const href = window.location.href;
    if (!href.includes("#/")) {
        getComponent("./components/main.html");
        return;
    }
    const url = window.location.href.substring(href.indexOf('#') + 2) + ".html";

    getComponent(url);
}
// When the page is loaded
redirectByHref();


/* ******************************* Overlay ******************************** */

function overlayLoaderOn() {
    document.getElementById("overlay").style.display = "block";
}

function overlayLoaderOff() {
    document.getElementById("overlay").style.display = "none";
}
