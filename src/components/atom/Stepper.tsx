import React from "react";
import { FaCheck } from "react-icons/fa6";

export type StepperProps = {
  step: number;
  onClick?: (step: number) => void;
  isFinished: boolean;
  disabled: boolean;
  label: string;
};

export const Stepper = ({
  step,
  onClick,
  isFinished,
  disabled,
  label,
}: StepperProps) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(step);
    }
  };

  return (
    <div
      className={`flex items-center gap-3 ${
        disabled ? "cursor-not-allowed" : "cursor-pointer hover:opacity-90"
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
    >
      {step > 1 && (
        <hr
          className={`w-9 h-[2px] ${
            disabled ? "bg-primary300" : "bg-primary500"
          }`}
        />
      )}

      <div
        className={`p-2 h-8 w-8 rounded-md flex items-center justify-center transition-colors duration-200 ${
          disabled
            ? "bg-primary50"
            : isFinished
            ? "bg-secondary600"
            : "bg-primary950"
        }`}
      >
        {isFinished ? (
          <FaCheck className="text-white text-lg" />
        ) : (
          <span
            className={`font-regular ${
              disabled ? "text-primary400" : "text-white"
            }`}
          >
            {step}
          </span>
        )}
      </div>

      <p
        className={`font-regular text-xs transition-colors duration-200 ${
          disabled ? "text-primary400" : "text-primary950"
        }`}
      >
        {label}
      </p>
    </div>
  );
};
