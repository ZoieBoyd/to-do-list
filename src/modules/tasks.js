export class Task {
    constructor(title, priorityLevel, dueDate) {
        this.title = title;
        this.priorityLevel = priorityLevel; // "high", "medium" or "low"
        this.dueDate = dueDate; 
        this.isComplete = false;
    }

    toggleComplete() {
        this.isComplete = !this.isComplete;
    }
}

export const deleteTask = (toDoList, task) => 
    toDoList.splice(toDoList.indexOf(task), 1);

export const createTask = (toDoList, title, priority, dueDate) =>
    toDoList.push(new Task(title, priority, dueDate));

export const editTask = (toDoList, index, title, dueDate, priority) =>
    toDoList.splice(index, 1, new Task(title, priority, dueDate));