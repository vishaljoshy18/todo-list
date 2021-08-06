import project from './projects';

const todoFactory = function (title, description, date, completionStatus) {
	return { title, description, date, completionStatus };
};

const todo = (function () {
	const addTask = function (title, description, date, activeProjectName) {
		console.log('adding task');
		const newTodo = todoFactory(title, description, date, false);
		project.addTaskToActiveProject(newTodo, activeProjectName);
	};
	return { addTask };
})();

export default todo;
