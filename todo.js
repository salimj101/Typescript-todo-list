var todos = [];
var nextId = 1;
function renderTodos() {
    var list = document.getElementById("todo-list");
    list.innerHTML = "";
    todos.forEach(function (todo) {
        var li = document.createElement("li");
        var input = document.createElement("input");
        input.type = "text";
        input.value = todo.title;
        input.disabled = true;
        input.id = "input-".concat(todo.id);
        var editBtn = document.createElement("button");
        editBtn.innerText = "✏️";
        editBtn.onclick = function () { return enableEdit(todo.id); };
        var deleteBtn = document.createElement("button");
        deleteBtn.innerText = "🗑️";
        deleteBtn.onclick = function () { return deleteTodo(todo.id); };
        li.appendChild(input);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}
function addTodo() {
    var input = document.getElementById("todo-input");
    var title = input.value.trim();
    if (title === "")
        return;
    var newTodo = { id: nextId++, title: title };
    todos.push(newTodo);
    input.value = "";
    renderTodos();
}
function deleteTodo(id) {
    todos = todos.filter(function (t) { return t.id !== id; });
    renderTodos();
}
function enableEdit(id) {
    var input = document.getElementById("input-".concat(id));
    input.disabled = false;
    input.focus();
    input.onblur = function () {
        var todo = todos.find(function (t) { return t.id === id; });
        if (todo) {
            todo.title = input.value.trim() || todo.title;
        }
        input.disabled = true;
        renderTodos();
    };
}
// 👇 Make functions available globally
window.addTodo = addTodo;
