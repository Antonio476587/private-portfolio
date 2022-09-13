/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import FormContact, { ContactForm } from "../../../src/MainPage/FormContact";

let container = null;
let root = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
});

afterEach(() => {
    root.unmount();
    container.remove();
    container = null;
});

describe("FormContact", () => {

    it("should change the ContactForm class by clicking in the button", () => {
        act(() => {
            root.render(<FormContact />);
        });

        const bodyButton = document.querySelector(".contact-body-button#envelope-button");

        expect(document.querySelector(".contact-body-div").classList.contains("contact-body-active")).toBeFalsy();
        
        act(() => {
            bodyButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        
        expect(document.querySelector(".contact-body-div").classList.contains("contact-body-active")).toBeTruthy();
        
        act(() => {
            bodyButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(document.querySelector(".contact-body-div").classList.contains("contact-body-active")).toBeFalsy();
    });

    it("should change the button content by clicking in the button", () => {
        act(() => {
            root.render(<FormContact />);
        });

        const bodyButton = document.querySelector(".contact-body-button#envelope-button");
        // IH is equal to inner html
        const firstBodyButtonIH = bodyButton.innerHTML;
        
        act(() => {
            bodyButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        
        const secondBodyButtonIH = bodyButton.innerHTML;
        expect(secondBodyButtonIH).not.toEqual(firstBodyButtonIH);
        
        act(() => {
            bodyButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        
        const thirdBodyButtonIH = bodyButton.innerHTML;
        expect(thirdBodyButtonIH).toEqual(firstBodyButtonIH);
    });

});

// describe("ContactForm", () => {});