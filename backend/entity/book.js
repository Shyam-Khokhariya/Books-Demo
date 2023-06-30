const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  discountRate: {
    type: Number,
    required: true,
    min: 1,
    max: 99,
  },
  coverImage: {
    type: String,
    required: true,
  },
  images: [{ type: String }],
  price: {
    type: Number,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
