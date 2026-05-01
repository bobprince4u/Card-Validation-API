"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectIssuer = void 0;
// This utility function detects the issuer of a credit card based on its number.
//It uses regular expressions to match the card number against known patterns for different issuers, such as Visa, MasterCard, and American Express.
//If the card number matches a pattern, it returns the corresponding issuer name; otherwise, it returns "Unknown".
const detectIssuer = (cardNumber) => {
    // Visa
    //Visa card numbers start with a 4 and are typically 13 or 16 digits long.
    if (/^4/.test(cardNumber)) {
        return "Visa";
    }
    // MasterCard
    //MasterCard numbers start with (51-55 old range) or (2221-2720 new range) and are 16 digits long.
    if (/^(5[1-5])/.test(cardNumber) ||
        /^(222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)/.test(cardNumber)) {
        return "MasterCard";
    }
    // American Express
    //American Express numbers start with 34 or 37 and are 15 digits long.
    if (/^3[47]/.test(cardNumber)) {
        return "American Express";
    }
    return "Unknown";
};
exports.detectIssuer = detectIssuer;
//# sourceMappingURL=issuer.js.map