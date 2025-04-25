import React, { createContext, useState } from "react";

export const DataFormPIC_AffiliationContext = createContext();

const initialForm = {
  name: "",
  role: "",
  gender: "",
  email: "",
  phoneNumbers: [""],
};

const initialAffiliation = {
  capacity: "",
  performanceSocietyAffiliations: "",
  mechanicalSocietyAffiliations: "",
  synchronizationSocietyAffiliations: "",
};

const DataFormPIC_AffiliationProvider = ({ children }) => {
  const [forms, setForms] = useState([initialForm]);
  const [formAffiliation, setFormAffiliation] = useState(initialAffiliation);

  const addFormPIC = () => {
    setForms((prev) => [...prev, { ...initialForm }]);
  };

  const removeFormPIC = (index) => {
    setForms((prev) => prev.filter((_, i) => i !== index));
  };

  const addPhoneNumber = (formIndex) => {
    setForms((prevForms) => {
      return prevForms.map((form, index) => {
        if (index === formIndex) {
          return {
            ...form,
            phoneNumbers: [...form.phoneNumbers, ""],
          };
        }
        return form;
      });
    });
  };

  const removePhoneNumber = (formIndex, phoneIndex) => {
    setForms((prevForms) => {
      const updatedForms = [...prevForms];
      updatedForms[formIndex].phoneNumbers = updatedForms[
        formIndex
      ].phoneNumbers.filter((_, i) => i !== phoneIndex);
      return updatedForms;
    });
  };

  const handlePhoneNumberChange = (formIndex, phoneIndex, value) => {
    setForms((prevForms) => {
      const updatedForms = [...prevForms];
      const updatedPhoneNumbers = [...updatedForms[formIndex].phoneNumbers];

      updatedPhoneNumbers[phoneIndex] = value;
      updatedForms[formIndex] = {
        ...updatedForms[formIndex],
        phoneNumbers: updatedPhoneNumbers,
      };

      return updatedForms;
    });
  };

  return (
    <DataFormPIC_AffiliationContext.Provider
      value={{
        forms,
        setForms,
        formAffiliation,
        setFormAffiliation,
        addFormPIC,
        removeFormPIC,
        addPhoneNumber,
        removePhoneNumber,
        handlePhoneNumberChange,
      }}
    >
      {children}
    </DataFormPIC_AffiliationContext.Provider>
  );
};

export default DataFormPIC_AffiliationProvider;
