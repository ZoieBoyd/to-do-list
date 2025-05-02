const projects = [
    "Default",
    "Test"
];

export const createProject = (title) => projects.push(title);

//export const deleteProject = (title) => projects.splice(indexOf(title));

export const isExistingProject = (title) => 
    projects.some(project => project.trim().toLowerCase() === title.trim().toLowerCase());

export const getAllProjects = () => projects;