import { demo, setActive, reset } from "./demo";

describe("demo", () => {
  it("should set state to true when setActive", () => {
    const initialState = { value: false };
    const finalState = { value: true };
    const state = demo(initialState, setActive());

    expect(state).toStrictEqual(finalState);
  });

  it("should set state to false when reset", () => {
    const initialState = { value: true };
    const finalState = { value: false };
    const state = demo(initialState, reset());

    expect(state).toStrictEqual(finalState);
  });
});
