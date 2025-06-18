import { readFile } from 'fs/promises';

console.log("-----start-----");

const main = async (filePath) => {
    const data = await readFile(filePath, "utf-8");
    console.log("await finish");
    return data;
}

main("hoge.txt")
    .then((data) => {
        console.log("File content: ", data);
    })
    .catch((err) => {
        console.error("Error reading file:", err);
    });

console.log("-----end-----");