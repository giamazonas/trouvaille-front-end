import { useState, useEffect } from 'react'
import * as itinerariesService from '../../services/itineraries.js'
import { Link } from 'react-router-dom'

const Itineraries = (props) => {
  const [itineraries, setItineraries] = useState([])

  useEffect(()=> {
    itinerariesService.getAllItineraries()
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