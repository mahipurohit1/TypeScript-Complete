function add(num1: number, num2: number, showResult: boolean, phase: string) {
  // if (typeof num1 !== "number" || typeof num2 !== "number") {
  //   throw new Error("invalid input");
  // }
  const result = num1 + num2;
  if (showResult) {
    console.log(phase + result);
  }
  return result;
}

const number1 = 5;
const number2 = 5.2;
const printResult = true;
const resultPhase = "Result is : ";

// console.log(add(number1, number2));
add(number1, number2, printResult, resultPhase);

//The core primitive types in TypeScript are all lowercase! like string , number
