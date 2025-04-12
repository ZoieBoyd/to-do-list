import { setTheme } from "./theme-dom";
import { loadNav } from "./nav-dom";
import { loadProject } from "./tasks-dom";

const themeSwitch = document.getElementById("theme-switch");

export function loadPageContent() {
    loadNav();
    loadProject("Default");
    themeSwitch.addEventListener("click", () => setTheme());
}