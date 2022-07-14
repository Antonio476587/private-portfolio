import "babel-polyfill";
import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "bootstrap";
import Page from "./Page";

declare module "react" {
    interface CSSProperties {
        [key: `--${string}`]: string | number
    }
    interface HTMLAttributes<T> {
        userselect?: string;
    }
}

declare global {
    interface EventListenerOptions {
        once: boolean;
    }
    interface EventTarget {
        value: string | number | null | email;
        name: string;
        clientWidth: string | number;
        clientHeight: string | number;
        offsetLeft: string | number;
        classList: DOMTokenList;
        style: CSSProperties;
        toggleAttribute(qualifiedName: string, force?: boolean): boolean;
    }
    type email = `${string}@${string}.${string}`;
}

const element: JSX.Element = (
    <BrowserRouter>
        <Page />
    </BrowserRouter>
);

const pathName: string = window.location.pathname;

if (pathName) {
    if (pathName === "/") ReactDOM.hydrate(element, document.getElementById("page"));
    if (pathName !== "/") ReactDOM.hydrate(element, document.getElementById("body"));
}
