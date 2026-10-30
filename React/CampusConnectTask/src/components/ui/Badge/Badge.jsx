import "./Badge.css";

function Badge({ children, tone = "neutral", className = "", ...props }) {
  const classes = ["ui-badge", `ui-badge--${tone}`, className]
    .filter(Boolean)
    .join(" ");
  return <span className={classes} {...props}>{children}</span>;
}

export default Badge;
