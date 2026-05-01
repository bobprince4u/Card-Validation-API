"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCardNumber = void 0;
const luhn_1 = require("../utils/luhn");
const issuer_1 = require("../utils/issuer");
//Function takes a string and returns a ValidationResult object.
//It performs several checks to validate the card number, including format validation, length check, issuer detection, and the Luhn algorithm check.
//The function provides detailed feedback on why a card number may be invalid, which can be useful for debugging and user feedback.
const validateCardNumber = (cardNumber) => {
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
    const issuer = (0, issuer_1.detectIssuer)(sanitized);
    //Run luhn algorithm check to validate the card number.
    //The Luhn algorithm is a checksum formula used to validate various identification numbers, including credit card numbers.
    const isValid = (0, luhn_1.luhnCheck)(sanitized);
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
exports.validateCardNumber = validateCardNumber;
//# sourceMappingURL=card.service.js.map