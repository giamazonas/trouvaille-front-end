import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as itineraryService from '../../services/itineraries.js'

const Itineraries = (props) => {
  const [itineraries, setItineraries] = useState([])

  useEffect(()=> {
    itineraryService.getAllItineraries()
    .then(itineraries => setItineraries(itineraries))
  }, [])

  return (
    <>
      <h1>My Itinerary</h1>
      {itineraries.length ? 
        <>
          {itineraries.map(itinerary=>
            <p key={itinerary._id}>{itinerary.name}</p>
          )}
        </>
      :
      <div>
        <p>No Itineraries</p>
      </div>
      }
    </>
  )
}
 
export default Itineraries