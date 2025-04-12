import { getProjectNames } from "../modules/project";
import folder  from "../images/folder.svg";
import { loadProject } from "./tasks-dom";
import { renderNotes } from "./notes-dom";

const noteNavItem = document.getElementById("note-nav-item");

export function loadNav() {
    loadProjectNavItems();
    noteNavItem.addEventListener("click", () => {
        renderNotes();
    });
}

function loadProjectNavItems() {
    const projectList = document.getElementById("project-list");
    const projectTitles = getProjectNames();
    for (const name in projectTitles) {
        const projectName = projectTitles[name];
        const projectButton = document.createElement("button");
        const folderIcon = document.createElement("img");
        folderIcon.src = folder;
        folderIcon.classList.add("icon");
        projectButton.append(folderIcon, document.createTextNode(projectName));
        projectButton.addEventListener("click", () => {
            loadProject(projectName);
            setActiveNavItem(projectButton);
        });
        projectList.appendChild(projectButton);
    }
}

function setActiveNavItem(activeButton) {
    const navButtons = document.querySelectorAll("#nav * > button");
    navButtons.forEach(btn => btn.classList.remove("active"));
    activeButton.classList.add("active");
}