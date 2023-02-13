// interface Person {
//   name: string;
//   age: number;
//   greet(phrase: string): void;
// }

// let user1: Person;

// user1 = {
//   name: "mahi",
//   age: 22,
//   greet(phrase) {
//     console.log(phrase + " " + this.name);
//   },
// };
// user1.greet("hello");

interface GreetAble {
  readonly name: string;
  surname?: string;
  greet(phrase: string): void;
}

class Person implements GreetAble {
  name: string;
  constructor(n: string) {
    this.name = n;
  }
  greet(phrase: string): void {
    console.log(phrase + " " + this.name);
  }
}

const mahipal = new Person("mahipal");
mahipal.greet("hello");

// interface in function
interface addFunc {
  (a: number, b: number): number;
}

const addFunc = (n1: number, n2: number) => n1 + n2;
console.log(addFunc(5, 3));
