import { useState, useEffect } from 'react'
import * as itineraryService from '../../services/itineraries.js'
import { Link } from 'react-router-dom'
import Itinerary from '../../components/Itinerary/Itinerary'
// import ItineraryCard from '../../components/ItineraryCard/ItineraryCard.jsx'
import styles from './ItineraryList.module.css'

const ItineraryList = (props, handleAddItinerary, handleDeleteItinerary) => {
  const [itineraries, setItineraries] = useState([])

  useEffect(() => {
    itineraryService.getAllItineraries()
      .then(itineraries => setItineraries(itineraries))
  }, [])

  return (
    <>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">My Itineraries</h2>
          {props.itineraries.length ?
            <>
              {/* {itineraries.map(itinerary, i =>
                <div key={itinerary._id + i} className="group relative">
                  <Itinerary
                  // user={props.user}
                  // key={itinerary._id}
                  // itinerary={itinerary}
                  // handleAddItinerary={handleAddItinerary}
                  // handleDeleteItinerary={handleDeleteItinerary}
                  // handleUpdateItinerary={handleUpdateItinerary}
                  />
                </div>
              )} */}
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
      </div>
    </>
  )
}

export default ItineraryList