export interface PartnersData {
  companyName: string;
  description: string;
  logo: string;
  websiteLink: string;
}

export interface PartnersTileProps {
  data: PartnerDataSingle;
}

export type PartnerDataSingle = {
  slug: string;
  type?: string;
  attributes: PartnersData;
  body?: string;
};

export interface PartnersDataProps {
  sortedPartnersData: PartnerDataSingle[];
}
