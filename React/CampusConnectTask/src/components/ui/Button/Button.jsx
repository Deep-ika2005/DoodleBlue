import "./Button.css";

function Button({
  as: Component = "button",
  variant = "primary",
  size = "medium",
  className = "",
  type,
  children,
  ...props
}) {
  const classes = [
    "ui-button",
    `ui-button--${variant}`,
    `ui-button--${size}`,
    className
  ].filter(Boolean).join(" ");

  return (
    <Component
      className={classes}
      {...(Component === "button" ? { type: type ?? "button" } : {})}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Button;
