import ReactMapGl, { Marker } from 'react-map-gl'
import { useState, useEffect } from 'react'

// const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN
const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
function MapBoxTwo(props) {

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vw",
    latitude: 37.0902,
    longitude: -95.7129,
    zoom: 3,
  })

  return (
    <ReactMapGl 
      mapStyle="mapbox://styles/maxmay94/cl1cfxpkt000914n0o0c1hojk" 
      width='100vw'
      height='100vh'
      onViewportChange={setViewport}
      {...viewport}
      mapboxApiAccessToken={TOKEN}
    >

    </ReactMapGl>
  )
}

export default MapBoxTwo