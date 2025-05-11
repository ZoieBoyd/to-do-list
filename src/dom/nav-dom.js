import { createProject, deleteProject, getAllProjects, isExistingProject } from "../modules/project";
import { getWeekTasks, getTodayTasks, getAllTasks, getMonthTasks, getTasksByProject} from "../modules/tasks";
import folder  from "../images/folder.svg";
import { renderNotes } from "./notes-dom";
import { renderTasks } from "./tasks-dom";
import { clearMainContent, createTextElement } from "../modules/utils";

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
        projectButton.classList.add("nav-option", "project-option");

        const folderIcon = document.createElement("img");
        folderIcon.src = folder;
        folderIcon.classList.add("icon");
        const kebabButton = document.createElement("button");
        const kebabOptions = document.createElement("div");

        const renameProjectOption = createTextElement("button", "Rename");
        const deleteProjectOption = createTextElement("button", "Delete");
        renameProjectOption.addEventListener("click", (event) => console.log(`Rename ${event.target.closest(".project-option").id}`));
        deleteProjectOption.addEventListener("click", (event) => handleDeleteProject(event));

        kebabOptions.append(renameProjectOption, deleteProjectOption);
        kebabOptions.classList.add("hidden", "kebab-options-container");

        kebabButton.classList.add("kebab-btn", "icon", "image-btn");
        kebabButton.addEventListener("click", (event) => {
            event.stopPropagation();
            kebabOptions.classList.toggle("hidden");
        })

        projectButton.addEventListener("mouseleave", () => kebabOptions.classList.add("hidden"));

        projectButton.append(folderIcon, document.createTextNode(projectName), kebabButton);
        kebabButton.append(kebabOptions);
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

function handleRenameProject(event) {
    const projectName = event.target.closest(".project-option").id;
}

function handleDeleteProject(event) {
    const projectButton = event.target.closest(".project-option");
    const projectName = projectButton.id;
    deleteProject(projectName);
    projectButton.remove();
    
    // Renders the "Today" page if the currently rendered page is the deleted project
    if (event.target.closest(".project-option").classList.contains("active")) {
        const todayBtn = document.getElementById("today-btn");
        setActiveNavItem(todayBtn);
        renderTasks(() => getTodayTasks(), "Today")
    } else { // Reload the current page to prevent deleted project's tasks being present on time-based pages
        reloadCurrentPage();
    }
}

const clearProjectInput = () => createProjectInput.value = "";

export function reloadCurrentPage() {
    const currentPage = document.querySelector(".active");
    console.log(currentPage);
    currentPage.click();
}