import { createProject, getProjects } from './project';

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
        getProjects().forEach((project) => {
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
        createProject(projectName);
        sidenav.updateProjectList();
    };

    return { addProjectEventListener };
})();

const loadSideNav = function () {
    sidenav.createNav();
    eventHandler.addProjectEventListener();
};

export { loadSideNav };
