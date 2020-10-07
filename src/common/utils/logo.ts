// https://stackoverflow.com/questions/3971841/how-to-resize-images-proportionally-keeping-the-aspect-ratio
interface GetDimensionsI {
  width: number;
  height: number;
  maxWidth: number;
  maxHeight: number;
}

interface GetReturnedDimensionsI {
  width: number;
  height: number;
}

export const getDimensions = ({ width, height, maxWidth, maxHeight }: GetDimensionsI): GetReturnedDimensionsI => {
  const ratio = Math.min(maxWidth / width, maxHeight / height);
  return { width: width * ratio, height: height * ratio };
};
