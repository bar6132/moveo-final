const codeBlocks = [
  {
    id: 1,
    name: "Get Page Color",
    details: "Get the current page color in JavaScript",
    codeSnippet: `const pageolor = document.boy.style.backGroundcolor;`,
    solution: `const pageColor = document.body.style.backgroundColor;`,
  },
  {
    id: 2,
    name: "Display Alert",
    details: "Display an alert box in JavaScript -Hello world!",
    codeSnippet: `alert("Hello, world!");`,
    solution: `alert("Hello world!");`,
  },
  {
    id: 3,
    name: "Console Log",
    details: "Log a message to the console in JavaScript - This is a console log message",
    codeSnippet: `console.lg("This is a, console log mesage");`,
    solution: `console.log("This is a console log message");`,
  },
  {
    id: 4,
    name: "Variable Declaration",
    details: "Declare a variable in JavaScript",
    codeSnippet: `const x = 10; `,
    solution: `const x = 10;`,
  },
  {
    id: 5,
    name: "String Concatenation",
    details: "Concatenate two strings in JavaScript",
    codeSnippet: `const str1 = "Hello";
const str2 = "World";
const result = str1 - str2; `,
    solution: `const str1 = "Hello";
const str2 = "World";
const result = str1 + " " + str2;`,
  },
  {
    id: 6,
    name: "Function Definition",
    details: "Define a function in JavaScript",
    codeSnippet: `function greet() {
  return "Hello, world!";
} `,
    solution: `function greet() {
  return "Hello, world!";
}`,
  },
  {
    id: 7,
    name: "Array Declaration",
    details: "Declare an array in JavaScript",
    codeSnippet: `const numbers = {1, 2, 3, 4, 5};`,
    solution: `const numbers = [1, 2, 3, 4, 5];`,
  },
  {
    id: 8,
    name: "Array Length",
    details: "Get the length of an array in JavaScript",
    codeSnippet: `const numbers = [1, 2, 3, 4, 5];
const length = numbers.len; `,
    solution: `const numbers = [1, 2, 3, 4, 5];
const length = numbers.length;`,
  },
  {
    id: 9,
    name: "String Length",
    details: "Get the length of a string in JavaScript",
    codeSnippet: `const str = "Hello, world!";
const length = str.lenght; `,
    solution: `const str = "Hello, world!";
const length = str.length;`,
  },
  {
    id: 10,
    name: "Conditional Statement",
    details: "Write a simple if statement in JavaScript",
    codeSnippet: `const x = 10;
if x > 5 {
  console.log("x is greater than 5"); 
}`,
    solution: `const x = 10;
if (x > 5) {
  console.log("x is greater than 5");
}`,
  },
];

export default codeBlocks;
