import React, { createContext, useState } from "react";

export const DataFormPublisherContext = createContext();

const DataFormPublisherProvider = ({ children }) => {
  const [form, setForm] = useState({
    control: false,
    publisherName: "",
    publisherCode: "",
    IPINumber: "",
  });
  const [contactForm, setContactForm] = useState({
    phoneNumbers: [""],
    contactName: "",
    email: "",
    website: "",
    correspondenceAddress: "",
    province: "",
    city: "",
    district: "",
    subDistrict: "",
    postalCode: "",
    RT: "",
    RW: "",
  });

  const addPhoneNumber = () => {
    setContactForm((prev) => ({
      ...prev,
      phoneNumbers: [...prev.phoneNumbers, ""],
    }));
  };

  const removePhoneNumber = (index) => {
    setContactForm((prev) => ({
      ...prev,
      phoneNumbers: Array.isArray(prev.phoneNumbers)
        ? prev.phoneNumbers.filter((_, i) => i !== index)
        : [],
    }));
  };

  const handlePhoneNumberChange = (index, value) => {
    const updatedPhoneNumbers = [...contactForm.phoneNumbers];
    updatedPhoneNumbers[index] = value;
    setContactForm((prev) => ({
      ...prev,
      phoneNumbers: updatedPhoneNumbers,
    }));
  };

  const isFormFilled = () => {
    const formFilled = form.publisherName && form.publisherCode;
    const contactFilled =
      contactForm.contactName &&
      contactForm.email &&
      contactForm.phoneNumbers.every((phone) => phone !== "");
    contactForm.province;
    contactForm.city;
    contactForm.district;
    contactForm.subDistrict;
    contactForm.postalCode;

    return formFilled && contactFilled;
  };

  return (
    <DataFormPublisherContext.Provider
      value={{
        form,
        setForm,
        contactForm,
        setContactForm,
        addPhoneNumber,
        removePhoneNumber,
        handlePhoneNumberChange,
        isFormFilled,
      }}
    >
      {children}
    </DataFormPublisherContext.Provider>
  );
};

export default DataFormPublisherProvider;
