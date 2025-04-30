import { Button, Input } from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../../common/contexts/AuthenticationContext";
import { OverlayContext } from "../../../common/contexts/OverlayContext";
import { contentPdpa } from "../../../common/utils/overlay";
import { Checkbox } from "../../UI/Checkbox";
import { DemoCreateHeader } from "../DemoCreate/DemoCreateHeader";

export const DemoInitial: FunctionComponent = () => {
  const { login, isLoggedIn } = useAuthContext();
  const { showOverlay } = useContext(OverlayContext);
  const history = useHistory();

  const [form, setForm] = useState({
    "Receive communications": "No",
    email: "",
  });

  React.useLayoutEffect(() => {
    if (isLoggedIn) {
      history.push("/demo/create");
    }
  }, [isLoggedIn, history]);

  const handleInputOrTextareaChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onOverlayHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    showOverlay(contentPdpa);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      await login(form.email);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form className="mb-0" name="invite" onSubmit={handleFormSubmit}>
      <div className="mb-8">
        <DemoCreateHeader />
        <div className="mt-8">
          <p className="mb-2">
            To start using the demo, please key in your email address to create a free temporary cryptocurrency wallet.
          </p>
          <p>
            Please take note that <span className="font-gilroy-bold">all documents</span> created from this demo{" "}
            <span className="font-gilroy-bold"> can only be recognised via this demo</span>
          </p>
        </div>
      </div>
      <Input name="email" className="w-full" placeholder="Email address" onChange={handleInputOrTextareaChange} />
      <div className="mt-8">
        <p>You can unsubscribe from these communications at any time.</p>
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
      <Button className="bg-cerulean-500 text-white mt-8 hover:bg-cerulean-800">
        <h5>Submit</h5>
      </Button>
    </form>
  );
};
