import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { OverlayContextProvider } from "../../../common/contexts/OverlayContext";
import { OverlayDemo } from "./Overlay.mock";
import { Textual } from "./OverlayContent";

describe("overlay", () => {
  it("should render correctly with the given title and description", () => {
    render(
      <OverlayContextProvider>
        <OverlayDemo buttonText="Text">
          <Textual title="Textual">
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
              explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
              dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
              incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
              exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui
              dolorem eum fugiat quo voluptas nulla pariatur
            </p>
          </Textual>
        </OverlayDemo>
      </OverlayContextProvider>
    );

    fireEvent.click(screen.getByText(/Text/i));
    expect(screen.getByTestId("overlay-title").textContent).toBe("Textual");
    expect(screen.getByText(/consequuntur/i)).toBeInTheDocument();
  });
});
