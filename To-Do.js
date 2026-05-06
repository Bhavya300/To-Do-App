document.addEventListener("DOMContentLoaded", () => {
  const todoinput = document.getElementById("todo-input");
  const addtaskbtn = document.getElementById("add-task-btn");
  const todolist = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    rendertask(task);
  });
  addtaskbtn.addEventListener("click", () => {
    let tasktext = todoinput.value.trim();
    if (tasktext === "") return;
    const newtask = {
      id: Date.now(),
      text: tasktext,
      completed: false,
    };
    tasks.push(newtask);
    savetasks();
    rendertask(newtask);
    todoinput.value = "";
    console.log(tasks);
  });

  function savetasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  function rendertask(task) {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");
    li.setAttribute("data-id", task.id);
    li.innerHTML = `<span>${task.text}</span>  <button>delete</button>`;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      savetasks();
    });
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      savetasks();
    });
    todolist.appendChild(li);
  }
});
