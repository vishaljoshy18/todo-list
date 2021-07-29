import { createProject, getProjects } from './project';
import { createSideNav } from './sidenav/sidenav-dom';

const sidenav = (function () {
    const initialize = function () {
        createSideNav();
        updateProjectList();
        addProjectEventListener();
    };

    const updateProjectList = function () {
        const projectList = document.querySelector('#project-list');
        projectList.innerHTML = '';
        getProjects().forEach((project) => {
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
        createProject(projectName);
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

export { loadSideNav };
