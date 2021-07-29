/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/display-components/sidenav-dom.js":
/*!*******************************************************!*\
  !*** ./src/modules/display-components/sidenav-dom.js ***!
  \*******************************************************/
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

    if (projectName != 'Default') {
        const button = document.createElement('button');
        button.textContent = 'x';
        button.setAttribute('data-projectname', projectName);
        button.setAttribute('id', 'delete-project-button');
        div.appendChild(button);
    }
    
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
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/modules/project.js");
/* harmony import */ var _display_components_sidenav_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display-components/sidenav-dom */ "./src/modules/display-components/sidenav-dom.js");



const sidenav = (function () {
    const initialize = function () {
        (0,_display_components_sidenav_dom__WEBPACK_IMPORTED_MODULE_1__.createSideNav)();
        projectListModule.createDefaultProject();
        updateProjectList();
        addProjectEventListener();
    };

    const updateProjectList = function () {
        const projectList = document.querySelector('#project-list');
        projectList.innerHTML = '';
        (0,_project__WEBPACK_IMPORTED_MODULE_0__.getProjects)().forEach((project) => {
            const projectDiv = (0,_display_components_sidenav_dom__WEBPACK_IMPORTED_MODULE_1__.createProjectDiv)(project.projectName);
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
    const createDefaultProject = function () {
        (0,_project__WEBPACK_IMPORTED_MODULE_0__.createProject)('Default');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7a0JBRTJDOzs7Ozs7Ozs7Ozs7Ozs7OztrQkMvRTJCO2tCQUNhOztBQUVuRjtBQUNBO0FBQ0EsUUFBUSw4RUFBYTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFEQUFXO0FBQ25CLCtCQUErQixpRkFBZ0I7QUFDL0M7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVEQUFhO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1REFBYTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdURBQWE7QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztrQkFFdUI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekV2Qjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztrQkFFcUQ7Ozs7Ozs7VUN4QnJEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7O2tCQ04yRDs7QUFFM0Qsd0VBQVciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9kaXNwbGF5LWNvbXBvbmVudHMvc2lkZW5hdi1kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZGlzcGxheS1jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNyZWF0ZVNpZGVOYXYgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3Qgc2lkZW5hdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNpZGVuYXYuc2V0QXR0cmlidXRlKCdjbGFzcycsICdzaWRlLW5hdicpO1xuXG4gICAgY29uc3QgcHJvamVjdExpc3RIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBwcm9qZWN0TGlzdEhlYWRpbmcudGV4dENvbnRlbnQgPSAnUHJvamVjdHMnO1xuICAgIHNpZGVuYXYuYXBwZW5kQ2hpbGQocHJvamVjdExpc3RIZWFkaW5nKTtcblxuICAgIGNvbnN0IG9wZW5Qcm9qZWN0Rm9ybUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIG9wZW5Qcm9qZWN0Rm9ybUJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQgUHJvamVjdCc7XG4gICAgb3BlblByb2plY3RGb3JtQnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnb3Blbi1wcm9qZWN0LWZvcm0nKTtcbiAgICBzaWRlbmF2LmFwcGVuZENoaWxkKG9wZW5Qcm9qZWN0Rm9ybUJ1dHRvbik7XG5cbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByb2plY3RMaXN0LnNldEF0dHJpYnV0ZSgnaWQnLCAncHJvamVjdC1saXN0Jyk7XG4gICAgc2lkZW5hdi5hcHBlbmRDaGlsZChwcm9qZWN0TGlzdCk7XG5cbiAgICBzaWRlbmF2LmFwcGVuZENoaWxkKGNyZWF0ZVByb2plY3RGb3JtKCkpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzaWRlbmF2KTtcbn07XG5cbmNvbnN0IGNyZWF0ZVByb2plY3REaXYgPSBmdW5jdGlvbiAocHJvamVjdE5hbWUpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYudGV4dENvbnRlbnQgPSBwcm9qZWN0TmFtZTtcbiAgICBkaXYuc2V0QXR0cmlidXRlKCdpZCcsICdwcm9qZWN0Jyk7XG5cbiAgICBpZiAocHJvamVjdE5hbWUgIT0gJ0RlZmF1bHQnKSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSAneCc7XG4gICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdG5hbWUnLCBwcm9qZWN0TmFtZSk7XG4gICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2RlbGV0ZS1wcm9qZWN0LWJ1dHRvbicpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRpdjtcbn07XG5cbmNvbnN0IGNyZWF0ZVByb2plY3RGb3JtID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHBvcHVwRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBvcHVwRm9ybS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Zvcm0tcG9wdXAnKTtcblxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Byb2plY3QtZm9ybScpO1xuXG4gICAgY29uc3QgZm9ybVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBmb3JtVGl0bGUudGV4dENvbnRlbnQgPSAnQWRkIFByb2plY3QnO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybVRpdGxlKTtcblxuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBsYWJlbC50ZXh0Q29udGVudCA9ICdQcm9qZWN0IE5hbWUnO1xuICAgIGxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgJ3Byb2plY3QtbmFtZScpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQobGFiZWwpO1xuXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsICdwcm9qZWN0LW5hbWUnKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Byb2plY3QtbmFtZScpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCAnRW50ZXIgcHJvamVjdCBuYW1lJyk7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XG5cbiAgICBjb25zdCBhZGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBhZGRCdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ3N1Ym1pdCcpO1xuICAgIGFkZEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2FkZC1wcm9qZWN0LWJ1dHRvbicpO1xuICAgIGFkZEJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQgUHJvamVjdCc7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChhZGRCdXR0b24pO1xuXG4gICAgY29uc3QgY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY2FuY2VsQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdzdWJtaXQnKTtcbiAgICBjYW5jZWxCdXR0b24uc2V0QXR0cmlidXRlKCdpZCcsICdjYW5jZWwtYnV0dG9uJyk7XG4gICAgY2FuY2VsQnV0dG9uLnRleHRDb250ZW50ID0gJ0NhbmNlbCc7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChjYW5jZWxCdXR0b24pO1xuXG4gICAgcG9wdXBGb3JtLmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgcmV0dXJuIHBvcHVwRm9ybTtcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZVNpZGVOYXYsIGNyZWF0ZVByb2plY3REaXYgfTtcbiIsImltcG9ydCB7IGNyZWF0ZVByb2plY3QsIGdldFByb2plY3RzLCBkZWxldGVQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0JztcbmltcG9ydCB7IGNyZWF0ZVNpZGVOYXYsIGNyZWF0ZVByb2plY3REaXYgfSBmcm9tICcuL2Rpc3BsYXktY29tcG9uZW50cy9zaWRlbmF2LWRvbSc7XG5cbmNvbnN0IHNpZGVuYXYgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNyZWF0ZVNpZGVOYXYoKTtcbiAgICAgICAgcHJvamVjdExpc3RNb2R1bGUuY3JlYXRlRGVmYXVsdFByb2plY3QoKTtcbiAgICAgICAgdXBkYXRlUHJvamVjdExpc3QoKTtcbiAgICAgICAgYWRkUHJvamVjdEV2ZW50TGlzdGVuZXIoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgdXBkYXRlUHJvamVjdExpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbGlzdCcpO1xuICAgICAgICBwcm9qZWN0TGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgZ2V0UHJvamVjdHMoKS5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0RGl2ID0gY3JlYXRlUHJvamVjdERpdihwcm9qZWN0LnByb2plY3ROYW1lKTtcbiAgICAgICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKHByb2plY3REaXYpO1xuICAgICAgICAgICAgYWRkRGVsZXRlUHJvamVjdEV2ZW50TGlzdGVuZXIoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBjb25zdCBhZGREZWxldGVQcm9qZWN0RXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgZGVsZXRlUHJvamVjdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjZGVsZXRlLXByb2plY3QtYnV0dG9uJyk7XG4gICAgICAgIGRlbGV0ZVByb2plY3RCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvamVjdExpc3RNb2R1bGUuZGVsZXRlUHJvamVjdEZyb21MaXN0KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGFkZFByb2plY3RFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBvcGVuUHJvamVjdEZvcm1CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3Blbi1wcm9qZWN0LWZvcm0nKTtcbiAgICAgICAgb3BlblByb2plY3RGb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvamVjdExpc3RNb2R1bGUub3BlblByb2plY3RGb3JtKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHsgaW5pdGlhbGl6ZSwgdXBkYXRlUHJvamVjdExpc3QgfTtcbn0pKCk7XG5cbmNvbnN0IHByb2plY3RMaXN0TW9kdWxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBvcGVuUHJvamVjdEZvcm0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9wZW5Qb3BVcEZvcm0oKTtcbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWZvcm0nKTtcbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhZGROZXdQcm9qZWN0LCBmYWxzZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRlbGV0ZVByb2plY3RGcm9tTGlzdCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LnByb2plY3RuYW1lO1xuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0TmFtZSk7XG4gICAgICAgIGRlbGV0ZVByb2plY3QocHJvamVjdE5hbWUpO1xuICAgICAgICBzaWRlbmF2LnVwZGF0ZVByb2plY3RMaXN0KCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGFkZE5ld1Byb2plY3QgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lJykudmFsdWU7XG4gICAgICAgIGNyZWF0ZVByb2plY3QocHJvamVjdE5hbWUpO1xuICAgICAgICBzaWRlbmF2LnVwZGF0ZVByb2plY3RMaXN0KCk7XG4gICAgICAgIGNsb3NlUG9wVXBGb3JtKCk7XG4gICAgfTtcbiAgICBjb25zdCBjcmVhdGVEZWZhdWx0UHJvamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY3JlYXRlUHJvamVjdCgnRGVmYXVsdCcpO1xuICAgIH07XG5cbiAgICBjb25zdCBvcGVuUG9wVXBGb3JtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1wb3B1cCcpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH07XG4gICAgY29uc3QgY2xvc2VQb3BVcEZvcm0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXBvcHVwJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9O1xuICAgIHJldHVybiB7IG9wZW5Qcm9qZWN0Rm9ybSwgZGVsZXRlUHJvamVjdEZyb21MaXN0LCBjcmVhdGVEZWZhdWx0UHJvamVjdCB9O1xufSkoKTtcblxuY29uc3QgbG9hZFNpZGVOYXYgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2lkZW5hdi5pbml0aWFsaXplKCk7XG59O1xuXG5leHBvcnQgeyBsb2FkU2lkZU5hdiB9O1xuIiwibGV0IHByb2plY3RzID0gW107XG5cbmZ1bmN0aW9uIHByb2plY3RGYWN0b3J5KG5hbWUpIHtcbiAgICByZXR1cm4geyBwcm9qZWN0TmFtZTogbmFtZSwgdG9kb0xpc3Q6IFtdIH07XG59XG5cbmNvbnN0IGNyZWF0ZVByb2plY3QgPSBmdW5jdGlvbiAocHJvamVjdE5hbWUpIHtcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gcHJvamVjdEZhY3RvcnkocHJvamVjdE5hbWUpO1xuICAgIHByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG59O1xuXG5jb25zdCBkZWxldGVQcm9qZWN0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBjb25zdCBpbmRleE9mUHJvamVjdCA9IHByb2plY3RzLmZpbmRJbmRleCgocHJvamVjdCkgPT4ge1xuICAgICAgICBpZiAocHJvamVjdC5wcm9qZWN0TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb2plY3Q7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBwcm9qZWN0cy5zcGxpY2UoaW5kZXhPZlByb2plY3QsIDEpO1xufTtcblxuY29uc3QgZ2V0UHJvamVjdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHByb2plY3RzO1xufTtcblxuZXhwb3J0IHsgY3JlYXRlUHJvamVjdCwgZ2V0UHJvamVjdHMsIGRlbGV0ZVByb2plY3QgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgbG9hZFNpZGVOYXYgfSBmcm9tICcuL21vZHVsZXMvZGlzcGxheS1jb250cm9sbGVyJztcblxubG9hZFNpZGVOYXYoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==