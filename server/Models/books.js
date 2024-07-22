const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  pages: {
    type: Number,
    required: true,
  },
  book_depository_stars: {
    type: Number,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  copies: {
    type: Number,
    default: 3,
  },
});

const bookModel = mongoose.model("Books", BookSchema);
module.exports = bookModel;
