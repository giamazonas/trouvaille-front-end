import { useState, useEffect } from 'react'
import * as placeService from '../../services/placeService.js'
import { Link } from 'react-router-dom'

const Places = (props) => {
  const [places, setPlaces] = useState([])

  useEffect(()=> {
    placeService.getAllPlaces()
    .then(places => setPlaces(places))
  }, [])

  return (
    <>
      <h1>Hello. This is a list of all the places.</h1>
      {places.length ? 
        <>
          {places.map(place=>
            <p key={place._id}>{place.name}</p>
          )}
        </>
      :
      <div>
        <p>No places yet</p>
        <Link to="/places/add">Add a Place</Link>
      </div>
      }
    </>
  )
}
 
export default Places