import { Request, Response, NextFunction } from "express";
import { validateCardNumber } from "../services/card.service";
import { createDecipheriv } from "node:crypto";

// Export the controller function to handle card validation requests.
//This is what the route calls when a POST request is made to /validate.
//Types the request, response, and next function for better type safety.
export const validateCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Wrap the logic in a try-catch block to catch runtime errors.
  try {
    // Extract the cardNumber from the request body.
    const { cardNumber } = req.body;

    //Validates the input exists and is correct to ensure cardNumber is provided and is a string.
    //If validation fails, it returns a 400 Bad Request response with an error message.
    //This prevents the service from processing invalid data and provides clear feedback to the client about what went wrong.
    //This is important for security and robustness, as it helps to prevent potential issues that could arise from malformed input.
    //Sends structured error response
    if (!cardNumber || typeof cardNumber !== "string") {
      return res.status(400).json({
        error: "Invalid input",
        details: "cardNumber is required and must be a string",
      });
    }

    //Calls the services layer
    const result = validateCardNumber(cardNumber);

    //Sends result back even if invalid
    return res.status(200).json(result);
  } catch (error) {
    // Pass any unexpected errors to the global error handler
    next(error);
  }
};
