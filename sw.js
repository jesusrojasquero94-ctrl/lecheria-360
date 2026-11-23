/* Lechería Conecta · service worker (versión 3 de la app; caché lchc-v4).
La app queda guardada en el teléfono y funciona sin internet, empezando por Emergencias:
- Páginas y código propio: red primero y, si no hay señal, la copia guardada.
- Mapas, tipografías y Leaflet: copia guardada primero y se renueva en segundo plano.
- Fotos de la ciudad (Wikimedia Commons): las ya vistas quedan guardadas (máximo 40).
- Clima y mar (Open-Meteo): red primero; sin señal, el último dato guardado.
Las teselas de mapa ya vistas quedan disponibles sin conexión (máximo 600). */
const C = 'lchc-v6', T = 'lchc-mapas-v1', F = 'lchc-fotos-v1', MAX_TILES = 600, MAX_FOTOS = 40;
const SHELL = ['./', 'index.html', 'styles.css', 'ciudad.css', 'tema.css', 'data.js', 'core.js', 'ciudadano.js', 'gestion.js', 'ciudad.js', 'emergencia.js', 'inmuebles.js', 'landing.js', 'icon.svg', 'manifest.webmanifest'];
const CDN = ['https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(SHELL).then(() => Promise.all(CDN.map(u => fetch(u, { mode: 'no-cors' }).then(r => c.put(u, r)).catch(() => {}))))).catch(() => {})); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C && x !== T && x !== F).map(x => caches.delete(x)))).then(() => self.clients.claim())));
const trim = async (name, max) => { const c = await caches.open(name), k = await c.keys(); for (let i = 0; i < k.length - max; i++) await c.delete(k[i]); };
self.addEventListener('fetch', e => {
const r = e.request; if (r.method !== 'GET') return;
const u = new URL(r.url);
if (u.origin === location.origin) {
e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)); return res; })
.catch(() => caches.match(r, { ignoreSearch: true }).then(m => m || caches.match('index.html'))));
return;
}
if (/open-meteo\.com$/.test(u.hostname)) {
e.respondWith(fetch(r).then(res => { if (res.ok) { const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)); } return res; }).catch(() => caches.match(r)));
return;
}
const tile = /tile\.openstreetmap\.org$/.test(u.hostname), foto = /wikimedia\.org$/.test(u.hostname);
if (tile || foto || /unpkg\.com|fonts\.(googleapis|gstatic)\.com/.test(u.hostname)) {
const name = tile ? T : foto ? F : C;
e.respondWith(caches.open(name).then(c => c.match(r).then(m => {
const net = () => fetch(r).then(res => { if (res && (res.ok || res.type === 'opaque')) { c.put(r, res.clone()); if (tile) trim(T, MAX_TILES); if (foto) trim(F, MAX_FOTOS); } return res; }).catch(() => m);
if (!m) return net();
if (!foto) net(); /* las fotos no cambian: no se vuelven a descargar */
return m;
})));
}
});
/* Al tocar una notificación se abre la app en la sección del aviso. */
self.addEventListener('notificationclick', e => { e.notification.close(); const link = (e.notification.data && e.notification.data.link) || '#/ciudadano/inicio';
e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => { const w = list[0]; if (w) { w.navigate('./' + link).catch(() => {}); return w.focus(); } return self.clients.openWindow('./' + link); })); });
