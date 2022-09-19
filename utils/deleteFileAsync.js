import fs from "fs";

export async function deleteFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.unlink(fileName, (error) => {
            if (error) reject(error);
            else resolve(fileName);
        });
    });
}

export default deleteFile;