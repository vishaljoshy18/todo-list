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
            const projectDiv = (0,_sidenav_sidenav_dom__WEBPACK_IMPORTED_MODULE_1__.createProjectDiv)(project.projectName);
            projectList.appendChild(projectDiv);
            addDeleteProjectEventListener();
        });
    };
    const addDeleteProjectEventListener = function () {
        const deleteProjectButtons = document.querySelectorAll('#delete-project-button');
        deleteProjectButtons.forEach((button) => {
            button.addEventListener('click', projectListModule.deleteProjectFromList);
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

    const deleteProjectFromList = function (event) {
        const projectName = event.target.dataset.projectname;
        console.log(projectName);
        (0,_project__WEBPACK_IMPORTED_MODULE_0__.deleteProject)(projectName);
        sidenav.updateProjectList();
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
    return { openProjectForm, deleteProjectFromList };
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
/* harmony export */   "getProjects": () => (/* binding */ getProjects),
/* harmony export */   "deleteProject": () => (/* binding */ deleteProject)
/* harmony export */ });
let projects = [];

function projectFactory(name) {
    return { projectName: name, todoList: [] };
}

const createProject = function (projectName) {
    const newProject = projectFactory(projectName);
    projects.push(newProject);
};

const deleteProject = function (name) {
    console.log(name);
    const indexOfProject = projects.findIndex((project) => {
        if (project.projectName === name) {
            return project;
        }
    });
    console.log(indexOfProject);
    projects.splice(indexOfProject, 1);
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
/* harmony export */   "createSideNav": () => (/* binding */ createSideNav),
/* harmony export */   "createProjectDiv": () => (/* binding */ createProjectDiv)
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

const createProjectDiv = function (projectName) {
    const div = document.createElement('div');
    div.textContent = projectName;
    div.setAttribute('id', 'project');

    const button = document.createElement('button');
    button.textContent = 'x';
    button.setAttribute('data-projectname', projectName);
    button.setAttribute('id', 'delete-project-button');
    div.appendChild(button);
    return div;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O2tCQUFzRTtrQkFDRTs7QUFFeEU7QUFDQTtBQUNBLFFBQVEsbUVBQWE7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEscURBQVc7QUFDbkIsK0JBQStCLHNFQUFnQjtBQUMvQztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdURBQWE7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVEQUFhO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O2tCQUV1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRXZCOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztrQkFFcUQ7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQnJEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztrQkFFMkM7Ozs7Ozs7VUM1RTNDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7O2tCQ04yRDs7QUFFM0Qsd0VBQVciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9kaXNwbGF5LWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9zaWRlbmF2L3NpZGVuYXYtZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVQcm9qZWN0LCBnZXRQcm9qZWN0cywgZGVsZXRlUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdCc7XG5pbXBvcnQgeyBjcmVhdGVTaWRlTmF2LCBjcmVhdGVQcm9qZWN0RGl2IH0gZnJvbSAnLi9zaWRlbmF2L3NpZGVuYXYtZG9tJztcblxuY29uc3Qgc2lkZW5hdiA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY3JlYXRlU2lkZU5hdigpO1xuICAgICAgICB1cGRhdGVQcm9qZWN0TGlzdCgpO1xuICAgICAgICBhZGRQcm9qZWN0RXZlbnRMaXN0ZW5lcigpO1xuICAgIH07XG5cbiAgICBjb25zdCB1cGRhdGVQcm9qZWN0TGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1saXN0Jyk7XG4gICAgICAgIHByb2plY3RMaXN0LmlubmVySFRNTCA9ICcnO1xuICAgICAgICBnZXRQcm9qZWN0cygpLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3REaXYgPSBjcmVhdGVQcm9qZWN0RGl2KHByb2plY3QucHJvamVjdE5hbWUpO1xuICAgICAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQocHJvamVjdERpdik7XG4gICAgICAgICAgICBhZGREZWxldGVQcm9qZWN0RXZlbnRMaXN0ZW5lcigpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGNvbnN0IGFkZERlbGV0ZVByb2plY3RFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBkZWxldGVQcm9qZWN0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNkZWxldGUtcHJvamVjdC1idXR0b24nKTtcbiAgICAgICAgZGVsZXRlUHJvamVjdEJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9qZWN0TGlzdE1vZHVsZS5kZWxldGVQcm9qZWN0RnJvbUxpc3QpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3QgYWRkUHJvamVjdEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IG9wZW5Qcm9qZWN0Rm9ybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvcGVuLXByb2plY3QtZm9ybScpO1xuICAgICAgICBvcGVuUHJvamVjdEZvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9qZWN0TGlzdE1vZHVsZS5vcGVuUHJvamVjdEZvcm0pO1xuICAgIH07XG5cbiAgICByZXR1cm4geyBpbml0aWFsaXplLCB1cGRhdGVQcm9qZWN0TGlzdCB9O1xufSkoKTtcblxuY29uc3QgcHJvamVjdExpc3RNb2R1bGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IG9wZW5Qcm9qZWN0Rm9ybSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb3BlblBvcFVwRm9ybSgpO1xuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZm9ybScpO1xuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGFkZE5ld1Byb2plY3QsIGZhbHNlKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZGVsZXRlUHJvamVjdEZyb21MaXN0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQucHJvamVjdG5hbWU7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3ROYW1lKTtcbiAgICAgICAgZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSk7XG4gICAgICAgIHNpZGVuYXYudXBkYXRlUHJvamVjdExpc3QoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgYWRkTmV3UHJvamVjdCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LW5hbWUnKS52YWx1ZTtcbiAgICAgICAgY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZSk7XG4gICAgICAgIHNpZGVuYXYudXBkYXRlUHJvamVjdExpc3QoKTtcbiAgICAgICAgY2xvc2VQb3BVcEZvcm0oKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb3BlblBvcFVwRm9ybSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tcG9wdXAnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9O1xuICAgIGNvbnN0IGNsb3NlUG9wVXBGb3JtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1wb3B1cCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfTtcbiAgICByZXR1cm4geyBvcGVuUHJvamVjdEZvcm0sIGRlbGV0ZVByb2plY3RGcm9tTGlzdCB9O1xufSkoKTtcblxuY29uc3QgbG9hZFNpZGVOYXYgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2lkZW5hdi5pbml0aWFsaXplKCk7XG59O1xuXG5leHBvcnQgeyBsb2FkU2lkZU5hdiB9O1xuIiwibGV0IHByb2plY3RzID0gW107XG5cbmZ1bmN0aW9uIHByb2plY3RGYWN0b3J5KG5hbWUpIHtcbiAgICByZXR1cm4geyBwcm9qZWN0TmFtZTogbmFtZSwgdG9kb0xpc3Q6IFtdIH07XG59XG5cbmNvbnN0IGNyZWF0ZVByb2plY3QgPSBmdW5jdGlvbiAocHJvamVjdE5hbWUpIHtcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gcHJvamVjdEZhY3RvcnkocHJvamVjdE5hbWUpO1xuICAgIHByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG59O1xuXG5jb25zdCBkZWxldGVQcm9qZWN0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBjb25zb2xlLmxvZyhuYW1lKTtcbiAgICBjb25zdCBpbmRleE9mUHJvamVjdCA9IHByb2plY3RzLmZpbmRJbmRleCgocHJvamVjdCkgPT4ge1xuICAgICAgICBpZiAocHJvamVjdC5wcm9qZWN0TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb2plY3Q7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhpbmRleE9mUHJvamVjdCk7XG4gICAgcHJvamVjdHMuc3BsaWNlKGluZGV4T2ZQcm9qZWN0LCAxKTtcbn07XG5cbmNvbnN0IGdldFByb2plY3RzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBwcm9qZWN0cztcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZVByb2plY3QsIGdldFByb2plY3RzLCBkZWxldGVQcm9qZWN0IH07XG4iLCJjb25zdCBjcmVhdGVTaWRlTmF2ID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHNpZGVuYXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzaWRlbmF2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc2lkZS1uYXYnKTtcblxuICAgIGNvbnN0IHByb2plY3RMaXN0SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgcHJvamVjdExpc3RIZWFkaW5nLnRleHRDb250ZW50ID0gJ1Byb2plY3RzJztcbiAgICBzaWRlbmF2LmFwcGVuZENoaWxkKHByb2plY3RMaXN0SGVhZGluZyk7XG5cbiAgICBjb25zdCBvcGVuUHJvamVjdEZvcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBvcGVuUHJvamVjdEZvcm1CdXR0b24udGV4dENvbnRlbnQgPSAnQWRkIFByb2plY3QnO1xuICAgIG9wZW5Qcm9qZWN0Rm9ybUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ29wZW4tcHJvamVjdC1mb3JtJyk7XG4gICAgc2lkZW5hdi5hcHBlbmRDaGlsZChvcGVuUHJvamVjdEZvcm1CdXR0b24pO1xuXG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcm9qZWN0TGlzdC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Byb2plY3QtbGlzdCcpO1xuICAgIHNpZGVuYXYuYXBwZW5kQ2hpbGQocHJvamVjdExpc3QpO1xuXG4gICAgc2lkZW5hdi5hcHBlbmRDaGlsZChjcmVhdGVQcm9qZWN0Rm9ybSgpKTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2lkZW5hdik7XG59O1xuXG5jb25zdCBjcmVhdGVQcm9qZWN0RGl2ID0gZnVuY3Rpb24gKHByb2plY3ROYW1lKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LnRleHRDb250ZW50ID0gcHJvamVjdE5hbWU7XG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnaWQnLCAncHJvamVjdCcpO1xuXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gJ3gnO1xuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdG5hbWUnLCBwcm9qZWN0TmFtZSk7XG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnZGVsZXRlLXByb2plY3QtYnV0dG9uJyk7XG4gICAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgcmV0dXJuIGRpdjtcbn07XG5cbmNvbnN0IGNyZWF0ZVByb2plY3RGb3JtID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHBvcHVwRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBvcHVwRm9ybS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Zvcm0tcG9wdXAnKTtcblxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Byb2plY3QtZm9ybScpO1xuXG4gICAgY29uc3QgZm9ybVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBmb3JtVGl0bGUudGV4dENvbnRlbnQgPSAnQWRkIFByb2plY3QnO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybVRpdGxlKTtcblxuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBsYWJlbC50ZXh0Q29udGVudCA9ICdQcm9qZWN0IE5hbWUnO1xuICAgIGxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgJ3Byb2plY3QtbmFtZScpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQobGFiZWwpO1xuXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsICdwcm9qZWN0LW5hbWUnKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Byb2plY3QtbmFtZScpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCAnRW50ZXIgcHJvamVjdCBuYW1lJyk7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XG5cbiAgICBjb25zdCBhZGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBhZGRCdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ3N1Ym1pdCcpO1xuICAgIGFkZEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2FkZC1wcm9qZWN0LWJ1dHRvbicpO1xuICAgIGFkZEJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQgUHJvamVjdCc7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChhZGRCdXR0b24pO1xuXG4gICAgY29uc3QgY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY2FuY2VsQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdzdWJtaXQnKTtcbiAgICBjYW5jZWxCdXR0b24uc2V0QXR0cmlidXRlKCdpZCcsICdjYW5jZWwtYnV0dG9uJyk7XG4gICAgY2FuY2VsQnV0dG9uLnRleHRDb250ZW50ID0gJ0NhbmNlbCc7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChjYW5jZWxCdXR0b24pO1xuXG4gICAgcG9wdXBGb3JtLmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgcmV0dXJuIHBvcHVwRm9ybTtcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZVNpZGVOYXYsIGNyZWF0ZVByb2plY3REaXYgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgbG9hZFNpZGVOYXYgfSBmcm9tICcuL21vZHVsZXMvZGlzcGxheS1jb250cm9sbGVyJztcblxubG9hZFNpZGVOYXYoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==