import { getAllProjects } from "../modules/project";
import { getWeekTasks, getTodayTasks, getAllTasks, getMonthTasks, getTasksByProject} from "../modules/tasks";
import folder  from "../images/folder.svg";
import { renderNotes } from "./notes-dom";
import { renderTasks } from "./tasks-dom";
import { clearMainContent } from "../modules/utils";

export function loadNav() {
    loadProjectNavItems();
    handleTimeNavItems();
    handleProjectNavItems();
    handleNotesNav();
}

export function loadProjectNavItems() {
    const projectList = document.getElementById("project-nav-options");
    const projects = getAllProjects();
    for(const project of projects) {
        const projectName = project.title;
        const projectButton = document.createElement("button");
        projectButton.id = projectName;
        projectButton.classList.add("nav-option");
        const folderIcon = document.createElement("img");
        folderIcon.src = folder;
        folderIcon.classList.add("icon");
        projectButton.append(folderIcon, document.createTextNode(projectName));
        projectList.appendChild(projectButton);
    }
}
    
export function setActiveNavItem(activeButton) {
    const navButtons = document.querySelectorAll(".nav-option");
    navButtons.forEach(btn => btn.classList.remove("active"));
    activeButton.classList.add("active");
}
           
function handleTimeNavItems() {
   const timeNavItems = document.getElementById("time-nav-options");

   timeNavItems.addEventListener("click", (event) => {
        clearMainContent();
        const target = event.target.closest("button");
        if (!target) return; // Skip if click wasn't on a button
        setActiveNavItem(target);
        switch(target.id) {
            case "today-btn":
                renderTasks(() => getTodayTasks(), "Today");
                break;
            case "week-btn":
                renderTasks(() => getWeekTasks(), "This Week");
                break;
            case "month-btn":
                renderTasks(() => getMonthTasks(), "This Month");
                break;
            case "anytime-btn":
                renderTasks(() => getAllTasks(), "Anytime");
                break; 
        }
    });
}

function handleProjectNavItems() {
    const projectNavItems = document.getElementById("project-nav-options");
    projectNavItems.addEventListener("click", (event) => {
        const target = event.target.closest("button");
        if (!target) return; // Skip if click wasn't on a button
        clearMainContent();
        setActiveNavItem(target);
        renderTasks(() => getTasksByProject(target.id), target.id);
    });
}

function handleNotesNav() {
    const noteButton = document.getElementById("note-btn");
    noteButton.addEventListener("click", (event) => {
        clearMainContent();
        setActiveNavItem(document.getElementById("note-btn"));
        renderNotes();
    });
}

export function reloadCurrentPage() {
    const currentPage = document.querySelector(".active");
    currentPage.click();
}