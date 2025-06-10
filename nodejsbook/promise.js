import { read, readFile } from 'fs';

console.log("-----start-----");

const readFilePromise = (filePath) => {
    return new Promise((resolve, reject) =>
        setTimeout(() => {
            readFile(filePath, "utf-8", (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        }
        , 1000)
    );
}

readFilePromise("hoge.txt")
    .then((data) => {
        console.log("File content:", data);
    })
    .catch((err) => {
        console.error("Error reading file:", err);
    });
console.log("-----end-----");