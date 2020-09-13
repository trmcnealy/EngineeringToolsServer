
import * as React from "react";
import * as ReactDOM from "react-dom";

import {App} from "Programs";

//import ReactRouterDom from "react-router-dom";

const darkTheme = true;

//const baseUrl = window.location.origin;

const bodyElement = document.getElementById("body");

bodyElement!.classList.add(darkTheme ? "dark-theme" : "light-theme");

const rootElement = document.getElementById("root");

ReactDOM.render(
    <App DarkMode={darkTheme} />,
    rootElement
);
