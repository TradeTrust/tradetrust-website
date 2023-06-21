import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { ChainId } from "../../../constants/chain-info";
import { configureStore } from "../../../store";
import { SampleMobile } from "./SampleMobile";

const store = configureStore();

const renderWithStore = () => {
  return render(
    <Provider store={store}>
      <SampleMobile currentChainId={ChainId.Sepolia} />
    </Provider>
  );
};

describe("SampleMobile", () => {
  it("should have button text", () => {
    renderWithStore();
    expect(screen.getByText("Click Here")).toBeInTheDocument();
  });
});
