// import { useState, useRef, useEffect } from 'react'
import AddItinerary from '../../components/AddItinerary/AddItinerary'
import * as cityService from '../../services/cities'
import { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'

const CityId = (props) => {
  const [cityDetails, setCityDetails] = useState({})
  let location = useLocation()

  // const {} = useParams()

  // useEffect(() => {
  //   getCitydetails(location.state.city._id)
  //   .then(cityData => setCityDetails(cityData))
  // })

  useEffect(() => {
    cityService.getAll()
    .then(allCities => setCityDetails(allCities))
  }, [])

  return (
    <>
      <div className='mapbox-container'>

      </div>
      <div className='places-container'>

      </div>
      <div className='city-container'>
        {cityDetails.city._id ?
        <>
          <h4 className='city-details'>{cityDetails.city}</h4>
          {cityDetails.desc}
          {cityDetails.population}
          {cityDetails.walkable}
        </>
        :
        <>
          <h2>Loading City Details...</h2>
        </>
        }
      </div>
      <div className='itinerary-container'>

      </div>
    </>
  );
}

export default CityId;