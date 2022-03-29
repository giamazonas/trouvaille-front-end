// import { useState, useRef, useEffect } from 'react'
import AddItinerary from '../../components/AddItinerary/AddItinerary'
import * as cityService from '../../services/cityService'
import { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { MapBox } from '../../components/MapBox/MapBox'
import PlaceCard from '../../components/PlaceCard/PlaceCard'
import styles from './CityId.module.css'
import { constants } from 'buffer'
import Itineraries from '../ItineraryList/ItineraryList'
import ItineraryCard from '../../components/ItineraryCard/ItineraryCard'

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWF4bWF5OTQiLCJhIjoiY2wxMmVlNGswMGE0ZzNpcHdhajcxaWJpcSJ9.S4qg-xBnCdH5ji7yJC2Tyw' // Set your mapbox token here
const API_URL = 'https://api.mapbox.com/geocoding/v5/'

const CityId = (props) => {
  const location = useLocation()
  const [cityDetails, setCityDetails] = useState(null)

  useEffect(() => {
    cityService.getOne(location.state.city._id)
    .then(city => {
      setCityDetails(city)
    })
  }, [location.state.city._id])
  // cityDetails.places ? console.log('::: CityId.jsx -- cityDetails :::',cityDetails) : console.log('loading cityDetails')

  return (
    <>
      <div >
        <div className={styles.placesContainer}>

        </div><br />
        <div className={styles.container}>
          {cityDetails ?
            <>
              <h1 className='city-details'>{cityDetails?.city}</h1><br />
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
          {
            cityDetails &&
          <MapBox city={cityDetails.city} state={cityDetails.state} places={cityDetails.places} />
          }
        </div>

      <div><br /> <br />
        <h3 className="flex content-center justify-center">Places to go in {cityDetails.city}</h3>
          {cityDetails.places ?
          <div  className="flex content-center justify-center">
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