export type Plan = "Esencial" | "Premium" | "Quiero asesoría";
export interface InvitationRequest {
  eventType: string;
  names: string;
  date: string;
  plan: Plan;
  contact: string;
  information: string;
  brief: string;
  references: string;
}

export function normalizeWhatsAppNumber(value?: string): string | null {
  const number = value?.trim();
  return number && /^[1-9]\d{7,14}$/.test(number) ? number : null;
}

export function whatsAppUrl(
  number: string | null,
  message: string,
): string | null {
  const normalized = normalizeWhatsAppNumber(number ?? undefined);
  return normalized
    ? `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`
    : null;
}

export function localDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function buildRequestMessage(request: InvitationRequest): string {
  const [year, month, day] = request.date.split("-");
  return [
    "¡Hola, Preludia! Quiero crear mi invitación. ✨",
    "",
    `Evento: ${request.eventType.trim()}`,
    `Nombres: ${request.names.trim()}`,
    `Fecha: ${day}/${month}/${year}`,
    `Plan: ${request.plan}`,
    `Contacto: ${request.contact.trim()}`,
    "",
    "Así imagino mi invitación:",
    request.brief.trim(),
    "",
    `Información de la celebración: ${request.information.trim() || "Por definir"}`,
    `Referencias: ${request.references.trim() || "Aún no tengo referencias"}`,
    "",
    "Podemos coordinar el envío de fotografías por aquí.",
  ].join("\n");
}
