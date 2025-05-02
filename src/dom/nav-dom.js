import { createProject, getAllProjects, isExistingProject } from "../modules/project";
import { getWeekTasks, getTodayTasks, getAllTasks, getMonthTasks, getTasksByProject} from "../modules/tasks";
import folder  from "../images/folder.svg";
import { renderNotes } from "./notes-dom";
import { renderTasks } from "./tasks-dom";
import { clearMainContent } from "../modules/utils";

const createProjectField = document.querySelector(".new-project-field");
const createProjectInput = document.getElementById("new-project-input");

export function loadNav() {
    loadProjectNavItems();
    handleTimeNavItems();
    handleProjectNavItems();
    handleNotesNav();
    handleCreateProjectNav();
}

export function loadProjectNavItems() {
    const projectList = document.getElementById("project-nav-options");
    projectList.innerHTML = "";
    const projects = getAllProjects();

    for(const project of projects) {
        const projectName = project;
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
    noteButton.addEventListener("click", () => {
        clearMainContent();
        setActiveNavItem(document.getElementById("note-btn"));
        renderNotes();
    });
}

function handleCreateProjectNav() {
    const createProjectButton = document.getElementById("new-project-btn");
    createProjectButton.addEventListener("click", () => showNewProjectInput());

    createProjectInput.addEventListener("keypress" , (event) => handleSubmitNewProject(event));
    createProjectInput.addEventListener("blur", () => {
        createProjectField.classList.add("hidden")
        clearProjectInput();
    });
}

function showNewProjectInput() {
    createProjectField.classList.remove("hidden");
    createProjectInput.focus();
}

function handleSubmitNewProject(event) {
    const projectName = createProjectInput.value;
    if(event.key === "Enter" && projectName && !isExistingProject(projectName)){
        createProject(projectName);
        createProjectField.classList.add("hidden");
        clearProjectInput();
        loadProjectNavItems();
        setActiveNavItem(document.getElementById(projectName));
        renderTasks(() => getTasksByProject(projectName), projectName);
    } else if (event.key ==="Enter" && isExistingProject(projectName)) {
        alert("Please choose a unique project name.")
        clearProjectInput();
    }
}

const clearProjectInput = () => createProjectInput.value = "";

export function reloadCurrentPage() {
    const currentPage = document.querySelector(".active");
    currentPage.click();
}