//  fetchAPI問題集　https://qiita.com/arunbababa/items/b612f0f7a86adc1d3239

/// 初級
const Hello = ((name) => console.log(`こんにちは、${name}さん！`));

fetch("https://randomuser.me/api/")
    .then(response => response.json())
    .then(data => {
        console.log("1");
        console.log(data);
    });

fetch("https://randomuser.me/api/")
//   .then(response => response.json())
    .then(data => {
        console.log("2");
        console.log(data);
    });






/// 中級
// Promise.all([
//     fetch("https://jsonplaceholder.typicode.com/users/1"),
//     fetch("https://dog.ceo/api/breeds/image/random"),
// ]).then(responses => {
//     console.log(responses[0].json());
//     console.log(responses[1].json());
// });

// Promise.all([
//     fetch("https://jsonplaceholder.typicode.com/users/1").then(res => res.json()),
//     fetch("https://dog.ceo/api/breeds/image/random").then(res => res.json())
// ]).then(([user, dog]) => {
//     console.log(`ユーザー名: ${user}"`);
//     console.log(`犬の画像URL: ${dog}`);
// });

