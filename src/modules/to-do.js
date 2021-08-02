import project from './projects';

const todoFactory = function (title, description) {
	return { title, description };
};

const todo = (function () {
	const addTask = function (title, description, activeProjectName) {
		console.log('adding task');
		const newTodo = todoFactory(title, description);
		project.addTaskToActiveProject(newTodo, activeProjectName);
	};
	return { addTask };
})();

export default todo;
