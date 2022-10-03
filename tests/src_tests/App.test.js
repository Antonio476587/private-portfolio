/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";

import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import { act } from "react-dom/test-utils";

import Page from "../../src/Page";

const element = (
    <StaticRouter>
        <Page />
    </StaticRouter>
);

jest.mock("../../src/Page", () => {
    // The onClick event is the way to check if the DOM is being hydrated.
    const DummyPage = () => <button onClick={() => { globalThis.buttonBooleanClick = typeof globalThis.buttonBooleanClick === "boolean" ? !globalThis.buttonBooleanClick : globalThis.buttonBooleanClick = false; }}><div>DummyPage</div></button>;

    return DummyPage;
});

jest.mock("babel-polyfill");

beforeEach(() => {
    jest.resetModules();
});

it("shouldn't render nothing because the selected containers don't exist", () => {
    act(() => {
        require("../../src/App");
    });

    expect(document.body.innerHTML).toEqual("");
    expect(document.body.innerHTML.length).toEqual(0);

    expect(document.body.textContent).toEqual("");
    expect(document.body.textContent.length).toEqual(0);
});

describe("rendering in the DOM", () => {
    let container = null;
    const body = ReactDOMServer.renderToString(element);

    beforeEach(() => {
        container = document.createElement("div");
        container.id = globalThis.containerID;
        container.innerHTML = `${body}`;
        document.body.appendChild(container);
    });

    afterEach(() => {
        container.remove();
        container = null;
        delete globalThis.buttonBooleanClick;
    });

    describe("rendering inside the #page element", () => {

        beforeAll(() => {
            globalThis.containerID = "page";
        });

        it("should render the content inside the #page element", done => {
            act(() => {
                require("../../src/App");
            });

            setTimeout(() => {

                expect(location.pathname).toEqual("/");
                expect(document.getElementById("page").innerHTML).toEqual(body);
                expect(globalThis.buttonBooleanClick).toBeUndefined();

                act(() => {
                    document.querySelector("button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
                });

                expect(globalThis.buttonBooleanClick).toBeFalsy();

                act(() => {
                    document.querySelector("button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
                });

                expect(globalThis.buttonBooleanClick).toBeTruthy();

                done();

            }, 500);
        });

    });

    describe("rendering inside the #body element", () => {

        beforeAll(() => {
            delete globalThis.location;
            globalThis.location = new URL("http://test.fantonix.space/energy/soldout/needit");
            globalThis.containerID = "body";
        });

        it("should render the content inside the #body element", done => {
            act(() => {
                require("../../src/App");
            });

            setTimeout(() => {

                expect(location.pathname).not.toEqual("/");
                expect(document.getElementById("body").innerHTML).toEqual(body);
                expect(globalThis.buttonBooleanClick).toBeUndefined();

                act(() => {
                    document.querySelector("button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
                });

                expect(globalThis.buttonBooleanClick).toBeFalsy();

                act(() => {
                    document.querySelector("button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
                });

                expect(globalThis.buttonBooleanClick).toBeTruthy();

                done();

            }, 500);
        });

    });

});