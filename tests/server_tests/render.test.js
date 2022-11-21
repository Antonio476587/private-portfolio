import React from "react";

import render from "../../server/render";

jest.mock("../../src/Page", () => {
    const DummyPage = () => <button><div>DummyPage</div></button>;
    return DummyPage;
});

jest.mock("../../server/templateHome", () => {
    return function dummyTemplateHome(body) {
        return `templateHome
        ${body}`;
    };
});

jest.mock("../../server/template", () => {
    return function dummyTemplateHome(body) {
        return `template
        ${body}`;
    };
});


it("should render templateHome", () => {
    const responseToRender = {
        send: jest.fn(),
        append: jest.fn(),
    };

    render({ url: "/" }, responseToRender);

    render({ url: "/?P=false" }, responseToRender);

    expect(responseToRender.send.mock.calls[0][0]).toEqual(responseToRender.send.mock.lastCall[0]);
});

it("should render template", () => {
    const responseToRender = {
        send: jest.fn(),
        append: jest.fn(),
    };

    render({ url: "/about" }, responseToRender);

    render({ url: "/works" }, responseToRender);

    expect(responseToRender.send.mock.calls[0][0]).toEqual(responseToRender.send.mock.lastCall[0]);
});

it("should render templateHome and afterwards template", () => {
    const responseToRender = {
        send: jest.fn(),
        append: jest.fn(),
    };

    render({ url: "/" }, responseToRender);

    render({ url: "/about" }, responseToRender);

    expect(responseToRender.send.mock.calls[0][0]).not.toEqual(responseToRender.send.mock.lastCall[0]);
});

it("should send link headers when the url is '/'", () => {
    const responseToRender = {
        send: jest.fn(),
        append: jest.fn(),
    };

    render({ url: "/about" }, responseToRender);

    expect(responseToRender.append).not.toHaveBeenCalled();

    render({ url: "/" }, responseToRender);

    expect(responseToRender.append).toHaveBeenCalledTimes(7);
    expect(responseToRender.append).toHaveBeenCalledWith("Link", "</css/preload.css>; rel=preload; as=style");
    for (let i = 0; i < 6; i++) {
        expect(responseToRender.append).toHaveBeenCalledWith("Link", `</img/Q${i + 1}.webp>; rel=preload; as=image`);
    }
});