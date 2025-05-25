import { deleteProject } from "../modules/project";
import { reloadCurrentPage } from "./nav-dom";

let projectToDelete;
const confirmDeleteModal = document.getElementById("delete-project-modal");

export function renderConfirmDeleteModal(projectButton) {
    confirmDeleteModal.showModal();
    console.log();
    projectToDelete = projectButton;
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

function handleDeleteProject(projectButton) {
    const projectName = projectButton.id;
    deleteProject(projectName);
    projectButton.remove();
    reloadCurrentPage();
}