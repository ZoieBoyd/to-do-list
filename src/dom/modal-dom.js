import { getAllProjects } from "../modules/project";
import { createTask } from "../modules/tasks";
import { createTextElement } from "../modules/utils";

const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const projectDropdown = document.getElementById("project-dropdown");

export function renderAddTaskModal() { 
    const closeAddTaskButton = document.getElementById("close-modal-btn");
    closeAddTaskButton.addEventListener("click", () =>  dialog.close());
    renderProjectDropdown();
    handleSubmitButton();
}

export function renderProjectDropdown() {
    projectDropdown.innerHTML = "";
    const projects = getAllProjects();
    for (const project of projects) {
        const projectOption = createTextElement("option", project.title);
        projectOption.value = project.title;
        projectDropdown.appendChild(projectOption);
    }
}

function handleSubmitButton() {
    const submitButton = document.getElementById("submit-task-btn");
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        const formInputs = getFormInputs();
        createTask(...formInputs);
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