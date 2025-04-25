import React, { useContext } from "react";
import { SelectField } from "../atom/Select";
import { DataFormPIC_AffiliationContext } from "../../context/FormPIC_Affiliation";

export const FormAffiliation = () => {
  const { formAffiliation, setFormAffiliation } = useContext(
    DataFormPIC_AffiliationContext
  );

  const handleFormChange = (name, value) => {
    setFormAffiliation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(formAffiliation);
  return (
    <div className="flex flex-col flex-1 gap-5">
      <h2 className="text-primary900 font-semibold text-base py-3 px-5 bg-primary50 w-full rounded-md block">
        Affiliations
      </h2>

      <div className="grid gap-5">
        <SelectField
          label="Capacity"
          placeholder="Select Capacity"
          name="capacity"
          value={formAffiliation.capacity}
          onChange={(option) => handleFormChange("capacity", option.text)}
          required
          className="flex-1"
          options={[
            { id: "1", text: "Producer" },
            { id: "2", text: "Performer" },
            { id: "3", text: "Label Representative" },
          ]}
        />
        <SelectField
          label="Performance Society Affiliations"
          placeholder="Select Performance Society Affiliations"
          name="performanceSocietyAffiliations"
          value={formAffiliation.performanceSocietyAffiliations}
          onChange={(option) =>
            handleFormChange("performanceSocietyAffiliations", option.text)
          }
          required
          className="flex-1"
          options={[
            { id: "1", text: "WAMI" },
            { id: "2", text: "RAI" },
            { id: "3", text: "Other" },
          ]}
        />
        <SelectField
          label="Mechanical Society Affiliations"
          placeholder="Select Mechanical Society Affiliations"
          name="mechanicalSocietyAffiliations"
          value={formAffiliation.mechanicalSocietyAffiliations}
          onChange={(option) =>
            handleFormChange("mechanicalSocietyAffiliations", option.text)
          }
          required
          className="flex-1"
          options={[
            { id: "1", text: "KCI" },
            { id: "2", text: "LMK" },
            { id: "3", text: "None" },
          ]}
        />
        <SelectField
          label="Synchronization Society Affiliations"
          placeholder="Select Synchronization Society Affiliations"
          name="synchronizationSocietyAffiliations"
          value={formAffiliation.synchronizationSocietyAffiliations}
          onChange={(option) =>
            handleFormChange("synchronizationSocietyAffiliations", option.text)
          }
          required
          className="flex-1"
          options={[
            { id: "1", text: "WAMI" },
            { id: "2", text: "LMK" },
            { id: "3", text: "Other" },
          ]}
        />
      </div>
    </div>
  );
};
