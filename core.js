/* Lechería Conecta · núcleo: almacén de datos, acciones, utilidades y enrutador.
   Los datos viven en el navegador (localStorage) y se sincronizan entre pestañas.
   En producción, este archivo se conecta a la API descrita en el plan. */
(() => {
  const A = window.L360, KEY = 'lchc:v5', PK = 'lchc:prefs';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const now = () => Date.now();
  const uid = p => p + Math.random().toString(36).slice(2, 8);
  const find = (arr, id) => arr.find(x => x.id === id);
  const EMBED = new URLSearchParams(location.search).has('embed');
  if (EMBED) document.documentElement.classList.add('embed');

  /* ---------- iconos ---------- */
  const IC = {
    home: 'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z', news: 'M4 5h13v14H6a2 2 0 0 1-2-2zM17 9h3v8a2 2 0 0 1-2 2M8 9h5M8 13h5',
    camera: 'M4 8h3l2-3h6l2 3h3v11H4zM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z', pin: 'M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
    user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0', shield: 'M12 3l8 3v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6z',
    cone: 'M9 4h6l4 15H5zM3 20h18M8 10h8M7 15h10', helmet: 'M4 16a8 8 0 0 1 16 0zM2 16h20v3H2zM12 8V5', calendar: 'M5 5h14v15H5zM5 10h14M9 3v4M15 3v4',
    bell: 'M6 16v-5a6 6 0 1 1 12 0v5l2 2H4zM10 21h4', check: 'M5 12l5 5 9-10', x: 'M6 6l12 12M18 6L6 18', plus: 'M12 5v14M5 12h14',
    chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2', mega: 'M4 10v4h3l8 5V5l-8 5zM18 9a4 4 0 0 1 0 6',
    truck: 'M2 7h11v9H2zM13 10h5l3 3v3h-8zM6.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    phone: 'M6 3h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 4 5a2 2 0 0 1 2-2z', alert: 'M12 4l9 16H3zM12 10v5M12 17.5v.5',
    cross: 'M9 4h6v5h5v6h-5v5H9v-5H4V9h5z', flame: 'M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z', case: 'M4 8h16v11H4zM9 8V5h6v3M4 13h16',
    star: 'M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 17l-5.4 2.8 1.1-6.1L3.2 9.4l6.1-.8z', back: 'M15 5l-7 7 7 7', play: 'M7 4l13 8-13 8z',
    down: 'M12 4v11M7 11l5 5 5-5M5 20h14', refresh: 'M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5', users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2 20a7 7 0 0 1 14 0M17 11a3 3 0 1 0-1-5.8M18 14a6 6 0 0 1 4 6',
    ticket: 'M3 8a2 2 0 0 0 0 8v3h18v-3a2 2 0 0 1 0-8V5H3zM14 6v12', send: 'M3 11l18-8-7 18-3-7z', clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
    bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.500c.7.7 1 1.500 1 2.500h6c0-1 .3-1.800 1-2.500A6 6 0 0 0 12 3z', trash: 'M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13',
    drop: 'M12 3s6 6.500 6 11a6 6 0 0 1-12 0c0-4.500 6-11 6-11z', tree: 'M12 21v-6M12 15a5 5 0 0 1-4-8 4 4 0 0 1 8 0 5 5 0 0 1-4 8z', grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
    bolt: 'M13 2L4 14h7l-1 8 9-12h-7z', wave: 'M2 10c2.500 0 2.500-2 5-2s2.500 2 5 2 2.500-2 5-2 2.500 2 5 2M2 16c2.500 0 2.500-2 5-2s2.500 2 5 2 2.500-2 5-2 2.500 2 5 2', type: 'M4 7V5h11v2M9.500 5v14M7 19h5M14 12v-1h7v1M17.500 11v8M16 19h3',
    info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v6M12 7.500v.500', arrow: 'M5 12h14M13 6l6 6-6 6', city: 'M3 21h18M5 21V8l6-4v17M11 21V10h8v11M8 10v.5M8 14v.5M8 18v.5M14 13h2M14 17h2', contrast: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 3v18',
    wifi: 'M2 9a15 15 0 0 1 20 0M5 12.500a10 10 0 0 1 14 0M8.500 16a5 5 0 0 1 7 0M12 19.500v.500', off: 'M3 3l18 18M8.500 16a5 5 0 0 1 7 0M5 12.500a10 10 0 0 1 4-2.300M2 9a15 15 0 0 1 4.500-2.900M14 8.300a10 10 0 0 1 5 4.200M12 19.500v.500', plug: 'M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4'
  };
  const ic = (n, s = 20) => `<svg class="ic" viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${IC[n] || IC.plus}"/></svg>`;
  const qiu = (h = 18) => `<svg class="qiu" viewBox="0 0 168 100" height="${h}" role="img" aria-label="Qiu"><path fill-rule="evenodd" d="M38.1 10.6a38.1 36.4 0 1 0 0 72.8a38.1 36.4 0 1 0 0-72.8zm0 18.9a17.3 17.3 0 1 1 0 34.6a17.3 17.3 0 1 1 0-34.6z"/><path d="M34 76q7 16 16.6 22q3.4 2 6.4 2h14.3V85.3H64q-7-.3-7.700-7.300l-6-6zM83.900 28.500h18.800v52.900H83.900zM113.100 28.500H133V59q0 7.500 7.700 7.500t7.700-7.500V28.500h19.300v52.900H154l-2-4.600q-6 6.400-16.500 6.400q-22.400 0-22.400-21.200z"/><circle cx="93.600" cy="11.400" r="11.500"/></svg>`;

  /* ---------- formato ---------- */
  const ago = ts => { const m = Math.round((now() - ts) / 60e3); return m < 1 ? 'ahora' : m < 60 ? `hace ${m} min` : m < 1440 ? `hace ${Math.round(m / 60)} h` : `hace ${Math.round(m / 1440)} d`; };
  const fdt = ts => new Date(ts).toLocaleString('es-VE', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
  const fday = iso => { const d = new Date(iso + 'T12:00:00'); return { d: d.getDate(), m: d.toLocaleString('es-VE', { month: 'short' }).replace('.', ''), w: d.toLocaleString('es-VE', { weekday: 'long' }) }; };
  const money = n => 'US$ ' + Number(n || 0).toLocaleString('es-VE');
  const flong = (ts = now()) => { const d = new Date(ts).toLocaleDateString('es-VE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); return d.charAt(0).toUpperCase() + d.slice(1); };
  const greet = () => { const h = new Date().getHours(); return h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches'; };
  const dur = ms => { const s = Math.round(ms / 1e3); return s < 60 ? s + ' s' : s < 3600 ? Math.round(s / 60) + ' min' : (s / 3600).toFixed(1) + ' h'; };

  /* ---------- almacén ---------- */
  let S; const subs = [];
  const persist = () => { for (let i = 0; i < 4; i++) { try { localStorage.setItem(KEY, JSON.stringify(S)); return; } catch (e) { const r = S.reports.find(x => x.photo); if (r) r.photo = null; else return; } } };
  const fire = ext => subs.forEach(f => f(S, ext));
  const commit = fn => { fn(S); persist(); fire(false); };
  const load = () => { try { S = JSON.parse(localStorage.getItem(KEY)); } catch (e) { S = null; } if (!S || S.v !== 5) { S = A.seed(); persist(); } };
  window.addEventListener('storage', e => { if (e.key === KEY && e.newValue) { try { S = JSON.parse(e.newValue); fire(true); } catch (x) {} } });
  const note = (s, to, txt, link, svc) => { s.notifs.unshift({ id: uid('n'), to, txt, link, svc, ts: now(), read: false }); s.notifs.length = Math.min(s.notifs.length, 80); };
  const cname = (s, id) => (find(s.contractors, id) || {}).name || 'Contratista';

  /* ---------- conexión: la app sigue funcionando sin internet ---------- */
  const online = () => navigator.onLine && sessionStorage.lchcOff !== '1';
  const netType = () => { const c = navigator.connection; return c && c.type ? c.type : ''; };

  /* ---------- acciones de negocio ---------- */
  const act = {
    sosCreate(type, loc) { let id; const q = !online(); commit(s => { id = 'SOS-' + (++s.seq.sos); s.sos.push({ id, type, name: s.me.name, phone: s.me.phone, contact: s.me.contact, lat: loc.lat, lng: loc.lng, sector: loc.sector, real: !!loc.real, ts: now(), status: 'nueva', mine: true, queued: q, log: [{ ts: now(), txt: q ? 'Sin conexión: alerta en espera de señal' : 'Alerta enviada desde la app' }] }); if (!q) note(s, 'seguridad', `SOS de ${s.me.name}: ${A.STYPES[type].n} en ${loc.sector}`, '#/seguridad'); }); return id; },
    sosTake(id, op) { commit(s => { const x = find(s.sos, id); if (!x || x.status !== 'nueva') return; x.status = 'recibida'; x.op = op; x.t1 = now(); x.log.push({ ts: now(), txt: 'Recibida por ' + op }); note(s, 'ciudadano', 'Tu alerta fue recibida. Un operador ya la atiende.', '#/ciudadano/sos'); }); },
    sosDispatch(id, unit) { commit(s => { const x = find(s.sos, id), u = find(s.units, unit); if (!x || !u) return; x.status = 'en_camino'; x.unit = unit; x.t2 = now(); u.status = 'en_camino'; x.log.push({ ts: now(), txt: u.name + ' va en camino' }); note(s, 'ciudadano', u.name + ' va en camino a tu ubicación.', '#/ciudadano/sos'); }); },
    sosClose(id, txt, cancel) { commit(s => { const x = find(s.sos, id); if (!x) return; x.status = cancel ? 'cancelada' : 'atendida'; x.t3 = now(); const u = find(s.units, x.unit); if (u) u.status = 'disponible'; x.log.push({ ts: now(), txt: txt || (cancel ? 'Alerta cancelada por el ciudadano' : 'Caso atendido y cerrado') }); note(s, cancel ? 'seguridad' : 'ciudadano', cancel ? `${x.name} canceló la alerta ${id}` : 'Tu alerta fue atendida. Caso cerrado.', cancel ? '#/seguridad' : '#/ciudadano/sos'); }); },
    reportCreate(d) { let id; const q = !online(); commit(s => { id = 'LCH-' + (++s.seq.rep); s.reports.push({ id, ...d, ts: now(), status: 'recibido', by: s.me.name, mine: true, queued: q, log: [{ ts: now(), txt: q ? 'Guardado en el teléfono. Se enviará cuando vuelva la señal.' : 'Reporte recibido' }] }); if (!q) note(s, 'alcaldia', `Nuevo reporte ${id}: ${A.CATS[d.cat].n} en ${d.sector}`, '#/alcaldia/reportes'); }); return id; },
    flush() { let n = 0; if (S.reports.some(r => r.queued) || S.sos.some(x => x.queued)) commit(s => { s.reports.filter(r => r.queued).forEach(r => { r.queued = false; r.ts = now(); r.log.push({ ts: now(), txt: 'Reporte recibido' }); note(s, 'alcaldia', `Nuevo reporte ${r.id}: ${A.CATS[r.cat].n} en ${r.sector}`, '#/alcaldia/reportes'); n++; }); s.sos.filter(x => x.queued).forEach(x => { x.queued = false; x.ts = now(); x.log.push({ ts: now(), txt: 'Enviada al volver la conexión' }); note(s, 'seguridad', `SOS de ${x.name}: ${A.STYPES[x.type].n} en ${x.sector}`, '#/seguridad'); n++; }); }); return n; },
    wifiVote(id, ok) { commit(s => { const w = find(s.wifi, id); if (!w) return; if (ok) w.yes++; else w.no++; w.voted = ok ? 'si' : 'no'; }); },
    wifiSet(id, p) { commit(s => { const w = find(s.wifi, id); if (!w) return; Object.assign(w, p, { ts: now() }); if (p.status === 'caido') note(s, 'ciudadano', `Punto WiFi sin servicio: ${w.n}`, '#/ciudadano/wifi'); }); },
    reportSet(id, p) { commit(s => { const r = find(s.reports, id); if (!r) return; if (p.dept && p.dept !== r.dept) { r.dept = p.dept; if (r.status === 'recibido') r.status = 'asignado'; r.log.push({ ts: now(), txt: 'Asignado a ' + p.dept }); } if (p.status && p.status !== r.status) { r.status = p.status; r.log.push({ ts: now(), txt: p.note || 'Estado: ' + A.RSTATUS[p.status] }); } else if (p.note) r.log.push({ ts: now(), txt: p.note }); if (r.mine) note(s, 'ciudadano', `Tu reporte ${id} está en estado: ${A.RSTATUS[r.status].toLowerCase()}.`, '#/ciudadano/reportes/' + id); }); },
    reportRate(id, n) { commit(s => { const r = find(s.reports, id); if (r) r.rating = n; }); },
    requestCreate(d) { let id; commit(s => { id = 'SOL-0' + (++s.seq.req); s.requests.push({ id, ...d, ts: now(), status: 'abierta', bids: [] }); d.invited.forEach(c => note(s, 'contratista:' + c, `Nueva solicitud ${id}: ${d.title}`, '#/contratista/solicitudes')); const r = d.report && find(s.reports, d.report); if (r) { if (r.status === 'recibido') r.status = 'asignado'; r.request = id; r.log.push({ ts: now(), txt: `Solicitud ${id} enviada a contratistas` }); if (r.mine) note(s, 'ciudadano', `Tu reporte ${r.id} fue enviado a contratistas.`, '#/ciudadano/reportes/' + r.id); } }); return id; },
    bid(req, c, d) { commit(s => { const q = find(s.requests, req); if (!q) return; q.bids = q.bids.filter(b => b.c !== c); q.bids.push({ c, ...d, ts: now() }); note(s, 'alcaldia', `${cname(s, c)} ${d.declined ? 'declinó' : 'cotizó'} la solicitud ${req}`, '#/alcaldia/obras'); }); },
    award(req, c) { commit(s => { const q = find(s.requests, req); if (!q) return; const b = q.bids.find(x => x.c === c) || {}, r = q.report && find(s.reports, q.report), p = A.SECTORS['Casco Central']; const wid = uid('w'), D = 864e5;
      q.status = 'adjudicada'; q.awarded = c; q.work = wid;
      s.works.unshift({ id: wid, title: q.title, kind: q.kind, sector: r ? r.sector : 'Casco Central', lat: r ? r.lat : p[0], lng: r ? r.lng : p[1], contractor: c, pct: 0, start: new Date().toISOString().slice(0, 10), end: new Date(now() + (b.days || 15) * D).toISOString().slice(0, 10), budget: b.amount || q.budget, desc: q.scope, request: req, report: q.report, updates: [{ ts: now(), pct: 0, txt: 'Adjudicada a ' + cname(s, c) }] });
      if (r) { r.status = 'en_proceso'; r.work = wid; r.log.push({ ts: now(), txt: 'Trabajo adjudicado a ' + cname(s, c) }); if (r.mine) note(s, 'ciudadano', `Tu reporte ${r.id} ya tiene contratista asignado.`, '#/ciudadano/reportes/' + r.id); }
      q.invited.forEach(x => note(s, 'contratista:' + x, x === c ? `Te adjudicaron la solicitud ${req}` : `La solicitud ${req} fue adjudicada a otro proveedor`, x === c ? '#/contratista/obras' : '#/contratista/solicitudes')); }); },
    workUpdate(id, d) { commit(s => { const w = find(s.works, id); if (!w) return; w.pct = d.pct; w.updates.push({ ts: now(), pct: d.pct, txt: d.txt, photo: d.photo || null }); note(s, 'alcaldia', `${cname(s, w.contractor)} reportó ${d.pct} % de avance en «${w.title}»`, '#/alcaldia/obras'); const r = w.report && find(s.reports, w.report); if (r && d.pct >= 100) { r.status = 'resuelto'; r.log.push({ ts: now(), txt: 'Trabajo terminado por ' + cname(s, w.contractor) }); if (r.mine) note(s, 'ciudadano', `Tu reporte ${r.id} fue resuelto. Califica la atención.`, '#/ciudadano/reportes/' + r.id); } }); },
    publish(col, d, label, tab) { commit(s => { s[col].unshift({ id: uid(col[0]), ts: now(), ...d }); if (label) note(s, 'ciudadano', label + ': ' + d.title, '#/ciudadano/ciudad/' + tab); }); },
    remove(col, id) { commit(s => { s[col] = s[col].filter(x => x.id !== id); }); },
    eventToggle(id) { commit(s => { const e = find(s.events, id); if (e) { e.mine = !e.mine; e.going += e.mine ? 1 : -1; } }); },
    unitSet(id, status) { commit(s => { const u = find(s.units, id); if (u) u.status = status; }); },
    serviceSet(id, p) { commit(s => { const x = find(s.services, id); if (!x) return; Object.assign(x, p, { ts: now() }); note(s, 'ciudadano', `${x.n}: ${A.SVC[x.status][0].toLowerCase()}${x.status !== 'ok' && x.sectors && x.sectors.length ? ' en ' + x.sectors.join(', ') : ''}. ${x.note}`, '#/ciudadano/ciudad/servicios', x.id); }); },
    beachSet(id, p) { commit(s => { const x = find(s.beaches, id); if (!x) return; Object.assign(x, p, { ts: now() }); note(s, 'ciudadano', `${x.n}: ${A.BEACH[x.status][0].toLowerCase()}. ${x.note}`, '#/ciudadano/ciudad/servicios'); }); },
    profile(d) { commit(s => { Object.assign(s.me, d); }); },
    readAll(to) { if (S.notifs.some(n => n.to === to && !n.read)) commit(s => s.notifs.forEach(n => { if (n.to === to) n.read = true; })); },
    reset() { S = A.seed(); persist(); fire(false); }
  };

  /* ---------- ubicación y fotos ---------- */
  const nearest = (lat, lng) => { let best = null, bd = 1e9; for (const k in A.SECTORS) { const d = Math.hypot(A.SECTORS[k][0] - lat, A.SECTORS[k][1] - lng); if (d < bd) { bd = d; best = k; } } return bd < .06 ? best : null; };
  const fakeLoc = sector => { const b = A.SECTORS[sector] || A.SECTORS['Casco Central']; return { lat: b[0] + (Math.random() - .5) * .0016, lng: b[1] + (Math.random() - .5) * .0016, sector: A.SECTORS[sector] ? sector : 'Casco Central', real: false }; };
  const locate = sector => new Promise(res => { const fb = fakeLoc(sector); let done = false; const end = v => { if (!done) { done = true; res(v); } };
    if (!navigator.geolocation) return end(fb); setTimeout(() => end(fb), 3600);
    try { navigator.geolocation.getCurrentPosition(p => { const sec = nearest(p.coords.latitude, p.coords.longitude); end(sec ? { lat: p.coords.latitude, lng: p.coords.longitude, sector: sec, real: true } : fb); }, () => end(fb), { enableHighAccuracy: true, timeout: 3300, maximumAge: 6e4 }); } catch (e) { end(fb); } });
  const readPhoto = file => new Promise(res => { if (!file) return res(null); const fr = new FileReader(); fr.onerror = () => res(null); fr.onload = () => { const im = new Image(); im.onerror = () => res(null); im.onload = () => { const k = Math.min(1, 900 / Math.max(im.width, im.height)), c = document.createElement('canvas'); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); res(c.toDataURL('image/jpeg', .62)); }; im.src = fr.result; }; fr.readAsDataURL(file); });

  /* ---------- mapa (Leaflet + OpenStreetMap) ---------- */
  const map = (el, pts, o = {}) => { if (!el) return; pts = pts.filter(p => p && p.lat != null);
    if (!window.L) { el.innerHTML = `<div class="map-off">${ic('pin', 28)}<p>El mapa necesita conexión a internet.</p><ul>${pts.slice(0, 6).map(p => `<li>${esc(p.t || '')}</li>`).join('')}</ul></div>`; return; }
    const m = L.map(el, { zoomControl: !o.mini, scrollWheelZoom: !o.mini, dragging: !o.lock, attributionControl: !o.mini }).setView(o.center || [10.2015, -64.6865], o.zoom || 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(m);
    const ll = pts.map(p => { const mk = L.marker([p.lat, p.lng], { icon: L.divIcon({ className: '', html: `<span class="pin pin-${p.k || 'a'}">${ic(p.i || 'pin', 15)}</span>`, iconSize: [30, 30], iconAnchor: [15, 15] }) }).addTo(m); if (p.t) mk.bindPopup(`<b>${esc(p.t)}</b>${p.s ? '<br>' + esc(p.s) : ''}${p.href ? `<br><a href="${p.href}">Abrir</a>` : ''}`); return [p.lat, p.lng]; });
    if (ll.length > 1 && o.fit !== false) m.fitBounds(ll, { padding: [34, 34], maxZoom: 16 }); else if (ll.length === 1) m.setView(ll[0], o.zoom || 16);
    setTimeout(() => m.invalidateSize(), 80); return m; };

  /* ---------- interfaz común ---------- */
  const views = {}, on = {};
  const toast = t => { $$('.toast').forEach(x => x.remove()); const d = document.createElement('div'); d.className = 'toast'; d.setAttribute('role', 'status'); d.textContent = t; document.body.append(d); setTimeout(() => d.classList.add('out'), 2800); setTimeout(() => d.remove(), 3300); };
  const closeModal = () => { const m = $('.modal'); if (m) m.remove(); };
  on.close = closeModal;
  const modal = (html, cls = '') => { closeModal(); const d = document.createElement('div'); d.className = 'modal ' + cls; d.innerHTML = `<div class="modal-box" role="dialog" aria-modal="true"><button class="modal-x" data-act="close" aria-label="Cerrar">${ic('x')}</button>${html}</div>`; d.addEventListener('mousedown', e => { if (e.target === d) closeModal(); }); document.body.append(d); return d; };
  const beep = () => { try { const C = window.AudioContext || window.webkitAudioContext, c = new C(), g = c.createGain(); g.connect(c.destination); [0, .22, .44].forEach(t => { const o = c.createOscillator(); o.type = 'square'; o.frequency.value = 880; o.connect(g); g.gain.setValueAtTime(.06, c.currentTime + t); o.start(c.currentTime + t); o.stop(c.currentTime + t + .14); }); setTimeout(() => c.close(), 900); } catch (e) {} };
  const chip = (k, txt) => `<span class="chip chip-${k}">${esc(txt)}</span>`;
  const timeline = (steps, cur) => `<ol class="tl">${steps.map((s, i) => `<li class="${i < cur ? 'done' : i === cur ? 'now' : ''}"><span class="tl-dot">${i < cur ? ic('check', 13) : ''}</span><span>${esc(s)}</span></li>`).join('')}</ol>`;
  const log = l => `<ul class="log">${[...l].reverse().map(x => `<li><time>${fdt(x.ts)}</time><span>${esc(x.txt)}</span>${x.photo ? `<img src="${x.photo}" alt="Evidencia fotográfica">` : ''}</li>`).join('')}</ul>`;
  const credit = () => `<footer class="credit"><span class="credit-mark">${qiu(15)}<small>Agency</small></span><p>Sitio desarrollado por <b>Qiu Agency</b> de Qiu Capital Group C.A. · RIF: J-50880192-0</p><p class="credit-note">Prototipo de demostración. Los datos, personas y empresas que aparecen son ficticios. No es un canal oficial ni contacta servicios de emergencia reales: ante una emergencia llama al 911.</p></footer>`;
  const bell = to => { const n = S.notifs.filter(x => x.to === to && !x.read).length; return `<button class="bell" data-act="notifs" data-to="${to}" aria-label="Notificaciones${n ? ` (${n} sin leer)` : ''}">${ic('bell')}${n ? `<i>${n}</i>` : ''}</button>`; };

  /* ---------- «Ver mejor»: tamaño de letra, contraste y animaciones ---------- */
  const prefs = (() => { try { return JSON.parse(localStorage.getItem(PK)) || {}; } catch (e) { return {}; } })();
  const applyPrefs = () => { const h = document.documentElement; h.classList.remove('fs-g', 'fs-xg'); if (prefs.fs === 'g' || prefs.fs === 'xg') h.classList.add('fs-' + prefs.fs); h.classList.toggle('hc', !!prefs.hc); h.classList.toggle('calm', !!prefs.calm); };
  const setPref = (k, v) => { prefs[k] = v; try { localStorage.setItem(PK, JSON.stringify(prefs)); } catch (e) {} applyPrefs(); };
  applyPrefs();
  window.addEventListener('storage', e => { if (e.key === PK) { try { Object.keys(prefs).forEach(k => delete prefs[k]); Object.assign(prefs, JSON.parse(e.newValue) || {}); } catch (x) {} applyPrefs(); } });
  const aa = (short) => `<button class="aa" data-act="view" aria-label="Ver mejor: tamaño de letra y contraste">${ic('type', 20)}${short ? '' : '<span>Ver mejor</span>'}</button>`;
  const sw = (act, on_, t, d) => `<button class="sw-row" role="switch" aria-checked="${on_}" data-act="${act}"><span><b>${t}</b><small>${d}</small></span><i class="sw ${on_ ? 'on' : ''}" aria-hidden="true"></i></button>`;
  const viewModal = () => modal(`<div class="read view-set"><h2>Ver mejor</h2><p class="lead">Ajusta la pantalla a tu gusto. El cambio se guarda en este equipo y se aplica a todos los portales.</p>
    <fieldset class="pref"><legend>Tamaño de letra</legend><div class="pref-opts">${[['n', 'Normal', '1.1rem'], ['g', 'Grande', '1.4rem'], ['xg', 'Muy grande', '1.7rem']].map(([v, n, f]) => `<button data-act="fs" data-v="${v}" aria-pressed="${(prefs.fs || 'n') === v}"><span style="font-size:${f}">Aa</span>${n}</button>`).join('')}</div></fieldset>
    ${sw('hc', !!prefs.hc, 'Alto contraste', 'Letras más oscuras y bordes bien marcados')}${sw('calm', !!prefs.calm, 'Menos movimiento', 'Quita las animaciones y los destellos')}
    <button class="btn btn-mar btn-lg btn-block" data-act="close">Listo</button></div>`, 'view');
  on.view = viewModal;
  on.fs = el => { setPref('fs', el.dataset.v); viewModal(); };
  on.hc = () => { setPref('hc', !prefs.hc); viewModal(); };
  on.calm = () => { setPref('calm', !prefs.calm); viewModal(); };
  const tone = (map, k) => (map[k] || ['', 'ok'])[1];
  const st = (map, k) => { const [n, t] = map[k] || ['—', 'ok']; return `<span class="st st-${t}">${ic(t === 'ok' ? 'check' : t === 'warn' ? 'alert' : 'x', 15)}${esc(n)}</span>`; };

  /* ---------- enrutador ---------- */
  let lastRoute = '', pending = false;
  const parts = () => location.hash.replace(/^#\/?/, '').split('?')[0].split('/').filter(Boolean).map(decodeURIComponent);
  const render = () => { const p = parts(), app = $('#app'), same = lastRoute === location.hash, keep = same ? $$('[data-scroll]', app).map(e => e.scrollTop) : [], wy = window.scrollY;
    const out = (views[p[0] || 'inicio'] || views.inicio)(p.slice(1)), o = typeof out === 'string' ? { html: out } : out;
    app.innerHTML = o.html; app.dataset.view = p[0] || 'inicio'; if (o.after) o.after(app);
    if (same) { $$('[data-scroll]', app).forEach((e, i) => { e.scrollTop = keep[i] || 0; }); window.scrollTo(0, wy); } else { window.scrollTo(0, 0); closeModal(); }
    lastRoute = location.hash; pending = false; if (A.tour) A.tour.sync(); };
  const busy = () => { const a = document.activeElement; return a && $('#app').contains(a) && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName); };
  const go = h => { if (location.hash === h) render(); else location.hash = h; };
  on.notifs = el => { const to = el.dataset.to, list = S.notifs.filter(n => n.to === to).slice(0, 14);
    modal(`<h2>Notificaciones</h2>${list.length ? `<ul class="nlist">${list.map(n => `<li class="${n.read ? '' : 'unread'}"><a href="${n.link}" data-act="close">${esc(n.txt)}<time>${ago(n.ts)}</time></a></li>`).join('')}</ul>` : '<p class="empty">Aquí verás los avisos sobre tus casos y lo que pasa en la ciudad.</p>'}`); act.readAll(to); };
  document.addEventListener('click', e => { const el = e.target.closest('[data-act]'); if (!el) return; const f = on[el.dataset.act]; if (f) { if (el.tagName === 'A' && !el.getAttribute('href')) e.preventDefault(); f(el, e); } });
  document.addEventListener('submit', e => { const f = on[e.target.dataset.form]; if (f) { e.preventDefault(); f(e.target, Object.fromEntries(new FormData(e.target))); } });
  document.addEventListener('change', e => { const f = on[e.target.dataset.change]; if (f) f(e.target, e); });
  document.addEventListener('focusout', () => setTimeout(() => { if (pending && !busy()) render(); }, 50));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  const netChange = () => { document.documentElement.classList.toggle('is-off', !online()); if (online()) { const n = act.flush(); if (n) toast(`Volvió la conexión: ${n === 1 ? 'se envió 1 caso guardado' : 'se enviaron ' + n + ' casos guardados'}`); } render(); };
  window.addEventListener('online', netChange); window.addEventListener('offline', netChange);
  A.setOffline = v => { if (v) sessionStorage.lchcOff = '1'; else delete sessionStorage.lchcOff; netChange(); };
  const netBar = () => online() ? '' : `<div class="net-bar" role="status">${ic('off', 20)}<span><b>Sin conexión.</b> Puedes seguir usando la app: lo que envíes se guarda y sale solo cuando vuelva la señal.</span><a href="#/ciudadano/wifi">WiFi cerca</a></div>`;
  A.boot = () => { load(); document.documentElement.classList.toggle('is-off', !online()); subs.push((s, ext) => { const v = parts()[0] || 'inicio'; if ((v === 'inicio' || v === 'demo') && lastRoute === location.hash) { if (A.tour) A.tour.sync(); return; } if (ext && busy()) { pending = true; return; } render(); }); window.addEventListener('hashchange', render); render();
    if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) navigator.serviceWorker.register('sw.js').catch(() => {}); };
  Object.assign(A, { online, netType, netBar, setPref, swRow: sw, $, $$, esc, ic, qiu, ago, fdt, fday, flong, greet, money, dur, aa, st, tone, prefs, find, uid, now, act, locate, fakeLoc, readPhoto, map, toast, modal, closeModal, beep, chip, timeline, log, credit, bell, views, on, go, render, subs, EMBED });
  Object.defineProperty(A, 'S', { get: () => S });
})();
