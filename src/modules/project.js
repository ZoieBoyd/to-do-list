import { format, compareAsc } from "date-fns";
import { createTask } from "./tasks";

class Project {
    constructor(name) {
        this.name = name;
        this.toDoList = [];
    }
}

const projects = [
    new Project("Default"),
    new Project("The Odin Project"),
    new Project("Project 3")
];

export function createNewProject(name) {
    projects.push(new Project(name));
}

export function getProjectNames() {
    return projects.map(projects => projects.name);
}

export function getToDoList(projectName) {
    return projects.find(project => project.name === projectName).toDoList;
}

createTask(projects[0].toDoList, "Schedule a doctor's appointment", "high", format(new Date("2025-03-30"), 'MMM dd'));
createTask(projects[0].toDoList, "Attend a meeting", "medium", format(new Date("2025-03-30"), 'MMM dd'));
projects[0].toDoList[1].toggleComplete();
createTask(projects[0].toDoList, "Walk the dog", "low", format(new Date("2025-03-30"), 'MMM dd'));