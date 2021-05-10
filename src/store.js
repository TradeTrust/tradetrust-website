import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import sagas from "./sagas";
import { createRootReducer } from "./reducers";

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

export const configureStore = () => {
  const store = createStore(
    createRootReducer(history),
    composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
  );
  sagaMiddleware.run(sagas);
  return store;
};
