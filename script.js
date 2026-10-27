// Número de WhatsApp de Ender (formato internacional sin "+" ni espacios). Reemplazar.
const WHATSAPP = '580000000000';

// Oculta la etiqueta del placeholder cuando la foto real existe en img/
document.querySelectorAll('.ph').forEach((el) => {
  const m = (el.getAttribute('style') || '').match(/url\(['"]?([^'")]+)['"]?\)/);
  if (!m) return;
  const img = new Image();
  img.onload = () => el.classList.add('loaded');
  img.src = m[1];
});

// Menú móvil
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Link activo según la sección visible
const navAnchors = [...links.querySelectorAll('a')];
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navAnchors.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
navAnchors.forEach((a) => {
  const s = document.querySelector(a.getAttribute('href'));
  if (s) spy.observe(s);
});

// Aparición al hacer scroll + contadores
const counters = (el) => {
  el.querySelectorAll('[data-count]').forEach((n) => {
    const target = +n.dataset.count;
    const suffix = n.dataset.suffix || '';
    const dec = +(n.dataset.dec || 0);
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min((t - start) / 1200, 1);
      n.textContent = (target * (1 - Math.pow(1 - p, 3))).toFixed(dec) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
};
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      counters(e.target);
      io.unobserve(e.target);
    });
  },
  { threshold: 0.15 }
);
document.documentElement.classList.add('js-reveal');
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
// Respaldo: si el visor no dispara el scroll, mostrar todo igual
setTimeout(() => {
  document.querySelectorAll('.reveal:not(.in), .split:not(.in)').forEach((el) => {
    el.classList.add('in');
    counters(el);
    io.unobserve(el);
  });
}, 1500);

// Carrusel "Universo"
const rail = document.getElementById('rail');
document.querySelectorAll('.arrow').forEach((b) =>
  b.addEventListener('click', () => {
    const card = rail.querySelector('.u-card');
    rail.scrollBy({ left: (card.offsetWidth + 14) * +b.dataset.dir, behavior: 'smooth' });
  })
);

// Filtros del portafolio
document.querySelectorAll('.filter').forEach((btn) =>
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((b) => b.classList.toggle('active', b === btn));
    const f = btn.dataset.filter;
    document.querySelectorAll('.g-item').forEach((it) => {
      it.classList.toggle('hide', f !== 'all' && it.dataset.cat !== f);
    });
  })
);

// Formulario → WhatsApp
document.getElementById('bookForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const d = new FormData(e.target);
  const msg =
    `Hola Ender! Soy ${d.get('nombre')}.\n` +
    `Servicio: ${d.get('servicio')}\n` +
    (d.get('fecha') ? `Fecha: ${d.get('fecha')}\n` : '') +
    (d.get('mensaje') ? `\n${d.get('mensaje')}` : '');
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Media kit: pestañas por plataforma ----------
const tabs = [...document.querySelectorAll('.tab')];
tabs.forEach((t) =>
  t.addEventListener('click', () => {
    tabs.forEach((x) => {
      const on = x === t;
      x.classList.toggle('active', on);
      x.setAttribute('aria-selected', on);
      document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
    });
  })
);

// ---------- Datos públicos (29 sep – 1 oct 2026) ----------
// Instagram @makeupbyender: likes por post, del más antiguo al más reciente.
// El post viral (96,724 likes, 2 sep) va aparte porque se sale de la escala.
const IG_POSTS = [
  { l: 'Foto', d: 'dic 2025', v: 275 },
  { l: 'Foto', d: 'jun 2026', v: 179 },
  { l: 'Foto', d: 'jun 2026', v: 389 },
  { l: 'Sun Zapper', d: 'jul 2026', v: 273 },
  { l: 'Mis 26', d: 'jul 2026', v: 641 },
  { l: 'Unposted', d: '7 sep', v: 873 },
  { l: 'Cabanna', d: '12 sep', v: 206 },
  { l: 'Dudamel', d: '26 sep', v: 281 },
  { l: 'Victoria', d: '29 sep', v: 81 },
];
const IG_TYPICAL = 278; // mediana de los 10 posts recientes (incluye el viral)

// YouTube @Makeupbyender: views por vlog, del 001 al 008.
const YT_VLOGS = [
  { l: '001', d: 'Mi primer vlog', v: 623 },
  { l: '002', d: 'Una semana bastante variada', v: 249 },
  { l: '003', d: 'Modelando para Juus', v: 121 },
  { l: '004', d: 'Mi primera vez en el circo', v: 131 },
  { l: '005', d: 'Descubrí mi pizza favorita', v: 83 },
  { l: '006', d: 'Hairstylist personal de Fabiartist', v: 203 },
  { l: '007', d: 'Semana de campañas, fotos y clientas', v: 41 },
  { l: '008', d: '4 eventos en una semana', v: 25 },
];

const fmt = (n) => n.toLocaleString('es-VE');
const tip = document.getElementById('tip');
const showTip = (e, html) => {
  tip.innerHTML = html;
  tip.hidden = false;
  const r = (e.currentTarget || e.target).getBoundingClientRect();
  const x = e.clientX ?? r.left + r.width / 2;
  const y = e.clientY ?? r.top;
  tip.style.left = Math.min(x + 12, innerWidth - tip.offsetWidth - 8) + 'px';
  tip.style.top = Math.max(y - tip.offsetHeight - 12, 8) + 'px';
};
const hideTip = () => (tip.hidden = true);

function barChart(el, data, { unit, ref, refLabel, labelKey = 'l', W = 560, H = 230 }) {
  if (!el) return;
  const top = 24, bottom = 34, left = 8, right = 8;
  const max = Math.max(...data.map((d) => d.v), ref || 0);
  const nice = Math.ceil(max / 100) * 100;
  const step = (W - left - right) / data.length;
  const bw = Math.min(34, step * 0.62);
  const y = (v) => top + (H - top - bottom) * (1 - v / nice);
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  const add = (tag, attrs, parent = svg) => {
    const n = document.createElementNS(ns, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    parent.appendChild(n);
    return n;
  };
  [0, 0.5, 1].forEach((f) => add('line', { class: 'grid-l', x1: left, x2: W - right, y1: y(nice * f), y2: y(nice * f) }));
  const maxV = Math.max(...data.map((d) => d.v));
  data.forEach((d, i) => {
    const cx = left + step * i + step / 2;
    const g = add('g', { class: 'b', tabindex: 0, 'aria-label': `${d.l} ${d.d}: ${fmt(d.v)} ${unit}` });
    add('rect', { class: 'bar-hit', x: cx - step / 2, y: top, width: step, height: H - top - bottom });
    const h = Math.max(H - bottom - y(d.v), 2);
    const r = Math.min(4, bw / 2, h);
    const x0 = cx - bw / 2, y0 = H - bottom - h, x1 = cx + bw / 2, yb = H - bottom;
    add('path', { class: 'bar', d: `M${x0},${yb} V${y0 + r} Q${x0},${y0} ${x0 + r},${y0} H${x1 - r} Q${x1},${y0} ${x1},${y0 + r} V${yb} Z` });
    const t = add('text', { x: cx, y: H - bottom + 16, 'text-anchor': 'middle' });
    t.textContent = d[labelKey].length > 10 ? d[labelKey].slice(0, 9) + '…' : d[labelKey];
    if (d.v === maxV) {
      const v = add('text', { class: 'val', x: cx, y: y0 - 6, 'text-anchor': 'middle' });
      v.textContent = fmt(d.v);
    }
    const html = `<b>${fmt(d.v)} ${unit}</b>${d.l} · ${d.d}`;
    g.addEventListener('mousemove', (e) => showTip(e, html));
    g.addEventListener('mouseleave', hideTip);
    g.addEventListener('focus', (e) => showTip(e, html));
    g.addEventListener('blur', hideTip);
  });
  if (ref) {
    add('line', { class: 'ref', x1: left, x2: W - right, y1: y(ref), y2: y(ref) });
    const t = add('text', { class: 'ref-t', x: W - right, y: y(ref) - 6, 'text-anchor': 'end' });
    t.textContent = refLabel;
  }
  el.appendChild(svg);
}
barChart(document.getElementById('chartIg'), IG_POSTS, { unit: 'likes', ref: IG_TYPICAL, refLabel: `Típico: ${IG_TYPICAL}` });
barChart(document.getElementById('chartYt'), YT_VLOGS, { unit: 'views', W: 1000, H: 240 });

// Botón de marcas → deja el formulario listo
document.querySelectorAll('[data-brand]').forEach((b) =>
  b.addEventListener('click', () => {
    const s = document.getElementById('servicio');
    if (s) s.value = 'Colaboración de marca';
  })
);

// =========================================================
// Rediseño: movimiento
// =========================================================
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Entrada del hero
requestAnimationFrame(() => document.querySelector('.hx')?.classList.add('go'));

// Títulos que aparecen línea por línea
document.querySelectorAll('h2.display-md, .contact .display').forEach((h) => {
  const lines = h.innerHTML.split(/<br\s*\/?>/i);
  h.innerHTML = lines.map((l) => `<span class="ln"><span>${l.trim()}</span></span>`).join('');
  h.classList.add('split');
  io.observe(h);
});

// Barra de progreso de lectura
const bar = document.getElementById('progress');
const onScroll = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Cursor (solo con mouse y sin "reducir movimiento")
const cur = document.getElementById('cursor');
if (matchMedia('(pointer: fine)').matches && !reduceMotion) {
  document.documentElement.classList.add('has-cursor');
  let x = 0, y = 0, cx = 0, cy = 0;
  addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; cur.classList.add('on'); });
  document.addEventListener('pointerleave', () => cur.classList.remove('on'));
  const loop = () => {
    cx += (x - cx) * 0.22; cy += (y - cy) * 0.22;
    cur.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(loop);
  };
  loop();
  document.addEventListener('pointerover', (e) => {
    cur.classList.toggle('big', !!e.target.closest('a, button, .win-bar, .g-item, .u-card'));
  });
} else {
  cur.remove();
}

// Ender OS: ventanas arrastrables (escritorio)
const desk = document.getElementById('desk');
if (desk) {
  let zTop = 10;
  desk.querySelectorAll('.win').forEach((w) => {
    w.addEventListener('pointerdown', () => (w.style.zIndex = ++zTop));
    const handle = w.querySelector('.win-bar');
    handle.addEventListener('pointerdown', (e) => {
      if (matchMedia('(max-width: 860px)').matches) return;
      e.preventDefault();
      const d = desk.getBoundingClientRect();
      const sx = e.clientX, sy = e.clientY, ox = w.offsetLeft, oy = w.offsetTop;
      w.classList.add('drag');
      handle.setPointerCapture(e.pointerId);
      const move = (ev) => {
        const nx = Math.max(-w.offsetWidth * 0.5, Math.min(d.width - w.offsetWidth * 0.5, ox + ev.clientX - sx));
        const ny = Math.max(0, Math.min(d.height - 40, oy + ev.clientY - sy));
        w.style.left = nx + 'px';
        w.style.top = ny + 'px';
      };
      const up = () => {
        w.classList.remove('drag');
        handle.removeEventListener('pointermove', move);
        handle.removeEventListener('pointerup', up);
      };
      handle.addEventListener('pointermove', move);
      handle.addEventListener('pointerup', up);
    });
  });
}

// Reloj de Caracas en la barra de Ender OS
const clock = document.getElementById('osClock');
const tick = () => {
  if (!clock) return;
  const t = new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Caracas' });
  clock.textContent = `Caracas · ${t}`;
};
tick();
setInterval(tick, 30000);

// ---------- Escritorio (ref. bychudy): íconos arrastrables + Vista previa ----------
const pv = document.getElementById('preview');
const openPreview = (src, title) => {
  document.getElementById('pvImg').style.setProperty('--img', src.startsWith('var(') ? src : `url('${src}')`);
  document.getElementById('pvTitle').textContent = title;
  pv.hidden = false;
};
document.getElementById('pvClose')?.addEventListener('click', () => (pv.hidden = true));
addEventListener('keydown', (e) => { if (e.key === 'Escape' && pv) pv.hidden = true; });

document.querySelectorAll('.dk .ic').forEach((ic) => {
  let sx, sy, ox, oy, moved = false;
  ic.addEventListener('pointerdown', (e) => {
    if (matchMedia('(max-width: 860px)').matches) return;
    sx = e.clientX; sy = e.clientY; ox = ic.offsetLeft; oy = ic.offsetTop; moved = false;
    ic.setPointerCapture(e.pointerId);
    const box = ic.parentElement.getBoundingClientRect();
    const move = (ev) => {
      const dx = ev.clientX - sx, dy = ev.clientY - sy;
      if (!moved && Math.hypot(dx, dy) < 5) return;
      moved = true;
      ic.classList.add('drag');
      ic.style.left = Math.max(0, Math.min(box.width - ic.offsetWidth, ox + dx)) + 'px';
      ic.style.top = Math.max(0, Math.min(box.height - ic.offsetHeight, oy + dy)) + 'px';
    };
    const up = () => {
      ic.classList.remove('drag');
      ic.removeEventListener('pointermove', move);
      ic.removeEventListener('pointerup', up);
    };
    ic.addEventListener('pointermove', move);
    ic.addEventListener('pointerup', up);
  });
  ic.addEventListener('click', () => { if (!moved) openPreview(ic.dataset.full, ic.dataset.title); moved = false; });
});
