import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import userReducer from "./users/reducer";
import logger from "redux-logger";
import routeReducer from "./route/reducer";
import { logout } from "./users/action";

const staticReducers = {
  user: userReducer,
  route: routeReducer,
};

const sagaMiddleware = createSagaMiddleware();

function createSagaInjector(runSaga, rootSaga) {
  const injectedSagas = new Map();
  const isInjected = (key) => injectedSagas.has(key);
  const injectSaga = (key, saga) => {
    if (isInjected(key)) return;
    const task = runSaga(saga);
    injectedSagas.set(key, task);
  };
  injectSaga("root", rootSaga);
  return injectSaga;
}

function createReducer(asyncReducers) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
}
const store = createStore(
  createReducer(),
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);
store.asyncReducers = {};
const rootReducer = (state, action) => {
  if (action.type === logout().type) {
    console.log("LOGOUT STORE");
    state = undefined;
  }
  return createReducer(store.asyncReducers)(state, action);
};
store.injectReducer = (key, reducer) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(rootReducer);
  return store;
};

store.injectSaga = createSagaInjector(sagaMiddleware.run, rootSaga);
export default store;
