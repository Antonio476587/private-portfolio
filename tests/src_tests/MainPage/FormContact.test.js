/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import FormContact, { ContactForm } from "../../../src/MainPage/FormContact";

jest.mock("../../../src/Utils/TextInput", () => {

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const React = require("react");

    return function DumbTextInput(props) {

        const [value, setValue] = React.useState(props.inputProps.value);
        const onBlurF = jest.fn();

        // function onBlurF(e) {
        //     props.upperChange(e, value);
        // }
        globalThis.onBlurF = onBlurF;

        return (
            <input
                name={props.inputProps.name}
                type={props.inputProps.type}
                value={value}
            />
        );
    };
});

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

describe("ContactForm", () => {

    it("probando 123", () => {
        act(() => {
            root.render(<ContactForm active={true} />);
        });

        const inputName = document.querySelector("input[name='name']");

        console.log(inputName.outerHTML);
        
        act(() => {
            inputName.value = "totona";
        });
        
        console.log(inputName.outerHTML);
    });

});