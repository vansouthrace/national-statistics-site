// Page views for the Meridia statistics site. Each view returns HTML for the
// main content area and, where it has charts, a draw() step that paints the
// canvases after the HTML is in the page.

import {
  COUNTRY,
  POPULATION_BY_YEAR,
  AGE_GROUPS,
  REGIONS,
  GDP_BY_YEAR,
  GDP_SECTORS,
  UNEMPLOYMENT_BY_YEAR,
  TRADE,
  HEALTH,
  HEALTH_CAUSES,
  EDUCATION,
  EDUCATION_LEVELS,
  ENVIRONMENT,
  ENERGY_MIX,
  RELEASES,
  formatNumber,
  formatMillions,
  percentChange,
} from './data.js';
import { drawLineChart, drawBarChart, drawDonut, legendHTML } from './charts.js';

function kpiCard(value, label, note) {
  return `<div class="kpi"><div class="kpi-value">${value}</div><div class="kpi-label">${label}</div><div class="kpi-note">${note}</div></div>`;
}

function section(title, intro, inner) {
  return `<section class="card"><h2>${title}</h2>${intro ? `<p class="intro">${intro}</p>` : ''}${inner}</section>`;
}

function chartCard(title, canvasId, height, note) {
  return `<div class="chart-block"><h3>${title}</h3><canvas id="${canvasId}" style="height:${height}px"></canvas>${note ? `<p class="chart-note">${note}</p>` : ''}</div>`;
}

export function homeView() {
  const releases = RELEASES.map(
    (r) => `<li><span class="release-date">${r.date}</span> <a href="#/about">${r.title}</a> <span class="tag">${r.tag}</span></li>`,
  ).join('');
  return `
  <h1>Meridia in numbers</h1>
  <p class="lede">The official statistics of Meridia — population, economy, health, education and the environment — counted honestly and shared openly.</p>
  <div class="kpi-grid">
    ${kpiCard(formatMillions(COUNTRY.population), 'Population', 'mid-2025 estimate, up 0.4% on 2024')}
    ${kpiCard('MRD ' + formatNumber(COUNTRY.gdpPerCapita), 'GDP per capita', '2024, current prices')}
    ${kpiCard(COUNTRY.unemployment + '%', 'Unemployment', '2024, down from 5.1% in 2023')}
    ${kpiCard(COUNTRY.lifeExpectancy + ' years', 'Life expectancy', '2024, women 82.1, men 76.8')}
  </div>
  <div class="two-col">
    ${section('Population 2015–2025', 'Meridia has grown every year for a decade — up ' + percentChange(POPULATION_BY_YEAR) + '% since 2015.', chartCard('People living in Meridia', 'home-pop', 240, 'Source: National Population Register, mid-year estimates.'))}
    ${section('Where the economy comes from', 'Services are more than half of Meridia’s output; industry is a quarter.', chartCard('Share of GDP by sector, 2024', 'home-gdp', 240, 'Source: National Accounts 2024.'))}
  </div>
  ${section('Latest releases', '', `<ul class="releases">${releases}</ul><p><a href="#/about">How our figures are made &rarr;</a></p>`)}
  <p class="explore">Explore: <a href="#/population">Population</a> · <a href="#/economy">Economy</a> · <a href="#/health">Health</a> · <a href="#/education">Education</a> · <a href="#/environment">Environment</a></p>`;
}

export function homeDraw() {
  drawLineChart(document.getElementById('home-pop'), POPULATION_BY_YEAR.map((p) => ({ year: p.year, value: p.value / 1000000 })), { color: '#0f4c75' });
  const canvas = document.getElementById('home-gdp');
  drawDonut(canvas, GDP_SECTORS.map((s) => ({ label: s.sector, value: s.share })), { center: 'MRD 239bn', centerSub: 'GDP 2024' });
  const block = canvas.closest('.chart-block');
  // Draws run again on resize: only add the legend the first time, or it
  // would pile up a copy on every redraw.
  if (!block.querySelector('.legend')) {
    block.insertAdjacentHTML('beforeend', legendHTML(GDP_SECTORS.map((s) => ({ label: s.sector, value: s.share + '%' }))));
  }
}

export function populationView() {
  const rows = REGIONS.map(
    (r) => `<tr><td>${r.region}</td><td class="num">${formatNumber(r.population)}</td><td class="num">${formatNumber(r.density)}</td><td class="num">${r.growth > 0 ? '+' : ''}${r.growth.toFixed(1)}%</td></tr>`,
  ).join('');
  return `
  <h1>Population</h1>
  <p class="lede">8,412,030 people live in Meridia (mid-2025). The median age is 38.2 years and 62% live in towns and cities.</p>
  <div class="kpi-grid">
    ${kpiCard(formatMillions(COUNTRY.population), 'Population', 'mid-2025')}
    ${kpiCard(COUNTRY.medianAge + ' years', 'Median age', 'up from 36.9 in 2015')}
    ${kpiCard('123 / km²', 'Density', 'national average')}
    ${kpiCard('+0.4%', 'Annual growth', 'births minus deaths plus net migration')}
  </div>
  <div class="two-col">
    ${section('Population by age', 'The largest group is 25–34. One in five Meridians is under 15.', chartCard('People by age group', 'pop-age', 260, 'Source: Population Register, mid-2025.'))}
    ${section('Growth over time', 'Steady growth of about 0.4–0.9% a year since 2015.', chartCard('Total population, millions', 'pop-trend', 260, 'Source: mid-year estimates 2015–2025.'))}
  </div>
  ${section('Regions', 'Aldgate City holds a quarter of the country. The High Veldt is the only region shrinking.', `<div class="table-wrap"><table><thead><tr><th>Region</th><th class="num">Population</th><th class="num">People / km²</th><th class="num">Growth / yr</th></tr></thead><tbody>${rows}</tbody></table></div><p class="chart-note">Source: Regional Population Estimates 2025.</p>`)}`;
}

export function populationDraw() {
  drawBarChart(document.getElementById('pop-age'), AGE_GROUPS.map((a) => ({ label: a.group, value: a.value / 1000000 })), { format: (v) => v.toFixed(2) + 'm' });
  drawLineChart(document.getElementById('pop-trend'), POPULATION_BY_YEAR.map((p) => ({ year: p.year, value: p.value / 1000000 })), { color: '#2e86ab' });
}

export function economyView() {
  const rows = TRADE.map(
    (t) => `<tr><td>${t.partner}</td><td class="num">MRD ${t.exports.toFixed(1)}bn</td><td class="num">MRD ${t.imports.toFixed(1)}bn</td><td class="num">${t.exports >= t.imports ? '+' : '−'}MRD ${Math.abs(t.exports - t.imports).toFixed(1)}bn</td></tr>`,
  ).join('');
  return `
  <h1>Economy</h1>
  <p class="lede">Meridia’s economy was worth MRD 239.0 billion in 2024, growing 1.8% on the year. Unemployment is at a ten-year low.</p>
  <div class="kpi-grid">
    ${kpiCard('MRD 239.0bn', 'GDP', '2024, +1.8% on 2023')}
    ${kpiCard('MRD ' + formatNumber(COUNTRY.gdpPerCapita), 'GDP per capita', '2024')}
    ${kpiCard(COUNTRY.unemployment + '%', 'Unemployment', 'lowest since 2015')}
    ${kpiCard('2.4%', 'Inflation', '2024 average, CPI')}
  </div>
  <div class="two-col">
    ${section('GDP 2015–2024', 'Output dipped in 2020 and has grown every year since.', chartCard('GDP, MRD billions', 'eco-gdp', 260, 'Source: National Accounts 2024.'))}
    ${section('Unemployment 2015–2024', 'The 2020 spike unwound within two years.', chartCard('Unemployment rate, %', 'eco-unemp', 260, 'Source: Labour Force Survey.'))}
  </div>
  ${section('Trade with the five largest partners', 'Meridia exports more than it imports to three of its five largest partners.', `<div class="table-wrap"><table><thead><tr><th>Partner</th><th class="num">Exports</th><th class="num">Imports</th><th class="num">Balance</th></tr></thead><tbody>${rows}</tbody></table></div><p class="chart-note">Source: Trade Statistics 2024. Total exports MRD 54.1bn; total imports MRD 51.8bn.</p>`)}`;
}

export function economyDraw() {
  drawLineChart(document.getElementById('eco-gdp'), GDP_BY_YEAR, { color: '#0f4c75' });
  drawLineChart(document.getElementById('eco-unemp'), UNEMPLOYMENT_BY_YEAR, { color: '#c0392b' });
}

export function healthView() {
  return `
  <h1>Health</h1>
  <p class="lede">Meridians live 79.4 years on average. Infant mortality is 4.2 per 1,000 births — the lowest ever recorded.</p>
  <div class="kpi-grid">
    ${kpiCard(HEALTH.lifeExpectancy.total + ' years', 'Life expectancy', 'women 82.1 · men 76.8')}
    ${kpiCard(HEALTH.infantMortality + ' / 1,000', 'Infant mortality', 'lowest on record')}
    ${kpiCard(HEALTH.hospitalBedsPer1000, 'Hospital beds / 1,000', '40,380 beds nationally')}
    ${kpiCard(HEALTH.healthSpendingGdp + '% of GDP', 'Health spending', 'MRD 21.3bn in 2024')}
  </div>
  <div class="two-col">
    ${section('What Meridians die of', 'Heart disease and cancer together account for almost half of all deaths.', chartCard('Share of deaths by cause, 2024', 'health-causes', 260, 'Source: Deaths Register 2024.'))}
    ${section('The health system in numbers', '', `<ul class="facts"><li><strong>${HEALTH.doctorsPer1000}</strong> doctors per 1,000 people</li><li><strong>${HEALTH.smokingAdults}%</strong> of adults smoke — down from 24.1% in 2015</li><li><strong>${HEALTH.obesityAdults}%</strong> of adults are obese</li><li><strong>96.2%</strong> of children fully vaccinated by age two</li><li><strong>18 minutes</strong> median ambulance response in cities</li></ul>`)}
  </div>
  <p class="chart-note">Source: Health Survey 2025 and the Deaths Register. Figures are for the calendar year 2024 unless stated.</p>`;
}

export function healthDraw() {
  const canvas = document.getElementById('health-causes');
  drawDonut(canvas, HEALTH_CAUSES.map((c) => ({ label: c.cause, value: c.share })), { center: '58,410', centerSub: 'deaths in 2024' });
  const block = canvas.closest('.chart-block');
  if (!block.querySelector('.legend')) {
    block.insertAdjacentHTML('beforeend', legendHTML(HEALTH_CAUSES.map((c) => ({ label: c.cause, value: c.share + '%' }))));
  }
}

export function educationView() {
  return `
  <h1>Education</h1>
  <p class="lede">98.7% of Meridian adults can read and write. Almost every child finishes primary school, and 58.6% of young adults go on to university or college.</p>
  <div class="kpi-grid">
    ${kpiCard(EDUCATION.literacy + '%', 'Adult literacy', 'ages 15 and over')}
    ${kpiCard(EDUCATION.primaryEnrolment + '%', 'Primary enrolment', 'net rate, 2024/25')}
    ${kpiCard(EDUCATION.tertiaryEnrolment + '%', 'Tertiary enrolment', 'ages 18–24')}
    ${kpiCard(formatNumber(EDUCATION.graduatesPerYear), 'Graduates a year', 'universities and colleges')}
  </div>
  <div class="two-col">
    ${section('Highest level reached', 'Two in five adults hold a secondary certificate as their highest qualification.', chartCard('Adults 25–64 by highest qualification', 'edu-levels', 260, 'Source: Education Survey 2025.'))}
    ${section('The system in numbers', '', `<ul class="facts"><li><strong>${EDUCATION.spendingGdp}% of GDP</strong> spent on education — MRD 12.2bn</li><li><strong>${EDUCATION.pupilsPerTeacher}</strong> pupils per teacher in primary schools</li><li><strong>1,842</strong> primary schools and <strong>612</strong> secondary schools</li><li><strong>94.2%</strong> secondary enrolment, net rate</li><li><strong>87%</strong> of 16-year-olds pass the national leaving exam</li></ul>`)}
  </div>
  <p class="chart-note">Source: Education Survey 2025 and school census 2024/25.</p>`;
}

export function educationDraw() {
  const canvas = document.getElementById('edu-levels');
  drawDonut(canvas, EDUCATION_LEVELS.map((e) => ({ label: e.level, value: e.share })), { center: '98.7%', centerSub: 'adult literacy' });
  const block = canvas.closest('.chart-block');
  if (!block.querySelector('.legend')) {
    block.insertAdjacentHTML('beforeend', legendHTML(EDUCATION_LEVELS.map((e) => ({ label: e.level, value: e.share + '%' }))));
  }
}

export function environmentView() {
  return `
  <h1>Environment</h1>
  <p class="lede">41.3% of Meridia’s electricity now comes from renewables, and forest covers 46.2% of the land — but emissions per person are still 5.8 tonnes a year.</p>
  <div class="kpi-grid">
    ${kpiCard(ENVIRONMENT.co2PerCapita + ' t', 'CO₂ per person', '2024, down from 7.1 t in 2015')}
    ${kpiCard(ENVIRONMENT.renewablesShare + '%', 'Renewable electricity', 'wind 18.2%, hydro 12.6%, solar 10.5%')}
    ${kpiCard(ENVIRONMENT.forestCover + '%', 'Forest cover', '31,600 km² of woodland')}
    ${kpiCard(ENVIRONMENT.recyclingRate + '%', 'Recycling rate', 'household waste, 2024')}
  </div>
  <div class="two-col">
    ${section('Where electricity comes from', 'Gas is still the largest single source, at just over a third.', chartCard('Electricity mix, 2024', 'env-energy', 260, 'Source: Energy Statistics 2024.'))}
    ${section('The land and air', '', `<ul class="facts"><li><strong>${ENVIRONMENT.protectedLand}%</strong> of land is protected — national parks and reserves</li><li><strong>${ENVIRONMENT.airQualityGoodDays} days</strong> of good air quality in Aldgate City last year</li><li><strong>−12%</strong> greenhouse gas emissions since 2015</li><li><strong>68%</strong> of rivers rated good or excellent</li><li><strong>3,410 km</strong> of coastline, <strong>214</strong> beaches rated excellent</li></ul>`)}
  </div>
  <p class="chart-note">Source: Greenhouse Gas Inventory 2024 and Energy Statistics 2024.</p>`;
}

export function environmentDraw() {
  const canvas = document.getElementById('env-energy');
  drawDonut(canvas, ENERGY_MIX.map((e) => ({ label: e.source, value: e.share })), { center: '41.3%', centerSub: 'renewable' });
  const block = canvas.closest('.chart-block');
  if (!block.querySelector('.legend')) {
    block.insertAdjacentHTML('beforeend', legendHTML(ENERGY_MIX.map((e) => ({ label: e.source, value: e.share + '%' }))));
  }
}

export function aboutView() {
  const releases = RELEASES.map((r) => `<li><span class="release-date">${r.date}</span> ${r.title} <span class="tag">${r.tag}</span></li>`).join('');
  return `
  <h1>About these statistics</h1>
  <p class="lede">The Meridia Statistics Office is the country’s independent producer of official statistics. This site is its public face.</p>
  ${section('How the figures are made', '', `<p>Every figure on this site comes from a register, a survey or an administrative count run by the Statistics Office or a government department, and is checked before release. Population figures are mid-year estimates from the National Population Register. Economic figures follow the National Accounts framework. Health and education figures come from the annual surveys named under each chart, and environmental figures from the Greenhouse Gas Inventory and Energy Statistics.</p><p>Figures are revised when better data arrives; the latest release always replaces earlier ones, and revisions are listed in the release notes.</p>`)}
  ${section('All releases', '', `<ul class="releases">${releases}</ul>`)}
  ${section('Contact', '', `<p>Meridia Statistics Office, 14 Census Square, Aldgate, Meridia.<br>Enquiries: <strong>hello@statistics.meridia.example</strong> · Phone <strong>+380 12 555 0140</strong>.<br>Office hours: Monday to Friday, 9:00–17:00.</p><p>Meridia is a fictional country created for this site; its figures are invented examples shown in the format of real official statistics.</p>`)}`;
}

export const VIEWS = {
  home: { render: homeView, draw: homeDraw, title: 'Meridia in numbers' },
  population: { render: populationView, draw: populationDraw, title: 'Population' },
  economy: { render: economyView, draw: economyDraw, title: 'Economy' },
  health: { render: healthView, draw: healthDraw, title: 'Health' },
  education: { render: educationView, draw: educationDraw, title: 'Education' },
  environment: { render: environmentView, draw: environmentDraw, title: 'Environment' },
  about: { render: aboutView, draw: null, title: 'About these statistics' },
};

// Shown when the address names a page that does not exist, instead of a
// blank screen: the visitor gets the site's sections to pick from.
export function notFoundView() {
  return `
  <h1>Page not found</h1>
  <p class="lede">There is no statistics page at this address. Try one of these instead:</p>
  <ul class="facts">
    <li><a href="#/">Meridia in numbers</a> — the overview</li>
    <li><a href="#/population">Population</a></li>
    <li><a href="#/economy">Economy</a></li>
    <li><a href="#/health">Health</a></li>
    <li><a href="#/education">Education</a></li>
    <li><a href="#/environment">Environment</a></li>
    <li><a href="#/about">About these statistics</a></li>
  </ul>`;
}
