import * as tokenService from "./tokenService"
const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/itineraries`

// function getAllItineraries() {
//   return fetch(BASE_URL, {
//     headers: {
//       Authorization: `Bearer ${tokenService.getToken()}`,
//     },
//   }).then((res) => res.json())
// }

function create(itinerary) {
  return fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(itinerary),
  }).then((res) => res.json())
}

function deleteOne(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
  }).then((res) => res.json())
}

function getOne(id) {
  return fetch(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    method: "GET",
  }).then((res) => res.json())
}

function update(itinerary) {
  return fetch(`${BASE_URL}/${itinerary.get("_id")}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: JSON.stringify(itinerary),
  }).then((res) => res.json())
}

export { 
  // getAllItineraries, 
  create, 
  deleteOne, 
  getOne, 
  update,
}
