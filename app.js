// ── State ──────────────────────────────
const state = {
  name: 'Alex', age: 28, weight: 75, height: 175,
  goal: 'Muscle Gain', level: 'Intermediate',
  equipment: ['Full Gym Access'], days: ['TUE','THU','SAT'],
  duration: 45, completedWorkouts: 3
};

// ── Navigation ─────────────────────────
function goTo(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
}

function showBottomNav() {
  document.getElementById('bottom-nav').style.display = 'flex';
}

function switchTab(el, screenId) {
  document.querySelectorAll('.bnav-item').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  goTo(screenId);
}

// ── Onboarding helpers ──────────────────
function validateAndNext(next) {
  const name = document.getElementById('inp-name').value;
  if (name) state.name = name;
  goTo(next);
}

function selectGoal(el, goal) {
  document.querySelectorAll('.goal-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.goal = goal;
}

function goToLevel() {
  if (!state.goal) { alert('Please select a goal first.'); return; }
  goTo('screen-level');
}

function selectLevel(el, level) {
  document.querySelectorAll('.level-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.level = level;
}

function toggleEquip(el) {
  el.classList.toggle('selected');
}

function toggleDay(el) {
  el.classList.toggle('selected');
}

function selectDuration(el, d) {
  document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  state.duration = parseInt(d);
}

function selectTimeOf(el) {
  document.querySelectorAll('#screen-schedule .equip-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

// ── Generating animation ────────────────
function generatePlan() {
  goTo('screen-generating');
  const steps = ['gstep-1','gstep-2','gstep-3','gstep-4','gstep-5','gstep-6'];
  const statuses = ['Analyzing fitness profile...','Selecting optimal exercises...','Structuring weekly schedule...','Calculating intensity & volume...','Adding nutrition data...','Plan complete!'];
  let i = 0;
  const interval = setInterval(() => {
    if (i > 0) {
      document.getElementById(steps[i-1]).classList.remove('active');
      document.getElementById(steps[i-1]).classList.add('done');
    }
    if (i < steps.length) {
      document.getElementById(steps[i]).classList.add('active');
      document.getElementById('gen-status').textContent = statuses[i];
      i++;
    } else {
      clearInterval(interval);
      document.getElementById('gen-spinner').style.display = 'none';
      setTimeout(() => {
        buildPlan();
        showBottomNav();
        goTo('screen-plan');
        buildNutrition();
        buildProgress();
      }, 600);
    }
  }, 700);
}

// ── Plan data engine ─────────────────────
const PLANS = {
  'Muscle Gain': {
    title: 'MUSCLE GAIN PROGRAM',
    weeks: '8-week program',
    days: [
      { name: 'MONDAY', type: 'strength', label: 'Chest & Triceps', exercises: [
        {n:'Barbell Bench Press',m:'Chest',s:'4 × 8',r:'90s',note:'Control descent'},
        {n:'Incline Dumbbell Press',m:'Upper Chest',s:'3 × 10',r:'75s',note:''},
        {n:'Cable Flye',m:'Chest',s:'3 × 12',r:'60s',note:'Full stretch'},
        {n:'Tricep Dips',m:'Triceps',s:'3 × 12',r:'60s',note:''},
        {n:'Overhead Tricep Extension',m:'Triceps',s:'3 × 15',r:'45s',note:''},
      ]},
      { name: 'TUESDAY', type: 'rest', label: 'Active Recovery', exercises: [
        {n:'Light Walking',m:'Cardio',s:'20–30 min',r:'—',note:'Low intensity'},
        {n:'Foam Rolling',m:'Full Body',s:'10 min',r:'—',note:''},
        {n:'Static Stretching',m:'Full Body',s:'10 min',r:'—',note:''},
      ]},
      { name: 'WEDNESDAY', type: 'strength', label: 'Back & Biceps', exercises: [
        {n:'Deadlift',m:'Posterior Chain',s:'4 × 6',r:'120s',note:'Neutral spine'},
        {n:'Pull-Ups',m:'Lats',s:'4 × 8',r:'90s',note:'Full ROM'},
        {n:'Barbell Row',m:'Mid Back',s:'3 × 10',r:'75s',note:''},
        {n:'Face Pulls',m:'Rear Delt',s:'3 × 15',r:'45s',note:''},
        {n:'Barbell Curl',m:'Biceps',s:'3 × 12',r:'60s',note:''},
        {n:'Hammer Curl',m:'Biceps',s:'3 × 12',r:'45s',note:''},
      ]},
      { name: 'THURSDAY', type: 'hiit', label: 'HIIT Cardio', exercises: [
        {n:'Sprint Intervals',m:'Cardio',s:'8 × 30s',r:'90s',note:'Max effort'},
        {n:'Jump Rope',m:'Cardio',s:'3 × 2min',r:'60s',note:''},
        {n:'Burpees',m:'Full Body',s:'3 × 15',r:'60s',note:''},
        {n:'Mountain Climbers',m:'Core',s:'3 × 30s',r:'45s',note:''},
      ]},
      { name: 'FRIDAY', type: 'strength', label: 'Shoulders & Core', exercises: [
        {n:'Overhead Press',m:'Shoulders',s:'4 × 8',r:'90s',note:''},
        {n:'Lateral Raises',m:'Medial Delt',s:'4 × 15',r:'45s',note:'No swinging'},
        {n:'Arnold Press',m:'Shoulders',s:'3 × 12',r:'60s',note:''},
        {n:'Plank',m:'Core',s:'3 × 60s',r:'60s',note:''},
        {n:'Ab Rollout',m:'Core',s:'3 × 12',r:'60s',note:''},
      ]},
      { name: 'SATURDAY', type: 'strength', label: 'Legs', exercises: [
        {n:'Barbell Back Squat',m:'Quads/Glutes',s:'4 × 8',r:'120s',note:'Below parallel'},
        {n:'Romanian Deadlift',m:'Hamstrings',s:'3 × 10',r:'90s',note:''},
        {n:'Leg Press',m:'Quads',s:'3 × 12',r:'75s',note:'Full depth'},
        {n:'Walking Lunges',m:'Glutes/Quads',s:'3 × 20',r:'60s',note:''},
        {n:'Standing Calf Raise',m:'Calves',s:'4 × 20',r:'45s',note:''},
      ]},
      { name: 'SUNDAY', type: 'rest', label: 'Full Rest', exercises: [
        {n:'Complete Rest',m:'Recovery',s:'—',r:'—',note:'Sleep 8+ hours'},
        {n:'Meal Prep',m:'Nutrition',s:'—',r:'—',note:'Prep for next week'},
      ]},
    ]
  },
  'Weight Loss': {
    title: 'FAT BURN PROGRAM',
    weeks: '10-week program',
    days: [
      { name: 'MONDAY', type: 'hiit', label: 'HIIT + Abs', exercises: [
        {n:'Treadmill Sprint',m:'Cardio',s:'10 × 30s',r:'60s',note:'90% max HR'},
        {n:'Jump Squats',m:'Legs/Cardio',s:'4 × 15',r:'45s',note:''},
        {n:'Burpees',m:'Full Body',s:'4 × 12',r:'45s',note:''},
        {n:'Russian Twists',m:'Core',s:'3 × 20',r:'30s',note:''},
        {n:'Bicycle Crunches',m:'Core',s:'3 × 25',r:'30s',note:''},
      ]},
      { name: 'TUESDAY', type: 'cardio', label: 'Steady Cardio', exercises: [
        {n:'Incline Walk / Jog',m:'Cardio',s:'40 min',r:'—',note:'Zone 2 HR'},
        {n:'Stairmaster',m:'Glutes/Cardio',s:'15 min',r:'—',note:''},
      ]},
      { name: 'WEDNESDAY', type: 'strength', label: 'Upper Body Circuit', exercises: [
        {n:'Push-Ups',m:'Chest',s:'4 × 20',r:'45s',note:''},
        {n:'DB Rows',m:'Back',s:'4 × 15',r:'45s',note:''},
        {n:'Shoulder Press',m:'Shoulders',s:'3 × 15',r:'45s',note:''},
        {n:'Tricep Pushdown',m:'Triceps',s:'3 × 15',r:'30s',note:''},
      ]},
      { name: 'THURSDAY', type: 'rest', label: 'Active Recovery', exercises: [
        {n:'Yoga / Stretching',m:'Flexibility',s:'30 min',r:'—',note:''},
      ]},
      { name: 'FRIDAY', type: 'hiit', label: 'Full Body HIIT', exercises: [
        {n:'Kettlebell Swings',m:'Full Body',s:'5 × 20',r:'60s',note:'Hip hinge'},
        {n:'Box Jumps',m:'Legs/Power',s:'4 × 10',r:'60s',note:''},
        {n:'Battle Ropes',m:'Arms/Cardio',s:'4 × 30s',r:'60s',note:''},
        {n:'Plank',m:'Core',s:'3 × 45s',r:'45s',note:''},
      ]},
      { name: 'SATURDAY', type: 'cardio', label: 'Long Cardio', exercises: [
        {n:'Outdoor Run',m:'Cardio',s:'5–8 km',r:'—',note:'Comfortable pace'},
      ]},
      { name: 'SUNDAY', type: 'rest', label: 'Rest Day', exercises: [
        {n:'Full Rest',m:'Recovery',s:'—',r:'—',note:'Prioritize sleep'},
      ]},
    ]
  }
};

function getPlan() {
  return PLANS[state.goal] || PLANS['Muscle Gain'];
}

function buildPlan() {
  const plan = getPlan();
  document.getElementById('plan-title').textContent = plan.title;
  document.getElementById('plan-level').textContent = state.level || 'Intermediate';
  const selectedDays = document.querySelectorAll('.day-btn.selected').length || 4;
  document.getElementById('plan-days').textContent = `${selectedDays} days / week`;
  document.getElementById('plan-duration').textContent = `${state.duration || 45} min sessions`;
  document.getElementById('plan-week').textContent = plan.weeks;

  // summary cards
  const totalSets = plan.days.reduce((acc, d) => acc + d.exercises.reduce((a, e) => {
    const sets = parseInt(e.s) || 3; return a + sets;
  }, 0), 0);
  document.getElementById('sc-vol').textContent = totalSets;
  const totalEx = new Set(plan.days.flatMap(d => d.exercises.map(e => e.n))).size;
  document.getElementById('sc-ex').textContent = totalEx;

  // week grid
  const grid = document.getElementById('week-grid');
  grid.innerHTML = '';
  plan.days.forEach(day => {
    const typeMap = { strength:'type-strength', hiit:'type-hiit', cardio:'type-cardio', rest:'type-rest', flex:'type-flex' };
    const typeLabel = { strength:'Strength', hiit:'HIIT', cardio:'Cardio', rest:'Rest Day', flex:'Flexibility' };
    const card = document.createElement('div');
    card.className = 'day-card';
    const exList = day.exercises.slice(0, 4).map(e =>
      `<li class="exercise-item"><span class="exercise-name">${e.n}</span><span class="exercise-sets">${e.s}</span></li>`
    ).join('');
    const more = day.exercises.length > 4 ? `<li class="exercise-item" style="color:var(--muted);font-size:12px">+${day.exercises.length - 4} more exercises</li>` : '';
    card.innerHTML = `
      <div class="day-card-header">
        <div class="day-card-name">${day.name}</div>
        <div class="day-card-type ${typeMap[day.type] || ''}">${typeLabel[day.type]}</div>
      </div>
      <div class="day-card-body">
        <div style="font-size:13px;color:var(--lime);margin-bottom:10px;font-weight:500">${day.label}</div>
        <ul class="exercise-list">${exList}${more}</ul>
      </div>
      <div class="day-card-footer">
        <span>${day.exercises.length} exercises</span>
        <span>${state.duration || 45} min</span>
      </div>
    `;
    card.addEventListener('click', () => openDayDetail(day));
    grid.appendChild(card);
  });
}

function openDayDetail(day) {
  document.getElementById('detail-day-title').textContent = day.name;
  const chips = document.getElementById('detail-chips');
  const typeLabel = { strength:'Strength Training', hiit:'HIIT', cardio:'Cardio', rest:'Recovery Day', flex:'Flexibility' };
  chips.innerHTML = `
    <div class="detail-chip">${typeLabel[day.type] || day.type}</div>
    <div class="detail-chip">${day.label}</div>
    <div class="detail-chip">${day.exercises.length} exercises</div>
    <div class="detail-chip">${state.duration || 45} min</div>
  `;
  const tbody = document.getElementById('detail-table-body');
  tbody.innerHTML = day.exercises.map((e, i) => `
    <tr>
      <td class="ex-num">${String(i+1).padStart(2,'0')}</td>
      <td class="ex-name-cell">
        <div>${e.n}</div>
        <div class="ex-muscle">${e.m}</div>
      </td>
      <td class="ex-sets-cell">${e.s}</td>
      <td class="ex-rest-cell">${e.r}</td>
      <td class="ex-notes-cell">${e.note || '—'}</td>
    </tr>
  `).join('');
  goTo('screen-day-detail');
}

function markComplete() {
  state.completedWorkouts++;
  document.getElementById('ps-done').textContent = state.completedWorkouts;
  document.getElementById('ps-streak').textContent = state.completedWorkouts;
  const btn = document.querySelector('.complete-btn-wrap .btn-primary');
  btn.textContent = '✓ Workout Completed!';
  btn.style.background = '#22c55e';
  btn.style.color = '#fff';
  setTimeout(() => goTo('screen-progress'), 1200);
}

function buildNutrition() {
  const meals = [
    { time: '7:00 AM', meal: 'Oats + 2 eggs + banana', protein: '28g' },
    { time: '10:00 AM', meal: 'Greek yogurt + berries', protein: '20g' },
    { time: '1:00 PM', meal: 'Chicken breast + rice + broccoli', protein: '45g' },
    { time: '4:00 PM', meal: 'Protein shake + apple', protein: '30g' },
    { time: '7:00 PM', meal: 'Salmon + sweet potato + greens', protein: '38g' },
    { time: '9:30 PM', meal: 'Cottage cheese + almonds', protein: '22g' },
  ];
  const container = document.getElementById('meal-plan-rows');
  container.innerHTML = meals.map((m, i) => `
    <div style="display:grid;grid-template-columns:100px 1fr 80px;padding:14px 20px;border-bottom:${i < meals.length-1 ? '1px solid var(--border)' : 'none'};font-size:14px;align-items:center">
      <span style="color:var(--muted);font-family:'Space Mono',monospace;font-size:12px">${m.time}</span>
      <span>${m.meal}</span>
      <span style="color:var(--lime);font-family:'Space Mono',monospace;font-size:13px">${m.protein}</span>
    </div>
  `).join('');
}

function buildProgress() {
  const plan = getPlan();
  const logs = [
    { day: 'Saturday', type: 'Legs — Squat, Deadlift, Lunges', time: '52 min', done: true },
    { day: 'Friday', type: 'Shoulders & Core', time: '44 min', done: true },
    { day: 'Thursday', type: 'HIIT Cardio', time: '31 min', done: true },
    { day: 'Wednesday', type: 'Back & Biceps', time: '—', done: false },
    { day: 'Tuesday', type: 'Rest / Active Recovery', time: '—', done: false, rest: true },
    { day: 'Monday', type: 'Chest & Triceps', time: '47 min', done: true },
  ];
  const logList = document.getElementById('log-list');
  logList.innerHTML = logs.map(l => `
    <div class="log-item">
      <div class="log-dot ${l.rest ? 'rest' : ''}"></div>
      <div class="log-info">
        <div class="log-day">${l.day} ${l.done ? '✓' : ''}</div>
        <div class="log-type">${l.type}</div>
      </div>
      <div class="log-time">${l.time}</div>
    </div>
  `).join('');

  // completion bars
  const bars = document.getElementById('completion-bars');
  const wks = [75, 0, 0, 0, 0, 0, 0, 0];
  bars.innerHTML = wks.map((p, i) => `
    <div style="flex:1;text-align:center">
      <div style="height:80px;background:var(--border);border-radius:4px;display:flex;align-items:flex-end;overflow:hidden">
        <div style="width:100%;height:${p}%;background:${p > 0 ? 'var(--lime)' : 'transparent'};transition:height 1s ease"></div>
      </div>
      <div style="font-size:11px;color:var(--muted);margin-top:6px">W${i+1}</div>
    </div>
  `).join('');
}

function loadDemoPlan() {
  buildPlan();
  buildNutrition();
  buildProgress();
  showBottomNav();
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  // Pre-init demo data in case user hits demo plan
});
