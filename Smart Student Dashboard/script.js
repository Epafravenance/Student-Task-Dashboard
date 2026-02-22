// ======= SELECT ELEMENTS =======
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");
const toggleBtn = document.getElementById("themeToggle");

// ======= LOAD TASKS FROM LOCALSTORAGE =======
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ======= THEME PERSISTENCE =======
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀️ Light Mode";
} else {
  toggleBtn.textContent = "🌙 Dark Mode";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️ Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙 Dark Mode";
  }
});

// ======= RENDER TASKS =======
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      <div>
        <input type="checkbox" ${task.done ? "checked" : ""} onclick="toggleTask(${index})">
        ${
          task.editing
            ? `<input type="text" value="${task.text}" onkeypress="saveEdit(event, ${index})">`
            : `<span style="${task.done ? 'text-decoration: line-through;' : ''}">
                ${task.text}
               </span>`
        }
      </div>

      <div>
        <button class="btn btn-warning btn-sm me-2" onclick="editTask(${index})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
setTimeout(() => li.classList.add("show"), 10);
  });

  updateProgress();
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ======= ADD TASK =======
addBtn.addEventListener("click", () => {
  const taskText = input.value.trim();
  if (!taskText) return;

  tasks.push({ text: taskText, done: false, editing: false });
  input.value = "";
  renderTasks();
});

// ======= ENTER KEY ADD TASK =======
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

// ======= DELETE TASK =======
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// ======= TOGGLE TASK DONE =======
function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

// ======= EDIT TASK =======
function editTask(index) {
  tasks[index].editing = true;
  renderTasks();
}

// ======= SAVE EDITED TASK =======
function saveEdit(event, index) {
  if (event.key === "Enter") {
    tasks[index].text = event.target.value;
    tasks[index].editing = false;
    renderTasks();
  }
}

// ======= UPDATE PROGRESS BAR =======
function updateProgress() {
  if (tasks.length === 0) {
    progressBar.style.width = "0%";
    progressBar.textContent = "0%";
    return;
  }

  const completed = tasks.filter(t => t.done).length;
  const percent = Math.round((completed / tasks.length) * 100);

  progressBar.style.width = percent + "%";
  progressBar.textContent = percent + "%";
}

// ======= INITIAL LOAD =======
renderTasks();


const greetingEl = document.getElementById("greeting");
const date = new Date();
const hours = date.getHours();
let greet = "Hello!";
if (hours < 12) greet = "Good Morning!";
else if (hours < 18) greet = "Good Afternoon!";
else greet = "Good Evening!";
greetingEl.textContent = `${greet} Today is ${date.toDateString()}`;