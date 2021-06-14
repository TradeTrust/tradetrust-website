import React from "react";
import { useHistory } from "react-router-dom";
import { Input, Button, OverlayContent, useOverlayContext } from "@govtechsg/tradetrust-ui-components";
import { useAuthContext } from "../../common/contexts/AuthContext";
import { useProviderContext } from "../../common/contexts/provider";

interface FormInterface {
  email: string;
}

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// can be debounced, someone else can optimise this
const validateEmail = (email: string) => emailRegex.test(email);

export default function DemoModalContent() {
  const { login } = useAuthContext();
  const { upgradeToMagicSigner } = useProviderContext();
  const { setOverlayVisible } = useOverlayContext();
  const history = useHistory();
  const [form, setForm] = React.useState<FormInterface>({ email: "" });
  const [hasError, setHasError] = React.useState(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await login(form.email);
    await upgradeToMagicSigner();
    // at here check for ether balance
    // if 0 ethers, most likely a new sign up
    // if so then programmatically add an ether to it
    // else ignore.
    // can be taken up by someone else
    setOverlayVisible(false)
    history.push("/demo");
  };

  React.useEffect(() => {
    const isValid = validateEmail(form.email);
    setHasError(!isValid);
  }, [form.email]);

  return (
    <OverlayContent title="Request for Demo">
      <form className="my-6" onSubmit={handleFormSubmit}>
        <div>
          if youre interested, and would like to try out a demo, if you provide your email address in the input below,
          we will guide you through a demo to create a verifiable document in the browser. note that this created
          document will only be verifiable on the ROPSTEN testnet.
        </div>
        <Input
          type="text"
          name="email"
          placeholder="Email Address"
          required
          onChange={handleInputChange}
          className="mb-2"
          hasError={hasError}
          errorMessage={hasError ? "Invalid email address" : ""}
        />
        <Button className="bg-orange text-white hover:bg-orange-600 w-full" disabled={hasError}>
          Send Request
        </Button>
      </form>
    </OverlayContent>
  );
}
