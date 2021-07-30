const headerDom = (function () {
    const createHeader = function () {
        const header = document.createElement('header');
        header.appendChild(createToDoIcon());
        header.appendChild(createSelectedProjectHeading());
        document.body.appendChild(header);

        createSelectedProjectHeading();
    };
    const createToDoIcon = function () {
        const icon = document.createElement('div');
        icon.setAttribute('id', 'icon');
        const button = document.createElement('button');
        button.textContent = '+';
        const heading = document.createElement('h2');
        heading.textContent = 'TO-DO LIST ';
        icon.appendChild(button);
        icon.appendChild(heading);
        return icon;
    };
    const createSelectedProjectHeading = function () {
        const div = document.createElement('div');
        const projectHeading = document.createElement('h3');
        projectHeading.setAttribute('id', 'project-header');
        div.appendChild(projectHeading);
        return div;
    };
    const updateSelectedProjectHeading = function (projectName) {
        const projectHeading = document.querySelector('#project-header');
        projectHeading.textContent = projectName;
    };

    return { createHeader, updateSelectedProjectHeading };
})();

export default headerDom;
