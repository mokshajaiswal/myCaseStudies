// Explicit opt-in palettes for alternative case-study concepts only.
(() => {
  const theme = new URLSearchParams(location.search).get('theme');
  const files = {
    'alternative-plum': 'themes/alternative-plum.css',
    'alternative-teal': 'themes/alternative-teal.css',
  };
  if (!Object.hasOwn(files, theme)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL(files[theme], new URL(window.TurboDesignSystemBase, location.href)).href;
  document.head.append(link);
})();
