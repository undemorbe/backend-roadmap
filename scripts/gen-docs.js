// Генерирует markdown-версии лабораторных и таблицу маршрута для README из data/*.js.
// Запуск: node scripts/gen-docs.js
const fs = require("fs"), path = require("path");
global.window = {};
require("../data/modules.js"); require("../data/labs.js");
const { modules, labs, lines } = window.ROADMAP;
const md = s => s.replace(/<code>(.*?)<\/code>/g, "`$1`").replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const root = path.join(__dirname, "..");
const pad = id => id.slice(1).padStart(2, "0");

labs.forEach(l => {
  const dir = path.join(root, "labs", `lab-${pad(l.id)}`);
  fs.mkdirSync(dir, { recursive: true });
  const after = modules.find(m => m.id === l.after);
  const out = [
    `# Лабораторная ${l.id.slice(1)}. ${l.title}`, "",
    `${l.kind}, примерно ${String(l.weeks).replace(".", ",")} нед. Открывается после станции «${after.title}».`, "",
    md(l.goal), "",
    "## Стек", "", l.stack.map(s => `- ${s}`).join("\n"), "",
    "## Требования", "", l.requirements.map(s => `- ${md(s)}`).join("\n"), "",
    "## Этапы", "", l.milestones.map((s, i) => `${i + 1}. ${md(s)}`).join("\n"), "",
    l.tree ? "## Структура проекта\n\n```\n" + l.tree + "\n```\n" : "",
    "## Критерии приёмки", "", l.acceptance.map(s => `- [ ] ${md(s)}`).join("\n"), "",
    "## Со звёздочкой", "", l.stars.map(s => `- ${md(s)}`).join("\n"), "",
    "## Мой репозиторий", "", "_Вставь ссылку, когда начнёшь._", ""
  ].join("\n");
  fs.writeFileSync(path.join(dir, "README.md"), out);
});

const table = ["| # | Станция | Ветка | Срок | Лабораторные |", "|---|---|---|---|---|"]
  .concat(modules.map((m, i) => {
    const ls = labs.filter(l => l.after === m.id).map(l => `[Л${l.id.slice(1)}](labs/lab-${pad(l.id)})`).join(", ");
    return `| ${i + 1} | ${m.title} | ${lines[m.line].name} | ${String(m.weeks).replace(".", ",")} нед. | ${ls} |`;
  })).join("\n");
const readme = path.join(root, "README.md");
const src = fs.readFileSync(readme, "utf8");
fs.writeFileSync(readme, src.replace(/<!-- route -->[\s\S]*<!-- \/route -->/, `<!-- route -->\n${table}\n<!-- /route -->`));
console.log("labs:", labs.length, "README table updated");
