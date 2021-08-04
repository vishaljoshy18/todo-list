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
		console.log('Adding ', projectName);
		_projects__WEBPACK_IMPORTED_MODULE_0__.default.addProject(projectName);
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
		form.addEventListener(
			'submit',
			(event) => {
				event.preventDefault();
				const title = document.querySelector('#task-title').value;
				const description = document.querySelector('#task-description').value;
				const activeProjectName = document.querySelector('#active-project').dataset.name;
				__addNewTask(title, description, activeProjectName);
				form.reset();
				_closePopUpForm();
			},
			{ once: true }
		);
	};

	const __addNewTask = function (title, description, activeProjectName) {
		// addTaskToDisplay(title, description);
		_to_do__WEBPACK_IMPORTED_MODULE_1__.default.addTask(title, description, activeProjectName);
		console.log(title, description);
		updateTasksDisplay();
	};

	const updateTasksDisplay = function () {
		_clearTaskDisplay();
		const activeProjectName = document.querySelector('#active-project').dataset.name;
		const activeProject = _projects__WEBPACK_IMPORTED_MODULE_0__.default.getActiveProject(activeProjectName);
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
		_projects__WEBPACK_IMPORTED_MODULE_0__.default.deleteTodoFormProject(e.target.parentNode.dataset.name, activeProject.dataset.name);
		updateTasksDisplay();
	};

	const _openPopUpForm = function () {
		const form = document.querySelector('.task-form-popup');
		form.style.display = 'block';
	};

	const _closePopUpForm = function () {
		const form = document.querySelector('.task-form-popup');
		form.style.display = 'none';
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

	return {
		addProject,
		delProject,
		addTaskToActiveProject,
		getActiveProject,
		deleteTodoFormProject,
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


const todoFactory = function (title, description) {
	return { title, description };
};

const todo = (function () {
	const addTask = function (title, description, activeProjectName) {
		console.log('adding task');
		const newTodo = todoFactory(title, description);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7Ozs7Ozs7OztvR0NOa0Q7O0FBRWxELG9FQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZGlzcGxheS1jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvLWRvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvamVjdCBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCB0b2RvIGZyb20gJy4vdG8tZG8nO1xuXG5jb25zdCBwcm9qZWN0RGlzcGxheSA9IChmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IG9uQ2xpY2tBZGROZXdQcm9qZWN0ID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnNvbGUubG9nKCdhZGQgcHJvamVjdCBjbGljayAnKTtcblx0XHRfb3BlblBvcFVwRm9ybSgpO1xuXHRcdGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QtZm9ybScpO1xuXHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgX19hZGROZXdQcm9qZWN0LCB7IG9uY2U6IHRydWUgfSk7XG5cdH07XG5cblx0Y29uc3QgX19hZGROZXdQcm9qZWN0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LW5hbWUtaW5wdXQnKS52YWx1ZTtcblx0XHRjb25zb2xlLmxvZygnQWRkaW5nICcsIHByb2plY3ROYW1lKTtcblx0XHRwcm9qZWN0LmFkZFByb2plY3QocHJvamVjdE5hbWUpO1xuXHRcdF9hZGRQcm9qZWN0VG9EaXNwbGF5KHByb2plY3ROYW1lKTtcblx0XHRfY2xvc2VQb3BVcEZvcm0oKTtcblx0fTtcblxuXHRjb25zdCBfYWRkUHJvamVjdFRvRGlzcGxheSA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0Y29uc3QgcHJvamVjdERpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1kaXNwbGF5Jyk7XG5cdFx0X2NsZWFyUHJvamVjdFNlbGVjdGlvbigpO1xuXHRcdGNvbnN0IHByb2plY3REaXYgPSBfY3JlYXRlUHJvamVjdERpdihuYW1lKTtcblx0XHRwcm9qZWN0RGlzcGxheS5hcHBlbmRDaGlsZChwcm9qZWN0RGl2KTtcblx0XHR0b2RvRGlzcGxheS51cGRhdGVQcm9qZWN0SGVhZGVyKCk7XG5cdFx0dG9kb0Rpc3BsYXkudXBkYXRlVGFza3NEaXNwbGF5KCk7XG5cdH07XG5cblx0Y29uc3QgX2NyZWF0ZVByb2plY3REaXYgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRwcm9qZWN0RGl2LnRleHRDb250ZW50ID0gbmFtZTtcblx0XHRwcm9qZWN0RGl2LnNldEF0dHJpYnV0ZSgnaWQnLCAnYWN0aXZlLXByb2plY3QnKTtcblx0XHRwcm9qZWN0RGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1uYW1lJywgbmFtZSk7XG5cdFx0Y29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0ZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gJ3gnO1xuXHRcdHByb2plY3REaXYuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcblx0XHRwcm9qZWN0RGl2LmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHQnY2xpY2snLFxuXHRcdFx0KGUpID0+IHtcblx0XHRcdFx0aWYgKGUudGFyZ2V0ICE9IGRlbGV0ZUJ1dHRvbikge1xuXHRcdFx0XHRcdF9fc2V0QWN0aXZlUHJvamVjdChlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGZhbHNlXG5cdFx0KTtcblxuXHRcdGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9fZGVsZXRlU2VsZWN0ZWRQcm9qZWN0LCB7IG9uY2U6IHRydWUgfSk7XG5cblx0XHRyZXR1cm4gcHJvamVjdERpdjtcblx0fTtcblxuXHRjb25zdCBfX3NldEFjdGl2ZVByb2plY3QgPSBmdW5jdGlvbiAoZSkge1xuXHRcdGNvbnNvbGUubG9nKCdBY3RpdmF0ZSBQcm9qZWN0Jyk7XG5cdFx0X2NsZWFyUHJvamVjdFNlbGVjdGlvbigpO1xuXHRcdGUudGFyZ2V0LnNldEF0dHJpYnV0ZSgnaWQnLCAnYWN0aXZlLXByb2plY3QnKTtcblx0XHR0b2RvRGlzcGxheS51cGRhdGVQcm9qZWN0SGVhZGVyKCk7XG5cdFx0dG9kb0Rpc3BsYXkudXBkYXRlVGFza3NEaXNwbGF5KCk7XG5cdH07XG5cblx0Y29uc3QgX2NsZWFyUHJvamVjdFNlbGVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zdCBwcm9qZWN0RGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWRpc3BsYXknKTtcblx0XHRwcm9qZWN0RGlzcGxheS5jaGlsZE5vZGVzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcblx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICdwcm9qZWN0Jyk7XG5cdFx0fSk7XG5cdH07XG5cblx0Y29uc3QgX19kZWxldGVTZWxlY3RlZFByb2plY3QgPSBmdW5jdGlvbiAoZSkge1xuXHRcdGNvbnNvbGUubG9nKGUudGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5uYW1lKTtcblx0XHRwcm9qZWN0LmRlbFByb2plY3QoZS50YXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0Lm5hbWUpO1xuXHRcdF9kZWxldGVQcm9qZWN0RnJvbURpc3BsYXkoZSk7XG5cdH07XG5cblx0Y29uc3QgX2RlbGV0ZVByb2plY3RGcm9tRGlzcGxheSA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0Y29uc3QgcHJvamVjdERpdiA9IGUudGFyZ2V0LnBhcmVudE5vZGU7XG5cdFx0Y29uc3QgcHJvamVjdERpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1kaXNwbGF5Jyk7XG5cdFx0cHJvamVjdERpc3BsYXkucmVtb3ZlQ2hpbGQocHJvamVjdERpdik7XG5cdH07XG5cblx0Y29uc3QgX29wZW5Qb3BVcEZvcm0gPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWZvcm0tcG9wdXAnKTtcblx0XHRmb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdmVybGF5Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0d2luZG93Lm9uY2xpY2sgPSAoZXZlbnQpID0+IHtcblx0XHRcdGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheScpO1xuXHRcdFx0aWYgKGV2ZW50LnRhcmdldCA9PSBvdmVybGF5KSB7XG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvamVjdC1mb3JtJykucmVzZXQoKTtcblx0XHRcdFx0X2Nsb3NlUG9wVXBGb3JtKCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fTtcblxuXHRjb25zdCBfY2xvc2VQb3BVcEZvcm0gPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWZvcm0tcG9wdXAnKTtcblx0XHRmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LWZvcm0nKS5yZXNldCgpO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdmVybGF5Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0fTtcblxuXHRyZXR1cm4geyBvbkNsaWNrQWRkTmV3UHJvamVjdCB9O1xufSkoKTtcblxuY29uc3QgdG9kb0Rpc3BsYXkgPSAoZnVuY3Rpb24gKCkge1xuXHRjb25zdCB1cGRhdGVQcm9qZWN0SGVhZGVyID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IGFjdGl2ZVByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWN0aXZlLXByb2plY3QnKTtcblx0XHRjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VsZWN0ZWQtcHJvamVjdC1uYW1lJyk7XG5cdFx0aGVhZGVyLnRleHRDb250ZW50ID0gYWN0aXZlUHJvamVjdC5kYXRhc2V0Lm5hbWU7XG5cdH07XG5cblx0Y29uc3Qgb25DbGlja0FkZE5ld1Rhc2sgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc29sZS5sb2coJ2FkZCB0YXNrLi4uJyk7XG5cdFx0X29wZW5Qb3BVcEZvcm0oKTtcblx0XHRjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrLWZvcm0nKTtcblx0XHRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHQnc3VibWl0Jyxcblx0XHRcdChldmVudCkgPT4ge1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLXRpdGxlJykudmFsdWU7XG5cdFx0XHRcdGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGVzY3JpcHRpb24nKS52YWx1ZTtcblx0XHRcdFx0Y29uc3QgYWN0aXZlUHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWN0aXZlLXByb2plY3QnKS5kYXRhc2V0Lm5hbWU7XG5cdFx0XHRcdF9fYWRkTmV3VGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGFjdGl2ZVByb2plY3ROYW1lKTtcblx0XHRcdFx0Zm9ybS5yZXNldCgpO1xuXHRcdFx0XHRfY2xvc2VQb3BVcEZvcm0oKTtcblx0XHRcdH0sXG5cdFx0XHR7IG9uY2U6IHRydWUgfVxuXHRcdCk7XG5cdH07XG5cblx0Y29uc3QgX19hZGROZXdUYXNrID0gZnVuY3Rpb24gKHRpdGxlLCBkZXNjcmlwdGlvbiwgYWN0aXZlUHJvamVjdE5hbWUpIHtcblx0XHQvLyBhZGRUYXNrVG9EaXNwbGF5KHRpdGxlLCBkZXNjcmlwdGlvbik7XG5cdFx0dG9kby5hZGRUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgYWN0aXZlUHJvamVjdE5hbWUpO1xuXHRcdGNvbnNvbGUubG9nKHRpdGxlLCBkZXNjcmlwdGlvbik7XG5cdFx0dXBkYXRlVGFza3NEaXNwbGF5KCk7XG5cdH07XG5cblx0Y29uc3QgdXBkYXRlVGFza3NEaXNwbGF5ID0gZnVuY3Rpb24gKCkge1xuXHRcdF9jbGVhclRhc2tEaXNwbGF5KCk7XG5cdFx0Y29uc3QgYWN0aXZlUHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWN0aXZlLXByb2plY3QnKS5kYXRhc2V0Lm5hbWU7XG5cdFx0Y29uc3QgYWN0aXZlUHJvamVjdCA9IHByb2plY3QuZ2V0QWN0aXZlUHJvamVjdChhY3RpdmVQcm9qZWN0TmFtZSk7XG5cdFx0Y29uc29sZS5sb2coJ2FkZGluZyB0YXNrcyB0byBkaXNwbGF5Li4uLicsIGFjdGl2ZVByb2plY3QudG9kbyk7XG5cdFx0YWN0aXZlUHJvamVjdC50b2RvLmZvckVhY2goKHRhc2spID0+IHtcblx0XHRcdF9hZGRUYXNrVG9EaXNwbGF5KHRhc2sudGl0bGUsIHRhc2suZGVzY3JpcHRpb24pO1xuXHRcdH0pO1xuXHR9O1xuXG5cdGNvbnN0IF9jbGVhclRhc2tEaXNwbGF5ID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IHRhc2tEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGlzcGxheScpO1xuXHRcdHdoaWxlICh0YXNrRGlzcGxheS5maXJzdENoaWxkKSB7XG5cdFx0XHR0YXNrRGlzcGxheS5yZW1vdmVDaGlsZCh0YXNrRGlzcGxheS5sYXN0Q2hpbGQpO1xuXHRcdH1cblx0fTtcblxuXHRjb25zdCBfYWRkVGFza1RvRGlzcGxheSA9IGZ1bmN0aW9uICh0aXRsZSwgZGVzY3JpcHRpb24pIHtcblx0XHRjb25zdCB0YXNrRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRpc3BsYXknKTtcblxuXHRcdHRhc2tEaXNwbGF5LmFwcGVuZENoaWxkKF9jcmVhdGVUYXNrRGl2KHRpdGxlLCBkZXNjcmlwdGlvbikpO1xuXHR9O1xuXG5cdGNvbnN0IF9jcmVhdGVUYXNrRGl2ID0gZnVuY3Rpb24gKHRpdGxlLCBkZXNjcmlwdGlvbikge1xuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Rhc2snKTtcblx0XHRkaXYuc2V0QXR0cmlidXRlKCdkYXRhLW5hbWUnLCB0aXRsZSk7XG5cdFx0Y29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXHRcdGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuXHRcdGNvbnN0IGRpc3BsYXlUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RpdGxlJyk7XG5cdFx0Y29uc3QgZGlzcGxheURlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGVzY3JpcHRpb24nKTtcblx0XHRjb25zdCBkZWxldGVUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0ZGlzcGxheVRpdGxlLnRleHRDb250ZW50ID0gdGl0bGU7XG5cdFx0ZGlzcGxheURlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247XG5cdFx0ZGVsZXRlVGFza0J1dHRvbi50ZXh0Q29udGVudCA9ICd4Jztcblx0XHRkaXYuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuXHRcdGRpdi5hcHBlbmRDaGlsZChkaXNwbGF5VGl0bGUpO1xuXHRcdGRpdi5hcHBlbmRDaGlsZChkaXNwbGF5RGVzY3JpcHRpb24pO1xuXHRcdGRpdi5hcHBlbmRDaGlsZChkZWxldGVUYXNrQnV0dG9uKTtcblx0XHRkZWxldGVUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2RlbGV0ZVRhc2spO1xuXHRcdGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHQnY2xpY2snLFxuXHRcdFx0KGUpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2coZS50YXJnZXQucGFyZW50Tm9kZSk7XG5cdFx0XHRcdGUudGFyZ2V0LnBhcmVudE5vZGUuc3R5bGUuY29sb3IgPSAncmVkJztcblx0XHRcdFx0Y2hlY2tib3guZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0fSxcblx0XHRcdHsgb25jZTogdHJ1ZSB9XG5cdFx0KTtcblx0XHRyZXR1cm4gZGl2O1xuXHR9O1xuXHRjb25zdCBfZGVsZXRlVGFzayA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0Y29uc29sZS5sb2coZS50YXJnZXQucGFyZW50Tm9kZSk7XG5cdFx0Y29uc3QgYWN0aXZlUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhY3RpdmUtcHJvamVjdCcpO1xuXHRcdHByb2plY3QuZGVsZXRlVG9kb0Zvcm1Qcm9qZWN0KGUudGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5uYW1lLCBhY3RpdmVQcm9qZWN0LmRhdGFzZXQubmFtZSk7XG5cdFx0dXBkYXRlVGFza3NEaXNwbGF5KCk7XG5cdH07XG5cblx0Y29uc3QgX29wZW5Qb3BVcEZvcm0gPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWZvcm0tcG9wdXAnKTtcblx0XHRmb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHR9O1xuXG5cdGNvbnN0IF9jbG9zZVBvcFVwRm9ybSA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stZm9ybS1wb3B1cCcpO1xuXHRcdGZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0fTtcblx0cmV0dXJuIHsgdXBkYXRlUHJvamVjdEhlYWRlciwgb25DbGlja0FkZE5ld1Rhc2ssIHVwZGF0ZVRhc2tzRGlzcGxheSB9O1xufSkoKTtcblxuY29uc3QgbG9hZFVJID0gZnVuY3Rpb24gKCkge1xuXHRkb2N1bWVudFxuXHRcdC5xdWVyeVNlbGVjdG9yKCcjYWRkLW5ldy1wcm9qZWN0Jylcblx0XHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9qZWN0RGlzcGxheS5vbkNsaWNrQWRkTmV3UHJvamVjdCwgZmFsc2UpO1xuXHRkb2N1bWVudFxuXHRcdC5xdWVyeVNlbGVjdG9yKCcjYWRkLW5ldy10YXNrJylcblx0XHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2RvRGlzcGxheS5vbkNsaWNrQWRkTmV3VGFzaywgZmFsc2UpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbG9hZFVJO1xuIiwibGV0IHByb2plY3RzID0gW107XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QobmFtZSkge1xuXHRyZXR1cm4geyBuYW1lLCB0b2RvOiBbXSB9O1xufVxuXG5jb25zdCBwcm9qZWN0ID0gKGZ1bmN0aW9uICgpIHtcblx0Y29uc3QgYWRkUHJvamVjdCA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0Y29uc3QgbmV3UHJvamVjdCA9IGNyZWF0ZVByb2plY3QobmFtZSk7XG5cdFx0cHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcblx0XHRjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG5cdH07XG5cblx0Y29uc3QgZGVsUHJvamVjdCA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0Y29uc3QgaW5kZXggPSBfZ2V0SW5kZXhPZihuYW1lKTtcblx0XHRwcm9qZWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdGNvbnNvbGUubG9nKGluZGV4KTtcblx0XHRjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG5cdH07XG5cblx0Y29uc3QgYWRkVGFza1RvQWN0aXZlUHJvamVjdCA9IGZ1bmN0aW9uIChuZXdUb2RvLCBhY3RpdmVQcm9qZWN0TmFtZSkge1xuXHRcdGNvbnN0IGluZGV4T2ZBY3RpdmVQcm9qZWN0ID0gX2dldEluZGV4T2YoYWN0aXZlUHJvamVjdE5hbWUpO1xuXHRcdHByb2plY3RzW2luZGV4T2ZBY3RpdmVQcm9qZWN0XS50b2RvLnB1c2gobmV3VG9kbyk7XG5cdFx0Y29uc29sZS5sb2cocHJvamVjdHMpO1xuXHR9O1xuXG5cdGNvbnN0IGdldEFjdGl2ZVByb2plY3QgPSBmdW5jdGlvbiAoYWN0aXZlUHJvamVjdE5hbWUpIHtcblx0XHRjb25zdCBpbmRleE9mQWN0aXZlUHJvamVjdCA9IF9nZXRJbmRleE9mKGFjdGl2ZVByb2plY3ROYW1lKTtcblx0XHRjb25zb2xlLmxvZyhwcm9qZWN0c1tpbmRleE9mQWN0aXZlUHJvamVjdF0pO1xuXHRcdHJldHVybiBwcm9qZWN0c1tpbmRleE9mQWN0aXZlUHJvamVjdF07XG5cdH07XG5cblx0Y29uc3QgX2dldEluZGV4T2YgPSBmdW5jdGlvbiAocHJvamVjdE5hbWUpIHtcblx0XHRjb25zdCBpbmRleCA9IHByb2plY3RzLmZpbmRJbmRleCgocHJvamVjdCkgPT4ge1xuXHRcdFx0aWYgKHByb2plY3QubmFtZSA9PSBwcm9qZWN0TmFtZSkge1xuXHRcdFx0XHRyZXR1cm4gcHJvamVjdDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gaW5kZXg7XG5cdH07XG5cblx0Y29uc3QgZGVsZXRlVG9kb0Zvcm1Qcm9qZWN0ID0gZnVuY3Rpb24gKHRhc2tOYW1lLCBhY3RpdmVQcm9qZWN0TmFtZSkge1xuXHRcdGNvbnNvbGUubG9nKCdkZWxldGUnLCB0YXNrTmFtZSwgJ2Zyb20nLCBhY3RpdmVQcm9qZWN0TmFtZSk7XG5cblx0XHRjb25zdCBpbmRleE9mQWN0aXZlUHJvamVjdCA9IF9nZXRJbmRleE9mKGFjdGl2ZVByb2plY3ROYW1lKTtcblx0XHRjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG5cdFx0cHJvamVjdHNbaW5kZXhPZkFjdGl2ZVByb2plY3RdLnRvZG8gPSBwcm9qZWN0c1tpbmRleE9mQWN0aXZlUHJvamVjdF0udG9kby5maWx0ZXIoXG5cdFx0XHQodG9kbykgPT4gdG9kby50aXRsZSAhPSB0YXNrTmFtZVxuXHRcdCk7XG5cdFx0Y29uc29sZS5sb2cocHJvamVjdHMpO1xuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0YWRkUHJvamVjdCxcblx0XHRkZWxQcm9qZWN0LFxuXHRcdGFkZFRhc2tUb0FjdGl2ZVByb2plY3QsXG5cdFx0Z2V0QWN0aXZlUHJvamVjdCxcblx0XHRkZWxldGVUb2RvRm9ybVByb2plY3QsXG5cdH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0O1xuIiwiaW1wb3J0IHByb2plY3QgZnJvbSAnLi9wcm9qZWN0cyc7XG5cbmNvbnN0IHRvZG9GYWN0b3J5ID0gZnVuY3Rpb24gKHRpdGxlLCBkZXNjcmlwdGlvbikge1xuXHRyZXR1cm4geyB0aXRsZSwgZGVzY3JpcHRpb24gfTtcbn07XG5cbmNvbnN0IHRvZG8gPSAoZnVuY3Rpb24gKCkge1xuXHRjb25zdCBhZGRUYXNrID0gZnVuY3Rpb24gKHRpdGxlLCBkZXNjcmlwdGlvbiwgYWN0aXZlUHJvamVjdE5hbWUpIHtcblx0XHRjb25zb2xlLmxvZygnYWRkaW5nIHRhc2snKTtcblx0XHRjb25zdCBuZXdUb2RvID0gdG9kb0ZhY3RvcnkodGl0bGUsIGRlc2NyaXB0aW9uKTtcblx0XHRwcm9qZWN0LmFkZFRhc2tUb0FjdGl2ZVByb2plY3QobmV3VG9kbywgYWN0aXZlUHJvamVjdE5hbWUpO1xuXHR9O1xuXHRyZXR1cm4geyBhZGRUYXNrIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCB0b2RvO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgbG9hZFVJIGZyb20gJy4vbW9kdWxlcy9kaXNwbGF5LWNvbnRyb2xsZXInO1xuXG5sb2FkVUkoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==