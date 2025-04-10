class Note {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }
}

const notes = [
    new Note("hello", "this is a test")
];

export function createNewNote(title, content) {
    notes.push(new Note(title, content));
}

export function deleteNote(note) {
    notes.splice(notes.indexOf(note), 1); 
}