function Select({ className = "", children, ...props }) {
  const classes = ["common-control", className].filter(Boolean).join(" ");
  return <select className={classes} {...props}>{children}</select>;
}

export default Select;
