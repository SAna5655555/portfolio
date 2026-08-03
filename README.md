# Портфолио — Сайт-портфолио разработчика

Атмосферный сайт-портфолио с плавающими иконками проектов, модальными окнами, тёмной/светлой темой и кастомным курсором.

## Стек

- Vite + React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion
- react-markdown + remark-gfm
- lucide-react

## Быстрый старт

```bash
npm install
npm run dev
```

Сайт будет доступен на `http://localhost:5173/сайт-портфолио/`.

## Сборка для деплоя

```bash
npm run build
```

Готовая статика в папке `dist/`.

## Деплой на GitHub Pages

### Способ 1: GitHub Actions (рекомендуется)

Создай файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

### Способ 2: Вручную

```bash
npm run build
# Переключись на ветку gh-pages, скопируй содержимое dist/ и запушь
```

## Как добавить новый проект

1. Создай папку в `public/projects/название-проекта/`:
   - `cover.jpg` — обложка
   - `1.jpg`, `2.jpg`, ... — скриншоты для галереи
   - `content.md` — описание проекта в Markdown

2. Добавь объект в `src/data/projects.ts`:

```ts
{
  id: "my-new-project",
  title: "Название проекта",
  shortTitle: "Короткое название",
  description: "Краткое описание",
  cover: "/projects/my-new-project/cover.jpg",
  images: [
    "/projects/my-new-project/1.jpg",
    "/projects/my-new-project/2.jpg",
  ],
  contentPath: "/projects/my-new-project/content.md",
  stack: ["React", "Node.js", "PostgreSQL"],
  links: [
    { label: "GitHub", url: "https://github.com/..." },
    { label: "Demo", url: "https://..." },
  ],
  result: "Ключевые результаты проекта",
}
```

3. Готово. Сайт автоматически подхватит новый проект.

## Настройка `base` для GitHub Pages

В файле `vite.config.ts` измени `REPO_NAME` на название твоего репозитория:

```ts
const REPO_NAME = 'имя-твоего-репозитория'
```

## Команды

| Команда           | Описание                     |
| ----------------- | ---------------------------- |
| `npm run dev`     | Запуск dev-сервера           |
| `npm run build`   | Сборка для продакшна         |
| `npm run preview` | Превью собранного сайта      |
| `npm run lint`    | Проверка кода (oxlint)       |