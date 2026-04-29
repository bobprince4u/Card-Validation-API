// Luhn algorithm implementation for credit card validation
//Takes a string and return true or false..
export const luhnCheck = (cardNumber: string): boolean => {
  //The Luhn algorithm works by iterating through the digits of the card number from right to left, doubling every second digit, and then summing all the digits together.
  //If the total modulo 10 is equal to 0, the card number is considered valid.
  //Accumulates total.
  let sum = 0;

  //Tracks whether to double current digit.
  let shouldDouble = false;

  //Loops from right to left through the card number, processing each digit according to the Luhn algorithm rules.
  //For each digit, it checks if it should be doubled (every second digit from the right).
  //If doubling results in a number greater than 9, it subtracts 9 from the result.
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    //Converts the current character to a number and applies the Luhn transformation if needed, then adds it to the sum.
    let digit = parseInt(cardNumber.charAt(i), 10);

    //Doubles every second digit from the right and adjusts if the result is greater than 9.
    //DOuble the digit if shouldDouble is true, then check if the result is greater than 9.
    //If it is, subtract 9 from the result to get a single-digit number.
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    //Adds the processed digit to the sum and toggles or flips the shouldDouble flag for the next iteration.
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  //After processing all digits, it checks if the total sum modulo 10 is divisible by 10. If it is, the card number is valid according to the Luhn algorithm.
  return sum % 10 === 0;
};
