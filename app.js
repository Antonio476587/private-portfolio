import dotenv from "dotenv";
import express from "express";
import compression from "compression";
import { readFileSync } from "fs";

import { getDB } from "./db/db.js";
import render from "./server/render.jsx";

let cert;
let key;

try {
    cert = readFileSync("./certificate.crt");
    key = readFileSync("./private.key");
} catch (error) {
    console.log(error);
}

const app = express();

dotenv.config();

app.use(express.raw());
app.use(express.json());

app.use(compression({ filter: shouldCompress }));

function shouldCompress(req, res) {
    if (req.headers["x-no-compression"]) {
        // don't compress responses with this request header
        return false;
    }

    // fallback to standard filter function
    return compression.filter(req, res);
}

app.use(express.static("public"));

app.post("/messages", async (req, res) => {
    try {
        const db = getDB();
        const { messages } = db.data;
        const message = messages.push(req.body);
        await db.write();
        res.status(201).send("The message was succesfully recibed.");
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

app.all("*", (req, res, next) => {
    console.log(cert, "and", key);
    if (cert && key) if (!req.secure) res.redirect(302, `https://${req.headers.host}${req.url}`);
    // To implement
    // if (req.subdomains.includes("www")) res.redirect(301, `https://${domain}/${req.url}`);
    next();
});

app.get("*", (req, res, next) => {
    render(req, res, next);
});

export default app;

export { cert, key };
