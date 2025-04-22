import { setTheme } from "./theme-dom";
import { loadNav } from "./nav-dom";
import { renderTasks } from "./tasks-dom";
import { getTasksByProject } from "../modules/tasks";

const themeSwitch = document.getElementById("theme-switch");

export function loadPageContent() {
    loadNav();
    renderTasks(() => getTasksByProject("Test"), "Test");
    themeSwitch.addEventListener("click", () => setTheme());
}