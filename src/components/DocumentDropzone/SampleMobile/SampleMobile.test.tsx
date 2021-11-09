import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { SampleMobile } from "./SampleMobile";
import { configureStore } from "../../../store";

const store = configureStore();

const renderWithStore = () => {
  return render(
    <Provider store={store}>
      <SampleMobile />
    </Provider>
  );
};

describe("SampleMobile", () => {
  it("should have button text", () => {
    renderWithStore();
    expect(screen.getByText("Click Here")).toBeInTheDocument();
  });
});
