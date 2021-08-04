import project from './projects';
import todo from './to-do';

const projectDisplay = (function () {
	const onClickAddNewProject = function () {
		console.log('add project click ');
		_openPopUpForm();
		const form = document.querySelector('#add-project-form');
		form.addEventListener('submit', __addNewProject, { once: true });
	};

	const __addNewProject = function (event) {
		event.preventDefault();
		const projectName = document.querySelector('#project-name-input').value;
		console.log('Adding ', projectName);
		project.addProject(projectName);
		_addProjectToDisplay(projectName);
		_closePopUpForm();
	};

	const _addProjectToDisplay = function (name) {
		const projectDisplay = document.querySelector('#project-display');
		_clearProjectSelection();
		const projectDiv = _createProjectDiv(name);
		projectDisplay.appendChild(projectDiv);
		todoDisplay.updateProjectHeader();
		todoDisplay.updateTasksDisplay();
	};

	const _createProjectDiv = function (name) {
		const projectDiv = document.createElement('div');
		projectDiv.textContent = name;
		projectDiv.setAttribute('id', 'active-project');
		projectDiv.setAttribute('data-name', name);
		const deleteButton = document.createElement('button');
		deleteButton.textContent = 'x';
		projectDiv.appendChild(deleteButton);
		projectDiv.addEventListener(
			'click',
			(e) => {
				if (e.target != deleteButton) {
					__setActiveProject(e);
				}
			},
			false
		);

		deleteButton.addEventListener('click', __deleteSelectedProject, { once: true });

		return projectDiv;
	};

	const __setActiveProject = function (e) {
		console.log('Activate Project');
		_clearProjectSelection();
		e.target.setAttribute('id', 'active-project');
		todoDisplay.updateProjectHeader();
		todoDisplay.updateTasksDisplay();
	};

	const _clearProjectSelection = function () {
		const projectDisplay = document.querySelector('#project-display');
		projectDisplay.childNodes.forEach((element) => {
			element.setAttribute('id', 'project');
		});
	};

	const __deleteSelectedProject = function (e) {
		console.log(e.target.parentNode.dataset.name);
		project.delProject(e.target.parentNode.dataset.name);
		_deleteProjectFromDisplay(e);
	};

	const _deleteProjectFromDisplay = function (e) {
		const projectDiv = e.target.parentNode;
		const projectDisplay = document.querySelector('#project-display');
		projectDisplay.removeChild(projectDiv);
	};

	const _openPopUpForm = function () {
		const form = document.querySelector('.project-form-popup');
		form.style.display = 'block';
		document.querySelector('#overlay').style.display = 'block';
		window.onclick = (event) => {
			const overlay = document.getElementById('overlay');
			if (event.target == overlay) {
				document.querySelector('#add-project-form').reset();
				_closePopUpForm();
			}
		};
	};

	const _closePopUpForm = function () {
		const form = document.querySelector('.project-form-popup');
		form.style.display = 'none';
		document.querySelector('#add-project-form').reset();
		document.querySelector('#overlay').style.display = 'none';
	};

	return { onClickAddNewProject };
})();

const todoDisplay = (function () {
	const updateProjectHeader = function () {
		const activeProject = document.querySelector('#active-project');
		const header = document.querySelector('#selected-project-name');
		header.textContent = activeProject.dataset.name;
	};

	const onClickAddNewTask = function () {
		console.log('add task...');
		_openPopUpForm();
		const form = document.querySelector('#add-task-form');
		form.addEventListener(
			'submit',
			__addNewTask,
			// (event) => {
			// 	event.preventDefault();
			// 	const title = document.querySelector('#task-title').value;
			// 	const description = document.querySelector('#task-description').value;
			// 	const activeProjectName = document.querySelector('#active-project').dataset.name;
			// 	__addNewTask(title, description, activeProjectName);
			// 	form.reset();
			// 	_closePopUpForm();
			// },
			{ once: true }
		);
	};

	const __addNewTask = function (e) {
		e.preventDefault();
		const title = document.querySelector('#task-title').value;
		const description = document.querySelector('#task-description').value;
		const activeProjectName = document.querySelector('#active-project').dataset.name;
		todo.addTask(title, description, activeProjectName);
		console.log(title, description);
		_closePopUpForm();
		updateTasksDisplay();
	};

	const updateTasksDisplay = function () {
		_clearTaskDisplay();
		const activeProjectName = document.querySelector('#active-project').dataset.name;
		const activeProject = project.getActiveProject(activeProjectName);
		console.log('adding tasks to display....', activeProject.todo);
		activeProject.todo.forEach((task) => {
			_addTaskToDisplay(task.title, task.description);
		});
	};

	const _clearTaskDisplay = function () {
		const taskDisplay = document.querySelector('#task-display');
		while (taskDisplay.firstChild) {
			taskDisplay.removeChild(taskDisplay.lastChild);
		}
	};

	const _addTaskToDisplay = function (title, description) {
		const taskDisplay = document.querySelector('#task-display');

		taskDisplay.appendChild(_createTaskDiv(title, description));
	};

	const _createTaskDiv = function (title, description) {
		const div = document.createElement('div');
		div.setAttribute('id', 'task');
		div.setAttribute('data-name', title);
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		const displayTitle = document.createElement('title');
		const displayDescription = document.createElement('description');
		const deleteTaskButton = document.createElement('button');
		displayTitle.textContent = title;
		displayDescription.textContent = description;
		deleteTaskButton.textContent = 'x';
		div.appendChild(checkbox);
		div.appendChild(displayTitle);
		div.appendChild(displayDescription);
		div.appendChild(deleteTaskButton);
		deleteTaskButton.addEventListener('click', _deleteTask);
		checkbox.addEventListener(
			'click',
			(e) => {
				console.log(e.target.parentNode);
				e.target.parentNode.style.color = 'red';
				checkbox.disabled = true;
			},
			{ once: true }
		);
		return div;
	};
	const _deleteTask = function (e) {
		console.log(e.target.parentNode);
		const activeProject = document.querySelector('#active-project');
		project.deleteTodoFormProject(e.target.parentNode.dataset.name, activeProject.dataset.name);
		updateTasksDisplay();
	};

	const _openPopUpForm = function () {
		const form = document.querySelector('.task-form-popup');
		form.style.display = 'block';
		document.querySelector('#overlay').style.display = 'block';
		window.onclick = (event) => {
			const overlay = document.getElementById('overlay');
			if (event.target == overlay) {
				document.querySelector('#add-project-form').reset();
				_closePopUpForm();
			}
		};
	};

	const _closePopUpForm = function () {
		const form = document.querySelector('.task-form-popup');
		form.style.display = 'none';
		document.querySelector('#add-task-form').reset();
		document.querySelector('#overlay').style.display = 'none';
	};

	return { updateProjectHeader, onClickAddNewTask, updateTasksDisplay };
})();

const loadUI = function () {
	document
		.querySelector('#add-new-project')
		.addEventListener('click', projectDisplay.onClickAddNewProject, false);
	document
		.querySelector('#add-new-task')
		.addEventListener('click', todoDisplay.onClickAddNewTask, false);
};

export default loadUI;
