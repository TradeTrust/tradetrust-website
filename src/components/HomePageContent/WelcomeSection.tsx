import React, { FunctionComponent } from "react";
import { Carousel } from "./../Carousel";
import * as carouselHome from "./../../../cms/carousel/home-carousel.md";

const DescriptionSection: FunctionComponent = () => {
  const {
    attributes: { slides },
  } = carouselHome;

  return (
    <section id="welcome" className="bg-cerulean-50">
      <Carousel slides={slides} />
    </section>
  );
};

export const WelcomeSection = DescriptionSection;
