import { createProject, getProjects } from './project';

const sidenav = (function () {
    const createNav = function () {
        const sidenav = document.createElement('div');
        sidenav.setAttribute('class', 'side-nav');

        const projectListHeading = document.createElement('h3');
        projectListHeading.textContent = 'Projects';
        sidenav.appendChild(projectListHeading);

        const addProjectButton = document.createElement('button');
        addProjectButton.textContent = 'Add Project';
        addProjectButton.setAttribute('id', 'add-project-button');
        sidenav.appendChild(addProjectButton);

        const projectList = document.createElement('div');
        projectList.setAttribute('id', 'project-list');
        sidenav.appendChild(projectList);

        document.body.appendChild(sidenav);

        updateProjectList();
    };

    const updateProjectList = function () {
        const projectList = document.querySelector('#project-list');
        projectList.innerHTML = '';
        getProjects().forEach((project) => {
            const div = document.createElement('div');
            div.textContent = project.projectName;
            projectList.appendChild(div);
        });
    };

    return { createNav, updateProjectList };
})();

const eventHandler = (function () {
    const addProjectEventListner = function () {
        const addProjectButton = document.querySelector('#add-project-button');
        addProjectButton.addEventListener('click', openProjectForm);
    };

    const openProjectForm = function () {
        addProject('default');
    };

    const addProject = function (projectName) {
        createProject(projectName);
        sidenav.updateProjectList();
    };

    return { addProjectEventListner };
})();

const loadSideNav = function () {
    sidenav.createNav();
    eventHandler.addProjectEventListner();
};

export { loadSideNav };
