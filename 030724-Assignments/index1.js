// Import the crypto module
const crypto = require('crypto');

// Retrieve the command line arguments
const args = process.argv.slice(2);
console.log(args)
// The first argument is the operation (e.g., add, sub, etc.)
const operation = args[0];


// The remaining arguments are the numbers (convert them to numbers)
const numbers = args.slice(1).map(Number);
console.log(numbers)


// Function to perform the calculator operations
function calculate(operation, numbers) {
  switch (operation) {
    case 'add':
      if (numbers.length < 2) {
        console.log("Please provide at least two numbers for addition.");
        return;
      }
      const sum = numbers.reduce((acc, curr) => acc + curr, 0);
      console.log(`Result: ${sum}`);
      break;

    case 'sub':
      if (numbers.length < 2) {
        console.log("Please provide at least two numbers for subtraction.");
        return;
      }
      const difference = numbers.reduce((acc, curr) => acc - curr);
      console.log(`Result: ${difference}`);
      break;

    case 'mult':
      if (numbers.length < 2) {
        console.log("Please provide at least two numbers for multiplication.");
        return;
      }
      const product = numbers.reduce((acc, curr) => acc * curr, 1);
      console.log(`Result: ${product}`);
      break;

    case 'divide':
      if (numbers.length < 2) {
        console.log("Please provide at least two numbers for division.");
        return;
      }
      if (numbers.includes(0)) {
        console.log("Division by zero is not allowed.");
        return;
      }
      const quotient = numbers.reduce((acc, curr) => acc / curr);
      console.log(`Result: ${quotient}`);
      break;

    case 'sin':
      if (numbers.length !== 1) {
        console.log("Please provide one number for sine calculation.");
        return;
      }
      console.log(`Result: ${Math.sin(numbers[0])}`);
      break;

    case 'cos':
      if (numbers.length !== 1) {
        console.log("Please provide one number for cosine calculation.");
        return;
      }
      console.log(`Result: ${Math.cos(numbers[0])}`);
      break;

    case 'tan':
      if (numbers.length !== 1) {
        console.log("Please provide one number for tangent calculation.");
        return;
      }
      console.log(`Result: ${Math.tan(numbers[0])}`);
      break;

    case 'random':
      if (numbers.length !== 1 || isNaN(numbers[0])) {
        console.log("Provide length for random number generation.");
        return;
      }
      const randomBytes = crypto.randomBytes(numbers[0]);
      console.log(`Random number: ${randomBytes.toString('binary')}`);
      break;

      

    default:
      console.log("Invalid operation");
  }
}

// Perform the calculation based on the provided operation and numbers
calculate(operation, numbers);
