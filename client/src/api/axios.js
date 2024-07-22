import axios from "axios";

const port = process.env.PORT || 8080;

export default axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "https://modern-library-managment.onrender.com/api",
  //   baseURL: port,

  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});
