import React from "react";
import "./button.css";

type Props = {
  type?: "button" | "submit";
  onClick?: () => void;
};

export const Button: React.ComponentType<Props> = ({
  type = "button",
  onClick,
  children,
}) => (
  <button type={type} onClick={onClick}>
    {children}
  </button>
);
