function createProject(name) {
    return { projectName: name, todoList: [] };
}

function createTodo(name, date, note) {
    return { todoTitle: name, todoDate: date, todoNote: note };
}

let projects = [];
const project1 = createProject('Default');
const project2 = createProject('Project1');
const todo1 = createTodo('do something', 12, 'hi im back');
const todo2 = createTodo('do something', 12, 'hi im back');

project1.todoList.push(todo1);

project1.todoList.push(todo2);
console.log(project1);
projects.push(project1);
projects.push(project2);

export { projects };
