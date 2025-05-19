import { createNote } from "../modules/notes";
import { reloadCurrentPage } from "./nav-dom";

const dialog = document.getElementById("notes-modal");
const form = document.getElementById("note-form");

const submitButton = document.getElementById("submit-note-btn");

const noteTitle = document.getElementById("note-title-input");
const noteTextArea = document.getElementById("note-textarea");

export const renderAddNoteModal = () => {
    const closeAddNoteButton = document.getElementById("close-note-modal-btn");
    closeAddNoteButton.addEventListener("click", () => {
        dialog.close();
        form.reset();
    });
    handleNoteSubmitButton();
};

const handleNoteSubmitButton = () => {
    submitButton.addEventListener("click", (event) => {
        if(!form.checkValidity()) return;
        event.preventDefault();
        const formInputs = getNoteFormInputs();
        createNote(...formInputs);
        dialog.close();
        form.reset();
        reloadCurrentPage();
    });
};

const getNoteFormInputs = () =>
    [noteTitle.value, noteTextArea.value];