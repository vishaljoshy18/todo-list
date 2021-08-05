import project from './projects';

const todoFactory = function (title, description, date) {
	return { title, description, date };
};

const todo = (function () {
	const addTask = function (title, description, date, activeProjectName) {
		console.log('adding task');
		const newTodo = todoFactory(title, description, _changeDateFormat(date));
		project.addTaskToActiveProject(newTodo, activeProjectName);
	};
	const _changeDateFormat = function (date) {
		const dateArray = date.split('-');
		const newFormat = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
		return newFormat;
	};
	return { addTask };
})();

export default todo;
