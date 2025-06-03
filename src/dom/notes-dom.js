import { createTextElement } from "../modules/utils";
import { getNotes, deleteNote } from "../modules/notes";
import { reloadCurrentPage } from "../dom/nav-dom";

import add from "../images/add.svg";

const dialog = document.getElementById("notes-modal");
const mainContainer = document.getElementById("main-content");

export function renderNotes() {
    mainContainer.appendChild(createTextElement("h1", "Notes"));
    
    const notes = getNotes();
    const notesContainer = document.createElement("div");
    notesContainer.id = "notes-container";

    for (const note of notes) {
        notesContainer.appendChild(createNoteElement(note));
    }
    mainContainer.append(notesContainer, createAddNoteButton());
}

function createNoteElement(note) {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");

    noteElement.append(
        createDeleteButton(note),
        createTextElement("h3", note["title"], "note-title"),
        createTextElement("p", note["content"], "note-content")
    );

    return noteElement;
}

function createDeleteButton(note) {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("note-delete-btn", "image-btn", "icon");
    deleteButton.addEventListener("click", () => {
        deleteNote(note);
        reloadCurrentPage();
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
    addNoteButton.addEventListener("click", () => dialog.showModal());
    return addNoteButton;
}