/* TODO: 
- Refactor codebase to make it super ✨sexy✨ (follow SOLID design principles)
*/

import "./styles/styles.css";
import "./styles/nav.css";
import "./styles/tasks.css";
import "./styles/notes.css";
import "./styles/modal.css";

import { createTask, getTodayTasks, loadTasks, saveTasks } from "./modules/tasks";
import { renderTasks } from "./dom/tasks-dom";
import { renderTaskModal } from "./dom/modals/tasks-modal-dom";
import { createProject, loadProjects, saveProjects } from "./modules/project";
import { handleProjectModalButtons } from "./dom/modals/projects-modal-dom";
import { createNote, loadNotes, saveNotes } from "./modules/notes";
import { renderAddNoteModal } from "./dom/modals/notes-modal-dom";
import { loadNav } from "./dom/nav-dom";
import { loadTheme, saveTheme } from "./dom/theme-dom";
import { storage } from "./modules/storage";

// Bootstrap logic
(() => {
    if(!storage.exists("hasVisited")) { // Behaviour for user's first time load
        setupDefaultAppData();
        storage.save("hasVisited", "true");
    }
    
    loadProjects();
    loadTasks();
    loadNotes();
    loadTheme();
    
    loadNav();
    renderTasks(() => getTodayTasks(), "Today");
    
    renderTaskModal();
    renderAddNoteModal();
    handleProjectModalButtons();
})();

function setupDefaultAppData() {
    createProject("Default");
    createTask("This is a test task", "medium", new Date(), "Default");
    createNote("This is a test note", "Feel free to delete it.");

    saveProjects();
    saveTasks();
    saveNotes();
    saveTheme("dark");
}