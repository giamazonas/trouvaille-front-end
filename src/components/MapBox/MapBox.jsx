import * as React from 'react'
import Map, { Marker } from 'react-map-gl'
import { useEffect, useState } from 'react'
import { getCoordinates } from '../../services/forwardGeocodeApi'
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const API_URL = 'https://api.mapbox.com/geocoding/v5/'

function MapBox(props) {
  const [cityDetails, setCityDetails] = useState({})
  const [placeLocation, setPlaceLocation] = useState([])

  let cityLatLong = `${API_URL}mapbox.places/${props.city.replaceAll(' ', '%20')}/${props.state}.json?&access_token=${MAPBOX_TOKEN}`

  /* #################vvvv CIRCLE BACK FOR A MORE PROFESSIONAL FIX vvvv################# */
  function forceReload() {
    const reloadCount = sessionStorage.getItem('reloadCount');
    if(reloadCount < 1) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }
  }
  /* #################^^^^ CIRCLE BACK FOR A MORE PROFESSIONAL FIX ^^^^################# */


  useEffect(() => {
    props.places &&
      getCoordinates(cityLatLong)
        .then(data => data.features)
        .then(data => data[0].center)
        .then(data => {
          setCityDetails(data)
        })
    const newPlaces = []
    props.places?.forEach(place => {
      (getCoordinates(`${API_URL}mapbox.places/${props.city.replaceAll(' ', '%20')}/${place.address.replaceAll(' ', '%20')}.json?&access_token=${MAPBOX_TOKEN}`))
        .then(data => data.features)
        .then(data => data[0].center)
        .then(data => newPlaces.push(data))
        .catch(err => console.log('::: ERROR :::', err))
    })
    setPlaceLocation(newPlaces)
    //    v----------------  Force a Reload to get markers to appear
    forceReload()

  }, [props.places, cityLatLong, props.city])

  return (
    <>
      <div className="w-full min-h-60 bg-gray-200 overflow-hidden lg:h-200 lg:aspect-none">
        {cityDetails.length ?
          <Map
            initialViewState={{
              latitude: cityDetails[1],
              longitude: cityDetails[0],
              zoom: 12,
            }}
            style={{ width: 800, height: 600 }}
            mapStyle="mapbox://styles/maxmay94/cl1cfxpkt000914n0o0c1hojk"
            // mapStyle="mapbox://styles/maxmay94/cl1cv5rwv000c17nonvzqhlt4" //dark map
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            <Marker longitude={cityDetails[0]} latitude={cityDetails[1]} color="white" scale='1' />
            {
              placeLocation?.map((location, idx) => (
                <Marker key={idx} title='location' longitude={location[0]} latitude={location[1]} color="grey" scale=".5" />
              ))
            }
          </Map>
          :
          <>
            <h3>loading map</h3>
          </>
        }
      </div>
    </>
  )
}

export default MapBox

