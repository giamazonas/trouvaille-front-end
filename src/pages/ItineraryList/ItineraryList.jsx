import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as itineraryService from '../../services/itineraries.js'
import styles from './ItineraryList.module.css'
import ItineraryCard from '../../components/ItineraryCard/ItineraryCard.jsx'

const Itineraries = (props) => {
  const [itineraries, setItineraries] = useState([])

  useEffect(()=> {
    itineraryService.getAllItineraries()
    .then(itineraries => setItineraries(itineraries))
  }, [])

  return (
    <>
    <div className={styles.container}>
      <br /><h1>My Itinerary</h1><br />
      {itineraries.length ? 
        <>
          {itineraries.map(itinerary=>
            <p key={itinerary._id}>{itinerary.name}</p>
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

export default Itineraries