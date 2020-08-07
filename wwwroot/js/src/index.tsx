
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";

//import ReactRouterDom from "react-router-dom";

const baseUrl = window.location.origin;

const rootElement = document.getElementById("root");

ReactDOM.render(
    <App DarkMode={true} />,
    rootElement
);
