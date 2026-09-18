import type { PortfolioItem } from "../data";
import { Concept } from "./Concept";
import { Icon } from "./Icon";

const demoDetails = {
  wedding: {
    intro:
      "Junto a nuestras familias, queremos celebrar contigo el comienzo de nuestra historia para siempre.",
    quote: "Hay lugares donde uno se queda, y personas que se vuelven hogar.",
    venue: "Hacienda El Roble",
    address: "Vía La Calera, Cundinamarca",
    palette: ["#334b37", "#80916f", "#d8d5b9", "#f6f2e8"],
    dress: "Formal campestre · tonos naturales",
    gift: "Tu compañía es nuestro mejor regalo. Si deseas tener un detalle, tendremos lluvia de sobres.",
    schedule: [
      ["4:00 p. m.", "Ceremonia"],
      ["5:30 p. m.", "Cóctel al atardecer"],
      ["7:00 p. m.", "Cena y celebración"],
    ],
  },
  fifteen: {
    intro:
      "He soñado con esta noche desde pequeña. Quiero compartir contigo un capítulo que guardaré para siempre.",
    quote: "Que las estrellas sean testigos de una noche hecha para brillar.",
    venue: "Salón Gran Cielo",
    address: "Bogotá, Colombia",
    palette: ["#73588e", "#aa8cc2", "#ddd0e9", "#f5f0fa"],
    dress: "Elegante · reserva el lavanda para la quinceañera",
    gift: "Lo más importante es celebrar juntos. Habrá cofre de buenos deseos y lluvia de sobres.",
    schedule: [
      ["7:00 p. m.", "Recepción"],
      ["8:00 p. m.", "Entrada y vals"],
      ["9:00 p. m.", "Cena, música y magia"],
    ],
  },
  birthday: {
    intro:
      "Tres décadas, muchas historias y una excusa perfecta para reunir a mi gente favorita.",
    quote: "La vida se mide en momentos que dan ganas de repetir.",
    venue: "Casa Nómada",
    address: "Zona T · Bogotá",
    palette: ["#432d29", "#e97848", "#f4ad62", "#f8e6ce"],
    dress: "Smart casual · ven listo para bailar",
    gift: "Sin regalos ni protocolos: trae tu mejor canción y ganas de celebrar.",
    schedule: [
      ["6:30 p. m.", "Puertas abiertas"],
      ["8:00 p. m.", "Brindis y cena"],
      ["9:30 p. m.", "La pista es nuestra"],
    ],
  },
} as const;

export function InvitationDemo({
  item,
  onStart,
}: {
  item: PortfolioItem;
  onStart: () => void;
}) {
  const details = demoDetails[item.id];
  return (
    <div className={`invitation-demo demo-${item.id}`}>
      <section className="demo-cover">
        <span className="demo-label">
          INVITACIÓN DEMOSTRATIVA · {item.type}
        </span>
        <Concept item={item} />
        <div className="demo-scroll">
          DESLIZA PARA DESCUBRIR <span>↓</span>
        </div>
      </section>

      <section className="demo-welcome demo-panel">
        <span className="demo-ornament" aria-hidden="true">
          ✦
        </span>
        <p>{details.intro}</p>
        <div
          className="demo-countdown"
          aria-label="Cuenta regresiva de ejemplo"
        >
          {[
            ["184", "DÍAS"],
            ["08", "HORAS"],
            ["32", "MIN"],
            ["15", "SEG"],
          ].map(([value, label]) => (
            <span key={label}>
              <strong>{value}</strong>
              <small>{label}</small>
            </span>
          ))}
        </div>
      </section>

      <section className="demo-quote demo-panel">
        <span aria-hidden="true">“</span>
        <blockquote>{details.quote}</blockquote>
      </section>

      <section className="demo-details demo-panel">
        <span className="demo-kicker">GUARDA LA FECHA</span>
        <h3>{item.date.replaceAll(" · ", " ")}</h3>
        <div className="demo-location">
          <Icon name="sparkle" />
          <div>
            <strong>{details.venue}</strong>
            <p>{details.address}</p>
          </div>
        </div>
        <button type="button" className="demo-outline-button">
          Ver ubicación <Icon name="arrow" />
        </button>
      </section>

      <section className="demo-itinerary demo-panel">
        <span className="demo-kicker">ASÍ VIVIREMOS ESTE DÍA</span>
        <h3>Itinerario</h3>
        <div className="demo-timeline">
          {details.schedule.map(([time, label], index) => (
            <div key={label}>
              <span>0{index + 1}</span>
              <time>{time}</time>
              <strong>{label}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="demo-dress demo-panel">
        <span className="demo-kicker">CÓDIGO DE VESTUARIO</span>
        <h3>{details.dress}</h3>
        <div className="demo-palette" aria-label="Paleta sugerida">
          {details.palette.map((color) => (
            <i key={color} style={{ backgroundColor: color }} />
          ))}
        </div>
      </section>

      <section className="demo-gift demo-panel">
        <span className="demo-ornament" aria-hidden="true">
          ✧
        </span>
        <span className="demo-kicker">UN DETALLE CON CARIÑO</span>
        <p>{details.gift}</p>
      </section>

      <section className="demo-rsvp demo-panel">
        <span className="demo-kicker">CONFIRMA TU ASISTENCIA</span>
        <h3>¿Nos acompañas?</h3>
        <p>
          Esta sección muestra cómo tus invitados pueden responder desde su
          celular.
        </p>
        <div className="demo-rsvp-options" aria-label="Ejemplo de confirmación">
          <span>
            <Icon name="check" /> Sí, allí estaré
          </span>
          <span>No podré asistir</span>
        </div>
        <span className="demo-disclaimer">
          Demostración visual · No envía respuestas
        </span>
      </section>

      <section className="demo-ending demo-panel">
        <span aria-hidden="true">✦</span>
        <h3>{item.names}</h3>
        <p>
          {item.id === "wedding"
            ? "Contigo, todo comienza."
            : item.id === "fifteen"
              ? "Hay noches que se vuelven eternas."
              : "Que empiece lo bueno."}
        </p>
        <a
          href="#solicitud"
          className="button demo-start-button"
          onClick={onStart}
        >
          Quiero una invitación así <Icon name="arrow" />
        </a>
        <small>
          Concepto ficticio creado para mostrar posibilidades de diseño.
        </small>
      </section>
    </div>
  );
}
