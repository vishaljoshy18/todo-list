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
/* harmony export */   "loadSideNav": () => (/* binding */ loadSideNav)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/modules/project.js");
/* harmony import */ var _sidenav_sidenav_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sidenav/sidenav-dom */ "./src/modules/sidenav/sidenav-dom.js");



const sidenav = (function () {
    const initialize = function () {
        (0,_sidenav_sidenav_dom__WEBPACK_IMPORTED_MODULE_1__.createSideNav)();
        updateProjectList();
        addProjectEventListener();
    };

    const updateProjectList = function () {
        const projectList = document.querySelector('#project-list');
        projectList.innerHTML = '';
        (0,_project__WEBPACK_IMPORTED_MODULE_0__.getProjects)().forEach((project) => {
            const div = document.createElement('div');
            div.textContent = project.projectName;
            console.log('update', project.projectName);
            projectList.appendChild(div);
        });
    };

    const addProjectEventListener = function () {
        const openProjectFormButton = document.querySelector('#open-project-form');
        openProjectFormButton.addEventListener('click', projectListModule.openProjectForm);
    };

    return { initialize, updateProjectList };
})();

const projectListModule = (function () {
    const openProjectForm = function () {
        openPopUpForm();
        const form = document.querySelector('#project-form');
        form.addEventListener('submit', addNewProject, false);
    };

    const addNewProject = function (event) {
        event.preventDefault();
        const projectName = document.querySelector('#project-name').value;
        (0,_project__WEBPACK_IMPORTED_MODULE_0__.createProject)(projectName);
        sidenav.updateProjectList();
        closePopUpForm();
    };

    const openPopUpForm = function () {
        document.querySelector('.form-popup').style.display = 'block';
    };
    const closePopUpForm = function () {
        document.querySelector('.form-popup').style.display = 'none';
    };
    return { openProjectForm };
})();

const loadSideNav = function () {
    sidenav.initialize();
};




/***/ }),

/***/ "./src/modules/project.js":
/*!********************************!*\
  !*** ./src/modules/project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createProject": () => (/* binding */ createProject),
/* harmony export */   "getProjects": () => (/* binding */ getProjects)
/* harmony export */ });
let projects = [];

function projectFactory(name) {
    return { projectName: name, todoList: [] };
}

const createProject = function (projectName) {
    const newProject = projectFactory(projectName);
    projects.push(newProject);
};

const getProjects = function () {
    return projects;
};




/***/ }),

/***/ "./src/modules/sidenav/sidenav-dom.js":
/*!********************************************!*\
  !*** ./src/modules/sidenav/sidenav-dom.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSideNav": () => (/* binding */ createSideNav)
/* harmony export */ });
const createSideNav = function () {
    const sidenav = document.createElement('div');
    sidenav.setAttribute('class', 'side-nav');

    const projectListHeading = document.createElement('h3');
    projectListHeading.textContent = 'Projects';
    sidenav.appendChild(projectListHeading);

    const openProjectFormButton = document.createElement('button');
    openProjectFormButton.textContent = 'Add Project';
    openProjectFormButton.setAttribute('id', 'open-project-form');
    sidenav.appendChild(openProjectFormButton);

    const projectList = document.createElement('div');
    projectList.setAttribute('id', 'project-list');
    sidenav.appendChild(projectList);

    sidenav.appendChild(createProjectForm());

    document.body.appendChild(sidenav);
};

const createProjectForm = function () {
    const popupForm = document.createElement('div');
    popupForm.setAttribute('class', 'form-popup');

    const form = document.createElement('form');
    form.setAttribute('id', 'project-form');

    const formTitle = document.createElement('h2');
    formTitle.textContent = 'Add Project';
    form.appendChild(formTitle);

    const label = document.createElement('label');
    label.textContent = 'Project Name';
    label.setAttribute('for', 'project-name');
    form.appendChild(label);

    const input = document.createElement('input');
    input.setAttribute('name', 'project-name');
    input.setAttribute('id', 'project-name');
    input.setAttribute('placeholder', 'Enter project name');
    input.setAttribute('type', 'text');
    input.setAttribute('required', true);
    form.appendChild(input);

    const addButton = document.createElement('button');
    addButton.setAttribute('type', 'submit');
    addButton.setAttribute('id', 'add-project-button');
    addButton.textContent = 'Add Project';
    form.appendChild(addButton);

    const cancelButton = document.createElement('button');
    cancelButton.setAttribute('type', 'submit');
    cancelButton.setAttribute('id', 'cancel-button');
    cancelButton.textContent = 'Cancel';
    form.appendChild(cancelButton);

    popupForm.appendChild(form);

    return popupForm;
};




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


(0,_modules_display_controller__WEBPACK_IMPORTED_MODULE_0__.loadSideNav)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O2tCQUF1RDtrQkFDRDs7QUFFdEQ7QUFDQTtBQUNBLFFBQVEsbUVBQWE7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEscURBQVc7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdURBQWE7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixDQUFDOztBQUVEO0FBQ0E7QUFDQTs7a0JBRXVCOzs7Ozs7Ozs7Ozs7Ozs7O0FDekR2Qjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O2tCQUVzQzs7Ozs7Ozs7Ozs7Ozs7O0FDZnRDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztrQkFFeUI7Ozs7Ozs7VUMvRHpCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7O2tCQ04yRDs7QUFFM0Qsd0VBQVciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9kaXNwbGF5LWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9zaWRlbmF2L3NpZGVuYXYtZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVQcm9qZWN0LCBnZXRQcm9qZWN0cyB9IGZyb20gJy4vcHJvamVjdCc7XG5pbXBvcnQgeyBjcmVhdGVTaWRlTmF2IH0gZnJvbSAnLi9zaWRlbmF2L3NpZGVuYXYtZG9tJztcblxuY29uc3Qgc2lkZW5hdiA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY3JlYXRlU2lkZU5hdigpO1xuICAgICAgICB1cGRhdGVQcm9qZWN0TGlzdCgpO1xuICAgICAgICBhZGRQcm9qZWN0RXZlbnRMaXN0ZW5lcigpO1xuICAgIH07XG5cbiAgICBjb25zdCB1cGRhdGVQcm9qZWN0TGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1saXN0Jyk7XG4gICAgICAgIHByb2plY3RMaXN0LmlubmVySFRNTCA9ICcnO1xuICAgICAgICBnZXRQcm9qZWN0cygpLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LnRleHRDb250ZW50ID0gcHJvamVjdC5wcm9qZWN0TmFtZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGUnLCBwcm9qZWN0LnByb2plY3ROYW1lKTtcbiAgICAgICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBhZGRQcm9qZWN0RXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3Qgb3BlblByb2plY3RGb3JtQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29wZW4tcHJvamVjdC1mb3JtJyk7XG4gICAgICAgIG9wZW5Qcm9qZWN0Rm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2plY3RMaXN0TW9kdWxlLm9wZW5Qcm9qZWN0Rm9ybSk7XG4gICAgfTtcblxuICAgIHJldHVybiB7IGluaXRpYWxpemUsIHVwZGF0ZVByb2plY3RMaXN0IH07XG59KSgpO1xuXG5jb25zdCBwcm9qZWN0TGlzdE1vZHVsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3Qgb3BlblByb2plY3RGb3JtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBvcGVuUG9wVXBGb3JtKCk7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1mb3JtJyk7XG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYWRkTmV3UHJvamVjdCwgZmFsc2UpO1xuICAgIH07XG5cbiAgICBjb25zdCBhZGROZXdQcm9qZWN0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZScpLnZhbHVlO1xuICAgICAgICBjcmVhdGVQcm9qZWN0KHByb2plY3ROYW1lKTtcbiAgICAgICAgc2lkZW5hdi51cGRhdGVQcm9qZWN0TGlzdCgpO1xuICAgICAgICBjbG9zZVBvcFVwRm9ybSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBvcGVuUG9wVXBGb3JtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1wb3B1cCcpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH07XG4gICAgY29uc3QgY2xvc2VQb3BVcEZvcm0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXBvcHVwJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9O1xuICAgIHJldHVybiB7IG9wZW5Qcm9qZWN0Rm9ybSB9O1xufSkoKTtcblxuY29uc3QgbG9hZFNpZGVOYXYgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2lkZW5hdi5pbml0aWFsaXplKCk7XG59O1xuXG5leHBvcnQgeyBsb2FkU2lkZU5hdiB9O1xuIiwibGV0IHByb2plY3RzID0gW107XG5cbmZ1bmN0aW9uIHByb2plY3RGYWN0b3J5KG5hbWUpIHtcbiAgICByZXR1cm4geyBwcm9qZWN0TmFtZTogbmFtZSwgdG9kb0xpc3Q6IFtdIH07XG59XG5cbmNvbnN0IGNyZWF0ZVByb2plY3QgPSBmdW5jdGlvbiAocHJvamVjdE5hbWUpIHtcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gcHJvamVjdEZhY3RvcnkocHJvamVjdE5hbWUpO1xuICAgIHByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG59O1xuXG5jb25zdCBnZXRQcm9qZWN0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcHJvamVjdHM7XG59O1xuXG5leHBvcnQgeyBjcmVhdGVQcm9qZWN0LCBnZXRQcm9qZWN0cyB9O1xuIiwiY29uc3QgY3JlYXRlU2lkZU5hdiA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBzaWRlbmF2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc2lkZW5hdi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NpZGUtbmF2Jyk7XG5cbiAgICBjb25zdCBwcm9qZWN0TGlzdEhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgIHByb2plY3RMaXN0SGVhZGluZy50ZXh0Q29udGVudCA9ICdQcm9qZWN0cyc7XG4gICAgc2lkZW5hdi5hcHBlbmRDaGlsZChwcm9qZWN0TGlzdEhlYWRpbmcpO1xuXG4gICAgY29uc3Qgb3BlblByb2plY3RGb3JtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgb3BlblByb2plY3RGb3JtQnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCBQcm9qZWN0JztcbiAgICBvcGVuUHJvamVjdEZvcm1CdXR0b24uc2V0QXR0cmlidXRlKCdpZCcsICdvcGVuLXByb2plY3QtZm9ybScpO1xuICAgIHNpZGVuYXYuYXBwZW5kQ2hpbGQob3BlblByb2plY3RGb3JtQnV0dG9uKTtcblxuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJvamVjdExpc3Quc2V0QXR0cmlidXRlKCdpZCcsICdwcm9qZWN0LWxpc3QnKTtcbiAgICBzaWRlbmF2LmFwcGVuZENoaWxkKHByb2plY3RMaXN0KTtcblxuICAgIHNpZGVuYXYuYXBwZW5kQ2hpbGQoY3JlYXRlUHJvamVjdEZvcm0oKSk7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNpZGVuYXYpO1xufTtcblxuY29uc3QgY3JlYXRlUHJvamVjdEZvcm0gPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgcG9wdXBGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcG9wdXBGb3JtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZm9ybS1wb3B1cCcpO1xuXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBmb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCAncHJvamVjdC1mb3JtJyk7XG5cbiAgICBjb25zdCBmb3JtVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIGZvcm1UaXRsZS50ZXh0Q29udGVudCA9ICdBZGQgUHJvamVjdCc7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtVGl0bGUpO1xuXG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIGxhYmVsLnRleHRDb250ZW50ID0gJ1Byb2plY3QgTmFtZSc7XG4gICAgbGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCAncHJvamVjdC1uYW1lJyk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChsYWJlbCk7XG5cbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywgJ3Byb2plY3QtbmFtZScpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnaWQnLCAncHJvamVjdC1uYW1lJyk7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsICdFbnRlciBwcm9qZWN0IG5hbWUnKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGlucHV0KTtcblxuICAgIGNvbnN0IGFkZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGFkZEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnc3VibWl0Jyk7XG4gICAgYWRkQnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnYWRkLXByb2plY3QtYnV0dG9uJyk7XG4gICAgYWRkQnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCBQcm9qZWN0JztcbiAgICBmb3JtLmFwcGVuZENoaWxkKGFkZEJ1dHRvbik7XG5cbiAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjYW5jZWxCdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ3N1Ym1pdCcpO1xuICAgIGNhbmNlbEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NhbmNlbC1idXR0b24nKTtcbiAgICBjYW5jZWxCdXR0b24udGV4dENvbnRlbnQgPSAnQ2FuY2VsJztcbiAgICBmb3JtLmFwcGVuZENoaWxkKGNhbmNlbEJ1dHRvbik7XG5cbiAgICBwb3B1cEZvcm0uYXBwZW5kQ2hpbGQoZm9ybSk7XG5cbiAgICByZXR1cm4gcG9wdXBGb3JtO1xufTtcblxuZXhwb3J0IHsgY3JlYXRlU2lkZU5hdiB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBsb2FkU2lkZU5hdiB9IGZyb20gJy4vbW9kdWxlcy9kaXNwbGF5LWNvbnRyb2xsZXInO1xuXG5sb2FkU2lkZU5hdigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9