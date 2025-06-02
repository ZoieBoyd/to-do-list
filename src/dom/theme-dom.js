import { storage } from "../modules/storage";

const root = document.documentElement;

const themeToggle = document.getElementById("theme-switch");
themeToggle.addEventListener("click", () => setTheme());

export const setTheme = () => {
    const currentTheme = root.className === "dark" ? "light" : "dark";
    root.className = currentTheme;
    saveTheme(currentTheme);
};

export const saveTheme = (currentTheme) => storage.save("theme", currentTheme);

export const loadTheme = () => {
    root.className = storage.load("theme");
    themeToggle.checked = root.className === "dark";
};