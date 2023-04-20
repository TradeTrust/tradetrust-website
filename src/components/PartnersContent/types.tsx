export interface PartnersData {
  companyName: string;
  description: string;
  logo: string;
  typeofPartner: string;
  websiteLink: string;
}

export interface PartnersTileProps {
  data: PartnersData;
}

export type PartnerType = "Platform" | "Partners";

export enum TypesOfPartners {
  PLATFORM = "Platform",
  PARTNER = "Partners",
}
