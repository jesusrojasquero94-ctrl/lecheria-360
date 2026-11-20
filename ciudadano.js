/* Lechería 360 · portal del ciudadano (pensado para el teléfono). */
(() => {
  const A = window.L360, { esc, ic, ago, fdt, fday, act, chip, on, views, go, toast, modal, money } = A;
  const byTs = (a, b) => b.ts - a.ts;
  const live = S => S.sos.filter(x => x.mine && /nueva|recibida|en_camino/.test(x.status)).pop();
  const tab = (id, icon, label, cur) => `<a href="#/ciudadano/${id}" class="${cur === id ? 'on' : ''}" ${cur === id ? 'aria-current="page"' : ''}>${ic(icon, 22)}<span>${label}</span></a>`;
  const shell = (cur, body, o = {}) => `<div class="cz"><div class="cz-app">
    <header class="cz-top">${o.back ? `<a class="cz-back" href="${o.back}" aria-label="Volver">${ic('back')}</a><h1>${esc(o.title || '')}</h1>` : `<a class="wordmark" href="#/" aria-label="Lechería 360, ir al inicio">Lechería <b>360</b></a>`}${A.bell('ciudadano')}</header>
    <main class="cz-main" data-scroll>${body}</main>
    <nav class="cz-tabs" aria-label="Secciones">${tab('inicio', 'home', 'Inicio', cur)}${tab('ciudad', 'news', 'Ciudad', cur)}<a href="#/ciudadano/reportar" class="cz-fab${cur === 'reportar' ? ' on' : ''}">${ic('camera', 24)}<span>Reportar</span></a>${tab('mapa', 'pin', 'Mapa', cur)}${tab('perfil', 'user', 'Perfil', cur)}</nav>
  </div>${A.EMBED ? '' : `<aside class="cz-side"><h2>Portal del ciudadano</h2><p>Así se ve la app en el teléfono de un vecino. Puedes instalarla desde el navegador o seguir en esta ventana.</p><button class="btn btn-sol" data-act="tour">Iniciar recorrido guiado</button><a class="btn btn-line" href="#/demo">Ver ciudadano y operador a la vez</a><a class="link" href="#/">Volver a los portales</a></aside>`}</div>`;
  const repRow = r => `<a class="row-card" href="#/ciudadano/reportes/${r.id}"><span class="cat-ic">${ic(A.CATS[r.cat].i)}</span><span class="row-main"><b>${esc(A.CATS[r.cat].n)}</b><small>${esc(r.id)} · ${esc(r.sector)} · ${ago(r.ts)}</small></span>${chip(r.status, A.RSTATUS[r.status])}</a>`;
  const newsRow = n => `<button class="news-row" data-act="news" data-id="${n.id}"><span class="news-cat c-${n.cat.slice(0, 3).toLowerCase()}">${esc(n.cat)}</span><b>${esc(n.title)}</b><small>${ago(n.ts)}</small></button>`;
  const SOSMSG = { nueva: ['Alerta enviada', 'El centro de seguridad ya la tiene en pantalla. Mantén la app abierta.'], recibida: ['Un operador atiende tu alerta', 'Está asignando la unidad más cercana a tu ubicación.'], en_camino: ['La ayuda va en camino', 'Quédate en un lugar seguro y visible.'], atendida: ['Alerta atendida', 'El caso fue cerrado por el centro de seguridad.'], cancelada: ['Alerta cancelada', 'Avisamos al centro de seguridad que ya no necesitas ayuda.'] };
  const sosView = (a, S) => { const idx = { nueva: 1, recibida: 2, en_camino: 3, atendida: 4, cancelada: 0 }[a.status], u = A.find(S.units, a.unit), end = /atendida|cancelada/.test(a.status);
    return `<section class="sos-live st-${a.status}"><div class="sos-pulse">${ic(A.STYPES[a.type].i, 30)}</div><h2>${SOSMSG[a.status][0]}</h2><p>${SOSMSG[a.status][1]}</p>
      ${a.status === 'cancelada' ? '' : A.timeline(['Enviada', 'Recibida', 'Unidad en camino', 'Atendida'], idx)}
      <div class="mini-map" id="sosmap"></div>
      <dl class="facts"><div><dt>Tipo</dt><dd>${esc(A.STYPES[a.type].n)}</dd></div><div><dt>Ubicación</dt><dd>${esc(a.sector)}${a.real ? '' : ' (simulada)'}</dd></div><div><dt>Unidad</dt><dd>${u ? esc(u.name) : 'Por asignar'}</dd></div><div><dt>Caso</dt><dd>${a.id}</dd></div></dl>
      ${A.log(a.log)}
      <div class="btn-row">${end ? `<button class="btn btn-mar" data-act="sosDone">Entendido</button>` : `<a class="btn btn-line" href="tel:911">${ic('phone', 18)} Llamar al 911</a><button class="btn btn-ghost" data-act="sosCancel" data-id="${a.id}">Cancelar alerta</button>`}</div></section>`; };

  const pages = {
    inicio(p, S) { const a = live(S), road = S.roads.find(r => r.active), mine = S.reports.filter(r => r.mine).sort(byTs).slice(0, 2), h = new Date().getHours();
      return shell('inicio', `<section class="hello"><p>${h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches'}, ${esc(S.me.name.split(' ')[0])}</p><h2>¿Qué necesitas hoy en Lechería?</h2></section>
        ${a ? `<a class="sos-active st-${a.status}" href="#/ciudadano/sos"><span class="sos-pulse">${ic(A.STYPES[a.type].i, 22)}</span><span><b>${SOSMSG[a.status][0]}</b><small>Toca para ver el estado en vivo</small></span></a>`
          : `<section class="sos-block"><a class="sos-btn" href="#/ciudadano/sos" aria-label="Botón de pánico SOS"><span>SOS</span></a><div><h3>Botón de pánico</h3><p>Avisa a seguridad y Protección Civil con tu ubicación exacta.</p></div></section>`}
        ${road ? `<a class="road-banner" href="#/ciudadano/ciudad/vialidad">${ic('cone')}<span><b>${esc(A.ROADKINDS[road.kind])}.</b> ${esc(road.title)}</span></a>` : ''}
        <nav class="quick" aria-label="Accesos rápidos"><a href="#/ciudadano/reportar">${ic('camera')}<span>Reportar un problema</span></a><a href="#/ciudadano/ciudad/vialidad">${ic('cone')}<span>Vialidad</span></a><a href="#/ciudadano/ciudad/eventos">${ic('calendar')}<span>Eventos</span></a><a href="#/ciudadano/ciudad/obras">${ic('helmet')}<span>Obras</span></a></nav>
        <section><header class="sec-h"><h3>Mis reportes</h3><a href="#/ciudadano/reportes">Ver todos</a></header>${mine.map(repRow).join('') || '<p class="empty">Aún no has reportado nada. Toca «Reportar» cuando veas algo que arreglar.</p>'}</section>
        <section><header class="sec-h"><h3>Lo último en la ciudad</h3><a href="#/ciudadano/ciudad/noticias">Más noticias</a></header>${[...S.news].sort(byTs).slice(0, 3).map(newsRow).join('')}</section>`); },

    sos(p, S) { const a = live(S) || A.find(S.sos, sessionStorage.l360sos);
      if (a) return { html: shell('inicio', sosView(a, S), { back: '#/ciudadano/inicio', title: 'Alerta SOS' }), after: el => A.map(A.$('#sosmap', el), [{ ...a, k: 's', i: 'alert', t: 'Tu ubicación' }, a.unit && { ...A.find(S.units, a.unit), k: 'u', i: 'truck', t: 'Unidad asignada' }], { mini: true, zoom: 15 }) };
      return shell('inicio', `<section class="sos-pick"><h2>¿Qué está pasando?</h2><p>Elige una opción. La alerta se envía en 3 segundos con tu ubicación y tus datos de contacto.</p>
        ${Object.entries(A.STYPES).map(([k, t]) => `<button class="sos-type" data-act="sosPick" data-type="${k}">${ic(t.i, 28)}<span><b>${t.n}</b><small>${t.d}</small></span></button>`).join('')}
        <p class="fine">Prototipo: la alerta llega al Centro de Seguridad de esta demostración, no a un servicio real. En una emergencia real llama al 911.</p></section>`, { back: '#/ciudadano/inicio', title: 'Botón de pánico' }); },

    ciudad(p, S) { const t = p[0] || 'noticias', tabs = { noticias: 'Noticias', eventos: 'Eventos', obras: 'Obras', vialidad: 'Vialidad', sucesos: 'Sucesos' };
      const body = {
        noticias: () => [...S.news].sort(byTs).map(newsRow).join(''),
        eventos: () => [...S.events].sort((a, b) => a.date.localeCompare(b.date)).map(e => { const d = fday(e.date); return `<article class="evt"><div class="evt-date"><b>${d.d}</b><span>${d.m}</span></div><div class="evt-main"><small>${esc(e.cat)} · ${d.w}, ${esc(e.time)}</small><h4>${esc(e.title)}</h4><p>${esc(e.place)}. ${esc(e.desc)}</p><div class="btn-row"><button class="btn btn-sm ${e.mine ? 'btn-mar' : 'btn-line'}" data-act="evt" data-id="${e.id}" aria-pressed="${!!e.mine}">${e.mine ? ic('check', 15) + ' Asistiré' : 'Me interesa'}</button>${e.nightz ? `<button class="btn btn-sm btn-ghost" data-act="nightz" data-id="${e.id}">${ic('ticket', 15)} Entradas en Nightz</button>` : ''}<span class="going">${e.going.toLocaleString('es-VE')} interesados</span></div></div></article>`; }).join(''),
        obras: () => S.works.filter(w => w.kind !== 'evento').map(w => `<button class="work-card" data-act="work" data-id="${w.id}"><b>${esc(w.title)}</b><small>${esc(w.sector)} · ${esc((A.find(S.contractors, w.contractor) || {}).name || '')}</small><span class="bar"><i style="width:${w.pct}%"></i></span><span class="work-meta"><span>${w.pct >= 100 ? 'Obra terminada' : w.pct + ' % de avance'}</span><span>Entrega: ${fday(w.end).d} ${fday(w.end).m}</span></span></button>`).join(''),
        vialidad: () => S.roads.filter(r => r.active).sort(byTs).map(r => `<article class="info-card">${chip(r.kind, A.ROADKINDS[r.kind])}<h4>${esc(r.title)}</h4><p>${esc(r.desc)}</p><small>${esc(r.sector || '')} · ${ago(r.ts)}</small></article>`).join('') || '<p class="empty">No hay avisos de vialidad activos. Las vías están despejadas.</p>',
        sucesos: () => [...S.incidents].sort(byTs).map(i => `<article class="info-card">${i.verified ? chip('resuelto', 'Verificado') : ''}<h4>${esc(i.title)}</h4><p>${esc(i.desc)}</p><small>${ago(i.ts)} · Centro de Seguridad</small></article>`).join('')
      };
      return shell('ciudad', `<div class="seg" role="tablist">${Object.entries(tabs).map(([k, v]) => `<a role="tab" aria-selected="${k === t}" class="${k === t ? 'on' : ''}" href="#/ciudadano/ciudad/${k}">${v}</a>`).join('')}</div><div class="feed">${(body[t] || body.noticias)()}</div>`); },

    reportar(p, S) { return shell('reportar', `<form class="form" data-form="report"><h2>Reportar un problema</h2><p class="lead">Tu reporte llega a la dirección responsable de la Alcaldía y puedes seguirlo hasta que se resuelva.</p>
      <fieldset><legend>¿Qué quieres reportar?</legend><div class="cat-grid">${Object.entries(A.CATS).map(([k, c], i) => `<label class="cat-opt"><input type="radio" name="cat" value="${k}" ${i ? '' : 'checked'}><span>${ic(c.i, 22)}${c.n}</span></label>`).join('')}</div></fieldset>
      <label class="photo-drop"><input type="file" name="photo" accept="image/*" capture="environment" data-change="photoPrev"><span class="photo-ph">${ic('camera', 26)}<b>Tomar o subir una foto</b><small>Ayuda a la cuadrilla a ubicar el problema</small></span></label>
      <label>Describe lo que ves<textarea name="desc" rows="3" required maxlength="400" placeholder="Ej.: hueco grande frente a la farmacia, canal derecho"></textarea></label>
      <label>Sector<select name="sector">${Object.keys(A.SECTORS).map(s => `<option ${s === S.me.sector ? 'selected' : ''}>${s}</option>`).join('')}</select></label>
      <label class="check"><input type="checkbox" name="gps" checked><span>Adjuntar mi ubicación GPS exacta</span></label>
      <button class="btn btn-mar btn-block">${ic('send', 18)} Enviar reporte</button></form>`, { back: '#/ciudadano/inicio', title: 'Nuevo reporte' }); },

    reportes(p, S) { const r = p[0] && A.find(S.reports, p[0]);
      if (!r) return shell('inicio', `<h2 class="page-h">Mis reportes</h2>${S.reports.filter(x => x.mine).sort(byTs).map(repRow).join('') || '<p class="empty">Aún no has enviado reportes.</p>'}`, { back: '#/ciudadano/inicio', title: 'Mis reportes' });
      const idx = { recibido: 1, asignado: 2, en_proceso: 3, resuelto: 4 }[r.status], w = A.find(S.works, r.work);
      return { html: shell('inicio', `<article class="rep"><div class="rep-photo">${r.photo ? `<img src="${r.photo}" alt="Foto del reporte">` : `<span>${ic(A.CATS[r.cat].i, 40)}<small>Sin foto</small></span>`}</div>
        <h2>${esc(A.CATS[r.cat].n)}</h2><p class="lead">${esc(r.desc)}</p>${A.timeline(['Recibido', 'Asignado', 'En proceso', 'Resuelto'], idx)}
        <dl class="facts"><div><dt>Número</dt><dd>${r.id}</dd></div><div><dt>Sector</dt><dd>${esc(r.sector)}</dd></div><div><dt>Responsable</dt><dd>${esc(r.dept || 'Por asignar')}</dd></div><div><dt>Enviado</dt><dd>${fdt(r.ts)}</dd></div></dl>
        ${w ? `<div class="linked">${ic('helmet')}<span><b>${esc(w.title)}</b><small>${esc((A.find(S.contractors, w.contractor) || {}).name || '')} · ${w.pct} % de avance</small></span></div>` : ''}
        ${r.status === 'resuelto' ? `<div class="rate"><b>${r.rating ? 'Gracias por calificar' : '¿Cómo fue la atención?'}</b><div>${[1, 2, 3, 4, 5].map(n => `<button class="${r.rating >= n ? 'on' : ''}" data-act="rate" data-id="${r.id}" data-n="${n}" aria-label="${n} estrellas">${ic('star', 26)}</button>`).join('')}</div></div>` : ''}
        <div class="mini-map" id="repmap"></div><h3>Historial</h3>${A.log(r.log)}</article>`, { back: '#/ciudadano/reportes', title: r.id }), after: el => A.map(A.$('#repmap', el), [{ ...r, k: 'a', i: A.CATS[r.cat].i, t: r.id }], { mini: true }) }; },

    mapa(p, S) { const f = mf, pts = [];
      if (f.rep) S.reports.filter(r => r.status !== 'resuelto').forEach(r => pts.push({ ...r, k: 'a', i: A.CATS[r.cat].i, t: A.CATS[r.cat].n, s: A.RSTATUS[r.status] + ' · ' + r.sector, href: r.mine ? '#/ciudadano/reportes/' + r.id : '' }));
      if (f.obra) S.works.filter(w => w.pct < 100 && w.kind !== 'evento').forEach(w => pts.push({ ...w, k: 'w', i: 'helmet', t: w.title, s: w.pct + ' % de avance' }));
      if (f.via) S.roads.filter(r => r.active).forEach(r => pts.push({ ...r, k: 'r', i: 'cone', t: r.title, s: A.ROADKINDS[r.kind] }));
      return { html: shell('mapa', `<div class="map-filters">${[['rep', 'Reportes'], ['obra', 'Obras'], ['via', 'Vialidad']].map(([k, n]) => `<button class="fchip ${f[k] ? 'on' : ''} f-${k}" data-act="mapf" data-k="${k}" aria-pressed="${!!f[k]}">${n}</button>`).join('')}</div><div class="map-full" id="czmap"></div>`), after: el => A.map(A.$('#czmap', el), pts) }; },

    perfil(p, S) { const m = S.me; return shell('perfil', `<form class="form" data-form="profile"><h2>Mi perfil</h2><p class="lead">Estos datos viajan con tu alerta SOS para que puedan ubicarte y llamarte.</p>
      <label>Nombre y apellido<input name="name" value="${esc(m.name)}" required autocomplete="name"></label><label>Teléfono<input name="phone" value="${esc(m.phone)}" inputmode="tel" autocomplete="tel"></label>
      <label>Sector donde vives<select name="sector">${Object.keys(A.SECTORS).map(s => `<option ${s === m.sector ? 'selected' : ''}>${s}</option>`).join('')}</select></label>
      <label>Contacto de emergencia<input name="contact" value="${esc(m.contact)}"></label><button class="btn btn-mar btn-block">Guardar cambios</button></form>
      <section class="settings"><button class="set-row" data-act="install">${ic('down')}<span><b>Instalar la app</b><small>Queda en tu pantalla de inicio, como cualquier otra app</small></span></button>
      <a class="set-row" href="#/">${ic('grid')}<span><b>Cambiar de portal</b><small>Seguridad, Alcaldía y Contratistas</small></span></a>
      <button class="set-row" data-act="reset">${ic('refresh')}<span><b>Reiniciar la demostración</b><small>Borra lo que hiciste y restaura los datos de ejemplo</small></span></button></section>${A.credit()}`); }
  };
  const mf = { rep: true, obra: true, via: true };
  views.ciudadano = p => (pages[p[0]] || pages.inicio)(p.slice(1), A.S);

  /* ---------- acciones ---------- */
  let cd = null;
  const sendSos = async (type, quick) => { const loc = quick ? A.fakeLoc(A.S.me.sector) : await A.locate(A.S.me.sector); sessionStorage.l360sos = act.sosCreate(type, loc); A.closeModal(); go('#/ciudadano/sos'); return sessionStorage.l360sos; };
  on.sosPick = el => { const type = el.dataset.type; let n = 3; clearInterval(cd);
    const m = modal(`<div class="count"><b id="cdn">3</b><h2>Enviando alerta de ${esc(A.STYPES[type].n.toLowerCase())}</h2><p>Se envía sola al llegar a cero.</p><button class="btn btn-line" data-act="sosAbort">Cancelar, fue un error</button></div>`, 'modal-sos');
    cd = setInterval(() => { n--; if (!document.body.contains(m)) return clearInterval(cd); if (n <= 0) { clearInterval(cd); A.$('#cdn', m).textContent = '…'; sendSos(type); } else A.$('#cdn', m).textContent = n; }, 1000); };
  on.sosAbort = () => { clearInterval(cd); A.closeModal(); toast('Alerta cancelada. No se envió nada.'); };
  on.sosCancel = el => { act.sosClose(el.dataset.id, '', true); };
  on.sosDone = () => { delete sessionStorage.l360sos; go('#/ciudadano/inicio'); };
  on.news = el => { const n = A.find(A.S.news, el.dataset.id); if (n) modal(`<article class="read"><span class="news-cat c-${n.cat.slice(0, 3).toLowerCase()}">${esc(n.cat)}</span><h2>${esc(n.title)}</h2><small>${fdt(n.ts)} · Prensa de la Alcaldía · contenido de demostración</small><p>${esc(n.body)}</p></article>`); };
  on.evt = el => act.eventToggle(el.dataset.id);
  on.nightz = el => { const e = A.find(A.S.events, el.dataset.id); modal(`<div class="read"><span class="news-cat c-nz">Alianza propuesta</span><h2>Entradas y reservas con Nightz</h2><p>En producción, este botón abre «${esc(e.title)}» en Nightz para comprar entradas, reservar mesa y ver quién va. Lechería 360 publica la agenda oficial y Nightz gestiona la taquilla.</p><p class="fine">Integración planteada en el plan del proyecto. Depende del acuerdo comercial y técnico con Nightz.</p></div>`); };
  on.work = el => { const S = A.S, w = A.find(S.works, el.dataset.id), c = A.find(S.contractors, w.contractor) || {}; modal(`<div class="read"><h2>${esc(w.title)}</h2><p>${esc(w.desc)}</p><span class="bar big"><i style="width:${w.pct}%"></i></span><dl class="facts"><div><dt>Avance</dt><dd>${w.pct} %</dd></div><div><dt>Contratista</dt><dd>${esc(c.name || '')}</dd></div><div><dt>Inversión</dt><dd>${money(w.budget)}</dd></div><div><dt>Entrega</dt><dd>${fday(w.end).d} ${fday(w.end).m}</dd></div></dl><h3>Avances reportados</h3>${A.log(w.updates)}</div>`); };
  on.rate = el => { act.reportRate(el.dataset.id, +el.dataset.n); toast('Calificación enviada. Gracias.'); };
  on.mapf = el => { mf[el.dataset.k] = !mf[el.dataset.k]; A.render(); };
  on.photoPrev = async el => { const url = await A.readPhoto(el.files[0]), box = el.closest('.photo-drop'); if (url) { box.dataset.url = url; box.querySelector('.photo-ph').innerHTML = `<img src="${url}" alt="Vista previa de la foto"><small>Toca para cambiarla</small>`; } };
  on.report = async (f, d) => { const btn = f.querySelector('button.btn-block'); btn.disabled = true; btn.textContent = 'Enviando…';
    const photo = f.querySelector('.photo-drop').dataset.url || null, loc = d.gps ? await A.locate(d.sector) : A.fakeLoc(d.sector);
    const id = act.reportCreate({ cat: d.cat, desc: d.desc.trim(), photo, lat: loc.lat, lng: loc.lng, sector: loc.sector }); toast(`Reporte ${id} enviado`); go('#/ciudadano/reportes/' + id); };
  on.profile = (f, d) => { act.profile(d); toast('Perfil guardado'); };
  on.reset = () => { act.reset(); delete sessionStorage.l360sos; toast('Demostración reiniciada'); };
  let deferred = null; window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; });
  on.install = () => { if (deferred) { deferred.prompt(); deferred = null; } else modal(`<div class="read"><h2>Instalar Lechería 360</h2><p><b>En Android (Chrome):</b> abre el menú ⋮ y elige «Instalar aplicación» o «Agregar a la pantalla principal».</p><p><b>En iPhone (Safari):</b> toca Compartir y luego «Agregar a inicio».</p><p><b>En computadora:</b> usa el icono de instalar en la barra de direcciones.</p></div>`); };
  A.demo = Object.assign(A.demo || {}, { sos: type => sendSos(type || 'seguridad', true) });
})();
