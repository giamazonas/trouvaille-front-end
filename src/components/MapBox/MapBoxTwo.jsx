// import * as React from 'react'
// import ReactMapGl, { Marker } from 'react-map-gl'
// import { useState, useEffect } from 'react'
// import { getCoordinates } from '../../services/forwardGeocodeApi'

// // const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN
// const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
// const API_URL = 'https://api.mapbox.com/geocoding/v5/'

// function MapBoxTwo(props) {
//   const [cityDetails, setCityDetails] = useState({})
//   const [placeLocation, setPlaceLocation] = useState([])
  
//   const [viewport, setViewport] = useState({
//     width: "60vw",
//     height: "40vw",
//     latitude: cityDetails[1],
//     longitude: cityDetails[0],
//     // latitude: 37.0902,
//     // longitude: -95.7129,
//     zoom: 12,
//   })

//   let cityLatLong = `${API_URL}mapbox.places/${props.city.replaceAll(' ', '%20')}/${props.state}.json?&access_token=${TOKEN}`


//     useEffect(() => {
//     props.places &&
//       getCoordinates(cityLatLong)
//         .then(data => data.features)
//         .then(data => data[0].center)
//         .then(data => {
//           setCityDetails(data)
//         })
//     const newPlaces = []
//     props.places?.forEach(place => {
//       (getCoordinates(`${API_URL}mapbox.places/${props.city.replaceAll(' ', '%20')}/${place.address.replaceAll(' ', '%20')}.json?&access_token=${TOKEN}`))
//         .then(data => data.features)
//         .then(data => data[0].center)
//         .then(data => newPlaces.push(data))
//         .catch(err => console.log('::: ERROR :::', err))
//     })
//     setPlaceLocation(newPlaces)
//       //  v----------------  Force a Reload to get markers to appear
//     // forceReload()
//   }, [props.places, cityLatLong, props.city])

//   return (
//     <>
//       <br />
//       <div className='mapbox-container'>
//       {cityDetails.length ?
//         <ReactMapGl 
//           mapStyle="mapbox://styles/maxmay94/cl1cfxpkt000914n0o0c1hojk" 
//           onViewportChange={setViewport}
//           {...viewport}
//           mapboxApiAccessToken={TOKEN}
//         >

//         </ReactMapGl>
//         :
//         <div>
//           <h1>Please return to the cities page and try again</h1>
//         </div>
//         }
//       </div>
//     </>
//   )
// }

// export default MapBoxTwo