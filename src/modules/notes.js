class Note {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }
}

const notes = [
    new Note("hello", "this is a test"),
    new Note("goodbye", "this is a test"),
    new Note("abcdefg", "testing123 testing123 somebody once told me the world was gonna roll me i aint the sharpest tool in the shed she was looking kinda dumb with her finger and her thumb in the shape of an L on her forehead"),
    new Note("hellooo", "yaaas queen heellllo jeehhf shfesjfhsjdifh sdjfhsjdifsdh"),
    new Note("goodbye2", "this is a test"),
    new Note("goodbye3", "this is a test"),
    new Note("hello", "this is a test"),
    new Note("goodbye", "this is a test"),
    new Note("abcdefg", "testing123 testing123 somebody once told me the world was gonna roll me i aint the sharpest tool in the shed she was looking kinda dumb with her finger and her thumb in the shape of an L on her forehead"),
    new Note("hellooo", "yaaas queen heellllo jeehhf shfesjfhsjdifh sdjfhsjdifsdh"),
    new Note("goodbye2", "this is a test"),
    new Note("goodbye3", "this is a test"),
    new Note("hello", "this is a test"),
    new Note("goodbye", "this is a test"),
    new Note("abcdefg", "testing123 testing123 somebody once told me the world was gonna roll me i aint the sharpest tool in the shed she was looking kinda dumb with her finger and her thumb in the shape of an L on her forehead"),
    new Note("hellooo", "yaaas queen heellllo jeehhf shfesjfhsjdifh sdjfhsjdifsdh"),
    new Note("goodbye2", "this is a test"),
    new Note("goodbye3", "this is a test"),
    new Note("goodbye3", "this is a test"),
];

export function getNotes() {
    return notes;
}

export function createNewNote(title, content) {
    notes.push(new Note(title, content));
}

export function deleteNote(note) {
    notes.splice(notes.indexOf(note), 1); 
}