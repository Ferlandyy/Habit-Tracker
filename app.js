function toISODate(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function last7Dates() {
  const arr = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    arr.push(toISODate(d));
  }
  return arr;
}

function computeStreak(doneDatesSet) {
  let streak = 0;
  const d = new Date();
  while (true) {
    const key = toISODate(d);
    if (doneDatesSet.has(key)) {
      streak += 1;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

const STORAGE_KEY = "habitTrackerData";
function loadHabits() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveHabits(habits) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

const tbody = document.getElementById("habits-tbody");
const addForm = document.getElementById("add-form");
const nameInput = document.getElementById("habit-name");

let habits = loadHabits();
let days = last7Dates();

function renderHeaderLabels() {
  const labels = ["D-6", "D-5", "D-4", "D-3", "D-2", "Yesterday", "Today"];
  const ids = ["d6", "d5", "d4", "d3", "d2", "d1", "d0"];
  ids.forEach((id, i) => {
    const th = document.getElementById(id);
    const ds = new Date(days[i]);
    th.textContent = labels[i];
    th.title = ds.toLocaleDateString();
  });
}

function render() {
  renderHeaderLabels();
  tbody.innerHTML = "";

  if (habits.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 10;
    td.innerHTML = `<em>No habits yet. Add your first one above.</em>`;
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  habits.forEach((h) => {
    const done = new Set(h.dates);

    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.className = "habit-name";
    nameTd.textContent = h.name;
    tr.appendChild(nameTd);

    days.forEach((iso) => {
      const td = document.createElement("td");
      const btn = document.createElement("button");
      btn.className = "day-btn";
      btn.type = "button";
      const isOn = done.has(iso);
      btn.setAttribute("aria-pressed", isOn ? "true" : "false");
      btn.textContent = isOn ? "Yes" : "—";
      btn.title = new Date(iso).toLocaleDateString();
      btn.addEventListener("click", () => {
        toggleDay(h.id, iso);
      });
      td.appendChild(btn);
      tr.appendChild(td);
    });

    const streakTd = document.createElement("td");
    streakTd.textContent = computeStreak(done);
    tr.appendChild(streakTd);

    const actionsTd = document.createElement("td");
    actionsTd.className = "actions";

    const tickTodayBtn = document.createElement("button");
    tickTodayBtn.className = "small";
    tickTodayBtn.type = "button";
    tickTodayBtn.textContent = "Tick today";
    tickTodayBtn.addEventListener("click", () => {
      toggleDay(h.id, toISODate());
    });

    const delBtn = document.createElement("button");
    delBtn.className = "small danger";
    delBtn.type = "button";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      const ok = confirm(`Delete "${h.name}"? This cannot be undone.`);
      if (ok) {
        habits = habits.filter((x) => x.id !== h.id);
        saveHabits(habits);
        render();
      }
    });

    actionsTd.appendChild(tickTodayBtn);
    actionsTd.appendChild(delBtn);
    tr.appendChild(actionsTd);

    tbody.appendChild(tr);
  });
}

function addHabit(name) {
  const trimmed = name.trim();
  if (trimmed.length < 2) return;
  habits.push({ id: uid(), name: trimmed, dates: [] });
  saveHabits(habits);
  render();
}

function toggleDay(habitId, isoDate) {
  const h = habits.find((x) => x.id === habitId);
  if (!h) return;
  const i = h.dates.indexOf(isoDate);
  if (i === -1) h.dates.push(isoDate);
  else h.dates.splice(i, 1);
  saveHabits(habits);
  render();
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addHabit(nameInput.value);
  addForm.reset();
  nameInput.focus();
});

(function updateDaysAtMidnight() {
  const now = new Date();
  const msToMidnight =
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;
  setTimeout(() => {
    days = last7Dates();
    render();
    updateDaysAtMidnight();
  }, msToMidnight + 1000);
})();

render();
