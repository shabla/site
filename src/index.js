import React from "react";
import ReactDOM from "react-dom";

import App from "./App/App";

import "normalize.css";
import "./ui/styles/main.scss";

ReactDOM.render(
    <App />,
    document.getElementById("root")
);

module.hot.accept();