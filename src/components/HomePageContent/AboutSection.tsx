import React from "react";
import css from "./aboutSection.scss";
import images from "./AboutImages";

const HowItWorks = () => {
  const sections: { key: keyof typeof images; text: string }[] = [
    {
      key: "onetwo",
      text:
        "When a TradeTrust document is created, a unique digital code is tagged to it. This code, together with condensed information from the document, is stored on the blockchain.",
    },
    {
      key: "three",
      text:
        "When you open the .tt file on this site, its contents will be compared with what was stored on the blockchain.",
    },
    {
      key: "four",
      text:
        "We'll check if the contents match and if the document comes from a recognised issuer.\n\nThis way, you'll know if the document is valid when you try to view it.",
    },
  ];

  const section = sections.map((item, i) => (
    <div className={css.step} key={i} id={css[item.key]}>
      <div className="row no-gutters align-items-center">
        <div className="col-12 col-lg-6 col-xl-5 text-center">{images[item.key]()}</div>
        <div className="col-12 col-lg">
          <div className={css.steptext}>
            <p>{item.text}</p>
          </div>
        </div>
      </div>
    </div>
  ));

  return <div className={css.content}>{section}</div>;
};

const AboutSection = () => (
  <section className={`bg-light ${css["section"]}`} id="how-it-works">
    <div className="container-custom">
      <div className="row">
        <div className="col-12">
          <h3>How it works</h3>
          <HowItWorks />
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
