import deleteFile from "../../utils/deleteFile.js";
import fs from "fs";
import { __dirname as __rootDirname } from "../../pathEMS.js";

beforeAll(() => {
    fs.writeFileSync(`${__rootDirname}/tests/utils_tests/deleteThisFile`, "asereje je debe dejere");
});

it("should delete the file", () => {

    expect(fs.readFileSync(`${__rootDirname}/tests/utils_tests/deleteThisFile`)).toBeDefined();
    expect(deleteFile(`${__rootDirname}/tests/utils_tests/deleteThisFile`)).toBeUndefined();
    try {
        fs.readFileSync(`${__rootDirname}/tests/utils_tests/deleteThisFile`);
    } catch (error) {
        expect(error).toBeDefined();
    }
});