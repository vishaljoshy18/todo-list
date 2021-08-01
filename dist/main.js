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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O2tFQUFpQztzREFDTjs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEseURBQWtCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLHdFQUF3RSxZQUFZOztBQUVwRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVEseURBQWtCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxtREFBWTtBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLCtEQUF3QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLE1BQU0sRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0FDM0t2Qjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBLGFBQWE7QUFDYixDQUFDOztBQUVELGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztrRUMxQ1U7O0FBRWpDO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxxRUFBOEI7QUFDdEM7QUFDQSxhQUFhO0FBQ2IsQ0FBQzs7QUFFRCxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7VUNmcEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7Ozs7b0dDTmtEOztBQUVsRCxvRUFBTSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2Rpc3BsYXktY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90by1kby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3QgZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgdG9kbyBmcm9tICcuL3RvLWRvJztcblxuY29uc3QgcHJvamVjdERpc3BsYXkgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IG9uQ2xpY2tBZGROZXdQcm9qZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnYWRkIG5ldyBwcm9qZWN0ICcpO1xuICAgICAgICBvcGVuUG9wVXAoKTtcbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvamVjdC1mb3JtJyk7XG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdzdWJtaXQnLFxuICAgICAgICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBhZGROZXdQcm9qZWN0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LW5hbWUtaW5wdXQnKS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgZm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgICAgIGNsb3NlUG9wVXAoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IG9uY2U6IHRydWUgfVxuICAgICAgICApO1xuICAgIH07XG4gICAgY29uc3QgYWRkTmV3UHJvamVjdCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdBZGRpbmcgJywgbmFtZSwgJ1RvIGRpc3BsYXknKTtcbiAgICAgICAgcHJvamVjdC5hZGRQcm9qZWN0KG5hbWUpO1xuICAgICAgICBhZGRQcm9qZWN0VG9EaXNwbGF5KG5hbWUpO1xuICAgIH07XG4gICAgY29uc3QgYWRkUHJvamVjdFRvRGlzcGxheSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3REaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZGlzcGxheScpO1xuICAgICAgICBjb25zdCBwcm9qZWN0RGl2ID0gY3JlYXRlUHJvamVjdERpdihuYW1lKTtcbiAgICAgICAgcHJvamVjdERpc3BsYXkuYXBwZW5kQ2hpbGQocHJvamVjdERpdik7XG4gICAgfTtcbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0RGl2ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwcm9qZWN0RGl2LnRleHRDb250ZW50ID0gbmFtZTtcbiAgICAgICAgcHJvamVjdERpdi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Byb2plY3QnKTtcbiAgICAgICAgcHJvamVjdERpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbmFtZScsIG5hbWUpO1xuICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gJ3gnO1xuICAgICAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG4gICAgICAgIHByb2plY3REaXYuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdjbGljaycsXG4gICAgICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldCAhPSBkZWxldGVCdXR0b24pIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0QWN0aXZlUHJvamVjdChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcblxuICAgICAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWxldGVTZWxlY3RlZFByb2plY3QsIHsgb25jZTogdHJ1ZSB9KTtcblxuICAgICAgICByZXR1cm4gcHJvamVjdERpdjtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2V0QWN0aXZlUHJvamVjdCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhY3RpdmUgcHJvamVjdCAuLi4nKTtcbiAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQpO1xuICAgICAgICBjb25zdCBwcm9qZWN0RGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWRpc3BsYXknKTtcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdERpc3BsYXkuY2hpbGROb2Rlcyk7XG4gICAgICAgIHByb2plY3REaXNwbGF5LmNoaWxkTm9kZXMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Byb2plY3QnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGUudGFyZ2V0LnNldEF0dHJpYnV0ZSgnaWQnLCAnYWN0aXZlLXByb2plY3QnKTtcbiAgICAgICAgdG9kb0Rpc3BsYXkudXBkYXRlU2VsZWN0ZWRQcm9qZWN0SGVhZGVyKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGUgU2VsZWN0ZWQgUHJvamVjdCBUYXNrIERpc3BsYXknKTtcbiAgICAgICAgdG9kb0Rpc3BsYXkudXBkYXRlU2VsZWN0ZWRQcm9qZWN0VGFza3NEaXNwbGF5KCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRlbGV0ZVNlbGVjdGVkUHJvamVjdCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5uYW1lKTtcbiAgICAgICAgcHJvamVjdC5kZWxQcm9qZWN0KGUudGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5uYW1lKTtcbiAgICAgICAgZGVsZXRlUHJvamVjdEZyb21EaXNwbGF5KGUpO1xuICAgIH07XG4gICAgY29uc3QgZGVsZXRlUHJvamVjdEZyb21EaXNwbGF5ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdERpdiA9IGUudGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgIGNvbnN0IHByb2plY3REaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZGlzcGxheScpO1xuICAgICAgICBwcm9qZWN0RGlzcGxheS5yZW1vdmVDaGlsZChwcm9qZWN0RGl2KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb3BlblBvcFVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtZm9ybS1wb3B1cCcpO1xuICAgICAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH07XG5cbiAgICBjb25zdCBjbG9zZVBvcFVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtZm9ybS1wb3B1cCcpO1xuICAgICAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfTtcbiAgICByZXR1cm4geyBvbkNsaWNrQWRkTmV3UHJvamVjdCB9O1xufSkoKTtcblxuY29uc3QgdG9kb0Rpc3BsYXkgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHVwZGF0ZVNlbGVjdGVkUHJvamVjdEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhY3RpdmUtcHJvamVjdCcpO1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VsZWN0ZWQtcHJvamVjdC1uYW1lJyk7XG4gICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9IGFjdGl2ZVByb2plY3QuZGF0YXNldC5uYW1lO1xuICAgIH07XG5cbiAgICBjb25zdCBvbkNsaWNrQWRkTmV3VGFzayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2FkZCB0YXNrLi4uJyk7XG4gICAgICAgIG9wZW5Qb3BVcCgpO1xuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrLWZvcm0nKTtcbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3N1Ym1pdCcsXG4gICAgICAgICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stdGl0bGUnKS52YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRlc2NyaXB0aW9uJykudmFsdWU7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlUHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWN0aXZlLXByb2plY3QnKS5kYXRhc2V0Lm5hbWU7XG4gICAgICAgICAgICAgICAgYWRkTmV3VGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGFjdGl2ZVByb2plY3ROYW1lKTtcbiAgICAgICAgICAgICAgICBmb3JtLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgY2xvc2VQb3BVcCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgb25jZTogdHJ1ZSB9XG4gICAgICAgICk7XG4gICAgfTtcbiAgICBjb25zdCBhZGROZXdUYXNrID0gZnVuY3Rpb24gKHRpdGxlLCBkZXNjcmlwdGlvbiwgYWN0aXZlUHJvamVjdE5hbWUpIHtcbiAgICAgICAgLy8gYWRkVGFza1RvRGlzcGxheSh0aXRsZSwgZGVzY3JpcHRpb24pO1xuICAgICAgICB0b2RvLmFkZFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBhY3RpdmVQcm9qZWN0TmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRpdGxlLCBkZXNjcmlwdGlvbik7XG4gICAgICAgIHVwZGF0ZVNlbGVjdGVkUHJvamVjdFRhc2tzRGlzcGxheSgpO1xuICAgIH07XG5cbiAgICBjb25zdCB1cGRhdGVTZWxlY3RlZFByb2plY3RUYXNrc0Rpc3BsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGFza0Rpc3BsYXkoKTtcbiAgICAgICAgY29uc3QgYWN0aXZlUHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWN0aXZlLXByb2plY3QnKS5kYXRhc2V0Lm5hbWU7XG4gICAgICAgIGNvbnN0IGFjdGl2ZVByb2plY3QgPSBwcm9qZWN0LmdldEFjdGl2ZVByb2plY3QoYWN0aXZlUHJvamVjdE5hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZygnYWRkaW5nIHRhc2tzIHRvIGRpc2FwbHkuLi4uJywgYWN0aXZlUHJvamVjdC50b2RvKTtcbiAgICAgICAgYWN0aXZlUHJvamVjdC50b2RvLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgICAgIGFkZFRhc2tUb0Rpc3BsYXkodGFzay50aXRsZSwgdGFzay5kZXNjcmlwdGlvbik7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBjbGVhclRhc2tEaXNwbGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCB0YXNrRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRpc3BsYXknKTtcbiAgICAgICAgd2hpbGUgKHRhc2tEaXNwbGF5LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRhc2tEaXNwbGF5LnJlbW92ZUNoaWxkKHRhc2tEaXNwbGF5Lmxhc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgYWRkVGFza1RvRGlzcGxheSA9IGZ1bmN0aW9uICh0aXRsZSwgZGVzY3JpcHRpb24pIHtcbiAgICAgICAgY29uc3QgdGFza0Rpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kaXNwbGF5Jyk7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBkaXNwbGF5VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aXRsZScpO1xuICAgICAgICBjb25zdCBkaXNwbGF5RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkZXNjcmlwdGlvbicpO1xuICAgICAgICBkaXNwbGF5VGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChkaXNwbGF5VGl0bGUpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoZGlzcGxheURlc2NyaXB0aW9uKTtcbiAgICAgICAgdGFza0Rpc3BsYXkuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb3BlblBvcFVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stZm9ybS1wb3B1cCcpO1xuICAgICAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH07XG5cbiAgICBjb25zdCBjbG9zZVBvcFVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stZm9ybS1wb3B1cCcpO1xuICAgICAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfTtcbiAgICByZXR1cm4geyB1cGRhdGVTZWxlY3RlZFByb2plY3RIZWFkZXIsIG9uQ2xpY2tBZGROZXdUYXNrLCB1cGRhdGVTZWxlY3RlZFByb2plY3RUYXNrc0Rpc3BsYXkgfTtcbn0pKCk7XG5cbmNvbnN0IGxvYWRVSSA9IGZ1bmN0aW9uICgpIHtcbiAgICBkb2N1bWVudFxuICAgICAgICAucXVlcnlTZWxlY3RvcignI2FkZC1uZXctcHJvamVjdCcpXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2plY3REaXNwbGF5Lm9uQ2xpY2tBZGROZXdQcm9qZWN0LCBmYWxzZSk7XG4gICAgZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyNhZGQtbmV3LXRhc2snKVxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2RvRGlzcGxheS5vbkNsaWNrQWRkTmV3VGFzaywgZmFsc2UpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbG9hZFVJIDtcbiIsImxldCBwcm9qZWN0cyA9IFtdO1xuXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0KG5hbWUpIHtcbiAgICByZXR1cm4geyBuYW1lLCB0b2RvOiBbXSB9O1xufVxuXG5jb25zdCBwcm9qZWN0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBhZGRQcm9qZWN0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdCA9IGNyZWF0ZVByb2plY3QobmFtZSk7XG4gICAgICAgIHByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RzKTtcbiAgICB9O1xuICAgIGNvbnN0IGRlbFByb2plY3QgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IGdldEluZGV4T2YobmFtZSk7XG4gICAgICAgIHByb2plY3RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGluZGV4KTtcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdHMpO1xuICAgIH07XG4gICAgY29uc3QgYWRkVG9kb1RvQWN0aXZlUHJvamVjdCA9IGZ1bmN0aW9uIChuZXdUb2RvLCBhY3RpdmVQcm9qZWN0TmFtZSkge1xuICAgICAgICBjb25zdCBpbmRleE9mQWN0aXZlUHJvamVjdCA9IGdldEluZGV4T2YoYWN0aXZlUHJvamVjdE5hbWUpO1xuICAgICAgICBwcm9qZWN0c1tpbmRleE9mQWN0aXZlUHJvamVjdF0udG9kby5wdXNoKG5ld1RvZG8pO1xuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGdldEFjdGl2ZVByb2plY3QgPSBmdW5jdGlvbiAoYWN0aXZlUHJvamVjdE5hbWUpIHtcbiAgICAgICAgY29uc3QgaW5kZXhPZkFjdGl2ZVByb2plY3QgPSBnZXRJbmRleE9mKGFjdGl2ZVByb2plY3ROYW1lKTtcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdHNbaW5kZXhPZkFjdGl2ZVByb2plY3RdKTtcbiAgICAgICAgcmV0dXJuIHByb2plY3RzW2luZGV4T2ZBY3RpdmVQcm9qZWN0XTtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0SW5kZXhPZiA9IGZ1bmN0aW9uIChwcm9qZWN0TmFtZSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHByb2plY3RzLmZpbmRJbmRleCgocHJvamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHByb2plY3QubmFtZSA9PSBwcm9qZWN0TmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9qZWN0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH07XG5cbiAgICByZXR1cm4geyBhZGRQcm9qZWN0LCBkZWxQcm9qZWN0LCBhZGRUb2RvVG9BY3RpdmVQcm9qZWN0LCBnZXRBY3RpdmVQcm9qZWN0IH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0O1xuIiwiaW1wb3J0IHByb2plY3QgZnJvbSAnLi9wcm9qZWN0cyc7XG5cbmNvbnN0IHRvZG9GYWN0b3J5ID0gZnVuY3Rpb24gKHRpdGxlLCBkZXNjcmlwdGlvbikge1xuICAgIHJldHVybiB7IHRpdGxlLCBkZXNjcmlwdGlvbiB9O1xufTtcblxuY29uc3QgdG9kbyA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYWRkVGFzayA9IGZ1bmN0aW9uICh0aXRsZSwgZGVzY3JpcHRpb24sIGFjdGl2ZVByb2plY3ROYW1lKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhZGRpbmcgdGFzaycpO1xuICAgICAgICBjb25zdCBuZXdUb2RvID0gdG9kb0ZhY3RvcnkodGl0bGUsIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgcHJvamVjdC5hZGRUb2RvVG9BY3RpdmVQcm9qZWN0KG5ld1RvZG8sIGFjdGl2ZVByb2plY3ROYW1lKTtcbiAgICB9O1xuICAgIHJldHVybiB7IGFkZFRhc2sgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHRvZG87XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBsb2FkVUkgZnJvbSAnLi9tb2R1bGVzL2Rpc3BsYXktY29udHJvbGxlcic7XG5cbmxvYWRVSSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9