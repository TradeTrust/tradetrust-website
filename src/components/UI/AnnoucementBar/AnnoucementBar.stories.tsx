import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import initStore from "./../../../store";
import { ReactRouterLinkButtonSolidOrangeWhite } from "./../../UI/Button";
import { AnnoucementBar } from "./AnnoucementBar";

const history = createBrowserHistory();
const store = initStore(history);

export default {
  title: "UI/AnnoucementBar",
  component: AnnoucementBar,
  parameters: {
    componentSubtitle: "Banner for any announcements.",
  },
};

export const Default = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/">
            <AnnoucementBar className="bg-brand-navy text-white">
              <div className="row align-items-center">
                <div className="col-12">
                  <p className="mb-0">Empty banner</p>
                </div>
              </div>
            </AnnoucementBar>
          </Route>
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

export const WebinarSeries = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/">
            <AnnoucementBar className="bg-brand-navy text-white" backgroundImage="/static/images/webinar/banner.jpg">
              <div className="row align-items-center">
                <div className="col-12 col-lg-7">
                  <img
                    className="banner-title"
                    src="/static/images/webinar/banner-title.png"
                    alt="TradeTrust Tech Webinar Series banner title"
                  />
                </div>
                <div className="col-12 col-lg-auto ml-lg-auto mt-4 mt-lg-0">
                  <ReactRouterLinkButtonSolidOrangeWhite to="/webinar" large>
                    View More
                  </ReactRouterLinkButtonSolidOrangeWhite>
                </div>
              </div>
            </AnnoucementBar>
          </Route>
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};
