/**
 * @jest-environment jsdom
 */

// For functionality purpose
import anime from "animejs";
import gsap from "gsap";

jest.mock("gsap");
jest.mock("animejs", () => {
    return function dummyAnimeJS() {
        return {
            finished: new Promise((resolve, reject) => {
                resolve();
            }),
        };
    };
});


beforeAll(() => {

    // Global variables

    globalThis.anime = anime;
    globalThis.gsap = gsap;

    globalThis.scrollY = 1800;
});

beforeEach(() => {
    // Reseting modules
    jest.resetModules();

    // Global varialbes

    globalThis.gsap.to = jest.fn();

    delete globalThis.scrollTo;
    globalThis.scrollTo = jest.fn();

    // HTML Content
    document.body.innerHTML = " ";

    const preload = document.createElement("div");
    const containerWelcome = document.createElement("div");
    const home = document.createElement("div");
    const pathsContainer = document.createElement("svg");

    for (let i = 0; i < 3; i++) {
        const path = document.createElement("path");
        path.setAttribute("d", "M0,5 h-3 M0,7 h3 ,9 h-1");
        path.setAttribute("stroke", "rgba(255,0,0,.5)");
        path.setAttribute("stroke-dasharray", "3 1");
        path.setAttribute("stroke-dashoffset", "1");

        pathsContainer.appendChild(path);
    }

    preload.classList.add("preload");
    containerWelcome.classList.add("con-welcome");
    home.classList.add("home");
    pathsContainer.classList.add("svg");

    Object.defineProperty(home, "offsetTop", {
        writable: true,
        value: scrollY / 3,
    });

    const documentFragment = document.createDocumentFragment();

    documentFragment.append(preload);
    documentFragment.append(containerWelcome);
    documentFragment.append(home);
    documentFragment.appendChild(pathsContainer);

    document.body.appendChild(documentFragment);
});

test("when the load event is dispatched in the window", () => {
    require("../../../public/js/preload");

    const scrollMaxYExist = globalThis.scrollMaxY ? true : false;

    window.dispatchEvent(new Event("load", { bubbles: true }));

    expect(globalThis.scrollTo).toHaveBeenCalled();
    expect(globalThis.scrollTo).toHaveBeenCalledWith(0, document.querySelector(".home").offsetTop);
    // If scrollMaxY doesn't exist it should be implementend when the event is dispatched
    if (!scrollMaxYExist) expect(globalThis.scrollMaxY).toEqual(globalThis.scrollY);
    expect(globalThis.scrollMaxY).toBeDefined();

});

describe("When location.pathname is equal to /", () => {

    beforeEach(() => {
        // Global variables
        delete globalThis.scrollTo;
        globalThis.scrollTo = jest.fn();

    });

    test("randomValues function", () => {

        expect(globalThis.gsap.to).not.toHaveBeenCalled();

        require("../../../public/js/preload");

        // This is a pointer to the randomValues function, it's recursive
        globalThis.gsap.to.mock.calls[0][1].onComplete();

        // If the window is loaded, it shouldn't call the function anymore
        window.dispatchEvent(new Event("load", { bubbles: true }));
        globalThis.gsap.to.mock.calls[0][1].onComplete();

        expect(globalThis.gsap.to).toHaveBeenCalledTimes(2);
        expect(globalThis.gsap.to.mock.calls[0][0]).toEqual(document.querySelector(".preload"));
    });

    describe("preloadCharged function", () => {

        test("when the window is not loaded yet", done => {

            require("../../../public/js/preload");

            // Reset 
            globalThis.gsap.to = jest.fn();


            setTimeout(() => {

                window.dispatchEvent(new Event("load", { bubbles: true }));

                expect(globalThis.scrollTo).toHaveBeenCalled();
                expect(globalThis.scrollTo).toHaveBeenCalledWith(0, document.querySelector(".home").offsetTop);

                expect(globalThis.gsap.to.mock.calls.length).toEqual(3);
                expect(globalThis.gsap.to.mock.calls[0][0]).toEqual(document.querySelectorAll(".svg path")[0]);

                done();
            }, 0);

        });

        test("when the window is loaded already", done => {

            require("../../../public/js/preload");

            // Reset 
            globalThis.gsap.to = jest.fn();

            window.dispatchEvent(new Event("load", { bubbles: true }));

            setTimeout(() => {

                expect(globalThis.gsap.to.mock.calls.length).toEqual(3);
                expect(globalThis.gsap.to.mock.calls[0][0]).toEqual(document.querySelectorAll(".svg path")[0]);

                done();
            }, 0);

        });

    });

    test("preloadFinished function and handlers", done => {

        require("../../../public/js/preload");

        const preload = document.querySelector(".preload");
        const preloadClassListString = preload.classList.toString();

        window.dispatchEvent(new Event("load", { bubbles: true }));

        const conWelcome = document.querySelector(".con-welcome");
        const conWelcomeClassListString = conWelcome.classList.toString();
        const conWelcomeClassListObject = conWelcome.classList;

        const conWelcomeSpy = jest.spyOn(conWelcomeClassListObject, "add");

        setTimeout(() => {

            globalThis.gsap.to.mock.lastCall[1].onComplete();

            expect(preloadClassListString).not.toEqual(preload.classList.toString());

            preload.dispatchEvent(new Event("animationend", { bubbles: true }));

            expect(preload.hasAttribute("hidden")).toBeTruthy();
            expect(conWelcomeClassListString).not.toEqual(conWelcome.classList.toString());
            expect(preloadClassListString).toEqual(preload.classList.toString());
            expect(conWelcomeSpy).toHaveBeenCalled();

            setTimeout(() => {

                done();
            }, 10);

        }, 10);

    });

    describe("when location.search is equal to ?P=false", () => {

        let location = null;
        let oldLocationTemp = globalThis.location;

        beforeAll(() => {
            delete globalThis.location;
            location = new URL("http://test.fantonix.space/?P=false");
            globalThis.location = location;
        });

        afterAll(() => {
            delete globalThis.location;
            globalThis.location = oldLocationTemp;
            location = null;
            oldLocationTemp = null;
        });

        test("preload should be set 'hidden'", () => {
            const preload = document.querySelector(".preload");

            expect(preload.hasAttribute("hidden")).toBeFalsy();

            require("../../../public/js/preload");

            expect(preload.hasAttribute("hidden")).toBeTruthy();
        });

        test("it should add classes to .con-welcome", () => {
            require("../../../public/js/preload");

            const conWelcomeClassListString = document.querySelector(".con-welcome").classList.toString();
            const conWelcomeClassListObject = document.querySelector(".con-welcome").classList;

            const conWelcomeSpy = jest.spyOn(conWelcomeClassListObject, "add");

            window.dispatchEvent(new Event("load", { bubbles: true }));

            expect(document.querySelector(".con-welcome").classList.toString()).not.toEqual(conWelcomeClassListString);
            expect(conWelcomeSpy).toHaveBeenCalled();
        });

    });

});