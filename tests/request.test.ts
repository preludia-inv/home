import { describe, expect, it } from "vitest";
import {
  buildRequestMessage,
  localDate,
  normalizeWhatsAppNumber,
  whatsAppUrl,
} from "../src/lib/request";
import type { InvitationRequest } from "../src/lib/request";

const request: InvitationRequest = {
  eventType: "Bodas",
  names: "  Laura & Andrés  ",
  date: "2027-10-18",
  plan: "Premium",
  contact: "laura@example.com",
  information: "",
  brief: "Oliva, música & emoción.\nUna celebración al aire libre.",
  references: "https://example.com/?idea=1&color=oliva",
};

describe("WhatsApp configuration", () => {
  it.each([
    undefined,
    "",
    "+573001234567",
    "57 3001234567",
    "0123456789",
    "javascript:alert(1)",
    "123",
    "1234567890123456",
  ])("rejects invalid or missing number %s", (value) => {
    expect(normalizeWhatsAppNumber(value)).toBeNull();
    expect(whatsAppUrl(value ?? null, "Hola")).toBeNull();
  });
  it("accepts international digits and trims surrounding whitespace", () =>
    expect(normalizeWhatsAppNumber(" 573001234567 ")).toBe("573001234567"));
  it("preserves every character of the brief through URL encoding", () => {
    const message = buildRequestMessage(request);
    const url = new URL(whatsAppUrl("573001234567", message)!);
    expect(url.origin).toBe("https://wa.me");
    expect(url.searchParams.get("text")).toBe(message);
    expect([...url.searchParams.keys()]).toEqual(["text"]);
  });
});

describe("structured brief", () => {
  it("includes all order fields, local date and photo follow-up without a false delivery confirmation", () => {
    const message = buildRequestMessage(request);
    for (const value of [
      "Evento: Bodas",
      "Nombres: Laura & Andrés",
      "Fecha: 18/10/2027",
      "Plan: Premium",
      "Contacto: laura@example.com",
      request.brief,
      request.references,
      "Información de la celebración: Por definir",
      "fotografías",
    ])
      expect(message).toContain(value);
  });
  it("has an explicit empty-reference fallback", () =>
    expect(buildRequestMessage({ ...request, references: " " })).toContain(
      "Aún no tengo referencias",
    ));
  it("formats the calendar date in local time", () =>
    expect(localDate(new Date(2027, 0, 2, 23, 50))).toBe("2027-01-02"));
});
