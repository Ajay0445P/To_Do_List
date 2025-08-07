let filter = 'all'; 
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addNote() {
  const input = document.querySelector(".js-input");
  const taskText = input.value.trim();

  if (taskText === "") return;

  tasks.push({ text: taskText, done: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const data = document.querySelector(".js-data");
  data.innerHTML = "";

  let filteredTasks = tasks;

  if (filter === 'active') {
    filteredTasks = tasks.filter(task => !task.done);
  } else if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.done);
  }

  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item animate";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.className = "task-checkbox";
    checkbox.onchange = () => {
      const actualIndex = tasks.indexOf(task);
      tasks[actualIndex].done = checkbox.checked;
      saveTasks();
      renderTasks();
    };

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskText.className = task.done ? "task-done" : "";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      const actualIndex = tasks.indexOf(task);
      tasks.splice(actualIndex, 1);
      saveTasks();
      renderTasks();
    };

    const leftGroup = document.createElement("div");
    leftGroup.className = "task-left";
    leftGroup.appendChild(checkbox);
    leftGroup.appendChild(taskText);

    taskItem.appendChild(leftGroup);
    taskItem.appendChild(deleteBtn);
    data.appendChild(taskItem);
  });
}
function setFilter(type) {
  filter = type;
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.querySelector(".js-input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addNote();
  }
}); 
renderTasks();
// === DARK MODE TOGGLE ===
const themeToggleBtn = document.getElementById("themeToggle");

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggleBtn.textContent = "☀️ Light Mode";
}

// Toggle theme on click
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeToggleBtn.textContent = "☀️ Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    themeToggleBtn.textContent = "🌙 Dark Mode";
  }
});
// PWA: Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => console.log("Service Worker Registered"));
  });
}

