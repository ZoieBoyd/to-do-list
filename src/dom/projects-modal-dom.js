import { deleteProject } from "../modules/project";
import { setActiveNavItem, reloadCurrentPage } from "./nav-dom";
import { renderTasks } from "./tasks-dom";
import { getTodayTasks } from "../modules/tasks";

let projectToDelete;
const confirmDeleteModal = document.getElementById("delete-project-modal");

export function renderConfirmDeleteModal(event) {
    confirmDeleteModal.showModal();
    projectToDelete = event;
}

export function handleProjectModalButtons() {
    const cancelButton = document.getElementById("cancel-delete-btn");
    cancelButton.addEventListener("click", () => confirmDeleteModal.close());
    
    const deleteButton = document.getElementById("confirm-delete-btn");
    deleteButton.addEventListener("click", () => {
        confirmDeleteModal.close();
        handleDeleteProject(projectToDelete)
    });
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