let userInput: unknown;
let userName: string;
userInput = 4;
userInput = "max";

if (typeof userInput === "string") {
  userName = userInput;
}

function generateError(message: string, code: number): never {
  throw { message, code };
}

generateError("error occur ", 500);
