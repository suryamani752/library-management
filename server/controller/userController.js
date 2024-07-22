const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fineModel = require("../Models/fine");
const issuedBooksModel = require("../Models/issuedBooks");
const bookModel = require("../Models/books");
const returnedBooksModel = require("../Models/returnedBooks");
const requestBooksModel = require("../Models/requestBooks");

const getDate = () => {
  const d = new Date();
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const date = `${day}/${month}/${year}`;
  return date;
};

const checkFineOnReturnedBook = (book) => {
  let fine = 0;
  const rn_arr = book.returnedOn.spilt("/");
  const due_arr = book.dueDate.spilt("/");

  const returnDate = new Date(rn_arr[2], rn_arr[1] - 1, rn_arr[0]); //Date(yyyy/mm/dd)
  const dueDate = new Date(due_arr[2], due_arr[1] - 1, due_arr[0]);

  if (returnDate > dueDate) {
    const DifferenceInTime = returnDate.getTime() - dueDate.getTime();
    const DifferencceInDays = DifferenceInTime / (1000 * 3600 * 24);
    fine = DifferencceInDays * 5;
  }
  return fine;
};

const getUserFineController = async (req, res) => {
  try {
    const data = await fineModel.find({ userId: req.user._id });
    res.status(200).send({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in user fine controller",
      error,
    });
  }
};
const getIssueBooksController = async (req, res) => {
  try {
    const data = await issuedBooksModel.find({ userId: req.user._id });
    res.status(200).send({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in issue book ctrl",
      error,
    });
  }
};
const issuedBooksController = async (req, res) => {
  const { Name, author, isbn, issuedOn, dueDate, image } = req.body;

  if (!Name || !author || !isbn || !issuedOn || !dueDate || !image) {
    return res.status(422).send({
      success: false,
      message: "something went wrong",
    });
  }

  try {
    const issued_books = await issuedBooksModel.find({
      isbn,
      userId: req.user._id,
    });
    if (issued_books.length !== 0) {
      return res.status(403).send({
        message: "Book already issued",
      });
    }

    const book = new issuedBooksModel({
      Name,
      author,
      isbn,
      issuedOn,
      dueDate,
      userId: req.user._id,
      image,
    });
    // console.log("issued book - " + book);

    await book.save();
    // console.log("book saved");

    const books = await bookModel.find({ isbn: isbn });
    const copy = parseInt(books[0].copies) - 1;
    await bookModel.updateOne({ isbn: isbn }, { $set: { copies: copy } });
    // console.log("Book issued");
    res.send(204).send({
      success: true,
      message: "Book issued",
      book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in issue book ctrl",
      error,
    });
  }
};
const getReturnBooksController = async (req, res) => {
  try {
    const data = await returnedBooksModel.find({ userId: req.user._id });
    res.status(200).send({
      success: true,
      message: "return book successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in return book ctrl",
      error,
    });
  }
};
const searchBookByKeyController = async (req, res) => {
  try {
    let data = await bookModel.find({
      $or: [{ category: { $regex: req.params.key } }],
    }).limit(15);
    res.status(200).send({
      message: "book fetched successfully",
      success: true,
      data,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in search book by id",
      error,
    });
  }

  // let data = await bookModel
  //   .find({
  //     $or: [{ category: { $regex: req.params.key } }],
  //     // , $expr: { $lt: [0.7, { $rand: {} }] }
  //   })
  //   .limit(15);

  // res.status(200).send({
  //   message: "book fetched successfully",
  //   success: true,
  //   data,
  // });
};
const searchBookByKeyValueController = async (req, res) => {
  // console.log(req.params.key + " = " + req.params.value);
  const key = req.params.key;

  // console.log(query);
  let data = await bookModel.find({
    $or: [{ [key]: { $regex: req.params.value, $options: "i" } }],
  });
  // console.log(data.length);
  res.status(200).send({
    message: "book fetched successfully",
    success: true,
    data,
  });
};
const searchBooksByIsbnKeyController = async (req, res) => {
  // const query = req.params.field;
  // console.log("isbn = " + req.params.key);
  // console.log(query);
  let data = await bookModel.find({ isbn: req.params.key });
  const copy = data[0].copies;
  // console.log("copies = " + copy);
  // console.log(data);
  res.status(200).send({
    message: "book fetched successfully",
    success: true,
    data,
  });
};
const DeleteIssueController = async (req, res) => {
  const { isbn } = req.body;
  if (!isbn) return res.send("invalid book");

  //   console.log(isbn);
  try {
    // console.log("searching..");
    const book = await issuedBooksModel.findOneAndDelete({
      isbn: isbn,
      userId: req.user._id,
    });
    // console.log("deleted book ->" + book);

    const newbook = new ReturnedBooks({
      name: book.Name,
      author: book.author,
      isbn: book.isbn,
      issuedOn: book.issuedOn,
      dueDate: book.dueDate,
      returnedOn: getDate(),
      image: book.image,
      userId: req.user._id,
    });
    await newbook.save();

    try {
      //update the copies of returned book
      const books = await bookModel.find({ isbn: isbn });
      const copy = parseInt(books[0].copies) + 1;
      await bookModel.updateOne({ isbn: isbn }, { $set: { copies: copy } });

      //update returned book fine
      const BookFine = checkFine(newbook);
      await returnedBooksModel.updateOne(
        { isbn: newbook.isbn, userId: req.user._id },
        { $set: { fine: BookFine } }
      );
      const returnedBooks = await returnedBooksModel.find({
        isbn: book.isbn,
        userId: req.user._id,
      });

      //updating user fine
      const userData = await fineModel.find({ userId: req.user._id });
      let new_fine = parseInt(userData[0].fine) + returnedBooks[0].fine;
      //   console.log("updated user fine =" + new_fine);

      const data = await fineModel.updateOne(
        { userId: req.user._id },
        {
          $set: { fine: new_fine },
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in update the copies of book returned ctrl",
        error,
      });
    }

    res.status(200).send({
      message: "issued Book returned successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in delete issue",
      success: false,
      error,
    });
  }
};
const requestController = async (req, res) => {
  const { bookName, author } = req.body;
  if (!bookName || !author) {
    return res.status(422).send({
      success: false,
      message: "wrong info",
    });
  }
  try {
    const request = new requestBooksModel({
      name: bookName,
      author,
      requestedOn: getDate(),
      userId: req.user._id,
    });

    await request.save();
    res.status(200).send({
      message: "book request added successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in book request ctrl",
      success: false,
      error,
    });
  }
};
const getRequestController = async (req, res) => {
  try {
    const response = await requestBooksModel.find({});
    res.status(200).send({
      success: true,
      message: "get request successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get request ctrl",
      error,
    });
  }
};
const updateRequestStatusController = async (req, res) => {
  const { id, status } = req.body;

  try {
    const new_request = await requestBooksModel.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );
    res.status(200).send({
      message: "new request update successfully",
      success: true,
      new_request,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in update request status ctrl",
      success: false,
      error,
    });
  }
};
const getUserRequestsController = async (req, res) => {
  try {
    const data = await requestBooksModel.find({ userId: req.user._id });
    res.status(200).send({
      message: "get user request successfully",
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in get user requrest",
      success: false,
      error,
    });
  }
};
const addBookController = async (req, res) => {
  const {
    image,
    name,
    author,
    book_depository_stars,
    isbn,
    category,
    pages,
    publisher,
  } = req.body;
  if (
    !image ||
    !name ||
    !author ||
    !book_depository_stars ||
    !isbn ||
    !category ||
    !pages ||
    !publisher
  ) {
    return res.status(403).send({
      message: "invalid request",
      success: false,
    });
  }

  try {
    const new_book = await new bookModel({
      image,
      name,
      author,
      book_depository_stars,
      isbn,
      category,
      pages,
      publisher,
    });
    await new_book.save();
    res.status(200).send({
      message: "book added successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in book added ctrl",
      error,
    });
  }
};
const deleteBookController = async (req, res) => {
  const { isbn } = req.body;
  if (!isbn) return res.send("invalid isbn");

  try {
    const isIssued = await issuedBooksModel.findOne({ isbn });
    if (isIssued === null) {
      const book = await bookModel.findOneAndDelete({ isbn });
      res.status(200).send({
        message: "book deleted successfully",
        success: true,
      });
    } else {
      return res.status(204).send({
        success: false,
        message: "book is currently issued",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in delete book ctrl",
      success: false,
      error,
    });
  }
};
const updateBookController = async (req, res) => {
  try {
    for (let key in req.body) {
      await bookModel.findOneAndUpdate(
        { _id: req.body._id },
        { [key]: req.body[key] },
        { new: true }
      );
    }

    res.status(200).send({
      message: "book details updated",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in update book ctrl",
      success: false,
      error,
    });
  }
};

module.exports = {
  getUserFineController,
  getIssueBooksController,
  issuedBooksController,
  getReturnBooksController,
  searchBookByKeyController,
  searchBookByKeyValueController,
  searchBooksByIsbnKeyController,
  DeleteIssueController,
  requestController,
  getRequestController,
  updateRequestStatusController,
  getUserRequestsController,
  addBookController,
  deleteBookController,
  updateBookController,
};
