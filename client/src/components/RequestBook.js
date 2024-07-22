import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/authProvider";
import "../css/issued.css";
import "../css/requestBook.css";
import "../css/viewBooks.css";
import requestBookImg from "../images/bookheaders/requestBook.jpg";

export const RequestBook = () => {
  const { requestbook } = useContext(AuthContext);

  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");

  const submitRequest = async (props) => {
    requestbook(bookName, author);
    toast.success("Book requested successfully");
  };

  return (
    <>
      <div className="main-container">
        <div class="container px-4 py-5 mx-auto">
          <div class="cardd card0">
            <div class="d-flex flex-lg-row flex-column-reverse">
              <div class="cardd card1">
                <div className="row justify-content-center my-auto mx-auto">
                  <h2 className="header">Request a Book</h2>
                </div>
                <div class="row justify-content-center my-auto">
                  <div class="col-lg-8">
                    <form className="requestForm" onSubmit={submitRequest}>
                      <div className="field">
                        <input
                          type="text"
                          id="bookName"
                          aria-describedby="passwordHelpInline"
                          onChange={(e) => setBookName(e.target.value)}
                          required
                        />
                        <label>Name of Book</label>
                      </div>
                      <div className="field">
                        <input
                          type="text"
                          id="authorName"
                          aria-describedby="passwordHelpInline"
                          onChange={(e) => setAuthor(e.target.value)}
                          required
                        />
                        <label>Author Name</label>
                      </div>

                      <div className="field">
                        <input type="submit" value="Submit" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="cardd card2">
                {" "}
                <img id="image" src={requestBookImg} />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
