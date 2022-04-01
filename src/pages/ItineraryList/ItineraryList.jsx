import { Link } from 'react-router-dom'
import styles from './ItineraryList.module.css'

const ItineraryList = (props) => {
  console.log(props)
  return (
    <>
    <div className={styles.container}>
      <br /><h1>My Itineraries</h1><br />
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
    </>
  )
}

export default ItineraryList