/**
 * @jest-environment jsdom
 */
import pug from "pug";
import path from "path";
import { __dirname as __root_dirname } from "../../../pathEMS";

let compilerFunction = null;

beforeAll(() => {
    compilerFunction = pug.compileFile(path.resolve(__root_dirname, "templates/head/head.pug"), { doctype: "html" });
});

beforeEach(() => {
    document.head.outerHTML = compilerFunction({});
});

afterAll(() => {
    compilerFunction = null;
    
    document.head.innerHTML = " ";
});

it("should have the same structure as in the head.outerHTML", () => {
    expect(document.head.outerHTML).toEqual(compilerFunction({}));
});

describe("it should include these tags and their corresponding attributes", () => {

    describe("meta tags", () => {

        test("charset meta", () => {
            const charsetMetaHTMLElement = document.querySelector("meta[charset=\"UTF-8\"]");

            expect(charsetMetaHTMLElement).not.toBeNull();
        });

        test("http-equiv meta", () => {
            const httpEquivMetaHTMLElement = document.querySelector("meta[http-equiv=\"X-UA-Compatible\"]");

            expect(httpEquivMetaHTMLElement).not.toBeNull();
            expect(httpEquivMetaHTMLElement.getAttribute("content")).toEqual("IE=edge");
        });

        test("viewport meta", () => {
            const viewportMetaHTMLElement = document.querySelector("meta[name=\"viewport\"]");

            expect(viewportMetaHTMLElement).not.toBeNull();
            expect(viewportMetaHTMLElement.getAttribute("content")).toEqual("width=device-width, initial-scale=1.0");
        });

        test("author meta", () => {
            const authorMetaHTMLElement = document.querySelector("meta[name=\"author\"]");

            expect(authorMetaHTMLElement).not.toBeNull();
            expect(authorMetaHTMLElement.getAttribute("content")).toEqual("Felix Antonio Cabello Garmendia");
        });

        test("googlebot meta", () => {
            const googlebotMetaHTMLElement = document.querySelector("meta[name=\"googlebot\"]");

            expect(googlebotMetaHTMLElement).not.toBeNull();
            expect(googlebotMetaHTMLElement.getAttribute("content")).toEqual("index");
        });

        test("googlebot meta 2", () => {
            const googlebotMetaHTMLElement = document.querySelectorAll("meta[name=\"googlebot\"]")[1];

            expect(googlebotMetaHTMLElement).not.toBeNull();
            expect(googlebotMetaHTMLElement.getAttribute("content")).toEqual("follow");
        });

        test("slurp meta", () => {
            const slurpMetaHTMLElement = document.querySelector("meta[name=\"slurp\"]");

            expect(slurpMetaHTMLElement).not.toBeNull();
            expect(slurpMetaHTMLElement.getAttribute("content")).toEqual("index");
        });

        test("slurp meta 2", () => {
            const slurpMetaHTMLElement = document.querySelectorAll("meta[name=\"slurp\"]")[1];

            expect(slurpMetaHTMLElement).not.toBeNull();
            expect(slurpMetaHTMLElement.getAttribute("content")).toEqual("follow");
        });

        test("robots meta", () => {
            const robotsMetaHTMLElement = document.querySelector("meta[name=\"robots\"]");

            expect(robotsMetaHTMLElement).not.toBeNull();
        });

        test("user-scalable meta", () => {
            const userScalableMetaHTMLElement = document.querySelector("meta[name=\"user-scalable\"]");

            expect(userScalableMetaHTMLElement).not.toBeNull();
            expect(userScalableMetaHTMLElement.getAttribute("content")).toEqual("no");
        });

        test("description meta", () => {
            const descriptionMetaHTMLElement = document.querySelector("meta[name=\"description\"]");

            expect(descriptionMetaHTMLElement).not.toBeNull();
            expect(descriptionMetaHTMLElement.getAttribute("content").length).toBeGreaterThan(150);
        });

        describe("keywords meta", () => {

            it("should have the correct lenght", () => {
                expect(document.querySelectorAll("meta[name=\"keywords\"]").length).toEqual(10);
            });

        });

    });

    describe("link tags", () => {

        test("preconnect", () => {
            const preconnectLinkHTMLElement = document.querySelector("link[rel=\"preconnect\"]");

            expect(preconnectLinkHTMLElement).not.toBeNull();
            expect(preconnectLinkHTMLElement.getAttribute("href")).toEqual("https://fonts.googleapis.com");
        });

        test("icon link", () => {
            const iconLinkHTMLElement = document.querySelector("link[rel=\"shortcut icon\"]");

            expect(iconLinkHTMLElement).not.toBeNull();
            expect(iconLinkHTMLElement.getAttribute("href")).toEqual("/img/icon.png");
            expect(iconLinkHTMLElement.getAttribute("alt")).toEqual("fantonix");
            expect(iconLinkHTMLElement.getAttribute("type")).toEqual("image/x-icon");
        });

        describe("stylesheets", () => {

            test("animateCSS stylesheet", () => {
                const animateCSSLinkHTMLElement = document.querySelector("link[href=\"/css/animate/animate.min.css\"]");

                expect(animateCSSLinkHTMLElement).not.toBeNull();
                expect(animateCSSLinkHTMLElement.getAttribute("rel")).toEqual("stylesheet");
                expect(animateCSSLinkHTMLElement.getAttribute("type")).toEqual("text/css");
            });

            test("preload stylesheet", () => {
                const preloadLinkHTMLElement = document.querySelector("link[href=\"/css/animate/animate.min.css\"]");

                expect(preloadLinkHTMLElement).not.toBeNull();
                expect(preloadLinkHTMLElement.getAttribute("rel")).toEqual("stylesheet");
            });

            test("Josefin Sans google fonts stylesheet", () => {
                const josefinSansGoogleFontLinkHTMLElement = document.querySelector("link[href=\"https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300&display=swap\"]");

                expect(josefinSansGoogleFontLinkHTMLElement).not.toBeNull();
                expect(josefinSansGoogleFontLinkHTMLElement.getAttribute("rel")).toEqual("stylesheet");
            });

            test("normalize stylesheet", () => {
                const normalizeLinkHTMLElement = document.querySelector("link[href=\"/css/normalize/normalize.css\"]");

                expect(normalizeLinkHTMLElement).not.toBeNull();
                expect(normalizeLinkHTMLElement.getAttribute("rel")).toEqual("stylesheet");
                expect(normalizeLinkHTMLElement.getAttribute("type")).toEqual("text/css");
            });

            test("bootstrap stylesheet", () => {
                const bootstrapLinkHTMLElement = document.querySelector("link[href=\"/css/bootstrap/css/bootstrap.min.css\"]");

                expect(bootstrapLinkHTMLElement).not.toBeNull();
                expect(bootstrapLinkHTMLElement.getAttribute("rel")).toEqual("stylesheet");
                expect(bootstrapLinkHTMLElement.getAttribute("type")).toEqual("text/css");
            });

            test("index o common style stylesheet", () => {
                const indexLinkHTMLElement = document.querySelector("link[href=\"/css/index.css\"]");

                expect(indexLinkHTMLElement).not.toBeNull();
                expect(indexLinkHTMLElement.getAttribute("rel")).toEqual("stylesheet");
                expect(indexLinkHTMLElement.getAttribute("type")).toEqual("text/css");
            });

        });

    });

    test("title tag", () => {
        expect(document.querySelector("title").textContent).toEqual("elix Antonio Cabello Portfolio/CVonline");
    });

    describe("script tags", () => {

        test("animejs script", () => {
            const animejsScriptHTMLElement = document.querySelector("script[src=\"/js/animejs/anime.min.js\"]");

            expect(animejsScriptHTMLElement).not.toBeNull();
        });

    });

});

it("should render the headTags template variable as valid tags", () => {
    const dummyHeadTags = "link href=\"unodostres\"/><link href=\"onetwothree\"";

    document.head.outerHTML = compilerFunction({ headTags: dummyHeadTags });

    expect(document.querySelector("link[href=\"unodostres\"]")).not.toBeNull();
    expect(document.querySelector("link[href=\"onetwothree\"]")).not.toBeNull();
});