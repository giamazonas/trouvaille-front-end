import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from '../SearchBar/SearchBar.module.css'

const SearchBarCity = ({ placeholder, data }) => {
  const [filteredData, setFilteredData] = useState([])
  const [searchInput, setSearchInput] = useState("")

  const handleFilter = (evt) => {
    const searchWord = evt.target.value
    setSearchInput(searchWord)
    const newFilter = data.filter((city) => {
      return city.name.toLowerCase().includes(searchWord.toLowerCase())
    })
    searchWord ? setFilteredData(newFilter) : setFilteredData([])
  }

  const clearInput = () => {
    setFilteredData([])
    setSearchInput("")
  }

  return (
    <div className={styles.search}>
      <div className={styles.searchInputs}>
        <input className={styles.inputText} type="text" value={searchInput} placeholder={placeholder} onChange={handleFilter} />
        <span>{filteredData.length ?
          <FontAwesomeIcon
            className={styles.clearBtn} icon={faXmark}
            onClick={clearInput} />
          :
          <FontAwesomeIcon className={styles.SearchIcon} icon={faMagnifyingGlass} />
        }
        </span>
      </div>
      {filteredData.length !== 0 && (
        <div className={styles.searchResult}>
          {filteredData.map((city) => {
            console.log(city._id)
            return (
              <Link to={`/cities/${city._id}`} key={city._id} state={{city}} className={styles.resultItem}>
                <p>{city.name} <span className={styles.city}>{city.type}</span></p>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearchBarCity