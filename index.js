import dotenv from "dotenv";
import express from "express";
import https from "https";
import fs from "fs";

import { connectToDB, getDB } from "./db/db.js";
import render from "./server/render.jsx";

const cert = fs.readFileSync("./certificate.crt");
const key = fs.readFileSync("./private.key");

const app = express();

dotenv.config();

const domain = process.env.URI || "fantonix.space";

app.use(express.raw());
app.use(express.json());
app.use(express.static("public"));

app.post("/messages", async (req, res) => {
  const db = getDB();
  const { messages } = db.data;
  const message = messages.push(req.body);
  await db.write();
  res.send("The message was succesfully recibed.");
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

connectToDB();
if (cert && key) {
  https.createServer({
    cert,
    key,
    ca: fs.readFileSync("./ca_bundle.crt"),
  }, app).listen(port);
}

app.listen("80");
