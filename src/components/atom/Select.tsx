import React, { useState, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

type Option = {
  id: string;
  text: string;
};

type SelectFieldProps = {
  name?: string;
  placeholder?: string;
  value?: string;
  onChange: (selected: Option) => void;
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  className?: string;
  options: Option[];
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
};

export const SelectField = (props: SelectFieldProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputClick = () => {
    props.onClick();
    setShowOptions(true);
  };

  const handleOptionClick = (option: Option) => {
    props.onChange(option);
    setShowOptions(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setShowOptions(false);
      props.onBlur && props?.onBlur(e);
    }
  };

  return (
    <div
      className={`flex flex-col gap-2 ${props.className}`}
      ref={containerRef}
      onBlur={handleBlur}
      tabIndex={-1}
    >
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
      <div
        className={`flex items-center relative rounded-lg font-regular text-primary400 text-sm placeholder:text-sm placeholder:text-primary400 placeholder:font-regular ${
          showOptions ? "border border-secondary600" : "border"
        }`}
      >
        <input
          name={props.name}
          type="text"
          placeholder={props.placeholder}
          value={props.options.find((o) => o.text === props.value)?.text || ""}
          readOnly
          disabled={props.disabled}
          onFocus={
            props.onClick !== undefined
              ? handleInputClick
              : () => setShowOptions(true)
          }
          className="p-3 rounded-lg focus:outline-none b cursor-pointer flex-1 text-primary900 placeholder:text-primary400 "
        />
        {showOptions && props.options && (
          <div className="absolute left-0 top-full mt-1 w-full z-10 max-h-40 overflow-auto bg-neutral border border-primary100 rounded-lg p-2 shadow-sm">
            {props.options.map((option, index) => (
              <div
                key={index}
                className="p-2 hover:bg-primary50 px-5 py-3 rounded-lg cursor-pointer flex justify-between items-center"
                tabIndex={0}
                onClick={() => handleOptionClick(option)}
              >
                <span className="font-medium text-primary900">
                  {option.text}
                </span>
                {/* {option.label === } */}
              </div>
            ))}
          </div>
        )}
        <FaChevronDown className="mr-3 absolute right-2 pointer-events-none" />
      </div>
    </div>
  );
};
