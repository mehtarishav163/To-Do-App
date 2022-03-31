const dialogBox = document.getElementById("dialog");
const addBtn = document.getElementById("addBtn");
const closeBtn = document.getElementById("close");
const todoContainer = document.getElementById("todo_container");
const error = document.querySelector(".error");
const title = document.getElementById("title");
const todo__text = document.getElementById("todo__text");
let editMode = -1;
let counter = 0;

let data = JSON.parse(localStorage.getItem("todos")) || [];

counter = data.length;

for (let i = 0; i < data.length; i++) {
    let todotext = `<div class="todo-list" todo-id='${i}'>
                        <div class="todo-header">
                            <span id='todo-header-text'>${data[i].title}</span>
                            <i class="fa fa-edit" style="font-size:24px;margin-right:20px"></i>
                            <button>X</button>
                        </div>
                        <div class="todo-text">${data[i].text}</div>
                    </div>`;
    todoContainer.innerHTML = todoContainer.innerHTML + todotext;
}


deletelisteners()

addBtn.addEventListener("click", function () {
    dialogBox.style.display = "flex";
});

closeBtn.addEventListener("click", function () {
    dialogBox.style.display = "none";
    error.classList.add("gayab");
    todo__text.value = "";
    title.value = "";
});

function addTodo() {
    if (todo__text.value !== "" && title.value !== "") {
        let todos = JSON.parse(localStorage.getItem("todos")) || [];

        if (editMode !== -1) {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id == editMode) {
                    todos[i].title = title.value;
                    todos[i].text = todo__text.value;
                }
            }
            localStorage.setItem("todos", JSON.stringify(todos));
            let todo = document.querySelector(`[todo-id='${editMode}']`);
            todo.querySelector("#todo-header-text").innerText = title.value;
            todo.querySelector(".todo-text").innerText = todo__text.value;
            editMode = -1;
            dialogBox.style.display = "none";
            return;
        }
        let todotext = `<div class="todo-list" todo-id='${counter}'>
                            <div class="todo-header">
                                <span id='todo-header-text'>${title.value}</span>
                                <i class="fa fa-edit" style="font-size:24px;margin-right:20px"></i>
                                <button>X</button>
                            </div>
                            <div class="todo-text">${todo__text.value}</div>
                        </div>`;
        todoContainer.innerHTML += todotext;
        deletelisteners();
        todos.push({
            id: counter,
            title: title.value,
            text: todo__text.value
        });
        counter += 1
        localStorage.setItem("todos", JSON.stringify(todos));
        todo__text.value = "";
        title.value = "";
        dialogBox.style.display = "none";
    } else {
        error.classList.remove("gayab");
    }
}



function deletelisteners() {
    const delarr = document.querySelectorAll(".todo-header button");
    const editarr = document.querySelectorAll(".todo-header i");
    console.log(editarr);
    for (let i = 0; i < delarr.length; i++) {
        delarr[i].addEventListener("click", function (e) {
            let todo = e.target.closest(".todo-list");
            console.log(todo)
            let id = todo.getAttribute("todo-id");
            console.log(id);
            let data = JSON.parse(localStorage.getItem("todos"));
            let newData = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].id != id) {
                    newData.push(data[i]);
                }
            }
            localStorage.setItem("todos", JSON.stringify(newData));
            todo.classList.add("gayab");
        });

        editarr[i].addEventListener("click", function (e) {
            dialogBox.style.display = "flex";
            let todo = e.target.closest(".todo-list");
            let id = todo.getAttribute("todo-id");
            editMode = id;
            console.log(todo)
            title.value = todo.querySelector("#todo-header-text").innerText;
            todo__text.value = todo.querySelector(".todo-text").innerText;
        });
    }
}