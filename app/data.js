// Meridia National Statistics — all figures for the site live here, in one place.
// Meridia is a fictional country invented for this site; every number below is a
// fixed figure the pages and charts read, so nothing on the site is a placeholder.

export const COUNTRY = {
  name: 'Meridia',
  capital: 'Aldgate',
  motto: 'Counted honestly, shared openly.',
  population: 8412030,
  populationYear: 2025,
  areaKm2: 68412,
  currency: 'merid (MRD)',
  gdpPerCapita: 28410,
  unemployment: 4.6,
  lifeExpectancy: 79.4,
  medianAge: 38.2,
};

export const POPULATION_BY_YEAR = [
  { year: 2015, value: 7820410 },
  { year: 2016, value: 7893220 },
  { year: 2017, value: 7968110 },
  { year: 2018, value: 8042100 },
  { year: 2019, value: 8115340 },
  { year: 2020, value: 8160980 },
  { year: 2021, value: 8200770 },
  { year: 2022, value: 8265400 },
  { year: 2023, value: 8329810 },
  { year: 2024, value: 8377200 },
  { year: 2025, value: 8412030 },
];

export const AGE_GROUPS = [
  { group: '0–14', value: 1382400 },
  { group: '15–24', value: 1023100 },
  { group: '25–34', value: 1187600 },
  { group: '35–44', value: 1165400 },
  { group: '45–54', value: 1098300 },
  { group: '55–64', value: 1012400 },
  { group: '65–74', value: 862100 },
  { group: '75+', value: 682730 },
];

export const REGIONS = [
  { region: 'Aldgate City', population: 2140900, density: 4120, growth: 1.1 },
  { region: 'Northmarch', population: 1487300, density: 86, growth: 0.4 },
  { region: 'Riverlands', population: 1325600, density: 154, growth: 0.7 },
  { region: 'Coast of Sails', population: 1189200, density: 210, growth: 0.9 },
  { region: 'High Veldt', population: 964100, density: 31, growth: -0.2 },
  { region: 'Eastfold', population: 869400, density: 122, growth: 0.5 },
  { region: 'Isle of Tarn', population: 435530, density: 96, growth: 0.3 },
];

export const GDP_BY_YEAR = [
  { year: 2015, value: 187.4 },
  { year: 2016, value: 192.1 },
  { year: 2017, value: 198.6 },
  { year: 2018, value: 205.3 },
  { year: 2019, value: 211.8 },
  { year: 2020, value: 203.5 },
  { year: 2021, value: 216.9 },
  { year: 2022, value: 228.4 },
  { year: 2023, value: 234.7 },
  { year: 2024, value: 239.0 },
];

export const GDP_SECTORS = [
  { sector: 'Services', share: 58.2 },
  { sector: 'Industry', share: 24.6 },
  { sector: 'Agriculture', share: 9.8 },
  { sector: 'Construction', share: 7.4 },
];

export const UNEMPLOYMENT_BY_YEAR = [
  { year: 2015, value: 6.8 },
  { year: 2016, value: 6.4 },
  { year: 2017, value: 6.1 },
  { year: 2018, value: 5.7 },
  { year: 2019, value: 5.2 },
  { year: 2020, value: 7.9 },
  { year: 2021, value: 6.9 },
  { year: 2022, value: 5.8 },
  { year: 2023, value: 5.1 },
  { year: 2024, value: 4.6 },
];

export const TRADE = [
  { partner: 'Caldonia', exports: 18.4, imports: 15.2 },
  { partner: 'Vostria', exports: 12.7, imports: 14.9 },
  { partner: 'The Tern Isles', exports: 9.3, imports: 6.1 },
  { partner: 'Ostara', exports: 7.8, imports: 8.4 },
  { partner: 'Kessig', exports: 5.9, imports: 7.2 },
];

export const HEALTH = {
  lifeExpectancy: { total: 79.4, female: 82.1, male: 76.8 },
  infantMortality: 4.2,
  hospitalBedsPer1000: 4.8,
  doctorsPer1000: 3.6,
  healthSpendingGdp: 8.9,
  smokingAdults: 16.4,
  obesityAdults: 21.7,
};

export const HEALTH_CAUSES = [
  { cause: 'Heart disease', share: 24.1 },
  { cause: 'Cancer', share: 22.8 },
  { cause: 'Stroke', share: 9.6 },
  { cause: 'Respiratory disease', share: 8.3 },
  { cause: 'Accidents', share: 5.4 },
  { cause: 'Other', share: 29.8 },
];

export const EDUCATION = {
  literacy: 98.7,
  primaryEnrolment: 99.4,
  secondaryEnrolment: 94.2,
  tertiaryEnrolment: 58.6,
  spendingGdp: 5.1,
  pupilsPerTeacher: 14.2,
  graduatesPerYear: 41200,
};

export const EDUCATION_LEVELS = [
  { level: 'No schooling', share: 1.3 },
  { level: 'Primary', share: 18.4 },
  { level: 'Secondary', share: 42.1 },
  { level: 'Vocational', share: 14.6 },
  { level: 'University', share: 23.6 },
];

export const ENVIRONMENT = {
  co2PerCapita: 5.8,
  renewablesShare: 41.3,
  forestCover: 46.2,
  protectedLand: 18.7,
  recyclingRate: 52.4,
  airQualityGoodDays: 312,
};

export const ENERGY_MIX = [
  { source: 'Wind', share: 18.2 },
  { source: 'Hydro', share: 12.6 },
  { source: 'Solar', share: 10.5 },
  { source: 'Gas', share: 34.1 },
  { source: 'Coal', share: 16.8 },
  { source: 'Other', share: 7.8 },
];

export const RELEASES = [
  { date: '12 Nov 2025', title: 'Population estimates, mid-2025', tag: 'Population' },
  { date: '28 Oct 2025', title: 'Labour market bulletin, Q3 2025', tag: 'Economy' },
  { date: '14 Oct 2025', title: 'Health survey 2025: headline results', tag: 'Health' },
  { date: '30 Sep 2025', title: 'Education outcomes 2024/25', tag: 'Education' },
  { date: '16 Sep 2025', title: 'Greenhouse gas inventory 2024', tag: 'Environment' },
  { date: '02 Sep 2025', title: 'Regional population by district', tag: 'Population' },
];

// Small helpers the views use so no page repeats the same arithmetic.
export function formatNumber(n) {
  return n.toLocaleString('en-GB');
}

export function formatMillions(n) {
  return (n / 1000000).toFixed(2) + 'm';
}

export function percentChange(series) {
  const first = series[0].value;
  const last = series[series.length - 1].value;
  return (((last - first) / first) * 100).toFixed(1);
}
