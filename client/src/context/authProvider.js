import React, { createContext, useState } from "react";
import axios from "../api/axios";
export const AuthContext = createContext({});

//returns the current date
const getDate = () => {
  const d = new Date();
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const date = `${day}/${month}/${year}`;
  return date;
};

//returns the due date of issued book (14 days after)
const dueDate = () => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 14);
  var dd = targetDate.getDate();
  var mm = targetDate.getMonth() + 1; 
  var yyyy = targetDate.getFullYear();

  var dateString = `${dd}/${mm}/${yyyy}`;
  return dateString;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  
  const [role, setRole] = useState(sessionStorage.getItem("role"));

  const [issue, setIssue] = useState([]);
  const [classics, setClassics] = useState([]);
  const [fantasy, setFantasy] = useState([]);
  const [fiction, setFiction] = useState([]);
  const [mystery, setMystery] = useState([]);
  const [horror, setHorror] = useState([]);
  const [youngAdult, setYoungAdult] = useState([]);
  const [returned, setReturned] = useState([]);
  const [results, setResults] = useState([]);
  // const [role, setRole] = useState('');
  const [requested, setRequested] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [userFine, setUserFine] = useState(0);
  // const [bookFine, setBookFine] = useState(0);

  // const [books,dispatch] = useReducer(BookReducer,[])

  const getIssueBooks = async () => {
    try {
      const response = await axios.get("/getissuebooks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIssue(response.data);
    } catch (e) {
      console.log(e.response);
    }
  };

  const getBooks = async (id) => {
    try {
      const response = await axios.get(`/search/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      

      if (id === "Classics") {
        setClassics(response.data);
      } else if (id === "Fiction") {
        setFiction(response.data);
      } else if (id === "Fantasy") {
        setFantasy(response.data);
      } else if (id === "Horror") {
        setHorror(response.data);
      } else if (id === "Mystery") {
        setMystery(response.data);
      } else if (id === "Young Adult") {
        setYoungAdult(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const issueBooks = async (Book) => {
    try {
      const response = await axios.post(
        "/issued-books",
        JSON.stringify({
          Name: Book.name,
          author: Book.author,
          isbn: Book.isbn,
          issuedOn: getDate(),
          dueDate: dueDate(),
          image: Book.image,
        }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (e) {
      console.log(e.response);
    }
  };

 
  const getReturnBooks = async () => {
    try {
      const response = await axios.get("/getreturnbooks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReturned(response.data);
    } catch (e) {
      console.log(e.response);
    }
  };

  const deleteIssue = async (isbn) => {
    try {
      await axios.post(`/delete-issue/`, JSON.stringify({ isbn }), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log(e.response);
    }
  };

  const requestbook = async (bookName, author) => {
    console.log(bookName, author);
    try {
      await axios.post("/request", JSON.stringify({ bookName, author }), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  const searchbook = async (key, value) => {
    try {
      const response = await axios.get(`/searchs/${key}/${value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getRequestedBooks = async () => {
    try {
      const response = await axios.get("/getrequest", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequested(response.data);
    } catch (e) {
      console.log(e);
    }
  };

 

  const getUserRequests = async () => {
    try {
      const response = await axios.get("/getuserrequests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data);
      setUserRequests(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const setRequestStatus = async (id, status) => {
    try {
      const response = await axios.post(
        "/updaterequeststatus",
        JSON.stringify({ id, status }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const getUserFine = async () => {
    try {
      const response = await axios.get("/getuserfine", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserFine(response.data[0].fine);
      console.log("user fine = " + response.data[0].fine);
    } catch (e) {
      console.log(e);
    }
  };

  

  const addbook = async (book) => {
    try {
      await axios.post(
        "/addbook",
        JSON.stringify({
          pages: book.pages,
          publisher: book.publisher,
          image: book.image,
          name: book.name,
          isbn: book.isbn,
          author: book.author,
          category: book.category,
          book_depository_stars: book.book_depository_stars,
        }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Book added - " + book);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteBook = async (isbn) => {
    try {
      const response = await axios.post(
        "/deletebook",
        JSON.stringify({ isbn }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const updateBook = async (book) => {
    try {
      const res = await axios.post("/updatebook", JSON.stringify(book), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        getIssueBooks,
        setIssue,
        issue,
        classics,
        youngAdult,
        horror,
        fiction,
        fantasy,
        mystery,
        getBooks,
        issueBooks,
        getReturnBooks,
        returned,
        deleteIssue,
        requestbook,
        results,
        searchbook,
        role,
        getRequestedBooks,
        requested,
        addbook,
        userFine,
        getUserFine,
        deleteBook,
        setToken,
        setRole,
        updateBook,
        getUserRequests,
        setRequestStatus,
        userRequests,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
