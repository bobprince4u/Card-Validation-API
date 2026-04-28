import express, { Application, Request, Response, NextFunction } from "express";
import cardRoutes from "./routes/card.routes";

// Create an instance of the Express application
const app: Application = express();

//middleware to parse incoming JSON requests
app.use(express.json());

//simple health check route to confirm the server is running and reachable
app.get("/", (req: Request, res: Response) => {
  res.send("Card Validation API is running!");
});

//mount the card routes
app.use("/api/v1/cards", cardRoutes);

// Global error handling middleware.
//Catches any unhandled errors that occur during request processingo.
//Prevents app crashes.
//Sends consistent error response.
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "internal server error!" });
});

//Uses environment variable if available.
//Falls back to port 5000 if not specified.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
