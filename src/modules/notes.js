import { storage } from "./storage";

class Note {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }
}

let notes = [];

export const getNotes = () => notes;

export const createNote = (title, content) => {
    notes.push(new Note(title, content));
    saveNotes();
};

export const deleteNote = (note) => {
    notes.splice(notes.indexOf(note), 1);
    saveNotes();
};

export const saveNotes = () => storage.save("notes", notes);

export const loadNotes = () => notes = storage.load("notes") || [];