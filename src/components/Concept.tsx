import { asset } from "../config";
import type { PortfolioItem } from "../data";

export function Concept({
  item,
  hero = false,
}: {
  item: PortfolioItem;
  hero?: boolean;
}) {
  return (
    <div
      className={`concept concept-${item.id}${hero ? " concept-hero" : ""}`}
      aria-label={`Concepto de ${item.type}: ${item.names}`}
    >
      {item.id === "wedding" && (
        <img
          src={asset("images/wedding.webp")}
          alt="Detalle de un ramo de boda con luz cálida"
          width="640"
          height="800"
          loading={hero ? "eager" : "lazy"}
          fetchPriority={hero ? "high" : "auto"}
        />
      )}
      {item.id === "fifteen" && (
        <div className="celestial-art" aria-hidden="true">
          <span>✦</span>
          <i />
          <span>✧</span>
          <span>✦</span>
          <span>·</span>
        </div>
      )}
      {item.id === "birthday" && (
        <div className="birthday-art" aria-hidden="true">
          <span className="sunburst">✷</span>
          <span className="orb" />
          <span className="birthday-line" />
        </div>
      )}
      <div className="concept-content">
        <span className="concept-eyebrow">{item.subtitle}</span>
        <span className="concept-name">
          {item.id === "birthday" ? (
            <>
              <small>LOS</small>30<small>DE MATEO</small>
            </>
          ) : (
            item.names
          )}
        </span>
        <span className="concept-date">{item.date}</span>
        <span className="concept-footer">
          {item.id === "wedding"
            ? "Contigo, todo comienza."
            : item.id === "fifteen"
              ? "Hay noches que se vuelven eternas."
              : "ESTÁS EN LA LISTA."}
        </span>
      </div>
    </div>
  );
}
