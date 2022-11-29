import { getDB, connectToDB } from "../../db/db.js";
import deleteFile from "../../utils/deleteFile.js";
import generatedb from "../../db/generatedb.js";
import { __dirname as __rootDirname } from "../../pathEMS.js";
import path from "path";

beforeAll(async () => {
    await connectToDB(path.resolve(__rootDirname, "db/db.json"));
});

test("Adapter should exits", () => {
    return expect(getDB()).toBeDefined();
});

test("If the database doesn't exist we create it", async () => {
    let db = getDB();
    let { messages } = db.data;
    if (messages.length == 0) {
        await generatedb();
        await db.read();
        messages = db.data.messages;
        expect(messages).toEqual([{ title: "hello world" }]);
        return;
    }
    return expect(messages).toBeDefined();
});

test("Database should be deleted", async () => {
    let db = getDB();
    try {
        await deleteFile(path.resolve(__rootDirname, "db/db.json"));
    } catch (error) {
        console.log(error);
    }
    await db.read();
    return expect(db.data).toBeNull();
});

test("Database should be created", async () => {
    const db = getDB();
    await generatedb();
    await db.read();
    const { messages } = db.data;
    return expect(messages).toEqual([{ title: "hello world" }]);
});

test("Writing on the database", async () => {
    const db = getDB();
    let { messages } = db.data;
    const message = messages.push({ naruto: "uzumaki" });
    await db.write();

    return expect(messages).toEqual([{ title: "hello world" }, { naruto: "uzumaki" }]);
});

test("Deleting on the database", async () => {
    const db = getDB();
    let { messages } = db.data;
    messages.pop();
    await db.write();

    return expect(messages).toEqual([{ title: "hello world" }]);
});

test("Altering the data on the database", async () => {
    const db = getDB();
    let { messages } = db.data;
    const messageIndex = messages.findIndex((e) => e.title == "hello world");
    messages[messageIndex].title = "uzumaki naruto";
    await db.write();

    return expect(messages).toEqual([{ title: "uzumaki naruto" }]);
});

test("Deleting the data on the database", async () => {
    const db = getDB();
    db.data = {};
    await db.write();

    return expect(db.data).toEqual({});
});

test("Droping the database", async () => {
    let db = getDB();
    try {
        await deleteFile(path.resolve(__rootDirname, "db/db.json"));
    } catch (error) {
        console.log(error);
    }
    await db.read();
    return expect(db.data).toBeNull();
});
