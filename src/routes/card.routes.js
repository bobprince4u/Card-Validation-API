"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const card_controller_1 = require("../controllers/card.controller");
// Create a new router instance
//A container for all card-related endpoints..
const router = (0, express_1.Router)();
// Define a POST endpoint for validating card details.
// Path: /validate
//Handler: validateCard (imported from card.controller.ts)
router.post("/validate", card_controller_1.validateCard);
// Export the router to be used in app.ts
exports.default = router;
//# sourceMappingURL=card.routes.js.map