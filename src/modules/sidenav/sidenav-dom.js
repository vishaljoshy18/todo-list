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

export { createSideNav };
