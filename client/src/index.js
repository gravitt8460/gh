import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import configureStore from "./configureStore";
import registerServiceWorker from "./registerServiceWorker";
import "./semantic/dist/semantic.min.css";

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
registerServiceWorker();
