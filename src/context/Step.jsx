import React, { createContext, useContext, useEffect, useState } from "react";
import { DataFormPublisherContext } from "./FormPublisher";

export const StepContext = createContext();

const initialSteps = [
  {
    step: 1,
    label: "Publisher Info",
    disabled: false,
    isFinished: false,
  },
  {
    step: 2,
    label: "PIC & Affiliations",
    disabled: true,
    isFinished: false,
  },
];

const StepProvider = ({ children }) => {
  const { form, contactForm, isFormFilled } = useContext(
    DataFormPublisherContext
  );
  const [steps, setSteps] = useState(initialSteps);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const handleNextStep = () => {
    setActiveStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePreviousStep = () => {
    setActiveStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const updateStepStatus = (index, data) => {
    setSteps((prevSteps) =>
      prevSteps.map((step, i) => (i === index ? { ...step, ...data } : step))
    );
  };

  useEffect(() => {
    if (isFormFilled()) {
      updateStepStatus(0, { isFinished: true });
      updateStepStatus(1, { disabled: false });
    }
  }, [form, contactForm]);

  return (
    <StepContext.Provider
      value={{
        steps,
        activeStepIndex,
        setActiveStepIndex,
        setSteps,
        handleNextStep,
        handlePreviousStep,
        updateStepStatus,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

export default StepProvider;
