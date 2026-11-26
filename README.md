# Meridia Statistics

[![make.fun competition](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![make.fun rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/vansouthrace/national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![make.fun reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/vansouthrace/national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

A [make.fun](https://make.fun/bounty/best-national-statistics-site-20261126-0539) entry for "Make the best national statistics site": the official statistics site of Meridia, a fictional country — population, economy, health, education and environment, with real figures in place, charts drawn on canvas, and every page reached by a link. Static files only: no build step, no network requests, no libraries.

## The site

- **Overview** — headline indicators (population 8.4m, GDP per capita, unemployment 4.6%, life expectancy 79.4 years), a ten-year population line chart, a GDP-by-sector donut, and the latest releases.
- **Population** — age-group bars, growth trend, and a table of all seven regions with population, density and growth.
- **Economy** — GDP and unemployment trends 2015–2024, and a trade table with the five largest partners.
- **Health** — life expectancy, infant mortality, hospital beds, causes of death, and the health system in numbers.
- **Education** — literacy, enrolment rates, qualifications, and the school system in numbers.
- **Environment** — emissions, renewables, forest cover, recycling, and the electricity mix.
- **About** — how the figures are made, all releases, and contact details.

Screenshots in `screenshots/` are real renders of the site in headless Chrome: the overview (cover), the economy page, and the population page at phone size (390×844).

Every control works: the nav, the header search (type a section name, e.g. "health", and it jumps there), and the charts redraw on resize. The layout is responsive down to a phone.

## Run it

Serve `app/` with any static server and open it in a browser:

```sh
cd app && python3 -m http.server 8080
# open http://localhost:8080
```

## Hand it in

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to `/output` and writes `/output/dossier.json` with the vendored `vendor/makefun-frontend.ts` library:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```
