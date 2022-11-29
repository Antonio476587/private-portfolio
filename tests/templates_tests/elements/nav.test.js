/**
 * @jest-environment jsdom
 */
import pug from "pug";
import path from "path";
import { __dirname as __root_dirname } from "../../../pathEMS";

let compilerFunction = null;

beforeAll(() => {
    compilerFunction = pug.compileFile(path.resolve(__root_dirname, "templates/elements/nav.pug"), { pretty: "\t", doctype: "html" });

    document.body.innerHTML = compilerFunction({});
});

afterAll(() => {
    compilerFunction = null;

    document.body.innerHTML = " ";
});

it("should have the same structure as in the body.innerHTML", () => {
    expect(document.body.innerHTML).toEqual(compilerFunction({}));
});

it("should have a button", () => {
    expect(document.querySelector("button"));
});

test("there should be a button with the acknowledgeable classes and an aria-label", () => {
    expect(document.querySelector(".btn.btn-secondary.btn-home")).not.toBeNull();
    expect(document.querySelector("button").hasAttribute("aria-label")).toBeTruthy();
});

test("the path element should have a 'd' attribute", () => {
    expect(document.querySelector("path").hasAttribute("d")).toBeTruthy();
});