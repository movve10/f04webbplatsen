// Huvudräkning – fyra nivåer, 10 tal per runda.
// Varje uppgift har ett tips som visar ett sätt att räkna ut den i huvudet.

const ROUND_LENGTH = 10;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(list) {
  return list[rand(0, list.length - 1)];
}

// ---------- Uppgifter ----------

function addSmall() {
  const a = rand(2, 10), b = rand(2, 10), sum = a + b;
  const hint = sum > 10
    ? `Fyll upp till 10: ${a} + ${10 - a} = 10, sen ${b - (10 - a)} till = ${sum}.`
    : `Börja på ${Math.max(a, b)} och räkna ${Math.min(a, b)} steg uppåt.`;
  return { text: `${a} + ${b}`, answer: sum, hint };
}

function subSmall() {
  const a = rand(6, 20), b = rand(1, a - 1);
  return {
    text: `${a} − ${b}`,
    answer: a - b,
    hint: `Räkna uppåt från ${b} till ${a}: det är ${a - b} steg.`,
  };
}

function addMedium() {
  const a = rand(12, 85), b = rand(11, 99 - a);
  const tens = Math.floor(b / 10) * 10, ones = b % 10;
  return {
    text: `${a} + ${b}`,
    answer: a + b,
    hint: `Tiotalen först: ${a} + ${tens} = ${a + tens}, sen + ${ones} = ${a + b}.`,
  };
}

function subMedium() {
  const a = rand(30, 99), b = rand(11, a - 5);
  const tens = Math.floor(b / 10) * 10, ones = b % 10;
  return {
    text: `${a} − ${b}`,
    answer: a - b,
    hint: `Tiotalen först: ${a} − ${tens} = ${a - tens}, sen − ${ones} = ${a - b}.`,
  };
}

function tables() {
  const a = rand(2, 10), b = rand(2, 10), p = a * b;
  let hint;
  if (b === 9 || a === 9) {
    const n = a === 9 ? b : a;
    hint = `Gånger 9 = gånger 10 minus en gång: ${n * 10} − ${n} = ${p}.`;
  } else if (b === 5 || a === 5) {
    const n = a === 5 ? b : a;
    hint = `Gånger 5 = gånger 10 delat med 2: ${n * 10} / 2 = ${p}.`;
  } else if (b === 4 || a === 4) {
    const n = a === 4 ? b : a;
    hint = `Gånger 4 = dubbla två gånger: ${n} → ${n * 2} → ${p}.`;
  } else if (b > 5) {
    hint = `Dela upp: ${a}×5 = ${a * 5}, plus ${a}×${b - 5} = ${a * (b - 5)}, totalt ${p}.`;
  } else {
    hint = `${a} × ${b}: ta ${a} ${b} gånger: ${Array(b).fill(a).join(' + ')} = ${p}.`;
  }
  return { text: `${a} × ${b}`, answer: p, hint };
}

function splitHint(a, b, op) {
  // Dela upp b i hundratal, tiotal och ental och räkna steg för steg.
  const parts = [Math.floor(b / 100) * 100, Math.floor((b % 100) / 10) * 10, b % 10].filter(Boolean);
  let cur = a;
  const steps = parts.map(p => {
    cur = op === '+' ? cur + p : cur - p;
    return `${op} ${p} = ${cur}`;
  });
  return `Dela upp ${b}: ${a} ${steps.join(', sen ')}.`;
}

function addHard() {
  const a = rand(120, 899), b = rand(45, 999 - a);
  return { text: `${a} + ${b}`, answer: a + b, hint: splitHint(a, b, '+') };
}

function subHard() {
  const a = rand(200, 999), b = rand(45, a - 20);
  return { text: `${a} − ${b}`, answer: a - b, hint: splitHint(a, b, '−') };
}

function multHard() {
  const a = rand(12, 99), b = rand(3, 9);
  const tens = Math.floor(a / 10) * 10, ones = a % 10;
  return {
    text: `${a} × ${b}`,
    answer: a * b,
    hint: `${tens}×${b} = ${tens * b}, ${ones}×${b} = ${ones * b}, ihop = ${a * b}.`,
  };
}

function divHard() {
  const b = rand(2, 12), q = rand(3, 15), a = b * q;
  return {
    text: `${a} / ${b}`,
    answer: q,
    hint: `Tänk baklänges: vad gånger ${b} blir ${a}? ${q} × ${b} = ${a}.`,
  };
}

function multExtra() {
  const a = rand(13, 99), b = rand(12, 49);
  const tens = Math.floor(b / 10) * 10, ones = b % 10;
  return {
    text: `${a} × ${b}`,
    answer: a * b,
    hint: `${a}×${tens} = ${a * tens}, ${a}×${ones} = ${a * ones}, ihop = ${a * b}.`,
  };
}

function square() {
  const n = rand(11, 59);
  const near = Math.round(n / 10) * 10, d = Math.abs(n - near);
  const hint = d === 0
    ? `${n / 10}² = ${(n / 10) ** 2}, lägg till två nollor: ${n * n}.`
    : `Avrunda till ${near}: ${near} × ${n + (n - near)} = ${near * (2 * n - near)}, plus ${d}² = ${d * d} → ${n * n}.`;
  return { text: `${n}²`, answer: n * n, hint };
}

function percent() {
  const p = pick([5, 10, 15, 20, 25, 30, 40, 50, 75]);
  const base = rand(2, 40) * 20;
  const ten = base / 10, ans = (base * p) / 100;
  const hints = {
    5: `10% av ${base} = ${ten}, hälften av det = ${ans}.`,
    10: `10% = flytta kommat ett steg: ${ans}.`,
    15: `10% = ${ten}, 5% = ${ten / 2}, ihop = ${ans}.`,
    20: `10% = ${ten}, dubbla = ${ans}.`,
    25: `25% = en fjärdedel: ${base} / 4 = ${ans}.`,
    30: `10% = ${ten}, gånger 3 = ${ans}.`,
    40: `10% = ${ten}, gånger 4 = ${ans}.`,
    50: `50% = hälften: ${ans}.`,
    75: `25% = ${base / 4}, gånger 3 = ${ans}.`,
  };
  return { text: `${p}% av ${base}`, answer: ans, hint: hints[p] };
}

function divExtra() {
  const b = rand(3, 9), q = rand(14, 99), a = b * q;
  const big = Math.floor(q / 10) * 10 * b;
  return {
    text: `${a} / ${b}`,
    answer: q,
    hint: `Dela upp ${a} = ${big} + ${a - big}: ${big}/${b} = ${big / b}, ${a - big}/${b} = ${(a - big) / b}, ihop = ${q}.`,
  };
}

const LEVELS = [
  {
    id: 'enkel', name: 'Enkel', color: 'var(--l1)',
    desc: 'Plus och minus upp till 20',
    make: () => pick([addSmall, subSmall])(),
  },
  {
    id: 'medel', name: 'Medel', color: 'var(--l2)',
    desc: 'Plus och minus upp till 100, gångertabellen',
    make: () => pick([addMedium, subMedium, tables, tables])(),
  },
  {
    id: 'svar', name: 'Svår', color: 'var(--l3)',
    desc: 'Tresiffriga tal, gånger och delat',
    make: () => pick([addHard, subHard, multHard, divHard])(),
  },
  {
    id: 'extra', name: 'Extra svår', color: 'var(--l4)',
    desc: 'Tvåsiffrigt gånger tvåsiffrigt, kvadrater, procent',
    make: () => pick([multExtra, square, percent, divExtra])(),
  },
];

// ---------- Rekord (sparas i webbläsaren) ----------

function loadBest(id) {
  try {
    return JSON.parse(localStorage.getItem('best-' + id));
  } catch {
    return null;
  }
}

function saveBest(id, result) {
  const old = loadBest(id);
  const better = !old || result.correct > old.correct ||
    (result.correct === old.correct && result.time < old.time);
  if (better) {
    try { localStorage.setItem('best-' + id, JSON.stringify(result)); } catch {}
  }
  return better;
}

// ---------- Spelet ----------

const $ = id => document.getElementById(id);
let state = null;
let timerId = null;

function show(screen) {
  for (const s of ['start', 'game', 'result']) $(s).hidden = s !== screen;
}

function renderLevels() {
  $('levels').innerHTML = '';
  for (const level of LEVELS) {
    const best = loadBest(level.id);
    const btn = document.createElement('button');
    btn.className = 'level';
    btn.style.setProperty('--c', level.color);
    btn.innerHTML = `<strong>${level.name}</strong><span>${level.desc}</span>` +
      `<span class="best">${best ? `Rekord: ${best.correct}/${ROUND_LENGTH} på ${best.time} s` : 'Inget rekord än'}</span>`;
    btn.addEventListener('click', () => startRound(level));
    $('levels').appendChild(btn);
  }
}

function startRound(level) {
  state = { level, index: 0, correct: 0, streak: 0, start: Date.now(), waiting: false };
  document.body.style.setProperty('--c', level.color);
  $('level-name').textContent = level.name;
  show('game');
  clearInterval(timerId);
  timerId = setInterval(() => {
    $('timer').textContent = Math.round((Date.now() - state.start) / 1000) + ' s';
  }, 250);
  nextQuestion();
}

function nextQuestion() {
  if (state.index >= ROUND_LENGTH) return finishRound();
  let q;
  do { q = state.level.make(); } while (state.current && q.text === state.current.text);
  state.current = q;
  state.waiting = false;
  $('counter').textContent = `Tal ${state.index + 1} av ${ROUND_LENGTH}`;
  $('progress-bar').style.width = (state.index / ROUND_LENGTH) * 100 + '%';
  $('question').textContent = q.text + ' =';
  $('feedback').hidden = true;
  $('answer').value = '';
  $('answer').disabled = false;
  $('submit').disabled = false;
  $('answer').focus();
}

function submitAnswer(e) {
  e.preventDefault();
  if (state.waiting) return nextQuestion();
  const raw = $('answer').value.trim();
  if (raw === '') return;
  const q = state.current;
  const ok = Number(raw) === q.answer;
  state.index++;
  state.waiting = true;
  $('answer').disabled = true;
  $('submit').disabled = true;
  const fb = $('feedback');
  fb.hidden = false;

  if (ok) {
    state.correct++;
    state.streak++;
    fb.className = 'feedback right';
    fb.textContent = pick(['Rätt!', 'Snyggt!', 'Grymt!', 'Klockrent!', 'Perfekt!']);
    setTimeout(() => { if (state && state.waiting) nextQuestion(); }, 700);
  } else {
    state.streak = 0;
    fb.className = 'feedback wrong';
    fb.innerHTML = `<strong>Fel.</strong> ${q.text} = <b>${q.answer}</b>` +
      `<p class="hint">💡 ${q.hint}</p>` +
      `<button class="next" id="next">Nästa →</button>`;
    $('next').addEventListener('click', nextQuestion);
    $('next').focus();
  }
  $('streak').textContent = state.streak >= 3 ? `🔥 ${state.streak} rätt i rad` : '';
  $('progress-bar').style.width = (state.index / ROUND_LENGTH) * 100 + '%';
}

function finishRound() {
  clearInterval(timerId);
  const time = Math.round((Date.now() - state.start) / 1000);
  const result = { correct: state.correct, time };
  const newBest = saveBest(state.level.id, result);
  const c = state.correct;
  $('result-title').textContent =
    c === ROUND_LENGTH ? 'Alla rätt! 🏆' : c >= 7 ? 'Bra jobbat!' : c >= 4 ? 'Inte illa!' : 'Öva lite till!';
  $('result-score').textContent = `${c} / ${ROUND_LENGTH}`;
  $('result-time').textContent = `Tid: ${time} sekunder`;
  const best = loadBest(state.level.id);
  $('result-best').textContent = newBest
    ? 'Nytt rekord på den här nivån!'
    : `Rekord: ${best.correct}/${ROUND_LENGTH} på ${best.time} s`;
  $('streak').textContent = '';
  show('result');
  $('again').focus();
}

$('answer-form').addEventListener('submit', submitAnswer);
$('again').addEventListener('click', () => startRound(state.level));
$('back').addEventListener('click', () => { renderLevels(); show('start'); });
$('quit').addEventListener('click', () => {
  clearInterval(timerId);
  renderLevels();
  show('start');
});
// Enter går vidare till nästa tal när ett fel visas.
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && state && state.waiting && !$('game').hidden && e.target.id !== 'next') {
    e.preventDefault();
    nextQuestion();
  }
});

renderLevels();
