import React, { useContext } from "react";
import { StepContext } from "../../context/Step";
import { Stepper } from "../atom/Stepper";

export const Steppers = () => {
  const { steps, activeStepIndex, setActiveStepIndex } =
    useContext(StepContext);

  const handleStepOnClick = (index) => {
    if (!steps[index].disabled) {
      setActiveStepIndex(index);
    }
  };

  console.log(activeStepIndex);
  return (
    <div className="flex items-center gap-3">
      {steps.map((step, index) => (
        <Stepper
          key={index}
          step={step.step}
          onClick={() => handleStepOnClick(index)}
          isFinished={step.isFinished}
          disabled={step.disabled}
          label={step.label}
          isActive={index === activeStepIndex}
        />
      ))}
    </div>
  );
};
