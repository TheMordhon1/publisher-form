import React from "react";
import { FormContactAddress } from "../molecules/FormContactAddress";
import { FormGeneral } from "../molecules/FormGeneral";

export const FormPublisher = () => {
  return (
    <div className="p-5 w-full">
      <FormGeneral />
      <FormContactAddress />
    </div>
  );
};
