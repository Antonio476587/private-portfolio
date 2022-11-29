import fs from "fs";

export function deleteFile(fileName) {
    fs.unlinkSync(fileName);
}

export default deleteFile;