import * as tokenService from '../services/tokenService'

const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/itineraries`

function getAllItineraries() {
  return fetch(BASE_URL).then((res) => res.json())
}

export { getAllItineraries }
