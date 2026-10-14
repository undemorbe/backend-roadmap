// Схема метро: координаты станций и пути веток (viewBox 1260 x 800).
// Кольцевая — Go. Радиальные ветки уходят от кольца, пересадочные станции стоят на кольце.
// lx/ly — смещение подписи, la — выравнивание (start, middle, end), lab — сдвиг значков лабораторных по x.
window.ROADMAP = window.ROADMAP || {};
window.ROADMAP.map = {
  ring: { cx: 600, cy: 400, r: 180, line: "go" },
  stations: {
    "foundation":     { x: 600, y: 400, lx: 0,   ly: 40,  la: "middle" },
    "go-basics":      { x: 600, y: 220, lx: 0,   ly: -30, la: "middle" },
    "testing":        { x: 444, y: 310, lx: 26,  ly: 40,  la: "start", ring: true },
    "go-concurrency": { x: 756, y: 490, lx: -28, ly: -4,  la: "end" },
    "http-rest":      { x: 756, y: 310, lx: -22, ly: 42,  la: "end", ring: true },
    "sql-postgres":   { x: 600, y: 580, lx: 0,   ly: 76,  la: "middle", ring: true },
    "docker":         { x: 490, y: 690, lx: 0,   ly: 40,  la: "middle" },
    "nginx":          { x: 350, y: 690, lx: 0,   ly: 40,  la: "middle" },
    "architecture":   { x: 900, y: 490, lx: 0,   ly: 40,  la: "middle" },
    "redis":          { x: 710, y: 690, lx: 0,   ly: 40,  la: "middle" },
    "security":       { x: 316, y: 236, lx: -20, ly: 32,  la: "end" },
    "kafka":          { x: 290, y: 490, lx: 0,   ly: 40,  la: "middle" },
    "grpc-realtime":  { x: 902, y: 226, lx: 24,  ly: 6,   la: "start" },
    "mongodb":        { x: 850, y: 690, lx: 0,   ly: 40,  la: "middle" },
    "k8s-cicd":       { x: 210, y: 690, lx: 0,   ly: 40,  la: "middle" },
    "observability":  { x: 188, y: 162, lx: -20, ly: 32,  la: "end" },
    "go-internals":   { x: 444, y: 490, lx: 36,  ly: 8,   la: "start", lab: -58 },
    "system-design":  { x: 1030, y: 490, lx: 0,  ly: 40,  la: "middle" },
    "interview":      { x: 1160, y: 490, lx: 0,  ly: 40,  la: "middle" }
  },
  // Пути веток: последовательность точек. Станции — по id, повороты — координатами.
  paths: [
    { line: "base",    pts: ["foundation", "go-basics"] },
    { line: "quality", pts: ["testing", "security", "observability", [100, 112]], badge: [96, 92, "end"] },
    { line: "web",     pts: ["http-rest", "grpc-realtime", [1010, 164]], badge: [1018, 158, "start"] },
    { line: "data",    pts: ["sql-postgres", "redis", "mongodb", [960, 690]], badge: [972, 690, "start"] },
    { line: "infra",   pts: ["sql-postgres", "docker", "nginx", "k8s-cicd", [160, 690]], badge: [150, 690, "end"] },
    { line: "arch",    pts: ["go-concurrency", "architecture", "system-design", "interview"], badge: [1160, 440, "middle"] },
    { line: "msg",     pts: ["go-internals", "kafka", [200, 490]], badge: [188, 490, "end"] }
  ],
  ringBadge: [780, 232, "start"]
};
