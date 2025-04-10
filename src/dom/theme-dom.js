const root = document.documentElement;
root.className = "dark"; // Dark Mode is the page's default setting (because it's superior)

export function setTheme() {
    const currentTheme = root.className === "dark" ? "light" : "dark";
    root.className = currentTheme;
}