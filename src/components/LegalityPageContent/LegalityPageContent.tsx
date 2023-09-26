import React, { FunctionComponent } from "react";
import { Button } from "@govtechsg/tradetrust-ui-components";
import { gaEvent } from "@govtechsg/tradetrust-utils";
import { GaAction, GaCategory } from "../../types";

const TRADETRUST_LEGAL_ARTICLE_TITLE = "Tradetrust Legal Analysis Article";

const Card = ({ title, src }: { title: string; src: string }) => {
  return (
    <div className="h-full rounded-lg bg-cerulean-500 text-white p-4 text-center">
      <img className="mx-auto mb-4" src={src} alt={title} />
      <h5>{title}</h5>
    </div>
  );
};

const Section = ({
  title,
  img,
  children,
  className,
}: {
  title: string;
  img: {
    src: string;
    alt: string;
  };
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section className={`py-12 lg:py-16 ${className}`}>
      <div className="container">
        <h2 className="text-center leading-none">{title}</h2>
        <div className="flex flex-wrap items-center py-8">
          <div className="w-full lg:w-2/5">
            <div className="max-w-[480px] mx-auto lg:ml-0">
              <img className="mb-8 lg:mb-0" src={img.src} alt={img.alt} />
            </div>
          </div>
          <div className="w-full lg:w-3/5">
            <div className="px-0 lg:px-12">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SectionGuide = () => {
  const downloadArticle = () => {
    gaEvent({
      category: GaCategory.FILE_DOWNLOAD,
      action: GaAction.LEGAL_ARTICLE_DOWNLOAD,
      label: TRADETRUST_LEGAL_ARTICLE_TITLE,
    });
  };

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container">
        <h2 className="text-center leading-none">TradeTrust Legality Guide</h2>
        <div className="flex flex-wrap py-8 justify-center -mx-8">
          <div className="w-full lg:w-[320px] px-8 mb-4 lg:mb-0">
            <Card
              title="How TradeTrust tackles the twin problems of legal and technical interoperability that have hindered the wider adoption of eBLs in global trade"
              src="/static/images/legality/icon-cost.svg"
            />
          </div>
          <div className="w-full lg:w-[320px] px-8 mb-4 lg:mb-0">
            <Card
              title="A legal analysis of TT eBLs under the MLETR, under Singapore law, under English law and under US (New York and Delaware) law"
              src="/static/images/legality/icon-legal.svg"
            />
          </div>
          <div className="w-full lg:w-[320px] px-8 mb-4 lg:mb-0">
            <Card
              title="Practical advice to the Market when considering the implementation and use of TT eBLs in trade scenarios involving MLETR and non-MLETR aligned jurisdictions"
              src="/static/images/legality/icon-location.svg"
            />
          </div>
        </div>
        <div className="w-full text-center my-8">
          <a
            download={TRADETRUST_LEGAL_ARTICLE_TITLE}
            href="/static/images/legality/Stephenson_Harwood_Article_on_TradeTrust_eBLs.pdf"
            onClick={downloadArticle}
          >
            <Button className="bg-tangerine-500 text-white hover:bg-tangerine-800 rounded-xl text-2xl px-4">
              <h3>Get Access To The Full Article</h3>
            </Button>
          </a>
        </div>
        <div className="w-full text-center my-8">
          <p className="text-cloud-400">
            Brought to you jointly by IMDA and Stephenson Harwood LLP, with input on US aspects from Blank Rome LLP
          </p>
        </div>
        <div className="flex flex-wrap py-8 justify-center -mx-4">
          <div className="w-full lg:w-[240px] px-8 mb-8">
            <img className="mx-auto mb-4 max-w-[160px]" src={"/static/images/common/logo-imda.png"} alt="IMDA logo." />
          </div>
          <div className="w-full lg:w-[240px] px-8 mb-8">
            <img
              className="mx-auto mb-4 max-w-[160px]"
              src={"/static/images/common/logo-stephenson-harwood.png"}
              alt="Stephenson Harwood logo."
            />
          </div>
          <div className="w-full lg:w-[240px] px-8 mb-8">
            <img
              className="mx-auto mb-4 max-w-[160px]"
              src={"/static/images/common/logo-blankrome.png"}
              alt="Blankrome logo."
            />
          </div>
        </div>
        <div className="w-full text-center my-8">
          <p>
            For legal queries or to express interest in TradeTrust workshop or news, click{" "}
            <a href="https://go.gov.sg/legalarticleform" target="_blank" rel="noopener noreferrer">
              here
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

const SectionWhatMletr = () => {
  return (
    <Section
      title="The Model Law on Electronic Transferable Records (MLETR)"
      img={{ src: "/static/images/legality/mletr.png", alt: "MLETR illustration." }}
    >
      <p>
        The Model Law on Electronic Transferable Records (MLETR), published by the United Nations Commission on
        International Trade Law (UNCITRAL) in 2017, aims to enable the legal use of electronic transferable records both
        domestically and across borders. 7 jurisdictions, including Singapore have adopted MLETR. United Kingdom’s
        Electronic Trade Documents Act will come into effect on 20th September 2023.
      </p>
      <p>
        TradeTrust (TT), a framework and digital utility that enables trusted interoperability of electronic trade
        documents across digital platforms, enables adopters to easily implement ETRs like eBLs that comply with the
        requirements as laid out in the MLETR and hence are legally valid across multiple platforms and systems.
      </p>
    </Section>
  );
};

const SectionConsiderations = () => {
  return (
    <Section
      title="Legal Considerations In The Use Of The TradeTrust Framework"
      img={{ src: "/static/images/legality/legal-considerations.png", alt: "Legal considerations illustration." }}
      className="bg-white"
    >
      <p>
        Trade has relied on paper for hundreds of years despite legal, financial and practical drawbacks and
        inefficiencies. Recent technological advances and legal developments permit the use of electronic transferable
        documents like electronic bills of lading in a decentralised manner that makes it easier for adoption to scale
        organically.
      </p>
    </Section>
  );
};

const SectionLanding = () => {
  return (
    <section className="py-12 lg:py-16 bg-cerulean-50">
      <div className="container">
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-2/5">
            <div className="max-w-[400px]">
              <h1 className="leading-none mb-4 lg:mb-8">TradeTrust Legality</h1>
              <h3 className="leading-tight">A framework that was designed to achieve legal interoperability</h3>
            </div>
          </div>
          <div className="w-full lg:w-3/5">
            <div className="px-0 lg:px-12">
              <img src="/static/images/legality/legality-bg.png" alt="Legality illustration." />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const LegalityPageContent: FunctionComponent = () => {
  return (
    <>
      <SectionLanding />
      <SectionConsiderations />
      <SectionWhatMletr />
      <SectionGuide />
    </>
  );
};
