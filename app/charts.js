// Tiny canvas chart helpers for the Meridia statistics site. No library: each
// function draws one chart on a <canvas> with plain 2D calls, sized to the
// canvas element's own width and height, with a device-pixel-ratio pass so the
// lines stay crisp on phones.

const PALETTE = ['#0f4c75', '#2e86ab', '#f2a541', '#5cb85c', '#c0392b', '#7d5ba6', '#3aa99e'];

function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.max(1, Math.round(width * dpr));
  canvas.height = Math.max(1, Math.round(height * dpr));
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.font = '12px system-ui, sans-serif';
  return { ctx, width, height };
}

function niceMax(value) {
  const power = Math.pow(10, Math.floor(Math.log10(value)));
  const scaled = value / power;
  // Fine steps so a series like 187–239 tops out near 300, not 500: the line
  // then fills the chart instead of hugging its bottom edge.
  const steps = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
  const nice = steps.find((s) => scaled <= s) ?? 10;
  return nice * power;
}

function formatAxis(value) {
  // Gridline labels: whole numbers for big axes, one decimal for small ones
  // (a bar chart topping out at 1.5m must not label its gridlines 2, 1, 1, 0, 0).
  if (value >= 10) return String(Math.round(value));
  return String(Math.round(value * 10) / 10);
}

export function drawLineChart(canvas, points, options = {}) {
  const { ctx, width, height } = setupCanvas(canvas);
  const pad = { left: 52, right: 14, top: 14, bottom: 28 };
  const values = points.map((p) => p.value);
  const max = niceMax(Math.max(...values) * 1.05);
  const xStep = (width - pad.left - pad.right) / (points.length - 1);
  const yOf = (v) => pad.top + (1 - v / max) * (height - pad.top - pad.bottom);

  ctx.strokeStyle = '#d7dee6';
  ctx.fillStyle = '#5a6b7c';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + ((height - pad.top - pad.bottom) * i) / 4;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
    ctx.textAlign = 'right';
    ctx.fillText(formatAxis((max * (4 - i)) / 4), pad.left - 8, y + 4);
  }

  ctx.strokeStyle = options.color || '#0f4c75';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  points.forEach((p, i) => {
    const x = pad.left + i * xStep;
    const y = yOf(p.value);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.fillStyle = options.color || '#0f4c75';
  points.forEach((p, i) => {
    const x = pad.left + i * xStep;
    ctx.beginPath();
    ctx.arc(x, yOf(p.value), 3.5, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = '#5a6b7c';
  ctx.textAlign = 'center';
  points.forEach((p, i) => {
    if (i % 2 === 0 || i === points.length - 1) {
      ctx.fillText(String(p.year), pad.left + i * xStep, height - 8);
    }
  });
}

export function drawBarChart(canvas, bars, options = {}) {
  const { ctx, width, height } = setupCanvas(canvas);
  const pad = { left: 52, right: 14, top: 14, bottom: 28 };
  const max = niceMax(Math.max(...bars.map((b) => b.value)) * 1.05);
  const slot = (width - pad.left - pad.right) / bars.length;
  const barWidth = Math.min(44, slot * 0.62);

  ctx.strokeStyle = '#d7dee6';
  ctx.fillStyle = '#5a6b7c';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + ((height - pad.top - pad.bottom) * i) / 4;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
    ctx.textAlign = 'right';
    ctx.fillText(formatAxis((max * (4 - i)) / 4), pad.left - 8, y + 4);
  }

  bars.forEach((b, i) => {
    const x = pad.left + slot * i + (slot - barWidth) / 2;
    const barHeight = (b.value / max) * (height - pad.top - pad.bottom);
    ctx.fillStyle = PALETTE[i % PALETTE.length];
    ctx.fillRect(x, height - pad.bottom - barHeight, barWidth, barHeight);
    ctx.fillStyle = '#33414f';
    ctx.textAlign = 'center';
    ctx.fillText(options.format ? options.format(b.value) : String(b.value), x + barWidth / 2, height - pad.bottom - barHeight - 6);
    ctx.fillStyle = '#5a6b7c';
    ctx.fillText(b.label, x + barWidth / 2, height - 8);
  });
}

export function drawDonut(canvas, slices, options = {}) {
  const { ctx, width, height } = setupCanvas(canvas);
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) / 2 - 12;
  const total = slices.reduce((sum, s) => sum + s.value, 0);
  let angle = -Math.PI / 2;
  slices.forEach((s, i) => {
    const sweep = (s.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, angle, angle + sweep);
    ctx.closePath();
    ctx.fillStyle = PALETTE[i % PALETTE.length];
    ctx.fill();
    angle += sweep;
  });
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.55, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.fillStyle = '#0f4c75';
  ctx.textAlign = 'center';
  ctx.font = 'bold 15px system-ui, sans-serif';
  ctx.fillText(options.center || '', cx, cy - 2);
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillStyle = '#5a6b7c';
  ctx.fillText(options.centerSub || '', cx, cy + 15);
}

export function legendHTML(slices, valueFormat) {
  return (
    '<ul class="legend">' +
    slices
      .map(
        (s, i) =>
          `<li><span class="swatch" style="background:${PALETTE[i % PALETTE.length]}"></span>${s.label} — <strong>${valueFormat ? valueFormat(s.value) : s.value}</strong></li>`,
      )
      .join('') +
    '</ul>'
  );
}

// Redraw every canvas on the page after a resize, so charts never sit at the
// wrong size when a phone rotates or a desktop window changes.
export function redrawAllCharts(draw) {
  let timer = null;
  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(draw, 150);
  });
}
