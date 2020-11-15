import React from "react";
import "./form-element.css";

type Props = {
  label?: string;
};

export const FormElement: React.ComponentType<Props> = ({ label, children }) =>
  label ? (
    <label className="form-element">
      {label}
      <div className="form-element__control">{children}</div>
    </label>
  ) : (
    <div className="form-element">{children}</div>
  );
