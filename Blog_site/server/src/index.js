import http from "http"; // Replaced https with http
import fs from "fs";
import "dotenv/config";
import app from "./app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 8000;
const DB_URI = process.env.DB_URI;

// No SSL Certificate and Private Key setup
let server;

try {
  server = http.createServer(app); // Changed to http.createServer
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

// Start the Server
const startServer = async () => {
  await connectToDatabase();

  server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`); // Updated protocol to http
  });
};

// Graceful Shutdown
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

// Handle Signals
process.on("SIGINT", shutdown); // Ctrl+C
process.on("SIGTERM", shutdown); // Termination signal (e.g., Docker stop)
