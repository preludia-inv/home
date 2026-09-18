import { normalizeWhatsAppNumber } from "./lib/request";

function secureUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

export const config = {
  whatsappNumber: normalizeWhatsAppNumber(
    import.meta.env.VITE_WHATSAPP_NUMBER || "573136071110",
  ),
  premiumPortalUrl: secureUrl(import.meta.env.VITE_PREMIUM_PORTAL_URL),
} as const;

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
