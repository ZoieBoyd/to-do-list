import { storage } from "./storage";
import { deleteTask, getTasksByProject, saveTasks } from "./tasks";

let projects = [];

export const createProject = (title) => {
    projects.push(title);
    saveProjects();
}

export const deleteProject = (title) => {
    projects.splice(projects.indexOf(title), 1)
    
    const projectTasks = getTasksByProject(title);
    for(const task of projectTasks) {
        deleteTask(task);
    }

    saveProjects();
    saveTasks();
};

export const renameProject = (oldTitle, newTitle) => {
    projects.splice(projects.indexOf(oldTitle), 1, newTitle);

    const projectTasks = getTasksByProject(oldTitle);
    for(const task of projectTasks) {
        task.project = newTitle;
    }

    saveProjects();
    saveTasks();
}

export const isExistingProject = (title) => 
    projects.some(project => project.trim().toLowerCase() === title.trim().toLowerCase());

export const isValidProjectName = (projectName) => projectName && !isExistingProject(projectName);

export const getAllProjects = () => projects;

export const saveProjects = () => storage.save("projects", projects);

export const loadProjects = () => projects = storage.load("projects") || [];