import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";
import { store } from "./Product";
import { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { createRoot } from "react-dom/client";

let rootElement = document.getElementById("root");
let root = createRoot(rootElement);
// import * as serviceWorker from "./serviceWorker";
// const root = ReactDOM.createRoot(document.getElementById('root'));s
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <PersistGate Loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </StateProvider>
  </React.StrictMode>
);
