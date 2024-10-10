document.getElementById("todoForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const todoInput = document.getElementById("todoInput");
    const todoText = todoInput.value.trim();

    const errorDiv = document.getElementById("error");

    // показать ошибку если инпут пуст
    if (!todoText) {
        errorDiv.style.display = "block";
        return;
    } else {
        errorDiv.style.display = "none";
    }

    const todoList = document.getElementById("todoList");
    const newTodo = document.createElement("li");

    newTodo.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("form-check-input", "me-2");
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            newTodo.classList.add("completed-task"); // отметить задачу выполненной
            checkIfAnyCompleted();
        } else {
            newTodo.classList.remove("completed-task"); // сделать задачу не выполненной
        }
    });

    const taskText = document.createElement("span");
    taskText.textContent = todoText;

    const removeButton = document.createElement("button");
    removeButton.classList.add("btn", "btn-danger", "btn-sm");
    removeButton.textContent = "Delete";

    removeButton.onclick = function () {
        todoList.removeChild(newTodo);
        checkIfAnyCompleted();
    };

    newTodo.prepend(checkbox); // Добавление элемента в начало
    newTodo.appendChild(taskText); // добавляет узел в конец списка дочерних элементов
    newTodo.appendChild(removeButton);

    todoList.appendChild(newTodo);

    todoInput.value = "";
});

// функция отображения/скрытия кнопки удалить выполненные задачи
function checkIfAnyCompleted() {
    const completedTasks = document.querySelectorAll(".list-group-item.completed-task");
    const deleteCompletedButton = document.getElementById("deleteCompleted");

    if (completedTasks.length > 0) {
        deleteCompletedButton.style.display = "block";
    } else {
        deleteCompletedButton.style.display = "none";
    }
}

document.getElementById("deleteCompleted").addEventListener("click", function () {
    const todoList = document.getElementById("todoList");
    const completedTasks = document.querySelectorAll(".list-group-item.completed-task");

    completedTasks.forEach((task) => {
        todoList.removeChild(task);
    });

    checkIfAnyCompleted();
});
