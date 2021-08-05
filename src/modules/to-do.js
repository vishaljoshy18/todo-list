import project from './projects';

const todoFactory = function (title, description, date) {
	return { title, description, date };
};

const todo = (function () {
	const addTask = function (title, description, date, activeProjectName) {
		console.log('adding task');
		const newTodo = todoFactory(title, description,date);
		project.addTaskToActiveProject(newTodo, activeProjectName);
	};
	return { addTask };
})();

export default todo;
