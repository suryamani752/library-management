import LogoutIcon from "@mui/icons-material/Logout";
import { useContext } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authProvider";
import "../css/sidebar.css";

export const Sidebar = () => {
  const { role, setToken, setRole } = useContext(AuthContext);
  const navigate = useNavigate();
 

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    setToken("");
    setRole("");
    toast.success("Logged out successfully");
  };

  return (
    <>

      <div className="sidebar">
        <h3>Dashboard</h3>
        <hr
          style={{
            backgroundColor: "whitesmoke",
            height: "2px",
            marginBottom: 42,
          }}
        />

        {role === "user" ? (
          <ul>
            
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/dashboard/viewBooks"
              >
                {" "}
                Books Catalogue
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/dashboard/issuedBooks"
              >
                {" "}
                Issued Books
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/dashboard/requestBook"
              >
                {" "}
                Request Book
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/dashboard/requestStatus"
              >
                {" "}
                Request Status
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/dashboard/read"
              >
                {" "}
                History
              </NavLink>
            </li>
            
          </ul>
        ) : role === "admin" ? (
          <>
            <ul>
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="viewBooks"
                >
                  {" "}
                  Books Catalogue
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="addBook"
                >
                  {" "}
                  Add Book
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="requestedBooks"
                >
                  {" "}
                  Requested Books
                </NavLink>
              </li>
            </ul>
          </>
        ) : (
          <>
            {navigate("/libmngsystem")}
          </>
        )}

        <div className="logoutDiv">
          <LogoutIcon sx={{ color: "white", fontSize: 29 }} />
          <NavLink className="logout" to="/" onClick={logout}>
            {" "}
            Logout
          </NavLink>
        </div>
      </div>
    </>
  );
};
