// オブジェクトは参照型なので、関数の引数に渡すときに参照を渡す。
// そのため、関数の中でオブジェクトのプロパティを変更すると、
// 元のオブジェクトも変更される。
const item = {
  name: 'hoge',
  age: 26
};

const changeName = (item, value) => {
  item.name = value;
  return item
};

const changedItem = changeName(item, 'fuga');

console.log("changedItem", changedItem);
console.log("item", item);

// プリミティブ型は値渡し、参照型は参照渡し

const num = 2;

const changeNum = (num2, value) => {
  num2 = value;
  return num2
};

const changedNum = changeNum(num, 5);

console.log("changedNum:", changedNum);
console.log("num:", num);
