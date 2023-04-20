export interface PartnersData {
  companyName: string;
  description: string;
  logo: string;
  typeOfPartner: string;
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

export type PartnerDataSingle = {
  slug: string;
  type?: string;
  attributes: PartnersData;
  body?: string;
};

export interface PartnersDataProps {
  partnersData: PartnerDataSingle[];
}
