import React from "react";
import ReactDOM from "react-dom";

import { App } from "components";

import "normalize.css";

ReactDOM.render(
    <App />,
    document.getElementById("root")
);

module.hot.accept();