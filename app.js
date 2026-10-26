// Tema terang/gelap + menampilkan aplikasi. Semua logika belajar ada di daily.js.
(function () {
  'use strict';
  const KEY = 'ml_hub_theme';
  let theme = localStorage.getItem(KEY) || 'light';
  const apply = () => document.documentElement.setAttribute('data-theme', theme);
  apply();
  document.getElementById('app').style.display = 'flex';
  // Toggle Tema
  document.getElementById('toggleTheme').addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(KEY, theme);
    apply();
    window.dispatchEvent(new Event('themechange'));
  });

  // Toggle Sidebar Kiri (Sembunyikan / Munculkan menu kurikulum)
  const sb = document.getElementById('sidebar');
  const toggleSb = document.getElementById('toggleSidebar');
  const sbTab = document.getElementById('sidebarTab');
  const SB_KEY = 'ml_sidebar_closed';

  const updateSidebar = (closed) => {
    if (!sb) return;
    sb.classList.toggle('closed', closed);
    if (sbTab) sbTab.style.display = closed ? 'flex' : 'none';
    localStorage.setItem(SB_KEY, closed ? '1' : '0');
  };

  const initialSbClosed = localStorage.getItem(SB_KEY) === '1';
  if (initialSbClosed) updateSidebar(true);

  if (toggleSb) toggleSb.addEventListener('click', () => updateSidebar(true));
  if (sbTab) sbTab.addEventListener('click', () => updateSidebar(false));
})();
