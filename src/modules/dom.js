import { getProjectNames } from "./project";
import { getToDoList } from "./project";
import { createTextElement } from "./utils";
import { deleteTask } from "./tasks";
import { createNewProject } from "./project";

import folder  from "../images/folder.svg";
import add from "../images/add.svg";

const root = document.documentElement;
root.className = "dark"; // Dark Mode is the page's default setting (because it's superior)

const toDoContainer = document.getElementById("to-do-container");
const clearMainContent = () => toDoContainer.replaceChildren();
const dialog = document.querySelector("dialog");
const themeSwitch = document.getElementById("theme-switch");

const red = "#EA6365";
const orange = "#EA9B63";
const green = "#7AEA63";

export function loadPageContent() {
    loadNav();
    loadProject("Default");
    themeSwitch.addEventListener("click", () => setTheme());
}

function loadNav() {
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
    //projectList.appendChild(createAddProjectButton());
}

function setActiveNavItem(activeButton) {
    const navButtons = document.querySelectorAll("#nav * > button");
    navButtons.forEach(btn => btn.classList.remove("active"));
    activeButton.classList.add("active");
}

function loadProject(project) {
    const toDo = getToDoList(project);
    clearMainContent();
    renderTasks(toDo, project);
}

function setTheme() {
    const currentTheme = root.className === "dark" ? "light" : "dark";
    root.className = currentTheme;
}

function renderTasks(toDoList, project) {
    // TODO: Move this somewhere more appropriate
    toDoContainer.appendChild(createTextElement("h1", project));
    
    for(const task of toDoList) {
        const taskContainer = document.createElement("div");
        taskContainer.className = "task-container";
        
        switch(task["priorityLevel"]) {
            case "high":
                taskContainer.style.borderLeftColor = red;
                break;
            case "medium":
                taskContainer.style.borderLeftColor = orange;
                break;
            case "low":
                taskContainer.style.borderLeftColor = green;
                break;
        }

        const taskName = createTextElement("p", task["title"], "task-title");
        const taskDueDate = createTextElement("p", task["dueDate"], "task-date");

        // TODO: Move this somewhere more appropriate
        const closeAddTaskButton = document.getElementById("close-modal-btn");
        closeAddTaskButton.addEventListener("click", () =>  dialog.close());

        taskContainer.append(
            createCompleteCheckbox(task),
            taskName,
            taskDueDate,
            createEditButton(),
            createDeleteButton(toDoList, task, project)
        );
        toDoContainer.append(taskContainer);
    }
    toDoContainer.appendChild(createAddTaskButton());
}

function createDeleteButton(toDoList, task, project) {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn", "icon");
    deleteButton.addEventListener("click", () => {
        deleteTask(toDoList, task)
        loadProject(project);
    }); 
    return deleteButton;
}

function createEditButton () {
    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn", "icon");
    //editButton.addEventListener("click", () => dialog.showModal());
    return editButton;
}

function createCompleteCheckbox(task) { 
    const completeCheckbox = document.createElement("input");
    completeCheckbox.type = "checkbox";
    completeCheckbox.classList = "complete-checkbox";
    completeCheckbox.checked = task["isComplete"]; 
    completeCheckbox.onclick = () => task.toggleComplete(); 
    return completeCheckbox;
}

function createAddTaskButton() {
    const addTaskButton = document.createElement("button");
    addTaskButton.id = "add-task-btn";
    const addIcon = document.createElement("img");
    addIcon.src = add;
    addIcon.classList.add("icon");
    addTaskButton.append(addIcon, document.createTextNode("Add task"));
    addTaskButton.addEventListener("click", () => dialog.showModal());
    return addTaskButton;
}

/*
function createAddProjectButton() {
    const addProjectButton = createTextElement("button", "Create New Project");
    addProjectButton.addEventListener("click", () => {
    });
    return addProjectButton;
*/