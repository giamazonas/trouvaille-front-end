import * as React from 'react'
import Map, { Marker } from 'react-map-gl'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

function MapBox(props) {
  console.log('cityDetails: ',props.cityDetails)
  return (
    <>
      <div className="w-full min-h-60 bg-gray-200 overflow-hidden lg:h-200 lg:aspect-none">
        {props.cityDetails ?
          <Map
            initialViewState={{
              latitude: props.cityDetails.lat,
              longitude: props.cityDetails.long,
              zoom: 12,
            }}
            style={{ width: 800, height: 600 }}
            mapStyle="mapbox://styles/maxmay94/cl1cfxpkt000914n0o0c1hojk"
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            <Marker longitude={props.cityDetails.long} latitude={props.cityDetails.lat} color="white" scale='1' />
            {
              props.cityDetails.places?.map((location, idx) => (
                <Marker key={idx} title='location' longitude={location.long} latitude={location.lat} color="grey" scale=".5" />
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

