let selectedTask = null;

function init() {
  document.getElementById("addTask").onclick = addTask;
  document.getElementById("editTask").onclick = editTask;
  document.getElementById("clearAll").onclick = clearAll;
  document.getElementById("searchInput").oninput = searchTasks;
  document.getElementById("editTask").disabled = true;
  loadTasks();
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  if (selectedTask) {
    selectedTask.querySelector("span").textContent = taskText;
    selectedTask = null;
    document.getElementById("editTask").disabled = true;
  } else {
    createTaskElement(taskText);
  }

  saveTasks();
  taskInput.value = "";
}

function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";

  const span = document.createElement("span");
  span.textContent = taskText;

  const buttonGroup = document.createElement("div");

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-sm btn-outline-primary me-2";
  editBtn.textContent = "Edit";
  editBtn.onclick = function () {
    document.getElementById("taskInput").value = span.textContent;
    selectedTask = li;
    document.getElementById("editTask").disabled = false;
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-sm btn-outline-danger";
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = function () {
    li.remove();
    if (selectedTask === li) {
      selectedTask = null;
      document.getElementById("editTask").disabled = true;
    }
    saveTasks();
  };

  buttonGroup.appendChild(editBtn);
  buttonGroup.appendChild(deleteBtn);

  li.appendChild(span);  
  li.appendChild(buttonGroup);
  document.getElementById("taskList").appendChild(li);
}

function editTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (!selectedTask) {
    alert("No task selected to edit!");
    return;
  }

  if (taskText === "") {
    alert("Task cannot be empty!");
    return;
  }

  selectedTask.querySelector("span").textContent = taskText;
  selectedTask = null;
  taskInput.value = "";
  document.getElementById("editTask").disabled = true;
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li span").forEach(span => {
    tasks.push(span.textContent.trim());
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task));
}

function clearAll() {
  document.getElementById("taskList").innerHTML = "";
  localStorage.removeItem("tasks");
  document.getElementById("taskInput").value = "";
  selectedTask = null;
  document.getElementById("editTask").disabled = true;
}

function searchTasks() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll("#taskList li").forEach(li => {
    const span = li.querySelector("span");
    if (span) {
      const taskText = span.textContent.toLowerCase();
      li.style.display = taskText.includes(searchValue) ? "" : "none";
    }
  });
}

window.onload = init;
