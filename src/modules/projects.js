let projects = [];

function createProject(name, todo) {
	return {
		name,
		todo,
		addTask: function (newTask) {
			this.todo.push(newTask);
		},
		deleteTask: function (taskName) {
			this.todo = this.todo.filter((todo) => todo.title != taskName);
			console.log(this);
		},
	};
}

const project = (function () {
	const addProject = function (name, todo = []) {
		const newProject = createProject(name, todo);
		projects.push(newProject);
		console.log(projects);
		_addProjectToLocalStorage();
	};

	const _addProjectToLocalStorage = function () {
		localStorage.setItem('storedProjects', JSON.stringify(projects));
	};

	const getProjectFromLocalStorage = function () {
		if (localStorage.length != 0) {
			const projectsFromStorage = JSON.parse(localStorage.getItem('storedProjects'));
			console.log('form storage', projectsFromStorage);
			projectsFromStorage.forEach((project) => {
				addProject(project.name, project.todo);
			});
		}
	};

	const delProject = function (name) {
		const index = _getIndexOfproject(name);
		projects.splice(index, 1);
		_addProjectToLocalStorage();
	};

	const getActiveProject = function (activeProjectName) {
		const indexOfActiveProject = _getIndexOfproject(activeProjectName);
		console.log(projects[indexOfActiveProject]);
		_sortTasksByDate(projects[indexOfActiveProject].todo);
		return projects[indexOfActiveProject];
	};

	const _sortTasksByDate = function (todoArray) {
		if (todoArray.length > 1) {
			console.log(todoArray[0].date);
			todoArray.sort(function (a, b) {
				return new Date(a.date) - new Date(b.date);
			});
		}
	};

	const _getIndexOfproject = function (projectName) {
		const index = projects.findIndex((project) => {
			if (project.name == projectName) {
				return project;
			}
		});
		return index;
	};

	const addTaskToActiveProject = function (newTodo, activeProjectName) {
		const indexOfActiveProject = _getIndexOfproject(activeProjectName);
		projects[indexOfActiveProject].addTask(newTodo);
		_addProjectToLocalStorage();
		console.log(projects);
	};

	const deleteTaskFromProject = function (taskName, activeProjectName) {
		const indexOfActiveProject = _getIndexOfproject(activeProjectName);
		console.log(projects);
		projects[indexOfActiveProject].deleteTask(taskName);
		console.log(projects);
		_addProjectToLocalStorage();
	};

	const checkForDuplicateProjectName = function (projectName) {
		const index = _getIndexOfproject(projectName);
		if (index) {
			return false;
		}
		return true;
	};
	const checkForDuplicateTask = function (taskTitle, projectName) {
		const projectIndex = _getIndexOfproject(projectName);
		const taskIndex = _getTaskIndex(projectIndex, taskTitle);
		if (taskIndex) {
			return false;
		}
		return true;
	};
	const getProjects = function () {
		return projects;
	};
	const taskCompleted = function (taskTitle, projectName) {
		const projectIndex = _getIndexOfproject(projectName);
		const taskIndex = _getTaskIndex(projectIndex, taskTitle);
		projects[projectIndex].todo[taskIndex].completionStatus = true;
		_addProjectToLocalStorage();
	};
	const _getTaskIndex = function (projectIndex, taskTitle) {
		const taskIndex = projects[projectIndex].todo.findIndex((todo) => {
			if (todo.title === taskTitle) {
				return todo;
			}
		});
		return taskIndex;
	};

	return {
		getProjects,
		addProject,
		delProject,
		addTaskToActiveProject,
		getActiveProject,
		deleteTaskFromProject,
		checkForDuplicateProjectName,
		checkForDuplicateTask,
		getProjectFromLocalStorage,
		taskCompleted,
	};
})();

export default project;
