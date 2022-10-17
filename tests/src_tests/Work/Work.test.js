/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import { useParams } from "react-router-dom";

import WorkWrapper, { Work } from "../../../src/Work";

jest.mock("../../../src/Work/HeaderWork", () => {
    return function RubberHeaderWork() {
        return (
            <div>
                ta to saldo
            </div>
        );
    };
});

jest.mock("../../../src/Work/workContents", () => {
    const dummyWorkContents = [
        {
            h2: "Tirale al rubio si es pa negociar",
            p1: "You will never know someone well enough to criticize them.",
            img1: [
                "/imag/inate.mp4",
                "Yo tengo hermanos, no tengo amigos",
            ],
            img2: [
                "/imag/inate.mp4",
                "Yo tengo hermanos, no tengo amigos",
            ],
            p2: "You will never know someone well enough to criticize them.",
            p3: "You will never know someone well enough to criticize them.",
            img3: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            p4: "You will never know someone well enough to criticize them.",
            img4: [
                "/imag/inate.mp4",
                "Yo tengo hermanos, no tengo amigos",
            ],
            styles: [],
        },
        {
            h2: "Tirale al rubio si es pa negociar",
            p1: "You will never know someone well enough to criticize them.",
            img1: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            img2: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            p2: "You will never know someone well enough to criticize them.",
            p3: "You will never know someone well enough to criticize them.",
            img3: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            p4: "You will never know someone well enough to criticize them.",
            img4: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            styles: ["#AAAAAA", "#BBBBBB", "#CCCCCC"],
        },
        {
            h2: "Tirale al rubio si es pa negociar",
            p1: "You will never know someone well enough to criticize them.",
            img1: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            img2: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            p2: "You will never know someone well enough to criticize them.",
            p3: "You will never know someone well enough to criticize them.",
            img3: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            p4: "You will never know someone well enough to criticize them.",
            img4: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            styles: ["#AAAAAA", "#BBBBBB", "#CCCCCC"],
        },
    ];
    return dummyWorkContents;
});

jest.mock("react-router-dom");

let container = null;
let root = null;
let location = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    location = new URL("https://test.fantonix.space");
    location.assign = jest.fn();
    window.location = location;
});

afterEach(() => {
    act(() => {
        root.unmount();
    });
    container.remove();
    container = null;
    location = null;
    delete window.location;
});

describe("Does the WorkWrapper work well?", () => {

    it("should render the component not found", () => {
        act(() => {
            const urlParams = { id: 2 };
            useParams.mockReturnValue(urlParams);
            root.render(<WorkWrapper />);
        });

        expect(document.querySelector(".not-found h2").textContent).toEqual("Hmmm... Page not found");

        act(() => {
            const urlParams = "id";
            useParams.mockReturnValue(urlParams);
            root.render(<WorkWrapper />);
        });

        expect(document.querySelector(".not-found h2").textContent).toEqual("Hmmm... Page not found");

        act(() => {
            const urlParams = { id: "10" };
            useParams.mockReturnValue(urlParams);
            root.render(<WorkWrapper />);
        });

        expect(document.querySelector(".not-found h2").textContent).toEqual("Hmmm... Page not found");
    });

    it("should render the component", () => {
        act(() => {
            const urlParams = { id: "2" };
            useParams.mockReturnValue(urlParams);
            root.render(<WorkWrapper />);
        });

        expect(document.querySelector("h2[title='work-title']").textContent).toEqual("Tirale al rubio si es pa negociar");
    });

});

describe("It's time to see whether the Work component works", () => {

    it("should be have the dummyWorkContents' object content", () => {
        act(() => {
            const urlParams = { id: "2" };
            useParams.mockReturnValue(urlParams);
            root.render(<WorkWrapper />);
        });

        expect(document.querySelector("#body-work").getAttribute("style")).toEqual("--color-body-background: #AAAAAA; --color-foreground: #BBBBBB; --color-foreground-2: #CCCCCC;");
        expect(document.querySelector("h2[title='work-title']").textContent).toEqual("Tirale al rubio si es pa negociar");
        document.querySelectorAll("p").forEach((elem) => {
            expect(elem.textContent).toEqual("You will never know someone well enough to criticize them.");
        });
        document.querySelectorAll("img").forEach((elem) => {
            expect(elem.src).toEqual("http://localhost/imag/inate.jpg");
            expect(elem.alt).toEqual("Yo tengo hermanos, no tengo amigos");
        });

    });


    it("should render two videos and two images", () => {
        act(() => {
            const urlParams = { id: "1" };
            useParams.mockReturnValue(urlParams);
            root.render(<WorkWrapper />);
        });

        expect(document.querySelectorAll("img").length).toEqual(2);
        expect(document.querySelectorAll("video").length).toEqual(2);

        expect(document.querySelectorAll("img")[0].src).toEqual("http://localhost/imag/inate.mp4");
        expect(document.querySelectorAll("img")[1].src).toEqual("http://localhost/imag/inate.jpg");
        document.querySelectorAll("video").forEach((elem) => {
            expect(elem.src).toEqual("http://localhost/imag/inate.mp4");
        });

    });

    it("should have the default styles", () => {
        act(() => {
            const urlParams = { id: "1" };
            useParams.mockReturnValue(urlParams);
            root.render(<WorkWrapper />);
        });

        expect(document.querySelector("#body-work").getAttribute("style")).toEqual("--color-body-background: #EBEBFF; --color-foreground: #0C043E; --color-foreground-2: #111;");

    });

    describe("Buttons functionality", () => {

        it("should have the aria-label equal to Next Section or Previous Section", () => {
            const onClickWrapper = jest.fn();
            act(() => {
                const urlParams = { id: "2" };
                useParams.mockReturnValue(urlParams);
                root.render(
                    <button onClick={onClickWrapper}>
                        <WorkWrapper />
                    </button>
                );
            });

            act(() => {
                document.querySelector("button[aria-label='Next Section']").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });

            expect(onClickWrapper.mock.lastCall[0].target.classList.toString()).toEqual("main-footer-span");
            expect(onClickWrapper.mock.lastCall[0].target.getAttribute("aria-label")).toEqual("Next Section");
            expect(onClickWrapper).toHaveBeenCalledTimes(1);

            act(() => {
                document.querySelector("button[aria-label='Previous Section']").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });

            expect(onClickWrapper.mock.lastCall[0].target.classList.toString()).toEqual("main-footer-span");
            expect(onClickWrapper.mock.lastCall[0].target.getAttribute("aria-label")).toEqual("Previous Section");
            expect(onClickWrapper).toHaveBeenCalledTimes(2);
        });

        it("should call location assign when a button it's pressed", () => {
            act(() => {
                const urlParams = { id: "2" };
                useParams.mockReturnValue(urlParams);
                root.render(<WorkWrapper />);
            });

            act(() => {
                document.querySelector("button[aria-label='Next Section']").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });

            expect(location.assign).toHaveBeenCalledWith("3");
            expect(location.assign).toHaveBeenCalledTimes(1);
            
            act(() => {
                document.querySelector("button[aria-label='Previous Section']").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });
            
            expect(location.assign).toHaveBeenCalledWith("1");
            expect(location.assign).toHaveBeenCalledTimes(2);

        });

        it("should return without calling location.assign", () => {
            act(() => {
                const urlParams = { id: "1" };
                useParams.mockReturnValue(urlParams);
                root.render(<WorkWrapper />);
            });

            act(() => {
                document.querySelector("button[aria-label='Previous Section']").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });

            expect(location.assign).not.toHaveBeenCalled();
            
        });

    });

    it("should render the first component", () => {
        act(() => {
            const urlParams = { id: "4" };
            useParams.mockReturnValue(urlParams);
            root.render(<WorkWrapper />);
        });

        expect(document.querySelector("#body-work").getAttribute("style")).toEqual("--color-body-background: #EBEBFF; --color-foreground: #0C043E; --color-foreground-2: #111;");
    });

    test("When the index is out of bound, it will render NotFound", () => {
        act(() => {
            const urlParams = { id: "10" };
            useParams.mockReturnValue(urlParams);
            root.render(<WorkWrapper />);
        });

        expect(document.getElementById("body-work")).toBeNull();
        expect(document.querySelector(".not-found")).toBeDefined();
    });

});