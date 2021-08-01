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



const sidebar = (function () {
    const initialize = function () {
        document
            .querySelector('#add-new-project')
            .addEventListener('click', projectDisplay.onClickAddNewProject, false);
        document
            .querySelector('#add-new-task')
            .addEventListener('click', todoDisplay.onClickAddNewTask, false);
    };

    return { initialize };
})();

const projectDisplay = (function () {
    const onClickAddNewProject = function () {
        console.log('add new project ');
        openPopUp();
        const form = document.querySelector('#add-project-form');
        form.addEventListener(
            'submit',
            (event) => {
                event.preventDefault();
                addNewProject(document.querySelector('#project-name-input').value);
                form.reset();
                closePopUp();
            },
            { once: true }
        );
    };
    const addNewProject = function (name) {
        console.log('Adding ', name, 'To display');
        _projects__WEBPACK_IMPORTED_MODULE_0__.default.addProject(name);
        addProjectToDisplay(name);
    };
    const addProjectToDisplay = function (name) {
        const projectDisplay = document.querySelector('#project-display');
        const projectDiv = createProjectDiv(name);
        projectDisplay.appendChild(projectDiv);
    };
    const createProjectDiv = function (name) {
        const projectDiv = document.createElement('div');
        projectDiv.textContent = name;
        projectDiv.setAttribute('id', 'project');
        projectDiv.setAttribute('data-name', name);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        projectDiv.appendChild(deleteButton);
        projectDiv.addEventListener(
            'click',
            (e) => {
                if (e.target != deleteButton) {
                    setActiveProject(e);
                }
            },
            false
        );

        deleteButton.addEventListener('click', deleteSelectedProject, { once: true });

        return projectDiv;
    };

    const setActiveProject = function (e) {
        console.log('active project ...');
        console.log(e.target);
        const projectDisplay = document.querySelector('#project-display');
        console.log(projectDisplay.childNodes);
        projectDisplay.childNodes.forEach((element) => {
            element.setAttribute('id', 'project');
        });
        e.target.setAttribute('id', 'active-project');
        todoDisplay.updateSelectedProjectHeader();
        console.log('update Selected Project Task Display');
        todoDisplay.updateSelectedProjectTasksDisplay();
    };

    const deleteSelectedProject = function (e) {
        console.log(e.target.parentNode.dataset.name);
        _projects__WEBPACK_IMPORTED_MODULE_0__.default.delProject(e.target.parentNode.dataset.name);
        deleteProjectFromDisplay(e);
    };
    const deleteProjectFromDisplay = function (e) {
        const projectDiv = e.target.parentNode;
        const projectDisplay = document.querySelector('#project-display');
        projectDisplay.removeChild(projectDiv);
    };

    const openPopUp = function () {
        const form = document.querySelector('.project-form-popup');
        form.style.display = 'block';
    };

    const closePopUp = function () {
        const form = document.querySelector('.project-form-popup');
        form.style.display = 'none';
    };
    return { onClickAddNewProject };
})();

const todoDisplay = (function () {
    const updateSelectedProjectHeader = function () {
        const activeProject = document.querySelector('#active-project');
        const header = document.querySelector('#selected-project-name');
        header.textContent = activeProject.dataset.name;
    };

    const onClickAddNewTask = function () {
        console.log('add task...');
        openPopUp();
        const form = document.querySelector('#add-task-form');
        form.addEventListener(
            'submit',
            (event) => {
                event.preventDefault();
                const title = document.querySelector('#task-title').value;
                const description = document.querySelector('#task-description').value;
                const activeProjectName = document.querySelector('#active-project').dataset.name;
                addNewTask(title, description, activeProjectName);
                form.reset();
                closePopUp();
            },
            { once: true }
        );
    };
    const addNewTask = function (title, description, activeProjectName) {
        // addTaskToDisplay(title, description);
        _to_do__WEBPACK_IMPORTED_MODULE_1__.default.addTask(title, description, activeProjectName);
        console.log(title, description);
        updateSelectedProjectTasksDisplay();
    };

    const updateSelectedProjectTasksDisplay = function () {
        clearTaskDisplay();
        const activeProjectName = document.querySelector('#active-project').dataset.name;
        const activeProject = _projects__WEBPACK_IMPORTED_MODULE_0__.default.getActiveProject(activeProjectName);
        console.log('adding tasks to disaply....', activeProject.todo);
        activeProject.todo.forEach((task) => {
            addTaskToDisplay(task.title, task.description);
        });
    };

    const clearTaskDisplay = function () {
        const taskDisplay = document.querySelector('#task-display');
        while (taskDisplay.firstChild) {
            taskDisplay.removeChild(taskDisplay.lastChild);
        }
    };

    const addTaskToDisplay = function (title, description) {
        const taskDisplay = document.querySelector('#task-display');
        const div = document.createElement('div');
        const displayTitle = document.createElement('title');
        const displayDescription = document.createElement('description');
        displayTitle.textContent = title;
        displayDescription.textContent = description;
        div.appendChild(displayTitle);
        div.appendChild(displayDescription);
        taskDisplay.appendChild(div);
    };

    const openPopUp = function () {
        const form = document.querySelector('.task-form-popup');
        form.style.display = 'block';
    };

    const closePopUp = function () {
        const form = document.querySelector('.task-form-popup');
        form.style.display = 'none';
    };
    return { updateSelectedProjectHeader, onClickAddNewTask, updateSelectedProjectTasksDisplay };
})();

const loadUI = function () {
    sidebar.initialize();
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
        const index = getIndexOf(name);
        projects.splice(index, 1);
        console.log(index);
        console.log(projects);
    };
    const addTodoToActiveProject = function (newTodo, activeProjectName) {
        const indexOfActiveProject = getIndexOf(activeProjectName);
        projects[indexOfActiveProject].todo.push(newTodo);
        console.log(projects);
    };

    const getActiveProject = function (activeProjectName) {
        const indexOfActiveProject = getIndexOf(activeProjectName);
        console.log(projects[indexOfActiveProject]);
        return projects[indexOfActiveProject];
    };

    const getIndexOf = function (projectName) {
        const index = projects.findIndex((project) => {
            if (project.name == projectName) {
                return project;
            }
        });
        return index;
    };

    return { addProject, delProject, addTodoToActiveProject, getActiveProject };
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
        _projects__WEBPACK_IMPORTED_MODULE_0__.default.addTodoToActiveProject(newTodo, activeProjectName);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O2tFQUFpQztzREFDTjs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHlEQUFrQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQSx3RUFBd0UsWUFBWTs7QUFFcEY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLHlEQUFrQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsbURBQVk7QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QiwrREFBd0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDbkx0Qjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBLGFBQWE7QUFDYixDQUFDOztBQUVELGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztrRUMxQ1U7O0FBRWpDO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxxRUFBOEI7QUFDdEM7QUFDQSxhQUFhO0FBQ2IsQ0FBQzs7QUFFRCxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7VUNmcEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7Ozs7b0dDTmtEOztBQUVsRCxvRUFBTSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2Rpc3BsYXktY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90by1kby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3QgZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgdG9kbyBmcm9tICcuL3RvLWRvJztcblxuY29uc3Qgc2lkZWJhciA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjYWRkLW5ldy1wcm9qZWN0JylcbiAgICAgICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2plY3REaXNwbGF5Lm9uQ2xpY2tBZGROZXdQcm9qZWN0LCBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvcignI2FkZC1uZXctdGFzaycpXG4gICAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2RvRGlzcGxheS5vbkNsaWNrQWRkTmV3VGFzaywgZmFsc2UpO1xuICAgIH07XG5cbiAgICByZXR1cm4geyBpbml0aWFsaXplIH07XG59KSgpO1xuXG5jb25zdCBwcm9qZWN0RGlzcGxheSA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3Qgb25DbGlja0FkZE5ld1Byb2plY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhZGQgbmV3IHByb2plY3QgJyk7XG4gICAgICAgIG9wZW5Qb3BVcCgpO1xuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LWZvcm0nKTtcbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3N1Ym1pdCcsXG4gICAgICAgICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGFkZE5ld1Byb2plY3QoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZS1pbnB1dCcpLnZhbHVlKTtcbiAgICAgICAgICAgICAgICBmb3JtLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgY2xvc2VQb3BVcCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgb25jZTogdHJ1ZSB9XG4gICAgICAgICk7XG4gICAgfTtcbiAgICBjb25zdCBhZGROZXdQcm9qZWN0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0FkZGluZyAnLCBuYW1lLCAnVG8gZGlzcGxheScpO1xuICAgICAgICBwcm9qZWN0LmFkZFByb2plY3QobmFtZSk7XG4gICAgICAgIGFkZFByb2plY3RUb0Rpc3BsYXkobmFtZSk7XG4gICAgfTtcbiAgICBjb25zdCBhZGRQcm9qZWN0VG9EaXNwbGF5ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdERpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1kaXNwbGF5Jyk7XG4gICAgICAgIGNvbnN0IHByb2plY3REaXYgPSBjcmVhdGVQcm9qZWN0RGl2KG5hbWUpO1xuICAgICAgICBwcm9qZWN0RGlzcGxheS5hcHBlbmRDaGlsZChwcm9qZWN0RGl2KTtcbiAgICB9O1xuICAgIGNvbnN0IGNyZWF0ZVByb2plY3REaXYgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHByb2plY3REaXYudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgICAgICBwcm9qZWN0RGl2LnNldEF0dHJpYnV0ZSgnaWQnLCAncHJvamVjdCcpO1xuICAgICAgICBwcm9qZWN0RGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1uYW1lJywgbmFtZSk7XG4gICAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSAneCc7XG4gICAgICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcbiAgICAgICAgcHJvamVjdERpdi5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ICE9IGRlbGV0ZUJ1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICBzZXRBY3RpdmVQcm9qZWN0KGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuXG4gICAgICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRlbGV0ZVNlbGVjdGVkUHJvamVjdCwgeyBvbmNlOiB0cnVlIH0pO1xuXG4gICAgICAgIHJldHVybiBwcm9qZWN0RGl2O1xuICAgIH07XG5cbiAgICBjb25zdCBzZXRBY3RpdmVQcm9qZWN0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2FjdGl2ZSBwcm9qZWN0IC4uLicpO1xuICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldCk7XG4gICAgICAgIGNvbnN0IHByb2plY3REaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZGlzcGxheScpO1xuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0RGlzcGxheS5jaGlsZE5vZGVzKTtcbiAgICAgICAgcHJvamVjdERpc3BsYXkuY2hpbGROb2Rlcy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAncHJvamVjdCcpO1xuICAgICAgICB9KTtcbiAgICAgICAgZS50YXJnZXQuc2V0QXR0cmlidXRlKCdpZCcsICdhY3RpdmUtcHJvamVjdCcpO1xuICAgICAgICB0b2RvRGlzcGxheS51cGRhdGVTZWxlY3RlZFByb2plY3RIZWFkZXIoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0ZSBTZWxlY3RlZCBQcm9qZWN0IFRhc2sgRGlzcGxheScpO1xuICAgICAgICB0b2RvRGlzcGxheS51cGRhdGVTZWxlY3RlZFByb2plY3RUYXNrc0Rpc3BsYXkoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZGVsZXRlU2VsZWN0ZWRQcm9qZWN0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0Lm5hbWUpO1xuICAgICAgICBwcm9qZWN0LmRlbFByb2plY3QoZS50YXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0Lm5hbWUpO1xuICAgICAgICBkZWxldGVQcm9qZWN0RnJvbURpc3BsYXkoZSk7XG4gICAgfTtcbiAgICBjb25zdCBkZWxldGVQcm9qZWN0RnJvbURpc3BsYXkgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb25zdCBwcm9qZWN0RGl2ID0gZS50YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgY29uc3QgcHJvamVjdERpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1kaXNwbGF5Jyk7XG4gICAgICAgIHByb2plY3REaXNwbGF5LnJlbW92ZUNoaWxkKHByb2plY3REaXYpO1xuICAgIH07XG5cbiAgICBjb25zdCBvcGVuUG9wVXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtLXBvcHVwJyk7XG4gICAgICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfTtcblxuICAgIGNvbnN0IGNsb3NlUG9wVXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtLXBvcHVwJyk7XG4gICAgICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9O1xuICAgIHJldHVybiB7IG9uQ2xpY2tBZGROZXdQcm9qZWN0IH07XG59KSgpO1xuXG5jb25zdCB0b2RvRGlzcGxheSA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdXBkYXRlU2VsZWN0ZWRQcm9qZWN0SGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBhY3RpdmVQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FjdGl2ZS1wcm9qZWN0Jyk7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWxlY3RlZC1wcm9qZWN0LW5hbWUnKTtcbiAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gYWN0aXZlUHJvamVjdC5kYXRhc2V0Lm5hbWU7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uQ2xpY2tBZGROZXdUYXNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnYWRkIHRhc2suLi4nKTtcbiAgICAgICAgb3BlblBvcFVwKCk7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2stZm9ybScpO1xuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnc3VibWl0JyxcbiAgICAgICAgICAgIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay10aXRsZScpLnZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGVzY3JpcHRpb24nKS52YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVQcm9qZWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhY3RpdmUtcHJvamVjdCcpLmRhdGFzZXQubmFtZTtcbiAgICAgICAgICAgICAgICBhZGROZXdUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgYWN0aXZlUHJvamVjdE5hbWUpO1xuICAgICAgICAgICAgICAgIGZvcm0ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICBjbG9zZVBvcFVwKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyBvbmNlOiB0cnVlIH1cbiAgICAgICAgKTtcbiAgICB9O1xuICAgIGNvbnN0IGFkZE5ld1Rhc2sgPSBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uLCBhY3RpdmVQcm9qZWN0TmFtZSkge1xuICAgICAgICAvLyBhZGRUYXNrVG9EaXNwbGF5KHRpdGxlLCBkZXNjcmlwdGlvbik7XG4gICAgICAgIHRvZG8uYWRkVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGFjdGl2ZVByb2plY3ROYW1lKTtcbiAgICAgICAgY29uc29sZS5sb2codGl0bGUsIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgdXBkYXRlU2VsZWN0ZWRQcm9qZWN0VGFza3NEaXNwbGF5KCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHVwZGF0ZVNlbGVjdGVkUHJvamVjdFRhc2tzRGlzcGxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUYXNrRGlzcGxheSgpO1xuICAgICAgICBjb25zdCBhY3RpdmVQcm9qZWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhY3RpdmUtcHJvamVjdCcpLmRhdGFzZXQubmFtZTtcbiAgICAgICAgY29uc3QgYWN0aXZlUHJvamVjdCA9IHByb2plY3QuZ2V0QWN0aXZlUHJvamVjdChhY3RpdmVQcm9qZWN0TmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhZGRpbmcgdGFza3MgdG8gZGlzYXBseS4uLi4nLCBhY3RpdmVQcm9qZWN0LnRvZG8pO1xuICAgICAgICBhY3RpdmVQcm9qZWN0LnRvZG8uZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgICAgICAgYWRkVGFza1RvRGlzcGxheSh0YXNrLnRpdGxlLCB0YXNrLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNsZWFyVGFza0Rpc3BsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHRhc2tEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGlzcGxheScpO1xuICAgICAgICB3aGlsZSAodGFza0Rpc3BsYXkuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGFza0Rpc3BsYXkucmVtb3ZlQ2hpbGQodGFza0Rpc3BsYXkubGFzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBhZGRUYXNrVG9EaXNwbGF5ID0gZnVuY3Rpb24gKHRpdGxlLCBkZXNjcmlwdGlvbikge1xuICAgICAgICBjb25zdCB0YXNrRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRpc3BsYXknKTtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGRpc3BsYXlUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RpdGxlJyk7XG4gICAgICAgIGNvbnN0IGRpc3BsYXlEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Rlc2NyaXB0aW9uJyk7XG4gICAgICAgIGRpc3BsYXlUaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGRpc3BsYXlUaXRsZSk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChkaXNwbGF5RGVzY3JpcHRpb24pO1xuICAgICAgICB0YXNrRGlzcGxheS5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH07XG5cbiAgICBjb25zdCBvcGVuUG9wVXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1mb3JtLXBvcHVwJyk7XG4gICAgICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfTtcblxuICAgIGNvbnN0IGNsb3NlUG9wVXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1mb3JtLXBvcHVwJyk7XG4gICAgICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9O1xuICAgIHJldHVybiB7IHVwZGF0ZVNlbGVjdGVkUHJvamVjdEhlYWRlciwgb25DbGlja0FkZE5ld1Rhc2ssIHVwZGF0ZVNlbGVjdGVkUHJvamVjdFRhc2tzRGlzcGxheSB9O1xufSkoKTtcblxuY29uc3QgbG9hZFVJID0gZnVuY3Rpb24gKCkge1xuICAgIHNpZGViYXIuaW5pdGlhbGl6ZSgpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbG9hZFVJO1xuIiwibGV0IHByb2plY3RzID0gW107XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QobmFtZSkge1xuICAgIHJldHVybiB7IG5hbWUsIHRvZG86IFtdIH07XG59XG5cbmNvbnN0IHByb2plY3QgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGFkZFByb2plY3QgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBjb25zdCBuZXdQcm9qZWN0ID0gY3JlYXRlUHJvamVjdChuYW1lKTtcbiAgICAgICAgcHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdHMpO1xuICAgIH07XG4gICAgY29uc3QgZGVsUHJvamVjdCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gZ2V0SW5kZXhPZihuYW1lKTtcbiAgICAgICAgcHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgY29uc29sZS5sb2coaW5kZXgpO1xuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG4gICAgfTtcbiAgICBjb25zdCBhZGRUb2RvVG9BY3RpdmVQcm9qZWN0ID0gZnVuY3Rpb24gKG5ld1RvZG8sIGFjdGl2ZVByb2plY3ROYW1lKSB7XG4gICAgICAgIGNvbnN0IGluZGV4T2ZBY3RpdmVQcm9qZWN0ID0gZ2V0SW5kZXhPZihhY3RpdmVQcm9qZWN0TmFtZSk7XG4gICAgICAgIHByb2plY3RzW2luZGV4T2ZBY3RpdmVQcm9qZWN0XS50b2RvLnB1c2gobmV3VG9kbyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RzKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0QWN0aXZlUHJvamVjdCA9IGZ1bmN0aW9uIChhY3RpdmVQcm9qZWN0TmFtZSkge1xuICAgICAgICBjb25zdCBpbmRleE9mQWN0aXZlUHJvamVjdCA9IGdldEluZGV4T2YoYWN0aXZlUHJvamVjdE5hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0c1tpbmRleE9mQWN0aXZlUHJvamVjdF0pO1xuICAgICAgICByZXR1cm4gcHJvamVjdHNbaW5kZXhPZkFjdGl2ZVByb2plY3RdO1xuICAgIH07XG5cbiAgICBjb25zdCBnZXRJbmRleE9mID0gZnVuY3Rpb24gKHByb2plY3ROYW1lKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcHJvamVjdHMuZmluZEluZGV4KChwcm9qZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAocHJvamVjdC5uYW1lID09IHByb2plY3ROYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2plY3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfTtcblxuICAgIHJldHVybiB7IGFkZFByb2plY3QsIGRlbFByb2plY3QsIGFkZFRvZG9Ub0FjdGl2ZVByb2plY3QsIGdldEFjdGl2ZVByb2plY3QgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3Q7XG4iLCJpbXBvcnQgcHJvamVjdCBmcm9tICcuL3Byb2plY3RzJztcblxuY29uc3QgdG9kb0ZhY3RvcnkgPSBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uKSB7XG4gICAgcmV0dXJuIHsgdGl0bGUsIGRlc2NyaXB0aW9uIH07XG59O1xuXG5jb25zdCB0b2RvID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBhZGRUYXNrID0gZnVuY3Rpb24gKHRpdGxlLCBkZXNjcmlwdGlvbiwgYWN0aXZlUHJvamVjdE5hbWUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2FkZGluZyB0YXNrJyk7XG4gICAgICAgIGNvbnN0IG5ld1RvZG8gPSB0b2RvRmFjdG9yeSh0aXRsZSwgZGVzY3JpcHRpb24pO1xuICAgICAgICBwcm9qZWN0LmFkZFRvZG9Ub0FjdGl2ZVByb2plY3QobmV3VG9kbywgYWN0aXZlUHJvamVjdE5hbWUpO1xuICAgIH07XG4gICAgcmV0dXJuIHsgYWRkVGFzayB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdG9kbztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGxvYWRVSSBmcm9tICcuL21vZHVsZXMvZGlzcGxheS1jb250cm9sbGVyJztcblxubG9hZFVJKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=