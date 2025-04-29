import { createNewNote } from "../modules/notes";
import { reloadCurrentPage } from "./nav-dom";

const dialog = document.getElementById("notes-modal");
const form = document.getElementById("note-form");

const submitButton = document.getElementById("submit-note-btn");

const noteTitle = document.getElementById("note-title-input");
const noteTextArea = document.getElementById("note-textarea");

export function renderAddNoteModal() {
    const closeAddNoteButton = document.getElementById("close-note-modal-btn");
    closeAddNoteButton.addEventListener("click", () => dialog.close());
    handleNoteSubmitButton();
}

function handleNoteSubmitButton() {
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        const formInputs = getNoteFormInputs();
        createNewNote(...formInputs);
        dialog.close();
        form.reset();
        reloadCurrentPage();
    });
}

const getNoteFormInputs = () =>
    [noteTitle.value, noteTextArea.value];