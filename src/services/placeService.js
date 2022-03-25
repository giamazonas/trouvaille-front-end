import * as tokenService from '../services/tokenService'

const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/places`

async function getAllPlaces() {
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

export { getAllPlaces }
