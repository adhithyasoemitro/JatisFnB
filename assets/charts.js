/* ═══════════════════════════════════════════════
   JATIS FMCG Cloud — Chart Engine (SVG, no deps)
   ═══════════════════════════════════════════════ */
const Charts = (() => {
  const NS = 'http://www.w3.org/2000/svg';
  const $ = (tag, attrs = {}, parent) => {
    const el = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    if (parent) parent.appendChild(el);
    return el;
  };

  /* Area chart with animated gradient fill */
  function area(container, data, opts = {}) {
    const c = container;
    c.innerHTML = '';
    const W = 640, H = 240, padL = 36, padB = 26, padT = 16, padR = 10;
    const max = Math.max(...data) * 1.15;
    const iw = W - padL - padR, ih = H - padT - padB;
    const px = i => padL + (i / (data.length - 1)) * iw;
    const py = v => padT + ih - (v / max) * ih;

    const svg = $('svg', { viewBox: `0 0 ${W} ${H}`, 'preserveAspectRatio': 'none' }, c);

    // grid lines
    for (let g = 0; g <= 3; g++) {
      const y = padT + (ih / 3) * g;
      $('line', { x1: padL, y1: y, x2: W - padR, y2: y, stroke: 'rgba(44,42,40,.09)', 'stroke-width': 1 }, svg);
      const val = Math.round(max * (1 - g / 3));
      const t = $('text', { x: padL - 8, y: y + 4, 'text-anchor': 'end', 'font-size': 10, fill: '#9B9B98' }, svg);
      t.textContent = val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val;
    }

    // area fill
    const pts = data.map((v, i) => `${px(i)},${py(v)}`).join(' ');
    const areaPath = `M ${px(0)},${py(data[0])} L ${pts.replace(/ /g, ' L ')} L ${px(data.length - 1)},${padT + ih} L ${px(0)},${padT + ih} Z`;
    const grad = $('defs', {}, svg);
    const lg = $('linearGradient', { id: 'area-grad-' + Math.random().toString(36).slice(2, 8), x1: 0, y1: 0, x2: 0, y2: 1 }, grad);
    $('stop', { offset: '0%', 'stop-color': opts.color || '#10b981', 'stop-opacity': 0.35 }, lg);
    $('stop', { offset: '100%', 'stop-color': opts.color || '#10b981', 'stop-opacity': 0 }, lg);
    const ap = $('path', { d: areaPath, fill: `url(#${lg.id})` }, svg);

    // line
    const linePath = `M ${pts.replace(/ /g, ' L ')}`;
    const lp = $('path', { d: linePath, fill: 'none', stroke: opts.color || '#10b981', 'stroke-width': 2.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    lp.setAttribute('stroke-dasharray', 10000);
    lp.setAttribute('stroke-dashoffset', 10000);
    lp.getBoundingClientRect();
    requestAnimationFrame(() => {
      lp.style.transition = 'stroke-dashoffset 1.6s ease';
      lp.setAttribute('stroke-dashoffset', 0);
      ap.style.transition = 'opacity 1s ease .5s';
      ap.style.opacity = 0.001;
      requestAnimationFrame(() => { ap.style.opacity = 1; });
    });

    // dots
    data.forEach((v, i) => {
      const dot = $('circle', { cx: px(i), cy: py(v), r: 3, fill: opts.color || '#10b981', stroke: '#ffffff', 'stroke-width': 2 }, svg);
      dot.style.opacity = 0;
      dot.style.transition = `opacity .3s ease ${0.5 + i * 0.04}s`;
      requestAnimationFrame(() => { dot.style.opacity = 1; });
    });

    if (opts.labels) {
      const n = Math.min(opts.labels.length, data.length);
      const step = Math.max(1, Math.floor(n / 8));
      opts.labels.forEach((lb, i) => {
        if (i % step !== 0) return;
        const t = $('text', { x: px(i), y: H - 8, 'text-anchor': 'middle', 'font-size': 9.5, fill: '#9B9B98' }, svg);
        t.textContent = lb;
      });
    }
  }

  /* Donut chart */
  function donut(container, items) {
    const c = container;
    c.innerHTML = '';
    const size = 190, r = 70, sw = 22;
    const svg = $('svg', { viewBox: `0 0 ${size} ${size}`, width: size, height: size }, c);
    const cx = size / 2, cy = size / 2;
    const total = items.reduce((a, b) => a + b.val, 0);
    const circ = 2 * Math.PI * r;
    let offset = 0;

    items.forEach((it, i) => {
      const frac = it.val / total;
      const len = circ * frac;
      const dash = `${len} ${circ - len}`;
      const circle = $('circle', {
        cx, cy, r, fill: 'none', stroke: it.color, 'stroke-width': sw,
        'stroke-dasharray': dash,
        'stroke-dashoffset': -offset,
        'stroke-linecap': 'round',
        transform: `rotate(-90 ${cx} ${cy})`,
      }, svg);
      circle.style.opacity = 0;
      circle.style.transition = `opacity .5s ease ${i * 0.12}s`;
      requestAnimationFrame(() => { circle.style.opacity = 1; });
      offset += len;
    });

    const t1 = $('text', { x: cx, y: cy - 2, 'text-anchor': 'middle', 'font-size': 26, 'font-weight': 800, fill: '#2C2C2A', 'font-family': 'Plus Jakarta Sans' }, svg);
    t1.textContent = total + '%';
    const t2 = $('text', { x: cx, y: cy + 18, 'text-anchor': 'middle', 'font-size': 10, fill: '#9B9B98' }, svg);
    t2.textContent = 'dari total pesan';
  }

  /* Grouped bar chart (animated) */
  function bars(container, labels, series, opts = {}) {
    const c = container;
    c.innerHTML = '';
    const W = 640, H = 240, padL = 38, padB = 30, padT = 16, padR = 10;
    const iw = W - padL - padR, ih = H - padT - padB;
    const max = Math.max(...series.flat()) * 1.15;
    const n = labels.length;
    const groupW = iw / n;
    const barW = Math.min(34, groupW * 0.32);
    const colors = opts.colors || ['#10b981', '#8b5cf6'];

    const svg = $('svg', { viewBox: `0 0 ${W} ${H}`, 'preserveAspectRatio': 'none' }, c);
    for (let g = 0; g <= 3; g++) {
      const y = padT + (ih / 3) * g;
      $('line', { x1: padL, y1: y, x2: W - padR, y2: y, stroke: 'rgba(44,42,40,.09)' }, svg);
    }

    labels.forEach((lb, i) => {
      const gx = padL + i * groupW;
      series.forEach((s, si) => {
        const v = s[i];
        if (!v) return;
        const bh = (v / max) * ih;
        const x = gx + groupW / 2 - (barW * series.length) / 2 + si * barW;
        const y = padT + ih - bh;
        const rect = $('rect', { x, y, width: barW - 4, height: 0, rx: 4, fill: colors[si] }, svg);
        rect.style.transition = 'height .8s ease, y .8s ease';
        requestAnimationFrame(() => {
          rect.setAttribute('height', bh);
          rect.setAttribute('y', y);
        });
      });
      const t = $('text', { x: gx + groupW / 2, y: H - 10, 'text-anchor': 'middle', 'font-size': 9.5, fill: '#9B9B98' }, svg);
      t.textContent = lb;
    });
  }

  /* Horizontal stacked progress bars */
  function hbars(container, items, opts = {}) {
    const c = container;
    c.innerHTML = '';
    items.forEach(it => {
      const row = document.createElement('div');
      row.style.cssText = 'margin-bottom:16px';
      const head = document.createElement('div');
      head.style.cssText = 'display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:6px;color:var(--muted)';
      head.innerHTML = `<span>${it.label}</span><b style="color:var(--txt)">${it.pct ?? ''}</b>`;
      row.appendChild(head);
      const track = document.createElement('div');
      track.style.cssText = 'height:10px;background:rgba(255,255,255,.07);border-radius:99px;overflow:hidden';
      const fill = document.createElement('i');
      fill.style.cssText = `display:block;height:100%;width:0;background:${opts.color || 'var(--grad)'};border-radius:99px;transition:width 1s ease`;
      track.appendChild(fill);
      row.appendChild(track);
      if (it.sub) {
        const sub = document.createElement('small');
        sub.style.cssText = 'font-size:11px;color:var(--muted-2);display:block;margin-top:4px';
        sub.textContent = it.sub;
        row.appendChild(sub);
      }
      c.appendChild(row);
      requestAnimationFrame(() => requestAnimationFrame(() => { fill.style.width = (it.pct || it.used / it.total * 100) + '%'; }));
    });
  }

  return { area, donut, bars, hbars };
})();
