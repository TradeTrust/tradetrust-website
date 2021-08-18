import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
import { createRootReducer } from "./reducers";

const sagaMiddleware = createSagaMiddleware();

export const configureStore = (): ReturnType<typeof createStore> => {
  const store = createStore(createRootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(sagas);
  return store;
};
