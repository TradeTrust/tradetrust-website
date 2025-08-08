export const URLS = {
  INFO: "https://tradetrust.io",
  REF: process.env.NODE_ENV === "development" ? "https://dev.tradetrust.io" : "https://ref.tradetrust.io",
  CREATOR:
    process.env.NODE_ENV === "development" ? "https://dev.tradetrust.io/creator" : "https://ref.tradetrust.io/creator",
  GALLERY: "https://gallery.tradetrust.io",
  GITHUB: "https://github.com/TradeTrust/tradetrust-website",
  DOCS: "https://docs.tradetrust.io",
  FAQ: "https://www.tradetrust.io/common-error-faqs/",
};

export enum FaqType {
  GENERAL = "General",
  PRODUCT = "Product",
}

export enum TokenRegistryVersions {
  V4 = "V4",
  V5 = "V5",
}
