document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const input = document.getElementById("new-task");
    const list = document.getElementById("task-list");
    const taskCount = document.getElementById("task-count");
  
    let tasks = [];
  
    function updateCount() {
      const unfinished = tasks.filter(t => !t.completed).length;
      taskCount.textContent = unfinished;
    }
  
    function renderTasks() {
      list.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");
  
        const left = document.createElement("div");
        left.classList.add("task-left");
  
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
          task.completed = !task.completed;
          renderTasks();
        });
  
        const text = document.createElement("span");
        text.textContent = task.text;
  
        left.appendChild(checkbox);
        left.appendChild(text);
  
        const delBtn = document.createElement("button");
        delBtn.classList.add("task-delete");
        delBtn.textContent = "×";
        delBtn.addEventListener("click", () => {
          tasks.splice(index, 1);
          renderTasks();
        });
  
        li.appendChild(left);
        li.appendChild(delBtn);
        list.appendChild(li);
      });
  
      updateCount();
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const taskText = input.value.trim();
      if (taskText !== "") {
        tasks.push({ text: taskText, completed: false });
        input.value = "";
        renderTasks();
      }
    });
  
    renderTasks();
  });
  