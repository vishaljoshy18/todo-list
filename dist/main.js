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
		form.addEventListener('submit', __addNewTask, { once: true });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O2tFQUFpQztzREFDTjs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxZQUFZO0FBQ2pFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRyx5REFBa0I7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsMkVBQW9DO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUEsb0VBQW9FLFlBQVk7O0FBRWhGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLEVBQUUseURBQWtCO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxZQUFZO0FBQzlEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRyxtREFBWTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsb0VBQTZCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLCtEQUF3QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLG9FQUE2QjtBQUMvQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxNQUFNLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzFPdEI7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7a0VDakZVOztBQUVqQztBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUscUVBQThCO0FBQ2hDO0FBQ0EsVUFBVTtBQUNWLENBQUM7O0FBRUQsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7O1VDZnBCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7O29HQ05rRDs7QUFFbEQsb0VBQU0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9kaXNwbGF5LWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdG8tZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwcm9qZWN0IGZyb20gJy4vcHJvamVjdHMnO1xuaW1wb3J0IHRvZG8gZnJvbSAnLi90by1kbyc7XG5cbmNvbnN0IHByb2plY3REaXNwbGF5ID0gKGZ1bmN0aW9uICgpIHtcblx0Y29uc3Qgb25DbGlja0FkZE5ld1Byb2plY3QgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc29sZS5sb2coJ2FkZCBwcm9qZWN0IGNsaWNrICcpO1xuXHRcdF9vcGVuUG9wVXBGb3JtKCk7XG5cdFx0Y29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvamVjdC1mb3JtJyk7XG5cdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBfX2FkZE5ld1Byb2plY3QsIHsgb25jZTogdHJ1ZSB9KTtcblx0fTtcblxuXHRjb25zdCBfX2FkZE5ld1Byb2plY3QgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZS1pbnB1dCcpLnZhbHVlO1xuXG5cdFx0aWYgKF9jaGVja0lmRHVwbGljYXRlKHByb2plY3ROYW1lKSkge1xuXHRcdFx0YWxlcnQoJ3Byb2plY3Qgd2l0aCBzYW1lIGV4aXN0cyAnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS5sb2coJ0FkZGluZyAnLCBwcm9qZWN0TmFtZSk7XG5cdFx0XHRwcm9qZWN0LmFkZFByb2plY3QocHJvamVjdE5hbWUpO1xuXHRcdFx0X2FkZFByb2plY3RUb0Rpc3BsYXkocHJvamVjdE5hbWUpO1xuXHRcdH1cblx0XHRfY2xvc2VQb3BVcEZvcm0oKTtcblx0fTtcblx0Y29uc3QgX2NoZWNrSWZEdXBsaWNhdGUgPSBmdW5jdGlvbiAocHJvamVjdE5hbWUpIHtcblx0XHRyZXR1cm4gcHJvamVjdC5jaGVja0ZvckR1cGxpY2F0ZVByb2plY3ROYW1lKHByb2plY3ROYW1lKTtcblx0fTtcblx0Y29uc3QgX2FkZFByb2plY3RUb0Rpc3BsYXkgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdGNvbnN0IHByb2plY3REaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZGlzcGxheScpO1xuXHRcdF9jbGVhclByb2plY3RTZWxlY3Rpb24oKTtcblx0XHRjb25zdCBwcm9qZWN0RGl2ID0gX2NyZWF0ZVByb2plY3REaXYobmFtZSk7XG5cdFx0cHJvamVjdERpc3BsYXkuYXBwZW5kQ2hpbGQocHJvamVjdERpdik7XG5cdFx0dG9kb0Rpc3BsYXkudXBkYXRlUHJvamVjdEhlYWRlcigpO1xuXHRcdHRvZG9EaXNwbGF5LnVwZGF0ZVRhc2tzRGlzcGxheSgpO1xuXHR9O1xuXG5cdGNvbnN0IF9jcmVhdGVQcm9qZWN0RGl2ID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0cHJvamVjdERpdi50ZXh0Q29udGVudCA9IG5hbWU7XG5cdFx0cHJvamVjdERpdi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2FjdGl2ZS1wcm9qZWN0Jyk7XG5cdFx0cHJvamVjdERpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbmFtZScsIG5hbWUpO1xuXHRcdGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9ICd4Jztcblx0XHRwcm9qZWN0RGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG5cdFx0cHJvamVjdERpdi5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0J2NsaWNrJyxcblx0XHRcdChlKSA9PiB7XG5cdFx0XHRcdGlmIChlLnRhcmdldCAhPSBkZWxldGVCdXR0b24pIHtcblx0XHRcdFx0XHRfX3NldEFjdGl2ZVByb2plY3QoZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRmYWxzZVxuXHRcdCk7XG5cblx0XHRkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfX2RlbGV0ZVNlbGVjdGVkUHJvamVjdCwgeyBvbmNlOiB0cnVlIH0pO1xuXG5cdFx0cmV0dXJuIHByb2plY3REaXY7XG5cdH07XG5cblx0Y29uc3QgX19zZXRBY3RpdmVQcm9qZWN0ID0gZnVuY3Rpb24gKGUpIHtcblx0XHRjb25zb2xlLmxvZygnQWN0aXZhdGUgUHJvamVjdCcpO1xuXHRcdF9jbGVhclByb2plY3RTZWxlY3Rpb24oKTtcblx0XHRlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2FjdGl2ZS1wcm9qZWN0Jyk7XG5cdFx0dG9kb0Rpc3BsYXkudXBkYXRlUHJvamVjdEhlYWRlcigpO1xuXHRcdHRvZG9EaXNwbGF5LnVwZGF0ZVRhc2tzRGlzcGxheSgpO1xuXHR9O1xuXG5cdGNvbnN0IF9jbGVhclByb2plY3RTZWxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgcHJvamVjdERpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1kaXNwbGF5Jyk7XG5cdFx0cHJvamVjdERpc3BsYXkuY2hpbGROb2Rlcy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG5cdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAncHJvamVjdCcpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdGNvbnN0IF9fZGVsZXRlU2VsZWN0ZWRQcm9qZWN0ID0gZnVuY3Rpb24gKGUpIHtcblx0XHRjb25zb2xlLmxvZyhlLnRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubmFtZSk7XG5cdFx0cHJvamVjdC5kZWxQcm9qZWN0KGUudGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5uYW1lKTtcblx0XHRfZGVsZXRlUHJvamVjdEZyb21EaXNwbGF5KGUpO1xuXHR9O1xuXG5cdGNvbnN0IF9kZWxldGVQcm9qZWN0RnJvbURpc3BsYXkgPSBmdW5jdGlvbiAoZSkge1xuXHRcdGNvbnN0IHByb2plY3REaXYgPSBlLnRhcmdldC5wYXJlbnROb2RlO1xuXHRcdGNvbnN0IHByb2plY3REaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZGlzcGxheScpO1xuXHRcdHByb2plY3REaXNwbGF5LnJlbW92ZUNoaWxkKHByb2plY3REaXYpO1xuXHR9O1xuXG5cdGNvbnN0IF9vcGVuUG9wVXBGb3JtID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtLXBvcHVwJyk7XG5cdFx0Zm9ybS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3ZlcmxheScpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdHdpbmRvdy5vbmNsaWNrID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ292ZXJsYXknKTtcblx0XHRcdGlmIChldmVudC50YXJnZXQgPT0gb3ZlcmxheSkge1xuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QtZm9ybScpLnJlc2V0KCk7XG5cdFx0XHRcdF9jbG9zZVBvcFVwRm9ybSgpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH07XG5cblx0Y29uc3QgX2Nsb3NlUG9wVXBGb3JtID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtLXBvcHVwJyk7XG5cdFx0Zm9ybS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvamVjdC1mb3JtJykucmVzZXQoKTtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3ZlcmxheScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdH07XG5cblx0cmV0dXJuIHsgb25DbGlja0FkZE5ld1Byb2plY3QgfTtcbn0pKCk7XG5cbmNvbnN0IHRvZG9EaXNwbGF5ID0gKGZ1bmN0aW9uICgpIHtcblx0Y29uc3QgdXBkYXRlUHJvamVjdEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zdCBhY3RpdmVQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FjdGl2ZS1wcm9qZWN0Jyk7XG5cdFx0Y29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlbGVjdGVkLXByb2plY3QtbmFtZScpO1xuXHRcdGhlYWRlci50ZXh0Q29udGVudCA9IGFjdGl2ZVByb2plY3QuZGF0YXNldC5uYW1lO1xuXHR9O1xuXG5cdGNvbnN0IG9uQ2xpY2tBZGROZXdUYXNrID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnNvbGUubG9nKCdhZGQgdGFzay4uLicpO1xuXHRcdF9vcGVuUG9wVXBGb3JtKCk7XG5cdFx0Y29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzay1mb3JtJyk7XG5cdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBfX2FkZE5ld1Rhc2ssIHsgb25jZTogdHJ1ZSB9KTtcblx0fTtcblxuXHRjb25zdCBfX2FkZE5ld1Rhc2sgPSBmdW5jdGlvbiAoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLXRpdGxlJykudmFsdWU7XG5cdFx0Y29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXNjcmlwdGlvbicpLnZhbHVlO1xuXHRcdGNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kYXRlJykudmFsdWU7XG5cdFx0Y29uc3QgYWN0aXZlUHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWN0aXZlLXByb2plY3QnKS5kYXRhc2V0Lm5hbWU7XG5cdFx0aWYgKF9jaGVja0lmRHVwbGljYXRlVGFzayh0aXRsZSwgYWN0aXZlUHJvamVjdE5hbWUpKSB7XG5cdFx0XHRhbGVydCgndGFzayB3aXRoIHNhbWUgbmFtZSBleGlzdHMnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dG9kby5hZGRUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgYWN0aXZlUHJvamVjdE5hbWUpO1xuXHRcdFx0Y29uc29sZS5sb2codGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlKTtcblx0XHRcdHVwZGF0ZVRhc2tzRGlzcGxheSgpO1xuXHRcdH1cblx0XHRfY2xvc2VQb3BVcEZvcm0oKTtcblx0fTtcblx0Y29uc3QgX2NoZWNrSWZEdXBsaWNhdGVUYXNrID0gZnVuY3Rpb24gKHRpdGxlLCBhY3RpdmVQcm9qZWN0TmFtZSkge1xuXHRcdHJldHVybiBwcm9qZWN0LmNoZWNrRm9yRHVwbGljYXRlVGFzayh0aXRsZSwgYWN0aXZlUHJvamVjdE5hbWUpO1xuXHR9O1xuXHRjb25zdCB1cGRhdGVUYXNrc0Rpc3BsYXkgPSBmdW5jdGlvbiAoKSB7XG5cdFx0X2NsZWFyVGFza0Rpc3BsYXkoKTtcblx0XHRjb25zdCBhY3RpdmVQcm9qZWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhY3RpdmUtcHJvamVjdCcpLmRhdGFzZXQubmFtZTtcblx0XHRjb25zdCBhY3RpdmVQcm9qZWN0ID0gcHJvamVjdC5nZXRBY3RpdmVQcm9qZWN0KGFjdGl2ZVByb2plY3ROYW1lKTtcblx0XHRjb25zb2xlLmxvZygnYWRkaW5nIHRhc2tzIHRvIGRpc3BsYXkuLi4uJywgYWN0aXZlUHJvamVjdC50b2RvKTtcblx0XHRhY3RpdmVQcm9qZWN0LnRvZG8uZm9yRWFjaCgodGFzaykgPT4ge1xuXHRcdFx0X2FkZFRhc2tUb0Rpc3BsYXkodGFzay50aXRsZSwgdGFzay5kZXNjcmlwdGlvbiwgdGFzay5kYXRlKTtcblx0XHR9KTtcblx0fTtcblxuXHRjb25zdCBfY2xlYXJUYXNrRGlzcGxheSA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zdCB0YXNrRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRpc3BsYXknKTtcblx0XHR3aGlsZSAodGFza0Rpc3BsYXkuZmlyc3RDaGlsZCkge1xuXHRcdFx0dGFza0Rpc3BsYXkucmVtb3ZlQ2hpbGQodGFza0Rpc3BsYXkubGFzdENoaWxkKTtcblx0XHR9XG5cdH07XG5cblx0Y29uc3QgX2FkZFRhc2tUb0Rpc3BsYXkgPSBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlKSB7XG5cdFx0Y29uc3QgdGFza0Rpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kaXNwbGF5Jyk7XG5cblx0XHR0YXNrRGlzcGxheS5hcHBlbmRDaGlsZChfY3JlYXRlVGFza0Rpdih0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUpKTtcblx0fTtcblxuXHRjb25zdCBfY3JlYXRlVGFza0RpdiA9IGZ1bmN0aW9uICh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUpIHtcblx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXYuc2V0QXR0cmlidXRlKCdpZCcsICd0YXNrJyk7XG5cdFx0ZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1uYW1lJywgdGl0bGUpO1xuXHRcdGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0XHRjaGVja2JveC50eXBlID0gJ2NoZWNrYm94Jztcblx0XHRjb25zdCBkaXNwbGF5VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRjb25zdCBkaXNwbGF5RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRjb25zdCBkaXNwbGF5RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGNvbnN0IGRlbGV0ZVRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0XHRkaXNwbGF5VGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcblx0XHRkaXNwbGF5RGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBkZXNjcmlwdGlvbjtcblx0XHRkaXNwbGF5RGF0ZS50ZXh0Q29udGVudCA9IGRhdGU7XG5cdFx0ZGVsZXRlVGFza0J1dHRvbi50ZXh0Q29udGVudCA9ICd4Jztcblx0XHRkaXYuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuXHRcdGRpdi5hcHBlbmRDaGlsZChkaXNwbGF5VGl0bGUpO1xuXHRcdGRpdi5hcHBlbmRDaGlsZChkaXNwbGF5RGVzY3JpcHRpb24pO1xuXHRcdGRpdi5hcHBlbmRDaGlsZChkaXNwbGF5RGF0ZSk7XG5cdFx0ZGl2LmFwcGVuZENoaWxkKGRlbGV0ZVRhc2tCdXR0b24pO1xuXHRcdGRlbGV0ZVRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfZGVsZXRlVGFzayk7XG5cdFx0Y2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdCdjbGljaycsXG5cdFx0XHQoZSkgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlLnRhcmdldC5wYXJlbnROb2RlKTtcblx0XHRcdFx0ZS50YXJnZXQucGFyZW50Tm9kZS5zdHlsZS5jb2xvciA9ICdyZWQnO1xuXHRcdFx0XHRjaGVja2JveC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHR9LFxuXHRcdFx0eyBvbmNlOiB0cnVlIH1cblx0XHQpO1xuXHRcdHJldHVybiBkaXY7XG5cdH07XG5cdGNvbnN0IF9kZWxldGVUYXNrID0gZnVuY3Rpb24gKGUpIHtcblx0XHRjb25zb2xlLmxvZyhlLnRhcmdldC5wYXJlbnROb2RlKTtcblx0XHRjb25zdCBhY3RpdmVQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FjdGl2ZS1wcm9qZWN0Jyk7XG5cdFx0cHJvamVjdC5kZWxldGVUb2RvRm9ybVByb2plY3QoZS50YXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0Lm5hbWUsIGFjdGl2ZVByb2plY3QuZGF0YXNldC5uYW1lKTtcblx0XHR1cGRhdGVUYXNrc0Rpc3BsYXkoKTtcblx0fTtcblxuXHRjb25zdCBfb3BlblBvcFVwRm9ybSA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stZm9ybS1wb3B1cCcpO1xuXHRcdGZvcm0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI292ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHR3aW5kb3cub25jbGljayA9IChldmVudCkgPT4ge1xuXHRcdFx0Y29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVybGF5Jyk7XG5cdFx0XHRpZiAoZXZlbnQudGFyZ2V0ID09IG92ZXJsYXkpIHtcblx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LWZvcm0nKS5yZXNldCgpO1xuXHRcdFx0XHRfY2xvc2VQb3BVcEZvcm0oKTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXG5cdGNvbnN0IF9jbG9zZVBvcFVwRm9ybSA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stZm9ybS1wb3B1cCcpO1xuXHRcdGZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2stZm9ybScpLnJlc2V0KCk7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI292ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHR9O1xuXG5cdHJldHVybiB7IHVwZGF0ZVByb2plY3RIZWFkZXIsIG9uQ2xpY2tBZGROZXdUYXNrLCB1cGRhdGVUYXNrc0Rpc3BsYXkgfTtcbn0pKCk7XG5cbmNvbnN0IGxvYWRVSSA9IGZ1bmN0aW9uICgpIHtcblx0ZG9jdW1lbnRcblx0XHQucXVlcnlTZWxlY3RvcignI2FkZC1uZXctcHJvamVjdCcpXG5cdFx0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvamVjdERpc3BsYXkub25DbGlja0FkZE5ld1Byb2plY3QsIGZhbHNlKTtcblx0ZG9jdW1lbnRcblx0XHQucXVlcnlTZWxlY3RvcignI2FkZC1uZXctdGFzaycpXG5cdFx0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9kb0Rpc3BsYXkub25DbGlja0FkZE5ld1Rhc2ssIGZhbHNlKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvYWRVSTtcbiIsImxldCBwcm9qZWN0cyA9IFtdO1xuXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0KG5hbWUpIHtcblx0cmV0dXJuIHsgbmFtZSwgdG9kbzogW10gfTtcbn1cblxuY29uc3QgcHJvamVjdCA9IChmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IGFkZFByb2plY3QgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdGNvbnN0IG5ld1Byb2plY3QgPSBjcmVhdGVQcm9qZWN0KG5hbWUpO1xuXHRcdHByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG5cdFx0Y29uc29sZS5sb2cocHJvamVjdHMpO1xuXHR9O1xuXG5cdGNvbnN0IGRlbFByb2plY3QgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdGNvbnN0IGluZGV4ID0gX2dldEluZGV4T2YobmFtZSk7XG5cdFx0cHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRjb25zb2xlLmxvZyhpbmRleCk7XG5cdFx0Y29uc29sZS5sb2cocHJvamVjdHMpO1xuXHR9O1xuXG5cdGNvbnN0IGFkZFRhc2tUb0FjdGl2ZVByb2plY3QgPSBmdW5jdGlvbiAobmV3VG9kbywgYWN0aXZlUHJvamVjdE5hbWUpIHtcblx0XHRjb25zdCBpbmRleE9mQWN0aXZlUHJvamVjdCA9IF9nZXRJbmRleE9mKGFjdGl2ZVByb2plY3ROYW1lKTtcblx0XHRwcm9qZWN0c1tpbmRleE9mQWN0aXZlUHJvamVjdF0udG9kby5wdXNoKG5ld1RvZG8pO1xuXHRcdGNvbnNvbGUubG9nKHByb2plY3RzKTtcblx0fTtcblxuXHRjb25zdCBnZXRBY3RpdmVQcm9qZWN0ID0gZnVuY3Rpb24gKGFjdGl2ZVByb2plY3ROYW1lKSB7XG5cdFx0Y29uc3QgaW5kZXhPZkFjdGl2ZVByb2plY3QgPSBfZ2V0SW5kZXhPZihhY3RpdmVQcm9qZWN0TmFtZSk7XG5cdFx0Y29uc29sZS5sb2cocHJvamVjdHNbaW5kZXhPZkFjdGl2ZVByb2plY3RdKTtcblx0XHRyZXR1cm4gcHJvamVjdHNbaW5kZXhPZkFjdGl2ZVByb2plY3RdO1xuXHR9O1xuXG5cdGNvbnN0IF9nZXRJbmRleE9mID0gZnVuY3Rpb24gKHByb2plY3ROYW1lKSB7XG5cdFx0Y29uc3QgaW5kZXggPSBwcm9qZWN0cy5maW5kSW5kZXgoKHByb2plY3QpID0+IHtcblx0XHRcdGlmIChwcm9qZWN0Lm5hbWUgPT0gcHJvamVjdE5hbWUpIHtcblx0XHRcdFx0cmV0dXJuIHByb2plY3Q7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGluZGV4O1xuXHR9O1xuXG5cdGNvbnN0IGRlbGV0ZVRvZG9Gb3JtUHJvamVjdCA9IGZ1bmN0aW9uICh0YXNrTmFtZSwgYWN0aXZlUHJvamVjdE5hbWUpIHtcblx0XHRjb25zb2xlLmxvZygnZGVsZXRlJywgdGFza05hbWUsICdmcm9tJywgYWN0aXZlUHJvamVjdE5hbWUpO1xuXG5cdFx0Y29uc3QgaW5kZXhPZkFjdGl2ZVByb2plY3QgPSBfZ2V0SW5kZXhPZihhY3RpdmVQcm9qZWN0TmFtZSk7XG5cdFx0Y29uc29sZS5sb2cocHJvamVjdHMpO1xuXHRcdHByb2plY3RzW2luZGV4T2ZBY3RpdmVQcm9qZWN0XS50b2RvID0gcHJvamVjdHNbaW5kZXhPZkFjdGl2ZVByb2plY3RdLnRvZG8uZmlsdGVyKFxuXHRcdFx0KHRvZG8pID0+IHRvZG8udGl0bGUgIT0gdGFza05hbWVcblx0XHQpO1xuXHRcdGNvbnNvbGUubG9nKHByb2plY3RzKTtcblx0fTtcblx0Y29uc3QgY2hlY2tGb3JEdXBsaWNhdGVQcm9qZWN0TmFtZSA9IGZ1bmN0aW9uIChwcm9qZWN0TmFtZSkge1xuXHRcdGNvbnN0IGluZGV4ID0gX2dldEluZGV4T2YocHJvamVjdE5hbWUpO1xuXHRcdGlmIChpbmRleCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcblx0Y29uc3QgY2hlY2tGb3JEdXBsaWNhdGVUYXNrID0gZnVuY3Rpb24gKHRhc2tUaXRsZSwgcHJvamVjdE5hbWUpIHtcblx0XHRjb25zdCBwcm9qZWN0SW5kZXggPSBfZ2V0SW5kZXhPZihwcm9qZWN0TmFtZSk7XG5cdFx0Y29uc3QgdGFza0luZGV4ID0gcHJvamVjdHNbcHJvamVjdEluZGV4XS50b2RvLmZpbmRJbmRleCgodG9kbykgPT4ge1xuXHRcdFx0aWYgKHRvZG8udGl0bGUgPT09IHRhc2tUaXRsZSkge1xuXHRcdFx0XHRyZXR1cm4gdG9kbztcblx0XHRcdH1cblx0XHR9KTtcblx0XHRpZiAodGFza0luZGV4KSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXHRyZXR1cm4ge1xuXHRcdGFkZFByb2plY3QsXG5cdFx0ZGVsUHJvamVjdCxcblx0XHRhZGRUYXNrVG9BY3RpdmVQcm9qZWN0LFxuXHRcdGdldEFjdGl2ZVByb2plY3QsXG5cdFx0ZGVsZXRlVG9kb0Zvcm1Qcm9qZWN0LFxuXHRcdGNoZWNrRm9yRHVwbGljYXRlUHJvamVjdE5hbWUsXG5cdFx0Y2hlY2tGb3JEdXBsaWNhdGVUYXNrLFxuXHR9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgcHJvamVjdDtcbiIsImltcG9ydCBwcm9qZWN0IGZyb20gJy4vcHJvamVjdHMnO1xuXG5jb25zdCB0b2RvRmFjdG9yeSA9IGZ1bmN0aW9uICh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUpIHtcblx0cmV0dXJuIHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlIH07XG59O1xuXG5jb25zdCB0b2RvID0gKGZ1bmN0aW9uICgpIHtcblx0Y29uc3QgYWRkVGFzayA9IGZ1bmN0aW9uICh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIGFjdGl2ZVByb2plY3ROYW1lKSB7XG5cdFx0Y29uc29sZS5sb2coJ2FkZGluZyB0YXNrJyk7XG5cdFx0Y29uc3QgbmV3VG9kbyA9IHRvZG9GYWN0b3J5KHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSk7XG5cdFx0cHJvamVjdC5hZGRUYXNrVG9BY3RpdmVQcm9qZWN0KG5ld1RvZG8sIGFjdGl2ZVByb2plY3ROYW1lKTtcblx0fTtcblx0cmV0dXJuIHsgYWRkVGFzayB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdG9kbztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGxvYWRVSSBmcm9tICcuL21vZHVsZXMvZGlzcGxheS1jb250cm9sbGVyJztcblxubG9hZFVJKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=