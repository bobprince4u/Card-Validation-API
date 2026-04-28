import { Router } from "express";
import { validateCard } from "../controllers/card.controller";

// Create a new router instance
//A container for all card-related endpoints..
const router = Router();

// Define a POST endpoint for validating card details.
// Path: /validate
//Handler: validateCard (imported from card.controller.ts)
router.post("/validate", validateCard);

// Export the router to be used in app.ts
export default router;
