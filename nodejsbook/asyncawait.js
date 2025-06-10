import { readFile } from 'fs/promises';

console.log("-----start-----");

const main = async () => {
    const data = await readFile("hoge.txt", "utf-8");
    console.log("await finish");
    return data;
}

main()
    .then((data) => {
        console.log("File content: ", data);
    })
    .catch((err) => {
        console.error("Error reading file:", err);
    });

console.log("-----end-----");