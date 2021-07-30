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
        header.appendChild(createSelectedProjectHeading());
        document.body.appendChild(header);

        createSelectedProjectHeading();
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
    const createSelectedProjectHeading = function () {
        const div = document.createElement('div');
        const projectHeading = document.createElement('h3');
        projectHeading.setAttribute('id', 'project-header');
        div.appendChild(projectHeading);
        return div;
    };
    const updateSelectedProjectHeading = function (projectName) {
        const projectHeading = document.querySelector('#project-header');
        projectHeading.textContent = projectName;
    };

    return { createHeader, updateSelectedProjectHeading };
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
        div.setAttribute('data-projectname', projectName);
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
        onClickNewProject();
        _display_components_header_dom__WEBPACK_IMPORTED_MODULE_2__.default.updateSelectedProjectHeading('Default');
    };

    const updateProjectList = function () {
        const projectList = document.querySelector('#project-list');
        projectList.innerHTML = '';
        _projects__WEBPACK_IMPORTED_MODULE_0__.default.getProjects().forEach((project) => {
            const projectDiv = _display_components_sidenav_dom__WEBPACK_IMPORTED_MODULE_1__.default.createProjectDiv(project.projectName);
            console.log(projectDiv);
            projectList.appendChild(projectDiv);
            onClickDeleteProject();
        });
    };
    const onClickDeleteProject = function () {
        const deleteProjectButtons = document.querySelectorAll('#delete-project-button');
        deleteProjectButtons.forEach((button) => {
            button.addEventListener('click', projectListModule.deleteProjectFromList);
        });
    };

    const onClickNewProject = function () {
        const openProjectFormButton = document.querySelector('#open-project-form');
        openProjectFormButton.addEventListener('click', projectListModule.openProjectForm);
    };
    const onClickProjectList = function () {
        const projectList = document.querySelectorAll('#project');
        projectList.forEach((project) => {
            project.addEventListener('click', () => {
                _display_components_header_dom__WEBPACK_IMPORTED_MODULE_2__.default.updateSelectedProjectHeading(project.dataset.projectname);
            });
        });
    };

    return { initialize, updateProjectList, onClickProjectList };
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
        sidenav.onClickProjectList();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiLENBQUM7O0FBRUQsaUVBQWUsU0FBUyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNuQ3pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxhQUFhO0FBQ2IsQ0FBQzs7QUFFRCxpRUFBZSxVQUFVLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztvRUNwRlE7b0hBQ3dCO2dIQUNGOztBQUV4RDtBQUNBO0FBQ0EsUUFBUSxnRkFBc0I7QUFDOUI7QUFDQSx5QkFBeUIsa0ZBQXdCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxnR0FBc0M7QUFDOUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSwwREFBb0I7QUFDNUIsK0JBQStCLHFGQUEyQjtBQUMxRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGdHQUFzQztBQUN0RCxhQUFhO0FBQ2IsU0FBUztBQUNUOztBQUVBLGFBQWE7QUFDYixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNERBQXNCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNERBQXNCO0FBQzlCO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLDREQUFzQjtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O2tCQUV1Qjs7Ozs7Ozs7Ozs7Ozs7O0FDeEZ2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2IsQ0FBQzs7QUFFRCxpRUFBZSxRQUFRLEVBQUM7Ozs7Ozs7VUM3QnhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7O2tCQ04yRDs7QUFFM0Qsd0VBQVciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9kaXNwbGF5LWNvbXBvbmVudHMvaGVhZGVyLWRvbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9kaXNwbGF5LWNvbXBvbmVudHMvc2lkZW5hdi1kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZGlzcGxheS1jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBoZWFkZXJEb20gPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGNyZWF0ZUhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgICAgIGhlYWRlci5hcHBlbmRDaGlsZChjcmVhdGVUb0RvSWNvbigpKTtcbiAgICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKGNyZWF0ZVNlbGVjdGVkUHJvamVjdEhlYWRpbmcoKSk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblxuICAgICAgICBjcmVhdGVTZWxlY3RlZFByb2plY3RIZWFkaW5nKCk7XG4gICAgfTtcbiAgICBjb25zdCBjcmVhdGVUb0RvSWNvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBpY29uLnNldEF0dHJpYnV0ZSgnaWQnLCAnaWNvbicpO1xuICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gJysnO1xuICAgICAgICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgaGVhZGluZy50ZXh0Q29udGVudCA9ICdUTy1ETyBMSVNUICc7XG4gICAgICAgIGljb24uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICAgICAgaWNvbi5hcHBlbmRDaGlsZChoZWFkaW5nKTtcbiAgICAgICAgcmV0dXJuIGljb247XG4gICAgfTtcbiAgICBjb25zdCBjcmVhdGVTZWxlY3RlZFByb2plY3RIZWFkaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgcHJvamVjdEhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICBwcm9qZWN0SGVhZGluZy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Byb2plY3QtaGVhZGVyJyk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChwcm9qZWN0SGVhZGluZyk7XG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgfTtcbiAgICBjb25zdCB1cGRhdGVTZWxlY3RlZFByb2plY3RIZWFkaW5nID0gZnVuY3Rpb24gKHByb2plY3ROYW1lKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RIZWFkaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtaGVhZGVyJyk7XG4gICAgICAgIHByb2plY3RIZWFkaW5nLnRleHRDb250ZW50ID0gcHJvamVjdE5hbWU7XG4gICAgfTtcblxuICAgIHJldHVybiB7IGNyZWF0ZUhlYWRlciwgdXBkYXRlU2VsZWN0ZWRQcm9qZWN0SGVhZGluZyB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgaGVhZGVyRG9tO1xuIiwiY29uc3Qgc2lkZU5hdkRvbSA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgY3JlYXRlU2lkZU5hdiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3Qgc2lkZW5hdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzaWRlbmF2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc2lkZS1uYXYnKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdEhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICBwcm9qZWN0TGlzdEhlYWRpbmcudGV4dENvbnRlbnQgPSAnUHJvamVjdHMnO1xuICAgICAgICBzaWRlbmF2LmFwcGVuZENoaWxkKHByb2plY3RMaXN0SGVhZGluZyk7XG5cbiAgICAgICAgY29uc3Qgb3BlblByb2plY3RGb3JtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIG9wZW5Qcm9qZWN0Rm9ybUJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQgUHJvamVjdCc7XG4gICAgICAgIG9wZW5Qcm9qZWN0Rm9ybUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ29wZW4tcHJvamVjdC1mb3JtJyk7XG4gICAgICAgIHNpZGVuYXYuYXBwZW5kQ2hpbGQob3BlblByb2plY3RGb3JtQnV0dG9uKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwcm9qZWN0TGlzdC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Byb2plY3QtbGlzdCcpO1xuICAgICAgICBzaWRlbmF2LmFwcGVuZENoaWxkKHByb2plY3RMaXN0KTtcblxuICAgICAgICBzaWRlbmF2LmFwcGVuZENoaWxkKGNyZWF0ZVByb2plY3RGb3JtKCkpO1xuXG4gICAgICAgIHJldHVybiBzaWRlbmF2O1xuICAgIH07XG5cbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0RGl2ID0gZnVuY3Rpb24gKHByb2plY3ROYW1lKSB7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXYudGV4dENvbnRlbnQgPSBwcm9qZWN0TmFtZTtcbiAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0bmFtZScsIHByb2plY3ROYW1lKTtcbiAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnaWQnLCAncHJvamVjdCcpO1xuICAgICAgICBpZiAocHJvamVjdE5hbWUgPT0gJ0RlZmF1bHQnKSB7XG4gICAgICAgICAgICByZXR1cm4gZGl2O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSAneCc7XG4gICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdG5hbWUnLCBwcm9qZWN0TmFtZSk7XG4gICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2RlbGV0ZS1wcm9qZWN0LWJ1dHRvbicpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcblxuICAgICAgICByZXR1cm4gZGl2O1xuICAgIH07XG5cbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0Rm9ybSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgcG9wdXBGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHBvcHVwRm9ybS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Zvcm0tcG9wdXAnKTtcblxuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICBmb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCAncHJvamVjdC1mb3JtJyk7XG5cbiAgICAgICAgY29uc3QgZm9ybVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgZm9ybVRpdGxlLnRleHRDb250ZW50ID0gJ0FkZCBQcm9qZWN0JztcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtVGl0bGUpO1xuXG4gICAgICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSAnUHJvamVjdCBOYW1lJztcbiAgICAgICAgbGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCAncHJvamVjdC1uYW1lJyk7XG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQobGFiZWwpO1xuXG4gICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywgJ3Byb2plY3QtbmFtZScpO1xuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Byb2plY3QtbmFtZScpO1xuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgJ0VudGVyIHByb2plY3QgbmFtZScpO1xuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xuXG4gICAgICAgIGNvbnN0IGFkZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBhZGRCdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ3N1Ym1pdCcpO1xuICAgICAgICBhZGRCdXR0b24uc2V0QXR0cmlidXRlKCdpZCcsICdhZGQtcHJvamVjdC1idXR0b24nKTtcbiAgICAgICAgYWRkQnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCBQcm9qZWN0JztcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChhZGRCdXR0b24pO1xuXG4gICAgICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjYW5jZWxCdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ3N1Ym1pdCcpO1xuICAgICAgICBjYW5jZWxCdXR0b24uc2V0QXR0cmlidXRlKCdpZCcsICdjYW5jZWwtYnV0dG9uJyk7XG4gICAgICAgIGNhbmNlbEJ1dHRvbi50ZXh0Q29udGVudCA9ICdDYW5jZWwnO1xuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGNhbmNlbEJ1dHRvbik7XG5cbiAgICAgICAgcG9wdXBGb3JtLmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgICAgIHJldHVybiBwb3B1cEZvcm07XG4gICAgfTtcblxuICAgIHJldHVybiB7IGNyZWF0ZVNpZGVOYXYsIGNyZWF0ZVByb2plY3REaXYgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHNpZGVOYXZEb207XG4iLCJpbXBvcnQgcHJvamVjdHMgZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgc2lkZW5hdkRvbSBmcm9tICcuL2Rpc3BsYXktY29tcG9uZW50cy9zaWRlbmF2LWRvbSc7XG5pbXBvcnQgaGVhZGVyRG9tIGZyb20gJy4vZGlzcGxheS1jb21wb25lbnRzL2hlYWRlci1kb20nO1xuXG5jb25zdCBzaWRlbmF2ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBpbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBoZWFkZXJEb20uY3JlYXRlSGVhZGVyKCk7XG4gICAgICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtYWluJyk7XG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoc2lkZW5hdkRvbS5jcmVhdGVTaWRlTmF2KCkpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1haW4pO1xuICAgICAgICBwcm9qZWN0TGlzdE1vZHVsZS5jcmVhdGVEZWZhdWx0UHJvamVjdCgpO1xuICAgICAgICB1cGRhdGVQcm9qZWN0TGlzdCgpO1xuICAgICAgICBvbkNsaWNrTmV3UHJvamVjdCgpO1xuICAgICAgICBoZWFkZXJEb20udXBkYXRlU2VsZWN0ZWRQcm9qZWN0SGVhZGluZygnRGVmYXVsdCcpO1xuICAgIH07XG5cbiAgICBjb25zdCB1cGRhdGVQcm9qZWN0TGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1saXN0Jyk7XG4gICAgICAgIHByb2plY3RMaXN0LmlubmVySFRNTCA9ICcnO1xuICAgICAgICBwcm9qZWN0cy5nZXRQcm9qZWN0cygpLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3REaXYgPSBzaWRlbmF2RG9tLmNyZWF0ZVByb2plY3REaXYocHJvamVjdC5wcm9qZWN0TmFtZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0RGl2KTtcbiAgICAgICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKHByb2plY3REaXYpO1xuICAgICAgICAgICAgb25DbGlja0RlbGV0ZVByb2plY3QoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBjb25zdCBvbkNsaWNrRGVsZXRlUHJvamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgZGVsZXRlUHJvamVjdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjZGVsZXRlLXByb2plY3QtYnV0dG9uJyk7XG4gICAgICAgIGRlbGV0ZVByb2plY3RCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvamVjdExpc3RNb2R1bGUuZGVsZXRlUHJvamVjdEZyb21MaXN0KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uQ2xpY2tOZXdQcm9qZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBvcGVuUHJvamVjdEZvcm1CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3Blbi1wcm9qZWN0LWZvcm0nKTtcbiAgICAgICAgb3BlblByb2plY3RGb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvamVjdExpc3RNb2R1bGUub3BlblByb2plY3RGb3JtKTtcbiAgICB9O1xuICAgIGNvbnN0IG9uQ2xpY2tQcm9qZWN0TGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcHJvamVjdCcpO1xuICAgICAgICBwcm9qZWN0TGlzdC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICAgICAgICBwcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGhlYWRlckRvbS51cGRhdGVTZWxlY3RlZFByb2plY3RIZWFkaW5nKHByb2plY3QuZGF0YXNldC5wcm9qZWN0bmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiB7IGluaXRpYWxpemUsIHVwZGF0ZVByb2plY3RMaXN0LCBvbkNsaWNrUHJvamVjdExpc3QgfTtcbn0pKCk7XG5cbmNvbnN0IHByb2plY3RMaXN0TW9kdWxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBvcGVuUHJvamVjdEZvcm0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9wZW5Qb3BVcEZvcm0oKTtcbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWZvcm0nKTtcbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhZGROZXdQcm9qZWN0LCBmYWxzZSk7XG4gICAgfTtcbiAgICBjb25zdCBhZGROZXdQcm9qZWN0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZScpLnZhbHVlO1xuICAgICAgICBwcm9qZWN0cy5jcmVhdGVQcm9qZWN0KHByb2plY3ROYW1lKTtcbiAgICAgICAgc2lkZW5hdi51cGRhdGVQcm9qZWN0TGlzdCgpO1xuICAgICAgICBjbG9zZVBvcFVwRm9ybSgpO1xuICAgICAgICBzaWRlbmF2Lm9uQ2xpY2tQcm9qZWN0TGlzdCgpO1xuICAgIH07XG5cbiAgICBjb25zdCBkZWxldGVQcm9qZWN0RnJvbUxpc3QgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBldmVudC50YXJnZXQuZGF0YXNldC5wcm9qZWN0bmFtZTtcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdE5hbWUpO1xuICAgICAgICBwcm9qZWN0cy5kZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKTtcbiAgICAgICAgc2lkZW5hdi51cGRhdGVQcm9qZWN0TGlzdCgpO1xuICAgIH07XG5cbiAgICBjb25zdCBjcmVhdGVEZWZhdWx0UHJvamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcHJvamVjdHMuY3JlYXRlUHJvamVjdCgnRGVmYXVsdCcpO1xuICAgIH07XG5cbiAgICBjb25zdCBvcGVuUG9wVXBGb3JtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1wb3B1cCcpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH07XG4gICAgY29uc3QgY2xvc2VQb3BVcEZvcm0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXBvcHVwJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9O1xuICAgIHJldHVybiB7IG9wZW5Qcm9qZWN0Rm9ybSwgZGVsZXRlUHJvamVjdEZyb21MaXN0LCBjcmVhdGVEZWZhdWx0UHJvamVjdCB9O1xufSkoKTtcblxuY29uc3QgbG9hZFNpZGVOYXYgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2lkZW5hdi5pbml0aWFsaXplKCk7XG59O1xuXG5leHBvcnQgeyBsb2FkU2lkZU5hdiB9O1xuIiwiY29uc3QgcHJvamVjdHMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGxldCBwcm9qZWN0cyA9IFtdO1xuICAgIFxuXG4gICAgZnVuY3Rpb24gcHJvamVjdEZhY3RvcnkobmFtZSkge1xuICAgICAgICByZXR1cm4geyBwcm9qZWN0TmFtZTogbmFtZSwgdG9kb0xpc3Q6IFtdIH07XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlUHJvamVjdCA9IGZ1bmN0aW9uIChwcm9qZWN0TmFtZSkge1xuICAgICAgICBjb25zdCBuZXdQcm9qZWN0ID0gcHJvamVjdEZhY3RvcnkocHJvamVjdE5hbWUpO1xuICAgICAgICBwcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuICAgIH07XG5cbiAgICBjb25zdCBkZWxldGVQcm9qZWN0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgY29uc3QgaW5kZXhPZlByb2plY3QgPSBwcm9qZWN0cy5maW5kSW5kZXgoKHByb2plY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0LnByb2plY3ROYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2plY3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBwcm9qZWN0cy5zcGxpY2UoaW5kZXhPZlByb2plY3QsIDEpO1xuICAgIH07XG5cbiAgICBjb25zdCBnZXRQcm9qZWN0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHByb2plY3RzO1xuICAgIH07XG5cbiAgICByZXR1cm4geyBjcmVhdGVQcm9qZWN0LCBkZWxldGVQcm9qZWN0LCBnZXRQcm9qZWN0cyB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgcHJvamVjdHM7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGxvYWRTaWRlTmF2IH0gZnJvbSAnLi9tb2R1bGVzL2Rpc3BsYXktY29udHJvbGxlcic7XG5cbmxvYWRTaWRlTmF2KCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=