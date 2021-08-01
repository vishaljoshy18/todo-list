let projects = [];

function createProject(name) {
    return { name, todo: [] };
}

const project = (function () {
    const addProject = function (name) {
        const newProject = createProject(name);
        projects.push(newProject);
        console.log(projects);
    };
    const delProject = function (name) {
        const index = getIndexOf(name);
        projects.splice(index, 1);
        console.log(index);
        console.log(projects);
    };
    const addTodoToActiveProject = function (newTodo, activeProjectName) {
        const indexOfActiveProject = getIndexOf(activeProjectName);
        projects[indexOfActiveProject].todo.push(newTodo);
        console.log(projects);
    };

    const getActiveProject = function (activeProjectName) {
        const indexOfActiveProject = getIndexOf(activeProjectName);
        console.log(projects[indexOfActiveProject]);
        return projects[indexOfActiveProject];
    };

    const getIndexOf = function (projectName) {
        const index = projects.findIndex((project) => {
            if (project.name == projectName) {
                return project;
            }
        });
        return index;
    };

    return { addProject, delProject, addTodoToActiveProject, getActiveProject };
})();

export default project;
