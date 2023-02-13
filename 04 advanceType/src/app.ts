type Person = {
  name: string;
  privilege: string[];
};
type User = {
  name: string;
  submittingDate: Date;
};

type PersonUser = Person & User;

const mahipal: PersonUser = {
  name: "mahi",
  privilege: ["create-user"],
  submittingDate: new Date(),
};

console.log(mahipal);

interface bird {
  type: "bird";
  flyingSpeed: number;
}
interface horse {
  type: "horse";
  runningSpeed: number;
}

type animal = bird | horse;

function moveAnimal(animal: animal) {
  switch (animal.type) {
    case "bird": {
      console.log(`animal moving at a speed  ${animal.flyingSpeed}`);
      break;
    }
    case "horse": {
      console.log(`animal moving at a speed ${animal.runningSpeed}`);
    }
  }
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

// const userInput = <HTMLInputElement>document.getElementById("user-input")! ;
const userInput = document.getElementById("user-input")! as HTMLInputElement;

userInput.value = "mahipal";
interface ErrorContainer {
  [props: string]: string;
}

const errorBeg: ErrorContainer = {
  email: "not a valid email",
  userName: "must start with capital letter ",
};

type combine = number | string;

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: combine, b: combine) {
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
  return a.toString() + b.toString();
}

const obj = {
  job: {
    title: "my job",
  },
};
console.log(obj?.job?.title);

const value = 0;
const number = value ?? 10;

console.log(number);
