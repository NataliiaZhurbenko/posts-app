import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return <input ref={ref} {...props} className={classes.Input} />;
});

export default Input;
