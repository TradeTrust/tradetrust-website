import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { DemoCertMobile } from "./DemoCertMobile";
import { configureStore } from "../../../store";

const store = configureStore();

const renderWithStore = () => {
  return render(
    <Provider store={store}>
      <DemoCertMobile />
    </Provider>
  );
};

describe("DemoCertMobile", () => {
  it("should have button text", () => {
    renderWithStore();
    expect(screen.getByText("Click Here")).toBeInTheDocument();
  });
});
