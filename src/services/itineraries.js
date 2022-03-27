import * as tokenService from "./tokenService";

const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/itineraries`;

function getAllItineraries() {
  return fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
  }).then((res) => res.json());
}

export { getAllItineraries };
