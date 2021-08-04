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
		_to_do__WEBPACK_IMPORTED_MODULE_1__.default.addTask(title, description, activeProjectName);
		console.log(title, description);
		_closePopUpForm();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7Ozs7b0dDTmtEOztBQUVsRCxvRUFBTSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2Rpc3BsYXktY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90by1kby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3QgZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgdG9kbyBmcm9tICcuL3RvLWRvJztcblxuY29uc3QgcHJvamVjdERpc3BsYXkgPSAoZnVuY3Rpb24gKCkge1xuXHRjb25zdCBvbkNsaWNrQWRkTmV3UHJvamVjdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zb2xlLmxvZygnYWRkIHByb2plY3QgY2xpY2sgJyk7XG5cdFx0X29wZW5Qb3BVcEZvcm0oKTtcblx0XHRjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LWZvcm0nKTtcblx0XHRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIF9fYWRkTmV3UHJvamVjdCwgeyBvbmNlOiB0cnVlIH0pO1xuXHR9O1xuXG5cdGNvbnN0IF9fYWRkTmV3UHJvamVjdCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lLWlucHV0JykudmFsdWU7XG5cdFx0Y29uc29sZS5sb2coJ0FkZGluZyAnLCBwcm9qZWN0TmFtZSk7XG5cdFx0cHJvamVjdC5hZGRQcm9qZWN0KHByb2plY3ROYW1lKTtcblx0XHRfYWRkUHJvamVjdFRvRGlzcGxheShwcm9qZWN0TmFtZSk7XG5cdFx0X2Nsb3NlUG9wVXBGb3JtKCk7XG5cdH07XG5cblx0Y29uc3QgX2FkZFByb2plY3RUb0Rpc3BsYXkgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdGNvbnN0IHByb2plY3REaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZGlzcGxheScpO1xuXHRcdF9jbGVhclByb2plY3RTZWxlY3Rpb24oKTtcblx0XHRjb25zdCBwcm9qZWN0RGl2ID0gX2NyZWF0ZVByb2plY3REaXYobmFtZSk7XG5cdFx0cHJvamVjdERpc3BsYXkuYXBwZW5kQ2hpbGQocHJvamVjdERpdik7XG5cdFx0dG9kb0Rpc3BsYXkudXBkYXRlUHJvamVjdEhlYWRlcigpO1xuXHRcdHRvZG9EaXNwbGF5LnVwZGF0ZVRhc2tzRGlzcGxheSgpO1xuXHR9O1xuXG5cdGNvbnN0IF9jcmVhdGVQcm9qZWN0RGl2ID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0cHJvamVjdERpdi50ZXh0Q29udGVudCA9IG5hbWU7XG5cdFx0cHJvamVjdERpdi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2FjdGl2ZS1wcm9qZWN0Jyk7XG5cdFx0cHJvamVjdERpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbmFtZScsIG5hbWUpO1xuXHRcdGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9ICd4Jztcblx0XHRwcm9qZWN0RGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG5cdFx0cHJvamVjdERpdi5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0J2NsaWNrJyxcblx0XHRcdChlKSA9PiB7XG5cdFx0XHRcdGlmIChlLnRhcmdldCAhPSBkZWxldGVCdXR0b24pIHtcblx0XHRcdFx0XHRfX3NldEFjdGl2ZVByb2plY3QoZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRmYWxzZVxuXHRcdCk7XG5cblx0XHRkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfX2RlbGV0ZVNlbGVjdGVkUHJvamVjdCwgeyBvbmNlOiB0cnVlIH0pO1xuXG5cdFx0cmV0dXJuIHByb2plY3REaXY7XG5cdH07XG5cblx0Y29uc3QgX19zZXRBY3RpdmVQcm9qZWN0ID0gZnVuY3Rpb24gKGUpIHtcblx0XHRjb25zb2xlLmxvZygnQWN0aXZhdGUgUHJvamVjdCcpO1xuXHRcdF9jbGVhclByb2plY3RTZWxlY3Rpb24oKTtcblx0XHRlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2FjdGl2ZS1wcm9qZWN0Jyk7XG5cdFx0dG9kb0Rpc3BsYXkudXBkYXRlUHJvamVjdEhlYWRlcigpO1xuXHRcdHRvZG9EaXNwbGF5LnVwZGF0ZVRhc2tzRGlzcGxheSgpO1xuXHR9O1xuXG5cdGNvbnN0IF9jbGVhclByb2plY3RTZWxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgcHJvamVjdERpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1kaXNwbGF5Jyk7XG5cdFx0cHJvamVjdERpc3BsYXkuY2hpbGROb2Rlcy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG5cdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAncHJvamVjdCcpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdGNvbnN0IF9fZGVsZXRlU2VsZWN0ZWRQcm9qZWN0ID0gZnVuY3Rpb24gKGUpIHtcblx0XHRjb25zb2xlLmxvZyhlLnRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubmFtZSk7XG5cdFx0cHJvamVjdC5kZWxQcm9qZWN0KGUudGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5uYW1lKTtcblx0XHRfZGVsZXRlUHJvamVjdEZyb21EaXNwbGF5KGUpO1xuXHR9O1xuXG5cdGNvbnN0IF9kZWxldGVQcm9qZWN0RnJvbURpc3BsYXkgPSBmdW5jdGlvbiAoZSkge1xuXHRcdGNvbnN0IHByb2plY3REaXYgPSBlLnRhcmdldC5wYXJlbnROb2RlO1xuXHRcdGNvbnN0IHByb2plY3REaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZGlzcGxheScpO1xuXHRcdHByb2plY3REaXNwbGF5LnJlbW92ZUNoaWxkKHByb2plY3REaXYpO1xuXHR9O1xuXG5cdGNvbnN0IF9vcGVuUG9wVXBGb3JtID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtLXBvcHVwJyk7XG5cdFx0Zm9ybS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3ZlcmxheScpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdHdpbmRvdy5vbmNsaWNrID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ292ZXJsYXknKTtcblx0XHRcdGlmIChldmVudC50YXJnZXQgPT0gb3ZlcmxheSkge1xuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QtZm9ybScpLnJlc2V0KCk7XG5cdFx0XHRcdF9jbG9zZVBvcFVwRm9ybSgpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH07XG5cblx0Y29uc3QgX2Nsb3NlUG9wVXBGb3JtID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtLXBvcHVwJyk7XG5cdFx0Zm9ybS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvamVjdC1mb3JtJykucmVzZXQoKTtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3ZlcmxheScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdH07XG5cblx0cmV0dXJuIHsgb25DbGlja0FkZE5ld1Byb2plY3QgfTtcbn0pKCk7XG5cbmNvbnN0IHRvZG9EaXNwbGF5ID0gKGZ1bmN0aW9uICgpIHtcblx0Y29uc3QgdXBkYXRlUHJvamVjdEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zdCBhY3RpdmVQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FjdGl2ZS1wcm9qZWN0Jyk7XG5cdFx0Y29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlbGVjdGVkLXByb2plY3QtbmFtZScpO1xuXHRcdGhlYWRlci50ZXh0Q29udGVudCA9IGFjdGl2ZVByb2plY3QuZGF0YXNldC5uYW1lO1xuXHR9O1xuXG5cdGNvbnN0IG9uQ2xpY2tBZGROZXdUYXNrID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnNvbGUubG9nKCdhZGQgdGFzay4uLicpO1xuXHRcdF9vcGVuUG9wVXBGb3JtKCk7XG5cdFx0Y29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzay1mb3JtJyk7XG5cdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0J3N1Ym1pdCcsXG5cdFx0XHRfX2FkZE5ld1Rhc2ssXG5cdFx0XHQvLyAoZXZlbnQpID0+IHtcblx0XHRcdC8vIFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdC8vIFx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay10aXRsZScpLnZhbHVlO1xuXHRcdFx0Ly8gXHRjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRlc2NyaXB0aW9uJykudmFsdWU7XG5cdFx0XHQvLyBcdGNvbnN0IGFjdGl2ZVByb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FjdGl2ZS1wcm9qZWN0JykuZGF0YXNldC5uYW1lO1xuXHRcdFx0Ly8gXHRfX2FkZE5ld1Rhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBhY3RpdmVQcm9qZWN0TmFtZSk7XG5cdFx0XHQvLyBcdGZvcm0ucmVzZXQoKTtcblx0XHRcdC8vIFx0X2Nsb3NlUG9wVXBGb3JtKCk7XG5cdFx0XHQvLyB9LFxuXHRcdFx0eyBvbmNlOiB0cnVlIH1cblx0XHQpO1xuXHR9O1xuXG5cdGNvbnN0IF9fYWRkTmV3VGFzayA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stdGl0bGUnKS52YWx1ZTtcblx0XHRjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRlc2NyaXB0aW9uJykudmFsdWU7XG5cdFx0Y29uc3QgYWN0aXZlUHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWN0aXZlLXByb2plY3QnKS5kYXRhc2V0Lm5hbWU7XG5cdFx0dG9kby5hZGRUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgYWN0aXZlUHJvamVjdE5hbWUpO1xuXHRcdGNvbnNvbGUubG9nKHRpdGxlLCBkZXNjcmlwdGlvbik7XG5cdFx0X2Nsb3NlUG9wVXBGb3JtKCk7XG5cdFx0dXBkYXRlVGFza3NEaXNwbGF5KCk7XG5cdH07XG5cblx0Y29uc3QgdXBkYXRlVGFza3NEaXNwbGF5ID0gZnVuY3Rpb24gKCkge1xuXHRcdF9jbGVhclRhc2tEaXNwbGF5KCk7XG5cdFx0Y29uc3QgYWN0aXZlUHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWN0aXZlLXByb2plY3QnKS5kYXRhc2V0Lm5hbWU7XG5cdFx0Y29uc3QgYWN0aXZlUHJvamVjdCA9IHByb2plY3QuZ2V0QWN0aXZlUHJvamVjdChhY3RpdmVQcm9qZWN0TmFtZSk7XG5cdFx0Y29uc29sZS5sb2coJ2FkZGluZyB0YXNrcyB0byBkaXNwbGF5Li4uLicsIGFjdGl2ZVByb2plY3QudG9kbyk7XG5cdFx0YWN0aXZlUHJvamVjdC50b2RvLmZvckVhY2goKHRhc2spID0+IHtcblx0XHRcdF9hZGRUYXNrVG9EaXNwbGF5KHRhc2sudGl0bGUsIHRhc2suZGVzY3JpcHRpb24pO1xuXHRcdH0pO1xuXHR9O1xuXG5cdGNvbnN0IF9jbGVhclRhc2tEaXNwbGF5ID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IHRhc2tEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGlzcGxheScpO1xuXHRcdHdoaWxlICh0YXNrRGlzcGxheS5maXJzdENoaWxkKSB7XG5cdFx0XHR0YXNrRGlzcGxheS5yZW1vdmVDaGlsZCh0YXNrRGlzcGxheS5sYXN0Q2hpbGQpO1xuXHRcdH1cblx0fTtcblxuXHRjb25zdCBfYWRkVGFza1RvRGlzcGxheSA9IGZ1bmN0aW9uICh0aXRsZSwgZGVzY3JpcHRpb24pIHtcblx0XHRjb25zdCB0YXNrRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRpc3BsYXknKTtcblxuXHRcdHRhc2tEaXNwbGF5LmFwcGVuZENoaWxkKF9jcmVhdGVUYXNrRGl2KHRpdGxlLCBkZXNjcmlwdGlvbikpO1xuXHR9O1xuXG5cdGNvbnN0IF9jcmVhdGVUYXNrRGl2ID0gZnVuY3Rpb24gKHRpdGxlLCBkZXNjcmlwdGlvbikge1xuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Rhc2snKTtcblx0XHRkaXYuc2V0QXR0cmlidXRlKCdkYXRhLW5hbWUnLCB0aXRsZSk7XG5cdFx0Y29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXHRcdGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuXHRcdGNvbnN0IGRpc3BsYXlUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RpdGxlJyk7XG5cdFx0Y29uc3QgZGlzcGxheURlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGVzY3JpcHRpb24nKTtcblx0XHRjb25zdCBkZWxldGVUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0ZGlzcGxheVRpdGxlLnRleHRDb250ZW50ID0gdGl0bGU7XG5cdFx0ZGlzcGxheURlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247XG5cdFx0ZGVsZXRlVGFza0J1dHRvbi50ZXh0Q29udGVudCA9ICd4Jztcblx0XHRkaXYuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuXHRcdGRpdi5hcHBlbmRDaGlsZChkaXNwbGF5VGl0bGUpO1xuXHRcdGRpdi5hcHBlbmRDaGlsZChkaXNwbGF5RGVzY3JpcHRpb24pO1xuXHRcdGRpdi5hcHBlbmRDaGlsZChkZWxldGVUYXNrQnV0dG9uKTtcblx0XHRkZWxldGVUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2RlbGV0ZVRhc2spO1xuXHRcdGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHQnY2xpY2snLFxuXHRcdFx0KGUpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2coZS50YXJnZXQucGFyZW50Tm9kZSk7XG5cdFx0XHRcdGUudGFyZ2V0LnBhcmVudE5vZGUuc3R5bGUuY29sb3IgPSAncmVkJztcblx0XHRcdFx0Y2hlY2tib3guZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0fSxcblx0XHRcdHsgb25jZTogdHJ1ZSB9XG5cdFx0KTtcblx0XHRyZXR1cm4gZGl2O1xuXHR9O1xuXHRjb25zdCBfZGVsZXRlVGFzayA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0Y29uc29sZS5sb2coZS50YXJnZXQucGFyZW50Tm9kZSk7XG5cdFx0Y29uc3QgYWN0aXZlUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhY3RpdmUtcHJvamVjdCcpO1xuXHRcdHByb2plY3QuZGVsZXRlVG9kb0Zvcm1Qcm9qZWN0KGUudGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5uYW1lLCBhY3RpdmVQcm9qZWN0LmRhdGFzZXQubmFtZSk7XG5cdFx0dXBkYXRlVGFza3NEaXNwbGF5KCk7XG5cdH07XG5cblx0Y29uc3QgX29wZW5Qb3BVcEZvcm0gPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWZvcm0tcG9wdXAnKTtcblx0XHRmb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdmVybGF5Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0d2luZG93Lm9uY2xpY2sgPSAoZXZlbnQpID0+IHtcblx0XHRcdGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheScpO1xuXHRcdFx0aWYgKGV2ZW50LnRhcmdldCA9PSBvdmVybGF5KSB7XG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvamVjdC1mb3JtJykucmVzZXQoKTtcblx0XHRcdFx0X2Nsb3NlUG9wVXBGb3JtKCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fTtcblxuXHRjb25zdCBfY2xvc2VQb3BVcEZvcm0gPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWZvcm0tcG9wdXAnKTtcblx0XHRmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrLWZvcm0nKS5yZXNldCgpO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdmVybGF5Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0fTtcblxuXHRyZXR1cm4geyB1cGRhdGVQcm9qZWN0SGVhZGVyLCBvbkNsaWNrQWRkTmV3VGFzaywgdXBkYXRlVGFza3NEaXNwbGF5IH07XG59KSgpO1xuXG5jb25zdCBsb2FkVUkgPSBmdW5jdGlvbiAoKSB7XG5cdGRvY3VtZW50XG5cdFx0LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtbmV3LXByb2plY3QnKVxuXHRcdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2plY3REaXNwbGF5Lm9uQ2xpY2tBZGROZXdQcm9qZWN0LCBmYWxzZSk7XG5cdGRvY3VtZW50XG5cdFx0LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtbmV3LXRhc2snKVxuXHRcdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZG9EaXNwbGF5Lm9uQ2xpY2tBZGROZXdUYXNrLCBmYWxzZSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBsb2FkVUk7XG4iLCJsZXQgcHJvamVjdHMgPSBbXTtcblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdChuYW1lKSB7XG5cdHJldHVybiB7IG5hbWUsIHRvZG86IFtdIH07XG59XG5cbmNvbnN0IHByb2plY3QgPSAoZnVuY3Rpb24gKCkge1xuXHRjb25zdCBhZGRQcm9qZWN0ID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRjb25zdCBuZXdQcm9qZWN0ID0gY3JlYXRlUHJvamVjdChuYW1lKTtcblx0XHRwcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuXHRcdGNvbnNvbGUubG9nKHByb2plY3RzKTtcblx0fTtcblxuXHRjb25zdCBkZWxQcm9qZWN0ID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRjb25zdCBpbmRleCA9IF9nZXRJbmRleE9mKG5hbWUpO1xuXHRcdHByb2plY3RzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0Y29uc29sZS5sb2coaW5kZXgpO1xuXHRcdGNvbnNvbGUubG9nKHByb2plY3RzKTtcblx0fTtcblxuXHRjb25zdCBhZGRUYXNrVG9BY3RpdmVQcm9qZWN0ID0gZnVuY3Rpb24gKG5ld1RvZG8sIGFjdGl2ZVByb2plY3ROYW1lKSB7XG5cdFx0Y29uc3QgaW5kZXhPZkFjdGl2ZVByb2plY3QgPSBfZ2V0SW5kZXhPZihhY3RpdmVQcm9qZWN0TmFtZSk7XG5cdFx0cHJvamVjdHNbaW5kZXhPZkFjdGl2ZVByb2plY3RdLnRvZG8ucHVzaChuZXdUb2RvKTtcblx0XHRjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG5cdH07XG5cblx0Y29uc3QgZ2V0QWN0aXZlUHJvamVjdCA9IGZ1bmN0aW9uIChhY3RpdmVQcm9qZWN0TmFtZSkge1xuXHRcdGNvbnN0IGluZGV4T2ZBY3RpdmVQcm9qZWN0ID0gX2dldEluZGV4T2YoYWN0aXZlUHJvamVjdE5hbWUpO1xuXHRcdGNvbnNvbGUubG9nKHByb2plY3RzW2luZGV4T2ZBY3RpdmVQcm9qZWN0XSk7XG5cdFx0cmV0dXJuIHByb2plY3RzW2luZGV4T2ZBY3RpdmVQcm9qZWN0XTtcblx0fTtcblxuXHRjb25zdCBfZ2V0SW5kZXhPZiA9IGZ1bmN0aW9uIChwcm9qZWN0TmFtZSkge1xuXHRcdGNvbnN0IGluZGV4ID0gcHJvamVjdHMuZmluZEluZGV4KChwcm9qZWN0KSA9PiB7XG5cdFx0XHRpZiAocHJvamVjdC5uYW1lID09IHByb2plY3ROYW1lKSB7XG5cdFx0XHRcdHJldHVybiBwcm9qZWN0O1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBpbmRleDtcblx0fTtcblxuXHRjb25zdCBkZWxldGVUb2RvRm9ybVByb2plY3QgPSBmdW5jdGlvbiAodGFza05hbWUsIGFjdGl2ZVByb2plY3ROYW1lKSB7XG5cdFx0Y29uc29sZS5sb2coJ2RlbGV0ZScsIHRhc2tOYW1lLCAnZnJvbScsIGFjdGl2ZVByb2plY3ROYW1lKTtcblxuXHRcdGNvbnN0IGluZGV4T2ZBY3RpdmVQcm9qZWN0ID0gX2dldEluZGV4T2YoYWN0aXZlUHJvamVjdE5hbWUpO1xuXHRcdGNvbnNvbGUubG9nKHByb2plY3RzKTtcblx0XHRwcm9qZWN0c1tpbmRleE9mQWN0aXZlUHJvamVjdF0udG9kbyA9IHByb2plY3RzW2luZGV4T2ZBY3RpdmVQcm9qZWN0XS50b2RvLmZpbHRlcihcblx0XHRcdCh0b2RvKSA9PiB0b2RvLnRpdGxlICE9IHRhc2tOYW1lXG5cdFx0KTtcblx0XHRjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRhZGRQcm9qZWN0LFxuXHRcdGRlbFByb2plY3QsXG5cdFx0YWRkVGFza1RvQWN0aXZlUHJvamVjdCxcblx0XHRnZXRBY3RpdmVQcm9qZWN0LFxuXHRcdGRlbGV0ZVRvZG9Gb3JtUHJvamVjdCxcblx0fTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3Q7XG4iLCJpbXBvcnQgcHJvamVjdCBmcm9tICcuL3Byb2plY3RzJztcblxuY29uc3QgdG9kb0ZhY3RvcnkgPSBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uKSB7XG5cdHJldHVybiB7IHRpdGxlLCBkZXNjcmlwdGlvbiB9O1xufTtcblxuY29uc3QgdG9kbyA9IChmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IGFkZFRhc2sgPSBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uLCBhY3RpdmVQcm9qZWN0TmFtZSkge1xuXHRcdGNvbnNvbGUubG9nKCdhZGRpbmcgdGFzaycpO1xuXHRcdGNvbnN0IG5ld1RvZG8gPSB0b2RvRmFjdG9yeSh0aXRsZSwgZGVzY3JpcHRpb24pO1xuXHRcdHByb2plY3QuYWRkVGFza1RvQWN0aXZlUHJvamVjdChuZXdUb2RvLCBhY3RpdmVQcm9qZWN0TmFtZSk7XG5cdH07XG5cdHJldHVybiB7IGFkZFRhc2sgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHRvZG87XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBsb2FkVUkgZnJvbSAnLi9tb2R1bGVzL2Rpc3BsYXktY29udHJvbGxlcic7XG5cbmxvYWRVSSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9