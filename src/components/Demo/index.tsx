import React, { FunctionComponent, useState, useEffect } from "react";
import { useAuthContext } from "../../common/contexts/AuthenticationContext";
import { useProviderContext } from "../../common/contexts/provider";
import { DemoInitial } from "./DemoInitial";
import { DemoLogin } from "./DemoLogin";
import { DemoCreate } from "./DemoCreate";
import { DemoState } from "./types";

export const Demo: FunctionComponent = () => {
  const { login, isLoggedIn } = useAuthContext();
  const { upgradeToMagicSigner } = useProviderContext();
  const [demoState, setDemoState] = useState(DemoState.INITIAL);

  useEffect(() => {
    if (isLoggedIn) {
      setDemoState(DemoState.LOGIN);
    }
  }, [isLoggedIn]);

  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full bg-white rounded-xl shadow-xl p-6 lg:w-2/3">
        {demoState === DemoState.INITIAL && (
          <DemoInitial setDemoState={setDemoState} login={login} upgradeToMagicSigner={() => upgradeToMagicSigner} />
        )}
        {demoState === DemoState.LOGIN && <DemoLogin setDemoState={setDemoState} />}
        {demoState === DemoState.CREATE && <DemoCreate />}
      </div>

      <div className="mx-auto my-8 w-1/2 lg:w-1/3">
        <img src="/static/images/faq/faq-person.png" alt="FAQ person" />
      </div>
    </div>
  );
};
