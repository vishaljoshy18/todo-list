import projects from './projects';
import sidenavDom from './display-components/sidenav-dom';
import headerDom from './display-components/header-dom';

const sidenav = (function () {
    const initialize = function () {
        headerDom.createHeader();
        const main = document.createElement('main');
        main.appendChild(sidenavDom.createSideNav());
        document.body.appendChild(main);
        projectListModule.createDefaultProject();
        updateProjectList();
        onClickNewProject();
        headerDom.updateSelectedProjectHeading('Default');
    };

    const updateProjectList = function () {
        const projectList = document.querySelector('#project-list');
        projectList.innerHTML = '';
        projects.getProjects().forEach((project) => {
            const projectDiv = sidenavDom.createProjectDiv(project.projectName);
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
                headerDom.updateSelectedProjectHeading(project.dataset.projectname);
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
        projects.createProject(projectName);
        sidenav.updateProjectList();
        closePopUpForm();
        sidenav.onClickProjectList();
    };

    const deleteProjectFromList = function (event) {
        const projectName = event.target.dataset.projectname;
        console.log(projectName);
        projects.deleteProject(projectName);
        sidenav.updateProjectList();
    };

    const createDefaultProject = function () {
        projects.createProject('Default');
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

export { loadSideNav };
