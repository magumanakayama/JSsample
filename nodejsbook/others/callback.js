import { readFile } from 'fs';

console.log("-----start-----");

readFile("hoge.txt", "utf-8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
    } else {
        console.log("File content:", data);
    }
});

console.log("-----end-----");