"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const card_routes_1 = __importDefault(require("./routes/card.routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
// Create an instance of the Express application
const app = (0, express_1.default)();
//middleware to parse incoming JSON requests
app.use(express_1.default.json());
//simple health check route to confirm the server is running and reachable
app.get("/", (req, res) => {
    res.send("Card Validation API is running!");
});
//mount the card routes
app.use("/api/v1/cards", card_routes_1.default);
// Global error handling middleware.
//Catches any unhandled errors that occur during request processingo.
//Prevents app crashes.
//Sends consistent error response.
app.use(errorHandler_1.errorHandler);
// Global error handling middleware.
//Catches any unhandled errors that occur during request processingo.
//Prevents app crashes.
//Sends consistent error response.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "internal server error!" });
});
exports.default = app;
//# sourceMappingURL=app.js.map