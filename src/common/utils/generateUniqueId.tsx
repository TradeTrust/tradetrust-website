export const generateUniqueId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
}; // https://gist.github.com/gordonbrander/2230317
