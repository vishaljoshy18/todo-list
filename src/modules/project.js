let projects = [];

function projectFactory(name) {
    return { projectName: name, todoList: [] };
}

const createProject = function (projectName) {
    const newProject = projectFactory(projectName);
    projects.push(newProject);
};

const deleteProject = function (name) {
    console.log(name);
    const indexOfProject = projects.findIndex((project) => {
        if (project.projectName === name) {
            return project;
        }
    });
    console.log(indexOfProject);
    projects.splice(indexOfProject, 1);
};

const getProjects = function () {
    return projects;
};

export { createProject, getProjects, deleteProject };
