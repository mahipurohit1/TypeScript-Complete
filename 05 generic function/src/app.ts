const data: string[] = ["mahi", "mahipal"];
const data1: Array<string> = ["4", "mahi"];
const data2: Array<number> = [47, 754, 8];

const promiseData: Promise<string> = new Promise((resolve, _) => {
  setTimeout(() => {
    resolve("mahi");
  }, 2000);
});

promiseData.then((data) => {
  data.split(" ");
});

function merge<T extends object, U extends object>(objA: T, obj2: U) {
  return Object.assign(objA, obj2);
}

const newObj = merge({ name: "mahi" }, { age: 20 });
console.log(newObj);

interface lengthy {
  length: number;
}

function countAndPrint<T extends lengthy>(element: T) {
  let desc = "no element";
  if (element.length > 0) {
    desc = " element with length " + element.length;
  }
  console.log(desc);
}

countAndPrint("hello mahipal here ");
countAndPrint(["mahi", "purohit"]);
countAndPrint(5022 + "");

function extractValue<T extends object, U extends keyof T>(object: T, key: U) {
  return object[key];
}

console.log(extractValue({ firstName: "mahi" }, "firstName"));

class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }
  getItem() {
    console.log(this.data);
  }
}

const stringStorage = new DataStorage<string>();
stringStorage.addItem("mahi");
stringStorage.addItem("mahi");
stringStorage.addItem("mahi");

stringStorage.getItem();
