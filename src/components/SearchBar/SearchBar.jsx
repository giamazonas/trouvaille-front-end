import React from "react";
import styles from './SearchBar.module.css'

const SearchBar = ({ placeholder, data }) => {
  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholder} />
        <div className="searchIcon"></div>
      </div>
      <div className="searchResult"></div>
    </div>
  );
}

export default SearchBar;