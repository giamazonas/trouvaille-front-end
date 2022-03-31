import { useState, useEffect } from 'react'
// import * as itineraryService from '../../services/itineraries.js'
import { Link } from 'react-router-dom'
import ItineraryCard from '../../components/AddItineraryCard/AddItineraryCard.jsx'
import styles from './ItineraryList.module.css'

const ItineraryList = (props) => {
  console.log(props.itineraries)

  return (
    <>
    <div className={styles.container}>
      <br /><h1>My Itineraries</h1><br />
      {props.itineraries ?
        <>
          {props.itineraries.map((itinerary, i) =>
            <div key={itinerary._id}>
              {itinerary.name}
              {itinerary.timePlace.map(place => (
                <p>
                  {place.time}: {place.places}
                </p>
              ))}
              <br />
            </div>
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