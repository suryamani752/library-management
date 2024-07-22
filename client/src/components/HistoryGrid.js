import * as React from "react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authProvider";
import "../css/issued.css";
import noDataImg from "../images/bookheaders/norecordfound.png";

export default function HistoryGrid() {
  const { getReturnBooks, returned, getUserFine, userFine } = useContext(
    AuthContext
  );

  const checkDate = (book) => {
    const rn_arr = book.returnedOn.split("-");
    const due_arr = book.dueDate.split("-");

    //Date(yyyy,mm,dd), months start from 0 in JS so subtract 1
    const rnDate = new Date(rn_arr[2], rn_arr[1] - 1, rn_arr[0]); 
    const dueDate = new Date(due_arr[2], due_arr[1] - 1, due_arr[0]);

    if (rnDate > dueDate) return true;

    return false;
  };

  useEffect(async () => {
    await getReturnBooks();
    await getUserFine();
  }, []);

  const returnList = returned.map((book, index) => (
    <tr className="returnBookRow" key={book._id}>
      <th scope="row">{index + 1}</th>
      <td>
        <img src={book.image} style={{ objectFit: "contain", height: 150 }} />
      </td>
      <td>{book.name}</td>
      <td>{book.author}</td>
      <td>{book.issuedOn}</td>
      <td>{book.dueDate}</td>
      <td className={checkDate(book) ? "return-date-text" : ""}>
        {book.returnedOn}
      </td>
      <td>
        <button
          type="button"
          className={
            "btn btn-sm " +
            (book.fine === 0 ? "btn-secondary disabled" : "btn-danger")
          }
        >
          Rs. {book.fine}
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="main-container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark bookNav">
          <div className="container-fluid">
            <h4 style={{ color: "whitesmoke" }}>History</h4>
          </div>
        </nav>

        {returned.length == 0 ? (
          <img src={noDataImg} className="no-data" />
        ) : (
          <>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Image</th>
                  <th scope="col">Book Name</th>
                  <th scope="col">Author</th>
                  <th scope="col">Issue Date</th>
                  <th scope="col">Due Date</th>
                  <th scope="col">Returned On</th>
                  <th scope="col">Fine</th>
                </tr>
              </thead>
              <tbody>{returnList}</tbody>
            </table>
            <button
              type="button"
              className="btn btn-outline-danger mb-4"
              style={{ float: "right" }}
            >
              Total Fine: {userFine}
            </button>
          </>
        )}
      </div>
    </>
  );
}
