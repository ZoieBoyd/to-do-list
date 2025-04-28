import { format } from "date-fns";
import { getAllProjects } from "../modules/project";
import { createTask, editTask } from "../modules/tasks";
import { createTextElement } from "../modules/utils";
import { reloadCurrentPage } from "./nav-dom";

const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const modalTitle = document.getElementById("modal-title");
const submitButton = document.getElementById("submit-task-btn");
let modalMode = "add";
let taskToEdit;

export function renderModal() {
    const closeAddTaskButton = document.getElementById("close-modal-btn");
    closeAddTaskButton.addEventListener("click", () =>  dialog.close());
    renderProjectDropdown();
    handleSubmitButton();
}

export function renderAddTaskModal() {
    modalMode = "add";
    modalTitle.textContent = "Add new task";
    submitButton.textContent = "Create Task";
}

export function renderProjectDropdown() {
    const projectDropdown = document.getElementById("project-dropdown");
    projectDropdown.innerHTML = "";
    const projects = getAllProjects();
    for (const project of projects) {
        const projectOption = createTextElement("option", project.title);
        projectOption.value = project.title;
        projectDropdown.appendChild(projectOption);
    }
}

export function renderEditTaskModal(task) {
    modalMode = "edit";
    taskToEdit = task;
    modalTitle.textContent = "Edit Task";
    submitButton.textContent = "Edit Task";

    const taskTitle = document.getElementById("title-input");
    const projectTitle = document.getElementById("project-dropdown");
    const priorityLevel = document.getElementById("priority-dropdown");
    const dueDate = document.getElementById("due-date-input");

    /* Prefills the form with the task's current details */
    taskTitle.value = task.title;
    projectTitle.value = task.project;
    priorityLevel.value = task.priorityLevel;
    dueDate.value = format(task.dueDate, 'yyyy-MM-dd');
}

function handleSubmitButton() {
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        const formInputs = getFormInputs();
        if(modalMode === "add") {
            createTask(...formInputs);
        } else if (modalMode === "edit") {
            editTask(taskToEdit, ...formInputs);
        }
        reloadCurrentPage();
        dialog.close();
        form.reset();
        
    })
}

function getFormInputs() { 
    const taskTitle = document.getElementById("title-input").value;
    const projectTitle = document.getElementById("project-dropdown").value;
    const priorityLevel = document.getElementById("priority-dropdown").value;
    const dueDate = new Date(document.getElementById("due-date-input").value);
    return [taskTitle, priorityLevel, dueDate, projectTitle];
}