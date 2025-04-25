import React from "react";
import { FormAffiliation } from "../molecules/FormAffiliation";
import { FormPIC } from "../molecules/FormPIC";

export const FormPIC_Affiliations = () => {
  return (
    <div className="p-5 flex flex-1 flex-wrap gap-8">
      <FormPIC />
      <FormAffiliation />
    </div>
  );
};
