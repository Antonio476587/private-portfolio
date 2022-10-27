/**
 * @jest-environment jsdom
 */
import pug from "pug";
import path from "path";
import { __dirname as __root_dirname } from "../../../pathEMS";

let compilerFunction = null;

beforeAll(() => {
    compilerFunction = pug.compileFile(path.resolve(__root_dirname, "templates/elements/preload.pug"), { pretty: "\t", doctype: "html" });

    document.body.innerHTML = compilerFunction({});
});

afterAll(() => {
    compilerFunction = null;

    document.body.innerHTML = " ";
});

it("should have the same structure as in the body.innerHTML", () => {
    expect(document.body.innerHTML).toEqual(compilerFunction({}));
});

test("it should have the correct structure", () => {
    expect(document.querySelector(".preload")).not.toBeNull();
    expect(document.querySelector(".preload").firstElementChild).toEqual(document.querySelector("svg"));

    expect(document.querySelector(".preload").nextElementSibling).toEqual(document.querySelector("script"));

    for (let i = 0; i < document.querySelector("svg").children.length; i++) {
        expect(document.querySelector("svg").children[i].nodeName).toEqual("path");
        expect(document.querySelector("svg").children[i].hasAttribute("d")).toBeTruthy();
    }
}); 

test("preload script", () => {
    const preloadScriptHTMLElement = document.querySelector("script[src=\"/js/preload.js\"]");

    expect(preloadScriptHTMLElement).not.toBeNull();
});