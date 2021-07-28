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


const sidenav = (function () {
    const createNav = function () {
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

        updateProjectList();
    };
    const createProjectForm = function () {
        const popupForm = document.createElement('div');
        popupForm.setAttribute('class', 'form-popup');

        const form = document.createElement('form');
        form.setAttribute('id', 'project-form');

        const formHeader = document.createElement('h2');
        formHeader.textContent = 'Add Project';
        const label = document.createElement('label');
        label.textContent = 'Project Name';
        label.setAttribute('for', 'project-name');
        const input = document.createElement('input');
        input.setAttribute('name', 'project-name');
        input.setAttribute('id', 'project-name');
        input.setAttribute('placeholder', 'Enter project name');
        input.setAttribute('type', 'text');
        input.setAttribute('required', true);

        const addButton = document.createElement('button');
        addButton.setAttribute('type', 'submit');
        addButton.setAttribute('id', 'add-project-button');
        addButton.textContent = 'Add Project';
        const cancelButton = document.createElement('button');
        cancelButton.setAttribute('type', 'submit');
        cancelButton.setAttribute('id', 'cancel-button');
        cancelButton.textContent = 'Cancel';

        form.appendChild(formHeader);
        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(addButton);
        form.appendChild(cancelButton);

        popupForm.appendChild(form);

        return popupForm;
    };

    const updateProjectList = function () {
        const projectList = document.querySelector('#project-list');
        projectList.innerHTML = '';
        (0,_project__WEBPACK_IMPORTED_MODULE_0__.getProjects)().forEach((project) => {
            const div = document.createElement('div');
            div.textContent = project.projectName;
            projectList.appendChild(div);
        });
    };

    return { createNav, updateProjectList };
})();

const eventHandler = (function () {
    const addProjectEventListener = function () {
        const openProjectFormButton = document.querySelector('#open-project-form');
        openProjectFormButton.addEventListener('click', openProjectForm);
    };

    const openProjectForm = function () {
        document.querySelector('.form-popup').style.display = 'block';
        const form = document.querySelector('#project-form');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('form works');
        });
    };

    const addProject = function (projectName) {
        (0,_project__WEBPACK_IMPORTED_MODULE_0__.createProject)(projectName);
        sidenav.updateProjectList();
    };

    return { addProjectEventListener };
})();

const loadSideNav = function () {
    sidenav.createNav();
    eventHandler.addProjectEventListener();
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
    console.log(projects);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7a0JBQXVEOztBQUV2RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEscURBQVc7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBLGFBQWE7QUFDYixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBLFFBQVEsdURBQWE7QUFDckI7QUFDQTs7QUFFQSxhQUFhO0FBQ2IsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7a0JBRXVCOzs7Ozs7Ozs7Ozs7Ozs7O0FDM0d2Qjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7a0JBRXNDOzs7Ozs7O1VDaEJ0QztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7Ozs7Ozs7OztrQkNOMkQ7O0FBRTNELHdFQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZGlzcGxheS1jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVByb2plY3QsIGdldFByb2plY3RzIH0gZnJvbSAnLi9wcm9qZWN0JztcblxuY29uc3Qgc2lkZW5hdiA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgY3JlYXRlTmF2ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBzaWRlbmF2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNpZGVuYXYuc2V0QXR0cmlidXRlKCdjbGFzcycsICdzaWRlLW5hdicpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgIHByb2plY3RMaXN0SGVhZGluZy50ZXh0Q29udGVudCA9ICdQcm9qZWN0cyc7XG4gICAgICAgIHNpZGVuYXYuYXBwZW5kQ2hpbGQocHJvamVjdExpc3RIZWFkaW5nKTtcblxuICAgICAgICBjb25zdCBvcGVuUHJvamVjdEZvcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgb3BlblByb2plY3RGb3JtQnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCBQcm9qZWN0JztcbiAgICAgICAgb3BlblByb2plY3RGb3JtQnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnb3Blbi1wcm9qZWN0LWZvcm0nKTtcbiAgICAgICAgc2lkZW5hdi5hcHBlbmRDaGlsZChvcGVuUHJvamVjdEZvcm1CdXR0b24pO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHByb2plY3RMaXN0LnNldEF0dHJpYnV0ZSgnaWQnLCAncHJvamVjdC1saXN0Jyk7XG4gICAgICAgIHNpZGVuYXYuYXBwZW5kQ2hpbGQocHJvamVjdExpc3QpO1xuXG4gICAgICAgIHNpZGVuYXYuYXBwZW5kQ2hpbGQoY3JlYXRlUHJvamVjdEZvcm0oKSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzaWRlbmF2KTtcblxuICAgICAgICB1cGRhdGVQcm9qZWN0TGlzdCgpO1xuICAgIH07XG4gICAgY29uc3QgY3JlYXRlUHJvamVjdEZvcm0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHBvcHVwRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwb3B1cEZvcm0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdmb3JtLXBvcHVwJyk7XG5cbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Byb2plY3QtZm9ybScpO1xuXG4gICAgICAgIGNvbnN0IGZvcm1IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICBmb3JtSGVhZGVyLnRleHRDb250ZW50ID0gJ0FkZCBQcm9qZWN0JztcbiAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICBsYWJlbC50ZXh0Q29udGVudCA9ICdQcm9qZWN0IE5hbWUnO1xuICAgICAgICBsYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsICdwcm9qZWN0LW5hbWUnKTtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAncHJvamVjdC1uYW1lJyk7XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnaWQnLCAncHJvamVjdC1uYW1lJyk7XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCAnRW50ZXIgcHJvamVjdCBuYW1lJyk7XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgncmVxdWlyZWQnLCB0cnVlKTtcblxuICAgICAgICBjb25zdCBhZGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYWRkQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdzdWJtaXQnKTtcbiAgICAgICAgYWRkQnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnYWRkLXByb2plY3QtYnV0dG9uJyk7XG4gICAgICAgIGFkZEJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQgUHJvamVjdCc7XG4gICAgICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjYW5jZWxCdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ3N1Ym1pdCcpO1xuICAgICAgICBjYW5jZWxCdXR0b24uc2V0QXR0cmlidXRlKCdpZCcsICdjYW5jZWwtYnV0dG9uJyk7XG4gICAgICAgIGNhbmNlbEJ1dHRvbi50ZXh0Q29udGVudCA9ICdDYW5jZWwnO1xuXG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybUhlYWRlcik7XG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChhZGRCdXR0b24pO1xuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGNhbmNlbEJ1dHRvbik7XG5cbiAgICAgICAgcG9wdXBGb3JtLmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgICAgIHJldHVybiBwb3B1cEZvcm07XG4gICAgfTtcblxuICAgIGNvbnN0IHVwZGF0ZVByb2plY3RMaXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWxpc3QnKTtcbiAgICAgICAgcHJvamVjdExpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGdldFByb2plY3RzKCkuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXYudGV4dENvbnRlbnQgPSBwcm9qZWN0LnByb2plY3ROYW1lO1xuICAgICAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiB7IGNyZWF0ZU5hdiwgdXBkYXRlUHJvamVjdExpc3QgfTtcbn0pKCk7XG5cbmNvbnN0IGV2ZW50SGFuZGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYWRkUHJvamVjdEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IG9wZW5Qcm9qZWN0Rm9ybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvcGVuLXByb2plY3QtZm9ybScpO1xuICAgICAgICBvcGVuUHJvamVjdEZvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuUHJvamVjdEZvcm0pO1xuICAgIH07XG5cbiAgICBjb25zdCBvcGVuUHJvamVjdEZvcm0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXBvcHVwJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1mb3JtJyk7XG5cbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Zvcm0gd29ya3MnKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGFkZFByb2plY3QgPSBmdW5jdGlvbiAocHJvamVjdE5hbWUpIHtcbiAgICAgICAgY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZSk7XG4gICAgICAgIHNpZGVuYXYudXBkYXRlUHJvamVjdExpc3QoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHsgYWRkUHJvamVjdEV2ZW50TGlzdGVuZXIgfTtcbn0pKCk7XG5cbmNvbnN0IGxvYWRTaWRlTmF2ID0gZnVuY3Rpb24gKCkge1xuICAgIHNpZGVuYXYuY3JlYXRlTmF2KCk7XG4gICAgZXZlbnRIYW5kbGVyLmFkZFByb2plY3RFdmVudExpc3RlbmVyKCk7XG59O1xuXG5leHBvcnQgeyBsb2FkU2lkZU5hdiB9O1xuIiwibGV0IHByb2plY3RzID0gW107XG5cbmZ1bmN0aW9uIHByb2plY3RGYWN0b3J5KG5hbWUpIHtcbiAgICByZXR1cm4geyBwcm9qZWN0TmFtZTogbmFtZSwgdG9kb0xpc3Q6IFtdIH07XG59XG5cbmNvbnN0IGNyZWF0ZVByb2plY3QgPSBmdW5jdGlvbiAocHJvamVjdE5hbWUpIHtcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gcHJvamVjdEZhY3RvcnkocHJvamVjdE5hbWUpO1xuICAgIHByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG4gICAgY29uc29sZS5sb2cocHJvamVjdHMpO1xufTtcblxuY29uc3QgZ2V0UHJvamVjdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHByb2plY3RzO1xufTtcblxuZXhwb3J0IHsgY3JlYXRlUHJvamVjdCwgZ2V0UHJvamVjdHMgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgbG9hZFNpZGVOYXYgfSBmcm9tICcuL21vZHVsZXMvZGlzcGxheS1jb250cm9sbGVyJztcblxubG9hZFNpZGVOYXYoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==