import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ButtonSolidOrangeWhite } from "./../UI/Button";
import { InputDefault } from "./../UI/Input";
import { TextareaDefault } from "./../UI/Textarea";
import { CheckboxDefault } from "./../UI/Checkbox";
import { SelectDefault } from "./../UI/Select";

export const optionsBusiness = [
  { value: "Shipper", label: "Shipper" },
  { value: "Shipping line", label: "Shipping line" },
  { value: "Public Sector", label: "Public Sector" },
  { value: "Tech/Platform Provider", label: "Tech/Platform Provider" },
  { value: "Port Operator", label: "Port Operator" },
  { value: "International Organisation", label: "International Organisation" },
  { value: "Trade Association", label: "Trade Association" },
  { value: "Others", label: "Others" },
];

export const optionsRegion = [
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Middle East", label: "Middle East" },
  { value: "Oceania", label: "Oceania" },
  { value: "North America", label: "North America" },
  { value: "South Amercia", label: "South Amercia" },
  { value: "Africa", label: "Africa" },
];

export const encode = (data: { [x: string]: string | number | boolean }) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export const EmailForm = () => {
  const [selectedBusiness, setSelectedBusiness] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [form, setForm] = useState({
    "Receive communications": "No",
  } as any);
  const history = useHistory();

  const handleSelectedBusiness = (option: any) => {
    setSelectedBusiness(option);

    setForm({ ...form, ["Business Category"]: option[0].value });
  };

  const handleSelectedRegion = (option: any) => {
    setSelectedRegion(option);

    setForm({ ...form, ["Region of Operations"]: option[0].value });
  };

  const handleInputOrTextareaChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.checked ? "Yes" : "No" });
  };

  const handleFormSubmit = (event: { preventDefault: () => void }) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...form }),
    })
      .then(() => {
        history.push("/email/success");
      })
      .catch((error) => {
        console.log(error);
      });

    event.preventDefault();
  };

  return (
    <form name="contact" className="my-4" onSubmit={handleFormSubmit}>
      <input type="hidden" name="form-name" value="contact" />
      <div className="row">
        <div className="col-12 col-md-7 col-xl-5 mx-auto">
          <InputDefault
            type="text"
            name="Full Name"
            placeholder="Full Name"
            required
            onChange={handleInputOrTextareaChange}
          />
          <InputDefault
            type="email"
            name="Email"
            placeholder="Email Address"
            required
            onChange={handleInputOrTextareaChange}
          />
          <InputDefault
            type="text"
            name="Organisation"
            placeholder="Name of your organisation"
            required
            onChange={handleInputOrTextareaChange}
          />
          <SelectDefault
            name="Business Category"
            values={selectedBusiness}
            onChange={handleSelectedBusiness}
            options={optionsBusiness}
            placeholder="Please select your business category"
            required
          />
          <SelectDefault
            name="Region of Operations"
            values={selectedRegion}
            onChange={handleSelectedRegion}
            options={optionsRegion}
            placeholder="Please select your region of operations"
            required
          />
          <TextareaDefault name="Message" placeholder="Message" required onChange={handleInputOrTextareaChange} />
          <div className="my-4">
            <div className="mb-4">
              <h6>Consent to communicate</h6>
              <p>
                TradeTrust is committed to protecting and respecting your privacy. From time to time, we would like to
                contact you about our products and services, as well as other content that may be of interest to you. If
                you consent to us contacting you for this purpose, please tick below.
              </p>
            </div>
            <div className="mb-4">
              <h6>Consent to process data *</h6>
              <p>
                In order to contact you or provide the content requested, we need to store and process the personal data
                you provide us. If you consent to us storing your personal data for this purpose, please tick the
                checkbox below.
              </p>
            </div>
            <div className="mb-4">
              <p>You can unsubscribe from these communications at any time.</p>
            </div>
            <CheckboxDefault
              name="Receive communications"
              text="I agree to receive other communications from TradeTrust."
              onChange={handleCheckboxChange}
            />
            <CheckboxDefault
              name="Personal Data"
              text="I agree to allow TradeTrust to store and process my personal data.*"
              required
            />
          </div>
          <ButtonSolidOrangeWhite className="w-100">Send Enquiry</ButtonSolidOrangeWhite>
        </div>
      </div>
    </form>
  );
};
