import { useState, useRef, useEffect } from 'react';
import * as placeService from '../../services/placeService';
import { useLocation } from 'react-router-dom';
import { MapBox } from '../../components/MapBox/MapBox';

const PlaceId = (props) => {
  const [placeDetails, setPlaceDetails] = useState({})
  let location = useLocation()

  useEffect(() => {
    placeService.getOne(location.state.place.id)
    .then(place => setPlaceDetails(place))
  }, [])

  return (
    <>
      <div className='place-container'>
      {location.state.place._id ?
          <>
            <h4>{location.state.place.photo}</h4>
            <h2>{location.state.place.name}</h2>
            <h4>{location.state.place.address}</h4>
            <h4>{location.state.place.city}</h4>
            <h4>{location.state.place.type}</h4>
            <h4>{location.state.place.url}</h4><br />
            <h4>Reviews: {location.state.place.reviews}</h4>
          </>
          :
          <>
            <h2>Loading Place Details...</h2>
          </>
        }

      </div>
    </>
  )
}

export default PlaceId;