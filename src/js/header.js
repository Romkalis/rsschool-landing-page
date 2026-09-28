const BURGER_QUERY = '(max-width: 768px)';
const THEME_KEY = 'theme';

const header = document.querySelector('.header');
const burger = header.querySelector('.burger');
const menu = header.querySelector('.header__menu');

const setMenuOpen = (isOpen) => {
  header.classList.toggle('header--open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
  burger.setAttribute('aria-expanded', String(isOpen));
  burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
};

burger.addEventListener('click', () => {
  setMenuOpen(burger.getAttribute('aria-expanded') !== 'true');
});

menu.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenuOpen(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenuOpen(false);
});

window.matchMedia(BURGER_QUERY).addEventListener('change', (event) => {
  if (!event.matches) setMenuOpen(false);
});

// Theme switch
const themeButtons = header.querySelectorAll('.theme-switch__button');

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  themeButtons.forEach((button) => {
    const isActive = button.dataset.themeValue === theme;
    button.classList.toggle('theme-switch__button--active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
};

const readSavedTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
};

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(readSavedTheme() ?? (prefersDark ? 'dark' : 'light'));

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const theme = button.dataset.themeValue;
    applyTheme(theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // storage is unavailable, theme just won't persist
    }
  });
});
