import deleteFileAsync from "../../utils/deleteFileAsync.js";
import fs from "fs";
import { __dirname as __rootDirname } from "../../pathEMS.js";

const pathToTheFile = "/tests/utils_tests/deleteThisFile";

beforeAll(done => {
    fs.writeFile(`${__rootDirname}${pathToTheFile}`, "asereje je debe dejere", "utf8", (err) => {
        if (err) throw err;
        console.log("The file has been created");
        done();
    });
});

it("should delete the file", async () => {
    await expect(deleteFileAsync(`${__rootDirname}${pathToTheFile}`)).resolves.toBe(`${__rootDirname}${pathToTheFile}`);
});

it("shouldn't delete the file", async () => {
    await expect(deleteFileAsync(`${__rootDirname}${pathToTheFile}`)).rejects.toThrow(`ENOENT: no such file or directory, unlink '${__rootDirname}${pathToTheFile}'`);
});