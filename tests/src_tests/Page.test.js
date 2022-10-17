/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

// For functionality purposes
import { BrowserRouter } from "react-router-dom";

import Page from "../../src/Page";

const MainElementTextContent = "MainElement";
const MainElementTwoTextContent = "MainElementTwo";

jest.mock("../../src/routes", () => {
    function MainElement() {
        return (
            <div>
                {MainElementTextContent}
            </div>
        );
    }
    function MainElementTwo() {
        return (
            <div>
                {MainElementTwoTextContent}
            </div>
        );
    }

    const routes = [
        { path: "/", element: <MainElement /> },
        { path: "/two", element: <MainElementTwo /> },
        { path: "/2", element: <MainElementTwo /> },
    ];
    return routes;
});

function PageWrapper() {
    return (
        <BrowserRouter>
            <Page />
        </BrowserRouter>
    );
}

let container = null;
let root = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
});

afterEach(() => {
    act(() => {
        root.unmount();
    });
    container.remove();
    container = null;
});

describe("should render the content of the exact route", () => {

    it("the route '/' should render the MainElement", () => {
        act(() => {
            delete globalThis.location;
            const location = new URL("http://test.fantonix.space/");
            globalThis.location = location;
            root.render(<PageWrapper />);
        });

        expect(document.body.textContent).toEqual(MainElementTextContent);
    });

    it("the route '/two' should render the MainElementTwo", () => {
        act(() => {
            delete globalThis.location;
            const location = new URL("http://test.fantonix.space/two");
            globalThis.location = location;
            root.render(<PageWrapper />);
        });

        expect(document.body.textContent).toEqual(MainElementTwoTextContent);
    });

    it("the route '/2' should render the MainElementTwo", () => {
        act(() => {
            delete globalThis.location;
            const location = new URL("http://test.fantonix.space/2");
            globalThis.location = location;
            root.render(<PageWrapper />);
        });

        expect(document.body.textContent).toEqual(MainElementTwoTextContent);
    });

});
