function Input({ className = "", ...props }) {
  const classes = ["common-control", className].filter(Boolean).join(" ");
  return <input className={classes} {...props} />;
}

export default Input;
