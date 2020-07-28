import React from "react";
import { TitleEscrowEvent } from "../../../types";
import { EndorsementChainLayout } from "./EndorsementChainLayout";

export default {
  title: "Viewer|EndorsementChainLayout",
  component: EndorsementChainLayout,
};

const sampleEndorsementChain: TitleEscrowEvent[] = [
  {
    titleEscrowAddress: "0x748938d2DEc5511A50F836ede82e2831cC4A7f80",
    beneficiary: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
    holderChangeEvents: [
      {
        blockNumber: 8282976,
        holder: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
        timestamp: 1594608110000,
      },
      {
        blockNumber: 8283034,
        holder: "0x8e87c7cEc2D4464119C937bfef3398ebb1d9452e",
        timestamp: 1594608809000,
      },
    ],
  },
  {
    titleEscrowAddress: "0xe23e0E06DF75279Fb9A4471adCbeb9c240E5C4F3",
    beneficiary: "0x32507B8838562c0fc881dA6Ce00162B184a34955",
    holderChangeEvents: [
      {
        blockNumber: 8283040,
        holder: "0x32507B8838562c0fc881dA6Ce00162B184a34955",
        timestamp: 1594608903000,
      },
    ],
  },
  {
    titleEscrowAddress: "0xd413cF518B7aE838fbd994a653Af350AF6f72379",
    beneficiary: "0x5B1c22C60E66E58B07Fc00191e5603d0C41d3538",
    holderChangeEvents: [
      {
        blockNumber: 8283046,
        holder: "0x5B1c22C60E66E58B07Fc00191e5603d0C41d3538",
        timestamp: 1594609044000,
      },
    ],
  },
  {
    titleEscrowAddress: "0xBee0875Ba8069ed5c48E6A670118EF1C6B1E7fC0",
    beneficiary: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
    holderChangeEvents: [
      {
        blockNumber: 8283050,
        holder: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
        timestamp: 1594609105000,
      },
    ],
  },
];

export const Loading = () => {
  return <EndorsementChainLayout pending={true} setShowEndorsementChain={() => {}} />;
};

export const Success = () => {
  return (
    <EndorsementChainLayout
      endorsementChain={sampleEndorsementChain}
      pending={false}
      setShowEndorsementChain={() => {}}
    />
  );
};

export const Error = () => {
  return (
    <EndorsementChainLayout error="An unknown error has occurred" pending={false} setShowEndorsementChain={() => {}} />
  );
};
