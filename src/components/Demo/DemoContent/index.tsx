import React, { FunctionComponent, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../../../common/contexts/AuthenticationContext";
import { useProviderContext } from "../../../common/contexts/provider";
import { DemoInitial } from "../DemoInitial";

export const DemoContent: FunctionComponent = () => {
  const { login, isLoggedIn } = useAuthContext();
  const { upgradeToMagicSigner } = useProviderContext();
  const router = useRouter();

  useEffect(() => {
    const handleIsLoggedIn = async () => {
      if (isLoggedIn) {
        await upgradeToMagicSigner();
        router.push("/demo/create");
      }
    };

    handleIsLoggedIn();
  }, [isLoggedIn, router, upgradeToMagicSigner]);

  return <DemoInitial login={login} upgradeToMagicSigner={upgradeToMagicSigner} />;
};

export default DemoContent;
