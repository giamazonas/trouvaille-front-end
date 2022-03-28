import * as tokenService from "../services/tokenService";
const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/cities`;

function create(city) {
  console.log(city);
  return fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: city,
  }).then((res) => res.json());
}

function getAll() {
  return fetch(BASE_URL).then((res) => res.json());
}

function deleteOne(id) {
  return fetch(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    method: "DELETE",
  }).then((res) => res.json());
}

function getOne(id) {
  return fetch(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    method: "GET",
  }).then((res) => res.json())
}

function update(city) {
  console.log("::: city :::", city);
  return fetch(`${BASE_URL}/${city._id}/edit`, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    body: JSON.stringify(city),
    method: "PUT",
  }).then((res) => res.json());
}

function addPlace(cityId, placeId) {
  console.log("::: cityId :::", cityId);
  console.log("::: placeId :::", placeId);
  return fetch(`${BASE_URL}/${cityId}/${placeId}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    // body: placeId,
  }).then((res) => res.json());
}

function search(formData) {
  return fetch(`${BASE_URL}/api/cities/?city=${formData.query}`).then((res) =>
    res.json()
  );
}

export { create, getAll, deleteOne, update, getOne, search, addPlace };
