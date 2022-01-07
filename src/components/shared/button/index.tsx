import { HtmlProps } from "next/dist/shared/lib/utils";
import { HTMLProps } from "react";
import styles from "./styles.module.css";

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  className,
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${className} ${
        props.disabled ? styles.disabled : ""
      }`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
