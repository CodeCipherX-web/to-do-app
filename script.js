document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskTime = document.getElementById("task-time");
  const taskList = document.getElementById("task-list");
  const emptyImage = document.querySelector(".empty-image");
  const numbers = document.getElementById("numbers");
  const progress = document.getElementById("progress");
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const calendarEl = document.getElementById("calendar");

  let tasks = [];

  // Request notification permission
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  // ---------- Dynamic Gradient Background ----------
  function updateBackgroundGradient() {
    const hour = new Date().getHours();
    let gradient;

    if (hour >= 6 && hour < 12)
      gradient = "linear-gradient(135deg, #f6d365, #fda085)"; // morning
    else if (hour >= 12 && hour < 18)
      gradient = "linear-gradient(135deg, #a1c4fd, #c2e9fb)"; // afternoon
    else
      gradient = "linear-gradient(135deg, #667eea, #764ba2)"; // evening

    body.style.background = gradient;
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundAttachment = "fixed";
    body.style.backgroundPosition = "center";
    body.style.backgroundSize = "cover";
  }

  updateBackgroundGradient();
  setInterval(updateBackgroundGradient, 5 * 60 * 1000);

  // ---------- Floating Particles ----------
  const particleCount = 60;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.position = "fixed";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.borderRadius = "50%";
    particle.style.background = "rgba(255,255,255,0.15)";
    particle.style.pointerEvents = "none";
    particle.style.animation = `floatParticle ${Math.random() * 15 + 10}s linear infinite`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    body.appendChild(particle);
  }

  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes floatParticle {
      0% { transform: translateY(0) translateX(0); opacity: 0.7; }
      50% { transform: translateY(-40px) translateX(20px); opacity: 0.9; }
      100% { transform: translateY(0) translateX(-20px); opacity: 0.7; }
    }

    #progress {
      height: 18px;
      border-radius: 12px;
      background: linear-gradient(90deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1);
      transition: width 0.5s ease-in-out;
    }

    #numbers {
      font-weight: bold;
      font-size: 16px;
      color: #fff;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }
  `;
  document.head.appendChild(style);

  // ---------- Clock ----------
  function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-GB", { hour12: false });
    document.getElementById("digital-clock").textContent = timeString;
    checkReminders(timeString);
  }
  setInterval(updateClock, 1000);
  updateClock();

  // ---------- Reminders ----------
  function checkReminders(currentTime) {
    tasks.forEach(task => {
      if (task.time && !task.reminded && currentTime.startsWith(task.time)) {
        task.reminded = true;
        triggerReminder(task.text, task.time);
      }
    });
  }

  function triggerReminder(taskText, taskTime) {
    const audio = new Audio("https://www.soundjay.com/buttons/sounds/beep-07.mp3");
    audio.loop = true;
    audio.play();

    if ("Notification" in window && Notification.permission === "granted") {
      const notif = new Notification("⏰ Task Reminder", {
        body: `${taskText} at ${taskTime}`,
        icon: "favicon-32x32.png"
      });
      notif.onclick = () => audio.pause();
    } else {
      alert(`⏰ Reminder: ${taskText} (${taskTime})`);
      audio.pause();
    }
  }

  // ---------- Tasks ----------
  function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    numbers.textContent = `${completed} / ${total}`;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    progress.style.width = `${percent}%`;
    emptyImage.style.display = total === 0 ? "block" : "none";
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";
      li.classList.add("added"); 
      setTimeout(() => li.classList.remove("added"), 350);

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        task.completed = !task.completed;
        renderTasks();
      });

      const span = document.createElement("span");
      span.textContent = task.text;
      if (task.time) {
        const timeTag = document.createElement("small");
        timeTag.textContent = ` ⏰ ${task.time}`;
        span.appendChild(timeTag);
      }

      const editBtn = document.createElement("button");
      editBtn.className = "edit-btn";
      editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;
      editBtn.addEventListener("click", () => {
        const newText = prompt("Edit task:", task.text);
        const newTime = prompt("Edit time (HH:MM):", task.time || "");
        if (newText !== null && newText.trim() !== "") {
          task.text = newText.trim();
          task.time = newTime.trim();
          task.reminded = false;
          renderTasks();
        }
      });

      const delBtn = document.createElement("button");
      delBtn.className = "delete-btn";
      delBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
      delBtn.addEventListener("click", () => {
        li.classList.add("removed");
        li.addEventListener("animationend", () => {
          tasks.splice(index, 1);
          renderTasks();
        });
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(editBtn);
      li.appendChild(delBtn);

      taskList.appendChild(li);
    });
    updateStats();
  }

  function addTask() {
    const text = taskInput.value.trim();
    const time = taskTime.value;
    if (!text) return;
    tasks.push({ text, time, completed: false, reminded: false });
    taskInput.value = "";
    taskTime.value = "";
    renderTasks();
  }

  addTaskBtn.addEventListener("click", e => { e.preventDefault(); addTask(); });
  taskInput.addEventListener("keypress", e => { if(e.key==="Enter"){ e.preventDefault(); addTask(); } });

  // ---------- Theme Toggle ----------
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");
    const icon = themeToggle.querySelector("i");
    icon.classList.toggle("fa-moon");
    icon.classList.toggle("fa-sun");
    updateBackgroundGradient();
  });

  // ---------- Calendar ----------
  function generateCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    let calendarHTML = `<table class="calendar-table"><thead><tr>
      <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th>
      <th>Thu</th><th>Fri</th><th>Sat</th>
    </tr></thead><tbody>`;
    let dayCount = 1;
    for(let i=0;i<6;i++){ calendarHTML+="<tr>";
      for(let j=0;j<7;j++){
        if(i===0 && j<firstDay){ calendarHTML+="<td></td>"; }
        else if(dayCount>lastDate){ calendarHTML+="<td></td>"; }
        else{
          const isToday = dayCount===now.getDate();
          calendarHTML+=`<td class="${isToday?"today":""}">${dayCount}</td>`;
          dayCount++;
        }
      }
      calendarHTML+="</tr>";
    }
    calendarHTML+="</tbody></table>";
    calendarEl.innerHTML=calendarHTML;
  }

  generateCalendar();
  renderTasks();
});
