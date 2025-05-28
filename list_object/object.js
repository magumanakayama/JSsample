import original_consolelog from '#interface/console.js';

// 既定Object
const obj = {name: "nakayama", age: 25, isMale: true};

// Object.keys()
const key = Object.keys(obj);
original_consolelog('key', key);

// Object.values()
const value = Object.values(obj);
original_consolelog('value', value);


// Object.entries()
const entries = Object.entries(obj);
original_consolelog('entries', entries);


// Object.assign()
const obj2 = {name: "maguma", age: "37"};
const merge = Object.assign(obj, obj2);
original_consolelog('merge', merge);


// Object.fromEntries()
const list = [["name", "nakayama"], ["age", 25], ["isMale", true]];
const fromEntries = Object.fromEntries(entries);
original_consolelog('fromEntries', fromEntries);