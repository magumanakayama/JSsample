import original_consolelog from "#interface/console.js";

// TypeScriptの型をJavaScriptで確認する
console.log(typeof true);// => "boolean"
console.log(typeof 42); // => "number"
console.log(typeof 9007199254740992n); // => "bigint"
console.log(typeof "JavaScript"); // => "string"
console.log(typeof Symbol("シンボル"));// => "symbol"
console.log(typeof undefined); // => "undefined"
console.log(typeof null); // => "object"
console.log(typeof ["配列"]); // => "object"
console.log(typeof { "key": "value" }); // => "object"
console.log(typeof function() {}); // => "function"

/*
https://jsprimer.net/basic/data-type/
*/

// 明示的な型変換
const str = "12345";
const num = Number(str);
original_consolelog("type of: ", typeof str); // => "string"
original_consolelog("type of: ",typeof num); // => "number"

// 暗黙的な型変換
const str2 = "12345";
const num2 = str2 - 12344;
original_consolelog("type of: ",typeof str2); // => "string"
original_consolelog("type of: ",typeof num2); // => "number"