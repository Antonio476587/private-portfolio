import { __dirname as __root_dirname } from "../pathEMS";

import path from "path";

test("The __root_dirname should be part of the __filename and __dirname", () => {

    expect(path.join(__root_dirname, "tests")).toEqual(__dirname);
    expect(path.resolve(__root_dirname, "tests", "pathEMS.test.js")).toEqual(__filename);

});

