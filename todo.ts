interface TodoItem {
  id: number;
  title: string;
}

let todos: TodoItem[] = [];
let nextId = 1;

function renderTodos(): void {
  const list = document.getElementById("todo-list")!;
  list.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");

    const input = document.createElement("input");
    input.type = "text";
    input.value = todo.title;
    input.disabled = true;
    input.id = `input-${todo.id}`;

    const editBtn = document.createElement("button");
    editBtn.innerText = "✏️";
    editBtn.onclick = () => enableEdit(todo.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "🗑️";
    deleteBtn.onclick = () => deleteTodo(todo.id);

    li.appendChild(input);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function addTodo(): void {
  const input = document.getElementById("todo-input") as HTMLInputElement;
  const title = input.value.trim();
  if (title === "") return;

  const newTodo: TodoItem = { id: nextId++, title };
  todos.push(newTodo);
  input.value = "";
  renderTodos();
}

function deleteTodo(id: number): void {
  todos = todos.filter((t) => t.id !== id);
  renderTodos();
}

function enableEdit(id: number): void {
  const input = document.getElementById(`input-${id}`) as HTMLInputElement;
  input.disabled = false;
  input.focus();

  input.onblur = () => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      todo.title = input.value.trim() || todo.title;
    }
    input.disabled = true;
    renderTodos();
  };
}

// 👇 Make functions available globally
(window as any).addTodo = addTodo;
