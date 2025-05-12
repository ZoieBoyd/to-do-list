import { deleteTask, getTasksByProject } from "./tasks";

const projects = [
    "Default",
    "Test"
];

export const createProject = (title) => projects.push(title);

export const deleteProject = (title) => {
    projects.splice(projects.indexOf(title), 1)

    const projectTasks = getTasksByProject(title);
    for(const task of projectTasks) {
        deleteTask(task);
    }
};

export const renameProject = (oldTitle, newTitle) => {
    projects.splice(projects.indexOf(oldTitle), 1, newTitle);

    const projectTasks = getTasksByProject(oldTitle);
    for(const task of projectTasks) {
        task.project = newTitle;
    }
}

export const isExistingProject = (title) => 
    projects.some(project => project.trim().toLowerCase() === title.trim().toLowerCase());

export const getAllProjects = () => projects;