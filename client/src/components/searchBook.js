import * as React from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { CustomCard } from "../components/card";
import { AuthContext } from "../context/authProvider";
import noDataImg from "../images/bookheaders/norecordfound.png";

export const SearchBook = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(`Search By`);
  const [option, setOption] = React.useState(`name`);
  const [searchValue, setSearchValue] = React.useState("");
  const { searchbook, results } = React.useContext(AuthContext);

  //to set search params
  const params = [[`${option}`, `${searchValue}`]];
  const pathname = "/dashboard/viewBooks/search";

  const searchHandler = (e) => {
    e.preventDefault();

    //searchbook api
    searchbook(option, searchValue);

    navigate(`${pathname}?${createSearchParams(params)}`);
  };

  const bookResults = results.map((book, index) => (
    <CustomCard details={book} key={index} />
  ));

  return (
    <>
      <div className="main-container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {value}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          setValue("Title");
                          setOption("name");
                        }}
                      >
                        Title
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          setValue("Author");
                          setOption("author");
                        }}
                      >
                        Author
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <form className="d-flex" onSubmit={searchHandler}>
                <input
                  className="form-control me-2"
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                  type="search"
                  placeholder="Search books"
                  aria-label="Search"
                />
                <button className="btn btn-outline-primary" type="submit">
                  Search
                </button>
              </form>
            </div>{" "}
          </div>
        </nav>

        <div className="inner-container">
          {results.length === 0 ? (
            <img src={noDataImg} className="no-data" />
          ) : (
            <>
              <div class="row searchRow">{bookResults}</div>
            </>
          )}
        </div>
      </div>{" "}
    </>
  );
};
