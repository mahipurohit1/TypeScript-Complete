type combinable = number | string;
const Combine = (
  input1: combinable,
  input2: combinable,
  resultConversion: "as-number" | "as-text"
) => {
  let result: combinable;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
    return result;
  } else {
    result = input1.toString() + input2.toString();
    return result;
  }
};
console.log(Combine(20, 50, "as-number"));
console.log(Combine("mahi", "purohit", "as-text"));
console.log(Combine("mahipal", 50, "as-text"));
console.log(Combine("20", "50", "as-number"));
