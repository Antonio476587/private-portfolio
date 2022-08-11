/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
// This is for carousel functionality
import bootstrap from "bootstrap";

import Works from "../../../src/Works";

jest.mock("../../../src/Works/worksPresentation", () => {
    const contents = [
        {
            h1: "ALTAGAMMA",
            p: "Illuminati Illuminati Illuminati br br",
            urlId: "https://www.youtube.com/watch?v=TkFNBJLzzn4",
        },
        {
            h1: "ALTAGAMMA",
            p: "Illuminati Illuminati Illuminati br br",
            urlId: "https://www.youtube.com/watch?v=TkFNBJLzzn4",
        },
        {
            h1: "ALTAGAMMA",
            p: "Illuminati Illuminati Illuminati br br",
            urlId: "https://www.youtube.com/watch?v=TkFNBJLzzn4",
        },
    ];
    return contents;
});

let container = null;
let root = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    jest.useFakeTimers();
});

afterEach(() => {
    root.unmount();
    container.remove();
    container = null;
    jest.useRealTimers();
});

it("should just have 3 children", () => {
    act(() => {
        root.render(<Works />);
    });

    expect(container.querySelector(".carousel-inner").children.length).toBe(3);
});

it("will active next carousel item", () => {
    act(() => {
        root.render(<Works />);
    });

    const nextButton = container.querySelector(".carousel-control-next");
    const firstActiveCarouselItem = container.querySelector(".carousel-item.active");

    nextButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(firstActiveCarouselItem.nextElementSibling.classList).toContain("carousel-item-next", "carousel-item-start");


    act(() => {
        jest.advanceTimersByTime(500);
    });
    expect(container.querySelector(".carousel-item.active")).toBe(firstActiveCarouselItem.nextElementSibling);
});

it("will active prev carousel item", () => {
    act(() => {
        root.render(<Works />);
    });

    const prevButton = document.querySelector(".carousel-control-prev");
    const carouselItemsParent = document.querySelector(".carousel-inner");
    const lastCarouselItem = carouselItemsParent.lastChild;

    prevButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(lastCarouselItem.classList).toContain("carousel-item-prev", "carousel-item-end");


    act(() => {
        jest.advanceTimersByTime(500);
    });
    expect(document.querySelector(".carousel-item.active")).toBe(lastCarouselItem);


    prevButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(lastCarouselItem.previousSibling.classList).toContain("carousel-item-prev", "carousel-item-end");


    act(() => {
        jest.advanceTimersByTime(500);
    });
    expect(document.querySelector(".carousel-item.active")).toBe(lastCarouselItem.previousSibling);
});

test("Work presentation structure should be equal to the interface", () => {
    act(() => {
        root.render(<Works />);
    });

    const carouselCaption = document.querySelector(".carousel-caption");

    expect(carouselCaption.querySelector("h1").textContent).toEqual("ALTAGAMMA");
    expect(carouselCaption.querySelectorAll("p")[0].textContent).toEqual("Illuminati Illuminati Illuminati br br");
    expect(carouselCaption.querySelector("a[href='https://www.youtube.com/watch?v=TkFNBJLzzn4']").textContent).toEqual("See More");
});