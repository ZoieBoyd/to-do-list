class Note {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }
}

const notes = [
    new Note("hello", "this is a test"),
    new Note("goodbye", "this is a test this is a test this is a test this is a test this is a test this is a test"),
    new Note("hello", "this is a test"),
];

export const getNotes = () => notes;
export const createNewNote = (title, content) =>  notes.push(new Note(title, content));
export const deleteNote = (note) => notes.splice(notes.indexOf(note), 1);