import { useState } from "react";
import { config } from "./config";
import {
  essentialFeatures,
  events,
  faqs,
  portfolio,
  premiumFeatures,
} from "./data";
import type { PortfolioItem } from "./data";
import type { Plan } from "./lib/request";
import { whatsAppUrl } from "./lib/request";
import { Concept } from "./components/Concept";
import { Icon } from "./components/Icon";
import { Modal } from "./components/Modal";
import { RequestForm } from "./components/RequestForm";
import { InvitationDemo } from "./components/InvitationDemo";

function WhatsAppLink({
  className = "",
  text = "Hablemos por WhatsApp",
  onUnavailable,
}: {
  className?: string;
  text?: string;
  onUnavailable: () => void;
}) {
  const whatsapp = whatsAppUrl(
    config.whatsappNumber,
    "¡Hola, Preludia! Me gustaría conocer más sobre las invitaciones para mi celebración.",
  );
  return whatsapp ? (
    <a
      className={className}
      href={whatsapp}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="whatsapp" />
      {text}
    </a>
  ) : (
    <button className={className} onClick={onUnavailable}>
      <Icon name="whatsapp" />
      {text}
    </button>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan>("Quiero asesoría");
  const [preview, setPreview] = useState<PortfolioItem | null>(null);
  const [notice, setNotice] = useState<
    "whatsapp" | "premium" | "privacy" | null
  >(null);
  const [activeEvent, setActiveEvent] = useState("Todos");
  const shownConcepts =
    activeEvent === "Todos"
      ? portfolio
      : portfolio.filter((item) => item.type === activeEvent);

  function choosePlan(plan: Plan) {
    setSelectedPlan(plan);
  }

  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <header className="site-header">
        <a className="wordmark" href="#inicio" aria-label="Preludia, inicio">
          Preludia<span className="wordmark-star">✳</span>
          <span className="wordmark-dot">.</span>
        </a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#esencia">Nuestra esencia</a>
          <a href="#inspiracion">Inspiración</a>
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#planes">Planes</a>
        </nav>
        <a className="header-cta" href="#solicitud">
          Crear mi invitación <Icon name="arrow" />
        </a>
        <button
          className="icon-button mobile-menu-button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
        {menuOpen && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Navegación móvil"
            onClick={() => setMenuOpen(false)}
            onKeyDown={(event) => {
              if (event.key === "Escape") setMenuOpen(false);
            }}
          >
            <a href="#esencia">Nuestra esencia</a>
            <a href="#inspiracion">Inspiración</a>
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#planes">Planes</a>
            <a href="#solicitud">Crear mi invitación</a>
          </nav>
        )}
      </header>

      <main id="contenido">
        <section id="inicio" className="hero section-shell">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="little-line" /> INVITACIONES WEB, TAN ÚNICAS COMO
              TÚ
            </span>
            <h1>
              Todo gran momento
              <br />
              tiene un <em>comienzo.</em>
              <span className="title-sparkle" aria-hidden="true">
                ✳
              </span>
            </h1>
            <p>
              Creamos invitaciones digitales diseñadas especialmente para tu
              celebración. Un primer detalle que dice mucho de lo que está por
              venir.
            </p>
            <div className="hero-actions">
              <a href="#solicitud" className="button button-dark">
                Crear mi invitación <Icon name="arrow" />
              </a>
              <WhatsAppLink
                onUnavailable={() => setNotice("whatsapp")}
                className="text-link"
                text="Hablar por WhatsApp"
              />
            </div>
            <div className="hero-footnote">
              <span className="tiny-star" aria-hidden="true">
                ✧
              </span>{" "}
              Tu historia. Tu estilo. Tu invitación.
            </div>
          </div>
          <div className="hero-art">
            <div className="art-orbit" aria-hidden="true" />
            <span className="art-caption">
              UNA VENTANA A LO QUE VAS A CELEBRAR
            </span>
            <div className="hero-small-card hero-small-birthday">
              <Concept item={portfolio[2]} hero />
            </div>
            <div className="hero-small-card hero-small-fifteen">
              <Concept item={portfolio[1]} hero />
            </div>
            <div className="hero-main-card">
              <div className="browser-dots" aria-hidden="true">
                <i />
                <i />
                <i />
                <span>un momento para recordar</span>
                <Icon name="link" />
              </div>
              <Concept item={portfolio[0]} hero />
            </div>
            <div className="handwritten-note">
              El comienzo de algo bonito <span aria-hidden="true">⤴</span>
            </div>
            <span className="art-star" aria-hidden="true">
              ✳
            </span>
            <div className="custom-stamp">
              <Icon name="sparkle" />
              <span>
                Diseñada para ti.
                <br />
                <strong>Compartida con amor.</strong>
              </span>
            </div>
          </div>
        </section>

        <div className="event-ribbon" aria-label="Celebraciones que diseñamos">
          {events.map((event) => (
            <span key={event}>
              {event}
              <i aria-hidden="true">✧</i>
            </span>
          ))}
        </div>

        <section id="esencia" className="essence section-shell section-spacing">
          <div>
            <span className="eyebrow">LA ESENCIA DE Preludia</span>
            <h2>
              Tu evento tiene su propia historia.
              <br />
              Tu invitación <em>también.</em>
            </h2>
          </div>
          <div className="essence-copy">
            <p>
              Hay celebraciones que se sienten desde antes de llegar. Desde el
              primer mensaje, la primera imagen, la primera emoción.
            </p>
            <p>
              Diseñamos sin una plantilla visual rígida. Escuchamos tu idea y le
              damos forma: colores, fotografías, música y detalles que hablan de
              ti. Con libertad para crear algo que se sienta tuyo.
            </p>
            <a href="#inspiracion" className="underlined-link">
              Descubre lo que podemos imaginar <Icon name="arrow" />
            </a>
          </div>
        </section>

        <section id="inspiracion" className="inspiration section-spacing">
          <div className="section-shell">
            <div className="section-heading">
              <div>
                <span className="eyebrow">UN POCO DE INSPIRACIÓN</span>
                <h2>
                  Distintas historias.
                  <br />
                  <em>Infinitas posibilidades.</em>
                </h2>
              </div>
              <p>
                Una mirada a lo que tu celebración puede ser.
                <br />
                El siguiente comienzo podría ser el tuyo.
              </p>
            </div>
            <div
              className="portfolio-filters"
              role="group"
              aria-label="Filtrar inspiración"
            >
              {["Todos", "Bodas", "15 años", "Cumpleaños"].map((event) => (
                <button
                  key={event}
                  className={activeEvent === event ? "filter active" : "filter"}
                  aria-pressed={activeEvent === event}
                  onClick={() => setActiveEvent(event)}
                >
                  {event}
                </button>
              ))}
              <span className="concepts-label">
                INVITACIONES DEMO COMPLETAS · NO EVENTOS REALES
              </span>
            </div>
            <div className="portfolio-grid">
              {shownConcepts.map((item) => (
                <article
                  className={`portfolio-item portfolio-${item.id}`}
                  key={item.id}
                >
                  <button
                    className="portfolio-image-button"
                    onClick={() => setPreview(item)}
                    aria-label={`Ver concepto de ${item.type}`}
                  >
                    <Concept item={item} />
                    <span className="preview-pill">
                      Ver invitación completa <Icon name="arrow" />
                    </span>
                  </button>
                  <div className="portfolio-info">
                    <div>
                      <span className="eyebrow">{item.type}</span>
                      <h3>{item.title}</h3>
                      <p>{item.style}</p>
                    </div>
                    <button
                      className="round-button"
                      onClick={() => setPreview(item)}
                      aria-label={`Ver invitación completa de ${item.type}`}
                    >
                      <Icon name="arrow" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <p className="portfolio-note">
              <Icon name="sparkle" /> ¿Tu celebración es diferente?
              Aniversarios, grados, baby showers… nos encantará imaginarla
              contigo.
            </p>
          </div>
        </section>

        <section
          id="como-funciona"
          className="how section-shell section-spacing"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">DE UNA IDEA A UN GRAN COMIENZO</span>
              <h2>
                Así de sencillo.
                <br />
                <em>Así de especial.</em>
              </h2>
            </div>
            <a href="#solicitud" className="underlined-link">
              Empecemos con tu idea <Icon name="arrow" />
            </a>
          </div>
          <div className="steps">
            {[
              {
                title: "Cuéntanos tu idea",
                text: "Comparte cómo imaginas tu celebración, tus referencias y esos detalles que la hacen especial.",
                icon: "sparkle",
              },
              {
                title: "Creamos tu invitación",
                text: "Damos vida a una experiencia pensada para ti. La revisamos contigo y afinamos los detalles.",
                icon: "check",
              },
              {
                title: "Comparte la emoción",
                text: "Recibe tu enlace, envíalo a tus invitados y empieza a vivir la cuenta regresiva.",
                icon: "link",
              },
            ].map((step, index) => (
              <article className="step" key={step.title}>
                <div className="step-top">
                  <span>0{index + 1}</span>
                  <Icon name={step.icon as "sparkle" | "check" | "link"} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="planes" className="plans-section section-spacing">
          <div className="section-shell">
            <div className="center-heading">
              <span className="eyebrow">ELIGE CÓMO QUIERES COMENZAR</span>
              <h2>
                Un detalle especial.
                <br />
                <em>Un plan para ti.</em>
              </h2>
              <p>
                Dos formas de darle a tu celebración el comienzo que merece.
              </p>
            </div>
            <div className="plans-grid">
              <article className="plan-card">
                <span className="eyebrow">LO ESENCIAL, HECHO ESPECIAL</span>
                <h3>Esencial</h3>
                <p className="plan-description">
                  Una invitación web personalizada,
                  <br />
                  moderna y completa.
                </p>
                <div className="price">
                  $99.000 <span>COP / evento</span>
                </div>
                <a
                  href="#solicitud"
                  className="button button-outline"
                  onClick={() => choosePlan("Esencial")}
                >
                  Elegir Esencial <Icon name="arrow" />
                </a>
                <ul>
                  {essentialFeatures.map((feature) => (
                    <li key={feature}>
                      <Icon name="check" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <details className="plan-details">
                  <summary>
                    Ver todo lo que incluye <Icon name="plus" />
                  </summary>
                  <p>
                    Itinerario cuando aplique, dress code, información de
                    regalos y secciones especiales. RSVP con “Asistiré” y “No
                    podré asistir”, número de asistentes y notificación por
                    correo al anfitrión. Transiciones suaves, galerías y
                    animaciones al desplazarse.
                  </p>
                </details>
              </article>
              <article className="plan-card premium-card">
                <span className="premium-tag">
                  <Icon name="sparkle" /> UNA EXPERIENCIA MÁS COMPLETA
                </span>
                <span className="eyebrow">PARA IR UN POCO MÁS ALLÁ</span>
                <h3>Premium</h3>
                <p className="plan-description">
                  Más libertad creativa.
                  <br />
                  Cada invitado, cada detalle, en tus manos.
                </p>
                <div className="price">
                  $199.000 <span>COP / evento</span>
                </div>
                <a
                  href="#solicitud"
                  className="button button-light"
                  onClick={() => choosePlan("Premium")}
                >
                  Elegir Premium <Icon name="arrow" />
                </a>
                <ul>
                  {premiumFeatures.map((feature) => (
                    <li key={feature}>
                      <Icon name="check" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <details className="plan-details">
                  <summary>
                    Ver todo lo que incluye <Icon name="plus" />
                  </summary>
                  <p>
                    Panel privado con confirmados, pendientes y personas que no
                    asistirán; estadísticas, personas confirmadas y control de
                    cupos. Posibilidad de actualizar respuestas, saludos y
                    enlaces personalizados. Acordamos los efectos especiales y
                    el alcance creativo antes de empezar.
                  </p>
                </details>
              </article>
            </div>
            <p className="plan-footnote">
              Una ronda de ajustes puede incluir varios cambios agrupados.{" "}
              <a href="#preguntas">
                Resolvemos tus dudas <Icon name="arrow" />
              </a>
            </p>
          </div>
        </section>

        <section
          id="solicitud"
          className="request-section section-shell section-spacing"
        >
          <div className="request-copy">
            <span className="eyebrow">AQUÍ EMPIEZA TU HISTORIA</span>
            <h2>
              Cuéntanos qué
              <br />
              <em>vamos a celebrar.</em>
            </h2>
            <p>
              No necesitas tenerlo todo definido. Una fecha, una idea o una
              emoción son un buen lugar para empezar.
            </p>
            <div className="request-divider" />
            <span className="request-star" aria-hidden="true">
              ✳
            </span>
            <h3>
              Las mejores ideas comienzan
              <br />
              con una conversación.
            </h3>
            <p>
              Si prefieres, hablemos directamente y pensemos juntos en tu
              invitación.
            </p>
            <WhatsAppLink
              onUnavailable={() => setNotice("whatsapp")}
              className="underlined-link"
            />
            <div className="request-reassurance">
              <Icon name="check" />
              <span>
                Una solicitud sin compromiso.
                <br />
                Acordamos los detalles contigo antes de empezar.
              </span>
            </div>
          </div>
          <RequestForm
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />
        </section>

        <section
          id="preguntas"
          className="faq-section section-shell section-spacing"
        >
          <div>
            <span className="eyebrow">POR SI TE LO ESTABAS PREGUNTANDO</span>
            <h2>
              Pequeñas dudas,
              <br />
              <em>respuestas claras.</em>
            </h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <Icon name="plus" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="closing">
          <span className="closing-star" aria-hidden="true">
            ✳
          </span>
          <span className="eyebrow">QUE LA EMOCIÓN EMPIECE ANTES</span>
          <h2>
            Lo que viene es especial.
            <br />
            <em>Hagamos que se sienta desde ahora.</em>
          </h2>
          <a href="#solicitud" className="button button-dark">
            Crear mi invitación <Icon name="arrow" />
          </a>
        </section>
      </main>
      <footer className="footer section-shell">
        <div className="footer-top">
          <div>
            <a className="wordmark" href="#inicio">
              Preludia<span className="wordmark-dot">.</span>
            </a>
            <p>Todo gran momento tiene un comienzo.</p>
          </div>
          <div className="footer-links">
            <a href="#inspiracion">Inspiración</a>
            <a href="#planes">Nuestros planes</a>
            <WhatsAppLink
              onUnavailable={() => setNotice("whatsapp")}
              text="Contacto"
            />
            {config.premiumPortalUrl ? (
              <a
                href={config.premiumPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Acceso anfitriones <Icon name="arrow" />
              </a>
            ) : (
              <button onClick={() => setNotice("premium")}>
                Acceso anfitriones <Icon name="arrow" />
              </button>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© Preludia · Hecho para celebrar.</span>
          <span>Diseñado con intención. Compartido con emoción.</span>
          <button onClick={() => setNotice("privacy")}>Privacidad</button>
        </div>
      </footer>

      {preview && (
        <Modal
          title={`Invitación demo de ${preview.type}`}
          onClose={() => setPreview(null)}
          className="demo-modal"
        >
          <InvitationDemo item={preview} onStart={() => setPreview(null)} />
        </Modal>
      )}
      {notice && (
        <Modal
          title={
            notice === "premium"
              ? "Acceso anfitriones"
              : notice === "privacy"
                ? "Tu privacidad"
                : "Hablemos de tu celebración"
          }
          onClose={() => setNotice(null)}
        >
          <span className="eyebrow">Preludia</span>
          <h2>
            {notice === "premium" ? (
              <>
                Tu celebración,
                <br />
                <em>en tus manos.</em>
              </>
            ) : notice === "privacy" ? (
              <>
                Tu idea.
                <br />
                <em>Tu privacidad.</em>
              </>
            ) : (
              <>
                Un comienzo
                <br />
                <em>para conversar.</em>
              </>
            )}
          </h2>
          <p>
            {notice === "premium"
              ? "El acceso al panel de anfitriones estará disponible próximamente. Si te interesa Premium, cuéntanos sobre tu celebración y revisamos contigo el alcance y la disponibilidad antes de confirmar el pedido."
              : notice === "privacy"
                ? "Este sitio no almacena tu solicitud ni utiliza cookies de seguimiento. El formulario prepara un mensaje en tu navegador: solo se comparte cuando decides enviarlo en WhatsApp. Las fotografías se coordinan después por ese canal. WhatsApp y el proveedor de alojamiento aplican sus propias políticas de privacidad."
                : "Estamos preparando nuestro canal de WhatsApp. Mientras tanto, puedes completar el formulario y copiar tu idea para conservarla. Ninguna solicitud se enviará hasta que el canal esté disponible."}
          </p>
          {notice !== "privacy" && (
            <a
              href="#solicitud"
              className="button button-dark"
              onClick={() => setNotice(null)}
            >
              Preparar mi idea <Icon name="arrow" />
            </a>
          )}
        </Modal>
      )}
    </>
  );
}

export default App;
