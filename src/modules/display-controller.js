import project from './projects';

const sidebar = (function () {
    const initialize = function () {
        document
            .querySelector('#add-new-project')
            .addEventListener('click', projectDisplay.onClickAddNewProject, false);
        document
            .querySelector('#add-new-task')
            .addEventListener('click', todoDisplay.onClickAddNewTask, false);
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
        project.addProject(name);
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
        project.delProject(e.target.parentNode.dataset.name);
        deleteProjectFromDisplay(e);
    };
    const deleteProjectFromDisplay = function (e) {
        const projectDiv = e.target.parentNode;
        const projectDisplay = document.querySelector('#project-display');
        projectDisplay.removeChild(projectDiv);
    };

    const openPopUp = function () {
        const form = document.querySelector('.project-form-popup');
        form.style.display = 'block';
    };

    const closePopUp = function () {
        const form = document.querySelector('.project-form-popup');
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

    const onClickAddNewTask = function () {
        console.log('add task...');
        openPopUp();
        const form = document.querySelector('#add-task-form');
        form.addEventListener('submit',(event) => {
            event.preventDefault();
            const title = document.querySelector('#task-title').value;
            const description = document.querySelector('#task-description').value;
            addNewTask(title, description);
            form.reset();
            closePopUp();
        });
    };
    const addNewTask = function (title, description) {
        console.log(title, description);
    };

    const openPopUp = function () {
        const form = document.querySelector('.task-form-popup');
        form.style.display = 'block';
    };

    const closePopUp = function () {
        const form = document.querySelector('.task-form-popup');
        form.style.display = 'none';
    };
    return { updateSelectedProjectHeader, onClickAddNewTask };
})();

const loadUI = function () {
    sidebar.initialize();
};

export default loadUI;
