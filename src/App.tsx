import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "bootstrap";
import Page from "./Page";

const element = (
    <BrowserRouter>
        <Page />
    </BrowserRouter>
);

const pathName: string = window.location.pathname;

if (pathName) {
    if (pathName === "/") ReactDOM.hydrate(element, document.getElementById("page"));
    if (pathName !== "/") ReactDOM.hydrate(element, document.getElementById("body"));
}
