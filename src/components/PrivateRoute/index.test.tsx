import React from "react";
import { render, screen } from "@testing-library/react";
import { Router, Route, Switch } from "react-router-dom";
import { createMemoryHistory } from "history";
import { useMagicContext } from "../../common/contexts/MagicContext";
import { PrivateRoute } from "./";

jest.mock("../../common/contexts/MagicContext");
const mockUseMagicContext = useMagicContext as jest.Mock;

const Private = () => <div>Private</div>;
const Public = () => <div>Public</div>;

describe("private route", () => {
  it("should render public by default", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/private">
            <Private />
          </PrivateRoute>
          <Route exact path="/">
            <Public />
          </Route>
        </Switch>
      </Router>
    );

    expect(screen.getByText("Public")).toBeInTheDocument();
  });

  it("should render public if attempt to private", () => {
    mockUseMagicContext.mockReturnValue({
      isLoggedIn: false,
    });

    const history = createMemoryHistory({ initialEntries: ["/private"] });

    render(
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/private">
            <Private />
          </PrivateRoute>
          <Route exact path="/">
            <Public />
          </Route>
        </Switch>
      </Router>
    );

    expect(screen.getByText("Public")).toBeInTheDocument();
  });

  it("should render private if authenticated", () => {
    mockUseMagicContext.mockReturnValue({
      isLoggedIn: true,
    });

    const history = createMemoryHistory({ initialEntries: ["/private"] });

    render(
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/private">
            <Private />
          </PrivateRoute>
          <Route exact path="/">
            <Public />
          </Route>
        </Switch>
      </Router>
    );

    expect(screen.getByText("Private")).toBeInTheDocument();
  });
});
