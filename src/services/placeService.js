import * as tokenService from "../services/tokenService";
const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/places`;
// const BASE_URL = "/places";

function getAllPlaces() {
  // async function getAllPlaces() {
  // const res = await fetch(BASE_URL, {
  //   headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  // })
  // return await res.json()

  return fetch(BASE_URL).then((res) => res.json())
}

function create(place) {
  console.log("create in placeService ___ place: ", place)

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
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
  }).then((res) => res.json())
}

function update(place) {
  return fetch(`${BASE_URL}/${place.get("._id")}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: place,
  }).then((res) => res.json())
}

function getOne(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "GET",
  }).then((res) => res.json())
}

function search(formData) {
  return fetch(`${BASE_URL}/api/places/?place=${formData.query}`).then((res) =>
    res.json()
  );
}

function createReview(id, place) {
  console.log("create review in placeService place: ", id);

  return fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    // body: ,
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
};
