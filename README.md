# Ender Colina — Makeup, Hair & Style

Sitio estático (HTML + CSS + JS, sin build). Abrir `index.html` o servir la carpeta.

`preview.html` es una copia en un solo archivo (CSS y JS incluidos) para verla rápido; se genera con `python3 build-preview.py .` desde la carpeta `ender/` (cada foto se incrusta una sola vez); edita `index.html`, `styles.css` y `script.js`, no este.

## Fotos
Las fotos actuales salen de los posts públicos de @makeupbyender y @enderrrcolina (créditos de fotógrafos en el portafolio). Confirma con Ender que se pueden usar. Falta `baile.jpg`.

Pon las imágenes en `img/` con estos nombres y aparecen solas (mientras tanto se ve un degradado):

| Archivo | Dónde sale |
|---|---|
| `hero.jpg` | Retrato principal (vertical) |
| `makeup.jpg`, `hair.jpg`, `style.jpg`, `baile.jpg`, `vlog.jpg`, `contenido.jpg` | Tarjetas "Universo" |
| `about.jpg` | Sección "Sobre mí" (Ender maquillando) |
| `p1.jpg` … `p8.jpg` | Portafolio (p1, p5 verticales; p4, p7 horizontales) |
| `vlog-thumb.jpg` | Miniatura del vlog (16:9) |
| `avatar-work.jpg`, `avatar-life.jpg` | Fotos de perfil de @makeupbyender y @enderrrcolina |

## Por completar
- Número de WhatsApp en `script.js` (`WHATSAPP`).
- TikTok: @makeupbyenderr (10.4K). Actualizar cifras de comunidad cuando cambien.
- Link real del canal de YouTube (ahora es una búsqueda) en `index.html`.
- Títulos reales de los episodios del vlog y del portafolio.

## Datos del media kit
Cifras públicas tomadas entre el 29 sep y el 1 oct de 2026. Para actualizarlas:
- Números grandes y tarjetas: en `index.html`, sección `#marcas` y fila `.stats`.
- Gráficos: arrays `IG_POSTS` y `YT_VLOGS` al inicio del bloque de datos en `script.js`.

| Plataforma | Cuenta | Datos |
|---|---|---|
| Instagram | @makeupbyender | 18.6K seguidores; mediana 278 likes y 40 comentarios por post; post viral 96,724 likes / 1,282 comentarios |
| Instagram | @enderrrcolina | 805 seguidores |
| TikTok | @makeupbyenderr | 10.4K seguidores, 191.9K likes, 43 publicaciones; récord 465.7K views, 83.5K likes, 22.1K compartidos, 11.5K guardados, 416 comentarios |
| YouTube | @Makeupbyender | 86 suscriptores, 8 vlogs, 1,476 views totales |
| Facebook | — | No se encontró página pública |

Por confirmar con Ender: premios Beauty Fair Awards 2024/2025, la lista "Lo que no hago" y las marcas listadas (salen de etiquetas en sus posts).
