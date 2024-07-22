require("./Models/user");
require("./Models/fine");
require("./Models/issuedBooks");
require("./Models/returnedBooks");
require("./Models/books");
require("./Models/requestBooks");

const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");
const bodyparse = require("body-parser");

dotenv.config();

connectDB();

const app = express();

app.use(bodyparse.json());
app.use(cors());
app.use(morgan("dev"));

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "welcome to library managment app",
//   });
// });
app.use("/auth/", require("./Routes/authRoutes"));
app.use("/api/", require("./Routes/userRoutes"));



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `node server running in ${process.env.DEV_MODE} mode on port ${process.env.PORT}`
      .bgBlue.white
  );
});
