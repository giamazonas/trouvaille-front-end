// import { useState, useRef, useEffect } from 'react'
import * as cityService from '../../services/cityService'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import MapBox from '../../components/MapBox/MapBox'
// import MapBoxTwo  from '../../components/MapBox/MapBoxTwo'
import PlaceCard from '../../components/PlaceCard/PlaceCard'
import styles from './CityId.module.css'
import ItineraryCard from '../../components/ItineraryCard/ItineraryCard'

const CityId = (props) => {
  const location = useLocation()
  const [cityDetails, setCityDetails] = useState(null)

  useEffect(() => {
    cityService.getOne(location.state.city._id)
      .then(city => {
        setCityDetails(city)
      })
  }, [location.state.city._id])

  return (
    <div className="min-h-full">
      <header className="bg-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">{cityDetails?.city}</h1>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 grid items-center grid-cols-1 gap-y-8 gap-x-4 sm:px-4 sm:py-2 lg:max-w-7xl lg:px-8 lg:grid-cols-3">
          {cityDetails ?
            <>
              <div className="col-span-2 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                <h3>{cityDetails?.desc}</h3>
              </div>
              <div className="col-span-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                <h4>Population: {cityDetails?.population}</h4>
                <h4>Population: {cityDetails?.population}</h4>
                <h4>Walkable? {cityDetails?.walkable ? 'you can walk!' : 'get a bike'}</h4><br />
              </div>
            </>
            :
            <div>
              <h2>Loading City Details...</h2>
            </div>
          }


        <div className="grid grid-cols-2">
          <div>
            {
              cityDetails &&
              <MapBox city={cityDetails?.city} state={cityDetails?.state} places={cityDetails?.places} />
            }
            {/* {
            cityDetails && 
              <MapBoxTwo city={cityDetails?.city} state={cityDetails?.state} places={cityDetails?.places} />
          } */}
          </div>
        </div>
        <div className="grid grid-cols-1">
          <ItineraryCard city={cityDetails} handleAddItinerary={props.handleAddItinerary} />
        </div>
        <div><br /> <br />
          <h3 className="flex content-center justify-center">Places to go in {cityDetails?.city}</h3>
          {cityDetails?.places ?
            <div className="flex content-center justify-center">
              {cityDetails?.places.map(place => (
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
    </div>
  )
}

export default CityId