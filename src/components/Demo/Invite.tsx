import { Button, Input, OverlayContext, Textual } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent, useContext, useState } from "react";
import { Checkbox } from "../UI/Checkbox";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../common/contexts/AuthenticationContext";
import { useProviderContext } from "../../common/contexts/provider";

// https://docs.netlify.com/forms/setup/#submit-javascript-rendered-forms-with-ajax
export const encode: any = (data: { [x: string]: string | number | boolean }) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export const Invite: FunctionComponent = () => {
  // const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [form, setForm] = useState({
    "Receive communications": "No",
    email: "",
  });

  const { login } = useAuthContext();
  const { upgradeToMagicSigner } = useProviderContext();

  const { showOverlay } = useContext(OverlayContext);
  const history = useHistory();

  const handleInputOrTextareaChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.checked ? "Yes" : "No" });
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

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    try {
      event.preventDefault();
      // if (!form.email) setInputErrorMessage("Please enter an email address");
      // await magic.auth.loginWithMagicLink({ email: form.email });
      await login(form.email);
      await upgradeToMagicSigner();
      history.push("/demo");
    } catch (e) {
      console.log("CATCH: " + e);
    }
  };

  return (
    <form name="invite" onSubmit={handleFormSubmit}>
      <div className="flex flex-wrap mt-4">
        <div className="w-full bg-white rounded-xl shadow-xl p-6 lg:w-2/3">
          <h5>
            Take the TradeTrust User Journey and have a hands-on experience on how easy it is to streamline your
            operations using TradeTrust
          </h5>
          <p className="mt-8">
            To start using the demo, please key in your email address to create a free temporary cryptocurrency wallet.
            Please take note that <span className="font-bold">all documents</span> created from this demo{" "}
            <span className="font-bold"> can only be recognise via this demo</span>
          </p>
          <Input
            name="email"
            className="w-full mt-8"
            placeholder="Email address"
            onChange={handleInputOrTextareaChange}
            // errorMessage={inputErrorMessage}
          />
          <div className="mt-8">
            <p>You can unsubscribe from these communications at any time.</p>
            <Checkbox name="Receive communications" onChange={handleCheckboxChange}>
              <p>I agree to receive other communications from TradeTrust.</p>
            </Checkbox>
            <Checkbox name="Personal Data" required>
              <p>
                * I agree to allow TradeTrust to{" "}
                <span className="underline cursor-pointer" onClick={onOverlayHandler}>
                  store and process my personal data
                </span>
                .
              </p>
            </Checkbox>
          </div>
          <Button className="bg-cerulean text-white mt-8 hover:bg-cerulean-300">
            <h5>Submit</h5>
          </Button>
        </div>
        <div className="mx-auto my-8 w-1/2 lg:w-1/3">
          <img src="/static/images/faq/faq-person.png" alt="FAQ person" />
        </div>
      </div>
    </form>
  );
};
