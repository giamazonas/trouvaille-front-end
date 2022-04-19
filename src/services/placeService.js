import * as tokenService from "../services/tokenService"
const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/places`

function getAllPlaces() {
  return fetch(BASE_URL).then((res) => res.json())
}

function create(place) {
  return fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: place,
  }).then((res) => res.json())
}

function deleteOne(id) {
  return fetch(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    method: "DELETE",
  }).then((res) => res.json())
}

function update(id, place) {
  return fetch(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: place,
    method: "PUT",
  }).then((res) => res.json())
}

function getOne(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "GET",
  }).then((res) => res.json())
}

function search(formData) {
  return fetch(`${BASE_URL}/?place=${formData.query}`).then((res) =>
    res.json()
  )
}

function createReview(data) {
  return fetch(`${BASE_URL}/${data._id}/reviews`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json())
}

export {
  getAllPlaces,
  create,
  deleteOne,
  update,
  getOne,
  search,
  createReview,
}
