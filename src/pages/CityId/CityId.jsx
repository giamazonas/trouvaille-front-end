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
    cityService.getOne(location.state.city._id)
      .then(city => {
        setCityDetails(city)
      })
  }, [])

  // cityDetails.places ? console.log('::: CityId.jsx -- cityDetails :::',cityDetails) : console.log('loading cityDetails')

  return (
    <>
      <div >
        <div className={styles.placesContainer}>

        </div><br />
        <div className={styles.container}>
          {location.state.city._id ?
            <>
              <h1 className='city-details'>{cityDetails.city}</h1><br />
              <h3>{cityDetails.desc}</h3>
              <h4>Population: {cityDetails.population}</h4>
              <h4>Walkable? {cityDetails.walkable ? 'you can walk!' : 'get a bike'}</h4><br />
            </>
            :
            <>
              <h2>Loading City Details...</h2>
            </>
          }
        </div>
        <div className='itinerary-container'>

        </div>
        <div className="flex content-center justify-center">
          <MapBox city={location.state.city.city} state={location.state.city.state} places={cityDetails.places} />
        </div>

        <div>
          <h3 className="flex content-center justify-center">Places to go in {cityDetails.city}</h3>
          {cityDetails.places ?
            <div className="flex content-center justify-center">
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
      </div>
      <br />
      <br />
      <br />
    </>
  );
}

export default CityId;