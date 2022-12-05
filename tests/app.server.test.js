import request from "supertest";
import { filter } from "compression";

jest.mock("compression", () => {
    const originalModule = jest.requireActual("compression");

    delete originalModule.filter;
    originalModule.filter = jest.fn().mockReturnValue(true);

    return originalModule;
});

import { getDB } from "../db/db.js";
import render from "../server/render.jsx";

jest.mock("../db/db.js");
jest.mock("../server/render.jsx", () => {
    return async function dummyRender(req, res) {
        // console.log(req);
        const newBlob = new Buffer("Waos");
        res.status(200).send(newBlob);
    };
});

import app, { cert, key } from "../app";

describe("testing the routes and created middleware", () => {

    describe("'/messages' route", () => {

        beforeEach(() => {
            getDB.mockClear();
        });

        it("should throw an error and a 400 status code", () => {
            getDB.mockReturnValueOnce(new Error("Mistaki"));

            return request(app)
                .post("/messages")
                .set("Content-Type", "application/json")
                .send([{ title: "hello world" }, { naruto: "uzumaki" }])
                .then(response => {
                    expect(response.statusCode).toEqual(400);
                });
        });

        it("should send a 201 status code and a successful response", () => {
            const messages = ["hello world"];
            delete messages.push;
            messages.push = jest.fn();

            const write = jest.fn();

            const jsonToSend = [{ title: "hello world" }, { naruto: "uzumaki" }];

            getDB.mockReturnValueOnce({ data: { messages }, write });

            return request(app)
                .post("/messages")
                .set("Content-Type", "application/json")
                .send(jsonToSend)
                .then(
                    response => {
                        expect(getDB).toHaveBeenCalledTimes(1);

                        expect(messages.push).toHaveBeenCalledTimes(1);
                        expect(messages.push).toHaveBeenCalledWith(jsonToSend);
                        expect(write).toHaveBeenCalledTimes(1);

                        expect(response.statusCode).toEqual(201);
                        expect(response.text).toEqual("The message was succesfully recibed.");
                    }
                );
        });

    });

    describe("'*' all middleware", () => {

        test("it should redirect to https", () => {
            // Supertest doesn't support ssl/tsl
        });

    });

    describe("'/' get route", () => {

        test("it should call the render function", () => {

            return request(app)
                .get("/")
                .then(response => {
                    expect(response.statusCode).toBe(200);
                    expect(new TextDecoder().decode(response.body)).toEqual("Waos");
                });
        });

    });

});

describe("testing the third party and framework middleware", () => {

    describe("express.raw middleware", () => {

        it("should receive application/octet-stream correctly", () => {

            app.post("/testingRaw", (req, res) => {

                expect(req.body).toEqual(Buffer.from("Waos"));
                expect(new TextDecoder().decode(req.body)).toEqual("Waos");
                
                res.sendStatus(200);

            });

            return request(app)
                .post("/testingRaw")
                .set("content-type", "application/octet-stream")
                .send(Buffer.from("Waos"))
                .then(response => {
                    expect(response.statusCode).toBe(200);
                });
        });

    });

    describe("express.json middleware", () => {

        it("should receive the json correctly", () => {

            const jsonToSend = [{ title: "hello world" }, { naruto: "uzumaki" }];

            app.post("/testingJson", (req, res) => {

                expect(req.headers["content-type"]).toEqual("application/json");
                expect(req.body).toEqual(jsonToSend);

                res.status(200).json(jsonToSend);
            });

            return request(app)
                .post("/testingJson")
                .set("Content-Type", "application/json")
                .send(jsonToSend)
                .then(response => {

                    expect(response.statusCode).toEqual(200);
                    expect(response.body).toEqual(jsonToSend);
                });

        });

    });

    describe("compression middleware", () => {

        beforeAll(() => {
            filter.mockClear();
        });

        it("shouldn't call filter function when the 'x-no-compression' header exist", () => {

            expect(filter).not.toHaveBeenCalled();

            return request(app)
                .get("/")
                .set("x-no-compression", "true")
                .then(response => {
                    expect(response.statusCode).toBe(200);
                    expect(new TextDecoder().decode(response.body)).toEqual("Waos");

                    expect(filter).not.toHaveBeenCalled();
                });

        });

        it("should call filter function when the 'x-no-compression' header doesn't exist", () => {

            expect(filter).not.toHaveBeenCalled();

            return request(app)
                .get("/")
                .then(response => {
                    expect(response.statusCode).toBe(200);
                    expect(new TextDecoder().decode(response.body)).toEqual("Waos");

                    expect(filter).toHaveBeenCalled();
                });
        });

    });

    describe("express.static middleware", () => {

        it("should return a file with the type text/css", () => {

            return request(app)
                .get("/css/animate/animate.min.css")
                .then(response => {

                    expect(response.statusCode).toEqual(200);
                    expect(response.type).toEqual("text/css");
                    expect(response.charset).toEqual("UTF-8");
                });

        });

        it("should return a file with the type text/html", () => {

            return request(app)
                .get("/bgcomplement.html")
                .then(response => {

                    expect(response.statusCode).toEqual(200);
                    expect(response.type).toEqual("text/html");
                    expect(response.charset).toEqual("UTF-8");
                });

        });

        it("should not find a file and return a file with the type application/octet-stream", () => {

            return request(app)
                .get("/noexistthisfile.html")
                .then(response => {

                    expect(response.statusCode).toEqual(200);
                    expect(response.type).toEqual("application/octet-stream");
                    expect(response.charset).toBeUndefined();
                });

        });

    });

});