/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/display-controller.js":
/*!*******************************************!*\
  !*** ./src/modules/display-controller.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/modules/projects.js");
/* harmony import */ var _to_do__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./to-do */ "./src/modules/to-do.js");



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
			console.log('Adding ', projectName);
			_projects__WEBPACK_IMPORTED_MODULE_0__.default.addProject(projectName);
			_addProjectToDisplay(projectName);
		}
		_closePopUpForm();
	};
	const _checkIfDuplicate = function (projectName) {
		return _projects__WEBPACK_IMPORTED_MODULE_0__.default.checkForDuplicateProjectName(projectName);
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
		_projects__WEBPACK_IMPORTED_MODULE_0__.default.delProject(e.target.parentNode.dataset.name);
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
			_to_do__WEBPACK_IMPORTED_MODULE_1__.default.addTask(title, description, date, activeProjectName);
			console.log(title, description, date);
			updateTasksDisplay();
		}
		_closePopUpForm();
	};
	const _checkIfDuplicateTask = function (title, activeProjectName) {
		return _projects__WEBPACK_IMPORTED_MODULE_0__.default.checkForDuplicateTask(title, activeProjectName);
	};
	const updateTasksDisplay = function () {
		_clearTaskDisplay();
		const activeProjectName = document.querySelector('#active-project').dataset.name;
		const activeProject = _projects__WEBPACK_IMPORTED_MODULE_0__.default.getActiveProject(activeProjectName);
		console.log('adding tasks to display....', activeProject.todo);
		activeProject.todo.forEach((task) => {
			_addTaskToDisplay(task.title, task.description, task.date);
		});
	};

	const _clearTaskDisplay = function () {
		const taskDisplay = document.querySelector('#task-display');
		while (taskDisplay.firstChild) {
			taskDisplay.removeChild(taskDisplay.lastChild);
		}
	};

	const _addTaskToDisplay = function (title, description, date) {
		const taskDisplay = document.querySelector('#task-display');
		taskDisplay.appendChild(_createTaskDiv(title, description, date));
	};

	const _createTaskDiv = function (title, description, date) {
		const div = document.createElement('div');
		div.setAttribute('id', 'task');
		div.setAttribute('data-name', title);
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		const displayTitle = document.createElement('div');
		const displayDescription = document.createElement('div');
		const displayDate = document.createElement('div');
		const deleteTaskButton = document.createElement('button');
		displayTitle.textContent = title;
		displayDescription.textContent = description;
		displayDate.textContent = date;
		deleteTaskButton.textContent = 'x';
		div.appendChild(checkbox);
		div.appendChild(displayTitle);
		div.appendChild(displayDescription);
		div.appendChild(displayDate);
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
		_projects__WEBPACK_IMPORTED_MODULE_0__.default.deleteTodoFormProject(e.target.parentNode.dataset.name, activeProject.dataset.name);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadUI);


/***/ }),

/***/ "./src/modules/projects.js":
/*!*********************************!*\
  !*** ./src/modules/projects.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
	const checkForDuplicateProjectName = function (projectName) {
		const index = _getIndexOf(projectName);
		if (index) {
			return false;
		}
		return true;
	};
	const checkForDuplicateTask = function (taskTitle, projectName) {
		const projectIndex = _getIndexOf(projectName);
		const taskIndex = projects[projectIndex].todo.findIndex((todo) => {
			if (todo.title === taskTitle) {
				return todo;
			}
		});
		if (taskIndex) {
			return false;
		}
		return true;
	};
	return {
		addProject,
		delProject,
		addTaskToActiveProject,
		getActiveProject,
		deleteTodoFormProject,
		checkForDuplicateProjectName,
		checkForDuplicateTask,
	};
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (project);


/***/ }),

/***/ "./src/modules/to-do.js":
/*!******************************!*\
  !*** ./src/modules/to-do.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/modules/projects.js");


const todoFactory = function (title, description, date) {
	return { title, description, date };
};

const todo = (function () {
	const addTask = function (title, description, date, activeProjectName) {
		console.log('adding task');
		const newTodo = todoFactory(title, description, date);
		_projects__WEBPACK_IMPORTED_MODULE_0__.default.addTaskToActiveProject(newTodo, activeProjectName);
	};
	return { addTask };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (todo);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_display_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/display-controller */ "./src/modules/display-controller.js");


(0,_modules_display_controller__WEBPACK_IMPORTED_MODULE_0__.default)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O2tFQ2pGVTs7QUFFakM7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLHFFQUE4QjtBQUNoQztBQUNBLFVBQVU7QUFDVixDQUFDOztBQUVELGlFQUFlLElBQUksRUFBQzs7Ozs7OztVQ2ZwQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7Ozs7Ozs7OztvR0NOa0Q7O0FBRWxELG9FQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZGlzcGxheS1jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvLWRvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvamVjdCBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCB0b2RvIGZyb20gJy4vdG8tZG8nO1xuXG5jb25zdCBwcm9qZWN0RGlzcGxheSA9IChmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IG9uQ2xpY2tBZGROZXdQcm9qZWN0ID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnNvbGUubG9nKCdhZGQgcHJvamVjdCBjbGljayAnKTtcblx0XHRfb3BlblBvcFVwRm9ybSgpO1xuXHRcdGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QtZm9ybScpO1xuXHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgX19hZGROZXdQcm9qZWN0LCB7IG9uY2U6IHRydWUgfSk7XG5cdH07XG5cblx0Y29uc3QgX19hZGROZXdQcm9qZWN0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LW5hbWUtaW5wdXQnKS52YWx1ZTtcblxuXHRcdGlmIChfY2hlY2tJZkR1cGxpY2F0ZShwcm9qZWN0TmFtZSkpIHtcblx0XHRcdGFsZXJ0KCdwcm9qZWN0IHdpdGggc2FtZSBleGlzdHMgJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUubG9nKCdBZGRpbmcgJywgcHJvamVjdE5hbWUpO1xuXHRcdFx0cHJvamVjdC5hZGRQcm9qZWN0KHByb2plY3ROYW1lKTtcblx0XHRcdF9hZGRQcm9qZWN0VG9EaXNwbGF5KHByb2plY3ROYW1lKTtcblx0XHR9XG5cdFx0X2Nsb3NlUG9wVXBGb3JtKCk7XG5cdH07XG5cdGNvbnN0IF9jaGVja0lmRHVwbGljYXRlID0gZnVuY3Rpb24gKHByb2plY3ROYW1lKSB7XG5cdFx0cmV0dXJuIHByb2plY3QuY2hlY2tGb3JEdXBsaWNhdGVQcm9qZWN0TmFtZShwcm9qZWN0TmFtZSk7XG5cdH07XG5cdGNvbnN0IF9hZGRQcm9qZWN0VG9EaXNwbGF5ID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRjb25zdCBwcm9qZWN0RGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWRpc3BsYXknKTtcblx0XHRfY2xlYXJQcm9qZWN0U2VsZWN0aW9uKCk7XG5cdFx0Y29uc3QgcHJvamVjdERpdiA9IF9jcmVhdGVQcm9qZWN0RGl2KG5hbWUpO1xuXHRcdHByb2plY3REaXNwbGF5LmFwcGVuZENoaWxkKHByb2plY3REaXYpO1xuXHRcdHRvZG9EaXNwbGF5LnVwZGF0ZVByb2plY3RIZWFkZXIoKTtcblx0XHR0b2RvRGlzcGxheS51cGRhdGVUYXNrc0Rpc3BsYXkoKTtcblx0fTtcblxuXHRjb25zdCBfY3JlYXRlUHJvamVjdERpdiA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0Y29uc3QgcHJvamVjdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdHByb2plY3REaXYudGV4dENvbnRlbnQgPSBuYW1lO1xuXHRcdHByb2plY3REaXYuc2V0QXR0cmlidXRlKCdpZCcsICdhY3RpdmUtcHJvamVjdCcpO1xuXHRcdHByb2plY3REaXYuc2V0QXR0cmlidXRlKCdkYXRhLW5hbWUnLCBuYW1lKTtcblx0XHRjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0XHRkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSAneCc7XG5cdFx0cHJvamVjdERpdi5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuXHRcdHByb2plY3REaXYuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdCdjbGljaycsXG5cdFx0XHQoZSkgPT4ge1xuXHRcdFx0XHRpZiAoZS50YXJnZXQgIT0gZGVsZXRlQnV0dG9uKSB7XG5cdFx0XHRcdFx0X19zZXRBY3RpdmVQcm9qZWN0KGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0ZmFsc2Vcblx0XHQpO1xuXG5cdFx0ZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX19kZWxldGVTZWxlY3RlZFByb2plY3QsIHsgb25jZTogdHJ1ZSB9KTtcblxuXHRcdHJldHVybiBwcm9qZWN0RGl2O1xuXHR9O1xuXG5cdGNvbnN0IF9fc2V0QWN0aXZlUHJvamVjdCA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0Y29uc29sZS5sb2coJ0FjdGl2YXRlIFByb2plY3QnKTtcblx0XHRfY2xlYXJQcm9qZWN0U2VsZWN0aW9uKCk7XG5cdFx0ZS50YXJnZXQuc2V0QXR0cmlidXRlKCdpZCcsICdhY3RpdmUtcHJvamVjdCcpO1xuXHRcdHRvZG9EaXNwbGF5LnVwZGF0ZVByb2plY3RIZWFkZXIoKTtcblx0XHR0b2RvRGlzcGxheS51cGRhdGVUYXNrc0Rpc3BsYXkoKTtcblx0fTtcblxuXHRjb25zdCBfY2xlYXJQcm9qZWN0U2VsZWN0aW9uID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IHByb2plY3REaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZGlzcGxheScpO1xuXHRcdHByb2plY3REaXNwbGF5LmNoaWxkTm9kZXMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Byb2plY3QnKTtcblx0XHR9KTtcblx0fTtcblxuXHRjb25zdCBfX2RlbGV0ZVNlbGVjdGVkUHJvamVjdCA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0Y29uc29sZS5sb2coZS50YXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0Lm5hbWUpO1xuXHRcdHByb2plY3QuZGVsUHJvamVjdChlLnRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubmFtZSk7XG5cdFx0X2RlbGV0ZVByb2plY3RGcm9tRGlzcGxheShlKTtcblx0fTtcblxuXHRjb25zdCBfZGVsZXRlUHJvamVjdEZyb21EaXNwbGF5ID0gZnVuY3Rpb24gKGUpIHtcblx0XHRjb25zdCBwcm9qZWN0RGl2ID0gZS50YXJnZXQucGFyZW50Tm9kZTtcblx0XHRjb25zdCBwcm9qZWN0RGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWRpc3BsYXknKTtcblx0XHRwcm9qZWN0RGlzcGxheS5yZW1vdmVDaGlsZChwcm9qZWN0RGl2KTtcblx0fTtcblxuXHRjb25zdCBfb3BlblBvcFVwRm9ybSA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtZm9ybS1wb3B1cCcpO1xuXHRcdGZvcm0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI292ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHR3aW5kb3cub25jbGljayA9IChldmVudCkgPT4ge1xuXHRcdFx0Y29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVybGF5Jyk7XG5cdFx0XHRpZiAoZXZlbnQudGFyZ2V0ID09IG92ZXJsYXkpIHtcblx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LWZvcm0nKS5yZXNldCgpO1xuXHRcdFx0XHRfY2xvc2VQb3BVcEZvcm0oKTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXG5cdGNvbnN0IF9jbG9zZVBvcFVwRm9ybSA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtZm9ybS1wb3B1cCcpO1xuXHRcdGZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QtZm9ybScpLnJlc2V0KCk7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI292ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHR9O1xuXG5cdHJldHVybiB7IG9uQ2xpY2tBZGROZXdQcm9qZWN0IH07XG59KSgpO1xuXG5jb25zdCB0b2RvRGlzcGxheSA9IChmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IHVwZGF0ZVByb2plY3RIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgYWN0aXZlUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhY3RpdmUtcHJvamVjdCcpO1xuXHRcdGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWxlY3RlZC1wcm9qZWN0LW5hbWUnKTtcblx0XHRoZWFkZXIudGV4dENvbnRlbnQgPSBhY3RpdmVQcm9qZWN0LmRhdGFzZXQubmFtZTtcblx0fTtcblxuXHRjb25zdCBvbkNsaWNrQWRkTmV3VGFzayA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zb2xlLmxvZygnYWRkIHRhc2suLi4nKTtcblx0XHRfb3BlblBvcFVwRm9ybSgpO1xuXHRcdGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2stZm9ybScpO1xuXHRcdF9zZXRNaW5EYXRlKCk7XG5cdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBfX2FkZE5ld1Rhc2ssIHsgb25jZTogdHJ1ZSB9KTtcblx0fTtcblx0Y29uc3QgX3NldE1pbkRhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgdGFza0Zvcm1EYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGF0ZScpO1xuXHRcdGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcblx0XHRjb25zdCBkZCA9IFN0cmluZyh0b2RheS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG5cdFx0Y29uc3QgbW0gPSBTdHJpbmcodG9kYXkuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICcwJyk7XG5cdFx0Y29uc3QgeXl5eSA9IHRvZGF5LmdldEZ1bGxZZWFyKCk7XG5cdFx0Y29uc3QgZGF0ZSA9IGAke3l5eXl9LSR7bW19LSR7ZGR9YDtcblx0XHR0YXNrRm9ybURhdGUuc2V0QXR0cmlidXRlKCdtaW4nLCBkYXRlKTtcblx0fTtcblxuXHRjb25zdCBfX2FkZE5ld1Rhc2sgPSBmdW5jdGlvbiAoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLXRpdGxlJykudmFsdWU7XG5cdFx0Y29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXNjcmlwdGlvbicpLnZhbHVlO1xuXHRcdGNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kYXRlJykudmFsdWU7XG5cdFx0Y29uc3QgYWN0aXZlUHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWN0aXZlLXByb2plY3QnKS5kYXRhc2V0Lm5hbWU7XG5cdFx0aWYgKF9jaGVja0lmRHVwbGljYXRlVGFzayh0aXRsZSwgYWN0aXZlUHJvamVjdE5hbWUpKSB7XG5cdFx0XHRhbGVydCgndGFzayB3aXRoIHNhbWUgbmFtZSBleGlzdHMnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dG9kby5hZGRUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgYWN0aXZlUHJvamVjdE5hbWUpO1xuXHRcdFx0Y29uc29sZS5sb2codGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlKTtcblx0XHRcdHVwZGF0ZVRhc2tzRGlzcGxheSgpO1xuXHRcdH1cblx0XHRfY2xvc2VQb3BVcEZvcm0oKTtcblx0fTtcblx0Y29uc3QgX2NoZWNrSWZEdXBsaWNhdGVUYXNrID0gZnVuY3Rpb24gKHRpdGxlLCBhY3RpdmVQcm9qZWN0TmFtZSkge1xuXHRcdHJldHVybiBwcm9qZWN0LmNoZWNrRm9yRHVwbGljYXRlVGFzayh0aXRsZSwgYWN0aXZlUHJvamVjdE5hbWUpO1xuXHR9O1xuXHRjb25zdCB1cGRhdGVUYXNrc0Rpc3BsYXkgPSBmdW5jdGlvbiAoKSB7XG5cdFx0X2NsZWFyVGFza0Rpc3BsYXkoKTtcblx0XHRjb25zdCBhY3RpdmVQcm9qZWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhY3RpdmUtcHJvamVjdCcpLmRhdGFzZXQubmFtZTtcblx0XHRjb25zdCBhY3RpdmVQcm9qZWN0ID0gcHJvamVjdC5nZXRBY3RpdmVQcm9qZWN0KGFjdGl2ZVByb2plY3ROYW1lKTtcblx0XHRjb25zb2xlLmxvZygnYWRkaW5nIHRhc2tzIHRvIGRpc3BsYXkuLi4uJywgYWN0aXZlUHJvamVjdC50b2RvKTtcblx0XHRhY3RpdmVQcm9qZWN0LnRvZG8uZm9yRWFjaCgodGFzaykgPT4ge1xuXHRcdFx0X2FkZFRhc2tUb0Rpc3BsYXkodGFzay50aXRsZSwgdGFzay5kZXNjcmlwdGlvbiwgdGFzay5kYXRlKTtcblx0XHR9KTtcblx0fTtcblxuXHRjb25zdCBfY2xlYXJUYXNrRGlzcGxheSA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zdCB0YXNrRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRpc3BsYXknKTtcblx0XHR3aGlsZSAodGFza0Rpc3BsYXkuZmlyc3RDaGlsZCkge1xuXHRcdFx0dGFza0Rpc3BsYXkucmVtb3ZlQ2hpbGQodGFza0Rpc3BsYXkubGFzdENoaWxkKTtcblx0XHR9XG5cdH07XG5cblx0Y29uc3QgX2FkZFRhc2tUb0Rpc3BsYXkgPSBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlKSB7XG5cdFx0Y29uc3QgdGFza0Rpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kaXNwbGF5Jyk7XG5cdFx0dGFza0Rpc3BsYXkuYXBwZW5kQ2hpbGQoX2NyZWF0ZVRhc2tEaXYodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlKSk7XG5cdH07XG5cblx0Y29uc3QgX2NyZWF0ZVRhc2tEaXYgPSBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlKSB7XG5cdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZGl2LnNldEF0dHJpYnV0ZSgnaWQnLCAndGFzaycpO1xuXHRcdGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbmFtZScsIHRpdGxlKTtcblx0XHRjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cdFx0Y2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG5cdFx0Y29uc3QgZGlzcGxheVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0Y29uc3QgZGlzcGxheURlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0Y29uc3QgZGlzcGxheURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRjb25zdCBkZWxldGVUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0ZGlzcGxheVRpdGxlLnRleHRDb250ZW50ID0gdGl0bGU7XG5cdFx0ZGlzcGxheURlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247XG5cdFx0ZGlzcGxheURhdGUudGV4dENvbnRlbnQgPSBkYXRlO1xuXHRcdGRlbGV0ZVRhc2tCdXR0b24udGV4dENvbnRlbnQgPSAneCc7XG5cdFx0ZGl2LmFwcGVuZENoaWxkKGNoZWNrYm94KTtcblx0XHRkaXYuYXBwZW5kQ2hpbGQoZGlzcGxheVRpdGxlKTtcblx0XHRkaXYuYXBwZW5kQ2hpbGQoZGlzcGxheURlc2NyaXB0aW9uKTtcblx0XHRkaXYuYXBwZW5kQ2hpbGQoZGlzcGxheURhdGUpO1xuXHRcdGRpdi5hcHBlbmRDaGlsZChkZWxldGVUYXNrQnV0dG9uKTtcblx0XHRkZWxldGVUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2RlbGV0ZVRhc2spO1xuXHRcdGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHQnY2xpY2snLFxuXHRcdFx0KGUpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2coZS50YXJnZXQucGFyZW50Tm9kZSk7XG5cdFx0XHRcdGUudGFyZ2V0LnBhcmVudE5vZGUuc3R5bGUuY29sb3IgPSAncmVkJztcblx0XHRcdFx0Y2hlY2tib3guZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0fSxcblx0XHRcdHsgb25jZTogdHJ1ZSB9XG5cdFx0KTtcblx0XHRyZXR1cm4gZGl2O1xuXHR9O1xuXHRjb25zdCBfZGVsZXRlVGFzayA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0Y29uc29sZS5sb2coZS50YXJnZXQucGFyZW50Tm9kZSk7XG5cdFx0Y29uc3QgYWN0aXZlUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhY3RpdmUtcHJvamVjdCcpO1xuXHRcdHByb2plY3QuZGVsZXRlVG9kb0Zvcm1Qcm9qZWN0KGUudGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5uYW1lLCBhY3RpdmVQcm9qZWN0LmRhdGFzZXQubmFtZSk7XG5cdFx0dXBkYXRlVGFza3NEaXNwbGF5KCk7XG5cdH07XG5cblx0Y29uc3QgX29wZW5Qb3BVcEZvcm0gPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWZvcm0tcG9wdXAnKTtcblx0XHRmb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdmVybGF5Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0d2luZG93Lm9uY2xpY2sgPSAoZXZlbnQpID0+IHtcblx0XHRcdGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheScpO1xuXHRcdFx0aWYgKGV2ZW50LnRhcmdldCA9PSBvdmVybGF5KSB7XG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvamVjdC1mb3JtJykucmVzZXQoKTtcblx0XHRcdFx0X2Nsb3NlUG9wVXBGb3JtKCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fTtcblxuXHRjb25zdCBfY2xvc2VQb3BVcEZvcm0gPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWZvcm0tcG9wdXAnKTtcblx0XHRmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrLWZvcm0nKS5yZXNldCgpO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdmVybGF5Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0fTtcblxuXHRyZXR1cm4geyB1cGRhdGVQcm9qZWN0SGVhZGVyLCBvbkNsaWNrQWRkTmV3VGFzaywgdXBkYXRlVGFza3NEaXNwbGF5IH07XG59KSgpO1xuXG5jb25zdCBsb2FkVUkgPSBmdW5jdGlvbiAoKSB7XG5cdGRvY3VtZW50XG5cdFx0LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtbmV3LXByb2plY3QnKVxuXHRcdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2plY3REaXNwbGF5Lm9uQ2xpY2tBZGROZXdQcm9qZWN0LCBmYWxzZSk7XG5cdGRvY3VtZW50XG5cdFx0LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtbmV3LXRhc2snKVxuXHRcdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZG9EaXNwbGF5Lm9uQ2xpY2tBZGROZXdUYXNrLCBmYWxzZSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBsb2FkVUk7XG4iLCJsZXQgcHJvamVjdHMgPSBbXTtcblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdChuYW1lKSB7XG5cdHJldHVybiB7IG5hbWUsIHRvZG86IFtdIH07XG59XG5cbmNvbnN0IHByb2plY3QgPSAoZnVuY3Rpb24gKCkge1xuXHRjb25zdCBhZGRQcm9qZWN0ID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRjb25zdCBuZXdQcm9qZWN0ID0gY3JlYXRlUHJvamVjdChuYW1lKTtcblx0XHRwcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuXHRcdGNvbnNvbGUubG9nKHByb2plY3RzKTtcblx0fTtcblxuXHRjb25zdCBkZWxQcm9qZWN0ID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRjb25zdCBpbmRleCA9IF9nZXRJbmRleE9mKG5hbWUpO1xuXHRcdHByb2plY3RzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0Y29uc29sZS5sb2coaW5kZXgpO1xuXHRcdGNvbnNvbGUubG9nKHByb2plY3RzKTtcblx0fTtcblxuXHRjb25zdCBhZGRUYXNrVG9BY3RpdmVQcm9qZWN0ID0gZnVuY3Rpb24gKG5ld1RvZG8sIGFjdGl2ZVByb2plY3ROYW1lKSB7XG5cdFx0Y29uc3QgaW5kZXhPZkFjdGl2ZVByb2plY3QgPSBfZ2V0SW5kZXhPZihhY3RpdmVQcm9qZWN0TmFtZSk7XG5cdFx0cHJvamVjdHNbaW5kZXhPZkFjdGl2ZVByb2plY3RdLnRvZG8ucHVzaChuZXdUb2RvKTtcblx0XHRjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG5cdH07XG5cblx0Y29uc3QgZ2V0QWN0aXZlUHJvamVjdCA9IGZ1bmN0aW9uIChhY3RpdmVQcm9qZWN0TmFtZSkge1xuXHRcdGNvbnN0IGluZGV4T2ZBY3RpdmVQcm9qZWN0ID0gX2dldEluZGV4T2YoYWN0aXZlUHJvamVjdE5hbWUpO1xuXHRcdGNvbnNvbGUubG9nKHByb2plY3RzW2luZGV4T2ZBY3RpdmVQcm9qZWN0XSk7XG5cdFx0cmV0dXJuIHByb2plY3RzW2luZGV4T2ZBY3RpdmVQcm9qZWN0XTtcblx0fTtcblxuXHRjb25zdCBfZ2V0SW5kZXhPZiA9IGZ1bmN0aW9uIChwcm9qZWN0TmFtZSkge1xuXHRcdGNvbnN0IGluZGV4ID0gcHJvamVjdHMuZmluZEluZGV4KChwcm9qZWN0KSA9PiB7XG5cdFx0XHRpZiAocHJvamVjdC5uYW1lID09IHByb2plY3ROYW1lKSB7XG5cdFx0XHRcdHJldHVybiBwcm9qZWN0O1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBpbmRleDtcblx0fTtcblxuXHRjb25zdCBkZWxldGVUb2RvRm9ybVByb2plY3QgPSBmdW5jdGlvbiAodGFza05hbWUsIGFjdGl2ZVByb2plY3ROYW1lKSB7XG5cdFx0Y29uc29sZS5sb2coJ2RlbGV0ZScsIHRhc2tOYW1lLCAnZnJvbScsIGFjdGl2ZVByb2plY3ROYW1lKTtcblxuXHRcdGNvbnN0IGluZGV4T2ZBY3RpdmVQcm9qZWN0ID0gX2dldEluZGV4T2YoYWN0aXZlUHJvamVjdE5hbWUpO1xuXHRcdGNvbnNvbGUubG9nKHByb2plY3RzKTtcblx0XHRwcm9qZWN0c1tpbmRleE9mQWN0aXZlUHJvamVjdF0udG9kbyA9IHByb2plY3RzW2luZGV4T2ZBY3RpdmVQcm9qZWN0XS50b2RvLmZpbHRlcihcblx0XHRcdCh0b2RvKSA9PiB0b2RvLnRpdGxlICE9IHRhc2tOYW1lXG5cdFx0KTtcblx0XHRjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG5cdH07XG5cdGNvbnN0IGNoZWNrRm9yRHVwbGljYXRlUHJvamVjdE5hbWUgPSBmdW5jdGlvbiAocHJvamVjdE5hbWUpIHtcblx0XHRjb25zdCBpbmRleCA9IF9nZXRJbmRleE9mKHByb2plY3ROYW1lKTtcblx0XHRpZiAoaW5kZXgpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cdGNvbnN0IGNoZWNrRm9yRHVwbGljYXRlVGFzayA9IGZ1bmN0aW9uICh0YXNrVGl0bGUsIHByb2plY3ROYW1lKSB7XG5cdFx0Y29uc3QgcHJvamVjdEluZGV4ID0gX2dldEluZGV4T2YocHJvamVjdE5hbWUpO1xuXHRcdGNvbnN0IHRhc2tJbmRleCA9IHByb2plY3RzW3Byb2plY3RJbmRleF0udG9kby5maW5kSW5kZXgoKHRvZG8pID0+IHtcblx0XHRcdGlmICh0b2RvLnRpdGxlID09PSB0YXNrVGl0bGUpIHtcblx0XHRcdFx0cmV0dXJuIHRvZG87XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0aWYgKHRhc2tJbmRleCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcblx0cmV0dXJuIHtcblx0XHRhZGRQcm9qZWN0LFxuXHRcdGRlbFByb2plY3QsXG5cdFx0YWRkVGFza1RvQWN0aXZlUHJvamVjdCxcblx0XHRnZXRBY3RpdmVQcm9qZWN0LFxuXHRcdGRlbGV0ZVRvZG9Gb3JtUHJvamVjdCxcblx0XHRjaGVja0ZvckR1cGxpY2F0ZVByb2plY3ROYW1lLFxuXHRcdGNoZWNrRm9yRHVwbGljYXRlVGFzayxcblx0fTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3Q7XG4iLCJpbXBvcnQgcHJvamVjdCBmcm9tICcuL3Byb2plY3RzJztcblxuY29uc3QgdG9kb0ZhY3RvcnkgPSBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlKSB7XG5cdHJldHVybiB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSB9O1xufTtcblxuY29uc3QgdG9kbyA9IChmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IGFkZFRhc2sgPSBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBhY3RpdmVQcm9qZWN0TmFtZSkge1xuXHRcdGNvbnNvbGUubG9nKCdhZGRpbmcgdGFzaycpO1xuXHRcdGNvbnN0IG5ld1RvZG8gPSB0b2RvRmFjdG9yeSh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUpO1xuXHRcdHByb2plY3QuYWRkVGFza1RvQWN0aXZlUHJvamVjdChuZXdUb2RvLCBhY3RpdmVQcm9qZWN0TmFtZSk7XG5cdH07XG5cdHJldHVybiB7IGFkZFRhc2sgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHRvZG87XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBsb2FkVUkgZnJvbSAnLi9tb2R1bGVzL2Rpc3BsYXktY29udHJvbGxlcic7XG5cbmxvYWRVSSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9