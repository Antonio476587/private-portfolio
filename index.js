import spdy from "spdy";
import fs from "fs";
import path from "path";

import { __dirname as __root_dirname } from "./pathEMS.js";
import { connectToDB } from "./db/db.js";
import app, { cert, key } from "./app.js";

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
