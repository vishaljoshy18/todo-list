/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/display-components/header-dom.js":
/*!******************************************************!*\
  !*** ./src/modules/display-components/header-dom.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const headerDom = (function () {
    const createHeader = function () {
        const header = document.createElement('header');
        header.appendChild(createToDoIcon());
        header.appendChild(updateSelectedProject());
        document.body.appendChild(header);
    };
    const createToDoIcon = function () {
        const icon = document.createElement('div');
        icon.setAttribute('id', 'icon');
        const button = document.createElement('button');
        button.textContent = '+';
        const heading = document.createElement('h2');
        heading.textContent = 'TO-DO LIST ';
        icon.appendChild(button);
        icon.appendChild(heading);
        return icon;
    };
    const updateSelectedProject = function () {
        const div = document.createElement('div');
        const projectHeding = document.createElement('h3');
        projectHeding.setAttribute('id', 'project-header');
        projectHeding.textContent = 'Default';
        div.appendChild(projectHeding);
        return div;
    };

    return { createHeader, updateSelectedProject };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (headerDom);


/***/ }),

/***/ "./src/modules/display-components/sidenav-dom.js":
/*!*******************************************************!*\
  !*** ./src/modules/display-components/sidenav-dom.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const sideNavDom = (function () {
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

        return sidenav;
    };

    const createProjectDiv = function (projectName) {
        const div = document.createElement('div');
        div.textContent = projectName;
        div.setAttribute('id', 'project');

        if (projectName == 'Default') {
            return div;
        }
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

    return { createSideNav, createProjectDiv };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sideNavDom);


/***/ }),

/***/ "./src/modules/display-controller.js":
/*!*******************************************!*\
  !*** ./src/modules/display-controller.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadSideNav": () => (/* binding */ loadSideNav)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/modules/projects.js");
/* harmony import */ var _display_components_sidenav_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display-components/sidenav-dom */ "./src/modules/display-components/sidenav-dom.js");
/* harmony import */ var _display_components_header_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./display-components/header-dom */ "./src/modules/display-components/header-dom.js");




const sidenav = (function () {
    const initialize = function () {
        _display_components_header_dom__WEBPACK_IMPORTED_MODULE_2__.default.createHeader();
        const main = document.createElement('main');
        main.appendChild(_display_components_sidenav_dom__WEBPACK_IMPORTED_MODULE_1__.default.createSideNav());
        document.body.appendChild(main);
        projectListModule.createDefaultProject();
        updateProjectList();
        _display_components_header_dom__WEBPACK_IMPORTED_MODULE_2__.default.updateSelectedProject('Default');
        addProjectEventListener();
    };

    const updateProjectList = function () {
        const projectList = document.querySelector('#project-list');
        projectList.innerHTML = '';
        _projects__WEBPACK_IMPORTED_MODULE_0__.default.getProjects().forEach((project) => {
            const projectDiv = _display_components_sidenav_dom__WEBPACK_IMPORTED_MODULE_1__.default.createProjectDiv(project.projectName);
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
    const addNewProject = function (event) {
        event.preventDefault();
        const projectName = document.querySelector('#project-name').value;
        _projects__WEBPACK_IMPORTED_MODULE_0__.default.createProject(projectName);
        sidenav.updateProjectList();
        closePopUpForm();
    };

    const deleteProjectFromList = function (event) {
        const projectName = event.target.dataset.projectname;
        console.log(projectName);
        _projects__WEBPACK_IMPORTED_MODULE_0__.default.deleteProject(projectName);
        sidenav.updateProjectList();
    };

    const createDefaultProject = function () {
        _projects__WEBPACK_IMPORTED_MODULE_0__.default.createProject('Default');
    };

    const openPopUpForm = function () {
        document.querySelector('.form-popup').style.display = 'block';
    };
    const closePopUpForm = function () {
        document.querySelector('.form-popup').style.display = 'none';
    };
    return { openProjectForm, deleteProjectFromList, createDefaultProject };
})();

const loadSideNav = function () {
    sidenav.initialize();
};




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
const projects = (function () {
    let projects = [];

    function projectFactory(name) {
        return { projectName: name, todoList: [] };
    }

    const createProject = function (projectName) {
        const newProject = projectFactory(projectName);
        projects.push(newProject);
    };

    const deleteProject = function (name) {
        const indexOfProject = projects.findIndex((project) => {
            if (project.projectName === name) {
                return project;
            }
        });
        projects.splice(indexOfProject, 1);
    };

    const getProjects = function () {
        return projects;
    };

    return { createProject, deleteProject, getProjects };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projects);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiLENBQUM7O0FBRUQsaUVBQWUsU0FBUyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUM5QnpCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLGFBQWE7QUFDYixDQUFDOztBQUVELGlFQUFlLFVBQVUsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O29FQ3BGUTtvSEFDd0I7Z0hBQ0Y7O0FBRXhEO0FBQ0E7QUFDQSxRQUFRLGdGQUFzQjtBQUM5QjtBQUNBLHlCQUF5QixrRkFBd0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsUUFBUSx5RkFBK0I7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDBEQUFvQjtBQUM1QiwrQkFBK0IscUZBQTJCO0FBQzFEO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2IsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDREQUFzQjtBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSw0REFBc0I7QUFDOUI7QUFDQTs7QUFFQTtBQUNBLFFBQVEsNERBQXNCO0FBQzlCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixDQUFDOztBQUVEO0FBQ0E7QUFDQTs7a0JBRXVCOzs7Ozs7Ozs7Ozs7Ozs7QUM5RXZCO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2IsQ0FBQzs7QUFFRCxpRUFBZSxRQUFRLEVBQUM7Ozs7Ozs7VUM1QnhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7O2tCQ04yRDs7QUFFM0Qsd0VBQVciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9kaXNwbGF5LWNvbXBvbmVudHMvaGVhZGVyLWRvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9kaXNwbGF5LWNvbXBvbmVudHMvc2lkZW5hdi1kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZGlzcGxheS1jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBoZWFkZXJEb20gPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGNyZWF0ZUhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgICAgIGhlYWRlci5hcHBlbmRDaGlsZChjcmVhdGVUb0RvSWNvbigpKTtcbiAgICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKHVwZGF0ZVNlbGVjdGVkUHJvamVjdCgpKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgIH07XG4gICAgY29uc3QgY3JlYXRlVG9Eb0ljb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaWNvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2ljb24nKTtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9ICcrJztcbiAgICAgICAgY29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgIGhlYWRpbmcudGV4dENvbnRlbnQgPSAnVE8tRE8gTElTVCAnO1xuICAgICAgICBpY29uLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgIGljb24uYXBwZW5kQ2hpbGQoaGVhZGluZyk7XG4gICAgICAgIHJldHVybiBpY29uO1xuICAgIH07XG4gICAgY29uc3QgdXBkYXRlU2VsZWN0ZWRQcm9qZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgcHJvamVjdEhlZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgIHByb2plY3RIZWRpbmcuc2V0QXR0cmlidXRlKCdpZCcsICdwcm9qZWN0LWhlYWRlcicpO1xuICAgICAgICBwcm9qZWN0SGVkaW5nLnRleHRDb250ZW50ID0gJ0RlZmF1bHQnO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQocHJvamVjdEhlZGluZyk7XG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgfTtcblxuICAgIHJldHVybiB7IGNyZWF0ZUhlYWRlciwgdXBkYXRlU2VsZWN0ZWRQcm9qZWN0IH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBoZWFkZXJEb207XG4iLCJjb25zdCBzaWRlTmF2RG9tID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBjcmVhdGVTaWRlTmF2ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBzaWRlbmF2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNpZGVuYXYuc2V0QXR0cmlidXRlKCdjbGFzcycsICdzaWRlLW5hdicpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgIHByb2plY3RMaXN0SGVhZGluZy50ZXh0Q29udGVudCA9ICdQcm9qZWN0cyc7XG4gICAgICAgIHNpZGVuYXYuYXBwZW5kQ2hpbGQocHJvamVjdExpc3RIZWFkaW5nKTtcblxuICAgICAgICBjb25zdCBvcGVuUHJvamVjdEZvcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgb3BlblByb2plY3RGb3JtQnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCBQcm9qZWN0JztcbiAgICAgICAgb3BlblByb2plY3RGb3JtQnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnb3Blbi1wcm9qZWN0LWZvcm0nKTtcbiAgICAgICAgc2lkZW5hdi5hcHBlbmRDaGlsZChvcGVuUHJvamVjdEZvcm1CdXR0b24pO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHByb2plY3RMaXN0LnNldEF0dHJpYnV0ZSgnaWQnLCAncHJvamVjdC1saXN0Jyk7XG4gICAgICAgIHNpZGVuYXYuYXBwZW5kQ2hpbGQocHJvamVjdExpc3QpO1xuXG4gICAgICAgIHNpZGVuYXYuYXBwZW5kQ2hpbGQoY3JlYXRlUHJvamVjdEZvcm0oKSk7XG5cbiAgICAgICAgcmV0dXJuIHNpZGVuYXY7XG4gICAgfTtcblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3REaXYgPSBmdW5jdGlvbiAocHJvamVjdE5hbWUpIHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi50ZXh0Q29udGVudCA9IHByb2plY3ROYW1lO1xuICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdpZCcsICdwcm9qZWN0Jyk7XG5cbiAgICAgICAgaWYgKHByb2plY3ROYW1lID09ICdEZWZhdWx0Jykge1xuICAgICAgICAgICAgcmV0dXJuIGRpdjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gJ3gnO1xuICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3RuYW1lJywgcHJvamVjdE5hbWUpO1xuICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKCdpZCcsICdkZWxldGUtcHJvamVjdC1idXR0b24nKTtcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XG5cbiAgICAgICAgcmV0dXJuIGRpdjtcbiAgICB9O1xuXG4gICAgY29uc3QgY3JlYXRlUHJvamVjdEZvcm0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHBvcHVwRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwb3B1cEZvcm0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdmb3JtLXBvcHVwJyk7XG5cbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Byb2plY3QtZm9ybScpO1xuXG4gICAgICAgIGNvbnN0IGZvcm1UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgIGZvcm1UaXRsZS50ZXh0Q29udGVudCA9ICdBZGQgUHJvamVjdCc7XG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybVRpdGxlKTtcblxuICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGxhYmVsLnRleHRDb250ZW50ID0gJ1Byb2plY3QgTmFtZSc7XG4gICAgICAgIGxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgJ3Byb2plY3QtbmFtZScpO1xuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGxhYmVsKTtcblxuICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsICdwcm9qZWN0LW5hbWUnKTtcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdpZCcsICdwcm9qZWN0LW5hbWUnKTtcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsICdFbnRlciBwcm9qZWN0IG5hbWUnKTtcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGlucHV0KTtcblxuICAgICAgICBjb25zdCBhZGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYWRkQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdzdWJtaXQnKTtcbiAgICAgICAgYWRkQnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnYWRkLXByb2plY3QtYnV0dG9uJyk7XG4gICAgICAgIGFkZEJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQgUHJvamVjdCc7XG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoYWRkQnV0dG9uKTtcblxuICAgICAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgY2FuY2VsQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdzdWJtaXQnKTtcbiAgICAgICAgY2FuY2VsQnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnY2FuY2VsLWJ1dHRvbicpO1xuICAgICAgICBjYW5jZWxCdXR0b24udGV4dENvbnRlbnQgPSAnQ2FuY2VsJztcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChjYW5jZWxCdXR0b24pO1xuXG4gICAgICAgIHBvcHVwRm9ybS5hcHBlbmRDaGlsZChmb3JtKTtcblxuICAgICAgICByZXR1cm4gcG9wdXBGb3JtO1xuICAgIH07XG5cbiAgICByZXR1cm4geyBjcmVhdGVTaWRlTmF2LCBjcmVhdGVQcm9qZWN0RGl2IH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBzaWRlTmF2RG9tO1xuIiwiaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuaW1wb3J0IHNpZGVuYXZEb20gZnJvbSAnLi9kaXNwbGF5LWNvbXBvbmVudHMvc2lkZW5hdi1kb20nO1xuaW1wb3J0IGhlYWRlckRvbSBmcm9tICcuL2Rpc3BsYXktY29tcG9uZW50cy9oZWFkZXItZG9tJztcblxuY29uc3Qgc2lkZW5hdiA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaGVhZGVyRG9tLmNyZWF0ZUhlYWRlcigpO1xuICAgICAgICBjb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWFpbicpO1xuICAgICAgICBtYWluLmFwcGVuZENoaWxkKHNpZGVuYXZEb20uY3JlYXRlU2lkZU5hdigpKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtYWluKTtcbiAgICAgICAgcHJvamVjdExpc3RNb2R1bGUuY3JlYXRlRGVmYXVsdFByb2plY3QoKTtcbiAgICAgICAgdXBkYXRlUHJvamVjdExpc3QoKTtcbiAgICAgICAgaGVhZGVyRG9tLnVwZGF0ZVNlbGVjdGVkUHJvamVjdCgnRGVmYXVsdCcpO1xuICAgICAgICBhZGRQcm9qZWN0RXZlbnRMaXN0ZW5lcigpO1xuICAgIH07XG5cbiAgICBjb25zdCB1cGRhdGVQcm9qZWN0TGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1saXN0Jyk7XG4gICAgICAgIHByb2plY3RMaXN0LmlubmVySFRNTCA9ICcnO1xuICAgICAgICBwcm9qZWN0cy5nZXRQcm9qZWN0cygpLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3REaXYgPSBzaWRlbmF2RG9tLmNyZWF0ZVByb2plY3REaXYocHJvamVjdC5wcm9qZWN0TmFtZSk7XG4gICAgICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0RGl2KTtcbiAgICAgICAgICAgIGFkZERlbGV0ZVByb2plY3RFdmVudExpc3RlbmVyKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgY29uc3QgYWRkRGVsZXRlUHJvamVjdEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGRlbGV0ZVByb2plY3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2RlbGV0ZS1wcm9qZWN0LWJ1dHRvbicpO1xuICAgICAgICBkZWxldGVQcm9qZWN0QnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2plY3RMaXN0TW9kdWxlLmRlbGV0ZVByb2plY3RGcm9tTGlzdCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBhZGRQcm9qZWN0RXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3Qgb3BlblByb2plY3RGb3JtQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29wZW4tcHJvamVjdC1mb3JtJyk7XG4gICAgICAgIG9wZW5Qcm9qZWN0Rm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2plY3RMaXN0TW9kdWxlLm9wZW5Qcm9qZWN0Rm9ybSk7XG4gICAgfTtcblxuICAgIHJldHVybiB7IGluaXRpYWxpemUsIHVwZGF0ZVByb2plY3RMaXN0IH07XG59KSgpO1xuXG5jb25zdCBwcm9qZWN0TGlzdE1vZHVsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3Qgb3BlblByb2plY3RGb3JtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBvcGVuUG9wVXBGb3JtKCk7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1mb3JtJyk7XG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYWRkTmV3UHJvamVjdCwgZmFsc2UpO1xuICAgIH07XG4gICAgY29uc3QgYWRkTmV3UHJvamVjdCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LW5hbWUnKS52YWx1ZTtcbiAgICAgICAgcHJvamVjdHMuY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZSk7XG4gICAgICAgIHNpZGVuYXYudXBkYXRlUHJvamVjdExpc3QoKTtcbiAgICAgICAgY2xvc2VQb3BVcEZvcm0oKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZGVsZXRlUHJvamVjdEZyb21MaXN0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQucHJvamVjdG5hbWU7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3ROYW1lKTtcbiAgICAgICAgcHJvamVjdHMuZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSk7XG4gICAgICAgIHNpZGVuYXYudXBkYXRlUHJvamVjdExpc3QoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY3JlYXRlRGVmYXVsdFByb2plY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHByb2plY3RzLmNyZWF0ZVByb2plY3QoJ0RlZmF1bHQnKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb3BlblBvcFVwRm9ybSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tcG9wdXAnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9O1xuICAgIGNvbnN0IGNsb3NlUG9wVXBGb3JtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1wb3B1cCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfTtcbiAgICByZXR1cm4geyBvcGVuUHJvamVjdEZvcm0sIGRlbGV0ZVByb2plY3RGcm9tTGlzdCwgY3JlYXRlRGVmYXVsdFByb2plY3QgfTtcbn0pKCk7XG5cbmNvbnN0IGxvYWRTaWRlTmF2ID0gZnVuY3Rpb24gKCkge1xuICAgIHNpZGVuYXYuaW5pdGlhbGl6ZSgpO1xufTtcblxuZXhwb3J0IHsgbG9hZFNpZGVOYXYgfTtcbiIsImNvbnN0IHByb2plY3RzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgcHJvamVjdHMgPSBbXTtcblxuICAgIGZ1bmN0aW9uIHByb2plY3RGYWN0b3J5KG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHsgcHJvamVjdE5hbWU6IG5hbWUsIHRvZG9MaXN0OiBbXSB9O1xuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3QgPSBmdW5jdGlvbiAocHJvamVjdE5hbWUpIHtcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdCA9IHByb2plY3RGYWN0b3J5KHByb2plY3ROYW1lKTtcbiAgICAgICAgcHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcbiAgICB9O1xuXG4gICAgY29uc3QgZGVsZXRlUHJvamVjdCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGNvbnN0IGluZGV4T2ZQcm9qZWN0ID0gcHJvamVjdHMuZmluZEluZGV4KChwcm9qZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAocHJvamVjdC5wcm9qZWN0TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9qZWN0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcHJvamVjdHMuc3BsaWNlKGluZGV4T2ZQcm9qZWN0LCAxKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0UHJvamVjdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBwcm9qZWN0cztcbiAgICB9O1xuXG4gICAgcmV0dXJuIHsgY3JlYXRlUHJvamVjdCwgZGVsZXRlUHJvamVjdCwgZ2V0UHJvamVjdHMgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3RzO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBsb2FkU2lkZU5hdiB9IGZyb20gJy4vbW9kdWxlcy9kaXNwbGF5LWNvbnRyb2xsZXInO1xuXG5sb2FkU2lkZU5hdigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9