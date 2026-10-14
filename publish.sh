#!/usr/bin/env bash
# Создаёт репозиторий в твоём GitHub и включает GitHub Pages.
# Нужен GitHub CLI: https://cli.github.com  (gh auth login перед первым запуском)
set -euo pipefail
REPO="${1:-backend-roadmap}"

command -v gh >/dev/null || { echo "Установи GitHub CLI: https://cli.github.com"; exit 1; }
gh auth status >/dev/null 2>&1 || gh auth login
OWNER="$(gh api user -q .login)"

if [ ! -d .git ]; then
  git init -b main
  git add .
  git commit -m "Маршрут бэкенд-разработчика на Go: сайт, станции, тесты, лабораторные"
fi

gh repo create "$REPO" --public --source=. --remote=origin --push \
  --description "Роадмап и курс бэкенд-разработчика на Go: теория, тесты, лабораторные"

gh api -X POST "repos/$OWNER/$REPO/pages" \
  -f "source[branch]=main" -f "source[path]=/" >/dev/null \
  && echo "GitHub Pages включён." \
  || echo "Pages не включился автоматически: Settings → Pages → Deploy from branch → main / root."

gh repo edit "$OWNER/$REPO" --homepage "https://$OWNER.github.io/$REPO/" >/dev/null || true
echo "Репозиторий: https://github.com/$OWNER/$REPO"
echo "Сайт (появится через 1–2 минуты): https://$OWNER.github.io/$REPO/"
