import fs from "fs";

export function deleteFile(fileName) {
    fs.unlink(fileName, (err) => {
        if (err) throw err;
        return fileName;
    });
}

export default deleteFile;