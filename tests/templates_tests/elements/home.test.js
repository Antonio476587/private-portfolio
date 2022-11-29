/**
 * @jest-environment jsdom
 */
import pug from "pug";
import path from "path";
import { __dirname as __root_dirname } from "../../../pathEMS";

let compilerFunction = null;

beforeAll(() => {
    compilerFunction = pug.compileFile(path.resolve(__root_dirname, "templates/elements/home.pug"), { pretty: "\t", doctype: "html" });

    document.body.innerHTML = compilerFunction({});
});

afterAll(() => {
    compilerFunction = null;

    document.body.innerHTML = " ";
});

it("should have the same structure as in the body.innerHTML", () => {
    expect(document.body.innerHTML).toEqual(compilerFunction({}));
});

describe("mandatory classes for animation", () => {

    test("bg-complement-container and child elements", () => {
        const bgComplementContainer = document.querySelector(".bg-complement-container");
        const bgComplement = document.querySelector(".bg-complement");

        expect(bgComplementContainer).not.toBeNull();
        expect(bgComplementContainer.children[0]).toEqual(bgComplement);
        expect(bgComplement.children[0].nodeName).toEqual("DIV");

        for (let i = 0; i < bgComplement.children[0].children.length; i++) {
            expect(bgComplement.children[0].children[i].nodeName).toEqual("SPAN");
            expect(bgComplement.children[0].children[i].getAttribute("style")).toEqual("--i:" + (i + 1));
        }
    });

    test("con-welcome class", () => {
        expect(document.querySelector(".con-welcome")).not.toBeNull();
    });

});