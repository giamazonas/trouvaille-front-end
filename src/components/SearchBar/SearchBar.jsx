import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styles from './SearchBar.module.css'

const SearchBar = ({ placeholder, data }) => {

  return (
    <div className={styles.search}>
      <div className={styles.searchInputs}>
        <input className={styles.inputText} type="text" placeholder={placeholder} />
        <button className={styles.searchIcon}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
      </div>
      <div className={styles.searchResult}>
        {data.map((place, k) => {
          return (
            <a className={styles.resultItem} href={`/places/${place._id}`}>
              <p>{place.name} <span>{place.type}</span></p>
            </a>
          )
        })}
      </div>
    </div>
  );
}

export default SearchBar;