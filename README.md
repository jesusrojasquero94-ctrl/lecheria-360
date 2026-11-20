# Lechería 360

Prototipo funcional de la plataforma ciudadana del programa **Lechería Ciudad Tecnológica**:
una app instalable (PWA) para los vecinos y tres portales de gestión que trabajan sobre los mismos datos.

> Sitio desarrollado por **Qiu Agency** de Qiu Capital Group C.A. · RIF: J-50880192-0
>
> Es un prototipo de demostración. Las personas, empresas, noticias y cifras que aparecen son ficticias.
> No es un canal oficial ni contacta servicios de emergencia reales.

## Qué incluye

| Portal | Ruta | Para quién | Funciones |
| --- | --- | --- | --- |
| Portada | `#/` | Presentación | Resumen, acceso a portales, recorrido guiado y vista en vivo |
| Ciudadano | `#/ciudadano` | Vecinos y visitantes | Botón SOS con ubicación, reportes con foto, seguimiento y calificación, noticias, eventos, obras, vialidad, sucesos, mapa y perfil |
| Seguridad | `#/seguridad` | Operadores y Protección Civil | Cola de alertas SOS en vivo con sonido, mapa, despacho de la unidad más cercana, bitácora, unidades y publicación de sucesos |
| Alcaldía | `#/alcaldia` | Direcciones y prensa | Panel de indicadores, gestión de reportes, solicitudes a contratistas, adjudicación, publicaciones y directorio de proveedores |
| Contratistas | `#/contratista` | Empresas y aliados privados | Solicitudes de obras, servicios y eventos, cotización, avances con evidencia fotográfica |
| Vista en vivo | `#/demo` | Presentación | Teléfono del vecino y consola de gestión en la misma pantalla |

El **recorrido guiado** (botón en la portada y en cada portal) ejecuta el ciclo completo en 16 pasos:
alerta SOS, despacho, reporte con foto, solicitud, cotización, adjudicación, avance y calificación.

## Cómo funciona este prototipo

- HTML, CSS y JavaScript sin dependencias de compilación. Mapas con Leaflet y OpenStreetMap.
- Los datos se guardan en el navegador (`localStorage`) y se sincronizan al instante entre pestañas
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
landing.js              Portada, vista en vivo y recorrido guiado
sw.js                   Service worker (uso sin conexión)
manifest.webmanifest    Manifiesto de la app instalable
```

## Ejecutarlo en local

```
python3 -m http.server 8080
```

y abrir `http://localhost:8080`.

## Alianzas previstas

Los eventos con taquilla muestran el botón «Entradas en Nightz». Es una integración propuesta,
sujeta al acuerdo comercial y técnico con Nightz.
