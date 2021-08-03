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
		console.log('add new project ');
		_openPopUpForm();
		const form = document.querySelector('#add-project-form');
		form.addEventListener(
			'submit',
			(event) => {
				event.preventDefault();
				__addNewProject(document.querySelector('#project-name-input').value);
				form.reset();
				_closePopUpForm();
			},
			{ once: true }
		);
	};

	const __addNewProject = function (name) {
		console.log('Adding ', name);
		_projects__WEBPACK_IMPORTED_MODULE_0__.default.addProject(name);
		_addProjectToDisplay(name);
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
	};

	const _closePopUpForm = function () {
		const form = document.querySelector('.project-form-popup');
		form.style.display = 'none';
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

		console.log('adding tasks to display....', activeProject);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7Ozs7b0dDTmtEOztBQUVsRCxvRUFBTSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2Rpc3BsYXktY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90by1kby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3QgZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgdG9kbyBmcm9tICcuL3RvLWRvJztcblxuY29uc3QgcHJvamVjdERpc3BsYXkgPSAoZnVuY3Rpb24gKCkge1xuXHRjb25zdCBvbkNsaWNrQWRkTmV3UHJvamVjdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zb2xlLmxvZygnYWRkIG5ldyBwcm9qZWN0ICcpO1xuXHRcdF9vcGVuUG9wVXBGb3JtKCk7XG5cdFx0Y29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvamVjdC1mb3JtJyk7XG5cdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0J3N1Ym1pdCcsXG5cdFx0XHQoZXZlbnQpID0+IHtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0X19hZGROZXdQcm9qZWN0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LW5hbWUtaW5wdXQnKS52YWx1ZSk7XG5cdFx0XHRcdGZvcm0ucmVzZXQoKTtcblx0XHRcdFx0X2Nsb3NlUG9wVXBGb3JtKCk7XG5cdFx0XHR9LFxuXHRcdFx0eyBvbmNlOiB0cnVlIH1cblx0XHQpO1xuXHR9O1xuXG5cdGNvbnN0IF9fYWRkTmV3UHJvamVjdCA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0Y29uc29sZS5sb2coJ0FkZGluZyAnLCBuYW1lKTtcblx0XHRwcm9qZWN0LmFkZFByb2plY3QobmFtZSk7XG5cdFx0X2FkZFByb2plY3RUb0Rpc3BsYXkobmFtZSk7XG5cdH07XG5cblx0Y29uc3QgX2FkZFByb2plY3RUb0Rpc3BsYXkgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdGNvbnN0IHByb2plY3REaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZGlzcGxheScpO1xuXHRcdF9jbGVhclByb2plY3RTZWxlY3Rpb24oKTtcblx0XHRjb25zdCBwcm9qZWN0RGl2ID0gX2NyZWF0ZVByb2plY3REaXYobmFtZSk7XG5cdFx0cHJvamVjdERpc3BsYXkuYXBwZW5kQ2hpbGQocHJvamVjdERpdik7XG5cdFx0dG9kb0Rpc3BsYXkudXBkYXRlUHJvamVjdEhlYWRlcigpO1xuXHRcdHRvZG9EaXNwbGF5LnVwZGF0ZVRhc2tzRGlzcGxheSgpO1xuXHR9O1xuXG5cdGNvbnN0IF9jcmVhdGVQcm9qZWN0RGl2ID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0cHJvamVjdERpdi50ZXh0Q29udGVudCA9IG5hbWU7XG5cdFx0cHJvamVjdERpdi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2FjdGl2ZS1wcm9qZWN0Jyk7XG5cdFx0cHJvamVjdERpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbmFtZScsIG5hbWUpO1xuXHRcdGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9ICd4Jztcblx0XHRwcm9qZWN0RGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG5cdFx0cHJvamVjdERpdi5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0J2NsaWNrJyxcblx0XHRcdChlKSA9PiB7XG5cdFx0XHRcdGlmIChlLnRhcmdldCAhPSBkZWxldGVCdXR0b24pIHtcblx0XHRcdFx0XHRfX3NldEFjdGl2ZVByb2plY3QoZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRmYWxzZVxuXHRcdCk7XG5cblx0XHRkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfX2RlbGV0ZVNlbGVjdGVkUHJvamVjdCwgeyBvbmNlOiB0cnVlIH0pO1xuXG5cdFx0cmV0dXJuIHByb2plY3REaXY7XG5cdH07XG5cblx0Y29uc3QgX19zZXRBY3RpdmVQcm9qZWN0ID0gZnVuY3Rpb24gKGUpIHtcblx0XHRjb25zb2xlLmxvZygnQWN0aXZhdGUgUHJvamVjdCcpO1xuXHRcdF9jbGVhclByb2plY3RTZWxlY3Rpb24oKTtcblx0XHRlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2FjdGl2ZS1wcm9qZWN0Jyk7XG5cdFx0dG9kb0Rpc3BsYXkudXBkYXRlUHJvamVjdEhlYWRlcigpO1xuXHRcdHRvZG9EaXNwbGF5LnVwZGF0ZVRhc2tzRGlzcGxheSgpO1xuXHR9O1xuXG5cdGNvbnN0IF9jbGVhclByb2plY3RTZWxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgcHJvamVjdERpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1kaXNwbGF5Jyk7XG5cdFx0cHJvamVjdERpc3BsYXkuY2hpbGROb2Rlcy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG5cdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAncHJvamVjdCcpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdGNvbnN0IF9fZGVsZXRlU2VsZWN0ZWRQcm9qZWN0ID0gZnVuY3Rpb24gKGUpIHtcblx0XHRjb25zb2xlLmxvZyhlLnRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubmFtZSk7XG5cdFx0cHJvamVjdC5kZWxQcm9qZWN0KGUudGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5uYW1lKTtcblx0XHRfZGVsZXRlUHJvamVjdEZyb21EaXNwbGF5KGUpO1xuXHR9O1xuXG5cdGNvbnN0IF9kZWxldGVQcm9qZWN0RnJvbURpc3BsYXkgPSBmdW5jdGlvbiAoZSkge1xuXHRcdGNvbnN0IHByb2plY3REaXYgPSBlLnRhcmdldC5wYXJlbnROb2RlO1xuXHRcdGNvbnN0IHByb2plY3REaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZGlzcGxheScpO1xuXHRcdHByb2plY3REaXNwbGF5LnJlbW92ZUNoaWxkKHByb2plY3REaXYpO1xuXHR9O1xuXG5cdGNvbnN0IF9vcGVuUG9wVXBGb3JtID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtLXBvcHVwJyk7XG5cdFx0Zm9ybS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0fTtcblxuXHRjb25zdCBfY2xvc2VQb3BVcEZvcm0gPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWZvcm0tcG9wdXAnKTtcblx0XHRmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdH07XG5cblx0cmV0dXJuIHsgb25DbGlja0FkZE5ld1Byb2plY3QgfTtcbn0pKCk7XG5cbmNvbnN0IHRvZG9EaXNwbGF5ID0gKGZ1bmN0aW9uICgpIHtcblx0Y29uc3QgdXBkYXRlUHJvamVjdEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zdCBhY3RpdmVQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FjdGl2ZS1wcm9qZWN0Jyk7XG5cdFx0Y29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlbGVjdGVkLXByb2plY3QtbmFtZScpO1xuXHRcdGhlYWRlci50ZXh0Q29udGVudCA9IGFjdGl2ZVByb2plY3QuZGF0YXNldC5uYW1lO1xuXHR9O1xuXG5cdGNvbnN0IG9uQ2xpY2tBZGROZXdUYXNrID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnNvbGUubG9nKCdhZGQgdGFzay4uLicpO1xuXHRcdF9vcGVuUG9wVXBGb3JtKCk7XG5cdFx0Y29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzay1mb3JtJyk7XG5cdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0J3N1Ym1pdCcsXG5cdFx0XHQoZXZlbnQpID0+IHtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay10aXRsZScpLnZhbHVlO1xuXHRcdFx0XHRjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRlc2NyaXB0aW9uJykudmFsdWU7XG5cdFx0XHRcdGNvbnN0IGFjdGl2ZVByb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FjdGl2ZS1wcm9qZWN0JykuZGF0YXNldC5uYW1lO1xuXHRcdFx0XHRfX2FkZE5ld1Rhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBhY3RpdmVQcm9qZWN0TmFtZSk7XG5cdFx0XHRcdGZvcm0ucmVzZXQoKTtcblx0XHRcdFx0X2Nsb3NlUG9wVXBGb3JtKCk7XG5cdFx0XHR9LFxuXHRcdFx0eyBvbmNlOiB0cnVlIH1cblx0XHQpO1xuXHR9O1xuXG5cdGNvbnN0IF9fYWRkTmV3VGFzayA9IGZ1bmN0aW9uICh0aXRsZSwgZGVzY3JpcHRpb24sIGFjdGl2ZVByb2plY3ROYW1lKSB7XG5cdFx0Ly8gYWRkVGFza1RvRGlzcGxheSh0aXRsZSwgZGVzY3JpcHRpb24pO1xuXHRcdHRvZG8uYWRkVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGFjdGl2ZVByb2plY3ROYW1lKTtcblx0XHRjb25zb2xlLmxvZyh0aXRsZSwgZGVzY3JpcHRpb24pO1xuXHRcdHVwZGF0ZVRhc2tzRGlzcGxheSgpO1xuXHR9O1xuXG5cdGNvbnN0IHVwZGF0ZVRhc2tzRGlzcGxheSA9IGZ1bmN0aW9uICgpIHtcblx0XHRfY2xlYXJUYXNrRGlzcGxheSgpO1xuXHRcdGNvbnN0IGFjdGl2ZVByb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FjdGl2ZS1wcm9qZWN0JykuZGF0YXNldC5uYW1lO1xuXHRcdGNvbnN0IGFjdGl2ZVByb2plY3QgPSBwcm9qZWN0LmdldEFjdGl2ZVByb2plY3QoYWN0aXZlUHJvamVjdE5hbWUpO1xuXG5cdFx0Y29uc29sZS5sb2coJ2FkZGluZyB0YXNrcyB0byBkaXNwbGF5Li4uLicsIGFjdGl2ZVByb2plY3QpO1xuXHRcdGNvbnNvbGUubG9nKCdhZGRpbmcgdGFza3MgdG8gZGlzcGxheS4uLi4nLCBhY3RpdmVQcm9qZWN0LnRvZG8pO1xuXHRcdGFjdGl2ZVByb2plY3QudG9kby5mb3JFYWNoKCh0YXNrKSA9PiB7XG5cdFx0XHRfYWRkVGFza1RvRGlzcGxheSh0YXNrLnRpdGxlLCB0YXNrLmRlc2NyaXB0aW9uKTtcblx0XHR9KTtcblx0fTtcblxuXHRjb25zdCBfY2xlYXJUYXNrRGlzcGxheSA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zdCB0YXNrRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRpc3BsYXknKTtcblx0XHR3aGlsZSAodGFza0Rpc3BsYXkuZmlyc3RDaGlsZCkge1xuXHRcdFx0dGFza0Rpc3BsYXkucmVtb3ZlQ2hpbGQodGFza0Rpc3BsYXkubGFzdENoaWxkKTtcblx0XHR9XG5cdH07XG5cblx0Y29uc3QgX2FkZFRhc2tUb0Rpc3BsYXkgPSBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uKSB7XG5cdFx0Y29uc3QgdGFza0Rpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kaXNwbGF5Jyk7XG5cblx0XHR0YXNrRGlzcGxheS5hcHBlbmRDaGlsZChfY3JlYXRlVGFza0Rpdih0aXRsZSwgZGVzY3JpcHRpb24pKTtcblx0fTtcblxuXHRjb25zdCBfY3JlYXRlVGFza0RpdiA9IGZ1bmN0aW9uICh0aXRsZSwgZGVzY3JpcHRpb24pIHtcblx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXYuc2V0QXR0cmlidXRlKCdpZCcsICd0YXNrJyk7XG5cdFx0ZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1uYW1lJywgdGl0bGUpO1xuXHRcdGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0XHRjaGVja2JveC50eXBlID0gJ2NoZWNrYm94Jztcblx0XHRjb25zdCBkaXNwbGF5VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aXRsZScpO1xuXHRcdGNvbnN0IGRpc3BsYXlEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Rlc2NyaXB0aW9uJyk7XG5cdFx0Y29uc3QgZGVsZXRlVGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdGRpc3BsYXlUaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuXHRcdGRpc3BsYXlEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uO1xuXHRcdGRlbGV0ZVRhc2tCdXR0b24udGV4dENvbnRlbnQgPSAneCc7XG5cdFx0ZGl2LmFwcGVuZENoaWxkKGNoZWNrYm94KTtcblx0XHRkaXYuYXBwZW5kQ2hpbGQoZGlzcGxheVRpdGxlKTtcblx0XHRkaXYuYXBwZW5kQ2hpbGQoZGlzcGxheURlc2NyaXB0aW9uKTtcblx0XHRkaXYuYXBwZW5kQ2hpbGQoZGVsZXRlVGFza0J1dHRvbik7XG5cdFx0ZGVsZXRlVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9kZWxldGVUYXNrKTtcblx0XHRjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0J2NsaWNrJyxcblx0XHRcdChlKSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGUudGFyZ2V0LnBhcmVudE5vZGUpO1xuXHRcdFx0XHRlLnRhcmdldC5wYXJlbnROb2RlLnN0eWxlLmNvbG9yID0gJ3JlZCc7XG5cdFx0XHRcdGNoZWNrYm94LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdH0sXG5cdFx0XHR7IG9uY2U6IHRydWUgfVxuXHRcdCk7XG5cdFx0cmV0dXJuIGRpdjtcblx0fTtcblx0Y29uc3QgX2RlbGV0ZVRhc2sgPSBmdW5jdGlvbiAoZSkge1xuXHRcdGNvbnNvbGUubG9nKGUudGFyZ2V0LnBhcmVudE5vZGUpO1xuXHRcdGNvbnN0IGFjdGl2ZVByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWN0aXZlLXByb2plY3QnKTtcblx0XHRwcm9qZWN0LmRlbGV0ZVRvZG9Gb3JtUHJvamVjdChlLnRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubmFtZSwgYWN0aXZlUHJvamVjdC5kYXRhc2V0Lm5hbWUpO1xuXHRcdHVwZGF0ZVRhc2tzRGlzcGxheSgpO1xuXHR9O1xuXG5cdGNvbnN0IF9vcGVuUG9wVXBGb3JtID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1mb3JtLXBvcHVwJyk7XG5cdFx0Zm9ybS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0fTtcblxuXHRjb25zdCBfY2xvc2VQb3BVcEZvcm0gPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWZvcm0tcG9wdXAnKTtcblx0XHRmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdH07XG5cdHJldHVybiB7IHVwZGF0ZVByb2plY3RIZWFkZXIsIG9uQ2xpY2tBZGROZXdUYXNrLCB1cGRhdGVUYXNrc0Rpc3BsYXkgfTtcbn0pKCk7XG5cbmNvbnN0IGxvYWRVSSA9IGZ1bmN0aW9uICgpIHtcblx0ZG9jdW1lbnRcblx0XHQucXVlcnlTZWxlY3RvcignI2FkZC1uZXctcHJvamVjdCcpXG5cdFx0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvamVjdERpc3BsYXkub25DbGlja0FkZE5ld1Byb2plY3QsIGZhbHNlKTtcblx0ZG9jdW1lbnRcblx0XHQucXVlcnlTZWxlY3RvcignI2FkZC1uZXctdGFzaycpXG5cdFx0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9kb0Rpc3BsYXkub25DbGlja0FkZE5ld1Rhc2ssIGZhbHNlKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvYWRVSTtcbiIsImxldCBwcm9qZWN0cyA9IFtdO1xuXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0KG5hbWUpIHtcblx0cmV0dXJuIHsgbmFtZSwgdG9kbzogW10gfTtcbn1cblxuY29uc3QgcHJvamVjdCA9IChmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IGFkZFByb2plY3QgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdGNvbnN0IG5ld1Byb2plY3QgPSBjcmVhdGVQcm9qZWN0KG5hbWUpO1xuXHRcdHByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG5cdFx0Y29uc29sZS5sb2cocHJvamVjdHMpO1xuXHR9O1xuXG5cdGNvbnN0IGRlbFByb2plY3QgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdGNvbnN0IGluZGV4ID0gX2dldEluZGV4T2YobmFtZSk7XG5cdFx0cHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRjb25zb2xlLmxvZyhpbmRleCk7XG5cdFx0Y29uc29sZS5sb2cocHJvamVjdHMpO1xuXHR9O1xuXG5cdGNvbnN0IGFkZFRhc2tUb0FjdGl2ZVByb2plY3QgPSBmdW5jdGlvbiAobmV3VG9kbywgYWN0aXZlUHJvamVjdE5hbWUpIHtcblx0XHRjb25zdCBpbmRleE9mQWN0aXZlUHJvamVjdCA9IF9nZXRJbmRleE9mKGFjdGl2ZVByb2plY3ROYW1lKTtcblx0XHRwcm9qZWN0c1tpbmRleE9mQWN0aXZlUHJvamVjdF0udG9kby5wdXNoKG5ld1RvZG8pO1xuXHRcdGNvbnNvbGUubG9nKHByb2plY3RzKTtcblx0fTtcblxuXHRjb25zdCBnZXRBY3RpdmVQcm9qZWN0ID0gZnVuY3Rpb24gKGFjdGl2ZVByb2plY3ROYW1lKSB7XG5cdFx0Y29uc3QgaW5kZXhPZkFjdGl2ZVByb2plY3QgPSBfZ2V0SW5kZXhPZihhY3RpdmVQcm9qZWN0TmFtZSk7XG5cdFx0Y29uc29sZS5sb2cocHJvamVjdHNbaW5kZXhPZkFjdGl2ZVByb2plY3RdKTtcblx0XHRyZXR1cm4gcHJvamVjdHNbaW5kZXhPZkFjdGl2ZVByb2plY3RdO1xuXHR9O1xuXG5cdGNvbnN0IF9nZXRJbmRleE9mID0gZnVuY3Rpb24gKHByb2plY3ROYW1lKSB7XG5cdFx0Y29uc3QgaW5kZXggPSBwcm9qZWN0cy5maW5kSW5kZXgoKHByb2plY3QpID0+IHtcblx0XHRcdGlmIChwcm9qZWN0Lm5hbWUgPT0gcHJvamVjdE5hbWUpIHtcblx0XHRcdFx0cmV0dXJuIHByb2plY3Q7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGluZGV4O1xuXHR9O1xuXG5cdGNvbnN0IGRlbGV0ZVRvZG9Gb3JtUHJvamVjdCA9IGZ1bmN0aW9uICh0YXNrTmFtZSwgYWN0aXZlUHJvamVjdE5hbWUpIHtcblx0XHRjb25zb2xlLmxvZygnZGVsZXRlJywgdGFza05hbWUsICdmcm9tJywgYWN0aXZlUHJvamVjdE5hbWUpO1xuXG5cdFx0Y29uc3QgaW5kZXhPZkFjdGl2ZVByb2plY3QgPSBfZ2V0SW5kZXhPZihhY3RpdmVQcm9qZWN0TmFtZSk7XG5cdFx0Y29uc29sZS5sb2cocHJvamVjdHMpO1xuXHRcdHByb2plY3RzW2luZGV4T2ZBY3RpdmVQcm9qZWN0XS50b2RvID0gcHJvamVjdHNbaW5kZXhPZkFjdGl2ZVByb2plY3RdLnRvZG8uZmlsdGVyKFxuXHRcdFx0KHRvZG8pID0+IHRvZG8udGl0bGUgIT0gdGFza05hbWVcblx0XHQpO1xuXHRcdGNvbnNvbGUubG9nKHByb2plY3RzKTtcblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdGFkZFByb2plY3QsXG5cdFx0ZGVsUHJvamVjdCxcblx0XHRhZGRUYXNrVG9BY3RpdmVQcm9qZWN0LFxuXHRcdGdldEFjdGl2ZVByb2plY3QsXG5cdFx0ZGVsZXRlVG9kb0Zvcm1Qcm9qZWN0LFxuXHR9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgcHJvamVjdDtcbiIsImltcG9ydCBwcm9qZWN0IGZyb20gJy4vcHJvamVjdHMnO1xuXG5jb25zdCB0b2RvRmFjdG9yeSA9IGZ1bmN0aW9uICh0aXRsZSwgZGVzY3JpcHRpb24pIHtcblx0cmV0dXJuIHsgdGl0bGUsIGRlc2NyaXB0aW9uIH07XG59O1xuXG5jb25zdCB0b2RvID0gKGZ1bmN0aW9uICgpIHtcblx0Y29uc3QgYWRkVGFzayA9IGZ1bmN0aW9uICh0aXRsZSwgZGVzY3JpcHRpb24sIGFjdGl2ZVByb2plY3ROYW1lKSB7XG5cdFx0Y29uc29sZS5sb2coJ2FkZGluZyB0YXNrJyk7XG5cdFx0Y29uc3QgbmV3VG9kbyA9IHRvZG9GYWN0b3J5KHRpdGxlLCBkZXNjcmlwdGlvbik7XG5cdFx0cHJvamVjdC5hZGRUYXNrVG9BY3RpdmVQcm9qZWN0KG5ld1RvZG8sIGFjdGl2ZVByb2plY3ROYW1lKTtcblx0fTtcblx0cmV0dXJuIHsgYWRkVGFzayB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdG9kbztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGxvYWRVSSBmcm9tICcuL21vZHVsZXMvZGlzcGxheS1jb250cm9sbGVyJztcblxubG9hZFVJKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=