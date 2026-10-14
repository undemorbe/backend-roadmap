(function () {
  "use strict";
  const { lines, modules, labs } = window.ROADMAP;
  const app = document.getElementById("app");
  const KEY = "backend-roadmap-progress-v2";

  // ---------- прогресс ----------
  let P = { modules: {}, practice: {}, labs: {}, labRepo: {}, quiz: {} };
  try { const raw = localStorage.getItem(KEY); if (raw) P = Object.assign(P, JSON.parse(raw)); } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) {} }

  const modIndex = Object.fromEntries(modules.map((m, i) => [m.id, i]));
  const labById = Object.fromEntries(labs.map(l => [l.id, l]));
  const labsAfter = id => labs.filter(l => l.after === id);
  const totalWeeks = modules.reduce((s, m) => s + m.weeks, 0) + labs.reduce((s, l) => s + l.weeks, 0);
  const labNum = id => id.replace("l", "");
  const fmtWeeks = w => {
    const n = String(w).replace(".", ",");
    const last = Math.floor(w) % 10, two = Math.floor(w) % 100;
    if (w % 1) return n + " недели";
    if (last === 1 && two !== 11) return n + " неделя";
    if (last >= 2 && last <= 4 && (two < 12 || two > 14)) return n + " недели";
    return n + " недель";
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function percent() {
    const total = modules.length + labs.length;
    const done = modules.filter(m => P.modules[m.id]).length + labs.filter(l => P.labs[l.id]).length;
    return Math.round((done / total) * 100);
  }

  // ---------- карта ----------
  const MAP = window.ROADMAP.map;
  function badge(x, y, anchor, line) {
    const l = lines[line], w = l.name.length * 8.2 + 22;
    const bx = anchor === "end" ? x - w : anchor === "middle" ? x - w / 2 : x;
    return `<g class="badge"><rect x="${bx}" y="${y - 13}" width="${w}" height="26" rx="13" fill="${l.color}"/>
      <text x="${bx + w / 2}" y="${y}">${esc(l.name)}</text></g>`;
  }
  function mapSVG() {
    const S = MAP.stations, ring = MAP.ring;
    const pt = p => (typeof p === "string" ? [S[p].x, S[p].y] : p);
    // какие станции стоят на чужих ветках — это пересадки
    const foreign = {};
    MAP.paths.forEach(path => path.pts.forEach(p => {
      if (typeof p === "string" && modules.find(m => m.id === p).line !== path.line) foreign[p] = path.line;
    }));
    Object.entries(S).forEach(([id, s]) => { if (s.ring && modules.find(m => m.id === id).line !== ring.line) foreign[id] = ring.line; });
    modules.forEach(m => { if (m.line === ring.line) { const other = MAP.paths.find(p => p.pts[0] === m.id); if (other) foreign[m.id] = other.line; } });

    let segs = `<circle class="seg ring" cx="${ring.cx}" cy="${ring.cy}" r="${ring.r}" stroke="${lines[ring.line].color}"/>`;
    let badges = badge(...MAP.ringBadge.slice(0, 2), MAP.ringBadge[2], ring.line);
    MAP.paths.forEach(path => {
      const d = path.pts.map((p, i) => (i ? "L" : "M") + pt(p).join(" ")).join(" ");
      segs += `<path class="seg" d="${d}" stroke="${lines[path.line].color}" stroke-linejoin="round"/>`;
      if (path.badge) badges += badge(path.badge[0], path.badge[1], path.badge[2], path.line);
    });
    const next = modules.find(m => !P.modules[m.id]);
    let st = "", lb = "";
    modules.forEach((m, i) => {
      const s = S[m.id], c = lines[m.line].color, done = P.modules[m.id] ? " done" : "";
      const xc = foreign[m.id] ? `<circle class="xfer" cx="${s.x}" cy="${s.y}" r="22" stroke="${lines[foreign[m.id]].color}"/>` : "";
      const pulse = next && next.id === m.id ? `<circle class="pulse" cx="${s.x}" cy="${s.y}" r="16" stroke="${c}"/>` : "";
      st += `<a href="#/m/${m.id}" aria-label="Станция ${i + 1}: ${esc(m.title)}${done ? ", пройдена" : ""}">
        <g class="st${done}" style="--c:${c}">${pulse}${xc}
          <circle class="dot" cx="${s.x}" cy="${s.y}" r="15" stroke="${c}"/>
          <text class="num" x="${s.x}" y="${s.y}">${i + 1}</text>
          <text class="lbl" text-anchor="${s.la}" x="${s.x + s.lx}" y="${s.y + s.ly - (s.ly < 0 ? 16 : 0)}">${esc(m.short)}</text>
          <text class="wk" text-anchor="${s.la}" x="${s.x + s.lx}" y="${s.y + s.ly + (s.ly < 0 ? 0 : 18)}">${fmtWeeks(m.weeks)}</text>
        </g></a>`;
      labsAfter(m.id).forEach((l, k) => {
        const x = s.x + (s.lab !== undefined ? s.lab : 20) + k * 40, y = s.y - 46;
        lb += `<a href="#/lab/${l.id}" aria-label="Лабораторная ${labNum(l.id)}: ${esc(l.title)}">
          <g class="lab${P.labs[l.id] ? " done" : ""}"><rect x="${x}" y="${y}" width="36" height="22" rx="6"/>
          <text x="${x + 18}" y="${y + 11}">Л${labNum(l.id)}</text></g></a>`;
      });
    });
    return `<svg class="map" viewBox="0 0 1260 790" role="img" aria-label="Схема маршрута обучения в виде карты метро">${segs}${badges}${lb}${st}</svg>`;
  }

  // ---------- страницы ----------
  function home() {
    const pct = percent();
    const legend = Object.entries(lines).map(([k, l]) => `<span style="--c:${l.color}"><i></i>${l.name}</span>`).join("") +
      `<span><b>Л</b>лабораторная</span>`;
    const route = (from, to) => modules.slice(from, to).map((m, j) => {
      const i = from + j;
      return `<li class="${P.modules[m.id] ? "done" : ""}" style="--c:${lines[m.line].color}">
        <span class="dot">${i + 1}</span><a href="#/m/${m.id}">${esc(m.title)}</a><small>${fmtWeeks(m.weeks)}</small></li>`;
    }).join("");
    const months = Math.round(totalWeeks / 4.3);
    app.innerHTML = `
      <section class="hero">
        <div class="hero-row">
          <div>
            <h1>Маршрут бэкенд-разработчика на Go</h1>
            <p>${modules.length} станций теории и ${labs.length} лабораторных: от терминала и SQL до Kafka, микросервисов и system design. Примерно ${months} месяцев при 12–15 часах в неделю.</p>
          </div>
          <div class="progress-box" aria-label="Прогресс">
            <strong>${pct}%</strong><span>маршрута пройдено</span>
            <div class="bar"><i style="width:${pct}%"></i></div>
          </div>
        </div>
      </section>
      <div class="map-wrap">${mapSVG()}</div>
      <div class="legend">${legend}</div>
      <div class="cols">
        <div><h2>Станции</h2><ol class="route">${route(0, 10)}</ol></div>
        <div><h2>&nbsp;</h2><ol class="route" start="11">${route(10, modules.length)}</ol></div>
      </div>`;
  }

  function moduleView(id) {
    const i = modIndex[id];
    if (i === undefined) return notFound();
    const m = modules[i], line = lines[m.line];
    const prev = modules[i - 1], next = modules[i + 1];
    const topics = m.topics.map(t => `<h3>${t.h}</h3><ul>${t.items.map(x => `<li>${x}</li>`).join("")}</ul>`).join("");
    const practice = m.practice.map((p, k) => {
      const key = m.id + ":" + k;
      return `<li><label><input type="checkbox" data-pr="${key}" ${P.practice[key] ? "checked" : ""}><span>${p}</span></label></li>`;
    }).join("");
    const res = m.resources.map(r => `<li><a href="${r.u}" target="_blank" rel="noopener">${esc(r.t)}</a></li>`).join("");
    const kindName = { video: "Видео", playlist: "Плейлист", channel: "Канал", search: "Подборка" };
    const vids = (m.videos || []).slice().sort((a, b) => (a.lang === "ru" ? 0 : 1) - (b.lang === "ru" ? 0 : 1)).map(v =>
      `<li><a href="${v.u}" target="_blank" rel="noopener"><span class="vk">${kindName[v.kind]}<i>${v.lang === "ru" ? "RU" : "EN"}</i></span><span class="vt">${esc(v.t)}</span></a></li>`).join("");
    const ml = labsAfter(m.id);
    const labsHtml = ml.length ? `<section><h2>Лабораторные после этой станции</h2><ul>${ml.map(l =>
      `<li><a href="#/lab/${l.id}">Лабораторная ${labNum(l.id)}: ${esc(l.title)}</a></li>`).join("")}</ul></section>` : "";
    const best = P.quiz[m.id];
    app.innerHTML = `
      <article class="module narrow" style="--line:${line.color}">
        <p class="crumb"><a href="#/">Карта</a>, станция ${i + 1} из ${modules.length}, ветка «${line.name}»</p>
        <h1>${esc(m.title)}</h1>
        <p class="goal">${m.goal}</p>
        <p class="meta">Примерно ${fmtWeeks(m.weeks)}${best !== undefined ? `. Лучший результат теста: ${best}%` : ""}</p>
        <section><h2>Что изучить</h2>${topics}</section>
        <section><h2>Практика</h2><ul class="checks">${practice}</ul></section>
        <section class="res"><h2>Материалы</h2><ul>${res}</ul></section>
        ${vids ? `<section><h2>Видео</h2><p class="meta" style="margin-bottom:12px">«Подборка» открывает поиск YouTube по точному запросу: выбирай свежее видео с хорошими отзывами.</p><ul class="vids">${vids}</ul></section>` : ""}
        ${labsHtml}
        <section><h2>Тест по теории</h2><p class="meta" style="margin-bottom:0">Ответ и объяснение появляются сразу после выбора.</p><div id="quiz"></div></section>
        <div class="row" style="margin-top:40px">
          <button class="btn ${P.modules[m.id] ? "done" : ""}" id="markDone">${P.modules[m.id] ? "Станция пройдена" : "Отметить станцию пройденной"}</button>
        </div>
        <nav class="pager" aria-label="Соседние станции">
          ${prev ? `<a href="#/m/${prev.id}">Назад<b>${esc(prev.title)}</b></a>` : "<span></span>"}
          ${next ? `<a href="#/m/${next.id}" style="text-align:right">Дальше<b>${esc(next.title)}</b></a>` : `<a href="#/labs" style="text-align:right">Дальше<b>Финальный проект</b></a>`}
        </nav>
      </article>`;
    app.querySelectorAll("[data-pr]").forEach(cb => cb.addEventListener("change", () => {
      P.practice[cb.dataset.pr] = cb.checked; save();
    }));
    document.getElementById("markDone").addEventListener("click", e => {
      P.modules[m.id] = !P.modules[m.id]; save();
      e.target.classList.toggle("done", !!P.modules[m.id]);
      e.target.textContent = P.modules[m.id] ? "Станция пройдена" : "Отметить станцию пройденной";
    });
    renderQuiz(document.getElementById("quiz"), m.quiz, score => {
      if (P.quiz[m.id] === undefined || score > P.quiz[m.id]) { P.quiz[m.id] = score; save(); }
    });
  }

  function renderQuiz(root, questions, onDone) {
    let answered = 0, right = 0;
    root.innerHTML = `<div class="quiz">${questions.map((q, qi) => `
      <div class="q" data-q="${qi}">
        <p class="q-text">${q.from ? `<span class="q-from">${esc(q.from)}</span>` : ""}${q.q}</p>
        <div class="opts">${q.o.map((o, oi) => `<button class="opt" data-o="${oi}">${o}</button>`).join("")}</div>
        <p class="why" hidden></p>
      </div>`).join("")}</div><div class="score" hidden></div>`;
    root.querySelectorAll(".q").forEach(qEl => {
      const q = questions[+qEl.dataset.q];
      qEl.querySelectorAll(".opt").forEach(btn => btn.addEventListener("click", () => {
        const chosen = +btn.dataset.o, ok = chosen === q.a;
        qEl.querySelectorAll(".opt").forEach((b, k) => {
          b.disabled = true;
          if (k === q.a) b.classList.add("right");
          else if (k === chosen) b.classList.add("wrong");
        });
        const why = qEl.querySelector(".why");
        why.innerHTML = `<b>${ok ? "Верно." : "Неверно."}</b> ${q.why}`;
        why.hidden = false;
        answered++; if (ok) right++;
        if (answered === questions.length) {
          const pct = Math.round((right / questions.length) * 100);
          const s = root.querySelector(".score");
          s.hidden = false;
          s.innerHTML = `<strong>${right} из ${questions.length}</strong> (${pct}%). ${pct >= 80 ? "Можно двигаться дальше." : "Вернись к темам с ошибками и пройди тест снова."}
            <div class="row" style="margin-top:12px"><button class="btn ghost" id="retry">Пройти заново</button></div>`;
          s.querySelector("#retry").addEventListener("click", () => renderQuiz(root, questions, onDone));
          onDone && onDone(pct);
        }
      }));
    });
  }

  function labsView() {
    app.innerHTML = `
      <div class="narrow">
        <h1 class="hero-h" style="font-size:clamp(32px,4.6vw,48px);letter-spacing:-.02em;line-height:1.08;margin:0 0 16px">Лабораторные</h1>
        <p class="goal">Каждая лабораторная — отдельный репозиторий в твоём GitHub. Монолит, микросервисы и real-time по очереди, а последние работы надстраиваются над предыдущими.</p>
        <ul class="lab-list">${labs.map(l => `
          <li class="${P.labs[l.id] ? "done" : ""}">
            <span class="lab-tag">Л${labNum(l.id)}</span>
            <div><h3><a href="#/lab/${l.id}">${esc(l.title)}</a></h3>
            <p>${esc(l.kind)}, примерно ${fmtWeeks(l.weeks)}. Открывается после станции «${esc(modules[modIndex[l.after]].title)}».</p></div>
          </li>`).join("")}</ul>
      </div>`;
  }

  function labView(id) {
    const l = labById[id];
    if (!l) return notFound();
    const i = labs.indexOf(l), prev = labs[i - 1], next = labs[i + 1];
    const after = modules[modIndex[l.after]];
    const list = arr => `<ul>${arr.map(x => `<li>${x}</li>`).join("")}</ul>`;
    app.innerHTML = `
      <article class="module lab-page narrow">
        <p class="crumb"><a href="#/labs">Лабораторные</a>, после станции «<a href="#/m/${after.id}">${esc(after.title)}</a>»</p>
        <h1>Лабораторная ${labNum(l.id)}. ${esc(l.title)}</h1>
        <p class="goal">${l.goal}</p>
        <p class="meta">${esc(l.kind)}, примерно ${fmtWeeks(l.weeks)}</p>
        <section><h2>Стек</h2><ul class="stack">${l.stack.map(s => `<li>${esc(s)}</li>`).join("")}</ul></section>
        <section><h2>Требования</h2>${list(l.requirements)}</section>
        <section><h2>Этапы</h2><ol>${l.milestones.map(x => `<li>${x}</li>`).join("")}</ol></section>
        ${l.tree ? `<section><h2>Структура проекта</h2><pre>${esc(l.tree)}</pre></section>` : ""}
        <section><h2>Критерии приёмки</h2><ul class="checks">${l.acceptance.map((a, k) => {
          const key = l.id + ":acc:" + k;
          return `<li><label><input type="checkbox" data-pr="${key}" ${P.practice[key] ? "checked" : ""}><span>${a}</span></label></li>`;
        }).join("")}</ul></section>
        <section><h2>Со звёздочкой</h2>${list(l.stars)}</section>
        <section><h2>Твой репозиторий</h2>
          <p class="meta" style="margin-bottom:12px">Сохрани ссылку, чтобы потом собрать портфолио.</p>
          <div class="row"><input type="url" id="repo" placeholder="https://github.com/undemorbe/..." value="${esc(P.labRepo[l.id] || "")}" aria-label="Ссылка на репозиторий">
          ${P.labRepo[l.id] ? `<a href="${esc(P.labRepo[l.id])}" target="_blank" rel="noopener">Открыть</a>` : ""}</div>
        </section>
        <div class="row" style="margin-top:40px">
          <button class="btn ${P.labs[l.id] ? "done" : ""}" id="markDone">${P.labs[l.id] ? "Лабораторная сдана" : "Отметить лабораторную сданной"}</button>
        </div>
        <nav class="pager">
          ${prev ? `<a href="#/lab/${prev.id}">Назад<b>Л${labNum(prev.id)}. ${esc(prev.title)}</b></a>` : "<span></span>"}
          ${next ? `<a href="#/lab/${next.id}" style="text-align:right">Дальше<b>Л${labNum(next.id)}. ${esc(next.title)}</b></a>` : ""}
        </nav>
      </article>`;
    app.querySelectorAll("[data-pr]").forEach(cb => cb.addEventListener("change", () => { P.practice[cb.dataset.pr] = cb.checked; save(); }));
    document.getElementById("repo").addEventListener("change", e => { P.labRepo[l.id] = e.target.value.trim(); save(); });
    document.getElementById("markDone").addEventListener("click", e => {
      P.labs[l.id] = !P.labs[l.id]; save();
      e.target.classList.toggle("done", !!P.labs[l.id]);
      e.target.textContent = P.labs[l.id] ? "Лабораторная сдана" : "Отметить лабораторную сданной";
    });
  }

  function examView() {
    const pool = [];
    modules.forEach(m => m.quiz.forEach(q => pool.push(Object.assign({ from: m.title }, q))));
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    const qs = pool.slice(0, 20);
    app.innerHTML = `
      <div class="narrow">
        <h1 style="font-size:clamp(32px,4.6vw,48px);letter-spacing:-.02em;line-height:1.08;margin:0 0 16px">Экзамен</h1>
        <p class="goal">20 случайных вопросов из всех ${pool.length}. Проходи раз в пару недель, чтобы старое не забывалось. Лучший результат: ${P.quiz.__exam !== undefined ? P.quiz.__exam + "%" : "пока нет"}.</p>
        <div class="row"><button class="btn ghost" id="reshuffle">Другие вопросы</button></div>
        <div id="quiz"></div>
      </div>`;
    document.getElementById("reshuffle").addEventListener("click", examView);
    renderQuiz(document.getElementById("quiz"), qs, pct => {
      if (P.quiz.__exam === undefined || pct > P.quiz.__exam) { P.quiz.__exam = pct; save(); }
    });
  }

  function guideView() {
    app.innerHTML = `
      <div class="narrow prose">
        <h1 style="font-size:clamp(32px,4.6vw,48px);letter-spacing:-.02em;line-height:1.08;margin:0 0 16px">Как заниматься</h1>
        <p class="goal">Маршрут рассчитан на 12–15 часов в неделю параллельно с учёбой. Если времени меньше, растягивай сроки, но не перескакивай станции: каждая опирается на предыдущие.</p>
        <h2 style="margin-top:40px">Ритм недели</h2>
        <ol>
          <li>Два-три вечера на теорию: читай материалы станции и сразу пиши код к каждой теме.</li>
          <li>Один длинный слот на практику и лабораторную.</li>
          <li>В конце станции пройди тест. Меньше 80% — повтори темы с ошибками.</li>
          <li>Раз в две недели — экзамен по всем пройденным вопросам.</li>
        </ol>
        <h2 style="margin-top:40px">Правила</h2>
        <ul>
          <li>Пиши тесты с первого дня, а не «потом».</li>
          <li>Каждая лабораторная — публичный репозиторий с README: что сделано, как запустить, схема архитектуры, цифры нагрузочных тестов.</li>
          <li>Не копируй решения. Застрял на час — читай документацию, на два — ищи пример, разбирай и пиши сам.</li>
          <li>Веди заметки по каждой станции в папке <code>notes/</code> этого репозитория. Объяснить тему своими словами — лучшая проверка понимания.</li>
          <li>Отдавай код на ревью: другу, в сообщество или ИИ-ревьюеру, и разбирай каждое замечание.</li>
        </ul>
        <h2 style="margin-top:40px">Что уже есть у тебя</h2>
        <p>Коммерческий опыт во Flutter напрямую помогает: ты знаешь, каким клиенту нужен API, и уже применял Clean Architecture. В лабораторных 3, 7 и 11 есть задания со звёздочкой с Flutter-клиентом — получится фулстек-портфолио.</p>
        <h2 style="margin-top:40px">Прогресс</h2>
        <p>Прогресс хранится в этом браузере. Чтобы перенести его на другое устройство, выгрузи файл и загрузи там.</p>
        <div class="row">
          <button class="btn ghost" id="exp">Выгрузить прогресс</button>
          <label class="btn ghost" style="display:inline-block">Загрузить прогресс<input type="file" id="imp" accept="application/json" hidden></label>
          <button class="btn ghost" id="reset">Сбросить прогресс</button>
        </div>
        <p class="meta" id="pmsg"></p>
      </div>`;
    const msg = t => (document.getElementById("pmsg").textContent = t);
    document.getElementById("exp").addEventListener("click", () => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([JSON.stringify(P, null, 2)], { type: "application/json" }));
      a.download = "backend-roadmap-progress.json"; a.click();
      msg("Файл прогресса выгружен.");
    });
    document.getElementById("imp").addEventListener("change", async e => {
      const f = e.target.files[0]; if (!f) return;
      try { P = Object.assign({ modules: {}, practice: {}, labs: {}, labRepo: {}, quiz: {} }, JSON.parse(await f.text())); save(); msg("Прогресс загружен."); }
      catch (err) { msg("Не удалось прочитать файл. Нужен JSON, выгруженный с этой страницы."); }
    });
    document.getElementById("reset").addEventListener("click", () => {
      if (!confirm("Сбросить весь прогресс? Это нельзя отменить.")) return;
      P = { modules: {}, practice: {}, labs: {}, labRepo: {}, quiz: {} }; save(); msg("Прогресс сброшен.");
    });
  }

  function notFound() {
    app.innerHTML = `<div class="narrow"><h1>Такой страницы нет</h1><p><a href="#/">Вернуться на карту</a></p></div>`;
  }

  // ---------- роутер ----------
  function route() {
    const h = location.hash.replace(/^#\/?/, "");
    const [a, b] = h.split("/");
    document.querySelectorAll(".nav a").forEach(n => n.removeAttribute("aria-current"));
    const cur = { "": "map", m: "map", labs: "labs", lab: "labs", exam: "exam", guide: "guide" }[a || ""];
    const navEl = document.querySelector(`.nav a[data-nav="${cur}"]`);
    if (navEl) navEl.setAttribute("aria-current", "page");
    if (!a) home();
    else if (a === "m") moduleView(b);
    else if (a === "labs") labsView();
    else if (a === "lab") labView(b);
    else if (a === "exam") examView();
    else if (a === "guide") guideView();
    else notFound();
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  route();
})();
