import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styles from './SearchBar.module.css'

const SearchBar = ({ placeholder, data }) => {
  
  return (
    <div className="search">
      <div className="searchInputs">
        <input className={styles.inputText} type="text" placeholder={placeholder} />
        <button className={styles.searchIcon}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
      </div>
      <div className="searchResult">
        {/* {data.map((place, k) => {
          return <div>{place.name}</div>
        })} */}
      </div>
    </div>
  );
}

export default SearchBar;