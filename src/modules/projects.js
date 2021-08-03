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
		const index = _getIndexOf(name);
		projects.splice(index, 1);
		console.log(index);
		console.log(projects);
	};

	const addTaskToActiveProject = function (newTodo, activeProjectName) {
		const indexOfActiveProject = _getIndexOf(activeProjectName);
		projects[indexOfActiveProject].todo.push(newTodo);
		console.log(projects);
	};

	const getActiveProject = function (activeProjectName) {
		const indexOfActiveProject = _getIndexOf(activeProjectName);
		console.log(projects[indexOfActiveProject]);
		return projects[indexOfActiveProject];
	};

	const _getIndexOf = function (projectName) {
		const index = projects.findIndex((project) => {
			if (project.name == projectName) {
				return project;
			}
		});
		return index;
	};

	const deleteTodoFormProject = function (taskName, activeProjectName) {
		console.log('delete', taskName, 'from', activeProjectName);

		const indexOfActiveProject = _getIndexOf(activeProjectName);
		console.log(projects);
		projects[indexOfActiveProject].todo = projects[indexOfActiveProject].todo.filter(
			(todo) => todo.title != taskName
		);
		console.log(projects);
	};

	return {
		addProject,
		delProject,
		addTaskToActiveProject,
		getActiveProject,
		deleteTodoFormProject,
	};
})();

export default project;
