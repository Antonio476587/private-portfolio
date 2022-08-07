/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import NotFound from "../../src/NotFound";

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test("H2 Content", () => {
    act(() => {
        render(<NotFound />, container);
    });

    expect(container.querySelector("h2").textContent).toEqual("Hmmm... Page not found");
});

test("H3 not found content", () => {
    act(() => {
        render(<NotFound />, container);
    });

    expect(container.querySelector(".not-found-content > h3").textContent).toEqual("This page don't exits or the link is incorrect. Try:");
});

test("List elements in not found content", () => {
    act(() => {
        render(<NotFound />, container);
    });

    const liElements = container.querySelectorAll(".not-found-content li");
    for (let i = 0; i < liElements.length; i++) {
        expect(liElements[i].nodeName).toEqual("LI");
        expect(liElements[i].parentNode.nodeName).toEqual("UL");
        expect(liElements[i].children.length).toEqual(1);
        expect(liElements[i].children[0].nodeName).toEqual("H4");
    }
});

test("H4 a href element event", () => {
    act(() => {
        render(<NotFound />, container);
    });

    const LaunchGameLink = container.querySelector("h4 a");
    expect(LaunchGameLink.dispatchEvent(new MouseEvent("click", { bubbles: true }))).toBeTruthy();
});

test("First H3 in not found link", () => {
    act(() => {
        render(<NotFound />, container);
    });

    expect(container.querySelectorAll(".not-found-link h3")[0].textContent).toEqual("Maybe you would like to play a game ->");
});

test("BUTTON a href element event in not found link", () => {
    act(() => {
        render(<NotFound />, container);
    });

    const LaunchGameLink = container.querySelector(".not-found-link button");
    expect(LaunchGameLink.dispatchEvent(new MouseEvent("click", { bubbles: true }))).toBeTruthy();
});

test("Second H3 in not found link", () => {
    act(() => {
        render(<NotFound />, container);
    });

    expect(container.querySelectorAll(".not-found-link h3")[1].textContent).toEqual(":( == :)¯¹");
});