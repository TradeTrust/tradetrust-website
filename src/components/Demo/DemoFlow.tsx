import React from "react";
import { useProviderContext } from "../../common/contexts/provider";
import DemoVerifiableDocument from "./DemoVerifiableDocument"

interface DemoFlowProps {

}

export default function DemoFlow(props: DemoFlowProps) {
  const { account, upgradeToMagicSigner, provider } = useProviderContext()
  
  React.useLayoutEffect(() => {
    const execute = async () => {
      await upgradeToMagicSigner()
    }
    execute()
  }, [])

  console.log(account)

  return (
    <div>
      <DemoVerifiableDocument />
    </div>
  );
}
