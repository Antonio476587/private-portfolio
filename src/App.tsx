import "babel-polyfill";
import React, { CSSProperties } from "react";
import { hydrateRoot } from "react-dom/client";
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
    interface Element {
        offsetHeight: string | number;
    }
    type email = `${string}@${string}.${string}`;
    // eslint-disable-next-line no-var
    var scrollMaxY: number;
}

const element: JSX.Element = (
    <BrowserRouter>
        <Page />
    </BrowserRouter>
);

const pathName: string = window.location.pathname;
const containerPage = document.getElementById("page");
const containerBody = document.getElementById("body");

if (pathName) {
    if (pathName === "/" && containerPage) hydrateRoot(containerPage, element);
    if (pathName !== "/" && containerBody) hydrateRoot(containerBody, element);
}