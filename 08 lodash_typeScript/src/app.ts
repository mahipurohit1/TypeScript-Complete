// import _ from "lodash";
// console.log(_.shuffle([1, 2, 3, 4, 5]));

// declare var GLOBAL: string;

// console.log(GLOBAL);

import { User } from "./user";
import { plainToClass } from "class-transformer";
import "reflect-metadata";

const userData = [
  {
    id: 1,
    firstName: "Johny",
    lastName: "Cage",
    age: 27,
  },
  {
    id: 2,
    firstName: "Ismoil",
    lastName: "Somoni",
    age: 50,
  },
  {
    id: 3,
    firstName: "Luke",
    lastName: "Dacascos",
    age: 12,
  },
];
let mixedUser = plainToClass(User, userData);

for (const data of mixedUser) {
  console.log(data.getName());
}
