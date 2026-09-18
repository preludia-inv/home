# Preludia

**Todo gran momento tiene un comienzo.** Invitaciones web personalizadas para bodas, 15 años, aniversarios, cumpleaños, grados, baby showers y otros eventos.

Este repositorio es exclusivamente el **Home oficial y punto central de Preludia**. Presenta el servicio, tres invitaciones demostrativas completas, planes y un formulario que prepara un brief en WhatsApp. Las demos son ejemplos ficticios integrados en el portafolio; no son invitaciones de clientes. El Home no genera plantillas ni guarda solicitudes.

## Arquitectura

```text
Home estático → formulario / WhatsApp → brief → trabajo creativo interno
                                                   ↓
                                     repositorio independiente
                                                   ↓
                                       invitación personalizada
```

React 19 + TypeScript + Vite. HTML prerenderizado en build para SEO y carga inicial; React añade formulario, filtros y diálogos. CSS propio, fuentes WOFF2 locales, una fotografía WebP y conceptos gráficos realizados con CSS. Sin librerías de animación, servidor permanente, analytics ni cookies de seguimiento.

```text
src/App.tsx             Secciones de la landing
src/components/         Formulario, demos completas, diálogo accesible e iconos
src/config.ts           WhatsApp, portal futuro y helper de assets
src/data.ts             Planes, eventos, FAQ y conceptos
src/lib/request.ts      Contrato del brief y mensaje de WhatsApp
src/styles.css          Identidad y responsive
scripts/                Prerender y servidores aislados de pruebas
tests/                  Unitarias y navegador
public/                 Fotografía, favicon y tarjeta social
.github/workflows/      Validación y GitHub Pages
```

Una página con anclas: `#inicio`, `#esencia`, `#inspiracion`, `#como-funciona`, `#planes`, `#solicitud`, `#preguntas`. No hay rutas de invitaciones ni rutas SPA. Recargar un enlace como `/home/#planes` funciona en Pages.

## Desarrollo y validación

Node.js 22.12+ (CI utiliza 24), npm.

```sh
npm ci
cp .env.example .env
npm run dev
```

En PowerShell, `Copy-Item .env.example .env`. Abrir la URL que muestra Vite.

```sh
npm run lint
npm run typecheck
npm test
npx playwright install chromium
npm run test:e2e
npm run build
npm run preview
```

Las pruebas de navegador compilan dos sitios aislados: raíz sin número y `/home/` con número sintético interceptado (ningún mensaje se envía). Comprueban 320, 390, 768 y 1440 px, assets, HTML inicial, navegación, modal/foco, planes, validación de fecha y envío. Nunca se despliega la configuración de prueba. El build publicable vive exclusivamente en `dist/`.

## Configuración y WhatsApp

| Variable pública          | Uso                                                                                                                                      |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_WHATSAPP_NUMBER`    | Número comercial internacional, solo dígitos: indicativo + número, sin `+`, espacios ni cero inicial. Obligatorio para recibir clientes. |
| `VITE_BASE_PATH`          | `/` local o dominio propio; `/home/` en este repositorio de Pages.                                                                       |
| `VITE_SITE_URL`           | URL HTTPS completa publicada, con subruta y `/` final. Canonical, Open Graph, robots y sitemap.                                          |
| `VITE_PREMIUM_PORTAL_URL` | URL HTTPS del futuro panel autenticado; dejar vacía por ahora.                                                                           |

`src/config.ts` lee estas variables una vez; no duplicar el número en componentes. Se integran durante el build: cualquier cambio requiere recompilar/desplegar. **Son públicas y no pueden contener secretos.**

El cliente completa evento, nombres, fecha, plan, contacto, brief y referencias opcionales. Se valida antes de abrir `wa.me` con el mensaje codificado hacia **+57 313 607 1110**. El usuario debe pulsar **Enviar dentro de WhatsApp**: la web no puede verificar la entrega. Un diálogo conserva el texto, permite copiarlo y ofrece un enlace alternativo si la ventana se bloqueó. El formulario permanece en memoria hasta recargar; no hay persistencia local ni base de datos.

Fotografías y música se coordinan después por WhatsApp. Evitamos subir archivos y pagar almacenamiento en esta etapa. Los nombres de los conceptos son ficticios; no hay testimonios ni eventos reales.

## Planes y futuras invitaciones

- **Esencial — $99.000 COP:** diseño personalizado, fotos/música, cuenta regresiva, mapas, itinerario/dress code/regalos y secciones necesarias, animaciones elegantes, RSVP sí/no con asistentes y correo al anfitrión; hasta **2 rondas** de cambios agrupados.
- **Premium — $199.000 COP:** todo Esencial, animaciones especiales, mayor libertad creativa, invitados privados, cupos, enlaces/saludos, QR, panel, estados y estadísticas; hasta **3 rondas**.

Estos son los planes del servicio; **RSVP y backend Premium no están implementados en este Home**. Disponibilidad, entrega, publicación y alcance se acuerdan con el cliente antes de confirmar el pedido. El enlace “Acceso anfitriones” muestra honestamente el estado próximo; puede apuntar luego a un portal externo con la variable indicada.

El futuro `preludia-invitation-starter` reunirá utilidades en otro repositorio. Cada invitación tendrá libertad de estructura, layout, tipografía, animación y experiencia, sin renderer obligatorio.

Arquitectura futura: RSVP Esencial desde cada invitación → función serverless → correo al anfitrión, sin lista de invitados obligatoria. Premium → backend común con `events`, `guests`, `rsvp_responses`, usuarios y pertenencia a evento. Autenticación real, autorización por evento y RLS si se elige Supabase; claves de servicio y correo solo en servidor. No integrar datos privados en builds estáticos. El Home podrá enlazar el portal o albergar su frontend general cuando exista el backend.

## GitHub Pages

1. Subir el proyecto a `main` en `preludia-inv/home`.
2. En **Settings → Pages → Source**, elegir **GitHub Actions**.
3. En **Settings → Secrets and variables → Actions → Variables**, configurar `VITE_WHATSAPP_NUMBER` con el contacto comercial real.
4. El workflow deduce `/home/` y `https://preludia-inv.github.io/home/`. Para otro destino, definir `VITE_BASE_PATH` y `VITE_SITE_URL` juntas.
5. Push a `main` o ejecutar **Validate and deploy Preludia**. Pull requests solo validan, nunca publican.

El workflow ejecuta lint, TypeScript, tests unitarios, navegador, build y publicación de `dist/`. Para dominio propio, configurar el dominio en Pages, verificar DNS y usar base `/` + URL canónica real. Repositorios `usuario.github.io` también deben configurar explícitamente base `/` y URL raíz. No se necesita `404.html` de fallback porque toda la navegación es por anclas. Fuentes, imágenes, scripts, favicon y metadatos respetan la subruta.

Referencia: [deploy estático de Vite](https://vite.dev/guide/static-deploy#github-pages).

## Costos y condiciones de hosting

El proyecto no requiere servicios de pago: dependencias libres, almacenamiento en Git, build estático y enlace de WhatsApp, sin API de WhatsApp, uploads, base de datos ni correo automático del Home. GitHub Free permite Pages en repositorios públicos; Actions tiene condiciones y cuotas según visibilidad/plan. Un dominio propio es opcional y normalmente tiene costo anual.

**Revisar antes del lanzamiento comercial:** [las limitaciones de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) prohíben usarlo como hosting gratuito para operar un negocio online o sitios principalmente dirigidos a facilitar transacciones comerciales. Este Home promociona planes y capta solicitudes; la compatibilidad técnica con Pages no implica permiso de uso comercial. Evaluar esos términos antes de publicarlo para clientes. El mismo `dist/` puede publicarse en otro hosting estático compatible con uso comercial, sin cambiar la aplicación (ajustando base y URL).

Límites publicados de Pages: sitio de hasta 1 GB, ancho de banda blando de 100 GB/mes y despliegues con límite de 10 minutos. Las políticas y cuotas pueden cambiar; consultar la documentación oficial. Backend Premium, envío de correo, almacenamiento de fotos y mayor tráfico serían los siguientes costos a evaluar; no se contratan ni se implementan aquí.

## Antes de recibir clientes

- Configurar WhatsApp real y verificar un envío manual desde teléfono.
- Resolver destino de hosting y sus condiciones comerciales; publicar y verificar la URL final, canonical y preview al compartir.
- Confirmar condiciones de entrega/publicación y disponibilidad de funciones Premium antes de aceptar pedidos.
- Sustituir o ampliar conceptos con trabajos autorizados cuando existan.

Roadmap: validar Home y briefs → crear invitaciones en repos independientes → construir utilidades comunes → integrar RSVP y Premium aislado por evento → evaluar automatización y pagos. Sin checkout, generador, editor visual ni CRM en esta versión.

Foto conceptual de boda: [archivo fuente de Unsplash](https://images.unsplash.com/photo-1519741497674-611481863552). Las fuentes incluyen sus licencias OFL en sus paquetes npm.
