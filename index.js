import dotenv from "dotenv";
import spdy from "spdy";
import express from "express";
import compression from "compression";
import fs from "fs";
import path from "path";

import { __dirname as __root_dirname } from "./pathEMS.js";
import { connectToDB, getDB } from "./db/db.js";
import render from "./server/render.jsx";

let cert;
let key;

try {
    cert = fs.readFileSync("./certificate.crt");
    key = fs.readFileSync("./private.key");
} catch (error) {
    console.log(error);
}

const app = express();

dotenv.config();

app.use(express.raw());
app.use(express.json());

app.use(compression({ filter: shouldCompress }));

function shouldCompress (req, res) {
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
        console.log(db, db.data);
        const message = messages.push(req.body);
        await db.write();
        res.status(201).send("The message was succesfully recibed.");
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

app.all("*", (req, res, next) => {
    if (cert && key) if (!req.secure) res.redirect(302, `https://${req.headers.host}${req.url}`);
    // To implement
    // if (req.subdomains.includes("www")) res.redirect(301, `https://${domain}/${req.url}`);
    next();
});

app.get("*", (req, res, next) => {
    render(req, res, next);
});

const port = process.env.PORT || 80;
const securePort = process.env.SECURE_PORT || 443;

connectToDB(path.resolve(__root_dirname, "db/db.json"));
if (cert && key) {
    spdy.createServer({
        cert,
        key,
        ca: fs.readFileSync("./ca_bundle.crt"),
    }, app).listen(securePort).on("error", (error) => { throw new Error(error); });
}

app.listen(port);
