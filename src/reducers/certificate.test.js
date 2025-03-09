import reducer, { initialState, resetCertificateState, updateFilename } from "./certificate";

describe("reducers", () => {
  describe("reset certificate", () => {
    it("should reset the state to initial state", () => {
      const prevState = { foo: "bar" };
      expect(reducer(prevState, resetCertificateState())).toStrictEqual(initialState);
    });
  });

  describe("update filename", () => {
    it("should update the filename state", () => {
      const prevState = { ...initialState };
      const filename = "test.tt";
      expect(reducer(prevState, updateFilename(filename))).toStrictEqual({
        ...initialState,
        filename,
      });
    });
  });
});
