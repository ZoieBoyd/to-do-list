import { createTextElement } from "../modules/utils";
import { clearMainContent } from "../modules/utils";
import { getNotes } from "../modules/notes";
import { deleteNote } from "../modules/notes";

import add from "../images/add.svg";

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
            createDeleteButton(note),
            createTextElement("h3", note["title"], "note-title"),
            createTextElement("p", note["content"], "note-content")
        );
        notesContainer.appendChild(noteElement);
    }
    mainContainer.append(notesContainer, createAddNoteButton());
}

function createDeleteButton(note) {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("note-delete-btn", "icon");
    deleteButton.addEventListener("click", () => {
        deleteNote(note);
        renderNotes();
    });
    return deleteButton;
}

function createAddNoteButton() {
    const addNoteButton = document.createElement("button");
    addNoteButton.classList.add("add-element-btn");
    const addIcon = document.createElement("img");
    addIcon.src = add; 
    addIcon.classList.add("icon");
    addNoteButton.append(addIcon, document.createTextNode("Add note"));
    return addNoteButton;
}