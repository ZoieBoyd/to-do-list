import { createTextElement } from "../modules/utils";
import { clearMainContent } from "../modules/utils";
import { getNotes } from "../modules/notes";

const mainContainer = document.getElementById("main-content");
export function renderNotes() {
    const notes = getNotes();
    clearMainContent();
    mainContainer.appendChild(createTextElement("h1", "Notes"));
    const notesContainer = document.createElement("div");
    notesContainer.id = "notes-container";

    for (const note of notes) {
        const noteElement = document.createElement("div");
        noteElement.className = "note";
        noteElement.append(
            createTextElement("h4", note["title"], "note-title"),
            createTextElement("p", note["content"], "note-content")
        );
        notesContainer.appendChild(noteElement);
    }
    mainContainer.appendChild(notesContainer);
}
