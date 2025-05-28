import original_consolelog from "#interface/console.js";

// 既定list
const list = ["nakayama", "maguma"];

// list.push()
list.push("okabe")
original_consolelog('push', list);

// list.pop()
list.pop();
original_consolelog('pop', list);

// list.shift()
list.shift();
original_consolelog('shift', list);

// list.unshift()
list.unshift("okabe");
original_consolelog('unshift', list);