import { createTextElement, clearMainContent } from "../modules/utils";
import { deleteTask, getAllTasks } from "../modules/tasks";
import { renderAddTaskModal } from "./modal-dom";
import { format } from "date-fns"; 

import add from "../images/add.svg";

const dialog = document.querySelector("dialog");
const toDoContainer = document.getElementById("main-content");

export function renderTasks(filter, title) {
    clearMainContent();
    toDoContainer.appendChild(createTextElement("h1", title));

    const filterFunc = filter();
    
    for(const task of filterFunc) {
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task-container");

        setPriorityColor(task, taskContainer);

        taskContainer.append(
            createCompleteCheckbox(task),
            createTextElement("p", task.title, "task-title"),
            createTextElement("p", format(task.dueDate, 'MMM dd'), "task-date"),
            createEditButton(),
            createDeleteButton(task, filter, title)
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
        renderAddTaskModal();
        dialog.showModal()
    });
    return addTaskButton;
}

function createDeleteButton(task, filter, title) {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("task-delete-btn", "icon");

    deleteButton.addEventListener("click", () => {
        deleteTask(task);
        renderTasks(filter, title);
    }); 

    return deleteButton;
}

function createEditButton () {
    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn", "icon");
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