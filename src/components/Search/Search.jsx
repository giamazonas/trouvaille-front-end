import { useState } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import { search } from '../../services/cityService';
import CityCard from '../../components/CityCard/CityCard';

const Search = (props) => {
  const [results, setResults] = useState([])

  const handleSearch = formData => {
    search(formData)
    .then(searchResults => setResults(searchResults.results))
  }

  return (
    <>
      <h3>Search Results</h3>
      <SearchForm handleSearch={handleSearch} />
      {results.length ? 
        <>
          {results.map(result => 
            <CityCard key={result.index} result={result.city}/>
            // <SearchCard key={spell.index} spell={spell} />
          )}
        </>
        :
        <h3>Search here!</h3>
      }
    </>
  )
}

export default Search;