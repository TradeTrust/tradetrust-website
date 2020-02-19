import React, { ReactElement } from "react";
import { Config } from "../../types";

interface ConfigProviderProps {
  children: ReactElement;
}

interface ConfigProviderState {
  config: Config;
  setConfig: (config: Config) => void;
}

const initialConfig = {
  application: {
    wallet: {},
    network: "ethereum-ropsten"
  },
  documentMeta: {
    name: "",
    $template: {
      name: "",
      type: "EMBEDDED_RENDERER",
      url: ""
    },
    issuers: [
      {
        name: "",
        tokenRegistry: "",
        identityProof: {
          type: "DNS-TXT",
          location: ""
        }
      }
    ]
  },
  formSchema: []
};

export const ConfigContext = React.createContext<ConfigProviderState>({
  config: initialConfig,
  setConfig: (config: Config) => config
});

export class ConfigProvider extends React.Component<ConfigProviderProps, ConfigProviderState> {
  constructor(props: ConfigProviderProps) {
    super(props);
    this.state = {
      config: initialConfig,
      setConfig: (config: Config) => {
        this.setState(prevState => {
          return { ...prevState, config };
        });
      }
    };
  }

  render(): ReactElement {
    return <ConfigContext.Provider value={this.state}>{this.props.children}</ConfigContext.Provider>;
  }
}
