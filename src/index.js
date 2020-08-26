import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "normalize.css";

import { App } from "components";
import store from "./store";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// module.hot.accept();