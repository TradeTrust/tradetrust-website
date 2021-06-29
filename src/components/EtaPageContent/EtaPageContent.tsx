import React, { FunctionComponent } from "react";
import { Button } from "@govtechsg/tradetrust-ui-components";

const SectionMap = () => {
  return (
    <section>
      <img src="/static/images/eta/map.png" alt="" />
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/3 px-4">
            <h3>Europe</h3>
            <p>IMDA & MPA&lsquo;s collaboration with Port of Rotterdam on eBL through TradeTrust</p>
          </div>
          <div className="w-full lg:w-1/3 px-4">
            <h3>Singapore</h3>
            <h5>TradeTrust</h5>
            <ul>
              <li>
                <p>comprises set of globally-accepted standards and frameworks</p>
              </li>
              <li>
                <p>enables trusted interoperability of digital trade documents</p>
              </li>
              <li>
                <p>
                  provides proof of authenticity and provenance of documents and offers title transfer through
                  open-source software
                </p>
              </li>
            </ul>
            <p>IMDA & MPA&lsquo;s collaboration with Port of Rotterdam on eBL through TradeTrust</p>
          </div>
          <div className="w-full lg:w-1/3 px-4">
            <h3>China</h3>
            <p>
              SG-Shenzhen Smart City Initiative to explore cross-border trade and trade financing using eBLs and Letters
              of Credit
            </p>
            <h3>Australia</h3>
            <p>
              Trial of digital verification methods for electronic Certificates of Origin between border agencies and
              businesses
            </p>
          </div>
        </div>
        <div className="flex flex-wrap">
          <h4>Ready to learn how TradeTrust can benefit your business?</h4>
          <Button className="bg-tangerine text-white hover:bg-tangerine-600">Get in Touch Now</Button>
        </div>
      </div>
    </section>
  );
};

const SectionAmendedEta = () => {
  return (
    <section className="bg-white">
      <div className="container">
        <div className="bg-cerulean rounded-lg text-white">
          <h2>The amended ETA supports and complements the government’s trade digitalization initiatives.</h2>
        </div>
      </div>
    </section>
  );
};

const SectionWhyBl = () => {
  return (
    <section>
      <div className="container">
        <h1>Why Do We Need eBLs?</h1>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2 px-4">
            <img src="/static/images/eta/why-ebls.png" alt="" />
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <div className="flex flex-wrap">
              <div className="w-1/2">
                <div className="w-16">
                  <img src="/static/images/eta/time.svg" alt="" />
                </div>
                <div className="flex-grow">
                  <h5>Faster Processing</h5>
                </div>
              </div>
              <div className="w-1/2">
                <div className="w-16">
                  <img src="/static/images/eta/fraud.svg" alt="" />
                </div>
                <div className="flex-grow">
                  <h5>Lowered Fraud Risks</h5>
                </div>
              </div>
              <div className="w-1/2">
                <div className="w-16">
                  <img src="/static/images/eta/cost.svg" alt="" />
                </div>
                <div className="flex-grow">
                  <h5>Cost Saving</h5>
                </div>
              </div>
              <div className="w-1/2">
                <div className="w-16">
                  <img src="/static/images/eta/idea.svg" alt="" />
                </div>
                <div className="flex-grow">
                  <h5>Faster Processing</h5>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <ul>
                <li>
                  <p>
                    No additional costs to hold cargo as goods are less likely to arrive at their port of destination
                    before document processing is complete
                  </p>
                </li>
                <li>
                  <p>
                    US$4 billion estimated savings a year if 50% of the container shipping industry adopts eBLs,
                    according to Digital Container Shipping Association
                  </p>
                </li>
                <li>
                  <p>
                    Trade financing banks can obtain collateral security over the eBL, allowing them to obtain
                    regulatory capital relief and pass on cost savings to clients
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const SectionWhatBl = () => {
  return (
    <section>
      <div className="container">
        <h1>What Is The Bill of Lading?</h1>
        <h5>
          A Bill of Lading is a transport document and a document of title over goods in transit, it is also a key
          document for international trade
        </h5>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/3 px-4">
            <div className="h-full rounded-lg bg-cerulean text-white p-4">
              <img src="/static/images/eta/ship.svg" alt="" />
              <h5>Seller engages Carrier to deliver cargo and will receive a Bill of Lading (BL)</h5>
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-4">
            <div className="h-full rounded-lg bg-cerulean text-white p-4">
              <img src="/static/images/eta/bl.svg" alt="" />
              <h5>Seller releases BL to Buyer upon payment</h5>
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-4">
            <div className="h-full rounded-lg bg-cerulean text-white p-4">
              <img src="/static/images/eta/bl.svg" alt="" />
              <h5>Buyer can only collect the goods when they produce the original BL</h5>
            </div>
          </div>
        </div>
        <p>
          Possession of the original BL is of crucial importance. Previously, usage of electronic versions of BLs had
          been difficult due to technological and legal challenges in establishing what is the &quot;original
          document&quot; and &quot;who possesses it&quot;
        </p>
      </div>
    </section>
  );
};

const SectionWhatEta = () => {
  return (
    <section className="bg-white">
      <div className="container">
        <h1>What is ETA?</h1>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2">
            <div className="rounded-full w-16 h-16 shadow-xl">
              <img src="/static/images/eta/cart.svg" alt="" />
            </div>
            <h5>
              The Electronic Transactions Act (ETA) facilitates the use of e-commerce and e-transactions by giving
              e-contracts and e-signatures the same status as written contracts and signatures
            </h5>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="rounded-full w-16 h-16 shadow-xl">
              <img src="/static/images/eta/file.svg" alt="" />
            </div>
            <h5>
              Recent ETA amendments enable the creation and use of Electronic Transferable Records (ETRs), such as
              electrotonic Bills of Lading (eBLs)
            </h5>
          </div>
        </div>
      </div>
    </section>
  );
};

const SectionEta = () => {
  return (
    <section>
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/3">
            <h1>TradeTrust - Electronic Transactions Act</h1>
            <h4 className="uppercase">
              Enabling digitalisation of trade documents: convenience & savings for businesses
            </h4>
          </div>
          <div className="w-full lg:w-2/3">
            <img src="/static/images/eta/eta-bg.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export const EtaPageContent: FunctionComponent = () => {
  return (
    <>
      <SectionEta />
      <SectionWhatEta />
      <SectionWhatBl />
      <SectionWhyBl />
      <SectionAmendedEta />
      <SectionMap />
    </>
  );
};
