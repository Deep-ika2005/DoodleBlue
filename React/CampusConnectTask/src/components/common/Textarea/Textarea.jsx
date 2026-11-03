function Textarea({ className = "", ...props }) {
  const classes = ["common-control", className].filter(Boolean).join(" ");
  return <textarea className={classes} {...props} />;
}

export default Textarea;
