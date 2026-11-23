/* Lechería Conecta v3 · la ciudad en el inicio, «Conoce Lechería», trámites y atención al ciudadano.
Fotos reales de Lechería tomadas de Wikimedia Commons, siempre con su autor y licencia.
Trámites, dependencias, historia y noticias tomados de lecheria.gov.ve (noviembre de 2026).
Clima y estado del mar: Open-Meteo (gratuito, sin clave). Sin internet se muestra el último dato guardado
y la hora del amanecer y el atardecer se calcula en el propio teléfono. */
(() => {
const A = window.L360, { esc, ic, ago, fdt, on, toast, modal, go } = A;
const byTs = (a, b) => b.ts - a.ts, avg = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0;
Object.assign(A.IC, {
doc: 'M6 3h9l4 4v14H6zM14 3v5h5M9 12h7M9 16h7', siren: 'M7 18v-6a5 5 0 0 1 10 0v6M5 18h14v3H5zM12 3v2M4 8l1.5 1M20 8l-1.5 1',
sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
sunset: 'M3 18h18M7 18a5 5 0 0 1 10 0M12 5v5M9 8l3 3 3-3M5 21h14', cloud: 'M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1 0 9z',
rain: 'M7 15a4 4 0 0 1-.5-8A6 6 0 0 1 18 6a4.5 4.5 0 0 1 0 9zM8 19l-1 2M12 19l-1 2M16 19l-1 2', thermo: 'M10 4a2 2 0 0 1 4 0v10a4 4 0 1 1-4 0zM12 9v7',
globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18', coin: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9 15c.5 1 1.5 1.5 3 1.5 2 0 3-1 3-2.2 0-3-6-1.6-6-4.6C9 8.500 10 7.500 12 7.500c1.400 0 2.400.5 3 1.500M12 6v1.500M12 16.500V18',
house: 'M4 11l8-7 8 7M6 9.500V20h12V9.500M10 20v-5h4v5', heart: 'M12 20s-7-4.400-7-10a4 4 0 0 1 7-2.600A4 4 0 0 1 19 10c0 5.600-7 10-7 10z',
paw: 'M8 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM16 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM19 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 12c-3 0-5 4-5 6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2c0-2-2-6-5-6z',
ball: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 3v18M3 12h18M5.600 5.600c3 3 3 9.800 0 12.800M18.400 5.600c-3 3-3 9.800 0 12.800', search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
list: 'M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01', chev: 'M6 9l6 6 6-6', moon: 'M20 14.500A8 8 0 1 1 9.500 4a6.500 6.500 0 0 0 10.500 10.500z', camera2: 'M4 8h3l2-3h6l2 3h3v11H4z', ext: 'M14 4h6v6M20 4l-9 9M18 14v6H4V6h6'
});

/* ---------- fotos reales (Wikimedia Commons) ---------- */
const PH = {
morro: ['Vista desde Cerro el Morro.jpg', 'Josgara', 'CC BY-SA 3.0', 'El Morro visto desde el cerro'],
isla: ['Cerro El Morro 1.jpg', 'Guaiquerí', 'CC0', 'Costa de Lechería frente al Cerro El Morro'],
bahia: ['Cerro El Morro IMG 03.jpg', 'Scumstoner', 'CC BY-SA 4.0', 'Bahía desde los senderos del Cerro El Morro'],
fortin: ['Fortin-de-la-magdalena-lecheria.jpg', 'Gabrielmacho', 'CC BY-SA 4.0', 'Fortín de La Magdalena'],
plaza: ['Plaza Bolívar de Lechería 1.jpg', 'Guaiquerí', 'CC0', 'Plaza Bolívar de Lechería'],
virgen: ['Monumento del barco de la Virgen del Valle de playa Lido, Lechería, estado Anzoátegui, Venezuela.jpg', 'Guaiquerí', 'CC BY-SA 4.0', 'Monumento a la Virgen del Valle en Playa Lido'],
iglesia: ['Iglesia María Auxiliadora en Lechería, estado Anzoátegui, Venezuela.jpg', 'Guaiquerí', 'CC BY-SA 4.0', 'Iglesia María Auxiliadora'],
canales: ['Vista de Lechería 6.jpg', 'Guaiquerí', 'CC0', 'Canales del Complejo Turístico El Morro'],
puerto: ['Casas en Puerto Morro, edo. Anzoátegui.JPG', 'María Auxiliadora Ramírez Prat', 'CC BY-SA 3.0', 'Casas en los canales de Puerto Morro'],
parque: ['Plaza El Parque en Lechería.jpg', 'Guaiquerí', 'CC BY-SA 4.0', 'Plaza El Parque'],
lido: ['Lido´s Beach Sunset.JPG', 'Bridgetherrera', 'CC BY-SA 3.0', 'Atardecer en Playa Lido'],
atardecer: ['Atardecer LecheríaV1.jpg', 'MR-Amstrong', 'CC BY-SA 4.0', 'Atardecer sobre Lechería'],
canal2: ['Canales Lechería.jpg', 'MR-Amstrong', 'CC BY-SA 4.0', 'Canales de Lechería'],
alcaldia: ['Alcaldía de Lechería, estado Anzoátegui, Venezuela.jpg', 'Guaiquerí', 'CC BY-SA 4.0', 'Sede de la Alcaldía de Lechería'],
demu: ['Expo Virgen del Valle 2011 — Exhibition views at Museo Dimitrios Demu 01.jpg', 'HonysTorresArt', 'CC BY-SA 4.0', 'Museo Dimitrios Demu']
};
const phUrl = (k, w = 960) => 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(PH[k][0]) + '?width=' + w;
const phPage = k => 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(PH[k][0].replace(/ /g, '_'));
const credit = k => `<a class="ph-cr" href="${phPage(k)}" target="_blank" rel="noopener">Foto: ${esc(PH[k][1])} · ${esc(PH[k][2])}</a>`;
const ph = (k, cls = '', w = 960, eager = false, cap = true) => `<figure class="ph ${cls}"><img src="${phUrl(k, w)}" alt="${esc(PH[k][3])}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" onerror="this.parentNode.classList.add('ph-off')">${cap ? `<figcaption>${credit(k)}</figcaption>` : ''}</figure>`;

/* ---------- clima, sol y mar ---------- */
const WK = 'lchc:clima', LAT = 10.1925, LNG = -64.6866;
let wx = (() => { try { return JSON.parse(localStorage.getItem(WK)); } catch (e) { return null; } })(), wxBusy = false;
const WMO = c => c == null ? ['—', 'sun'] : c === 0 ? ['Despejado', 'sun'] : c <= 2 ? ['Parcialmente nublado', 'sun'] : c === 3 ? ['Nublado', 'cloud'] : c <= 48 ? ['Neblina', 'cloud'] : c <= 57 ? ['Llovizna', 'rain'] : c <= 67 ? ['Lluvia', 'rain'] : c <= 77 ? ['Nublado', 'cloud'] : c <= 82 ? ['Chubascos', 'rain'] : ['Tormenta eléctrica', 'rain'];
const uvTxt = u => u == null ? '' : u < 3 ? 'bajo' : u < 6 ? 'moderado' : u < 8 ? 'alto' : u < 11 ? 'muy alto' : 'extremo';
const hm12 = (h, m) => `${(h % 12) || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'a. m.' : 'p. m.'}`;
const fromIso = s => { const [h, m] = String(s).slice(11, 16).split(':').map(Number); return hm12(h, m); };
const dec1 = n => String(Math.round(n * 10) / 10).replace('.', ',');
/* Amanecer y atardecer calculados en el teléfono (ecuación solar, hora de Caracas UTC-4). */
const sun = (d = new Date()) => { const r = Math.PI / 180, lat = LAT * r;
const n = Math.round(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 12) / 864e5 + 2440587.5 - 2451545);
const Js = n - LNG / 360, M = (357.5291 + 0.98560028 * Js) % 360, Mr = M * r;
const C = 1.9148 * Math.sin(Mr) + 0.02 * Math.sin(2 * Mr) + 0.0003 * Math.sin(3 * Mr), L = ((M + C + 282.9372) % 360) * r;
const Jt = 2451545 + Js + 0.0053 * Math.sin(Mr) - 0.0069 * Math.sin(2 * L), dc = Math.asin(Math.sin(L) * Math.sin(23.44 * r));
const w = Math.acos((Math.sin(-0.833 * r) - Math.sin(lat) * Math.sin(dc)) / (Math.cos(lat) * Math.cos(dc))) / r;
const t = j => { const x = new Date((j - 2440587.5) * 864e5 - 4 * 3600e3); return hm12(x.getUTCHours(), x.getUTCMinutes()); };
return { rise: t(Jt - w / 360), set: t(Jt + w / 360) }; };
const loadWx = async force => { if (wxBusy || !A.online() || (!force && wx && Date.now() - wx.ts < 20 * 60e3)) return false; wxBusy = true;
try { const q = `latitude=${LAT}&longitude=${LNG}&timezone=America%2FCaracas`;
const [f, m] = await Promise.all([fetch(`https://api.open-meteo.com/v1/forecast?${q}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,uv_index,is_day&daily=weather_code,sunrise,sunset,uv_index_max,precipitation_probability_max,temperature_2m_max,temperature_2m_min&forecast_days=3`).then(r => r.json()),
fetch('https://marine-api.open-meteo.com/v1/marine?latitude=10.215&longitude=-64.69&timezone=America%2FCaracas&current=wave_height,sea_surface_temperature').then(r => r.json()).catch(() => null)]);
if (!f || !f.current || !f.daily) throw new Error('clima');
const c = f.current, d = f.daily, mc = m && m.current;
wx = { ts: Date.now(), t: c.temperature_2m, st: c.apparent_temperature, hum: c.relative_humidity_2m, code: c.weather_code, day: c.is_day, wind: c.wind_speed_10m, uv: c.uv_index, uvMax: d.uv_index_max[0], rise: d.sunrise[0], set: d.sunset[0],
days: d.time.map((x, i) => ({ d: x, code: d.weather_code[i], max: d.temperature_2m_max[i], min: d.temperature_2m_min[i], rain: d.precipitation_probability_max[i] })), wave: mc ? mc.wave_height : null, sea: mc ? mc.sea_surface_temperature : null };
try { localStorage.setItem(WK, JSON.stringify(wx)); } catch (e) {} return true; } catch (e) { return false; } finally { wxBusy = false; } };
const wxChips = () => { const s = sun(); if (!wx) return `<span>${ic('sun', 15)} Amanece ${s.rise}</span><span>${ic('sunset', 15)} Atardecer ${s.set}</span>`;
const [cn, c0] = WMO(wx.code), ci = wx.day === 0 && c0 === 'sun' ? 'moon' : c0, old = Date.now() - wx.ts > 3 * 3600e3;
return `<span>${ic(ci, 15)} ${Math.round(wx.t)} °C · ${cn}</span><span>${ic('sunset', 15)} Atardecer ${wx.set && !old ? fromIso(wx.set) : s.set}</span>${wx.uvMax != null ? `<span>${ic('sun', 15)} UV ${uvTxt(Math.round(wx.uvMax))}</span>` : ''}${old ? `<span>${ic('clock', 15)} Clima de ${ago(wx.ts)}</span>` : ''}`; };
const seaLine = () => { if (!wx || wx.wave == null) return `${ic('wave', 18)}<span>El estado del mar se actualiza cuando hay conexión.</span>`;
const hi = wx.wave >= 1.2, uv = wx.uvMax >= 8;
return `${ic('wave', 18)}<span><b>Mar:</b> olas de ${dec1(wx.wave)} m${wx.sea != null ? ` · agua a ${Math.round(wx.sea)} °C` : ''}. ${hi ? 'Oleaje fuerte: báñate solo frente a los salvavidas.' : 'Oleaje tranquilo.'}${uv ? ' Sol muy fuerte: protector solar y sombra de 11 a. m. a 3 p. m.' : ''}</span>`; };
const wxCard = () => { const s = sun(); if (!wx) return `<p class="cx-wx-none">${ic('off', 20)} El clima aparece cuando el teléfono tiene conexión. Hoy amanece a las <b>${s.rise}</b> y el sol se pone a las <b>${s.set}</b>.</p>`;
const [cn, c0] = WMO(wx.code), ci = wx.day === 0 && c0 === 'sun' ? 'moon' : c0, wd = i => i === 0 ? 'Hoy' : i === 1 ? 'Mañana' : new Date(wx.days[i].d + 'T12:00:00').toLocaleDateString('es-VE', { weekday: 'long' });
return `<div class="cx-wx-now"><span class="cx-wx-ic">${ic(ci, 40)}</span><span><b>${Math.round(wx.t)} °C</b><small>${cn} · sensación ${Math.round(wx.st)} °C</small></span></div>
<dl class="cx-wx-dl"><div><dt>Humedad</dt><dd>${Math.round(wx.hum)} %</dd></div><div><dt>Viento</dt><dd>${Math.round(wx.wind)} km/h</dd></div><div><dt>Índice UV hoy</dt><dd>${Math.round(wx.uvMax)} · ${uvTxt(Math.round(wx.uvMax))}</dd></div><div><dt>Amanecer</dt><dd>${wx.rise ? fromIso(wx.rise) : s.rise}</dd></div><div><dt>Atardecer</dt><dd>${wx.set ? fromIso(wx.set) : s.set}</dd></div>${wx.wave != null ? `<div><dt>Olas</dt><dd>${dec1(wx.wave)} m</dd></div>` : ''}${wx.sea != null ? `<div><dt>Temperatura del agua</dt><dd>${Math.round(wx.sea)} °C</dd></div>` : ''}</dl>
<ul class="cx-days">${wx.days.map((x, i) => `<li><b>${wd(i)}</b>${ic(WMO(x.code)[1], 22)}<span>${Math.round(x.max)}° / ${Math.round(x.min)}°</span><small>${x.rain != null ? x.rain + ' % lluvia' : ''}</small></li>`).join('')}</ul>
<p class="fine">Fuente: Open-Meteo · actualizado ${ago(wx.ts)}${A.online() ? '' : ' (sin conexión: último dato guardado)'}</p>`; };
const paintWx = root => A.$$('[data-wx]', root || document).forEach(el => { el.innerHTML = ({ chips: wxChips, sea: seaLine, card: wxCard })[el.dataset.wx](); });
const refreshWx = () => loadWx().then(ok => { if (ok) paintWx(); });
window.addEventListener('online', () => setTimeout(refreshWx, 800));

/* ---------- la ciudad: lugares, datos e historia (fuente: lecheria.gov.ve) ---------- */
const PLACES = [
{ k: 'morro', n: 'Cerro El Morro', t: 'Mirador natural', d: 'Senderos entre cardones con la mejor vista de la ciudad, la bahía y las islas. Ve temprano o al atardecer, con agua y calzado cerrado.', q: 'Cerro El Morro Lechería' },
{ k: 'fortin', n: 'Fortín de La Magdalena', t: 'Historia', d: 'Fortificación de finales del siglo XVIII en El Morro. La visitaron Humboldt y Bonpland en 1800 y fue escenario de combates de la Independencia en 1817 y 1819.', q: 'Fortín de la Magdalena Lechería' },
{ k: 'virgen', n: 'Playa Lido', t: 'Playa', d: 'La playa urbana más visitada, con bulevar y el monumento a la Virgen del Valle a la orilla del mar. Revisa en la app si está abierta y con salvavidas.', q: 'Playa Lido Lechería' },
{ k: 'plaza', n: 'Plaza Bolívar de Lechería', t: 'Casco Central', d: 'Corazón del Casco Central y punto de encuentro de los vecinos. Su construcción se inició tras el contrato firmado en 1954 con el antiguo Distrito Bolívar.', q: 'Plaza Bolívar de Lechería' },
{ k: 'canales', n: 'Canales de El Morro', t: 'Complejo Turístico', d: 'Casas bote, marinas y canales navegables del Complejo Turístico El Morro, impulsado desde 1967 por CAZTOR y Daniel Camejo Octavio.', q: 'Complejo Turístico El Morro Lechería' },
{ k: 'iglesia', n: 'Iglesia María Auxiliadora', t: 'Fe', d: 'Uno de los templos más queridos de la ciudad. El Coro de Aguinaldos María Auxiliadora se fundó en 1960 y sigue animando la Navidad.', q: 'Iglesia María Auxiliadora Lechería' },
{ k: 'parque', n: 'Plaza El Parque', t: 'Plaza', d: 'Plaza arbolada del casco. Diagonal a ella, en la Quinta Araguaney, funciona el Registro Civil municipal.', q: 'Plaza El Parque Lechería' },
{ k: 'demu', n: 'Museo Dimitrios Demu', t: 'Arte', d: 'Fundado por el escultor griego Dimitrios Demu, radicado en Lechería desde 1965 y autor de obras monumentales como La Mariposa y el Heptaedro del Cielo.', q: 'Museo Dimitrios Demu Lechería' }
];
const HIST = [
['Siglo XVIII', 'Se levanta el Fortín de La Magdalena en El Morro para proteger la salina y el puerto de Barcelona.'],
['1800', 'Alejandro de Humboldt y Aimé Bonpland visitan El Morro y elogian su vista.'],
['1817', 'Simón Bolívar combate por el control del Fortín de La Magdalena.'],
['1965', 'Se inaugura la primera etapa de la Av. Lic. Diego Bautista Urbaneja, la Av. Principal.'],
['1967', 'Nace CAZTOR, la empresa que creó el Complejo Turístico El Morro.'],
['22 ene. 1992', 'Se crea el Municipio Turístico El Morro «Lic. Diego Bautista Urbaneja», con capital en Lechería.'],
['1993', 'Gilberto Ron Tovar es el primer alcalde electo por voto directo.'],
['2000', 'Abre el Museo a Cielo Abierto con el mural «Lluvia» de Rafael Borarín.']
];
const NEWS = [
['14 nov. 2026', 'Desarrollo urbano', 'Alcaldía de Lechería instala dos nuevos transformadores en el sector Morro III', 'https://lecheria.gov.ve/noticias'],
['13 nov. 2026', 'Desarrollo urbano', 'Alcalde Manuel Ferreira presenta propuesta de autosuficiencia eléctrica para Lechería', 'https://lecheria.gov.ve/noticias/a33dc2c8-f31e-42b4-a56d-9b664f0f3302'],
['10 nov. 2026', 'Salud', 'Más de 30 pacientes atendidos en jornada gratuita cardiometabólica de la Clínica Municipal', 'https://lecheria.gov.ve/noticias/a33dc190-20de-4f43-9cae-e81964601ecb'],
['9 nov. 2026', 'Gestión social', 'Lechería Siempre Contigo desplegó jornada de limpieza y recolección de cachivaches', 'https://lecheria.gov.ve/noticias/a33db68c-c9ef-4467-9e21-9755a2935198']
];
const SOCIAL = [['globe', 'Sitio web oficial', 'lecheria.gov.ve', 'https://lecheria.gov.ve/'], ['camera2', 'Instagram', '@alcaldiadelecheria', 'https://www.instagram.com/alcaldiadelecheria/'], ['mega', 'X (Twitter)', '@Urbanejalcaldia', 'https://x.com/Urbanejalcaldia'], ['play', 'YouTube', 'Alcaldía de Lechería', 'https://www.youtube.com/@alcaldiadelecheria9429']];
const maps = q => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
const placeCard = p => `<a class="cx-place-card" href="#/ciudadano/lecheria" data-act="cxPlace" data-k="${p.k}">${ph(p.k, '', 640, false, false)}<span><small>${esc(p.t)}</small><b>${esc(p.n)}</b></span></a>`;

/* ---------- trámites y servicios (fuente: lecheria.gov.ve) ---------- */
const RC = 'Registro Civil: Av. Anzoátegui con calle Los Almendrones, Quinta Araguaney, diagonal a la Plaza El Parque.';
const DEPTS = ['Administración y Finanzas', 'Administración Tributaria', 'Asuntos Públicos', 'Bienestar Social', 'Clínica Municipal', 'Consultoría Jurídica', 'Despacho del Alcalde', 'Dirección de Catastro', 'Dirección de Cultura', 'Dirección de Obras', 'Dirección de Presupuesto', 'Fundación Gestión Social', 'Gerencia de Gestión Urbana', 'Inquilinato', 'Instituto de Deporte', 'Planeamiento Urbano', 'Prensa y Comunicaciones', 'Protección Civil', 'Registro Civil', 'Servicios Generales', 'Tecnología y Sistemas', 'Otros'];
const TR = [
{ g: 'Registro Civil', i: 'doc', d: 'Trámites presenciales. Lleve siempre su cédula original.', where: RC, items: [
{ id: 'fe-de-vida', n: 'Constancia de fe de vida', req: ['Acudir personalmente con la cédula de identidad original.', 'Si la persona no puede trasladarse por salud: un familiar directo con informe médico firmado y sellado, de menos de 3 meses.', 'Un documento que demuestre su residencia en el municipio.'] },
{ id: 'nacimientos', n: 'Registro de nacimiento', req: ['Certificado de nacimiento EV-25 emitido por el centro de salud.', 'Cédula de ambos padres: original y 3 copias.', 'Copia del acta de matrimonio, si los padres son casados.', 'Si el bebé tiene más de 90 días: permiso de presentación extemporánea del CPNNA.', 'Dos testigos mayores de edad con una copia de su cédula.', 'Nacidos en el exterior: acta legalizada y apostillada (traducida si hace falta) y requisitos adicionales de la planilla.'] },
{ id: 'matrimonio', n: 'Matrimonio civil', req: ['Planilla de solicitud llena en letra de molde.', 'Constancia de residencia de uno de los contrayentes (condominio o consejo comunal).', 'Cédula de los contrayentes: original y 2 copias.', 'Partidas de nacimiento originales y copias de ambos.', 'Cartas de soltería de ambos y acta de esponsalicia impresa.', 'Copia de cédula de dos testigos venezolanos mayores de 21 años (no pueden ser los padres).', 'Adolescentes, divorciados o viudos: requisitos adicionales en la planilla oficial.'] },
{ id: 'union-estable-de-hecho', n: 'Unión estable de hecho', req: ['Planilla de solicitud llena en letra de molde.', 'Constancia de residencia del condominio o consejo comunal: original y copia.', 'Cédula de los interesados: original y 2 copias.', 'Copia de cédula de dos testigos mayores de 21 años, que no sean familiares y que asistan ese día.', 'Actas de nacimiento de los hijos en común, si los hay.', 'Si alguno es divorciado: sentencia de divorcio, original y copia.'] },
{ id: 'defunciones', n: 'Registro de defunción', req: ['Familiar directo (padres, hijos o cónyuge) con su cédula original y 4 copias.', 'Certificado de defunción del centro de salud, firmado y sellado: original y una copia.', 'Cuatro copias de la cédula de la persona fallecida.', 'Copia de cédula de dos testigos mayores de 18 años.', 'Fines de semana y feriados: consulte la guardia en la página oficial.'] },
{ id: 'permiso-de-mudanza', n: 'Permiso de mudanza', req: ['Cédula original y 2 copias.', 'Constancia del condominio o consejo comunal.', 'Inventario de los bienes a trasladar: original y una copia.', 'Dos copias del carnet de circulación del vehículo.', 'Dos copias de la licencia y de la cédula del chofer.'] },
{ id: 'constancia-de-residencia', n: 'Constancia de residencia', req: ['Iniciar la solicitud en la página web del CNE y seguir las instrucciones.', 'Presentar en el Registro Civil el documento emitido.', 'Fotocopia de la cédula.', 'RIF u otro documento que demuestre su residencia en el municipio.'] },
{ id: 'solteria', n: 'Carta de soltería', req: ['Una copia de la cédula del interesado.', 'Copia de un documento que demuestre su domicilio en el municipio.'] }
] },
{ g: 'Impuestos y pagos', i: 'coin', d: 'Administración Tributaria municipal.', items: [
{ id: 'declaracion', n: 'Declaración y pago en línea', dept: 'Administración Tributaria', link: 'https://lecheria.net/appweb/', txt: 'Declare y consulte sus impuestos municipales desde el sistema en línea de la Alcaldía.' },
{ id: 'actividades', n: 'Actividades económicas (patente de comercio)', dept: 'Administración Tributaria', txt: 'Licencia y declaración de ingresos de comercios, oficinas y empresas que operan en el municipio.' },
{ id: 'inmuebles', n: 'Inmuebles urbanos', dept: 'Administración Tributaria', txt: 'Impuesto sobre casas, apartamentos, locales y terrenos. Para la ficha del inmueble, vea Catastro.' },
{ id: 'vehiculos', n: 'Impuesto sobre vehículos', dept: 'Administración Tributaria', txt: 'Pago anual por vehículo registrado en el municipio. Necesario, por ejemplo, para vender un carro.' },
{ id: 'publicidad', n: 'Publicidad comercial', dept: 'Administración Tributaria', txt: 'Permisos y pago por avisos, vallas y publicidad en la vía pública.' },
{ id: 'solvencia', n: 'Solvencia municipal', dept: 'Administración Tributaria', txt: 'Constancia de que está al día con sus impuestos municipales.' }
] },
{ g: 'Vivienda y urbanismo', i: 'house', d: 'Catastro, permisos de construcción e inquilinato.', items: [
{ id: 'catastro', n: 'Cédula y ficha catastral', dept: 'Dirección de Catastro', txt: 'Registro oficial de su inmueble: linderos, área y uso. Se pide para vender, heredar o construir.' },
{ id: 'construccion', n: 'Permisos de construcción y variables urbanas', dept: 'Planeamiento Urbano', txt: 'Antes de construir, ampliar o remodelar, consulte lo que permite la zonificación de su sector.' },
{ id: 'inquilinato', n: 'Inquilinato', dept: 'Inquilinato', txt: 'Orientación y mediación entre inquilinos y propietarios.' },
{ id: 'obras', n: 'Obras en mi comunidad', dept: 'Dirección de Obras', txt: 'Proponga o consulte obras de vialidad, drenajes y espacios públicos.' }
] },
{ g: 'Salud y ayuda social', i: 'heart', d: 'Clínica Municipal, jornadas gratuitas y programas sociales.', items: [
{ id: 'clinica', n: 'Clínica Municipal', dept: 'Clínica Municipal', txt: 'Consultas y jornadas gratuitas, como las de atención cardiometabólica. Pregunte por la próxima jornada.' },
{ id: 'ayudas', n: 'Ayudas sociales', dept: 'Bienestar Social', txt: 'Apoyo con medicinas, estudios médicos y ayudas técnicas (sillas de ruedas, bastones) para quien lo necesite.' },
{ id: 'fundacion', n: 'Programas de la Fundación Gestión Social', dept: 'Fundación Gestión Social', txt: 'Programas para adultos mayores, niños y familias del municipio.' },
{ id: 'veterinaria', n: 'Clínica veterinaria municipal', dept: 'Otros', txt: 'Atención y jornadas para perros y gatos, como vacunación y esterilización.' },
{ id: 'fumigacion', n: 'Fumigación', dept: 'Gerencia de Gestión Urbana', txt: 'Solicite fumigación contra zancudos y plagas en su calle o comunidad.' }
] },
{ g: 'Ciudad limpia y segura', i: 'shield', d: 'Aseo, áreas verdes y prevención.', items: [
{ id: 'cachivaches', n: 'Recolección de cachivaches y escombros', dept: 'Gerencia de Gestión Urbana', txt: 'Muebles viejos, colchones, ramas y escombros que el camión de aseo no lleva en su ruta normal.' },
{ id: 'poda', n: 'Poda de árboles y áreas verdes', dept: 'Gerencia de Gestión Urbana', txt: 'Árboles que amenazan con caer, ramas sobre el tendido eléctrico o áreas verdes descuidadas.' },
{ id: 'pc-inspeccion', n: 'Inspección de Protección Civil', dept: 'Protección Civil', txt: 'Revisión de riesgos en viviendas, comercios y eventos; charlas de prevención para su comunidad.' },
{ id: 'reportar', n: 'Huecos, alumbrado, aguas y semáforos', link: '#/ciudadano/reportar', txt: 'Para un problema en la calle, use «Reportar»: llega con foto y ubicación a la cuadrilla responsable.' }
] },
{ g: 'Deporte y cultura', i: 'ball', d: 'Instituto de Deporte y Dirección de Cultura.', items: [
{ id: 'deporte', n: 'Escuelas deportivas y uso de canchas', dept: 'Instituto de Deporte', txt: 'Inscripción en disciplinas deportivas y solicitud de espacios para actividades.' },
{ id: 'cultura', n: 'Talleres y agrupaciones culturales', dept: 'Dirección de Cultura', txt: 'Talleres, la Orquesta Típica de Lechería, coros y actividades en espacios culturales.' },
{ id: 'eventos', n: 'Agenda de eventos', link: '#/ciudadano/ciudad/eventos', txt: 'Conciertos, ferias, cabildos abiertos y actividades deportivas de la ciudad.' }
] }
];
const ATC = { recibida: ['Recibida', 'recibido'], revision: ['En revisión', 'asignado'], respondida: ['Respondida', 'resuelto'] };
const seedT = () => { const t = Date.now(), H = 3600e3; return [
{ id: 'ATC-1024', dept: 'Gerencia de Gestión Urbana', subj: 'Fumigación en mi cuadra', body: 'Hay muchos zancudos por las lluvias. Pido fumigación en la calle de la panadería, Casco Central.', by: 'María González', mine: true, ts: t - 20 * H, status: 'recibida' },
{ id: 'ATC-1023', dept: 'Bienestar Social', subj: 'Ayuda con medicinas para la tensión', body: 'Soy adulta mayor y no consigo losartán. ¿Qué debo llevar para pedir la ayuda?', by: 'Ana Rodríguez', ts: t - 28 * H, status: 'recibida' },
{ id: 'ATC-1022', dept: 'Administración Tributaria', subj: 'Solvencia para vender mi carro', body: 'Necesito la solvencia del impuesto de vehículo. ¿Se puede pedir en línea?', by: 'José Malavé', ts: t - 44 * H, status: 'revision' },
{ id: 'ATC-1021', dept: 'Registro Civil', subj: 'Retirar acta de nacimiento', body: '¿Dónde retiro la copia certificada del acta de nacimiento de mi hijo?', by: 'María González', mine: true, ts: t - 70 * H, status: 'respondida', ans: 'Puede retirarla en el Registro Civil (Av. Anzoátegui con calle Los Almendrones, Quinta Araguaney). Lleve su cédula original.', ats: t - 52 * H }
]; };
const tram = s => s.tramites || (s.tramites = seedT());
const flushT = () => { const S = A.S; if (S && tram(S).some(t => t.queued)) A.commit(s => tram(s).filter(t => t.queued).forEach(t => { t.queued = false; t.ts = Date.now(); A.note(s, 'alcaldia', `Nueva solicitud ${t.id} para ${t.dept}: ${t.subj}`, '#/alcaldia/atencion'); })); };
window.addEventListener('online', () => setTimeout(flushT, 300));
const so = A.setOffline; A.setOffline = v => { so(v); if (!v) flushT(); };
const atcCreate = d => { let id; const q = !A.online(); A.commit(s => { tram(s); s.seq.atc = (s.seq.atc || 1024) + 1; id = 'ATC-' + s.seq.atc; s.tramites.unshift({ id, ...d, by: s.me.name, phone: s.me.phone, mine: true, ts: Date.now(), status: 'recibida', queued: q }); if (!q) A.note(s, 'alcaldia', `Nueva solicitud ${id} para ${d.dept}: ${d.subj}`, '#/alcaldia/atencion'); }); return id; };
const atcSet = (id, st, ans) => A.commit(s => { const x = A.find(tram(s), id); if (!x) return; x.status = st; if (ans) { x.ans = ans; x.ats = Date.now(); } if (x.mine) A.note(s, 'ciudadano', `Tu solicitud ${id} (${x.dept}): ${ATC[st][0].toLowerCase()}.${ans ? ' ' + ans : ''}`, '#/ciudadano/tramites/mis'); });
const atcRow = t => `<article class="info-card cx-atc"><header>${t.queued ? A.chip('cancelada', 'Por enviar') : A.chip(ATC[t.status][1], ATC[t.status][0])}<small>${esc(t.id)} · ${esc(t.dept)} · ${ago(t.ts)}</small></header><h3>${esc(t.subj)}</h3><p>${esc(t.body)}</p>${t.queued ? `<p class="net-state">${ic('off', 20)}<span><b>Guardada en tu teléfono</b><small>Se enviará sola cuando vuelva la señal.</small></span></p>` : ''}${t.ans ? `<div class="cx-ans">${ic('mega', 18)}<span><b>Respuesta de ${esc(t.dept)}</b>${esc(t.ans)}<small>${fdt(t.ats)}</small></span></div>` : ''}</article>`;

/* ---------- portal del ciudadano ---------- */
const P = A.cz.pages, shell = A.cz.shell;
const HERO = ['morro', 'lido', 'plaza', 'canales', 'fortin'];
let slide = 0, slideT = null, preDept = '', trq = '';
const GRID = () => [['#/ciudadano/reportar', 'camera', 'Reportar un problema'], ['#/ciudadano/tramites', 'doc', 'Trámites y servicios'], ['#/ciudadano/emergencia', 'siren', 'Emergencias'], ['#/ciudadano/ciudad/servicios', 'drop', 'Agua, luz y playas'], ['#/ciudadano/wifi', 'wifi', 'WiFi gratis'], ['#/ciudadano/ciudad/vialidad', 'cone', 'Vialidad'], ['#/ciudadano/ciudad/eventos', 'calendar', 'Eventos'], ['#/ciudadano/ciudad/obras', 'helmet', 'Obras'], ['#/ciudadano/lecheria', 'city', 'Conoce Lechería'], (P.telefonos ? ['#/ciudadano/telefonos', 'phone', 'Teléfonos útiles'] : ['#/ciudadano/tramites/directorio', 'list', 'Directorio']), ['#/ciudadano/tramites/escribir', 'users', 'Escribir a la Alcaldía'], ['#/ciudadano/mapa', 'pin', 'Mapa']];
const motion = () => !A.prefs.calm && !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
const heroAfter = el => { const box = A.$('#cxSlides', el); clearInterval(slideT); if (!box) return;
box.scrollLeft = slide * box.clientWidth;
box.addEventListener('scroll', () => { const i = Math.round(box.scrollLeft / Math.max(1, box.clientWidth)); if (i !== slide) { slide = i; A.$$('.cx-dots button', el).forEach((b, j) => b.classList.toggle('on', j === i)); } }, { passive: true });
if (motion()) slideT = setInterval(() => { if (!document.body.contains(box)) return clearInterval(slideT); box.scrollTo({ left: ((slide + 1) % HERO.length) * box.clientWidth, behavior: 'smooth' }); }, 6500); };
on.cxSlide = el => { const box = A.$('#cxSlides'); if (box) box.scrollTo({ left: +el.dataset.i * box.clientWidth, behavior: motion() ? 'smooth' : 'auto' }); };

P.inicio = (p, S) => { const a = A.cz.live(S), road = S.roads.find(r => r.active), mine = S.reports.filter(r => r.mine).sort(byTs).slice(0, 2), sols = tram(S).filter(t => t.mine).sort(byTs).slice(0, 2), M = A.cz.SOSMSG;
const beaches = Object.entries(A.BEACH).map(([k, v]) => [S.beaches.filter(b => b.status === k).length, v[0].toLowerCase()]).filter(x => x[0]).map(x => x[0] + ' ' + x[1] + (x[0] > 1 ? 's' : '')).join(' · ');
return { html: shell('inicio', `<section class="cx-hero" aria-label="Lechería hoy"><div class="cx-slides" id="cxSlides">${HERO.map((k, i) => `<div class="cx-slide">${ph(k, '', 960, i === 0, false)}<span class="cx-place"><b>${esc(PH[k][3])}</b>${credit(k)}</span></div>`).join('')}</div>
<div class="cx-hero-tx"><p>${A.greet()}, ${esc(S.me.name.split(' ')[0])}</p><h2>¿Qué necesitas hoy en Lechería?</h2><div class="cx-wx" data-wx="chips">${wxChips()}</div></div>
<div class="cx-dots">${HERO.map((k, i) => `<button data-act="cxSlide" data-i="${i}" class="${i === slide ? 'on' : ''}" aria-label="Foto ${i + 1}: ${esc(PH[k][3])}"></button>`).join('')}</div></section>
${a ? `<a class="sos-active st-${a.status}" href="#/ciudadano/sos"><span class="sos-pulse">${ic(A.STYPES[a.type].i, 22)}</span><span><b>${M[a.status][0]}</b><small>Toca para ver el estado en vivo</small></span></a>`
: `<section class="sos-block"><a class="sos-btn" href="#/ciudadano/sos" aria-label="Botón de pánico SOS"><span>SOS</span></a><div><h3>Botón de pánico</h3><p>Avisa a seguridad y Protección Civil con tu ubicación exacta.</p></div></section>`}
${S.services.filter(x => x.status !== 'ok' && (x.sectors || []).includes(S.me.sector)).map(x => `<a class="sector-alert t-${A.tone(A.SVC, x.status)}" href="#/ciudadano/ciudad/servicios" role="alert">${ic(x.i, 26)}<span><b>${esc(x.n)}: ${A.SVC[x.status][0].toLowerCase()} en tu sector</b><small>${esc(S.me.sector)}. ${esc(x.next || x.note)}</small></span></a>`).join('')}
${A.cz.upcoming ? A.cz.upcoming(S).filter(o => o.sector === S.me.sector && o.from - Date.now() < 48 * 36e5).map(o => A.cz.outCard(o, true)).join('') : ''}
<a class="cx-emg" href="#/ciudadano/emergencia">${ic('siren', 26)}<span><b>Emergencias, también sin internet</b><small>SMS con tu ubicación GPS, primeros auxilios, linterna y qué hacer en cada caso.</small></span>${ic('arrow', 18)}</a>
<section class="city-now"><header class="sec-h"><h2>Así está Lechería hoy</h2><a href="#/ciudadano/ciudad/servicios">Ver detalle</a></header><div class="svc-strip">${S.services.map(A.cz.svcTile).join('')}</div>
<a class="beach-line" href="#/ciudadano/ciudad/servicios">${ic('wave', 20)}<span><b>Playas:</b> ${beaches}</span>${ic('arrow', 18)}</a><p class="cx-sea" data-wx="sea">${seaLine()}</p>${A.say ? A.say('Así está Lechería hoy. ' + S.services.map(x => `${x.n}: ${A.SVC[x.status][0]}.`).join(' ') + ' ' + S.beaches.map(b => `${b.n}: ${A.BEACH[b.status][0]}.`).join(' '), 'Escuchar') : ''}</section>
${road ? `<a class="road-banner" href="#/ciudadano/ciudad/vialidad">${ic('cone')}<span><b>${esc(A.ROADKINDS[road.kind])}.</b> ${esc(road.title)}</span></a>` : ''}
<section><header class="sec-h"><h2>Todo en un lugar</h2></header><nav class="cx-grid" aria-label="Servicios de la app">${GRID().map(([h, i, n]) => `<a href="${h}"><span class="cx-gi">${ic(i, 24)}</span><span>${n}</span></a>`).join('')}</nav></section>
<section><header class="sec-h"><h2>Descubre Lechería</h2><a href="#/ciudadano/lecheria">Ver todo</a></header><div class="cx-places">${PLACES.slice(0, 6).map(placeCard).join('')}</div></section>
<section><header class="sec-h"><h2>Mis casos</h2><a href="#/ciudadano/reportes">Reportes</a></header>${mine.map(A.cz.repRow).join('') || '<p class="empty">Aún no has reportado nada. Toca «Reportar» cuando veas algo que arreglar.</p>'}
${sols.map(t => `<a class="row-card" href="#/ciudadano/tramites/mis"><span class="cat-ic">${ic('users')}</span><span class="row-main"><b>${esc(t.subj)}</b><small>${esc(t.id)} · ${esc(t.dept)} · ${ago(t.ts)}</small></span>${t.queued ? A.chip('cancelada', 'Por enviar') : A.chip(ATC[t.status][1], ATC[t.status][0])}</a>`).join('')}</section>
<section><header class="sec-h"><h2>Lo último en la ciudad</h2><a href="#/ciudadano/ciudad/noticias">Más noticias</a></header>${[...S.news].sort(byTs).slice(0, 3).map(A.cz.newsRow).join('')}<a class="beach-line" href="#/ciudadano/lecheria">${ic('globe', 20)}<span><b>Noticias oficiales</b> de la Alcaldía en lecheria.gov.ve</span>${ic('arrow', 18)}</a></section>`),
after: el => { heroAfter(el); refreshWx(); } }; };

P.lecheria = (p, S) => ({ html: shell('ciudad', `<section class="cx-cover">${ph('isla', '', 1280, true)}<div class="cx-cover-tx"><small>Estado Anzoátegui · Venezuela</small><h2>Lechería</h2><p>Capital del Municipio Turístico El Morro «Lic. Diego Bautista Urbaneja» y capital turística de Anzoátegui.</p></div></section>
<dl class="cx-facts"><div><dt>Superficie</dt><dd>18 km²</dd></div><div><dt>Municipio creado</dt><dd>22 de enero de 1992</dd></div><div><dt>Alcalde</dt><dd>Manuel Ferreira</dd></div><div><dt>Su nombre</dt><dd>Por los corrales de leche de chiva de fines del siglo XIX</dd></div></dl>
<section class="card cx-wx-card"><h2>${ic('sun', 20)} El tiempo en Lechería</h2><div data-wx="card">${wxCard()}</div></section>
<section><header class="sec-h"><h2>Lugares para conocer</h2></header><div class="cx-place-list">${PLACES.map(x => `<article class="cx-place-full" id="lugar-${x.k}">${ph(x.k, '', 960)}<div><small>${esc(x.t)}</small><h3>${esc(x.n)}</h3><p>${esc(x.d)}</p><a class="btn btn-sm btn-line" href="${maps(x.q)}" target="_blank" rel="noopener">${ic('pin', 16)} Cómo llegar</a></div></article>`).join('')}</div></section>
<section class="card cx-hist-card"><h2>${ic('book', 20)} Historia en pocas líneas</h2><p class="cx-hist-lead">Antes de la ciudad hubo cumanagotos, un fortín, una salina y pescadores margariteños. El nombre viene de los puestos de leche de chiva de Nicomedes Iriza, Carmen Bustillos y Zoila Rodríguez.</p><ol class="cx-hist">${HIST.map(([y, t]) => `<li><b>${y}</b><span>${esc(t)}</span></li>`).join('')}</ol><p class="fine">Fuente: «Lechería: historia de una ciudad modelo», de Maximilian Kopp M., cronista de la ciudad (lecheria.gov.ve).</p></section>
<section><header class="sec-h"><h2>Noticias oficiales</h2><a href="https://lecheria.gov.ve/noticias" target="_blank" rel="noopener">lecheria.gov.ve</a></header>${NEWS.map(([d, c, t, u]) => `<a class="news-row cx-off-news" href="${u}" target="_blank" rel="noopener"><span class="news-cat">${esc(c)}</span><b>${esc(t)}</b><small>${d} · Alcaldía de Lechería ${ic('ext', 13)}</small></a>`).join('')}</section>
<section><header class="sec-h"><h2>Canales oficiales de la Alcaldía</h2></header><div class="cx-social">${SOCIAL.map(([i, n, h, u]) => `<a href="${u}" target="_blank" rel="noopener">${ic(i, 22)}<span><b>${n}</b><small>${h}</small></span></a>`).join('')}</div></section>
<p class="fine">Fotos reales de Lechería publicadas en Wikimedia Commons con licencias libres; el autor aparece en cada foto. Clima y mar: Open-Meteo.</p>`, { back: '#/ciudadano/inicio', title: 'Conoce Lechería' }),
after: el => { refreshWx(); const k = sessionStorage.lchcPlace; if (k) { delete sessionStorage.lchcPlace; const t = A.$('#lugar-' + k, el); if (t) setTimeout(() => t.scrollIntoView({ block: 'start' }), 60); } } });
on.cxPlace = el => { sessionStorage.lchcPlace = el.dataset.k; };
Object.assign(A.IC, { book: 'M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z' });

const trTabs = cur => `<div class="seg" role="tablist">${[['', 'Trámites'], ['directorio', 'Directorio'], ['escribir', 'Escribir'], ['mis', 'Mis casos']].map(([k, n]) => `<a role="tab" aria-selected="${k === cur}" class="${k === cur ? 'on' : ''}" href="#/ciudadano/tramites${k ? '/' + k : ''}">${n}</a>`).join('')}</div>`;
const trItem = (g, x) => `<details class="cx-tr" data-q="${esc((g.g + ' ' + x.n + ' ' + (x.txt || '') + ' ' + (x.req || []).join(' ')).toLowerCase())}"><summary><b>${esc(x.n)}</b>${ic('chev', 20)}</summary><div class="cx-tr-b">${x.txt ? `<p>${esc(x.txt)}</p>` : ''}
${x.req ? `<h5>Requisitos</h5><ol>${x.req.map(r => `<li>${esc(r)}</li>`).join('')}</ol><p class="cx-where">${ic('pin', 16)} ${esc(g.where)}</p>` : ''}
<div class="btn-row">${g.where ? `<a class="btn btn-sm btn-line" href="https://lecheria.gov.ve/registro-civil/${x.id}" target="_blank" rel="noopener">${ic('ext', 15)} Planilla y detalle oficial</a>` : ''}${x.link ? `<a class="btn btn-sm btn-mar" href="${x.link}"${/^http/.test(x.link) ? ' target="_blank" rel="noopener"' : ''}>${/^http/.test(x.link) ? ic('ext', 15) + ' Ir al sistema en línea' : ic('arrow', 15) + ' Abrir'}</a>` : ''}${x.link && !x.dept ? '' : `<a class="btn btn-sm ${x.link ? 'btn-ghost' : 'btn-mar'}" href="#/ciudadano/tramites/escribir" data-act="atcGo" data-dept="${esc(x.dept || g.g)}" data-subj="${esc(x.n)}">${ic('send', 15)} Hacer una consulta</a>`}</div></div></details>`;
P.tramites = (p, S) => { const t = p[0] || '';
if (t === 'directorio') return shell('inicio', `${trTabs(t)}<p class="feed-lead">Las 22 dependencias de la Alcaldía de Lechería. Escríbale a cualquiera y siga su respuesta aquí.</p>
<a class="cx-emg" href="#/ciudadano/emergencia">${ic('siren', 24)}<span><b>¿Es una emergencia?</b><small>Llama al 911 o abre Emergencias: funciona sin internet.</small></span>${ic('arrow', 18)}</a>
<ul class="cx-dir">${DEPTS.filter(d => d !== 'Otros').map(d => `<li><span>${ic(d === 'Protección Civil' ? 'shield' : d === 'Clínica Municipal' ? 'cross' : d === 'Registro Civil' ? 'doc' : d.includes('Tributaria') ? 'coin' : 'city', 20)}<b>${esc(d)}</b></span><a class="btn btn-sm btn-line" href="#/ciudadano/tramites/escribir" data-act="atcGo" data-dept="${esc(d)}">Escribir</a></li>`).join('')}</ul>
<p class="cx-where">${ic('pin', 16)} ${esc(RC)}</p><p class="fine">Fuente: Oficina de Atención al Ciudadano, lecheria.gov.ve.</p>`, { back: '#/ciudadano/inicio', title: 'Trámites y servicios' });
if (t === 'escribir') { const d = preDept || DEPTS[0], subj = sessionStorage.lchcSubj || ''; return shell('inicio', `${trTabs(t)}<form class="form" data-form="atcSend"><h2>Escribir a la Alcaldía</h2><p class="lead">Tu mensaje llega a la Oficina de Atención al Ciudadano y a la dirección que elijas. Te avisamos cuando respondan.${A.online() ? '' : ' <b>Sin conexión:</b> se guarda y sale sola al volver la señal.'}</p>
<label>¿A quién va dirigido?<select name="dept">${DEPTS.map(x => `<option ${x === d ? 'selected' : ''}>${esc(x)}</option>`).join('')}</select></label>
<label>Asunto<input name="subj" required maxlength="90" value="${esc(subj)}" placeholder="Ej.: solvencia para vender mi carro"></label>
<label>Cuéntanos qué necesitas<textarea name="body" rows="4" required maxlength="800" placeholder="Escribe con tus palabras. Incluye dirección o sector si hace falta."></textarea></label>
<p class="cx-where">${ic('user', 16)} Responderemos a ${esc(S.me.name)} · ${esc(S.me.phone)} · ${esc(S.me.sector)}. <a href="#/ciudadano/perfil">Cambiar mis datos</a></p>
<button class="btn btn-mar btn-block">${ic('send', 18)} Enviar solicitud</button></form>`, { back: '#/ciudadano/tramites', title: 'Escribir a la Alcaldía' }); }
if (t === 'mis') { const L = tram(S).filter(x => x.mine).sort(byTs); return shell('inicio', `${trTabs(t)}${L.map(atcRow).join('') || '<p class="empty">Aún no has escrito a la Alcaldía. Usa «Escribir» para hacer una consulta o solicitud.</p>'}`, { back: '#/ciudadano/tramites', title: 'Mis solicitudes' }); }
return { html: shell('inicio', `${trTabs('')}<label class="cx-search">${ic('search', 20)}<input type="search" id="trq" placeholder="Buscar: acta, mudanza, impuesto, fumigación…" value="${esc(trq)}" aria-label="Buscar un trámite"></label>
${TR.map(g => `<section class="cx-tr-g"><header><span class="cx-gi">${ic(g.i, 22)}</span><span><h2>${esc(g.g)}</h2><small>${esc(g.d)}</small></span></header>${g.items.map(x => trItem(g, x)).join('')}</section>`).join('')}
<p class="cx-none" hidden>No encontramos ese trámite. <a href="#/ciudadano/tramites/escribir" data-act="atcGo" data-dept="Otros">Escríbenos tu consulta</a>.</p>
<p class="fine">Requisitos tomados de lecheria.gov.ve. Antes de ir, confirma en la planilla oficial: pueden cambiar.</p>`, { back: '#/ciudadano/inicio', title: 'Trámites y servicios' }),
after: el => { const i = A.$('#trq', el); if (!i) return; const f = () => { trq = i.value; const q = i.value.trim().toLowerCase(); let n = 0; A.$$('.cx-tr', el).forEach(d => { const ok = !q || d.dataset.q.includes(q); d.hidden = !ok; if (ok) n++; if (q && ok) d.open = true; }); A.$$('.cx-tr-g', el).forEach(g => { g.hidden = !A.$$('.cx-tr:not([hidden])', g).length; }); A.$('.cx-none', el).hidden = n > 0; }; i.addEventListener('input', f); if (trq) f(); } }; };
on.atcGo = el => { preDept = el.dataset.dept || ''; if (el.dataset.subj) sessionStorage.lchcSubj = el.dataset.subj; else delete sessionStorage.lchcSubj; };
on.atcSend = (f, d) => { const id = atcCreate({ dept: d.dept, subj: d.subj.trim(), body: d.body.trim() }); preDept = ''; delete sessionStorage.lchcSubj; toast(A.online() ? `Solicitud ${id} enviada a ${d.dept}` : `Solicitud ${id} guardada. Se enviará al volver la señal.`); go('#/ciudadano/tramites/mis'); };

/* ---------- consola de la Alcaldía ---------- */
const G = A.gx;
if (G) {
const nav0 = G.ROLES.alcaldia.nav;
G.ROLES.alcaldia.nav = S => { const a = nav0(S); a.splice(2, 0, ['atencion', 'users', 'Atención al ciudadano', tram(A.S).filter(t => !t.queued && t.status === 'recibida').length]); return a; };
let atf = 'todas';
G.alc.atencion = S => { const L = tram(A.S).filter(t => !t.queued), list = L.filter(t => atf === 'todas' || t.status === atf).sort(byTs), ans = L.filter(t => t.ats), nNew = L.filter(t => t.status === 'recibida').length;
return G.shell('alcaldia', 'atencion', 'Atención al ciudadano', `<div class="kpis">${G.kpi(nNew, 'Solicitudes nuevas', 'esperan respuesta', 'users', nNew ? 'bad' : '')}${G.kpi(L.filter(t => t.status === 'revision').length, 'En revisión', 'en manos de una dirección', 'clock')}${G.kpi(L.filter(t => t.status === 'respondida').length, 'Respondidas', 'el vecino recibió aviso', 'check', 'ok')}${G.kpi(ans.length ? A.dur(avg(ans.map(t => t.ats - t.ts))) : '—', 'Tiempo medio de respuesta', 'desde que el vecino escribe', 'clock', 'sol')}</div>
<div class="filters">${[['todas', 'Todas'], ...Object.entries(ATC).map(([k, v]) => [k, v[0]])].map(([k, n]) => `<button class="fchip ${atf === k ? 'on' : ''}" data-act="atf" data-k="${k}" aria-pressed="${atf === k}">${n} <b>${k === 'todas' ? L.length : L.filter(t => t.status === k).length}</b></button>`).join('')}</div>
<div class="table-wrap"><table class="tbl click"><thead><tr><th>N.º</th><th>Dirección</th><th>Asunto</th><th>Vecino</th><th>Recibida</th><th>Estado</th></tr></thead><tbody>${list.map(t => `<tr data-act="atcOpen" data-id="${t.id}" tabindex="0"><td><b>${t.id}</b></td><td>${esc(t.dept)}</td><td>${esc(t.subj)}</td><td>${esc(t.by)}</td><td>${ago(t.ts)}</td><td>${A.chip(ATC[t.status][1], ATC[t.status][0])}</td></tr>`).join('')}</tbody></table>${list.length ? '' : '<p class="empty">No hay solicitudes en este estado.</p>'}</div>`, '', 'Consultas y solicitudes que los vecinos envían a cualquier dirección desde la app.'); };
on.atf = el => { atf = el.dataset.k; A.render(); };
on.atcOpen = el => { const t = A.find(tram(A.S), el.dataset.id); if (!t) return; modal(`<div class="read"><h2>${esc(t.id)} · ${esc(t.subj)}</h2><p>${esc(t.body)}</p><dl class="facts"><div><dt>Vecino</dt><dd>${esc(t.by)}</dd></div><div><dt>Teléfono</dt><dd>${esc(t.phone || '—')}</dd></div><div><dt>Dirección</dt><dd>${esc(t.dept)}</dd></div><div><dt>Recibida</dt><dd>${fdt(t.ts)}</dd></div></dl>
${t.ans ? `<div class="cx-ans">${ic('mega', 18)}<span><b>Respuesta enviada</b>${esc(t.ans)}<small>${fdt(t.ats)}</small></span></div>` : ''}
<form class="form" data-form="atcAns"><input type="hidden" name="id" value="${t.id}"><label>Estado<select name="status">${Object.entries(ATC).map(([k, v]) => `<option value="${k}" ${k === t.status ? 'selected' : ''}>${v[0]}</option>`).join('')}</select></label><label>Respuesta para el vecino (le llega como notificación)<textarea name="ans" rows="3" placeholder="Escriba como si hablara con el vecino: qué debe hacer, dónde y cuándo."></textarea></label><button class="btn btn-mar">Guardar y avisar al vecino</button></form></div>`, 'wide'); };
on.atcAns = (f, d) => { atcSet(d.id, d.status, d.ans.trim()); A.closeModal(); toast(`Solicitud ${d.id} actualizada. El vecino fue notificado.`); };
const panel0 = G.alc.panel;
G.alc.panel = S => { const o = panel0(S), n = tram(A.S).filter(t => !t.queued && t.status === 'recibida').length;
const banner = `<section class="cx-banner">${ph('canales', '', 1280, true, false)}<div class="cx-banner-tx"><p>Lechería hoy · ${A.flong()}</p><h2>Capital turística de Anzoátegui</h2><div class="cx-wx" data-wx="chips">${wxChips()}</div><p class="cx-sea" data-wx="sea">${seaLine()}</p></div><div class="cx-banner-side"><a href="#/alcaldia/atencion">${ic('users', 22)}<span><b>${n}</b> ${n === 1 ? 'solicitud nueva' : 'solicitudes nuevas'} de vecinos</span>${ic('arrow', 18)}</a><a href="#/alcaldia/servicios">${ic('wave', 22)}<span><b>${S.beaches.filter(b => b.status === 'abierta').length} de ${S.beaches.length}</b> playas abiertas</span>${ic('arrow', 18)}</a><a href="#/alcaldia/servicios">${ic('wifi', 22)}<span><b>${S.wifi.filter(w => w.status !== 'caido').length} de ${S.wifi.length}</b> puntos WiFi activos</span>${ic('arrow', 18)}</a></div>${credit('canales')}</section>`;
o.html = o.html.replace('<section class="dash-hello">', banner + '<section class="dash-hello">'); const af = o.after; o.after = el => { if (af) af(el); refreshWx(); }; return o; };
}
Object.assign(A, { PH, ph, phUrl, wxChips, seaLine, sun, tram, refreshWx, atc: { create: atcCreate, set: atcSet } });
})();
