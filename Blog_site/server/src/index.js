import http from "http";

import "dotenv/config";
import app from "./app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 8000;
const DB_URI = process.env.DB_URI;

let server;

try {
  server = http.createServer(app);
} catch (err) {
  console.error("Error creating HTTP server:", err.message);
  process.exit(1);
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to DB.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectToDatabase();

  server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
};

const shutdown = async () => {
  console.log("\nShutting down server...");
  server.close(() => {
    console.log("Server stopped.");
  });

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
  process.exit(0);
};

startServer();

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
