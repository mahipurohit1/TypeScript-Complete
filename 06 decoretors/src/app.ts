function Logger(logString: string) {
  return function (constructor: Function) {
    console.log("i am logger decorators");
    console.log(logString);
    console.log(constructor);
  };
}

function DisplayName(template: string, id: string) {
  return function (constructor: any) {
    console.log("i am display name decorators");
    const ele = document.getElementById(id);
    if (ele) {
      ele.innerHTML = template;
    }
    const per = new constructor();
    document.querySelector("h1")!.textContent = per.name;
  };
}

@Logger("i am a dynamic string ")
@DisplayName("<h2> your name is : </h2> <h1></h1>", "app")
class Person {
  name: string = "mahipal";
  constructor() {
    console.log("i am constructor ....");
  }
}

const mahipal = new Person();

console.log(mahipal);

////////////////////////////////

function Log(target: any, propertyName: string | symbol) {
  console.log(target);
  console.log(propertyName);
}
function Log2(
  target: any,
  name: string | symbol,
  descriptor: PropertyDescriptor
) {
  console.log(target);
  console.log(name);
  console.log(descriptor);
}
function Log3(
  target: any,
  name: string | symbol,
  descriptor: PropertyDescriptor
) {
  console.log(target);
  console.log(name);
  console.log(descriptor);
}
function Log4(target: any, name: string | symbol, position: number) {
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;
  @Log2
  set priceValue(value: number) {
    if (value > 0) {
      this._price = value;
    }
  }
  constructor(t: string, p: number) {
    this._price = p;
    this.title = t;
  }
  @Log3
  getPriceWithTax(@Log4 value: number) {
    return this._price * (value + 1);
  }
}
