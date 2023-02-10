"use strict";
let userInput;
let userName;
userInput = 4;
userInput = "max";
if (typeof userInput === "string") {
    userName = userInput;
}
function generateError(message, code) {
    throw { message, code };
}
generateError("error occurred ", 500);
