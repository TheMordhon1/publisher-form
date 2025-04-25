import React, { useState } from "react";

type InputFieldProps = {
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  required?: boolean;
  className?: string;
  minLength?: number;
  maxLength?: number;
  customComponentOnLeft?: React.ReactNode;
  customComponentOnRight?: React.ReactNode;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const InputField = (props: InputFieldProps) => {
  const [touched, setTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.type === "number") {
      const value = e.target.value;
      if (props.maxLength !== undefined && value.length <= props.maxLength) {
        props.onChange(e);
      }
    } else {
      props.onChange(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    props.onBlur?.(e);
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showError =
    touched &&
    (props.error ||
      (props.type === "email" && props.value && !isEmailValid(props.value)) ||
      (props.value?.length ?? 0) < (props.minLength ?? 0));

  return (
    <div className={`flex flex-col gap-2 ${props.className}`}>
      {props.label && (
        <label className="font-medium text-sm text-primary950">
          {props.label}
          {props.required ? (
            <span className="text-error font-regular">*</span>
          ) : (
            <span className="text-primary300 font-regular">(optional)</span>
          )}
        </label>
      )}
      <div className="flex">
        {props.customComponentOnLeft && props.customComponentOnLeft}
        <input
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          onChange={handleChange}
          disabled={props.disabled}
          onBlur={handleBlur}
          onFocus={props.onFocus}
          onKeyDown={props.onKeyDown}
          onKeyUp={props.onKeyUp}
          minLength={props.minLength}
          maxLength={props.type === "number" ? 11 : props.maxLength}
          className={`p-3 rounded-lg border font-regular text-primary400 text-sm placeholder:text-sm placeholder:text-primary400 placeholder:font-regular focus:outline-secondary600
        ${props.className && props.className} 
        ${
          showError
            ? "border-error/20 bg-error50 text-error"
            : props.disabled
            ? "border-primary/100 bg-neutral text-primary400"
            : "border-primary/100 bg-neutral text-primary950"
        }`}
        />

        {props.customComponentOnRight && props.customComponentOnRight}
      </div>
      {showError && (
        <p className="font-regular text-xs text-error">
          {props.errorMessage || "Invalid input"}
        </p>
      )}
    </div>
  );
};
