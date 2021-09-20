import { demoDocument, setActive, reset } from "./demoDocument";

describe("demoDocument", () => {
  it("should set state to true when setActive", () => {
    const initialState = { isDemoDocument: false };
    const finalState = { isDemoDocument: true };
    const state = demoDocument(initialState, setActive());

    expect(state).toStrictEqual(finalState);
  });

  it("should set state to false when reset", () => {
    const initialState = { isDemoDocument: true };
    const finalState = { isDemoDocument: false };
    const state = demoDocument(initialState, reset());

    expect(state).toStrictEqual(finalState);
  });
});
