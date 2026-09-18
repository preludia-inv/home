import { useState, useSyncExternalStore } from "react";
import type { FormEvent } from "react";
import { config } from "../config";
import { events } from "../data";
import { buildRequestMessage, localDate, whatsAppUrl } from "../lib/request";
import type { InvitationRequest, Plan } from "../lib/request";
import { Icon } from "./Icon";
import { Modal } from "./Modal";

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function RequestForm({
  selectedPlan,
  setSelectedPlan,
}: {
  selectedPlan: Plan;
  setSelectedPlan: (plan: Plan) => void;
}) {
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  const [message, setMessage] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [error, setError] = useState("");
  const url = whatsAppUrl(config.whatsappNumber, message);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Object.fromEntries(
      new FormData(form),
    ) as unknown as InvitationRequest;
    if (
      !fields.names.trim() ||
      !fields.contact.trim() ||
      fields.brief.trim().length < 15
    ) {
      setError(
        "Completa los nombres, tu contacto y al menos 15 caracteres sobre tu idea.",
      );
      return;
    }
    if (fields.date < localDate()) {
      setError("Elige la fecha de hoy o una fecha futura para tu celebración.");
      return;
    }
    setError("");
    const prepared = buildRequestMessage(fields);
    setMessage(prepared);
    setCopyStatus("");
    const target = whatsAppUrl(config.whatsappNumber, prepared);
    if (target) window.open(target, "_blank", "noopener,noreferrer");
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopyStatus("Solicitud copiada.");
    } catch {
      setCopyStatus(
        "No pudimos copiarla automáticamente. Selecciona y copia el texto de abajo.",
      );
    }
  }

  return (
    <>
      <form className="request-form" onSubmit={submit}>
        <fieldset
          className="request-fields"
          disabled={!ready}
          aria-label="Solicitud de invitación"
        >
          <div className="form-heading">
            <span className="eyebrow">EL PRIMER PASO</span>
            <span className="form-time">Unos minutos, una gran idea.</span>
          </div>
          <div className="form-grid">
            <label>
              Tipo de evento <span aria-hidden="true">*</span>
              <select name="eventType" required defaultValue="">
                <option value="" disabled>
                  ¿Qué vamos a celebrar?
                </option>
                {events.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              Nombres protagonistas <span aria-hidden="true">*</span>
              <input
                name="names"
                autoComplete="name"
                placeholder="Ej. Laura y Andrés"
                required
                maxLength={100}
              />
            </label>
            <label>
              Fecha del evento <span aria-hidden="true">*</span>
              <input
                type="date"
                name="date"
                required
                aria-label="Fecha del evento"
              />
            </label>
            <label>
              Tu plan <span aria-hidden="true">*</span>
              <select
                name="plan"
                value={selectedPlan}
                onChange={(event) =>
                  setSelectedPlan(event.target.value as Plan)
                }
              >
                <option>Quiero asesoría</option>
                <option value="Esencial">Esencial · $99.000 COP</option>
                <option value="Premium">Premium · $199.000 COP</option>
              </select>
            </label>
            <label className="full-width">
              ¿Cómo te contactamos? <span aria-hidden="true">*</span>
              <input
                name="contact"
                placeholder="WhatsApp con indicativo o correo"
                autoComplete="email"
                required
                maxLength={100}
              />
            </label>
            <label className="full-width brief-label">
              Cuéntanos cómo imaginas tu invitación{" "}
              <span aria-hidden="true">*</span>
              <textarea
                name="brief"
                required
                minLength={15}
                maxLength={1500}
                rows={4}
                placeholder="Algo elegante y campestre, verde oliva y beige, con muchas fotos y una sensación natural…"
              />
              <span className="field-help">
                Colores, una canción, una sensación. Nos encantará conocer tu
                idea.
              </span>
            </label>
            <label className="full-width">
              Información de la celebración{" "}
              <span className="optional">Opcional</span>
              <textarea
                name="information"
                rows={2}
                maxLength={600}
                placeholder="Lugar, horarios, número aproximado de invitados…"
              />
            </label>
            <label className="full-width">
              ¿Tienes alguna referencia?{" "}
              <span className="optional">Opcional</span>
              <input
                name="references"
                maxLength={300}
                placeholder="Un enlace de Pinterest, Instagram o una descripción"
              />
            </label>
          </div>
          <p className="form-note">
            Las fotografías las coordinamos después por WhatsApp. Los campos con
            * son obligatorios.
          </p>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="button button-dark form-submit">
            Preparar solicitud por WhatsApp <Icon name="arrow" />
          </button>
          <p className="privacy-note">
            <Icon name="link" /> Tus datos se incluyen en el mensaje. Tú decides
            cuándo enviarlo en WhatsApp. No guardamos este formulario.
          </p>
        </fieldset>
      </form>
      {message && (
        <Modal
          title="Tu solicitud está preparada"
          onClose={() => setMessage("")}
        >
          <span className="eyebrow">TU CELEBRACIÓN EMPIEZA AQUÍ</span>
          <h2>
            Tu idea ya tiene
            <br />
            <em>un comienzo.</em>
          </h2>
          <p>
            {url
              ? "Abrimos WhatsApp con tu solicitud. Revisa el mensaje y pulsa enviar allí para que podamos recibirlo. Si no se abrió, utiliza el botón."
              : "El canal de WhatsApp de Preludia todavía no está habilitado. Tu solicitud no se ha enviado; puedes copiarla y conservarla mientras tanto."}
          </p>
          {url && (
            <a
              className="button button-dark"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir WhatsApp <Icon name="whatsapp" />
            </a>
          )}
          <label className="message-label">
            Tu solicitud
            <textarea
              className="message-preview"
              readOnly
              value={message}
              rows={9}
            />
          </label>
          <button className="button button-outline" onClick={copy}>
            Copiar solicitud <Icon name="link" />
          </button>
          <p role="status">{copyStatus}</p>
        </Modal>
      )}
    </>
  );
}
