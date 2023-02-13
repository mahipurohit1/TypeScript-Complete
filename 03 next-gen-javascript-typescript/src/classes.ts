// class Department {
//   // name: string;
//   // private employees: string[] = [];
//   protected employees: string[] = [];

//   constructor(private readonly id: string, public name: string) {
//     // this.name = n;
//   }
//   describe(this: Department) {
//     console.log(`This is department of, ${this.name} , with id ${this.id} `);
//   }
//   addEmployees(employee: string) {
//     this.employees.push(employee);
//     console.log(this.employees);
//   }

//   static createEmployee(name: string) {
//     return { name };
//   }
// }

// // const accounting = new Department("e1", "Accounting");
// // console.log(accounting);
// // accounting.describe();
// // accounting.employees.push("mahi");
// // accounting.addEmployees("mahipal");
// // const accountingCopy = { name: "mahipal", describe: accounting.describe };
// // accountingCopy.describe();

// const firstEmployee = Department.createEmployee("mahipal singh");
// console.log(firstEmployee);

// class ITDepartment extends Department {
//   private adminList: string[] = [];
//   private salary: number = 0;

//   get itSalary() {
//     return this.salary;
//   }
//   set itSalary(value: number) {
//     this.salary = value;
//   }

//   constructor(id: string) {
//     super(id, "it");
//   }
//   addAdmin(admin: string) {
//     this.adminList.push(admin);
//   }
//   addEmployees(employee: string) {
//     this.employees.push(employee);
//     console.log(this.employees);
//   }
// }

// const it = new ITDepartment("it1");
// it.addAdmin("mahi");
// it.addEmployees("mahipal");
// console.log(it);
// it.itSalary = 100;
// console.log(it.itSalary);

abstract class Car {
  constructor(private id: string) {}
  abstract run(): void;
  printId() {
    console.log(this.id);
  }
}

class BMW extends Car {
  private static instance: BMW;
  private constructor() {
    super("BMW");
  }
  run(): void {
    console.log("running");
  }

  static getInstances() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new BMW();
      return this.instance;
    }
  }
}

const B1 = BMW.getInstances();
const b2 = BMW.getInstances();
console.log(B1, b2);
