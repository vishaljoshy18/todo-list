import { projects } from './project';

const createSideNav = function () {
    const sidenav = document.createElement('div');
    sidenav.setAttribute('class', 'side-nav');
    document.body.appendChild(sidenav);
    
    loadProjectList();
};

const loadProjectList = function () {
    const sidenav = document.querySelector('.side-nav');
    getProjectDivList().forEach((project) => {
        sidenav.appendChild(project);
    });
};

const getProjectDivList = function () {
    let divList = [];
    projects.forEach((project) => {
        const div = document.createElement('div');
        div.textContent = project.projectName;
        divList.push(div);
    });
    return divList;
};

const loadSideNav = function () {
    createSideNav();
};

export { loadSideNav };
