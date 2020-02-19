export const readFileData = (acceptedFiles: File[], handleUpdate: Function, handleFileError: Function): void => {
  const reader: FileReader = new FileReader();
  if (reader.error) {
    handleFileError(reader.error);
  }
  reader.onload = () => {
    try {
      const json = JSON.parse(reader.result as string);
      handleUpdate(json);
    } catch (e) {
      handleFileError(e);
    }
  };

  acceptedFiles.map(file => reader.readAsText(file));
};
