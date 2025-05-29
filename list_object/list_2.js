import original_consolelog from "#interface/console.js";

// 既定list
const list = [1, 2, 3, 4, 5];

// list.slice()
const slice = list.slice(1, 3);
original_consolelog('slice', slice);


// list.forEach()
const forEach = list.forEach((item, index) => {
    if (index === 0) console.log('forEach');
    console.log(item);
})
original_consolelog();


// list.map()
const map = list.map(item => {
    return item + 5;
})
original_consolelog('map', map); 


// list.filter()
const filter = list.filter(item => {
    return item > 2 && item <= 4;
})
original_consolelog('filter', filter);


// list.reduce()
const reduce = list.reduce((total, item) => {
    return total + item;
}, 0)
original_consolelog('reduce', reduce);