// import { useState, useRef, useEffect } from 'react'
import AddItinerary from '../../components/AddItinerary/AddItinerary'
import * as cityService from '../../services/cityService'
import { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { MapBox } from '../../components/MapBox/MapBox'
import PlaceCard from '../../components/PlaceCard/PlaceCard'
import styles from './CityId.module.css'

const CityId = (props) => {
  const [cityDetails, setCityDetails] = useState({})
  let location = useLocation()

  useEffect(() => {
    console.log(location.state.city)
    cityService.getOne(location.state.city._id)
    .then(city => {
      setCityDetails(city)
    })
  },[])


  console.log('CITY DETAILS: ',cityDetails.city)
  console.log('vs : ', location.state.city.city)

  return (
    <>
      <div className={styles.mapboxContainer}>

      </div>
      <div className={styles.placesContainer}>
        
      </div>
      <div className={styles.container}>
        {location.state.city._id ?
          <>
            <h2 className='city-details'>{cityDetails.city}</h2>
            <h3>{cityDetails.desc}</h3>
            <h4>{cityDetails.population}</h4>
            <h4>Walkable? {cityDetails.walkable ? 'you can walk!' : 'get a bike'}</h4>
          </>
          :
          <>
            <h2>Loading City Details...</h2>
          </>
        }
      </div>
      <div className='itinerary-container'>

      </div>
      <MapBox city={location.state.city.city} state={location.state.city.state} places={cityDetails.places}/>
      <div>
        <h3>Places to go in {cityDetails.city}</h3>
          {cityDetails.places ?
          <div>
            {cityDetails.places.map(place => (
              <PlaceCard key={place._id} place={place} />
            ))}
          </div>
          :
          <div>
            <p>Loading Places ...</p>
          </div>
          }
      </div>
      <br />
      <br />
      <br />
    </>
  );
}

export default CityId;