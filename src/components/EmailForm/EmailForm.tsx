import { Button, Input } from "@govtechsg/tradetrust-ui-components";
import { OverlayContext, Textual } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Checkbox } from "./../UI/Checkbox";
import { TextareaDefault } from "./../UI/Textarea";

// https://docs.netlify.com/forms/setup/#submit-javascript-rendered-forms-with-ajax
export const encode: any = (data: { [x: string]: string | number | boolean }) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export const EmailForm: FunctionComponent = () => {
  const { showOverlay } = useContext(OverlayContext);
  const [form, setForm] = useState({
    "Receive communications": "No",
  });
  const history = useHistory();

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
        history.push("/email/error");
      });

    event.preventDefault();
  };

  const onOverlayHandler = () => {
    showOverlay(
      <Textual title="Consent to process data *" className="max-w-md py-8 px-12">
        <p>
          In order to contact you or provide the content requested, we need to store and process the personal data you
          provide us. If you consent to us storing your personal data for this purpose, please tick the checkbox.
        </p>
      </Textual>
    );
  };

  return (
    <form name="contact" onSubmit={handleFormSubmit}>
      <input type="hidden" name="form-name" value="contact" />
      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="bg-white shadow-xl rounded-xl p-8">
            <Input
              type="text"
              name="Full Name"
              placeholder="* Full Name"
              required
              onChange={handleInputOrTextareaChange}
              className="mb-4 rounded"
            />
            <Input
              type="email"
              name="Email"
              placeholder="* Email Address"
              required
              onChange={handleInputOrTextareaChange}
              className="mb-4 rounded"
            />
            <Input
              type="text"
              name="Organisation"
              placeholder="* Name of your organisation"
              required
              onChange={handleInputOrTextareaChange}
              className="mb-4 rounded"
            />
            <TextareaDefault
              name="Message"
              placeholder="Message"
              onChange={handleInputOrTextareaChange}
              className="rounded"
            />
            <div className="my-4">
              <p className="mb-2">You can unsubscribe from these communications at any time.</p>
              <Checkbox name="Receive communications" onChange={handleCheckboxChange}>
                I agree to receive other communications from TradeTrust.
              </Checkbox>
              <Checkbox name="Personal Data" required>
                * I agree to allow TradeTrust to{" "}
                <span className="underline cursor-pointer" onClick={onOverlayHandler}>
                  store and process my personal data
                </span>
                .
              </Checkbox>
              <p className="mt-8 font-medium">*Mandatory</p>
            </div>
            <Button className="text-white bg-cerulean hover:bg-cerulean-300 rounded-xl">Submit</Button>
          </div>
        </div>
      </div>
    </form>
  );
};
