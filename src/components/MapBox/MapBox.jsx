import * as React from 'react'
import { render } from 'react-dom'
import Map, { Marker } from 'react-map-gl'
import { useRef, useEffect, useState } from 'react'
import { getCoordinates } from '../../services/forwardGeocodeApi'
import styles from './mapbox.module.css'
import mapboxgl from 'mapbox-gl'


import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWF4bWF5OTQiLCJhIjoiY2wxMmVlNGswMGE0ZzNpcHdhajcxaWJpcSJ9.S4qg-xBnCdH5ji7yJC2Tyw'; // Set your mapbox token here
const API_URL = 'https://api.mapbox.com/geocoding/v5/'

function MapBox(props) {
  const [cityDetails, setCityDetails] = useState({})
  const [placeLocation, setPlaceLocation] = useState([])

  let cityLatLong = `${API_URL}mapbox.places/${props.city.replaceAll(' ', '%20')}/${props.state}.json?&access_token=${MAPBOX_TOKEN}`

  // https://api.mapbox.com/isochrone/v1/mapbox/walking/-73.990593%2C40.740121?contours_minutes=30&contours_colors=005a32&polygons=true&denoise=1&access_token${MAPBOX_TOKEN}

  let update = false

  useEffect(() => {
    update = false
    getCoordinates(cityLatLong)
      .then(data => data.features)
      .then(data => data[0].center)
      .then(data => setCityDetails(data))
      .catch(err => console.log('::: ERROR :::', err))
  }, [update])


  // props.places ? console.log('PROPS',props) : console.log(cityDetails)

  useEffect(() => {
    const newPlaces = []
    if (props.places) {
      update = true
      props.places.forEach(place => {
        (getCoordinates(`${API_URL}mapbox.places/${props.city.replaceAll(' ', '%20')}/${place.address.replaceAll(' ', '%20')}.json?&access_token=${MAPBOX_TOKEN}`))
          .then(data => data.features)
          .then(data => data[0].center)
          .then(data => newPlaces.push(data))
          .catch(err => console.log('::: ERROR :::', err))
      })
    }
    setPlaceLocation(newPlaces)
    console.log('::: placeLocation :::', placeLocation)
  }, [props.places])


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
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={MAPBOX_TOKEN}
          >

            <Marker longitude={cityDetails[0]} latitude={cityDetails[1]} color="green" scale='1' />
            <Marker longitude={-71.138435} latitude={42.34669} color="red" scale='.5' />
            {
              placeLocation ?

                placeLocation.forEach(location => {
                      console.log('location:' ,location[0], location[1])
                    //  <Marker longitude={location[1]} latitude={location[0]} color="red" scale=".5" />
                 })
              :
                console.log('nothing to report')
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