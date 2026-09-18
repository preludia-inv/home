export function Icon({
  name,
  className = "",
}: {
  name:
    | "arrow"
    | "check"
    | "sparkle"
    | "whatsapp"
    | "close"
    | "menu"
    | "plus"
    | "link";
  className?: string;
}) {
  const paths = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    check: <path d="m5 12 4 4L19 6" />,
    sparkle: (
      <>
        <path d="m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6Z" />
        <path d="m20 2 .5 1.5L22 4l-1.5.5L20 6l-.5-1.5L18 4l1.5-.5Z" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.5L3 21l1.5-5a8.5 8.5 0 1 1 16-4.2Z" />
        <path d="M8.5 7.5c-.8 0-1 1-.6 2.2 1 2.8 3.4 5 6 5.6 1 .2 2.1-.5 2.1-1.3l-2.6-1.5-1 1c-1.5-.7-2.5-1.7-3.2-3.1l.8-1Z" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    plus: <path d="M5 12h14M12 5v14" />,
    link: (
      <>
        <path d="m10 13 4-4m-6 1-2 2a4 4 0 0 0 6 6l2-2m-4-8 2-2a4 4 0 0 1 6 6l-2 2" />
      </>
    ),
  };
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
