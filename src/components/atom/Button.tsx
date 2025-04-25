import React from "react";

type ButtonProps = {
  label?: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "delete" | "default";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

export const ButtonComp = (props: ButtonProps) => {
  const primaryStyles = "bg-secondary600 text-white";
  const secondaryStyles =
    "bg-secondary50 text-secondary600 border border-secondary600/20";
  const deleteStyles = "bg-error50 text-error border border-error/20";
  const defaultStyles = "bg-neutral border border-primary/300 text-primary700";
  const disabledStyles =
    "bg-primary50 border border-primary/200 text-primary400";

  return (
    <button
      className={`p-[10px] rounded-md flex justify-center items-center gap-1 font-regular text-xs ${
        props.className && props.className
      } ${
        props.disabled
          ? disabledStyles
          : props.variant === "primary"
          ? primaryStyles
          : props.variant === "secondary"
          ? secondaryStyles
          : props.variant === "delete"
          ? deleteStyles
          : defaultStyles
      }`}
      onClick={props.onClick}
      disabled={props.disabled}
      type="button"
    >
      {props.icon && props.iconPosition === "left" && props.icon}
      {props.label && props.label}
      {props.icon && props.iconPosition === "right" && props.icon}
    </button>
  );
};
