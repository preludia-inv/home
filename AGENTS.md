# Preludia

Este repositorio corresponde al Home y plataforma central de Preludia.
No crear invitaciones individuales de clientes dentro de este repositorio.
Cada invitación debe vivir posteriormente en su propio repositorio.

- React + TypeScript + Vite; landing estática prerenderizada, sin servidor ni base de datos.
- Mantener una experiencia comercial en español, premium y mobile-first. Portafolio conceptual identificado; no inventar testimonios.
- `src/config.ts` centraliza WhatsApp, assets y el futuro portal Premium. Todo `VITE_*` es público: nunca introducir secrets.
- Solicitudes: formulario → mensaje estructurado → WhatsApp. No almacenar pedidos ni fotografías, ni afirmar que un mensaje preparado fue enviado.
- Esencial: $99.000 COP, 2 rondas de ajustes. Premium: $199.000 COP, 3 rondas. Una ronda agrupa varios cambios.
- Las funciones RSVP/Premium pertenecen al servicio futuro, no al Home. No agregar autenticación ficticia ni datos de clientes en el frontend.
- El futuro `preludia-invitation-starter` será independiente y compartirá utilidades, sin imponer un renderer o diseño único.
- Assets y fuentes locales; respetar `import.meta.env.BASE_URL`. Navegación mediante anclas, sin rutas SPA que produzcan 404 en Pages.
- Verificar `npm run lint`, `npm run typecheck`, `npm test`, `npm run test:e2e`, `npm run build`. Las pruebas usan builds aislados en `/` y `/home/` y una configuración ficticia solo dentro del test.
- Probar 320, 390, 768 y 1440 px, teclado, estados sin WhatsApp y recuperación de ventanas bloqueadas. Respetar movimiento reducido.
- Deployment: `.github/workflows/deploy.yml`, GitHub Pages desde Actions, variables públicas en Settings. No publicar sin número comercial y revisión de los términos del hosting.
