import { isToday, isThisWeek, isThisMonth } from "date-fns";

export class Task {
    constructor(title, priorityLevel, dueDate, project) {
        this.title = title;
        this.priorityLevel = priorityLevel; // "high", "medium" or "low"
        this.dueDate = dueDate; 
        this.isComplete = false;
        this.project = project;
    }

    toggleComplete() {
        this.isComplete = !this.isComplete;
    }
}

const tasks = [];

export const createTask = (title, priorityLevel, dueDate, project) => 
    tasks.push(new Task(title, priorityLevel, dueDate, project));

export const deleteTask = (task) =>
    tasks.splice(tasks.indexOf(task), 1);

export const editTask = (task, title, priorityLevel, dueDate, project) => {
    task.title = title;
    task.priorityLevel = priorityLevel;
    task.dueDate = dueDate;
    task.project = project;
};

export const getAllTasks = () => tasks;

export const getTasksByProject = (project) =>
    tasks.filter(task => task.project === project);

export const getTodayTasks = () => 
    tasks.filter(task => isToday(task.dueDate));

export const getWeekTasks = () =>
    tasks.filter(task => isThisWeek(task.dueDate));

export const getMonthTasks = () => 
    tasks.filter(task => isThisMonth(task.dueDate));

createTask("Attend doctor appointment", "low", new Date("2025-05-08"), "Default");
tasks[0].toggleComplete();
createTask("Write report", "medium", new Date("2025-05-30"), "Default");
createTask("Continue The Odin Project", "high", new Date("2025-05-22"), "Test");