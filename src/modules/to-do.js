const todoFactory = function (title, description, dueDate, priority) {
    return { title, description, dueDate, priority };
};

const todoList = (function () {
    const createTodo = (function (title, description, dueDate, priority) {
        const newTodo = todoFactory(title, description, dueDate, priority);
        console.log(newTodo);
    })();
    return { createTodo };
})();

export default todoList;
