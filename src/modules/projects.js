const projects = (function () {
    let projects = [];

    function projectFactory(name) {
        return { projectName: name, todoList: [] };
    }

    const createProject = function (projectName) {
        const newProject = projectFactory(projectName);
        projects.push(newProject);
    };

    const deleteProject = function (name) {
        const indexOfProject = projects.findIndex((project) => {
            if (project.projectName === name) {
                return project;
            }
        });
        projects.splice(indexOfProject, 1);
    };

    const getProjects = function () {
        return projects;
    };

    return { createProject, deleteProject, getProjects };
})();

export default projects;
