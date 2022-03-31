import * as tokenService from "../services/tokenService";

const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/profiles`;

async function getAllProfiles() {
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  });
  return await res.json();
}

function addItinerary(profileId, itineraryId) {
  console.log('Profile Services')
  return fetch(`${BASE_URL}/${profileId}/${itineraryId}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  })
  .then(res => res.json())
}

function showItineraries(id) {
    return fetch(`${BASE_URL}/itineraries/${id}`, {
    headers: {
      method: "GET",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
  })
  .then(res => res.json())
}

export { 
  getAllProfiles,
  addItinerary,
  showItineraries
}
