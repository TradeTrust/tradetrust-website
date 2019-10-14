import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import sagas from "./sagas";
import reducers from "./reducers";
import { History } from "history";

const sagaMiddleware = createSagaMiddleware();

const initStore = (history: History) => {
  const store = createStore(
    reducers(history),
    composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
  );
  sagaMiddleware.run(sagas);
  return store;
};

export default initStore;
