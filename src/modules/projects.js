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
        const index = projects.findIndex((project) => {
            if (project.name == name) {
                return project;
            }
        });
        projects.splice(index, 1);
        console.log(index);
        console.log(projects);
    };
    return { addProject, delProject };
})();

export default project;
