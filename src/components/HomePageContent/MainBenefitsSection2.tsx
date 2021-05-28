import styled from "@emotion/styled";
import React, { SVGProps } from "react";
import tw from "twin.macro";
import { Section } from "../Layout/Section";

export const SectionMainBenefits = styled(Section)`
  ${tw`py-20 flex flex-col justify-center`}

  h5 {
    ${tw`font-bold text-grey-700`}
  }

  .img-icon {
    max-width: 50px;
  }
`;

const Background = styled.div`
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 0 35%;
  // background-position: center top;
  // background-attachment: fixed;

  @media screen and (min-width: 801px) {
    background-image: url("/static/images/home/main-benefits/single-wave.png");
  }
`;

interface MainBenefitsProps {
  details: MainBenefits;
}

type MainBenefits = {
  image: React.FunctionComponent<SVGProps<SVGElement>>;
  title: string;
  description: string;
};

const sectionOneSVG: React.FunctionComponent<SVGProps<SVGElement>> = () => {
  return (
    <svg width="121" height="120" viewBox="0 0 121 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <g filter="url(#filter0_d)">
          <circle cx="60.5" cy="56" r="40" fill="white" />
        </g>
        <path
          d="M61.0068 77.611C60.5565 77.611 60.1963 77.2573 60.1963 76.8152V66.8498C60.1963 66.4077 60.5565 66.054 61.0068 66.054C61.4571 66.054 61.8174 66.4077 61.8174 66.8498V76.8152C61.8174 77.2485 61.4571 77.611 61.0068 77.611Z"
          fill="#3B8CC5"
        />
        <path
          d="M61.0073 77.9999C60.8272 77.9999 60.6471 77.9468 60.503 77.8319L55.9279 74.2684C55.5767 73.9943 55.5137 73.4902 55.7928 73.1542C56.072 72.8094 56.5764 72.7475 56.9276 73.0216L60.9983 76.1872L65.069 73.0216C65.4203 72.7475 65.9336 72.8094 66.2038 73.1542C66.483 73.4991 66.4199 74.0031 66.0687 74.2684L61.4936 77.8319C61.3676 77.9468 61.1874 77.9999 61.0073 77.9999Z"
          fill="#3B8CC5"
        />
        <path
          d="M47.8852 69.6087C47.4349 69.6087 47.0747 69.255 47.0747 68.8129V61.5002C47.0747 61.058 47.4349 60.7043 47.8852 60.7043C48.3355 60.7043 48.6958 61.058 48.6958 61.5002V68.8129C48.6958 69.255 48.3355 69.6087 47.8852 69.6087Z"
          fill="#3B8CC5"
        />
        <path
          d="M47.8854 70.0065C47.7052 70.0065 47.5251 69.9534 47.381 69.8385L42.806 66.275C42.4547 66.0009 42.4007 65.4968 42.6709 65.1608C42.9501 64.816 43.4544 64.7541 43.8056 65.0282L47.8763 68.1938L51.9471 65.0282C52.2983 64.7541 52.8116 64.816 53.0818 65.1608C53.361 65.5057 53.298 66.0097 52.9467 66.275L48.3717 69.8385C48.2366 69.9446 48.0655 70.0065 47.8854 70.0065Z"
          fill="#3B8CC5"
        />
        <path
          d="M74.1289 69.6087C73.6786 69.6087 73.3184 69.255 73.3184 68.8129V61.5002C73.3184 61.058 73.6786 60.7043 74.1289 60.7043C74.5792 60.7043 74.9394 61.058 74.9394 61.5002V68.8129C74.9394 69.255 74.5792 69.6087 74.1289 69.6087Z"
          fill="#3B8CC5"
        />
        <path
          d="M74.1289 70.0065C73.9488 70.0065 73.7687 69.9534 73.6246 69.8385L69.0495 66.275C68.6983 66.0009 68.6352 65.4968 68.9144 65.1608C69.1936 64.816 69.6979 64.7541 70.0492 65.0282L74.1199 68.1938L78.1906 65.0282C78.5419 64.7541 79.0462 64.816 79.3254 65.1608C79.6046 65.5057 79.5415 66.0097 79.1903 66.275L74.6152 69.8385C74.4891 69.9446 74.309 70.0065 74.1289 70.0065Z"
          fill="#3B8CC5"
        />
        <path
          d="M61.0072 64.082C52.5596 64.082 45.688 57.3352 45.688 49.041C45.688 40.7468 52.5596 34 61.0072 34C69.4549 34 76.3264 40.7468 76.3264 49.041C76.3264 57.3352 69.4549 64.082 61.0072 64.082ZM61.0072 35.5916C53.4512 35.5916 47.3091 41.6222 47.3091 49.041C47.3091 56.4598 53.4512 62.4904 61.0072 62.4904C68.5633 62.4904 74.7054 56.4598 74.7054 49.041C74.7054 41.6222 68.5633 35.5916 61.0072 35.5916Z"
          fill="#3B8CC5"
        />
        <path
          d="M61.043 57.7065C57.8009 57.7065 55.1621 55.5843 55.1621 52.9758C55.1621 52.5337 55.5223 52.18 55.9726 52.18C56.423 52.18 56.7832 52.5337 56.7832 52.9758C56.7832 54.7089 58.6925 56.1149 61.043 56.1149C63.3936 56.1149 65.3119 54.7089 65.3119 52.9758C65.3119 52.1623 64.5194 49.8544 61.016 49.8544C56.9273 49.8544 55.0811 47.0779 55.0811 45.106C55.0811 42.4975 57.7198 40.3665 60.962 40.3665C64.2041 40.3665 66.8519 42.4886 66.8519 45.106C66.8519 45.5481 66.4917 45.9018 66.0414 45.9018C65.5911 45.9018 65.2308 45.5481 65.2308 45.106C65.2308 43.3729 63.3216 41.9581 60.962 41.9581C58.6114 41.9581 56.7021 43.3729 56.7021 45.106C56.7021 46.1406 57.7558 48.2628 61.016 48.2628C65.3299 48.2628 66.933 51.1542 66.933 52.9758C66.933 55.5843 64.2942 57.7065 61.043 57.7065Z"
          fill="#3B8CC5"
        />
        <path
          d="M60.998 41.852C60.5477 41.852 60.1875 41.4983 60.1875 41.0562V38.5715C60.1875 38.1293 60.5477 37.7756 60.998 37.7756C61.4483 37.7756 61.8086 38.1293 61.8086 38.5715V41.0562C61.8086 41.4983 61.4483 41.852 60.998 41.852Z"
          fill="#3B8CC5"
        />
        <path
          d="M60.998 60.2973C60.5477 60.2973 60.1875 59.9436 60.1875 59.5015V57.0168C60.1875 56.5746 60.5477 56.2209 60.998 56.2209C61.4483 56.2209 61.8086 56.5746 61.8086 57.0168V59.5015C61.8086 59.9436 61.4483 60.2973 60.998 60.2973Z"
          fill="#3B8CC5"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0.5"
          y="0"
          width="120"
          height="120"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="10" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <clipPath id="clip0">
          <rect width="120" height="120" fill="white" transform="translate(0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
};

const sectionTwoSVG: React.FunctionComponent<SVGProps<SVGElement>> = () => {
  return (
    <svg width="121" height="121" viewBox="0 0 121 121" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <g filter="url(#filter0_d)">
          <circle cx="60.2549" cy="56.0312" r="40" fill="white" />
        </g>
        <g clipPath="url(#clip1)">
          <path
            d="M73.5723 65.8438C73.5723 66.2219 73.265 66.5312 72.8894 66.5312H63.3284C62.9528 66.5312 62.6455 66.2219 62.6455 65.8438V58.2812C62.6455 57.9031 62.9528 57.5938 63.3284 57.5938H72.8894C73.265 57.5938 73.5723 57.9031 73.5723 58.2812V65.8438Z"
            stroke="#3B8CC5"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M64.6943 54.1563C64.6943 52.2588 66.2241 50.7188 68.109 50.7188C69.9938 50.7188 71.5236 52.2588 71.5236 54.1563V57.5938H64.6943V54.1563Z"
            stroke="#3B8CC5"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M68.7916 67.9063V71.3438H46.938V43.1563L50.3526 39.7188H68.7916V49.3438"
            stroke="#3B8CC5"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path d="M51.7183 41.0938V44.5313H48.3037" stroke="#3B8CC5" strokeWidth="2" strokeMiterlimit="10" />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0.254883"
          y="0.03125"
          width="120"
          height="120"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="10" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <clipPath id="clip0">
          <rect width="120" height="120" fill="white" transform="translate(0.254883 0.03125)" />
        </clipPath>
        <clipPath id="clip1">
          <rect width="28" height="33" fill="white" transform="translate(46.2549 39.0312)" />
        </clipPath>
      </defs>
    </svg>
  );
};

const sectionThreeSVG: React.FunctionComponent<SVGProps<SVGElement>> = () => {
  return (
    <svg width="121" height="120" viewBox="0 0 121 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <g filter="url(#filter0_d)">
          <circle cx="60.5996" cy="56" r="40" fill="white" />
        </g>
        <g clipPath="url(#clip1)">
          <path
            d="M63.1841 49.6667C64.6228 47.7854 65.2615 46.75 67.5884 46.75H71.2587C73.1012 46.75 75.6631 47.4573 75.6631 50.3958V53.3125C75.6631 54.9312 74.217 56.2292 72.7269 56.2292"
            stroke="#3B8CC5"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M66.8545 55.5V51.8541H66.1205L64.6523 52.5833"
            stroke="#3B8CC5"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M72.7271 51.125V58.4167"
            stroke="#3B8CC5"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M47.0495 63.6667C45.3905 66.1969 44.3996 69.3542 44.3335 72.2708H77.8654C77.6819 63.5208 70.2458 56.1052 61.0994 56.1052C60.0424 56.1052 59.0074 56.2 58.009 56.3896"
            stroke="#3B8CC5"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M51.439 72.2708V70.8927C51.439 69.952 51.9308 69.3541 52.8777 69.3541H57.6711C58.6181 69.3541 59.5136 68.4281 59.5136 67.4947V66.8166C59.5136 65.876 60.1449 64.9864 61.0919 64.9864C62.0388 64.9864 62.4499 64.3593 62.4499 63.4187V62.7406C62.4499 61.8 62.0461 61.3406 61.0992 61.3406H58.0455"
            stroke="#3B8CC5"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M73.4609 62.0625H68.2858C67.5297 62.0625 66.8544 63.0031 66.8544 63.7542V64.4323C66.8544 65.1833 67.5297 65.7083 68.2858 65.7083H69.6585C70.4146 65.7083 71.2587 66.3573 71.2587 67.1083V67.1885C71.2587 67.9396 70.4146 68.625 69.6585 68.625H66.2378C64.7256 68.625 63.1914 69.7333 63.1914 71.2354V72.2708"
            stroke="#3B8CC5"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M55.8436 66.4375V51.125H56.6364C56.6364 51.125 58.3247 52.401 59.5139 53.3125C61.3784 54.7417 63.4851 52.9333 63.4851 52.9333C63.4851 52.9333 60.7691 50.0677 59.5139 48.9375C58.1999 47.7635 56.7465 46.75 54.3754 46.75H50.7051C48.8627 46.75 46.3008 47.7635 46.3008 51.125V54.0417C46.3008 55.6604 47.9157 56.9583 49.237 56.9583"
            stroke="#3B8CC5"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M49.2368 50.3958V66.4374"
            stroke="#3B8CC5"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M52.1733 56.2291V66.4375"
            stroke="#3B8CC5"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M52.5404 38.7291C51.1751 38.7291 49.9712 39.6916 49.9712 41.0625V42.2291C49.9712 43.6 51.1751 44.5625 52.5404 44.5625C53.9058 44.5625 55.1096 43.6 55.1096 42.2291V41.0625C55.1096 39.6916 53.9131 38.7291 52.5404 38.7291Z"
            stroke="#3B8CC5"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
          <path
            d="M70.1576 38.7291C68.7922 38.7291 67.5884 39.6916 67.5884 41.0625V42.2291C67.5884 43.6 68.7922 44.5625 70.1576 44.5625C71.5229 44.5625 72.7268 43.6 72.7268 42.2291V41.0625C72.7268 39.6916 71.5303 38.7291 70.1576 38.7291Z"
            stroke="#3B8CC5"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0.599609"
          y="0"
          width="120"
          height="120"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="10" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <clipPath id="clip0">
          <rect width="120" height="120" fill="white" transform="translate(0.599609)" />
        </clipPath>
        <clipPath id="clip1">
          <rect width="35" height="35" fill="white" transform="translate(43.5996 38)" />
        </clipPath>
      </defs>
    </svg>
  );
};

const mainBenefits: MainBenefits[] = [
  {
    image: sectionOneSVG,
    title: "Reduced costs of documentation",
    description: `Digitalising paper documents would eliminate costs associated with printing, including the handling and
    transportation of typically hundreds of pages amongst numerous parties. This will significantly reduce the costs
    of shipping.`,
  },
  {
    image: sectionTwoSVG,
    title: "Increased efficiencies through certainty",
    description: `Reduce the risk of receiving fake documents or information as sources will be accredited. Removes the need for
    repetitive checks by the various trade ecosystem parties to ascertain whether the documents/information received
    are legitimate.`,
  },
  {
    image: sectionThreeSVG,
    title: "Support for new service offerings through digitalisation and interoperability",
    description: `Current digitalisation efforts are fragmented digital ecosystems consisting of silo groups of trade parties.
    TradeTrust will work with the current ecosystem to enable various enterprise and platform systems to be
    interoperable. Coupled with enabling legal validity of electronic trade documents, this can facilitate the
    creation of new service offerings.`,
  },
];

const MainBenefitsElement: React.FunctionComponent<MainBenefitsProps> = ({ details }) => {
  return (
    <div className="w-full text-center mt-12 md:w-4/12">
      <div>
        <details.image />
      </div>
      <h4 className="font-ubuntu mx-16 md:text-left md:text-2xl md:mr-10 md:ml-24">{details.title}</h4>
      <p className="text-left m-4 md:text-base md:m-0 md:ml-24">{details.description}</p>
    </div>
  );
};

export const MainBenefitsSection2 = () => {
  return (
    <section id="main-benefits" className="bg-white text-gray-700 py-16">
      <Background className="">
        <div className="container">
          {/* <div className="h-12">
            <img src="/static/images/home/main-benefits/single-wave.png" />
          </div> */}
          <div className="w-5/5 text-center">
            <h1 className="font-ubuntu text-4xl leading-none md:text-5xl">Main Benefits</h1>
            <h2 className="font-roboto mt-4 text-xl leading-6 md:text-xl">
              TradeTrust can bring benefits to the trade, finance and logistics community:
            </h2>
          </div>
          <div className="flex flex-wrap">
            {/* <div className="w-full text-center"> */}
            {/* <MainBenefitsSubSectionOne />
          <MainBenefitsSubSectionTwo />
          <MainBenefitsSubSectionThree /> */}
            {/* </div> */}
            {mainBenefits.map((details, index) => (
              <MainBenefitsElement details={details} key={index} />
            ))}
          </div>
        </div>
      </Background>
    </section>
  );
};
