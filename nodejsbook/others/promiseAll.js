const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 100);
});
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 200);
});
const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 300);
});

Promise.all([promise1, promise2, promise3])
  .then(results => {
    console.log(results); // [1, 2, 3]
  });
// 1. thenのあとにもう一度thenをつなげてpromiseのチェーンをつなげる
// 2. thenの後に何も書かず、処理を終了させることもできる