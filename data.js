/* Lechería Conecta · datos de demostración. Todo el contenido es ficticio.
   Desarrollado por Qiu Agency de Qiu Capital Group C.A. · RIF J-50880192-0 */
window.L360 = window.L360 || {};

L360.SECTORS = {
  'Casco Central': [10.1991, -64.6938], 'Av. Principal': [10.1930, -64.6917], 'Playa Lido': [10.2018, -64.6895],
  'El Morro': [10.1929, -64.6741], 'Av. Américo Vespucio': [10.2001, -64.6822], 'Playa Los Canales': [10.2020, -64.6804],
  'Pueblo Viejo': [10.1975, -64.6665], 'Las Villas': [10.1885, -64.6714], 'Cerro El Morro': [10.2129, -64.7087]
};

L360.CATS = {
  via: { n: 'Vías y huecos', i: 'cone', dept: 'Infraestructura' },
  luz: { n: 'Alumbrado público', i: 'bulb', dept: 'Servicios Públicos' },
  aseo: { n: 'Aseo y desechos', i: 'trash', dept: 'Aseo Urbano' },
  agua: { n: 'Aguas y drenajes', i: 'drop', dept: 'Servicios Públicos' },
  senal: { n: 'Semáforos y señales', i: 'alert', dept: 'Tránsito' },
  parque: { n: 'Parques y espacios', i: 'tree', dept: 'Espacios Públicos' },
  otro: { n: 'Otro', i: 'plus', dept: 'Atención al Ciudadano' }
};
L360.DEPTS = ['Infraestructura', 'Servicios Públicos', 'Aseo Urbano', 'Tránsito', 'Espacios Públicos', 'Atención al Ciudadano'];
L360.RSTATUS = { recibido: 'Recibido', asignado: 'Asignado', en_proceso: 'En proceso', resuelto: 'Resuelto' };
L360.SSTATUS = { nueva: 'Enviada', recibida: 'Recibida', en_camino: 'Unidad en camino', atendida: 'Atendida', cancelada: 'Cancelada' };
L360.STYPES = {
  seguridad: { n: 'Seguridad', i: 'shield', d: 'Robo, amenaza o situación de riesgo' },
  medica: { n: 'Emergencia médica', i: 'cross', d: 'Accidente, desmayo o herido' },
  rescate: { n: 'Incendio o rescate', i: 'flame', d: 'Fuego, inundación o persona atrapada' }
};
L360.NEWSCATS = ['Gestión', 'Cultura', 'Política', 'Social', 'Deporte', 'Turismo'];
L360.ROADKINDS = { cierre: 'Cierre', desvio: 'Desvío', trafico: 'Tránsito lento', accidente: 'Accidente' };
/* Estado de la ciudad: [etiqueta, tono]. El tono nunca va solo: siempre lo acompaña la palabra y un icono. */
L360.SVC = { ok: ['Normal', 'ok'], parcial: ['Con fallas', 'warn'], corte: ['Interrumpido', 'bad'] };
L360.WIFI = { activo: ['Funcionando', 'ok'], lento: ['Lento', 'warn'], caido: ['Sin servicio', 'bad'] };
/* Teléfonos útiles. Solo el 911 es un número real; los demás se cargan cuando la Alcaldía los confirme. */
L360.PHONES = [
  { n: 'Emergencias (VEN 911)', d: 'Policía, ambulancia y bomberos', num: '911', i: 'alert', urgent: true },
  { n: 'Policía Municipal de Urbaneja', d: 'Seguridad en la ciudad', num: null, i: 'shield' },
  { n: 'Protección Civil de Urbaneja', d: 'Rescate, inundaciones, playas', num: null, i: 'cross' },
  { n: 'Bomberos', d: 'Incendios y rescates', num: null, i: 'flame' },
  { n: 'Atención al Ciudadano (Alcaldía)', d: 'Reportes, trámites y dudas', num: null, i: 'users' },
  { n: 'Hidrocaribe', d: 'Fallas del servicio de agua', num: null, i: 'drop' },
  { n: 'Corpoelec', d: 'Fallas del servicio eléctrico', num: null, i: 'bolt' }
];
L360.BEACH = { abierta: ['Abierta', 'ok'], precaucion: ['Precaución', 'warn'], cerrada: ['Cerrada', 'bad'] };

L360.seed = function () {
  const H = 3600e3, D = 24 * H, t = Date.now();
  const day = n => new Date(t + n * D).toISOString().slice(0, 10);
  const clock = (dayOff, h) => { const d = new Date(t + dayOff * D); d.setHours(h, 0, 0, 0); return d.getTime(); };
  const soon = Math.ceil(t / H) * H + 2 * H;
  const S = L360.SECTORS, at = (s, dx = 0, dy = 0) => ({ sector: s, lat: S[s][0] + dx, lng: S[s][1] + dy });
  return {
    v: 6, seq: { rep: 1046, sos: 212, req: 31 },
    me: { name: 'María González', phone: '0414 555 0101', sector: 'Casco Central', contact: 'Luis González · 0424 555 0102' },
    sos: [
      { id: 'SOS-211', type: 'medica', name: 'Carlos Rivas', phone: '0412 555 0144', ...at('Playa Lido', .0008), ts: t - 26 * H, status: 'atendida', unit: 'u4', op: 'Op. Andrea Salazar', t1: t - 26 * H + 40e3, t2: t - 26 * H + 95e3, t3: t - 26 * H + 11 * 60e3,
        log: [{ ts: t - 26 * H, txt: 'Alerta enviada desde la app' }, { ts: t - 26 * H + 40e3, txt: 'Recibida por Op. Andrea Salazar' }, { ts: t - 26 * H + 95e3, txt: 'Ambulancia A-01 en camino' }, { ts: t - 26 * H + 11 * 60e3, txt: 'Paciente estabilizado y trasladado' }] }
    ],
    reports: [
      { id: 'LCH-1041', cat: 'via', desc: 'Hueco profundo frente a la panadería; los carros frenan de golpe.', ...at('Av. Principal', .0006, .0004), ts: t - 5 * D, status: 'en_proceso', dept: 'Infraestructura', work: 'w1', by: 'María González', mine: true,
        log: [{ ts: t - 5 * D, txt: 'Reporte recibido' }, { ts: t - 4.6 * D, txt: 'Asignado a Infraestructura' }, { ts: t - 3 * D, txt: 'Incluido en la obra de rehabilitación de la Av. Principal' }] },
      { id: 'LCH-1042', cat: 'luz', desc: 'Tres postes seguidos sin luz desde el fin de semana.', ...at('Av. Américo Vespucio', -.0005), ts: t - 3 * D, status: 'asignado', dept: 'Servicios Públicos', by: 'José Malavé',
        log: [{ ts: t - 3 * D, txt: 'Reporte recibido' }, { ts: t - 2.5 * D, txt: 'Asignado a Servicios Públicos' }] },
      { id: 'LCH-1043', cat: 'aseo', desc: 'Acumulación de desechos al lado de la parada.', ...at('Pueblo Viejo', .0004), ts: t - 2 * D, status: 'resuelto', dept: 'Aseo Urbano', by: 'Ana Rodríguez', rating: 5,
        log: [{ ts: t - 2 * D, txt: 'Reporte recibido' }, { ts: t - 1.8 * D, txt: 'Asignado a Aseo Urbano' }, { ts: t - 1.2 * D, txt: 'Cuadrilla retiró los desechos' }] },
      { id: 'LCH-1044', cat: 'agua', desc: 'Tapa de alcantarilla rota, sale agua cuando llueve.', ...at('Las Villas', .0003, -.0006), ts: t - 30 * H, status: 'recibido', by: 'María González', mine: true, log: [{ ts: t - 30 * H, txt: 'Reporte recibido' }] },
      { id: 'LCH-1045', cat: 'senal', desc: 'Semáforo intermitente en el cruce, casi hay un choque.', ...at('Casco Central', -.0004, .0007), ts: t - 9 * H, status: 'recibido', by: 'Pedro Marcano', log: [{ ts: t - 9 * H, txt: 'Reporte recibido' }] },
      { id: 'LCH-1046', cat: 'parque', desc: 'Columpio roto en el parque infantil.', ...at('El Morro', .0007, .0005), ts: t - 4 * H, status: 'recibido', by: 'Laura Figuera', log: [{ ts: t - 4 * H, txt: 'Reporte recibido' }] }
    ],
    news: [
      { id: 'n1', cat: 'Gestión', title: 'Arranca el plan de bacheo en la avenida Principal', body: 'Las cuadrillas trabajarán de noche para no afectar el tránsito. El plan cubre 2,4 km en tres tramos y atiende 38 reportes hechos por vecinos desde la app.', ts: t - 3 * H },
      { id: 'n2', cat: 'Cultura', title: 'Gaitas y parrandas llegan al bulevar de Playa Lido', body: 'Agrupaciones del municipio abrirán la temporada decembrina con cuatro noches de música al aire libre. La entrada es libre.', ts: t - 9 * H },
      { id: 'n3', cat: 'Social', title: 'Jornada de salud gratuita este sábado en Pueblo Viejo', body: 'Habrá medicina general, pediatría, vacunación y despistaje de hipertensión de 8:00 a. m. a 1:00 p. m. Lleva tu cédula.', ts: t - 20 * H },
      { id: 'n4', cat: 'Política', title: 'El Concejo Municipal debate la ordenanza de movilidad', body: 'La propuesta ordena zonas de carga, ciclovías y estacionamiento en el casco central. La sesión es abierta y se transmitirá en vivo.', ts: t - 1.4 * D },
      { id: 'n5', cat: 'Deporte', title: 'Lechería recibe la válida oriental de aguas abiertas', body: 'Más de 300 nadadores competirán en Playa Los Canales. Habrá cierres parciales de vía durante la mañana del domingo.', ts: t - 2.2 * D },
      { id: 'n6', cat: 'Turismo', title: 'Playa Lido estrena pasarelas accesibles', body: 'Las nuevas pasarelas permiten llegar hasta la orilla en silla de ruedas y con coches de bebé.', ts: t - 3.1 * D }
    ],
    events: [
      { id: 'e1', title: 'Cabildo abierto: presupuesto participativo', cat: 'Política', date: day(3), time: '5:00 p. m.', place: 'Casa de la Cultura', desc: 'Vecinos y concejales priorizan las obras del próximo año.', going: 84 },
      { id: 'e2', title: 'Sunset Sessions en Playa Lido', cat: 'Música', date: day(5), time: '4:30 p. m.', place: 'Playa Lido', desc: 'DJ sets frente al mar con zona gastronómica.', going: 412, nightz: true },
      { id: 'e3', title: 'Encendido de la Navidad', cat: 'Cultura', date: day(9), time: '6:30 p. m.', place: 'Plaza Bolívar de Lechería', desc: 'Encendido de luces, gaitas en vivo y feria de emprendedores.', going: 960 },
      { id: 'e4', title: 'Feria gastronómica del Caribe', cat: 'Gastronomía', date: day(14), time: '12:00 m.', place: 'Av. Américo Vespucio', desc: 'Treinta restaurantes locales con menú de degustación.', going: 275, nightz: true },
      { id: 'e5', title: 'Carrera 10K Lechería', cat: 'Deporte', date: day(22), time: '6:00 a. m.', place: 'Salida: Av. Principal', desc: 'Circuito por el Complejo Turístico El Morro.', going: 530 }
    ],
    works: [
      { id: 'w1', title: 'Rehabilitación de la Av. Principal, tramo 2', ...at('Av. Principal'), contractor: 'c1', pct: 65, start: day(-40), end: day(25), budget: 184000, desc: 'Fresado, asfaltado y demarcación de 2,4 km.', updates: [{ ts: t - 6 * D, pct: 50, txt: 'Fresado terminado en el tramo norte.' }, { ts: t - 1 * D, pct: 65, txt: 'Asfaltado nocturno: 800 m colocados.' }] },
      { id: 'w2', title: 'Luminarias LED en Av. Américo Vespucio', ...at('Av. Américo Vespucio'), contractor: 'c3', pct: 40, start: day(-18), end: day(30), budget: 96500, desc: 'Sustitución de 210 luminarias por tecnología LED.', updates: [{ ts: t - 2 * D, pct: 40, txt: '84 luminarias instaladas y probadas.' }] },
      { id: 'w3', title: 'Recuperación del bulevar de Playa Lido', ...at('Playa Lido'), contractor: 'c1', pct: 15, start: day(-7), end: day(60), budget: 132000, desc: 'Caminerías, bancos, iluminación y áreas verdes.', updates: [{ ts: t - 3 * D, pct: 15, txt: 'Demolición de caminería dañada.' }] },
      { id: 'w4', title: 'Drenajes del sector Las Villas', ...at('Las Villas'), contractor: 'c2', pct: 100, start: day(-90), end: day(-12), budget: 58000, desc: 'Limpieza y reconstrucción de 14 sumideros.', updates: [{ ts: t - 12 * D, pct: 100, txt: 'Obra entregada y recibida por Infraestructura.' }] }
    ],
    roads: [
      { id: 'r1', kind: 'cierre', title: 'Cierre nocturno en Av. Principal por asfaltado', desc: 'De 9:00 p. m. a 5:00 a. m. entre la redoma y el semáforo. Usa la Av. Bolívar.', ...at('Av. Principal', -.0006), ts: t - 2 * H, active: true },
      { id: 'r2', kind: 'trafico', title: 'Tránsito lento en el acceso por la Intercomunal', desc: 'Vehículo accidentado en el canal derecho. Agentes en el sitio.', ...at('Casco Central', -.0012, -.0015), ts: t - 35 * 60e3, active: true },
      { id: 'r3', kind: 'desvio', title: 'Desvío el sábado por evento en Playa Lido', desc: 'De 3:00 p. m. a 10:00 p. m. el tránsito se desvía por la calle Arismendi.', ...at('Playa Lido', .0004), ts: t - 8 * H, active: true }
    ],
    incidents: [
      { id: 'i1', title: 'Colisión leve sin heridos en la Av. Bolívar', desc: 'Dos vehículos involucrados. Vía despejada a los 25 minutos.', ts: t - 5 * H, verified: true },
      { id: 'i2', title: 'Árbol caído retirado en la calle Arismendi', desc: 'Protección Civil despejó la vía. No hubo afectados.', ts: t - 22 * H, verified: true },
      { id: 'i3', title: 'Falla eléctrica en el Casco Central', desc: 'El servicio se restableció tras dos horas de trabajo de la cuadrilla.', ts: t - 2 * D, verified: true }
    ],
    contractors: [
      { id: 'c1', name: 'Constructora Morro Azul, C.A.', spec: 'Vialidad y obras civiles', rating: 4.7, contact: 'Ing. Rafael Bermúdez' },
      { id: 'c2', name: 'Servicios Viales Oriente, C.A.', spec: 'Bacheo, drenajes y demarcación', rating: 4.5, contact: 'Ing. Mariela Guevara' },
      { id: 'c3', name: 'Iluminaciones del Caribe, C.A.', spec: 'Alumbrado y electricidad', rating: 4.8, contact: 'Téc. Omar Lista' },
      { id: 'c4', name: 'EcoAseo Urbaneja, C.A.', spec: 'Aseo y áreas verdes', rating: 4.3, contact: 'Lic. Daniela Rojas' },
      { id: 'c5', name: 'Producciones Bahía, C.A.', spec: 'Tarimas, sonido y montaje de eventos', rating: 4.6, contact: 'Prod. Simón Lárez' }
    ],
    requests: [
      { id: 'SOL-030', kind: 'servicio', title: 'Reparación de semáforo y señalización, Casco Central', scope: 'Diagnóstico y reparación del semáforo del cruce principal. Incluye demarcación del paso peatonal.', invited: ['c2', 'c3'], ts: t - 20 * H, deadline: day(4), budget: 6500, status: 'abierta',
        bids: [{ c: 'c3', amount: 5900, days: 6, note: 'Incluye cambio de controlador y un año de garantía.', ts: t - 6 * H }] },
      { id: 'SOL-031', kind: 'evento', title: 'Tarima y sonido para el Encendido de la Navidad', scope: 'Tarima de 10 × 8 m, sonido para 1.500 personas, iluminación y planta eléctrica. Aliado privado cubre el 50 %.', invited: ['c5'], ts: t - 10 * H, deadline: day(3), budget: 9000, status: 'abierta', bids: [] }
    ],
    units: [
      { id: 'u1', name: 'Patrulla P-01', kind: 'Policía Municipal', status: 'disponible', ...at('Casco Central', .0011, .0008) },
      { id: 'u2', name: 'Patrulla P-02', kind: 'Policía Municipal', status: 'disponible', ...at('El Morro', -.001) },
      { id: 'u3', name: 'Moto M-03', kind: 'Policía Municipal', status: 'disponible', ...at('Playa Lido', .0009, -.0007) },
      { id: 'u4', name: 'Ambulancia A-01', kind: 'Salud', status: 'disponible', ...at('Av. Principal', -.0009) },
      { id: 'u5', name: 'Unidad PC-01', kind: 'Protección Civil', status: 'disponible', ...at('Las Villas', .0006) },
      { id: 'u6', name: 'Bomberos B-01', kind: 'Bomberos', status: 'disponible', ...at('Av. Américo Vespucio', .0008) }
    ],
    services: [
      { id: 'agua', n: 'Agua potable', i: 'drop', prov: 'Hidrocaribe', status: 'parcial', sectors: ['Pueblo Viejo', 'Las Villas'], note: 'Suministro por horario en Pueblo Viejo y Las Villas por mantenimiento de la estación de bombeo.', next: 'Normalización estimada: mañana a las 6:00 a. m.', ts: t - 3 * H },
      { id: 'luz', n: 'Electricidad', i: 'bolt', prov: 'Corpoelec', status: 'ok', sectors: [], note: 'Servicio estable en todos los sectores. La cuadrilla municipal sustituyó un transformador en el Casco Central.', next: '', ts: t - 7 * H },
      { id: 'aseo', n: 'Recolección de desechos', i: 'trash', prov: 'Aseo Urbano municipal', status: 'ok', sectors: [], note: 'Hoy el camión pasa por el Casco Central, la Av. Principal y El Morro. Saca la basura antes de las 7:00 p. m.', next: '', ts: t - 5 * H }
    ],
    beaches: [
      { id: 'b1', n: 'Playa Lido', status: 'abierta', note: 'Bandera verde. Salvavidas de 8:00 a. m. a 5:00 p. m.', ts: t - 2 * H },
      { id: 'b2', n: 'Playa Los Canales', status: 'precaucion', note: 'Oleaje moderado. Báñate solo frente a la torre de salvavidas.', ts: t - 4 * H },
      { id: 'b3', n: 'Playa Cangrejo', status: 'cerrada', note: 'Cerrada de forma preventiva por manchas de hidrocarburo en la orilla. Protección Civil vigila la costa.', ts: t - 6 * H }
    ],
    outages: [
      { id: 'o1', svc: 'luz', sector: 'Casco Central', from: soon, to: soon + 2 * H, note: 'Mantenimiento de la subestación. Desconecta neveras y equipos antes del corte.' },
      { id: 'o2', svc: 'agua', sector: 'Pueblo Viejo', from: clock(1, 8), to: clock(1, 12), note: 'Trabajos en la tubería principal. Almacena agua la noche anterior.' },
      { id: 'o3', svc: 'luz', sector: 'Las Villas', from: clock(2, 9), to: clock(2, 11), note: 'Sustitución de un transformador por la cuadrilla municipal.' }
    ],
    wifi: [
      { id: 'wf1', n: 'Plaza Bolívar de Lechería', ...at('Casco Central', .0004, -.0003), status: 'activo', power: true, hours: 'Todo el día', yes: 41, no: 3 },
      { id: 'wf2', n: 'Sede de la Alcaldía (Atención al Ciudadano)', ...at('Av. Principal', .0003, .0006), status: 'activo', power: true, hours: '7:00 a. m. a 6:00 p. m.', yes: 28, no: 1 },
      { id: 'wf3', n: 'Bulevar de Playa Lido', ...at('Playa Lido', -.0003), status: 'lento', power: false, hours: '6:00 a. m. a 10:00 p. m.', yes: 17, no: 9 },
      { id: 'wf4', n: 'Casa de la Cultura', ...at('El Morro', -.0005, .0006), status: 'activo', power: true, hours: '8:00 a. m. a 8:00 p. m.', yes: 22, no: 2 },
      { id: 'wf5', n: 'Paseo Colón', ...at('Av. Américo Vespucio', .0006, -.0008), status: 'caido', power: false, hours: 'Todo el día', yes: 6, no: 14 },
      { id: 'wf6', n: 'Plaza de Pueblo Viejo', ...at('Pueblo Viejo', -.0004, .0002), status: 'activo', power: true, hours: '6:00 a. m. a 10:00 p. m.', yes: 19, no: 2 }
    ],
    notifs: []
  };
};
