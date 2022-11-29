import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import path from "path";
import { __dirname as __rootDirname } from "../pathEMS.js";

const __dirname = path.resolve(__rootDirname, "db");

export default async function generatedb() {
    // Use JSON file for storage
    const file = join(__dirname, "db.json");
    const adapter = new JSONFile(file);
    const db = new Low(adapter);

    // Read data from JSON file, this will set db.data content
    await db.read();

    // Set default data
    db.data = { messages: [] };

    const { messages } = db.data;
    messages.push({ title: "hello world" });

    // Finally write db.data content to file
    await db.write();
}