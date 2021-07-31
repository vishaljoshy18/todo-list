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
        todoDisplay.updateSelectedProjectTasks();
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
    };
    const updateSelectedProjectTasks = function () {
        console.log('adding tasks to disaply....');
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
    return { updateSelectedProjectHeader, onClickAddNewTask, updateSelectedProjectTasks };
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
        const index = projects.findIndex((project) => {
            if (project.name == name) {
                return project;
            }
        });
        projects.splice(index, 1);
        console.log(index);
        console.log(projects);
    };
    const addTodoToActiveProject = function (newTodo, activeProject) {
        const indexOfActiveProject = projects.findIndex((project) => {
            if (project.name == activeProject) {
                return project;
            }
        });
        projects[indexOfActiveProject].todo.push(newTodo);
        console.log(projects);
    };
    return { addProject, delProject, addTodoToActiveProject };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O2tFQUFpQztzREFDTjs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHlEQUFrQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQSx3RUFBd0UsWUFBWTs7QUFFcEY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSx5REFBa0I7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG1EQUFZO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxNQUFNLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ25LdEI7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLENBQUM7O0FBRUQsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O2tFQ2xDVTs7QUFFakM7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFFQUE4QjtBQUN0QztBQUNBLGFBQWE7QUFDYixDQUFDOztBQUVELGlFQUFlLElBQUksRUFBQzs7Ozs7OztVQ2ZwQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7Ozs7Ozs7OztvR0NOa0Q7O0FBRWxELG9FQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZGlzcGxheS1jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvLWRvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvamVjdCBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCB0b2RvIGZyb20gJy4vdG8tZG8nO1xuXG5jb25zdCBzaWRlYmFyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBpbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyNhZGQtbmV3LXByb2plY3QnKVxuICAgICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvamVjdERpc3BsYXkub25DbGlja0FkZE5ld1Byb2plY3QsIGZhbHNlKTtcbiAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjYWRkLW5ldy10YXNrJylcbiAgICAgICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZG9EaXNwbGF5Lm9uQ2xpY2tBZGROZXdUYXNrLCBmYWxzZSk7XG4gICAgfTtcblxuICAgIHJldHVybiB7IGluaXRpYWxpemUgfTtcbn0pKCk7XG5cbmNvbnN0IHByb2plY3REaXNwbGF5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBvbkNsaWNrQWRkTmV3UHJvamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2FkZCBuZXcgcHJvamVjdCAnKTtcbiAgICAgICAgb3BlblBvcFVwKCk7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QtZm9ybScpO1xuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnc3VibWl0JyxcbiAgICAgICAgICAgIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYWRkTmV3UHJvamVjdChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lLWlucHV0JykudmFsdWUpO1xuICAgICAgICAgICAgICAgIGZvcm0ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICBjbG9zZVBvcFVwKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyBvbmNlOiB0cnVlIH1cbiAgICAgICAgKTtcbiAgICB9O1xuICAgIGNvbnN0IGFkZE5ld1Byb2plY3QgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnQWRkaW5nICcsIG5hbWUsICdUbyBkaXNwbGF5Jyk7XG4gICAgICAgIHByb2plY3QuYWRkUHJvamVjdChuYW1lKTtcbiAgICAgICAgYWRkUHJvamVjdFRvRGlzcGxheShuYW1lKTtcbiAgICB9O1xuICAgIGNvbnN0IGFkZFByb2plY3RUb0Rpc3BsYXkgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBjb25zdCBwcm9qZWN0RGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWRpc3BsYXknKTtcbiAgICAgICAgY29uc3QgcHJvamVjdERpdiA9IGNyZWF0ZVByb2plY3REaXYobmFtZSk7XG4gICAgICAgIHByb2plY3REaXNwbGF5LmFwcGVuZENoaWxkKHByb2plY3REaXYpO1xuICAgIH07XG4gICAgY29uc3QgY3JlYXRlUHJvamVjdERpdiA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJvamVjdERpdi50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgICAgIHByb2plY3REaXYuc2V0QXR0cmlidXRlKCdpZCcsICdwcm9qZWN0Jyk7XG4gICAgICAgIHByb2plY3REaXYuc2V0QXR0cmlidXRlKCdkYXRhLW5hbWUnLCBuYW1lKTtcbiAgICAgICAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9ICd4JztcbiAgICAgICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuICAgICAgICBwcm9qZWN0RGl2LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnY2xpY2snLFxuICAgICAgICAgICAgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgIT0gZGVsZXRlQnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEFjdGl2ZVByb2plY3QoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG5cbiAgICAgICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVsZXRlU2VsZWN0ZWRQcm9qZWN0LCB7IG9uY2U6IHRydWUgfSk7XG5cbiAgICAgICAgcmV0dXJuIHByb2plY3REaXY7XG4gICAgfTtcblxuICAgIGNvbnN0IHNldEFjdGl2ZVByb2plY3QgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnYWN0aXZlIHByb2plY3QgLi4uJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcbiAgICAgICAgY29uc3QgcHJvamVjdERpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1kaXNwbGF5Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3REaXNwbGF5LmNoaWxkTm9kZXMpO1xuICAgICAgICBwcm9qZWN0RGlzcGxheS5jaGlsZE5vZGVzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICdwcm9qZWN0Jyk7XG4gICAgICAgIH0pO1xuICAgICAgICBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2FjdGl2ZS1wcm9qZWN0Jyk7XG4gICAgICAgIHRvZG9EaXNwbGF5LnVwZGF0ZVNlbGVjdGVkUHJvamVjdEhlYWRlcigpO1xuICAgICAgICB0b2RvRGlzcGxheS51cGRhdGVTZWxlY3RlZFByb2plY3RUYXNrcygpO1xuICAgIH07XG5cbiAgICBjb25zdCBkZWxldGVTZWxlY3RlZFByb2plY3QgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubmFtZSk7XG4gICAgICAgIHByb2plY3QuZGVsUHJvamVjdChlLnRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubmFtZSk7XG4gICAgICAgIGRlbGV0ZVByb2plY3RGcm9tRGlzcGxheShlKTtcbiAgICB9O1xuICAgIGNvbnN0IGRlbGV0ZVByb2plY3RGcm9tRGlzcGxheSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3REaXYgPSBlLnRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICBjb25zdCBwcm9qZWN0RGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWRpc3BsYXknKTtcbiAgICAgICAgcHJvamVjdERpc3BsYXkucmVtb3ZlQ2hpbGQocHJvamVjdERpdik7XG4gICAgfTtcblxuICAgIGNvbnN0IG9wZW5Qb3BVcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWZvcm0tcG9wdXAnKTtcbiAgICAgICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9O1xuXG4gICAgY29uc3QgY2xvc2VQb3BVcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWZvcm0tcG9wdXAnKTtcbiAgICAgICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH07XG4gICAgcmV0dXJuIHsgb25DbGlja0FkZE5ld1Byb2plY3QgfTtcbn0pKCk7XG5cbmNvbnN0IHRvZG9EaXNwbGF5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCB1cGRhdGVTZWxlY3RlZFByb2plY3RIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZVByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWN0aXZlLXByb2plY3QnKTtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlbGVjdGVkLXByb2plY3QtbmFtZScpO1xuICAgICAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBhY3RpdmVQcm9qZWN0LmRhdGFzZXQubmFtZTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25DbGlja0FkZE5ld1Rhc2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhZGQgdGFzay4uLicpO1xuICAgICAgICBvcGVuUG9wVXAoKTtcbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzay1mb3JtJyk7XG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdzdWJtaXQnLFxuICAgICAgICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLXRpdGxlJykudmFsdWU7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXNjcmlwdGlvbicpLnZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZVByb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FjdGl2ZS1wcm9qZWN0JykuZGF0YXNldC5uYW1lO1xuICAgICAgICAgICAgICAgIGFkZE5ld1Rhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBhY3RpdmVQcm9qZWN0TmFtZSk7XG4gICAgICAgICAgICAgICAgZm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgICAgIGNsb3NlUG9wVXAoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IG9uY2U6IHRydWUgfVxuICAgICAgICApO1xuICAgIH07XG4gICAgY29uc3QgYWRkTmV3VGFzayA9IGZ1bmN0aW9uICh0aXRsZSwgZGVzY3JpcHRpb24sIGFjdGl2ZVByb2plY3ROYW1lKSB7XG4gICAgICAgIC8vIGFkZFRhc2tUb0Rpc3BsYXkodGl0bGUsIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgdG9kby5hZGRUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgYWN0aXZlUHJvamVjdE5hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aXRsZSwgZGVzY3JpcHRpb24pO1xuICAgIH07XG4gICAgY29uc3QgdXBkYXRlU2VsZWN0ZWRQcm9qZWN0VGFza3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhZGRpbmcgdGFza3MgdG8gZGlzYXBseS4uLi4nKTtcbiAgICB9O1xuXG4gICAgY29uc3QgYWRkVGFza1RvRGlzcGxheSA9IGZ1bmN0aW9uICh0aXRsZSwgZGVzY3JpcHRpb24pIHtcbiAgICAgICAgY29uc3QgdGFza0Rpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kaXNwbGF5Jyk7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBkaXNwbGF5VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aXRsZScpO1xuICAgICAgICBjb25zdCBkaXNwbGF5RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkZXNjcmlwdGlvbicpO1xuICAgICAgICBkaXNwbGF5VGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChkaXNwbGF5VGl0bGUpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoZGlzcGxheURlc2NyaXB0aW9uKTtcbiAgICAgICAgdGFza0Rpc3BsYXkuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb3BlblBvcFVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stZm9ybS1wb3B1cCcpO1xuICAgICAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH07XG5cbiAgICBjb25zdCBjbG9zZVBvcFVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stZm9ybS1wb3B1cCcpO1xuICAgICAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfTtcbiAgICByZXR1cm4geyB1cGRhdGVTZWxlY3RlZFByb2plY3RIZWFkZXIsIG9uQ2xpY2tBZGROZXdUYXNrLCB1cGRhdGVTZWxlY3RlZFByb2plY3RUYXNrcyB9O1xufSkoKTtcblxuY29uc3QgbG9hZFVJID0gZnVuY3Rpb24gKCkge1xuICAgIHNpZGViYXIuaW5pdGlhbGl6ZSgpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbG9hZFVJO1xuIiwibGV0IHByb2plY3RzID0gW107XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QobmFtZSkge1xuICAgIHJldHVybiB7IG5hbWUsIHRvZG86IFtdIH07XG59XG5cbmNvbnN0IHByb2plY3QgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGFkZFByb2plY3QgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBjb25zdCBuZXdQcm9qZWN0ID0gY3JlYXRlUHJvamVjdChuYW1lKTtcbiAgICAgICAgcHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdHMpO1xuICAgIH07XG4gICAgY29uc3QgZGVsUHJvamVjdCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcHJvamVjdHMuZmluZEluZGV4KChwcm9qZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAocHJvamVjdC5uYW1lID09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvamVjdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHByb2plY3RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGluZGV4KTtcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdHMpO1xuICAgIH07XG4gICAgY29uc3QgYWRkVG9kb1RvQWN0aXZlUHJvamVjdCA9IGZ1bmN0aW9uIChuZXdUb2RvLCBhY3RpdmVQcm9qZWN0KSB7XG4gICAgICAgIGNvbnN0IGluZGV4T2ZBY3RpdmVQcm9qZWN0ID0gcHJvamVjdHMuZmluZEluZGV4KChwcm9qZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAocHJvamVjdC5uYW1lID09IGFjdGl2ZVByb2plY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvamVjdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHByb2plY3RzW2luZGV4T2ZBY3RpdmVQcm9qZWN0XS50b2RvLnB1c2gobmV3VG9kbyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RzKTtcbiAgICB9O1xuICAgIHJldHVybiB7IGFkZFByb2plY3QsIGRlbFByb2plY3QsIGFkZFRvZG9Ub0FjdGl2ZVByb2plY3QgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3Q7XG4iLCJpbXBvcnQgcHJvamVjdCBmcm9tICcuL3Byb2plY3RzJztcblxuY29uc3QgdG9kb0ZhY3RvcnkgPSBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uKSB7XG4gICAgcmV0dXJuIHsgdGl0bGUsIGRlc2NyaXB0aW9uIH07XG59O1xuXG5jb25zdCB0b2RvID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBhZGRUYXNrID0gZnVuY3Rpb24gKHRpdGxlLCBkZXNjcmlwdGlvbiwgYWN0aXZlUHJvamVjdE5hbWUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2FkZGluZyB0YXNrJyk7XG4gICAgICAgIGNvbnN0IG5ld1RvZG8gPSB0b2RvRmFjdG9yeSh0aXRsZSwgZGVzY3JpcHRpb24pO1xuICAgICAgICBwcm9qZWN0LmFkZFRvZG9Ub0FjdGl2ZVByb2plY3QobmV3VG9kbywgYWN0aXZlUHJvamVjdE5hbWUpO1xuICAgIH07XG4gICAgcmV0dXJuIHsgYWRkVGFzayB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdG9kbztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGxvYWRVSSBmcm9tICcuL21vZHVsZXMvZGlzcGxheS1jb250cm9sbGVyJztcblxubG9hZFVJKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=