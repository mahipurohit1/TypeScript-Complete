const person = {
  name: "mahipal",
  age: 50,
};

// const person: {
//   name: string;
//   age: number;
// } = {
//   name: "mahipal",
//   age: 50,
// };

console.log(person);

const product = {
  id: "abc1",
  price: 12.99,
  tags: ["great-offer", "hot-and-new"],
  details: {
    title: "Red Carpet",
    description: "A great carpet - almost brand-new!",
  },
};

console.log(product);

let products: string[];

products = ["mahipal", "singh"];
console.log(products);

//tuples

const books: {
  book: [number, string];
} = {
  book: [2, "the amazing books"],
};

//basically :  fixed length and fixed types

// books.book[1] = 5 // this throws an error
// books.book = [2, "the amazing books " , "new"]  this throws an error

//exception  : u can push a new value
books.book.push("mahipal");
console.log(books);

//enum
enum Role {
  ADMIN,
  READ_ONLY,
  USER,
}

const company = {
  role: Role.USER,
};

if (company.role === Role.ADMIN) {
  console.log("I am admin");
} else if (company.role === Role.READ_ONLY) {
  console.log("i am read only");
} else {
  console.log(" i am user ");
}

// any : kuch bhi chalta  ahaia idhar
let age: any = 10;
age = "string";
age = true;
