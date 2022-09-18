/**
 * @jest-environment jsdom
 */
import template from "../../server/template";

test("Inside of the div#body should render the default comments", () => {
    const newChildren = template("");
    document.querySelector("html").innerHTML = newChildren;

    const  divBodyContentLines = document.querySelector("div#body").innerHTML.trim().split("\n");

    divBodyContentLines.forEach((line) => {
        expect(line.trim()).toMatch(/<!-- (.)+ -->/);
    });
});

test("Inside of the div#body > div.textContent shouldn't render 'nothing'", () => {
    const elementalMiQueridoSherlock = document.createElement("div");
    const contenidoParaElemental = document.createTextNode("nothing");
    elementalMiQueridoSherlock.appendChild(contenidoParaElemental);

    const newChildren = template(elementalMiQueridoSherlock.outerHTML);
    document.querySelector("html").innerHTML = newChildren;

    expect(document.querySelector("div#body").firstElementChild.nodeName).toEqual("DIV");
    expect(document.querySelector("div#body div").innerHTML).toEqual("nothing");
});