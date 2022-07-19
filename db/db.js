import { Low, JSONFile } from "lowdb";

let db;

async function connectToDB(url) {
    const databasePath = url || "../db/db.json";
    const adapter = new JSONFile(databasePath);
    db = new Low(adapter);
    await db.read();
    db.data = db.data || { messages: [] };
    console.log("Connected to LowDB");
}

const getDB = () => db;

export { connectToDB, getDB };
