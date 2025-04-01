export function createTextElement(tag, text, id) {
    const textElement = document.createElement(tag);
    textElement.textContent = text;
    if (id) {
        textElement.id = id;
    }
    return textElement;
}