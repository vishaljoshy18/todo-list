import project from './projects';
import todo from './to-do';
import { format } from 'date-fns';

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
		if (_checkIfDuplicate(projectName)) {
			alert('project with same exists ');
		} else {
			_clearProjectDisplay();
			console.log('Adding ', projectName);
			project.addProject(projectName);
			updateProjectToDisplay();
		}
		_closePopUpForm();
	};

	const _checkIfDuplicate = function (projectName) {
		return project.checkForDuplicateProjectName(projectName);
	};
	const updateProjectToDisplay = function () {
		const projects = project.getProjects();
		console.log('project', projects);
		projects.forEach((project) => {
			const projectDisplay = document.querySelector('#project-display');
			_clearProjectSelection();
			const projectDiv = _createProjectDiv(project.name);
			projectDisplay.appendChild(projectDiv);
			todoDisplay.updateProjectHeader();
			todoDisplay.updateTasksDisplay();
		});
	};

	const _clearProjectDisplay = function () {
		const projectDisplay = document.querySelector('#project-display');
		while (projectDisplay.firstChild) {
			projectDisplay.removeChild(projectDisplay.lastChild);
		}
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
		if (!document.querySelector('#active-project')) {
			console.log('no active project');
			const projectDisplay = document.querySelector('#project-display');

			if (document.querySelector('#project')) {
				projectDisplay.firstChild.setAttribute('id', 'active-project');
				console.log(projectDisplay);
			}
		}
		todoDisplay.updateProjectHeader();
		todoDisplay.updateTasksDisplay();
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

	return { onClickAddNewProject, updateProjectToDisplay };
})();

const todoDisplay = (function () {
	const updateProjectHeader = function () {
		const activeProject = document.querySelector('#active-project');

		const header = document.querySelector('#selected-project-name');
		if (!activeProject) {
			header.textContent = '';
		} else {
			header.textContent = activeProject.dataset.name;
		}
	};

	const onClickAddNewTask = function () {
		console.log('add task...');
		_openPopUpForm();
		const form = document.querySelector('#add-task-form');
		_setMinDate();
		form.addEventListener('submit', __addNewTask, { once: true });
	};
	const _setMinDate = function () {
		const taskFormDate = document.querySelector('#task-date');
		const today = new Date();
		const dd = String(today.getDate()).padStart(2, '0');
		const mm = String(today.getMonth() + 1).padStart(2, '0');
		const yyyy = today.getFullYear();
		const date = `${yyyy}-${mm}-${dd}`;
		taskFormDate.setAttribute('min', date);
	};

	const __addNewTask = function (e) {
		e.preventDefault();
		const title = document.querySelector('#task-title').value;
		const description = document.querySelector('#task-description').value;
		const date = document.querySelector('#task-date').value;
		const activeProjectName = document.querySelector('#active-project').dataset.name;
		if (_checkIfDuplicateTask(title, activeProjectName)) {
			alert('task with same name exists');
		} else {
			todo.addTask(title, description, date, activeProjectName);
			console.log(title, description, date);
			updateTasksDisplay();
		}
		_closePopUpForm();
	};
	const _checkIfDuplicateTask = function (title, activeProjectName) {
		return project.checkForDuplicateTask(title, activeProjectName);
	};
	const updateTasksDisplay = function () {
		_clearTaskDisplay();
		if (document.querySelector('#active-project')) {
			const activeProjectName = document.querySelector('#active-project').dataset.name;
			const activeProject = project.getActiveProject(activeProjectName);
			console.log('adding tasks to display....', activeProject.todo);
			activeProject.todo.forEach((task) => {
				_addTaskToDisplay(task.title, task.description, task.date, task.completionStatus);
			});
		}
	};

	const _clearTaskDisplay = function () {
		const taskDisplay = document.querySelector('#task-display');
		while (taskDisplay.firstChild) {
			taskDisplay.removeChild(taskDisplay.lastChild);
		}
	};

	const _addTaskToDisplay = function (title, description, date, completionStatus) {
		const taskDisplay = document.querySelector('#task-display');
		taskDisplay.appendChild(_createTaskDiv(title, description, date, completionStatus));
	};

	const _createTaskDiv = function (title, description, date, completionStatus) {
		const div = document.createElement('div');
		div.setAttribute('id', 'task');
		div.setAttribute('data-name', title);
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		const displayTitle = document.createElement('div');
		displayTitle.setAttribute('id', 'display-task-title');
		const displayDescription = document.createElement('div');
		displayDescription.setAttribute('id', 'display-task-description');
		const displayDate = document.createElement('div');
		displayDate.setAttribute('id', 'display-task-date');

		const deleteTaskButton = document.createElement('button');
		displayTitle.textContent = title;
		displayDescription.textContent = description;
		displayDate.textContent = _changeDateFormat(date);
		deleteTaskButton.textContent = 'x';
		div.appendChild(checkbox);
		div.appendChild(displayTitle);
		div.appendChild(displayDescription);
		div.appendChild(displayDate);
		div.appendChild(deleteTaskButton);
		deleteTaskButton.addEventListener('click', _deleteTask);

		if (completionStatus === true) {
			div.classList.add('completed-task');
			checkbox.checked = true;
			checkbox.disabled = true;
		}

		checkbox.addEventListener(
			'click',
			(e) => {
				console.log(e.target.parentNode.dataset.name);
				e.target.parentNode.classList.add('completed-task');
				const activeProjectName = document.querySelector('#active-project').dataset.name;
				project.taskCompleted(e.target.parentNode.dataset.name, activeProjectName);
				checkbox.disabled = true;
			},
			{ once: true }
		);
		return div;
	};
	const _changeDateFormat = function (date) {
		const dateArray = date.split('-');
		const formattedDate = format(
			new Date(dateArray[0], dateArray[1] - 1, dateArray[2]),
			'dd/MM/yyyy'
		);
		return formattedDate;
	};

	const _deleteTask = function (e) {
		console.log(e.target.parentNode);
		const activeProject = document.querySelector('#active-project');
		project.deleteTaskFromProject(e.target.parentNode.dataset.name, activeProject.dataset.name);
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
	project.getProjectFromLocalStorage();
	projectDisplay.updateProjectToDisplay();
};

export default loadUI;
