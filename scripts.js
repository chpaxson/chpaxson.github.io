let mode = localStorage.getItem("theme");
function setMode() {
    if (localStorage.getItem("theme") === "dark") { // reapply dark
        document.body.style.setProperty("--bg", "#000000");
        document.body.style.setProperty("--bg-accent", "#090909");
        document.body.style.setProperty("--text", "#FFFFFF");
        document.body.style.setProperty("--accent", "#ffbf00");
        document.body.style.setProperty("--accent-accent", "#ffd65e");
        document.body.style.setProperty("--link-text", "#5555ff");
    }
}
function darkToggle() {
    if (mode === "dark") { // disable dark
        document.body.style.setProperty("--bg", "#FFFFFF");
        document.body.style.setProperty("--bg-accent", "#F9F9F9");
        document.body.style.setProperty("--text", "#000000");
        document.body.style.setProperty("--accent", "#ffbf00");
        document.body.style.setProperty("--accent-accent", "#ffd65e");
        document.body.style.setProperty("--link-text", "#0000ff");
        mode = "light";
        localStorage.setItem("theme", "light");
    } else if (mode === "light") { // enable dark
        document.body.style.setProperty("--bg", "#000000");
        document.body.style.setProperty("--bg-accent", "#090909");
        document.body.style.setProperty("--text", "#FFFFFF");
        document.body.style.setProperty("--accent", "#ffbf00");
        document.body.style.setProperty("--accent-accent", "#ffd65e");
        document.body.style.setProperty("--link-text", "#5555ff");
        mode = "dark";
        localStorage.setItem("theme", "dark");
    } else {
        mode = "dark";
        localStorage.setItem("theme", "dark"); }
    mode = localStorage.getItem("theme");
}