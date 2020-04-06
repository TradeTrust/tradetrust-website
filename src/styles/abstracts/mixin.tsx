export const fontMontserratRegular = () => {
  return `
    font-family: "Montserrat", Helvetica, Arial, sans-serif;
    font-weight: 400;
  `;
};

export const fontMontserratMedium = () => {
  return `
    font-family: "Montserrat", Helvetica, Arial, sans-serif;
    font-weight: 500;
  `;
};

export const fontMontserratSemibold = () => {
  return `
    font-family: "Montserrat", Helvetica, Arial, sans-serif;
    font-weight: 600;
  `;
};

export const fontSourcesansproRegular = () => {
  return `
    font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
    font-weight: 400;
  `;
};

export const fontSourcesansproBold = () => {
  return `
    font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
    font-weight: 700;
  `;
};

const pxToRem = (size: number, base = 16) => {
  return (size / base) * 1 + "rem";
};

export const fontSize = (size = 16) => {
  return `
    font-size: ${size}px;
    font-size: ${pxToRem(size)};
  `;
};
