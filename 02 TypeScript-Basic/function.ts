function add(num1: number, num2: number) {
  const result = num1 + num2;
  return result;
}
function printResult(num: number) {
  console.log(num);
}
printResult(add(5, 7));

// let combineFunction: Function;
// combineFunction = add;
// combineFunction = printResult;
// // combineFunction =  5 ;
// console.log(combineFunction(2, 5));

let combineFunction: (a: number, b: number) => number;
combineFunction = add;
// combineFunction = printResult;  :-> now this throws ana error
console.log(combineFunction(2, 5));
