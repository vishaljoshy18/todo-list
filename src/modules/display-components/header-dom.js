const headerDom = (function () {
    const createHeader = function () {
        const header = document.createElement('header');
        header.appendChild(createToDoIcon());
        header.appendChild(updateSelectedProject());
        document.body.appendChild(header);
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
    const updateSelectedProject = function () {
        const div = document.createElement('div');
        const projectHeding = document.createElement('h3');
        projectHeding.setAttribute('id', 'project-header');
        projectHeding.textContent = 'Default';
        div.appendChild(projectHeding);
        return div;
    };

    return { createHeader, updateSelectedProject };
})();

export default headerDom;
