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


const sidebar = (function () {
    const initialize = function () {
        document
            .querySelector('#add-new-project')
            .addEventListener('click', projectDisplay.onClickAddNewProject, false);
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
        const projectDiv = document.createElement('div');
        projectDiv.textContent = name;
        projectDiv.setAttribute('id', 'project');
        projectDiv.setAttribute('data-name', name);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        projectDiv.appendChild(deleteButton);
        projectDisplay.appendChild(projectDiv);

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
        const form = document.querySelector('.form-popup');
        form.style.display = 'block';
    };

    const closePopUp = function () {
        const form = document.querySelector('.form-popup');
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
    return { updateSelectedProjectHeader };
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
    return { addProject, delProject };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (project);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7a0VBQWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEseURBQWtCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQSx3RUFBd0UsWUFBWTtBQUNwRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVEseURBQWtCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDekd0Qjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLENBQUM7O0FBRUQsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7O1VDekJ2QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7Ozs7Ozs7OztvR0NOa0Q7O0FBRWxELG9FQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZGlzcGxheS1jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvamVjdCBmcm9tICcuL3Byb2plY3RzJztcblxuY29uc3Qgc2lkZWJhciA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjYWRkLW5ldy1wcm9qZWN0JylcbiAgICAgICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2plY3REaXNwbGF5Lm9uQ2xpY2tBZGROZXdQcm9qZWN0LCBmYWxzZSk7XG4gICAgfTtcblxuICAgIHJldHVybiB7IGluaXRpYWxpemUgfTtcbn0pKCk7XG5cbmNvbnN0IHByb2plY3REaXNwbGF5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBvbkNsaWNrQWRkTmV3UHJvamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2FkZCBuZXcgcHJvamVjdCAnKTtcbiAgICAgICAgb3BlblBvcFVwKCk7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QtZm9ybScpO1xuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnc3VibWl0JyxcbiAgICAgICAgICAgIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYWRkTmV3UHJvamVjdChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lLWlucHV0JykudmFsdWUpO1xuICAgICAgICAgICAgICAgIGZvcm0ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICBjbG9zZVBvcFVwKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyBvbmNlOiB0cnVlIH1cbiAgICAgICAgKTtcbiAgICB9O1xuICAgIGNvbnN0IGFkZE5ld1Byb2plY3QgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnQWRkaW5nICcsIG5hbWUsICdUbyBkaXNwbGF5Jyk7XG4gICAgICAgIHByb2plY3QuYWRkUHJvamVjdChuYW1lKTtcbiAgICAgICAgYWRkUHJvamVjdFRvRGlzcGxheShuYW1lKTtcbiAgICB9O1xuICAgIGNvbnN0IGFkZFByb2plY3RUb0Rpc3BsYXkgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBjb25zdCBwcm9qZWN0RGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWRpc3BsYXknKTtcbiAgICAgICAgY29uc3QgcHJvamVjdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwcm9qZWN0RGl2LnRleHRDb250ZW50ID0gbmFtZTtcbiAgICAgICAgcHJvamVjdERpdi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Byb2plY3QnKTtcbiAgICAgICAgcHJvamVjdERpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbmFtZScsIG5hbWUpO1xuICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gJ3gnO1xuICAgICAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG4gICAgICAgIHByb2plY3REaXNwbGF5LmFwcGVuZENoaWxkKHByb2plY3REaXYpO1xuXG4gICAgICAgIHByb2plY3REaXYuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdjbGljaycsXG4gICAgICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldCAhPSBkZWxldGVCdXR0b24pIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0QWN0aXZlUHJvamVjdChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcblxuICAgICAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWxldGVTZWxlY3RlZFByb2plY3QsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2V0QWN0aXZlUHJvamVjdCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhY3RpdmUgcHJvamVjdCAuLi4nKTtcbiAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQpO1xuICAgICAgICBjb25zdCBwcm9qZWN0RGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWRpc3BsYXknKTtcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdERpc3BsYXkuY2hpbGROb2Rlcyk7XG4gICAgICAgIHByb2plY3REaXNwbGF5LmNoaWxkTm9kZXMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Byb2plY3QnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGUudGFyZ2V0LnNldEF0dHJpYnV0ZSgnaWQnLCAnYWN0aXZlLXByb2plY3QnKTtcbiAgICAgICAgdG9kb0Rpc3BsYXkudXBkYXRlU2VsZWN0ZWRQcm9qZWN0SGVhZGVyKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRlbGV0ZVNlbGVjdGVkUHJvamVjdCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5uYW1lKTtcbiAgICAgICAgcHJvamVjdC5kZWxQcm9qZWN0KGUudGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5uYW1lKTtcbiAgICAgICAgZGVsZXRlUHJvamVjdEZyb21EaXNwbGF5KGUpO1xuICAgIH07XG4gICAgY29uc3QgZGVsZXRlUHJvamVjdEZyb21EaXNwbGF5ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdERpdiA9IGUudGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgIGNvbnN0IHByb2plY3REaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZGlzcGxheScpO1xuICAgICAgICBwcm9qZWN0RGlzcGxheS5yZW1vdmVDaGlsZChwcm9qZWN0RGl2KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb3BlblBvcFVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tcG9wdXAnKTtcbiAgICAgICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9O1xuXG4gICAgY29uc3QgY2xvc2VQb3BVcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXBvcHVwJyk7XG4gICAgICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9O1xuICAgIHJldHVybiB7IG9uQ2xpY2tBZGROZXdQcm9qZWN0IH07XG59KSgpO1xuXG5jb25zdCB0b2RvRGlzcGxheSA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdXBkYXRlU2VsZWN0ZWRQcm9qZWN0SGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBhY3RpdmVQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FjdGl2ZS1wcm9qZWN0Jyk7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWxlY3RlZC1wcm9qZWN0LW5hbWUnKTtcbiAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gYWN0aXZlUHJvamVjdC5kYXRhc2V0Lm5hbWU7XG4gICAgfTtcbiAgICByZXR1cm4geyB1cGRhdGVTZWxlY3RlZFByb2plY3RIZWFkZXIgfTtcbn0pKCk7XG5cbmNvbnN0IGxvYWRVSSA9IGZ1bmN0aW9uICgpIHtcbiAgICBzaWRlYmFyLmluaXRpYWxpemUoKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvYWRVSTtcbiIsImxldCBwcm9qZWN0cyA9IFtdO1xuXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0KG5hbWUpIHtcbiAgICByZXR1cm4geyBuYW1lLCB0b2RvOiBbXSB9O1xufVxuXG5jb25zdCBwcm9qZWN0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBhZGRQcm9qZWN0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdCA9IGNyZWF0ZVByb2plY3QobmFtZSk7XG4gICAgICAgIHByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RzKTtcbiAgICB9O1xuICAgIGNvbnN0IGRlbFByb2plY3QgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHByb2plY3RzLmZpbmRJbmRleCgocHJvamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHByb2plY3QubmFtZSA9PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2plY3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBwcm9qZWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBjb25zb2xlLmxvZyhpbmRleCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RzKTtcbiAgICB9O1xuICAgIHJldHVybiB7IGFkZFByb2plY3QsIGRlbFByb2plY3QgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3Q7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBsb2FkVUkgZnJvbSAnLi9tb2R1bGVzL2Rpc3BsYXktY29udHJvbGxlcic7XG5cbmxvYWRVSSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9