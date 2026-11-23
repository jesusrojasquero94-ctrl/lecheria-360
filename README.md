# Lechería Conecta · Sistema Integral de Gestión Urbana

(Antes «Lechería 360».) Prototipo funcional de la plataforma ciudadana del programa **Lechería Ciudad Tecnológica**:
una app instalable (PWA) para los vecinos y tres portales de gestión que trabajan sobre los mismos datos.
Funciona sin internet y está pensada también para personas de 50 años o más.

La hoja de ruta completa está en [ROADMAP.md](ROADMAP.md).

> Sitio desarrollado por **Qiu Agency** de Qiu Capital Group C.A. · RIF: J-50880192-0
>
> Es un prototipo de demostración. Las personas, empresas, noticias y cifras que aparecen son ficticias.
> No es un canal oficial ni contacta servicios de emergencia reales.

## Qué incluye

| Portal | Ruta | Para quién | Funciones |
| --- | --- | --- | --- |
| Portada | `#/` | Presentación | Resumen, acceso a portales, recorrido guiado y vista en vivo |
| Ciudadano | `#/ciudadano` | Vecinos y visitantes | Botón SOS con ubicación, reportes con foto, estado del agua, la luz, el aseo y las playas, alerta cuando hay un corte en su sector, WiFi público cercano, noticias, eventos, obras, vialidad, sucesos, mapa, notificaciones del teléfono y perfil |
| Seguridad | `#/seguridad` | Operadores y Protección Civil | Cola de alertas SOS en vivo con sonido, mapa, despacho de la unidad más cercana, bitácora, unidades y publicación de sucesos |
| Alcaldía | `#/alcaldia` | Direcciones y prensa | Panel de la ciudad (resumen del día, «Necesita su atención», indicadores, estado de la ciudad, mapa, sectores y obras), estado de servicios, playas y WiFi, gestión de reportes, solicitudes a contratistas, adjudicación, publicaciones y directorio de proveedores |
| Contratistas | `#/contratista` | Empresas y aliados privados | Solicitudes de obras, servicios y eventos, cotización, avances con evidencia fotográfica |
| Vista en vivo | `#/demo` | Presentación | Teléfono del vecino y consola de gestión en la misma pantalla |

El **recorrido guiado** (botón en la portada y en cada portal) ejecuta el ciclo completo en 29 pasos:
alerta SOS, despacho, reporte con foto, solicitud, cotización, adjudicación, avance, calificación,
estado de la ciudad, WiFi y panel de la Alcaldía.

## Novedades de la versión 3.3

- **Mi día en Lechería** (`#/ciudadano/midia`): lo que le toca a cada vecino hoy y esta semana según su sector: camión de basura, cortes programados, servicios con fallas, citas, eventos, asambleas, reservas, votaciones y vacunas de la mascota. Un resumen aparece en el inicio.
- **Comercio y empleo** (`#/ciudadano/comercio`): comercios con ofertas, horario y entrega a domicilio; bolsa de empleo con postulación que llega a Atención al Ciudadano.
- **Comunidad** (`#/ciudadano/comunidad`): avisos del condominio, del consejo comunal y de la Alcaldía; asambleas; **presupuesto participativo** con voto (hasta 2 obras) y encuestas.
- **Salud** (`#/ciudadano/salud`): citas en la Clínica Municipal por servicio, día y hora; farmacias de turno; jornadas gratuitas.
- **Mascotas** (`#/ciudadano/mascotas`): registro con recordatorio de vacunas, mascotas perdidas y adopción.
- **Visit Lechería** (`#/ciudadano/visit`): guía en inglés para visitantes (emergencias, playas, lugares, hospedaje, consejos y frases útiles).
- **Consola de la Alcaldía**: nuevas secciones «Participación» (resultados, encuestas y avisos) y «Salud» (agenda de citas).
- Recorrido guiado de 29 pasos. Comercios, empleos, farmacias, mascotas, proyectos y horarios son de demostración.

## Novedades de la versión 3.2

- **Marca y dashboard modernos** (`tema.css`): logotipo nuevo (sol sobre el mar), paleta caribe (océano, turquesa y sol), tipografía Plus Jakarta Sans, superficies con borde fino, barra de pestañas flotante en la app, riel con brillo turquesa y panel tipo «bento» en la consola, portadas con degradados y seis portales con color propio. El tema solo cambia la apariencia y respeta «Ver mejor» (alto contraste y menos movimiento).

## Novedades de la versión 3.1

- **Hospedaje** (`#/ciudadano/hospedaje`): alquiler vacacional estilo Airbnb con filtros de fechas, huéspedes, zona, precio y servicios (planta eléctrica, tanque, playa, muelle), calendario de disponibilidad, solicitud de reserva y «Mis reservas».
- **Comprar o alquilar** (`#/ciudadano/inmuebles`): inmuebles en venta y alquiler de agentes verificados, ficha catastral y contacto con el agente.
- **Portal de agentes · MLS** (`#/agentes`): inventario compartido con comisión compartida, mis inmuebles, publicar (pasa por verificación), interesados y reservas.
- **Cámara Inmobiliaria** (`#/camara`): verificación de inmuebles y de agentes, e indicadores del mercado (precio por m² por sector, tarifa media por noche, reservas).
- Recorrido guiado de 29 pasos. La verificación de la Cámara Inmobiliaria es una integración propuesta; agentes, inmuebles y precios son de demostración.

## Novedades de la versión 3

- **Emergencias sin internet** (`#/ciudadano/emergencia`): llamada al 911 y a tu contacto, **SMS de emergencia con tu ubicación GPS** (el SMS usa la red celular y el GPS no necesita datos), opción de incluir la ficha médica y de dejar la alerta en cola para el Centro de Seguridad. Primeros auxilios (RCP, atragantamiento, sangrado, quemaduras, ahogamiento, aguamala, golpe de calor, convulsiones, infarto y ACV, fracturas, intoxicación), «¿Qué hacer si…?» (sismo, tsunami, lluvias, incendio, apagón, gas, oleaje y petróleo, robo, extravío), herramientas (linterna, señal SOS con luz, sirena y metrónomo de RCP), centros de salud, puntos de encuentro con distancia y dirección calculadas sin conexión, ficha médica y mochila de emergencia guardadas solo en el teléfono. El botón SOS ofrece el SMS cuando no hay señal.
- **Nuevo inicio del ciudadano**: portada con **fotos reales de Lechería** (Wikimedia Commons, con autor y licencia), clima, amanecer y atardecer, estado del mar e índice UV, doce accesos directos y «Descubre Lechería».
- **Conoce Lechería** (`#/ciudadano/lecheria`): datos de la ciudad, el tiempo a 3 días, ocho lugares con foto, historia según la crónica oficial, noticias oficiales y canales de la Alcaldía.
- **Trámites y servicios** (`#/ciudadano/tramites`): los ocho trámites del Registro Civil con sus requisitos reales (lecheria.gov.ve), impuestos y declaración en línea, catastro y urbanismo, salud y ayudas sociales, ciudad limpia, deporte y cultura, con buscador. Directorio de las 22 dependencias y **«Escribir a la Alcaldía»** con número de seguimiento (sin señal, la solicitud sale sola al volver la conexión).
- **Consola de la Alcaldía**: portada del panel con foto de la ciudad, clima y mar, playas y WiFi activos, y nueva sección **«Atención al ciudadano»** para responder las solicitudes; el vecino recibe la respuesta como notificación.
- **Recorrido guiado de 29 pasos**: suma la nueva portada, Emergencias sin internet, Conoce Lechería, trámites y una solicitud a la Alcaldía con su respuesta.
- **Service worker v3**: guarda los nuevos módulos, las fotos ya vistas (40) y el último clima. Accesos directos de la app instalada: Emergencias, SOS, Reportar y Trámites.

Fuentes: trámites, dependencias, historia y noticias de [lecheria.gov.ve](https://lecheria.gov.ve/); clima y mar de [Open-Meteo](https://open-meteo.com/); fotos de [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Lecher%C3%ADa). Los números de Protección Civil y de la Policía Municipal quedan por cargar con los datos oficiales de la Alcaldía.

## Novedades de la versión 2

- **Panel de la Alcaldía rediseñado**: saludo con el resumen del día en una frase, accesos rápidos, lista «Necesita su atención» con un botón por tarea, indicadores grandes (incluido el tiempo medio de solución), estado de la ciudad, sectores con más reportes y obras con fecha de entrega.
- **Estado de la ciudad**: agua, electricidad y recolección de desechos (Normal, Con fallas, Interrumpido) con los sectores afectados; playas (abierta, precaución, cerrada); puntos WiFi públicos.
- **Alertas por sector**: si un corte afecta el sector del vecino, ve una franja roja en el inicio y, si activa las notificaciones en su perfil, le llega un aviso al teléfono mientras la app esté abierta o en segundo plano (con la app cerrada requiere el servidor de notificaciones push de la fase 2).
- **WiFi cerca**: puntos públicos ordenados por distancia, con horario, planta eléctrica, «Cómo llegar» y confirmación de los vecinos. Un navegador no puede escanear redes WiFi; en Android con Chrome la app indica si el teléfono está conectado por WiFi.
- **Sin internet**: el service worker guarda la app, Leaflet, las tipografías y hasta 600 teselas de mapa ya vistas. Los reportes y las alertas SOS que se envían sin señal quedan guardados y salen solos al volver la conexión; mientras tanto se destaca la llamada al 911. En Perfil hay un interruptor «Simular sin conexión» para la demostración.
- **Accesibilidad para mayores de 50**: letra base de 17 px, botón «Ver mejor» (Normal, Grande o Muy grande, alto contraste y menos movimiento) guardado en el dispositivo, áreas táctiles de 48 px, estados siempre con palabra e icono, y contraste AA revisado.

## Novedades de la versión 2.1

- **Cortes programados**: la Alcaldía programa cortes de luz o agua por sector, día y hora. El vecino del sector lo ve en su inicio («Hoy en tu sector») y recibe un recordatorio 30 minutos antes.
- **Escuchar**: botón de lectura en voz alta en avisos de servicios, playas, cortes, noticias y el resumen «Así está Lechería hoy».
- **Teléfonos útiles**: directorio que funciona sin internet. Solo el 911 es un número real; el resto se publica cuando la Alcaldía lo confirme.
- **Panel de la Alcaldía**: encabezado fijo al desplazarse, ancho máximo cómodo en pantallas grandes, cuatro indicadores en una fila, columnas que terminan a la misma altura y cortes programados en «Estado de la ciudad».
- **Accesibilidad**: 23 pantallas revisadas con axe-core (WCAG 2.2 AA y buenas prácticas) sin hallazgos; regiones de página, títulos en orden, enlace «Saltar al contenido» y contraste corregido en los botones de emergencia.
- **Carga**: la hoja de estilos de los mapas ya no bloquea el primer dibujo de la página.

## Cómo funciona este prototipo

- HTML, CSS y JavaScript sin dependencias de compilación. Mapas con Leaflet y OpenStreetMap.
- Los datos se guardan en el navegador (`localStorage`, clave `lchc:v6`) y se sincronizan al instante entre pestañas
  y ventanas del mismo navegador. Por eso un SOS enviado en una pestaña aparece en la consola abierta en otra.
- La sincronización entre dispositivos distintos requiere el backend descrito en el plan del proyecto
  (API, base de datos, notificaciones push). `core.js` concentra todas las acciones de negocio para
  que ese cambio no toque las vistas.
- «Reiniciar la demostración» (Perfil del ciudadano) restaura los datos de ejemplo.

## Estructura

```
index.html              Página única
styles.css              Estilos (paleta y tipografías del brandbook de Qiu)
data.js                 Catálogos y datos de demostración
core.js                 Almacén, acciones de negocio, mapa, utilidades y enrutador
ciudadano.js            Portal del ciudadano
gestion.js              Seguridad, Alcaldía y Contratistas
ciudad.js               Inicio con la ciudad, Conoce Lechería, trámites y atención al ciudadano
emergencia.js           Emergencias sin internet
vida.js     Mi día, comercio y empleo, comunidad, salud, mascotas y guía en inglés
inmuebles.js            Hospedaje, compra y alquiler, portal MLS y Cámara Inmobiliaria
ciudad.css              Estilos de la versión 3
tema.css                Tema 2027: marca y dashboard modernos
landing.js              Portada, vista en vivo y recorrido guiado
sw.js                   Service worker: uso sin conexión, mapas guardados y notificaciones
ROADMAP.md              Hoja de ruta por fases
manifest.webmanifest    Manifiesto de la app instalable
```

## Ejecutarlo en local

```
python3 -m http.server 8080
```

y abrir `http://localhost:8080`. El service worker (uso sin conexión y notificaciones) solo se activa en `https` o en `localhost`.

## Alianzas previstas

Los eventos con taquilla muestran el botón «Entradas en Nightz». Es una integración propuesta,
sujeta al acuerdo comercial y técnico con Nightz.
