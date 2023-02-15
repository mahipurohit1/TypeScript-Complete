export class User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;

  constructor(i: number, fn: string, ln: string, a: number) {
    this.id = i;
    this.firstName = fn;
    this.lastName = ln;
    this.age = a;
  }

  getName() {
    return this.firstName + " " + this.lastName;
  }
}
