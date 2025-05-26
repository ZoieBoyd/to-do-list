/* TODO: 
- Refactor codebase to make it super ✨sexy✨ (follow SOLID design principles)
- Add responsivity to website design, making it accessible for most screen sizes.
*/

import "./styles/styles.css";
import "./styles/nav.css";
import "./styles/tasks.css";
import "./styles/notes.css";
import "./styles/modal.css";

import { loadPageContent } from "./dom/dom";
import { renderTaskModal } from "./dom/tasks-modal-dom";
import { renderAddNoteModal } from "./dom/notes-modal-dom";
import { handleProjectModalButtons } from "./dom/projects-modal-dom";
import { createProject, loadProjects, saveProjects } from "./modules/project";
import { createTask, loadTasks, saveTasks } from "./modules/tasks";
import { loadTheme, saveTheme } from "./dom/theme-dom";
import { createNote, loadNotes, saveNotes } from "./modules/notes";

if(!localStorage.getItem("hasVisited")) { // Behaviour for user's first time load
    setupDefaultAppData();
    localStorage.setItem("hasVisited", "true");
}

loadProjects();
loadTasks();
loadNotes();
loadTheme();
loadPageContent();
renderTaskModal();
renderAddNoteModal();
handleProjectModalButtons();

function setupDefaultAppData() {
    createProject("Default");
    createTask("This is a test task", "medium", new Date(), "Default");
    createNote("This is a test note", "Feel free to delete it.");

    saveProjects();
    saveTasks();
    saveNotes();
    saveTheme("dark");
}