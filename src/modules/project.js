let projects = [];

function projectFactory(name) {
    return { projectName: name, todoList: [] };
}

const createProject = function (projectName) {
    const newProject = projectFactory(projectName);
    projects.push(newProject);
    console.log(projects);
};

const getProjects = function () {
    return projects;
};

export { createProject, getProjects };
