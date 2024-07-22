import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authProvider";
import "../css/issued.css";
import noDataImg from "../images/bookheaders/norecordfound.png";
import MediaControlCard from "./MUIcard";

export const IssuedBooks = () => {
  const navigate = useNavigate();
  
  //returns the current date
  const getDate = () => {
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const date = `${day}/${month}/${year}`;
    return date;
  };
  const { getIssueBooks, setIssue, issue, deleteIssue } = useContext(
    AuthContext
  );

  useEffect(async () => {
    await getIssueBooks();
  }, []);

  const returnbtn = async (book) => {
    await deleteIssue(book.isbn);
    // addToast('Book returned successfully', { appearance: 'success' });
    toast.success("Book returned successfully");

    var list = [...issue];
    var index = issue.indexOf(book);

    console.log(`clicked on ${book.Name}`);

    if (index !== -1) {
      list.splice(index, 1);
      setIssue(list);
    }
  };

  

  return (
    <>
      <div className="main-container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark bookNav">
          <div className="container-fluid">
            <h4 style={{ color: "whitesmoke" }}>Issued Books</h4>
          </div>
        </nav>

        {issue.length !== 0 ? (
          <Box sx={{ flexGrow: 0 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <>
                {issue.map((book, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <MediaControlCard data={book} returnFn={returnbtn} />
                  </Grid>
                ))}
              </>
            </Grid>
          </Box>
        ) : (
          <img src={noDataImg} />
        )}
      </div>
    </>
  );
};
