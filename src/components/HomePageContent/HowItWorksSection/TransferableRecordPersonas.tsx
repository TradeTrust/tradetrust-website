import { Persona } from "../../../types";

export const TransferableRecordPersonas: Persona[] = [
  {
    image: "/static/images/home//howItWorks/persona/persona1.png",
    jobTitle: "The Exporter",
    description: "This is Kevin, he is an exporter with customers in many different countries",
    learnMore: {
      title: "Electronic Bill of Lading",
      thenSteps: [
        {
          stepNumber: "1",
          icon: "/static/images/home/howItWorks/icons/paperReceive.svg",
          description: "Exporter received BL from carrier (via courier)",
        },
        {
          stepNumber: "2",
          icon: "/static/images/home/howItWorks/icons/paperCheck.svg",
          description: "Exporter checks the details of BL including entire endorsement chain",
        },
        {
          stepNumber: "3",
          icon: "/static/images/home/howItWorks/icons/paperEndorse.svg",
          description: "Exporter endorses BL",
        },
        {
          stepNumber: "4",
          icon: "/static/images/home/howItWorks/icons/paperDispatch.svg",
          description: "Exporter dispatches the BL to Negotiating Bank (via courier)",
        },
      ],
      nowSteps: [
        {
          stepNumber: "1",
          icon: "/static/images/home/howItWorks/icons/eReceive.svg",
          description: "Exporter receives eBL from carrier (via email)",
        },
        {
          stepNumber: "2",
          icon: "/static/images/home/howItWorks/icons/eCheck.svg",
          description: "Exporter checks for authenticity and provenance including endorsement entry",
        },
        {
          stepNumber: "3",
          icon: "/static/images/home/howItWorks/icons/eEndorse.svg",
          description: "Exporter performs endorsement to Negotiating Bank",
        },
      ],
      endMessage: "These TradeTrust benefits are just the tip of the iceberg. Get in touch to find out more!",
    },
  },
  {
    image: "/static/images/home/howItWorks/persona/persona2.png",
    jobTitle: "The Carrier",
    description:
      "This is Lizzie, she works for a Carrier, and her Company is using TradeTrust for their e-Bill-of-Lading Solution",
    learnMore: {
      title: "Electronic Bill of Lading",
      startMessage:
        "These are some of the benefits Lizzie enjoys when dealing with eBLs using TradeTrust-enabled solutions",
      benefits: [
        {
          benefitNumber: "1",
          icon: "/static/images/home/howItWorks/icons/customerExperience.svg",
          description: "Improve customer experience with fast, transparent and trusted eBL",
        },
        {
          benefitNumber: "2",
          icon: "/static/images/home/howItWorks/icons/signUp.svg",
          description: "Remove the need to sign up with different eBL service provider",
        },
        {
          benefitNumber: "3",
          icon: "/static/images/home/howItWorks/icons/paperRisk.svg",
          description: "Lower the risk of human error",
        },
        {
          benefitNumber: "4",
          icon: "/static/images/home/howItWorks/icons/technology.svg",
          description: "Advantage of using technology that help his customer cut down on cost",
        },
      ],
      endMessage: "These TradeTrust benefits are just the tip of the iceberg. Get in touch to find out more!",
    },
  },
  {
    image: "/static/images/home/howItWorks/persona/persona3.png",
    jobTitle: "The Importer",
    description: "This is Cara, she is an importer using Tradetrust to streamline her cargo collection process",
    learnMore: {
      title: "Electronic Bill of Lading",
      startMessage:
        "These are some of the benefits Cara enjoys when dealing with eBLs using TradeTrust-enabled solutions",
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
          icon: "/static/images/home/howItWorks/icons/paperTick.svg",
          description: "Eliminate the need to check the details of the entire endorsement chain",
        },
      ],
      endMessage: "These TradeTrust benefits are just the tip of the iceberg. Get in touch to find out more!",
    },
  },
  {
    image: "/static/images/home/howItWorks/persona/persona4.png",
    jobTitle: "The Banker",
    description: "This is Liam, He is a banker using TradeTrust to Minimize Fraud risk in trade financing",
    learnMore: {
      title: "Electronic Bill of Lading",
      thenSteps: [
        {
          stepNumber: "1",
          icon: "/static/images/home/howItWorks/icons/paperReceive.svg",
          description:
            "Negotiating Bank receives BL from Exporter (via courier) and checks\the details of BL including entire endorsement chain",
        },
        {
          stepNumber: "2",
          icon: "/static/images/home/howItWorks/icons/paperEndorse.svg",
          description: "Negotiating Bank endorses BL and dispatches BL to Issuing Bank (via courier)",
        },
        {
          stepNumber: "3",
          icon: "/static/images/home/howItWorks/icons/paperCheck.svg",
          description:
            "Issuing Bank receives eBL from Negotiating Bank (via courier) and checks the details of BL including entire endorsement chain",
        },
        {
          stepNumber: "4",
          icon: "/static/images/home/howItWorks/icons/paperIssue.svg",
          description: "Issuing Bank endorses BL",
        },
      ],
      nowSteps: [
        {
          stepNumber: "1",
          icon: "/static/images/home/howItWorks/icons/eCheck.svg",
          description:
            "Negotiating Bank receives eBL from Carrier (via email) and checks forauthenticity and provenance including endorsement entry",
        },
        {
          stepNumber: "2",
          icon: "/static/images/home/howItWorks/icons/eEndorse.svg",
          description: "Negotiating Bank performs endorsement and send to Issuing Bank (via email)",
        },
        {
          stepNumber: "3",
          icon: "/static/images/home/howItWorks/icons/cheque.svg",
          description:
            "Issuing Bank checks for authenticity(via TradeTrust) and provenance including endorsement entry",
        },
      ],
      endMessage: "TradeTrust is more than a tool to prevent fraud. Get in touch to find out more!",
    },
  },
];
