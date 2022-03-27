import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styles from './SearchBar.module.css'

const SearchBar = ({ placeholder, data }) => {
  const [filteredData, setFilteredData] = useState([])

  const handleFilter = (evt) => {
    const searchWord = evt.target.value
    const newFilter = data.filter((place) => {
      return place.name.toLowerCase().includes(searchWord.toLowerCase())
    })
    setFilteredData(newFilter)
  }

  return (
    <div className={styles.search}>
      <div className={styles.searchInputs}>
        <input className={styles.inputText} type="text" placeholder={placeholder} onChange={handleFilter}/>
        <button className={styles.searchIcon}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
      </div>
      {filteredData.length !== 0 && (
        <div className={styles.searchResult}>
          {filteredData.map((place) => {
            return (
              <a key={place._id} className={styles.resultItem} href={`/places/${place._id}`}>
                <p>{place.name} <span>{place.type}</span></p>
              </a>
            )
          })}

        </div>
        )}

    </div>
  )
}


export default SearchBar;