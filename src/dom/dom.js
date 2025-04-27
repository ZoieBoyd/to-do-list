import { setTheme } from "./theme-dom";
import { loadNav } from "./nav-dom";
import { renderTasks } from "./tasks-dom";
import { getTodayTasks } from "../modules/tasks";

const themeSwitch = document.getElementById("theme-switch");

export function loadPageContent() {
    loadNav();
    renderTasks(() => getTodayTasks(), "Today");
    themeSwitch.addEventListener("click", () => setTheme());
}