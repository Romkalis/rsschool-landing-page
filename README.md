# RS School Landing Page

Окружение на Vite для разработки на чистом HTML + JS + SCSS с оптимизацией графики.

## Требования

- Node.js 20.19+ (или 22.12+)
- npm

## Запуск

```bash
npm install       # установка зависимостей
npm run dev       # dev-сервер с HMR (http://localhost:5173)
npm run build     # production-сборка в папку dist/
npm run preview   # локальный просмотр собранной версии
```

## Структура

```
src/
  index.html          # точка входа (дополнительные страницы кладите рядом)
  js/main.js          # JS, импортирует стили
  scss/main.scss      # стили (partials: _variables.scss и т.д.)
  assets/images/      # изображения (оптимизируются при сборке)
public/               # файлы, копируемые как есть (favicon, robots.txt)
dist/                 # результат сборки
```

## Оптимизация графики

Плагин `vite-plugin-image-optimizer` (sharp + svgo) сжимает PNG/JPG/WebP/AVIF/SVG
при `npm run build`. Качество настраивается в [vite.config.js](vite.config.js).

Подключайте изображения из `src/assets/images/`:

```html
<img src="./assets/images/photo.jpg" alt="..." />
```

В SCSS: `background: url('../assets/images/bg.png');`

Файлы из `public/` не оптимизируются.

## Сборка

Минификация JS/CSS, хеширование имён файлов, относительные пути (`base: './'`) —
`dist/` можно выкладывать на любой статический хостинг (в т.ч. GitHub Pages).
