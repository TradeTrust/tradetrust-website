import { Persona } from "../../../types";

export const VerifiableDocumentPersonas: Persona[] = [
  {
    image: "/static/images/home/joan/joan.png",
    jobTitle: "The Exporter",
    description:
      "This is Joan, she is an exporter with customers in many different countries. See how she cut down on time and cost when dealing with Certificate of Origin",
    learnMore: {
      title: "Certificate of Origin",
      thenSteps: [
        {
          stepNumber: "1",
          icon: "/static/images/home/joan/joan-then-1.svg",
          description: "Exporter receives CoO from Exporting Country's Cert Issuing Authority (via courier)",
        },
        {
          stepNumber: "2",
          icon: "/static/images/home/joan/joan-then-2.svg",
          description: "Exporter checks the details of CoO",
        },
        {
          stepNumber: "3",
          icon: "/static/images/home/joan/joan-then-3.svg",
          description: "Exporter dispatches the CoO to Bank (via courier)",
        },
        {
          stepNumber: "4",
          icon: "/static/images/home/kevin/kevin-then-4.svg",
          description: "10-20 days",
        },
      ],
      nowSteps: [
        {
          stepNumber: "1",
          icon: "/static/images/home/joan/joan-now-1.svg",
          description: "Exporter receives eCoO from Exporting Country's Cert Issuing Authority (via email)",
        },
        {
          stepNumber: "2",
          icon: "/static/images/home/joan/joan-now-2.svg",
          description: "Exporter checks for authenticity and provenance",
        },
        {
          stepNumber: "3",
          icon: "/static/images/home/joan/joan-now-3.svg",
          description: "Exporter sends the eCoO to Bank (via email)",
        },
        {
          stepNumber: "4",
          icon: "/static/images/home/joan/joan-now-3.svg",
          description: "1 day",
        },
      ],
      endMessage: "TradeTrust is more than a tool to hasten your exporting processs. Get in touch to find out more!",
    },
  },
  {
    image: "/static/images/home/sean/sean.png",
    jobTitle: "Cert Issuing/Checking Authority",
    description:
      "This is Sean, he works for Singapore Custom, and he is using TradeTrust to issue Certificate of Origin. See how he benefited from using TradeTrust to issue the Certificate of Origin",
    learnMore: {
      title: "Certificate of Origin",
      startMessage:
        "These are some of the benefits Sean enjoys when dealing with eCoOs using TradeTrust-enabled solutions",
      benefits: [
        {
          benefitNumber: "1",
          icon: "/static/images/home/sean/sean-benefit-1.svg",
          description: "Shorten the endorsement process",
        },
        {
          benefitNumber: "2",
          icon: "/static/images/home/sean/sean-benefit-2.svg",
          description: "CoO can be sent via email instead of courier",
        },
        {
          benefitNumber: "3",
          icon: "/static/images/home/sean/sean-benefit-3.svg",
          description: "Lower the risk of human error while checking",
        },
        {
          benefitNumber: "4",
          icon: "/static/images/home/sean/sean-benefit-4.svg",
          description: "Legal certainty as TradeTrust is designed to be compliant to MLETR",
        },
      ],
      endMessage: "These TradeTrust benefits are just the tip of the iceberg. Get in touch to find out more!",
    },
  },
  {
    image: "/static/images/home/james/james.png",
    jobTitle: "The Importer",
    description:
      "This is James, he is an importer using Tradetrust to streamline his cargo collection process. See how he benefited from using TradeTrust",
    learnMore: {
      title: "Certificate of Origin",
      startMessage:
        "These are some of the benefits James enjoys when dealing with eCoOs using TradeTrust-enabled solutions",
      benefits: [
        {
          benefitNumber: "1",
          icon: "/static/images/home/james/james-benefit-1.svg",
          description: "Shorten the endorsement process",
        },
        {
          benefitNumber: "2",
          icon: "/static/images/home/james/james-benefit-2.svg",
          description: "Save cost on courier and paperwork",
        },
        {
          benefitNumber: "3",
          icon: "/static/images/home/james/james-benefit-3.svg",
          description: "Lower the risk of human error",
        },
        {
          benefitNumber: "4",
          icon: "/static/images/home/james/james-benefit-4.svg",
          description: "CoO can be verified and authenticate via TradeTrust website",
        },
      ],
      endMessage: "These TradeTrust benefits are just the tip of the iceberg. Get in touch to find out more!",
    },
  },
  {
    image: "/static/images/home/tanu/tanu.png",
    jobTitle: "The Banker",
    description:
      "This is Tanu, she is a banker using TradeTrust to Minimize Fraud risk in trade financing. See how she lower the risk of fraud when dealing with Certificate of Origin",
    learnMore: {
      title: "Certificate of Origin",
      startMessage:
        "These are some of the benefits Tanu enjoys when dealing with eCoOs using TradeTrust-enabled solutions",
      benefits: [
        {
          benefitNumber: "1",
          icon: "/static/images/home/tanu/tanu-benefit-1.svg",
          description: "Receive CoO via email instead of courier",
        },
        {
          benefitNumber: "2",
          icon: "/static/images/home/tanu/tanu-benefit-2.svg",
          description: "Decreases Fraud risk",
        },
        {
          benefitNumber: "3",
          icon: "/static/images/home/tanu/tanu-benefit-3.svg",
          description: "Lower the risk of human error while checking",
        },
        {
          benefitNumber: "4",
          icon: "/static/images/home/tanu/tanu-benefit-4.svg",
          description: "CoO can be verified and authenticate via TradeTrust website",
        },
      ],
      endMessage: "These TradeTrust benefits are just the tip of the iceberg. Get in touch to find out more!",
    },
  },
];
