export const events = [
  "Bodas",
  "15 años",
  "Aniversarios",
  "Cumpleaños",
  "Grados",
  "Baby showers",
  "Otros eventos",
];

export const portfolio = [
  {
    id: "wedding",
    type: "Bodas",
    title: "Un sí, mil comienzos.",
    style: "Natural · Romántico · Atemporal",
    names: "Lucía & Martín",
    subtitle: "NOS VAMOS A CASAR",
    date: "18 · OCTUBRE · 2027",
    description:
      "Tonos oliva, fotografía protagonista y detalles botánicos para una celebración al aire libre.",
  },
  {
    id: "fifteen",
    type: "15 años",
    title: "Una noche para brillar.",
    style: "Celestial · Delicado · Mágico",
    names: "Valentina",
    subtitle: "MIS QUINCE AÑOS",
    date: "21 · NOVIEMBRE · 2027",
    description:
      "Un universo en tonos lavanda, destellos sutiles y una entrada llena de personalidad.",
  },
  {
    id: "birthday",
    type: "Cumpleaños",
    title: "Que empiece lo bueno.",
    style: "Editorial · Vibrante · Divertido",
    names: "LOS 30 DE MATEO",
    subtitle: "BUENA MÚSICA. MEJOR COMPAÑÍA.",
    date: "12 · DICIEMBRE · 2027",
    description:
      "Tipografía con carácter, colores cálidos y una composición gráfica para celebrar a tu manera.",
  },
] as const;
export type PortfolioItem = (typeof portfolio)[number];

export const essentialFeatures = [
  "Diseño personalizado para tu celebración",
  "Fotografías, música y cuenta regresiva",
  "Ubicación, mapas y detalles del evento",
  "Confirmación de asistencia por tus invitados",
  "Animaciones elegantes y diseño para móvil",
  "Hasta 2 rondas de ajustes",
];
export const premiumFeatures = [
  "Todo lo incluido en el plan Esencial",
  "Animaciones especiales y mayor libertad creativa",
  "Invitados privados y cupos por persona o familia",
  "Enlaces y saludos personalizados + QR",
  "Panel de anfitriones y estadísticas",
  "Hasta 3 rondas de ajustes",
];

export const faqs = [
  {
    question: "¿Mi invitación será igual a las de los ejemplos?",
    answer:
      "Los ejemplos son conceptos para inspirarte. Diseñamos alrededor de tu historia, fotografías, temática y preferencias. La estructura, los colores y la experiencia pueden ser diferentes en cada celebración.",
  },
  {
    question: "¿Cómo recibo y comparto mi invitación?",
    answer:
      "Recibes un enlace que puedes compartir por WhatsApp, correo o redes sociales. Tus invitados pueden abrirlo desde el navegador de su teléfono, sin instalar una aplicación.",
  },
  {
    question: "¿Qué necesito para empezar?",
    answer:
      "El tipo de evento, los nombres, la fecha y una idea de lo que imaginas. No necesitas tenerlo todo resuelto: por WhatsApp coordinamos los detalles y el envío de fotografías y música.",
  },
  {
    question: "¿Qué es una ronda de ajustes?",
    answer:
      "Es una entrega de comentarios agrupados. En una misma ronda puedes pedir varios cambios de textos, fotos, colores, música u organización. Esencial incluye hasta 2 rondas y Premium hasta 3; no son solo 2 o 3 cambios individuales.",
  },
  {
    question: "¿Cómo funciona la confirmación de asistencia?",
    answer:
      "En Esencial, tus invitados pueden responder “Asistiré” o “No podré asistir”, indicar el número de asistentes y dejar un comentario. El anfitrión recibe la respuesta por correo. Premium añade lista privada, cupos, enlaces personalizados y un panel con confirmados, pendientes y personas que no asistirán.",
  },
  {
    question: "¿Cuánto tarda y por cuánto tiempo estará disponible?",
    answer:
      "Antes de confirmar tu pedido acordamos contigo la fecha de entrega y el periodo de publicación según tu celebración. Si tienes una fecha cercana, cuéntanos para revisar disponibilidad.",
  },
  {
    question: "¿Qué diferencia hay entre las animaciones de los planes?",
    answer:
      "Esencial incluye transiciones suaves, apariciones al desplazarte y galerías. Premium permite acordar efectos especiales para tu evento, como un sobre que se abre, estrellas o una secuencia de entrada. El alcance se define contigo antes de empezar.",
  },
];
