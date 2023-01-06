var scrollEventHandler = function () {
    window.scroll(0, window.pageYOffset)
}

window.addEventListener("scroll", scrollEventHandler, false);

let mode = localStorage.getItem("theme");
function toggleMode() {
    if (mode === "dark") { // disable dark
        document.body.style.setProperty("--bg", "#FFFFFF");
        document.body.style.setProperty("--bg-accent", "#F9F9F9");
        document.body.style.setProperty("--text", "#000000");
        document.body.style.setProperty("--accent", "#ffbf00");
        document.body.style.setProperty("--link-text", "#0000ff");
        document.body.style.setProperty("--icon", "#000000");
        mode = "light";
        localStorage.setItem("theme", "light");
    } else if (mode === "light") { // enable dark
        document.body.style.setProperty("--bg", "#000000");
        document.body.style.setProperty("--bg-accent", "#101010");
        document.body.style.setProperty("--text", "#ffffff");
        document.body.style.setProperty("--accent", "#ffbf00");
        document.body.style.setProperty("--link-text", "#0000ff");
        document.body.style.setProperty("--icon", "#ffffff");
        mode = "dark";
        localStorage.setItem("theme", "dark");
    } else {
        mode = "dark";
        localStorage.setItem("theme", "dark");
        toggleMode();
    }
    mode = localStorage.getItem("theme");
}