import { createProject, getAllProjects, isExistingProject, isValidProjectName, renameProject } from "../modules/project";
import { renderConfirmDeleteModal } from "./modals/projects-modal-dom";
import { getWeekTasks, getTodayTasks, getAllTasks, getMonthTasks, getTasksByProject} from "../modules/tasks";
import { renderTasks } from "./tasks-dom";
import { renderNotes } from "./notes-dom";
import { clearMainContent, createTextElement } from "../modules/utils";

import folder  from "../images/folder.svg";

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
        const projectButton = createProjectButton(project);
        const {kebabButton, kebabMenu} = createKebabButton(projectButton);

        projectButton.addEventListener("mouseenter", () => kebabButton.classList.remove("hidden"));
        projectButton.addEventListener("mouseleave", () => {
            kebabButton.classList.add("hidden");
            kebabMenu.classList.add("hidden");
        });

        projectButton.append(kebabButton, kebabMenu);
        projectList.appendChild(projectButton);
    }
}

function createProjectButton(name) {
    const button = document.createElement("button");
    button.id = name;
    button.classList.add("nav-option", "project-option");

    const folderIcon = document.createElement("img");
    folderIcon.src = folder;
    folderIcon.classList.add("icon");

    button.append(folderIcon, document.createTextNode(name));

    return button;
}

function createKebabButton(projectButton) {
    const button = document.createElement("button");
    button.classList.add("kebab-btn", "icon", "image-btn", "hidden");
    
    const menu = createKebabMenu(projectButton);

    button.addEventListener("click", (event) => {
        event.stopPropagation();
        menu.classList.toggle("hidden");
    });

    return {kebabButton: button, kebabMenu: menu};
}

function createKebabMenu(projectButton) {
    const menuContainer = document.createElement("div");
    menuContainer.classList.add("kebab-options-container", "hidden");

    const renameButton = createTextElement("button", "Rename");
    const deleteButton = createTextElement("button", "Delete");
    renameButton.dataset.action = "rename";
    deleteButton.dataset.action = "delete";
    menuContainer.append(renameButton, deleteButton);

    menuContainer.addEventListener("click", (event) => 
        handleKebabMenuClick(event, projectButton));

    return menuContainer;
}

function handleKebabMenuClick(event, projectButton) {
    event.stopPropagation();
        
    switch(event.target.dataset.action) {
        case "rename":
            handleRenameProject(projectButton);
            break;
        case "delete":
            renderConfirmDeleteModal(projectButton);
            break; 
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
    const projectName = createProjectInput.value.trim();

    if(event.key !== "Enter") return;
    if(isValidProjectName(projectName)) {
        createProject(projectName);
        createProjectField.classList.add("hidden");
        clearProjectInput();
        loadProjectNavItems();
        setActiveNavItem(document.getElementById(projectName));
        renderTasks(() => getTasksByProject(projectName), projectName);
    } else {
        handleInvalidProjectName();
    }
}


function handleRenameProject(projectButton) {
    const activeNavItemId = document.querySelector(".active").id;
    const oldProjectName = projectButton.id;
    
    const renameField = createRenameInput(oldProjectName);
    projectButton.replaceWith(renameField);
    
    const renameInput = renameField.querySelector("input");
    renameInput.focus();
    
    renameInput.addEventListener("keypress", (event) => {
        const newProjectName = renameInput.value.trim();
        if(event.key !== "Enter") return;
        
        if(isValidProjectName(newProjectName) || oldProjectName === newProjectName) {
            renameProject(oldProjectName, newProjectName);
            loadProjectNavItems();
            
            if (projectButton.classList.contains("active")) {
                const renamedProjectButton = document.getElementById(newProjectName);
                setActiveNavItem(renamedProjectButton);
            } else {
                setActiveNavItem(document.getElementById(activeNavItemId));
            }
            reloadCurrentPage(); 
        } else {
            handleInvalidProjectName();
        }
    });
    
    renameInput.addEventListener("blur", () => renameField.replaceWith(projectButton));
}

function handleInvalidProjectName() {
    alert("Please choose a unique and valid project name.")
    clearProjectInput();
}

function createRenameInput(projectName) {
    const renameField = document.createElement("div");
    renameField.classList.add("new-project-field");

    const renameInput = document.createElement("input");
    renameInput.classList.add("project-input");
    renameInput.value = projectName;
    renameInput.maxLength = "15";

    const folderIcon = document.createElement("img");
    folderIcon.classList.add("icon");
    folderIcon.src = folder;

    renameField.append(folderIcon, renameInput);
    return renameField;
}

const clearProjectInput = () => createProjectInput.value = "";

export function reloadCurrentPage() {
    const currentPage = document.querySelector(".active");
    if(currentPage) {
        currentPage.click();
    } else {
        const todayButton = document.getElementById("today-btn")
        todayButton.click();
    }
}