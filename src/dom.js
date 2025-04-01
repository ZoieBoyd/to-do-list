import { getProjectNames } from "./project";
import { getToDoList } from "./project";
import { createTextElement } from "./utils";
import { deleteTask } from "./tasks";

const root = document.documentElement;
root.className = "dark"; 

const toDoContainer = document.getElementById("to-do-container");
const clearMainContent = () => toDoContainer.replaceChildren();
const dialog = document.querySelector("dialog");

export function loadNav() {
    const projectList = document.getElementById("project-list");
    const projectTitles = getProjectNames();
    for (const name in projectTitles) {
        const projectName = projectTitles[name];
        const projectTitle = createTextElement("button", projectName);
        projectTitle.addEventListener("click", () => loadProject(projectName));
        projectList.appendChild(projectTitle);
    }
}

function renderTasks(toDoList, project) {
    for(const task of toDoList) {
        const taskContainer = document.createElement("div");
        taskContainer.className = "task-container";
        const taskName = createTextElement("p", task["title"]);
        const taskDueDate = createTextElement("p", task["dueDate"]);
        taskContainer.append(
            createCompleteCheckbox(task),
            taskName,
            taskDueDate,
            createEditButton(),
            createDeleteButton(toDoList, task, project)
        );
        toDoContainer.appendChild(taskContainer);
    }
}

function createDeleteButton(toDoList, task, project) {
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.addEventListener("click", () => {
        deleteTask(toDoList, task)
        loadProject(project);
    }); 
    return deleteButton;
}

function createEditButton () {
    const editButton = document.createElement("button");
    editButton.className = "edit-btn";
    editButton.addEventListener("click", () => {
        dialog.showModal();
    });
    return editButton;
}

function createCompleteCheckbox(task) { 
    const completeCheckbox = document.createElement("input");
    completeCheckbox.type = "checkbox";
    completeCheckbox.checked = task["isComplete"]; 
    completeCheckbox.onclick = () => task.toggleComplete(); 
    return completeCheckbox;
}

function loadProject(project) {
    const toDo = getToDoList(project);
    clearMainContent();
    renderTasks(toDo, project);
}