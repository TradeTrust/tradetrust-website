import { NextSeoProps } from "next-seo";

const HOSTNAME = typeof window !== "undefined" ? window.location.host : "tradetrust.io";

const TITLE_DEFAULT = "An easy way to check and verify your documents";

const DESCRIPTION_DEFAULT =
  "TradeTrust lets you verify the documents you have of anyone from any issuer. All in one place.";
const DESCRIPTION_LEARN =
  "This series of tech talks is organised by the Infocomm Media Development Authority of Singapore (IMDA) and GovTech Singapore. It comprises six webinars and aims to provide professionals with knowledge on TradeTrust as a digital utility for cross border trade.";
const DESCRIPTION_FAQ =
  "Have some questions in mind? Here are a list of collated questions and answers that might answer your questions.";
const DESCRIPTION_EVENT = "These are media events which TradeTrust has been involved in.";
const DESCRIPTION_ETA =
  "The Electronic Transactions Act (ETA) facilitates the use of e-commerce and e-transactions by giving e-contracts and e-signatures the same status as written contracts and signatures. Recent ETA amendments enable the creation and use of Electronic Transferable Records (ETRs), such as electrotonic Bills of Lading (eBLs).";
const DESCRIPTION_CONTACT = "Get in touch by joining TradeTrust and be part of the TradeTrust network.";
const DESCRIPTION_ADDRESS_BOOK = "Add a local address book to resolve addresses.";
const DESCRIPTION_ADDRESS_RESOLVER = "Add third party’s endpoint to resolve addresses.";
const DESCRIPTION_SETTINGS = "TradeTrust settings page.";
const DESCRIPTION_NEWS = "Check out our events and browse through our latest news and official statements.";
const DESCRIPTION_EMAIL_ERROR = "Oops, something is not right here, please try again.";
const DESCRIPTION_EMAIL_SUCCESS = "Thank you for your email enquiry. We will get back to you shortly!";

export const SEO_DEFAULT: NextSeoProps = {
  title: TITLE_DEFAULT,
  description: DESCRIPTION_DEFAULT,
  twitter: {
    cardType: "summary_large_image",
  },
  openGraph: {
    type: "website",
    images: [
      {
        url: "/static/images/common/share.jpg",
        alt: "TradeTrust",
        width: 1200,
        height: 630,
      },
    ],
  },
  additionalLinkTags: [
    {
      rel: "icon",
      sizes: "32x32",
      href: "/static/images/favicon/favicon-32x32.png",
      type: "image/png",
    },
    {
      rel: "icon",
      sizes: "16x16",
      href: "/static/images/favicon/favicon-16x16.png",
      type: "image/png",
    },
  ],
};

export const getSeo = ({
  title,
  path,
  description,
}: {
  title: string;
  path: string;
  description: string;
}): NextSeoProps => {
  return {
    title: `TradeTrust - ${title}`,
    description,
    openGraph: {
      title: `TradeTrust - ${title}`,
      description,
      url: `${HOSTNAME}${path}`,
    },
  };
};

export const SEO_HOME = getSeo({
  title: TITLE_DEFAULT,
  path: "/",
  description: DESCRIPTION_DEFAULT,
});

export const SEO_LEARN = getSeo({
  title: "Learn",
  path: "/learn",
  description: DESCRIPTION_LEARN,
});

export const SEO_VIEWER = getSeo({
  title: "Viewer",
  path: "/viewer",
  description: DESCRIPTION_DEFAULT,
});

export const SEO_VERIFY = getSeo({
  title: "Verify",
  path: "/verify",
  description: DESCRIPTION_DEFAULT,
});

export const SEO_FAQ = getSeo({
  title: "Frequently Asked Questions",
  path: "/faq",
  description: DESCRIPTION_FAQ,
});

export const SEO_EVENT = getSeo({
  title: "Events",
  path: "/event",
  description: DESCRIPTION_EVENT,
});

export const SEO_ETA = getSeo({
  title: "Electronic Transactions Act",
  path: "/eta",
  description: DESCRIPTION_ETA,
});

export const SEO_CONTACT = getSeo({
  title: "Contact Us",
  path: "/contact",
  description: DESCRIPTION_CONTACT,
});

export const SEO_SETTINGS = getSeo({
  title: "Settings",
  path: "/settings",
  description: DESCRIPTION_SETTINGS,
});

export const SEO_ADDRESS_BOOK = getSeo({
  title: "Address Book",
  path: "/settings/address-book",
  description: DESCRIPTION_ADDRESS_BOOK,
});

export const SEO_ADDRESS_RESOLVER = getSeo({
  title: "Address Resolver",
  path: "/settings/address-resolver",
  description: DESCRIPTION_ADDRESS_RESOLVER,
});

export const SEO_NEWS = getSeo({
  title: "News",
  path: "/news",
  description: DESCRIPTION_NEWS,
});

export const SEO_EMAIL_ERROR = getSeo({
  title: "Email Error",
  path: "/email/error",
  description: DESCRIPTION_EMAIL_ERROR,
});

export const SEO_EMAIL_SUCCESS = getSeo({
  title: "Email Success",
  path: "/email/success",
  description: DESCRIPTION_EMAIL_SUCCESS,
});

export const SEO_DEMO = getSeo({
  title: "Demo",
  path: "/demo",
  description: DESCRIPTION_DEFAULT,
});

export const SEO_DEMO_CREATE = getSeo({
  title: "Demo Create",
  path: "/demo/create",
  description: DESCRIPTION_DEFAULT,
});

export const SEO_DEMO_VERIFY = getSeo({
  title: "Demo Verify",
  path: "/demo/verify",
  description: DESCRIPTION_DEFAULT,
});
