import React from "react";

type RadioButtonProps = {
  label?: string;
  value?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  required?: boolean;
};

export const RadioButton = (props: RadioButtonProps) => {
  const inputId = `radio-${props.value}`;

  return (
    <div className={`flex items-center gap-2 ${props.className}`}>
      <input
        id={inputId}
        type="radio"
        name={props.label}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
        disabled={props.disabled}
        className={`h-4 w-4 text-primary600 border-primary300 focus:ring-primary500 ${
          props.error ? "border-error/20" : ""
        }`}
      />
      {props.label && (
        <label
          className={`font-regular text-sm ${
            props.disabled ? "text-primary400" : "text-primary950"
          }`}
          htmlFor={inputId}
        >
          {props.label}
        </label>
      )}
    </div>
  );
};
