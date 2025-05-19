const root = document.documentElement;
const themeToggle = document.getElementById("theme-switch");

export const setTheme = () => {
    const currentTheme = root.className === "dark" ? "light" : "dark";
    root.className = currentTheme;
    saveTheme(currentTheme);
};

export const saveTheme = (currentTheme) =>
    localStorage.setItem("theme", JSON.stringify(currentTheme));

export const loadTheme = () => {
    root.className = JSON.parse(localStorage.getItem("theme"));
    themeToggle.checked = root.className === "dark";
};