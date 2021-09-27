export const getFormValue = (formData: { [key: string]: any }, key: string): string => {
  let keys = key.split(".");
  while (keys.length > 1) {
    formData = formData[keys[0]];
    keys = keys.slice(1);
  }

  return formData[keys[0]];
};
