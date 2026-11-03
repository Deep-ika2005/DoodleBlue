import "./EmptyState.css";

function EmptyState({ icon = "✦", eyebrow, title, description, children, className = "", ...props }) {
  const classes = ["ui-empty-state", className].filter(Boolean).join(" ");
  return (
    <section className={classes} role="status" {...props}>
      <span className="ui-empty-state__icon" aria-hidden="true">{icon}</span>
      {eyebrow && <p className="ui-empty-state__eyebrow">{eyebrow}</p>}
      {title && <h2 className="ui-empty-state__title">{title}</h2>}
      {description && <p className="ui-empty-state__description">{description}</p>}
      {children}
    </section>
  );
}

export default EmptyState;
