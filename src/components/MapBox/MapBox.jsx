import * as React from 'react'
import {render} from 'react-dom'
import Map, {Marker} from 'react-map-gl'
import { useEffect, useState } from 'react'
import { getCityInfo } from '../../services/forwardGeocodeApi'

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWF4bWF5OTQiLCJhIjoiY2wxMmVlNGswMGE0ZzNpcHdhajcxaWJpcSJ9.S4qg-xBnCdH5ji7yJC2Tyw'; // Set your mapbox token here
const API_URL = 'https://api.mapbox.com/geocoding/v5/'

function MapBox(props) {
  const [cityDetails, setCityDetails] = useState({})
  
  let cityInfo = `${API_URL}mapbox.places/${props.city}.json?&access_token=${MAPBOX_TOKEN}`

  useEffect(() => {
    getCityInfo(cityInfo)
    .then(data => data.features)
    .then(data => data[0].center)
    .then(data=> setCityDetails(data))
    .catch(err => console.log('::: ERROR :::', err))
  },[])
  
  return (
    <>
      {cityDetails.length?
      <Map
        initialViewState={{
          latitude: cityDetails[1],
          longitude: cityDetails[0],
          zoom: 12,
        }}
        style={{width: 800, height: 600}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker longitude={cityDetails[0]} latitude={cityDetails[1]} color="green" />
      </Map>
      :
      <>
        <h3>loading map</h3>
      </>
      }
    </>
  )
}

export {
  MapBox
}