import { Persona } from "../../../types";

export const VerifiableDocumentPersonas: Persona[] = [
  {
    image: "/static/images/home/howItWorks/persona/persona5.png",
    jobTitle: "The Exporter",
    description:
      "This is Joan, she is an exporter with customers in many different countries. See how she cut down on time and cost when dealing with Certificate of Origin",
    learnMore: {
      title: "Electronic Certificate of Origin",
      thenSteps: [
        {
          stepNumber: "1",
          icon: "/static/images/home/howItWorks/icons/paperReceive.svg",
          description: "Exporter receives CoO from Exporting Country's Cert Issuing Authority (via courier)",
        },
        {
          stepNumber: "2",
          icon: "/static/images/home/howItWorks/icons/paperCheck.svg",
          description: "Exporter checks the details of CoO",
        },
        {
          stepNumber: "3",
          icon: "/static/images/home/howItWorks/icons/paperDispatch.svg",
          description: "Exporter dispatches the CoO to Bank (via courier)",
        },
        {
          stepNumber: "4",
          icon: "/static/images/home/howItWorks/icons/paperDispatch.svg",
          description: "10-20 days",
        },
      ],
      nowSteps: [
        {
          stepNumber: "1",
          icon: "/static/images/home/howItWorks/icons/eReceive.svg",
          description: "Exporter receives eCoO from Exporting Country's Cert Issuing Authority (via email)",
        },
        {
          stepNumber: "2",
          icon: "/static/images/home/howItWorks/icons/eCheck.svg",
          description: "Exporter checks for authenticity and provenance",
        },
        {
          stepNumber: "3",
          icon: "/static/images/home/howItWorks/icons/eDispatch.svg",
          description: "Exporter sends the eCoO to Bank (via email)",
        },
        {
          stepNumber: "4",
          icon: "/static/images/home/howItWorks/icons/eDispatch.svg",
          description: "1 day",
        },
      ],
      endMessage: "TradeTrust is more than a tool to hasten your exporting processs. Get in touch to find out more!",
    },
  },
  {
    image: "/static/images/home/howItWorks/persona/persona6.png",
    jobTitle: "Cert Issuing/Checking Authority",
    description:
      "This is Sean, he works for Singapore Custom, and he is using TradeTrust to issue Certificate of Origin. See how he benefited from using TradeTrust to issue the Certificate of Origin",
    learnMore: {
      title: "Electronic Certificate of Origin",
      startMessage:
        "These are some of the benefits Sean enjoys when dealing with eCoOs using TradeTrust-enabled solutions",
      benefits: [
        {
          benefitNumber: "1",
          icon: "/static/images/home/howItWorks/icons/speedUp.svg",
          description: "Shorten the endorsement process",
        },
        {
          benefitNumber: "2",
          icon: "/static/images/home/howItWorks/icons/eDispatch.svg",
          description: "CoO can be sent via email instead of courier",
        },
        {
          benefitNumber: "3",
          icon: "/static/images/home/howItWorks/icons/paperRisk.svg",
          description: "Lower the risk of human error while checking",
        },
        {
          benefitNumber: "4",
          icon: "/static/images/home/howItWorks/icons/paperAuthenticity.svg",
          description: "Legal certainty as TradeTrust is designed to be compliant to MLETR",
        },
      ],
      endMessage: "These TradeTrust benefits are just the tip of the iceberg. Get in touch to find out more!",
    },
  },
  {
    image: "/static/images/home/howItWorks/persona/persona7.png",
    jobTitle: "The Importer",
    description:
      "This is James, he is an importer using Tradetrust to streamline his cargo collection process. See how he benefited from using TradeTrust",
    learnMore: {
      title: "Electronic Certificate of Origin",
      startMessage:
        "These are some of the benefits James enjoys when dealing with eCoOs using TradeTrust-enabled solutions",
      benefits: [
        {
          benefitNumber: "1",
          icon: "/static/images/home/howItWorks/icons/speedUp.svg",
          description: "Shorten the endorsement process",
        },
        {
          benefitNumber: "2",
          icon: "/static/images/home/howItWorks/icons/wallet.svg",
          description: "Save cost on courier and paperwork",
        },
        {
          benefitNumber: "3",
          icon: "/static/images/home/howItWorks/icons/paperRisk.svg",
          description: "Lower the risk of human error",
        },
        {
          benefitNumber: "4",
          icon: "/static/images/home/howItWorks/icons/eCheck.svg",
          description: "CoO can be verified and authenticate via TradeTrust website",
        },
      ],
      endMessage: "These TradeTrust benefits are just the tip of the iceberg. Get in touch to find out more!",
    },
  },
  {
    image: "/static/images/home/howItWorks/persona/persona8.png",
    jobTitle: "The Banker",
    description:
      "This is Tanu, she is a banker using TradeTrust to Minimize Fraud risk in trade financing. See how she lower the risk of fraud when dealing with Certificate of Origin",
    learnMore: {
      title: "Electronic Certificate of Origin",
      startMessage:
        "These are some of the benefits Tanu enjoys when dealing with eCoOs using TradeTrust-enabled solutions",
      benefits: [
        {
          benefitNumber: "1",
          icon: "/static/images/home/howItWorks/icons/eReceive.svg",
          description: "Receive CoO via email instead of courier",
        },
        {
          benefitNumber: "2",
          icon: "/static/images/home/howItWorks/icons/secure.svg",
          description: "Decreases Fraud risk",
        },
        {
          benefitNumber: "3",
          icon: "/static/images/home/howItWorks/icons/paperRisk.svg",
          description: "Lower the risk of human error while checking",
        },
        {
          benefitNumber: "4",
          icon: "/static/images/home/howItWorks/icons/eCheck.svg",
          description: "CoO can be verified and authenticate via TradeTrust website",
        },
      ],
      endMessage: "These TradeTrust benefits are just the tip of the iceberg. Get in touch to find out more!",
    },
  },
];
