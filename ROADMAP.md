# Hoja de ruta · Lechería Conecta

**Lechería Conecta · Sistema Integral de Gestión Urbana** (antes «Lechería 360») es la plataforma propuesta
por Qiu Agency para que vecinos, Alcaldía, Seguridad y Protección Civil y contratistas trabajen sobre los mismos datos.

Última actualización: 21 de noviembre de 2026.

---

## Contexto que orienta las prioridades

| Tema | Qué encontramos | Qué implica para el sistema |
| --- | --- | --- |
| La ciudad | Lechería es la capital del municipio Lic. Diego Bautista Urbaneja (parroquias Lechería y El Morro). Censo 2011: 37.829 habitantes; proyección 2019: unos 46.900. | Escala manejable para un piloto completo en toda la ciudad. |
| Servicios básicos | Cortes de agua con horarios que no se cumplen (Hidrocaribe) y fallas eléctricas; la Alcaldía ha comprado transformadores para reponer los quemados. | El vecino necesita saber **qué servicio falla, dónde y hasta cuándo**. Nuevo módulo «Estado de la ciudad». |
| Costa y playas | Lechería tiene el sistema de playas urbanas más grande del país. En 2025 el mar de leva dañó viviendas y en 2026 se cerraron playas de Anzoátegui por derrames de hidrocarburos. | Estado de cada playa (abierta, precaución, cerrada) publicado por la Alcaldía o Protección Civil. |
| Seguridad vial | Hubo repuntes de accidentes asociados al alcohol y se endurecieron las multas. | Mantener SOS, vialidad y sucesos verificados; a futuro, mapa de puntos críticos. |
| Planificación | La Alcaldía impulsa un Plan de Desarrollo Urbano Local con asambleas vecinales, alineado con la Agenda 2030 de la ONU. Existe un Reglamento de Participación Ciudadana. | Módulo de participación: consultas, cabildos y presupuesto participativo. |
| Referentes | SeeClickFix (gestión de solicitudes tipo 311), Decidim y Cónsul (participación), VECI STGO de Santiago de Chile (seguridad, reportes, alertas por barrio, trámites y salud en una sola app). | Un solo sistema en lugar de varias apps sueltas. |
| Usuarios de 50 años o más | Las pautas de la W3C señalan que con la edad cuestan más la lectura (contraste y tamaño), los toques precisos y recordar pasos. WCAG 2.2 exige áreas táctiles suficientes. | Letra grande por defecto, selector «Ver mejor», alto contraste, botones grandes, textos en lenguaje claro y siempre icono + palabra. |

---

## Fase 0 · Prototipo v1 (terminada)

- Portal del ciudadano instalable (PWA): SOS, reportes con foto, noticias, eventos, obras, vialidad, sucesos, mapa y perfil.
- Consolas de Seguridad, Alcaldía y Contratistas sincronizadas en el navegador.
- Recorrido guiado de 16 pasos y vista en vivo.

## Fase 1 · Prototipo v2 «Lechería Conecta» (esta entrega)

- [x] Nuevo nombre e identidad: **Lechería Conecta · Sistema Integral de Gestión Urbana**.
- [x] **Panel de la Alcaldía rediseñado**: saludo con resumen del día en una frase, lista «Necesita su atención» con un botón por tarea, indicadores grandes con icono, tiempo medio de solución, reportes por sector y estado de la ciudad.
- [x] **Estado de la ciudad**: agua, electricidad y recolección de desechos con estado (Normal, Con fallas, Interrumpido), detalle y hora estimada de normalización.
- [x] **Estado de playas**: abierta, precaución o cerrada, con la razón.
- [x] La Alcaldía publica esos avisos desde su consola, con los **sectores afectados**, y llegan como notificación al vecino.
- [x] **Alerta de corte en tu sector**: franja roja en el inicio y notificación del teléfono (con la app abierta o en segundo plano; con la app cerrada requiere el servidor push de la fase 2).
- [x] **WiFi público**: mapa de puntos WiFi de la Alcaldía ordenados por cercanía, con horario, planta eléctrica para apagones, «Cómo llegar» y confirmación de los vecinos. Un navegador no puede escanear redes; en Android con Chrome la app indica si el teléfono está conectado por WiFi.
- [x] **Funciona sin internet**: la app, los mapas ya vistos y las tipografías quedan guardados; los reportes y alertas SOS enviados sin señal salen solos al volver la conexión y, mientras tanto, se destaca la llamada al 911.
- [x] **Accesibilidad para mayores de 50**: letra base más grande, selector «Ver mejor» (tres tamaños de letra, alto contraste, menos animaciones) guardado en el dispositivo, áreas táctiles de 48 px, contraste AA revisado y textos más claros.
- [x] Recorrido guiado ampliado con el estado de la ciudad.

## Fase 1.1 · Mejoras de la versión 2.1 (terminada)

- [x] Cortes programados de luz y agua por sector, con recordatorio 30 minutos antes.
- [x] Botón «Escuchar» para leer en voz alta avisos y noticias.
- [x] Teléfonos útiles disponibles sin internet.
- [x] Panel de la Alcaldía con encabezado fijo, indicadores en una fila y columnas alineadas.
- [x] Auditoría automática de accesibilidad (axe-core, WCAG 2.2 AA) sin hallazgos en 23 pantallas.

El plan técnico y el presupuesto detallado de la fase 2 están en el documento «Lechería Conecta · Plan técnico y presupuesto de la fase 2 (piloto real)».

## Fase 2 · Piloto real (0 a 3 meses)

- [ ] Backend: API, base de datos PostgreSQL con PostGIS, almacenamiento de fotos y registro de auditoría.
- [ ] Cuentas por rol (vecino, operador, dirección, contratista) con verificación por cédula y teléfono.
- [ ] Notificaciones push con la app cerrada, SMS y WhatsApp (los SMS siguen llegando cuando falla internet o la luz).
- [ ] App nativa ligera (Android) para detectar redes WiFi cercanas y enviar el SOS por SMS sin datos.
- [ ] Integración con el 911, la Policía Municipal y Protección Civil de Urbaneja; protocolo de llamadas de verificación.
- [ ] Catálogos reales: sectores y urbanizaciones, direcciones municipales, unidades y contratistas registrados.
- [ ] Conexión con los avisos de Hidrocaribe y Corpoelec (o carga manual por la Sala Situacional).
- [ ] Política de privacidad, términos de uso y moderación de reportes.
- [ ] Atención asistida: línea telefónica y puntos de apoyo para quien no use el teléfono.

**Meta del piloto:** 3.000 vecinos registrados, 80 % de reportes asignados en menos de 24 h y recepción de SOS en menos de 60 s.

## Fase 3 · Trámites y transparencia (3 a 6 meses)

- [ ] Trámites en línea: solvencia municipal, inmuebles urbanos, actividad económica, permisos de construcción y eventos.
- [ ] Pagos en línea y por referencia, con recibo digital.
- [ ] Citas previas para atención presencial.
- [ ] Tablón de anuncios oficiales y gaceta municipal.
- [ ] Portal de transparencia de obras: presupuesto, contratista, avance y fotos, con datos abiertos descargables.

## Fase 4 · Participación y ciudad inteligente (6 a 12 meses)

- [ ] Participación ciudadana: consultas, propuestas, cabildos abiertos y presupuesto participativo, según el Reglamento de Participación Ciudadana y el Plan de Desarrollo Urbano Local.
- [ ] Turismo: guía de playas, agenda y taquilla con Nightz (sujeto a acuerdo), información para visitantes.
- [ ] Sala situacional: tablero en pantalla grande para Alcaldía y Protección Civil.
- [ ] Sensores y cámaras: calidad del agua de mar, oleaje y tránsito, conectados al estado de la ciudad.
- [ ] Mapa de puntos críticos de accidentes para campañas de seguridad vial.

---

## Indicadores que mide el panel

- Reportes abiertos, sin asignar y resueltos.
- Tiempo medio de solución de reportes.
- Tiempo de recepción de alertas SOS.
- Satisfacción vecinal (calificación de 1 a 5).
- Avance de obras y obras atrasadas.
- Servicios con fallas y playas cerradas.

## Riesgos y cómo se atienden

| Riesgo | Mitigación |
| --- | --- |
| Apagones y mala conectividad | La app funciona sin conexión para consultar, guarda los reportes y los envía al volver la señal; alertas también por SMS. |
| Baja adopción entre personas mayores | Letra grande por defecto, «Ver mejor», jornadas de instalación asistida en sectores y línea telefónica. |
| Reportes falsos o abusivos | Cuentas verificadas, cuenta regresiva y cancelación en el SOS, moderación y bitácora. |
| Protección de datos | Ubicación solo al enviar un SOS o un reporte, cifrado y acceso por rol. |
| Dependencia de terceros (Hidrocaribe, Corpoelec, Nightz) | El módulo funciona con carga manual desde la Alcaldía mientras no exista integración. |

---

Desarrollado por **Qiu Agency** de Qiu Capital Group C.A. · RIF: J-50880192-0.
Prototipo de demostración: los datos, personas y empresas que aparecen son ficticios.
