import {isToday, isThisWeek, isThisMonth} from "date-fns";
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

export const createNewProject = (name) => projects.push(new Project(name));
export const getProjectNames = () => projects.map(projects => projects.name);
export const getToDoList = (projectName) =>
    projects.find(project => project.name === projectName).toDoList;

createTask(projects[0].toDoList, "Schedule a doctor's appointment", "high", new Date("2025-03-30"));
createTask(projects[0].toDoList, "Attend a meeting", "medium", new Date("2025-04-15"));
projects[0].toDoList[1].toggleComplete();
createTask(projects[0].toDoList, "Walk the dog", "low", new Date("2025-03-30"));
createTask(projects[1].toDoList, "Dance with Sam", "high", new Date("2025-04-16"));
createTask(projects[1].toDoList, "Cry", "low", new Date("2025-04-30"));

const getAllDates = () => projects.flatMap(project => project.toDoList.map(task => task.dueDate));
const getTodayDueDates = () => getAllDates().filter(isToday);
const getWeekDueDates = () => getAllDates().filter(isThisWeek);
const getMonthDueDates = () => getAllDates().filter(isThisMonth);