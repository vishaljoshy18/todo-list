import { createProject, getProjects, deleteProject } from './project';
import { createSideNav, createProjectDiv } from './sidenav/sidenav-dom';

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
            const projectDiv = createProjectDiv(project.projectName);
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
        deleteProject(projectName);
        sidenav.updateProjectList();
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
    return { openProjectForm, deleteProjectFromList };
})();

const loadSideNav = function () {
    sidenav.initialize();
};

export { loadSideNav };
