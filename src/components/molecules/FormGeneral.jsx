import React, { useContext } from "react";
import { DataFormPublisherContext } from "../../context/FormPublisher";
import { InputField } from "../atom/InputField";
import { RadioButton } from "../atom/RadioButton";

export const FormGeneral = () => {
  const { form, setForm } = useContext(DataFormPublisherContext);

  const handleControlChange = (e) => {
    setForm((prev) => ({
      ...prev,
      control: e.target.value === "yes",
    }));
  };

  const handleFormChange = (e, transformFn) => {
    const value = transformFn && transformFn(e.target.value);
    setForm((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  return (
    <>
      <h2 className="text-primary900 font-semibold py-3 px-5 bg-primary50 w-full rounded-md block">
        General
      </h2>

      <div className="flex flex-wrap gap-5 mt-5">
        <div className="flex flex-col gap-2">
          <p className="text-primary900 font-medium text-sm">
            Control <span className="text-error font-regular">*</span>
          </p>
          <div className="flex gap-5 py-4 h-[50px]">
            <RadioButton
              label="Yes"
              value="yes"
              checked={form.control === true}
              onChange={handleControlChange}
            />
            <RadioButton
              label="No"
              value="no"
              checked={form.control === false}
              onChange={handleControlChange}
            />
          </div>
        </div>

        <InputField
          label="Publisher Name"
          placeholder="e.g. CV Sinar Mulya"
          name="publisherName"
          type="text"
          value={form.publisherName}
          onChange={(e) => handleFormChange(e, (value) => value)}
          required
          className="flex-1"
          minLength={3}
          errorMessage="Required, at least 3 characters."
        />

        <InputField
          label="Publisher Code"
          placeholder="e.g. ABC"
          name="publisherCode"
          value={form.publisherCode}
          onChange={(e) => handleFormChange(e, (value) => value)}
          required
          maxLength={10}
          className="flex-1"
        />

        <InputField
          label="IPI Number"
          placeholder="Must be 11 Digits"
          name="IPINumber"
          type="number"
          minLength={11}
          maxLength={11}
          value={form.IPINumber}
          onChange={(e) =>
            handleFormChange(e, (value) =>
              value.startsWith("0") ? value.slice(1) : value
            )
          }
          className="flex-1"
          errorMessage="Must be exactly 11 digits."
        />
      </div>
    </>
  );
};
