// keyの""は、省略できる
const object = {num: 777};
const object2 = {"num": 777};

console.log(object);
console.log(object2);

console.log("----------------------------------------------");

const multiple = {
  num: 2,
  num: 3, // プロパティの値は後勝ち
  func: (num) => num * num,
  funcInFunc: (num) => (xNum) => num + xNum,
  funcInFuncInFunc: (num) => (xNum) => (yNum) => num + xNum + yNum,
};

console.log(multiple);
console.log(multiple["num"]);
console.log(multiple[undefined]); // undefinedはグローバル変数のため解決できる
// console.log(multiple[num]);    // numが宣言されていないためエラー　https://www.agent-grow.com/self20percent/2020/10/26/undefined-not-defined/
console.log(multiple["func"](777));
console.log(multiple["funcInFunc"](777)(23));
console.log(multiple["funcInFuncInFunc"](777)(23)(200));
