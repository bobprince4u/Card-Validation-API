import { luhnCheck } from "../utils/luhn";
import { detectIssuer } from "../utils/issuer";
import { validateCard } from "../controllers/card.controller";

//Defines the shape of the validation result returned by the validateCardNumber function.
//It includes a boolean indicating if the card is valid, the issuer of the card, and an optional reason for invalidity.
//This interface helps to ensure that the function returns a consistent structure, making it easier to handle the results in other parts of the application, such as in the controller or when sending responses to clients.
export interface ValidationResult {
  valid: boolean;
  issuer: string | null;
  reason?: string;
}

//Function takes a string and returns a ValidationResult object.
//It performs several checks to validate the card number, including format validation, length check, issuer detection, and the Luhn algorithm check.
//The function provides detailed feedback on why a card number may be invalid, which can be useful for debugging and user feedback.
export const validateCardNumber = (cardNumber: string): ValidationResult => {
  // Remove spaces just in case
  //"4242 4242 4242 4242" → "4242424242424242"
  const sanitized = cardNumber.replace(/\s+/g, "");

  // Basic format check
  //Regex check to ensure the card number contains only digits.
  //Prevents letters and symbols.
  //Early return for invalid input.
  if (!/^\d+$/.test(sanitized)) {
    return {
      valid: false,
      issuer: "Unknown",
      reason: "Card number must contain only digits",
    };
  }

  //Valid caed length ranges from 12 to 19 digits.
  //Checks the length of the sanitized card number to ensure it falls within the typical range for credit and debit cards.
  if (sanitized.length < 12 || sanitized.length > 19) {
    return {
      valid: false,
      issuer: "Unknown",
      reason: "Card number must be between 12 and 19 digits",
    };
  }

  //Detect the card issuer (Visa, etc.) using the utility function.
  const issuer = detectIssuer(sanitized);

  //Run luhn algorithm check to validate the card number.
  //The Luhn algorithm is a checksum formula used to validate various identification numbers, including credit card numbers.
  const isValid = luhnCheck(sanitized);

  //If the Luhn check fails, it returns a structured failure result with the reason.e.
  if (!isValid) {
    return {
      valid: false,
      issuer,
      reason: "Failed Luhn check",
    };
  }

  //If all checks pass, return valid with the detected issuer.
  return {
    valid: true,
    issuer,
  };
};
