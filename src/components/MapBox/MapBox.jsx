import * as React from 'react'
import { render } from 'react-dom'
import Map, { Marker } from 'react-map-gl'
import { useRef, useEffect, useState } from 'react'
import { getCoordinates } from '../../services/forwardGeocodeApi'
import styles from './mapbox.module.css'
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWF4bWF5OTQiLCJhIjoiY2wxMmVlNGswMGE0ZzNpcHdhajcxaWJpcSJ9.S4qg-xBnCdH5ji7yJC2Tyw' // Set your mapbox token here
const API_URL = 'https://api.mapbox.com/geocoding/v5/'

function MapBox(props) {
  const [cityDetails, setCityDetails] = useState({})
  const [placeLocation, setPlaceLocation] = useState([])

  let cityLatLong = `${API_URL}mapbox.places/${props.city.replaceAll(' ', '%20')}/${props.state}.json?&access_token=${MAPBOX_TOKEN}`

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

  }, [props.places, cityLatLong, props.city])

  return (
    <>
      <div className='mapbox-container'>
        {cityDetails.length?
          <Map
            initialViewState={{
              latitude: cityDetails[1],
              longitude: cityDetails[0],
              zoom: 12,
            }}
            style={{width: 800, height: 600}}
            mapStyle="mapbox://styles/maxmay94/cl1cfxpkt000914n0o0c1hojk"
            mapboxAccessToken={MAPBOX_TOKEN}
          >

            <Marker longitude={cityDetails[0]} latitude={cityDetails[1]} color="green" scale='1' />
            {
                placeLocation?.map((location, idx) => (
                     <Marker key={idx} longitude={location[0]} latitude={location[1]} color="red" scale=".5" />
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