import { isToday, isThisWeek, isThisMonth } from "date-fns";
import { storage } from "./storage";

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

let tasks = [];

export const createTask = (title, priorityLevel, dueDate, project) => {
    tasks.push(new Task(title, priorityLevel, dueDate, project));
    saveTasks();
} 

export const deleteTask = (task) => {
    tasks.splice(tasks.indexOf(task), 1);
    saveTasks();
}

export const editTask = (task, title, priorityLevel, dueDate, project) => {
    task.title = title;
    task.priorityLevel = priorityLevel;
    task.dueDate = dueDate;
    task.project = project;
    saveTasks();
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

export const saveTasks = () => storage.save("tasks", tasks);

export const loadTasks = () => {
    const storedTasks = storage.load("tasks") || [];
    tasks = [];
    storedTasks.forEach(task => {
        const taskObj = new Task(task.title, task.priorityLevel, new Date(task.dueDate), task.project);
        taskObj.isComplete = task.isComplete;
        tasks.push(taskObj);
    });
};