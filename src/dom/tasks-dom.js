import { createTextElement, clearMainContent } from "../modules/utils";
import { deleteTask, saveTasks } from "../modules/tasks";
import { renderAddTaskModal, renderEditTaskModal, renderProjectDropdown } from "./modals/tasks-modal-dom";
import { format } from "date-fns"; 

import add from "../images/add.svg";
import { reloadCurrentPage } from "./nav-dom";

const dialog = document.getElementById("tasks-modal");
const toDoContainer = document.getElementById("main-content");

export function renderTasks(filter, title) {
    clearMainContent();
    toDoContainer.appendChild(createTextElement("h1", title));

    const tasks = filter();
    
    for(const task of tasks) {
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task-container");

        setPriorityColor(task, taskContainer);

        taskContainer.append(
            createCompleteCheckbox(task),
            createTextElement("p", task.title, "task-title"),
            createTextElement("p", format(task.dueDate, 'MMM dd'), "task-date"),
            createEditButton(task),
            createDeleteButton(task)
        );
        toDoContainer.appendChild(taskContainer);
    }
    toDoContainer.appendChild(createAddTaskButton());
}

function setPriorityColor(task, taskContainer) {
    switch(task["priorityLevel"]) {
        case "high":
            taskContainer.classList.add("high-priority")
            break;
        case "medium":
            taskContainer.classList.add("medium-priority");
            break;
        case "low":
            taskContainer.classList.add("low-priority");
            break;
    }
}

function createAddTaskButton() {
    const addTaskButton = document.createElement("button");
    addTaskButton.classList.add("add-element-btn");    
    const addIcon = document.createElement("img");
    addIcon.src = add;
    addIcon.classList.add("icon");
    addTaskButton.append(addIcon, document.createTextNode("Add task"));
    addTaskButton.addEventListener("click", () => {
        renderProjectDropdown();
        renderAddTaskModal();
        dialog.showModal()
    });
    return addTaskButton;
}

function createDeleteButton(task) {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("task-delete-btn", "icon");

    deleteButton.addEventListener("click", () => {
        deleteTask(task);
        reloadCurrentPage();
    }); 

    return deleteButton;
}

function createEditButton(task) {
    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn", "icon");
    editButton.addEventListener("click", () => {
        renderProjectDropdown(task);
        renderEditTaskModal(task);
        dialog.showModal();
    });
    return editButton;
}

function createCompleteCheckbox(task) { 
    const completeContainer = document.createElement("div");
    completeContainer.classList.add("complete-container");

    const completeCheckbox = document.createElement("input");
    completeCheckbox.id = `${task.title.toLowerCase().replace(/\s/g, '-')}-checkbox`;

    const completeLabel = document.createElement("label");
    completeLabel.htmlFor = `${task.title.replace(/\s/g, '-').toLowerCase()}-checkbox`;
    completeCheckbox.type = "checkbox";
    completeCheckbox.checked = task["isComplete"]; 
    completeCheckbox.onclick = () => { 
        task.toggleComplete(); 
        saveTasks(); 
    }; 
    completeContainer.append(completeCheckbox, completeLabel);
    return completeContainer;
}