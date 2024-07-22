import React,  { useContext, useEffect } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authProvider";
import noDataImg from '../../images/bookheaders/norecordfound.png';

export const RequestedBooks = () => {

    const { requested, setRequestStatus, getRequestedBooks } = useContext(AuthContext);
    const navigate = useNavigate();

    const rejectRequest = async (book) => {
        try {
            await setRequestStatus(book._id, "Rejected");
            toast.error("Book request rejected");
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(async () => {
        await getRequestedBooks();
    })

    const acceptRequest = async (book) => {

        navigate('/dashboard/addBook', { state: book });
        
    }


    //filter only the pending requests
    const reqList = requested.filter((book) => book.status === "Pending");

    const requests = reqList.map((book, index) =>
        <div class="col-sm-4 mb-3">
            <div class="card reqBookCard">
                <div class="card-header reqBookheader">
                    Requested On: &nbsp;{book.requestedOn}
                </div>
                <div class="card-body">
                    <p class="card-title">Book Name: <span className="reqText">{book.name}</span></p>
                    <p class="card-text">Author Name: <span className="reqText">{book.author}</span></p>
                    <button class="btn acceptBtn me-3" onClick={() => acceptRequest(book)}>Accept</button>
                    <button class="btn btn-danger rejectBtn" onClick={() => rejectRequest(book)}>Reject</button>
                </div>
            </div>
        </div>
    )

    return (
        <>

            <div className="main-container">

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark bookNav">
                    <div className="container-fluid">
                        <h4 style={{ color: 'whitesmoke' }}>Requested Books</h4>
                    </div>
                </nav>

                {reqList.length === 0 ? <img src={noDataImg} className="no-data" /> :
                    <>
                        <div className="row requestBookRow">
                            {requests}
                        </div>
                    </>
                }

            </div>

        </>
    )
}