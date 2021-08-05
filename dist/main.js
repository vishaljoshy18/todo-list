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
		_sortTasksByDate(projects[indexOfActiveProject].todo);
		return projects[indexOfActiveProject];
	};
	const _sortTasksByDate = function (todoArray) {
		console.log(todoArray);
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
		const newTodo = todoFactory(title, description, _changeDateFormat(date));
		_projects__WEBPACK_IMPORTED_MODULE_0__.default.addTaskToActiveProject(newTodo, activeProjectName);
	};
	const _changeDateFormat = function (date) {
		const dateArray = date.split('-');
		const newFormat = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
		return newFormat;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O2tFQUFpQztzREFDTjs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxZQUFZO0FBQ2pFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRyx5REFBa0I7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsMkVBQW9DO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUEsb0VBQW9FLFlBQVk7O0FBRWhGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLEVBQUUseURBQWtCO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELFlBQVk7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHLG1EQUFZO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxvRUFBNkI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsK0RBQXdCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxvRUFBNkI7QUFDL0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsTUFBTSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNuUHRCOztBQUVBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7a0VDckZVOztBQUVqQztBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUscUVBQThCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixhQUFhLEdBQUcsYUFBYSxHQUFHLGFBQWE7QUFDcEU7QUFDQTtBQUNBLFVBQVU7QUFDVixDQUFDOztBQUVELGlFQUFlLElBQUksRUFBQzs7Ozs7OztVQ3BCcEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7Ozs7b0dDTmtEOztBQUVsRCxvRUFBTSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2Rpc3BsYXktY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90by1kby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3QgZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgdG9kbyBmcm9tICcuL3RvLWRvJztcblxuY29uc3QgcHJvamVjdERpc3BsYXkgPSAoZnVuY3Rpb24gKCkge1xuXHRjb25zdCBvbkNsaWNrQWRkTmV3UHJvamVjdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zb2xlLmxvZygnYWRkIHByb2plY3QgY2xpY2sgJyk7XG5cdFx0X29wZW5Qb3BVcEZvcm0oKTtcblx0XHRjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LWZvcm0nKTtcblx0XHRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIF9fYWRkTmV3UHJvamVjdCwgeyBvbmNlOiB0cnVlIH0pO1xuXHR9O1xuXG5cdGNvbnN0IF9fYWRkTmV3UHJvamVjdCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lLWlucHV0JykudmFsdWU7XG5cblx0XHRpZiAoX2NoZWNrSWZEdXBsaWNhdGUocHJvamVjdE5hbWUpKSB7XG5cdFx0XHRhbGVydCgncHJvamVjdCB3aXRoIHNhbWUgZXhpc3RzICcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmxvZygnQWRkaW5nICcsIHByb2plY3ROYW1lKTtcblx0XHRcdHByb2plY3QuYWRkUHJvamVjdChwcm9qZWN0TmFtZSk7XG5cdFx0XHRfYWRkUHJvamVjdFRvRGlzcGxheShwcm9qZWN0TmFtZSk7XG5cdFx0fVxuXHRcdF9jbG9zZVBvcFVwRm9ybSgpO1xuXHR9O1xuXHRjb25zdCBfY2hlY2tJZkR1cGxpY2F0ZSA9IGZ1bmN0aW9uIChwcm9qZWN0TmFtZSkge1xuXHRcdHJldHVybiBwcm9qZWN0LmNoZWNrRm9yRHVwbGljYXRlUHJvamVjdE5hbWUocHJvamVjdE5hbWUpO1xuXHR9O1xuXHRjb25zdCBfYWRkUHJvamVjdFRvRGlzcGxheSA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0Y29uc3QgcHJvamVjdERpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1kaXNwbGF5Jyk7XG5cdFx0X2NsZWFyUHJvamVjdFNlbGVjdGlvbigpO1xuXHRcdGNvbnN0IHByb2plY3REaXYgPSBfY3JlYXRlUHJvamVjdERpdihuYW1lKTtcblx0XHRwcm9qZWN0RGlzcGxheS5hcHBlbmRDaGlsZChwcm9qZWN0RGl2KTtcblx0XHR0b2RvRGlzcGxheS51cGRhdGVQcm9qZWN0SGVhZGVyKCk7XG5cdFx0dG9kb0Rpc3BsYXkudXBkYXRlVGFza3NEaXNwbGF5KCk7XG5cdH07XG5cblx0Y29uc3QgX2NyZWF0ZVByb2plY3REaXYgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRwcm9qZWN0RGl2LnRleHRDb250ZW50ID0gbmFtZTtcblx0XHRwcm9qZWN0RGl2LnNldEF0dHJpYnV0ZSgnaWQnLCAnYWN0aXZlLXByb2plY3QnKTtcblx0XHRwcm9qZWN0RGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1uYW1lJywgbmFtZSk7XG5cdFx0Y29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0ZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gJ3gnO1xuXHRcdHByb2plY3REaXYuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcblx0XHRwcm9qZWN0RGl2LmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHQnY2xpY2snLFxuXHRcdFx0KGUpID0+IHtcblx0XHRcdFx0aWYgKGUudGFyZ2V0ICE9IGRlbGV0ZUJ1dHRvbikge1xuXHRcdFx0XHRcdF9fc2V0QWN0aXZlUHJvamVjdChlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGZhbHNlXG5cdFx0KTtcblxuXHRcdGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9fZGVsZXRlU2VsZWN0ZWRQcm9qZWN0LCB7IG9uY2U6IHRydWUgfSk7XG5cblx0XHRyZXR1cm4gcHJvamVjdERpdjtcblx0fTtcblxuXHRjb25zdCBfX3NldEFjdGl2ZVByb2plY3QgPSBmdW5jdGlvbiAoZSkge1xuXHRcdGNvbnNvbGUubG9nKCdBY3RpdmF0ZSBQcm9qZWN0Jyk7XG5cdFx0X2NsZWFyUHJvamVjdFNlbGVjdGlvbigpO1xuXHRcdGUudGFyZ2V0LnNldEF0dHJpYnV0ZSgnaWQnLCAnYWN0aXZlLXByb2plY3QnKTtcblx0XHR0b2RvRGlzcGxheS51cGRhdGVQcm9qZWN0SGVhZGVyKCk7XG5cdFx0dG9kb0Rpc3BsYXkudXBkYXRlVGFza3NEaXNwbGF5KCk7XG5cdH07XG5cblx0Y29uc3QgX2NsZWFyUHJvamVjdFNlbGVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zdCBwcm9qZWN0RGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWRpc3BsYXknKTtcblx0XHRwcm9qZWN0RGlzcGxheS5jaGlsZE5vZGVzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcblx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICdwcm9qZWN0Jyk7XG5cdFx0fSk7XG5cdH07XG5cblx0Y29uc3QgX19kZWxldGVTZWxlY3RlZFByb2plY3QgPSBmdW5jdGlvbiAoZSkge1xuXHRcdGNvbnNvbGUubG9nKGUudGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5uYW1lKTtcblx0XHRwcm9qZWN0LmRlbFByb2plY3QoZS50YXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0Lm5hbWUpO1xuXHRcdF9kZWxldGVQcm9qZWN0RnJvbURpc3BsYXkoZSk7XG5cdH07XG5cblx0Y29uc3QgX2RlbGV0ZVByb2plY3RGcm9tRGlzcGxheSA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0Y29uc3QgcHJvamVjdERpdiA9IGUudGFyZ2V0LnBhcmVudE5vZGU7XG5cdFx0Y29uc3QgcHJvamVjdERpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1kaXNwbGF5Jyk7XG5cdFx0cHJvamVjdERpc3BsYXkucmVtb3ZlQ2hpbGQocHJvamVjdERpdik7XG5cdH07XG5cblx0Y29uc3QgX29wZW5Qb3BVcEZvcm0gPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWZvcm0tcG9wdXAnKTtcblx0XHRmb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdmVybGF5Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0d2luZG93Lm9uY2xpY2sgPSAoZXZlbnQpID0+IHtcblx0XHRcdGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheScpO1xuXHRcdFx0aWYgKGV2ZW50LnRhcmdldCA9PSBvdmVybGF5KSB7XG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvamVjdC1mb3JtJykucmVzZXQoKTtcblx0XHRcdFx0X2Nsb3NlUG9wVXBGb3JtKCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fTtcblxuXHRjb25zdCBfY2xvc2VQb3BVcEZvcm0gPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWZvcm0tcG9wdXAnKTtcblx0XHRmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LWZvcm0nKS5yZXNldCgpO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdmVybGF5Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0fTtcblxuXHRyZXR1cm4geyBvbkNsaWNrQWRkTmV3UHJvamVjdCB9O1xufSkoKTtcblxuY29uc3QgdG9kb0Rpc3BsYXkgPSAoZnVuY3Rpb24gKCkge1xuXHRjb25zdCB1cGRhdGVQcm9qZWN0SGVhZGVyID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IGFjdGl2ZVByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWN0aXZlLXByb2plY3QnKTtcblx0XHRjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VsZWN0ZWQtcHJvamVjdC1uYW1lJyk7XG5cdFx0aGVhZGVyLnRleHRDb250ZW50ID0gYWN0aXZlUHJvamVjdC5kYXRhc2V0Lm5hbWU7XG5cdH07XG5cblx0Y29uc3Qgb25DbGlja0FkZE5ld1Rhc2sgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc29sZS5sb2coJ2FkZCB0YXNrLi4uJyk7XG5cdFx0X29wZW5Qb3BVcEZvcm0oKTtcblx0XHRjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrLWZvcm0nKTtcblx0XHRfc2V0TWluRGF0ZSgpO1xuXHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgX19hZGROZXdUYXNrLCB7IG9uY2U6IHRydWUgfSk7XG5cdH07XG5cdGNvbnN0IF9zZXRNaW5EYXRlID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IHRhc2tGb3JtRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRhdGUnKTtcblx0XHRjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG5cdFx0Y29uc3QgZGQgPSBTdHJpbmcodG9kYXkuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCAnMCcpO1xuXHRcdGNvbnN0IG1tID0gU3RyaW5nKHRvZGF5LmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCAnMCcpO1xuXHRcdGNvbnN0IHl5eXkgPSB0b2RheS5nZXRGdWxsWWVhcigpO1xuXHRcdGNvbnN0IGRhdGUgPSBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XG5cdFx0dGFza0Zvcm1EYXRlLnNldEF0dHJpYnV0ZSgnbWluJywgZGF0ZSk7XG5cdH07XG5cblx0Y29uc3QgX19hZGROZXdUYXNrID0gZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay10aXRsZScpLnZhbHVlO1xuXHRcdGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGVzY3JpcHRpb24nKS52YWx1ZTtcblx0XHRjb25zdCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGF0ZScpLnZhbHVlO1xuXHRcdGNvbnN0IGFjdGl2ZVByb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FjdGl2ZS1wcm9qZWN0JykuZGF0YXNldC5uYW1lO1xuXHRcdGlmIChfY2hlY2tJZkR1cGxpY2F0ZVRhc2sodGl0bGUsIGFjdGl2ZVByb2plY3ROYW1lKSkge1xuXHRcdFx0YWxlcnQoJ3Rhc2sgd2l0aCBzYW1lIG5hbWUgZXhpc3RzJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRvZG8uYWRkVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIGFjdGl2ZVByb2plY3ROYW1lKTtcblx0XHRcdGNvbnNvbGUubG9nKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSk7XG5cdFx0XHR1cGRhdGVUYXNrc0Rpc3BsYXkoKTtcblx0XHR9XG5cdFx0X2Nsb3NlUG9wVXBGb3JtKCk7XG5cdH07XG5cdGNvbnN0IF9jaGVja0lmRHVwbGljYXRlVGFzayA9IGZ1bmN0aW9uICh0aXRsZSwgYWN0aXZlUHJvamVjdE5hbWUpIHtcblx0XHRyZXR1cm4gcHJvamVjdC5jaGVja0ZvckR1cGxpY2F0ZVRhc2sodGl0bGUsIGFjdGl2ZVByb2plY3ROYW1lKTtcblx0fTtcblx0Y29uc3QgdXBkYXRlVGFza3NEaXNwbGF5ID0gZnVuY3Rpb24gKCkge1xuXHRcdF9jbGVhclRhc2tEaXNwbGF5KCk7XG5cdFx0Y29uc3QgYWN0aXZlUHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWN0aXZlLXByb2plY3QnKS5kYXRhc2V0Lm5hbWU7XG5cdFx0Y29uc3QgYWN0aXZlUHJvamVjdCA9IHByb2plY3QuZ2V0QWN0aXZlUHJvamVjdChhY3RpdmVQcm9qZWN0TmFtZSk7XG5cdFx0Y29uc29sZS5sb2coJ2FkZGluZyB0YXNrcyB0byBkaXNwbGF5Li4uLicsIGFjdGl2ZVByb2plY3QudG9kbyk7XG5cdFx0YWN0aXZlUHJvamVjdC50b2RvLmZvckVhY2goKHRhc2spID0+IHtcblx0XHRcdF9hZGRUYXNrVG9EaXNwbGF5KHRhc2sudGl0bGUsIHRhc2suZGVzY3JpcHRpb24sIHRhc2suZGF0ZSk7XG5cdFx0fSk7XG5cdH07XG5cblx0Y29uc3QgX2NsZWFyVGFza0Rpc3BsYXkgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgdGFza0Rpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kaXNwbGF5Jyk7XG5cdFx0d2hpbGUgKHRhc2tEaXNwbGF5LmZpcnN0Q2hpbGQpIHtcblx0XHRcdHRhc2tEaXNwbGF5LnJlbW92ZUNoaWxkKHRhc2tEaXNwbGF5Lmxhc3RDaGlsZCk7XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IF9hZGRUYXNrVG9EaXNwbGF5ID0gZnVuY3Rpb24gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSkge1xuXHRcdGNvbnN0IHRhc2tEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGlzcGxheScpO1xuXHRcdHRhc2tEaXNwbGF5LmFwcGVuZENoaWxkKF9jcmVhdGVUYXNrRGl2KHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSkpO1xuXHR9O1xuXG5cdGNvbnN0IF9jcmVhdGVUYXNrRGl2ID0gZnVuY3Rpb24gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSkge1xuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Rhc2snKTtcblx0XHRkaXYuc2V0QXR0cmlidXRlKCdkYXRhLW5hbWUnLCB0aXRsZSk7XG5cdFx0Y29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXHRcdGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuXHRcdGNvbnN0IGRpc3BsYXlUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGNvbnN0IGRpc3BsYXlEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGNvbnN0IGRpc3BsYXlEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0Y29uc3QgZGVsZXRlVGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdGRpc3BsYXlUaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuXHRcdGRpc3BsYXlEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uO1xuXHRcdGRpc3BsYXlEYXRlLnRleHRDb250ZW50ID0gZGF0ZTtcblx0XHRkZWxldGVUYXNrQnV0dG9uLnRleHRDb250ZW50ID0gJ3gnO1xuXHRcdGRpdi5hcHBlbmRDaGlsZChjaGVja2JveCk7XG5cdFx0ZGl2LmFwcGVuZENoaWxkKGRpc3BsYXlUaXRsZSk7XG5cdFx0ZGl2LmFwcGVuZENoaWxkKGRpc3BsYXlEZXNjcmlwdGlvbik7XG5cdFx0ZGl2LmFwcGVuZENoaWxkKGRpc3BsYXlEYXRlKTtcblx0XHRkaXYuYXBwZW5kQ2hpbGQoZGVsZXRlVGFza0J1dHRvbik7XG5cdFx0ZGVsZXRlVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9kZWxldGVUYXNrKTtcblx0XHRjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0J2NsaWNrJyxcblx0XHRcdChlKSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGUudGFyZ2V0LnBhcmVudE5vZGUpO1xuXHRcdFx0XHRlLnRhcmdldC5wYXJlbnROb2RlLnN0eWxlLmNvbG9yID0gJ3JlZCc7XG5cdFx0XHRcdGNoZWNrYm94LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdH0sXG5cdFx0XHR7IG9uY2U6IHRydWUgfVxuXHRcdCk7XG5cdFx0cmV0dXJuIGRpdjtcblx0fTtcblx0Y29uc3QgX2RlbGV0ZVRhc2sgPSBmdW5jdGlvbiAoZSkge1xuXHRcdGNvbnNvbGUubG9nKGUudGFyZ2V0LnBhcmVudE5vZGUpO1xuXHRcdGNvbnN0IGFjdGl2ZVByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWN0aXZlLXByb2plY3QnKTtcblx0XHRwcm9qZWN0LmRlbGV0ZVRvZG9Gb3JtUHJvamVjdChlLnRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubmFtZSwgYWN0aXZlUHJvamVjdC5kYXRhc2V0Lm5hbWUpO1xuXHRcdHVwZGF0ZVRhc2tzRGlzcGxheSgpO1xuXHR9O1xuXG5cdGNvbnN0IF9vcGVuUG9wVXBGb3JtID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1mb3JtLXBvcHVwJyk7XG5cdFx0Zm9ybS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3ZlcmxheScpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdHdpbmRvdy5vbmNsaWNrID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ292ZXJsYXknKTtcblx0XHRcdGlmIChldmVudC50YXJnZXQgPT0gb3ZlcmxheSkge1xuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QtZm9ybScpLnJlc2V0KCk7XG5cdFx0XHRcdF9jbG9zZVBvcFVwRm9ybSgpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH07XG5cblx0Y29uc3QgX2Nsb3NlUG9wVXBGb3JtID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1mb3JtLXBvcHVwJyk7XG5cdFx0Zm9ybS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzay1mb3JtJykucmVzZXQoKTtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3ZlcmxheScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdH07XG5cblx0cmV0dXJuIHsgdXBkYXRlUHJvamVjdEhlYWRlciwgb25DbGlja0FkZE5ld1Rhc2ssIHVwZGF0ZVRhc2tzRGlzcGxheSB9O1xufSkoKTtcblxuY29uc3QgbG9hZFVJID0gZnVuY3Rpb24gKCkge1xuXHRkb2N1bWVudFxuXHRcdC5xdWVyeVNlbGVjdG9yKCcjYWRkLW5ldy1wcm9qZWN0Jylcblx0XHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9qZWN0RGlzcGxheS5vbkNsaWNrQWRkTmV3UHJvamVjdCwgZmFsc2UpO1xuXHRkb2N1bWVudFxuXHRcdC5xdWVyeVNlbGVjdG9yKCcjYWRkLW5ldy10YXNrJylcblx0XHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2RvRGlzcGxheS5vbkNsaWNrQWRkTmV3VGFzaywgZmFsc2UpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbG9hZFVJO1xuIiwibGV0IHByb2plY3RzID0gW107XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QobmFtZSkge1xuXHRyZXR1cm4geyBuYW1lLCB0b2RvOiBbXSB9O1xufVxuXG5jb25zdCBwcm9qZWN0ID0gKGZ1bmN0aW9uICgpIHtcblx0Y29uc3QgYWRkUHJvamVjdCA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0Y29uc3QgbmV3UHJvamVjdCA9IGNyZWF0ZVByb2plY3QobmFtZSk7XG5cdFx0cHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcblx0XHRjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG5cdH07XG5cblx0Y29uc3QgZGVsUHJvamVjdCA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0Y29uc3QgaW5kZXggPSBfZ2V0SW5kZXhPZihuYW1lKTtcblx0XHRwcm9qZWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdGNvbnNvbGUubG9nKGluZGV4KTtcblx0XHRjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG5cdH07XG5cblx0Y29uc3QgYWRkVGFza1RvQWN0aXZlUHJvamVjdCA9IGZ1bmN0aW9uIChuZXdUb2RvLCBhY3RpdmVQcm9qZWN0TmFtZSkge1xuXHRcdGNvbnN0IGluZGV4T2ZBY3RpdmVQcm9qZWN0ID0gX2dldEluZGV4T2YoYWN0aXZlUHJvamVjdE5hbWUpO1xuXHRcdHByb2plY3RzW2luZGV4T2ZBY3RpdmVQcm9qZWN0XS50b2RvLnB1c2gobmV3VG9kbyk7XG5cdFx0Y29uc29sZS5sb2cocHJvamVjdHMpO1xuXHR9O1xuXG5cdGNvbnN0IGdldEFjdGl2ZVByb2plY3QgPSBmdW5jdGlvbiAoYWN0aXZlUHJvamVjdE5hbWUpIHtcblx0XHRjb25zdCBpbmRleE9mQWN0aXZlUHJvamVjdCA9IF9nZXRJbmRleE9mKGFjdGl2ZVByb2plY3ROYW1lKTtcblx0XHRjb25zb2xlLmxvZyhwcm9qZWN0c1tpbmRleE9mQWN0aXZlUHJvamVjdF0pO1xuXHRcdF9zb3J0VGFza3NCeURhdGUocHJvamVjdHNbaW5kZXhPZkFjdGl2ZVByb2plY3RdLnRvZG8pO1xuXHRcdHJldHVybiBwcm9qZWN0c1tpbmRleE9mQWN0aXZlUHJvamVjdF07XG5cdH07XG5cdGNvbnN0IF9zb3J0VGFza3NCeURhdGUgPSBmdW5jdGlvbiAodG9kb0FycmF5KSB7XG5cdFx0Y29uc29sZS5sb2codG9kb0FycmF5KTtcblx0fTtcblxuXHRjb25zdCBfZ2V0SW5kZXhPZiA9IGZ1bmN0aW9uIChwcm9qZWN0TmFtZSkge1xuXHRcdGNvbnN0IGluZGV4ID0gcHJvamVjdHMuZmluZEluZGV4KChwcm9qZWN0KSA9PiB7XG5cdFx0XHRpZiAocHJvamVjdC5uYW1lID09IHByb2plY3ROYW1lKSB7XG5cdFx0XHRcdHJldHVybiBwcm9qZWN0O1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBpbmRleDtcblx0fTtcblxuXHRjb25zdCBkZWxldGVUb2RvRm9ybVByb2plY3QgPSBmdW5jdGlvbiAodGFza05hbWUsIGFjdGl2ZVByb2plY3ROYW1lKSB7XG5cdFx0Y29uc29sZS5sb2coJ2RlbGV0ZScsIHRhc2tOYW1lLCAnZnJvbScsIGFjdGl2ZVByb2plY3ROYW1lKTtcblxuXHRcdGNvbnN0IGluZGV4T2ZBY3RpdmVQcm9qZWN0ID0gX2dldEluZGV4T2YoYWN0aXZlUHJvamVjdE5hbWUpO1xuXHRcdGNvbnNvbGUubG9nKHByb2plY3RzKTtcblx0XHRwcm9qZWN0c1tpbmRleE9mQWN0aXZlUHJvamVjdF0udG9kbyA9IHByb2plY3RzW2luZGV4T2ZBY3RpdmVQcm9qZWN0XS50b2RvLmZpbHRlcihcblx0XHRcdCh0b2RvKSA9PiB0b2RvLnRpdGxlICE9IHRhc2tOYW1lXG5cdFx0KTtcblx0XHRjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG5cdH07XG5cdGNvbnN0IGNoZWNrRm9yRHVwbGljYXRlUHJvamVjdE5hbWUgPSBmdW5jdGlvbiAocHJvamVjdE5hbWUpIHtcblx0XHRjb25zdCBpbmRleCA9IF9nZXRJbmRleE9mKHByb2plY3ROYW1lKTtcblx0XHRpZiAoaW5kZXgpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cdGNvbnN0IGNoZWNrRm9yRHVwbGljYXRlVGFzayA9IGZ1bmN0aW9uICh0YXNrVGl0bGUsIHByb2plY3ROYW1lKSB7XG5cdFx0Y29uc3QgcHJvamVjdEluZGV4ID0gX2dldEluZGV4T2YocHJvamVjdE5hbWUpO1xuXHRcdGNvbnN0IHRhc2tJbmRleCA9IHByb2plY3RzW3Byb2plY3RJbmRleF0udG9kby5maW5kSW5kZXgoKHRvZG8pID0+IHtcblx0XHRcdGlmICh0b2RvLnRpdGxlID09PSB0YXNrVGl0bGUpIHtcblx0XHRcdFx0cmV0dXJuIHRvZG87XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0aWYgKHRhc2tJbmRleCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcblx0cmV0dXJuIHtcblx0XHRhZGRQcm9qZWN0LFxuXHRcdGRlbFByb2plY3QsXG5cdFx0YWRkVGFza1RvQWN0aXZlUHJvamVjdCxcblx0XHRnZXRBY3RpdmVQcm9qZWN0LFxuXHRcdGRlbGV0ZVRvZG9Gb3JtUHJvamVjdCxcblx0XHRjaGVja0ZvckR1cGxpY2F0ZVByb2plY3ROYW1lLFxuXHRcdGNoZWNrRm9yRHVwbGljYXRlVGFzayxcblx0fTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3Q7XG4iLCJpbXBvcnQgcHJvamVjdCBmcm9tICcuL3Byb2plY3RzJztcblxuY29uc3QgdG9kb0ZhY3RvcnkgPSBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlKSB7XG5cdHJldHVybiB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSB9O1xufTtcblxuY29uc3QgdG9kbyA9IChmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IGFkZFRhc2sgPSBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBhY3RpdmVQcm9qZWN0TmFtZSkge1xuXHRcdGNvbnNvbGUubG9nKCdhZGRpbmcgdGFzaycpO1xuXHRcdGNvbnN0IG5ld1RvZG8gPSB0b2RvRmFjdG9yeSh0aXRsZSwgZGVzY3JpcHRpb24sIF9jaGFuZ2VEYXRlRm9ybWF0KGRhdGUpKTtcblx0XHRwcm9qZWN0LmFkZFRhc2tUb0FjdGl2ZVByb2plY3QobmV3VG9kbywgYWN0aXZlUHJvamVjdE5hbWUpO1xuXHR9O1xuXHRjb25zdCBfY2hhbmdlRGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIChkYXRlKSB7XG5cdFx0Y29uc3QgZGF0ZUFycmF5ID0gZGF0ZS5zcGxpdCgnLScpO1xuXHRcdGNvbnN0IG5ld0Zvcm1hdCA9IGAke2RhdGVBcnJheVsyXX0tJHtkYXRlQXJyYXlbMV19LSR7ZGF0ZUFycmF5WzBdfWA7XG5cdFx0cmV0dXJuIG5ld0Zvcm1hdDtcblx0fTtcblx0cmV0dXJuIHsgYWRkVGFzayB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdG9kbztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGxvYWRVSSBmcm9tICcuL21vZHVsZXMvZGlzcGxheS1jb250cm9sbGVyJztcblxubG9hZFVJKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=