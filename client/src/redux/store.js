import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./reduce";

const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //esta linea sirve para conectarme con la extension del navegador >>>REDUX DEVTOOLS

const store = createStore(
  reducer,
  composeEnhacer(applyMiddleware(thunkMiddleware))
);

export default store;
