import { DocumentTypeContent, DocumentType } from "./types";

export const DocumentContent: DocumentTypeContent[] = [
  {
    type: DocumentType.TRANSFERABLE_RECORD,
    text: {
      description:
        "Transferable Records are trade documents that entitle the holder to claim the performance of an obligation or ownership.",
      examples:
        "Examples of transferable records typically include bills of lading, bills of exchange, promissory notes, and warehouse receipts.",
      message:
        "See how things change from the use of TradeTrust-enabled solutions when dealing with eBL ",
    },
    personas: [
      {
        image: "/static/images/home//howItWorks/persona/persona1.png",
        jobTitle: "The Exporter",
        description:
          "This is Kevin, he is an exporter with customers in many different countries. See how he cuts down on time and cost when dealing with Blank-Endorsed BL.",
        learnMore: {
          title: "Electronic Bill of Lading",
          thenSteps: [
            {
              title: "Step 1",
              icon: "/static/images/home/howItWorks/icons/paperReceive.svg",
              description: "Exporter received BL from carrier (via courier)",
            },
            {
              title: "Step 2",
              icon: "/static/images/home/howItWorks/icons/paperCheck.svg",
              description:
                "Exporter checks the details of BL including entire endorsement chain",
            },
            {
              title: "Step 3",
              icon: "/static/images/home/howItWorks/icons/paperEndorse.svg",
              description:
                "Exporter inserts BL into document pack and arranges courier pickup",
            },
            {
              title: "Step 4",
              icon: "/static/images/home/howItWorks/icons/paperDispatch.svg",
              description:
                "Exporter endorses and dispatches the BL to Negotiating Bank (via courier)",
            },
          ],
          nowSteps: [
            {
              title: "Step 1",
              icon: "/static/images/home/howItWorks/icons/eReceive.svg",
              description: "Exporter receives eBL from carrier (via email)",
            },
            {
              title: "Step 2",
              icon: "/static/images/home/howItWorks/icons/eCheck.svg",
              description:
                "Exporter checks for authenticity and provenance including endorsement entry",
            },
            {
              title: "Step 3",
              icon: "/static/images/home/howItWorks/icons/eEndorse.svg",
              description:
                "Exporter performs endorsement to Negotiating Bank and sends eBL to Negotiating Bank (via email)",
            },
          ],
          endMessage:
            "TradeTrust is more than a tool to hasten your exporting processes. Get in touch to find out more!",
        },
      },
      {
        image: "/static/images/home/howItWorks/persona/persona2.png",
        jobTitle: "The Carrier",
        description:
          "This is Lizzie and she works for a Carrier. She uses an electronic Bill-of-Lading (eBL) solution enabled by TradeTrust to issue and surrender eBLs to her clients.",
        learnMore: {
          title: "Issuance and Surrender of Electronic Bill of Lading",
          startMessage: "Benefits gained by Lizzie",
          benefits: [
            {
              icon: "/static/images/home/howItWorks/icons/customerExperience.svg",
              description:
                "Improved customer experience with fast, transparent and trusted eBL",
            },
            {
              icon: "/static/images/home/howItWorks/icons/signUp.svg",
              description:
                "Remove the need to subscribe to multiple eBL solutions",
            },
            {
              icon: "/static/images/home/howItWorks/icons/paperRisk.svg",
              description: "Lower the risk of human error",
            },
            {
              icon: "/static/images/home/howItWorks/icons/paperAuthenticity.svg",
              description:
                "Legal certainty as TradeTrust is designed to align to MLETR",
            },
          ],
          endMessage:
            "These TradeTrust benefits are just the tip of the iceberg. Get in touch to find out more!",
        },
      },
      {
        image: "/static/images/home/howItWorks/persona/persona3.png",
        jobTitle: "The Importer",
        description:
          "This is Cara. She is an importer using TradeTrust to streamline her cargo collection process and this has benefitted her oganisation immensely.",
        learnMore: {
          title: "Electronic Bill of Lading",
          startMessage: "Benefits gained by Cara",
          benefits: [
            {
              icon: "/static/images/home/howItWorks/icons/speedUp.svg",
              description: "Shortened endorsement process",
            },
            {
              icon: "/static/images/home/howItWorks/icons/wallet.svg",
              description: "Lower cost, faster turnaround and less paperwork",
            },
            {
              icon: "/static/images/home/howItWorks/icons/paperRisk.svg",
              description: "Lower risk of human error",
            },
            {
              icon: "/static/images/home/howItWorks/icons/paperTick.svg",
              description: "Simplify the checking of entire endorsement chain",
            },
          ],
          endMessage:
            "These TradeTrust benefits are just the tip of the iceberg. Get in touch to find out more!",
        },
      },
      {
        image: "/static/images/home/howItWorks/persona/persona4.png",
        jobTitle: "The Banker",
        description:
          "This is Liam. He is a banker who processes trade financing applications. Find out how he managed to reduce fraud by using TradeTrust to process Blank-Endorsed BL.",
        learnMore: {
          title: "Electronic Bill of Lading",
          thenSteps: [
            {
              title: "Step 1",
              icon: "/static/images/home/howItWorks/icons/paperReceive.svg",
              description:
                "Negotiating Bank receives BL from Exporter (via courier) and checks the details of BL including entire endorsement chain",
            },
            {
              title: "Step 2",
              icon: "/static/images/home/howItWorks/icons/paperEndorse.svg",
              description:
                "Negotiating Bank endorses BL and dispatches BL to Issuing Bank (via courier)",
            },
            {
              title: "Step 3",
              icon: "/static/images/home/howItWorks/icons/paperCheck.svg",
              description:
                "Issuing Bank receives BL from Negotiating Bank (via courier) and checks the details of BL including the entire endorsement chain before endorsing the BL",
            },
            {
              title: "Total Time Taken",
              description: "10-20 days",
            },
          ],
          nowSteps: [
            {
              title: "Step 1",
              icon: "/static/images/home/howItWorks/icons/eCheck.svg",
              description:
                "Negotiating Bank receives eBL from Carrier (via email) and checks for authenticity and provenance including the endorsement entry",
            },
            {
              title: "Step 2",
              icon: "/static/images/home/howItWorks/icons/eEndorse.svg",
              description:
                "Negotiating Bank performs endorsement and sends to the Issuing Bank (via email)",
            },
            {
              title: "Step 3",
              icon: "/static/images/home/howItWorks/icons/cheque.svg",
              description:
                "Issuing Bank checks for authenticity (via TradeTrust) and provenance including the endorsement entry before endorsing the eBL",
            },
            {
              title: "Total Time Taken",
              description: "Less Than 1 day",
            },
          ],
          endMessage:
            "TradeTrust is more than a tool to prevent fraud. Get in touch to find out more!",
        },
      },
    ],
  },
  {
    type: DocumentType.VERIFIABLE_DOCUMENT,
    text: {
      description:
        "Verifiable Documents are other non-transferable trade documents that do not confer ownership.",
      examples:
        "Examples of verifiable documents typically include Certificate of Origin (CoO), Invoices and promissory notes.",
      message:
        "See how each persona has benefited from using TradeTrust when dealing with Certificate of Origin.",
    },
    personas: [
      {
        image: "/static/images/home/howItWorks/persona/persona5.png",
        jobTitle: "The Exporter",
        description:
          "This is Joan. She is an exporter with customers in many countries. Find out how she improves the process of handling the Certificate of Origin using TradeTrust.",
        learnMore: {
          title: "Electronic Certificate of Origin",
          thenSteps: [
            {
              title: "Step 1",
              icon: "/static/images/home/howItWorks/icons/paperReceive.svg",
              description:
                "Exporter receives CoO from Exporting Country's Cert Issuing Authority (via courier)",
            },
            {
              title: "Step 2",
              icon: "/static/images/home/howItWorks/icons/paperCheck.svg",
              description: "Exporter checks the details of CoO",
            },
            {
              title: "Step 3",
              icon: "/static/images/home/howItWorks/icons/paperDispatch.svg",
              description: "Exporter dispatches the CoO to Bank (via courier)",
            },
            {
              title: "Total Time Taken",
              description: "10-20 days",
            },
          ],
          nowSteps: [
            {
              title: "Step 1",
              icon: "/static/images/home/howItWorks/icons/eReceive.svg",
              description:
                "Exporter receives eCoO from Exporting Country's Cert Issuing Authority (via email)",
            },
            {
              title: "Step 2",
              icon: "/static/images/home/howItWorks/icons/eCheck.svg",
              description: "Exporter checks for authenticity and provenance",
            },
            {
              title: "Step 3",
              icon: "/static/images/home/howItWorks/icons/eDispatch.svg",
              description: "Exporter sends the eCoO to Bank (via email)",
            },
            {
              title: "Total Time Taken",
              description: "Less Than 1 day",
            },
          ],
          endMessage:
            "TradeTrust is more than a tool to hasten your exporting processes. Get in touch to find out more!",
        },
      },
      {
        image: "/static/images/home/howItWorks/persona/persona6.png",
        jobTitle: "Cert Issuing/Checking Authority",
        description:
          "This is Sean, he works for Customs Authority, and he is using TradeTrust to issue Certificate of Origin. See how he benefited from using TradeTrust to issue the Certificate of Origin",
        learnMore: {
          title: "Electronic Certificate of Origin",
          thenSteps: [
            {
              title: "Step 1",
              icon: "/static/images/home/howItWorks/icons/paperDispatch.svg",
              description:
                "Exporting Country's Cert Issuing Authority issues and dispatches CoO to Exporter's courier",
            },
            {
              title: "Step 2",
              icon: "/static/images/home/howItWorks/icons/paperTick.svg",
              description:
                "Exporter uses CoO for various process including sending to Importer for verification",
            },
            {
              title: "Step 3",
              icon: "/static/images/home/howItWorks/icons/paperReceive.svg",
              description:
                "Importing Country's Cert Checking Authority receives CoO from Importer (via courier)",
            },
            {
              title: "Step 4",
              icon: "/static/images/home/howItWorks/icons/paperCheck.svg",
              description:
                "Importing Country's Cert Checking Authority checks the details of CoO Manually",
            },
          ],
          nowSteps: [
            {
              title: "Step 1",
              icon: "/static/images/home/howItWorks/icons/eDispatch.svg",
              description:
                "Exporting Country's Cert Issuing Authority issues and send eCoO to Exporter via email",
            },
            {
              title: "Step 2",
              icon: "/static/images/home/howItWorks/icons/eDistribute.svg",
              description:
                "Exporter uses eCoO for various process including sending to Importer for verification",
            },
            {
              title: "Step 3",
              icon: "/static/images/home/howItWorks/icons/eCheck.svg",
              description:
                "Importing Country's Cert Checking Authority receives eCoO from Importer via email and checks for authenticity and provenance via TradeTrust website",
            },
          ],
          endMessage:
            "TradeTrust is more than a tool to hasten your exporting processes. Get in touch to find out more!",
        },
      },
      {
        image: "/static/images/home/howItWorks/persona/persona7.png",
        jobTitle: "The Importer",
        description:
          "This is James, he is an importer using TradeTrust to streamline his cargo collection process. See how he has benefited from using TradeTrust.",
        learnMore: {
          title: "Electronic Certificate of Origin",
          startMessage: "Benefits gained by James",
          benefits: [
            {
              icon: "/static/images/home/howItWorks/icons/efficiency.svg",
              description: "Efficiency gain from streamlining of processes",
            },
            {
              icon: "/static/images/home/howItWorks/icons/wallet.svg",
              description: "Reduced cost, faster turnaround and less paperwork",
            },
            {
              icon: "/static/images/home/howItWorks/icons/paperRisk.svg",
              description: "Lower risk of fraud and human error",
            },
            {
              icon: "/static/images/home/howItWorks/icons/eCheck.svg",
              description:
                "Need not subscribe to expensive solutions as eCoO can be verified for free via the TradeTrust website",
            },
          ],
          endMessage:
            "These TradeTrust benefits are just the tip of the iceberg. Get in touch to find out more!",
        },
      },
      {
        image: "/static/images/home/howItWorks/persona/persona8.png",
        jobTitle: "The Banker",
        description:
          "This is Tanu. She is a banker using TradeTrust to minimise fraud when processing Certificates of Origin in trade financing applications.",
        learnMore: {
          title: "Electronic Certificate of Origin",
          startMessage: "Benefits gained by Tanu",
          benefits: [
            {
              icon: "/static/images/home/howItWorks/icons/speedUp.svg",
              description: "Faster turnaround and less manual paperwork",
            },
            {
              icon: "/static/images/home/howItWorks/icons/paperAuthenticity.svg",
              description:
                "Lower risk of fraud as eCoO can be verified for its authenticity and provenance",
            },
            {
              icon: "/static/images/home/howItWorks/icons/paperRisk.svg",
              description: "Lower the risk of human error",
            },
            {
              icon: "/static/images/home/howItWorks/icons/paperMoney.svg",
              description:
                "May be able to offer better trade financing terms to customers due to reduced risk",
            },
          ],
          endMessage:
            "These TradeTrust benefits are just the tip of the iceberg. Get in touch to find out more!",
        },
      },
    ],
  },
];
