import fs from "fs";

export function deleteFile(fileName) {
    fs.unlinkSync(fileName, (err) => {
        if (err) throw err;
        return fileName;
    });
}

export default deleteFile;