/* Lechería Conecta · portada, vista en vivo y recorrido guiado. */
(() => {
  const A = window.L360, { esc, ic, act, on, views, $ } = A;
  const PORTALS = [
    ['ciudadano', 'user', 'Ciudadano', 'Vecinos y visitantes', 'SOS, reportes con foto, noticias, eventos, obras y vialidad desde el teléfono.'],
    ['seguridad', 'shield', 'Seguridad y Protección Civil', 'Operadores y unidades', 'Recibe las alertas SOS en el mapa, despacha la unidad más cercana y publica sucesos verificados.'],
    ['alcaldia', 'chart', 'Alcaldía', 'Direcciones y prensa', 'Gestiona reportes, publica noticias, eventos y avisos, y contrata obras con trazabilidad.'],
    ['contratista', 'case', 'Contratistas y aliados', 'Empresas y patrocinantes', 'Recibe solicitudes de obras, servicios y eventos, cotiza y reporta avances con evidencia.'],
    ['agentes', 'house', 'Agentes inmobiliarios · MLS', 'Agentes verificados', 'Inventario compartido con comisión compartida, interesados y reservas de hospedaje.'],
    ['camara', 'badge', 'Cámara Inmobiliaria', 'Verificación', 'Verifica agentes e inmuebles antes de que aparezcan en la app de vecinos y visitantes.']
  ];
  const MODS = [
    ['shield', 'Seguridad', 'Botón de pánico SOS con ubicación. La alerta llega en segundos al operador de turno y a Protección Civil.'],
    ['camera', 'Reportes con foto', 'Huecos, alumbrado, aseo, drenajes o semáforos: una foto y el caso queda numerado y asignado.'],
    ['cone', 'Vialidad', 'Cierres, desvíos y accidentes publicados por la Alcaldía, con vías alternas.'],
    ['helmet', 'Obras', 'Cada obra con su avance, contratista, inversión y fecha de entrega a la vista de todos.'],
    ['calendar', 'Eventos', 'Agenda cultural, deportiva y social. La taquilla y las reservas se integran con Nightz.'],
    ['city', 'Estado de la ciudad', 'Agua, luz, aseo y playas con su estado del día. Si hay un corte en tu sector, te llega una alerta al teléfono.'],
    ['clock', 'Cortes programados', 'Horario de cortes de luz y agua por sector, con recordatorio 30 minutos antes para preparar la casa.'],
    ['siren', 'Emergencias sin internet', 'SMS con tu ubicación GPS, primeros auxilios, linterna y sirena: funciona aunque no haya datos móviles.'],
['house', 'Hospedaje e inmuebles', 'Alquiler vacacional por fechas y compra o alquiler con agentes verificados por la Cámara Inmobiliaria.'],
['doc', 'Trámites y atención al ciudadano', 'Requisitos oficiales del Registro Civil y solicitudes a las 22 dependencias, con número de seguimiento.'],
['phone', 'Teléfonos útiles y «Escuchar»', 'Emergencias a un toque, aun sin internet, y lectura en voz alta de avisos y noticias para quien prefiere oír.'],
    ['wifi', 'WiFi público y sin conexión', 'Mapa de puntos WiFi gratis, con los que siguen funcionando en apagones. La app funciona sin internet y envía lo pendiente al volver la señal.'],
    ['news', 'Noticias y sucesos', 'Lo cultural, lo político y lo social de la ciudad, contado por la fuente oficial y verificado.'],
    ['case', 'Contratistas', 'La Alcaldía y los aliados privados envían solicitudes; el contratista cotiza y rinde cuentas en línea.']
  ];
  const ROAD = [
    ['Terminado', 'Prototipo v1', 'App del vecino, consolas de Seguridad, Alcaldía y Contratistas, y recorrido guiado.'],
    ['Esta entrega', 'Lechería Conecta v2', 'Panel de la Alcaldía accesible, estado de agua, luz y playas, WiFi público, uso sin internet y alertas por sector.'],
    ['0 a 3 meses', 'Piloto real', 'Servidor y base de datos, cuentas verificadas, SMS y WhatsApp, enlace con el 911 y Protección Civil.'],
    ['3 a 12 meses', 'Trámites y participación', 'Solvencia, impuestos y citas en línea, transparencia de obras y presupuesto participativo.']
  ];
  views.inicio = () => `<div class="land">
    <header class="land-nav"><a class="wordmark" href="#/">Lechería <b>Conecta</b></a><nav aria-label="Principal"><button data-act="scrollTo" data-to="modulos">Qué incluye</button><button data-act="scrollTo" data-to="portales">Portales</button><button data-act="scrollTo" data-to="ruta">Hoja de ruta</button><a href="#/demo">Vista en vivo</a></nav><button class="btn btn-sol btn-sm" data-act="tour">Recorrido guiado</button></header>
    <main id="main"><section class="hero"><div class="hero-copy"><p class="hero-kicker">Lechería Conecta · Sistema Integral de Gestión Urbana</p><h1>Todo lo que pasa en Lechería, en tu mano.</h1>
      <p class="hero-sub">Una sola app para pedir ayuda con el botón SOS, reportar un hueco con una foto, saber si hay agua, luz o playa abierta, y encontrar WiFi gratis, incluso sin internet. Del otro lado, seguridad, la Alcaldía y los contratistas responden sobre la misma plataforma.</p>
      <div class="btn-row"><button class="btn btn-sol btn-lg" data-act="tour">${ic('play', 18)} Iniciar recorrido guiado</button><a class="btn btn-glass btn-lg" href="#/demo">Ver la alerta viajar en vivo</a></div>
      <p class="hero-note">Propuesta de Qiu Agency para la Alcaldía de Lechería. Prototipo no oficial, con datos de demostración.</p></div>
      <div class="hero-phone" aria-hidden="true"><span class="ring r1"></span><span class="ring r2"></span><span class="ring r3"></span><div class="phone"><iframe src="?embed=1#/ciudadano/inicio" title="App del ciudadano" loading="lazy" tabindex="-1" allow="geolocation"></iframe></div></div></section>
    <section class="band" id="modulos"><h2>Qué resuelve para la ciudad</h2><p class="band-lead">Catorce frentes que hoy viven en llamadas, grupos de mensajería y oficios, reunidos en un solo sistema pensado también para quienes tienen más de 50 años: letra grande, botones grandes y lenguaje claro.</p>
      <dl class="mods">${MODS.map(m => `<div><dt>${ic(m[0], 22)}${m[1]}</dt><dd>${m[2]}</dd></div>`).join('')}</dl></section>
    <section class="band flow"><h2>El viaje de un reporte</h2><ol class="steps"><li><b>El vecino reporta</b><span>Foto, tipo de problema y ubicación en menos de un minuto.</span></li><li><b>La Alcaldía asigna</b><span>A la dirección responsable o a un contratista invitado a cotizar.</span></li><li><b>El contratista ejecuta</b><span>Cotiza, recibe la adjudicación y sube avances con fotos.</span></li><li><b>El vecino califica</b><span>Recibe el aviso de solución y evalúa la atención.</span></li></ol></section>
    <section class="band" id="portales"><h2>Cuatro portales, una sola ciudad</h2><p class="band-lead">Entra a cualquiera. Lo que hagas en uno se refleja al instante en los demás.</p>
      <div class="portals">${PORTALS.map(p => `<a class="portal p-${p[0]}" href="#/${p[0]}"><span class="portal-ic">${ic(p[1], 26)}</span><h3>${p[2]}</h3><small>${p[3]}</small><p>${p[4]}</p><span class="portal-go">Entrar al portal</span></a>`).join('')}</div></section>
    <section class="band" id="ruta"><h2>Hoja de ruta</h2><p class="band-lead">De prototipo a sistema oficial en cuatro etapas.</p>
      <ol class="road">${ROAD.map((r, i) => `<li class="${i < 2 ? 'done' : ''}"><small>${r[0]}</small><b>${r[1]}</b><span>${r[2]}</span></li>`).join('')}</ol></section>
    <section class="band live-cta"><div><h2>Presiona SOS y mira quién responde</h2><p>La vista en vivo pone el teléfono del vecino junto a la consola del operador. Es la forma más rápida de entender el sistema.</p></div><a class="btn btn-sol btn-lg" href="#/demo">Abrir la vista en vivo</a></section></main>
    ${A.credit()}</div>`;

  let side = 'seguridad';
  views.demo = () => `<main class="demo" id="main"><header class="demo-h"><a class="wordmark" href="#/">Lechería <b>Conecta</b></a><h1 class="sr">Vista en vivo: el vecino y la consola en la misma pantalla</h1><p>Presiona <b>SOS</b> o envía un reporte en el teléfono y mira cómo llega al otro lado.</p>
    <div class="seg dark" role="tablist">${[['seguridad', 'Seguridad'], ['alcaldia', 'Alcaldía'], ['contratista', 'Contratistas']].map(([k, n]) => `<button role="tab" aria-selected="${k === side}" class="${k === side ? 'on' : ''}" data-act="side" data-k="${k}">${n}</button>`).join('')}</div><a class="btn btn-glass btn-sm" href="#/">Salir</a></header>
    <div class="demo-stage"><div class="phone"><iframe src="?embed=1#/ciudadano/inicio" title="App del ciudadano" allow="geolocation"></iframe></div><div class="screen"><iframe id="demoR" src="?embed=1#/${side}" title="Consola de gestión"></iframe></div></div></main>`;
  on.side = el => { side = el.dataset.k; document.querySelectorAll('.demo .seg button').forEach(b => { b.classList.toggle('on', b === el); b.setAttribute('aria-selected', b === el); }); $('#demoR').src = '?embed=1#/' + side; };
  on.scrollTo = el => { const t = document.getElementById(el.dataset.to); if (t) t.scrollIntoView({ behavior: 'smooth' }); };
  document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.matches('tr[data-act]')) e.target.click(); });

  /* ---------- recorrido guiado ---------- */
  const demoPhoto = fixed => { const c = document.createElement('canvas'); c.width = 640; c.height = 400; const x = c.getContext('2d');
    x.fillStyle = '#5b6168'; x.fillRect(0, 0, 640, 400); x.fillStyle = '#6b7279'; for (let i = 0; i < 900; i++) x.fillRect(Math.random() * 640, Math.random() * 400, 2, 2);
    x.strokeStyle = '#f2d21e'; x.lineWidth = 9; x.setLineDash([60, 44]); x.beginPath(); x.moveTo(-20, 330); x.lineTo(660, 250); x.stroke();
    x.fillStyle = fixed ? '#2b2e33' : '#26221f'; x.beginPath(); x.ellipse(300, 190, 130, 62, -.12, 0, 7); x.fill(); if (!fixed) { x.fillStyle = '#3d362f'; x.beginPath(); x.ellipse(292, 198, 96, 40, -.12, 0, 7); x.fill(); }
    x.fillStyle = 'rgba(15,39,64,.82)'; x.fillRect(0, 356, 640, 44); x.fillStyle = '#fff'; x.font = '600 18px Montserrat, sans-serif'; x.fillText(fixed ? 'Foto de demostración · bacheo terminado' : 'Foto de demostración · hueco en la vía', 18, 384); return c.toDataURL('image/jpeg', .7); };
  const d = {}; // datos creados durante el recorrido
  const STEPS = [
    { go: '#/', t: 'Bienvenidos a Lechería Conecta', x: 'En unos cuatro minutos verás cómo vecinos, seguridad, Alcaldía y contratistas trabajan sobre la misma plataforma. Nada es una maqueta: cada paso crea datos reales dentro del prototipo. Al empezar se restauran los datos de ejemplo.' },
    { go: '#/ciudadano/inicio', sel: '.cx-hero', t: 'La ciudad en la pantalla de inicio', x: 'El vecino abre la app y ve Lechería: fotos reales de la ciudad, clima, atardecer y estado del mar, los servicios del día y accesos a todo lo que necesita.' },
{ go: '#/ciudadano/inicio', sel: '.sos-btn', t: 'El vecino tiene un botón de pánico', x: 'Un toque, elige el tipo de emergencia y la alerta sale con su ubicación y sus datos de contacto.' },
    { run: async () => { d.sos = await A.demo.sos('seguridad'); }, go: '#/ciudadano/sos', sel: '.sos-live h2', t: 'La alerta ya salió', x: 'Acabamos de enviar una alerta de seguridad. El vecino ve el estado en vivo y un mapa con su ubicación.' },
    { go: '#/seguridad/alertas', sel: '.alert-card.on', t: 'Llega al Centro de Seguridad al instante', x: 'Suena una alarma y aparece en el mapa con nombre, teléfono y ubicación. El operador de turno toma el caso.' },
    { run: () => { const S = A.S, a = A.find(S.sos, d.sos); act.sosTake(d.sos, 'Op. Andrea Salazar'); const u = S.units.filter(u => u.status === 'disponible' && u.kind === 'Policía Municipal').sort((p, q) => Math.hypot(p.lat - a.lat, p.lng - a.lng) - Math.hypot(q.lat - a.lat, q.lng - a.lng))[0]; act.sosDispatch(d.sos, u.id); }, go: '#/seguridad/alertas', sel: '.sos-detail .tl', t: 'Se despacha la unidad más cercana', x: 'El sistema sugiere la unidad según el tipo de emergencia y la distancia. Cada paso queda en la bitácora con su hora, para medir tiempos de respuesta.' },
    { go: '#/ciudadano/sos', sel: '.sos-live h2', t: 'El vecino sabe que la ayuda va en camino', x: 'Recibe una notificación y ve qué unidad fue asignada. Cuando el operador cierra el caso, también se entera.' },
    { go: '#/ciudadano/emergencia', sel: '.em-sms', t: 'Emergencias, también sin internet', x: 'Sin datos móviles, el vecino puede llamar al 911 o enviar un SMS con su ubicación GPS: ambos usan la red del teléfono. Además tiene primeros auxilios, linterna, sirena y qué hacer en cada caso.' },
{ run: () => { act.sosClose(d.sos, 'Situación controlada. Vecino a salvo.'); delete sessionStorage.l360sos; }, go: '#/ciudadano/reportar', sel: '.cat-grid', t: 'Reportar un problema toma un minuto', x: 'Hueco, poste apagado, basura o semáforo dañado: el vecino elige el tipo, toma la foto y envía. La ubicación se adjunta sola.' },
    { run: () => { d.rep = act.reportCreate({ cat: 'via', desc: 'Hueco grande en el canal derecho, frente a la farmacia. Ya se espicharon dos cauchos.', photo: demoPhoto(), ...A.fakeLoc('Av. Principal') }); }, go: '#/alcaldia/reportes', sel: '.tbl tbody tr', t: 'La Alcaldía lo recibe clasificado', x: 'Acabamos de enviar un reporte con foto. Entra con número, tipo, sector y vecino. Desde aquí se asigna a una dirección o se envía a contratistas.' },
    { run: () => { act.reportSet(d.rep, { dept: 'Infraestructura' }); d.req = act.requestCreate({ kind: 'servicio', title: `Bacheo en Av. Principal (${d.rep})`, scope: 'Reparar hueco de 1,5 m² con asfalto en caliente y demarcar el canal.', deadline: new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10), budget: 1200, invited: ['c1', 'c2'], report: d.rep }); }, go: '#/alcaldia/obras', sel: '.req', t: 'El reporte se convierte en una solicitud', x: 'La Alcaldía invita a los contratistas indicados para ese trabajo. Lo mismo aplica para obras grandes y para eventos con apoyo privado.' },
    { run: () => { localStorage['lch360:c'] = 'c2'; }, go: '#/contratista/solicitudes', sel: '.bid-form', t: 'El contratista cotiza desde su portal', x: 'Recibe el alcance, el plazo de respuesta y el presupuesto referencial, y responde con monto y días. Sin oficios ni llamadas.' },
    { run: () => { act.bid(d.req, 'c2', { amount: 980, days: 3, note: 'Asfalto en caliente. Garantía de 6 meses.' }); act.award(d.req, 'c2'); }, go: '#/contratista/obras', sel: '.card', t: 'Adjudicación y avances con evidencia', x: 'La Alcaldía adjudicó la cotización y el trabajo aparece aquí. El contratista reporta el avance con fotos y todos lo ven al momento.' },
    { run: () => { const w = A.S.works.find(w => w.request === d.req); act.workUpdate(w.id, { pct: 100, txt: 'Hueco reparado y canal demarcado.', photo: demoPhoto(true) }); }, go: () => '#/ciudadano/reportes/' + d.rep, sel: '.rate', t: 'El vecino recibe la solución y califica', x: 'El ciclo se cierra: el reporte queda resuelto, con su historial completo, y la calificación alimenta el indicador de satisfacción.' },
    { go: '#/ciudadano/ciudad/eventos', sel: '.evt', t: 'La vida de la ciudad en un solo lugar', x: 'Noticias, eventos, obras, vialidad y sucesos verificados. Los eventos con taquilla se conectan con Nightz para entradas y reservas.' },
    { go: '#/ciudadano/lecheria', sel: '.cx-cover', t: 'Conoce Lechería', x: 'Datos de la ciudad, el tiempo a tres días, lugares para visitar con fotos reales, su historia y las noticias oficiales de la Alcaldía.' },
{ go: '#/ciudadano/hospedaje', sel: '.hx-card', t: 'Vacacionar en Lechería', x: 'Visitantes y vecinos reservan apartamentos, casas bote y posadas por fechas, con anfitriones verificados por la Cámara Inmobiliaria.' },
{ run: () => { d.prop = A.inm.act.publish({ op: 'venta', tipo: 'Apartamento', title: 'Apartamento frente a los canales', sector: 'Playa Los Canales', price: 98000, m2: 95, hab: 2, banos: 2, guests: 4, cobroke: 50, amen: ['planta', 'estac', 'muelle'], catastro: true, desc: 'Piso 3 con balcón al canal, planta eléctrica y puesto de estacionamiento.', ph: 'canal2' }, 'ag1'); }, go: '#/camara/inmuebles', sel: '.hx-rev', t: 'La Cámara Inmobiliaria verifica', x: 'Un agente publicó un inmueble. Antes de mostrarse al público, la Cámara revisa documentos, ficha catastral, fotos y precio.' },
{ run: () => { A.inm.act.review(d.prop, true, ''); }, go: '#/agentes/mls', sel: '.tbl tbody tr', t: 'Un MLS para todos los agentes', x: 'Aprobado: ya aparece en el inventario compartido. Todos los agentes verificados pueden ofrecerlo y compartir la comisión.' },
{ go: '#/ciudadano/tramites', sel: '.cx-tr-g', t: 'Trámites con requisitos oficiales', x: 'Los ocho trámites del Registro Civil con sus requisitos, impuestos, catastro, salud y ayudas, con buscador. Se consultan aunque no haya internet.' },
{ run: () => { d.atc = A.atc.create({ dept: 'Gerencia de Gestión Urbana', subj: 'Árbol que toca los cables', body: 'Un árbol frente a la panadería roza los cables de luz. Pido poda antes de las lluvias.' }); }, go: '#/alcaldia/atencion', sel: '.tbl tbody tr', t: 'El vecino escribe a la Alcaldía', x: 'Acabamos de enviar una solicitud a Gestión Urbana. Llega con número de seguimiento a «Atención al ciudadano», junto con las de las otras 21 dependencias.' },
{ run: () => { A.atc.set(d.atc, 'respondida', 'Una cuadrilla de poda irá el jueves en la mañana.'); }, go: '#/ciudadano/tramites/mis', sel: '.cx-ans', t: 'La respuesta llega al teléfono', x: 'La Alcaldía respondió y el vecino recibe la notificación. Ve la respuesta en «Mis casos», con fecha y dependencia.' },
{ go: '#/alcaldia/publicar', sel: 'form.card', t: 'La Alcaldía publica sin intermediarios', x: 'Noticias culturales, políticas y sociales, eventos y avisos de vialidad salen de aquí y llegan como notificación al teléfono de cada vecino.' },
    { go: '#/alcaldia/servicios', sel: '.svc-grid', t: 'Agua, luz, playas y cortes programados', x: 'La Alcaldía publica el estado de cada servicio, los sectores afectados y los cortes programados. Los vecinos de esos sectores ven la alerta en su inicio y reciben un recordatorio 30 minutos antes.' },
    { go: '#/ciudadano/wifi', sel: '.wifi-card', t: 'WiFi gratis y uso sin internet', x: 'El vecino ve los puntos WiFi más cercanos y cuáles tienen planta eléctrica. Si no hay señal, la app sigue funcionando y envía lo pendiente al volver la conexión.' },
    { go: '#/alcaldia/panel', sel: '.cx-banner', t: 'Un panel con la ciudad a la vista', x: 'La Alcaldía empieza el día con la ciudad en pantalla: clima, mar, playas y WiFi activos, solicitudes nuevas de vecinos y, debajo, la lista de tareas con un botón para cada una.' },
    { go: '#/', t: 'Eso es Lechería Conecta', x: 'Ahora entra a cualquier portal y pruébalo por tu cuenta, o abre la vista en vivo para tener el teléfono del vecino y la consola del operador en la misma pantalla.', end: true }
  ];
  const T = A.tour = { i: -1, box: null, tm: 0,
    start() { act.reset(); delete sessionStorage.l360sos; Object.keys(d).forEach(k => delete d[k]); STEPS.forEach(s => { s.ran = false; }); A.closeModal(); this.i = 0;
      if (!this.box) { this.box = document.createElement('div'); this.box.className = 'tour'; this.box.innerHTML = '<div class="tour-hole"></div><div class="tour-card" role="dialog" aria-live="polite"></div>'; document.body.append(this.box); }
      this.show(); },
    stop() { this.i = -1; if (this.box) { this.box.remove(); this.box = null; } },
    async show() { const s = STEPS[this.i]; if (!s) return this.stop(); if (s.run && !s.ran) { s.ran = true; await s.run(); }
      const h = typeof s.go === 'function' ? s.go() : s.go; if (location.hash !== h && !(h === '#/' && !location.hash)) location.hash = h; else this.sync(); },
    sync(n = 0) { if (this.i < 0 || !this.box) return; clearTimeout(this.tm); const s = STEPS[this.i], hole = $('.tour-hole', this.box), card = $('.tour-card', this.box), el = s.sel && $('#app ' + s.sel);
      if (s.sel && !el && n < 25) { this.tm = setTimeout(() => this.sync(n + 1), 120); return; }
      card.innerHTML = `<small>Paso ${this.i + 1} de ${STEPS.length}</small><h2>${esc(s.t)}</h2><p>${esc(s.x)}</p><div class="tour-btns"><button class="link" data-act="tourStop">${s.end ? 'Cerrar' : 'Salir'}</button><span>${this.i ? '<button class="btn btn-line btn-sm" data-act="tourPrev">Atrás</button>' : ''}${s.end ? '<a class="btn btn-sol btn-sm" href="#/demo" data-act="tourStop">Abrir la vista en vivo</a>' : '<button class="btn btn-sol btn-sm" data-act="tourNext">Siguiente</button>'}</span></div>`;
      const place = () => { if (!el || !document.body.contains(el)) { hole.style.cssText = 'top:50%;left:50%;width:0;height:0'; card.style.cssText = 'top:50%;left:50%;transform:translate(-50%,-50%)'; return; }
        const r = el.getBoundingClientRect(), vw = innerWidth, vh = innerHeight, p = 8, t = Math.max(p, r.top - p), b = Math.min(vh - p, r.bottom + p), l = Math.max(p, r.left - p), rt = Math.min(vw - p, r.right + p);
        hole.style.cssText = `top:${t}px;left:${l}px;width:${rt - l}px;height:${b - t}px`;
        const cw = Math.min(380, vw - 24), ch = card.offsetHeight || 220; let top, left = Math.min(vw - cw - 12, Math.max(12, l + (rt - l) / 2 - cw / 2));
        if (vh - b > ch + 20) top = b + 14; else if (t > ch + 20) top = t - ch - 14; else { top = vh - ch - 16; left = rt + cw + 24 < vw ? rt + 14 : l - cw - 14 > 0 ? l - cw - 14 : left; }
        card.style.cssText = `top:${top}px;left:${left}px;width:${cw}px`; };
      if (el) { el.scrollIntoView({ block: 'center', inline: 'nearest' }); setTimeout(place, 60); setTimeout(place, 420); } place(); const f = $('.btn-sol', card); if (f) f.focus({ preventScroll: true }); } };
  on.tour = () => T.start();
  on.tourStop = () => T.stop();
  on.tourNext = () => { T.i++; T.show(); };
  on.tourPrev = () => { T.i--; T.show(); };
  window.addEventListener('resize', () => T.sync());
  document.addEventListener('keydown', e => { if (T.i < 0) return; if (e.key === 'ArrowRight' && !STEPS[T.i].end) on.tourNext(); else if (e.key === 'ArrowLeft' && T.i) on.tourPrev(); else if (e.key === 'Escape') T.stop(); });
  A.boot();
})();
