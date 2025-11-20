const welcomeScreen = document.getElementById("welcomeScreen");
const app = document.getElementById("app");
const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const alarm = document.getElementById("alarmSound");

let tasks = [];

// Start App (Welcome → Main Screen)
function startApp() {
    welcomeScreen.classList.add("hidden");
    app.classList.remove("hidden");
}

// Make function available for onclick in HTML
window.startApp = startApp;

// Add Task
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let task = {
        name: document.getElementById("taskName").value,
        start: document.getElementById("startTime").value,
        end: document.getElementById("endTime").value,
        started: false,
        ended: false
    };

    tasks.push(task);
    displayTasks();

    form.reset();
});

// Display Tasks
function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach(t => {
        let li = document.createElement("li");
        li.textContent = `${t.name} — ${t.start} to ${t.end}`;
        taskList.appendChild(li);
    });
}

// Check time every second
setInterval(() => {
    let now = new Date();
    let current = now.toTimeString().slice(0, 5); // "HH:MM"

    tasks.forEach(t => {
        if (t.start === current && !t.started) {
            t.started = true;
            triggerNotification("Task Started", `${t.name} has started!`);
        }

        if (t.end === current && !t.ended) {
            t.ended = true;
            triggerNotification("Task Ended", `${t.name} has ended!`);
        }
    });

}, 1000);

// Play alarm + popup
function triggerNotification(title, message) {
    alarm.currentTime = 0;
    alarm.play();

    alert(`${title}\n\n${message}\n\n(Rain sound playing)`);

    setTimeout(() => {
        alarm.pause();
    }, 5000);
}