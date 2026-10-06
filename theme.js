// Run before the stylesheet loads to avoid flashing the wrong theme.
(() => {
  const storageKey = 'basit-theme';
  const validChoices = ['light', 'dark', 'system'];
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let choice = 'system';
  try {
    const saved = localStorage.getItem(storageKey);
    if (validChoices.includes(saved)) choice = saved;
  } catch { /* Appearance still works when storage is unavailable. */ }

  function applyTheme() {
    const theme = choice === 'system' ? (systemTheme.matches ? 'dark' : 'light') : choice;
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.themePreference = choice;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0d0d10' : '#f8f7fa');
    document.querySelectorAll('[data-theme-choice]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.themeChoice === choice));
    });
  }

  applyTheme();
  systemTheme.addEventListener('change', () => { if (choice === 'system') applyTheme(); });
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    document.querySelectorAll('[data-theme-choice]').forEach(button => {
      button.addEventListener('click', () => {
        choice = button.dataset.themeChoice;
        try { localStorage.setItem(storageKey, choice); } catch { /* Use the choice for this visit. */ }
        applyTheme();
      });
    });
  });
  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) {
      choice = validChoices.includes(event.newValue) ? event.newValue : 'system';
      applyTheme();
    }
  });
})();
