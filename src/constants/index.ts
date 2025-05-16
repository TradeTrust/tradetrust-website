export const URLS = {
  INFO: "https://tradetrust.io",
  REF: "https://ref.tradetrust.io",
  REF_V5TR:
    process?.env?.NODE_ENV === "development"
      ? "https://v5-token-registry.dev.tradetrust.io"
      : "https://v5-token-registry.tradetrust.io",
  CREATOR: "https://creator.tradetrust.io/",
  GITHUB: "https://github.com/TradeTrust/tradetrust-website",
  DOCS: "https://docs.tradetrust.io",
  FAQ: "https://www.tradetrust.io/common-error-faqs/",
};

export enum FaqType {
  GENERAL = "General",
  PRODUCT = "Product",
}
