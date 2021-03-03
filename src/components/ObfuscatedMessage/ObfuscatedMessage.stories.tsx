import { SchemaId, v2, WrappedDocument } from "@govtechsg/open-attestation";
import React from "react";
import { ObfuscatedMessage } from "./ObfuscatedMessage";

export default {
  title: "UI/ObfuscatedMessage",
  component: ObfuscatedMessage,
};

const document = {
  version: "" as SchemaId,
  signature: {},
  data: {},
  privacy: {
    obfuscatedData: ["field1", "field2"],
  },
} as WrappedDocument<v2.OpenAttestationDocument>;

export const Default = () => {
  return <ObfuscatedMessage document={document} />;
};
