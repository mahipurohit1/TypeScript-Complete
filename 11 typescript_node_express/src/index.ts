import express, { json, NextFunction, Request, Response } from "express";
import todoRoutes from "./routes/todos";

const app = express();

app.use(json());

app.use("/todos", todoRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(5000, () => console.log("Server running on port 5000"));
