/**
 * @jest-environment jsdom
 */
import templateHome from "../../server/templateHome";

test("Inside of the div#page shouldn't render nothing", () => {
    const newChildren = templateHome("");
    document.querySelector("html").innerHTML = newChildren;

    expect(document.querySelector("div#page").innerHTML.trim()).toEqual("");
});

test("Inside of the div#page shouldn render 'nothing'", () => {
    const newChildren = templateHome("nothing");
    document.querySelector("html").innerHTML = newChildren;

    expect(document.querySelector("div#page").innerHTML.trim()).toEqual("nothing");
});