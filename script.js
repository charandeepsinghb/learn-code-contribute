/* ******************************* Theme code ******************************** */
const DARK_THEME_LOCAL_ITEM = "darkTheme";

let isLocalDarkMode = localStorage.getItem(DARK_THEME_LOCAL_ITEM) === "true";

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
const lightIconElem = document.getElementById("lightIcon");
const darkIconElem = document.getElementById("darkIcon");

if (darkThemeMq.matches || isLocalDarkMode) {
    setTheme("dark");
} else {
    setTheme("light");
}

function setTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    if (theme === "dark") {
        // Theme switch icon
        lightIconElem.style.display = "inline";
        darkIconElem.style.display = "none";

        localStorage.setItem(DARK_THEME_LOCAL_ITEM, "true");
        isLocalDarkMode = true;
    } else {
        lightIconElem.style.display = "none";
        darkIconElem.style.display = "inline";
        localStorage.setItem(DARK_THEME_LOCAL_ITEM, "false");
        isLocalDarkMode = false;
    }
    switchImagesByTheme();
}

// Theme change event listener
darkThemeMq.addEventListener("change", e => {
    if (e.matches) {
        setTheme("dark");
    } else {
        setTheme("light");
    }
});

// Swich images by theme
function switchImagesByTheme() {
    // To load images after page redraw
    setTimeout(() => {
        // Internal Id can be same between components
        let githubLogo = document.getElementById("githubLogo");
        if (!githubLogo) {
            return;
        }
        if (darkThemeMq.matches || isLocalDarkMode) {
            githubLogo.setAttribute("src", "assets/github-mark-theme_dark.svg");
        } else {
            githubLogo.setAttribute("src", "assets/github-mark.svg");
        }
    }, 0);
}


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
            switchImagesByTheme();
            overlayLoaderOff();
        },
        error: function (response) {
            errorToast.showToast();
        }
    });
}

function isHrefUrlSame(url) {
    const urlAfterHref = window.location.hash.substring(2);
    if (url === "./" + urlAfterHref  + ".html") {
        return true;
    }

    return false;
}


/* ******************************* Router ******************************** */

function redirectByHref() {
    const hash = window.location.hash;

    // Load main component if not any
    if (!hash) {
        getComponent("./components/main.html");
        return;
    }
    if (!hash.includes("#/components")) {
        getComponent("./components/main.html");
        return;
    }
    const url = hash.substring(2) + ".html";

    getComponent(url);
}
// When the page is loaded
redirectByHref();

// Router listner back forward

addEventListener('popstate', (state)=>{
    // console.log(state.currentTarget.location);
    redirectByHref();
});


/* ******************************* Overlay ******************************** */

function overlayLoaderOn() {
    document.getElementById("overlay").style.display = "block";
}

function overlayLoaderOff() {
    document.getElementById("overlay").style.display = "none";
}
