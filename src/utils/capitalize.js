export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const capitalizeKeys = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[capitalizeFirstLetter(key)] = obj[key];
    return acc;
  }, {});
};
