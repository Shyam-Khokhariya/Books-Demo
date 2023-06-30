require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./database");
const bookController = require("./controller/bookController");

const app = express();
const PORT = 3000;

// Connect to the MongoDB database
connectToDatabase();

// API routes
app.get("/api/v1/books", bookController.getBooks);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
