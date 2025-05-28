// オブジェクトの配列をmapで変換する
// map()メソッドは、配列の各要素に対して指定された関数を実行し、その結果を新しい配列として返します。
const list = [
  {name: 'foo', age: 21},
  {name: 'bar', age: 10},
  {name: 'hoe', age: 23},
];

const list2 = list.map(({ name, age }) => ({name, age: age + 1}));

const list3 = list.map(({ age }) => age + 1);

console.log('list:', list);
console.log('list2:', list2);
console.log('list3:', list3);

// オブジェクト(単一プロパティ)の配列をmapで変換する
const ObjectArray = [
    {a: 1}, 
    {a: 4}, 
    {a: 9},
];

const mapObjectArray = ObjectArray.map(({a}) => a * 2);
console.log('mapObjectArray:', mapObjectArray);

// プリミティブ型の配列をmapで変換する
const array = [
    1, 
    4, 
    9,
];

const mapArray = array.map(a => a * 2);
console.log('mapArray:', mapArray);