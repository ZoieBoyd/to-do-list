/* TODO: 
- Add functionality to Create New Project nav bar button
- Add error prevention/handling for if new project is given same name as existing project
- Add local storage to allow the user to reaccess their added tasks & projects
- Refactor codebase to make it super ✨sexy✨ (follow SOLID design principles)
*/

import "./styles/styles.css";
import "./styles/nav.css";
import "./styles/tasks.css";
import "./styles/notes.css";
import "./styles/modal.css";

import { loadPageContent } from "./dom/dom";
import { renderModal } from "./dom/modal-dom";

loadPageContent();
renderModal();