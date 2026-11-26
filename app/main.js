// Meridia Statistics — router and page shell. Reads the hash (#/economy and so
// on), renders the matching view into #page, paints its charts, and marks the
// matching nav link as current. No network requests: every page is built from
// the local data.js module.

import { VIEWS, notFoundView } from './views.js';
import { redrawAllCharts } from './charts.js';

const page = document.getElementById('page');
const navLinks = [...document.querySelectorAll('nav a')];

function routeName() {
  const hash = location.hash.replace(/^#\/?/, '').split('?')[0];
  return hash === '' ? 'home' : hash;
}

function render() {
  const name = routeName();
  const view = VIEWS[name];
  if (view) {
    page.innerHTML = view.render();
    document.title = `${view.title} — Meridia Statistics`;
  } else {
    page.innerHTML = notFoundView();
    document.title = 'Page not found — Meridia Statistics';
  }
  navLinks.forEach((a) => {
    a.classList.toggle('active', a.dataset.route === name);
  });
  if (view && view.draw) view.draw();
  window.scrollTo(0, 0);
}

// The search box in the header jumps to the first section whose name contains
// the typed words, so a visitor can find a topic without browsing the nav.
const search = document.getElementById('site-search');
const searchForm = document.getElementById('search-form');
if (searchForm && search) {
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = search.value.trim().toLowerCase();
    if (!query) return;
    const match = Object.keys(VIEWS).find((key) => key.includes(query) || VIEWS[key].title.toLowerCase().includes(query));
    location.hash = '#/' + (match || 'about');
    search.value = '';
    search.blur();
  });
}

window.addEventListener('hashchange', render);

// Charts are drawn from canvas sizes, so repaint them when the window size
// changes (a phone rotating, a desktop window resizing).
redrawAllCharts(() => {
  const view = VIEWS[routeName()];
  if (view && view.draw) view.draw();
});

render();
