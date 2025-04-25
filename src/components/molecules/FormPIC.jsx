import React from "react";
import { useContext } from "react";
import { DataFormPIC_AffiliationContext } from "../../context/FormPIC_Affiliation";
import { ButtonComp } from "../atom/Button";
import { TrashIcon } from "../../assets/icons/icon-trash";
import { InputField } from "../atom/InputField";
import { SelectField } from "../atom/Select";
import { GoPlus } from "react-icons/go";

export const FormPIC = () => {
  const {
    forms,
    setForms,
    addFormPIC,
    removeFormPIC,
    addPhoneNumber,
    removePhoneNumber,
    handlePhoneNumberChange,
  } = useContext(DataFormPIC_AffiliationContext);

  const handleFormChange = (e, transformFn, index) => {
    const value = transformFn ? transformFn(e.target.value) : e.target.value;
    setForms((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [e.target.name]: value };
      return updated;
    });
  };

  return (
    <div className="flex flex-col flex-1 gap-5">
      <h2 className="text-primary900 font-semibold text-base py-3 px-5 bg-primary50 w-full rounded-md block">
        PIC
      </h2>
      {forms?.map(
        (form, index) =>
          form && (
            <div className="flex flex-col flex-1" key={index}>
              <div className="flex justify-between items-center py-3 px-5 bg-primary50 w-full border border-primary200 rounded-tl-lg rounded-tr-lg border-b-0">
                <h2 className="text-primary900 font-semibold text-lg ">
                  PIC{index + 1}
                </h2>

                {forms.length > 1 && (
                  <ButtonComp
                    variant="delete"
                    label={<TrashIcon />}
                    className="w-11"
                    onClick={() => removeFormPIC(index)}
                  />
                )}
              </div>
              <div className="flex flex-col gap-5 border border-primary200 rounded-bl-lg rounded-br-lg p-5">
                <div className="flex flex-wrap gap-5">
                  <InputField
                    label="Name"
                    placeholder="e.g. CV Sinar Mulya"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      handleFormChange(e, (value) => value, index)
                    }
                    required
                    className="flex-1"
                    minLength={2}
                    errorMessage="At least 2 characters."
                  />
                  <InputField
                    label="Role"
                    placeholder="e.g. CV Sinar Mulya"
                    name="role"
                    type="text"
                    value={form.role}
                    onChange={(e) =>
                      handleFormChange(e, (value) => value, index)
                    }
                    required
                    className="flex-1"
                    minLength={3}
                    errorMessage="Required, at least 3 characters."
                  />
                </div>

                <div className="flex flex-wrap gap-5">
                  <SelectField
                    label="Gender"
                    placeholder="Male"
                    name="gender"
                    value={form.gender}
                    onChange={(option) =>
                      handleFormChange(
                        { target: { name: "gender", value: option.text } },
                        (v) => v,
                        index
                      )
                    }
                    required
                    className="flex-1"
                    options={[
                      { id: 1, text: "Male" },
                      { id: 2, text: "Female" },
                    ]}
                  />
                  <InputField
                    label="Email"
                    placeholder="e.g. johndoe123@gmail.com"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleFormChange(e, undefined, index)}
                    required
                    className="flex-1"
                    errorMessage="Required, must be a valid email."
                  />
                </div>

                <div className="grid gap-5 flex-1">
                  {form.phoneNumbers.map((phoneNumber, phoneIndex) => (
                    <InputField
                      key={phoneIndex}
                      label={phoneIndex === 0 ? `Phone Number` : undefined}
                      placeholder="e.g. 81234567890"
                      name={`phoneNumber-${phoneIndex}`}
                      type="text"
                      value={phoneNumber}
                      onChange={(e) =>
                        handlePhoneNumberChange(
                          index,
                          phoneIndex,
                          e.target.value
                            .replace(/[^0-9]/g, "")
                            .replace(/^0+/, "")
                        )
                      }
                      className="flex-1 border-l-0 rounded-l-none"
                      required
                      customComponentOnLeft={
                        <span className="text-primary800 font-medium text-sm bg-primary50 p-3 border border-primary100 rounded-l-xl flex items-center justify-center">
                          <small>+</small>62
                        </span>
                      }
                      customComponentOnRight={
                        phoneIndex === 0 ? (
                          <ButtonComp
                            variant="secondary"
                            label={<GoPlus size={18} />}
                            className="ml-5 w-11"
                            onClick={() => addPhoneNumber(index)}
                          />
                        ) : (
                          <ButtonComp
                            variant="delete"
                            label={<TrashIcon />}
                            className="ml-5 w-11"
                            onClick={() => removePhoneNumber(index, phoneIndex)}
                          />
                        )
                      }
                    />
                  )) || null}
                </div>
              </div>
            </div>
          )
      )}

      <ButtonComp
        onClick={() => addFormPIC()}
        className="justify-start items-start"
        variant="secondary"
        label="Add Another PIC"
        icon={<GoPlus size={18} />}
        iconPosition="left"
      />
    </div>
  );
};
