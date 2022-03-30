import * as React from 'react'
import { render } from 'react-dom'
import Map, { Marker } from 'react-map-gl'
import { useRef, useEffect, useState } from 'react'
import { getCoordinates } from '../../services/forwardGeocodeApi'
import 'mapbox-gl/dist/mapbox-gl.css';


const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN 

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
      <div className='mapbox-container'>
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
            <Marker longitude={cityDetails[0]} latitude={cityDetails[1]} color="green" scale='1' />
            {
              placeLocation?.map((location, idx) => (
                <Marker key={idx} title='location' description='some stuff about place' longitude={location[0]} latitude={location[1]} color="red" scale=".5" >
                  {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>woah look at this guys</button> */}
                </Marker>
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

export {
  MapBox
}