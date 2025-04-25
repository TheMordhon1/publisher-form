import React, { useContext } from "react";

import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { ButtonComp } from "./components/atom/Button";

import { FormPIC_Affiliations } from "./components/organism/FormPIC_Affiliations";
import { FormPublisher } from "./components/organism/FormPublisher";

import { StepContext } from "./context/Step";
import { Steppers } from "./components/molecules/Steppers";

export default function App() {
  const {
    steps,
    activeStepIndex,
    setActiveStepIndex,
    handleNextStep,
    handlePreviousStep,
  } = useContext(StepContext);

  const currentStep = steps[activeStepIndex];

  return (
    <section className="px-10 pt-24 pb-16 bg-primary50 min-h-screen flex flex-col">
      <h1 className="font-semibold text-xl leading-5 text-primary900">
        Create Publisher
      </h1>

      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-center border border-b-0 border-primary100 rounded-tl-xl rounded-tr-xl py-[17px] bg-neutral mt-[30px] p-5">
          <Steppers />
        </div>

        <div className="flex flex-1 border border-primary100 py-[17px] bg-neutral">
          {activeStepIndex === 0 && <FormPublisher />}
          {activeStepIndex === 1 && <FormPIC_Affiliations />}
        </div>

        <div className="flex items-center justify-end gap-3 border border-t-0 border-primary100 rounded-bl-xl rounded-br-xl py-[17px] px-5 bg-neutral">
          <ButtonComp
            label="Previous"
            disabled={activeStepIndex === 0}
            onClick={handlePreviousStep}
            icon={<FaArrowLeftLong />}
            iconPosition="left"
          />
          <ButtonComp
            label={activeStepIndex === steps.length - 1 ? "Save" : "Next"}
            variant="primary"
            onClick={
              activeStepIndex === steps.length - 1 ? undefined : handleNextStep
            }
            icon={
              activeStepIndex === steps.length - 1 ? null : <FaArrowRightLong />
            }
            iconPosition="right"
          />
        </div>
      </div>
    </section>
  );
}
