class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }
}

const projects = [
    new Project("Default", " "),
    new Project("Test", " ")
];

const createProject = (title, description) => new Project(title, description);

export const getAllProjects = () => projects;