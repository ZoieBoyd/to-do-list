import { getAllProjects } from "../modules/project";
import { createTextElement } from "../modules/utils";

const dialog = document.querySelector("dialog");

export function renderAddTaskModal() { 
    const closeAddTaskButton = document.getElementById("close-modal-btn");
    closeAddTaskButton.addEventListener("click", () =>  dialog.close());
    const projectDropdown = document.getElementById("project-dropdown");
    const projects = getAllProjects();
    for (const project of projects) {
        projectDropdown.appendChild(createTextElement("option", project.title));
    }
}

