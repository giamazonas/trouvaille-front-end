import { useState, useEffect } from 'react'
import * as itineraryService from '../../services/itineraries.js'
import { Link } from 'react-router-dom'
import ItineraryCard from '../../components/ItineraryCard/ItineraryCard.jsx'
import styles from './ItineraryList.module.css'

const ItineraryList = (props, handleAddItinerary, handleDeleteItinerary) => {
  const [itineraries, setItineraries] = useState([])

  useEffect(()=> {
    itineraryService.getAllItineraries()
    .then(itineraries => setItineraries(itineraries))
  }, [])

  return (
    <>
    <div className={styles.container}>
      <br /><h1>My Itinerary</h1><br />
      {props.itineraries.length ? 
        <>
          {itineraries.map(itinerary =>
            <ItineraryCard 
              // user={props.user}
              // key={itinerary._id}
              // itinerary={itinerary}
              // handleAddItinerary={handleAddItinerary}
              // handleDeleteItinerary={handleDeleteItinerary}
              // handleUpdateItinerary={handleUpdateItinerary}
              />
            )}
        </>
      :
      <div>
        <p>...No Itineraries. </p><br />
        <p> You should start one, <Link
          className='btn btn-sm btn-warning'
          to={`/cities/`}
          >here</Link>!</p>
      </div>
      }
    </div>
    </>
  )
}

export default ItineraryList