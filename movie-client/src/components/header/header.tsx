import React, { useEffect, useState, ChangeEvent } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchResult from "../search/SearchResult";
import MovieDetails from "../movieDetails/MovieDetails";
import "./header.css";

//////////////////Header-bar containing all tabs for navigation///////////////
function Header() {
  //variables to store search values
  const [searchQuery, setSearchQuery] = useState("");

  // handleSearch from searchBox input
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Router>
        <nav className="navbar">
          <div className="nav__buttons">
            <Link to={""} state={{ type: "movies-in-theaters" }}>
              <span>Movies in Theatre</span>
            </Link>
            <Link to={""} state={{ type: "movies-coming" }}>
              <span>Coming Soon</span>
            </Link>
            <Link to={""} state={{ type: "top-rated-india" }}>
              <span>Top rated Indian</span>
            </Link>
            <Link to={""} state={{ type: "top-rated-movies" }}>
              <span>Top rated Movies</span>
            </Link>
            <Link to={""} state={{ type: "favourite" }}>
              <span>Favourites </span>
            </Link>
          </div>

          {/* Search bar to search for movies */}
          <div className="searchBox">
            <input
              type="text"
              placeholder="Search movies..."
              onChange={handleSearch}
            />
          </div>
        </nav>
        <Routes>
          <Route path="" element={<SearchResult searchValue={searchQuery} />} />
          <Route path="/:MovieName" element={<MovieDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default Header;
