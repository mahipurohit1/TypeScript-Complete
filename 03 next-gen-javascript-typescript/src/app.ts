class Department {
  firstName: string;
  constructor(n: string) {
    this.firstName = n;
  }
  print(this: Department) {
    console.log(this.firstName);
  }
}

const mahi = new Department("mahi");
mahi.print();
console.log(mahi);
