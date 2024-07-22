const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
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
} = require("../controller/userController");

const router = express.Router();
router.use(requireAuth);

router.get("/getuserfine", getUserFineController);
router.get("/getissuebooks", getIssueBooksController);
router.post("/issued-books", issuedBooksController);
router.get("/getreturnbooks", getReturnBooksController);
router.get("/search/:key", searchBookByKeyController);
router.get("/searchs/:key/:value", searchBookByKeyValueController);
router.get("/searchby/isbn/:key", searchBooksByIsbnKeyController);
router.post("/delete-issue", DeleteIssueController);
router.post("/request", requestController);
router.get("/getrequest", getRequestController);
router.post("/updaterequeststatus", updateRequestStatusController);
router.get("/getuserrequests", getUserRequestsController);
router.post("/addbook", addBookController);
router.post("/deletebook", deleteBookController);
router.post("/updatebook", updateBookController);

module.exports = router;
