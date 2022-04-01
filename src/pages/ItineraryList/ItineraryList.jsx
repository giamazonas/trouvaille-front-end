import { Link } from 'react-router-dom'
import styles from './ItineraryList.module.css'

const ItineraryList = (props) => {
  console.log(props)
  return (
    <>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">My Itineraries</h2>
          {props.itineraries ?
            <>
              {props.itineraries.itineraries.map(itinerary =>
                <div key={itinerary._id}>
                  {itinerary.name}
                  {itinerary.timePlace.map(place => (
                    <p key={place.places + place.time}>
                      {place.time}:00  -   {place.places}
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
      </div>
    </>
  )
}

export default ItineraryList