/* TODO: 
- Allow users to edit notes
- Add local storage to allow the user to reaccess their added tasks & projects
- Refactor codebase to make it super ✨sexy✨ (follow SOLID design principles)
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

loadPageContent();
renderTaskModal();
renderAddNoteModal();
handleProjectModalButtons();