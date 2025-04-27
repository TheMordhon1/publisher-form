import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { TrashIcon } from "../../assets/icons/icon-trash";
import { API_URL_ADDRESS } from "../../constants/endpoint";
import { DataFormPublisherContext } from "../../context/FormPublisher";
import { ButtonComp } from "../atom/Button";
import { InputField } from "../atom/InputField";
import { SelectField } from "../atom/Select";

const initialAddressState = {
  province: [],
  city: [],
  district: [],
  subDistrict: [],
  postalCode: [],
};

export const FormContactAddress = () => {
  const {
    contactForm,
    setContactForm,
    addPhoneNumber,
    removePhoneNumber,
    handlePhoneNumberChange,
  } = useContext(DataFormPublisherContext);

  const [address, setAddress] = useState(initialAddressState);

  const [location, setLocation] = useState({
    province: { id: "", text: "", isOpen: false },
    city: { id: "", text: "", isOpen: false },
    district: { id: "", text: "", isOpen: false },
    subDistrict: { id: "", text: "", isOpen: false },
    postalCode: { id: "", text: "", isOpen: false },
  });

  const handleFormChange = (e, transformFn) => {
    const value = transformFn ? transformFn(e.target.value) : e.target.value;
    setContactForm((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handleChangeLocation = (fieldName, option) => {
    const resetChain = {
      province: ["city", "district", "subDistrict", "postalCode"],
      city: ["district", "subDistrict", "postalCode"],
      district: ["subDistrict", "postalCode"],
      subDistrict: ["postalCode"],
      postalCode: [],
    };

    // Update contactForm
    setContactForm((prev) => {
      const updated = {
        ...prev,
        [fieldName]: option.text,
      };

      resetChain[fieldName]?.forEach((field) => {
        updated[field] = "";
      });

      return updated;
    });

    // Update location
    setLocation((prev) => {
      const updated = {
        ...prev,
        [fieldName]: {
          id: option.id,
          text: option.text,
          isOpen: false,
        },
      };

      resetChain[fieldName]?.forEach((field) => {
        updated[field] = { id: "", text: "", isOpen: false };
      });

      return updated;
    });

    // Reset address state
    setAddress((prev) => {
      const updated = { ...prev };
      resetChain[fieldName]?.forEach((field) => {
        updated[field] = [];
      });
      return updated;
    });
  };

  // get province
  useEffect(() => {
    const fetchProvince = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${API_URL_ADDRESS}/provinsi/get/
    `,
        });

        const data = response.data;
        setAddress((prev) => ({
          ...prev,
          province: data.result,
        }));
      } catch (error) {
        console.log("Error get province", error);
      }
    };

    if (address?.province?.length === 0 && location.province.isOpen) {
      fetchProvince();
    }
  }, [address.province, location.province.isOpen]);

  // get city
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${API_URL_ADDRESS}/kabkota/get/?d_provinsi_id=${location.province.id}`,
        });

        const data = response.data;
        setAddress((prev) => ({
          ...prev,
          city: data.result,
        }));
      } catch (error) {
        console.log("Error get city", error);
      }
    };

    if (location.city.isOpen) {
      fetchCity();
    }
  }, [location.city.isOpen]);

  // get district
  useEffect(() => {
    const fetchDistrict = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${API_URL_ADDRESS}/kecamatan/get/?d_kabkota_id=${location.city.id}`,
        });

        const data = response.data;
        setAddress((prev) => ({
          ...prev,
          district: data.result,
        }));
      } catch (error) {
        console.log("Error get district", error);
      }
    };

    if (location.district.isOpen) {
      fetchDistrict();
    }
  }, [location.district.isOpen]);

  // get subdistric
  useEffect(() => {
    const fetchSubDistrict = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${API_URL_ADDRESS}/kelurahan/get/?d_kecamatan_id=${location.district.id}`,
        });

        const data = response.data;
        setAddress((prev) => ({
          ...prev,
          subDistrict: data.result,
        }));
      } catch (error) {
        console.log("Error get subDistrict", error);
      }
    };

    if (location.subDistrict.isOpen) {
      fetchSubDistrict();
    }
  }, [location.subDistrict.isOpen]);

  // get postal code
  useEffect(() => {
    const fetchPostalCode = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${API_URL_ADDRESS}/kodepos/get/?d_kabkota_id=${location.city.id}&d_kecamatan_id=${location.district.id}`,
        });

        const data = response.data;
        setAddress((prev) => ({
          ...prev,
          postalCode: data.result,
        }));
      } catch (error) {
        console.log("Error get postalCode", error);
      }
    };

    if (location.postalCode.isOpen) {
      fetchPostalCode();
    }
  }, [location.postalCode.isOpen]);

  return (
    <>
      <h2 className="text-primary900 font-semibold py-3 px-5 bg-primary50 w-full rounded-md block mt-8">
        Contact & Address
      </h2>

      <div className="grid gap-5 mt-5">
        <div className="flex flex-wrap gap-5">
          <div className="grid gap-5 flex-1">
            {contactForm.phoneNumbers.map((phoneNumber, index) => (
              <InputField
                key={index}
                label={index === 0 ? `Phone Number` : undefined}
                placeholder="e.g. 81234567890"
                name={`phoneNumber-${index}`}
                type="text"
                value={phoneNumber}
                onChange={(e) =>
                  handlePhoneNumberChange(
                    index,
                    e.target.value.replace(/[^0-9]/g, "").replace(/^0+/, "")
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
                  index === 0 ? (
                    <ButtonComp
                      variant="secondary"
                      label={<GoPlus size={18} />}
                      className="ml-5 w-11"
                      onClick={() => addPhoneNumber()}
                    />
                  ) : (
                    <ButtonComp
                      variant="delete"
                      label={<TrashIcon />}
                      className="ml-5 w-11"
                      onClick={() => removePhoneNumber(index)}
                    />
                  )
                }
              />
            ))}
          </div>

          <InputField
            label="Contact Name"
            placeholder="e.g. Soleh Solihun"
            name="contactName"
            type="text"
            value={contactForm.contactName}
            minLength={2}
            onChange={(e) => handleFormChange(e, (value) => value)}
            className="flex-1"
            errorMessage="Required, at least 2 characters."
            required
          />
        </div>

        <div className="flex flex-wrap gap-5">
          <InputField
            label="Email"
            placeholder="e.g. johndoe123@gmail.com"
            name="email"
            type="email"
            value={contactForm.email}
            onChange={(e) => handleFormChange(e)}
            required
            className="flex-1"
            errorMessage="Required, must be a valid email."
          />

          <InputField
            label="Website"
            placeholder="Website Link"
            name="website"
            type="text"
            value={contactForm.wesbsite}
            onChange={(e) => handleFormChange(e)}
            className="flex-1 border-l-0 rounded-l-none"
            error={contactForm.wesbsite === null ? "Email is required" : ""}
            customComponentOnLeft={
              <span className="text-secondary600 font-medium  font-regular text-sm bg-secondary50 p-3 border border-secondary600/20 rounded-l-lg flex items-center justify-center">
                https://
              </span>
            }
          />
        </div>

        <div className="flex flex-wrap gap-5">
          <InputField
            label="Correspondence Address"
            placeholder="e.g. Jalan Kalibata Utara No. 2"
            name="correspondenceAddress"
            type="text"
            value={contactForm.correspondenceAddress}
            onChange={(e) => handleFormChange(e)}
            required
            className="flex-1"
            minLength={5}
            errorMessage="Required, at least 5 characters."
          />
          <div className="flex flex-wrap gap-5 flex-1">
            <SelectField
              label="Province"
              placeholder="Select Province"
              name="province"
              value={contactForm.province}
              onClick={() =>
                setLocation((prev) => ({
                  ...prev,
                  province: { ...prev.province, isOpen: true },
                }))
              }
              onBlur={() =>
                setLocation((prev) => ({
                  ...prev,
                  province: { ...prev.province, isOpen: false },
                }))
              }
              onChange={(option) => handleChangeLocation("province", option)}
              required
              className="flex-1"
              options={address.province}
            />
            <SelectField
              label="City"
              placeholder="Select City"
              name="city"
              value={contactForm.city}
              onClick={() =>
                setLocation((prev) => ({
                  ...prev,
                  city: { ...prev.city, isOpen: true },
                }))
              }
              onBlur={() =>
                setLocation((prev) => ({
                  ...prev,
                  city: { ...prev.city, isOpen: false },
                }))
              }
              onChange={(option) => handleChangeLocation("city", option)}
              required
              className="flex-1"
              options={address.city}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-5 flex-1">
          <div className="flex flex-wrap gap-5 flex-1">
            <SelectField
              label="District"
              placeholder="Select District"
              name="district"
              value={contactForm.district}
              onClick={() =>
                setLocation((prev) => ({
                  ...prev,
                  district: { ...prev.district, isOpen: true },
                }))
              }
              onBlur={() =>
                setLocation((prev) => ({
                  ...prev,
                  district: { ...prev.district, isOpen: false },
                }))
              }
              onChange={(option) => handleChangeLocation("district", option)}
              required
              className="flex-1"
              options={address.district}
            />
            <SelectField
              label="Subdistrict"
              placeholder="Select Subdistrict"
              name="subDistrict"
              value={contactForm.subDistrict}
              onClick={() =>
                setLocation((prev) => ({
                  ...prev,
                  subDistrict: { ...prev.subDistrict, isOpen: true },
                }))
              }
              onBlur={() =>
                setLocation((prev) => ({
                  ...prev,
                  subDistrict: { ...prev.subDistrict, isOpen: false },
                }))
              }
              onChange={(option) => handleChangeLocation("subDistrict", option)}
              required
              className="flex-1"
              options={address.subDistrict}
            />
          </div>
          <div className="flex flex-wrap gap-5 flex-1">
            <SelectField
              label="Postal Code"
              placeholder="Select Postal Code"
              name="postalCode"
              value={contactForm.postalCode}
              onClick={() =>
                setLocation((prev) => ({
                  ...prev,
                  postalCode: { ...prev.postalCode, isOpen: true },
                }))
              }
              onBlur={() =>
                setLocation((prev) => ({
                  ...prev,
                  postalCode: { ...prev.postalCode, isOpen: false },
                }))
              }
              onChange={(option) => handleChangeLocation("postalCode", option)}
              required
              className="flex-1"
              options={address.postalCode}
            />
            
            <InputField
              label="RT"
              placeholder="e.g. 001"
              name="RT"
              type="number"
              value={contactForm.RT}
              onChange={(e) => handleFormChange(e,  (value) => value))}
              className="flex-1"
              maxLength={3}
              errorMessage="At least 3 characters."
            />
            
            <InputField
              label="RW"
              placeholder="e.g. 001"
              name="RW"
              type="number"
              value={contactForm.RW}
              onChange={(e) => handleFormChange(e, (value) => value)}
              className="flex-1"
              maxLength={3}
              errorMessage="At least 3 characters."
            />
          </div>
        </div>
      </div>
    </>
  );
};
