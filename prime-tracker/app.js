// ─────────────────────────────────────────────
//  PRIME TRACKER — app.js
// ─────────────────────────────────────────────

const PIN = "121212"; // ← Change this to your preferred PIN

const COURSE_START = new Date("2026-05-06"); // Today = Day 1
const DEADLINE_DAYS = 21;

const SECTIONS = [
  { id: 1,  name: "Welcome to Prime!" },
  { id: 2,  name: "Live Session (Recordings)" },
  { id: 3,  name: "Course Introduction" },
  { id: 4,  name: "Python Fundamentals (Part 1)" },
  { id: 5,  name: "Python Fundamentals (Part 2)" },
  { id: 6,  name: "Python Fundamentals (Part 3)" },
  { id: 7,  name: "Python Fundamentals (Part 4)" },
  { id: 8,  name: "Python Fundamentals (Part 5)" },
  { id: 9,  name: "Installation" },
  { id: 10, name: "Phase 2: Data" },
  { id: 11, name: "NumPy (Numerical Python)" },
  { id: 12, name: "Pandas (Part 1)" },
  { id: 13, name: "Pandas (Part 2)" },
  { id: 14, name: "Data Collection" },
  { id: 15, name: "SQL (Part 1)" },
  { id: 16, name: "SQL (Part 2)" },
  { id: 17, name: "Data Collection (continuation)" },
  { id: 18, name: "Complete HTML Tutorial [OPTIONAL]", optional: true },
  { id: 19, name: "Web Scraping (Activity)" },
  { id: 20, name: "Data Visualization (Part 1)" },
  { id: 21, name: "Data Visualization (Part 2)" },
  { id: 22, name: "Math for AI – Probability" },
  { id: 23, name: "Math for AI – Linear Algebra" },
  { id: 24, name: "Math for AI – Calculus" },
  { id: 25, name: "Starting with Machine Learning" },
  { id: 26, name: "Supervised ML (Part 1)" },
  { id: 27, name: "Supervised ML (Part 2)" },
  { id: 28, name: "Supervised ML (Part 3)" },
  { id: 29, name: "Scratch Implementations [ADD-ON]", optional: true },
  { id: 30, name: "CreditWise Loan System (Minor Project)" },
  { id: 31, name: "Supervised ML (Part 4)" },
  { id: 32, name: "Supervised ML (Part 5)" },
  { id: 33, name: "Supervised ML (Part 6)" },
  { id: 34, name: "Unsupervised ML (Part 1)" },
  { id: 35, name: "Unsupervised ML (Part 2)" },
  { id: 36, name: "SmartCart Clustering System (Minor Project)" },
  { id: 37, name: "Terminal" },
  { id: 38, name: "Git & Github" },
  { id: 39, name: "Deep Learning (Part 1)" },
  { id: 40, name: "Deep Learning (Part 2)" },
  { id: 41, name: "Deep Learning (Part 3)" },
  { id: 42, name: "Deep Learning (Part 4)" },
  { id: 43, name: "Deep Learning (Part 5)" },
  { id: 44, name: "Deep Learning (Part 6)" },
  { id: 45, name: "Reinforcement Learning (Part 1)" },
  { id: 46, name: "Reinforcement Learning (Part 2)" },
  { id: 47, name: "Reinforcement Learning (Part 3)" },
  { id: 48, name: "Reinforcement Learning (Part 4)" },
  { id: 49, name: "Deep Learning (Part 7)" },
  { id: 50, name: "Deep Learning (Part 8)" },
  { id: 51, name: "Text Summarizer [Minor Project]" },
  { id: 52, name: "CSS – Part 1 [OPTIONAL]", optional: true },
  { id: 53, name: "CSS – Part 2 [OPTIONAL]", optional: true },
  { id: 54, name: "Deep Learning (Part 9)" },
  { id: 55, name: "Deep Learning (Part 10)" },
  { id: 56, name: "OpenAI APIs" },
  { id: 57, name: "CSS – Part 3 [OPTIONAL]", optional: true },
  { id: 58, name: "CSS – Part 4 [OPTIONAL]", optional: true },
  { id: 59, name: "Working with Flask" },
  { id: 60, name: "Deep Learning (Part 11)" },
  { id: 61, name: "Agentic AI" },
  { id: 62, name: "Certificate of Completion" },
];

// Sections 1–28 already completed
const PRE_COMPLETED = Array.from({length: 28}, (_, i) => i + 1);

// ── 21-DAY PLAN ──────────────────────────────
// Study: 5.5 hrs/day  (1.5 + 2 + 2)
// New section ≈ 1 hr, Revision ≈ 0.5 hr
// Remaining: sections 29–62 = 34 sections to study
// Revision of all 62: running alongside final days
//
// Strategy:
//  Days 1–15: Study ~2 new sections/day (covers 29-62 in ~17 days, buffer built in)
//  Days 16–20: Study remaining sections + heavy revision
//  Day 21: Last section + full final revision sweep
//
// We map each day to: what to study + what to revise

function buildPlan() {
  // Remaining sections to study (29 → 62)
  const remaining = SECTIONS.filter(s => s.id > 28);
  // 34 sections over 21 days → ~1.6/day, we'll do 2/day for first 15 days, 1-2 for rest
  const plan = [];

  // Roughly: days 1-17 study new; days 1-21 revise old in chunks
  // Revision chunks: split 1-28 into groups across days
  const revGroups = chunkArray(PRE_COMPLETED, 3); // 10 groups of 3 (approx)
  // Also during last days, revise new stuff
  
  let studyIdx = 0;
  for (let d = 1; d <= 21; d++) {
    const isLastDay = d === 21;
    const studyToday = [];
    
    if (!isLastDay) {
      // 2 new sections per day (5.5 hrs: 2 study + 1hr revision)
      const count = studyIdx < remaining.length - 2 ? 2 : 1;
      for (let i = 0; i < count && studyIdx < remaining.length; i++) {
        studyToday.push(remaining[studyIdx]);
        studyIdx++;
      }
    } else {
      // Last section on day 21
      if (studyIdx < remaining.length) {
        studyToday.push(remaining[studyIdx]);
        studyIdx++;
      }
    }

    // Revision for today
    const reviseToday = [];
    // Days 1-10: revise old sections (1-28 in chunks)
    const revGrpIdx = d - 1;
    if (revGrpIdx < revGroups.length) {
      reviseToday.push(...revGroups[revGrpIdx].map(id => SECTIONS.find(s => s.id === id)));
    }
    // Days 12-20: start revising recently studied sections
    if (d >= 12 && d <= 21) {
      const recentStart = Math.max(0, studyIdx - 8);
      const recentEnd = Math.max(0, studyIdx - 4);
      for (let i = recentStart; i < recentEnd; i++) {
        if (remaining[i]) reviseToday.push(remaining[i]);
      }
    }
    // Day 21: full revision pass (summarize all)
    if (isLastDay) {
      reviseToday.push({ id: 0, name: "FINAL REVISION — All 62 Sections" });
    }

    plan.push({ day: d, study: studyToday, revise: reviseToday });
  }
  return plan;
}

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

const PLAN = buildPlan();

// ── STATE ─────────────────────────────────────
function loadState() {
  try {
    const raw = localStorage.getItem("primetrack_state");
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  // Default: mark 1-28 as done
  const sections = {};
  SECTIONS.forEach(s => {
    sections[s.id] = {
      done: PRE_COMPLETED.includes(s.id),
      revised: false,
      doneDate: PRE_COMPLETED.includes(s.id) ? "Before tracker" : null,
      revisedDate: null,
    };
  });
  return { sections, log: [], lastStudyDay: null };
}

function saveState(state) {
  localStorage.setItem("primetrack_state", JSON.stringify(state));
}

let STATE = loadState();

// ── LOGIN ─────────────────────────────────────
let pinBuffer = "";

function updatePinDisplay() {
  const filled = pinBuffer.length;
  const dots = Array(6).fill("_").map((_, i) => i < filled ? "●" : "_").join(" ");
  document.getElementById("pin-display").textContent = dots;
}

document.querySelectorAll(".num-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const val = btn.dataset.val;
    if (val === "clear") {
      pinBuffer = pinBuffer.slice(0, -1);
    } else if (val === "enter") {
      checkPin();
    } else {
      if (pinBuffer.length < 6) {
        pinBuffer += val;
        if (pinBuffer.length === 6) setTimeout(checkPin, 150);
      }
    }
    updatePinDisplay();
  });
});

function checkPin() {
  const display = document.getElementById("pin-display");
  if (pinBuffer === PIN) {
    display.classList.add("success");
    setTimeout(() => {
      document.getElementById("login-screen").classList.remove("active");
      document.getElementById("dashboard-screen").classList.add("active");
      initDashboard();
    }, 400);
  } else {
    display.classList.add("error");
    document.getElementById("pin-hint").textContent = "Incorrect PIN. Try again.";
    setTimeout(() => {
      display.classList.remove("error");
      pinBuffer = "";
      updatePinDisplay();
      document.getElementById("pin-hint").textContent = "Enter your 6-digit PIN";
    }, 800);
  }
}

document.getElementById("logout-btn").addEventListener("click", () => {
  document.getElementById("dashboard-screen").classList.remove("active");
  document.getElementById("login-screen").classList.add("active");
  pinBuffer = "";
  updatePinDisplay();
});

// ── TABS ──────────────────────────────────────
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
    link.classList.add("active");
    document.getElementById("tab-" + link.dataset.tab).classList.add("active");
  });
});

// ── INIT DASHBOARD ────────────────────────────
function initDashboard() {
  renderOverview();
  renderScheduleTab();
  renderSectionsTab();
  renderLogTab();
}

// ── DATES ─────────────────────────────────────
function today() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

function dayNumber() {
  const ms = new Date() - COURSE_START;
  return Math.floor(ms / 86400000) + 1;
}

function deadlineDate() {
  const d = new Date(COURSE_START);
  d.setDate(d.getDate() + DEADLINE_DAYS - 1);
  return d;
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function daysRemaining() {
  const dl = deadlineDate();
  const now = new Date();
  const diff = Math.ceil((dl - now) / 86400000);
  return Math.max(0, diff);
}

// ── STREAK ────────────────────────────────────
function calcStreak() {
  const dates = [...new Set(STATE.log.map(l => l.date))].sort().reverse();
  let streak = 0;
  let checkDate = new Date();
  for (const d of dates) {
    const dDate = new Date(d);
    const diff = Math.round((checkDate - dDate) / 86400000);
    if (diff <= 1) { streak++; checkDate = dDate; }
    else break;
  }
  return streak;
}

// ── OVERVIEW ─────────────────────────────────
function renderOverview() {
  const doneSections = SECTIONS.filter(s => STATE.sections[s.id]?.done).length;
  const pct = Math.round((doneSections / SECTIONS.length) * 100);
  const dr = daysRemaining();
  const dn = dayNumber();
  const streak = calcStreak();

  document.getElementById("overall-pct").textContent = pct + "%";
  document.getElementById("overall-bar").style.width = pct + "%";
  document.getElementById("overall-sub").textContent = `${doneSections} of ${SECTIONS.length} sections done`;
  document.getElementById("days-remaining").textContent = dr;
  document.getElementById("deadline-date").textContent = formatDate(deadlineDate());
  document.getElementById("sections-left").textContent = SECTIONS.length - doneSections;
  document.getElementById("streak-val").textContent = streak;
  document.getElementById("today-date").textContent = new Date().toLocaleDateString("en-IN", { weekday:"short", day:"numeric", month:"short", year:"numeric" });

  renderTodaySchedule(dn);
  renderQuickLog();
  renderPlanGrid(dn);
}

function renderTodaySchedule(dn) {
  const planDay = PLAN[Math.min(dn - 1, 20)];
  if (!planDay) return;

  const studyNames = planDay.study.map(s => s.name).join(" + ") || "—";
  const reviseNames = planDay.revise.slice(0, 3).map(s => s.name).join(", ") || "Review notes";

  document.getElementById("sched-task-1").textContent = "Study: " + (planDay.study[0]?.name || "—");
  document.getElementById("sched-task-2").textContent = planDay.study[1]
    ? "Study: " + planDay.study[1].name
    : "Revision: " + reviseNames;
  document.getElementById("sched-task-3").textContent = "Revise: " + reviseNames;
}

function renderQuickLog() {
  const sel = document.getElementById("quick-section-select");
  sel.innerHTML = "";
  SECTIONS.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = s.id + ". " + s.name;
    sel.appendChild(opt);
  });

  // Default to first non-done section
  const firstPending = SECTIONS.find(s => !STATE.sections[s.id]?.done);
  if (firstPending) sel.value = firstPending.id;

  let mode = "study";
  document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".toggle-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      mode = btn.dataset.mode;
    });
  });

  document.getElementById("log-today-btn").onclick = () => {
    const sId = parseInt(sel.value);
    const notes = document.getElementById("quick-notes").value.trim();
    const entry = {
      date: today(),
      sectionId: sId,
      sectionName: SECTIONS.find(s => s.id === sId)?.name,
      mode,
      notes,
    };
    STATE.log.unshift(entry);

    if (mode === "study") {
      STATE.sections[sId].done = true;
      STATE.sections[sId].doneDate = today();
    } else {
      STATE.sections[sId].revised = true;
      STATE.sections[sId].revisedDate = today();
    }

    STATE.lastStudyDay = today();
    saveState(STATE);

    document.getElementById("log-feedback").textContent = "✓ Logged! Great work.";
    document.getElementById("quick-notes").value = "";
    setTimeout(() => document.getElementById("log-feedback").textContent = "", 3000);

    renderOverview();
    renderSectionsTab();
    renderLogTab();
  };
}

function renderPlanGrid(dn) {
  const grid = document.getElementById("plan-grid");
  grid.innerHTML = "";
  PLAN.forEach(p => {
    const div = document.createElement("div");
    div.className = "plan-day";
    const isPast = p.day < dn;
    const isToday = p.day === dn;

    // Check if all study sections for this day are done
    const allDone = p.study.every(s => s.id === 0 || STATE.sections[s.id]?.done);

    if (allDone && p.study.length > 0) div.classList.add("done");
    else if (isToday) div.classList.add("today");
    else if (isPast) div.classList.add("past");

    const task = p.study.map(s => s.name.split("(")[0].trim()).join(" + ") || "Revision";
    div.innerHTML = `
      <span class="day-num">${p.day}</span>
      <span class="day-label">${isToday ? "TODAY" : isPast ? "past" : "Day " + p.day}</span>
      <span class="day-task">${task.length > 40 ? task.slice(0, 40) + "…" : task}</span>
    `;
    grid.appendChild(div);
  });
}

// ── SCHEDULE TAB ─────────────────────────────
function renderScheduleTab() {
  const container = document.getElementById("full-schedule");
  container.innerHTML = "";

  const dn = dayNumber();

  // Header
  const header = document.createElement("div");
  header.className = "schedule-row header";
  header.innerHTML = `
    <div class="sr-cell">Day</div>
    <div class="sr-cell">Morning (7:30–9)</div>
    <div class="sr-cell">Midday (11–1)</div>
    <div class="sr-cell">Afternoon (3–5) + Revision</div>
  `;
  container.appendChild(header);

  PLAN.forEach(p => {
    const row = document.createElement("div");
    row.className = "schedule-row";
    if (p.day === dn) row.classList.add("today-row");
    if (p.day < dn) row.classList.add("done-row");

    const study = p.study;
    const revise = p.revise;

    const s0 = study[0]?.name || "—";
    const s1 = study[1]?.name || "Revision";
    const rev = revise.map(r => r.name).slice(0, 3).join(", ") || "Review notes";

    const dl = deadlineDate();
    const dayDate = new Date(COURSE_START);
    dayDate.setDate(dayDate.getDate() + p.day - 1);
    const dateStr = dayDate.toLocaleDateString("en-IN", {day:"numeric", month:"short"});

    row.innerHTML = `
      <div class="sr-cell sr-day">D${p.day}<br><small style="color:var(--text-muted);font-size:9px">${dateStr}</small></div>
      <div class="sr-cell sr-task">${s0}</div>
      <div class="sr-cell sr-task">${s1}</div>
      <div class="sr-cell sr-revise">${rev}</div>
    `;
    container.appendChild(row);
  });
}

// ── SECTIONS TAB ─────────────────────────────
let currentFilter = "all";

function renderSectionsTab() {
  const doneSections = SECTIONS.filter(s => STATE.sections[s.id]?.done).length;
  document.getElementById("sections-progress-badge").textContent = `${doneSections} / ${SECTIONS.length} done`;

  const list = document.getElementById("sections-list");
  list.innerHTML = "";

  const filtered = SECTIONS.filter(s => {
    const st = STATE.sections[s.id];
    if (currentFilter === "done") return st?.done;
    if (currentFilter === "pending") return !st?.done;
    if (currentFilter === "revised") return st?.revised;
    return true;
  });

  filtered.forEach(s => {
    const st = STATE.sections[s.id];
    const row = document.createElement("div");
    row.className = "section-row" + (st?.done ? " done" : "");

    const optTag = s.optional ? `<span class="sec-tag optional">OPTIONAL</span>` : "";
    const doneTag = st?.done ? `<span class="sec-tag done">✓ Done</span>` : "";
    const revisedTag = st?.revised ? `<span class="sec-tag revised">🔁 Revised</span>` : "";
    const doneDate = st?.doneDate ? `<span class="sec-date">${st.doneDate}</span>` : "";

    row.innerHTML = `
      <span class="sec-num">${s.id}</span>
      <span class="sec-name">${s.name}</span>
      ${optTag}${doneTag}${revisedTag}
      ${doneDate}
      <div class="sec-actions">
        <button class="sec-btn done-btn ${st?.done ? "active" : ""}" data-id="${s.id}" data-action="done">
          ${st?.done ? "✓ Done" : "Mark Done"}
        </button>
        <button class="sec-btn revise-btn ${st?.revised ? "active" : ""}" data-id="${s.id}" data-action="revise">
          ${st?.revised ? "🔁 Revised" : "Revise"}
        </button>
      </div>
    `;

    // Action buttons
    row.querySelectorAll(".sec-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.id);
        const action = btn.dataset.action;
        if (action === "done") {
          STATE.sections[id].done = !STATE.sections[id].done;
          STATE.sections[id].doneDate = STATE.sections[id].done ? today() : null;
          if (STATE.sections[id].done) {
            STATE.log.unshift({ date: today(), sectionId: id, sectionName: SECTIONS.find(s=>s.id===id)?.name, mode: "study", notes: "" });
          }
        } else {
          STATE.sections[id].revised = !STATE.sections[id].revised;
          STATE.sections[id].revisedDate = STATE.sections[id].revised ? today() : null;
          if (STATE.sections[id].revised) {
            STATE.log.unshift({ date: today(), sectionId: id, sectionName: SECTIONS.find(s=>s.id===id)?.name, mode: "revise", notes: "" });
          }
        }
        saveState(STATE);
        renderSectionsTab();
        renderOverview();
        renderLogTab();
      });
    });

    list.appendChild(row);
  });

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderSectionsTab();
    });
  });
}

// ── LOG TAB ──────────────────────────────────
function renderLogTab() {
  const container = document.getElementById("log-entries");
  container.innerHTML = "";

  if (!STATE.log.length) {
    container.innerHTML = `<div class="log-empty">No entries yet. Start logging your progress!</div>`;
    return;
  }

  STATE.log.forEach(entry => {
    const div = document.createElement("div");
    div.className = "log-entry";
    div.innerHTML = `
      <div class="log-date">${entry.date}</div>
      <div class="log-icon">${entry.mode === "study" ? "📖" : "🔁"}</div>
      <div class="log-body">
        <div class="log-section-name">${entry.sectionName || "Section " + entry.sectionId}</div>
        <div class="log-mode">${entry.mode === "study" ? "Studied" : "Revised"}</div>
        ${entry.notes ? `<div class="log-note">${entry.notes}</div>` : ""}
      </div>
    `;
    container.appendChild(div);
  });
}

// ── INIT ─────────────────────────────────────
updatePinDisplay();
