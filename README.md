# rsschool-landing-page
vanilla project rsschool

## Запуск
```bash
npm install       # установка зависимостей
npm run dev       # dev-сервер с HMR (http://localhost:5173)
npm run build     # production-сборка в папку dist/
npm run preview   # локальный просмотр собранной версии
```
## Оптимизация графики
При `npm run build` все `jpg` и `png` конвертируются в `webp` (качество 80), ссылки в HTML и CSS обновляются автоматически. SVG оптимизируются через svgo. Конвертацию выполняет плагин [plugins/convert-to-webp.js](plugins/convert-to-webp.js), в dev-режиме исходные файлы остаются как есть.

## Деплой
Сайт публикуется на GitHub Pages из ветки `gh-pages`:
```bash
npm run deploy    # собирает проект и публикует dist/ в ветку gh-pages
```
В настройках репозитория: Settings → Pages → Source: Deploy from a branch → `gh-pages` / `/ (root)`.
